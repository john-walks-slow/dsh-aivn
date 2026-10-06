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
 * - **搭台助手两步**：`generate_image` 只产草稿（一次出几张候选、用户挑一张），挑中的才 `commit_asset`；
 * - **剧作家一步**：`generate()` = `draft` + `commit` 一次做完（那边的 id 是调用时就定下的，
 *   没有「让用户在候选里挑」这回事）。
 *
 * 抽成可注入的纯类（`dir` + 后端 + 调参），不在模块里握任何全局状态：插件按会话工作目录现建。
 */
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import {
	DEFAULT_SPRITE_FRAMING,
	DEFAULT_SPRITE_STATURE,
	framingOf,
	isSpriteFraming,
	isSpriteStature,
	statureOf,
	SPRITE_FRAMING_ASPECT,
	type AssetMeta,
	type SpriteFraming,
	type SpriteStature,
} from '@aivn/core';
import { readManifest, resolveInPlay } from '../assets';
import { cutout, resolveTuning, type CutoutResult, type CutoutTuning } from './cutout';
import { aspectMatches, extOf, sizeOfImage, type ImageAspect, type ImageBackend } from './image';
import type { MusicBackend } from './music';

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
/** 垫图张数上限（Gemini 3 系上限 14，这里按产品口径收到 6）。 */
const MAX_REFERENCES = 6;

/**
 * 立绘后缀：**只写与「主体是人还是物」无关的构图与画风约束**，不描述任何人物特征——
 * 这里的每个词都会被当成设定印进图里。
 *
 * 两段都是硬约束不是修饰词：`src/media/cutout.ts` 的全局色键抠底要求 2D 平涂 + 单一纯色底
 * （3D 渲染的渐变与投影会让底色散成一片灰），剪影连成一片才能分割人物与底色。
 */
const COMMON_TAIL =
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
 * 留在这里的是抠底真要的那条：手臂与躯干之间不能留窄缝（色键够不着那条缝，人会被拆成两块轮廓）。
 */
const POSE_TAIL =
	', arms either resting against the body or clearly separated from it, never with a narrow sliver of ' +
	'background trapped between them.';

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
	/** 垫图：主体 id（自动用它的 neutral 立绘）或剧目内相对路径。 */
	references?: string[];
	/** 本次出图的模型 / 尺寸覆盖（剧目级口子，不给跟部署配置）。 */
	model?: string;
	size?: string;
}

/** 一张草稿：图已经出好（立绘也抠好了底），但还没进 `assets/`。 */
export interface DraftedAsset {
	draftId: string;
	kind: AssetKind;
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
	cutout?: { coverage: number; figureHeight: number };
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
	stature?: SpriteStature;
	title?: string;
}

interface DraftRecord {
	draftId: string;
	kind: AssetKind;
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
	 * 脸锚定全套差分，事后换掉基准等于整套差分换人）。
	 */
	async draft(target: AssetTarget, prompt: string): Promise<DraftedAsset> {
		const backend = this.imageBackend();
		const spec = await this.resolve(target);
		if (spec.kind === 'sprite') {
			if (target.references?.length) {
				throw new Error(
					`立绘差分不吃显式垫图：身份基准恒为 ${spec.spriteId} 的 ${NEUTRAL} 定妆照` +
						'（换基准会与既有差分不是同一个人）。要换基准就重出定妆照。',
				);
			}
			if (spec.variant !== NEUTRAL && !(await this.existing(spec.kindPath, NEUTRAL))) {
				throw new Error(
					`${spec.spriteId} 还没有入库的 ${NEUTRAL} 定妆照：先出定妆照候选、挑一张用 commit_asset 采用，再派生差分。`,
				);
			}
		}
		const references = await this.references(spec, target.references);
		const full = spec.kind === 'sprite' ? prompt.trim() + spriteTail(spec) : prompt.trim();
		const model = target.model?.trim();
		const generated = await backend.generate({
			prompt: full,
			aspectRatio: spec.aspect,
			...(references.length > 0 ? { references } : {}),
			// 立绘要抠底，源图分辨率是唯一能压住轮廓锯齿的手段；背景与 CG 不挑这个。
			...(spec.kind === 'sprite' ? { minTier: '2K' as const } : {}),
			...(model ? { model } : {}),
			...(target.size ? { size: target.size } : {}),
		});
		this.assertCanvas(spec, generated.data);

		// 立绘抠底成透明 PNG，同时把抠底前那张原片一起收进草稿——留底是抠底参数唯一的后悔药
		// （见 `recut`），入库时跟着搬进 media-cache/sprite-sources/。
		const cut = spec.kind === 'sprite' ? await cutout(generated.data, resolveTuning(this.opts.tuning)) : null;
		return this.writeDraft(spec, full, generated.data, cut);
	}

