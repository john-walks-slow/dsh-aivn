/**
 * 舞台事件中枢：每会话一条带序号的 IR 流。
 *
 * 舞台管线只有一个出口——剧作家吐出的文本经 DSL 解析成事件，带 seq 落到这里，
 * 再广播给所有订阅了这条会话的舞台视图。视图重连时先补推缓冲里的事件，
 * 于是刷新页面不会把已经演过的部分丢掉。
 *
 * `seq` 从 1 起、单调递增；缓冲有上限，超出的旧事件滚出（长会话不把内存吃光）。
 */
import type { ServerResponse } from 'node:http';
import type { SequencedEvent, StageEvent } from '@aivn/core';

const KEEPALIVE_MS = 15_000;
const BUFFER_LIMIT = 4_000;

export class StageHub {
	private readonly buffers = new Map<string, SequencedEvent[]>();
	private readonly seqs = new Map<string, number>();
	private readonly clients = new Map<string, Set<ServerResponse>>();

	/** 收下一帧事件：标号、入缓冲、广播。 */
	append(sessionId: string, event: StageEvent): SequencedEvent {
		const seq = (this.seqs.get(sessionId) ?? 0) + 1;
		this.seqs.set(sessionId, seq);
		const frame: SequencedEvent = { seq, event };

		const buffer = this.buffers.get(sessionId) ?? [];
		buffer.push(frame);
		if (buffer.length > BUFFER_LIMIT) buffer.splice(0, buffer.length - BUFFER_LIMIT);
		this.buffers.set(sessionId, buffer);

		for (const client of this.clients.get(sessionId) ?? []) writeEvent(client, frame);
		return frame;
	}

	/** 会话已播出的事件（补推用）。 */
	history(sessionId: string): readonly SequencedEvent[] {
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

function writeEvent(res: ServerResponse, frame: SequencedEvent): void {
	res.write(`event: ir\ndata: ${JSON.stringify(frame)}\n\n`);
}
