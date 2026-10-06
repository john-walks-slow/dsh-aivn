/**
 * 写作参数：`play.json` 的 `craft` 段（每轮篇幅、停止点选项数、素材来源）。
 *
 * 逐行搬自 AIVN `apps/server/src/craftParams.ts`，只去掉那边对能力位与工坊侧的依赖：
 * 这里只需要「怎么渲染给剧作家看」与「补丁怎么合并」两件事。
 *
 * 能力位（`AssetCapabilities`）照旧参与渲染：生图位跟着配置走、库位恒假，
 * 于是四类素材来源的措辞自动落成「出图 / 用剧目里已有的 / 用旁白交代」——不会教模型去调
 * 一个不存在的工具，也不会在没配生图时谈出图。
 */
import {
	CRAFT_AUDIO_SOURCES,
	CRAFT_BACKGROUND_SOURCES,
	CRAFT_BEAT_LENGTHS,
	CRAFT_CG_SOURCES,
	CRAFT_SPRITE_SOURCES,
	CRAFT_STOP_OPTIONS,
	resolveCraft,
	type CraftAudioSource,
	type CraftBackgroundSource,
	type CraftBeatLength,
	type CraftCgSource,
	type CraftSpriteSource,
	type CraftStopOptions,
	type EffectiveCraft,
} from '@aivn/core';

export { resolveCraft };

/** 这两项能力位决定素材来源怎么写——没有生图就不能说「自己出图」。 */
export interface AssetCapabilities {
	image: boolean;
	library: boolean;
}

/**
 * 按搭台助手的能力面算素材位：`image` 跟着配置走，`library` 恒假（应用级素材库永久不做），
 * 于是四类素材来源里带库的那几支措辞永远走不到，生图那几支跟着真实后端开关。
 */
export function assetCapabilitiesOf(can: { image: boolean }): AssetCapabilities {
	return { image: can.image, library: false };
}

/** 篇幅的措辞：给剧作家的是「写多长」。 */
const BEAT_LENGTH_LABEL: Record<CraftBeatLength, string> = {
	short: '短',
	medium: '中等',
	long: '长',
};

const BEAT_LENGTH_DIRECTIVE: Record<CraftBeatLength, string> = {
	short: '一轮 3~6 句台词/旁白，一个来回或一次行动就收，别铺新场景。',
	medium: '一轮 8~15 句台词/旁白，演完一小段对话或一次行动就收。',
	long: '一轮 20~30 句台词/旁白，可以演完一整场戏，允许换场景。',
};

/**
 * 停止点的措辞。
 *
 * 「**有**停止点时给几条」而不是「每次给几条」：什么时候交还主导权归剧作家自己判断（那是创作口径），
 * 这一条只定「给了就是几条」。写成「每次给」会让它每轮都硬塞一组选项，narrative 再也收不了尾。
 */
const STOP_OPTIONS_DIRECTIVE: Record<CraftStopOptions, string> = {
	two: '有停止点时给 2 条互斥选项：<stop options="… | …"/>。',
	three: '有停止点时给 3 条互斥选项：<stop options="… | … | …"/>。',
	four: '有停止点时给 4 条互斥选项：<stop options="… | … | … | …"/>。',
	free: '固定停在自由输入框：<stop placeholder="…"/>，不给 options。',
};

/**
 * 剧作家提示词里的「写作参数」段。
 *
 * **永远注入**（包括全默认值时）：缺省口径也得说出来，否则模型面对的是「没人告诉它一轮写多长」——
 * 而它每一轮都在做这个决定，做出来的东西和用户以为的默认值对不上时，用户改哪个开关都没用。
 */
