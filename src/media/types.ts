/**
 * 素材面的共享类型：出图目标、草稿、入库回执、台账条目，以及各 use case 共用的依赖形状。
 *
 * 放在这里而不是各自的 use case 里，是因为它们是**跨 use case 的契约**——`generate_image` 出的
 * 候选、`import_asset` 登记的东西、`commit` 写出来的素材表条目，指的都是同一批形状。
 * 行为的家在哪，见同一目录下各 use case 文件的头注。
 */
import type { SpriteFraming, SpriteStature } from '@aivn/core';
import type { CutoutTuning } from './cutout';
import type { ImageAspect, ImageBackend } from './image';
import type { MusicBackend } from './music';

export type { ImageAspect };

/** 素材类目：背景、事件插图、立绘。BGM 走单独那条路（没有草稿与抠底）。 */
export type AssetKind = 'background' | 'cg' | 'sprite';
/** 台账的键（`assets/generated.json`）按类目加一位音乐。 */
export type LedgerKind = AssetKind | 'bgm';

/** 一张要出的图：类目 + 身份（背景/插图给 id，立绘给主体与差分）+ 这次的参数。 */
export interface AssetTarget {
	kind: AssetKind;
	/** background / cg 的素材 id（文件名主体，也是剧本里的引用名）。 */
	name?: string;
	/** 立绘的主体 id（`assets/sprites/<spriteId>/` 的目录名）。 */
	spriteId?: string;
	/** 立绘差分名；不给按 `neutral`。 */
	variant?: string;
	/** 立绘取景：决定出图画幅与舞台摆位。不给沿用素材表里的声明，再不给是全身。 */
	framing?: SpriteFraming;
	/** 立绘体量：决定台上站多大。不给沿用素材表里的声明，再不给是标准。 */
	stature?: SpriteStature;
	/** 立绘级标题（无卡主体靠它出名牌）。 */
	title?: string;
	/** 垫图：主体 id（自动用它的 neutral 立绘）、剧目内相对路径，或 http(s) 网址。 */
	references?: string[];
	/** 本次出图的模型 / 尺寸：不给跟剧目 `play.json` 的 `image` 段，再不给跟部署配置。 */
	model?: string;
	size?: string;
}

/** 一张草稿：图已经出好（立绘也抠好了底），但还没进 `assets/`。 */
export interface DraftedAsset {
	draftId: string;
	/** 剧目目标；通用出图（`generate_image`）没有目标，缺省。 */
	kind?: AssetKind;
	/** 剧目内相对路径（`media-cache/drafts/<id>/image.png`）。 */
	path: string;
	/** 绝对路径：回复里贴 markdown 图片用它（GUI 按工作区路径解析）。 */
	absPath: string;
	aspect: ImageAspect;
	/** 立绘的抠底体检（覆盖率与人物高度）；背景与插图没有。 */
	cutout?: { coverage: number; figureHeight: number };
}

/** 一次入库的结果。 */
export interface GeneratedAsset {
	kind: LedgerKind;
	/** 剧目内相对路径（`assets/backgrounds/rooftop.jpg`）。 */
	path: string;
	absPath: string;
	/** 这个目标此前已有素材（可能是用户放的），本次是覆盖。 */
	replaced: boolean;
	/**
	 * 顺手补出来的那张定妆照（剧作家要差分、而该主体还没有 neutral 时）。
	 * 它是真金白银出的图，回执里必须一起说，别让用户以为只出了一张。
	 */
	autoNeutral?: GeneratedAsset;
	cutout?: { coverage: number; figureHeight: number };
	/** 立绘抠底前原片在留底库里的剧目内相对路径（`media-cache/sprite-sources/…`）；没有则缺省。 */
	sourcePath?: string;
}

/** `assets/generated.json` 的一条：这张图当初用什么描述生成、落在哪。 */
export interface LedgerEntry {
	kind: LedgerKind;
	path: string;
	prompt: string;
	model?: string;
	createdAt: string;
}

/** 把「要一张什么图」解析成的落盘规格（目录、文件名主体、画幅、垫图基准）。 */
export interface AssetSpec {
	kind: AssetKind;
	/** `assets/` 下的目录：`backgrounds` / `cg` / `sprites/<spriteId>`。 */
	kindPath: string;
	/** 文件名主体（立绘是差分名）。 */
	stem: string;
	aspect: ImageAspect;
	spriteId?: string;
	variant?: string;
	framing?: SpriteFraming;
	/** 立绘级（不是差分级的）取景：自动补的那张 neutral 按它走。 */
	baseFraming?: SpriteFraming;
	stature?: SpriteStature;
	title?: string;
}

/** 一张解析好的垫图：字节 + 它的**显示名**（主体 id 才有；路径与网址是 `null`）。 */
export interface ResolvedReference {
	mimeType: string;
	data: Buffer;
	name: string | null;
}

/** 草稿区一份记录（`media-cache/drafts/<id>/draft.json`）：出图意图 + 落盘细节。 */
export interface DraftRecord {
	draftId: string;
	/** 剧目目标；通用出图的记录没有它。 */
	kind?: AssetKind;
	name?: string;
	spriteId?: string;
	variant?: string;
	framing?: SpriteFraming;
	stature?: SpriteStature;
	title?: string;
	aspect: ImageAspect;
	prompt: string;
	/** 成图扩展名（含点）；立绘是抠底后的 `.png`。 */
	imageExt: string;
	/** 抠底前原片的扩展名（立绘才有）。 */
	sourceExt?: string;
	createdAt: string;
	committedAt?: string;
}

/**
 * 素材面的依赖：剧目根 + 后端 + 调参。
 *
 * 各 use case 都是纯函数，靠它拿环境，不在模块里握任何全局状态——插件按会话工作目录现建。
 */
export interface PlayAssetsOptions {
	/** 剧目根（会话工作目录）。 */
	dir: string;
	/** 生图后端；只配了音乐时可以不建（需要出图的 use case 会如实报错）。 */
	image?: ImageBackend;
	music?: MusicBackend;
	/** 抠底调参覆盖（默认值见 `cutout.ts`，环境变量 `DSH_AIVN_CUTOUT_*`）。 */
	tuning?: Partial<CutoutTuning>;
}
