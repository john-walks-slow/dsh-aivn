/**
 * 舞台的宿主侧路由。四个口，全部按会话分频：
 *
 *   GET  /aivn/health            存活探针
 *   GET  /aivn/play?session=     这个会话的剧目（工作区里有 play.json 才算）
 *   GET  /aivn/assets?session=   剧目里的素材清单与描述
 *   GET  /aivn/asset?session=&path=  剧目内的一件素材
 *   GET  /aivn/stream?session=   IR 帧的 SSE 流，连上先补推已播出的帧
 *   POST /aivn/input             玩家输入：`{session, text, silent?}`，投给剧作家
 *                                （时间线由 tap 接管；`silent` 是不上时间线的空推进）
 */
import { readFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Context } from '@deepseek-ai/cordis';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-host-webserver';
import { contentTypeOf, listAssets, readManifest, resolveInPlay } from './assets';
import type { StageHub } from './hub';
import type { InjectedMessages } from './injected';
import { loadPlay } from './play';
import { resolveAgent, sessionWorkspace } from './session';

const PREFIX = '/aivn';
const BODY_LIMIT = 8 * 1024;

export function installStageRoutes(ctx: Context, hub: StageHub, injected: InjectedMessages): () => void {
	return ctx.webServer.register({
		kind: 'prefix',
		path: PREFIX,
		// **必须自己接住 rejection**：DSH 装了进程级的 `unhandledRejection` 处理，它直接
		// `process.exit(1)`。一个坏掉的 play.json、一次 EISDIR 就能把整台 DSH 连同所有会话杀掉。
		// 这里换个可读的 500 出去，坏的范围就只在用户那一座剧目里。
		handler: (req, res) => {
			handle(ctx, hub, injected, req, res).catch((error: unknown) => fail(res, error));
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
		sendJson(res, 200, play ? { dir: play.dir, config: play.config } : { dir: null });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/assets`) {
		const sessionId = url.searchParams.get('session') ?? '';
		const play = await loadPlay(sessionWorkspace(ctx, sessionId));
		if (!play) {
			sendJson(res, 404, { error: 'this session has no play' });
			return;
		}
		sendJson(res, 200, { index: await listAssets(play.dir), manifest: await readManifest(play.dir) });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/asset`) {
		const sessionId = url.searchParams.get('session') ?? '';
		const relative = url.searchParams.get('path') ?? '';
		await sendAsset(ctx, res, sessionId, relative);
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
	if (!sameOrigin(req)) {
		sendJson(res, 403, { error: 'cross-origin request rejected' });
		return;
	}
	if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) {
		sendJson(res, 415, { error: 'content-type must be application/json' });
		return;
	}

	// 按**字节**数，不是字符数：不这么算的话 8KB 的中文能塞进 24KB 的字符数之下。
	const chunks: Buffer[] = [];
	let size = 0;
	for await (const chunk of req) {
		const buf = chunk as Buffer;
		size += buf.length;
		if (size > BODY_LIMIT) {
			sendJson(res, 413, { error: 'body too large' });
			return;
		}
		chunks.push(buf);
	}

	let sessionId = '';
	let text = '';
	let silent = false;
	try {
		const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
			session?: unknown;
			text?: unknown;
			silent?: unknown;
		};
		if (typeof parsed.session === 'string') sessionId = parsed.session;
		if (typeof parsed.text === 'string') text = parsed.text.trim();
		silent = parsed.silent === true;
	} catch {
		sendJson(res, 400, { error: 'body must be JSON' });
		return;
	}
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
	if (silent) injected.remember(message.id);
	agent.followup(message);
	sendJson(res, 200, { ok: true });
}

/**
 * 这条写请求是不是本页发来的。
 *
 * `/aivn/*` 是插件自己注册的前缀路由，**落在 DSH 的浏览器信任栅栏之外**（那道栅栏只管
 * `/api`），所以得自己挡一层：跨站页面能盲投一条「玩家输入」，代价是剧作家真的会照着写下去。
 *
 * `Origin` 与 `Host` 对不上就拒——同源页面这两个永远一致，跨站一定不一致。没有 `Origin`
 * 的不是浏览器（curl、桌面壳），放行。
 */
function sameOrigin(req: IncomingMessage): boolean {
	const origin = req.headers.origin;
	if (!origin) return true;
	try {
		return new URL(origin).host === req.headers.host;
	} catch {
		return false;
	}
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
	const body = JSON.stringify(payload);
	res.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'content-length': Buffer.byteLength(body),
	});
	res.end(body);
}
