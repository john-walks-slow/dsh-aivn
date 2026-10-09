/**
 * 舞台帧流的**重建**：把「这条会话现在长什么样」重新铺成一条帧流。
 *
 * 为什么需要它：中枢的帧流是**只增**的——剧作家吐一句就追加一帧，回退、改写、换分支都不
 * 会把它收回去。而会话的事件日志是权威：回退是往日志里追加一条 `surfaceOp.replace` 的标记
 * （`dsh-rewind` 就是这么干的），分支是新的会话带着父会话的前缀。两者一旦分叉，舞台就会
 * 一直演着一段会话里已经不存在的内容。
 *
 * 于是这条规矩：**会话面（`session.surface`）才是舞台的真相源**，帧流只是它的一遍投影。
 * 结构性变更之后整条重投影一次：
 *
 *   - 回退、导演重写（都是追加替换标记）：听 `session/event`；
 *   - 分支出来的新会话、宿主重启后的会话：SSE 新连接发现这条会话一帧都没有（`ensure`）；
 *   - 服务端主动做完一次结构性动作：见 `director.ts`。
 *
 * 重投影推给客户端的是「前面推的一切作废」的 `reset` 帧 + 一整条新帧流（见 `hub.reset`）。
 *
 * 语音一并补，但**只补盘上已经有的**（内容寻址，见 `tts.ts`）：重放旧台词不该再打一次 TTS。
 */
import { StageDslParser, type StageEvent } from '@aivn/core';
import type { Context } from '@deepseek-ai/cordis';
import { isReplacementSurfaceEvent, type SessionEvent, type SessionId } from '@deepseek-ai/dsh-session';
import type { Message } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-api-session-controller';
import type { GuideFrameItem, StageHub } from '../hub';
import type { InjectedMessages } from '../injected';
import { loadPlaySync } from '../play/play';
import {
	attachedAgent,
	PLAYWRITER_PRESET,
	resolveAgent,
	sessionPreset,
	sessionWorkspace,
	type LiveSession,
} from '../session';
import type { VoiceHost } from '../voice/voice-host';

/**
 * 这条替换算不算**时间旅行**（有人把上下文拨回到某个点）。
 *
 * 三种替换都长着同一张脸（`surfaceOp.replace`），但只有一种该让舞台跟着重投影：
 *
 * - **回退**（`dsh-rewind` 的标记）、**导演重写**（`director.ts` 的标记）：是 `user/message`，
 *   要重建——「上面那段作废了」正是要让舞台也把它抹掉。
 * - **上下文压缩**（`compact-checkpoint`）：也是 `user/message` 替换，但**不重建**——它摘掉的是
 *   模型上下文里的中间那段，那些戏**早就演过了**；舞台是演出记录，不该因为上下文压缩把演过的戏删掉。
 * - **系统提示词 / 工具表的重投影**：`system/message`、`developer/message` 的替换，与剧本无关，
 *   而且每开一个新的请求序列都会来一条（2026-10-06 实测：改写之后紧跟的那一步就有一条）。
 *
 * 未知来源的 `user/message` 替换按时间旅行算：那样的重建总是安全的（内容确实变了），
 * 而漏掉一次时间旅行会让舞台一直演着会话里已经不存在的东西。
 */
function isTimeTravel(event: SessionEvent): boolean {
	if (!isReplacementSurfaceEvent(event)) return false;
	if (event.type !== 'user/message') return false;
	// 声明里没有 `compact-checkpoint`（那一支由压缩插件自己合并进来），所以按字符串比。
	const kind: string = event.data.source.kind;
	return kind !== 'compact-checkpoint';
}

/** 重建要的那几件外设。 */
export interface RebuildDeps {
	hub: StageHub;
	injected: InjectedMessages;
	voice: VoiceHost;
	/** 这一局的根目录（没有就拿不到语音缓存）。 */
	playDir?: string | undefined;
	/** 重建完叫一声，让实时那一路把流式解析器丢掉（它的半行文本已经作废）。 */
	onRebuilt?: ((sessionId: string) => void) | undefined;
	/**
	 * 重放之前叫一声：把上一轮重推导出的终局标记清掉，好让这一遍重放从头推。
	 *
	 * 顺序是「先清、后重放、末尾再 `onRebuilt`」——回退掉结局那一拍时，清掉之后再没有 ending
	 * 事件，终局就正确退出了；分支 / 冷开带着结局前缀时，重放会把标记重新推回来。
	 */
	onRebuildStart?: ((sessionId: string) => void) | undefined;
	/**
	 * 重放的每一帧都转交一份（`stage-tap` 的终局跟踪）。
	 *
	 * 重建只重放、不落账——它是给「冷开 / 分支 / 回看后重推出终局态」用的，重复记账在这里被挡掉。
	 */
	onEvent?: ((sessionId: string, event: StageEvent) => void) | undefined;
	/** 提示队列的现值（导演排的话）。重置帧把客户端那份清了，这里补一帧回来。 */
	pendingGuides?: ((sessionId: string) => readonly GuideFrameItem[]) | undefined;
}

