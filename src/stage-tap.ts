/**
 * 剧作家的输出即舞台脚本，剧作家的轮边界即舞台节奏。
 *
 * 三条都只认**剧作家预设**的会话，普通对话与搭台助手说什么都不上台：
 *
 * - `agent/assistant-stream`：文本增量喂进 `@aivn/core` 的 DSL 解析器，解析出的 IR 进中枢。
 *   消息收束（attempt end）时封口，未闭合的包裹标签自动闭合，所以一轮写到一半断了
 *   也不会把已经流出来的台词丢掉。
 * - `agent/status`：轮边界。剧作家起笔/停笔是画面「还在写字 / 写完了，等玩家」的唯一依据——
 *   `beat_done` 没给停止点的那一轮（no_stop）没有任何 IR 可看，边界就是它全部的信号。
 *   不取消息边界（assistant-stream 的 end）是因为一轮里可以有多次消息收束（中途调工具），
 *   那会把一次演出误报成好几次收笔。
 * - `say` 那一束（`say_start` / `say_text` / `say_end`）：同一份 IR 顺手喂给语音管线。
 *   关联键用 **`say_start` 那一帧的 seq**——协议就是这个口径（`ws/protocol.ts`：
 *   「seq = 所属 say 行 say_start 事件的序号，客户端据此关联行」）。
 * - `agent/inbox/inserted`：玩家的每一次输入。DSH 原生输入框与舞台的选肢/自由输入都经
 *   inbox 进 Agent，于是时间线上只有这一处落点，两条路既不会各写一条、也不会漏写。
 *   引擎自己投的那些（追收束、空「继续」）也走这条路，靠 `InjectedMessages` 按 id 摘出去——
 *   它们不是玩家说的话，摆上时间线就是替玩家编了一句台词。
 */
import type { Context } from '@deepseek-ai/cordis';
import { StageDslParser, type StageEvent } from '@aivn/core';
import type {} from '@deepseek-ai/dsh-agent';
import type { UserMessage } from '@deepseek-ai/dsh-llm';
import type { BeatGuard } from './beat-guard';
import type { StageHub } from './hub';
import type { InjectedMessages } from './injected';
import { sessionWorkspace } from './session';
import type { VoiceHost } from './voice-host';
import type { VoicePipeline } from './voice';
import { PLAYWRITER_PRESET, sessionPreset } from './session';

/** 事件载荷都带一层 `{ agent }` 外壳（由 agent 作用域的分发器补上）。 */
interface AgentShell {
	agent: { id: string };
}

/** `agent/assistant-stream` 的载荷；只需用到其中三个字段。 */
interface AssistantStreamPayload extends AgentShell {
	frame:
		| { type: 'start' }
		| { type: 'end' }
		| { type: 'chunk'; chunk: { type: string; text?: string } };
}

interface StatusPayload extends AgentShell {
	status: 'idle' | 'running';
}

interface InboxPayload extends AgentShell {
	message: UserMessage;
}

