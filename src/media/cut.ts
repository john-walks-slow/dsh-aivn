/**
 * `cut` 的 use case：**抠底**——把一张**纯色底**图变成透明 PNG，写到 `output`（不给就按寻址方式定）。
 *
 * 纯图像处理，**只写输出、不改源图**，也不是素材登记的必经步骤——背景 / 插图直接 `import_asset`
 * 即可；立绘先 `cut`、再登记那张透明 PNG。
 *
 * 源图两种寻址（能力那层已经分好岔，这里只认结果）：
 * - `source`：剧目内相对路径（自己拿到的图、下载的图、候选图）；
 * - `target`：**素材引用**（`sprite:<主体id>[/<差分名>]`）。立绘优先用**抠底前留的原片**
 *   （`media-cache/sprite-sources/`）——那是最干净的一次抠底；不给 `output` 就写回素材那张，
 *   于是「图挺好、就是边缘脏」是原地重抠，画面一个像素不变。
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { IMAGE_EXTS, type AssetRefParts } from '@aivn/agent';
import { resolveInPlay } from '../play/assets';
import { cutout, resolveTuning, type CutoutTuning } from './cutout';
import { newDraftId, draftDir } from './draft-store';
import { writeAtomic } from './storage';
import type { PlayAssetsOptions } from './types';

/** 抠底要的那点输入（与能力里的 `CutoutRequest` 同形）。 */
export interface CutRequest {
  source?: string;
  target?: AssetRefParts;
  output?: string;
  tuning?: Partial<CutoutTuning>;
}

/** 抠底结果：输出路径（剧目内相对 + 绝对）与体检。 */
export interface CutResult {
	path: string;
	absPath: string;
	cutout: { coverage: number; figureTop: number; figureHeight: number };
}

/** 立绘留底原片（抠底前那一张）的剧目内相对路径，没有则 null。 */
function spriteSourceRel(dir: string, target: AssetRefParts): string | null {
	if (target.kind !== 'sprite') return null;
	const id = target.spriteId ?? target.name;
	if (!id) return null;
	const variant = target.variant?.trim() || 'neutral';
	for (const ext of IMAGE_EXTS) {
		const rel = `media-cache/sprite-sources/${id}/${variant}${ext}`;
		if (existsSync(join(dir, rel))) return rel;
	}
	return null;
}

/** 没给 output 时的落点：引用 = 原地重抠素材那张；路径 = 落候选区（登记前先看一眼）。 */
function defaultOutput(dir: string, request: CutRequest): string {
	if (request.target) {
		const id = request.target.spriteId ?? request.target.name ?? '';
		const variant = request.target.variant?.trim() || 'neutral';
		return `assets/sprites/${id}/${variant}.png`;
	}
	return relative(dir, join(draftDir(dir, newDraftId()), 'cut.png')).split(/[\\/]/).join('/');
}

/** 抠底：把源图变成透明 PNG 写到 `output`，返回输出路径与体检。 */
export async function cutFile(opts: PlayAssetsOptions, request: CutRequest): Promise<CutResult> {
	const dir = opts.dir;

	let srcRel: string;
	if (request.target) {
		if (request.target.kind !== 'sprite') throw new Error('只有立绘需要抠底（请给 assets/sprites/<主体id>/<差分>.png）');
		const kept = spriteSourceRel(dir, request.target);
		if (!kept) {
			const id = request.target.spriteId ?? request.target.name ?? '';
			const variant = request.target.variant?.trim() || 'neutral';
			throw new Error(
				`${id}/${variant} 没有留底原片（抠底前那一张）：出图或登记时留了底才有；` +
					'也可以直接把那张图的路径当 source。',
			);
		}
		srcRel = kept;
	} else {
		srcRel = (request.source ?? '').trim();
		if (srcRel === '') throw new Error('cut 要 source（一张纯色底图或已入库立绘的剧目内相对路径）');
	}

	const srcAbs = resolveInPlay(dir, srcRel);
	if (!srcAbs) throw new Error(`cut 的源图路径越界：${srcRel}（只能给剧目内的相对路径）`);
	if (!existsSync(srcAbs)) throw new Error(`cut 的源图找不到：${srcRel}`);

	const cut = await cutout(await readFile(srcAbs), resolveTuning({ ...opts.tuning, ...request.tuning }));

	const outRel = request.output?.trim() || defaultOutput(dir, request);
	const outAbs = resolveInPlay(dir, outRel);
	if (!outAbs) throw new Error(`cut 的 output 路径越界：${outRel}（只能给剧目内的相对路径）`);
	await mkdir(dirname(outAbs), { recursive: true });
	// 原子落盘：同批里两次抠底写到同一个 output 时，「整体生效」而不是两份内容交错。
	await writeAtomic(outAbs, cut.data);
	return {
		path: relative(dir, outAbs).split(/[\\/]/).join('/'),
		absPath: outAbs,
		cutout: { coverage: cut.coverage, figureTop: cut.figureTop, figureHeight: cut.figureHeight },
	};
}
