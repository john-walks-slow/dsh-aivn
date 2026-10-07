/**
 * 剧作家的输出即舞台脚本，剧作家的轮边界即舞台节奏。
 *
 * 三条都只认**剧作家预设**的会话，普通对话与搭台助手说什么都不上台：
 *
 * - `agent/assistant-stream`：文本增量喂进 `@aivn/core` 的 DSL 解析器，解析出的 IR 进中枢。
 *   消息收束（attempt end）时封口，未闭合的包裹标签自动闭合，所以一轮写到一半断了
 *   也不会把已经流出来的台词丢掉。
 * - `agent/status`：轮边界。剧作家起笔/停笔是画面「还在写字 / 写完了，等玩家」的唯一依据——
 *   `<stop/>`（自然演完）的那一轮没有任何 IR 可看，边界就是它全部的信号。
 *   不取消息边界（assistant-stream 的 end）是因为一轮里可以有多次消息收束（中途调工具），
 *   那会把一次演出误报成好几次收笔。
 * - `say` 那一束（`say_start` / `say_text` / `say_end`）：同一份 IR 顺手喂给语音管线。
 *   关联键用 **`say_start` 那一帧的 seq**——协议就是这个口径（`ws/protocol.ts`：
 *   「seq = 所属 say 行 say_start 事件的序号，客户端据此关联行」）。
 * - `agent/inbox/inserted`：玩家的每一次输入。DSH 原生输入框与舞台的选肢/自由输入都经
 *   inbox 进 Agent，于是时间线上只有这一处落点，两条路既不会各写一条、也不会漏写。
 *   引擎自己投的那些（开局指令、导演指令、空「继续」）也走这条路，靠 `InjectedMessages`
 *   按 id 摘出去——它们不是玩家说的话，摆上时间线就是替玩家编了一句台词。
 * - 玩家的**第一条**消息：顺手把剧目的开局指令（`play.json` 的 `opening`）补进去，与玩家
 *   那一句同轮送到，见 `openPlay`。
 */
import type { Context } from '@deepseek-ai/cordis';
import { StageDslParser, type EndingAttrs, type StageEvent } from '@aivn/core';
import type {} from '@deepseek-ai/dsh-agent';
import { createUserMessage, type UserMessage } from '@deepseek-ai/dsh-llm';
import type { StageHub } from './hub';
import type { InjectedMessages } from './injected';
import type { EndingsLedger } from './ledger';
import { loadPlaySync, type Play } from './play';
import { resetPlayState } from './play-state';
import type { VoiceHost } from './voice-host';
import type { VoicePipeline } from './voice';
import { attachedAgent, PLAYWRITER_PRESET, sessionPreset, sessionWorkspace, type LiveAgent } from './session';

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

interface InboxPayload {
	agent: LiveAgent;
	message: UserMessage;
}

/** 一条会话的终局 / 收束进度。 */
interface SessionFlow {
	/** 已到达结局：终局态（拦玩家输入）。 */
	ended: boolean;
	/** 最近一条结局 id：收束散文落地时回填账本用它。 */
	endingId: string | null;
	/** 本会话正在累积的收束散文。 */
	epilogue: string;
	/** 收束指令投过没有（每条会话只投一次）。 */
	summaryAsked: boolean;
}

