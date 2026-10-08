/**
 * `generate_image` —— 生成一张图（**候选**）。纯生成，不绑剧目目标、不抠底、不登记。
 *
 * 想落成剧目素材：背景 / 插图直接 `import_asset`；立绘先 `cut` 抠底、再 `import_asset`。
 * 想一条龙：用 `generate_asset`。三个工具职责单一、可组合（图也可以来自别的工具，只要能被 `import_asset` 登记）。
 *
 * 剧目感知的提示词配方（立绘的纯色键底、平涂、景别措辞、身份锁、垫已入库的 neutral）不在工具里，
 * 在技能 `aivn-visual-craft` —— 出立绘前先按它写 prompt。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import { genericResult, textOutput } from '../media/generate-tool';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'生成一张图（**候选**）：给一段英文画面描述，返回图片文件路径与预览。',
	'**纯生成**——不绑定任何剧目目标、不抠底。落成素材另走 `cut`（立绘抠底）/ `import_asset`（登记）；要一条龙用 `generate_asset`。',
	'画幅用 `aspectRatio`（默认 16:9）。**要立绘**：在 prompt 里写清纯色键底与景别/机位（配方见技能 `aivn-visual-craft`）；要跟某个角色保持一致，把它的立绘路径放进 `references`。',
	'一次调用一张图；要几张候选就在一批里多调几次，挑中的那张再登记。',
	'**出图要钱也要时间**（70–140 秒，这一轮停在那里）：只为真要用的图出。',
].join('\n');

export function createGenerateImageTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_image',
		description: DESCRIPTION,
		parameters: {
			prompt: {
				type: 'string',
				required: true,
				description: '英文画面描述：主体、姿势、机位、景别、环境与光影。立绘的纯色底/画风后缀按技能配方自己写。',
			},
			references: {
				type: 'array',
				items: { type: 'string', description: '主体 id / 剧目内相对路径 / http(s) 网址' },
				description:
					'垫图（最多 6 张，顺序即提示词里「第一张、第二张」）：给主体 id 会自动用它的立绘；给路径/网址直接当参考图。',
			},
			aspectRatio: {
				type: 'string',
				enum: ['16:9', '3:4', '1:1', '9:16', '4:3'],
				description: '画幅，默认 16:9。',
			},
			style: { type: 'string', description: '画风锚点（可选），拼在 prompt 前面。' },
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const prompt = args.style?.trim() ? `${args.style.trim()}, ${args.prompt.trim()}` : args.prompt.trim();
			return genericResult(
				await assets.createGeneric(prompt, { references: args.references, aspectRatio: args.aspectRatio }),
			);
		},
	});
}
