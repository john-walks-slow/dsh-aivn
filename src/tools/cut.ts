/**
 * `cut` —— 抠底：把一张**纯色底**的图变成透明 PNG（只写输出，**不改源图**）。
 *
 * 纯图像处理，不登记、不外呼。立绘登记前先跑它；抠脏了（边上有底色、发丝被啃）就对着**同一张源图**
 * 调参数再跑一次——所以源图要留着。`import_asset` 的 `original` 可以把抠底前原片留底到
 * `media-cache/sprite-sources/`，日后想重抠时喂给它即可。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import {
	CUTOUT_TUNING_GUIDE,
	IMAGE_CUTOUT_DOC,
	imageCutout,
	imageCutoutFields,
	pick,
} from '@aivn/agent';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import { textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

const DESCRIPTION = [
	IMAGE_CUTOUT_DOC,
	'用在「图挺好、就是边缘脏」：用户说抠得不干净、边上有一圈底色、发丝被啃掉了。',
	CUTOUT_TUNING_GUIDE,
].join('\n');

export function createCutTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'cut',
		description: DESCRIPTION,
		parameters: toDsh(pick(imageCutoutFields, ['source', 'output', 'tolerance', 'keySmooth', 'edgeBand', 'spill', 'solidResidual'])),
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const result = await imageCutout.execute(args as Parameters<typeof imageCutout.execute>[0], {
				// 插件的落盘：源图必须在剧目内、输出走原子写（那两件事在 cutFile 里）；
				// 素材引用（sprite:<主体id>）在这里换成留底原片，不给 output 就是原地重抠。
				cut: async (request) => {
					const cut = await assets.cut(request);
					return { path: cut.path, absPath: cut.absPath, ...cut.cutout };
				},
			});
			const lines = [
				`已抠底：\`${result.path}\``,
				`![抠好的图](${result.absPath})`,
				`前景占比 ${(result.coverage * 100).toFixed(1)}%，主体高 ${result.figureHeight}px。`,
			];
			if (result.coverage < 0.03) {
				lines.push('前景占比过低，可能整张被判成了底色——源图底色是不是与主体撞色了？换一个纯色底重出。');
			}
			lines.push(
				'下一步：把这张透明 PNG 交给 `import_asset`（kind=sprite）登记。' +
					'**要重抠一张已入库的立绘**：`source` 给 `sprite:<主体id>[/<差分名>]`，不给 `output` 就是原地重抠' +
					'（拿它的抠底前原片重跑，画面不变、只改透明边缘）。',
			);
			return lines.join('\n');
		},
	});
}
