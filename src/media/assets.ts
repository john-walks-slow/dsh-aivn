/**
 * 剧目素材的出图、草稿与入库。
 *
 * 照 AIVN `apps/server/src/playAssets.ts` 的语义（同一个 `draft` / `commit` / `generate` 三分），
 * 砍掉插件里不存在的那几层：没有跨剧目素材库的引用即导入、没有 WS 到货广播、没有后台排产、
 * 没有剧目级 runtime 缓存。留下的是这条流程本身：
 *
 *   草稿区 `media-cache/drafts/<draftId>/`（成图 + 立绘抠底前原片 + `draft.json` 记出图意图）
 *     → `commit` 才写 `assets/`、补素材表声明、记台账 `assets/generated.json`、
 *       把原片搬进 `media-cache/sprite-sources/`（重抠的前提）。
 *
 * 两个入口共用这一份实现：
 * - **原子流**：`generate_image` 只产候选（纯生成，不绑定剧目目标、不抠底）；`cut` 抠底；
 *   `import_asset` 把一张图 `register` 入库（背景/插图直接登记，立绘登记已抠好的透明 PNG）；
 * - **一步入库**：`generate()` = `ensureNeutral` + `draft` + `commit` 一次做完（`generate_asset` 用它；
 *   调用时就声明了最终 id，没有「让用户在候选里挑」这回事）。
 *
 * 抽成可注入的纯类（`dir` + 后端 + 调参），不在模块里握任何全局状态：插件按会话工作目录现建。
 */
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import {
	DEFAULT_SPRITE_FRAMING,
	DEFAULT_SPRITE_STATURE,
	framingOf,
	isSpriteFraming,
	isSpriteStature,
	statureOf,
	SPRITE_FRAMING_ASPECT,
	SPRITE_FRAMING_SHOT,
	type AssetMeta,
	type SpriteFraming,
	type SpriteStature,
} from '@aivn/core';
import { characterNames, readManifest, resolveInPlay } from '../play/assets';
import { loadPlaySync } from '../play/play';
import { cutout, resolveTuning, type CutoutResult, type CutoutTuning } from './cutout';
import { aspectMatches, extOf, sniffImageMime, sizeOfImage, type ImageAspect, type ImageBackend } from './image';
import type { MusicBackend } from './music';
import { fetchWebImage } from './web-image';

/** 素材类目：背景、事件插图、立绘。BGM 走 `generateBgm` 那条单独的路（没有草稿与抠底）。 */
export type AssetKind = 'background' | 'cg' | 'sprite';
/** 台账的键（`assets/generated.json`）按类目加一位音乐。 */
export type LedgerKind = AssetKind | 'bgm';

/** 立绘的身份基准差分名：其它差分的垫图恒为它。 */
const NEUTRAL = 'neutral';
/** 草稿寿命：超过它由下一次出图顺手清掉（与 AIVN 同一口径）。 */
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
/** 素材 id / 差分名的白名单：字母数字开头，中文照收，不含路径分隔符。 */
const STEM_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;
/** 图片文件：立绘目录里数差分时只认它。 */
const IMAGE_FILE = /\.(png|jpe?g|webp)$/i;
/** 垫图张数上限（Gemini 3 系上限 14，这里按产品口径收到 6）。 */
const MAX_REFERENCES = 6;

/**
 * 立绘后缀：**只写与「主体是人还是物」无关的构图与画风约束**，不描述任何人物特征——
 * 这里的每个词都会被当成设定印进图里（早先这里写过「between the twin tails」，等于给所有角色
 * 定了个双马尾：prompt 里明写 pink long straight hair，出来的仍是双马尾）。
 *
 * 两段都是硬约束不是修饰词：`src/media/cutout.ts` 的全局色键抠底要求 2D 平涂 + 单一纯色底
 * （3D 渲染的渐变与投影会让底色散成一片灰），剪影连成一片才能分割人物与底色。
 */
const STYLE_TAIL =
	'. Japanese anime style 2D illustration, flat cel shading with clean crisp lineart, NOT a 3D render, ' +
	'no 3D CGI look. ';

/** 色键底：只认一种颜色，任何渐变、投影、纹理都是抠不干净的白边。 */
const KEY_BACKGROUND =
	'Background is one single flat solid colour used as a chroma key, chosen to appear nowhere on the ' +
	'character themselves; always use pure green #00FF00, unless the character\'s own colouring is ' +
	'greenish (green hair, green clothing, green eyes), in which case use pure magenta #FF00FF instead. ' +
	'No gradient, no shadow, no texture, no decoration, no text.';

/**
 * 留白约束：人形专属（非人走 `square`，不拼它——给猫套上「手臂与躯干不能留窄缝」只会得到人形猫）。
 *
 * **姿势不在这里规定**：定妆照是所有差分的垫图基准，姿势写死等于把角色气质终身固定。
 * 留在这里的是抠底真要的两条：手臂与躯干之间不能留窄缝（色键够不着那条缝，人会被拆成两块轮廓）；
 * 以及头顶要留空——舞台按统一头顶留白摆位，不点明的话模型会把所有角色都顶到画幅上沿。
 */
const POSE_TAIL =
	', arms either resting against the body or clearly separated from it, never with a narrow sliver of ' +
	'background trapped between an arm and the torso' +
	'. Shorter characters may leave more empty space above the head, and taller characters may leave less, ' +
	'so every character keeps some space above the head rather than touching the top edge of the frame';

/**
 * 非人主体（`square`）的留白约束：只说「完整入画 + 四周留空」。
 *
 * 抠底靠的是「主体四周有一圈底色」，这与人形无关，所以这句留着；姿态与「头顶留白」都去掉
 * ——猫没有双臂，吊灯没有头顶。
 */
const PROP_TAIL =
	', the entire subject fully inside the frame with clear empty background space all around it, ' +
	'nothing cropped by the frame edges';

/**
 * 定妆照的前置中性描述：压住角色卡或本次 prompt 里的表情词（那一条只对当前差分有效）。
 *
 * **只说表情与气质，不说姿势**（姿势归调用方）；**按取景取词**：给非人主体说 portrait 会得到
 * 「猫的肖像照」——portrait 是人形概念，模型要么给一只坐着的人形猫，要么干脆画个人。
 */
