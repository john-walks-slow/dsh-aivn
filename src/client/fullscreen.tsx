/**
 * 舞台的全屏键：进 / 出全屏，以及进不去时的兜底。
 *
 * 两档，按浏览器的能力走：
 *
 * - **原生全屏**（`Element.requestFullscreen`）：Chrome、Edge、Firefox、Android Chrome 都有。
 *   画面整块交给浏览器，连系统状态栏一起收掉。退出走 `document.exitFullscreen`，另外浏览器
 *   自己的 Esc 也管用——两个出口都由 `fullscreenchange` 收敛到同一份状态。
 * - **CSS 伪全屏**：**iPhone Safari 不支持元素全屏**（只有 iPad / macOS 的 Safari 支持），
 *   调过去直接抛错。那一档就把这块视图 `position: fixed; inset: 0` 铺满视口——盖住宿主界面，
 *   但收不掉 Safari 自己的地址栏。这是该平台给得出的上限，不是这里的取舍。
 *
 * 状态只有一处真相（`document.fullscreenElement`）：进出全屏的所有路径（我们的按钮、浏览器的
 * Esc、别的脚本）都要走它，否则按钮上的字会跟画面对不上。CSS 那一档没有浏览器事件可听，
 * 所以它自己的 Esc 由这里接住。
 *
 * 字形自己画，不从 `@aivn/stage` 的图标表里取：那张表只有「放大」（`expand`，AIVN app 拿它当
 * 「看全树」），没有配对的「缩小」。为这一枚去改兄弟仓库的图标表，等于让从源码构建的人多背一处
 * 跨仓依赖，不如这十行 SVG 就放在用它的地方。
 */
import { useCallback, useEffect, useRef, useState, type FC, type RefObject } from 'react';

/** 全屏的三态：没全屏 / 原生全屏 / CSS 伪全屏。 */
export type FullscreenMode = 'off' | 'native' | 'css';

export interface FullscreenState {
	/** 现在是不是全屏（两档都算）。 */
	on: boolean;
	/** CSS 伪全屏那一档：调用方据此给自己那一层加类（见 `fullscreenCss`）。 */
	css: boolean;
	/** 进 / 出全屏。必须在用户手势里调（浏览器要求 transient activation）。 */
	toggle: () => void;
}

/**
 * 把一块元素做成可全屏的。
 *
 * @param target - 要铺满的那一层（舞台视图的根）。
 * @returns 当前状态与切换函数。
 */
export function useFullscreen(target: RefObject<HTMLElement | null>): FullscreenState {
	const [mode, setMode] = useState<FullscreenMode>('off');
	/**
	 * 上一帧的档位，给 `fullscreenchange` 用。
	 *
	 * 那个事件什么都带不来，只能靠「谁是 fullscreenElement」反推；而 CSS 那一档根本不发事件，
	 * 所以要分清「浏览器退出了原生全屏」和「我们本来就在 CSS 档」——前者要收状态，后者不能动。
	 */
	const modeRef = useRef<FullscreenMode>('off');
	modeRef.current = mode;

	useEffect(() => {
		const sync = (): void => {
			const element = target.current;
			if (element !== null && document.fullscreenElement === element) {
				setMode('native');
				return;
			}
			// 原生全屏没了：我们之前是原生档才收状态（CSS 档不会走到这里）。
			if (modeRef.current === 'native') setMode('off');
		};
		document.addEventListener('fullscreenchange', sync);
		return () => document.removeEventListener('fullscreenchange', sync);
	}, [target]);

	/** CSS 那一档没有浏览器事件，Esc 自己接（原生那一档交给浏览器自己的 Esc）。 */
	useEffect(() => {
		if (mode !== 'css') return;
		const onKey = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') setMode('off');
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [mode]);

	const toggle = useCallback((): void => {
		const element = target.current;
		if (element === null) return;

		if (modeRef.current === 'native') {
			void document.exitFullscreen().catch(() => undefined);
			return;
		}
		if (modeRef.current === 'css') {
			setMode('off');
			return;
		}
		// 进来一次：先试原生，这个平台给不出来（iPhone Safari）就退到 CSS 档。
		// 抛错也走同一条兜底——权限、iframe 的 allowfullscreen 都可能让它失败。
		const request = element.requestFullscreen?.bind(element);
		if (request === undefined) {
			setMode('css');
			return;
		}
		void request()
			.then(() => setMode('native'))
			.catch(() => setMode('css'));
	}, [target]);

	return { on: mode !== 'off', css: mode === 'css', toggle };
}

/**
 * CSS 伪全屏那一档的样式。
 *
 * 高度的口子不跟调用方抢：视图根本来是 `height: 100%` 的内联样式，而 `position: fixed` 之后
 * 那个 100% 是相对**视口**算的，正好就是铺满——所以这里一个字都不用覆盖。
 *
 * `z-index` 取一个大数（与 `dsh-live-mode` 同一个口径，实测能压住宿主）：DSH 自己的浮层用的是
 * 普通量级（舞台这边的弹窗是 90），跟它比大小没有意义，要的是「高于宿主的一切」。
 */
export const fullscreenCss = `
.aivn-stage-view.aivn-css-full {
	position: fixed;
	inset: 0;
	z-index: 2147483000;
	background: var(--bg);
}
`;

/** 四角箭头的两种朝向：朝外 = 进全屏，朝里 = 退全屏。 */
function FullscreenGlyph({ exit }: { exit: boolean }) {
	// 四个角的折线；exit 时折线整体缩到内圈（标准的最大化 / 还原一对字形）。
	const corners = exit
		? ['M9 3v6H3', 'M15 3v6h6', 'M9 21v-6H3', 'M15 21v-6h6']
		: ['M3 9V3h6', 'M21 9V3h-6', 'M3 15v6h6', 'M21 15v6h-6'];
	return (
		<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block' }}>
			{corners.map((d) => (
				<path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
			))}
		</svg>
	);
}

/**
 * 舞台左上角那枚全屏键。
 *
 * 只在**真的能全屏**时出现：`requestFullscreen` 与 CSS 档二者总要有一个能兜住，所以只要
 * 元素不是 null 就摆得出来。字面自己说状态（全屏 / 退出全屏），不靠字形分辨——舞台上压着画面，
 * 一枚只有图标的键在亮背景里读不出来。
 */
export const FullscreenButton: FC<{ state: FullscreenState }> = ({ state }) => (
	<button
		type="button"
		className={`aivn-fullscreen${state.on ? ' on' : ''}`}
		title={state.on ? '退出全屏（Esc）' : '全屏'}
		aria-label={state.on ? '退出全屏' : '全屏'}
		aria-pressed={state.on}
		onClick={(event) => {
			// 别让这一下落到舞台自己的点击手势上（那是「继续」）。
			event.stopPropagation();
			state.toggle();
		}}
	>
		<FullscreenGlyph exit={state.on} />
		{state.on ? '退出全屏' : '全屏'}
	</button>
);
