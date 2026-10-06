/**
 * 开演条件自查：这座剧目还缺什么。
 *
 * 判据逐条搬自 AIVN `apps/server/src/store.ts` 的 `readiness()` 与
 * `agentkit/readiness.ts` 的 `renderReadiness`，只按 DSH 侧的事实改了两处：
 *   - 没有周目（saves）这一层，也不报它；
 *   - 素材靠手工放置（阶段 2 之前没有生图），所以多报一行「素材清单有几条」。
 *
 * **没有硬门槛**：缺什么都能开演。这份报告是给搭台助手与剧作家自己看的底数，不是闸门。
 *
 * 读盘是同步的：系统提示词的段 provider 同步求值（见 `stagehand/context.ts`），
 * 工具与注入必须共用同一份判据——异步版只能给工具用，两版就会漂。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { listAssets } from './assets';
import { loadPlaySync } from './play';

const IMAGE = /\.(png|jpe?g|webp)$/i;

export interface PlayReadiness {
	/** `play.json` 在且能解析——不在就不是一座剧目。 */
	play: boolean;
	/** `memory/always/premise.md` 有内容（世界观前提的唯一真相源）。 */
	premise: boolean;
	/** `characters/*.md` 的张数。 */
	characters: number;
	/** ≥1 个立绘目录（`assets/sprites/<主体id>/`）里有图。 */
	sprites: boolean;
	/** ≥1 背景图。 */
	background: boolean;
	/** 素材清单条目数（背景/插图/立绘/音乐/音效全算）。 */
	assets: number;
}

export function readPlayReadiness(dir: string): PlayReadiness {
	const play = loadPlaySync(dir);
	const index = listAssets(dir);

	return {
		play: play !== null,
		premise: readText(join(dir, 'memory', 'always', 'premise.md')).trim() !== '',
		characters: countCharacters(dir),
		sprites: hasAnySprite(join(dir, 'assets', 'sprites')),
		background: hasAnyImage(join(dir, 'assets', 'backgrounds')),
		assets: Object.values(index).reduce((total, files) => total + files.length, 0),
	};
}

/** 开演条件渲染（工具回执与注入段共用一份，同一句话不许有两个版本）。 */
export function renderReadiness(r: PlayReadiness): string {
	return [
		'开演条件：没有硬门槛，缺什么都能开演。',
		`- 剧目：${r.play ? '✓' : '缺（play.json）——会话工作目录里没有它，这还不是一座剧目'}`,
		`- 故事前提：${r.premise ? '✓' : '缺（memory/always/premise.md）——不写也行，剧作家会自由发挥'}`,
		`- 角色卡：${r.characters > 0 ? `${r.characters} 张` : '缺（characters/<id>.md）'}——没有卡的角色只能用 <say name> 出声`,
		`- 立绘：${r.sprites ? '✓' : '缺（assets/sprites/<主体id>/）——没有立绘的主体不上台，改用旁白交代'}`,
		`- 背景图：${r.background ? '✓' : '缺（assets/backgrounds/）——没有背景就落氛围底色，照样能演'}`,
		`- 素材清单：${r.assets > 0 ? `${r.assets} 个文件` : '空'}——现在没有生图，素材要放进 assets/`,
	].join('\n');
}

/** 立绘目录里有没有图：每个主体一个目录，任一目录里有一张就算齐备。 */
function hasAnySprite(root: string): boolean {
	if (!existsSync(root)) return false;
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		if (entry.isDirectory() && hasAnyImage(join(root, entry.name))) return true;
	}
	return false;
}

function hasAnyImage(dir: string): boolean {
	if (!existsSync(dir)) return false;
	return readdirSync(dir).some((name) => IMAGE.test(name));
}

/** 角色卡张数：`characters/*.md`。角色目录不在就不是错误，是「还没有角色」。 */
function countCharacters(dir: string): number {
	const root = join(dir, 'characters');
	if (!existsSync(root)) return 0;
	return readdirSync(root).filter((name) => name.endsWith('.md')).length;
}

function readText(path: string): string {
	try {
		return readFileSync(path, 'utf8');
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return '';
		throw error;
	}
}
