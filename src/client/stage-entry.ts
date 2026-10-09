/**
 * 新会话上的「开始游戏」。
 *
 * 需求（2026-10-09 用户提出）：新会话要有手段直接进 AIVN tab，按钮摆在**剧作家 chip 右边**，
 * 名字叫「开始游戏」，**点下去就发 START 并进 AIVN 页**。
 *
 * DSH 这边有两条硬约束，决定了这一件只能缝 DOM、而且「自动点页签」那半边必须靠观察者：
 *
 * 1. **空白会话不渲染页签列**。`ui-conversation` 对「已创建、已选中、一条消息都没发」的会话
 *    （`session.blank && conversationPhase === 'blank'`）传 `hideChrome: true`，页签列的条件是
 *    `showTabs = !hideChrome && tabs.length > 1`——发第一句话之前，AIVN 页签在 DOM 里不存在。
 * 2. **没有公开 API 能切 view**。选择存在 `ui-conversation` 私有的 per-session store 里
 *    （`setView` / `openView`），只发给 `conversation.session.header` 这个槽的占用者；
 *    普通插件拿不到（`ctx.conversation` 只有 send / cancel / queue，`uiConversation.binding()
 *    .activate()` 只激活数据 target、不改页签）。DSH 的社区提案 #5192 正是在问这件事，
 *    至今没有替代 API；现有插件（dsh-zen、dsh-view-manager）都走 DOM 点击。
 *
 * 于是这一枚键做三件事：
 *
 * - **摆位**：挂在 `[data-slot="conversation.hero.agentPreset"]` 的**后面**（那一格画的就是
 *   座位 chip 上那个预设名，紧挨着它右边就是「剧作家 ▾ 开始游戏」）。用 `data-slot` 这个稳定钩子
 *   认位置，不认哈希过的类名；也不是去 register 那个槽——它是 `single` 的，真去注册会把宿主的
 *   预设选择器顶掉。
 * - **发送**：按下去把 `START`（`play.json` 的 `opening`）投给剧作家。这条消息发出的那一刻，
 *   剧作家起笔、页签列被带出来——**不依赖页面先渲染出 tab 列**，所以它是可靠的落点。
 * - **进页**：紧接着点一下 AIVN 页签。点中之后选择由 DSH 自己持久化（`dsh.conversation.<会话>`），
 *   刷新照样停在舞台上。
 *
 * 发送走的是 `stage-view` 开演那一条**同一条路**（`POST /aivn/input`），不另开一个口：
 * 宿主侧的落点只有一个（`stage-tap` 的 inbox 监听），两条路既不会各写一条、也不会漏写。
 *
 * 页签可能比渲染晚到位（它要等会话面把这条消息收下才不再 blank），所以点页签这一步交给一个观察者
 * 等它出现——这一等是有上界的（见 `ARM_TTL_MS`），否则发送失败时会永远欠着。
 */
/** 舞台在 `conversation.view` 上的条目 id（`src/client/index.tsx` 注册时的 `id`）。 */
export const STAGE_VIEW_ID = 'aivn-stage';

/** 条目在页签上的可见名（`label`）。 */
const STAGE_TAB_LABEL = 'AIVN';

/** 会进舞台管线的预设（宿主半边注册的 id）。 */
const PLAYWRITER_PRESET = 'aivn-playwriter';

/** 那一枚键。 */
const START_BUTTON_ID = 'dsh-aivn-start-game';
const LABEL = '开始游戏';
const HINT = '开始游戏：把 START 投给剧作家，并切到舞台';

/** 宿主在 Hero 那行画预设名的槽（座位 chip 就在里面）。 */
const PRESET_SLOT = '[data-slot="conversation.hero.agentPreset"]';

/**
 * 开局指令缺省值，与 `@aivn/core` 的 `DEFAULT_OPENING` 同字面。
 *
 * 这只是兜底：正常情况下我们读到的 `play.json` 一定带 `opening`（那份配置由 `/new-play` 或模型
 * 照着《剧目文件》写出来，`opening` 是必填）。写死一份是为了「读到之前按下」也不发空消息，
 * 字面必须与 core 保持一致——两边都写「（游戏开始，请演出第一轮）」这件事是刻意重复的，
 * 改了 core 那份要同步这里。
 */
const DEFAULT_START = '（游戏开始，请演出第一轮）';

