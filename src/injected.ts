/**
 * 引擎自己投出去的 user 消息。
 *
 * 舞台把每一次 inbox 插入都当成玩家的输入摆到时间线上——玩家自己敲的字是，引擎为了推进
 * 演出注入的指令不是。不摘出去，玩家会看到自己的台词条里冒出一句他没说过的话：
 * 追收束的内部指令、「继续」这种空推进、导演的引导与重写指令，都会变成一行玩家台词。
 *
 * 认的是 `message.id`（`createUserMessage` 每条都给一个稳定 id），**不是正文**。按正文认
 * 有两头都错：改一个字之后静默失效（玩家看见内部指令），而玩家恰好原样打了一模一样的一句时
 * 又会把他自己那一行删掉。id 没有这两个问题。
 *
 * 按**会话**分表：同名 id 不可能出现，分表是为了让表随会话收摊（`forget`）而不必自己定上限。
 *
 * 查过**不销号**（`has`/`claim` 都只读）：登记表还要服务第二条路——`stage-log` 从会话重建
 * 整条帧流时，得把引擎投过的每一条再摘一遍。销了号，重建出来的舞台上那几句就都变成玩家的台词。
 * 代价是没走到插入的那些 id（取消、中断）会留在表里，而它们不可能再出现（id 不重复）。
 */

export class InjectedMessages {
	private readonly bySession = new Map<string, Set<string>>();

	/** 记下「这条马上要投的 user 消息是我自己发的」。 */
	remember(sessionId: string, id: string): void {
		let ids = this.bySession.get(sessionId);
		if (!ids) {
			ids = new Set();
			this.bySession.set(sessionId, ids);
		}
		ids.add(id);
	}

	/** 这条消息是不是引擎自己投的。 */
	claim(sessionId: string, id: string): boolean {
		return this.bySession.get(sessionId)?.has(id) ?? false;
	}

	/** 会话收摊：这一表跟着丢（走 `agent/disposed`）。 */
	forget(sessionId: string): void {
		this.bySession.delete(sessionId);
	}
}
