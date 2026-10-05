/**
 * dsh-aivn —— 浏览器半边。
 *
 * 往 `conversation.view` 槽注册一个会话视图条目：会话头部因此多一个「舞台」tab，
 * 选中时整块对话主区渲染 `StageView`。数据不走 DSH 的会话数据管道（本视图
 * 不注册 uiConversation 的 view target），而是订阅宿主半边的 `/aivn/stream`。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client';
import hostCss from './host.css';
import { injectCss } from './inject-css';
import { StageView } from './stage-view';

export const inject = ['slots'];

export function apply(ctx: ClientContext): void {
	// 与 DSH 宿主界面的接缝样式（藏掉舞台页签下的原生输入框），见 host.css。
	injectCss('dsh-aivn/host.css', hostCss);

	ctx.slots.inject('conversation.view', () =>
		ctx.slots.register(
			{
				name: 'conversation.view',
				id: 'aivn-stage',
				order: 30,
				label: '舞台',
			},
			StageView,
		),
	);
}