/**
 * 欠着的那次「点页签」最多等多久。
 *
 * 发送成功、但页签迟迟不出来的唯一可能是这条路出了别的问题；不能让观察者无限期地挂着——
 * 超时就把账销掉，玩家还能自己点页签。
 */
const ARM_TTL_MS = 90_000;

/**
 * 只声明这里真正读到的那几个字段。
 *
 * 宿主半边也有一个叫 `sessions` 的服务（同名不同物），两边的声明在同一个 Context 接口上撞车，
 * 所以按形状就地收窄（与 `index.tsx` 同一手法）。
 */
export interface EntryServices {
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

/**
 * 装上「开始游戏」这条缝。返回卸载函数（与 `ctx.effect` 的约定一致）。
 */
export function installStageEntry(services: EntryServices): () => void {
	if (typeof document === 'undefined') return () => undefined;

	/** 按过「开始游戏」、正等着页签列冒出来好切过去的会话 → 超时时刻。 */
	const pending = new Map<string, number>();
	/** 观察者当前盯着的那棵树（会话切换会把整棵头部换掉）。 */
	let watched: Element | null = null;
	let observer: MutationObserver | null = null;
	/** 还没有 Hero 可盯时的落脚点，见 `watch`。 */
	let bootObserver: MutationObserver | null = null;
	/** 每个会话的开局指令（按下时那条消息要发的正文）。读到就缓存，按会话记。 */
	const openings = new Map<string, string>();

	const sessionId = (): string | undefined => services.uiSession.adapter.current.getSnapshot().key;

	/** 这个会话是不是剧作家会话（与舞台页签同一个判据、同一个来源）。 */
	const wanted = (id: string | undefined): boolean =>
		id !== undefined &&
		services.sessions.list.getSnapshot().byId[id]?.projectionValues?.agentPreset === PLAYWRITER_PRESET;

	/** 宿主画预设名的那一格；没有它（对话态、别的界面）就没有这一枚的落点。 */
	const presetSlot = (): Element | null => document.querySelector(PRESET_SLOT);

	/**
	 * 观察点：整块 Hero 输入区。
	 *
	 * 选它、而不是选中 slot 自己——页签列与这一格**不在同一棵子树里**（见 `watch` 的说明）。
	 * 往上抬到 composer 的根，页签列冒出来时它一定在。
	 */
	const hero = (): Element | null =>
		presetSlot()?.closest('[data-chain-overlay-fallback]') ?? presetSlot()?.parentElement ?? null;

	/** 这一条会话的页签列在不在。 */
	const hasTabs = (): boolean => document.querySelector('[data-conversation-tabs]') !== null;

	const stageTab = (): HTMLElement | null =>
		([...document.querySelectorAll('[role="tab"]')] as HTMLElement[]).find(
			(el) => (el.textContent ?? '').trim() === STAGE_TAB_LABEL,
		) ?? null;

	const button = (): HTMLButtonElement | null => document.getElementById(START_BUTTON_ID) as HTMLButtonElement | null;

	/**
	 * 开局指令：`play.json` 的 `opening`。
	 *
	 * 发出去的正文就是它（与舞台「开演」按钮同一个口径），所以按下之前得先把它读进来。
	 * 读到就缓存；读不到先用缺省那份顶上，下一轮结算会补上真的。
	 */
	const opening = (id: string): string => {
		const cached = openings.get(id);
		if (cached !== undefined) return cached;
		void fetch(`/aivn/play?session=${encodeURIComponent(id)}`)
			.then((response) => (response.ok ? (response.json() as Promise<{ config?: { opening?: string } }>) : null))
			.then((payload) => {
				const text = payload?.config?.opening?.trim();
				if (text) {
					openings.set(id, text);
					refresh();
				}
			})
			.catch(() => undefined);
		return DEFAULT_START;
	};

	/** 把 START 投给剧作家。与舞台的「开演」同一条路（`/aivn/input`）。 */
	const sendStart = async (id: string): Promise<boolean> => {
		try {
			const response = await fetch('/aivn/input', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ session: id, text: opening(id) }),
			});
			return response.ok;
		} catch {
			return false;
		}
	};

	const press = (id: string): void => {
		// 先把账记上：页签要等会话面收下这条消息才画得出来（见文件头），所以点页签这一步
		// 只能等观察者。发送失败再把它销掉。
		pending.set(id, Date.now() + ARM_TTL_MS);
		// 到期用定时器销账，而不是只在下一次 DOM 变化时顺手判：那会让观察者在一棵安静的 DOM 上
		// 一直挂着（它盯的是整个 body，别的会话每帧都在改）。
		window.setTimeout(() => {
			if (pending.get(id) === undefined) return;
			pending.delete(id);
			refresh();
		}, ARM_TTL_MS);
		void sendStart(id).then((sent) => {
			if (!sent) pending.delete(id);
			refresh();
		});
	};

	const makeButton = (id: string): HTMLButtonElement => {
		const element = document.createElement('button');
		element.id = START_BUTTON_ID;
		element.type = 'button';
		element.className = 'aivn-start-game';
		element.textContent = LABEL;
		element.title = HINT;
		element.setAttribute('aria-label', HINT);
		element.addEventListener('click', (event) => {
			// 点它不该顺带落到宿主那行自己的手势上。
			event.stopPropagation();
			press(id);
		});
		return element;
	};

	/**
	 * 把观察点挪到当前那棵 Hero 上（会话切换会把整棵换掉）。
	 *
	 * 观察点选 Hero 那一行、而不是选中 slot 自己：页签列与它**不在同一棵子树里**——页签列挂在
	 * 「头部 → 那块插槽容器 → 页签列」底下（2026-10-09 实测，`corner.parentElement.contains(tabs)`
	 * 为 false）。要让「页签列冒出来」被看见，观察点得抬到它俩公共的那一层；Hero 那行在整个
	 * composer 栈里都在，页签列出现时它也在，够用且够浅。
	 *
	 * **不订 attributes**：否则我们自己点页签造成的 `aria-selected` 变化会把自己再叫一轮。
	 * 插件装载时 Hero 可能还没画出来（甚至还没有会话），盯不到就先退一步盯整个 body。
	 */
	const watch = (): void => {
		const host = hero();
		if (host === watched && (observer !== null || bootObserver !== null)) return;

		observer?.disconnect();
		observer = null;
		bootObserver?.disconnect();
		bootObserver = null;
		watched = host;

		if (host !== null) {
			observer = new MutationObserver(() => refresh());
			observer.observe(host, { childList: true, subtree: true });
			return;
		}
		// body 那一档只在「还没有会话、也还没有 hero 那行」的装载期用得上：订的是整个页面，
		// 会话区正文每帧都在长，长期挂着一场戏就是在白烧 CPU。没有会话可等时没人会来画那一行，
		// 观察者也就没有等的对象——直接不订。
		if (sessionId() === undefined) return;
		if (document.body === null) return;
		bootObserver = new MutationObserver(() => refresh());
		bootObserver.observe(document.body, { childList: true, subtree: true });
	};

	/**
	 * 结算一次。**只在真的需要变的时候碰 DOM**，否则观察者会被自己的改动再叫一轮。
	 */
	const refresh = (): void => {
		watch();
		const id = sessionId();
		const button_ = button();

		// 不是剧作家会话（或没有当前会话）：这一枚不该在。
		if (id === undefined || !wanted(id)) {
			button_?.remove();
			return;
		}

		// 欠着的那次点击：页签一出现就兑现（见文件头：它是这条链的落点）。
		const deadline = pending.get(id);
		if (deadline !== undefined) {
			if (Date.now() > deadline) {
				pending.delete(id);
			} else if (hasTabs()) {
				pending.delete(id);
				stageTab()?.click();
			}
		}

		// Hero 那一行没了（对话态、别的界面）：这一枚撤掉。开局指令的缓存跟着会话走，不在这里清。
		const slot = presetSlot();
		if (slot === null) {
			button_?.remove();
			return;
		}

		const next = button_ ?? makeButton(id);
		// 插在预设名的**右边**：宿主画的就是这一格，紧挨着它后面就是「剧作家 ▾ 开始游戏」。
		if (next.previousElementSibling !== slot) slot.after(next);
	};

	const offCurrent = services.uiSession.adapter.current.subscribe(refresh);
	const offList = services.sessions.list.subscribe(refresh);
	refresh();

	return () => {
		offCurrent();
		offList();
		observer?.disconnect();
		observer = null;
		bootObserver?.disconnect();
		bootObserver = null;
		watched = null;
		pending.clear();
		openings.clear();
		button()?.remove();
	};
}
