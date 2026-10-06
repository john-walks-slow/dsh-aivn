#!/usr/bin/env node
/**
 * e2e: 插件设置面（插件验收）。
 *
 * 证明这条链成立：
 *   侧边栏 Plugins 页 → dsh-aivn 的详情页里出现配置卡（宿主半边用 `.volatile()` 声明的 17 个字段）
 *   → 改一个值保存 → 落进当前 profile 的 `cordis.patch.yml`，且**不重启**插件就重建能力面
 *     （用 `/aivn/play` 的 `voice` 字段作证：它读的是运行期面，不是配置文件）
 *   → 密钥字段全程脱敏（存进去之后，页面与网络响应里都不再出现明文）
 *   → 清除按钮把它 unset 回「未配置」，而其它已存字段原样保留。
 *
 * 这一跑会临时改 e2e 实例的 profile 配置（它本来就是一次性的 home），跑完原样写回。
 *
 * 运行：dsh-e2e run e2e/run.mjs settings
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay } from './lib/fixture.mjs';
import {
	dismissOnboarding,
	E2E_HOME,
	gotoGui,
	launch,
	newPage,
	newSession,
	shot,
	waitFor,
	WORKSPACE as WORKSPACE_DIR,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

const PATCH = join(E2E_HOME, 'profiles', 'web', 'cordis.patch.yml');
const SLUG = `--${WORKSPACE_DIR.replace(/^\//, '').replace(/[/.]/g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);

/** 测试用的一把假 key（不是真凭据；这个字符串只该出现在 profile 的配置文件里）。 */
const FAKE_KEY = 'e2e-fake-fish-key-0123456789';

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/**
 * 本套件唯一的**环境前提**：实例得是「没带 `DSH_AIVN_TTS_KEYS`」起来的。
 *
 * S8/S12 断言「没配 key 时 `/aivn/play` 的 `voice` 必须是 false」，而只要实例进程里有这个变量，
 * 环境兜底就会让它恒为 true，那两条必然假红；跑 `voice` 套件时又恰恰**必须**带上它，于是
 * 「刚跑完语音再跑设置」会得到两条看起来像产品坏了的红。
 *
 * 依据是 `dsh-e2e` 启动时写进 `instance.json` 的 `env` 快照（只记变量名不记值）——启动者此刻
 * 就知道自己带着什么环境。不去读 `/proc/<pid>/environ` 猜：PID 复用、过期的 instance.json
 * 都会给出错误结论。快照**不在**也不算通过（旧版 harness 起的实例），直接让人重起——
 * 在「读不到」时静默放行，等于它最需要起作用的环境里恰好失效。
 *
 * 已知残差（认了，不为它写防御代码）：这份快照是**声明**不是**观测**。实例被别人重启、或有人
 * 事后往运行环境里注 key，守卫会放过；那种情形下套件的红也确实不是产品的错。
 */
function instanceEnv() {
	try {
		const info = JSON.parse(readFileSync(join(E2E_HOME, 'instance.json'), 'utf8'));
		return typeof info.env === 'string' ? info.env.split(',').filter(Boolean) : null;
	} catch {
		return null;
	}
}

const HOW_TO_RESTART = [
	`  怎么办：cd ${ROOT} && dsh-e2e stop && dsh-e2e start --wait-ready（不要带该变量）后再跑；`,
	'          要跑 voice 套件时才 export DSH_AIVN_TTS_KEYS。',
].join('\n');

const instanceEnvNames = instanceEnv();
if (instanceEnvNames === null) {
	console.error(
		['✗ 读不到实例的环境快照（instance.json 里没有 env 字段），无法判定本套件的前提——', '  这个实例是旧版 dsh-e2e 起的。', HOW_TO_RESTART].join('\n'),
	);
	process.exit(2);
}
if (instanceEnvNames.includes('DSH_AIVN_TTS_KEYS')) {
	console.error(
		[
			'✗ 这个实例带着 DSH_AIVN_TTS_KEYS 起来的，本套件要求没有它的实例：',
			'  S8/S12 断言「没配 key 时 voice 为 false」，环境变量兜底会把它顶成 true，两条必然假红。',
			HOW_TO_RESTART,
		].join('\n'),
	);
	process.exit(2);
}

const patchText = () => (existsSync(PATCH) ? readFileSync(PATCH, 'utf8') : '');

/** 把 patch 里 `- id: dsh-aivn` 那一段整块去掉（这一跑要从「没配」起步，结尾再原样写回）。 */
function stripAivnEntry(text) {
	const lines = text.split('\n');
	const start = lines.findIndex((line) => /^-\s+id:\s*dsh-aivn\s*$/.test(line));
	if (start < 0) return text;
	let end = start + 1;
	while (end < lines.length && !/^-\s/.test(lines[end])) end += 1;
	lines.splice(start, end - start);
	return lines.join('\n');
}

