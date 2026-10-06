#!/usr/bin/env node
/**
 * e2e: 舞台视图（插件验收）。
 *
 * 证明这条链完整成立：
 *   在插件仓库根落一份剧目夹具 → 新建会话并选「剧作家」预设 → 说一句
 *   → 会话头部出现「AIVN」tab（只在剧作家预设的会话上）→ 选中后整块对话主区由 `@aivn/stage` 渲染
 *   → 宿主 SSE 的 IR 流被消费并逐字显示 → 停止点的选项把输入发回宿主、
 *   在时间线上落成一行回执，剧作家接着写完第二轮再交一个停止点。
 *
 * 运行：dsh-e2e run e2e/run.mjs stage
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	E2E_URL,
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	listTabs,
	newPage,
	newSession,
	openViewTabWhenReady,
	pickPreset,
	sendMessage,
	shot,
	waitFor,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

/**
 * 剧作家是真 LLM，等待窗口按「分钟」给。
 *
 * 实测第一轮要 ~4.5 分钟：模型会先 ls / read 一圈把剧目看明白，再落笔。窗口给窄了会
 * 变成「它写完了、断言刚超时」——2026-10-05 第一版 240s 就踩过这个，差 30 秒。
 * 第二轮省掉探索，快得多。
 */
const FIRST_BEAT_TIMEOUT = 600_000;
const BEAT_TIMEOUT = 420_000;

/**
 * 全部判据的 id。
 *
 * `skip()` 要按 id 列表跳过后续判据，而失败分支里挨个手抄 id 迟早会漏（漏掉的那条
 * 既不通过也不失败，报告看上去还是完整的——2026-10-05 的 `KNOWN_IDS` 干脆是没定义的
 * 名字，一走进这个分支就 ReferenceError）。写在一处，加判据时只改这里。
 */
const KNOWN_IDS = [
	'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7',
	'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14',
];

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};
/** 前置条件没成立时后续判据没法测——记为未通过，但别在长等待上空耗。 */
const skip = (ids, note) => {
	for (const id of ids) check(id, false, note);
};

/** 停止点面板上的真实选项（「开演」是空舞台的开局按钮，不是剧作家交回的停止点）。 */
const READ_CHOICES = () => {
	const overlay = document.querySelector('.choice-overlay');
	if (!overlay) return false;
	const real = [...overlay.querySelectorAll('.choice')]
		.map((el) => (el.textContent ?? '').trim())
		.filter((text) => text !== '' && text !== '开演');
	return real.length > 0 ? real : false;
};

const fixture = seedPlay(WORKSPACE);
console.log(`夹具已就位：${WORKSPACE}（剧目 ${PLAY.id}）\n`);

