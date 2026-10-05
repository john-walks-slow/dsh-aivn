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
import { BeatGuard, installBeatGuard } from './beat-guard';
import { installPlayCommands } from './commands';
import { StageHub } from './hub';
import { InjectedMessages } from './injected';
import { registerPresets } from './playwriter/preset';
import { installPresetTools } from './preset-tools';
import { installStageRoutes } from './routes';
import { installStageTap } from './stage-tap';

export const name = 'dsh-aivn';
export { PLAYWRITER_PRESET, STAGEHAND_PRESET } from './session';

export const inject = ['agents', 'sessionController', 'agentPresets', 'commands'];

export async function apply(ctx: Context): Promise<() => void> {
	const hub = new StageHub();
	const guard = new BeatGuard();
	/** 「引擎自己投的消息」的登记，追收束（`beat-guard`）与静默推进（`routes`）共用一份。 */
	const injected = new InjectedMessages();
	const disposers: Array<() => void> = [
		installStageTap(ctx, hub, guard, injected),
		installPresetTools(ctx, hub, guard),
		installBeatGuard(ctx, guard, injected),
		installPlayCommands(ctx),
		await registerPresets(ctx),
	];

	ctx.inject(['webServer'], (webCtx) => {
		disposers.push(installStageRoutes(webCtx, hub, injected));
		webCtx.logger.info('[dsh-aivn] stage routes mounted on /aivn');
	});

	return () => {
		for (const dispose of disposers.splice(0)) dispose();
		// 路由随插件注销，但挂着的 SSE 连接与心跳不会自己走。
		hub.dispose();
	};
}
