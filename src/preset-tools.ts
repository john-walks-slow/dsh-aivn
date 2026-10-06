/**
 * 预设内的工具装配。
 *
 * 与 AIVN 的差别只有两处：那边 `createAgentKit()` 按角色一次性装配好 `tools` 数组交给 pi，
 * 这里没有那个装配点——工具注册在 **Agent 自己的 ctx 上**（`agent.ctx.tools.register`），
 * 于是要自己判断「这个 Agent 跑的是哪个预设、该装哪些工具」；另外**没有「起剧目」工具**：
 * 写 `play.json` 就是文件工具的事，字段与布局在提示词的《剧目文件》那一章（见 `play-files.ts`）。
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
 *   - 基础：`validate_play`（刚写完剧目文件，问它写得对不对），**两个角色都装**——
 *     写文件的活两个角色都有，校验口就得两个角色都有；
 *   - 剧作家：手里只有文件工具 + `validate_play`，配了生图后端另有同步的 `generate_image`；
 *   - 搭台助手：`set_stage_style`，加上按配置才装的 `list_voices` / `web_search` /
 *     `generate_image`（草稿）/ `commit_asset` / `recut_sprite` / `generate_bgm`。
 *
 * **模型用文件工具就能做的事一律不装**（2026-10-06）：`create_play`（写 play.json / 前提 / 角色卡）、
 * `set_craft`（写 play.json 的 craft 段）、`update_state`（写 memory/always/state/）都删了——
 * DSH 的模型手里有 write / edit，写文件是它自己的事，「写成什么样」由提示词里的《剧目文件》
 * 与《写作参数》说清，写错了由 `validate_play` 报出来。
 *
 * `list_assets` 也归这一条：它列的是 `assets/` 目录 + `assets/manifest.json` 的描述 + `characters/`
 * 角色卡，三样 read / glob 都拿得到；而**描述本来就在每个角色的提示词里**（剧作家的 A 区每轮
 * 注入《素材清单》与《角色表》，搭台助手的《当前状态》给文件清单，描述在它自己写过的
 * `manifest.json` 里）。为一个「read 一下就有」的视图多养一个工具面，只会让工具表更难记。
 *
 * `beat_done` 也归这一条（2026-10-06 拆掉）：停止点回到剧本正文的 `<stop …/>` 标签（见
 * `@aivn/core` 的 `STOP_TAG`），轮尾因此重新是助手消息——DSH 的「在新对话中分支」与舞台重建
 * 都只认这种轮尾。
 *
 * 留下的是文件工具**做不到**的：外部调用（`generate_image` / `web_search` / `generate_bgm` /
 * `list_voices`）、图像处理与台账（`commit_asset` / `recut_sprite`），以及**写完要立刻推给
 * 已打开的舞台**的 `set_stage_style`。
 */
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-agent';
import type {} from '@deepseek-ai/dsh-agent-preset-registry';
import type { SessionId } from '@deepseek-ai/dsh-session';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { StageHub } from './hub';
import type { MediaBackends } from './media/backends';
import { registerPlayContext } from './play-context';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET, sessionPreset, sessionWorkspace, type LiveAgent } from './session';
import type { Capabilities } from './stagehand/capabilities';
import { registerStagehandContext } from './stagehand/context';
import type { Exa } from './stagehand/exa';
import { stagehandGuide } from './stagehand/prompt';
import { createListVoicesTool } from './stagehand/tools/list-voices';
import { createSetStageStyleTool } from './stagehand/tools/set-stage-style';
import { createWebSearchTool } from './stagehand/tools/web-search';
import type { VoiceCatalog } from './stagehand/voice-catalog';
import type { PlayContext } from './tools/context';
import { createValidatePlayTool } from './tools/validate-play';
import { createSyncImageTool } from './playwriter/tools/generate-image';
import { createCommitAssetTool } from './stagehand/tools/commit-asset';
import { createGenerateBgmTool } from './stagehand/tools/generate-bgm';
import { createDraftImageTool } from './stagehand/tools/generate-image';
import { createRecutSpriteTool } from './stagehand/tools/recut-sprite';

/** Agent 的运行时面：`LiveAgent` 再加上它自己的 scope ctx（工具注册在它上面）。 */
type ToolAgent = LiveAgent & { readonly ctx: Context };

/** 本插件的两个预设——不在这个集合里的会话一个工具都不装。 */
const PRESETS = new Set<string>([PLAYWRITER_PRESET, STAGEHAND_PRESET]);

/** 装配要用的外部面：能力位与「配了才有」的几个客户端。 */
export interface ToolDeps {
	capabilities: Capabilities;
	voices: VoiceCatalog | null;
	exa: Exa | null;
	media: MediaBackends;
}

/**
 * 运行期面的持有者。
 *
 * `revision` 每次配置变更 +1：工具对象在装配时就把 `media` / `exa` / `voices` 抓在手里
 * （它们是无状态 HTTP 包装，换了 config 就得换实例），所以「重扫时是否要重装」按版本号判断，
 * 而不去逐个比字段——少一处会忘的对照表。
 */
export interface ToolRuntime {
	readonly revision: number;
	readonly current: ToolDeps;
}

/** 预设工具的宿主面：`agent/created` 之外，配置变更时用它把在册会话重扫一遍。 */
export interface PresetToolsHost {
	/** 配置变了：在册会话的工具面重扫（装上/卸下那一轮能力，换掉旧的客户端实例）。 */
	resync(): void;
	dispose(): void;
}

