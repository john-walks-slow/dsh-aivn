/**
 * dsh-aivn —— 宿主半边。
 *
 * 会话工作区即剧目：剧作家预设的会话写 DSL，`stage-tap` 把它解析成舞台 IR
 * 送进中枢，`routes` 把这条流按会话分频发给浏览器半边的「舞台」视图。
 * 素材与生成工具在 `stagehand`（搭台助手）那一侧，见后续模块。
 */
import type { Context } from '@deepseek-ai/cordis';
import { StageHub } from './hub';
import { installStageRoutes } from './routes';
import { installStageTap } from './stage-tap';

export const name = 'dsh-aivn';
export { PLAYWRITER_PRESET, STAGEHAND_PRESET } from './session';

export const inject = ['agents', 'sessionController'];

export function apply(ctx: Context): () => void {
	const hub = new StageHub();
	const disposers: Array<() => void> = [installStageTap(ctx, hub)];

	ctx.inject(['webServer'], (webCtx) => {
		disposers.push(installStageRoutes(webCtx, hub));
		webCtx.logger.info('[dsh-aivn] stage routes mounted on /aivn');
	});

	return () => {
		for (const dispose of disposers.splice(0)) dispose();
	};
}
