/**
 * dsh-aivn —— 宿主半边。
 *
 * 会话工作区即剧目：剧作家预设的会话写 DSL，`stage-tap` 把它解析成舞台 IR
 * 送进中枢，`routes` 把这条流按会话分频发给浏览器半边的「舞台」视图。
 * 剧作家本人（预设 + 提示词 + 工具）在 `playwriter/`，按预设装工具的装配在 `preset-tools.ts`，
 * 起剧目那一步在 `scaffold.ts`（Agent 走 `tools/create-play.ts`，人走 `commands.ts`），
 * 漏调 `beat_done` 的兜底在同轮追收束 `beat-guard.ts`。
 *
 * `agentPresets`（注册两个预设）与 `commands`（起剧目的斜杠命令）都是插件直接访问的 ctx 服务，
 * 必须写进 `inject`——漏了它运行时会抛 `cannot get property X without inject`。
 * 两个都在 dsh-base 那份 bundle 里（`cordis.patch.yml` 的 agent-presets / commands 行），
 * 任何一个 dsh-base 打底的剖面都拿得到。
 */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { BeatGuard, installBeatGuard } from './beat-guard';
import { installPlayCommands } from './commands';
import { StageHub } from './hub';
import { InjectedMessages } from './injected';
import { registerPresets } from './playwriter/preset';
import { installPresetTools } from './preset-tools';
import { installStageRoutes } from './routes';
import { installStageTap } from './stage-tap';
import { createTts } from './tts';
import { resolveCapabilities } from './stagehand/capabilities';
import { createExa } from './stagehand/exa';
import { createVoiceCatalog } from './stagehand/voice-catalog';
import { VoiceHost } from './voice-host';

export const name = 'dsh-aivn';

/** 配的 key 优先，环境变量兜底（`DSH_AIVN_TTS_KEYS`，逗号分隔）。 */
function configuredKeys(config: Config): string[] {
	const fromConfig = (config.tts?.keys ?? []).map((key) => key.trim()).filter((key) => key !== '');
	if (fromConfig.length > 0) return fromConfig;
	return (process.env.DSH_AIVN_TTS_KEYS ?? '')
		.split(',')
		.map((key) => key.trim())
		.filter((key) => key !== '');
}

/** 同上一套规矩，给联网检索用（`DSH_AIVN_EXA_KEYS`）。 */
function configuredExaKeys(config: Config): string[] {
	const fromConfig = (config.search?.keys ?? []).map((key) => key.trim()).filter((key) => key !== '');
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

export interface Config {
	tts?: {
		/** 一把或多把 Fish Audio key（多把轮询分摊额度）。也可以走环境变量。 */
		keys?: string[];
		baseUrl?: string;
		model?: string;
		/** 同时合成的上限：摊往返，又不把额度一次打空。 */
		concurrency?: number;
	};
	/** 给搭台助手放开命令行（`bash`）。默认关，与 AIVN 那个 `defaultOff` 同口径。 */
	shell?: boolean;
	search?: {
		/** 一把或多把 Exa key（多把轮询分摊免费额度）。也可以走环境变量。 */
		keys?: string[];
		baseUrl?: string;
	};
}

/**
 * 配置面。写进 profile 的 `cordis.patch.yml`：
 *
 *     - id: aivn
 *       name: dsh-aivn
 *       config:
 *         tts:
 *           keys: ["<your-fish-key>"]
 *         search:
 *           keys: ["<your-exa-key>"]
 *         shell: false
 *
 * 不想把 key 写进配置文件的话留空，走环境变量（`DSH_AIVN_TTS_KEYS` / `DSH_AIVN_EXA_KEYS`，
 * 逗号分隔）。两处都没有 = 那项能力停用：`list_voices` / `web_search` 不注册，提示词里也不提。
 */
export const Config = z.object({
	tts: z
		.object({
			keys: z.array(z.string()).default([]),
			baseUrl: z.string().default(DEFAULT_TTS_BASE_URL),
			model: z.string().default(DEFAULT_TTS_MODEL),
			concurrency: z.natural().default(2),
		})
		.default({}),
	shell: z.boolean().default(false),
	search: z
		.object({
			keys: z.array(z.string()).default([]),
			baseUrl: z.string().default(DEFAULT_EXA_BASE_URL),
		})
		.default({}),
});

export async function apply(ctx: Context, config: Config = {}): Promise<() => void> {
	const hub = new StageHub();
	const guard = new BeatGuard();
	/** 「引擎自己投的消息」的登记，追收束（`beat-guard`）与静默推进（`routes`）共用一份。 */
	const injected = new InjectedMessages();
	const ttsKeys = configuredKeys(config);
	const ttsBaseUrl = config.tts?.baseUrl ?? DEFAULT_TTS_BASE_URL;
	const tts = createTts(ttsKeys, ttsBaseUrl, config.tts?.model ?? DEFAULT_TTS_MODEL);
	const voice = new VoiceHost(tts, hub, ctx.logger, config.tts?.concurrency ?? 2);
	if (tts) ctx.logger.info('[dsh-aivn] 语音已启用（Fish Audio TTS）');
	else ctx.logger.info('[dsh-aivn] 没配 TTS key，语音停用');

	// 搭台助手的能力面：只留会变的三位，装载时定值（配置改了要重启 dsh，与 profile 里其它插件一致）。
	const capabilities = resolveCapabilities({
		shell: config.shell ?? false,
		ttsKeys,
		exaKeys: configuredExaKeys(config),
	});
	const voices = createVoiceCatalog(ttsKeys, ttsBaseUrl);
	const exa = createExa(configuredExaKeys(config), config.search?.baseUrl ?? DEFAULT_EXA_BASE_URL);
	ctx.logger.info(
		`[dsh-aivn] 搭台助手能力：音色库 ${capabilities.voice ? '开' : '关'}、联网检索 ${
			capabilities.search ? '开' : '关'
		}、命令行 ${capabilities.shell ? '开' : '关'}`,
	);

	const disposers: Array<() => void> = [
		installStageTap(ctx, hub, guard, injected, voice),
		installPresetTools(ctx, hub, guard, { capabilities, voices, exa }),
		installBeatGuard(ctx, guard, injected),
		installPlayCommands(ctx),
		await registerPresets(ctx, { shell: capabilities.shell, capabilities }),
	];

	ctx.inject(['webServer'], (webCtx) => {
		disposers.push(installStageRoutes(webCtx, hub, injected, voice));
		webCtx.logger.info('[dsh-aivn] stage routes mounted on /aivn');
	});

	return () => {
		for (const dispose of disposers.splice(0)) dispose();
		// 路由随插件注销，但挂着的 SSE 连接与心跳不会自己走。
		hub.dispose();
		voice.dispose();
	};
}
