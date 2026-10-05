#!/usr/bin/env node
/**
 * e2e: 舞台视图（Phase 0 管道验收）。
 *
 * 证明这条链完整成立：
 *   插件包 → DSH 加载宿主半边与客户端半边 → 会话头部出现「舞台」tab
 *   → 选中后整块对话主区渲染舞台 → 宿主 SSE 的 IR 流被消费并逐字显示
 *   → 点击停止点把输入发回宿主并拿到回执
 *
 * 运行：dsh-e2e run e2e/run.mjs stage
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { E2E_URL, ensureSession, gotoGui, launch, listTabs, newPage, openViewTab, sendMessage, shot } from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

const browser = await launch();
let probeSent = false;
try {
	const { page, errors } = await newPage(browser);
	const streamHits = [];
	page.on('request', (request) => {
		const url = request.url();
		if (url.includes('/aivn/stream')) streamHits.push('stream');
		if (url.includes('/aivn/input')) streamHits.push('input');
	});

	await gotoGui(page);
	check('S1', errors.length === 0, `首屏无报错（${errors.length}）`);

	const session = await ensureSession(page);
	check('S2', session !== 'none', `会话就位（${session}）`);

	let tabs = await listTabs(page);
	if (!tabs.includes('舞台')) {
		// 空白会话不声明 conversation.view 槽；发一条最省的消息让它离开空白态。
		await sendMessage(page, '1');
		probeSent = true;
		await page.waitForTimeout(9_000);
		tabs = await listTabs(page);
	}
	check('S3', tabs.includes('舞台'), `会话头部有「舞台」tab（现有：${tabs.join(' / ') || '无'}）`);

	const switched = await openViewTab(page, '舞台');
	await page.waitForTimeout(2_500);
	const mounted = await page.evaluate(() => Boolean(document.querySelector('.aivn-stage')));
	check('S4', switched && mounted, '切到舞台后视图已挂载');

	const online = await page.evaluate(() => document.querySelector('.aivn-status')?.getAttribute('data-state') === 'online');
	check('S5', online, 'SSE 已连上（状态位 online）');

	const readText = () => page.evaluate(() => document.querySelector('.aivn-text')?.textContent ?? '');
	let first = '';
	for (let i = 0; i < 40 && !first; i++) {
		first = await readText();
		if (!first) await page.waitForTimeout(300);
	}
	await page.waitForTimeout(1_200);
	const second = await readText();
	check('S6', first.length > 0 && second.length > first.length, `台词在逐字增长（${first.length} → ${second.length}）`);

	const actorCount = await page.evaluate(() => document.querySelectorAll('.aivn-actor').length);
	check('S7', actorCount > 0, `立绘位已上（${actorCount}）`);

	// 等停止点（脚本里是最后一帧），点第一条选项，验证浏览器 → 宿主 → 回执。
	let choiceCount = 0;
	for (let i = 0; i < 60 && choiceCount === 0; i++) {
		choiceCount = await page.evaluate(() => document.querySelectorAll('.aivn-choice').length);
		if (choiceCount === 0) await page.waitForTimeout(400);
	}
	check('S8', choiceCount > 0, `停止点选项已出现（${choiceCount}）`);

	if (choiceCount > 0) {
		await page.locator('.aivn-choice').first().click();
		await page.waitForTimeout(1_500);
		const echoed = await page.evaluate(() => document.querySelector('.aivn-text[data-kind="input"]')?.textContent ?? '');
		check('S9', echoed.includes('Phase 0 回执'), `输入回执已回到画面（${echoed.slice(0, 28)}…）`);
	} else {
		check('S9', false, '未出现停止点，跳过输入回执');
	}

	check('S10', streamHits.includes('stream'), '宿主 /aivn/stream 被请求');
	check('S11', streamHits.includes('input'), '宿主 /aivn/input 被请求');
	check('S12', errors.length === 0, `全程无页面报错（${errors.length}）`);

	await shot(page, join(ARTIFACTS, 'stage.png'));
	console.log(`\n截图：${join(ARTIFACTS, 'stage.png')}`);
	if (probeSent) console.log('（本轮为让空白会话离开空白态发了一条消息）');
	console.log(`URL: ${E2E_URL}`);
} finally {
	await browser.close();
}

const failed = results.filter((row) => !row.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
process.exit(failed.length ? 1 : 0);
