import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-host-webserver';
import { phaseZeroScript } from './script';

const PREFIX = '/aivn';
const KEEPALIVE_MS = 15_000;
const BODY_MAX_BYTES = 8 * 1024;
/** 一段脚本放完之后停一会儿再重播，好让停止点与回执有个稳定的观察窗口。 */
const LOOP_PAUSE_MS = 8_000;

/**
 * 舞台的宿主侧路由。Phase 0 只有三个口：
 *
 *   GET  /aivn/health   存活探针
 *   GET  /aivn/stream   IR 事件的 SSE 流（每会话一条；Phase 0 无会话参数）
 *   POST /aivn/input    玩家输入回执
 *
 * Phase 1 起 stream 会按 sessionId 分频道，并在连接时补推历史事件。
 */
export function installStageRoutes(ctx: Context): () => void {
	return ctx.webServer.register({
		kind: 'prefix',
		path: PREFIX,
		handler: handle,
	});
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
	const url = new URL(req.url ?? '/', 'http://127.0.0.1');

	if (req.method === 'GET' && url.pathname === `${PREFIX}/health`) {
		sendJson(res, 200, { ok: true, plugin: 'dsh-aivn' });
		return;
	}
	if (req.method === 'GET' && url.pathname === `${PREFIX}/stream`) {
		openStream(req, res);
		return;
	}
	if (req.method === 'POST' && url.pathname === `${PREFIX}/input`) {
		await acceptInput(req, res);
		return;
	}
	sendJson(res, 404, { error: `no such route: ${req.method} ${url.pathname}` });
}

function openStream(req: IncomingMessage, res: ServerResponse): void {
	res.writeHead(200, {
		'content-type': 'text/event-stream; charset=utf-8',
		'cache-control': 'no-cache, no-transform',
		connection: 'keep-alive',
		'x-accel-buffering': 'no',
	});
	res.write(': open\n\n');

	const frames = phaseZeroScript();
	let closed = false;
	let index = 0;
	let seq = 0;
	let timer: NodeJS.Timeout | undefined;

	const keepalive = setInterval(() => {
		if (!closed) res.write(': keepalive\n\n');
	}, KEEPALIVE_MS);

	const stop = () => {
		if (closed) return;
		closed = true;
		clearInterval(keepalive);
		if (timer) clearTimeout(timer);
	};

	const step = () => {
		if (closed) return;
		if (index >= frames.length) {
			index = 0;
			seq = 0;
			timer = setTimeout(step, LOOP_PAUSE_MS);
			return;
		}
		const frame = frames[index++];
		seq += 1;
		res.write(`event: ir\ndata: ${JSON.stringify({ seq, event: frame.event })}\n\n`);
		timer = setTimeout(step, frame.delay);
	};

	req.on('close', stop);
	res.on('close', stop);
	step();
}

async function acceptInput(req: IncomingMessage, res: ServerResponse): Promise<void> {
	let raw = '';
	for await (const chunk of req) {
		raw += chunk;
		if (raw.length > BODY_MAX_BYTES) {
			sendJson(res, 413, { error: 'body too large' });
			return;
		}
	}

	let text = '';
	try {
		const parsed = JSON.parse(raw || '{}') as { text?: unknown };
		if (typeof parsed.text === 'string') text = parsed.text.slice(0, 500);
	} catch {
		sendJson(res, 400, { error: 'body must be JSON' });
		return;
	}
	if (!text.trim()) {
		sendJson(res, 400, { error: 'text is required' });
		return;
	}
	sendJson(res, 200, { ok: true, text, echo: `（Phase 0 回执）${text}` });
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
	const body = JSON.stringify(payload);
	res.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'content-length': Buffer.byteLength(body),
	});
	res.end(body);
}