export function installStageTap(
	ctx: Context,
	hub: StageHub,
	injected: InjectedMessages,
	voice: VoiceHost,
	ledger: EndingsLedger,
): StageTap {
	const parsers = new Map<string, StageDslParser>();
	/** 每会话的语音管线（懒建：这一行的角色没有音色时它什么都不做）。 */
	const voices = new Map<string, VoicePipeline | null>();
	/** 每会话的终局 / 收束进度。 */
	const flows = new Map<string, SessionFlow>();
	/** 已经登记过「新周目开始」的会话（onInput 一轮里可能被调多次）。 */
	const begun = new Set<string>();

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
				feedVoice(sessionId, event, frame.seq);
				trackEvent(sessionId, event, true);
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

	const flowFor = (sessionId: string): SessionFlow => {
		let flow = flows.get(sessionId);
		if (!flow) {
			flow = { ended: false, endingId: null, epilogue: '', summaryAsked: false };
			flows.set(sessionId, flow);
		}
		return flow;
	};

	/**
	 * 把一帧 IR 喂给终局 / 收束跟踪。**实时（`live`）与重建都会调**——重建时也要重推出「已结局」，
	 * 否则刷新 / 分支 / 冷开之后终局态就丢了。两者的区别只有写副作用：`live` 才落账、才投收束指令；
	 * 重建（`live=false`）纯粹重放，绝不重复记账。
	 */
	const trackEvent = (sessionId: string, event: StageEvent, live: boolean): void => {
		const flow = flowFor(sessionId);
		switch (event.kind) {
			case 'ending': {
				flow.ended = true;
				flow.endingId = event.id;
				flow.epilogue = '';
				if (!live) break;
				const dir = sessionWorkspace(ctx, sessionId);
				if (dir) ledger.recordEnding(dir, sessionId, event);
				askSummary(sessionId, event);
				break;
			}
			case 'epilogue_start':
				flow.epilogue = '';
				break;
			case 'epilogue_text':
				flow.epilogue += event.delta;
				break;
			case 'epilogue_end': {
				if (!live || !flow.endingId) break;
				const dir = sessionWorkspace(ctx, sessionId);
				if (dir) ledger.recordSummary(dir, flow.endingId, flow.epilogue);
				break;
			}
		}
	};

	/**
	 * 结局之后的收束指令：排进**下一轮**（`followup`，不是同轮的 `inject`），并登记摘除——舞台不会
	 * 把它当成一行玩家台词。判定按 `message.id`（见 `injected.ts`），不是正文比对。
	 */
	const askSummary = (sessionId: string, ending: EndingAttrs): void => {
		const flow = flowFor(sessionId);
		if (flow.summaryAsked) return;
		const agent = attachedAgent(ctx, sessionId);
		if (!agent) return;
		flow.summaryAsked = true;
		const message = createUserMessage({
			content: [{ type: 'text', text: summaryInstruction(ending) }],
			source: { kind: 'user' },
		});
		injected.remember(sessionId, message.id);
		agent.followup(message);
	};

	/**
	 * 新周目开始（空会话面的新会话第一句话）：账本记一个周目、把剧内状态重置回起点（`play-state`）。
	 * 由 `openPlay` 调用，按 sessionId 幂等。重置失败只告警，不挡新周目——状态差一点总比演不起来好。
	 */
	const beginPlaythrough = (sessionId: string, play: Play): void => {
		if (begun.has(sessionId)) return;
		begun.add(sessionId);
		ledger.beginPlaythrough(play.dir, sessionId);
		try {
			resetPlayState(play);
		} catch (error) {
			ctx.logger.warn(
				`[dsh-aivn] 重置剧内状态失败（新周目仍照常开始）：${error instanceof Error ? error.message : String(error)}`,
			);
		}
	};

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
		hub.appendBeat(sessionId, payload.status === 'running' ? 'start' : 'end');
	};

	const onInput = (payload: InboxPayload): void => {
		// 先认领再判会话：引擎投的那几条不该因为预设判断的顺序而漏摘。
		if (injected.claim(payload.agent.id, payload.message.id)) return;

		const sessionId = payload.agent.id;
		if (!isPlaywriter(sessionId)) return;

		// 终局：拒绝玩家继续——出口交给 DSH 的「在新对话中分支」或新会话。
		// 引擎自己的收束指令已在上面按 id 摘除，不受这道闸影响。
		if (flowFor(sessionId).ended) return;

		const text = messageText(payload.message);
		if (!text) return;

		hub.append(sessionId, { kind: 'player_input', text });
		openPlay(sessionId, payload.agent, text);
	};

	/**
	 * 玩家的第一条消息：把剧目的开局指令一并补进去。
	 *
	 * `opening` 在引擎里就是「开局那条 user 消息的正文」（缺省「（游戏开始，请演出第一轮）」），
	 * AIVN 里由玩家按下「开演」发出去。DSH 这边玩家先说话——会话空着时连 tab 列都没有，
	 * 舞台上的「开演」够不着——所以开局指令跟着第一条消息走。
	 *
	 * **必须投进 `next-step`，不能 `followup`**：一轮开始时宿主只从 `next-turn` 认领**一条**
	 * 消息（`claim` 里下一轮那一格的 deleteCount 就是 1），排第二的那条要等下一轮——玩家会看见
	 * 剧作家把第一轮演完之后又无端演一遍。`next-step` 是整批认领的，且在下一轮那条之前，于是
	 * 它与玩家的第一句落在**同一个请求**里，开局指令还排在前面。
	 *
	 * 投递在**同一条同步链**上：宿主正是在 `inbox.splice()` 里发 `agent/inbox/inserted`、之后
	 * 才唤醒驱动器，所以此刻补进去的这条赶得上同一轮的第一步。读剧目也因此用同步版
	 * （`loadPlaySync`）——异步读一趟回来，驱动器已经起了。
	 *
	 * 判据是「这条会话还没有任何模型可见的历史」：重启后恢复的会话带着整份日志，不会再补一次。
	 * 玩家自己就把开局那句说了（与 `opening` 逐字相同）也不补——同一轮里同一句话出现两次，
	 * 剧作家只会把第一轮演两遍。投出去的这条登记进 `InjectedMessages`：它和引擎自己的推进
	 * 一样不是玩家说的话，摆上时间线就是替玩家编了一句台词。
	 */
	const openPlay = (sessionId: string, agent: LiveAgent, playerText: string): void => {
		if ((agent.session?.surface?.nodes.length ?? 1) !== 0) return;

		const play = loadPlaySync(sessionWorkspace(ctx, sessionId));
		if (!play) return;

		// 空会话面 = 新周目：记一个周目号 + 把剧内状态重置回起点（幂等）。
		// 必须在注入开局指令之前——A 区【状态】快照第一轮就会读这三个文件。
		beginPlaythrough(sessionId, play);

		const opening = play.config.opening.trim();
		if (!opening || opening === playerText) return;

		const message = createUserMessage({ content: [{ type: 'text', text: opening }], source: { kind: 'user' } });
		injected.remember(sessionId, message.id);
		agent.inject(message);
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
		flows.delete(sessionId);
		begun.delete(sessionId);
		voice.disposeSession(sessionId);
		injected.forget(sessionId);
		ledger.forget(sessionId);
	};

	const offFrame = ctx.on('agent/assistant-stream', onFrame);
	const offStatus = ctx.on('agent/status', onStatus);
	const offInput = ctx.on('agent/inbox/inserted', onInput);
	const offDisposed = ctx.on('agent/disposed', onDisposed);

	return {
		dispose: () => {
			offFrame();
			offStatus();
			offInput();
			offDisposed();
			parsers.clear();
			voices.clear();
			flows.clear();
			begun.clear();
		},
		forgetParser: (sessionId) => {
			// 重建把这条会话的帧流整个换掉了，解析器手里那半行文本（以及没闭合的包裹标签）
			// 属于上一版内容：留着它，下一段增量会接着旧状态吐 IR。语音管线同理。
			parsers.delete(sessionId);
			voices.delete(sessionId);
			voice.disposeSession(sessionId);
		},
		hasEnded: (sessionId) => flowFor(sessionId).ended,
		// 重建（`stage-log`）重放助手文本时调它重推终局标记；`live=false` 表示只重放、不落账。
		noteEvent: (sessionId, event) => trackEvent(sessionId, event, false),
		// 重建开始前清掉上一遍推出来的终局 / 收束标记：回退掉结局那一拍后不再有 ending 事件，
		// 终局据此正确退出；旧标记不清的话它会一直挂着，把玩家永久锁在门外。
		resetTerminal: (sessionId) => {
			const flow = flows.get(sessionId);
			if (!flow) return;
			flow.ended = false;
			flow.endingId = null;
			flow.epilogue = '';
			flow.summaryAsked = false;
		},
	};
}

