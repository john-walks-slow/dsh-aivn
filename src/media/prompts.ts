/**
 * 提示词后缀：真正发出去的图才算数（`sent` 就是这一次垫了几张）。
 *
 * 三段分工照 AIVN `playAssets.ts` 的 `suffixFor`：
 * - **立绘**：定妆照走 `neutralSuffix`（构图 + 色键底），带垫图时加一句「就是参考图里那个人」；
 *   差分走 `identitySuffix`（身份锁 + 景别 + 状态）；
 * - **背景 / CG**：垫了图就点明「第几张是谁」——图本身没有名字，模型只看到「第一张、第二张」。
 *   不点明，多人 CG 就会各画各的，而且是**看起来完全正常**地画错：不报错、图也好看，
 *   只是七濑长成了澪。
 */
import { DEFAULT_SPRITE_FRAMING, SPRITE_FRAMING_SHOT, type SpriteFraming } from '@aivn/core';
import type { AssetSpec, ResolvedReference } from './types';

/**
 * 立绘后缀：**只写与「主体是人还是物」无关的构图与画风约束**，不描述任何人物特征——
 * 这里的每个词都会被当成设定印进图里（早先这里写过「between the twin tails」，等于给所有角色
 * 定了个双马尾：prompt 里明写 pink long straight hair，出来的仍是双马尾）。
 *
 * 两段都是硬约束不是修饰词：`cutout.ts` 的全局色键抠底要求 2D 平涂 + 单一纯色底
 * （3D 渲染的渐变与投影会让底色散成一片灰），剪影连成一片才能分割人物与底色。
 */
const STYLE_TAIL =
	'. Japanese anime style 2D illustration, flat cel shading with clean crisp lineart, NOT a 3D render, ' +
	'no 3D CGI look. ';

/** 色键底：只认一种颜色，任何渐变、投影、纹理都是抠不干净的白边。 */
const KEY_BACKGROUND =
	'Background is one single flat solid colour used as a chroma key, chosen to appear nowhere on the ' +
	'character themselves; always use pure green #00FF00, unless the character\'s own colouring is ' +
	'greenish (green hair, green clothing, green eyes), in which case use pure magenta #FF00FF instead. ' +
	'No gradient, no shadow, no texture, no decoration, no text.';

/**
 * 留白约束：人形专属（非人走 `square`，不拼它——给猫套上「手臂与躯干不能留窄缝」只会得到人形猫）。
 *
 * **姿势不在这里规定**：定妆照是所有差分的垫图基准，姿势写死等于把角色气质终身固定。
 * 留在这里的是抠底真要的两条：手臂与躯干之间不能留窄缝（色键够不着那条缝，人会被拆成两块轮廓）；
 * 以及头顶要留空——舞台按统一头顶留白摆位，不点明的话模型会把所有角色都顶到画幅上沿。
 */
const POSE_TAIL =
	', arms either resting against the body or clearly separated from it, never with a narrow sliver of ' +
	'background trapped between an arm and the torso' +
	'. Shorter characters may leave more empty space above the head, and taller characters may leave less, ' +
	'so every character keeps some space above the head rather than touching the top edge of the frame';

/**
 * 非人主体（`square`）的留白约束：只说「完整入画 + 四周留空」。
 *
 * 抠底靠的是「主体四周有一圈底色」，这与人形无关，所以这句留着；姿态与「头顶留白」都去掉
 * ——猫没有双臂，吊灯没有头顶。
 */
const PROP_TAIL =
	', the entire subject fully inside the frame with clear empty background space all around it, ' +
	'nothing cropped by the frame edges';

/**
 * 定妆照的前置中性描述：压住角色卡或本次 prompt 里的表情词（那一条只对当前差分有效）。
 *
 * **只说表情与气质，不说姿势**（姿势归调用方）；**按取景取词**：给非人主体说 portrait 会得到
 * 「猫的肖像照」——portrait 是人形概念，模型要么给一只坐着的人形猫，要么干脆画个人。
 */
export const NEUTRAL_LEAD: Record<SpriteFraming, string> = {
	full: 'a calm neutral-expression portrait of the character, in a natural pose that expresses their personality.',
	half: 'a calm neutral-expression portrait of the character, in a natural pose that expresses their personality, waist up.',
	square: 'the subject shown whole, in a neutral state.',
};

/**
 * 差分：只改**表情 / 状态**，身份特征一律锁死——垫图之外的第二道保险。
 * 画风要求与定妆照一字不差，否则两个人。
 *
 * 「facial expression」也是人形词：猫的差分（睡着的 / 炸毛的）说「只改面部表情」会让模型
 * 认真去找那张猫脸，所以非人那套说的是「只改状态」。
 */
const IDENTITY_TAIL =
	'Same 2D flat cel-shaded anime illustration style, NOT a 3D render, ' +
	'same single flat solid background colour as the reference image, no text, no shadow, no gradient.';
const HUMAN_IDENTITY =
	'Same character as the reference image: identical hairstyle, hair color, eye color, outfit and body type. ' +
	'Change only the facial expression.';