/** 最新那个会话目录名（= 会话 id）。 */
function newestSession() {
	const dirs = readdirSync(SESSIONS)
		.map((name) => ({ name, at: statSync(join(SESSIONS, name)).mtimeMs }))
		.sort((a, b) => b.at - a.at);
	return dirs[0]?.name;
}

/** 从页面里问一次 `/aivn/play`（同源 fetch，带得上 GUI 的 token cookie）。 */
const playInfo = (page, sessionId) =>
	page.evaluate(
		(id) =>
			fetch(`/aivn/play?session=${encodeURIComponent(id)}`)
				.then((response) => response.json())
				.catch(() => null),
		sessionId,
	);

const valueOf = (page, id) => page.evaluate((sel) => document.querySelector(sel)?.value ?? null, `#aivn-config-${id}`);

/** 某个字段那一格的整段文字（含「已配置 / 未配置」徽标）。 */
const rowText = (page, id) =>
	page.evaluate((sel) => {
		const input = document.querySelector(sel);
		return input?.closest('div')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
	}, `#aivn-config-${id}`);

const clickByText = (page, text) =>
	page.evaluate((wanted) => {
		const target = [...document.querySelectorAll('button, [role="button"]')].find(
			(node) => (node.textContent ?? '').trim() === wanted,
		);
		if (!target) return false;
		target.click();
		return true;
	}, text);

/** 侧边栏进 Plugins 页。 */
const openPlugins = (page) =>
	page.evaluate(() => {
		for (const node of document.querySelectorAll('button, a, [role="button"], [role="tab"], span, div')) {
			if (node.children.length > 0) continue;
			if (!/^(plugins|插件)$/i.test((node.textContent ?? '').trim())) continue;
			let target = node;
			while (target && target.tagName !== 'BUTTON' && target.tagName !== 'A') target = target.parentElement;
			(target ?? node).click();
			return true;
		}
		return false;
	});

/** 打开某个 bundle 的详情页——入口是卡片上那个 `aria-label="View <包名>"` 的按钮。 */
const openBundle = (page, name) =>
	page.evaluate((wanted) => {
		const row = document.querySelector(`[data-plugin-package="${wanted}"]`);
		const button = row?.querySelector(`button[aria-label="View ${wanted}"]`);
		if (!button) return false;
		button.click();
		return true;
	}, name);

/** 改一个字段：清空再输入（草稿由表单模型接管）。 */
async function edit(page, id, text) {
	await page.fill(`#aivn-config-${id}`, '');
	await page.fill(`#aivn-config-${id}`, text);
}

/** 进配置卡那条路：Plugins 页 → dsh-aivn 详情 → 卡片挂上。 */
async function openCard(page) {
	await openPlugins(page);
	await page.waitForTimeout(2_000);
	await openBundle(page, 'dsh-aivn');
	return waitFor(page, () => document.querySelector('#aivn-config-ttsConcurrency') !== null, {
		timeout: 20_000,
		label: '配置卡渲染',
	});
}

const originalPatch = patchText();
const fixture = seedPlay(WORKSPACE_DIR);
writeFileSync(PATCH, stripAivnEntry(originalPatch));

