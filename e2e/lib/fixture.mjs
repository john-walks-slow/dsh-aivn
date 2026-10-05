// e2e/lib/fixture.mjs —— 舞台验收用的一次性剧目夹具。
//
// e2e 实例把工作区播种成插件仓库根，而「工作区 = 剧目」意味着那个根下必须有
// play.json。夹具就在那里临时落一份，跑完即删（`.gitignore` 只是兜底）。
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';

const PLAY_ID = 'e2e-stage';

/** 一份最小可演的剧目：两个角色、一句开场指令、一张背景、一张立绘。 */
export const PLAY = {
	id: PLAY_ID,
	title: '舞台验收剧目',
	opening: '（游戏开始，请演出第一轮）',
	characters: [
		{ id: 'lin', name: '林' },
		{ id: 'zhou', name: '周' },
	],
};

/**
 * 在 `dir` 下落一份剧目夹具。
 *
 * 返回 `{ made, owned }`：`made` 是本夹具写下的每个文件，`owned` 是**本次才创建**的
 * 顶层目录（`assets` / `characters` / `memory`）。剧作家会在同一个工作区里接着写
 * `memory/always/state/*`，所以回收以 `owned` 为准整棵删，而不是只删自己写的文件。
 */
export function seedPlay(dir) {
	const made = [];
	const owned = ['assets', 'characters', 'memory']
		.map((name) => join(dir, name))
		.filter((path) => !existsSync(path));

	const play = join(dir, 'play.json');
	writeFileSync(play, `${JSON.stringify(PLAY, null, 2)}\n`);
	made.push(play);

	const assets = join(dir, 'assets');
	mkdirSync(join(assets, 'backgrounds'), { recursive: true });
	mkdirSync(join(assets, 'sprites', 'lin'), { recursive: true });

	const background = join(assets, 'backgrounds', 'veranda.png');
	const sprite = join(assets, 'sprites', 'lin', 'normal.png');
	writeFileSync(background, gradientPng(640, 360, [58, 74, 112], [196, 154, 132]));
	writeFileSync(sprite, gradientPng(240, 480, [232, 226, 214], [120, 126, 150]));
	made.push(background, sprite);

	const manifest = join(assets, 'manifest.json');
	writeFileSync(
		manifest,
		`${JSON.stringify(
			{
				'backgrounds/veranda.png': { description: '黄昏时分的走廊，木地板反着暖光' },
				'sprites/lin/normal.png': { description: '林，常服，平静的神色' },
			},
			null,
			2,
		)}\n`,
	);
	made.push(manifest);

	// 让剧作家有东西可写，也让就绪自查不是一片「缺」（缺什么都能开演，但空剧目写不出戏）。
	made.push(...text(dir, 'memory/always/premise.md', PREMISE));
	made.push(...text(dir, 'memory/always/craft.md', CRAFT));
	made.push(...text(dir, 'characters/lin.md', CARD_LIN));
	made.push(...text(dir, 'characters/zhou.md', CARD_ZHOU));
	return { made, owned };
}

/** 一口气写一份文本文件，返回它的路径（供调用方收集回收清单）。 */
function text(dir, relative, body) {
	const path = join(dir, relative);
	mkdirSync(join(path, '..'), { recursive: true });
	writeFileSync(path, body);
	return [path];
}

const PREMISE = `# 前提

梅雨季的第三天，两人被困在放了假的旧校舍。手机没有信号，走廊尽头的水声一直没有停。
`;

const CRAFT = `# 创作口径

短句，克制，不写心理活动，只写看得见的东西。称呼用姓氏。
`;

const CARD_LIN = `---
name: 林
sprite: lin
---

十七岁，话少，习惯先看窗外再看人。手里那把伞是从别人那儿借来的。
`;

const CARD_ZHOU = `---
name: 周
---

十七岁，爱笑，把「没事」当口头禅。校服袖口挽到手肘。
`;

/** 把夹具移除干净：本次创建的顶层目录整棵删，其余只删自己写下的文件。 */
export function clearPlay(dir, fixture) {
	rmSync(join(dir, 'play.json'), { force: true });
	for (const path of fixture?.owned ?? []) rmSync(path, { recursive: true, force: true });
	for (const path of fixture?.made ?? []) rmSync(path, { force: true });
}

/** 一张纵向渐变的 RGB PNG。够当舞台背景，不引第三方图像库。 */
function gradientPng(width, height, from, to) {
	const raw = Buffer.alloc(height * (1 + width * 3));
	for (let y = 0; y < height; y += 1) {
		const row = y * (1 + width * 3);
		raw[row] = 0; // filter: None
		const t = height === 1 ? 0 : y / (height - 1);
		for (let x = 0; x < width; x += 1) {
			const at = row + 1 + x * 3;
			raw[at] = Math.round(from[0] + (to[0] - from[0]) * t);
			raw[at + 1] = Math.round(from[1] + (to[1] - from[1]) * t);
			raw[at + 2] = Math.round(from[2] + (to[2] - from[2]) * t);
		}
	}
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(width, 0);
	ihdr.writeUInt32BE(height, 4);
	ihdr[8] = 8; // bit depth
	ihdr[9] = 2; // color type: truecolor
	return Buffer.concat([
		Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
		pngChunk('IHDR', ihdr),
		pngChunk('IDAT', deflateSync(raw)),
		pngChunk('IEND', Buffer.alloc(0)),
	]);
}

function pngChunk(type, data) {
	const head = Buffer.alloc(4);
	head.writeUInt32BE(data.length, 0);
	const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
	const tail = Buffer.alloc(4);
	tail.writeUInt32BE(crc32(body), 0);
	return Buffer.concat([head, body, tail]);
}

const CRC_TABLE = (() => {
	const table = new Int32Array(256);
	for (let n = 0; n < 256; n += 1) {
		let c = n;
		for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		table[n] = c;
	}
	return table;
})();

function crc32(buffer) {
	let c = -1;
	for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
	return (c ^ -1) >>> 0;
}
