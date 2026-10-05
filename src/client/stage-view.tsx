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
	ScriptBuilder,
	SETTING_VOICE,
	StageTheater,
	StopPanel,
	ToastStack,
	VoiceDirector,
	buildAssetIndex,
	buildTranscript,
	readFlag,
	stopAffordance,
	usePlayback,
	useToasts,
	writeFlag,
	type DirectorTargets,
} from '@aivn/stage';
import type { AssetMeta, PlayConfig, StageEvent, StopPayload } from '@aivn/core';
import stageCss from '@aivn/stage/stage.css';
import { injectCss } from './inject-css';

/** 「继续」投出去的正文：一句括号里的舞台指示，宿主侧会标 `silent`（不上玩家时间线）。 */
const CONTINUE = '（继续）';

injectCss('@aivn/stage/stage.css', stageCss);

/** 语音总开关的持久化键（与 AIVN 同一个 localStorage 键，切换过来时沿用玩家的选择）。 */
const VOICE_FLAG = SETTING_VOICE;

/** 宿主 `/aivn/stream` 上的一帧，与宿主 `src/hub.ts` 的 `StageFrame` 同构。 */
type StageFrame =
	| { seq: number; kind: 'ir'; event: StageEvent }
	| { seq: number; kind: 'beat'; state: 'start' | 'end' }
	/** `lineSeq` 是那一行 `say_start` 帧的 seq，不是本帧的 seq。 */
	| { seq: number; kind: 'voice'; lineSeq: number; phrase: number; state: 'started' | 'ready'; url?: string };

interface PlayPayload {
	/** 没有剧目时为 null。 */
	dir: string | null;
	config?: PlayConfig;
	/** 宿主配了 TTS 才有语音：没有的时候连语音开关都不显示。 */
	voice?: boolean;
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
	const [resetToken, setResetToken] = useState(0);
	const toast = useToasts();
	const [voiceOn, setVoiceOn] = useState(() =>
		typeof window === 'undefined' ? true : readFlag(window.localStorage, VOICE_FLAG, true),
	);

	/**
	 * 这一轮里剧作家交过停止点没有。
	 *
	 * 用 ref 而不是 state：它与渲染无关，只在一个 `beat` 帧到达的那一刻被读一次；
	 * 放进 state 会多绕一轮渲染，还可能读到上一个「停笔」事件的值。
	 */
	/**
	 * 语音导演：单一 AudioContext、句级 gapless、背压上报。
	 *
	 * 它住在 `@aivn/stage` 里（`audio.ts`），插件这边只做三件事：把宿主推来的
	 * 「这一行在合成 / 好了」喂给它、把它的播放状态告诉舞台、把它要的背压转发回宿主。
	 */
	const directorRef = useRef<VoiceDirector | null>(null);
	if (directorRef.current === null) directorRef.current = new VoiceDirector();
	const director = directorRef.current;

	const sawStop = useRef(false);
	/**
	 * 已经应用到的最大 seq。
	 *
	 * EventSource 自带重连，而重连时中枢会在 `subscribe()` 里把缓冲**整段补推**一遍
	 * （见宿主 `hub.ts`）——不去重，一次网络抖动就把整部戏从头再演一遍。
	 */
	const lastSeq = useRef(0);
	/** 「继续」的连点闸：见 `continueOn`。 */
	const continued = useRef(false);
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

	/* 语音导演的接口：重渲通知、背压上报、总开关、卸载。 */
	useEffect(() => {
		director.onNotify = () => requestRender();
		director.onControl = (state) => {
			if (!sessionId) return;
			// 背压是省配额用的，失败了不值得打扰玩家——下一次积压还会再报一次。
			void postJson('/aivn/voice', { session: sessionId, ...state }).catch(() => undefined);
		};
		return () => {
			director.onNotify = null;
			director.onControl = null;
			director.dispose();
		};
	}, [director, sessionId, requestRender]);

	useEffect(() => {
		director.setEnabled(voiceOn);
	}, [director, voiceOn]);

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

		// 换会话 = 换一部戏。视图实例若被框架复用，`builder` 与 `lastSeq` 都还是上一部的：
		// 不清，新会话的补推会被当成重复帧丢掉（seq 从 1 起、小于上一部的最大值），
		// 舞台上留着上一部戏的台词。首挂时这一次结算打在空对象上，无害。
		builder.reset();
		director.reset();
		lastSeq.current = 0;
		sawStop.current = false;
		continued.current = false;
		setStop(null);
		setIsNoStop(false);
		setLive(false);
		setResetToken((n) => n + 1);
		requestRender();

