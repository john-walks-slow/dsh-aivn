/**
 * 引擎自己投出去的 user 消息。
 *
 * 舞台把每一次 inbox 插入都当成玩家的输入摆到时间线上——玩家自己敲的字是，引擎为了推进
 * 演出注入的指令不是。不摘出去，玩家会看到自己的台词条里冒出一句他没说过的话：
 * 追收束的内部指令、「继续」这种空推进，都会变成一行玩家台词。
 *
 * 认的是 `message.id`（`createUserMessage` 每条都给一个稳定 id），**不是正文**。按正文认
 * 有两头都错：改一个字之后静默失效（玩家看见内部指令），而玩家恰好原样打了一模一样的一句时
 * 又会把他自己那一行删掉。id 没有这两个问题。
 *
 * 登记与插入在同一条同步链上（`followup`/`steer` → `inbox.splice()` → `emit`），所以
 * 「先记 id、插入时认领」的配对是可靠的。万一消息没走到插入（取消、中断），那枚 id 就留在
 * 表里——`LIMIT` 兜住它不无限涨，代价是少吃一条同 id 的消息，而那不可能发生（id 不重复）。
 */

/** 最多认下多少条没被认领的登记。够覆盖一个往返，也不至于在异常路径上攒起来。 */
const LIMIT = 32;

export class InjectedMessages {
	private readonly pending = new Set<string>();

	/** 记下「这条马上要投的 user 消息是我自己发的」。 */
	remember(id: string): void {
		this.pending.add(id);
		// Set 保持插入顺序：超限就丢最早的那一枚。
		while (this.pending.size > LIMIT) {
			const oldest = this.pending.values().next().value;
			if (oldest === undefined) break;
			this.pending.delete(oldest);
		}
	}

	/** 这条消息是不是引擎自己投的；是就销掉登记（每条只会被认领一次）。 */
	claim(id: string): boolean {
		return this.pending.delete(id);
	}
}
