/**
 * 舞台的宿主侧路由。四个口，全部按会话分频：
 *
 *   GET  /aivn/health            存活探针
 *   GET  /aivn/play?session=     这个会话的剧目（工作区里有 play.json 才算）
 *   GET  /aivn/stream?session=   IR 事件的 SSE 流，连上先补推已播出的事件
 *   POST /aivn/input             玩家输入：进时间线，同时投给剧作家
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Context } from '@deepseek-ai/cordis';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-host-webserver';
import type { StageHub } from './hub';
import { loadPlay } from './play';
import { resolveAgent, sessionWorkspace } from './session';

const PREFIX = '/aivn';
const BODY_LIMIT = 8 * 1024;

export function installStageRoutes(ctx: Context, hub: StageHub): () => void {
	return ctx.webServer.register({
		kind: 'prefix',
		path: PREFIX,
		handler: (req, res) => void handle(ctx, hub, req, res),
	});
}

async function handle(ctx: Context, hub: StageHub, req: IncomingMessage, res: ServerResponse): Promise<void> {
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
	if (req.method === 'GET' && url.pathname === `${PREFIX}/stream`) {
		openStream(hub, url, req, res);
		return;
	}
	if (req.method === 'POST' && url.pathname === `${PREFIX}/input`) {
		await acceptInput(ctx, hub, req, res);
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

/** 玩家的一次输入：先作为时间线上的一帧广播（回执、回看都靠它），再投给剧作家。 */
async function acceptInput(ctx: Context, hub: StageHub, req: IncomingMessage, res: ServerResponse): Promise<void> {
	let raw = '';
	for await (const chunk of req) {
		raw += chunk;
		if (raw.length > BODY_LIMIT) {
			sendJson(res, 413, { error: 'body too large' });
			return;
		}
	}

	let sessionId = '';
	let text = '';
	try {
		const parsed = JSON.parse(raw || '{}') as { session?: unknown; text?: unknown };
		if (typeof parsed.session === 'string') sessionId = parsed.session;
		if (typeof parsed.text === 'string') text = parsed.text.trim();
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

	hub.append(sessionId, { kind: 'player_input', text });
	agent.followup(createUserMessage({ content: [{ type: 'text', text }], source: { kind: 'user' } }));
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
