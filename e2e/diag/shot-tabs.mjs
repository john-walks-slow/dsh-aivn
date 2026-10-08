#!/usr/bin/env node
/**
 * e2e: AIVN tab 两种状态的实拍图（给人看的，不做断言）。
 *
 * 剧作家会话 → 会话头部有「AIVN」tab；搭台助手会话 → 没有。
 * 运行：dsh-e2e run e2e/diag/shot-tabs.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay } from '../lib/fixture.mjs';
import {
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	sendMessage,
	shot,
	waitFor,
} from '../lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
/** 与 verify-stage 同一个落点（已在 .gitignore 里）。 */
const OUT = join(ROOT, 'e2e-artifacts');
mkdirSync(OUT, { recursive: true });

/** 会话头部的 tab 名（按 DOM 顺序）。 */
const TABS = () => [...document.querySelectorAll('[role="tab"]')].map((tab) => (tab.textContent ?? '').trim());

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	await newSession(page);
	await pickPreset(page, '剧作家');
	// 空白会话走的是 Hero 屏（没有 tab 列），先发一句话把会话推进到对话态。
	await sendMessage(page, '先别动手：只说一句「好」。');
	const appeared = await waitFor(
		page,
		() =>
			[...document.querySelectorAll('[role="tab"]')].some((tab) => (tab.textContent ?? '').trim() === 'AIVN'),
		{ timeout: 90_000, label: '剧作家会话出现 AIVN tab' },
	);
	console.log(`剧作家会话 tabs：${(await page.evaluate(TABS)).join(' / ')}（AIVN 出现：${appeared}）`);
	await shot(page, join(OUT, 'tab-playwright.png'));

	await newSession(page);
	await pickPreset(page, '搭台助手');
	await sendMessage(page, '先别动手：只说一句「好」。');
	// 预设名回显 = 新会话真的起来了，这时头部 tab 列已经是这一侧的。
	await waitFor(
		page,
		() => [...document.querySelectorAll('span[title]')].some((el) => (el.textContent ?? '').trim() === '搭台助手'),
		{ timeout: 30_000, label: '搭台助手预设回显' },
	);
	await page.waitForTimeout(2_000);
	console.log(`搭台助手会话 tabs：${(await page.evaluate(TABS)).join(' / ')}`);
	await shot(page, join(OUT, 'tab-stagehand.png'));

	await browser.close();
	console.log(`截图已写入 ${OUT}`);
} finally {
	await browser.close().catch(() => {});
	clearPlay(WORKSPACE, fixture);
}
