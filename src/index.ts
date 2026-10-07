/**
 * dsh-aivn —— 宿主半边。
 *
 * 会话工作区即剧目：剧作家预设的会话写 DSL，`stage-tap` 把它解析成舞台 IR
 * 送进中枢，`routes` 把这条流按会话分频发给浏览器半边的「舞台」视图。
 * 剧作家本人（预设 + 提示词 + 工具）在 `playwriter/`，按预设装工具的装配在 `preset-tools.ts`，
 * 起剧目那一步在 `commands.ts`（人走斜杠命令，Agent 自己写文件）。
 *
 * `agentPresets`（注册两个预设）与 `commands`（起剧目的斜杠命令）都是插件直接访问的 ctx 服务，
 * 必须写进 `inject`——漏了它运行时会抛 `cannot get property X without inject`。
 * 两个都在 dsh-base 那份 bundle 里（`cordis.patch.yml` 的 agent-presets / commands 行），
 * 任何一个 dsh-base 打底的剖面都拿得到。
 */
import type { Context, Volatile } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import type {} from '@deepseek-ai/dsh-settings';
import type {} from '@deepseek-ai/cordis-plugin-loader';
import { installPlayCommands } from './commands';
import { Director } from './director';
import { StageHub } from './hub';
import { InjectedMessages } from './injected';
import { EndingsLedger } from './ledger';
import { registerPresets } from './playwriter/preset';
import { installPresetTools, type DisabledTools } from './preset-tools';
import { installStageRoutes } from './routes';
import { StageLog } from './stage-log';
import { installStageTap } from './stage-tap';
import { createTts, type FishTts } from './tts';
import { createMediaBackends, type MediaBackends } from './media/backends';
import { resolveCapabilities, type Capabilities } from './stagehand/capabilities';
import { createExa, type Exa } from './stagehand/exa';
import { createVoiceCatalog, type VoiceCatalog } from './stagehand/voice-catalog';
import { VoiceHost } from './voice-host';

export const name = 'dsh-aivn';

/** 一个字段的现值：`.volatile()` 之后拿到的是稳定引用，读一次才算数。 */
function keysOf(value: Volatile<string[] | undefined> | undefined): string[] {
	return (value?.get() ?? []).map((key) => key.trim()).filter((key) => key !== '');
}

/** 配置里的 key 优先，环境变量兜底（`DSH_AIVN_TTS_KEYS`，逗号分隔）。 */
function configuredKeys(config: Config): string[] {
	const fromConfig = keysOf(config.ttsKeys);
	if (fromConfig.length > 0) return fromConfig;
	return (process.env.DSH_AIVN_TTS_KEYS ?? '')
		.split(',')
		.map((key) => key.trim())
		.filter((key) => key !== '');
}

/** 同上一套规矩，给联网检索用（`DSH_AIVN_EXA_KEYS`）。 */
function configuredExaKeys(config: Config): string[] {
	const fromConfig = keysOf(config.searchKeys);
	if (fromConfig.length > 0) return fromConfig;
	return (process.env.DSH_AIVN_EXA_KEYS ?? '')
		.split(',')
		.map((key) => key.trim())
		.filter((key) => key !== '');
}

export { PLAYWRITER_PRESET, STAGEHAND_PRESET } from './session';

export const inject = ['agents', 'sessionController', 'agentPresets', 'commands', 'systemPrompt'];

/** Fish Audio 的公开端点与免费开发者模型（AIVN 用的同一个）。 */
const DEFAULT_TTS_BASE_URL = 'https://api.fish.audio';
const DEFAULT_TTS_MODEL = 's2.1-pro-free';
/** Exa 检索端点（api.exa.ai 在墙外，由 DSH 进程的环境代理带出去）。 */
const DEFAULT_EXA_BASE_URL = 'https://api.exa.ai';

