/**
 * 预设 id。
 *
 * 一个会话跑哪个预设决定它在舞台上的角色：只有剧作家预设的会话才会被接进
 * DSL 管线（见 `stage-tap.ts`），搭台助手只管生成素材、不上台。
 */
import type { Context } from '@deepseek-ai/cordis';
import type { SessionId } from '@deepseek-ai/dsh-session';
import type { UserMessage } from '@deepseek-ai/dsh-llm';
import type {} from '@deepseek-ai/dsh-agent';
import type {} from '@deepseek-ai/dsh-agent-preset-registry';
import type {} from '@deepseek-ai/dsh-api-session-controller';

/** 剧作家：写字的那位。 */
export const PLAYWRITER_PRESET = 'aivn-playwriter';

/** 搭台助手：备料的那位（生图、抠底、BGM、配音）。 */
export const STAGEHAND_PRESET = 'aivn-stagehand';

/**
 * Agent 的运行时面。`@deepseek-ai/dsh-agent` 的公开类型只声明了 `id`，
 * 工作区与预设挂在它的 session 上、投递消息靠 `followup`/`steer`，
 * 这里按实际用法收窄一份。
 */
export interface LiveAgent {
	readonly id: string;
	/** Agent 自己的 scope ctx：预设内的工具与服务注册在它上面。 */
	readonly ctx: Context;
	readonly session?: {
		readonly header?: {
			readonly cwd?: string;
			readonly agentPreset?: string;
		};
	};
	followup(message: UserMessage): void;
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
