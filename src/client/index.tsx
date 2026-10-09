/**
 * dsh-aivn —— 浏览器半边。
 *
 * 往 `conversation.view` 槽注册一个会话视图条目：会话头部因此多一个「AIVN」tab，
 * 选中时整块对话主区渲染 `StageView`。数据不走 DSH 的会话数据管道（本视图
 * 不注册 uiConversation 的 view target），而是订阅宿主半边的 `/aivn/stream`。
 *
 * **这个 tab 只给剧作家会话**（2026-10-06 用户要求）：会话的预设一旦定下就不再变
 * （`projectionsBySession[<id>].values.agentPreset`），而 tab 列是全局的——
 * `slots.entries('conversation.view')` 不按会话过滤，唯一的过滤口是注册/撤销条目本身。
 * 所以这里盯着「当前会话」现登记、现撤销：切到搭台助手的会话，tab 就不在。
 *
 * 另一处贡献是**插件配置卡**：注册进 Plugins 页的 `plugins.bundle.config`（按包名 keyed），
 * 于是侧边栏 Plugins → dsh-aivn 里能直接改那 17 个字段，改完就地生效。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client';
import type {} from '@deepseek-ai/dsh-client-ui-settings/client';
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client';
import hostCss from './host.css';
import { injectCss } from './inject-css';
import { AivnConfigCard, AivnConfigController, NS as CONFIG_NS } from './settings-card';
import { installStageEntry } from './stage-entry';
import { StageView } from './stage-view';

/**
 * 客户端半边要用的两个服务面，按形状就地声明。
 *
 * 不用 ctx 上的类型：宿主半边也有一个叫 `sessions` 的服务（同名不同物，指向本地会话表），
 * 两边的声明在同一个 Context 接口上撞车，TS 解析到的是宿主那一个。这里只读两个字段，
 * 就地写清形状比引一整套客户端类型更稳。
 */
interface ClientServices {
	sessions: {
		list: {
			getSnapshot(): {
				byId: Readonly<Record<string, { projectionValues?: { agentPreset?: string } } | undefined>>;
			};
			subscribe(listener: () => void): () => void;
		};
	};
	uiSession: {
		adapter: {
			current: {
				getSnapshot(): { key: string | undefined };
				subscribe(listener: () => void): () => void;
			};
		};
	};
}

/** 会进舞台管线的那个预设（宿主半边注册的 id）。 */
const PLAYWRITER_PRESET = 'aivn-playwriter';

export const inject = ['slots', 'sessions', 'uiSession', 'configForms'];

export function apply(ctx: ClientContext): void {
	// 与 DSH 宿主界面的接缝样式（藏掉舞台页签下的原生输入框），见 host.css。
	injectCss('dsh-aivn/host.css', hostCss);
	const services = ctx as unknown as ClientServices;

	// 插件配置卡：宿主半边在服务 `dsh-aivn` 这个命名空间时才登记（插件停用/没装载时不出这张卡）。
	// 作用域走 `configForms.get(条目 id)`，与 DSH 自己的设置页同一份实现。
	const card = new AivnConfigController(ctx.configForms.get(CONFIG_NS), ctx.configForms.describe());
	ctx.effect(() => () => card.dispose(), 'dsh-aivn:config card subscription');
	ctx.effect(
		() =>
			ctx.configForms.whileServed([CONFIG_NS], () =>
				ctx.slots.inject('plugins.bundle.config', () =>
					ctx.slots.register(
						{
							name: 'plugins.bundle.config',
							key: 'dsh-aivn',
							inject: () => card.inject(),
						},
						AivnConfigCard,
					),
				),
			),
		'dsh-aivn:config card',
	);

	ctx.slots.inject('conversation.view', () =>
		ctx.effect(() => {
			let entry: (() => void) | undefined;
			/** 当前会话是不是剧作家会话：没有当前会话（新会话页）就当不是。 */
			const wanted = (): boolean => {
				const sessionId = services.uiSession.adapter.current.getSnapshot().key;
				if (sessionId === undefined) return false;
				// 会话行上的投影值（与 DSH 自己的预设标签同一个来源）。
				const row = services.sessions.list.getSnapshot().byId[sessionId];
				return row?.projectionValues?.agentPreset === PLAYWRITER_PRESET;
			};
			const sync = (): void => {
				if (wanted() === (entry !== undefined)) return;
				if (entry) {
					entry();
					entry = undefined;
					return;
				}
				entry = ctx.slots.register(
					{
						name: 'conversation.view',
						id: 'aivn-stage',
						order: 30,
						label: 'AIVN',
					},
					StageView,
				);
			};
			const offCurrent = services.uiSession.adapter.current.subscribe(sync);
			const offList = services.sessions.list.subscribe(sync);
			sync();
			return () => {
				offCurrent();
				offList();
				entry?.();
				entry = undefined;
			};
		}, 'dsh-aivn:stage view'),
	);

	// 新会话上的「开始游戏」，见 stage-entry.ts 的文件头（为什么只能是 DOM 接缝）。
	ctx.effect(() => installStageEntry(services), 'dsh-aivn:stage entry');
}
