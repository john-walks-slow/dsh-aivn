/**
 * 重建夹具：手写一份**转写文本**，走真实的 `rebuildStage()`，看停止点还在不在。
 *
 * 为什么要有它：`<stop …/>` 是「写进剧本正文」的东西，而舞台的真相源是**会话面**——
 * 回退、重写、分支、冷会话首次打开都会把整条帧流重新投影一遍（`stage-log.ts`）。
 * 「停止点能在重建后存活」是这次改动的全部承诺，而解析层的单测**说明不了重建层**。
 * 这份夹具不碰 e2e 实例、不需要真模型：转写文本本来就可以手写（重建就是
 * 「读转写 → 逐条 `assistant/message` 喂进解析器 → 事件进中枢」）。
 *
 * ── 预期（先写下，再跑） ────────────────────────────────────────────────
 *
 * | 拍 | 剧本正文里的停止点 | 重建后应有的帧 |
 * |---|---|---|
 * | 1 | `<stop options="去天台 | 回家"/>` | **一帧** `ir` / `stop` / `stopType: "choice"` / `options: [{去天台},{回家}]` |
 * | 2 | `<stop placeholder="想对他说什么？"/>` | **一帧** `ir` / `stop` / `stopType: "free"` / `placeholder: "想对他说什么？"` |
 * | 3 | `<stop/>` | **没有** `stop` 帧（这一段自然演完；客户端走 no_stop 的「继续」卡） |
 * | 4 | 一个停止点标签都没写（旧会话就长这样） | **没有** `stop` 帧（与第 3 拍同构） |
 * | 5 | `<ending id name subtitle summary/>` + 其后又写了一句 | **一帧** `ending`（四字段完整）；其后那句被丢弃 |
 *
 * 另有几条结构断言：
 *   A. 重建的第一帧是 `reset`（「前面推的一切作废」），末帧是 `beat/end`；
 *   B. 每拍的 `stop` 帧落在该拍台词之后、下一拍台词之前（顺序不能乱）;
 *   C. 停止点标签**不能被当成台词念上台**：任何 `say_text`/`narrate_text` 里都不许出现 `<stop`；
 *   D. `reset` 之后 seq 严格递增（客户端靠它认重建，见 `hub.reset` 的注释）。
 *
 * 跑法（不需要 dsh-e2e 实例，也不占它的 run 锁）：
 *
 *     node e2e/run.mjs rebuild        # 或直接 node e2e/verify-rebuild.mjs
 */
import { StageHub } from '../src/hub';
import { InjectedMessages } from '../src/injected';
import { rebuildStage } from '../src/stage/stage-log';
import type { LiveSession } from '../src/session';
import type { VoiceHost } from '../src/voice/voice-host';

const SAY = (text: string): string => `<say id="lin">${text}</say>`;

/** 四拍：三种停止点形态 + 一个什么都不写的旧式拍；再加一拍：结局（末行 `<ending/>`）。 */
const BEATS = [
	{ id: 'beat1', text: `${SAY('第一拍。')}\n<stop options="去天台 | 回家"/>` },
	{ id: 'beat2', text: `${SAY('第二拍。')}\n<stop placeholder="想对他说什么？"/>` },
	{ id: 'beat3', text: `${SAY('第三拍。')}\n<stop/>` },
	{ id: 'beat4', text: `${SAY('第四拍。')}` },
	{ id: 'beat5', text: `${SAY('终幕。')}\n<ending id="true_sunrise" name="晨光" subtitle="这一次，她没有回头" summary="她把三年的沉默一次说完。"/>\n${SAY('结局之后不该出现。')}` },
];

/**
 * 一条假的会话事件：只要 `seq` / `type` / 投影出来的消息。
 *
 * 限制级通道的段起止只认那两次工具调用，靠**配对的 `tool/result`** 认（`tool/call` 不在会话面上，
 * 见 `stage-log.ts` 的 `tool/result` 那一支），所以夹具要能造出这一对。
 */
interface FakeEvent {
	seq: number;
	type: 'assistant/message' | 'user/message' | 'tool/call' | 'tool/result';
	message: unknown;
	/** 工具事件走真实形状的 `data`（`stage-log` 读的是 `event.data.*`，不是 `message`）。 */
	data?: unknown;
}

