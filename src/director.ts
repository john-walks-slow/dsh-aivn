/**
 * 导演工具栏的宿主半边：提示（引导 / 打断）、改写、重写。
 *
 * 三件事在 AIVN 那边各有各的落法，搬到 DSH 之后都换成了**会话层**的动作：
 *
 * - **提示·引导**：排进 Agent 的下一轮（`followup`）。正在演的这一拍不受影响，玩家照选不误。
 * - **提示·打断**：先中止当前这一轮（`cancel` + 等它真的闲下来），再把这一句投进去。
 * - **改写 / 重写**：AIVN 的改写是**直接改脚本行、不经过模型**——它有一份自己的脚本模型。
 *   DSH 这边没有：剧本就是剧作家的输出，会话日志才是权威。所以「改这一句」只能是
 *   **让剧作家重写这一拍**，并且要把已经写出来的那一段从上下文里作废掉：
 *   这就是往会话里追加一条 `surfaceOp.replace` 的标记（与 `dsh-rewind` 同一个手法，
 *   `dsh-session` 的 `SurfaceOp` 就是这么用的）。之后舞台由 `stage-log` 重投影一遍。
 *   两者的差别只在作废的起点：改写从**最后一条**助手消息起（只重写最后一步），
 *   重写从头一条起（整拍重来）。
 *
 * 导演的消息都带自己的一支 source kind，于是它们在舞台的时间线上不会变成一行玩家台词
 * （时间线只认 `source.kind === 'user'`，见 `stage-log.ts`）。
 */
import type { Context } from '@deepseek-ai/cordis';
import { createUserMessage, type MessageSource, type UserMessage } from '@deepseek-ai/dsh-llm';
import type { SessionSeq } from '@deepseek-ai/dsh-session';
import type { StageHub } from './hub';
import type { InjectedMessages } from './injected';
import type { LiveAgent, LiveSession } from './session';

/** 导演消息的来源标签。宿主与舞台都按它把导演的话和玩家的话分开。 */
const DIRECTOR_KIND = 'dsh-aivn-director';

/** 打断之后等 Agent 闲下来的上限（与 `dsh-rewind` 同一个口径）。 */
const IDLE_TIMEOUT_MS = 15_000;

/** 导演动作的落点：整拍重来，还是只重写最后一步。 */
export type RewriteFrom = 'beat' | 'line';

/** 提示队列里的一条。`pending` = 还在排队，`sent` = 已经进了模型这一轮的上下文。 */
export interface GuideItem {
	id: string;
	text: string;
	status: 'pending' | 'sent';
}

/**
 * 导演动作做不了的原因，带一句能直接给玩家看的话。
 *
 * 路由把它翻成 400：这些都是「你这个请求本身不成立」（还没内容可改、Agent 停不下来），
 * 不是服务端坏了。
 */
export class DirectorError extends Error {}

/** 舞台上的导演栏。 */
export class Director {
	private readonly queues = new Map<string, GuideItem[]>();

	constructor(
		private readonly hub: StageHub,
		private readonly injected: InjectedMessages,
	) {}

	/**
	 * 两条订阅：
	 *
	 * - 提示队列的「已送出」标记：导演那条消息**真的进了会话**（成了会话面上的一条 user 消息）
	 *   才算送到——它在 inbox 里排着的时候还算「排队中」，那正是玩家想看的。
	 * - 会话收摊：队列跟着丢（它在内存里，没有别的清理口）。
	 */
	install(ctx: Context): () => void {
		const offEvent = ctx.on('session/event', (session, event) => {
			if (event.type !== 'user/message') return;
			const sessionId = String(session.id);
			const queue = this.queues.get(sessionId);
			if (!queue) return;
			const item = queue.find((entry) => entry.id === event.data.id && entry.status === 'pending');
			if (!item) return;
			item.status = 'sent';
			this.push(sessionId);
		});
		const offDisposed = ctx.on('agent/disposed', (payload) => this.forget(String(payload.agent.id)));
		return () => {
			offEvent();
			offDisposed();
		};
	}

	/** 提示·引导：排进下一轮。正在演的这一拍不动。 */
	guide(sessionId: string, agent: LiveAgent, text: string): void {
		const message = this.remember(sessionId, `（导演提示：${text}）`, text);
		agent.followup(message);
	}

	/** 提示·打断：先停下这一轮，再用这一句接着写。 */
	async interrupt(sessionId: string, agent: LiveAgent, text: string): Promise<void> {
		await stop(agent);
		const message = this.remember(sessionId, `（导演提示：${text}）`, text);
		agent.followup(message);
	}

