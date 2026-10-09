import { tuningFromEnv, type CutoutTuning } from '@aivn/agent';

/**
 * 抠底层 —— 实现在 `@aivn/agent`（`media/cutout.ts`），两个宿主共用一份。
 *
 * 这个文件以前是那份 598 行实现的第二份拷贝，同步方式靠人「以上游为准重抄」；2026-10-09
 * 剧目 `demo` 的 `kikyo` 就是抄漏了一版（少了底色体检）废掉的。现在只剩插件自己的两件事：
 *
 * 1. 环境变量前缀 `DSH_AIVN_CUTOUT_*`（与 `DSH_AIVN_TTS_KEYS` / `DSH_AIVN_EXA_KEYS` 同一口径）；
 * 2. 出图那一步该给什么底色，归 `generate_asset` / `generate_image` 的 DESCRIPTION 与技能正文讲。
 */
export { cutout, DEFAULT_TUNING, tuningFromEnv } from '@aivn/agent';
export type { CutoutOptions, CutoutResult, CutoutTuning } from '@aivn/agent';

/** 五个旋钮从 `DSH_AIVN_CUTOUT_*` 读，读不出用默认值；单次调用可以再覆盖。 */
export function resolveTuning(override?: Partial<CutoutTuning>): CutoutTuning {
	return { ...tuningFromEnv('DSH_AIVN_CUTOUT'), ...override };
}
