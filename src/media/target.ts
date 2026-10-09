/**
 * 目标解析：把「要一张什么图」解析成落盘规格（目录、文件名主体、画幅、垫图基准），
 * 并把垫图三态（主体 id / 剧目内路径 / 网址）取成字节。
 *
 * 这是所有出图 use case 的**入口**：`draft` / `generate` / `ensureNeutral` 都先过 `resolve`，
 * 落位的身份基准确认下来之后，各 use case 才决定要不要出图、要不要抠底、要不要入库。
 */
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import {
	DEFAULT_SPRITE_FRAMING,
	DEFAULT_SPRITE_STATURE,
	framingOf,
	isSpriteFraming,
	isSpriteStature,
	statureOf,
	SPRITE_FRAMING_ASPECT,
	type SpriteFraming,
	type SpriteStature,
} from '@aivn/core';
import { characterNames, readManifest, resolveInPlay } from '../play/assets';
import { KEY_BACKGROUND_COLORS, isKeyBackgroundColor } from './prompts';
import { sniffImageMime } from './image';
import type { AssetSpec, AssetTarget, KeyBackgroundColor, ResolvedReference } from './types';
import { fetchWebImage } from './web-image';

/** 立绘的身份基准差分名：其它差分的垫图恒为它。 */
export const NEUTRAL = 'neutral';
/** 素材 id / 差分名的白名单：字母数字开头，中文照收，不含路径分隔符。 */
const STEM_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;
/** 图片文件：立绘目录里数差分时只认它。 */
const IMAGE_FILE = /\.(png|jpe?g|webp)$/i;
/** 垫图张数上限（Gemini 3 系上限 14，这里按产品口径收到 6）。 */
export const MAX_REFERENCES = 6;

/** 素材 id / 差分名的白名单（也就是文件名主体）：挡路径分隔符与前导点。 */
export function assertStem(value: string, label: string): string {
	const stem = value.trim();
	if (!STEM_PATTERN.test(stem)) {
		throw new Error(`${label}「${value}」不合法：字母或数字开头，可含中文与 . _ -，不含路径分隔符`);
	}
	return stem;
}

/** 当场解析「要一张什么图」成落盘规格（目录、文件名主体、画幅、垫图基准）。 */
export async function resolve(dir: string, target: AssetTarget): Promise<AssetSpec> {
	if (target.kind === 'sprite') {
		const spriteId = target.spriteId?.trim() ?? '';
		if (spriteId === '') throw new Error('立绘要 spriteId（主体 id，就是 assets/sprites/<id>/ 的目录名）');
		const stem = assertStem(spriteId, '主体 id');
		const variant = target.variant?.trim() || NEUTRAL;
		const manifest = readManifest(dir);
		const level = manifest[stem] ?? {};
		// 差分级声明盖过立绘级：一套里另有一条 closeup 时要认它，否则那条覆盖键白写。
		const declared = { ...level, ...manifest[`${stem}/${variant}`] };
		const framing = pickFraming(target.framing, declared.framing, `${stem} 的立绘取景`);
		const stature = pickStature(target.stature, declared.stature, `${stem} 的立绘体量`);
		const keyColor = pickKeyColor(target.keyColor, `${stem} 的色键底色`);
		return {
			kind: 'sprite',
			kindPath: `sprites/${stem}`,
			stem: assertStem(variant, '差分名'),
			aspect: SPRITE_FRAMING_ASPECT[framing] as AssetSpec['aspect'],
			spriteId: stem,
			variant,
			framing,
			baseFraming: framingOf(level.framing) ?? DEFAULT_SPRITE_FRAMING,
			stature,
			...(keyColor ? { keyColor } : {}),
			...(target.title?.trim() ? { title: target.title.trim() } : {}),
		};
	}
	const name = target.name?.trim() ?? '';
	if (name === '') throw new Error('背景与插图要 name（素材 id，也就是文件名主体）');
	return {
		kind: target.kind,
		kindPath: target.kind === 'background' ? 'backgrounds' : 'cg',
		stem: assertStem(name, '素材 id'),
		aspect: '16:9',
	};
}

/**
 * 解析垫图，每一项可以是三态：
 *
 * 1. **主体 id**（`lin` / `mecha`）——有立绘就垫，不要求有角色卡；顺带把它的**显示名**带上
 *    （角色卡的 `name`，没有卡就用素材表标题，再没有就用 id 本身），提示词里的编号锚点要用；
 * 2. **剧目内相对路径**（`assets/backgrounds/ref.png`）——没有名字；
 * 3. **http(s) 网址**——现下到内存里（不落盘：它只是这一次出图的输入），同样没有名字。
 *
 * 立绘的基准是**隐式**的：非 neutral 的差分一律拿已入库的 neutral 垫图（身份的唯一来源），
 * 显式 references 在 `draft` 里已被拒。
 */
export async function references(dir: string, spec: AssetSpec, explicit: string[] | undefined): Promise<ResolvedReference[]> {
	const wanted = [...(explicit ?? [])];
	if (spec.kind === 'sprite' && spec.variant !== NEUTRAL) wanted.unshift(spec.spriteId!);
	return resolveReferences(dir, wanted);
}

/** 通用出图的垫图：只认显式给的（路径 / 网址 / 主体 id），不吃「差分自动垫 neutral」。 */
export function referencesGeneric(dir: string, explicit: string[] | undefined): Promise<ResolvedReference[]> {
	return resolveReferences(dir, [...(explicit ?? [])]);
}