/**
 * 手写的转写：一排开局指令 + 玩家的一句话，然后四拍，每拍之间插一句玩家输入。
 * 事件 seq 与 `surface.nodes` 都用同一串（真实会话里 surface 是事件的一个子序列）。
 */
function buildTranscript(options?: {
	beats?: readonly { id: string; text: string }[];
	/** 在第几拍之后插一次限制级工具调用（`enter` / `exit`），以及它的结果上不上会话面。 */
	tools?: readonly { afterBeat: number; name: 'enter_nsfw' | 'exit_nsfw'; resultOnSurface: boolean }[];
	/** 宿主建会话时记下的那条模型选择（`model/selection`，日志里一条 log-only 事件）。 */
	selection?: { provider: string; model: string };
}): { events: FakeEvent[]; nodes: number[] } {
	const beats = options?.beats ?? BEATS;
	const tools = options?.tools ?? [];
	const events: FakeEvent[] = [];
	const surface: number[] = [];
	const push = (event: Omit<FakeEvent, 'seq'>): void => {
		const seq = events.length + 1;
		events.push({ ...event, seq } as FakeEvent);
		if (event.type !== 'tool/call') surface.push(seq);
	};
	const message = (type: FakeEvent['type'], content: unknown, source?: unknown): unknown => ({
		id: `fixture-${events.length + 1}`,
		content,
		role: type === 'user/message' ? 'user' : 'assistant',
		...(source ? { source } : {}),
	});

	if (options?.selection) {
		push({ type: 'model/selection', message: null, data: options.selection });
	}
	push({ type: 'user/message', message: message('user/message', [{ type: 'text', text: '（游戏开始，请演出第一轮）' }], { kind: 'user' }) });
	for (const [index, beat] of beats.entries()) {
		if (index > 0) {
			push({ type: 'user/message', message: message('user/message', [{ type: 'text', text: `玩家第 ${index} 句` }], { kind: 'user' }) });
		}
		push({ type: 'assistant/message', message: message('assistant/message', [{ type: 'text', text: beat.text }]) });
		for (const tool of tools.filter((item) => item.afterBeat === index + 1)) {
			const callId = `call-${tool.name}-${index}`;
			push({ type: 'tool/call', message: null, data: { callId, name: tool.name } });
			// `resultOnSurface: false` = 这次调用被回退 / 重写抹掉了：调用还在日志里，结果不在面上。
			if (tool.resultOnSurface) {
				const result = { id: `result-${callId}`, role: 'tool', content: [], toolCallId: callId };
				push({ type: 'tool/result', message: result, data: { message: result } });
			}
		}
	}
	return { events, nodes: surface };
}

/** 把假转写包成一个 `LiveSession`：只实现重建真正用到的那四个口子。 */
function fakeSession(transcript: { events: FakeEvent[]; nodes: number[] }): LiveSession {
	const bySeq = new Map(transcript.events.map((event) => [event.seq, event] as const));
	return {
		id: 'fixture-session',
		header: { cwd: '/tmp/fixture-play' },
		surface: { nodes: transcript.nodes } as unknown as LiveSession['surface'],
		snapshotEvents: () => transcript.events as unknown as ReturnType<LiveSession['snapshotEvents']>,
		deriveEventMessage: (event: unknown) =>
			(bySeq.get((event as FakeEvent).seq)?.message ?? null) as ReturnType<LiveSession['deriveEventMessage']>,
	} as unknown as LiveSession;
}

const hub = new StageHub();
const injected = new InjectedMessages();
const voice = { replayCached: () => {} } as unknown as VoiceHost;

const transcript = buildTranscript();
rebuildStage('fixture', fakeSession(transcript), false, { hub, injected, voice });

const frames = hub.history('fixture');
const ir = frames.filter((frame) => frame.kind === 'ir').map((frame) => frame.event);
const stops = ir.filter((event) => event.kind === 'stop');
const texts = ir
	.filter((event) => event.kind === 'say_text' || event.kind === 'narrate_text' || event.kind === 'thought_text')
	.map((event) => (event as { delta: string }).delta);

