/**
 * `generate_asset` —— **显式宏**：出图 +（立绘）抠底 + 登记，一次完成。
 *
 * 编排在 `@aivn/agent` 的 `asset.generate`（描述与参数都从那儿来，宿主不自造一句）；
 * 这里只声明**插件的 face**：三步各自接上本仓的 IO，并把回执写成本仓的话术。
 * 适合「就想要一张能用的图」；要精细控制（先看候选、用外部图、单独重抠）就用原子三件套
 * `generate_image` / `cut` / `import_asset`。
 *
 * 剧目感知的提示词后缀（立绘色键底、身份锁、垫 neutral）在**这条编排路径**里由引擎自动加
 *（因为它知道出的是立绘），原子路径则靠技能里的配方。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { join } from 'node:path';
import {
	assetGenerate,
	assetGenerateFields,
	type AssetGenerateArgs,
	type AssetGenerateDeps,
	type AssetRegistration,
} from '@aivn/agent';
import type { MediaBackends } from '../media/backends';
import type { GeneratedAsset } from '../media/types';
import { playAssetsOf } from '../media/assets';
import { existingNote, generatedResult, textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

export function createGenerateAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_asset',
		description: assetGenerate.doc,
		parameters: toDsh(assetGenerateFields),
		output: textOutput,
		async execute(args) {
			const dir = ctx.playDir();
			const assets = playAssetsOf(dir, media);
			// 回执要的那点宿主知识（预览用绝对路径、顺手补出来的定妆照）顺手带出来。
			let autoNeutral: GeneratedAsset | null = null;
			const deps: AssetGenerateDeps = {
				exists: (location) => assets.exists(location),
				produce: {
					async run(request) {
						const target = {
							...request.target!,
							...(request.references ? { references: request.references } : {}),
						};
						// 画风锚点拼在 prompt 前面（本仓既有口径）。
						const prompt = request.style ? `${request.style}, ${request.prompt}` : request.prompt;
						const produced = await assets.produce(target, prompt);
						autoNeutral = produced.autoNeutral;
						return { path: produced.drafted.path, adopted: false };
					},
				},
				cut: async ({ source }) => ({ path: (await assets.cut({ source })).path }),
				register: async (source, location, extra): Promise<AssetRegistration> => {
					const asset = await assets.register(source, location, extra);
					return {
						kind: location.kind,
						path: asset.path,
						replaced: asset.replaced,
						...(asset.sourcePath ? { sourcePath: asset.sourcePath } : {}),
					};
				},
			};

			const out = await assetGenerate.execute(args as AssetGenerateArgs, deps);
			if (out.skipped) return existingNote(out.target);
			const registered = out.registration!;
			const asset: GeneratedAsset = {
				kind: registered.kind,
				path: registered.path,
				absPath: join(dir, registered.path),
				replaced: registered.replaced,
				...(registered.sourcePath ? { sourcePath: registered.sourcePath } : {}),
				...(autoNeutral ? { autoNeutral } : {}),
			};
			return generatedResult(asset);
		},
	});
}
