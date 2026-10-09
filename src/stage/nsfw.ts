/**
 * 限制级（NSFW）通道里**跨文件共用**的一点东西。
 *
 * 折叠（退出时把这一段从模型可见面换成一句摘要）由一个文件写、另一个文件读：
 * `stage-tap` 追加那条替换标记，`stage-log` 重建帧流时要认出它、并把被挡掉的原文照渲回去
 * （面替换只挡模型那一侧）。这类「写读两侧都要认」的判据只能有一份，所以单独放这里。
 */

/**
 * 折叠标记的来源种类（自定义，照导演那条 `dsh-aivn-director` 的先例）。
 *
 * 宿主没为插件开放 `MessageSourceMap` 联合，用时收窄一次即可。要紧的是它**不是** `user`：
 * 重建帧流那条「玩家说过的话才上时间线」的判据正是看 `source.kind === 'user'`，于是这句引擎
 * 补的摘要不会被念成玩家台词——不靠内存里那份 `injected` 登记（冷会话时它是空的）。
 */
export const NSFW_FOLD_KIND = 'dsh-aivn-nsfw-fold';

/** 折叠标记的正文：模型看到的是「这一段落收成了一句摘要」。 */
export function nsfwFoldMarker(summary: string): string {
	return `（限制级段落已收束为剧情摘要——${summary}）`;
}