const checks: Array<[string, boolean, string]> = [];
const check = (id: string, ok: boolean, note: string): void => {
	checks.push([id, ok, note]);
};

check('R1', frames[0]?.kind === 'reset', `重建的第一帧是 reset（实际 ${frames[0]?.kind ?? '无'}）`);
// 重置帧要带上「这条分支还在不在写」：客户端据此决定换代后要不要把末尾那句摆上台词条
// （空闲时摆，否则台词条落在「（点击开始）」上——2026-10-09 那个分叉 bug）。
const firstReset = frames[0];
check(
	'R1b',
	firstReset?.kind === 'reset' && firstReset.running === false,
	`重置帧带上了 running（这里是空闲重建，实际 ${firstReset?.kind === 'reset' ? String(firstReset.running) : '无'}）`,
);
check('R2', frames.at(-1)?.kind === 'beat', `末帧是轮边界（实际 ${frames.at(-1)?.kind ?? '无'}）`);
check('R3', stops.length === 2, `四拍共两帧 stop（选项 + 自由输入），实际 ${stops.length}`);

const choice = stops[0];
check(
	'R4',
	choice?.kind === 'stop' && choice.stopType === 'choice' && choice.options?.map((o) => o.text).join('|') === '去天台|回家',
	`第 1 拍：choice，选项 ${choice?.kind === 'stop' ? JSON.stringify(choice.options) : '无'}`,
);
const free = stops[1];
check(
	'R5',
	free?.kind === 'stop' && free.stopType === 'free' && free.placeholder === '想对他说什么？',
	`第 2 拍：free，placeholder ${free?.kind === 'stop' ? JSON.stringify(free.placeholder) : '无'}`,
);
check('R6', !texts.some((text) => text.includes('<stop')), `停止点标签没被当成台词念上台（${texts.length} 段文本）`);

// 顺序：每拍的 stop 帧必须在它那一拍的台词之后、下一拍之前。
const indexOfSay = (text: string): number => frames.findIndex((f) => f.kind === 'ir' && f.event.kind === 'say_text' && f.event.delta.includes(text));
const indexOfStop = (n: number): number => frames.findIndex((f) => f.kind === 'ir' && f.event.kind === 'stop' && f.event === stops[n]);
const order = indexOfSay('第一拍') < indexOfStop(0) && indexOfStop(0) < indexOfSay('第二拍') && indexOfSay('第二拍') < indexOfStop(1) && indexOfStop(1) < indexOfSay('第三拍');
check('R7', order, 'stop 帧落在对应那一拍里（台词之后、下一拍之前）');

const seqs = frames.map((frame) => frame.seq);
check('R8', seqs.every((seq, i) => i === 0 || seq > seqs[i - 1]!), `reset 之后 seq 严格递增（${seqs[0]}…${seqs.at(-1)}）`);

// 第 3、4 拍（`<stop/>` 与什么都不写）之后不许再有 stop——R3 已经把它锁住了，
// 这里额外确认「没写标签」不是被解析器当成了台词。
check('R9', texts.some((text) => text.includes('第四拍')), '没写停止点的那一拍照常演出（第四拍的台词在）');

// 结局经重建仍在：第 5 拍末行的 `<ending/>` 重投影后仍是一帧 `ending`，且其后内容被丢弃。
const endings = ir.filter((event) => event.kind === 'ending');
const one = endings[0];
check(
	'R10',
	endings.length === 1 &&
		one?.kind === 'ending' &&
		one.id === 'true_sunrise' &&
		one.name === '晨光' &&
		one.subtitle === '这一次，她没有回头' &&
		one.summary === '她把三年的沉默一次说完。',
	`重建后恰好一帧 ending、四字段完整（实际 ${endings.length} 帧：${one?.kind === 'ending' ? JSON.stringify(one) : '无'}）`,
);
check('R11', !texts.some((text) => text.includes('<ending')), '结局标签没被当成台词念上台');
check('R12', !texts.some((text) => text.includes('不该出现')), '结局之后的内容被丢弃（终局是确定的）');
const indexOfEnding = frames.findIndex((frame) => frame.kind === 'ir' && frame.event.kind === 'ending');
const stopAfterEnding = frames.some(
	(frame, i) => i > indexOfEnding && frame.kind === 'ir' && frame.event.kind === 'stop',
);
check('R13', indexOfEnding >= 0 && !stopAfterEnding, '结局那一拍不给停止点（ending 取代 stop）');

