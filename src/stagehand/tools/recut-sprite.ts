/**
 * `recut_sprite` —— 原地重抠一张立绘（只给搭台助手）。
 *
 * 只为「图挺好、抠得脏」而存在：这种没法靠重新出图解决（重画出来是另一张图，用户刚点头的那张
 * 会被顶掉，还白烧一份配额）。原片是立绘**入库时**留的（`media-cache/sprite-sources/`），
 * 所以重抠画面一个像素不变、不烧配额、几秒出结果。
 *
 * 调参在工具参数里给（默认值见 `cutout.ts`，量出来的依据都写在那边）：填它得先看过成图，
 * 而出图那一刻没人看过图——这就是它单独成一个工具的理由。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../../media/backends';
import { playAssetsOf } from '../../media/assets';
import { textOutput } from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'拿立绘**入库时留的原片**重跑一遍抠底，覆盖 `assets/` 里那张透明 PNG：画面一个像素不变，不重新出图。',
	'用在「图挺好、就是边缘脏」的时候（用户说抠得不干净、边上有一圈底色、发丝被啃掉了）。',
	'**只认引擎留过底的立绘**（`media-cache/sprite-sources/<主体id>/`）：用户自己放进去的图、'
		+ '更早版本的图都没法重抠，只能重新出图——那时工具会如实报错，别改参数反复试。',
	'调参是 0–255 的通道色差，不是比例：',
	'- `tolerance` 色键容差（默认 48）：**调大 = 抠得更狠**，但也会连发丝一起啃掉，只在底色残留明显时加；',
	'- `spill` 限色（默认 20）：压掉边缘残存的底色，**发丝一根不少**——边上还有底色残留先调它；',
	'- `edgeBand` 反解带宽（默认 4）：抗锯齿渐变带宽度，边缘出现硬白圈时才加；',
	'- `keySmooth` 色键降噪（默认 0.8）：源图 JPEG 环纹在轮廓上啃出缺口时加；',
	'- `solidResidual` 实心判据（默认 48）：**调小 = 更多像素判成实心**，描边被吃掉时调小它。',
	'一次只调一两个：五个一起动就看不出是哪个起了作用。',
].join('\n');

export function createRecutSpriteTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'recut_sprite',
		description: DESCRIPTION,
		parameters: {
			spriteId: { type: 'string', required: true, description: '立绘的主体 id（`assets/sprites/<id>/` 的目录名）。' },
			variant: { type: 'string', description: '要重抠的差分名；不给按 neutral。' },
			tolerance: { type: 'number', description: '色键容差，0–128，默认 48。调大 = 抠得更狠。' },
			keySmooth: { type: 'number', description: '色键降噪模糊半径，0–8，默认 0.8。' },
			edgeBand: { type: 'number', description: '反解带宽（像素），1–32，默认 4。' },
			spill: { type: 'number', description: '限色量，0–255，默认 20。' },
			solidResidual: { type: 'number', description: '实心判据残差上限，0–255，默认 48。调小 = 更多像素判成实心。' },
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const asset = await assets.recut(
				{
					kind: 'sprite',
					spriteId: args.spriteId,
					...(args.variant?.trim() ? { variant: args.variant.trim() } : {}),
				},
				{
					...(args.tolerance !== undefined ? { tolerance: args.tolerance } : {}),
					...(args.keySmooth !== undefined ? { keySmooth: args.keySmooth } : {}),
					...(args.edgeBand !== undefined ? { edgeBand: args.edgeBand } : {}),
					...(args.spill !== undefined ? { spill: args.spill } : {}),
					...(args.solidResidual !== undefined ? { solidResidual: args.solidResidual } : {}),
				},
			);
			const lines = [`已重抠并覆盖：\`${asset.path}\`（画面未变，只重跑了抠底）`, `![立绘](${asset.absPath})`];
			if (asset.cutout) {
				lines.push(`抠底：前景占比 ${(asset.cutout.coverage * 100).toFixed(1)}%，人物高 ${asset.cutout.figureHeight}px。`);
				if (asset.cutout.coverage < 0.03) {
					lines.push('前景占比仍然过低，可能整张被判成了底色——这种情况重抠解决不了，得换一个不与主体撞色的底色重新出图。');
				}
			}
			return lines.join('\n');
		},
	});
}
