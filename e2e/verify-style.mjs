#!/usr/bin/env node
/**
 * e2e: 剧目舞台皮肤（插件验收）。
 *
 * 证明这条链成立：
 *   剧目根的 `theme.json` → `/aivn/play` 的 `theme` 字段 → 舞台根 div 的内联 CSS 变量
 *   → 画面的计算样式真的变了；没有这份文件时**一个变量都不注**（默认皮与从前逐像素一致）；
 *   文件里混了不认的键或非法值，只丢那一项，剧目照常开演。
 *
 * 最后一条走真链路：另一个会话里的搭台助手调用 `set_stage_style`，已经打开的舞台
 * **不刷新**就换装——这条是跨会话广播（帧推给同剧目的所有会话流）的验收。
 *
 * 运行：dsh-e2e run e2e/run.mjs style
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, PLAY, seedPlay } from './lib/fixture.mjs';
import {
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
	WORKSPACE as WORKSPACE_DIR,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

const THEME = join(WORKSPACE_DIR, 'theme.json');

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/** 一组计算样式的基线，抄自 stage.css 的 `.stage-root` 默认值。 */
const BASELINE = { ink: 'rgb(242, 235, 222)', stageBg: 'rgb(23, 19, 15)', dialogInk: '#f2ebde', radius: '10px' };

/**
 * 页面里的探针。
 *
 * 读的是**里面那层 `.stage-root`**（`StageTheater` 的根，也是变量真正的落点）上算出来的值，
 * 不是外层 div 的 `style` 属性：皮肤写成一条作用域规则，属性上看不见。台词字色是可见面——
 * 变量注没注、注在哪一层，最后都要在这一格上体现出来。
 */
const PROBE = () => {
	const wrapper = document.querySelector('.aivn-stage-view');
	const inner = wrapper?.querySelector('.theater.stage-root') ?? null;
	const read = (selector, prop) => {
		const node = document.querySelector(selector);
		return node ? getComputedStyle(node)[prop] : null;
	};
	const variable = (name) => (inner ? getComputedStyle(inner).getPropertyValue(name).trim() : null);
	return {
		rule: document.querySelector('style[data-aivn-theme]')?.textContent ?? '',
		dialogInk: variable('--dialog-ink'),
		radius: variable('--stage-radius'),
		ink: read('.theater-dialog .dialog-text', 'color'),
		stageBg: read('.theater-stage', 'backgroundColor'),
	};
};

/* ══════════════════════════════════ 一、离线令牌检查 ══════════════════════════════════ */

const bundle = join(ROOT, 'e2e/.style-tokens-check.mjs');
const built = spawnSync(
	'npx',
	['esbuild', 'e2e/style-tokens.check.ts', '--bundle', '--platform=node', '--format=esm', '--target=node22', `--outfile=${bundle}`],
	{ cwd: ROOT, encoding: 'utf8' },
);
if (built.status !== 0) {
	check('T0', false, `离线检查打不出来：${(built.stderr ?? '').split('\n').slice(-3).join(' ')}`);
} else {
	const ran = spawnSync('node', [bundle], { cwd: ROOT, encoding: 'utf8' });
	const line = (ran.stdout ?? '').split('\n').find((row) => row.startsWith('RESULT '));
	if (!line) {
		check('T0', false, `离线检查没有给出判据：${(ran.stderr ?? '').slice(0, 200)}`);
	} else {
		for (const row of JSON.parse(line.slice('RESULT '.length))) check(row.id, row.ok, row.note);
	}
	rmSync(bundle, { force: true });
}

/* ══════════════════════════════════ 二、真舞台 ══════════════════════════════════ */

const fixture = seedPlay(WORKSPACE_DIR);
rmSync(THEME, { force: true });
console.log(`夹具已就位：${WORKSPACE_DIR}（剧目 ${PLAY.id}）\n`);

/**
 * 开一个剧作家会话并把舞台挂起来。
 *
 * 每个场景新开一个会话而不是复用：舞台在挂载时读一次 `/aivn/play`，换了皮肤要重挂
 * 才读得到——会话切换是重挂的唯一确定入口（手改文件本来就要刷新/切会话才生效）。
 */
async function mountStage(page, label) {
	await newSession(page);
	const preset = await pickPreset(page, '剧作家');
	if (!preset.picked) return false;
	await sendMessage(page, PLAY.opening);
	const switched = await openViewTabWhenReady(page, 'AIVN', 90_000);
	if (!switched) return false;
	return Boolean(
		await waitFor(page, () => document.querySelector('.stage-root.aivn-stage-view') !== null, {
			timeout: 30_000,
			label: `${label} 舞台挂载`,
		}),
	);
}