/* ── 限制级（NSFW）通道：段起止从会话面重推 ───────────────────────────── */

/**
 * 限制级态的重建判据。
 *
 * 角标与「哪几拍属于那一段」都从**会话面**重推，所以重建是这条通道最容易出错的地方：
 * 冷开、分支、回退之后，标识必须回到那一版该有的样子。三个场景各自跑一遍真实 `rebuildStage`：
 *
 * | 场景 | 会话面里有什么 | 重推出来的态 |
 * |---|---|---|
 * | 进了没退 | `enter_nsfw` 的结果在面上 | **亮** |
 * | 进了又退 | 再加一次 `exit_nsfw` 的结果 | **灭** |
 * | 调用被抹掉 | `enter_nsfw` 的调用在日志里、结果不在面上（回退/重写） | **灭**（认配对的结果，不认调用） |
 */
interface NsfwRebuild {
	readonly active: boolean;
	/** 重建推出来的「退出时要切回的主模型」（进段之前那条 `model/selection`）。 */
	readonly main: { provider: string; model: string } | undefined;
}

function rebuildWithNsfw(
	tools: readonly { afterBeat: number; name: 'enter_nsfw' | 'exit_nsfw'; resultOnSurface: boolean }[],
	selection?: { provider: string; model: string },
): NsfwRebuild {
	const h = new StageHub();
	const t = buildTranscript({ tools, ...(selection ? { selection } : {}) });
	let main: NsfwRebuild['main'];
	rebuildStage('fixture-nsfw', fakeSession(t), false, {
		hub: h,
		injected: new InjectedMessages(),
		voice: { replayCached: () => {} } as unknown as VoiceHost,
		onNsfw: (sessionId, active, fromLog) => {
			main = fromLog;
			h.appendNsfw(sessionId, active);
		},
	});
	const last = h.history('fixture-nsfw').filter((frame) => frame.kind === 'nsfw').at(-1);
	return { active: last?.kind === 'nsfw' ? last.active : false, main };
}

check(
	'R14',
	rebuildWithNsfw([{ afterBeat: 2, name: 'enter_nsfw', resultOnSurface: true }]).active === true,
	'段内重建：进了没退 → 标识亮',
);
check(
	'R15',
	rebuildWithNsfw([
		{ afterBeat: 2, name: 'enter_nsfw', resultOnSurface: true },
		{ afterBeat: 4, name: 'exit_nsfw', resultOnSurface: true },
	]).active === false,
	'出了段重建：进了又退 → 标识灭',
);
check(
	'R16',
	rebuildWithNsfw([{ afterBeat: 2, name: 'enter_nsfw', resultOnSurface: false }]).active === false,
	'被回退抹掉的调用不算数：结果不在面上 → 标识不亮（只认配对的 tool/result）',
);
// 段内重建还要知道「退出时切回哪个模型」：冷开时宿主给的是主模型还是限制级模型，只看现值认不出来，
// 得从日志里进段**之前**那条 `model/selection` 认。
const rebuiltInSegment = rebuildWithNsfw(
	[{ afterBeat: 2, name: 'enter_nsfw', resultOnSurface: true }],
	{ provider: 'cpa', model: 'main-model' },
);
check(
	'R17',
	rebuiltInSegment.active && rebuiltInSegment.main?.provider === 'cpa' && rebuiltInSegment.main.model === 'main-model',
	`段内重建记住进段前的主模型（实际 ${JSON.stringify(rebuiltInSegment.main ?? null)}）`,
);

let failed = 0;
for (const [id, ok, note] of checks) {
	if (!ok) failed += 1;
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
}
console.log(`\n${checks.length - failed}/${checks.length} 通过`);
process.exit(failed === 0 ? 0 : 1);
