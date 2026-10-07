/**
 * `import_asset` —— 把一张图**登记**成剧目素材（不抠底）。两个预设共用，且不依赖生图后端。
 *
 * `source`：剧目内相对路径 / http(s) 网址（图可以是 `generate_image` 出的候选、别的工具出的、或用别的方式
 * 拿到的）。落位（kind + 主体/差分/取景体量）**始终显式给**——登记这一步不认识「出图意图」。
 *
 * 立绘要已抠好的透明 PNG（想自动抠底先调 `cut`）；`original` 给抠底前原片，会留底到
 * `media-cache/sprite-sources/`，日后可重抠。写 `assets/`、补素材表（呈现声明 + 描述）、记台账。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../../media/backends';
import { playAssetsOf, type AssetTarget } from '../../media/assets';
import { generatedResult, textOutput } from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'把一张图**登记**成剧目素材：写 `assets/`、补素材表（呈现声明 + 描述）、记台账。**不抠底**。',
	'`source`：剧目内相对路径 / http(s) 网址。它可以是 `generate_image` 的候选、别的工具出的图、或下载的图。',
	'落位**始终显式给**：`kind`（background / cg / sprite）必填；立绘再给 `spriteId`（可给 `variant` / `framing` / `stature` / `title`）。',
	'**立绘要已抠好的透明 PNG**：外部来源想自动抠底，先 `cut` 再登记这张透明 PNG。',
	'`original`（可选）：立绘抠底**前**的原片路径，会给留底（`media-cache/sprite-sources/`），日后可重抠。',
	'**登记前先把预览摆给用户看过、用户点头了才调**——它一进来就是剧目素材了，会覆盖同名的旧图。',
	'`description` 写一句话画面（剧作家挑素材全靠它）；`prompt` 记进台账（可省）。',
].join('\n');

/** kind 必填；其余落位字段显式给。 */
function targetFromArgs(args: Record<string, unknown>): AssetTarget {
	const { kind } = args;
	if (kind !== 'background' && kind !== 'cg' && kind !== 'sprite') {
		throw new Error('import_asset 要 kind（background / cg / sprite）');
	}
	return {
		kind,
		...(typeof args.name === 'string' && args.name.trim() ? { name: args.name.trim() } : {}),
		...(typeof args.spriteId === 'string' && args.spriteId.trim() ? { spriteId: args.spriteId.trim() } : {}),
		...(typeof args.variant === 'string' && args.variant.trim() ? { variant: args.variant.trim() } : {}),
		...(typeof args.framing === 'string' ? { framing: args.framing as AssetTarget['framing'] } : {}),
		...(typeof args.stature === 'string' ? { stature: args.stature as AssetTarget['stature'] } : {}),
		...(typeof args.title === 'string' && args.title.trim() ? { title: args.title.trim() } : {}),
	};
}

export function createImportAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'import_asset',
		description: DESCRIPTION,
		parameters: {
			source: {
				type: 'string',
				required: true,
				description: '图片来源：剧目内相对路径 / http(s) 网址。',
			},
			kind: {
				type: 'string',
				enum: ['background', 'cg', 'sprite'],
				required: true,
				description: '落成什么素材。',
			},
			name: { type: 'string', description: '背景 / 插图的素材 id。' },
			spriteId: { type: 'string', description: '立绘主体 id（`assets/sprites/<id>/` 的目录名）。' },
			variant: { type: 'string', description: '立绘差分名，不给按 neutral。' },
			framing: {
				type: 'string',
				enum: ['full', 'half', 'square'],
				description: '立绘取景（决定画幅与台上站位）；不给沿用素材表声明，再不给是全身。',
			},
			stature: {
				type: 'string',
				enum: ['small', 'normal', 'large', 'huge'],
				description: '立绘体量（台上多大）；不给沿用素材表声明，再不给是标准。',
			},
			title: { type: 'string', description: '立绘标题（无角色卡时舞台名牌显示它）。' },
			description: { type: 'string', description: '一句话画面描述，写进素材表；剧作家挑素材靠它。' },
			prompt: { type: 'string', description: '台账里记的「当初用什么描述出的」（可省）。' },
			original: {
				type: 'string',
				description: '立绘抠底**前**的原片路径：给了就留底，日后可 `cut` 重抠。',
			},
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			return generatedResult(
				await assets.register(args.source, targetFromArgs(args as Record<string, unknown>), {
					...(args.description?.trim() ? { description: args.description.trim() } : {}),
					...(args.prompt?.trim() ? { prompt: args.prompt.trim() } : {}),
					...(args.original?.trim() ? { original: args.original.trim() } : {}),
				}),
			);
		},
	});
}
