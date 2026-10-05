#!/usr/bin/env node
/**
 * e2e: 舞台语音的实拍图（给人看的，不做断言）。
 *
 * 开到「剧作家已经开口、语音开关在场」那一刻，把舞台整块拍下来。
 *
 * 运行：dsh-e2e run e2e/shot-voice.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	openViewTabWhenReady,
	pickPreset,
	sendMessage,
	shot,
	waitFor,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
/** 与 verify-stage 同一个落点（已在 .gitignore 里）。 */
const OUT = join(ROOT, 'e2e-artifacts');
mkdirSync(OUT, { recursive: true });

const fixture = seedPlay(WORKSPACE);
const browser = await launch(['--autoplay-policy=no-user-gesture-required']);
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);
	await newSession(page);
	await pickPreset(page, '剧作家');
	await sendMessage(page, PLAY.opening);
	await waitFor(
		page,
		() => [...document.querySelectorAll('span[title]')].some((el) => (el.textContent ?? '').trim() === '剧作家'),
		{ timeout: 30_000, label: '会话头回显预设名' },
	);
	await openViewTabWhenReady(page, '舞台', 90_000);

	// 等第一句台词上屏：语音开关就在对话区右下，和台词一起才看得出关系。
	const shown = await waitFor(
		page,
		() => (document.querySelector('.stage-root.aivn-stage-view')?.textContent ?? '').length > 20,
		{ timeout: 90_000, label: '舞台有内容' },
	);
	console.log(`舞台有内容：${shown}`);

	const box = await page.locator('.stage-root.aivn-stage-view').first().boundingBox();
	if (box) await page.mouse.click(box.x + box.width / 2, box.y + Math.min(160, box.height / 3));

	// 再等一会儿，让声音有机会回来：喇叭/开关的状态与「正在生成」就那几秒。
	await page.waitForTimeout(12_000);
	// 开关到底在不在场、是不是开着：按 DOM 读，不靠看图。
	const voiceUi = await page.evaluate(() => {
		const btn = [...document.querySelectorAll('button')].find((el) => (el.getAttribute('title') ?? '').startsWith('Voice:'));
		return {
			present: Boolean(btn),
			title: btn?.getAttribute('title') ?? '',
			on: (btn?.className ?? '').includes('tgl-on'),
		};
	});
	console.log(`语音开关：${JSON.stringify(voiceUi)}`);
	await shot(page, join(OUT, 'voice-stage.png'));
	console.log(`已存 ${join(OUT, 'voice-stage.png')}`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
}
