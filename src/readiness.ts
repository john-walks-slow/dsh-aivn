/**
 * 剧目自查：这座剧目**读不读得出来**、还缺什么。
 *
 * 判据逐条搬自 AIVN `apps/server/src/store.ts` 的 `readiness()` 与
 * `agentkit/readiness.ts` 的 `renderReadiness`，只按 DSH 侧的事实改了两处：
 *   - 没有周目（saves）这一层，也不报它；
 *   - 素材靠手工放置（阶段 2 之前没有生图），所以多报一行「素材清单有几条」。
 *
 * **没有硬门槛**：缺什么都能开演。这份报告是给搭台助手与剧作家自己看的底数，不是闸门。
 *
 * `play.json` 在但读不出来时**不抛**，把那句原因报出来（`problem`）：剧目文件是模型自己写的，
 * 「哪一行写坏了」必须回到它手上，而不是变成一个把整轮打断的异常。
 *
 * 读盘是同步的：系统提示词的段 provider 同步求值（见 `stagehand/context.ts`），
 * 工具与注入必须共用同一份判据——异步版只能给工具用，两版就会漂。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { listAssets } from './assets';
import { CRAFT_ENUMS } from './craft';
import { PLAY_FILE, loadPlaySync } from './play';

const IMAGE = /\.(png|jpe?g|webp)$/i;

export interface PlayReadiness {
	/** `play.json` 在且能解析——不在或读不出来都不是一座能演的剧目。 */
	play: boolean;
	/** 在但读不出来时的原因（引擎报的那句话）；读得出来或压根不在时为 undefined。 */
	problem?: string;
	/** `craft` 段里引擎不认的取值（会被静默当没写）；空数组 = 都认。 */
	strayCraft: string[];
	/** `memory/always/state/state.json` 读不出来或值不合规时的原因；没问题时为 undefined。 */
	stateProblem?: string;
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
	let play = false;
	let problem: string | undefined;
	try {
		play = loadPlaySync(dir) !== null;
	} catch (error) {
		problem = error instanceof Error ? error.message : String(error);
	}
	const index = listAssets(dir);
	const stateProblem = readStateProblem(dir);

	return {
		play,
		...(problem === undefined ? {} : { problem }),
		strayCraft: strayCraftValues(dir),
		...(stateProblem === undefined ? {} : { stateProblem }),
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
		`- 剧目：${r.play ? '✓' : r.problem ? `✗ 读不出来——${r.problem}` : '缺（play.json）——会话工作目录里没有它，这还不是一座剧目'}`,
		`- 故事前提：${r.premise ? '✓' : '缺（memory/always/premise.md）——不写也行，剧作家会自由发挥'}`,
		`- 角色卡：${r.characters > 0 ? `${r.characters} 张` : '缺（characters/<id>.md）'}——没有卡的角色只能用 <say name> 出声`,
		`- 立绘：${r.sprites ? '✓' : '缺（assets/sprites/<主体id>/）——没有立绘的主体不上台，改用旁白交代'}`,
		`- 背景图：${r.background ? '✓' : '缺（assets/backgrounds/）——没有背景就落氛围底色，照样能演'}`,
		`- 素材清单：${r.assets > 0 ? `${r.assets} 个文件` : '空'}——现在没有生图，素材要放进 assets/`,
		r.strayCraft.length > 0 ? `- 写作参数：这些取值引擎不认、会被当没写——${r.strayCraft.join('；')}` : null,
		r.stateProblem ? `- 世界状态：${r.stateProblem}` : null,
	]
		.filter(Boolean)
		.join('\n');
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

/**
 * `craft` 段里引擎不认的取值。
 *
 * 白名单外的值会被 `parsePlayConfig` **静默当没写**——以前这条路由 `set_craft` 的参数枚举挡着，
 * 现在参数是模型用 edit 写进去的，只能在这里报出来。
 */
function strayCraftValues(dir: string): string[] {
	const raw = readText(join(dir, PLAY_FILE));
	if (!raw) return [];
	let craft: unknown;
	try {
		craft = (JSON.parse(raw) as { craft?: unknown }).craft;
	} catch {
		return []; // 文件坏掉由 `problem` 那一行说，这里不重复报
	}
	if (typeof craft !== 'object' || craft === null) return [];

	const root = craft as Record<string, unknown>;
	const assets = (typeof root.assets === 'object' && root.assets !== null ? root.assets : {}) as Record<string, unknown>;
	const slots: Array<[string, unknown, readonly string[]]> = [
		['beatLength', root.beatLength, CRAFT_ENUMS.beatLength],
		['stopOptions', root.stopOptions, CRAFT_ENUMS.stopOptions],
		['assets.background', assets.background, CRAFT_ENUMS.background],
		['assets.cg', assets.cg, CRAFT_ENUMS.cg],
		['assets.sprite', assets.sprite, CRAFT_ENUMS.sprite],
		['assets.audio', assets.audio, CRAFT_ENUMS.audio],
	];
	return slots
		.filter(([, value, allowed]) => value !== undefined && value !== null && !allowed.includes(String(value)))
		.map(([path, value, allowed]) => `craft.${path} = ${JSON.stringify(value)}（只认 ${allowed.join(' / ')}）`);
}

/**
 * 状态文件的问题：`state.json` 不是 JSON、或好感度不是 0~100 的整数。
 *
 * 状态文件由剧作家自己写（`update_state` 删掉之后），注入的【状态】区会照读、坏的那几行悄悄少掉——
 * 所以这里替它说出来。单次变化幅度（|Δ|≤5）没法从一份文件里看出来，那条只能靠提示词。
 */
function readStateProblem(dir: string): string | undefined {
	const raw = readText(join(dir, 'memory', 'always', 'state', 'state.json'));
	if (raw.trim() === '') return undefined;
	let affinity: Record<string, unknown>;
	try {
		affinity = (JSON.parse(raw) as { affinity?: Record<string, unknown> }).affinity ?? {};
	} catch (error) {
		return `state.json 不是合法 JSON（${error instanceof Error ? error.message : String(error)}）——【状态】区会少几行`;
	}
	const bad = Object.entries(affinity).filter(
		([, value]) => !Number.isInteger(value) || (value as number) < 0 || (value as number) > 100,
	);
	if (bad.length === 0) return undefined;
	return `好感度只认 0~100 的整数，这几个不是：${bad.map(([id, value]) => `${id}=${JSON.stringify(value)}`).join('、')}`;
}
