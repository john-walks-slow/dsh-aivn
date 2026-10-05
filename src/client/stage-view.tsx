/**
 * 「舞台」会话视图（conversation.view 槽位条目）。
 *
 * 数据来自宿主半边按会话分频的帧流（`/aivn/stream?session=`），画面整块交给
 * `@aivn/stage` 的 `StageTheater`：这里只做「接数据 → 组装 → 交出去」，
 * 不自己写播放器、也不自己画台词条。
 *
 * 与 AIVN app 的三处接线差异，都源于插件这边没有编排器、没有谱系、也不做合成：
 *
 * - **没有谱系**：`buildTranscript(null, lines)` 出来的条目 nodeId 恒为 null，
 *   改写/分岔/回顾/生图按钮天然置灰。导演工作栏整个不渲染（`directorBar={false}`），
 *   `onView` 空转（上滑手势等于没接）。
 * - **没有语音**：`voiceAvailable={false}`，三态恒 none，重听按钮不出现。
 * - **轮边界来自宿主**：不是编排器的 `beat_end`，是 tap 从 `agent/status` 摘下来的
 *   `beat` 帧——剧作家起笔即开演，停笔即「写完了，等玩家」。
 *
 * 玩家输入只有一个出口：`POST /aivn/input`。它把话投给剧作家，落进时间线由宿主的
 * `agent/inbox/inserted` 监听统一负责——DSH 原生输入框与这里的选肢卡走的是同一条路。
 */
import { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react';
import {
	SETTING_CONTINUE_CARD,
	ScriptBuilder,
	StageTheater,
	StopPanel,
	ToastStack,
	buildAssetIndex,
	buildTranscript,
	readFlag,
	stopAffordance,
	usePlayback,
	useToasts,
	type DirectorTargets,
} from '@aivn/stage';
import type { AssetMeta, PlayConfig, StageEvent, StopPayload } from '@aivn/core';
import stageCss from '@aivn/stage/stage.css';

/** 样式注入的标识：同一个 id 只挂一次，热重载与多视图并存时不会叠出第二份。 */
const CSS_TAG_ID = '@aivn/stage/stage.css';

if (typeof document !== 'undefined' && document.querySelector(`style[data-plugin-css="${CSS_TAG_ID}"]`) === null) {
	const tag = document.createElement('style');
	tag.dataset.plugin = 'dsh-aivn';
	tag.dataset.pluginCss = CSS_TAG_ID;
	tag.textContent = stageCss;
	document.head.appendChild(tag);
}

/** 宿主 `/aivn/stream` 上的一帧，与宿主 `src/hub.ts` 的 `StageFrame` 同构。 */
type StageFrame =
	| { seq: number; kind: 'ir'; event: StageEvent }
	| { seq: number; kind: 'beat'; state: 'start' | 'end' };

interface PlayPayload {
	/** 没有剧目时为 null。 */
	dir: string | null;
	config?: PlayConfig;
}

interface AssetsPayload {
	index: Record<string, string[]>;
	manifest: Record<string, AssetMeta>;
}

export interface StageViewProps {
	/** 会话作用域槽位由框架注入；session-maybe 下可能为空。 */
	sessionId?: string;
}

export const StageView: FC<StageViewProps> = ({ sessionId }) => {
	const [builder] = useState(() => new ScriptBuilder());
	const [revision, setRevision] = useState(0);
	const [live, setLive] = useState(false);
	const [stop, setStop] = useState<StopPayload | null>(null);
	const [isNoStop, setIsNoStop] = useState(false);
	const [turbo, setTurbo] = useState(false);
	const [play, setPlay] = useState<PlayPayload | null>(null);
	const [assets, setAssets] = useState<AssetsPayload | null>(null);
	const [failed, setFailed] = useState<string | null>(null);
	const toast = useToasts();
	const [continueCardOn] = useState(() =>
		typeof window === 'undefined' ? false : readFlag(window.localStorage, SETTING_CONTINUE_CARD, false),
	);

	/**
	 * 这一轮里剧作家交过停止点没有。
	 *
	 * 用 ref 而不是 state：它与渲染无关，只在一个 `beat` 帧到达的那一刻被读一次；
	 * 放进 state 会多绕一轮渲染，还可能读到上一个「停笔」事件的值。
	 */
	const sawStop = useRef(false);
	/** 重渲按帧合并：SSE 补推历史上千帧时，一帧一次 render 会把首屏拖垮。 */
	const renderQueued = useRef(false);

	const requestRender = useCallback((): void => {
		if (renderQueued.current) return;
		renderQueued.current = true;
		requestAnimationFrame(() => {
			renderQueued.current = false;
			setRevision((n) => n + 1);
		});
	}, []);

	/* 剧目与素材：两者都只在会话变化时取一次。素材表要等剧目确认存在再取——
	   不是剧目的会话会拿到 404，那是预期内的空态，不该报错。 */
	useEffect(() => {
		if (!sessionId) return;
		let cancelled = false;
		setPlay(null);
		setAssets(null);
		setFailed(null);
		void (async () => {
			try {
				const info = (await getJson(`/aivn/play?session=${encodeURIComponent(sessionId)}`)) as PlayPayload;
				if (cancelled) return;
				setPlay(info);
				if (!info.dir) return;
				const loaded = (await getJson(
					`/aivn/assets?session=${encodeURIComponent(sessionId)}`,
				)) as AssetsPayload;
				if (!cancelled) setAssets(loaded);
			} catch (error) {
				if (!cancelled) setFailed(describe(error));
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [sessionId]);

	/* 舞台帧流。EventSource 自带重连，这里只负责把帧翻译成两样东西：
	   IR 喂给 ScriptBuilder（`beat` 帧不是 IR，只动轮边界）。 */
	useEffect(() => {
		if (!sessionId) return;
		const source = new EventSource(`/aivn/stream?session=${encodeURIComponent(sessionId)}`);
		source.addEventListener('ir', (message) => {
			let frame: StageFrame;
			try {
				frame = JSON.parse((message as MessageEvent<string>).data) as StageFrame;
			} catch {
				return; // 坏帧丢弃：整条流不该因为一条解析不了的数据断掉
			}

			if (frame.kind === 'beat') {
				if (frame.state === 'start') {
					sawStop.current = false;
					setStop(null);
					setIsNoStop(false);
					setLive(true);
				} else {
					// 停笔了还在演最后一句是常态：面板要不要出由 playback 的 exhausted 决定，
					// 这里只报「这一轮有没有交出过停止点」。
					setIsNoStop(!sawStop.current);
					setLive(false);
				}
				return;
			}

			if (frame.event.kind === 'stop') {
				sawStop.current = true;
				setStop({
					stopType: frame.event.stopType,
					...(frame.event.options ? { options: frame.event.options } : {}),
					...(frame.event.placeholder ? { placeholder: frame.event.placeholder } : {}),
				});
			}
			builder.apply(frame.event, frame.seq);
			requestRender();
		});
		return () => source.close();
	}, [sessionId, builder, requestRender]);

	/** 把一句话投给剧作家。时间线那一笔由宿主的 inbox 监听写下，这里不重复。 */
	const send = useCallback(
		async (text: string): Promise<void> => {
			const trimmed = text.trim();
			if (!trimmed || !sessionId) return;
			try {
				await postJson('/aivn/input', { session: sessionId, text: trimmed });
			} catch (error) {
				toast.push(`没能送到剧作家：${describe(error)}`, 'error');
			}
		},
		[sessionId, toast],
	);

	const lines = builder.lines;
	const playConfig = play?.dir ? (play.config ?? null) : null;

	const names = useMemo(
		() => Object.fromEntries((playConfig?.characters ?? []).map((card) => [card.id, card.name ?? card.id])),
		[playConfig],
	);

	const index = useMemo(() => {
		if (!playConfig || !assets || !sessionId) return null;
		// 立绘绑定读的是 `sprite:`，角色卡正文这层用不上——补一个空 body 满足类型。
		const cast = (playConfig.characters ?? []).map((card) => ({ ...card, body: '' }));
		return buildAssetIndex(playConfig.id, assets.index, {}, assets.manifest, cast, {
			assetUrl: (path) => `/aivn/asset?session=${encodeURIComponent(sessionId)}&path=${encodeURIComponent(`assets/${path}`)}`,
		});
	}, [playConfig, assets, sessionId]);

	const transcript = useMemo(() => buildTranscript(null, lines), [lines, revision]);

	const playback = usePlayback(builder.cues, lines, {
		live,
		resume: true,
		revision,
		transcript,
		turbo,
	});

	const busy = live;
	const lineDone = playback.current === null || playback.shownLength >= playback.current.text.length;
	const panelReady = !busy && playback.exhausted && lineDone;
	const affordance = stopAffordance({
		ready: panelReady,
		stopType: stop?.stopType ?? null,
		isNoStop,
		continueCardOn,
	});

	const targets: DirectorTargets = {
		beatId: null,
		beatNodeId: null,
		lineNodeId: null,
		lineSeq: playback.view?.seq ?? null,
		lineText: playback.view?.text ?? '',
	};

	if (!sessionId) return <Notice text="这个会话还没有舞台。" />;

	if (failed) return <Notice text={`舞台没接上：${failed}`} />;

	if (!play) return <Notice text="正在连接舞台…" />;

	if (!playConfig) {
		return <Notice text={`这个会话的工作目录里没有 play.json，还不是一座剧目：${play.dir ?? ''}`} />;
	}

	if (!index) return <Notice text="正在读取剧目素材…" />;

	return (
		<div className="stage-root aivn-stage-view" style={{ height: '100%', minHeight: 0 }}>
			<StageTheater
				visual={playback.visual}
				playback={playback}
				live={live}
				fresh={lines.length === 0}
				names={names}
				index={index}
				voiceAvailable={false}
				voiceOn={false}
				onToggleVoice={noop}
				busy={busy}
				targets={targets}
				directorBar={false}
				onView={noop}
				onPrompt={(text) => void send(text)}
				onEdit={noop}
				onFork={noop}
				onGenerateCg={noop}
				onReplay={noop}
				voiceState={() => 'none'}
				onUnlock={noop}
				onTurbo={setTurbo}
				canContinue={affordance.clickToContinue}
				onContinue={() => void send(playConfig.opening)}
				overlay={
					playback.scrubbed ? null : lines.length === 0 ? (
						/* 空舞台：摆一个「开演」，等玩家按第一下。开局指令是剧目自己的 opening。 */
						<div className="choice-overlay" role="group" aria-label="开演">
							<div className="choices">
								<button type="button" className="choice" onClick={() => void send(playConfig.opening)}>
									<span className="choice-text">开演</span>
								</button>
							</div>
						</div>
					) : panelReady ? (
						<StopPanel
							stop={stop}
							isNoStop={isNoStop}
							showContinue={affordance.showContinueCard}
							disabled={busy}
							onChoice={(choice) => void send(stop?.options?.[choice]?.text ?? '')}
							onFree={(text) => void send(text)}
							onContinue={() => void send(playConfig.opening)}
						/>
					) : null
				}
			/>
			<ToastStack toasts={toast.toasts} onDismiss={toast.dismiss} />
		</div>
	);
};

function noop(): void {
	/* 插件这边没有对应的落点，见文件头。 */
}

function Notice({ text }: { text: string }) {
	return (
		<div
			className="stage-root aivn-stage-notice"
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 24,
				color: 'var(--ink, #3b3630)',
				fontSize: 14,
				textAlign: 'center',
			}}
		>
			<span>{text}</span>
		</div>
	);
}

async function getJson(url: string): Promise<unknown> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
	return res.json();
}

async function postJson(url: string, body: unknown): Promise<void> {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

function describe(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
