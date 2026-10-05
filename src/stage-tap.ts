/**
 * 剧作家的输出即舞台脚本。
 *
 * 助手流的文本增量喂进 `@aivn/core` 的 DSL 解析器，解析出的事件带序号进中枢；
 * 消息收束（attempt end）时封口，未闭合的包裹标签自动闭合，所以一轮写到一半断了
 * 也不会把已经流出来的台词丢掉。
 *
 * 只接剧作家预设的会话：普通对话、搭台助手说什么都不上台。
 */
import type { Context } from '@deepseek-ai/cordis';
import { StageDslParser } from '@aivn/core';
import type {} from '@deepseek-ai/dsh-agent';
import type { StageHub } from './hub';
import { PLAYWRITER_PRESET, sessionPreset } from './session';

/** `agent/assistant-stream` 的载荷；只需用到其中三个字段。 */
interface AssistantStreamPayload {
	agent: { id: string };
	frame:
		| { type: 'start' }
		| { type: 'end' }
		| { type: 'chunk'; chunk: { type: string; text?: string } };
}

export function installStageTap(ctx: Context, hub: StageHub): () => void {
	const parsers = new Map<string, StageDslParser>();

	const parserFor = (sessionId: string): StageDslParser => {
		let parser = parsers.get(sessionId);
		if (!parser) {
			parser = new StageDslParser((event) => hub.append(sessionId, event));
			parsers.set(sessionId, parser);
		}
		return parser;
	};

	const onFrame = (payload: AssistantStreamPayload): void => {
		const sessionId = payload.agent.id;
		if (sessionPreset(ctx, sessionId) !== PLAYWRITER_PRESET) return;

		const { frame } = payload;
		if (frame.type === 'end') {
			parserFor(sessionId).endMessage();
			return;
		}
		if (frame.type === 'chunk' && frame.chunk.type === 'text-delta' && frame.chunk.text) {
			parserFor(sessionId).feed(frame.chunk.text);
		}
	};

	const dispose = ctx.on('agent/assistant-stream', onFrame) as () => void;
	return () => {
		dispose();
		parsers.clear();
	};
}
