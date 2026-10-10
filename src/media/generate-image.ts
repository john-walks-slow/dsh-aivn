/**
 * `generate_image` 与 `draft` 的 use case：**只出图、不落库**。
 *
 * - `draft`：剧目目标已知，出好图（立绘抠好底）放进草稿区，等 `commit` 才进 `assets/`。
 *   这是「一次出三张候选给用户挑」的入口——三张都只是草稿，没被挑中的那张不会在素材表里留痕。
 * - `createGeneric`：**通用出图**，只把 prompt 变成一张候选图，不绑任何剧目目标，也不做色键底、
 *   身份锁、自动补 neutral 这些剧目后缀；图落在候选区，等 `import_asset` 登记。
 *
 * 出图这一层只碰「后端 + 草稿区」：不写 `assets/`、不碰素材表、不记台账。抠底调参也不在这里。
 */
import { loadPlaySync } from '../play/play';
import { requireImageBackend } from './backends';
import { cutout, resolveTuning } from './cutout';
import { aspectMatches, extOf, sizeOfImage } from './image';
import { genericReferenceSuffix, suffixFor } from './prompts';
import { existingAsset, intentOf, mimeOfBuffer, NEUTRAL, references, referencesGeneric, resolve } from './target';
import { newDraftId, writeDraft } from './draft-store';
import type { AssetSpec, AssetTarget, DraftedAsset, ImageAspect, PlayAssetsOptions } from './types';

/** `draft` / `generate` 共用的可选参数。 */
export interface DraftOptions {
	/** 一句话画面描述（`generate` 落素材表用；`draft` 不收，留作共用签名）。 */
	description?: string;
}

/** 本次出图的模型 / 档位：调用方显式给 > 剧目 `play.json` 的 `image` 段 > 部署级设置（后端自己回落）。 */
function imageConfig(dir: string): { model?: string; size?: string } {
	const play = loadPlaySync(dir)?.config.image;
	return { model: play?.model, size: play?.size };
}

/**
 * 只出图、不落库：出好图（立绘抠好底）放进草稿区，等 `commit` 才进 `assets/`。
 *
 * 差分的身份基准恒为**已入库**的 neutral：草稿当不了基准（拿一张没人过目的脸锚定全套差分，
 * 事后换掉基准等于整套差分换人），所以这里一律硬抛，不自动补（自动补走 `generate`：那条路是
 * 「图一出来就要用」，没有挑候选这一步）。
 */
export async function draft(opts: PlayAssetsOptions, target: AssetTarget, prompt: string): Promise<DraftedAsset> {
	const backend = requireImageBackend(opts);
	const spec = await resolve(opts.dir, target);
	if (spec.kind === 'sprite') {
		// **只有差分**不吃显式垫图：它的身份基准恒为入库的 neutral 那张，换基准会与既有差分
		// 不是同一个人。定妆照本身正是「拿一张既有图定妆」的入口，垫图照收（AIVN 同口径）。
		if (spec.variant !== NEUTRAL && target.references?.length) {
			throw new Error(
				`立绘差分不吃显式垫图：身份基准恒为 ${spec.spriteId} 的 ${NEUTRAL} 定妆照` +
					'（换基准会与既有差分不是同一个人）。要换基准就重出定妆照。',
			);
		}
		if (spec.variant !== NEUTRAL && !(await existingAsset(opts.dir, spec.kindPath, NEUTRAL))) {
			throw new Error(
				`${spec.spriteId} 还没有入库的 ${NEUTRAL} 定妆照：先出定妆照候选、挑一张用 import_asset 采用，再派生差分。`,
			);
		}
	}
	const refs = await references(opts.dir, spec, target.references);
	const full = suffixFor(spec, prompt.trim(), refs);
	const play = imageConfig(opts.dir);
	const model = target.model?.trim() || play.model;
	const size = target.size?.trim() || play.size;
	const generated = await backend.generate({
		prompt: full,
		aspectRatio: spec.aspect,
		...(refs.length > 0 ? { references: refs.map(({ mimeType, data }) => ({ mimeType, data })) } : {}),
		...(model ? { model } : {}),
		...(size ? { size } : {}),
	});
	assertCanvas(spec, generated.data);

	// 立绘抠底成透明 PNG，同时把抠底前那张原片一起收进草稿——留底是抠底参数唯一的后悔药
	// （`cut` 可对着留底重抠），入库时跟着搬进 media-cache/sprite-sources/。
	const cut = spec.kind === 'sprite' ? await cutout(generated.data, resolveTuning(opts.tuning)) : null;
	return writeDraft(
		opts.dir,
		{
			draftId: newDraftId(),
			kind: spec.kind,
			...intentOf(spec),
			aspect: spec.aspect,
			prompt: full,
			createdAt: new Date().toISOString(),
		},
		{
			image: cut ? cut.data : generated.data,
			imageExt: cut ? '.png' : extOf(mimeOfBuffer(generated.data)),
			...(cut ? { source: { data: generated.data, ext: extOf(mimeOfBuffer(generated.data)) } } : {}),
		},
		cut ? { coverage: cut.coverage, figureHeight: cut.figureHeight } : undefined,
	);
}

/**
 * **通用出图**：只把 prompt 变成一张候选图，不绑任何剧目目标（背景 / 立绘 / 差分），
 * 也不做色键底、身份锁、自动补 neutral 这些剧目后缀——图落在候选区，等 `import_asset` 登记。
 *
 * `generate_image` 走这条路；`import_asset` 也用它登记「用别的模型 / 工具出的图」。
 */
export async function createGeneric(
	opts: PlayAssetsOptions,
	prompt: string,
	extra: { references?: string[]; aspectRatio?: ImageAspect; size?: string; model?: string } = {},
): Promise<DraftedAsset> {
	const backend = requireImageBackend(opts);
	const aspect = extra.aspectRatio ?? '16:9';
	const refs = await referencesGeneric(opts.dir, extra.references);
	const full = refs.length > 0 ? `${prompt.trim()}. ${genericReferenceSuffix(refs)}` : prompt.trim();
	const play = imageConfig(opts.dir);
	const model = extra.model?.trim() || play.model;
	const size = extra.size?.trim() || play.size;
	const generated = await backend.generate({
		prompt: full,
		aspectRatio: aspect,
		...(refs.length > 0 ? { references: refs.map(({ mimeType, data }) => ({ mimeType, data })) } : {}),
		...(model ? { model } : {}),
		...(size ? { size } : {}),
	});
	return writeDraft(
		opts.dir,
		{ draftId: newDraftId(), aspect, prompt: full, createdAt: new Date().toISOString() },
		{ image: generated.data, imageExt: extOf(mimeOfBuffer(generated.data)) },
	);
}

/**
 * 画幅自校验：上游不认的画幅**不一定报错**（flow2api 实测静默回一张横图），所以落盘前
 * 按字节里的真实尺寸对一次账——对不上就报错，不落一张方向错的图。
 * 认不出尺寸的格式（罕见的 JPEG 变体）放过。
 */
function assertCanvas(spec: AssetSpec, data: Buffer): void {
	const size = sizeOfImage(data);
	if (!size) return;
	if (!aspectMatches(size, spec.aspect)) {
		throw new Error(
			`出图回来是 ${size.width}x${size.height}，与请求的画幅 ${spec.aspect} 不符` +
				`（${spec.kind === 'sprite' ? '立绘' : '背景 / 插图'}）。上游可能不支持这个画幅，` +
				'请把配置里的 image.size 换成目标模型认的取值，或换 image.format。',
		);
	}
}
