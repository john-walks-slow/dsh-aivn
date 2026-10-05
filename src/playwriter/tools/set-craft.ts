/**
 * `set_craft` —— 写回 `play.json` 的 `craft` 段（每轮篇幅、停止点选项数、素材来源）。
 *
 * 照 AIVN `apps/server/src/agentkit/craftTool.ts`：三个字段都是结构化的配置，
 * 而 `play.json` 里还躺着 `id` / `title` / `opening` / `initialState` 这些引擎状态——
 * 让模型整篇 write 一遍等于把整份配置交给一次自由发挥。这里只换 `craft` 这一个键，
 * 文件里其余部分（哪怕是引擎不认识的手写字段）一个字节都不动。
 *
 * 三态（省略 / 给值 / null）见 `craft.ts` 的 `CraftPatch`：省略 = 不动，
 * null = 恢复默认（该字段从 play.json 里消失，日后引擎默认值改了它跟着改）。
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parsePlayConfig } from '@aivn/core';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { PLAY_FILE } from '../../play';
import { CRAFT_ENUMS, describeCraftParams, mergeCraftParams, resolveCraft, type CraftPatch } from '../craft';
import type { PlayContext } from '../../tools/context';

const RESET = '省略 = 保持现状；给 null = 恢复引擎默认值（该字段从 play.json 移除）。';

const DESCRIPTION = [
	'设置这个剧目的写作参数（每轮篇幅、停止点选项数、素材来源），写进 play.json 的 craft 段。',
	'调了 = 文件立刻更新，回执里带回新的生效值；不调 = 参数维持原样。',
	'**用户要求改、或你们商定了新的节奏再调**——别自己顺手改，每一轮怎么写是按它来的。',
	`- ${RESET}`,
	'素材来源四类记的是**意向**：本阶段没有生图、也没有跨剧目素材资源库，四类素材一律只能用手工放进',
	'assets/ 的那些；这些值写下去要等引擎支持出图/资源库才真的改变行为。',
	'文风、禁忌、称呼习惯这类只能拿话说的口径不在这里，写在 memory/always/craft.md。',
	'改完拿回执里的生效值跟用户确认。',
].join('\n');

export function createSetCraftTool(ctx: PlayContext) {
	return defineTool({
		name: 'set_craft',
		description: DESCRIPTION,
		parameters: {
			beatLength: {
				oneOf: [
					{
						type: 'string',
						enum: [...CRAFT_ENUMS.beatLength],
						description: '一轮写多长：short 一个来回就收 / medium 演完一小段 / long 演完一整场戏',
					},
					{ type: 'null' },
				],
				description: `每轮篇幅。${RESET}`,
			},
			stopOptions: {
				oneOf: [
					{
						type: 'string',
						enum: [...CRAFT_ENUMS.stopOptions],
						description: '停止点给几条选项：two/three/four = 每次 2/3/4 条，free = 固定停在自由输入框',
					},
					{ type: 'null' },
				],
				description: `停止点选项数。${RESET}`,
			},
			assets: {
				oneOf: [
					{
						type: 'object',
						additionalProperties: false,
						description: '素材来源逐类声明；对象里哪一项省略就哪一项不动',
						properties: {
							background: {
								oneOf: [
									{
										type: 'string',
										enum: [...CRAFT_ENUMS.background],
										description: 'library-first 资源库优先、没有合适的再出图 / library 只用库里现成的 / generate 直接出图',
									},
									{ type: 'null' },
								],
							},
							cg: {
								oneOf: [
									{
										type: 'string',
										enum: [...CRAFT_ENUMS.cg],
										description: 'library 只用库里现成的 / generate 直接出图 / off 本剧目不用插图',
									},
									{ type: 'null' },
								],
							},
							sprite: {
								oneOf: [
									{ type: 'string', enum: [...CRAFT_ENUMS.sprite], description: 'generate 出图 / off 不出立绘' },
									{ type: 'null' },
								],
							},
							audio: {
								oneOf: [
									{ type: 'string', enum: [...CRAFT_ENUMS.audio], description: 'library 只用库里现成的 / off 不用音乐音效' },
									{ type: 'null' },
								],
							},
						},
					},
					{ type: 'null' },
				],
				description: `素材来源（背景 / 插图 / 立绘 / 音乐音效）。${RESET}${' '}给 null = 四项一起恢复默认。`,
			},
		},
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute(args) {
			const path = join(ctx.playDir(), PLAY_FILE);
			let before: string;
			try {
				before = await readFile(path, 'utf8');
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
					throw new Error(`${PLAY_FILE} 不在这个会话的工作目录里——这里还不是一座剧目，先让玩家把剧目建起来`);
				}
				throw error;
			}

			const patch: CraftPatch = {};
			if (args.beatLength !== undefined) patch.beatLength = args.beatLength;
			if (args.stopOptions !== undefined) patch.stopOptions = args.stopOptions;
			if (args.assets !== undefined) patch.assets = args.assets;

			const raw = JSON.parse(before) as Record<string, unknown>;
			const play = parsePlayConfig(raw);

			if (Object.keys(patch).length === 0) {
				return `这次没给任何要改的字段（三个参数都可选，但总得给一个）。当前生效值：\n\n${describeCraftParams(
					resolveCraft(play.craft),
				)}`;
			}

			// 校验走 parsePlayConfig，写回用原始对象：只换 craft 这一个键。
			const merged = mergeCraftParams(play.craft, patch);
			const out: Record<string, unknown> = { ...raw };
			if (merged) out.craft = merged;
			else delete out.craft;
			const after = `${JSON.stringify(out, null, 2)}\n`;
			if (after !== before) await writeFile(path, after, 'utf8');

			return `已更新写作参数（只把与默认值不同的字段写进 ${PLAY_FILE}）。当前生效值：\n\n${describeCraftParams(
				resolveCraft(merged),
			)}`;
		},
	});
}