/**
 * 把一条会话重投影成一条新帧流。
 *
 * `running` 是重建这一刻 Agent 在不在跑，两处都要用：末尾补的那一帧轮边界据此选
 * `start`/`end`（否则「剧作家正在落笔」与「写完了，等你」会停在重建前的那个状态上），
 * 重置帧也带着它（客户端据此决定换代后要不要把末尾那句摆上台词条，见 `hub.reset`）。
 */
export function rebuildStage(
	sessionId: string,
	session: LiveSession,
	running: boolean,
	deps: RebuildDeps,
): void {
	const { hub, injected, voice } = deps;
	hub.reset(sessionId, running);
	// 上一遍重推导出的终局标记先清掉，这一遍重放从头推（见 `RebuildDeps.onRebuildStart`）。
	deps.onRebuildStart?.(sessionId);
	// 重置帧会让客户端把提示队列一并清掉（那是上一版内容的一部分）；队列在导演手里，
	// 与舞台内容无关，所以紧接着补一帧现值回去。
	hub.appendGuide(sessionId, deps.pendingGuides?.(sessionId) ?? []);

	const events = new Map(session.snapshotEvents().map((event) => [event.seq, event] as const));
	const lines: VoicedLine[] = [];
	let current: VoicedLine | null = null;

	/** 与实时那一路同一个解析器：重建出来的 IR 与流式写字时逐帧同构。 */
	const parser = new StageDslParser((event) => {
		const frame = hub.append(sessionId, event);
		current = collectLine(event, frame.seq, current);
		if (event.kind === 'say_end' && current !== null) {
			lines.push(current);
			current = null;
		}
		deps.onEvent?.(sessionId, event);
	});

	for (const seq of session.surface.nodes) {
		const event = events.get(seq);
		if (!event) continue;
		// `session.deriveEventMessage` 而不是裸的 `deriveEventMessage`：前者把插件登记的消息投影
		// （别的插件改过内容的那种）也应用上，重建出来的才是模型真正看到的那份。
		const message = session.deriveEventMessage(event);
		if (!message) continue;

		if (event.type === 'assistant/message') {
			const text = textOf(message);
			if (text !== '') {
				parser.feed(text);
				parser.endMessage();
			}
			continue;
		}
		if (event.type !== 'user/message') continue;
		// 玩家说过的话才上时间线。引擎自己投的（开局指令、继续、导演指令）不算——
		// 与实时那一路同一个口径，见 `injected.ts`。
		if (injected.claim(sessionId, message.id)) continue;
		if (message.source.kind !== 'user') continue;
		const text = textOf(message);
		if (text !== '') hub.append(sessionId, { kind: 'player_input', text });
	}

	// 语音：盘上有就补一帧「好了」（重听按钮因而照常），没有就留白。
	if (deps.playDir !== undefined) voice.replayCached(sessionId, deps.playDir, lines);

	hub.appendBeat(sessionId, running ? 'start' : 'end');
	deps.onRebuilt?.(sessionId);
}

/** 重建时顺手收下的一行：语音补发要知道「哪一帧的行、谁说的、说了什么」。 */
export interface VoicedLine {
	/** 这一行 `say_start` 那一帧的 seq（协议口径，见 `hub.ts`）。 */
	lineSeq: number;
	/** 说话的角色 id。 */
	charId: string;
	/** 整行正文（分句要从它算，才拼得出缓存文件名）。 */
	text: string;
}

/** 把一帧 IR 并进正在收集的那一行；返回更新后的行。 */
function collectLine(event: StageEvent, frameSeq: number, line: VoicedLine | null): VoicedLine | null {
	switch (event.kind) {
		case 'say_start':
			return { lineSeq: frameSeq, charId: event.id, text: '' };
		case 'say_text':
			return line === null ? null : { ...line, text: line.text + event.delta };
		default:
			return line;
	}
}