/**
 * 舞台管线的把手：装配期拿它转交给 `stage-log`（重建后要丢解析器）。
 *
 * `hasEnded` / `noteEvent` 是结局这条线的两个出口：前者给路由拦终局后的玩家输入，后者让
 * **重建**也能重推终局态（冷开 / 分支 / 回看之后「已结局」不丢），但绝不重复落账。
 */
export interface StageTap {
	dispose(): void;
	/** 这条会话的流式解析器与语音管线作废（会话被重投影了）。 */
	forgetParser(sessionId: string): void;
	/** 这条会话是否已到达结局（终局态：拒绝玩家继续）。 */
	hasEnded(sessionId: string): boolean;
	/** 重建开始前清掉终局 / 收束标记（回退掉结局那一拍后终局正确退出）。 */
	resetTerminal(sessionId: string): void;
	/** 重建期间重放一帧 IR：只重推终局 / 收束状态，不落账。 */
	noteEvent(sessionId: string, event: StageEvent): void;
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

/**
 * 收束指令的正文（一条括号里的舞台指示，口径见《演出契约》）。
 *
 * 它只知道结局的标题；收束散文要回顾的是**这一周目**的旅程，而那段历史就在剧作家自己的上下文里，
 * 不必由引擎复述。要点三条：单独一轮、只写 `<epilogue>`、写完停笔（不再给停止点）。
 */
function summaryInstruction(ending: EndingAttrs): string {
	const title = ending.title?.trim() || ending.id;
	return (
		`（结局已到达：${title}。请为这一周目写一段收束全文的散文总结，` +
		'作为 <epilogue>…</epilogue> 输出：回顾这段旅程、点出主题与代价，' +
		'不要写新对白、不要推进剧情、不要再给停止点。写完就停笔。）'
	);
}
