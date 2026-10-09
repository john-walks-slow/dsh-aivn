/**
 * `generate_bgm` 的 use case：生成一首 BGM 并落库（`assets/bgm/<name>.m4a` + 素材表一条 + 台账一条）。
 *
 * **同步等待**（一首 ~175s 的曲子实测 84s）：独立版靠到货广播让人不必干等，插件没有「回合之外」
 * 的注入通道，同步等待至少保证回执说的是真话。这是本插件有意保留的宿主差异（plan 的
 * 「减少无意分歧」而非消灭分歧）。
 */
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { requireMusicBackend } from './backends';
import { declareBgmSource, recordLedger } from './catalog';
import { writeAtomic } from './storage';
import { assertStem } from './target';
import type { GeneratedAsset, PlayAssetsOptions } from './types';

/** 生成一首 BGM 并落库，返回入库回执（含覆盖判定）。 */
export async function generateBgm(
	opts: PlayAssetsOptions,
	name: string,
	prompt: string,
	meta: { model?: string } = {},
): Promise<GeneratedAsset> {
	const dir = opts.dir;
	const backend = requireMusicBackend(opts);
	const stem = assertStem(name, '音乐 id');
	const music = await backend.generate({ prompt, ...(meta.model ? { model: meta.model } : {}) });
	const kindPath = 'bgm';
	const relDir = join('assets', kindPath);
	await mkdir(join(dir, relDir), { recursive: true });
	const file = `${stem}${music.ext}`;
	const abs = join(dir, relDir, file);
	const replaced = existsSync(abs);
	// 原子落盘：同批里两次出同一 id 的曲子时，留下完整的一首，而不是两份音频交错。
	await writeAtomic(abs, music.bytes);
	const path = `${kindPath}/${file}`;
	await declareBgmSource(dir, stem);
	await recordLedger(dir, {
		id: stem,
		kind: 'bgm',
		path: `assets/${path}`,
		prompt,
		at: new Date().toISOString(),
	});
	return { kind: 'bgm', path: `assets/${path}`, absPath: abs, replaced };
}
