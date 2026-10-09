/**
 * 落位与记账：把一份字节写进 `assets/`，并同步三处元数据——素材表声明（`manifest.json`）、
 * 生图台账（`generated.json`）、立绘抠底原片留底（`media-cache/sprite-sources/`）。
 *
 * **规则在 `@aivn/agent` 的 `media/catalog.ts`**（落位路径、旧扩展名清理、声明怎么并、台账条目
 * 长什么样），两个宿主共用一份；这里只剩插件的 IO：原子写 + 按文件路径的串行锁。
 * 它不认识「草稿」「候选」，只认一个已经决定好的落位规格 + 字节。
 */
import { mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
	declareBgmSource as declareBgmIn,
	declareDescription as declareDescriptionIn,
	declareSprite as declareSpriteIn,
	keepSpriteSource,
	ledgerEntryOf,
	persistAsset,
	type AssetIo,
	type AssetManifest,
	type LedgerEntry,
} from '@aivn/agent';
import { readManifest } from '../play/assets';
import { readJson, writeAtomic, writeJsonLocked } from './storage';
import type { AssetSpec, GeneratedAsset } from './types';

/** 写进 `assets/`：同名旧扩展名的文件先删（换后端后 jpg/png 会互相残留）。 */
export async function persist(dir: string, spec: AssetSpec, bytes: Buffer, ext: string): Promise<GeneratedAsset> {
	const { rel, replaced } = await persistAsset(assetIo(dir), spec, bytes, ext);
	return { kind: spec.kind, path: rel, absPath: join(dir, rel), replaced };
}

/** 抠底前原片留一份：重抠时从 `media-cache/sprite-sources/<主体>/` 取原图。 */
export async function keepSource(dir: string, spec: AssetSpec, data: Buffer, ext: string): Promise<void> {
	await keepSpriteSource(dir, spec, data, ext);
}

/**
 * 素材写口：包只按 `list / write / remove` 三步编排落位，权限与原子写落在这里。
 *
 * 插件的 `assets/` 没有服务端那层白名单（引擎自己写，不接 agent 的路径），
 * 但**原子写**必须有：同批里两张图写同一个 stem 时，留下完整的那个而不是半张。
 */
export function assetIo(dir: string): AssetIo {
	return {
		list: (kindPath) => readdir(join(dir, 'assets', kindPath)).catch(() => [] as string[]),
		write: async (rel, data) => {
			await mkdir(dirname(join(dir, rel)), { recursive: true });
			await writeAtomic(join(dir, rel), data);
		},
		remove: (rel) => rm(join(dir, rel), { force: true }),
	};
}

/** 素材表里的呈现声明：立绘级（framing/stature/title）+ 差分级的画幅覆盖。 */
export async function declareSprite(dir: string, spec: AssetSpec): Promise<void> {
	await withManifest(dir, (current) => declareSpriteIn(current, spec));
}

/** 素材表里的一句话画面描述：剧作家挑素材全靠它。立绘落到 `<主体>/<差分>` 键上。 */
export async function declareDescription(dir: string, spec: AssetSpec, description: string): Promise<void> {
	await withManifest(dir, (current) => declareDescriptionIn(current, spec, description));
}

/** BGM 的素材表来源标记（曲子没有立绘那套呈现声明，只记一条「哪来的」）。 */
export async function declareBgmSource(dir: string, stem: string): Promise<void> {
	await withManifest(dir, (current) => declareBgmIn(current, stem));
}

/** 台账：这张图当初用什么描述出的（`assets/generated.json`，只增条目不覆盖别人的键）。 */
export async function recordPrompt(dir: string, spec: AssetSpec, path: string, prompt: string): Promise<void> {
	await recordLedger(dir, ledgerEntryOf(spec, path, prompt, new Date().toISOString()));
}

/** 台账写一条（BGM 也走它，`kind` 换 `bgm`）。 */
export async function recordLedger(dir: string, entry: LedgerEntry): Promise<void> {
	const file = join(dir, 'assets', 'generated.json');
	await writeJsonLocked(
		file,
		() => readJson(file, {} as Record<string, LedgerEntry>),
		(table) => ({ ...table, [entry.id]: entry }),
	);
}

/**
 * 素材表的读-改-写，整段串行（锁按文件路径挂在模块级，见 `storage.ts` 的 `withFileLock`）。
 *
 * 锁内只做「读盘 → 合并 → 原子替换」，不与出图/抠底那些秒级操作共享临界区。
 */
export function withManifest(
	dir: string,
	mutate: (current: AssetManifest) => AssetManifest,
): Promise<void> {
	return writeJsonLocked(join(dir, 'assets', 'manifest.json'), () => readManifest(dir), mutate);
}
