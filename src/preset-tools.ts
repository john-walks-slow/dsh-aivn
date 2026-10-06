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
 * 工具分三层（对齐 AIVN `TOOL_CATALOG` 的角色面）：
 *   - 基础：`create_play`（起剧目）与 `list_assets`（手上有什么素材），**两个字都装**；
 *   - 剧作家：`beat_done` / `update_state`（演出本身的收束口）；
 *   - 搭台助手：`get_readiness` / `set_craft`，加上按配置才装的 `list_voices` / `web_search`。
 *
 * `get_readiness` 与 `set_craft` 从剧作家移到了搭台助手：AIVN 那边这两个能力就归工坊
 * （`CATALOG_ROWS` 的 `readiness` 与 `files`），剧作家要的写作参数走 A 区注入现读。
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
import type { Capabilities } from './stagehand/capabilities';
import { registerStagehandContext } from './stagehand/context';
import type { Exa } from './stagehand/exa';
import { createReadinessTool } from './stagehand/tools/get-readiness';
import { createListVoicesTool } from './stagehand/tools/list-voices';
import { createSetCraftTool } from './stagehand/tools/set-craft';
import { createWebSearchTool } from './stagehand/tools/web-search';
import type { VoiceCatalog } from './stagehand/voice-catalog';
import { createPlayTool } from './tools/create-play';
import { createListAssetsTool } from './tools/list-assets';
import type { PlayContext } from './tools/context';
import { createBeatDoneTool } from './playwriter/tools/beat-done';
import { createUpdateStateTool } from './playwriter/tools/update-state';

/** Agent 的运行时面：`LiveAgent` 再加上它自己的 scope ctx（工具注册在它上面）。 */
type ToolAgent = LiveAgent & { readonly ctx: Context };

/** 本插件的两个预设——不在这个集合里的会话一个工具都不装。 */
const PRESETS = new Set<string>([PLAYWRITER_PRESET, STAGEHAND_PRESET]);

/** 装配要用的外部面：能力位与两个「配了才有」的客户端。 */
export interface ToolDeps {
	capabilities: Capabilities;
	voices: VoiceCatalog | null;
	exa: Exa | null;
}

export function installPresetTools(ctx: Context, hub: StageHub, guard: BeatGuard, deps: ToolDeps): () => void {
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

		installed.set(agent, { preset, off: install(hub, agent, preset, guard, deps) });
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
function install(
	hub: StageHub,
	agent: ToolAgent,
	preset: string,
	guard: BeatGuard,
	deps: ToolDeps,
): () => void {
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

	// 基础层：两个字都装。
	const tools: ToolDefinition[] = [createPlayTool(play), createListAssetsTool(play)];
	const offs: Array<() => void> = [];

	if (preset === PLAYWRITER_PRESET) {
		tools.push(createBeatDoneTool(play), createUpdateStateTool(play));
	} else {
		// 搭台助手：AIVN 工坊那半边；`can` 决定后两个装不装得上。
		tools.push(createReadinessTool(play), createSetCraftTool(play));
		if (deps.capabilities.voice && deps.voices) tools.push(createListVoicesTool(deps.voices));
		if (deps.capabilities.search && deps.exa) tools.push(createWebSearchTool(deps.exa));
	}

	for (const tool of tools) {
		offs.push(agent.ctx.effect(() => agent.ctx.tools.register(tool), `dsh-aivn:${tool.name}`));
	}
	if (preset === PLAYWRITER_PRESET) {
		// A 区注入（前提 / 角色表 / 素材清单 / 写作参数 / 记忆索引 / 状态区 + 静态尾段）。
		// 只有剧作家的 scope 上有这些段：搭台助手不写剧本，不该看见舞台契约。
		offs.push(agent.ctx.effect(() => registerPlayContext(agent.ctx, () => safePlayDir(play)), 'dsh-aivn:play-context'));
	} else {
		// 搭台助手看的是「当前状态」（文件清单 + 就绪 + 剧本语言），不是舞台契约。
		offs.push(
			agent.ctx.effect(
				() => registerStagehandContext(agent.ctx, () => safePlayDir(play)),
				'dsh-aivn:stagehand-context',
			),
		);
	}

	return () => {
		for (const off of offs.splice(0)) off();
	};
}
