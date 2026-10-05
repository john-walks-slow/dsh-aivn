// e2e/lib/boot.mjs —— 共享的零 API 引导助手。
//
// 约定（见 dsh-e2e 技能）：连接地址与 sessions 目录一律从 DSH_E2E_PORT /
// DSH_E2E_HOME 拼，禁止硬编码端口与 home 路径；不用 networkidle
// （/plugins/events 是 SSE 长连接，永远不 idle）。
import pw from '~/projects/camoufox-mcp/node_modules/playwright-core/index.js';

export const E2E_URL =
	process.env.E2E_URL ??
	(process.env.DSH_E2E_PORT
		? `http://127.0.0.1:${process.env.DSH_E2E_PORT}/?token=${process.env.DSH_E2E_TOKEN || 'e2etest'}`
		: undefined);
export const E2E_HOME = process.env.E2E_HOME ?? process.env.DSH_E2E_HOME;

if (!E2E_URL || !E2E_HOME) {
	throw new Error('missing DSH_E2E_PORT/DSH_E2E_HOME — 请通过 `dsh-e2e run` 执行');
}

const CHROMIUM = '/root/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';

/** 本机 ARM 机器上的共享无头 chromium。 */
export async function launch() {
	return pw.chromium.launch({
		executablePath: CHROMIUM,
		headless: true,
		args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
	});
}

/** 新开一个收集 pageerror 的页面。 */
export async function newPage(browser, viewport = { width: 1280, height: 860 }) {
	const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
	const page = await context.newPage();
	const errors = [];
	page.on('pageerror', (error) => errors.push(String(error).slice(0, 240)));
	page.on('console', (message) => {
		if (message.type() !== 'error') return;
		// 资源 404 由 response 监听按 URL 记录，这里的文案拿不到 URL，别再记一遍。
		if (/Failed to load resource/i.test(message.text())) return;
		errors.push(`console: ${message.text().slice(0, 240)}`);
	});
	return { page, errors };
}

/** 打开 GUI 并等首屏稳定（不用 networkidle）。 */
export async function gotoGui(page) {
	await page.goto(E2E_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
	await page.waitForTimeout(6_000);
}

/** 关掉首次进入的「添加 API key」引导弹窗（不配 key 的实例每次都会弹）。 */
export async function dismissOnboarding(page) {
	const clicked = await page.evaluate(() => {
		const buttons = [...document.querySelectorAll('button, [role="button"]')];
		const target = buttons.find((el) => /Configure later|稍后配置|以后再说/i.test((el.textContent ?? '').trim()));
		if (!target) return false;
		target.click();
		return true;
	});
	if (clicked) await page.waitForTimeout(1_500);
	return clicked;
}

/** 点一个已存在的会话行；没有就点 New Session。返回 'reused' | 'created' | 'none'。 */
export async function ensureSession(page) {
	const reused = await page.evaluate(() => {
		const rows = [...document.querySelectorAll('[role="treeitem"]')].filter(
			(row) => String(row.className).includes('sessionRow') && (row.textContent ?? '').trim() !== 'New Session',
		);
		if (rows.length === 0) return false;
		rows[0].click();
		return true;
	});
	if (reused) {
		await page.waitForTimeout(2_500);
		return 'reused';
	}

	const created = await page.evaluate(() => {
		const buttons = [...document.querySelectorAll('button, [role="button"], [role="treeitem"]')];
		const target = buttons.find((el) => (el.textContent ?? '').trim() === 'New Session');
		if (!target) return false;
		target.click();
		return true;
	});
	await page.waitForTimeout(3_000);
	return created ? 'created' : 'none';
}

/** 在输入框里发一条消息（走真实一轮；只在必须让会话离开空白态时用）。 */
export async function sendMessage(page, text) {
	const editor = page.locator('[contenteditable="true"]').first();
	await editor.click();
	await page.keyboard.type(text, { delay: 12 });
	await page.keyboard.press('Enter');
}

/** 点击会话头部的视图 tab（按可见文本匹配，向上找到 role=tab/button）。 */
export async function openViewTab(page, label) {
	return page.evaluate((wanted) => {
		const leaves = [...document.querySelectorAll('*')].filter(
			(el) => el.children.length === 0 && (el.textContent ?? '').trim() === wanted,
		);
		for (const leaf of leaves) {
			let node = leaf;
			while (node && node.getAttribute('role') !== 'tab' && node.tagName !== 'BUTTON') node = node.parentElement;
			if (node && node.getAttribute('role') === 'tab') {
				node.click();
				return true;
			}
			if (node) {
				node.click();
				return true;
			}
		}
		return false;
	}, label);
}

/** 列出当前可见的 tab 文本，便于断言。 */
export function listTabs(page) {
	return page.evaluate(() =>
		[...document.querySelectorAll('[role="tab"]')].map((tab) => (tab.textContent ?? '').trim()).filter(Boolean),
	);
}

export async function shot(page, file) {
	await page.screenshot({ path: file });
}

/**
 * 原子地点击第一个匹配元素。
 *
 * 舞台上的停止点按钮会随脚本循环被重建，Playwright 的 actionability 检查
 * 会因为元素在检查与点击之间被卸载而一直重试；在自己的组件上直接派发
 * DOM click 既确定又快。
 */
export async function clickInPage(page, selector) {
	return page.evaluate((sel) => {
		const target = document.querySelector(sel);
		if (!target) return false;
		target.click();
		return true;
	}, selector);
}
