/**
 * `generate_asset` 的编排 use case：**生成 +（立绘）抠底 + 登记**一次做完。
 *
 * 这是「一步入库」那条路——调用时就声明了最终 id，没有「让用户在候选里挑」这回事，
 * 所以它直通 `generate`。与 `draft`（候选路径）的两处不同：
 *
 * - 进来先 `ensureNeutral`（差分的定妆照缺了就顺手补一张）；
 * - 同一最终目标的并发只跑一次（`inflight`）；`draft` 不去重——同一目标并发出三张候选正是它要的。
 *
 * 出图、抠底、入库各自去它该去的地方（`generate-image` / `cutout` / `commit`），这一层只管编排。
 */
import { DEFAULT_SPRITE_FRAMING } from '@aivn/core';
import { NEUTRAL_LEAD } from './prompts';
import { NEUTRAL, resolve, spriteStems, existingAsset } from './target';
import { draft, type DraftOptions } from './generate-image';
import { commit } from './commit';
import { declareDescription } from './catalog';
import type { AssetSpec, AssetTarget, GeneratedAsset, PlayAssetsOptions } from './types';

/**
 * 出图去重表：key 是「剧目根 + 目标」。
 *
 * 必须挂在**模块级**而不是调用者实例上：工具每次调用现建一个素材面，去重表若挂在实例上，
 * 两次调用各锁各的，等于没锁（同一目标会被并发出两张、白烧配额）。
 */
const generationInflight = new Map<string, Promise<GeneratedAsset>>();

/** 出图并**入库**：`draft` + `commit` 的组合。剧作家的缺图补位走这条——那张图一出来就是要用的。 */
export async function generate(
	opts: PlayAssetsOptions,
	target: AssetTarget,
	prompt: string,
	extra: DraftOptions = {},
): Promise<GeneratedAsset> {
	const spec = await resolve(opts.dir, target);
	// 去重键带剧目根：去重表是**模块级**的（工具每次调用现建素材面，挂在实例上等于没挂）。
	const key = `${opts.dir}\u0000${spec.kindPath}/${spec.stem}`;
	const running = generationInflight.get(key);
	if (running) return running;
	const job = (async (): Promise<GeneratedAsset> => {
		const auto = await ensureNeutral(opts, spec, prompt);
		const drafted = await draft(opts, target, prompt);
		const committed = await commit(opts, drafted.draftId);
		if (extra.description?.trim()) await declareDescription(opts.dir, spec, extra.description.trim());
		return auto ? { ...committed, autoNeutral: auto } : committed;
	})();
	generationInflight.set(key, job);
	try {
		return await job;
	} finally {
		if (generationInflight.get(key) === job) generationInflight.delete(key);
	}
}

/**
 * 差分生成前确保有 neutral 垫图，返回自动补出来的那张（没有则 null）：
 *
 * - 有 → 正常派生；
 * - 没有且该主体一个差分都没有 → 自动先定一张（没有既存差分，不存在不一致）；
 * - 没有但已有其它差分 → 报错让用户先过目新定妆照：那条差分是拿别的脸锚定的，新补一张
 *   只会与它静默换脸。
 *
 * 一批并发出 6 个差分时，6 条调用会一起看到「没定妆照」并各自来补；多花的钱与换脸靠
 * `inflight` 挡住——6 条内层调用的目标都是 `sprites/<id>/neutral` 这同一个 key。
 */
export async function ensureNeutral(
	opts: PlayAssetsOptions,
	spec: AssetSpec,
	prompt: string,
): Promise<GeneratedAsset | null> {
	if (spec.kind !== 'sprite' || spec.variant === NEUTRAL) return null;
	if (await existingAsset(opts.dir, spec.kindPath, NEUTRAL)) return null;
	const others = await spriteStems(opts.dir, spec.spriteId!);
	if (others.length > 0) {
		throw new Error(
			`${spec.spriteId} 缺 ${NEUTRAL} 定妆照，但已有 ${others.length} 个差分（${others.join('、')}）：` +
				'新补的定妆照会与已有差分不是同一个人，演出中会静默换脸。' +
				'请先单独生成一次 neutral 让用户过目，确认后再生成差分。',
		);
	}
	// prompt 是「角色描述 + 本次表情」，直接拿去出定妆照会变成「哭得很凶但表情中性」的自相矛盾
	// 指令。压一条前置的中性描述盖住表情词，角色外观描述留在后面。取景按**立绘级**走，不按这条
	// 差分：对半身说 standing 会把画拉回全身，景别后缀与它当场打架。
	const framing = spec.baseFraming ?? DEFAULT_SPRITE_FRAMING;
	return generate(
		opts,
		{
			kind: 'sprite',
			spriteId: spec.spriteId,
			variant: NEUTRAL,
			framing,
			...(spec.stature ? { stature: spec.stature } : {}),
			// 顺手补的这张定妆照跟本次调用同一个底色：底色是**主体级**的选择，差分只是跟着垫图走。
			...(spec.keyColor ? { keyColor: spec.keyColor } : {}),
			...(spec.title ? { title: spec.title } : {}),
		},
		`${NEUTRAL_LEAD[framing]} ${prompt}`,
	);
}

/** 这个目标在剧目里已经有素材了吗（`generate_asset` 出图前的守卫）。 */
export async function exists(opts: PlayAssetsOptions, target: AssetTarget): Promise<boolean> {
	const spec = await resolve(opts.dir, target);
	return existingAsset(opts.dir, spec.kindPath, spec.stem);
}
