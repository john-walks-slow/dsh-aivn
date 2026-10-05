/**
 * 预设内的工具装配。
 *
 * 与 AIVN 的差别只有一处：那边 `createAgentKit()` 按角色一次性装配好 `tools` 数组交给 pi，
 * 这里没有那个装配点——工具注册在 **Agent 自己的 ctx 上**（`agent.ctx.tools.register`），
 * 于是要自己判断「这个 Agent 跑的是哪个预设、该装哪些工具」。
 *
 * 判断读 `agentPresets.composedPreset(agent.ctx)`（**活的**预设，权威），
 * 会话头里的 `agentPreset` 只是创建事实、换过预设之后它就旧了，这里当兜底。
 *
 * 两个挂点：
 *   - `agent/created`：会话带着预设建出来的常规路径；
 *   - `agent-preset/selected`：空白会话建好之后再选预设的那条路径。
 * 两次都走同一个 `sync()`：装了哪套就卸哪套——工具跟着预设走，不跟着 Agent 走。
 *
 * 工具分两层：`create_play` 是两个字都装的基础能力（起剧目），
 * 其余五个（beat_done / update_state / get_readiness / list_library / set_craft）只给剧作家。
 */
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-agent';
import type {} from '@deepseek-ai/dsh-agent-preset-registry';
import type { SessionId } from '@deepseek-ai/dsh-session';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { BeatGuard } from './beat-guard';
import type { StageHub } from './hub';
import { registerPlayContext } from './play-context';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET, sessionPreset, type LiveAgent } from './session';
import { createPlayTool } from './tools/create-play';
import type { PlayContext } from './tools/context';
import { createBeatDoneTool } from './playwriter/tools/beat-done';
import { createReadinessTool } from './playwriter/tools/get-readiness';
import { createListLibraryTool } from './playwriter/tools/list-library';
import { createSetCraftTool } from './playwriter/tools/set-craft';
import { createUpdateStateTool } from './playwriter/tools/update-state';

/** Agent 的运行时面：`LiveAgent` 再加上它自己的 scope ctx（工具注册在它上面）。 */
type ToolAgent = LiveAgent & { readonly ctx: Context };

/** 本插件的两个预设——不在这个集合里的会话一个工具都不装。 */
const PRESETS = new Set<string>([PLAYWRITER_PRESET, STAGEHAND_PRESET]);

export function installPresetTools(ctx: Context, hub: StageHub, guard: BeatGuard): () => void {
	/** 每个 Agent 已装的工具与它们所属的预设；WeakMap 让 Agent 走掉时不留登记。 */
	const installed = new WeakMap<object, { preset: string; off: () => void }>();

	const sync = (agent: ToolAgent): void => {
		const preset = sessionPreset(ctx, String(agent.id));
		const mine = preset !== undefined && PRESETS.has(preset);
		const current = installed.get(agent);
		if (current?.preset === preset) return;

		current?.off();
		installed.delete(agent);
		if (!mine) return;

		installed.set(agent, { preset, off: install(hub, agent, preset, guard) });
	};

	const onCreated = (payload: unknown): undefined => {
		// 事件带一层 { agent } 外壳。
		const agent = (payload as { agent?: ToolAgent }).agent;
		if (agent?.ctx && agent.id !== undefined) sync(agent);
		return undefined;
	};

	const onSelected = (sessionId: SessionId): void => {
		const agent = ctx.agents.get(sessionId) as ToolAgent | undefined;
		if (agent?.ctx) sync(agent);
	};

	const offCreated = ctx.on('agent/created', onCreated);
	const offSelected = ctx.on('agent-preset/selected', onSelected);
	return () => {
		offCreated();
		offSelected();
	};
}

/** 取剧目根；会话还没有工作目录时给空串——注入读不到东西，但不该让组装炸掉。 */
function safePlayDir(play: PlayContext): string {
	try {
		return play.playDir();
	} catch {
		return '';
	}
}

/** 把该预设的工具挂到这个 Agent 上，返回一次性卸掉全部的卸载器。 */
function install(hub: StageHub, agent: ToolAgent, preset: string, guard: BeatGuard): () => void {
	const sessionId = String(agent.id);
	const play: PlayContext = {
		hub,
		sessionId,
		playDir() {
			const dir = agent.session?.header?.cwd;
			if (!dir) throw new Error('这个会话还没有工作目录，取不到剧目根');
			return dir;
		},
		beatClosed() {
			guard.close(sessionId);
		},
	};

	const tools: ToolDefinition[] = [createPlayTool(play)];
	if (preset === PLAYWRITER_PRESET) {
		tools.push(
			createBeatDoneTool(play),
			createUpdateStateTool(play),
			createReadinessTool(play),
			createListLibraryTool(play),
			createSetCraftTool(play),
		);
	}

	const offs = tools.map((tool) => agent.ctx.effect(() => agent.ctx.tools.register(tool), `dsh-aivn:${tool.name}`));
	if (preset === PLAYWRITER_PRESET) {
		// A 区注入（前提 / 角色表 / 素材清单 / 写作参数 / 记忆索引 / 状态区 + 静态尾段）。
		// 只有剧作家的 scope 上有这些段：搭台助手不写剧本，不该看见舞台契约。
		offs.push(agent.ctx.effect(() => registerPlayContext(agent.ctx, () => safePlayDir(play)), 'dsh-aivn:play-context'));
	}

	return () => {
		for (const off of offs.splice(0)) off();
	};
}
