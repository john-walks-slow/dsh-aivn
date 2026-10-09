/**
 * `import_asset` —— 把一张图**登记**成剧目素材（不抠底）。两个预设共用，且不依赖生图后端。
 *
 * 参数真相源、描述正文与落位归一化都在 `@aivn/agent` 的 `asset.register`；这里只声明**插件的 face**
 *（露哪些格、怎么渲染回执）并把宿主的 IO 接上（`media/import.ts`）。
 *
 * 立绘要已抠好的透明 PNG（想自动抠底先调 `cut`）；`original` 给抠底前原片，会留底到
 * `media-cache/sprite-sources/`，日后可重抠。写 `assets/`、补素材表（呈现声明 + 描述）、记台账。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { join } from 'node:path';
import { assetRegister, assetRegisterFields, type AssetRegisterArgs, type AssetRegisterDeps } from '@aivn/agent';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import { generatedResult, textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

export function createImportAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'import_asset',
		description: assetRegister.doc,
		parameters: toDsh(assetRegisterFields),
		output: textOutput,
		async execute(args) {
			const dir = ctx.playDir();
			const assets = playAssetsOf(dir, media);
			const deps: AssetRegisterDeps = {
				// 库里的 IO 回执比能力要的宽（多一个绝对路径给预览），取能力要的那几格。
				register: async (source, location, extra) => {
					const asset = await assets.register(source, location, extra);
					return {
						kind: location.kind,
						path: asset.path,
						replaced: asset.replaced,
						...(asset.sourcePath ? { sourcePath: asset.sourcePath } : {}),
					};
				},
			};
			const registered = await assetRegister.execute(args as AssetRegisterArgs, deps);
			return generatedResult({ ...registered, absPath: join(dir, registered.path) });
		},
	});
}
