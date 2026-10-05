/**
 * 追收束：模型写完正文却漏调 `beat_done` 时，替它把停止点要回来。
 *
 * 移植自 AIVN `apps/server/src/orchestrator.ts` 的 `finishTurn` 那一小段。那边不是
 * 未雨绸缪的防御代码，是实测逼出来的：模型（尤其快模型）时不时把收束写成正文里的一行
 * `<beat_done options=[…]/>`，或者干脆忘了。漏了就直接按「本轮自然演完」封轮，等于把
 * 「忘了收束」当成一次正常演出——舞台上半句台词之后什么都没有，玩家连能点的东西都没有，
 * 下一轮还会变成纯状态续写。追一句让它在同一轮里把停止点交出来，比把问题推到下一轮便宜得多。
 *
 * 挂点是 `agent/turn-stopping`：DSH 里唯一「turn 正要关、还来得及 steer 一句」的位置
 * （`agent/pre-step` 是每步开头、`agent/status` 只是状态通知，都不行）。steer 之后
 * 会再跑一步，模型交完 `beat_done` 才真的封轮。
 *
 * 只追一次、只追剧作家、只追「真出了台词」的轮：空轮与纯工具轮（只改状态、只写记忆卡）
 * 本来就没有内容可停，报了错的轮是中断不是忘收束，都不该追。
 *
 * 追出去的那句走的是普通 `steer`，会落进 `agent/inbox/inserted`，所以投之前要在
 * `InjectedMessages` 上登记，免得它被舞台当成玩家说的话摆上时间线。
 */
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-agent';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import type { InjectedMessages } from './injected';
import { PLAYWRITER_PRESET, sessionPreset } from './session';

/**
 * 追收束那一句。措辞照 AIVN 原文，只把「这一轮的剧本正文」说明白：
 * 明写「不要再写新的剧本内容」——不写这句，模型会顺势把下一轮也写了。
 */
const NUDGE = [
	'这一轮的剧本正文已经写完，请现在调用 beat_done 收束本轮（参数就是这一轮的出口：',
	'给玩家选项就填 options，想给自由回答的口子就填 placeholder，这一段自然演完就空参数调用）。',
	'不要再写新的剧本内容，不要重写已经演出的部分。',
].join('');

/** 一轮的收束账。`begin` 一开就重置，所以一个会话只需要一条。 */
interface BeatState {
	/** 这一轮解析出过非空台词（say / narrate / thought）——控制指令不算。 */
	lines: boolean;
	/** `beat_done` 已经调过。 */
	closed: boolean;
	/** 这一轮已经追过一次。 */
	nudged: boolean;
}

export class BeatGuard {
	private readonly beats = new Map<string, BeatState>();

	/** 一轮开始（`agent/status` → running）。 */
	begin(sessionId: string): void {
		this.beats.set(sessionId, { lines: false, closed: false, nudged: false });
	}

	/** 这一轮写出了可演的内容。 */
	noteLines(sessionId: string): void {
		const beat = this.beats.get(sessionId);
		if (beat) beat.lines = true;
	}

	/** `beat_done` 调过了。 */
	close(sessionId: string): void {
		const beat = this.beats.get(sessionId);
		if (beat) beat.closed = true;
	}

	/** 该不该追这一轮；该追时同时记下「追过了」，所以同一个问题只会问一次。 */
	claim(sessionId: string): boolean {
		const beat = this.beats.get(sessionId);
		if (!beat || beat.nudged || beat.closed || !beat.lines) return false;
		beat.nudged = true;
		return true;
	}
}

export function installBeatGuard(ctx: Context, guard: BeatGuard, injected: InjectedMessages): () => void {
	return ctx.on('agent/turn-stopping', (payload) => {
		const sessionId = String(payload.agent.id);
		if (sessionPreset(ctx, sessionId) !== PLAYWRITER_PRESET) return;
		if (!guard.claim(sessionId)) return;

		const agent = ctx.agents.get(payload.agent.id);
		if (!agent) return;
		const message = createUserMessage({ content: [{ type: 'text', text: NUDGE }], source: { kind: 'user' } });
		// 先登记再投：舞台认 id 把它从玩家时间线上摘掉（见 `injected.ts`）。
		injected.remember(message.id);
		agent.steer(message);
	});
}
