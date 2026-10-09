/**
 * `web_search` —— 联网检索（两个角色都装，但只有配了 Exa key 才注册）。
 *
 * 能力（参数真相源、描述正文、实现）在 `@aivn/agent` 的 `web.search`；这里只声明**插件的 face**：
 * 工具名、注入哪个后端、回执怎么包。两边共用同一份参数与同一段描述——它是最容易被误用的那张牌，
 * 只有一种说法。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { webSearch, type InferArgs, type SearchDeps } from '@aivn/agent';
import { toDsh } from './schema';

const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

export function createWebSearchTool(exa: SearchDeps) {
	return defineTool({
		name: 'web_search',
		description: webSearch.doc,
		parameters: toDsh(webSearch.fields),
		output: textOutput,
		async execute(args) {
			// 参数类型由能力的 fields 反推（`InferArgs`），运行期校验由 dsh 按上面编译出的 schema 做。
			return webSearch.execute(args as InferArgs<typeof webSearch.fields>, exa);
		},
	});
}