export function renderCraftParams(craft: EffectiveCraft, can: AssetCapabilities): string {
	const { assets } = craft;
	const lines = [
		`- 一轮篇幅：${BEAT_LENGTH_LABEL[craft.beatLength]}——${BEAT_LENGTH_DIRECTIVE[craft.beatLength]}`,
		`- 停止点：${STOP_OPTIONS_DIRECTIVE[craft.stopOptions]}`,
		'- 素材来源：',
		`  - 背景：${backgroundDirective(assets.background, can)}`,
		`  - 插图（cg）：${cgDirective(assets.cg, can)}`,
		`  - 立绘：${spriteDirective(assets.sprite, can)}`,
		`  - 音乐与音效：${audioDirective(assets.audio, can)}`,
	];
	return `\n# 写作参数（本剧目设定，照它写）\n\n${lines.join('\n')}\n`;
}

/**
 * 没有生图能力时，「出图」这条路说不了——换成它真能做到的那件事。
 *
 * 「素材清单」是剧目自己的 `assets/`，「素材资源库」是应用级的 `library/`：没配库时不能指向它，
 * 否则等于教模型去找一个不存在的东西。
 */
function noImage(kind: 'background' | 'cg' | 'sprite', can: AssetCapabilities): string {
	// 立绘差分依附角色卡，库里没有「单张差分」这种东西——只能劝它别出新差分
	if (kind === 'sprite') {
		return '本剧目没开生图：不要给角色出新立绘差分，角色已有的差分照常用；缺立绘就用旁白交代。';
	}
	const what = kind === 'background' ? '背景' : '插图';
	const pool = can.library ? '素材资源库里现成的' : '素材清单里已有的';
	return `本剧目没开生图：需要新${what}时用${pool}，或换一段能演的戏、用旁白交代。`;
}

/** 素材来源那四行的措辞。 */
function backgroundDirective(source: CraftBackgroundSource, can: AssetCapabilities): string {
	if (!can.image) return noImage('background', can);
	switch (source) {
		case 'library-first':
			return can.library
				? '优先用素材资源库里现成的；库里没有合适的再 generate_image 出一张。'
				: '直接 generate_image 出（本剧目没配素材资源库）。';
		case 'library':
			return can.library
				? '只用素材资源库里现成的；缺了就换一处能演的场景，不要出图。'
				: '本剧目没配素材资源库：多用旁白交代场景，不要出图。';
		case 'generate':
			return '自己 generate_image 出，不用去库里找。';
	}
}

function cgDirective(source: CraftCgSource, can: AssetCapabilities): string {
	if (source === 'off') return '不要写 <cg>——本剧目不出插图，要停顿就写旁白或收束本轮。';
	if (!can.image) return noImage('cg', can);
	switch (source) {
		case 'library':
			return can.library
				? '优先用素材资源库里现成的插图；没有就改用旁白交代，不要出图。'
				: '本剧目没配素材资源库：不要写 <cg>，用旁白交代。';
		case 'generate':
			return '自己 generate_image 出。';
		default:
			return '';
	}
}

function spriteDirective(source: CraftSpriteSource, can: AssetCapabilities): string {
	if (source === 'off') return '不要给角色出立绘；角色已有的差分照常用。';
	if (!can.image) return noImage('sprite', can);
	return '自己 generate_image（kind="sprite"）出。';
}

function audioDirective(source: CraftAudioSource, can: AssetCapabilities): string {
	if (source === 'off') return '不要写 bgm/ambient/sfx——本剧目不用音乐音效。';
	return can.library
		? '只用素材资源库里现成的 bgm/sfx。'
		: '只用素材清单里已有的 bgm/sfx；没有合适的宁可不给。';
}

/** core 的取值白名单：`validate_play` 拿它报「写了但引擎不认」的 craft 值，别在别处再抄一份。 */
export const CRAFT_ENUMS = {
	beatLength: CRAFT_BEAT_LENGTHS,
	stopOptions: CRAFT_STOP_OPTIONS,
	background: CRAFT_BACKGROUND_SOURCES,
	cg: CRAFT_CG_SOURCES,
	sprite: CRAFT_SPRITE_SOURCES,
	audio: CRAFT_AUDIO_SOURCES,
} as const;
