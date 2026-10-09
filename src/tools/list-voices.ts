/**
 * `list_voices` —— 查 Fish 音色库，挑一个填进角色卡。
 *
 * 能力（参数真相源、描述正文、实现）在 `@aivn/agent` 的 `voice.list`；这里只声明**插件的 face**：
 * 工具名、注入哪个目录客户端、回执怎么包。抓取与分页规则两边同一份，只有出网那一层各是各的。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { voiceList, voiceListFields, type InferArgs } from '@aivn/agent';
import type { VoiceCatalog } from '../voice/voice-catalog';
import { toDsh } from './schema';

const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

export function createListVoicesTool(catalog: VoiceCatalog) {
	return defineTool({
		name: 'list_voices',
		description: voiceList.doc,
		parameters: toDsh(voiceListFields),
		output: textOutput,
		async execute(args) {
			return voiceList.execute(args as InferArgs<typeof voiceListFields>, {
				list: (query) => catalog.list(query),
			});
		},
	});
}
