/**
 * 舞台事件中枢：每会话一条带序号的帧流。
 *
 * 舞台管线只有一个出口——剧作家吐出的文本经 DSL 解析成 IR，工具交出的停止点也走同一条，
 * 两样都带 seq 落到这里，再广播给所有订阅了这条会话的舞台视图。视图重连时先补推缓冲里的帧，
 * 于是刷新页面不会把已经演过的部分丢掉。
 *
 * `seq` 从 1 起、单调递增；缓冲有上限，超出的旧帧滚出（长会话不把内存吃光）。
 */
import type { ServerResponse } from 'node:http';
import type { StageEvent } from '@aivn/core';

const KEEPALIVE_MS = 15_000;
const BUFFER_LIMIT = 4_000;

/** 这一轮的生命周期：剧作家起笔 / 停笔。 */
export type BeatState = 'start' | 'end';

/**
 * 中枢上的一帧。
 *
 * - `ir`：舞台 IR。DSL 解析出来的事件、与工具交出的停止点（`beat_done`）在这一路，
 *   两者完全同构，画面不分出处。
 * - `beat`：剧作家的轮边界。画面据此区分「还在写字」与「写完了，等玩家」——
 *   `no_stop` 的轮（剧作家没给停止点就收笔）没有 IR 可看，边界是它唯一的信号。
 */
export type StageFrame = StageFrameBody & { seq: number };

/** 帧的正文部分：还没标号的那一段（`seq` 由中枢统一发）。 */
type StageFrameBody =
	| { kind: 'ir'; event: StageEvent }
	| { kind: 'beat'; state: BeatState };

export class StageHub {
	private readonly buffers = new Map<string, StageFrame[]>();
	private readonly seqs = new Map<string, number>();
	private readonly clients = new Map<string, Set<ServerResponse>>();

	/** 收下一帧舞台 IR：标号、入缓冲、广播。 */
	append(sessionId: string, event: StageEvent): StageFrame {
		return this.push(sessionId, { kind: 'ir', event });
	}

	/** 收下一帧轮边界。 */
	appendBeat(sessionId: string, state: BeatState): StageFrame {
		return this.push(sessionId, { kind: 'beat', state });
	}

	private push(sessionId: string, frame: StageFrameBody): StageFrame {
		const seq = (this.seqs.get(sessionId) ?? 0) + 1;
		this.seqs.set(sessionId, seq);
		const framed: StageFrame = { seq, ...frame };

		const buffer = this.buffers.get(sessionId) ?? [];
		buffer.push(framed);
		if (buffer.length > BUFFER_LIMIT) buffer.splice(0, buffer.length - BUFFER_LIMIT);
		this.buffers.set(sessionId, buffer);

		for (const client of this.clients.get(sessionId) ?? []) writeEvent(client, framed);
		return framed;
	}

	/** 会话已播出的帧（补推用）。 */
	history(sessionId: string): readonly StageFrame[] {
		return this.buffers.get(sessionId) ?? [];
	}

	/**
	 * 把一条 SSE 连接接上这条会话：回完响应头先补推历史，再跟实时。
	 * 返回解绑函数，调用方在连接关闭时务必执行。
	 */
	subscribe(sessionId: string, res: ServerResponse): () => void {
		res.writeHead(200, {
			'content-type': 'text/event-stream; charset=utf-8',
			'cache-control': 'no-cache, no-transform',
			connection: 'keep-alive',
			'x-accel-buffering': 'no',
		});
		res.write(': open\n\n');
		for (const frame of this.history(sessionId)) writeEvent(res, frame);

		const clients = this.clients.get(sessionId) ?? new Set<ServerResponse>();
		clients.add(res);
		this.clients.set(sessionId, clients);

		const keepalive = setInterval(() => res.write(': keepalive\n\n'), KEEPALIVE_MS);
		return () => {
			clearInterval(keepalive);
			clients.delete(res);
			if (clients.size === 0) this.clients.delete(sessionId);
		};
	}
}

function writeEvent(res: ServerResponse, frame: StageFrame): void {
	res.write(`event: ir\ndata: ${JSON.stringify(frame)}\n\n`);
}
