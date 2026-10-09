#!/usr/bin/env node
/**
 * e2e: 新会话上的「开始游戏」，与舞台左上角的全屏键。
 *
 * 两条链，各自证明到「玩家真的做得到」为止：
 *
 *   **开始游戏**：空白（新）会话上，剧作家 chip 右边摆着「开始游戏」；按一下它把 `START`
 *   （`play.json` 的 `opening`）投给剧作家，**这一页随后落到舞台上**（页签列是那条消息带出来的，
 *   见 `src/client/stage-entry.ts` 的文件头）。搭台助手会话上这一枚不出现（那不是舞台会话）。
 *
 *   **全屏**：舞台左上角有全屏键，按下去 `document.fullscreenElement` 就是舞台那一层本身
 *   （不是某个内部元素——那会把台词条留在屏幕外），字面翻成「退出全屏」；再按一下还原。
 *
 * 为什么这一枚要自己发消息、而不是只切页签，见 `src/client/stage-entry.ts` 的文件头——
 * 空白会话不渲染页签列、DSH 也没有公开的 view 切换 API，这是两条墙。套件只钉我们能保证的那半边。
 *
 * 运行：dsh-e2e run e2e/verify-entry.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	E2E_HOME,
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	shot,
	waitFor,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

/* —— 会话日志（判据要从它取，与 verify-opening 同一套）—— */

