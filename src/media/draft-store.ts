/**
 * 草稿区 `media-cache/drafts/` 的读写 —— 实现在 `@aivn/agent`（`media/draft.ts`），
 * 两个宿主落在同一个位置、写同一份 `draft.json`。
 */
export type { DraftedDraft as DraftedAsset, DraftFiles, DraftPlan, DraftRecord } from '@aivn/agent';
export {
	DRAFT_TTL_MS,
	draftDir,
	draftsDir,
	loadDraft,
	markCommitted,
	newDraftId,
	pruneDrafts,
	readDraftImage,
	readDraftSource,
	writeDraft,
} from '@aivn/agent';
