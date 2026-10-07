#!/usr/bin/env node
/**
 * e2e: 没有「起剧目」工具之后，模型靠提示词把一座剧目立起来。
 *
 * 这条链别处测不到：`verify-stagehand` 只能断言 `create_play` 不在工具面里、
 * 《剧目文件》那一章在提示词里——**「照那一章手写 play.json 能不能成」只有真让模型写一次才知道**。
 *
 * 流程：清掉工作区里的剧目 → 新建搭台助手会话 → 让它把当前目录立成一座剧目（只写 play.json）
 *   → 等文件出现 → 断言它是合法 JSON、`id`/`title` 都在、`id` 合引擎的命名规则
 *   → 拿 `/aivn/play` 复核：引擎自己读得出来这份手写的文件。
 *
 * 运行：dsh-e2e run e2e/run.mjs stagehand（或 node e2e/verify-handmade-play.mjs）
 */
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { clearPlay, seedPlay } from './lib/fixture.mjs';
import {
	dismissOnboarding,
	E2E_HOME,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	sendMessage,
	WORKSPACE as WORKSPACE_DIR,
} from './lib/boot.mjs';

const SLUG = `--${WORKSPACE_DIR.replace(/^\//, '').replace(/\//g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);
const PLAY_FILE = join(WORKSPACE_DIR, 'play.json');

/** 引擎的剧目 id 规则（`@aivn/core` 与插件脚手架同一个口径）。 */
const ID_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

const sessionNames = () =>
	readdirSync(SESSIONS)
		.filter((name) => statSync(join(SESSIONS, name)).isDirectory())
		.sort((a, b) => statSync(join(SESSIONS, b)).mtimeMs - statSync(join(SESSIONS, a)).mtimeMs);

/** 等 play.json 出现（模型写盘要一轮往返）。 */
async function waitForPlayFile(page, { timeout = 240_000 } = {}) {
	const until = Date.now() + timeout;
	while (Date.now() < until) {
		if (existsSync(PLAY_FILE)) {
			try {
				return JSON.parse(readFileSync(PLAY_FILE, 'utf8'));
			} catch {
				/* 写到一半，接着等 */
			}
		}
		await page.waitForTimeout(1_000);
	}
	return undefined;
}

const playInfo = (page, sessionId) =>
	page.evaluate(
		(id) =>
			fetch(`/aivn/play?session=${encodeURIComponent(id)}`)
				.then((response) => response.json())
				.catch(() => null),
		sessionId,
	);

// 从「还不是一座剧目」起步：夹具先落地再清掉，顺带知道哪几个顶层目录是这次才有的。
const fixture = seedPlay(WORKSPACE_DIR);
clearPlay(WORKSPACE_DIR, fixture);
const owned = ['assets', 'characters', 'memory'].map((name) => join(WORKSPACE_DIR, name)).filter((path) => !existsSync(path));

const browser = await launch();
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	await newSession(page);
	const preset = await pickPreset(page, '搭台助手');
	check('H1', preset.picked && sessionNames().length > 0, `搭台助手会话建起来了（预设：${preset.current}）`);

	await sendMessage(page, '把当前工作目录立成一座剧目《雨中的旧校舍》。**只写 play.json 就好**，先别动别的文件。');
	const config = await waitForPlayFile(page);
	check('H2', config !== undefined, `模型自己写出了 play.json（${existsSync(PLAY_FILE) ? readFileSync(PLAY_FILE, 'utf8').slice(0, 90).replace(/\n/g, ' ') : '文件没出现'}）`);

	const id = typeof config?.id === 'string' ? config.id : '';
	check(
		'H3',
		typeof config?.title === 'string' && config.title.trim() !== '' && ID_PATTERN.test(id),
		`字段合引擎规则（id=${JSON.stringify(id)} title=${JSON.stringify(config?.title)}）`,
	);

	const sessionId = sessionNames()[0];
	const live = sessionId ? await playInfo(page, sessionId) : null;
	check('H4', Boolean(live?.dir) && live?.config?.title !== undefined, `引擎读得出来这份手写的 play.json（dir=${live?.dir ?? 'null'}）`);
} finally {
	await browser.close();
	// 模型写的这份收走；这次才出现的顶层目录也整棵删（与夹具同一套回收口径）。
	rmSync(PLAY_FILE, { force: true });
	for (const path of owned) rmSync(path, { recursive: true, force: true });
}

const failed = results.filter((row) => !row.ok);
console.log(`\n通过率: ${results.length - failed.length}/${results.length}`);
process.exit(failed.length > 0 ? 1 : 0);