export function installPresetTools(ctx: Context, hub: StageHub, runtime: ToolRuntime): PresetToolsHost {
	/** 每个 Agent 已装的工具、签名与它们所属的预设；WeakMap 让 Agent 走掉时不留登记。 */
	const installed = new WeakMap<object, { signature: string; off: () => void }>();

	const sync = (agent: ToolAgent): void => {
		const preset = sessionPreset(ctx, String(agent.id));
		const mine = preset !== undefined && PRESETS.has(preset);
		const current = installed.get(agent);
		if (!mine) {
			current?.off();
			installed.delete(agent);
			return;
		}

		const signature = `${preset}@${runtime.revision}`;
		if (current?.signature === signature) return;

		current?.off();
		installed.set(agent, { signature, off: install(ctx, hub, agent, preset, runtime) });
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
	return {
		resync() {
			// 冷会话不在名册里（宿主重启后没恢复），也就没有工具面要改。
			for (const agent of ctx.agents.list()) {
				const tool = agent as ToolAgent;
				if (tool.ctx && tool.id !== undefined) sync(tool);
			}
		},
		dispose() {
			offCreated();
			offSelected();
		},
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
	ctx: Context,
	hub: StageHub,
	agent: ToolAgent,
	preset: string,
	runtime: ToolRuntime,
): () => void {
	const deps = runtime.current;
	const sessionId = String(agent.id);
	const play: PlayContext = {
		hub,
		sessionId,
		playDir() {
			const dir = agent.session?.header?.cwd;
			if (!dir) throw new Error('这个会话还没有工作目录，取不到剧目根');
			return dir;
		},
		/**
		 * 皮肤帧推给**同剧目**的每条会话流，而不是只推自己这条。
		 *
		 * `set_stage_style` 是搭台助手的工具，舞台却开在剧作家会话上：只推自己的流，
		 * 用户那边要刷新才看得见，等于白写「立即生效」。判据是工作目录相同——
		 * 会话工作区就是剧目根，同目录即同剧目。
		 */
		broadcastStyle(theme) {
			const dir = safePlayDir(play);
			for (const other of ctx.agents.list()) {
				const id = String(other.id);
				// 判据走 `sessionWorkspace`（本插件其他取工作区的地方同一个访问器），
				// 免得这里手抠 `session.header.cwd` 与它哪天分叉。
				if (id !== sessionId && (dir === '' || sessionWorkspace(ctx, id) !== dir)) continue;
				hub.appendStyle(id, theme);
			}
		},
	};

	// 基础层：两个角色都装（写文件与校验口是一对）。
	const tools: ToolDefinition[] = [createValidatePlayTool(play)];
	const offs: Array<() => void> = [];

	if (preset === PLAYWRITER_PRESET) {
		// 剧作家缺图：同步出图即入库（D3）。一次调用声明最终 id，没有「挑候选」这一步。
		if (deps.capabilities.image) tools.push(createSyncImageTool(play, deps.media));
	} else {
		// 搭台助手：AIVN 工坊那半边；`can` 决定哪几个装得上。
		// `set_stage_style` 不门控：它只写剧目里的一个文件，不依赖任何后端配置。
		tools.push(createSetStageStyleTool(play));
		if (deps.capabilities.voice && deps.voices) tools.push(createListVoicesTool(deps.voices));
		if (deps.capabilities.search && deps.exa) tools.push(createWebSearchTool(deps.exa));
		if (deps.capabilities.image) {
			tools.push(
				// 两步：草稿先给用户挑，挑中的才入库。
				createDraftImageTool(play, deps.media),
				createCommitAssetTool(play, deps.media),
				createRecutSpriteTool(play, deps.media),
			);
		}
		// 配乐只给搭台助手：AIVN 那边也是（一首 84 秒，塞进演出回路等于整轮都在等）。
		if (deps.capabilities.music) tools.push(createGenerateBgmTool(play, deps.media));
	}

	for (const tool of tools) {
		offs.push(agent.ctx.effect(() => agent.ctx.tools.register(tool), `dsh-aivn:${tool.name}`));
	}
	if (preset === PLAYWRITER_PRESET) {
		// A 区注入（前提 / 角色表 / 素材清单 / 写作参数 / 记忆索引 / 状态区 + 静态尾段）。
		// 只有剧作家的 scope 上有这些段：搭台助手不写剧本，不该看见舞台契约。
		offs.push(
			agent.ctx.effect(
				() => registerPlayContext(agent.ctx, () => safePlayDir(play), () => runtime.current.capabilities.image),
				'dsh-aivn:play-context',
			),
		);
	} else {
		// 搭台助手看的是「当前状态」（文件清单 + 就绪 + 剧本语言），不是舞台契约。
		// 能力位门控的那几章（生图/配乐/检索/命令行）挂成**函数文本**：每次组装现读运行期面，
		// 于是设置界面刚补上的 key，已经开着的会话下一轮就看得见对应的章。
		offs.push(
			agent.ctx.effect(
				() => registerStagehandContext(agent.ctx, () => safePlayDir(play)),
				'dsh-aivn:stagehand-context',
			),
			agent.ctx.effect(
				() =>
					agent.ctx.systemPrompt.section({
						name: 'aivn:stagehand-guide',
						// persona 的前缀是 order 0、语言段是 100：40 落在两者之间，
						// 与拆开之前的章序（身份 → 备料 → 能力 → 技能库）对得上。
						order: 40,
						text: () => stagehandGuide(runtime.current.capabilities),
					}),
				'dsh-aivn:stagehand-guide',
			),
		);
	}

	return () => {
		for (const off of offs.splice(0)) off();
	};
}
