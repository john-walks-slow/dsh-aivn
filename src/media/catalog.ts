/**
 * 落位与记账：把一份字节写进 `assets/`，并同步三处元数据——素材表声明（`manifest.json`）、
 * 生图台账（`generated.json`）、立绘抠底原片留底（`media-cache/sprite-sources/`）。
 *
 * 这是「入库」这一步真正动盘的部分，`commit` / `register` / `generateBgm` 共用它；
 * 它不认识「草稿」「候选」，只认一个已经决定好的落位规格 + 字节。
 */
import { randomUUID } from 'node:crypto';
import { mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { AssetMeta } from '@aivn/core';
import { readManifest } from '../play/assets';
import { existingAsset } from './target';
import { readJson, writeJsonLocked } from './storage';
import type { AssetSpec, GeneratedAsset, LedgerEntry } from './types';

/** 写进 `assets/`：同名旧扩展名的文件先删（换后端后 jpg/png 会互相残留）。 */
export async function persist(dir: string, spec: AssetSpec, bytes: Buffer, ext: string): Promise<GeneratedAsset> {
	const kindDir = join(dir, 'assets', spec.kindPath);
	await mkdir(kindDir, { recursive: true });
	const file = `${spec.stem}${ext}`;
	const replaced = await existingAsset(dir, spec.kindPath, spec.stem);
	for (const entry of await readdir(kindDir).catch(() => [] as string[])) {
		if (entry !== file && entry.replace(/\.\w+$/, '') === spec.stem) {
			await rm(join(kindDir, entry), { force: true });
		}
	}
	const abs = join(kindDir, file);
	const tmp = `${abs}.${randomUUID().slice(0, 8)}.tmp`;
	await writeFile(tmp, bytes);
	await rename(tmp, abs);
	const path = `${spec.kindPath}/${file}`;
	return { kind: spec.kind, path: `assets/${path}`, absPath: abs, replaced };
}

/** 抠底前原片留一份：重抠时从 `media-cache/sprite-sources/<主体>/` 取原图。 */
export async function keepSource(dir: string, spec: AssetSpec, data: Buffer, ext: string): Promise<void> {
	if (!spec.spriteId) return;
	const sourceDir = join(dir, 'media-cache', 'sprite-sources', spec.spriteId);
	await mkdir(sourceDir, { recursive: true });
	for (const entry of await readdir(sourceDir).catch(() => [] as string[])) {
		if (entry !== `${spec.stem}${ext}` && entry.replace(/\.\w+$/, '') === spec.stem) {
			await rm(join(sourceDir, entry), { force: true });
		}
	}
	await writeFile(join(sourceDir, `${spec.stem}${ext}`), data);
}

/** 素材表里的呈现声明：立绘级（framing/stature/title）+ 差分级的画幅覆盖。 */
export async function declareSprite(dir: string, spec: AssetSpec): Promise<void> {
	if (!spec.spriteId) return;
	const key = spec.spriteId;
	await withManifest(dir, (current) => {
		const level = current[key] ?? {};
		// 立绘级取景以**定妆照**那一次为准：它是所有差分的垫图基准，一条 closeup 不该把基准带跑。
		// 差分的取景写在自己的键上（下面那条覆盖），差多少写多少。
		const neutral = spec.variant === 'neutral';
		const next: Record<string, AssetMeta> = {
			...current,
			[key]: {
				...level,
				...(spec.title ? { title: spec.title } : {}),
				...(neutral && spec.framing ? { framing: spec.framing } : {}),
				...(neutral && spec.stature ? { stature: spec.stature } : {}),
			},
		};
		// 差分与立绘级取景不同才写一条覆盖（否则键位重复、以后改一处忘另一处）。
		if (!neutral && spec.framing && spec.framing !== level.framing) {
			const variantKey = `${spec.spriteId}/${spec.variant}`;
			next[variantKey] = { ...next[variantKey], framing: spec.framing };
		}
		return next;
	});
}

/** 素材表里的一句话画面描述：剧作家挑素材全靠它。立绘落到 `<主体>/<差分>` 键上。 */
export async function declareDescription(dir: string, spec: AssetSpec, description: string): Promise<void> {
	const key = spec.kind === 'sprite' ? `${spec.spriteId}/${spec.variant}` : spec.stem;
	await withManifest(dir, (current) => ({ ...current, [key]: { ...current[key], description } }));
}

/** BGM 的素材表来源标记（曲子没有立绘那套呈现声明，只记一条「哪来的」）。 */
export async function declareBgmSource(dir: string, stem: string): Promise<void> {
	await withManifest(dir, (current) => ({ ...current, [stem]: { ...current[stem], source: 'AI 生成（本插件）' } }));
}

/** 台账：这张图当初用什么描述出的（`assets/generated.json`，只增条目不覆盖别人的键）。 */
export async function recordPrompt(dir: string, spec: AssetSpec, path: string, prompt: string): Promise<void> {
	const id = spec.variant ? `${spec.spriteId}/${spec.variant}` : spec.stem;
	await recordLedger(dir, id, { kind: spec.kind, path, prompt, createdAt: new Date().toISOString() });
}

/** 台账写一条（BGM 也走它，`kind` 换 `bgm`）。 */
export async function recordLedger(dir: string, id: string, entry: LedgerEntry): Promise<void> {
	const file = join(dir, 'assets', 'generated.json');
	await writeJsonLocked(
		file,
		() => readJson(file, {} as Record<string, LedgerEntry>),
		(table) => ({ ...table, [id]: entry }),
	);
}

/**
 * 素材表的读-改-写，整段串行（锁按文件路径挂在模块级，见 `storage.ts` 的 `withFileLock`）。
 *
 * 锁内只做「读盘 → 合并 → 原子替换」，不与出图/抠底那些秒级操作共享临界区。
 */
export function withManifest(
	dir: string,
	mutate: (current: Record<string, AssetMeta>) => Record<string, AssetMeta>,
): Promise<void> {
	return writeJsonLocked(join(dir, 'assets', 'manifest.json'), () => readManifest(dir), mutate);
}
