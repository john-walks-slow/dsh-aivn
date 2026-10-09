/**
 * 写作参数（`craft`）—— 两份说法与补丁语义在 `@aivn/agent` 的 `craft/params.ts`，
 * 两个宿主共用一份；插件这边只留两件事：
 *
 * - **停止点的措辞**：插件把停止点写在剧本最后一行（`<stop options="… | …"/>`），
 *   服务端那边是工具调用 `beat_done(options=[…])`——同一件事两种表达，这是刻意的差异；
 * - **能力位**：插件的预设不装应用级素材资源库（`library` 恒假），于是带库的措辞走不到。
 */
import { renderCraftParams as renderCraft, CRAFT_ENUMS, type AssetCapabilities } from '@aivn/agent';
import { resolveCraft, type CraftStopOptions, type EffectiveCraft } from '@aivn/core';

export { CRAFT_ENUMS, resolveCraft };
export type { AssetCapabilities };

/** 这两项能力位决定素材来源怎么写——没有生图就不能说「自己出图」。 */
export function assetCapabilitiesOf(can: { image: boolean }): AssetCapabilities {
	return { image: can.image, library: false };
}

/**
 * 停止点的措辞。写「**有**停止点时给几条」而不是「每次给几条」：什么时候交还主导权归剧作家
 * 自己判断（那是创作口径），这一条只定「给了就是几条」。写成「每次给」会让它每轮都硬塞一组选项，
 * narrative 再也收不了尾。
 */
const STOP_OPTIONS_DIRECTIVE: Record<CraftStopOptions, string> = {
	two: '有停止点时给 2 条互斥选项：<stop options="… | …"/>。',
	three: '有停止点时给 3 条互斥选项：<stop options="… | … | …"/>。',
	four: '有停止点时给 4 条互斥选项：<stop options="… | … | … | …"/>。',
	free: '固定停在自由输入框：<stop placeholder="…"/>，不给 options。',
};

/** 剧作家提示词里的「写作参数」段（永远注入，包括全默认值时）。 */
export function renderCraftParams(craft: EffectiveCraft, can: AssetCapabilities): string {
	return renderCraft(craft, can, (options) => STOP_OPTIONS_DIRECTIVE[options]);
}