const NEUTRAL_LEAD: Record<SpriteFraming, string> = {
	full: 'a calm neutral-expression portrait of the character, in a natural pose that expresses their personality.',
	half: 'a calm neutral-expression portrait of the character, in a natural pose that expresses their personality, waist up.',
	square: 'the subject shown whole, in a neutral state.',
};

/**
 * 差分：只改**表情 / 状态**，身份特征一律锁死——垫图之外的第二道保险。
 * 画风要求与定妆照一字不差，否则两个人。
 *
 * 「facial expression」也是人形词：猫的差分（睡着的 / 炸毛的）说「只改面部表情」会让模型
 * 认真去找那张猫脸，所以非人那套说的是「只改状态」。
 */
const IDENTITY_TAIL =
	'Same 2D flat cel-shaded anime illustration style, NOT a 3D render, ' +
	'same single flat solid background colour as the reference image, no text, no shadow, no gradient.';
const HUMAN_IDENTITY =
	'Same character as the reference image: identical hairstyle, hair color, eye color, outfit and body type. ' +
	'Change only the facial expression.';
const PROP_IDENTITY =
	'The same subject as the reference image, in the same pose and same colours. Change only its state.';

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
	/** 剧目目标；通用出图（`createGeneric`）没有目标，缺省。 */
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

interface AssetSpec {
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
interface ResolvedReference {
	mimeType: string;
	data: Buffer;
	name: string | null;
}

interface DraftRecord {
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

export interface PlayAssetsOptions {
	/** 剧目根（会话工作目录）。 */
	dir: string;
	/** 生图后端；只配了音乐时可以不建（出图那三个方法会如实报错）。 */
	image?: ImageBackend;
	music?: MusicBackend;
	/** 抠底调参覆盖（默认值见 `cutout.ts`，环境变量 `DSH_AIVN_CUTOUT_*`）。 */
	tuning?: Partial<CutoutTuning>;
}

/**
 * 出图去重表：key 是「剧目根 + 目标」。
 *
 * 必须挂在**模块级**而不是 `PlayAssets` 实例上：工具每次调用都现建一个 `PlayAssets`，
 * 去重表若挂在实例上，两次调用各锁各的，等于没锁（同一目标会被并发出两张、白烧配额）。
 */
const generationInflight = new Map<string, Promise<GeneratedAsset>>();

export class PlayAssets {
	constructor(private readonly opts: PlayAssetsOptions) {}
	private get dir(): string {
		return this.opts.dir;
	}

	private imageBackend(): ImageBackend {
		const backend = this.opts.image;
		if (!backend) throw new Error('没有配生图后端（image.baseUrl / image.model），出不了图');
		return backend;
	}

	/* ── 出图 ─────────────────────────────────────────────────────────────── */

	/**
	 * 只出图、不落库：出好图（立绘抠好底）放进草稿区，等 `commit` 才进 `assets/`。
	 *
	 * 这是「一次出三张候选给用户挑」的入口——三张都只是草稿，没被挑中的那张不会在素材表里
	 * 留下任何痕迹。差分的身份基准恒为**已入库**的 neutral：草稿当不了基准（拿一张没人过目的
	 * 脸锚定全套差分，事后换掉基准等于整套差分换人），所以这里一律硬抛，不自动补
	 * （自动补走 `generate`：那条路是「图一出来就要用」，没有挑候选这一步）。
	 */
	async draft(target: AssetTarget, prompt: string): Promise<DraftedAsset> {
		const backend = this.imageBackend();
		const spec = await this.resolve(target);
		if (spec.kind === 'sprite') {
			// **只有差分**不吃显式垫图：它的身份基准恒为入库的 neutral 那张，换基准会与既有差分
			// 不是同一个人。定妆照本身正是「拿一张既有图定妆」的入口，垫图照收（AIVN 同口径）。
			if (spec.variant !== NEUTRAL && target.references?.length) {
				throw new Error(
					`立绘差分不吃显式垫图：身份基准恒为 ${spec.spriteId} 的 ${NEUTRAL} 定妆照` +
						'（换基准会与既有差分不是同一个人）。要换基准就重出定妆照。',
				);
			}
			if (spec.variant !== NEUTRAL && !(await this.existing(spec.kindPath, NEUTRAL))) {
				throw new Error(
					`${spec.spriteId} 还没有入库的 ${NEUTRAL} 定妆照：先出定妆照候选、挑一张用 import_asset 采用，再派生差分。`,
				);
			}
		}
		const references = await this.references(spec, target.references);
		const full = suffixFor(spec, prompt.trim(), references);
		// 模型与档位：调用方显式给 > 剧目 `play.json` 的 `image` 段 > 部署级设置（后端自己回落）。
		const play = loadPlaySync(this.dir)?.config.image;
		const model = target.model?.trim() || play?.model;
		const size = target.size?.trim() || play?.size;
		const generated = await backend.generate({
			prompt: full,
			aspectRatio: spec.aspect,
			...(references.length > 0 ? { references: references.map(({ mimeType, data }) => ({ mimeType, data })) } : {}),
			// 立绘要抠底，源图分辨率是唯一能压住轮廓锯齿的手段；背景与 CG 不挑这个。
			...(spec.kind === 'sprite' ? { minTier: '2K' as const } : {}),
			...(model ? { model } : {}),
			...(size ? { size } : {}),
		});
		this.assertCanvas(spec, generated.data);

		// 立绘抠底成透明 PNG，同时把抠底前那张原片一起收进草稿——留底是抠底参数唯一的后悔药
		// （见 `recut`），入库时跟着搬进 media-cache/sprite-sources/。
		const cut = spec.kind === 'sprite' ? await cutout(generated.data, resolveTuning(this.opts.tuning)) : null;
		return this.writeDraft(spec, full, generated.data, cut);
	}

