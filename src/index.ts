/**
 * dsh-aivn —— 宿主半边。
 *
 * Phase 0 只装舞台路由，用来验证「插件包 → DSH 加载 → 浏览器半边 → 宿主路由」
 * 这条链。Phase 1 起这里会长出剧目数据层、提示词装配、DSL 管线与工具注册。
 */
import type { Context } from '@deepseek-ai/cordis';
import { installStageRoutes } from './routes';

export const name = 'dsh-aivn';
export const inject: string[] = [];

export function apply(ctx: Context): () => void {
	const disposers: Array<() => void> = [];

	ctx.inject(['webServer'], (webCtx) => {
		disposers.push(installStageRoutes(webCtx));
		webCtx.logger.info('[dsh-aivn] stage routes mounted on /aivn');
	});

	return () => {
		for (const dispose of disposers.splice(0)) dispose();
	};
}