/**
 * 配置面：**扁平**的 17 个字段，每一个都 `.volatile()`。
 *
 * 为什么扁平：DSH 设置界面的表单控件生成的写路径只有单段（`path: ['字段名']`），
 * 嵌套字段（`tts.keys` 那样的）在界面上根本寻址不到。为什么全字段 volatile：
 * volatile 是「改了不用重挂插件」的开关——配置改动经 loader 原位提交进这些引用，
 * 并给拥有者发一条 `loader/volatile-update`，插件据此重建能力面。于是
 * **改设置就地生效，不再需要改 `cordis.patch.yml` 再重启 dsh**。
 *
 * `role('secret')` 的四个字段（Fish / Exa / 生图 / 配乐 key）在设置界面上只写不回显：
 * 描述与响应里全程脱敏，只报「配没配」。这四个字段**不带 default**——带了默认空串，
 * 界面会永远显示「已配置」。
 */
export interface Config {
	/** 一把或多把 Fish Audio key（多把轮询分摊额度）。也可以走 `DSH_AIVN_TTS_KEYS`。 */
	ttsKeys: Volatile<string[] | undefined>;
	ttsBaseUrl: Volatile<string>;
	ttsModel: Volatile<string>;
	/** 同时合成的上限：摊往返，又不把额度一次打空。 */
	ttsConcurrency: Volatile<number>;
	/** 给两个预设放开命令行（`bash`）。默认关，与 AIVN 那个 `defaultOff` 同口径。 */
	shell: Volatile<boolean>;
	/** 一把或多把 Exa key。也可以走 `DSH_AIVN_EXA_KEYS`。 */
	searchKeys: Volatile<string[] | undefined>;
	searchBaseUrl: Volatile<string>;
	/** 生图接口格式：`gemini`（官方 / flow2api / cpa）/ `openai`（官方与兼容网关）/ `modelslab`。 */
	imageFormat: Volatile<'gemini' | 'openai' | 'modelslab'>;
	/** 生图地址；与 `imageModel` 都给齐才算配好生图，只给其一等于没有。 */
	imageBaseUrl: Volatile<string>;
	imageApiKey: Volatile<string>;
	imageModel: Volatile<string>;
	/** 档位 `1K`/`2K`/`4K`（K 大写）或字面像素 `1536x1024`（openai / modelslab 用得上）。 */
	imageSize: Volatile<string>;
	imageTimeoutMs: Volatile<number>;
	musicBaseUrl: Volatile<string>;
	musicApiKey: Volatile<string>;
	musicModel: Volatile<string>;
	musicTimeoutMs: Volatile<number>;
	/** 按预设禁用的工具 id（逗号分隔，见 `src/tool-catalog.ts`）；默认空 = 两预设完全一致。 */
	playwriterDisabledTools: Volatile<string>;
	stagehandDisabledTools: Volatile<string>;
}

export const Config = z.object({
	// 两个数组密钥写成 `union([array, const(undefined)])`：schemastery 的数组默认是 `[]`，而脱敏边车
	// 判的是「这个值存不存在」——空数组会让设置界面永远显示「已配置」（2026-10-06 e2e 实测）。
	ttsKeys: z.union([z.array(z.string()), z.const(undefined)]).role('secret').volatile(),
	ttsBaseUrl: z.string().default(DEFAULT_TTS_BASE_URL).volatile(),
	ttsModel: z.string().default(DEFAULT_TTS_MODEL).volatile(),
	ttsConcurrency: z.natural().default(2).volatile(),
	shell: z.boolean().default(false).volatile(),
	searchKeys: z.union([z.array(z.string()), z.const(undefined)]).role('secret').volatile(),
	searchBaseUrl: z.string().default(DEFAULT_EXA_BASE_URL).volatile(),
	imageFormat: z.union([z.const('gemini'), z.const('openai'), z.const('modelslab')]).default('gemini').volatile(),
	// 地址与模型必须都给齐：只给其一既出不了图，界面上一眼又看不出「差什么」，所以在 UI 的
	// 说明里写清「两个都给齐才算配好」。
	imageBaseUrl: z.string().default('').volatile(),
	imageApiKey: z.string().role('secret').volatile(),
	imageModel: z.string().default('').volatile(),
	imageSize: z.string().default('1K').volatile(),
	imageTimeoutMs: z.natural().default(180_000).volatile(),
	musicBaseUrl: z.string().default('').volatile(),
	musicApiKey: z.string().role('secret').volatile(),
	musicModel: z.string().default('').volatile(),
	musicTimeoutMs: z.natural().default(240_000).volatile(),
	playwriterDisabledTools: z.string().default('').volatile(),
	stagehandDisabledTools: z.string().default('').volatile(),
});

