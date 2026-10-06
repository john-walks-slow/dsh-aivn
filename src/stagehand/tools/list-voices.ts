/**
 * `list_voices` —— 查 Fish 音色库，挑一个填进角色卡。
 *
 * 照 AIVN `apps/server/src/agentkit/voiceTool.ts`：条件（语言 / 标签 / 标题关键词）全发给服务端
 * 抓对应窗口，`gender` 因为 Fish 没有独立参数而在本地筛；筛完按 `likes` 降序——
 * 热度是 Fish 给的可信度信号，同条件下没有理由优先选冷门的。
 *
 * 挑音色的依据是 `description`（这个嗓子听起来什么样：年龄感、语气、语速），不是名字。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { VoiceCatalog, VoiceEntry } from '../voice-catalog';

/** 一次列多少条：够挑就行，音色库动辄上千条。 */
const LIST_LIMIT = 25;
const DESC_MAX = 90;

const DESCRIPTION = [
	'查 Fish 音色库，给角色卡挑音色（角色卡 frontmatter 的 `voice` 字段填的就是这里的 id）。',
	'**按角色人设挑，不是按名字挑**：description 写的是这个嗓子听起来什么样（年龄感、语气、语速），',
	'挑和 persona 说得通的那条。挑好把 id 告诉用户，或直接写进角色卡。',
	'条件越具体越准：给 language（如 ja / zh / en，服务端统一小写）、给 tags（如 anime / female）、',
	'给 query 搜标题关键词。tags 是作者自己打的、**大小写敏感**，猜不到就只按 query/language 查。',
	'gender 是本地按标签筛（Fish 没有性别参数），只在标签里写着 male/female 的音色上生效。',
	'结果按热度降序，最多列 ' + String(LIST_LIMIT) + ' 条。',
].join('\n');

const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

export function createListVoicesTool(catalog: VoiceCatalog) {
	return defineTool({
		name: 'list_voices',
		description: DESCRIPTION,
		parameters: {
			query: { type: 'string', description: '标题关键词（全库标题子串搜索），比如「雷姆」「maid」。' },
			language: {
				type: 'string',
				description: '语言代码，小写：ja / zh / en / ko…（服务端按小写匹配）。',
			},
			gender: {
				type: 'string',
				enum: ['male', 'female'],
				description: '按标签本地筛性别；只在作者给它打了 male/female 标签的音色上生效。',
			},
			tags: {
				type: 'array',
				items: { type: 'string', description: '一个标签，原样透传（大小写敏感）' },
				description: '若干标签，取**并集**（Fish 的多 tag 参数就是并集）。',
			},
		},
		output: textOutput,
		async execute(args) {
			const window = await catalog.list({
				language: args.language,
				tags: args.tags,
				title: args.query,
			});
			const gender = args.gender?.toLowerCase();
			// filter 顺手复制一份，别让 sort 动到缓存里的窗口。
			const matched = window.entries
				.filter((entry) => !gender || entry.tags.some((tag) => tag.toLowerCase() === gender))
				.sort((a, b) => b.likes - a.likes);

			if (matched.length === 0) {
				const used = [
					args.query ? `关键词=${args.query}` : '',
					args.language ? `语言=${args.language}` : '',
					args.gender ? `性别=${args.gender}` : '',
					args.tags?.length ? `标签=${args.tags.join(',')}` : '',
				]
					.filter(Boolean)
					.join('，');
				return (
					`没有匹配${used ? `（${used}）` : ''}的音色（本窗口 ${window.entries.length} 条）。` +
					'标签是作者自己打的、大小写敏感，猜不到就去掉 tags 与 gender，只按 query / language 查。'
				);
			}

			const shown = matched.slice(0, LIST_LIMIT);
			const lines = shown.map((entry) => render(entry));
			const tail = [`共 ${matched.length} 条匹配（本窗口 ${window.entries.length} 条，全库 ${window.total}）`];
			if (matched.length > shown.length) tail.push(`只列了前 ${shown.length} 条，用条件缩小范围`);
			lines.push(tail.join('；'));
			return lines.join('\n');
		},
	});
}

function render(entry: VoiceEntry): string {
	const bits = [
		entry.languages.length > 0 ? entry.languages.join('/') : null,
		entry.tags.length > 0 ? entry.tags.join(' ') : null,
		`♥${entry.likes}`,
	]
		.filter(Boolean)
		.join(' | ');
	const description = entry.description.replace(/\s+/g, ' ').slice(0, DESC_MAX);
	return `${entry.id} | ${entry.title} | ${bits}${description ? ` | ${description}` : ''}`;
}
