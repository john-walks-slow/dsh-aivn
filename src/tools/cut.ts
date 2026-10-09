/**
 * `cut` —— 抠底：把一张**纯色底**的图变成透明 PNG（只写输出，**不改源图**）。
 *
 * 纯图像处理，不登记、不外呼。立绘登记前先跑它；抠脏了（边上有底色、发丝被啃）就对着**同一张源图**
 * 调参数再跑一次——所以源图要留着。`import_asset` 的 `original` 可以把抠底前原片留底到
 * `media-cache/sprite-sources/`，日后想重抠时喂给它即可。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import { textOutput } from '../media/generate-tool';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'抠底：把一张**纯色底**的图（通常是要当立绘的主体）转成透明 PNG。回执给输出路径与抠底体检。',
	'**只写输出、不改源图**；也不登记素材——登记走 `import_asset`。源图要留着：抠脏了就对着同一张再调参跑一次。',
	'用在「图挺好、就是边缘脏」：用户说抠得不干净、边上有一圈底色、发丝被啃掉了。',
	'**源图的底色必须是饱和的色键色**（纯绿 #00FF00 / 纯品红 #FF00FF）：整圈边框量出的底色若通道极差 <96',
	'（白底、浅灰底、照片底这类），当场报错并让你重出——白底当色键会把浅色处抠穿、把画面压灰，不是调参能救的。',
	'调参是 0–255 的通道色差，不是比例：',
	'- `tolerance` 色键容差（默认 48）：**调大 = 抠得更狠**，但也会连发丝一起啃掉，只在底色残留明显时加；',
	'- `spill` 限色（默认 20）：压掉边缘残存的底色，**发丝一根不少**——边上还有底色残留先调它；',
	'- `edgeBand` 反解带宽（默认 4）：抗锯齿渐变带宽度，边缘出现硬白圈时才加；',
	'- `keySmooth` 色键降噪（默认 0.8）：源图 JPEG 环纹在轮廓上啃出缺口时加；',
	'- `solidResidual` 实心判据（默认 48）：**调小 = 更多像素判成实心**，描边被吃掉时调小它。',
	'一次只调一两个：五个一起动就看不出是哪个起了作用。',
].join('\n');

export function createCutTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'cut',
		description: DESCRIPTION,
		parameters: {
			source: {
				type: 'string',
				required: true,
				description: '要抠的源图（剧目内相对路径）：纯色底、且底色不与主体撞色。',
			},
			output: {
				type: 'string',
				description: '透明 PNG 写到哪里（剧目内相对路径）；不给就写到候选区，回执给路径。',
			},
			tolerance: { type: 'number', description: '色键容差，0–128，默认 48。调大 = 抠得更狠。' },
			keySmooth: { type: 'number', description: '色键降噪模糊半径，0–8，默认 0.8。' },
			edgeBand: { type: 'number', description: '反解带宽（像素），1–32，默认 4。' },
			spill: { type: 'number', description: '限色量，0–255，默认 20。' },
			solidResidual: { type: 'number', description: '实心判据残差上限，0–255，默认 48。调小 = 更多像素判成实心。' },
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const result = await assets.cutFile(args.source, args.output, {
				...(args.tolerance !== undefined ? { tolerance: args.tolerance } : {}),
				...(args.keySmooth !== undefined ? { keySmooth: args.keySmooth } : {}),
				...(args.edgeBand !== undefined ? { edgeBand: args.edgeBand } : {}),
				...(args.spill !== undefined ? { spill: args.spill } : {}),
				...(args.solidResidual !== undefined ? { solidResidual: args.solidResidual } : {}),
			});
			const { coverage, figureHeight } = result.cutout;
			const lines = [
				`已抠底：\`${result.path}\``,
				`![抠好的图](${result.absPath})`,
				`前景占比 ${(coverage * 100).toFixed(1)}%，主体高 ${figureHeight}px。`,
			];
			if (coverage < 0.03) {
				lines.push('前景占比过低，可能整张被判成了底色——源图底色是不是与主体撞色了？换一个纯色底重出。');
			}
			lines.push(
				`下一步：把这张透明 PNG 交给 \`import_asset\`（kind=sprite）登记。` +
					'要重抠一张已入库的立绘：源图就是它的抠底前原片（`media-cache/sprite-sources/<主体id>/`，' +
					'登记时的 `original` 或生成时的留底），`output` 指回 `assets/sprites/<主体id>/<差分>.png`。',
			);
			return lines.join('\n');
		},
	});
}