	/**
	 * 出图并**入库**：`draft` + `commit` 的组合。
	 *
	 * 剧作家的缺图补位与素材页的手动生图走这条——那边的图一出来就是要用的，没有「挑候选」这一步。
	 * 同一最终目标的并发只跑一次（`inflight`）；`draft` 不去重——同一目标并发出三张候选正是它要的。
	 */
	async generate(target: AssetTarget, prompt: string): Promise<GeneratedAsset> {
		const spec = await this.resolve(target);
		const key = `${spec.kindPath}/${spec.stem}`;
		const running = this.inflight.get(key);
		if (running) return running;
		const job = this.draft(target, prompt).then((draft) => this.commit(draft.draftId));
		this.inflight.set(key, job);
		try {
			return await job;
		} finally {
			if (this.inflight.get(key) === job) this.inflight.delete(key);
		}
	}

	/** 同目标并发去重（只在这一层：草稿要的是「并发出三张」）。 */
	private readonly inflight = new Map<string, Promise<GeneratedAsset>>();

	/**
	 * 原地重抠立绘：拿抠底前留的原片重跑一遍抠底，覆盖 `assets/` 里那张透明 PNG。
	 *
	 * 只为「图挺好、抠得脏」而存在：这种没法靠重新出图解决（重画出来是另一张图，用户刚点头的
	 * 那张会被顶掉，还白烧一份配额）。没留底的（更早出的图、用户自己放的图）如实报错。
	 */
	async recut(target: AssetTarget, tuning?: Partial<CutoutTuning>): Promise<GeneratedAsset> {
		this.imageBackend();
		const spec = await this.resolve({ ...target, kind: 'sprite' });
		const source = await this.readSource(spec);
		const cut = await cutout(source.data, resolveTuning({ ...this.opts.tuning, ...tuning }));
		const written = await this.persist(spec, cut.data, '.png');
		// 重抠不产生新画面：台账里那条「当初用什么描述出的」不许动（AIVN 同口径：台账的写者
		// 只有出图与 BGM）。重抠的事实在工具回执里说，不进台账。
		return { ...written, cutout: { coverage: cut.coverage, figureHeight: cut.figureHeight } };
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
			kind: draft.kind,
			name: draft.name,
			spriteId: draft.spriteId,
			variant: draft.variant,
			framing: draft.framing,
			stature: draft.stature,
			title: draft.title,
		});
		const dir = this.draftDir(draftId);
		const bytes = await readFile(join(dir, `image${draft.imageExt}`));
		if (spec.kind === 'sprite' && draft.sourceExt) {
			await this.keepSource(spec, await readFile(join(dir, `source${draft.sourceExt}`)), draft.sourceExt);
		}
		const written = await this.persist(spec, bytes, draft.imageExt);
		if (spec.kind === 'sprite') await this.declareSprite(spec);
		await this.recordPrompt(spec, written.path, draft.prompt);
		await this.markCommitted(draftId, draft);
		return written;
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
			const declared = readManifest(this.dir)[stem] ?? {};
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
	 * 解析垫图：主体 id → 它的 neutral 立绘；其余当剧目内相对路径读。
	 *
	 * 立绘的基准是**隐式**的：非 neutral 的差分一律拿已入库的 neutral 垫图（身份的唯一来源），
	 * 显式 references 在 `draft` 里已被拒。
	 */
	private async references(
		spec: AssetSpec,
		explicit: string[] | undefined,
	): Promise<{ mimeType: string; data: Buffer }[]> {
		const wanted = [...(explicit ?? [])];
		if (spec.kind === 'sprite' && spec.variant !== NEUTRAL) wanted.unshift(spec.spriteId!);
		if (wanted.length > MAX_REFERENCES) {
			throw new Error(`垫图最多 ${MAX_REFERENCES} 张，这次给了 ${wanted.length} 张`);
		}
		const out: { mimeType: string; data: Buffer }[] = [];
		for (const ref of wanted) {
			const file = /[/.]/.test(ref) ? ref : await this.neutralOf(ref);
			// 路径一律过剧目内解析：`../` 与绝对路径直接拒（垫图会把文件内容发给生图后端，
			// 这是一条**读**出工作区的口子，不能用裸 join）。
			const abs = resolveInPlay(this.dir, file);
			if (!abs) throw new Error(`垫图路径越界：${ref}（只能给剧目内的相对路径）`);
			if (!existsSync(abs)) throw new Error(`垫图找不到：${ref}（剧目里没有这个文件）`);
			out.push({ mimeType: mimeOf(abs), data: await readFile(abs) });
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

	/** 抠底前原片留一份：`recut_sprite` 只认 `media-cache/sprite-sources/<主体>/`。 */
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

	/** 重抠的原片：先看引擎留的 `media-cache/sprite-sources/`（立绘只能从这里重抠）。 */
	private async readSource(spec: AssetSpec): Promise<{ data: Buffer; ext: string }> {
		const dir = join(this.dir, 'media-cache', 'sprite-sources', spec.spriteId!);
		const hit = existsSync(dir)
			? (await readdir(dir)).find((file) => file.replace(/\.\w+$/, '') === spec.stem)
			: undefined;
		if (!hit) {
			throw new Error(
				`没有 ${spec.spriteId}/${spec.stem} 的抠底前原片（media-cache/sprite-sources/）：` +
					'用户自己放的图与更早出的图没法重抠，只能重新出图。',
			);
		}
		return { data: await readFile(join(dir, hit)), ext: extname(hit) };
	}

	/** 素材表里的呈现声明：立绘级（framing/stature/title）+ 差分级的画幅覆盖。 */
	private async declareSprite(spec: AssetSpec): Promise<void> {
		if (!spec.spriteId) return;
		const key = spec.spriteId;
		await this.withManifest((current) => {
			const level = current[key] ?? {};
			const next: Record<string, AssetMeta> = {
				...current,
				[key]: {
					...level,
					...(spec.title ? { title: spec.title } : {}),
					...(spec.framing ? { framing: spec.framing } : {}),
					...(spec.stature ? { stature: spec.stature } : {}),
				},
			};
			// 差分与立绘级取景不同才写一条覆盖（否则键位重复、以后改一处忘另一处）。
			if (spec.variant && spec.variant !== NEUTRAL && spec.framing && spec.framing !== level.framing) {
				const variantKey = `${spec.spriteId}/${spec.variant}`;
				next[variantKey] = { ...next[variantKey], framing: spec.framing };
			}
			return next;
		});
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

/** 立绘提示词后缀：公共段 + 色键底（+ 人形取景时的留白约束）。 */
function spriteTail(spec: AssetSpec): string {
	const pose = spec.framing && spec.framing !== 'square' ? POSE_TAIL : '';
	return `${COMMON_TAIL}${KEY_BACKGROUND}${pose}`;
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

/** 从字节头部认 mime（草稿落盘用；后端给的 mimeType 可能缺失）。 */
function mimeOfBuffer(data: Buffer): string {
	if (data.length > 8 && data.readUInt32BE(0) === 0x89504e47) return 'image/png';
	if (data.length > 12 && data.subarray(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
	return 'image/jpeg';
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
