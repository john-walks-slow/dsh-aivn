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
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { PlayAssets } from '../src/media/assets';
import { playwriterTail } from '../src/playwriter/prompt';
import { stagehandPrompt } from '../src/stagehand/prompt';
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

/** 桩后端：按请求的画幅给一张真图（sprite 给纯绿底人形，其它给横构图）。 */
function stubImage(): ImageBackend {
	return {
		async generate(req: ImageRequest): Promise<GeneratedImage> {
			if (req.aspectRatio === '9:16') return { data: await keyedSprite(), mimeType: 'image/png' };
			return { data: await landscape(), mimeType: 'image/png' };
		},
	};
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

// 2. 重抠：不重新出图，覆盖同一张 PNG
const recut = await assets.recut({ kind: 'sprite', spriteId: 'probe_girl' }, { tolerance: 56 });
check('M8', recut.cutout !== undefined && existsSync(recut.absPath), '原地重抠覆盖了同一张立绘');

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

// 9. persona 的能力位分叉：两侧都要验（配了后端 / 没配）
const on = stagehandPrompt({ shell: false, voice: false, search: false, image: true, music: true });
const off = stagehandPrompt({ shell: false, voice: false, search: false, image: false, music: false });
check(
	'M19',
	on.includes('两步走：先出候选') &&
	on.includes('commit_asset') &&
	on.includes('recut_sprite') &&
	on.includes('立绘三档取景') &&
	on.includes('# 配乐（generate_bgm）'),
	'配了生图 / 音乐时 persona 教两步出图与配乐',
);
check(
	'M20',
	off.includes('现在**没有生图工具**') && !off.includes('commit_asset') && !off.includes('# 配乐（generate_bgm）'),
	'没配时 persona 走 fallback，且不提那两个工具',
);
check(
	'M21',
	playwriterTail({ image: true }).includes('# 缺图怎么办（generate_image）') &&
		!playwriterTail({ image: false }).includes('# 缺图怎么办（generate_image）'),
	'剧作家的缺图章跟着生图能力位出现 / 消失',
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

await rm(dir, { recursive: true, force: true });
const passed = results.filter((r) => r.ok).length;
console.log(`\n${passed}/${results.length} 通过`);
process.exit(passed === results.length ? 0 : 1);
