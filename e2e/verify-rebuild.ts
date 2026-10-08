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
 * | 5 | `<ending id title subtitle/>` + 其后又写了一句 | **一帧** `ending`（字段完整）；其后那句被丢弃 |
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
	{ id: 'beat5', text: `${SAY('终幕。')}\n<ending id="true_sunrise" title="晨光" subtitle="这一次，她没有回头"/>\n${SAY('结局之后不该出现。')}` },
];

/** 一条假的会话事件：只要 `seq` / `type` / 投影出来的消息。 */
interface FakeEvent {
	seq: number;
	type: 'assistant/message' | 'user/message';
	message: unknown;
}

/**
 * 手写的转写：一排开局指令 + 玩家的一句话，然后四拍，每拍之间插一句玩家输入。
 * 事件 seq 与 `surface.nodes` 都用同一串（真实会话里 surface 是事件的一个子序列）。
 */
function buildTranscript(): { events: FakeEvent[]; nodes: number[] } {
	const events: FakeEvent[] = [];
	const push = (type: FakeEvent['type'], content: unknown, source?: unknown): void => {
		const seq = events.length + 1;
		const id = `fixture-${seq}`;
		events.push({
			seq,
			type,
			message: { id, content, role: type === 'user/message' ? 'user' : 'assistant', ...(source ? { source } : {}) },
		});
	};

	push('user/message', [{ type: 'text', text: '（游戏开始，请演出第一轮）' }], { kind: 'user' });
	for (const [index, beat] of BEATS.entries()) {
		if (index > 0) push('user/message', [{ type: 'text', text: `玩家第 ${index} 句` }], { kind: 'user' });
		push('assistant/message', [{ type: 'text', text: beat.text }]);
	}
	return { events, nodes: events.map((event) => event.seq) };
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
		one.title === '晨光' &&
		one.subtitle === '这一次，她没有回头',
	`重建后恰好一帧 ending，字段完整（实际 ${endings.length} 帧：${one?.kind === 'ending' ? JSON.stringify(one) : '无'}）`,
);
check('R11', !texts.some((text) => text.includes('<ending')), '结局标签没被当成台词念上台');
check('R12', !texts.some((text) => text.includes('不该出现')), '结局之后的内容被丢弃（终局是确定的）');
const indexOfEnding = frames.findIndex((frame) => frame.kind === 'ir' && frame.event.kind === 'ending');
const stopAfterEnding = frames.some(
	(frame, i) => i > indexOfEnding && frame.kind === 'ir' && frame.event.kind === 'stop',
);
check('R13', indexOfEnding >= 0 && !stopAfterEnding, '结局那一拍不给停止点（ending 取代 stop）');

let failed = 0;
for (const [id, ok, note] of checks) {
	if (!ok) failed += 1;
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
}
console.log(`\n${checks.length - failed}/${checks.length} 通过`);
process.exit(failed === 0 ? 0 : 1);