async function resolveReferences(dir: string, wanted: string[]): Promise<ResolvedReference[]> {
	if (wanted.length > MAX_REFERENCES) {
		throw new Error(`垫图最多 ${MAX_REFERENCES} 张，这次给了 ${wanted.length} 张`);
	}
	const names = characterNames(dir);
	const manifest = readManifest(dir);
	const out: ResolvedReference[] = [];
	for (const ref of wanted) {
		if (/^https?:\/\//i.test(ref)) {
			out.push({ ...(await fetchWebImage(ref)), name: null });
			continue;
		}
		if (/[/.]/.test(ref)) {
			// 路径一律过剧目内解析：`../` 与绝对路径直接拒（垫图会把文件内容发给生图后端，
			// 这是一条**读**出工作区的口子，不能用裸 join）。
			const abs = resolveInPlay(dir, ref);
			if (!abs) throw new Error(`垫图路径越界：${ref}（只能给剧目内的相对路径或 http(s) 网址）`);
			if (!existsSync(abs)) throw new Error(`垫图找不到：${ref}（剧目里没有这个文件）`);
			out.push({ mimeType: mimeOf(abs), data: await readFile(abs), name: null });
			continue;
		}
		const abs = resolveInPlay(dir, await neutralOf(dir, ref));
		if (!abs) throw new Error(`垫图路径越界：${ref}`);
		out.push({
			mimeType: mimeOf(abs),
			data: await readFile(abs),
			name: names.get(ref) ?? manifest[ref]?.title ?? ref,
		});
	}
	return out;
}

/** 某个主体已入库的 neutral 立绘（剧目内相对路径）。 */
async function neutralOf(dir: string, spriteId: string): Promise<string> {
	const stem = assertStem(spriteId, '主体 id');
	const spriteDir = join(dir, 'assets', 'sprites', stem);
	if (!existsSync(spriteDir)) throw new Error(`垫图找不到：${stem} 还没有立绘目录（assets/sprites/${stem}/）`);
	const hit = (await readdir(spriteDir)).find((file) => file.replace(/\.\w+$/, '') === NEUTRAL);
	if (!hit) throw new Error(`垫图找不到：${stem} 还没有入库的 ${NEUTRAL} 定妆照`);
	return join('assets', 'sprites', stem, hit);
}

/** 草稿里要记下的那点「身份」（入库时按它落位）。 */
export function intentOf(spec: AssetSpec): Partial<AssetSpec> & { name?: string } {	if (spec.kind === 'sprite') {
		return {
			spriteId: spec.spriteId,
			variant: spec.variant,
			...(spec.framing ? { framing: spec.framing } : {}),
			...(spec.stature ? { stature: spec.stature } : {}),
			...(spec.title ? { title: spec.title } : {}),
		};
	}
	return { name: spec.stem };
}

/** 某主体立绘目录里已有的差分名（用来判「一个差分都没有」）。 */
export async function spriteStems(dir: string, spriteId: string): Promise<string[]> {
	const dirPath = join(dir, 'assets', 'sprites', spriteId);
	if (!existsSync(dirPath)) return [];
	return (await readdir(dirPath))
		.filter((file) => IMAGE_FILE.test(file))
		.map((file) => file.replace(/\.\w+$/, ''))
		.sort((a, b) => a.localeCompare(b));
}

/**
 * 这个落位（`assets/<kindPath>` 里同名主体）已经有素材了吗。
 *
 * 出图前的守卫（`generate_asset` 不重出）与入库时的覆盖判定（`replaced`）都问它，
 * 所以它住在「认识落位」的这一层，而不是写侧。
 */
export async function existingAsset(dir: string, kindPath: string, stem: string): Promise<boolean> {
	const kindDir = join(dir, 'assets', kindPath);
	if (!existsSync(kindDir)) return false;
	return (await readdir(kindDir)).some((file) => file.replace(/\.\w+$/, '') === stem);
}

function pickFraming(value: unknown, declared: unknown, label: string): SpriteFraming {
	if (value !== undefined && !isSpriteFraming(value)) throw new Error(`${label}「${String(value)}」非法`);
	const fromDeclared = framingOf(declared);
	return (value as SpriteFraming | undefined) ?? fromDeclared ?? DEFAULT_SPRITE_FRAMING;
}

function pickStature(value: unknown, declared: unknown, label: string): SpriteStature {
	if (value !== undefined && !isSpriteStature(value)) throw new Error(`${label}「${String(value)}」非法`);
	const fromDeclared = statureOf(declared);
	return (value as SpriteStature | undefined) ?? fromDeclared ?? DEFAULT_SPRITE_STATURE;
}

/** 色键底色没有素材表声明这一层（它只影响这一次出图的排版）：不给就是不指定，由 `prompts.ts` 取默认纯绿。 */
function pickKeyColor(value: unknown, label: string): KeyBackgroundColor | undefined {
	if (value === undefined) return undefined;
	if (!isKeyBackgroundColor(value)) {
		throw new Error(`${label}「${String(value)}」非法：只有 ${KEY_BACKGROUND_COLORS.join(' / ')}`);
	}
	return value;
}

function mimeOf(path: string): string {
	const ext = extname(path).toLowerCase();
	if (ext === '.png') return 'image/png';
	if (ext === '.webp') return 'image/webp';
	if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
	return 'application/octet-stream';
}

/** 从字节头部认 mime（落盘扩展名用；后端给的 mimeType 可能缺失，认不出就当 JPEG）。 */
export function mimeOfBuffer(data: Buffer): string {
	return sniffImageMime(data) ?? 'image/jpeg';
}