const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	/** 网络响应里出现过的那把假 key（应当一次都没有）。 */
	const leaked = [];
	page.on('response', (response) => {
		const url = response.url();
		if (url.includes('/aivn/stream') || !/settings|rpc|api/i.test(url)) return;
		void response
			.text()
			.then((body) => {
				if (body.includes(FAKE_KEY)) leaked.push(url);
			})
			.catch(() => {});
	});

	await gotoGui(page);
	await dismissOnboarding(page);

	// 造一个剧作家会话：`/aivn/play` 的 `voice` 只在「有剧目的会话」上给真值。
	await newSession(page);
	const sessionId = await waitFor(page, () => true, { timeout: 1_000, label: '会话建好' }).then(newestSession);
	const before = sessionId ? await playInfo(page, sessionId) : null;

	const card = await openCard(page);
	check('S1', errors.length === 0, `首屏无报错（${errors.length}）`);
	check(
		'S2',
		Boolean(before?.dir),
		`会话能读到剧目（session=${sessionId ?? '无'}：dir=${before?.dir ?? 'null'}）`,
	);
	check('S3', Boolean(card), 'dsh-aivn 的详情页里出现了配置卡');

	if (!card) {
		const dump = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').slice(0, 400));
		console.log(`   页面文本片段：${dump}`);
		await shot(page, join(ARTIFACTS, 'settings-no-card.png'));
		for (const id of ['S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12']) check(id, false, '配置卡没出来，跳过');
	} else {
		await shot(page, join(ARTIFACTS, 'settings-card.png'));

		/* —— 默认值 —— */

		const defaults = {
			ttsBaseUrl: 'https://api.fish.audio',
			ttsModel: 's2.1-pro-free',
			ttsConcurrency: '2',
			searchBaseUrl: 'https://api.exa.ai',
			imageFormat: 'gemini',
			imageSize: '1K',
			imageTimeoutMs: '180000',
			musicTimeoutMs: '240000',
		};
		const actual = {};
		for (const id of Object.keys(defaults)) actual[id] = await valueOf(page, id);
		check(
			'S4',
			Object.entries(defaults).every(([id, expected]) => actual[id] === expected),
			`默认值按 schema 渲染（不符：${
				Object.entries(actual)
					.filter(([id, value]) => value !== defaults[id])
					.map(([id, value]) => `${id}=${value}`)
					.join(' ') || '无'
			}）`,
		);

		const secrets = {};
		for (const id of ['ttsKeys', 'searchKeys', 'imageApiKey', 'musicApiKey']) secrets[id] = await rowText(page, id);
		check(
			'S5',
			Object.values(secrets).every((text) => text.includes('未配置')),
			'四个密钥字段初始都是「未配置」（数组密钥不再被空数组冒充已配置）',
		);

		/* —— 改一个普通字段并保存：写入落点 —— */

		await edit(page, 'ttsConcurrency', '4');
		const saved = await clickByText(page, '保存');
		await page.waitForTimeout(2_500);
		const afterSave = patchText();
		check(
			'S6',
			saved && /- id:\s*dsh-aivn/.test(afterSave) && /ttsConcurrency:\s*4/.test(afterSave),
			`保存落进 profile 的 cordis.patch.yml（dsh-aivn 行：${/- id:\s*dsh-aivn/.test(afterSave) ? '有' : '无'}、ttsConcurrency=4：${
				/ttsConcurrency:\s*4/.test(afterSave) ? '有' : '无'
			}）`,
		);

		/* —— 密钥写进去 → 不重启，运行期面跟着变 —— */

		await edit(page, 'ttsKeys', FAKE_KEY);
		await clickByText(page, '保存');
		await page.waitForTimeout(3_000);
		const liveInfo = sessionId ? await playInfo(page, sessionId) : null;
		check('S7', patchText().includes(FAKE_KEY), '密钥写进了配置文件');
		check(
			'S8',
			before?.voice === false && liveInfo?.voice === true,
			`不重启：/aivn/play 的 voice 由 ${before?.voice} 变成 ${liveInfo?.voice}（运行期面就地重建）`,
		);

		/* —— 脱敏：重新打开页面，明文不该再出现 —— */

		leaked.length = 0;
		await page.reload({ waitUntil: 'domcontentloaded' });
		await page.waitForTimeout(6_000);
		await dismissOnboarding(page);
		const backAgain = await openCard(page);
		const domHasKey = await page.evaluate((key) => document.body.innerHTML.includes(key), FAKE_KEY);
		const ttsRow = backAgain ? await rowText(page, 'ttsKeys') : '';
		check(
			'S9',
			backAgain && !domHasKey && leaked.length === 0,
			`重新打开页面后找不到明文密钥（DOM：${domHasKey ? '有' : '无'}；网络响应命中 ${leaked.length} 处）`,
		);
		check('S10', ttsRow.includes('已配置'), `密钥字段报「已配置」（实际：${ttsRow.slice(0, 48)}）`);
		check('S11', /ttsConcurrency:\s*4/.test(patchText()), '写密钥没有冲掉先前存的 ttsConcurrency');

		await clickByText(page, '清除已存 Key');
		await page.waitForTimeout(3_000);
		const cleared = await rowText(page, 'ttsKeys');
		const afterClear = sessionId ? await playInfo(page, sessionId) : null;
		check(
			'S12',
			!patchText().includes(FAKE_KEY) && cleared.includes('未配置') && afterClear?.voice === false,
			`清除按钮把密钥 unset（文件里还有明文：${patchText().includes(FAKE_KEY) ? '是' : '否'}；voice 回到 ${afterClear?.voice}）`,
		);
	}
} finally {
	await browser.close();
	writeFileSync(PATCH, originalPatch);
	clearPlay(WORKSPACE_DIR, fixture);
}

const failed = results.filter((row) => !row.ok);
console.log('\n══ 结果汇总 ' + '═'.repeat(46));
for (const { id, ok, note } of results) console.log(`  ${ok ? '✓' : '✗'} ${id} ${note}`);
console.log(`\n通过率: ${results.length - failed.length}/${results.length}`);
process.exit(failed.length === 0 ? 0 : 1);
