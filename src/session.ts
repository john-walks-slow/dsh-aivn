/**
 * 预设 id。
 *
 * 一个会话跑哪个预设决定它在舞台上的角色：只有剧作家预设的会话才会被接进
 * DSL 管线（见 `stage/stage-tap.ts`），搭台助手只管生成素材、不上台。
 */
import type { Context } from '@deepseek-ai/cordis';
import type {
	AgentCancelCause,
	SessionEvent,
	SessionEventMap,
	SessionEventType,
	SessionId,
	SessionSurface,
	SurfaceEventType,
	SurfaceIntent,
} from '@deepseek-ai/dsh-session';
import type { Message, MessageId, UserMessage } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-agent';
import type {} from '@deepseek-ai/dsh-agent-preset-registry';
import type {} from '@deepseek-ai/dsh-api-session-controller';

/** 剧作家：写字的那位。 */
export const PLAYWRITER_PRESET = 'aivn-playwriter';

/** 搭台助手：备料的那位（生图、抠底、BGM、配音）。 */
export const STAGEHAND_PRESET = 'aivn-stagehand';

/**
 * Agent 手里的那条会话，按本插件用到的面收窄。
 *
 * 事件日志与会话面都是 `@deepseek-ai/dsh-session` 的公开类型（类型位置上的收窄不会丢精度）；
 * `append` 只用来投一条**替换会话面尾部**的导演标记（见 `stage/director.ts`），所以照原样声明。
 */
export interface LiveSession {
	readonly id: string;
	readonly header?: {
		readonly cwd?: string;
		readonly agentPreset?: string;
	};
	/** 模型可见的事件序列（`SessionSurface`）。空 = 玩家还没说过话，也就是第一条消息。 */
	readonly surface: SessionSurface;
	/** 整份事件日志（重建帧流用）。 */
	snapshotEvents(): readonly SessionEvent[];
	/** 一条事件投影成模型消息（重建帧流用）；不产出消息的事件返回 null。 */
	deriveEventMessage(event: SessionEvent): Message | null;
	/** 追加一条事件。`stage-log`/`director` 只用 `user/message` 这一支。 */
	append<T extends SessionEventType>(
		type: T,
		data: SessionEventMap[T],
		...opts: T extends SurfaceEventType ? [opts: SurfaceIntent<T>] : []
	): SessionEvent<T>;
}

/**
 * Agent 的运行时面。`@deepseek-ai/dsh-agent` 的公开类型只声明了 `id`（它那几支
 * `declare module './types.ts'` 出不了包），这里按实际用法收窄一份。
 */
export interface LiveAgent {
	readonly id: string;
	/** Agent 自己的 scope ctx：预设内的工具与服务注册在它上面。 */
	readonly ctx: Context;
	/** 有没有一轮在跑：导演的「打断」「重写」都要先看它。 */
	readonly status: 'idle' | 'running';
	readonly session?: LiveSession;
	/** 排队中的 steering（打断之后要把它们清掉，否则旧指令会追着新一轮跑）。 */
	readonly inbox: {
		readonly nextStep: readonly UserMessage[];
		remove(id: MessageId): boolean;
		clear(): void;
	};
	followup(message: UserMessage): void;
	/**
	 * 投一条「这一步之内」的消息（`next-step`）。与 `followup` 的区别是要紧的：一轮开始时
	 * 宿主从 `next-turn` 只认领一条，`next-step` 整批认领且排在它前面——开局指令靠这一点
	 * 挤进玩家的第一句所在的那一轮（见 `stage/stage-tap.ts` 的 `openPlay`）。
	 */
	inject(message: UserMessage): void;
	/** 投一条 steering（最近的 step 边界吃）。 */
	steer(message: UserMessage): void;
	/** 中止当前这一轮；`keepInbox` 保住排队与 steering。 */
	cancel(cause: AgentCancelCause, options?: { keepInbox?: boolean }): void;
	/** 等到这条 Agent 真正闲下来（打断之后必须等，不然会话面还在动）。 */
	whenIdle(): Promise<void>;
}

/** 在册的 live Agent；冷会话（宿主重启后没恢复）取不到。 */
export function attachedAgent(ctx: Context, sessionId: string): LiveAgent | undefined {
	return ctx.agents.get(sessionId as SessionId) as LiveAgent | undefined;
}

/**
 * 会话工作区，也就是剧目根目录。没有工作区的会话不构成剧目——
 * 调用方据此给出「这个会话还没有剧目」的空态。
 */
export function sessionWorkspace(ctx: Context, sessionId: string): string | undefined {
	return attachedAgent(ctx, sessionId)?.session?.header?.cwd;
}

/**
 * 会话**当前**跑的预设。
 *
 * 权威是活的预设组合（`agentPresets.composedPreset`），会话头里的 `agentPreset` 只是
 * **创建那一刻**的事实。两者会在新会话界面上分叉：新建会话默认落在 `standard`，玩家接着
 * 在座位 chip 上选「剧作家」，头里仍然写着 `standard`（2026-10-05 e2e 实测）。
 * 只读头会把所有「先建会话、再选预设」的会话整条丢掉——舞台一帧都收不到。
 * 头留作兜底：冷会话或组合还没落定时，至少有个值。
 */
export function sessionPreset(ctx: Context, sessionId: string): string | undefined {
	const agent = attachedAgent(ctx, sessionId);
	if (!agent) return undefined;
	return ctx.agentPresets.composedPreset(agent.ctx) ?? agent.session?.header?.agentPreset;
}

/**
 * 取会话的 live Agent，冷会话就恢复一个——`resolveAgent` 是恢复而非新建，
 * 并且会带上原预设（裸恢复会跳过预设装配）。
 */
export async function resolveAgent(ctx: Context, sessionId: string): Promise<LiveAgent | undefined> {
	const attached = attachedAgent(ctx, sessionId);
	if (attached) return attached;

	const found = await ctx.sessionController.resolveAgent(sessionId as SessionId);
	return 'error' in found ? undefined : (found.agent as LiveAgent);
}
