/**
 * 剧目素材面：出图、草稿与入库。
 *
 * 这个文件是**装配层**——把按 use case 拆开的实现接成一个面，供工具与 e2e 使用。
 * 行为的家在各自的文件里：
 *
 * | use case | 文件 | 干什么 |
 * | --- | --- | --- |
 * | 目标解析 / 垫图 | `target.ts` | 「要一张什么图」→ 落盘规格（目录、文件名、画幅、垫图基准） |
 * | 通用出图 | `generate-image.ts` `createGeneric` | 纯生成候选，不绑剧目目标 |
 * | 出图草稿 | `generate-image.ts` `draft` | 剧目目标已知，出图（立绘抠底）落草稿区 |
 * | 一步入库 | `generate.ts` `generate` | `ensureNeutral` + `draft` + `commit`（`generate_asset`） |
 * | 抠底 | `cut.ts` `cutFile` | 纯色底 → 透明 PNG，只写输出 |
 * | 登记 | `import.ts` `register` | 外部图 / 候选图显式落位入库（`import_asset`） |
 * | 采用 | `commit.ts` `commit` | 草稿 → `assets/` + 素材表 + 台账 |
 * | 落位与记账 | `catalog.ts` | 写 `assets/`、素材表声明、台账、原片留底 |
 * | 草稿区 | `draft-store.ts` | `media-cache/drafts/` 的读写与过期清理 |
 * | BGM | `bgm.ts` `generateBgm` | 生成一首曲子并落库 |
 * | 提示词后缀 | `prompts.ts` | 立绘的色键底 / 身份锁、背景的垫图编号锚点 |
 *
 * 生命周期语义（draft / adopted / …）以 `@aivn/core` 的 `assetLifecycle` 为准：本插件同步出图，
 * 草稿区的前置态只有 `draft`，入库即 `adopted`（`commit`）；留底天数由 `ASSET_DRAFT_RETENTION_DAYS`
 * 推出。没有队列、没有到货广播——那是独立版的宿主机制，不往这里搬。
 */
import { draft as draftOf, createGeneric } from './generate-image';
import { generate as generateOf, exists as existsOf } from './generate';
import { commit as commitOf } from './commit';
import { cutFile as cutFileOf, type CutRequest, type CutResult } from './cut';
import { register as registerOf } from './import';
import { generateBgm as generateBgmOf } from './bgm';
import type { ImageAspect, ImageBackend } from './image';
import type { MusicBackend } from './music';
import type { AssetTarget, DraftedAsset, GeneratedAsset, PlayAssetsOptions } from './types';

export type {
	AssetKind,
	AssetTarget,
	DraftedAsset,
	GeneratedAsset,
	KeyBackgroundColor,
	LedgerEntry,
	LedgerKind,
	PlayAssetsOptions,
} from './types';

/**
 * 素材面的便捷外壳：按 use case 拆开的实现（见文件头表）的薄装配。
 *
 * 抽成可注入的纯类（`dir` + 后端 + 调参），不在模块里握任何全局状态：插件按会话工作目录现建。
 */
export class PlayAssets {
	constructor(private readonly opts: PlayAssetsOptions) {}

	/** 只出图、不落库：出好图（立绘抠好底）放进草稿区，等 `commit`。 */
	draft(target: AssetTarget, prompt: string): Promise<DraftedAsset> {
		return draftOf(this.opts, target, prompt);
	}

	/** 出图并**入库**：`draft` + `commit` 的组合（`generate_asset`）。 */
	generate(target: AssetTarget, prompt: string, extra: { description?: string } = {}): Promise<GeneratedAsset> {
		return generateOf(this.opts, target, prompt, extra);
	}

	/** 通用出图：只把 prompt 变成候选图，不绑剧目目标（`generate_image`）。 */
	createGeneric(
		prompt: string,
		extra: { references?: string[]; aspectRatio?: ImageAspect; size?: string; model?: string } = {},
	): Promise<DraftedAsset> {
		return createGeneric(this.opts, prompt, extra);
	}

	/** 这个目标在剧目里已经有素材了吗。 */
	exists(target: AssetTarget): Promise<boolean> {
		return existsOf(this.opts, target);
	}

	/** 把一张草稿正式入库。 */
	commit(draftId: string): Promise<GeneratedAsset> {
		return commitOf(this.opts, draftId);
	}

	/** 抠底：纯色底图 → 透明 PNG，只写输出（源图给路径或素材引用）。 */
	cut(request: CutRequest): Promise<CutResult> {
		return cutFileOf(this.opts, request);
	}

	/** 把一张图登记成剧目素材（不抠底）。 */
	register(
		source: string,
		target: AssetTarget,
		extra: { description?: string; prompt?: string; original?: string } = {},
	): Promise<GeneratedAsset> {
		return registerOf(this.opts, source, target, extra);
	}

	/** 生成一首 BGM 并落库。 */
	generateBgm(name: string, prompt: string, meta: { model?: string } = {}): Promise<GeneratedAsset> {
		return generateBgmOf(this.opts, name, prompt, meta);
	}
}

/** 按会话工作目录现建一个素材面：工具每次调用现建，不在模块里握任何全局状态。 */
export function playAssetsOf(dir: string, media: { image: ImageBackend | null; music: MusicBackend | null }): PlayAssets {
	return new PlayAssets({
		dir,
		...(media.image ? { image: media.image } : {}),
		...(media.music ? { music: media.music } : {}),
	});
}