/** 一条消息里的纯文本。非文本块（图片等）舞台没地方摆，跳过。 */
function textOf(message: Message): string {
	return message.content
		.filter((block): block is { type: 'text'; text: string } => block.type === 'text')
		.map((block) => block.text)
		.join('\n')
		.trim();
}

/** 重建要的那几件外设，装配期给一次。 */
export interface StageLogDeps extends Omit<RebuildDeps, 'playDir'> {}

/**
 * 「会话面 → 帧流」的守门人：谁来问、什么时候重投影，都从这里过。
 *
 * 它只认**剧作家预设**的会话（与 `stage-tap` 同一个口径）：其他会话的工作目录里就算躺着
 * 一份 play.json，也不该被这个插件搬上台。
 */
export class StageLog {
	private readonly ensuring = new Map<string, Promise<void>>();

	constructor(
		private readonly ctx: Context,
		private readonly deps: StageLogDeps,
	) {}

	/**
	 * 结构性变更的自动重投影：**时间旅行**（回退标记、`director` 的重写标记）落定之后，
	 * 把舞台重新铺一遍。
	 *
	 * 只认替换、不认追加：追加是演戏的正常节奏，每落一条就重建等于把正在演出的舞台打断重播
	 * 一整遍。替换里也只认时间旅行，见 `isTimeTravel`。
	 */
	install(): () => void {
		return this.ctx.on('session/event', (session, event) => {
			if (!isTimeTravel(event)) return;
			const sessionId = String(session.id);
			if (sessionPreset(this.ctx, sessionId) !== PLAYWRITER_PRESET) return;
			this.rebuild(sessionId);
		});
	}

	/**
	 * 把这条会话重投影一遍。Agent 没挂起来、或不是剧作家会话时什么都不做，返回 false——
	 * 调用方据此决定要不要去看一眼冷会话的存档。
	 */
	rebuild(sessionId: string): boolean {
		const agent = attachedAgent(this.ctx, sessionId);
		if (!agent?.session) return false;
		if (sessionPreset(this.ctx, sessionId) !== PLAYWRITER_PRESET) return false;

		rebuildStage(sessionId, agent.session, agent.status === 'running', {
			hub: this.deps.hub,
			injected: this.deps.injected,
			voice: this.deps.voice,
			playDir: sessionWorkspace(this.ctx, sessionId),
			...(this.deps.onRebuilt ? { onRebuilt: this.deps.onRebuilt } : {}),
			...(this.deps.onRebuildStart ? { onRebuildStart: this.deps.onRebuildStart } : {}),
			...(this.deps.onEvent ? { onEvent: this.deps.onEvent } : {}),
		});
		return true;
	}

	/**
	 * SSE 新连接：这条会话还一帧都没有（刚分支出来、宿主重启过、从没打开过舞台）就先补一遍。
	 *
	 * 冷会话要多走一步：宿主还没把它的 Agent 挂起来。这里去看一眼存档里的工作目录，
	 * **确认它确实是一座剧目**才去挂——挂一条不是剧目的会话只是白占内存。
	 */
	async ensure(sessionId: string): Promise<void> {
		if (this.deps.hub.hasFrames(sessionId)) return;

		const existing = this.ensuring.get(sessionId);
		if (existing) return existing;

		const job = this.doEnsure(sessionId).finally(() => this.ensuring.delete(sessionId));
		this.ensuring.set(sessionId, job);
		return job;
	}

	private async doEnsure(sessionId: string): Promise<void> {
		if (this.rebuild(sessionId)) return;
		if (attachedAgent(this.ctx, sessionId)) return;

		const dir = await this.coldWorkspace(sessionId);
		if (dir === undefined || !loadPlaySync(dir)) return;

		const agent = await resolveAgent(this.ctx, sessionId);
		if (!agent?.session) return;
		if (sessionPreset(this.ctx, sessionId) !== PLAYWRITER_PRESET) return;
		this.rebuild(sessionId);
	}

	/** 没挂起来的会话：存档里那个工作目录（读不到＝它不是一个能打开的会话）。 */
	private async coldWorkspace(sessionId: string): Promise<string | undefined> {
		try {
			const found = await this.ctx.sessionController.inspect(sessionId as SessionId);
			return found.meta.cwd;
		} catch (error) {
			this.ctx.logger.warn(
				`[dsh-aivn] 读会话 ${sessionId} 的存档失败，舞台从空开始：${error instanceof Error ? error.message : String(error)}`,
			);
			return undefined;
		}
	}
}
