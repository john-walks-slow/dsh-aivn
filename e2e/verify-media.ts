/**
 * 素材生成链路的离线套件（`npm run e2e:media`）。
 *
 * 生图/音乐后端是**桩**（返回真实 PNG / M4A 字节），抠底是真的（真 sharp），
 * 所以断言的是插件自己那一段：草稿 → 入库 → 台账/素材表 → 留底 → 重抠 → BGM 落库，
 * 外加「画幅不符不落盘」「没有 neutral 出不了差分」这两条负例。
 *
 * 为什么不上真后端：真出图烧配额且不可控（本机 flow2api 的网关侧 2026-10-06 起
 * `Flow frontend RPC rejected: rpc=ogiZ0b, code=[5]`，真出图那条验收见需求文档的 validation）。
 * 桩回来的是**真实字节**，走的是与真后端完全相同的落盘路径。
 */
import { existsSync, rmSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { SPRITE_FRAMING_SHOT } from '@aivn/core';
import { PlayAssets } from '../src/media/assets';
import { cutout } from '../src/media/cutout';
import { PLAYWRITER_PROMPT, playwriterTail } from '../src/playwriter/prompt';
import { readPlayReadiness } from '../src/play/readiness';
import { stagehandPrompt } from '../src/stagehand/prompt';
import { TOOL_CATALOG } from '../src/tool-catalog';
import type { GeneratedImage, ImageBackend, ImageRequest } from '../src/media/image';
import type { GeneratedMusic, MusicBackend } from '../src/media/music';

const results: Array<{ id: string; ok: boolean; label: string }> = [];
function check(id: string, ok: boolean, label: string): void {
	results.push({ id, ok, label });
	console.log(`${ok ? '✓' : '✗'} ${id} ${label}`);
}

/** 一张纯绿底 + 深色人形的图：够抠底用（覆盖率落在 2%–97% 之间）。 */
async function keyedSprite(width = 1080, height = 1920): Promise<Buffer> {
	const body = Buffer.from(
		`<svg width="${width}" height="${height}">
			<rect width="100%" height="100%" fill="#00FF00"/>
			<circle cx="${width / 2}" cy="${height * 0.28}" r="${width * 0.13}" fill="#2b2f4a"/>
			<rect x="${width * 0.35}" y="${height * 0.38}" width="${width * 0.3}" height="${height * 0.42}" rx="${width * 0.06}" fill="#2b2f4a"/>
			<rect x="${width * 0.3}" y="${height * 0.78}" width="${width * 0.4}" height="${height * 0.06}" rx="${width * 0.02}" fill="#1b1e30"/>
		</svg>`,
	);
	return sharp(body).png().toBuffer();
}

/** 一张横构图（16:9）的图。 */
async function landscape(width = 1920, height = 1080): Promise<Buffer> {
	return sharp({
		create: { width, height, channels: 3, background: { r: 210, g: 140, b: 90 } },
	})
		.png()
		.toBuffer();
}

/** 桩后端收到的每一次请求（验提示词后缀、模型与档位覆盖、补定妆照都用它）。 */
const seen: ImageRequest[] = [];

/** 桩后端：按请求的画幅给一张真图（sprite 给纯绿底人形，其它给横构图）。 */
function stubImage(): ImageBackend {
	return {
		async generate(req: ImageRequest): Promise<GeneratedImage> {
			seen.push(req);
			// 立绘三档画幅各给一张真尺寸的绿底人形（画幅自校验会按字节里的真实尺寸对账）
			if (req.aspectRatio === '9:16') return { data: await keyedSprite(1080, 1920), mimeType: 'image/png' };
			if (req.aspectRatio === '3:4') return { data: await keyedSprite(1440, 1920), mimeType: 'image/png' };
			if (req.aspectRatio === '1:1') return { data: await keyedSprite(1080, 1080), mimeType: 'image/png' };
			return { data: await landscape(), mimeType: 'image/png' };
		},
	};
}

/** 跑一次出图，拿回这一趟真正发给后端的提示词（多条时给最后一条）。 */
async function promptOf(run: () => Promise<unknown>): Promise<string> {
	const before = seen.length;
	await run();
	return seen.at(-1)?.prompt ?? '';
}

/** 桩后端：一段可辨认的假 M4A（只验落盘与扩展名，不验可播性）。 */
function stubMusic(): MusicBackend {
	return {
		async generate(): Promise<GeneratedMusic> {
			return { bytes: Buffer.from('M4A-STUB-BYTES'), mimeType: 'audio/mp4', ext: '.m4a' };
		},
	};
}

const dir = await mkdtemp(join(tmpdir(), 'aivn-media-'));
// 断言抛异常时也要清掉临时剧目（正常路径末尾还有一次 rm）。
process.on('exit', () => {
	try {
		rmSync(dir, { recursive: true, force: true });
	} catch {
		// 清理失败不该盖住真正的失败原因
	}
});
await mkdir(join(dir, 'assets'), { recursive: true });
const assets = new PlayAssets({ dir, image: stubImage(), music: stubMusic() });

// 1. 立绘：草稿（抠底）→ 入库 → 留底 → 素材表 → 台账
const sprite = await assets.draft(
	{ kind: 'sprite', spriteId: 'probe_girl', framing: 'full' },
	'a girl with silver hair, standing, front view',
);
const cut = sprite.cutout;
check('M1', sprite.aspect === '9:16' && existsSync(sprite.absPath), `立绘草稿落在草稿区（${sprite.aspect}）`);
check(
	'M2',
	!!cut && cut.coverage > 0.02 && cut.coverage < 0.97 && cut.figureHeight > 0,
	`自动抠底跑通（前景 ${((cut?.coverage ?? 0) * 100).toFixed(1)}%，人物高 ${cut?.figureHeight}px）`,
);
const draftImage = await readFile(sprite.absPath);
const meta = await sharp(draftImage).metadata();
check('M3', meta.format === 'png' && meta.hasAlpha === true, '草稿成图是带 alpha 的 PNG');

const spriteAsset = await assets.commit(sprite.draftId);
check(
	'M4',
	spriteAsset.path === 'assets/sprites/probe_girl/neutral.png' && existsSync(spriteAsset.absPath),
	`入库到 ${spriteAsset.path}`,
);
check(
	'M5',
	existsSync(join(dir, 'media-cache', 'sprite-sources', 'probe_girl', 'neutral.png')),
	'抠底前原片留底（重抠的前提）',
);
const manifest = JSON.parse(await readFile(join(dir, 'assets', 'manifest.json'), 'utf8'));
check(
	'M6',
	manifest.probe_girl?.framing === 'full' && manifest.probe_girl?.stature === 'normal',
	'素材表写上了立绘呈现声明（framing / stature）',
);
const ledger = JSON.parse(await readFile(join(dir, 'assets', 'generated.json'), 'utf8'));
check(
	'M7',
	ledger['probe_girl/neutral']?.path === spriteAsset.path && ledger['probe_girl/neutral']?.prompt.includes('silver hair'),
	'台账记下了这张图当初用的 prompt',
);

// 2. 重抠：对留底原片重跑 cut（只重跑抠底、画面不变），覆盖同一张 PNG；台账不许动
const ledgerBefore = JSON.parse(await readFile(join(dir, 'assets', 'generated.json'), 'utf8'));
const keptSource = 'media-cache/sprite-sources/probe_girl/neutral.png';
const recut = await assets.cutFile(keptSource, spriteAsset.path, { tolerance: 56 });
const ledgerAfter = JSON.parse(await readFile(join(dir, 'assets', 'generated.json'), 'utf8'));
check('M8', recut.cutout.coverage > 0 && existsSync(spriteAsset.absPath), '重抠：对留底原片重跑 cut 覆盖同一张立绘');
check(
	'M8b',
	spriteAsset.sourcePath === keptSource && ledgerAfter['probe_girl/neutral']?.prompt === ledgerBefore['probe_girl/neutral']?.prompt,
	'入库回执带出抠底前原片路径，且重抠不改台账',
);

// 3. 背景：草稿 + 入库
const bg = await assets.draft({ kind: 'background', name: 'rooftop_dusk' }, 'empty school rooftop at dusk');
check('M9', bg.aspect === '16:9', '背景请求走 16:9');
const bgAsset = await assets.commit(bg.draftId);
check('M10', bgAsset.path === 'assets/backgrounds/rooftop_dusk.png', `背景入库到 ${bgAsset.path}`);

// 4. 覆盖同名素材：replaced 为真，且不留下另一种扩展名的残片
const bg2 = await assets.draft({ kind: 'background', name: 'rooftop_dusk' }, 'same id again');
const bgAsset2 = await assets.commit(bg2.draftId);
check('M11', bgAsset2.replaced === true, '同 id 再次入库认得出是覆盖');

// 5. BGM：落 assets/bgm/ + 素材表一条 + 台账一条
const bgm = await assets.generateBgm('probe_theme', 'quiet piano, rainy afternoon, loopable');
const manifest2 = JSON.parse(await readFile(join(dir, 'assets', 'manifest.json'), 'utf8'));
const ledger2 = JSON.parse(await readFile(join(dir, 'assets', 'generated.json'), 'utf8'));
check(
	'M12',
	bgm.path === 'assets/bgm/probe_theme.m4a' && existsSync(bgm.absPath),
	`BGM 落库到 ${bgm.path}（扩展名跟着 mime 走）`,
);
check('M13', !!manifest2.probe_theme?.source, 'BGM 在素材表里留下 source');
check('M14', ledger2.probe_theme?.kind === 'bgm', 'BGM 也进台账');

// 6. 负例一：画幅不符不落盘（上游静默给错画幅时兜底）
const wrongAspect = new PlayAssets({
	dir,
	image: {
		async generate(): Promise<GeneratedImage> {
			return { data: await landscape(1080, 1080), mimeType: 'image/png' };
		},
	},
});
let rejected = '';
try {
	await wrongAspect.draft({ kind: 'background', name: 'wrong_shape' }, 'should not land');
} catch (error) {
	rejected = error instanceof Error ? error.message : String(error);
}
check('M15', rejected.includes('画幅'), `画幅不符时报错不落盘（${rejected.slice(0, 60)}…）`);
check('M16', !existsSync(join(dir, 'assets', 'backgrounds', 'wrong_shape.png')), '画幅不符没在 assets/ 留下任何文件');

// 7. 负例二：没有入库的 neutral 就出不了差分（草稿当不了身份基准）
let noNeutral = '';
try {
	await assets.draft({ kind: 'sprite', spriteId: 'nobody', variant: 'smile' }, 'a smile');
} catch (error) {
	noNeutral = error instanceof Error ? error.message : String(error);
}
check('M17', noNeutral.includes('neutral'), '没有入库的 neutral 时差分被拒（并说明为什么）');

// 8. 负例三：立绘差分不吃显式垫图
let noRefs = '';
try {
	await assets.draft(
		{ kind: 'sprite', spriteId: 'probe_girl', variant: 'smile', references: ['probe_girl'] },
		'a smile',
	);
} catch (error) {
	noRefs = error instanceof Error ? error.message : String(error);
}
check('M18', noRefs.includes('垫图'), '立绘差分拒绝显式垫图（身份基准恒为 neutral）');

// 8b. import_asset：把一张图登记成素材（落位显式给；不依赖生图后端）
const cand = await assets.draft({ kind: 'background', name: 'imported_cand' }, 'a cand bg');
const importedCand = await assets.register(cand.path, { kind: 'background', name: 'imported_cand' });
check(
	'M18a',
	importedCand.path === 'assets/backgrounds/imported_cand.png' && existsSync(importedCand.absPath),
	`候选文件 register 入库（落位显式给）：${importedCand.path}`,
);

const srcBg = join(dir, 'assets', 'backgrounds', 'external_src.png');
await writeFile(srcBg, await landscape(1600, 900));
const importedExternal = await assets.register(
	'assets/backgrounds/external_src.png',
	{ kind: 'background', name: 'external_bg' },
	{ description: '外部来源的背景' },
);
const manifestExt = JSON.parse(await readFile(join(dir, 'assets', 'manifest.json'), 'utf8'));
check(
	'M18b',
	importedExternal.path === 'assets/backgrounds/external_bg.png' && manifestExt.external_bg?.description === '外部来源的背景',
	'外部路径 register 并写下描述',
);

const srcSprite = join(dir, 'assets', 'external_sprite_src.png');
await writeFile(srcSprite, await keyedSprite(1080, 1920));
const extCut = await assets.cutFile('assets/external_sprite_src.png');
await assets.register(
	extCut.path,
	{ kind: 'sprite', spriteId: 'ext_girl', variant: 'smile', framing: 'full' },
	{ original: 'assets/external_sprite_src.png' },
);
check(
	'M18c',
	existsSync(join(dir, 'assets', 'sprites', 'ext_girl', 'smile.png')) &&
		existsSync(join(dir, 'media-cache', 'sprite-sources', 'ext_girl', 'smile.png')),
	'外部立绘：先 cut 抠底、再 register（original 留原片）',
);

const generic = await assets.createGeneric('a lone lighthouse at dusk', { aspectRatio: '1:1' });
const genericRecord = JSON.parse(await readFile(join(dir, 'media-cache', 'drafts', generic.draftId, 'draft.json'), 'utf8'));
check(
	'M18d',
	generic.kind === undefined && generic.aspect === '1:1' && existsSync(generic.absPath) && genericRecord.kind === undefined,
	'通用出图不绑剧目目标（记录里没有 kind，画幅走 aspectRatio）',
);

// 9. persona 的能力位分叉：两侧都要验（配了后端 / 没配）
const on = stagehandPrompt({ shell: false, voice: false, search: false, image: true, music: true });
const off = stagehandPrompt({ shell: false, voice: false, search: false, image: false, music: false });
check(
	'M19',
	on.includes('generate_asset') &&
	on.includes('generate_image') &&
	on.includes('import_asset') &&
	on.includes('aivn-visual-craft') &&
	on.includes('# 配乐（generate_bgm）'),
	'配了生图 / 音乐时 persona 教一键 generate_asset、候选 generate_image 与配乐，做法指向技能',
);
check(
	'M20',
	off.includes('本剧目**没有配生图后端**') && off.includes('import_asset') && !off.includes('# 配乐（generate_bgm）'),
	'没配时 persona 走 fallback，用 import_asset 登记外部图',
);
check(
	'M21',
	playwriterTail({ image: true }).includes('# 缺图怎么办') &&
		!playwriterTail({ image: false }).includes('# 缺图怎么办'),
	'剧作家的缺图章跟着生图能力位出现 / 消失',
);

// 9b. 技能库的两条门控规约（见 AGENTS.md「提示词地图」）：
//   (i) 恒列的 name+description 必须能力中立；(ii) 正文点名门控工具时必须条件化措辞。
const gatedToolNames = ['generate_asset', 'generate_image', 'generate_bgm', 'list_voices', 'web_search'];
const skillDir = new URL('../skills/', import.meta.url);
const skillFiles = Object.fromEntries(
	await Promise.all(
		['aivn-play-setup', 'aivn-visual-craft', 'aivn-audio'].map(async (name) => [
			name,
			await readFile(new URL(`${name}/SKILL.md`, skillDir), 'utf8'),
		]),
	),
);
check(
	'M21b',
	Object.values(skillFiles).every((text) => {
		const description = /^---\n[\s\S]*?^description:\s*(.+)$/m.exec(text)?.[1] ?? '';
		return gatedToolNames.every((name) => !description.includes(name));
	}),
	'三份 skill 的 description 能力中立（不点名门控工具）',
);
check(
	'M21c',
	['aivn-visual-craft', 'aivn-play-setup'].every(
		(name) =>
			(skillFiles[name] ?? '').includes('配了生图后端') && (skillFiles[name] ?? '').includes('没配生图后端'),
	),
	'点名门控工具的 skill 正文写成条件化措辞（配了 / 没配 两支都在）',
);

// 9. 并发写：同一批里几次落库不能互相覆盖（读-改-写按文件串行）
const names = ['race_a', 'race_b', 'race_c', 'race_d', 'race_e'];
await Promise.all(names.map((name) => assets.generateBgm(name, `stub track ${name}`)));
const manifestRace = JSON.parse(await readFile(join(dir, 'assets', 'manifest.json'), 'utf8'));
const ledgerRace = JSON.parse(await readFile(join(dir, 'assets', 'generated.json'), 'utf8'));
check(
	'M22',
	names.every((name) => manifestRace[name] && ledgerRace[name]),
	`并发落库五首曲子后素材表与台账一条不少（${names.filter((n) => manifestRace[n] && ledgerRace[n]).length}/5）`,
);

// 10. 负例四：垫图路径越界被拒（垫图会把文件内容发给生图后端，不能成为读出工作区的口子）
let escape = '';
try {
	await assets.draft({ kind: 'background', name: 'escape_probe', references: ['../../../etc/hostname'] }, 'nope');
} catch (error) {
	escape = error instanceof Error ? error.message : String(error);
}
check('M23', escape.includes('越界'), `垫图路径越界被拒（${escape.slice(0, 40)}…）`);


/* ── 11. 立绘提示词后缀：四段（景别 / 身份锁 / 非人留白 / 头顶留白）── */

const neutralPrompt = seen.find((req) => req.prompt.includes('silver hair'))?.prompt ?? '';
check(
	'M24',
	neutralPrompt.includes(SPRITE_FRAMING_SHOT.full) &&
		neutralPrompt.includes('space above the head') &&
		neutralPrompt.includes('#00FF00') &&
		neutralPrompt.includes('NOT a 3D render'),
	'定妆照后缀带景别措辞 / 头顶留白 / 色键底',
);
check(
	'M25',
	!neutralPrompt.includes('Change only the facial expression'),
	'定妆照不写差分那套身份锁（「只改表情」对着定妆照是自相矛盾的）',
);

const propPrompt = await promptOf(() =>
	assets.draft({ kind: 'sprite', spriteId: 'probe_cat', framing: 'square' }, 'a calico cat sitting'),
);
check(
	'M26',
	propPrompt.includes(SPRITE_FRAMING_SHOT.square) &&
		propPrompt.includes('nothing cropped by the frame edges') &&
		!propPrompt.includes('narrow sliver'),
	'非人主体（square）走「完整入画 + 四周留白」，不套人形的手臂留白',
);

const variantPrompt = await promptOf(() =>
	assets.draft({ kind: 'sprite', spriteId: 'probe_girl', variant: 'smile' }, 'a gentle smile'),
);
check(
	'M27',
	variantPrompt.includes('Same character as the reference image') &&
		variantPrompt.includes('Change only the facial expression') &&
		variantPrompt.includes(SPRITE_FRAMING_SHOT.full) &&
		variantPrompt.includes('Same 2D flat cel-shaded anime illustration style'),
	'差分带身份锁 + 景别 + 与定妆照一字不差的画风要求',
);

/* ── 11b. 色键底：颜色是显式传进来的，不是让模型在提示词里自己挑 ── */

const magentaPrompt = await promptOf(() =>
	assets.draft(
		{ kind: 'sprite', spriteId: 'probe_maple', framing: 'full', keyColor: 'magenta' },
		'a girl with green twin tails',
	),
);
check(
	'M42',
	magentaPrompt.includes('#FF00FF') && !magentaPrompt.includes('#00FF00'),
	'keyColor=magenta 出纯品红底（绿色系主体的口子）',
);

let badKeyColor = '';
try {
	await assets.draft({ kind: 'sprite', spriteId: 'probe_maple', keyColor: 'blue' as never }, 'a girl');
} catch (error) {
	badKeyColor = error instanceof Error ? error.message : String(error);
}
check('M43', badKeyColor.includes('色键底色'), `非法 keyColor 当场被拒（${badKeyColor.slice(0, 40)}…）`);

// 差分路径上顺手补的定妆照是**所有差分的垫图基准**：底色不跟着传，补出来就是另一套底色。
await promptOf(() =>
	assets.generate({ kind: 'sprite', spriteId: 'probe_autoneutral', variant: 'smile', keyColor: 'magenta' }, 'a smile'),
);
const autoNeutralPrompt = seen.find((req) => req.prompt.includes('calm neutral-expression'))?.prompt ?? '';
check(
	'M44',
	autoNeutralPrompt.includes('#FF00FF'),
	'差分点名品红底时，顺手补的定妆照用同一个底色',
);

/* ── 12. 垫图的编号锚点（多人同框时「第几张是谁」）── */

await mkdir(join(dir, 'characters'), { recursive: true });
await writeFile(join(dir, 'characters', 'lead.md'), '---\nname: 七濑\nsprite: lead\n---\n\n十七岁，话少。\n');
await mkdir(join(dir, 'assets', 'sprites', 'lead'), { recursive: true });
await writeFile(join(dir, 'assets', 'sprites', 'lead', 'neutral.png'), await readFile(spriteAsset.absPath));

const cgPrompt = await promptOf(() =>
	assets.draft({ kind: 'cg', name: 'two_shot', references: ['lead'] }, 'a quiet rooftop at night'),
);
check('M28', cgPrompt.includes('in this exact order: 1) 七濑'), 'CG 垫主体 id 时把角色**名字**写进编号锚点');

const pathPrompt = await promptOf(() =>
	assets.draft(
		{ kind: 'cg', name: 'path_probe', references: ['assets/backgrounds/rooftop_dusk.png'] },
		'a quiet rooftop at night',
	),
);
check(
	'M29',
	pathPrompt.includes('Follow the attached reference image(s)') && !pathPrompt.includes('in this exact order'),
	'垫的是没有名字的路径时退回通用措辞，不瞎编号',
);

/* ── 13. 剧作家路径：缺定妆照自动补 + 已有同名跳过 ── */

const auto = await assets.generate({ kind: 'sprite', spriteId: 'late_bloom', variant: 'angry' }, 'a girl shouting');
check(
	'M30',
	auto.autoNeutral?.path === 'assets/sprites/late_bloom/neutral.png' &&
		existsSync(join(dir, 'assets', 'sprites', 'late_bloom', 'neutral.png')),
	'缺定妆照时先自动补一张 neutral（回执里带上它）',
);
check(
	'M31',
	existsSync(join(dir, 'assets', 'sprites', 'late_bloom', 'angry.png')) &&
		(await readFile(join(dir, 'assets', 'generated.json'), 'utf8')).includes('a calm neutral-expression portrait'),
	'差分照常派生，补出来的那张走的是中性前置描述',
);

await mkdir(join(dir, 'assets', 'sprites', 'stranded'), { recursive: true });
await writeFile(join(dir, 'assets', 'sprites', 'stranded', 'angry.png'), await readFile(spriteAsset.absPath));
let stranded = '';
try {
	await assets.generate({ kind: 'sprite', spriteId: 'stranded', variant: 'sad' }, 'a sad face');
} catch (error) {
	stranded = error instanceof Error ? error.message : String(error);
}
check('M32', stranded.includes('静默换脸'), '已有别的差分却不缺 neutral 时拒绝自动补（防静默换脸）');

check(
	'M33',
	(await assets.exists({ kind: 'background', name: 'rooftop_dusk' })) &&
		(await assets.exists({ kind: 'sprite', spriteId: 'probe_girl', variant: 'neutral' })) &&
		!(await assets.exists({ kind: 'background', name: 'never_made' })),
	'exists() 认得已有素材与不存在的素材（剧作家出图前的守卫）',
);

/* ── 14. 逐剧目出图设置：play.json 的 image 段 ── */

await writeFile(
	join(dir, 'play.json'),
	`${JSON.stringify({ id: 'probe_media', title: '素材探针', image: { model: 'play-model-x', size: '4K' } }, null, 2)}\n`,
);
await assets.draft({ kind: 'background', name: 'override_probe' }, 'a room');
const overrideReq = seen.at(-1);
check(
	'M34',
	overrideReq?.model === 'play-model-x' && overrideReq?.size === '4K',
	'play.json 的 image 段覆盖部署级的模型与档位',
);
await assets.draft({ kind: 'background', name: 'explicit_probe', model: 'explicit-model' }, 'a room');
check('M35', seen.at(-1)?.model === 'explicit-model', '调用方显式给的模型盖过 play.json');

/* ── 15. 垫图网址：内网地址挡死（SSRF）── */

let ssrf = '';
try {
	await assets.draft({ kind: 'background', name: 'ssrf_probe', references: ['http://127.0.0.1:9/ref.png'] }, 'nope');
} catch (error) {
	ssrf = error instanceof Error ? error.message : String(error);
}
check('M36', ssrf.includes('内网'), `垫图网址拒绝内网地址（${ssrf.slice(0, 40)}…）`);

/* ── 16. 抠底回归（照 AIVN `apps/server/test/cutout.test.ts` 的四条）── */

/** 读某点的 alpha。 */
async function alphaAt(data: Buffer, x: number, y: number): Promise<number> {
	const { data: raw, info } = await sharp(data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	return raw[(y * info.width + x) * info.channels + 3] ?? 0;
}

/**
 * 色键夹具：纯白底 + 深色人形，人形里埋四块「离底色不同远近」的封闭口袋。
 * 四个都贴不到画面边——纯色键不看连通性，贴不贴边不改变任何事：
 * A 离底色 4 格、B 20 格、C 42 格、D 60 格（走 PNG，JPEG 的色振铃会把摆好的色差搅没）。
 */
async function keyedPockets(): Promise<Buffer> {
	const width = 200;
	const height = 300;
	const raw = Buffer.alloc(width * height * 3).fill(255);
	const paint = (x0: number, y0: number, x1: number, y1: number, c: [number, number, number]): void => {
		for (let y = y0; y <= y1; y++) {
			for (let x = x0; x <= x1; x++) {
				const o = (y * width + x) * 3;
				raw[o] = c[0];
				raw[o + 1] = c[1];
				raw[o + 2] = c[2];
			}
		}
	};
	paint(40, 20, 160, 280, [40, 50, 80]);
	paint(60, 40, 99, 79, [251, 251, 252]);
	paint(100, 40, 139, 79, [235, 235, 237]);
	paint(60, 100, 99, 139, [213, 213, 216]);
	paint(100, 100, 139, 139, [195, 195, 197]);
	return sharp(raw, { raw: { width, height, channels: 3 } }).png().toBuffer();
}

/** 人物内部被抠穿的像素数（落在不透明外框之内的全透明像素）。量容差效应时不依赖坐标换算。 */
async function interiorHoles(data: Buffer): Promise<number> {
	const { data: raw, info } = await sharp(data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const alpha = (x: number, y: number): number => raw[(y * info.width + x) * info.channels + 3] ?? 0;
	let minX = info.width;
	let maxX = -1;
	let minY = info.height;
	let maxY = -1;
	for (let y = 0; y < info.height; y++) {
		for (let x = 0; x < info.width; x++) {
			if (alpha(x, y) > 0) {
				if (x < minX) minX = x;
				if (x > maxX) maxX = x;
				if (y < minY) minY = y;
				if (y > maxY) maxY = y;
			}
		}
	}
	let holes = 0;
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) if (alpha(x, y) === 0) holes++;
	}
	return holes;
}

/** 容差用例的夹具是刻意干净的 PNG，而 `keySmooth` 是给 JPEG 环纹用的降噪前置：只问色键本身时关掉它。 */
const NO_SMOOTH = { keySmooth: 0 } as const;

// 与底色同色的封闭块照抠不误——「别撞色」是出图那一步的责任
{
	const width = 200;
	const height = 300;
	const raw = Buffer.alloc(width * height * 3).fill(255);
	const paint = (x0: number, y0: number, x1: number, y1: number, c: number): void => {
		for (let y = y0; y <= y1; y++) {
			for (let x = x0; x <= x1; x++) {
				const o = (y * width + x) * 3;
				raw[o] = c;
				raw[o + 1] = c;
				raw[o + 2] = c;
			}
		}
	};
	paint(40, 20, 160, 280, 40); // 人形
	paint(80, 130, 120, 190, 255); // 白袜子：与底色逐位同色、封闭
	const data = await sharp(raw, { raw: { width, height, channels: 3 } }).png().toBuffer();

	// 白袜子中心 (100,160) 映射到输出画布（人物外框 + 等比缩放 + 底部居中）
	const box = { x0: 39, y0: 19, x1: 161, y1: 281 };
	const w = box.x1 - box.x0 + 1;
	const h = box.y1 - box.y0 + 1;
	const scale = Math.min(1080 / w, 1920 / h);
	const left = Math.round((1080 - Math.round(w * scale)) / 2);
	const top = 1920 - Math.round(h * scale);
	const x = left + Math.round((100 - box.x0) * scale);
	const y = top + Math.round((160 - box.y0) * scale);

	const result = await cutout(data, { ...NO_SMOOTH });
	check(
		'M37',
		(await alphaAt(result.data, x, y)) === 0 && (await alphaAt(result.data, left + Math.round(2 * scale), y)) === 255,
		'与底色同色的封闭块被抠穿（纯色键不分内外），人形自己没被连坐',
	);
}

// tolerance 是唯一旋钮：多远的像素算底色全由它定
{
	const data = await keyedPockets();
	const tight = await interiorHoles((await cutout(data, { tolerance: 8, ...NO_SMOOTH })).data);
	const loose = await interiorHoles((await cutout(data, { tolerance: 48, ...NO_SMOOTH })).data);
	const widest = await interiorHoles((await cutout(data, { tolerance: 64, ...NO_SMOOTH })).data);
	check(
		'M38',
		loose - tight > 2000 && widest - loose > 1000,
		`容差是唯一旋钮（紧档抠穿 ${tight}px，中档 ${loose}px，松档 ${widest}px）`,
	);
}

// 边界带的 alpha 是反解出来的真实覆盖率，不是钉死的 128 地板
{
	const width = 400;
	const height = 2120;
	const raw = Buffer.alloc(width * height * 3).fill(255);
	const bands: { y: number; coverage: number; value: number }[] = [
		{ y: 200, coverage: 0.2, value: 212 },
		{ y: 800, coverage: 0.5, value: 148 },
		{ y: 1400, coverage: 0.8, value: 83 },
	];
	for (let y = 100; y < 2020; y++) {
		for (let x = 100; x < 300; x++) {
			const o = (y * width + x) * 3;
			const v = x === 100 ? (bands.find((b) => y >= b.y && y < b.y + 500)?.value ?? 40) : 40;
			raw[o] = v;
			raw[o + 1] = v;
			raw[o + 2] = v;
		}
	}
	const result = await cutout(await sharp(raw, { raw: { width, height, channels: 3 } }).png().toBuffer());

	// scale 恒等于 1，人形 200 宽居中落在 1080 画布的 x 440..639，底对齐
	const left = Math.round((1080 - 200) / 2);
	const measured: number[] = [];
	let ok = true;
	for (const band of bands) {
		const edge = await alphaAt(result.data, left, band.y);
		measured.push(edge);
		ok = ok && Math.abs(edge - Math.round(255 * band.coverage)) <= 2 && edge < 255;
		ok = ok && (await alphaAt(result.data, left + 1, band.y)) === 255;
		ok = ok && (await alphaAt(result.data, left - 1, band.y)) === 0;
	}
	check(
		'M39',
		ok && new Set(measured).size === 3,
		`边界 alpha 是真覆盖率而不是 128 地板（三档实测 ${measured.join(' / ')}）`,
	);
}

// 色键底（绿底）+ 亮色前景：覆盖率与反解出来的边缘色都对（分母必须带符号）
{
	const width = 400;
	const height = 2120;
	const BG: [number, number, number] = [0, 255, 0];
	const SKIN: [number, number, number] = [245, 215, 190];
	const blend = SKIN.map((v, c) => Math.round(0.5 * v + 0.5 * BG[c]!));
	const raw = Buffer.alloc(width * height * 3);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const o = (y * width + x) * 3;
			const inside = x >= 101 && x < 300 && y >= 100 && y < 2020;
			// 那条半覆盖列只画在人形里，别一路画到画布上下缘——否则外框会被它撑成整张图高
			const c = x === 100 && y >= 100 && y < 2020 ? blend : inside ? SKIN : BG;
			raw[o] = c[0]!;
			raw[o + 1] = c[1]!;
			raw[o + 2] = c[2]!;
		}
	}
	const result = await cutout(await sharp(raw, { raw: { width, height, channels: 3 } }).png().toBuffer());
	const { data, info } = await sharp(result.data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const at = (x: number, y: number): number[] => {
		const o = (y * info.width + x) * info.channels;
		return [data[o]!, data[o + 1]!, data[o + 2]!, data[o + 3]!];
	};
	// 与「反解覆盖率」那条用例同一套尺寸换算：200 宽的人形居中落在 1080 画布的 x 440
	const left = Math.round((1080 - 200) / 2);
	const edge = at(left, 600);
	const solid = at(left + 20, 600);
	const blendOk = Math.abs(edge[3]! - 128) <= 6 && [0, 1, 2].every((c) => Math.abs(edge[c]! - SKIN[c]!) <= 12);
	const solidOk = solid[3] === 255 && [0, 1, 2].every((c) => Math.abs(solid[c]! - SKIN[c]!) <= 4);
	check(
		'M40',
		blendOk && solidOk && at(left - 3, 600)[3] === 0,
		`绿底 + 亮色前景：半覆盖像素反解回前景色且不残留底色（边缘 ${edge[3]}，实心 ${solid[3]}）`,
	);
}

