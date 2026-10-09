#!/usr/bin/env node
/**
 * e2e: 「开始游戏」的实拍图（给人看的，不做断言）。
 *
 * 空白会话（剧作家 chip 右边摆着「开始游戏」）→ 按下 → 落到舞台。
 * 断言在 `verify-entry.mjs`，这里只出图。
 *
 * 运行：dsh-e2e run e2e/diag/shot-entry.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay } from '../lib/fixture.mjs';
import { WORKSPACE, dismissOnboarding, gotoGui, launch, newPage, newSession, pickPreset, shot, waitFor } from '../lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'e2e-artifacts');
mkdirSync(OUT, { recursive: true });

const ENTRY = () => {
	const el = document.getElementById('dsh-aivn-start-game');
	return el === null ? null : { text: (el.textContent ?? '').trim() };
};

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	await newSession(page);
	await pickPreset(page, '剧作家');
	await page.waitForTimeout(2_500);
	console.log(`空白剧作家会话上那一枚：${JSON.stringify(await page.evaluate(ENTRY))}`);
	await shot(page, join(OUT, 'start-blank.png'));

	const pressed = await page.evaluate(() => {
		const el = document.getElementById('dsh-aivn-start-game');
		if (el === null) return false;
		el.click();
		return true;
	});
	const mounted = await waitFor(page, () => document.querySelector('.aivn-stage-view') !== null, {
		timeout: 180_000,
		interval: 1_000,
		label: '按下之后落到舞台',
	});
	console.log(`按下（${pressed}）之后：舞台挂载=${mounted}，那一枚=${JSON.stringify(await page.evaluate(ENTRY))}`);
	await shot(page, join(OUT, 'start-entered.png'));

	const fullscreen = await page.evaluate(async () => {
		document.querySelector('.aivn-fullscreen')?.click();
		await new Promise((resolve) => setTimeout(resolve, 800));
		return {
			element: document.fullscreenElement === null ? null : document.fullscreenElement.className,
			label: (document.querySelector('.aivn-fullscreen')?.textContent ?? '').trim(),
		};
	});
	console.log(`按下全屏之后：${JSON.stringify(fullscreen)}`);
	await shot(page, join(OUT, 'fullscreen-on.png'));

	await browser.close();
	console.log(`\n截图已写入 ${OUT}`);
} finally {
	await browser.close().catch(() => {});
	clearPlay(WORKSPACE, fixture);
}