/**
 * 一次配置推导出来的全部运行期面。
 *
 * 里面的成员都是无状态 HTTP 包装（TTS / Exa / 音色表 / 生图与配乐后端），配置一变就整体重建，
 * 零成本：在飞的请求握着旧实例跑完，没有中断。
 */
interface Runtime {
	capabilities: Capabilities;
	tts: FishTts | null;
	/** 没配 key 时是 null（调用方据此不装 `list_voices`）。 */
	voices: VoiceCatalog | null;
	/** 同上，没配 Exa key 时是 null。 */
	exa: Exa | null;
	media: MediaBackends;
	/** 按预设禁用的工具 id（从配置的逗号分隔串现算）。 */
	disabled: DisabledTools;
}

/** 从逗号分隔串现算禁用集；空串 → 空集。 */
function parseToolList(value: string | undefined): ReadonlySet<string> {
	return new Set((value ?? '').split(',').map((name) => name.trim()).filter(Boolean));
}

/** 从当前配置现算运行期面——每次调用都重新 `.get()`，所以拿到的一定是现值。 */
function buildRuntime(config: Config): Runtime {
	const ttsKeys = configuredKeys(config);
	const exaKeys = configuredExaKeys(config);
	const ttsBaseUrl = config.ttsBaseUrl.get() ?? DEFAULT_TTS_BASE_URL;
	const media = createMediaBackends({
		image: {
			format: config.imageFormat.get(),
			baseUrl: config.imageBaseUrl.get(),
			apiKey: config.imageApiKey.get(),
			model: config.imageModel.get(),
			size: config.imageSize.get(),
			timeoutMs: config.imageTimeoutMs.get(),
		},
		music: {
			baseUrl: config.musicBaseUrl.get(),
			apiKey: config.musicApiKey.get(),
			model: config.musicModel.get(),
			timeoutMs: config.musicTimeoutMs.get(),
		},
	});
	return {
		capabilities: resolveCapabilities({
			shell: config.shell.get() ?? false,
			ttsKeys,
			exaKeys,
			image: media.image !== null,
			music: media.music !== null,
		}),
		tts: createTts(ttsKeys, ttsBaseUrl, config.ttsModel.get() ?? DEFAULT_TTS_MODEL),
		voices: createVoiceCatalog(ttsKeys, ttsBaseUrl),
		exa: createExa(exaKeys, config.searchBaseUrl.get() ?? DEFAULT_EXA_BASE_URL),
		media,
		disabled: {
			playwriter: parseToolList(config.playwriterDisabledTools.get()),
			stagehand: parseToolList(config.stagehandDisabledTools.get()),
		},
	};
}

/** 能力面写成一行摘要：装载时与每次配置变更后各记一次，日志里能对着看。 */
function describeCapabilities(capabilities: Capabilities): string {
	return (
		`音色库 ${capabilities.voice ? '开' : '关'}、联网检索 ${capabilities.search ? '开' : '关'}、` +
		`生图 ${capabilities.image ? '开' : '关'}、配乐 ${capabilities.music ? '开' : '关'}、` +
		`命令行 ${capabilities.shell ? '开' : '关'}`
	);
}