const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	/** 每一次 `/aivn/play` 的应答，用来核对皮肤是从这条路来的。 */
	const plays = [];
	page.on('response', (response) => {
		if (!response.url().includes('/aivn/play?')) return;
		void response
			.json()
			.then((body) => plays.push(body))
			.catch(() => plays.push(null));
	});

	await gotoGui(page);
	await dismissOnboarding(page);
	check('S1', errors.length === 0, `首屏无报错（${errors.length}）`);

	/* —— 场景一：没有 theme.json —— */

	const mounted = await mountStage(page, '默认皮');
	check('S2', mounted, '剧作家会话的 AIVN tab 挂上了舞台');
	if (!mounted) {
		for (const id of ['S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11']) {
			check(id, false, '舞台没挂上，跳过');
		}
	} else {
		const plain = await page.evaluate(PROBE);
		check(
			'S3',
			plain.rule === '',
			`没有 theme.json 时不注任何变量（实际规则：${plain.rule || '无'}）`,
		);
		check(
			'S4',
			plain.ink === BASELINE.ink && plain.stageBg === BASELINE.stageBg && plain.dialogInk === BASELINE.dialogInk,
			`计算样式就是默认皮（台词 ${plain.ink}／衬底 ${plain.stageBg}／dialog-ink ${plain.dialogInk}）`,
		);
		check('S5', plain.radius === BASELINE.radius, `圆角默认 ${plain.radius}`);
		const payload = plays.at(-1);
		check(
			'S6',
			payload?.theme !== undefined && Object.keys(payload.theme).length === 0,
			`/aivn/play 的 theme 是空的（${JSON.stringify(payload?.theme ?? null)}）`,
		);
		await shot(page, join(ARTIFACTS, 'style-default.png'));

		/* —— 场景二：写一份合法皮肤，重挂 —— */

		writeFileSync(
			THEME,
			`${JSON.stringify(
				{ '--dialog-ink': '#ff5555', '--stage-bg': '#000000', '--stage-radius': '20px', '--accent': '#00ff00' },
				null,
				2,
			)}\n`,
		);
		check('S7', await mountStage(page, '剧目皮'), '写好 theme.json 后另开一个剧作家会话并挂上舞台');
		const themed = await page.evaluate(PROBE);
		check(
			'S8',
			['--dialog-ink', '--stage-bg', '--stage-radius', '--accent'].every((key) => themed.rule.includes(key)),
			`皮肤落成作用域规则（${themed.rule || '空'}）`,
		);
		check(
			'S9',
			themed.ink === 'rgb(255, 85, 85)' && themed.stageBg === 'rgb(0, 0, 0)' && themed.radius === '20px',
			`计算样式跟着变（台词 ${themed.ink}／衬底 ${themed.stageBg}／圆角 ${themed.radius}）`,
		);
		await shot(page, join(ARTIFACTS, 'style-themed.png'));

		/* —— 场景三：手改坏了，只丢坏键 —— */

		writeFileSync(
			THEME,
			`${JSON.stringify(
				{ '--dialog-ink': '#00ff00', '--stage-radius': '999px', '--evil-key': 'url(x)' },
				null,
				2,
			)}\n`,
		);
		check('S10', await mountStage(page, '半脏皮'), '再开一个会话读这份半脏的文件');
		const dirty = await page.evaluate(PROBE);
		const dirtyPayload = plays.at(-1);
		check(
			'S11',
			dirty.ink === 'rgb(0, 255, 0)' &&
				dirty.radius === BASELINE.radius &&
				!dirty.rule.includes('--evil-key') &&
				Object.keys(dirtyPayload?.theme ?? {}).length === 1,
			`坏键只丢自己（台词 ${dirty.ink}／圆角回默认 ${dirty.radius}／payload ${JSON.stringify(dirtyPayload?.theme ?? null)}）`,
		);
	}

	/* —— 场景四：搭台助手改皮肤，已打开的舞台不刷新就换装 —— */

	if (mounted) {
		const second = await newPage(browser);
		await gotoGui(second.page);
		await dismissOnboarding(second.page);
		await newSession(second.page);
		const hand = await pickPreset(second.page, '搭台助手');
		if (!hand.picked) {
			check('S12', false, `搭台助手预设没选上（${hand.current ?? '无'}）`);
		} else {
			await sendMessage(
				second.page,
				'调用 set_stage_style，把 dialog_ink 设成 #ff5555。别的键都不要动，改完告诉我。',
			);

			// 文件的落盘由搭台助手那一轮完成：轮询磁盘，最多等 4 分钟（真模型要跑几步）。
			const deadline = Date.now() + 240_000;
			let landed = false;
			while (Date.now() < deadline) {
				try {
					const file = JSON.parse(readFileSync(THEME, 'utf8'));
					if (file['--dialog-ink'] === '#ff5555') {
						landed = true;
						break;
					}
				} catch {
					/* 还没写或写了一半，继续等 */
				}
				await new Promise((resolve) => setTimeout(resolve, 2_000));
			}
			check('S12', landed, `搭台助手把 dialog_ink 写进了 theme.json（${landed ? '已落盘' : '超时'})`);

			if (landed) {
				// 判据取**内层舞台根上的变量**，不是某一行的字色：台词条上此刻可能是旁白
				// （`.narrate` 消费 `--dialog-ink-soft`），拿字色当判据会看运气。
				const live = await waitFor(
					page,
					() => {
						const inner = document.querySelector('.aivn-stage-view .theater.stage-root');
						return inner ? getComputedStyle(inner).getPropertyValue('--dialog-ink').trim() : '';
					},
					{ timeout: 20_000, label: '跨会话换装' },
				);
				const after = await page.evaluate(PROBE);
				check(
					'S13',
					live === '#ff5555' && after.rule.includes('#ff5555'),
					`原舞台不刷新就换了装（生效变量 ${live}／规则里有 #ff5555：${after.rule.includes('#ff5555')}）`,
				);
				await shot(page, join(ARTIFACTS, 'style-live.png'));
			} else {
				check('S13', false, '工具没落盘，换装无从谈起');
			}
		}
		await second.page.context().close();
	}
} finally {
	await browser.close();
	rmSync(THEME, { force: true });
	clearPlay(WORKSPACE_DIR, fixture);
}

const failed = results.filter((row) => !row.ok);
console.log('\n══ 结果汇总 ' + '═'.repeat(46));
for (const { id, ok, note } of results) console.log(`  ${ok ? '✓' : '✗'} ${id} ${note}`);
console.log(`\n通过率: ${results.length - failed.length}/${results.length}`);
process.exit(failed.length === 0 ? 0 : 1);
