/**
 * 素材标注的落盘面：找那份素材 → 把元数据补丁并进 `assets/manifest.json`。
 *
 * 元数据写口只有一个（包里的 `declareMeta`），与登记 / 一键生成那条路共用；这里只负责
 * 「这个主体对应哪份文件」和加锁。素材必须真的在——写一条指向空气的元数据，素材页与剧作家
 * 都会照着它找不存在的文件。
 */
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import {
	assetMetaKey,
	declareMeta,
	existingAssetName,
	type AssetMetaPatch,
	type AssetSubject,
} from '@aivn/agent';
import { withManifest } from './catalog';

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
const AUDIO_EXTS = ['.m4a', '.mp3', '.ogg', '.wav', '.opus'];

/** 主体 → 剧目内相对路径。找不到返回 null。 */
async function locate(dir: string, subject: AssetSubject): Promise<{ key: string; path: string } | null> {
	const rel =
		subject.kind === 'sprite'
			? join('assets', 'sprites', subject.spriteId!)
			: subject.kind === 'bgm'
				? join('assets', 'bgm')
				: join('assets', subject.kind === 'cg' ? 'cg' : 'backgrounds');
	const abs = join(dir, rel);
	if (!existsSync(abs)) return null;
	const stem = subject.kind === 'sprite' ? (subject.variant ?? 'neutral') : subject.name!;
	const entries = await readdir(abs);
	// 音频没有「换扩展名」之外的形态（曲子按 stem 认，扩展名由上游 mime 决定）
	const file =
		subject.kind === 'bgm'
			? entries.find((name) => name.replace(/\.\w+$/, '') === stem && AUDIO_EXTS.includes(name.slice(name.lastIndexOf('.'))))
			: existingAssetName(
					entries.filter((name) => IMAGE_EXTS.includes(name.slice(name.lastIndexOf('.')).toLowerCase())),
					stem,
				);
	if (!file) return null;
	return {
		key: assetMetaKey(stem, subject.kind === 'sprite' ? { spriteId: subject.spriteId, variant: stem } : undefined),
		path: `${rel.split('\\').join('/')}/${file}`,
	};
}

/** 标注：素材不存在就抛错（回执由能力层统一渲染）。 */
export async function annotateAsset(
	dir: string,
	subject: AssetSubject,
	patch: AssetMetaPatch,
): Promise<{ path: string }> {
	const found = await locate(dir, subject);
	if (!found) {
		const what = subject.kind === 'sprite' ? `${subject.spriteId}/${subject.variant ?? 'neutral'}` : subject.name;
		throw new Error(`剧目里没有这份素材：${what}（先出图 / 出曲或导入，再标注）`);
	}
	await withManifest(dir, (current) => declareMeta(current, found.key, patch));
	return { path: found.path };
}
