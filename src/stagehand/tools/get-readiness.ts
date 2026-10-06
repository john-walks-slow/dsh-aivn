/**
 * `get_readiness` —— 报「这座剧目还缺什么」。
 *
 * 照 AIVN `apps/server/src/agentkit/readinessTool.ts`：判据与渲染共用
 * `readiness.ts` 里那一份（同一句话不许有两个版本），这里只是把它挂成一个工具。
 *
 * 它报的是**底数**，不是闸门：缺什么都能开演，剧作家据此决定这一轮写多满。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { readPlayReadiness, renderReadiness } from '../../readiness';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'检查这座剧目还缺什么（故事前提 / 角色卡 / 立绘 / 背景图 / 素材清单）。',
	'备料前、或用户问「能开演了吗」时调它：报出来的缺项就是接下来该补的东西。',
	'**没有硬门槛**：缺什么都能开演，这个工具不拦任何事。',
].join('\n');

export function createReadinessTool(ctx: PlayContext) {
	return defineTool({
		name: 'get_readiness',
		description: DESCRIPTION,
		parameters: {},
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute() {
			return renderReadiness(readPlayReadiness(ctx.playDir()));
		},
	});
}