export async function apply(ctx: Context, config: Config): Promise<() => void> {
	const hub = new StageHub();
	/** 「引擎自己投的消息」的登记，开局指令与收束指令（`stage-tap`）、导演指令（`director`）共用一份。 */
	const injected = new InjectedMessages();
	/** 结局账本（工作区根 `endings.json`）：引擎在实时 IR 上落账，重建只重推终局标记。 */
	const ledger = new EndingsLedger((message) => ctx.logger.warn(message));

	const runtime = { revision: 0, current: buildRuntime(config) };
	ctx.logger.info(`[dsh-aivn] 预设能力：${describeCapabilities(runtime.current.capabilities)}`);
	if (runtime.current.tts) ctx.logger.info('[dsh-aivn] 语音已启用（Fish Audio TTS）');
	else ctx.logger.info('[dsh-aivn] 没配 TTS key，语音停用');

	// 访问器而不是值：语音合成发生在路由与舞台管线里，用的时候才取当前后端——
	// 设置界面把 key 补上之后，下一句台词就出声，不用重挂插件（更不用重启 dsh）。
	const voice = new VoiceHost(
		() => runtime.current.tts,
		() => config.ttsConcurrency.get() ?? 2,
		hub,
		ctx.logger,
	);

	const tap = installStageTap(ctx, hub, injected, voice, ledger);
	// 导演的动作全是**会话层**的：提示投进下一轮，改写/重写往会话里加一条替换标记。
	const director = new Director(hub, injected);
	// 帧流的真相源是会话面：这条把「会话现在长什么样」重投影成一条帧流（回退、重写、分支、重启）。
	const stageLog = new StageLog(ctx, {
		hub,
		injected,
		voice,
		// 重建会把这条会话的流式解析器与语音管线作废（它们手里是上一版内容的半成品）。
		onRebuilt: (sessionId) => tap.forgetParser(sessionId),
		// 重放之前先清掉上一遍推出来的终局 / 收束标记（回退掉结局那一拍后终局正确退出）。
		onRebuildStart: (sessionId) => tap.resetTerminal(sessionId),
		// 重放的每一帧转给 tap：重建也要重推出「已结局」的终局态（回退掉结局那一拍则退出终局）。
		onEvent: (sessionId, event) => tap.noteEvent(sessionId, event),
		// 提示队列在导演手里，不在会话面上：重置帧清掉客户端那份之后要补回来。
		pendingGuides: (sessionId) => director.snapshot(sessionId),
	});

	const tools = installPresetTools(ctx, hub, runtime);
	const presets = await registerPresets(ctx, { shell: runtime.current.capabilities.shell });
	const disposers: Array<() => void> = [
		tap.dispose,
		tools.dispose,
		installPlayCommands(ctx),
		presets.dispose,
		director.install(ctx),
		stageLog.install(),
	];

	// 设置界面改完的值经 loader 原位提交进 `config` 的这些引用，这里重建运行期面：
	// 工具面重扫（装上/卸下那一轮能力，换掉旧客户端实例），shell 翻转时重注册两个预设。
	ctx.on('loader/volatile-update', () => {
		const before = runtime.current.capabilities;
		runtime.current = buildRuntime(config);
		runtime.revision += 1;
		const after = runtime.current.capabilities;
		ctx.logger.info(`[dsh-aivn] 配置已更新，能力：${describeCapabilities(after)}`);
		tools.resync();
		// `tool-bash` 是预设的**一行**（不是装在 Agent 上的工具），而活着的 Agent 保留它绑定那一刻
		// 的那代行集——重注册只对之后新建的会话生效，已开着的会话保持原样。
		if (before.shell !== after.shell) {
			ctx.logger.info(
				'[dsh-aivn] shell 翻转：两个预设已重注册，只对新建会话生效（已开着的会话保留原行集）',
			);
			void presets.restage(after.shell);
		}
	});

	// 自带设置卡（浏览器半边注册在 Plugins 页的 dsh-aivn 上）：关掉自动生成的表单页，
	// 免得同一个命名空间出现两份长得不一样的编辑器。settings 不在时这一支不跑，业务照常。
	ctx.inject(['settings'], (settingsCtx) => {
		settingsCtx.effect(
			() => settingsCtx.settings.configure({ auto: false }, ctx.fiber),
			'dsh-aivn:settings-ownership',
		);
	});

	ctx.inject(['webServer'], (webCtx) => {
		disposers.push(
			installStageRoutes(webCtx, hub, injected, voice, director, stageLog, (sessionId) => tap.hasEnded(sessionId)),
		);
		webCtx.logger.info('[dsh-aivn] stage routes mounted on /aivn');
	});

	return () => {
		for (const dispose of disposers.splice(0)) dispose();
		// 路由随插件注销，但挂着的 SSE 连接与心跳不会自己走。
		hub.dispose();
		voice.dispose();
	};
}
