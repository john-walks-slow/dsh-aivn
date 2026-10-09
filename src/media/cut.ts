/**
 * `cut` 的 use case：**抠底**——把一张**纯色底**图变成透明 PNG，写到 `output`（不给就写到候选区）。
 *
 * 纯图像处理，**只写输出、不改源图**，也不是素材登记的必经步骤——背景 / 插图直接 `import_asset`
 * 即可；立绘先 `cut`、再登记那张透明 PNG。`opts.tuning` 之外可传一次性调参（对着同一张源图再跑）。
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { resolveInPlay } from '../play/assets';
import { cutout, resolveTuning, type CutoutTuning } from './cutout';
import { newDraftId, draftDir } from './draft-store';
import { writeAtomic } from './storage';
import type { PlayAssetsOptions } from './types';

/** 抠底结果：输出路径（剧目内相对 + 绝对）与体检。 */
export interface CutResult {
	path: string;
	absPath: string;
	cutout: { coverage: number; figureHeight: number };
}

/** 抠底：把 `source` 变成透明 PNG 写到 `output`（不给就落候选区），返回输出路径与体检。 */
export async function cutFile(
	opts: PlayAssetsOptions,
	source: string,
	output?: string,
	tuning?: Partial<CutoutTuning>,
): Promise<CutResult> {
	const dir = opts.dir;
	const src = source.trim();
	if (src === '') throw new Error('cut 要 source（一张纯色底图的路径）');
	const abs = resolveInPlay(dir, src);
	if (!abs) throw new Error(`cut 的 source 路径越界：${src}（只能给剧目内的相对路径）`);
	if (!existsSync(abs)) throw new Error(`cut 的 source 找不到：${src}`);
	const cut = await cutout(await readFile(abs), resolveTuning({ ...opts.tuning, ...tuning }));

	const outAbs = output?.trim()
		? (resolveInPlay(dir, output) as string | null)
		: join(draftDir(dir, newDraftId()), 'cut.png');
	if (!outAbs) throw new Error(`cut 的 output 路径越界：${output}（只能给剧目内的相对路径）`);
	await mkdir(dirname(outAbs), { recursive: true });
	// 原子落盘：同批里两次抠底写到同一个 output 时，「整体生效」而不是两份内容交错。
	await writeAtomic(outAbs, cut.data);
	return {
		path: relative(dir, outAbs).split(/[\\/]/).join('/'),
		absPath: outAbs,
		cutout: { coverage: cut.coverage, figureHeight: cut.figureHeight },
	};
}
