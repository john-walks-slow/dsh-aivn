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

/** 工作区就是 e2e 实例播种的那个目录（插件仓库根）。 */
export const WORKSPACE = process.env.E2E_WORKSPACE ?? E2E_HOME.replace(/\/\.dsh-e2e-home\/?$/, '');

const CHROMIUM = '/root/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';

/** 本机 ARM 机器上的共享无头 chromium。 */
/** 起浏览器。`extraArgs` 给语音那类需要放开自动播放策略的用例用。 */
export async function launch(extraArgs = []) {
	return pw.chromium.launch({
		executablePath: CHROMIUM,
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-dev-shm-usage',
			'--enable-unsafe-swiftshader',
			'--use-angle=swiftshader',
			...extraArgs,
		],
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

/**
 * 新建一个会话（**不复用旧会话**）。
 *
 * 复用是 e2e 的陷阱：会话的 Agent 预设在它开始那一刻就定死了，头部的标签只是只读
 * 回显；只有新会话界面上的座位 chip 能选。要演舞台就必须从新会话起步。
 */
export async function newSession(page) {
	const created = await page.evaluate(() => {
		const buttons = [...document.querySelectorAll('button, [role="button"], [role="treeitem"]')];
		const target = buttons.find((el) => (el.textContent ?? '').trim() === 'New Session');
		if (!target) return false;
		target.click();
		return true;
	});
	if (created) await page.waitForTimeout(2_500);
	return created;
}

/** 座位 chip 上的预设名（新会话界面；老会话里这个 chip 不存在）。 */
export function seatLabel(page) {
	return page.evaluate(() => {
		const seat = [...document.querySelectorAll('button[aria-haspopup="menu"]')].find((el) =>
			/preset|预设/i.test(el.getAttribute('title') ?? ''),
		);
		return seat ? (seat.textContent ?? '').trim() : null;
	});
}

/**
 * 在新会话界面上选 Agent 预设：点开座位 chip，选第一项以 `name` 开头的菜单项。
 *
 * 菜单项的可及名是「预设名 + 描述」拼起来的，所以只用前缀匹配。
 */
export async function pickPreset(page, name) {
	await page.evaluate(() => {
		const seat = [...document.querySelectorAll('button[aria-haspopup="menu"]')].find((el) =>
			/preset|预设/i.test(el.getAttribute('title') ?? ''),
		);
		if (seat && seat.getAttribute('aria-expanded') !== 'true') seat.click();
	});
	const opened = await waitFor(page, () => document.querySelectorAll('[role="menuitem"]').length > 0, {
		timeout: 10_000,
		label: '预设菜单展开',
	});
	const picked = await page.evaluate((wanted) => {
		const item = [...document.querySelectorAll('[role="menuitem"]')].find((el) =>
			(el.textContent ?? '').trim().startsWith(wanted),
		);
		if (!item) return false;
		item.click();
		return true;
	}, name);
	await page.waitForTimeout(1_500);
	return { opened, picked, current: await seatLabel(page) };
}

/** 在输入框里发一条消息（走真实一轮）。 */
export async function sendMessage(page, text) {
	const editor = page.locator('[contenteditable="true"]').first();
	await editor.click();
	await page.keyboard.type(text, { delay: 12 });
	await page.keyboard.press('Enter');
}

/** 列出当前可见的 tab 文本，便于断言。 */
export function listTabs(page) {
	return page.evaluate(() =>
		[...document.querySelectorAll('[role="tab"]')].map((tab) => (tab.textContent ?? '').trim()).filter(Boolean),
	);
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
			if (!node) continue;
			node.click();
			return true;
		}
		return false;
	}, label);
}

/** 等某个 tab 出现并切过去（会话离开空白态之后才会声明 conversation.view）。 */
export async function openViewTabWhenReady(page, label, timeout = 60_000) {
	const appeared = await waitFor(
		page,
		(wanted) =>
			[...document.querySelectorAll('[role="tab"]')].some((tab) => (tab.textContent ?? '').trim() === wanted),
		{ timeout, label: `tab ${label}`, arg: label },
	);
	if (!appeared) return false;
	const switched = await openViewTab(page, label);
	await page.waitForTimeout(1_500);
	return switched;
}

/**
 * 轮询一个页面内条件，返回它第一次为真的值（超时返回最后一次的假值）。
 *
 * 页面里断言用 evaluate 的原生轮询（Playwright 的 locator 断言会因为舞台元素
 * 在重播时被卸载而反复重试），这里只做「在 Node 侧等到发生」这一件事。
 */
export async function waitFor(page, probe, { timeout = 60_000, interval = 300, label = 'condition', arg } = {}) {
	const deadline = Date.now() + timeout;
	let last = false;
	for (;;) {
		last = await page.evaluate(probe, arg);
		if (last) return last;
		if (Date.now() >= deadline) {
			console.log(`    … 等待超时：${label}（${timeout}ms）`);
			return last;
		}
		await page.waitForTimeout(interval);
	}
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
