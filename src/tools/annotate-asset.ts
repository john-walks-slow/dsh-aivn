/**
 * `annotate_asset` —— 给**已经入库**的素材补 / 改元数据（标题、描述、标签、情绪、场景、循环、音量）。
 *
 * 参数真相源与描述正文在 `@aivn/agent` 的 `asset.annotate`；这里只接插件的 IO：找到那份素材、
 * 把补丁并进 `assets/manifest.json`（读-改-写整段串行，与生图那条路共用同一把文件锁）。
 *
 * 图片类素材的元数据也可以在登记时一次给全（`import_asset` / `generate_asset` 的
 * `title` / `description` / `tags`）；这个面负责事后改，也是 BGM 唯一的元数据出口——
 * `generate_bgm` 只写一条来源标记。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import {
	assetAnnotate,
	assetAnnotateFields,
	type AssetAnnotateArgs,
	type AssetAnnotateDeps,
} from '@aivn/agent';
import type { MediaBackends } from '../media/backends';
import { annotateAsset } from '../media/annotate';
import { textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

export function createAnnotateAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'annotate_asset',
		description: assetAnnotate.doc,
		parameters: toDsh(assetAnnotateFields),
		output: textOutput,
		async execute(args) {
			void media;
			const deps: AssetAnnotateDeps = {
				annotate: (subject, patch) => annotateAsset(ctx.playDir(), subject, patch),
			};
			return assetAnnotate.execute(args as AssetAnnotateArgs, deps);
		},
	});
}