const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	const inputs = [];
	const aivnResponses = [];
	page.on('request', (request) => {
		if (!request.url().includes('/aivn/input')) return;
		try {
			inputs.push(String(JSON.parse(request.postData() ?? '{}').text ?? ''));
		} catch {
			inputs.push('<unparsable>');
		}
	});
	page.on('response', (response) => {
		const url = response.url();
		if (url.includes('/aivn/')) aivnResponses.push(`${response.status()} ${new URL(url).pathname}`);
	});
	page.on('requestfailed', (request) => {
		if (request.url().includes('/aivn/')) aivnResponses.push(`FAILED ${request.url()}`);
	});

	await gotoGui(page);
	await dismissOnboarding(page);
	check('S1', errors.length === 0, `首屏无报错（${errors.length}）`);

	/* —— 新会话 + 剧作家预设 —— */

	check('S2', await newSession(page), '已新建会话（会话的预设开局即定死，必须新建）');

	const preset = await pickPreset(page, '剧作家');
	check(
		'S3',
		preset.picked && preset.current === '剧作家',
		`座位已选为「剧作家」（显示：${preset.current ?? '无'}）`,
	);
	await shot(page, join(ARTIFACTS, 'stage-preset.png'));

	await sendMessage(page, PLAY.opening);
	const headerLabel = await waitFor(
		page,
		() => [...document.querySelectorAll('span[title]')].some((el) => (el.textContent ?? '').trim() === '剧作家'),
		{ timeout: 30_000, label: '会话头回显预设名' },
	);
	check('S4', Boolean(headerLabel), '会话头回显「剧作家」预设');

	/* —— 舞台 tab 与挂载 —— */

	const switched = await openViewTabWhenReady(page, 'AIVN', 90_000);
	const mounted =
		switched && (await waitFor(page, () => document.querySelector('.stage-root.aivn-stage-view') !== null, {
			timeout: 30_000,
			label: '舞台视图挂载',
		}));
	check(
		'S5',
		Boolean(mounted),
		`切到「AIVN」后整块主区由插件渲染（tab：${(await listTabs(page)).join(' / ') || '无'}）`,
	);

	if (!mounted) {
		await shot(page, join(ARTIFACTS, 'stage-not-mounted.png'));
		// S5 已经在这里判过了，跳的是它之后的全部。
		skip(KNOWN_IDS.slice(KNOWN_IDS.indexOf('S5') + 1), 'AIVN tab 未挂载，跳过');
	} else {
		const directorBar = await page.evaluate(() => document.querySelector('.theater-director') !== null);
		check('S6', !directorBar, '导演工作栏未渲染（directorBar={false}）');

		const notice = await page.evaluate(
			() => document.querySelector('.aivn-stage-notice')?.textContent?.trim() ?? '',
		);
		check('S7', notice === '', `舞台上没有空态提示（${notice || '无'}）`);
		await shot(page, join(ARTIFACTS, 'stage-idle.png'));

		/* —— 翻页节奏交给 Auto —— */

		// 台词的推进默认归玩家（Auto 缺省关）：不点，剧作家写下的几十行会一直排在队列里，
		// 画面停在玩家自己那一句上。验收要的是把整段演完，所以先按一下 Auto。
		const auto = await page.evaluate(() => {
			const button = [...document.querySelectorAll('.dialog-options .dir-btn')].find(
				(el) => (el.textContent ?? '').trim() === 'Manual',
			);
			if (!button) return false;
			button.click();
			return true;
		});
		check('S8', auto, '已切到 Auto（台词自动推进）');
	
		/* —— IR 流：台词逐字长出来 —— */

		// 空舞台的台词条本身就有一句提示（「还没开演——按画面上的开演开始」），
		// 所以判据是「它被真台词换掉了」，不是「它非空」。
		const hint = await page.evaluate(
			() => (document.querySelector('.theater-dialog .dialog-text')?.textContent ?? '').trim(),
		);
		const onScreen = await waitFor(
			page,
			(placeholder) => {
				const text = (document.querySelector('.theater-dialog .dialog-text')?.textContent ?? '').trim();
				return text !== '' && text !== placeholder;
			},
			{ timeout: FIRST_BEAT_TIMEOUT, interval: 1_000, label: '台词出字', arg: hint },
		);
		const firstLine = await page.evaluate(() => ({
			text: (document.querySelector('.theater-dialog .dialog-text')?.textContent ?? '').trim(),
			name: (document.querySelector('.theater-dialog .dialog-name')?.textContent ?? '').trim(),
		}));
		check('S9', Boolean(onScreen), `台词已上屏（「${firstLine.name}」：${firstLine.text.slice(0, 24)}…）`);
		await shot(page, join(ARTIFACTS, 'stage-dialogue.png'));

		/* —— 停止点：剧作家写完了把选项交回来 —— */

		const firstStop = onScreen
			? await waitFor(page, READ_CHOICES, { timeout: FIRST_BEAT_TIMEOUT, interval: 1_000, label: '停止点选项' })
			: false;
		const options = Array.isArray(firstStop) ? firstStop : [];
		check('S10', options.length > 0, `停止点交出 ${options.length} 个选项：${options.join(' / ').slice(0, 60)}`);
		await shot(page, join(ARTIFACTS, 'stage-stop.png'));

		if (options.length === 0) {
			skip(KNOWN_IDS.slice(KNOWN_IDS.indexOf('S11')), '没有停止点，跳过');
		} else {
			/* —— 选项 → 宿主 → 剧作家 —— */

			const before = inputs.length;
			const clicked = await page.evaluate(() => {
				const overlay = document.querySelector('.choice-overlay');
				if (!overlay) return '';
				const button = [...overlay.querySelectorAll('.choice')].find(
					(el) => !['', '开演'].includes((el.textContent ?? '').trim()),
				);
				if (!button) return '';
				const text = (button.textContent ?? '').trim();
				button.click();
				return text;
			});
			// 点击在页面里派发，POST 是异步发出的——给它一小段时间落网。
			await page.waitForTimeout(2_500);
			check(
				'S11',
				inputs.length > before && inputs[inputs.length - 1] === clicked,
				`选项原文已投给剧作家（点了「${clicked}」，收到「${inputs[inputs.length - 1] ?? '无'}」）`,
			);

			// 玩家的这一笔由宿主的 inbox 监听落进时间线，播放头走到它就整行显示。
			const echo = await waitFor(
				page,
				(wanted) => (document.querySelector('.theater-dialog .dialog-text')?.textContent ?? '').trim() === wanted,
				{ timeout: 120_000, interval: 500, label: '玩家回执上屏', arg: clicked },
			);
			check('S12', Boolean(echo), `回执回到画面（「${clicked}」）`);
			await shot(page, join(ARTIFACTS, 'stage-echo.png'));

			/* —— 第二轮：剧作家接着写，再交一个停止点 —— */

			const secondStop = await waitFor(
				page,
				() => {
					const overlay = document.querySelector('.choice-overlay');
					if (!overlay) return false;
					const real = [...overlay.querySelectorAll('.choice')]
						.map((el) => (el.textContent ?? '').trim())
						.filter((text) => text !== '' && text !== '开演');
					return real.length > 0 ? real.join(' / ') : false;
				},
				{ timeout: BEAT_TIMEOUT, interval: 1_000, label: '第二轮停止点' },
			);
			check('S13', Boolean(secondStop), `第二轮也交出了停止点：${String(secondStop).slice(0, 60)}`);
			await shot(page, join(ARTIFACTS, 'stage-next-beat.png'));
		}
	}

	check('S14', errors.length === 0, `全程无页面报错（${errors.length}）`);
	if (errors.length) for (const line of errors.slice(0, 6)) console.log(`    ! ${line}`);
	console.log(`    aivn 响应: ${[...new Set(aivnResponses)].join(' | ') || '无'}`);
	console.log(`    URL: ${E2E_URL}`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
	console.log(`\n夹具已清理：${WORKSPACE}`);
}

const failed = results.filter((row) => !row.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
console.log(`截图目录：${ARTIFACTS}`);
process.exit(failed.length ? 1 : 0);
