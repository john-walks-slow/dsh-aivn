/**
 * `create_play` —— 把会话工作区立成一座剧目。
 *
 * 这是「工作区 = 剧目」这条设计的入口：从零起一座戏只有一步，就是往工作区里写下
 * `play.json`（外加前提与角色卡）。两个预设都装着它——搭台助手拿它开局，
 * 剧作家第一次落在空目录里时也得靠它才开得了戏。
 *
 * 与文件工具的分工：**起新剧目走这里，改已有剧目走 write / edit**。
 * play.json 认的字段比看上去多（贯穿 initialState 与引擎缺省值的回落规则），
 * 让模型整篇 write 一份出来等于把剧目配置交给一次自由发挥。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { scaffoldPlay } from '../scaffold';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'把当前工作目录立成一座新剧目：写下 play.json（剧目名、开局指令、角色元数据）、',
	'memory/always/premise.md（世界观前提）与 characters/<id>.md（角色卡）。',
	'**工作目录里还没有 play.json** 时才用——那说明这里还不是一座剧目；',
	'已经有 play.json 了就别调它（会拿到报错回执）：加人加设定改文件走 write / edit。',
	'已经存在的文件一律不动：前提或角色卡已经写好了，回执里会列成「保留」。',
	'调完把剧目名与写了哪几份文件回报给用户，别在剧本里交代这件事。',
].join('\n');

export function createPlayTool(ctx: PlayContext) {
	return defineTool({
		name: 'create_play',
		description: DESCRIPTION,
		parameters: {
			title: {
				type: 'string',
				required: true,
				description: '剧目名，显示在剧目列表与舞台标题上。',
			},
			id: {
				type: 'string',
				description: '剧目 id（素材寻址用）。不写就取工作目录名，通常不用给。',
			},
			premise: {
				type: 'string',
				description:
					'世界观前提：这是什么世界、发生在哪儿、主角是谁、戏从哪一刻开始。写进 memory/always/premise.md。不写就只立骨架，前提留给之后再写。',
			},
			opening: {
				type: 'string',
				description:
					'开局指令：玩家点「开演」时发给剧作家的第一句（如「（游戏开始，请演出第一轮）」）。不写走引擎缺省。',
			},
			characters: {
				type: 'array',
				description:
					'先立起来的出场角色。只出声不出图的临时路人不用列在这里（剧本里写 <say id="…" name="…"> 就够了）。',
				items: {
					type: 'object',
					additionalProperties: false,
					properties: {
						id: {
							type: 'string',
							required: true,
							description: '主体 id，也是 characters/<id>.md 的文件名。玩家扮演的主角固定 id 为 protagonist。',
						},
						name: { type: 'string', description: '显示名；不写就显示 id。' },
						persona: { type: 'string', description: '角色卡正文：年龄、关系、说话方式、在意的点。' },
					},
				},
			},
		},
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute(args) {
			const result = await scaffoldPlay(ctx.playDir(), {
				title: args.title,
				id: args.id,
				premise: args.premise,
				opening: args.opening,
				characters: args.characters,
			});
			const lines = [`已把 ${result.dir} 立成剧目《${args.title.trim()}》（id: ${result.id}）。`];
			if (result.kept.length > 0) lines.push(`已经有、这份没动：${result.kept.join('、')}`);
			lines.push(`新写下：${result.written.join('、')}`);
			lines.push('接下来按《剧目在哪》去读 premise.md 与角色卡，缺什么补什么。');
			return lines.join('\n');
		},
	});
}
