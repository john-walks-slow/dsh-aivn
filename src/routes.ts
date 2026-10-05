/**
 * 舞台的宿主侧路由。四个口，全部按会话分频：
 *
 *   GET  /aivn/health            存活探针
 *   GET  /aivn/play?session=     这个会话的剧目（工作区里有 play.json 才算）
 *   GET  /aivn/assets?session=   剧目里的素材清单与描述
 *   GET  /aivn/asset?session=&path=  剧目内的一件素材
 *   GET  /aivn/audio?session=&file=   一句台词的合成音频（内容寻址，可长缓存）
 *   GET  /aivn/stream?session=   IR 帧的 SSE 流，连上先补推已播出的帧
 *   POST /aivn/input             玩家输入：`{session, text, silent?}`，投给剧作家
 *                                （时间线由 tap 接管；`silent` 是不上时间线的空推进）
 *   POST /aivn/voice             语音控制：`{session, enabled?, paused?}`
 */
import { readFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { basename, join } from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-host-webserver';
import { contentTypeOf, listAssets, readManifest, resolveInPlay } from './assets';
import type { StageHub } from './hub';
import type { InjectedMessages } from './injected';
import { loadPlay } from './play';
import { resolveAgent, sessionWorkspace } from './session';
import { TTS_CACHE_DIR, type VoiceHost } from './voice-host';

const PREFIX = '/aivn';
const BODY_LIMIT = 8 * 1024;

export function installStageRoutes(
	ctx: Context,
	hub: StageHub,
	injected: InjectedMessages,
	voice: VoiceHost,
): () => void {
	return ctx.webServer.register({
		kind: 'prefix',
		path: PREFIX,
		// **必须自己接住 rejection**：DSH 装了进程级的 `unhandledRejection` 处理，它直接
		// `process.exit(1)`。一个坏掉的 play.json、一次 EISDIR 就能把整台 DSH 连同所有会话杀掉。
		// 这里换个可读的 500 出去，坏的范围就只在用户那一座剧目里。
		handler: (req, res) => {
			handle(ctx, hub, injected, voice, req, res).catch((error: unknown) => fail(res, error));
		},
	});
}

/** 一次路由失败：还没发响应头就说清楚，已经发了一半就只能掐掉连接。 */
function fail(res: ServerResponse, error: unknown): void {
	if (res.headersSent) {
		res.destroy();
		return;
	}
	sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
}

async function handle(
	ctx: Context,
	hub: StageHub,
	injected: InjectedMessages,
	voice: VoiceHost,
	req: IncomingMessage,
	res: ServerResponse,
): Promise<void> {
	const url = new URL(req.url ?? '/', 'http://127.0.0.1');

	if (req.method === 'GET' && url.pathname === `${PREFIX}/health`) {
		sendJson(res, 200, { ok: true, plugin: 'dsh-aivn' });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/play`) {
		const sessionId = url.searchParams.get('session') ?? '';
		const play = await loadPlay(sessionWorkspace(ctx, sessionId));
		// `voice` 决定舞台显不显示语音开关：没配 TTS Key 时整条语音链路都是关的。
		sendJson(res, 200, play ? { dir: play.dir, config: play.config, voice: voice.available } : { dir: null, voice: false });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/assets`) {
		const sessionId = url.searchParams.get('session') ?? '';
		const play = await loadPlay(sessionWorkspace(ctx, sessionId));
		if (!play) {
			sendJson(res, 404, { error: 'this session has no play' });
			return;
		}
		sendJson(res, 200, { index: listAssets(play.dir), manifest: readManifest(play.dir) });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/asset`) {
		const sessionId = url.searchParams.get('session') ?? '';
		const relative = url.searchParams.get('path') ?? '';
		await sendAsset(ctx, res, sessionId, relative);
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/audio`) {
		const sessionId = url.searchParams.get('session') ?? '';
		await sendAudio(ctx, res, sessionId, url.searchParams.get('file') ?? '');
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/stream`) {
		openStream(hub, url, req, res);
		return;
	}
	if (req.method === 'POST' && url.pathname === `${PREFIX}/input`) {
		await acceptInput(ctx, injected, req, res);
		return;
	}
	if (req.method === 'POST' && url.pathname === `${PREFIX}/voice`) {
		await acceptVoice(voice, req, res);
		return;
	}
	sendJson(res, 404, { error: `no such route: ${req.method} ${url.pathname}` });
}

function openStream(hub: StageHub, url: URL, req: IncomingMessage, res: ServerResponse): void {
	const sessionId = url.searchParams.get('session') ?? '';
	if (!sessionId) {
		sendJson(res, 400, { error: 'session is required' });
		return;
	}

	const unsubscribe = hub.subscribe(sessionId, res);
	const stop = () => unsubscribe();
	req.on('close', stop);
	res.on('close', stop);
}

/** 剧目内的一件素材。路径必须是剧目内的相对路径，越界一律 400。 */
async function sendAsset(ctx: Context, res: ServerResponse, sessionId: string, relative: string): Promise<void> {
	const play = await loadPlay(sessionWorkspace(ctx, sessionId));
	if (!play) {
		sendJson(res, 404, { error: 'this session has no play' });
		return;
	}
	const target = resolveInPlay(play.dir, relative);
	if (!target) {
		sendJson(res, 400, { error: 'path must stay inside the play' });
		return;
	}

	let body: Buffer;
	try {
		body = await readFile(target);
	} catch (error) {
		// `path=` 指到目录上（`assets`、`assets/sprites`）时 readFile 给的是 EISDIR——
		// 这不是「没有这件素材」，是路径本身给错了，回 400 别把它当 500 抛上去。
		switch ((error as NodeJS.ErrnoException).code) {
			case 'ENOENT':
				sendJson(res, 404, { error: `no such asset: ${relative}` });
				return;
			case 'EISDIR':
				sendJson(res, 400, { error: `path is a directory, not an asset: ${relative}` });
				return;
			default:
				throw error;
		}
	}
	res.writeHead(200, { 'content-type': contentTypeOf(target), 'content-length': body.length });
	res.end(body);
}

/**
 * 玩家的一次输入：投给剧作家。
 *
 * 这里**不往中枢写 player_input**——落点只有一个（`stage-tap` 的 inbox 监听），
 * 否则 DSH 原生输入框那条路会漏、这条路会重复。followup 是同步入队，
 * 舞台收到的那一帧必然排在本轮新内容之前。
 *
 * `silent` 是「推进一下，但这不是玩家说的话」（舞台的「继续」按钮）。它仍然要作为一条
 * user 消息投出去——不投就没有下一轮——只是投之前登记一下，让舞台别把它摆成一行台词。
 */
async function acceptInput(
	ctx: Context,
	injected: InjectedMessages,
	req: IncomingMessage,
	res: ServerResponse,
): Promise<void> {
	const body = await readJsonBody(req, res);
	if (body === null) return;

	const sessionId = typeof body.session === 'string' ? body.session : '';
	const text = typeof body.text === 'string' ? body.text.trim() : '';
	if (!sessionId || !text) {
		sendJson(res, 400, { error: 'session and text are required' });
		return;
	}

	const agent = await resolveAgent(ctx, sessionId);
	if (!agent) {
		sendJson(res, 404, { error: `no such session: ${sessionId}` });
		return;
	}

	const message = createUserMessage({ content: [{ type: 'text', text }], source: { kind: 'user' } });
	if (body.silent === true) injected.remember(message.id);
	agent.followup(message);
	sendJson(res, 200, { ok: true });
}

/**
 * 读一个 JSON 请求体。写请求的四道闸都在这里，过不了就自己写好响应并返回 null：
 *
 * 1. **同源**——`/aivn/*` 是插件自己注册的前缀路由，**落在 DSH 的浏览器信任栅栏之外**
 *    （那道栅栏只管 `/api`）。跨站页面能盲投一条「玩家输入」，代价是剧作家真的会照着写下去。
 *    `Origin` 与 `Host` 对不上就拒；没有 `Origin` 的不是浏览器（curl、桌面壳），放行。
 * 2. **`content-type: application/json`**——顺带挡掉 `no-cors` 的盲投（那种请求只发简单类型）。
 * 3. **字节上限**——按**字节**数，不是字符数：不这么算的话 8KB 的中文能塞进 24KB 之下。
 * 4. 能解析成 JSON 对象。
 */
async function readJsonBody(req: IncomingMessage, res: ServerResponse): Promise<Record<string, unknown> | null> {
	if (!sameOrigin(req)) {
		sendJson(res, 403, { error: 'cross-origin request rejected' });
		return null;
	}
	if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) {
		sendJson(res, 415, { error: 'content-type must be application/json' });
		return null;
	}

	const chunks: Buffer[] = [];
	let size = 0;
	for await (const chunk of req) {
		const buf = chunk as Buffer;
		size += buf.length;
		if (size > BODY_LIMIT) {
			sendJson(res, 413, { error: 'body too large' });
			return null;
		}
		chunks.push(buf);
	}

	try {
		const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as unknown;
		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
			sendJson(res, 400, { error: 'body must be a JSON object' });
			return null;
		}
		return parsed as Record<string, unknown>;
	} catch {
		sendJson(res, 400, { error: 'body must be JSON' });
		return null;
	}
}

function sameOrigin(req: IncomingMessage): boolean {
	const origin = req.headers.origin;
	if (!origin) return true;
	try {
		return new URL(origin).host === req.headers.host;
	} catch {
		return false;
	}
}

/**
 * 一句台词的音频。
 *
 * 文件名是 `sha1(voiceId + text)`（见 `tts.ts`），内容寻址——同一个文件永远同一段音频，
 * 所以放心让浏览器长缓存：重连补推、快进回看都不会再打一次上游。
 */
async function sendAudio(ctx: Context, res: ServerResponse, sessionId: string, file: string): Promise<void> {
	const play = await loadPlay(sessionWorkspace(ctx, sessionId));
	if (!play) {
		sendJson(res, 404, { error: 'this session has no play' });
		return;
	}
	// 文件名由我们自己生成，但仍然只认「目录内的一个名字」：`file` 里带路径一律拒。
	if (file === '' || file !== basename(file) || !/^[\w.-]+\.mp3$/.test(file)) {
		sendJson(res, 400, { error: 'file must be a plain .mp3 name' });
		return;
	}

	const target = join(play.dir, TTS_CACHE_DIR, file);
	let body: Buffer;
	try {
		body = await readFile(target);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			sendJson(res, 404, { error: `no such audio: ${file}` });
			return;
		}
		throw error;
	}
	res.writeHead(200, {
		'content-type': 'audio/mpeg',
		'content-length': body.length,
		'cache-control': 'public, max-age=31536000, immutable',
	});
	res.end(body);
}

/** 语音控制：总开关与客户端背压。两者都只影响预取，不影响已经合成好的音频。 */
async function acceptVoice(voice: VoiceHost, req: IncomingMessage, res: ServerResponse): Promise<void> {
	if (!sameOrigin(req)) {
		sendJson(res, 403, { error: 'cross-origin request rejected' });
		return;
	}
	const body = await readJsonBody(req, res);
	if (body === null) return;

	const sessionId = typeof body.session === 'string' ? body.session : '';
	if (!sessionId) {
		sendJson(res, 400, { error: 'session is required' });
		return;
	}
	voice.control(sessionId, {
		...(typeof body.enabled === 'boolean' ? { enabled: body.enabled } : {}),
		...(typeof body.paused === 'boolean' ? { paused: body.paused } : {}),
	});
	sendJson(res, 200, { ok: true });
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
	const body = JSON.stringify(payload);
	res.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'content-length': Buffer.byteLength(body),
	});
	res.end(body);
}