	/**
	 * 出图并**入库**：`draft` + `commit` 的组合。剧作家的缺图补位走这条——那边的图一出来就是
	 * 要用的，没有「挑候选」这一步。
	 *
	 * 与 `draft` 的两处不同：进来先 `ensureNeutral`（差分的定妆照缺了就顺手补一张），
	 * 同一最终目标的并发只跑一次（`inflight`；`draft` 不去重——同一目标并发出三张候选正是它要的）。
	 */
	async generate(target: AssetTarget, prompt: string, opts: { description?: string } = {}): Promise<GeneratedAsset> {
		const spec = await this.resolve(target);
		// 去重键带剧目根：去重表是**模块级**的（工具每次调用现建 PlayAssets，挂在实例上等于没挂）。
		const key = `${this.dir}\u0000${spec.kindPath}/${spec.stem}`;
		const running = generationInflight.get(key);
		if (running) return running;
		const job = (async (): Promise<GeneratedAsset> => {
			const auto = await this.ensureNeutral(spec, prompt);
			const draft = await this.draft(target, prompt);
			const committed = await this.commit(draft.draftId);
			if (opts.description?.trim()) await this.declareDescription(spec, opts.description.trim());
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
	 * **通用出图**：只把 prompt 变成一张候选图，不绑任何剧目目标（背景 / 立绘 / 差分），
	 * 也不做色键底、身份锁、自动补 neutral 这些剧目后缀——图落在候选区，等 `register` 入库。
	 *
	 * `generate_image` 走这条路；`register` 也用它登记「用别的模型 / 工具出的图」。
	 */
	async createGeneric(
		prompt: string,
		opts: { references?: string[]; aspectRatio?: ImageAspect; size?: string; model?: string } = {},
	): Promise<DraftedAsset> {
		const backend = this.imageBackend();
		const aspect = opts.aspectRatio ?? '16:9';
		const references = await this.referencesGeneric(opts.references);
		const full = references.length > 0 ? `${prompt.trim()}. ${genericReferenceSuffix(references)}` : prompt.trim();
		const play = loadPlaySync(this.dir)?.config.image;
		const model = opts.model?.trim() || play?.model;
		const size = opts.size?.trim() || play?.size;
		const generated = await backend.generate({
			prompt: full,
			aspectRatio: aspect,
			...(references.length > 0 ? { references: references.map(({ mimeType, data }) => ({ mimeType, data })) } : {}),
			...(model ? { model } : {}),
			...(size ? { size } : {}),
		});
		const draftId = randomUUID();
		const dir = this.draftDir(draftId);
		await mkdir(dir, { recursive: true });
		const imageExt = extOf(mimeOfBuffer(generated.data));
		await writeFile(join(dir, `image${imageExt}`), generated.data);
		const record: DraftRecord = {
			draftId,
			aspect,
			prompt: full,
			imageExt,
			createdAt: new Date().toISOString(),
		};
		await writeFile(join(dir, 'draft.json'), `${JSON.stringify(record, null, 2)}\n`);
		await this.pruneDrafts();
		const rel = join('media-cache', 'drafts', draftId, `image${imageExt}`);
		return { draftId, path: rel.split(/[\\/]/).join('/'), absPath: join(dir, `image${imageExt}`), aspect };
	}

	/**
	 * 这个目标在剧目里已经有素材了吗。
	 *
	 * 剧作家出图前的守卫：出图会**覆盖同名文件**，模型忘了一次核对就把用户刚验收过的图顶掉，
	 * 还白烧一份配额。同目标的并发在 `generate` 里另有 `inflight` 兜底，这里挡的是「上一轮出过」。
	 */
	async exists(target: AssetTarget): Promise<boolean> {
		const spec = await this.resolve(target);
		return this.existing(spec.kindPath, spec.stem);
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
	private async ensureNeutral(spec: AssetSpec, prompt: string): Promise<GeneratedAsset | null> {
		if (spec.kind !== 'sprite' || spec.variant === NEUTRAL) return null;
		if (await this.existing(spec.kindPath, NEUTRAL)) return null;
		const others = await this.spriteStems(spec.spriteId!);
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
		return this.generate(
			{
				kind: 'sprite',
				spriteId: spec.spriteId,
				variant: NEUTRAL,
				framing,
				...(spec.stature ? { stature: spec.stature } : {}),
				...(spec.title ? { title: spec.title } : {}),
			},
			`${NEUTRAL_LEAD[framing]} ${prompt}`,
		);
	}

	/** 该主体立绘目录里已有的差分名（用来判「一个差分都没有」）。 */
	private async spriteStems(spriteId: string): Promise<string[]> {
		const dir = join(this.dir, 'assets', 'sprites', spriteId);
		if (!existsSync(dir)) return [];
		return (await readdir(dir))
			.filter((file) => IMAGE_FILE.test(file))
			.map((file) => file.replace(/\.\w+$/, ''))
			.sort((a, b) => a.localeCompare(b));
	}


	/**
	 * 把一张草稿正式入库：写 `assets/`、补素材表声明、记生图台账、把留底原片搬进
	 * `media-cache/sprite-sources/`。
	 *
	 * 落位就用**草稿出图时的意图**，所以这里只要一个 draftId——候选之间的差别在画面不在身份。
	 * 同一张草稿重复入库只是把同一个文件再写一遍，幂等。
	 */
	async commit(draftId: string): Promise<GeneratedAsset> {
		const draft = await this.loadDraft(draftId);
		const spec = await this.resolve({
			kind: draft.kind!,
			name: draft.name,
			spriteId: draft.spriteId,
			variant: draft.variant,
			framing: draft.framing,
			stature: draft.stature,
			title: draft.title,
		});
		const dir = this.draftDir(draftId);
		const bytes = await readFile(join(dir, `image${draft.imageExt}`));
		let sourcePath: string | undefined;
		if (spec.kind === 'sprite' && draft.sourceExt) {
			await this.keepSource(spec, await readFile(join(dir, `source${draft.sourceExt}`)), draft.sourceExt);
			sourcePath = `media-cache/sprite-sources/${spec.spriteId}/${spec.stem}${draft.sourceExt}`;
		}
		const written = await this.persist(spec, bytes, draft.imageExt);
		if (spec.kind === 'sprite') await this.declareSprite(spec);
		await this.recordPrompt(spec, written.path, draft.prompt);
		await this.markCommitted(draftId, draft);
		return sourcePath ? { ...written, sourcePath } : written;
	}

	/**
	 * 抠底：把一张**纯色底**图变成透明 PNG，写到 `output`（不给就写到候选区），返回输出路径。
	 *
	 * 纯图像处理，**只写输出、不改源图**，也不是素材登记的必经步骤——背景 / 插图直接 `register` 即可；
	 * 立绘先 `cut`、再 `register` 那张透明 PNG。`opts.tuning` 之外可传一次性调参。
	 */
	async cutFile(
		source: string,
		output: string | undefined,
		tuning?: Partial<CutoutTuning>,
	): Promise<{ path: string; absPath: string; cutout: { coverage: number; figureHeight: number } }> {
		const src = source.trim();
		if (src === '') throw new Error('cut 要 source（一张纯色底图的路径）');
		const abs = resolveInPlay(this.dir, src);
		if (!abs) throw new Error(`cut 的 source 路径越界：${src}（只能给剧目内的相对路径）`);
		if (!existsSync(abs)) throw new Error(`cut 的 source 找不到：${src}`);
		const cut = await cutout(await readFile(abs), resolveTuning({ ...this.opts.tuning, ...tuning }));

		const outAbs = output?.trim()
			? (resolveInPlay(this.dir, output) as string | null)
			: join(this.draftDir(randomUUID()), 'cut.png');
		if (!outAbs) throw new Error(`cut 的 output 路径越界：${output}（只能给剧目内的相对路径）`);
		await mkdir(dirname(outAbs), { recursive: true });
		await writeFile(outAbs, cut.data);
		return {
			path: relative(this.dir, outAbs).split(/[\\/]/).join('/'),
			absPath: outAbs,
			cutout: { coverage: cut.coverage, figureHeight: cut.figureHeight },
		};
	}

	/**
	 * 把一张图**登记**成剧目素材（不抠底）：写 `assets/`、补素材表（呈现声明 + 描述）、记台账。
	 *
	 * - `source`：剧目内相对路径 / http(s) 网址。立绘应给**已抠好的透明 PNG**（外部来源想自动抠底，
	 *   先调 `cut`）。
	 * - `target`：落位（kind + 主体/差分/取景体量），**始终显式给**——登记这一步不认识「出图意图」。
	 * - `opts.original`：立绘的**抠底前原片**路径；给了就留底到 `media-cache/sprite-sources/`，
	 *   日后可 `cut` 重抠（不给则不保证可重抠）。
	 */
	async register(
		source: string,
		target: AssetTarget,
		opts: { description?: string; prompt?: string; original?: string } = {},
	): Promise<GeneratedAsset> {
		const src = source.trim();
		if (src === '') throw new Error('import_asset 要 source（剧目内相对路径 / http(s) 网址）');
		const spec = await this.resolve(target);

		let image: Buffer;
		if (/^https?:\/\//i.test(src)) {
			image = (await fetchWebImage(src)).data;
		} else {
			const abs = resolveInPlay(this.dir, src);
			if (!abs) throw new Error(`source 路径越界：${src}（只能给剧目内相对路径或 http(s) 网址）`);
			if (!existsSync(abs)) throw new Error(`source 找不到：${src}（剧目里没有这个文件）`);
			image = await readFile(abs);
		}

		let sourcePath: string | undefined;
		if (opts.original?.trim()) {
			const oAbs = resolveInPlay(this.dir, opts.original.trim());
			if (!oAbs) throw new Error(`original 路径越界：${opts.original}`);
			if (!existsSync(oAbs)) throw new Error(`original 找不到：${opts.original}`);
			const raw = await readFile(oAbs);
			const srcExt = extOf(mimeOfBuffer(raw));
			await this.keepSource(spec, raw, srcExt);
			sourcePath = `media-cache/sprite-sources/${spec.spriteId}/${spec.stem}${srcExt}`;
		}

		const written = await this.persist(spec, image, spec.kind === 'sprite' ? '.png' : extOf(mimeOfBuffer(image)));
		if (spec.kind === 'sprite') await this.declareSprite(spec);
		if (opts.description?.trim()) await this.declareDescription(spec, opts.description.trim());
		await this.recordPrompt(spec, written.path, (opts.prompt ?? '').trim());
		return sourcePath ? { ...written, sourcePath } : written;
	}

	/* ── 音频 ─────────────────────────────────────────────────────────────── */

	/**
	 * 生成一首 BGM 并落库（`assets/bgm/<name>.m4a` + 素材表一条 + 台账一条）。
	 *
	 * **同步等待**（一首 ~175s 的曲子实测 84s）：AIVN 那边靠到货广播让人不必干等，插件没有
	 * 回合之外的注入通道，同步等待至少保证回执说的是真话。
	 */
	async generateBgm(name: string, prompt: string, meta: { model?: string } = {}): Promise<GeneratedAsset> {
		const backend = this.opts.music;
		if (!backend) throw new Error('没有配音乐后端（music.baseUrl / music.model），出不了 BGM');
		const stem = assertStem(name, '音乐 id');
		const music = await backend.generate({ prompt, ...(meta.model ? { model: meta.model } : {}) });
		const kindPath = 'bgm';
		const relDir = join('assets', kindPath);
		await mkdir(join(this.dir, relDir), { recursive: true });
		const file = `${stem}${music.ext}`;
		const abs = join(this.dir, relDir, file);
		const replaced = existsSync(abs);
		await writeFile(abs, music.bytes);
		const path = `${kindPath}/${file}`;
		await this.withManifest((current) => ({
			...current,
			[stem]: { ...current[stem], source: 'AI 生成（本插件）' },
		}));
		await this.recordLedger(stem, { kind: 'bgm', path: `assets/${path}`, prompt, createdAt: new Date().toISOString() });
		return { kind: 'bgm', path: `assets/${path}`, absPath: abs, replaced };
	}

	/* ── 内部：规格解析 ───────────────────────────────────────────────────── */

	/** 把「要一张什么图」解析成落盘规格（目录、文件名主体、画幅、垫图基准）。 */
	private async resolve(target: AssetTarget): Promise<AssetSpec> {
		if (target.kind === 'sprite') {
			const spriteId = target.spriteId?.trim() ?? '';
			if (spriteId === '') throw new Error('立绘要 spriteId（主体 id，就是 assets/sprites/<id>/ 的目录名）');
			const stem = assertStem(spriteId, '主体 id');
			const variant = (target.variant?.trim() || NEUTRAL);
			const manifest = readManifest(this.dir);
			const level = manifest[stem] ?? {};
			// 差分级声明盖过立绘级：一套里另有一条 closeup 时要认它，否则那条覆盖键白写。
			const declared = { ...level, ...manifest[`${stem}/${variant}`] };
			const framing = pickFraming(target.framing, declared.framing, `${stem} 的立绘取景`);
			const stature = pickStature(target.stature, declared.stature, `${stem} 的立绘体量`);
			return {
				kind: 'sprite',
				kindPath: `sprites/${stem}`,
				stem: assertStem(variant, '差分名'),
				aspect: SPRITE_FRAMING_ASPECT[framing] as ImageAspect,
				spriteId: stem,
				variant,
				framing,
				baseFraming: framingOf(level.framing) ?? DEFAULT_SPRITE_FRAMING,
				stature,
				...(target.title?.trim() ? { title: target.title.trim() } : {}),
			};
		}
		const name = target.name?.trim() ?? '';
		if (name === '') throw new Error('背景与插图要 name（素材 id，也就是文件名主体）');
		return {
			kind: target.kind,
			kindPath: target.kind === 'background' ? 'backgrounds' : 'cg',
			stem: assertStem(name, '素材 id'),
			aspect: '16:9',
		};
	}

	/**
	 * 解析垫图，每一项可以是三态：
	 *
	 * 1. **主体 id**（`lin` / `mecha`）——有立绘就垫，不要求有角色卡；顺带把它的**显示名**带上
	 *    （角色卡的 `name`，没有卡就用素材表标题，再没有就用 id 本身），提示词里的编号锚点要用；
	 * 2. **剧目内相对路径**（`assets/backgrounds/ref.png`）——没有名字；
	 * 3. **http(s) 网址**——现下到内存里（不落盘：它只是这一次出图的输入），同样没有名字。
	 *
	 * 立绘的基准是**隐式**的：非 neutral 的差分一律拿已入库的 neutral 垫图（身份的唯一来源），
	 * 显式 references 在 `draft` 里已被拒。
	 */
	private async references(spec: AssetSpec, explicit: string[] | undefined): Promise<ResolvedReference[]> {
		const wanted = [...(explicit ?? [])];
		if (spec.kind === 'sprite' && spec.variant !== NEUTRAL) wanted.unshift(spec.spriteId!);
		return this.resolveReferences(wanted);
	}

	/** 通用出图的垫图：只认显式给的（路径 / 网址 / 主体 id），不吃「差分自动垫 neutral」。 */
	private async referencesGeneric(explicit: string[] | undefined): Promise<ResolvedReference[]> {
		return this.resolveReferences([...(explicit ?? [])]);
	}

	private async resolveReferences(wanted: string[]): Promise<ResolvedReference[]> {
		if (wanted.length > MAX_REFERENCES) {
			throw new Error(`垫图最多 ${MAX_REFERENCES} 张，这次给了 ${wanted.length} 张`);
		}
		const names = characterNames(this.dir);
		const manifest = readManifest(this.dir);
		const out: ResolvedReference[] = [];
		for (const ref of wanted) {
			if (/^https?:\/\//i.test(ref)) {
				out.push({ ...(await fetchWebImage(ref)), name: null });
				continue;
			}
			if (/[/.]/.test(ref)) {
				// 路径一律过剧目内解析：`../` 与绝对路径直接拒（垫图会把文件内容发给生图后端，
				// 这是一条**读**出工作区的口子，不能用裸 join）。
				const abs = resolveInPlay(this.dir, ref);
				if (!abs) throw new Error(`垫图路径越界：${ref}（只能给剧目内的相对路径或 http(s) 网址）`);
				if (!existsSync(abs)) throw new Error(`垫图找不到：${ref}（剧目里没有这个文件）`);
				out.push({ mimeType: mimeOf(abs), data: await readFile(abs), name: null });
				continue;
			}
			const abs = resolveInPlay(this.dir, await this.neutralOf(ref));
			if (!abs) throw new Error(`垫图路径越界：${ref}`);
			out.push({
				mimeType: mimeOf(abs),
				data: await readFile(abs),
				name: names.get(ref) ?? manifest[ref]?.title ?? ref,
			});
		}
		return out;
	}

	/** 某个主体已入库的 neutral 立绘（剧目内相对路径）。 */
	private async neutralOf(spriteId: string): Promise<string> {
		const stem = assertStem(spriteId, '主体 id');
		const dir = join(this.dir, 'assets', 'sprites', stem);
		if (!existsSync(dir)) throw new Error(`垫图找不到：${stem} 还没有立绘目录（assets/sprites/${stem}/）`);
		const hit = (await readdir(dir)).find((file) => file.replace(/\.\w+$/, '') === NEUTRAL);
		if (!hit) throw new Error(`垫图找不到：${stem} 还没有入库的 ${NEUTRAL} 定妆照`);
		return join('assets', 'sprites', stem, hit);
	}

	/* ── 内部：落盘 ───────────────────────────────────────────────────────── */

	/** 落一张草稿：成图 + （立绘的）抠底前原片 + `draft.json`（出图意图）；顺手清过期草稿。 */
	private async writeDraft(
		spec: AssetSpec,
		prompt: string,
		raw: Buffer,
		cut: CutoutResult | null,
	): Promise<DraftedAsset> {
		const draftId = randomUUID();
		const dir = this.draftDir(draftId);
		await mkdir(dir, { recursive: true });
		const imageExt = cut ? '.png' : extOf(mimeOfBuffer(raw));
		const sourceExt = cut ? extOf(mimeOfBuffer(raw)) : undefined;
		const image = cut ? cut.data : raw;
		await writeFile(join(dir, `image${imageExt}`), image);
		if (sourceExt) await writeFile(join(dir, `source${sourceExt}`), raw);
		const record: DraftRecord = {
			draftId,
			kind: spec.kind,
			...intentOf(spec),
			aspect: spec.aspect,
			prompt,
			imageExt,
			...(sourceExt ? { sourceExt } : {}),
			createdAt: new Date().toISOString(),
		};
		await writeFile(join(dir, 'draft.json'), `${JSON.stringify(record, null, 2)}\n`);
		await this.pruneDrafts();
		const rel = join('media-cache', 'drafts', draftId, `image${imageExt}`);
		return {
			draftId,
			kind: spec.kind,
			path: rel.split(/[\\/]/).join('/'),
			absPath: join(dir, `image${imageExt}`),
			aspect: spec.aspect,
			...(cut ? { cutout: { coverage: cut.coverage, figureHeight: cut.figureHeight } } : {}),
		};
	}

	/** 写进 `assets/`：同名旧扩展名的文件先删（换后端后 jpg/png 会互相残留）。 */
	private async persist(spec: AssetSpec, bytes: Buffer, ext: string): Promise<GeneratedAsset> {
		const dir = join(this.dir, 'assets', spec.kindPath);
		await mkdir(dir, { recursive: true });
		const file = `${spec.stem}${ext}`;
		const replaced = await this.existing(spec.kindPath, spec.stem);
		for (const entry of await readdir(dir).catch(() => [] as string[])) {
			if (entry !== file && entry.replace(/\.\w+$/, '') === spec.stem) {
				await rm(join(dir, entry), { force: true });
			}
		}
		const abs = join(dir, file);
		const tmp = `${abs}.${randomUUID().slice(0, 8)}.tmp`;
		await writeFile(tmp, bytes);
		await rename(tmp, abs);
		const path = `${spec.kindPath}/${file}`;
		return { kind: spec.kind, path: `assets/${path}`, absPath: abs, replaced };
	}

	/** 抠底前原片留一份：重抠时从 `media-cache/sprite-sources/<主体>/` 取原图。 */
	private async keepSource(spec: AssetSpec, data: Buffer, ext: string): Promise<void> {
		if (!spec.spriteId) return;
		const dir = join(this.dir, 'media-cache', 'sprite-sources', spec.spriteId);
		await mkdir(dir, { recursive: true });
		for (const entry of await readdir(dir).catch(() => [] as string[])) {
			if (entry !== `${spec.stem}${ext}` && entry.replace(/\.\w+$/, '') === spec.stem) {
				await rm(join(dir, entry), { force: true });
			}
		}
		await writeFile(join(dir, `${spec.stem}${ext}`), data);
	}

	/** 素材表里的呈现声明：立绘级（framing/stature/title）+ 差分级的画幅覆盖。 */
	private async declareSprite(spec: AssetSpec): Promise<void> {
		if (!spec.spriteId) return;
		const key = spec.spriteId;
		await this.withManifest((current) => {
			const level = current[key] ?? {};
			// 立绘级取景以**定妆照**那一次为准：它是所有差分的垫图基准，一条 closeup 不该把基准带跑。
			// 差分的取景写在自己的键上（下面那条覆盖），差多少写多少。
			const neutral = spec.variant === NEUTRAL;
			const next: Record<string, AssetMeta> = {
				...current,
				[key]: {
					...level,
					...(spec.title ? { title: spec.title } : {}),
					...(neutral && spec.framing ? { framing: spec.framing } : {}),
					...(neutral && spec.stature ? { stature: spec.stature } : {}),
				},
			};
			// 差分与立绘级取景不同才写一条覆盖（否则键位重复、以后改一处忘另一处）。
			if (!neutral && spec.framing && spec.framing !== level.framing) {
				const variantKey = `${spec.spriteId}/${spec.variant}`;
				next[variantKey] = { ...next[variantKey], framing: spec.framing };
			}
			return next;
		});
	}

	/** 素材表里的一句话画面描述：剧作家挑素材全靠它。立绘落到 `<主体>/<差分>` 键上。 */
	private async declareDescription(spec: AssetSpec, description: string): Promise<void> {
		const key = spec.kind === 'sprite' ? `${spec.spriteId}/${spec.variant}` : spec.stem;
		await this.withManifest((current) => ({ ...current, [key]: { ...current[key], description } }));
	}

	/** 台账：这张图当初用什么描述出的（`assets/generated.json`，只增条目不覆盖别人的键）。 */
	private async recordPrompt(spec: AssetSpec, path: string, prompt: string): Promise<void> {
		const id = spec.variant ? `${spec.spriteId}/${spec.variant}` : spec.stem;
		await this.recordLedger(id, {
			kind: spec.kind,
			path,
			prompt,
			createdAt: new Date().toISOString(),
		});
	}

	private async recordLedger(id: string, entry: LedgerEntry): Promise<void> {
		const file = join(this.dir, 'assets', 'generated.json');
		await withFileLock(file, async () => {
			const table = await readJson<Record<string, LedgerEntry>>(file, {});
			table[id] = entry;
			await writeAtomic(file, `${JSON.stringify(table, null, 2)}\n`);
		});
	}

	/**
	 * 素材表的读-改-写，整段串行。
	 *
	 * 串行的是**文件**而不是这个类：工具是并发调用的（同一批里出三张候选、接着入库），
	 * 而每次调用现建一个 `PlayAssets`，所以锁必须挂在文件路径上——各建各的实例，各锁各的就等于没锁。
	 * 锁内只做「读盘 → 合并 → 原子替换」，不与出图/抠底那些秒级操作共享临界区。
	 */
	private async withManifest(mutate: (current: Record<string, AssetMeta>) => Record<string, AssetMeta>): Promise<void> {
		const file = join(this.dir, 'assets', 'manifest.json');
		await withFileLock(file, async () => {
			await writeAtomic(file, `${JSON.stringify(mutate(readManifest(this.dir)), null, 2)}\n`);
		});
	}

	private async existing(kindPath: string, stem: string): Promise<boolean> {
		const dir = join(this.dir, 'assets', kindPath);
		if (!existsSync(dir)) return false;
		return (await readdir(dir)).some((file) => file.replace(/\.\w+$/, '') === stem);
	}

	/** 草稿目录（绝对路径）。 */
	private draftDir(draftId: string): string {
		return join(this.dir, 'media-cache', 'drafts', draftId);
	}

	private async loadDraft(draftId: string): Promise<DraftRecord> {
		const id = draftId.trim();
		if (!/^[\w-]{1,64}$/.test(id)) throw new Error(`草稿 id「${draftId}」非法`);
		const file = join(this.draftDir(id), 'draft.json');
		if (!existsSync(file)) {
			throw new Error(`找不到草稿 ${id}：它可能已被清理（草稿留 7 天），或者 id 记错了——重新出一次图。`);
		}
		return JSON.parse(await readFile(file, 'utf8')) as DraftRecord;
	}

	/** 入库留痕（best-effort）：草稿目录迟早会被清理，这一笔只为当下看得出「已经采用过」。 */
	private async markCommitted(draftId: string, draft: DraftRecord): Promise<void> {
		try {
			const file = join(this.draftDir(draftId), 'draft.json');
			await writeFile(file, `${JSON.stringify({ ...draft, committedAt: new Date().toISOString() }, null, 2)}\n`);
		} catch {
			// 素材已经落好了，为一条留痕报错不值
		}
	}

	/** 清掉过期草稿：超过 `DRAFT_TTL_MS` 没动过的整份目录删掉。删不掉就算了，不打断出图。 */
	private async pruneDrafts(): Promise<void> {
		const root = join(this.dir, 'media-cache', 'drafts');
		if (!existsSync(root)) return;
		const cutoff = Date.now() - DRAFT_TTL_MS;
		try {
			for (const entry of await readdir(root, { withFileTypes: true })) {
				if (!entry.isDirectory()) continue;
				const dir = join(root, entry.name);
				try {
					if ((await stat(dir)).mtimeMs < cutoff) await rm(dir, { recursive: true, force: true });
				} catch {
					// 单份草稿删不掉不该影响这次出图
				}
			}
		} catch {
			// 草稿区列不出来同理
		}
	}

	/**
	 * 画幅自校验：上游不认的画幅**不一定报错**（flow2api 实测静默回一张横图），所以落盘前
	 * 按字节里的真实尺寸对一次账——对不上就报错，不落一张方向错的图。
	 * 认不出尺寸的格式（罕见的 JPEG 变体）放过。
	 */
	private assertCanvas(spec: AssetSpec, data: Buffer): void {
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
}

/* ── 小工具 ─────────────────────────────────────────────────────────────── */

/**
 * 提示词后缀：真正发出去的图才算数（`sent` 就是这一次垫了几张）。
 *
 * 三段分工照 AIVN `playAssets.ts` 的 `suffixFor`：
 * - **立绘**：定妆照走 `neutralSuffix`（构图 + 色键底），带垫图时加一句「就是参考图里那个人」；
 *   差分走 `identitySuffix`（身份锁 + 景别 + 状态）；
 * - **背景 / CG**：垫了图就点明「第几张是谁」——图本身没有名字，模型只看到「第一张、第二张」。
 *   不点明，多人 CG 就会各画各的，而且是**看起来完全正常**地画错：不报错、图也好看，
 *   只是七濑长成了澪。
 */
function suffixFor(spec: AssetSpec, prompt: string, sent: ResolvedReference[]): string {
	if (spec.kind !== 'sprite') {
		if (sent.length === 0) return prompt;
		return sent.every((ref) => ref.name !== null)
			? `${prompt}. ${referenceSuffix(sent.map((ref) => ref.name!))}`
			: `${prompt}. ${genericReferenceSuffix(sent)}`;
	}
	if (spec.variant === NEUTRAL) {
		const base = `${prompt}, ${neutralSuffix(spec.framing)}`;
		// 定妆照垫的是**外部**图（用户给的既有角色图、原画）：底色与画风归构图段管，这一句只补身份。
		return sent.length > 0 ? `${base} ${neutralReferenceTail(spec.framing)}` : base;
	}
	return `${prompt}. ${identitySuffix(spec.framing)}`;
}

/**
 * 参考图后缀：每一项按数组顺序编号，名字取自角色卡（没写名字就退回 id）。
 *
 * 非可省：垫图是按 `references` 的顺序一个个塞成 inlineData 的，模型看到的就是「第一张、第二张」。
 */
function referenceSuffix(names: string[]): string {
	const roster = names.map((name, i) => `${i + 1}) ${name}`).join(', ');
	return (
		`The attached reference images are, in this exact order: ${roster}. ` +
		'Keep each of them recognisably that same person — identical face, hairstyle, hair color, ' +
		'eye color and outfit — while placing them in the new scene. Do not merge them into one person.'
	);
}

/** 有路径 / 网址这类没有名字的垫图时用它：能报名字的报名字，剩下的叫「reference image」。 */
function genericReferenceSuffix(refs: ResolvedReference[]): string {
	if (!refs.some((ref) => ref.name)) {
		return (
			'Follow the attached reference image(s) for visual appearance, design details, ' +
			'color palette and overall aesthetic while rendering the described scene.'
		);
	}
	const roster = refs.map((ref, i) => `${i + 1}) ${ref.name ?? 'reference image'}`).join(', ');
	return (
		`The attached reference images are, in this exact order: ${roster}. ` +
		'Maintain consistent visual appearance, character identity, hairstyle, facial features, and design elements ' +
		'as depicted in the corresponding reference images while adapting them to the scene.'
	);
}

/** 定妆照的参考图尾注（垫的是外部图，不是自家 neutral）。 */
function neutralReferenceTail(framing: SpriteFraming | undefined): string {
	if ((framing ?? DEFAULT_SPRITE_FRAMING) === 'square') {
		return 'Based on the attached reference image: the same subject with identical colors, markings and features.';
	}
	return (
		'Based on the attached reference image: the same character — identical face, hairstyle, hair color, ' +
		'eye color and outfit — redrawn in the pose and framing described above.'
	);
}

/**
 * 主体为人（full/half）时的后缀：景别措辞 + 人形留白 + 画风与色键底。
 *
 * 开头必须是 `SPRITE_FRAMING_SHOT` 而不是写死的 "full body"：取景是半身的角色照样会被画成全身，
 * 出图与舞台声明对不上，站位又得重新量。`framing` 自己决定的是画幅（像素）与舞台摆位（CSS），
 * 两者都传不进提示词——模型唯一能知道「画到哪儿」的通道就是措辞。
 */
function humanSuffix(framing: SpriteFraming | undefined): string {
	return `${SPRITE_FRAMING_SHOT[framing ?? DEFAULT_SPRITE_FRAMING]}${POSE_TAIL}${STYLE_TAIL}${KEY_BACKGROUND}`;
}

/** 定妆照后缀：`square` 是非人主体的唯一入口，人形与非人的差别只有留白那两句。 */
function neutralSuffix(framing: SpriteFraming | undefined): string {
	const f = framing ?? DEFAULT_SPRITE_FRAMING;
	return f === 'square'
		? `${SPRITE_FRAMING_SHOT[f]}${PROP_TAIL}${STYLE_TAIL}${KEY_BACKGROUND}`
		: humanSuffix(f);
}

/**
 * 差分后缀：身份锁 + 景别（+ 非人的留白）+ 画风。
 *
 * 差分也要点明景别：垫图（neutral 定妆照）是全身时，模型很容易照着垫图把一条半身差分
 * 也画成全身。
 */
function identitySuffix(framing: SpriteFraming | undefined): string {
	const f = framing ?? DEFAULT_SPRITE_FRAMING;
	const lead = f === 'square' ? PROP_IDENTITY : HUMAN_IDENTITY;
	return `${lead} ${SPRITE_FRAMING_SHOT[f]}. ${f === 'square' ? `${PROP_TAIL}. ` : ''}${IDENTITY_TAIL}`;
}

/** 草稿里要记下的那点「身份」（入库时按它落位）。 */
function intentOf(spec: AssetSpec): Partial<DraftRecord> {
	if (spec.kind === 'sprite') {
		return {
			spriteId: spec.spriteId,
			variant: spec.variant,
			...(spec.framing ? { framing: spec.framing } : {}),
			...(spec.stature ? { stature: spec.stature } : {}),
			...(spec.title ? { title: spec.title } : {}),
		};
	}
	return { name: spec.stem };
}

function pickFraming(value: unknown, declared: unknown, label: string): SpriteFraming {
	if (value !== undefined && !isSpriteFraming(value)) throw new Error(`${label}「${String(value)}」非法`);
	const fromDeclared = framingOf(declared);
	return (value as SpriteFraming | undefined) ?? fromDeclared ?? DEFAULT_SPRITE_FRAMING;
}

function pickStature(value: unknown, declared: unknown, label: string): SpriteStature {
	if (value !== undefined && !isSpriteStature(value)) throw new Error(`${label}「${String(value)}」非法`);
	const fromDeclared = statureOf(declared);
	return (value as SpriteStature | undefined) ?? fromDeclared ?? DEFAULT_SPRITE_STATURE;
}

/** 素材 id / 差分名的白名单（也就是文件名主体）：挡路径分隔符与前导点。 */
function assertStem(value: string, label: string): string {
	const stem = value.trim();
	if (!STEM_PATTERN.test(stem)) {
		throw new Error(`${label}「${value}」不合法：字母或数字开头，可含中文与 . _ -，不含路径分隔符`);
	}
	return stem;
}

function mimeOf(path: string): string {
	const ext = extname(path).toLowerCase();
	if (ext === '.png') return 'image/png';
	if (ext === '.webp') return 'image/webp';
	if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
	return 'application/octet-stream';
}

/** 从字节头部认 mime（草稿落盘用；后端给的 mimeType 可能缺失，认不出就当 JPEG）。 */
function mimeOfBuffer(data: Buffer): string {
	return sniffImageMime(data) ?? 'image/jpeg';
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
	try {
		return JSON.parse(await readFile(file, 'utf8')) as T;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return fallback;
		throw new Error(`${file} 不是合法 JSON：${error instanceof Error ? error.message : String(error)}`);
	}
}

/**
 * 同一份文件的读-改-写串行队列（按绝对路径，跨 `PlayAssets` 实例共享）。
 *
 * 键是文件路径：两次调用写的是同一个 `assets/manifest.json` 时就排队，写不同文件时互不等待。
 * 队列里抛错不能毒化后续任务——链上接的是「吞掉结果的 catch」，原始 Promise 照常把错误交回调用方。
 */
const fileLocks = new Map<string, Promise<unknown>>();

function withFileLock<T>(file: string, job: () => Promise<T>): Promise<T> {
	const prev = fileLocks.get(file) ?? Promise.resolve();
	const next = prev.then(job, job);
	// 队列里存的是「吞掉结果的版本」：一个任务的失败不该毒化后面排队的任务。
	const guard = next.then(
		() => {},
		() => {},
	);
	fileLocks.set(file, guard);
	void guard.then(() => {
		if (fileLocks.get(file) === guard) fileLocks.delete(file);
	});
	return next;
}

async function writeAtomic(file: string, body: string): Promise<void> {
	await mkdir(dirname(file), { recursive: true });
	const tmp = `${file}.${randomUUID().slice(0, 8)}.tmp`;
	await writeFile(tmp, body);
	await rename(tmp, file);
}

/** 按会话工作目录现建一个素材面：工具每次调用现建，不在模块里握任何全局状态。 */
export function playAssetsOf(dir: string, media: { image: ImageBackend | null; music: MusicBackend | null }): PlayAssets {
	return new PlayAssets({
		dir,
		...(media.image ? { image: media.image } : {}),
		...(media.music ? { music: media.music } : {}),
	});
}
