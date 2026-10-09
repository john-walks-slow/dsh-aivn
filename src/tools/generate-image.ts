/**
 * `generate_image` —— **出候选**：只产图，不抠底、不登记。
 *
 * 参数面与描述正文来自 `@aivn/agent` 的 `image.generate`（两个宿主同一份）；这里只接插件的 IO：
 * 给了 `kind` 就走剧目感知的出图（提示词后缀、垫已入库的 neutral、落草稿区），不给就是一张
 * 不绑剧目的通用候选。落成素材另走 `cut`（立绘抠底）/ `import_asset`（登记）；要一条龙用 `generate_asset`。
 *
 * 剧目感知的提示词配方（立绘的纯色键底、平涂、景别措辞）在技能 `aivn-visual-craft`——
 * 那条路是给「用外部图 / 自己写配方」留的，一键路径由 `generate_asset` 自动加后缀。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { imageGenerate, imageGenerateFields, type ImageGenerateArgs } from '@aivn/agent';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import { genericResult, textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

export function createGenerateImageTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_image',
		description: imageGenerate.doc,
		parameters: toDsh(imageGenerateFields),
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			// 回执要的那张草稿（路径之外的画幅、绝对路径都在它身上）。
			let drafted = null as Awaited<ReturnType<typeof assets.draft>> | null;
			const produced = await imageGenerate.execute(args as ImageGenerateArgs, {
				async run(request) {
					// 画风锚点拼在 prompt 前面（本仓既有口径）。
					const prompt = request.style ? `${request.style}, ${request.prompt}` : request.prompt;
					const generic = !request.target;
					drafted = generic
						? await assets.createGeneric(prompt, {
								...(request.references ? { references: request.references } : {}),
								...(request.aspectRatio ? { aspectRatio: request.aspectRatio as never } : {}),
							})
						: await assets.draft(
								{ ...request.target!, ...(request.references ? { references: request.references } : {}) },
								prompt,
							);
					return { path: producedPath(drafted), adopted: false };
				},
			});
			void produced;
			return genericResult(drafted!);
		},
	});
}

/** 草稿的剧目内相对路径（两种出图都回它）。 */
function producedPath(drafted: { path: string }): string {
	return drafted.path;
}
