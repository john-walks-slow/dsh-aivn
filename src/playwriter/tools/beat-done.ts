/**
 * `beat_done` —— 一轮的收束，**同时**交出这一轮的停止点。
 *
 * 与 AIVN `apps/server/src/agentkit/beatTool.ts` 同一个语义，只是接收方从编排器换成
 * `StageHub`：参数直接渲染成一帧 `stop` IR，与 DSL 解析出来的事件完全同构，
 * 舞台照常出现停止点。
 *
 * 停止点是这一轮的出口，不是故事的终点：工具 `concludeTurn()` 之后本轮就结束，
 * 玩家回应（下一条 user 消息）再开下一轮。
 *
 * schema 只兜「无效载荷」（至少两条、每条非空），**不表达风格**：一轮该写多长、给几个选项，
 * 由剧目的写作参数定，提示词那一侧照它渲染。DSH 的参数 schema 表达不了 `minItems`，
 * 所以「只给一条」在 execute 里拦——回执是报错，模型照着改。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'本轮演出内容写完时调用，**不与其他工具同批调用**。',
	'这是一个**工具调用**：写在正文里的 `<beat_done …/>` 标签引擎认不出，只会被当成一行写坏的标签丢掉。',
	'调了 = 这一轮到此结束，舞台按参数摆出停止点（或自然收尾），等玩家回应；',
	'不调 = 这一轮不会收束，舞台停在半截，玩家没有可点的东西。',
	'本轮停在哪里由参数决定：',
	'- options = 停在选项面板，玩家点一条继续（给几条互斥的选项照《写作参数》）；',
	'- 只给 placeholder = 停在自由输入框，placeholder 是输入框里的提示语；',
	'- 两个都不给 = 本轮自然演完，等玩家的下一条消息。',
	'调完之后本轮立即结束，不要再输出任何内容。给了 options 但去掉空白后不足两条，会拿到报错回执。',
].join('\n');

/** 一帧文本回执；工具的输出契约就长这样。 */
const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

export function createBeatDoneTool(ctx: PlayContext) {
	return defineTool({
		name: 'beat_done',
		description: DESCRIPTION,
		parameters: {
			options: {
				type: 'array',
				items: { type: 'string', description: '一条选项文本：短，像玩家会说的话' },
				description:
					'若干互斥选项（去掉空白后至少两条）= 这一轮停在选项面板，玩家点一条继续。给几条照《写作参数》。',
			},
			placeholder: {
				type: 'string',
				description:
					'只给 placeholder（不给 options）= 停在自由输入框，这是输入框里的提示语，比如「想对他说什么？」。',
			},
		},
		output: textOutput,
		async execute(args, exec) {
			const raw = args.options ?? [];
			const options = raw.map((text) => text.trim()).filter((text) => text !== '');
			const placeholder = args.placeholder?.trim();
			// minItems 拦不住 ["  ", "x"]：schema 里每个元素非空照样过，去掉空白后不足两条。
			// 静默当成「自然演完」会把模型的一次笔误变成一次没有停止点的轮。
			if (raw.length > 0 && options.length < 2) {
				throw new Error(
					'options 至少要有两条非空文本（整条只有空白不算）；或者只给 placeholder = 停在自由输入框',
				);
			}

			const hasOptions = options.length >= 2;
			// options 与 placeholder 同时给是有歧义的（选项面板和自由输入框二选一）。按 options 走，
			// 但回执里说明 placeholder 这轮不生效——不静默丢掉模型写下的东西。
			const hasBoth = hasOptions && Boolean(placeholder);

			if (hasOptions) ctx.hub.append(ctx.sessionId, { kind: 'stop', stopType: 'choice', options: options.map((text) => ({ text })) });
			else if (placeholder) ctx.hub.append(ctx.sessionId, { kind: 'stop', stopType: 'free', placeholder });

			// 先记账再收束：`beat-guard` 在 turn-stopping 那一刻问「这一轮收束了吗」，
			// 不给停止点的自然收尾（两个参数都没给）同样是收束，照记。
			ctx.beatClosed();

			// 收束 turn：工具之后没有文本位置可写，「stop 之后别再说话」那条提示词约束随之消失。
			exec.concludeTurn();

			if (!hasOptions) return placeholder ? '已交出停止点，本轮到此结束。' : '本轮到此结束。';
			return hasBoth
				? '已交出选项停止点（本轮同时给了 placeholder，按 options 走，placeholder 这轮不生效）。本轮到此结束。'
				: '已交出停止点，本轮到此结束。';
		},
	});
}
