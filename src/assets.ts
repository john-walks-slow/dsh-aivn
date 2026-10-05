/**
 * 剧目素材表：读目录，给出「有哪些素材、各自什么来头」。
 *
 * 读盘是**同步**的：系统提示词的段 provider 是同步求值的（见 `play-context.ts`），
 * 那边每轮都要用这张表。这些是本机几十字节到几 KB 的小文件，同步读一次的代价远小于
 * 为此维护第二份实现（素材表的拆分口径漂了，舞台与剧作家看到的素材就不一致了）。
 *
 * 形状与 AIVN 一致（`apps/server/src/store.ts` 的 `listAssets`）：键是素材类别，
 * 立绘按主体拆成 `sprites/<id>`；值是该类别下的文件名。素材描述来自
 * `assets/manifest.json`——剧作家认 id 认不出画面，靠的就是这份描述。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import type { AssetMeta } from '@aivn/core';

/** 图片与音频扩展名白名单：与素材表的过滤口径一致。 */
const MEDIA = /\.(png|jpe?g|webp|mp3|ogg|wav|m4a)$/i;

const CONTENT_TYPES: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.mp3': 'audio/mpeg',
	'.ogg': 'audio/ogg',
	'.wav': 'audio/wav',
	'.m4a': 'audio/mp4',
	'.json': 'application/json; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8',
};

export type AssetIndex = Record<string, string[]>;

/** 剧目里现有的素材：`{backgrounds: [...], 'sprites/alice': [...]}`。 */
export function listAssets(dir: string): AssetIndex {
	const root = join(dir, 'assets');
	const index: AssetIndex = {};
	if (!existsSync(root)) return index;

	for (const kind of ['backgrounds', 'cg', 'sprites', 'sfx', 'bgm']) {
		const kindDir = join(root, kind);
		if (!existsSync(kindDir)) continue;

		if (kind === 'sprites') {
			for (const entry of readdirSync(kindDir, { withFileTypes: true })) {
				if (!entry.isDirectory()) continue;
				const files = readdirSync(join(kindDir, entry.name)).filter((name) => MEDIA.test(name));
				// 排序：引擎在找不到指定差分时取第一个兜底，顺序不定会让兜底每次挑到不同的脸。
				index[`sprites/${entry.name}`] = files.sort((a, b) => a.localeCompare(b));
			}
		} else {
			// 同样排序：素材清单要稳定，剧作家两次读到的顺序不该变。
			index[kind] = readdirSync(kindDir)
				.filter((name) => MEDIA.test(name))
				.sort((a, b) => a.localeCompare(b));
		}
	}
	return index;
}

/**
 * 素材描述表 `assets/manifest.json`；没有就是空的（不是错误）。
 *
 * 读与解析分成两段：合在一处时 ENOENT 与「JSON 坏了」共用一个 catch，后者会被
 * 原样抛成一句没有文件名的解析错误。坏掉时给一句能读的，用户才知道去修哪个文件。
 */
export function readManifest(dir: string): Record<string, AssetMeta> {
	const path = join(dir, 'assets', 'manifest.json');
	let raw: string;
	try {
		raw = readFileSync(path, 'utf8');
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
		throw error;
	}
	try {
		return JSON.parse(raw) as Record<string, AssetMeta>;
	} catch (error) {
		const why = error instanceof Error ? error.message : String(error);
		throw new Error(`${path} 不是合法 JSON：${why}`);
	}
}

/**
 * 把一个剧目内的相对路径解析成绝对路径，越界（`../`、绝对路径）返回 null。
 * 素材路由直接对着文件系统，这里是唯一的防线。
 */
export function resolveInPlay(dir: string, relative: string): string | null {
	const root = resolve(dir);
	const target = resolve(root, normalize(relative));
	if (target !== root && !target.startsWith(root + sep)) return null;
	return target;
}

/** 扩展名 → MIME。认不出来就当二进制流。 */
export function contentTypeOf(path: string): string {
	return CONTENT_TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream';
}