export function installStageTap(
	ctx: Context,
	hub: StageHub,
	guard: BeatGuard,
	injected: InjectedMessages,
	voice: VoiceHost,
): () => void {
	const parsers = new Map<string, StageDslParser>();
	/** 每会话的语音管线（懒建：这一行的角色没有音色时它什么都不做）。 */
	const voices = new Map<string, VoicePipeline | null>();

	const pipelineFor = (sessionId: string): VoicePipeline | null => {
		if (voices.has(sessionId)) return voices.get(sessionId) ?? null;
		const dir = sessionWorkspace(ctx, sessionId);
		const pipeline = dir ? voice.forSession(sessionId, dir) : null;
		voices.set(sessionId, pipeline);
		return pipeline;
	};

	const parserFor = (sessionId: string): StageDslParser => {
		let parser = parsers.get(sessionId);
		if (!parser) {
			parser = new StageDslParser((event) => {
				const frame = hub.append(sessionId, event);
				if (hasLines(event)) guard.noteLines(sessionId);
				feedVoice(sessionId, event, frame.seq);
			});
			parsers.set(sessionId, parser);
		}
		return parser;
	};

	/** 一行台词喂给语音管线：起行、喂字、封行。其他 IR 与它无关。 */
	const feedVoice = (sessionId: string, event: StageEvent, frameSeq: number): void => {
		if (!voice.available) return;
		if (event.kind === 'say_start') pipelineFor(sessionId)?.lineStart(frameSeq, event.id);
		else if (event.kind === 'say_text') pipelineFor(sessionId)?.feedText(event.delta);
		else if (event.kind === 'say_end') pipelineFor(sessionId)?.lineEnd();
	};

	/** 这条会话是不是舞台上的那一出。不是就整条管线都不碰。 */
	const isPlaywriter = (sessionId: string): boolean =>
		sessionPreset(ctx, sessionId) === PLAYWRITER_PRESET;

	const onFrame = (payload: AssistantStreamPayload): void => {
		const sessionId = payload.agent.id;
		if (!isPlaywriter(sessionId)) return;

		const { frame } = payload;
		if (frame.type === 'end') {
			parserFor(sessionId).endMessage();
			return;
		}
		if (frame.type === 'chunk' && frame.chunk.type === 'text-delta' && frame.chunk.text) {
			parserFor(sessionId).feed(frame.chunk.text);
		}
	};

	const onStatus = (payload: StatusPayload): void => {
		const sessionId = payload.agent.id;
		if (!isPlaywriter(sessionId)) return;
		if (payload.status === 'running') guard.begin(sessionId);
		hub.appendBeat(sessionId, payload.status === 'running' ? 'start' : 'end');
	};

	const onInput = (payload: InboxPayload): void => {
		// 先认领再判会话：引擎投的那几条不该因为预设判断的顺序而漏摘。
		if (injected.claim(payload.message.id)) return;

		const sessionId = payload.agent.id;
		if (!isPlaywriter(sessionId)) return;

		const text = messageText(payload.message);
		if (text) hub.append(sessionId, { kind: 'player_input', text });
	};

	/**
	 * 会话收摊：解析器、语音管线、轮状态都丢。
	 *
	 * 这三样都是**流式过程里的状态**：agent 没了，半行文本、分句器、在飞的合成、这一轮追没追过
	 * 就都没有意义了；不丢的话每开过一条会话都在进程里留一份，长跑只涨不落。
	 *
	 * 中枢的帧缓冲**不丢**：会话关掉再打开时，舞台靠它把已经演过的部分重放出来。
	 */
	const onDisposed = (payload: AgentShell): void => {
		const sessionId = payload.agent.id;
		parsers.delete(sessionId);
		voices.delete(sessionId);
		voice.disposeSession(sessionId);
		guard.forget(sessionId);
	};

	const offFrame = ctx.on('agent/assistant-stream', onFrame);
	const offStatus = ctx.on('agent/status', onStatus);
	const offInput = ctx.on('agent/inbox/inserted', onInput);
	const offDisposed = ctx.on('agent/disposed', onDisposed);

	return () => {
		offFrame();
		offStatus();
		offInput();
		offDisposed();
		parsers.clear();
		voices.clear();
	};
}

/**
 * 这一帧算不算「台上真说了话」。
 *
 * 认文本增量（say / narrate / thought）而**不认控制指令**（scene / actor / sfx / cg）：
 * 只换了个背景、只调了一次立绘，舞台上仍然什么都没有，追收束去要一个停止点没有意义。
 * 与 AIVN `orchestrator.ts` 的 `beatHasLines` 同一个口径。
 */
function hasLines(event: StageEvent): boolean {
	if (event.kind === 'say_text' || event.kind === 'narrate_text' || event.kind === 'thought_text') {
		return event.delta.trim() !== '';
	}
	return false;
}

/**
 * 一条 user 消息里的纯文本。
 *
 * 玩家的输入按定义是文本（舞台的输入框、选肢卡都只给得出文本），消息里若混进图片等
 * 非文本块就跳过——舞台没地方摆它，硬塞成一行等于替玩家说了一句他没说的话。
 * 多个文本块（正常只有一块）按空行拼起来，不丢玩家的字。
 */
function messageText(message: UserMessage): string {
	return message.content
		.filter((block): block is { type: 'text'; text: string } => block.type === 'text')
		.map((block) => block.text)
		.join('\n\n')
		.trim();
}
