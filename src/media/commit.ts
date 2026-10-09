/**
 * 「采用」use case：把一份草稿正式**入库**——写 `assets/`、补素材表声明、记生图台账、
 * 把留底原片搬进 `media-cache/sprite-sources/`。
 *
 * 编排在 `@aivn/agent` 的 `media/adopt.ts`（两个宿主共用一份）；这里只做两件事：
 * 拿草稿的意图解析出落位规格、把插件的 IO 与锁接到那条流水线上。
 *
 * 落位就用**草稿出图时的意图**，所以这里只要一个 draftId——候选之间的差别在画面不在身份。
 * 同一张草稿重复入库只是把同一个文件再写一遍，幂等。
 */
import { adoptDraft } from '@aivn/agent';
import { join } from 'node:path';
import { assetIo, recordLedger, withManifest } from './catalog';
import { loadDraft } from './draft-store';
import { resolve } from './target';
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
	const adopted = await adoptDraft(
		{
			playDir: dir,
			assets: assetIo(dir),
			updateManifest: (mutate) => withManifest(dir, mutate),
			recordLedger: (entry) => recordLedger(dir, entry),
		},
		draft,
		spec,
	);
	return {
		kind: spec.kind,
		path: adopted.rel,
		absPath: join(dir, adopted.rel),
		replaced: adopted.replaced,
		...(adopted.sourceRel ? { sourcePath: adopted.sourceRel } : {}),
	};
}
