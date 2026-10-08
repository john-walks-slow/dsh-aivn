/**
 * 「进行中」浮层：还在排队的话、还在合成的语音。
 *
 * 为什么在插件这一侧而不是 `@aivn/stage` 里：这两样都是**宿主特有的**东西。舞台包里那份
 * AIVN 的面板长在编排器上（提示队列 + 生图 / 配乐 / 语音作业），插件这边没有编排器——
 * 队列是导演自己的（`src/stage/director.ts`），语音帧来自宿主的 TTS 预取管线。硬塞回包里只会让
 * 那份组件多背一套它用不上的数据形状。
 *
 * 只报两样：**提示**（排队中 / 已送出）与**语音**（正在合成的那几句）。出图与配乐不做——
 * 插件里它们是同步的工具调用，没有「回合之外还在跑」的作业可报（见 README 的说明）。
 *
 * 视觉克制：徽标沿用舞台工具栏那枚 `.dir-btn`（同一个浮层语言），展开的列表跟台词条同一套
 * 深色玻璃（变量都在 stage.css 的 `.stage-root` 上）。玩家按了 HIDE 时整块跟着藏起来。
 */
import { useState, type FC } from 'react';
import { Icon } from '@aivn/stage';

/** 浮层里的一行。`note` 是状态词（排队中 / 已送出 / 合成中）。 */
export interface PendingItem {
	key: string;
	kind: 'guide' | 'voice';
	text: string;
	note: string;
}

export const PendingPanel: FC<{ items: readonly PendingItem[] }> = ({ items }) => {
	const [open, setOpen] = useState(false);
	if (items.length === 0) return null;

	return (
		<div className="aivn-pending">
			<button
				type="button"
				className={`dir-btn${open ? ' on' : ''}`}
				title="排队中与正在合成的事"
				aria-label="排队中与正在合成的事"
				onClick={() => setOpen((was) => !was)}
			>
				<Icon name="sparkles" size={17} />
				进行中 {items.length}
			</button>
			{open && (
				<ul className="aivn-pending-list">
					{items.map((item) => (
						<li key={item.key} className="aivn-pending-row">
							<span className="aivn-pending-kind">{item.kind === 'guide' ? '提示' : '语音'}</span>
							<span className="aivn-pending-text">{item.text}</span>
							<span className="aivn-pending-note">{item.note}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
