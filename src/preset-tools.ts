/**
 * 预设内的工具装配。
 *
 * 与 AIVN 的差别只有两处：那边 `createAgentKit()` 按角色一次性装配好 `tools` 数组交给 pi，
 * 这里没有那个装配点——工具注册在 **Agent 自己的 ctx 上**（`agent.ctx.tools.register`），
 * 于是要自己判断「这个 Agent 跑的是哪个预设、该装哪些工具」；另外**没有「起剧目」工具**：
 * 写 `play.json` 就是文件工具的事，字段与布局在提示词的《剧目文件》那一章（见 `play/play-files.ts`）。
 *
 * 判断读 `agentPresets.composedPreset(agent.ctx)`（**活的**预设，权威），
 * 会话头里的 `agentPreset` 只是创建事实、换过预设之后它就旧了，这里当兜底。
 *
 * 两个挂点：
 *   - `agent/created`：会话带着预设建出来的常规路径；
 *   - `agent-preset/selected`：空白会话建好之后再选预设的那条路径。
 * 两次都走同一个 `sync()`：装了哪套就卸哪套——工具跟着预设走，不跟着 Agent 走。
 *
 * **两个预设装同一套 AIVN 工具**（2026-10-07 起）：不再有「某工具只给搭台助手」的分叉——
 * 通用文件工具（read / write / edit / glob / grep）与技能库、shell 由预设的**行集**提供
 * （见 `playwriter/preset.ts`），这里只装配 AIVN 自己的工具，清单以 `tool-catalog.ts` 为单一真相源：
 *   - 基础：`validate_play`（刚写完剧目文件，问它写得对不对）、`set_stage_style`（皮肤）、
 *     `cut`（抠底）、`import_asset`（登记一张图）；
 *   - 按配置才装：`list_voices` / `web_search` / `generate_image`（纯生成候选）/
 *     `generate_asset`（一键出图入库）/ `generate_bgm`。
 *   - 两预设默认完全一致；按预设禁用走插件配置（`playwriterDisabledTools` / `stagehandDisabledTools`）。
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
 * 留下的是文件工具**做不到**的：外部调用（`generate_image` / `generate_asset` / `web_search` /
 * `generate_bgm` / `list_voices`）、图像处理与台账（`cut` / `import_asset`），以及**写完要立刻推给
 * 已打开的舞台**的 `set_stage_style`。
 *
 * **注入仍按角色分**（与工具装配解耦）：剧作家挂 A 区（舞台契约），搭台助手挂《当前状态》。
 */
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-agent';
import type {} from '@deepseek-ai/dsh-agent-preset-registry';
import type { SessionId } from '@deepseek-ai/dsh-session';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { StageHub } from './hub';
import type { MediaBackends } from './media/backends';
import { registerPlayContext } from './play/play-context';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET, sessionPreset, sessionWorkspace, type LiveAgent } from './session';
import type { Capabilities } from './capabilities';
import { registerStagehandContext } from './stagehand/context';
import type { Exa } from './exa';
import { stagehandGuide } from './stagehand/prompt';
import { createCutTool } from './tools/cut';
import { createGenerateAssetTool } from './tools/generate-asset';
import { createGenerateBgmTool } from './tools/generate-bgm';
import { createGenerateImageTool } from './tools/generate-image';
import { createImportAssetTool } from './tools/import-asset';
import { createListVoicesTool } from './tools/list-voices';
import { createSetStageStyleTool } from './tools/set-stage-style';
import { createWebSearchTool } from './tools/web-search';
import type { VoiceCatalog } from './voice/voice-catalog';
import { gateSatisfied, TOOL_CATALOG, withConcurrency, type ToolSpec } from './tool-catalog';
import type { PlayContext } from './tools/context';
import { createValidatePlayTool } from './tools/validate-play';

/** Agent 的运行时面：`LiveAgent` 再加上它自己的 scope ctx（工具注册在它上面）。 */
type ToolAgent = LiveAgent & { readonly ctx: Context };

/** 本插件的两个预设——不在这个集合里的会话一个工具都不装。 */
const PRESETS = new Set<string>([PLAYWRITER_PRESET, STAGEHAND_PRESET]);

/** 按预设禁用工具（用户配置）。空 = 两预设完全一致。 */
export interface DisabledTools {
	playwriter: ReadonlySet<string>;
	stagehand: ReadonlySet<string>;
}

/** 按 catalog 的 id 造一个工具；参数就位由 `gateSatisfied` 保证。 */
function buildTool(spec: ToolSpec, play: PlayContext, deps: ToolDeps): ToolDefinition {
	switch (spec.id) {
		case 'validate_play':
			return createValidatePlayTool(play);
		case 'set_stage_style':
			return createSetStageStyleTool(play);
		case 'generate_image':
			return createGenerateImageTool(play, deps.media);
		case 'cut':
			return createCutTool(play, deps.media);
		case 'import_asset':
			return createImportAssetTool(play, deps.media);
		case 'generate_asset':
			return createGenerateAssetTool(play, deps.media);
		case 'generate_bgm':
			return createGenerateBgmTool(play, deps.media);
		case 'list_voices':
			return createListVoicesTool(deps.voices!);
		case 'web_search':
			return createWebSearchTool(deps.exa!);
		default:
			throw new Error(`[dsh-aivn] 未知工具：${spec.id}`);
	}
}

/** 装配要用的外部面：能力位与「配了才有」的几个客户端，以及按预设的禁用集。 */
export interface ToolDeps {
	capabilities: Capabilities;
	voices: VoiceCatalog | null;
	exa: Exa | null;
	media: MediaBackends;
	disabled: DisabledTools;
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
		 * 写皮肤的会话未必是开着舞台的那条：只推自己的流，用户那边要刷新才看得见，
		 * 等于白写「立即生效」。判据是工作目录相同——会话工作区就是剧目根，同目录即同剧目。
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

	// 工具面从 catalog 派生：先过「配没配」的门控，再减去该预设的禁用集。
	// 两个预设默认装同一套（禁用集默认空）；`cut` / `import_asset` / `validate_play` / `set_stage_style`
	// 不门控——它们只读写剧目文件、跑抠底，不依赖生图后端。
	const disabled = preset === PLAYWRITER_PRESET ? deps.disabled.playwriter : deps.disabled.stagehand;
	const gateCaps = {
		image: deps.capabilities.image,
		music: deps.capabilities.music,
		tts: deps.capabilities.voice,
		search: deps.capabilities.search,
	};
	const tools = TOOL_CATALOG.filter((spec) => gateSatisfied(spec, gateCaps) && !disabled.has(spec.id)).map((spec) =>
		withConcurrency(buildTool(spec, play, deps), spec.concurrent),
	);
	const offs: Array<() => void> = [];

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