		const source = new EventSource(`/aivn/stream?session=${encodeURIComponent(sessionId)}`);
		source.addEventListener('frame', (message) => {
			let frame: StageFrame;
			try {
				frame = JSON.parse((message as MessageEvent<string>).data) as StageFrame;
			} catch {
				return; // 坏帧丢弃：整条流不该因为一条解析不了的数据断掉
			}

			// 补推去重：已经应用过的帧丢掉。
			if (frame.seq > lastSeq.current + 1) {
				// 断档：断线期间滚出缓冲的帧（上限 4000）已经拿不回来，只能整段重放。
				// 把 lastSeq 压到 `seq - 1` 而不是 0，否则这一帧自己又会被判成断档，绕不出来。
				builder.reset();
				director.reset();
				setResetToken((n) => n + 1);
				sawStop.current = false;
				setStop(null);
				setIsNoStop(false);
				lastSeq.current = frame.seq - 1;
			}
			if (frame.seq <= lastSeq.current) return;
			lastSeq.current = frame.seq;

			if (frame.kind === 'voice') {
				// `lineSeq` 是那一行 `say_start` 帧的 seq——语音挂在台词行上，不是挂在流的位置上。
				if (frame.state === 'ready' && frame.url) director.handleAudio({ seq: frame.lineSeq, phrase: frame.phrase, url: frame.url });
				else if (frame.state === 'started') director.markPending(frame.lineSeq, frame.phrase);
				requestRender();
				return;
			}

			if (frame.kind === 'beat') {
				if (frame.state === 'start') {
					// 新的一轮：上一轮迟到的音频一律丢弃（语音导演按这个门槛清台账）。
					director.beatStarted();
					sawStop.current = false;
					setStop(null);
					setIsNoStop(false);
					setLive(true);
					// 新一轮开跑，放开「继续」的连点闸。
					continued.current = false;
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

	/**
	 * 把一句话投给剧作家。时间线那一笔由宿主的 inbox 监听写下，这里不重复。
	 *
	 * `silent` 标的是「这不是玩家说的话」：宿主照投，但不会把它落成一行台词。
	 * 返回是否送到，好让调用方在失败时放开自己的闸。
	 */
	const send = useCallback(
		async (text: string, opts?: { silent?: boolean }): Promise<boolean> => {
			const trimmed = text.trim();
			if (!trimmed || !sessionId) return false;
			try {
				await postJson('/aivn/input', {
					session: sessionId,
					text: trimmed,
					...(opts?.silent ? { silent: true } : {}),
				});
				return true;
			} catch (error) {
				toast.push(`没能送到剧作家：${describe(error)}`, 'error');
				return false;
			}
		},
		[sessionId, toast],
	);

	/**
	 * 「继续」：不是玩家的表态，是一句没有内容的推进指令。
	 *
	 * AIVN 的继续什么都不注入，但 DSH 的一条 user 消息必须有正文，所以给一句括号里的
	 * 舞台指示，并标成 `silent`——否则它会落成一行玩家台词，玩家会看见自己「说了」
	 * 一句没说过的话。**开局指令绝不能拿来当继续**：`no_stop` 的轮本来就默认可点击继续，
	 * 自然演完的每一轮点一下都会把「游戏开始」再投一遍。
	 *
	 * 连点只算一次（AIVN 同款 `continued` 闸）：不设闸，一次犹豫的双击就是两条推进。
	 * 送失败则放开，不然按钮会死在一次网络错误上。
	 */
	const continueOn = useCallback((): void => {
		if (continued.current) return;
		continued.current = true;
		void send(CONTINUE, { silent: true }).then((sent) => {
			if (!sent) continued.current = false;
		});
	}, [send]);

	const lines = builder.lines;
	const playConfig = play?.dir ? (play.config ?? null) : null;
	/** 宿主配了 TTS、这一座剧目也确实是剧目，才显示语音相关的一切。 */
	const voiceAvailable = play?.voice === true && playConfig !== null;

	const toggleVoice = useCallback((): void => {
		setVoiceOn((on) => {
			const next = !on;
			if (typeof window !== 'undefined') writeFlag(window.localStorage, VOICE_FLAG, next);
			return next;
		});
	}, []);

	/** 「点击开始」：移动端 AudioContext 必须在用户手势里 resume，不然一句都放不出来。 */
	const unlockVoice = useCallback((): void => {
		director.unlock();
		requestRender();
	}, [director, requestRender]);

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
		resetToken,
		// 语音在播时别自动翻页：台词读完但声音没完，自动模式会把它掐掉。
		hold: director.holdsLine(),
		onLineStart: (line) => director.lineStarted(line?.seq, line?.type === 'say'),
		onFastForward: () => director.fastForward(),
	});

	const busy = live;
	const lineDone = playback.current === null || playback.shownLength >= playback.current.text.length;
	const panelReady = !busy && playback.exhausted && lineDone;
	const affordance = stopAffordance({
		ready: panelReady,
		stopType: stop?.stopType ?? null,
		isNoStop,
		// 「继续卡片」是 AIVN 的一个开局设置，插件这边还没有写它的界面，
		// 读那个 flag 恒为 false（等于一段永远进不去的分支），所以先按关着算。
		continueCardOn: false,
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
				voiceAvailable={voiceAvailable}
				voiceOn={voiceOn}
				onToggleVoice={toggleVoice}
				busy={busy}
				targets={targets}
				directorBar={false}
				onView={noop}
				onPrompt={(text) => void send(text)}
				onEdit={noop}
				onFork={noop}
				onGenerateCg={noop}
				onReplay={(seq) => void director.replay(seq)}
				voiceState={(seq) => director.voiceState(seq)}
				onUnlock={unlockVoice}
				onTurbo={setTurbo}
				canContinue={affordance.clickToContinue}
				onContinue={continueOn}
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
							onContinue={continueOn}
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