const SLUG = `--${WORKSPACE.replace(/^\//, '').replace(/\//g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);
const PLAY_FILE = join(WORKSPACE, 'play.json');

/** 会话目录名就是会话 id；取最新建的那个。 */
const newestSession = () => {
	if (!existsSync(SESSIONS)) return undefined;
	return readdirSync(SESSIONS)
		.filter((name) => statSync(join(SESSIONS, name)).isDirectory())
		.sort((a, b) => statSync(join(SESSIONS, b)).mtimeMs - statSync(join(SESSIONS, a)).mtimeMs)[0];
};

/** 会话日志是多帧 zstd，只有 CLI 解得开。 */
function sessionEvents(session) {
	const file = join(SESSIONS, session, 'session.v4.jsonl.zstd');
	if (!existsSync(file)) return [];
	return execFileSync('zstd', ['-dc', file], { maxBuffer: 64 * 1024 * 1024 })
		.toString('utf8')
		.split('\n')
		.filter((line) => line.trim() !== '')
		.flatMap((line) => {
			try {
				return [JSON.parse(line)];
			} catch {
				return [];
			}
		});
}

/** 一条 user/message 的纯文本。 */
const textOf = (event) =>
	(event.data?.content ?? [])
		.filter((block) => block.type === 'text')
		.map((block) => block.text)
		.join('')
		.trim();
const userTexts = (session) => sessionEvents(session).filter((event) => event.type === 'user/message').map(textOf);

/** 全部判据的 id（`skip()` 按 id 列表跳过后续判据，漏抄的会「既不通过也不失败」）。 */
const KNOWN_IDS = ['E1', 'E2', 'E3', 'G0', 'G1', 'G2', 'G3', 'G4', 'F1', 'F2', 'F3'];

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};
/** 前置条件没成立时后续判据没法测——记为未通过，但别在长等待上空耗。 */
const skip = (ids, note) => {
	for (const id of ids) check(id, false, note);
};

/** 那一枚「开始游戏」：不在就是 null。 */
const ENTRY = () => {
	const el = document.getElementById('dsh-aivn-start-game');
	return el === null ? null : { text: (el.textContent ?? '').trim() };
};

const TABS = () => [...document.querySelectorAll('[role="tab"]')].map((el) => (el.textContent ?? '').trim());

/** 当前选中的页签（`aria-selected`）。 */
const ACTIVE_TAB = () => {
	const el = [...document.querySelectorAll('[role="tab"]')].find((tab) => tab.getAttribute('aria-selected') === 'true');
	return el === null || el === undefined ? null : (el.textContent ?? '').trim();
};

/** 剧作家第一轮要读一遍剧目再落笔，窗口按分钟给（与 verify-stage 同一个口径）。 */
const FIRST_BEAT_TIMEOUT = 600_000;

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	/* —— 搭台助手：这一枚不该出现 —— */

	await newSession(page);
	await pickPreset(page, '搭台助手');
	await page.waitForTimeout(2_500);
	check('E1', (await page.evaluate(ENTRY)) === null, '搭台助手会话上没有「开始游戏」（那不是舞台会话）');

	/* —— 空白剧作家会话：这一枚该在，且在剧作家右边 —— */

	await newSession(page);
	const preset = await pickPreset(page, '剧作家');
	const shown = await waitFor(page, () => document.getElementById('dsh-aivn-start-game') !== null, {
		timeout: 30_000,
		label: '空白会话上的「开始游戏」',
	});
	const state = await page.evaluate(ENTRY);
	check(
		'E2',
		Boolean(shown) && state?.text === '开始游戏',
		`空白剧作家会话上摆着「开始游戏」（预设显示：${preset.current ?? '无'}；那一枚：${JSON.stringify(state)}）`,
	);

	// 「在剧作家右边」按坐标判：左边那个 chip 的右边缘应当在它的左边缘之左，且两者竖直方向重叠。
	const placed = await page.evaluate(() => {
		const button = document.getElementById('dsh-aivn-start-game');
		const slot = document.querySelector('[data-slot="conversation.hero.agentPreset"]');
		const chip = slot?.querySelector('button') ?? null;
		if (button === null || chip === null) return null;
		const a = chip.getBoundingClientRect();
		const b = button.getBoundingClientRect();
		return {
			// 它是这一格的**紧邻下一个兄弟**（宿主画的就是这一格），不只是「在右边某处」。
			nextSibling: slot?.nextElementSibling === button,
			rightOf: b.left >= a.right - 1,
			sameRow: Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0,
		};
	});
	check(
		'E3',
		placed?.rightOf === true && placed?.sameRow === true && placed?.nextSibling === true,
		`它紧挨在剧作家 chip 右边同一行（是那一格的紧邻兄弟：${placed?.nextSibling}）`,
	);
	await shot(page, join(ARTIFACTS, 'start-blank.png'));

	if (!shown) {
		skip(KNOWN_IDS.slice(KNOWN_IDS.indexOf('E3') + 1), '空白会话上没有「开始游戏」，跳过');
	} else {
		/* —— 按下它：发 START、落到舞台 —— */

		// 它发出去的就是剧目的开局指令。这里的判据不看 HTTP 响应，而是**直接从会话日志**里
		// 找那条消息——这才是「点击之后真的发送了 START」的证据（与 verify-opening 同一个手法）。
		const session = newestSession();
		const opening = readFileSync(PLAY_FILE, 'utf8');
		const openingText = JSON.parse(opening).opening;
		check('G0', typeof session === 'string' && typeof openingText === 'string', `夹具开局指令：${JSON.stringify(openingText)}`);

		const pressed = await page.evaluate(() => {
			const el = document.getElementById('dsh-aivn-start-game');
			if (el === null) return false;
			el.click();
			return true;
		});
		check('G1', pressed, '「开始游戏」按得下去');

		// 按下之后这一页自己落到舞台上（页签列由那条 START 带出来，随后自动切过去）。
		const mounted = await waitFor(page, () => document.querySelector('.aivn-stage-view') !== null, {
			timeout: FIRST_BEAT_TIMEOUT,
			interval: 1_000,
			label: '按下「开始游戏」之后落到舞台',
		});
		check(
			'G2',
			Boolean(mounted),
			`按一下就落到舞台上（页签：${(await page.evaluate(TABS)).join(' / ') || '无'}）`,
		);
		check(
			'G3',
			(await page.evaluate(ACTIVE_TAB)) === 'AIVN',
			`选中的页签就是 AIVN（当前：${await page.evaluate(ACTIVE_TAB)}）`,
		);
		await shot(page, join(ARTIFACTS, 'start-entered.png'));

		// 真正发出去的是那条 START：从会话日志里找玩家消息（点击之后才写下的那一条）。
		// 日志是异步落盘的，轮询到它出现为止。
		let texts = [];
		const until = Date.now() + 20_000;
		while (Date.now() < until) {
			texts = userTexts(session);
			if (texts.includes(openingText)) break;
			await page.waitForTimeout(500);
		}
		check(
			'G4',
			texts.includes(openingText),
			`START（${JSON.stringify(openingText)}）真的投给了剧作家（会话里的玩家消息：${JSON.stringify(texts.slice(0, 3))}）`,
		);

		if (!mounted) {
			skip(['F1', 'F2', 'F3'], '舞台没挂上，全屏键无从测起');
		} else {
			/* —— 全屏键 —— */

			const button = await page.evaluate(() => {
				const el = document.querySelector('.aivn-fullscreen');
				return el === null ? null : { text: (el.textContent ?? '').trim() };
			});
			// 「左上角」的判据取坐标，不取 DOM 顺序：这一枚是绝对定位的浮层，位置就是它的全部意义。
			const box = await page.evaluate(() => {
				const view = document.querySelector('.aivn-stage-view')?.getBoundingClientRect();
				const el = document.querySelector('.aivn-fullscreen')?.getBoundingClientRect();
				return view && el ? { left: el.left - view.left, top: el.top - view.top } : null;
			});
			check(
				'F1',
				Boolean(button) && button?.text === '全屏' && box !== null && box.left < 80 && box.top < 80,
				`舞台左上角有全屏键（离视图左边 ${Math.round(box?.left ?? -1)}px、上边 ${Math.round(box?.top ?? -1)}px）`,
			);

			const entered = await page.evaluate(async () => {
				document.querySelector('.aivn-fullscreen')?.click();
				await new Promise((resolve) => setTimeout(resolve, 800));
				return {
					self: document.fullscreenElement !== null && document.fullscreenElement.classList.contains('aivn-stage-view'),
					label: (document.querySelector('.aivn-fullscreen')?.textContent ?? '').trim(),
				};
			});
			check(
				'F2',
				entered.self && entered.label === '退出全屏',
				`按下去整块舞台视图进全屏、字面翻成退出（全屏元素是舞台那一层：${entered.self}）`,
			);
			await shot(page, join(ARTIFACTS, 'fullscreen-on.png'));

			const exited = await page.evaluate(async () => {
				document.querySelector('.aivn-fullscreen')?.click();
				await new Promise((resolve) => setTimeout(resolve, 800));
				return {
					off: document.fullscreenElement === null,
					label: (document.querySelector('.aivn-fullscreen')?.textContent ?? '').trim(),
				};
			});
			check('F3', exited.off && exited.label === '全屏', '再按一下退出全屏、字面翻回（或按浏览器自己的 Esc）');
		}
	}

	await browser.close();
} finally {
	await browser.close().catch(() => {});
	clearPlay(WORKSPACE, fixture);
}

const failed = results.filter((row) => !row.ok);
console.log(`\n通过率: ${results.length - failed.length}/${results.length}`);
process.exit(failed.length > 0 ? 1 : 0);
