/**
 * `import_asset` 的 use case：把一张图**登记**成剧目素材（不抠底）。
 *
 * 与 `commit` 分工：`commit` 认识「出图意图」（按 draftId 落位），`register` 只认识**显式给的
 * 落位**——它可以是 `generate_image` 的候选、别的工具出的图、或下载的图。两者最终都落到同一个
 * 「写 `assets/` + 补素材表 + 记台账」上。
 *
 * 立绘应给**已抠好的透明 PNG**（外部来源想自动抠底，先 `cut`）；`original` 给抠底前原片，
 * 会留底到 `media-cache/sprite-sources/`，日后可重抠。
 */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolveInPlay } from '../play/assets';
import { declareDescription, declareSprite, keepSource, persist, recordPrompt } from './catalog';
import { extOf } from './image';
import { mimeOfBuffer, resolve } from './target';
import { fetchWebImage } from './web-image';
import type { AssetTarget, GeneratedAsset, PlayAssetsOptions } from './types';

/** 登记一张图：写 `assets/`、补素材表（呈现声明 + 描述）、记台账，返回回执。 */
export async function register(
	opts: PlayAssetsOptions,
	source: string,
	target: AssetTarget,
	extra: { description?: string; prompt?: string; original?: string } = {},
): Promise<GeneratedAsset> {
	const dir = opts.dir;
	const src = source.trim();
	if (src === '') throw new Error('import_asset 要 source（剧目内相对路径 / http(s) 网址）');
	const spec = await resolve(dir, target);

	let image: Buffer;
	if (/^https?:\/\//i.test(src)) {
		image = (await fetchWebImage(src)).data;
	} else {
		const abs = resolveInPlay(dir, src);
		if (!abs) throw new Error(`source 路径越界：${src}（只能给剧目内相对路径或 http(s) 网址）`);
		if (!existsSync(abs)) throw new Error(`source 找不到：${src}（剧目里没有这个文件）`);
		image = await readFile(abs);
	}

	let sourcePath: string | undefined;
	if (extra.original?.trim()) {
		const oAbs = resolveInPlay(dir, extra.original.trim());
		if (!oAbs) throw new Error(`original 路径越界：${extra.original}`);
		if (!existsSync(oAbs)) throw new Error(`original 找不到：${extra.original}`);
		const raw = await readFile(oAbs);
		const srcExt = extOf(mimeOfBuffer(raw));
		await keepSource(dir, spec, raw, srcExt);
		sourcePath = `media-cache/sprite-sources/${spec.spriteId}/${spec.stem}${srcExt}`;
	}

	const written = await persist(dir, spec, image, spec.kind === 'sprite' ? '.png' : extOf(mimeOfBuffer(image)));
	if (spec.kind === 'sprite') await declareSprite(dir, spec);
	if (extra.description?.trim()) await declareDescription(dir, spec, extra.description.trim());
	await recordPrompt(dir, spec, written.path, (extra.prompt ?? '').trim());
	return sourcePath ? { ...written, sourcePath } : written;
}
