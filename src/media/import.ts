/**
 * `import_asset` 的 IO：把一张图**登记**成剧目素材（不抠底）。
 *
 * 与 `commit` 分工：`commit` 认识「出图意图」（按 draftId 落位），`register` 只认识**显式给的
 * 落位**——它可以是 `generate_image` 的候选、别的工具出的图、或下载的图。
 * 参数面、描述正文与落位归一化在 `@aivn/agent` 的 `asset.register`；入库流水线
 *（写 `assets/` + 素材表声明 + 描述 + 台账 + 原片留底）在包内 `media/register.ts`；
 * 这里只剩插件的 IO：读来源（路径白名单 / SSRF 防护的网图下载）、原子写、按路径串行锁。
 *
 * 立绘应给**已抠好的透明 PNG**（外部来源想自动抠底，先 `cut`）；`original` 给抠底前原片，
 * 会留底到 `media-cache/sprite-sources/`，日后可重抠。
 */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { registerAsset, type AssetLocation } from '@aivn/agent';
import { resolveInPlay } from '../play/assets';
import { assetIo, recordLedger, withManifest } from './catalog';
import { extOf } from './image';
import { resolve, mimeOfBuffer } from './target';
import { fetchWebImage } from './web-image';
import type { GeneratedAsset, PlayAssetsOptions } from './types';

/** 从剧目内的相对路径读一张图（路径必须落在剧目里）。 */
async function readInPlay(dir: string, rel: string, what: string): Promise<Buffer> {
	const abs = resolveInPlay(dir, rel);
	if (!abs) throw new Error(`${what} 路径越界：${rel}（只能给剧目内相对路径或 http(s) 网址）`);
	if (!existsSync(abs)) throw new Error(`${what} 找不到：${rel}（剧目里没有这个文件）`);
	return readFile(abs);
}

/** 登记一张图：写 `assets/`、补素材表（呈现声明 + 描述）、记台账，返回回执。 */
export async function register(
	opts: PlayAssetsOptions,
	source: string,
	location: AssetLocation,
	extra: { description?: string; prompt?: string; original?: string } = {},
): Promise<GeneratedAsset> {
	const dir = opts.dir;
	const src = source.trim();
	if (src === '') throw new Error('import_asset 要 source（剧目内相对路径 / http(s) 网址）');
	const spec = await resolve(dir, location);

	const image = /^https?:\/\//i.test(src) ? (await fetchWebImage(src)).data : await readInPlay(dir, src, 'source');
	const original = extra.original?.trim() ? await readInPlay(dir, extra.original.trim(), 'original') : undefined;

	const out = await registerAsset(
		{
			playDir: dir,
			assets: assetIo(dir),
			updateManifest: (mutate) => withManifest(dir, mutate),
			recordLedger: (entry) => recordLedger(dir, entry),
		},
		spec,
		{
			image: { bytes: image, ext: spec.kind === 'sprite' ? '.png' : extOf(mimeOfBuffer(image)) },
			...(original ? { original: { bytes: original, ext: extOf(mimeOfBuffer(original)) } } : {}),
			...(extra.description ? { description: extra.description } : {}),
			...(extra.prompt ? { prompt: extra.prompt } : {}),
		},
	);

	return {
		kind: spec.kind,
		path: out.rel,
		absPath: join(dir, out.rel),
		replaced: out.replaced,
		...(out.sourceRel ? { sourcePath: out.sourceRel } : {}),
	};
}
