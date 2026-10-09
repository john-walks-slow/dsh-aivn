/**
 * 提示词后缀 —— 实现在 `@aivn/agent`（`media/prompt.ts`），两个宿主共用一份。
 *
 * 这里只做翻译：宿主的 `AssetSpec` / `ResolvedReference` → 包内那几个原语。
 * 后缀正文（画风、色键底、留白、身份锁、序号锚点）一个字都不住在这里。
 */
import {
	DEFAULT_KEY_COLOR,
	genericReferenceSuffix as genericRefs,
	isKeyBackgroundColor,
	KEY_BACKGROUND_COLORS,
	NEUTRAL_LEAD,
	referenceSuffix,
	spriteSuffix,
} from '@aivn/agent';
import type { AssetSpec, ResolvedReference } from './types';

export { DEFAULT_KEY_COLOR, isKeyBackgroundColor, KEY_BACKGROUND_COLORS, NEUTRAL_LEAD };

/** 出图后要拼的提示词后缀（立绘走构图 / 身份锁，背景与 CG 走垫图编号锚点）。 */
export function suffixFor(spec: AssetSpec, prompt: string, sent: ResolvedReference[]): string {
	if (spec.kind !== 'sprite') {
		if (sent.length === 0) return prompt;
		return sent.every((ref) => ref.name !== null)
			? `${prompt}. ${referenceSuffix(sent.map((ref) => ref.name!))}`
			: `${prompt}. ${genericReferenceSuffix(sent)}`;
	}
	// 定妆照与差分走同一个出口：判据是「这次是不是在出定妆照」，措辞全在包里。
	return `${prompt}. ${spriteSuffix(spec.framing, spec.variant === 'neutral', sent.length, spec.keyColor)}`;
}

/** 有路径 / 网址这类没有名字的垫图时用它：能报名字的报名字，剩下的叫「reference image」。 */
export function genericReferenceSuffix(refs: ResolvedReference[]): string {
	return genericRefs(refs.map((ref) => ref.name ?? null));
}