/* ── 17. 台账对账：登记指向不存在的文件要报出来 ── */

await writeFile(
	join(dir, 'assets', 'generated.json'),
	`${JSON.stringify({ ghost: { kind: 'background', path: 'assets/backgrounds/ghost.png', prompt: '', createdAt: '' } }, null, 2)}\n`,
);
const readiness = readPlayReadiness(dir);
check(
	'M41',
	readiness.danglingAssets.includes('ghost'),
	`台账对账报出指向不存在文件的登记（${readiness.danglingAssets.join('、') || '无'}）`,
);

/* ── 18. 并发：catalog 里谁声明了可重叠，提示词里怎么教 ── */

// 并发的开关是工具定义上的 `isConcurrencySafe`，声明在 catalog 的 `concurrent`（缺省即独占）。
// 这里锁住「谁独占」这件事：set_stage_style 读-改-写 theme.json 且没有锁，只有它不能并发。
const exclusive = TOOL_CATALOG.filter((spec) => !spec.concurrent).map((spec) => spec.id);
check(
	'M45',
	exclusive.length === 1 && exclusive[0] === 'set_stage_style',
	`只有 set_stage_style 声明独占（实际：${exclusive.join('、') || '无'}）`,
);

// 教学：persona 教「独立的调用放同一批」（每轮契约），素材那层的食谱（一批几张、候选取几张）在技能里。
const stageOn = stagehandPrompt({ shell: false, voice: false, search: false, image: true, music: true });
check('M46', stageOn.includes('独立的工具调用放同一批'), '搭台助手 persona 教「独立的工具调用放同一批」');
const writerOn = playwriterTail({ image: true });
check(
	'M47',
	// 《你怎么工作》在 persona 前缀里，《缺图怎么办》在尾段里——两段都要教到。
	PLAYWRITER_PROMPT.includes('同一批发出的工具调用会并发跑') && writerOn.includes('放进同一批发出去'),
	'剧作家：读回一次拿、缺图多张同批发',
);
check(
	'M48',
	['aivn-visual-craft', 'aivn-audio', 'aivn-play-setup'].every((name) => (skillFiles[name] ?? '').includes('同一批')),
	'三份技能的素材食谱都写明「同一批」并发',
);

await rm(dir, { recursive: true, force: true });
const passed = results.filter((r) => r.ok).length;
console.log(`\n${passed}/${results.length} 通过`);
process.exit(passed === results.length ? 0 : 1);