const PROP_IDENTITY =
	'The same subject as the reference image, in the same pose and same colours. Change only its state.';

/** 出图后要拼的提示词后缀（立绘走构图 / 身份锁，背景与 CG 走垫图编号锚点）。 */
export function suffixFor(spec: AssetSpec, prompt: string, sent: ResolvedReference[]): string {
	if (spec.kind !== 'sprite') {
		if (sent.length === 0) return prompt;
		return sent.every((ref) => ref.name !== null)
			? `${prompt}. ${referenceSuffix(sent.map((ref) => ref.name!))}`
			: `${prompt}. ${genericReferenceSuffix(sent)}`;
	}
	if (spec.variant === 'neutral') {
		const base = `${prompt}, ${neutralSuffix(spec.framing)}`;
		// 定妆照垫的是**外部**图（用户给的既有角色图、原画）：底色与画风归构图段管，这一句只补身份。
		return sent.length > 0 ? `${base} ${neutralReferenceTail(spec.framing)}` : base;
	}
	return `${prompt}. ${identitySuffix(spec.framing)}`;
}

/**
 * 参考图后缀：每一项按数组顺序编号，名字取自角色卡（没写名字就退回 id）。
 *
 * 非可省：垫图是按 `references` 的顺序一个个塞成 inlineData 的，模型看到的就是「第一张、第二张」。
 */
function referenceSuffix(names: string[]): string {
	const roster = names.map((name, i) => `${i + 1}) ${name}`).join(', ');
	return (
		`The attached reference images are, in this exact order: ${roster}. ` +
		'Keep each of them recognisably that same person — identical face, hairstyle, hair color, ' +
		'eye color and outfit — while placing them in the new scene. Do not merge them into one person.'
	);
}

/** 有路径 / 网址这类没有名字的垫图时用它：能报名字的报名字，剩下的叫「reference image」。 */
export function genericReferenceSuffix(refs: ResolvedReference[]): string {
	if (!refs.some((ref) => ref.name)) {
		return (
			'Follow the attached reference image(s) for visual appearance, design details, ' +
			'color palette and overall aesthetic while rendering the described scene.'
		);
	}
	const roster = refs.map((ref, i) => `${i + 1}) ${ref.name ?? 'reference image'}`).join(', ');
	return (
		`The attached reference images are, in this exact order: ${roster}. ` +
		'Maintain consistent visual appearance, character identity, hairstyle, facial features, and design elements ' +
		'as depicted in the corresponding reference images while adapting them to the scene.'
	);
}

/** 定妆照的参考图尾注（垫的是外部图，不是自家 neutral）。 */
function neutralReferenceTail(framing: SpriteFraming | undefined): string {
	if ((framing ?? DEFAULT_SPRITE_FRAMING) === 'square') {
		return 'Based on the attached reference image: the same subject with identical colors, markings and features.';
	}
	return (
		'Based on the attached reference image: the same character — identical face, hairstyle, hair color, ' +
		'eye color and outfit — redrawn in the pose and framing described above.'
	);
}

/**
 * 主体为人（full/half）时的后缀：景别措辞 + 人形留白 + 画风与色键底。
 *
 * 开头必须是 `SPRITE_FRAMING_SHOT` 而不是写死的 "full body"：取景是半身的角色照样会被画成全身，
 * 出图与舞台声明对不上，站位又得重新量。`framing` 自己决定的是画幅（像素）与舞台摆位（CSS），
 * 两者都传不进提示词——模型唯一能知道「画到哪儿」的通道就是措辞。
 */
function humanSuffix(framing: SpriteFraming | undefined): string {
	return `${SPRITE_FRAMING_SHOT[framing ?? DEFAULT_SPRITE_FRAMING]}${POSE_TAIL}${STYLE_TAIL}${KEY_BACKGROUND}`;
}

/** 定妆照后缀：`square` 是非人主体的唯一入口，人形与非人的差别只有留白那两句。 */
function neutralSuffix(framing: SpriteFraming | undefined): string {
	const f = framing ?? DEFAULT_SPRITE_FRAMING;
	return f === 'square'
		? `${SPRITE_FRAMING_SHOT[f]}${PROP_TAIL}${STYLE_TAIL}${KEY_BACKGROUND}`
		: humanSuffix(f);
}

/**
 * 差分后缀：身份锁 + 景别（+ 非人的留白）+ 画风。
 *
 * 差分也要点明景别：垫图（neutral 定妆照）是全身时，模型很容易照着垫图把一条半身差分
 * 也画成全身。
 */
function identitySuffix(framing: SpriteFraming | undefined): string {
	const f = framing ?? DEFAULT_SPRITE_FRAMING;
	const lead = f === 'square' ? PROP_IDENTITY : HUMAN_IDENTITY;
	return `${lead} ${SPRITE_FRAMING_SHOT[f]}. ${f === 'square' ? `${PROP_TAIL}. ` : ''}${IDENTITY_TAIL}`;
}