	/**
	 * 改写 / 重写：把会话面上的这一段作废，然后让剧作家按 `text` 重写。
	 *
	 * 作废是**真作废**：标记节点替换掉那一段会话面（`surfaceOp.replace`），模型下一轮看不到
	 * 旧内容；舞台由 `stage-log` 的替换监听重投影。随后那一句要求作为新的输入投进去——
	 * 它排在这一轮的下一轮，所以剧作家拿到的是「作废标记 + 一句要求」，正好是重写这一拍。
	 */
	async rewrite(
		sessionId: string,
		agent: LiveAgent,
		opts: { text: string; from: RewriteFrom },
	): Promise<void> {
		await stop(agent);

		const session = agent.session;
		if (!session) throw new DirectorError('这个会话没有可写的会话日志');

		const anchor = anchorOf(session, opts.from);
		if (anchor === undefined) {
			throw new DirectorError(
				opts.from === 'beat' ? '这一轮还没有写出来的内容，没有可重写的一拍' : '这一段还没有剧作家的台词可改',
			);
		}

		const nodes = session.surface.nodes;
		const shadowed = nodes.slice(nodes.indexOf(anchor));
		const boundary: SessionSeq = shadowed[shadowed.length - 1] as SessionSeq;
		// 标记节点替换掉这一段的会话面。内容是一句舞台指示：模型看到的是「上面那段没了，
		// 接下来是导演的要求」，而不是一段凭空断掉的历史。
		const marker = directorMessage(
			opts.from === 'beat'
				? '（导演重写：上面这一拍作废，按接下来那条要求重新写一遍。）'
				: '（导演改写：上面这一段作废，按接下来那条要求改掉那一句。）',
		);
		session.append('user/message', marker, {
			surfaceOp: { op: 'replace', startSeq: anchor, endSeq: boundary },
			sourceEventSeqs: [...shadowed],
		});

		// **不进提示队列**：那条队列是「玩家排给剧作家的提示」，而这一句是重写这一拍的指令——
		// 它随下面这一投立刻生效，摆进「进行中」浮层只会多出一行马上就走的行。
		const instruction = this.remember(sessionId, `（导演要求：${opts.text}）`, opts.text, { queue: false });
		agent.followup(instruction);
	}

	/** 这条会话的提示队列（挂给舞台的 `guide` 帧就是它）。 */
	snapshot(sessionId: string): readonly GuideItem[] {
		return this.queues.get(sessionId) ?? [];
	}

	/** 会话收摊：队列跟着丢。 */
	forget(sessionId: string): void {
		this.queues.delete(sessionId);
	}

	/**
	 * 登记一条马上要投的导演消息：舞台上不当玩家台词（`InjectedMessages` 认 id），
	 * 该进提示队列的（提示那两条）再记一笔。
	 */
	private remember(sessionId: string, payload: string, text: string, opts?: { queue?: boolean }): UserMessage {
		const message = directorMessage(payload);
		this.injected.remember(sessionId, message.id);
		if (opts?.queue !== false) {
			const queue = this.queues.get(sessionId) ?? [];
			queue.push({ id: message.id, text, status: 'pending' });
			this.queues.set(sessionId, queue);
			this.push(sessionId);
		}
		return message;
	}

	private push(sessionId: string): void {
		this.hub.appendGuide(sessionId, [...this.snapshot(sessionId)]);
	}
}

/**
 * 作废到哪儿：会话面上这一拍的第一条助手消息（`beat`）或最后一条（`line`）。
 *
 * 从会话面尾部往回走：
 *   - 先撞上**助手消息** → 它属于当前这一拍，`line` 就在这儿（改的就是最后这一步）；
 *   - 再往回还有助手消息 → 都还在同一拍里，`beat` 要的是最靠前的那一条；
 *   - 先撞上**任何 user 消息** → 这一拍还没有产出（玩家刚说完、或导演刚下过要求），没得改。
 *
 * 工具结果夹在中间不影响判断：它既不是台词也不是输入，跟着那一段一起作废才对。
 */
function anchorOf(session: LiveSession, from: RewriteFrom): SessionSeq | undefined {
	const nodes = session.surface.nodes;
	const events = new Map(session.snapshotEvents().map((event) => [event.seq, event] as const));
	let first: SessionSeq | undefined;

	for (let i = nodes.length - 1; i >= 0; i -= 1) {
		const seq = nodes[i] as SessionSeq;
		const event = events.get(seq);
		if (!event) continue;
		if (event.type === 'user/message') return first;
		if (event.type === 'assistant/message') {
			first = seq;
			if (from === 'line') return seq;
		}
	}
	return first;
}

/** 一条导演消息。source kind 自成一类：舞台上与玩家台词分开，模型那边由《导演指令》交代。 */
function directorMessage(text: string): UserMessage {
	return createUserMessage({
		content: [{ type: 'text', text }],
		// 宿主没有为插件开放 source 联合（`MessageSourceMap` 是 `declare module` 在包内部合并的），
		// 这里收窄一次：id 是唯一的一支自定义来源，运行期就是一个 `{kind}` 对象。
		source: { kind: DIRECTOR_KIND } as unknown as MessageSource,
	});
}

/**
 * 让剧作家停下来。
 *
 * `keepInbox` 保住排队的那几条（玩家刚排的提示不该被自己的打断吃掉），但 steering 要清：
 * 它们是为**旧内容**写的（追收束、上一句提示），留着会跟着新写的那一拍跑。
 */
async function stop(agent: LiveAgent): Promise<void> {
	if (agent.status === 'idle') {
		dropSteering(agent);
		return;
	}
	agent.cancel({ kind: 'user' }, { keepInbox: true });
	if (!(await waitIdle(agent))) throw new DirectorError('剧作家没有在 15 秒内停下来，这一下没发出去');
	dropSteering(agent);
}

async function waitIdle(agent: LiveAgent): Promise<boolean> {
	let timer: NodeJS.Timeout | undefined;
	try {
		await Promise.race([
			agent.whenIdle(),
			new Promise((_resolve, reject) => {
				timer = setTimeout(() => reject(new Error('idle wait timed out')), IDLE_TIMEOUT_MS);
			}),
		]);
		return true;
	} catch {
		return false;
	} finally {
		if (timer) clearTimeout(timer);
	}
}

/** steering 是「这一步之内」的输入，作废重写时它绑的那段内容已经没了。 */
function dropSteering(agent: LiveAgent): void {
	for (const message of [...agent.inbox.nextStep]) agent.inbox.remove(message.id);
}
