/**
 * 「采用」use case：把一份草稿正式**入库**——写 `assets/`、补素材表声明、记生图台账、
 * 把留底原片搬进 `media-cache/sprite-sources/`。
 *
 * 落位就用**草稿出图时的意图**（`draft.json` 里记的那点身份），所以这里只要一个 draftId
 * ——候选之间的差别在画面不在身份。同一张草稿重复入库只是把同一个文件再写一遍，幂等
 * （契约里 `adopted → adopted` 是合法边，`replaced` 如实为真）。
 *
 * 对口共享契约 `@aivn/core` 的 `draft → adopted`（`cause: "commit"`）；本插件在草稿区只有
 * draft 一个前置态（同步出图不经过 pending），这套状态名与契约一致。
 */
import { resolve } from './target';
import { loadDraft, markCommitted, readDraftImage, readDraftSource } from './draft-store';
import { declareSprite, keepSource, persist, recordPrompt } from './catalog';
import type { GeneratedAsset, PlayAssetsOptions } from './types';

/** 把一张草稿正式入库，返回入库回执（含覆盖判定与留底路径）。 */
export async function commit(opts: PlayAssetsOptions, draftId: string): Promise<GeneratedAsset> {
	const dir = opts.dir;
	const draft = await loadDraft(dir, draftId);
	const spec = await resolve(dir, {
		kind: draft.kind!,
		name: draft.name,
		spriteId: draft.spriteId,
		variant: draft.variant,
		framing: draft.framing,
		stature: draft.stature,
		title: draft.title,
	});
	const bytes = await readDraftImage(dir, draftId, draft.imageExt);
	let sourcePath: string | undefined;
	if (spec.kind === 'sprite' && draft.sourceExt) {
		await keepSource(dir, spec, await readDraftSource(dir, draftId, draft.sourceExt), draft.sourceExt);
		sourcePath = `media-cache/sprite-sources/${spec.spriteId}/${spec.stem}${draft.sourceExt}`;
	}
	const written = await persist(dir, spec, bytes, draft.imageExt);
	if (spec.kind === 'sprite') await declareSprite(dir, spec);
	await recordPrompt(dir, spec, written.path, draft.prompt);
	await markCommitted(dir, draftId, draft);
	return sourcePath ? { ...written, sourcePath } : written;
}
