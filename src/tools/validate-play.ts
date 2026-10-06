/**
 * `validate_play` —— 报「这座剧目读不读得出来、还缺什么」。
 *
 * 剧目文件是模型自己用 write / edit 写的，所以「写得对不对」得有地方问：这里报
 * `play.json` 读不出来的那句原因（缺字段、坏 JSON、值不合法），以及这座剧目还缺什么。
 * 判据与渲染共用 `readiness.ts` 里那一份（同一句话不许有两个版本，注入的《当前状态》
 * 也是它），这里只是把它挂成一个工具。
 *
 * 它报的是**底数**，不是闸门：缺什么都能开演。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { readPlayReadiness, renderReadiness } from '../readiness';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'检查这座剧目：play.json 读不读得出来，还缺什么（故事前提 / 角色卡 / 立绘 / 背景图 / 素材清单）。',
	'刚写过 play.json、角色卡或改了剧目结构之后调它——报出来的错误与缺项就是接下来该修的东西。',
	'**没有硬门槛**：缺什么都能开演，这个工具不拦任何事。',
].join('\n');

export function createValidatePlayTool(ctx: PlayContext) {
	return defineTool({
		name: 'validate_play',
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
