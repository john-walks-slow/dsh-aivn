#!/usr/bin/env node
/**
 * e2e: 导演工具栏与舞台重投影（插件验收）。
 *
 * 证明这条链完整成立：
 *   剧作家会话里导演栏在（提示 / 改写 / 重写，没有生图）→「提示」面板的第二岔是**打断**
 *   而不是分岔 → 引导真的排进队列、进了会话、并且**没有**变成一行玩家台词 →
 *   改写往会话里追加一条替换标记、舞台收到 `reset` 帧并整段重投影、剧作家重写这一拍 →
 *   在原生「在新对话中分支」出来的新会话里，舞台由会话面重建（不是空的）。
 *
 * 判据主要取自**会话日志**（surface 的折叠结果）与**自己挂的 SSE 探针**（帧流），
 * 不靠模型说了什么：模型怎么写是模型的事，「作废是不是真落到会话面上、舞台有没有跟着重投影」
 * 才是这条链的事。
 *
 * 运行：dsh-e2e run e2e/run.mjs director
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
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
	listTabs,
	openViewTab,
	openViewTabWhenReady,
	pickPreset,
	sendMessage,
	waitFor,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTIFACTS = join(ROOT, 'e2e-artifacts');
mkdirSync(ARTIFACTS, { recursive: true });

const PORT = process.env.DSH_E2E_PORT;
const BASE = `http://127.0.0.1:${PORT}`;

/** 剧作家是真 LLM：一轮的等待窗口按分钟给（见 verify-stage 的说明）。 */
const FIRST_BEAT_TIMEOUT = 600_000;
const BEAT_TIMEOUT = 480_000;

const KNOWN_IDS = [
	'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
	'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17',
];

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};
const skip = (ids, note) => {
	for (const id of ids) check(id, false, note);
};

/** Node 侧的轮询（会话日志那类判据不能靠页面）。 */
async function waitUntil(probe, { timeout = 60_000, interval = 1_000, label = 'condition' } = {}) {
	const deadline = Date.now() + timeout;
	for (;;) {
		const value = await probe();
		if (value) return value;
		if (Date.now() >= deadline) {
			console.log(`    … 等待超时：${label}（${timeout}ms）`);
			return false;
		}
		await new Promise((resolve) => setTimeout(resolve, interval));
	}
}

/* —— 会话日志：与 verify-injection 同一套读法 —— */

const SLUG = `--${WORKSPACE.replace(/^\//, '').replace(/[/.]/g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);

/** 会话目录名是 `session-<uuid>`；接口认的是那枚 uuid。 */
function sessionDirs() {
	return readdirSync(SESSIONS)
		.map((name) => join(SESSIONS, name))
		.filter((path) => statSync(path).isDirectory())
		.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
}
/**
 * 会话 id **就是**那个目录名（`session-<uuid>`）：接口与内部服务认的都是带前缀的整串。
 * 只截后半段 uuid 会得到 `no such session`（2026-10-06 实测踩过）。
 */
const idOf = (dir) => dir.slice(dir.lastIndexOf('/') + 1);

/** 会话日志是多帧 zstd，只有 CLI 解得开。 */
function sessionEvents(sessionId) {
	const file = join(SESSIONS, sessionId, 'session.v4.jsonl.zstd');
	if (!existsSync(file)) return [];
	const raw = execFileSync('zstd', ['-dc', file], { maxBuffer: 64 * 1024 * 1024 }).toString('utf8');
	return raw
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

/**
 * 会话面的一次折叠：`append` 挂到尾巴，`replace` 把 [start, end] 那一段换成这一条。
 *
 * 与 `@deepseek-ai/dsh-session` 的 `foldSurface` 同一个口径（这里只用得上面顺序，
 * 不看消息内容），是判「作废有没有真落到会话上」的那把尺子。
 */
function surfaceOf(events) {
	let nodes = [];
	for (const event of events) {
		const op = event.surfaceOp;
		if (op === undefined) continue;
		if (op === 'append') {
			nodes.push(event.seq);
			continue;
		}
		if (op?.op === 'replace') {
			const from = nodes.indexOf(op.startSeq);
			const to = nodes.indexOf(op.endSeq);
			if (from === -1 || to === -1) continue;
			nodes = [...nodes.slice(0, from), event.seq, ...nodes.slice(to + 1)];
		}
	}
	return nodes;
}

const assistantSeqs = (events) =>
	events.filter((event) => event.type === 'assistant/message').map((event) => event.seq);
/** 宿主给导演的话单独一支来源，舞台上不该变成玩家台词。 */
const directorMessages = (events) =>
	events.filter((event) => event.type === 'user/message' && event.data?.source?.kind === 'dsh-aivn-director');
const playerMessages = (events) =>
	events.filter((event) => event.type === 'user/message' && event.data?.source?.kind === 'user');

/* —— 帧流探针：在页面里自己挂一条 SSE，把宿主推的每一帧收下来 —— */

const PROBE_START = (args) => {
	const { session, base, key } = args;
	window.__probes = window.__probes ?? {};
	window.__probes[key] = [];
	const source = new EventSource(`${base}/aivn/stream?session=${encodeURIComponent(session)}`);
	source.addEventListener('frame', (event) => {
		try {
			window.__probes[key].push(JSON.parse(event.data));
		} catch {
			/* 坏帧丢掉 */
		}
	});
	window.__probes[key].__source = source;
	return true;
};

/** POST 一次导演动作（Node 侧发起：没有 Origin 头，同源闸放行）。 */
async function direct(body) {
	const res = await fetch(`${BASE}/aivn/direct`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body),
	});
	return { status: res.status, body: await res.text() };
}

/** 停止点面板上的真实选项（「开演」是空舞台的开局按钮，不算）。 */
const CHOICES = () => {
	const overlay = document.querySelector('.choice-overlay');
	if (!overlay) return false;
	const real = [...overlay.querySelectorAll('.choice')]
		.map((el) => (el.textContent ?? '').trim())
		.filter((text) => text !== '' && text !== '开演');
	return real.length > 0 ? real.join(' / ') : false;
};

/**
 * 截图不是判据：这台机器只有 8GB，Chromium 的 swiftshader 在内存紧的时候会把渲染进程
 * 崩掉——一张截图把整条链的判据全带走不值当（2026-10-06 实测崩过一次）。
 */
async function tryShot(page, file) {
	try {
		// `animations: 'disabled'`：舞台一直在动（打字机、喇叭闪烁），停掉 CSS 动画再截。
		await page.screenshot({ path: file, animations: 'disabled' });
	} catch (error) {
		const detail = error && typeof error === 'object' && 'message' in error ? String(error.message) : String(error);
		console.log(`    … 截图失败（不影响判据）：${detail}`);
	}
}

const fixture = seedPlay(WORKSPACE);
console.log(`夹具已就位：${WORKSPACE}（剧目 ${PLAY.id}）\n`);

const browser = await launch();
try {
	// 比默认视口小一档：这是全流程最长的一条套件（三轮 LLM + 一次分支），内存上留点余量。
	const { page, errors } = await newPage(browser, { width: 1100, height: 760 });
	page.on('crash', () => errors.push('renderer crashed'));
	await gotoGui(page);
	await dismissOnboarding(page);
	check('D1', errors.length === 0, `首屏无报错（${errors.length}）`);

	/* —— 新会话 + 剧作家预设 + 第一拍 —— */

	check('D2', await newSession(page), '已新建会话');
	const preset = await pickPreset(page, '剧作家');
	check('D3', preset.picked && preset.current === '剧作家', `座位已选为「剧作家」（${preset.current ?? '无'}）`);

	await sendMessage(page, PLAY.opening);
	const mounted = await openViewTabWhenReady(page, 'AIVN', 90_000);
	const ready =
		mounted &&
		(await waitFor(page, () => document.querySelector('.stage-root.aivn-stage-view') !== null, {
			timeout: 30_000,
			label: '舞台视图挂载',
		}));

	// 台词的推进默认归玩家（Auto 缺省关）：不点，剧作家写下的几十行会一直排在队列里，
	// 播放头停在第一行上，`playback.exhausted` 永远不成立、停止点面板也就永远不出来。
	// 验收要的是整段演完，所以先按一下那枚键（显示 Manual = 现在是手动档）。
	if (ready) {
		await page.evaluate(() => {
			const button = [...document.querySelectorAll('.dialog-options .dir-btn')].find(
				(el) => (el.textContent ?? '').trim() === 'Manual',
			);
			button?.click();
		});
	}

	const firstStop = ready
		? await waitFor(page, CHOICES, { timeout: FIRST_BEAT_TIMEOUT, interval: 1_000, label: '第一拍停止点' })
		: false;
	check('D4', Boolean(firstStop), `第一拍演完并交出停止点：${String(firstStop).slice(0, 50)}`);
	await tryShot(page, join(ARTIFACTS, 'director-beat1.png'));

	if (!firstStop) {
		skip(KNOWN_IDS.slice(KNOWN_IDS.indexOf('D4') + 1), '第一拍没演完，后续判据无从验起');
	} else {
		const sessionId = idOf(sessionDirs()[0]);
		const events1 = sessionEvents(sessionId);
		const surface1 = surfaceOf(events1);
		const assistants1 = assistantSeqs(events1);

		/* —— 导演栏与提示面板 —— */

		const bar = await page.evaluate(() =>
			[...document.querySelectorAll('.theater-director .dir-btn')].map((el) => (el.textContent ?? '').trim()),
		);
		check(
			'D5',
			['提示', '改写', '重写'].every((label) => bar.includes(label)) && !bar.includes('生图'),
			`导演栏：${bar.join(' / ')}（生图那一格不摆）`,
		);

		// 弹窗是 React 渲染出来的：点完要等它出现，不能在同一个 evaluate 里接着查。
		await page.evaluate(() => {
			const button = [...document.querySelectorAll('.theater-director .dir-btn')].find(
				(el) => (el.textContent ?? '').trim() === '提示',
			);
			button?.click();
		});
		await waitFor(page, () => document.querySelector('.guide-seg .seg-btn') !== null, {
			timeout: 10_000,
			label: '提示弹窗',
		});
		const seg = await page.evaluate(() =>
			[...document.querySelectorAll('.guide-seg .seg-btn')].map((el) => (el.textContent ?? '').trim()),
		);
		check(
			'D6',
			seg.includes('引导') && seg.includes('打断') && !seg.includes('分岔'),
			`「提示」的两岔：${seg.join(' / ') || '未渲染'}`,
		);
		await tryShot(page, join(ARTIFACTS, 'director-prompt-panel.png'));
		await page.evaluate(() => {
			const cancel = [...document.querySelectorAll('.modal button')].find(
				(el) => (el.textContent ?? '').trim() === '取消',
			);
			cancel?.click();
		});
		await page.waitForTimeout(300);

		/* —— 帧流探针 —— */

		await page.evaluate(PROBE_START, { session: sessionId, base: BASE, key: 'main' });
		await page.waitForTimeout(1_500);
		const probed = await page.evaluate(() => (window.__probes?.main ?? []).length);
		check('D7', probed > 0, `自挂的 SSE 探针收到 ${probed} 帧（接上就补推）`);

		/* —— 引导：排进队列，随下一轮发出 —— */

		const GUIDE = '把这一轮的节奏压慢一点';
		const guided = await direct({ session: sessionId, action: 'guide', text: GUIDE });
		const queued = await waitFor(
			page,
			() =>
				(window.__probes?.main ?? []).some(
					(frame) => frame.kind === 'guide' && frame.items.some((item) => item.status === 'pending'),
				),
			{ timeout: 20_000, interval: 300, label: '排队中的 guide 帧' },
		);
		check('D8', guided.status === 200 && Boolean(queued), `引导已入队（HTTP ${guided.status}）`);

		// 剧作家把这一轮写出来 → 队列里的那条翻成「已送出」（它真的进了会话）。
		const sent = await waitFor(
			page,
			() =>
				(window.__probes?.main ?? []).some(
					(frame) => frame.kind === 'guide' && frame.items.some((item) => item.status === 'sent'),
				),
			{ timeout: BEAT_TIMEOUT, interval: 1_000, label: '引导送进会话' },
		);
		const events2 = await waitUntil(
			() => {
				const events = sessionEvents(sessionId);
				return events.some(
					(event) =>
						event.type === 'user/message' &&
						event.data?.source?.kind === 'dsh-aivn-director' &&
						event.data.content?.some((block) => (block.text ?? '').includes(GUIDE)),
				)
					? events
					: false;
			},
			{ timeout: 30_000, interval: 1_000, label: '导演消息落进会话' },
		);
		check(
			'D9',
			Boolean(sent) && Boolean(events2),
			`引导送进了会话（导演消息 ${directorMessages(events2 || []).length} 条；` +
				`玩家消息 ${playerMessages(events2 || []).length} 条）`,
		);

		// 这一轮演完：剧作家照着提示又交了一个停止点。
		const secondStop = await waitFor(page, CHOICES, {
			timeout: BEAT_TIMEOUT,
			interval: 1_000,
			label: '引导之后的一拍',
		});
		check('D10', Boolean(secondStop), `剧作家接着写完一轮：${String(secondStop).slice(0, 50)}`);

		/* —— 改写：作废这一段，让剧作家重写 —— */

		const eventsBefore = sessionEvents(sessionId);

		const surfaceBefore = surfaceOf(eventsBefore);
		const bySeq = new Map(eventsBefore.map((event) => [event.seq, event]));
		const tailAssistant = [...surfaceBefore].reverse().find((seq) => bySeq.get(seq)?.type === 'assistant/message');
		const framesBefore = await page.evaluate(() => (window.__probes?.main ?? []).length);

		const rewritten = await direct({
			session: sessionId,
			action: 'rewrite',
			from: 'line',
			text: '把这一拍重写一遍：把最后那一句改得更短。',
		});
		const resetSeen = await waitFor(
			page,
			(count) => (window.__probes?.main ?? []).slice(count).some((frame) => frame.kind === 'reset'),
			{ timeout: 60_000, interval: 300, label: 'reset 帧', arg: framesBefore },
		);
		check('D11', rewritten.status === 200 && Boolean(resetSeen), `改写被接受，舞台收到 reset 帧`);

		// 会话日志是**边写边刷**的：刚追加的事件不一定立刻读得到，先等到它落盘。
		// 只认**导演那一条**替换标记：系统提示词的重投影也长着一张 replace 的脸
		// （它替换的是 system/message 那个节点，与剧本无关）。
		const markerOf = (events) =>
			[...events]
				.reverse()
				.find(
					(event) =>
						event.surfaceOp?.op === 'replace' &&
						event.type === 'user/message' &&
						event.data?.source?.kind === 'dsh-aivn-director',
				);
		const afterRewrite = await waitUntil(
			() => {
				const events = sessionEvents(sessionId);
				return markerOf(events) ? events : false;
			},
			{ timeout: 30_000, interval: 1_000, label: '替换标记落进会话日志' },
		);
		const surfaceAfter = surfaceOf(afterRewrite || []);
		const replacement = markerOf(afterRewrite || []);
		check(
			'D12',
			replacement !== undefined &&
				replacement.surfaceOp.startSeq === tailAssistant &&
				surfaceAfter.includes(replacement.seq) &&
				(tailAssistant === undefined || !surfaceAfter.includes(tailAssistant)),
			`旧内容已从会话面上作废（面 ${surfaceBefore.length} → ${surfaceAfter.length} 条；` +
				`替换标记 #${replacement?.seq ?? '?'} 在面上，被替换的助手消息 #${tailAssistant ?? '?'} 不在了）`,
		);

		// 重写之后剧作家再写一轮：会话日志里多出一条助手消息，舞台上重新有了停止点。
		const rewrote = await waitUntil(
			() => assistantSeqs(sessionEvents(sessionId)).length > assistantSeqs(afterRewrite).length,
			{ timeout: BEAT_TIMEOUT, interval: 2_000, label: '重写后的新内容' },
		);
		// 新一轮的内容落定 ≠ 画面已经演到停止点：打字机还要走完最后一句。这里必须轮询。
		const stopAgain = rewrote
			? await waitFor(page, CHOICES, { timeout: 60_000, interval: 500, label: '重写后的停止点' })
			: false;
		check('D13', Boolean(rewrote) && Boolean(stopAgain), `重写后剧作家又交出一个停止点`);

		// 重投影是一次性的整段重放，之后的帧要继续接上（不能停在重建那一刻）。
		const liveAfter = await page.evaluate(() => {
			const frames = window.__probes?.main ?? [];
			const at = frames.findLastIndex((frame) => frame.kind === 'reset');
			return frames.length - at;
		});
		check('D14', liveAfter > 2, `重投影之后帧流继续（reset 之后还有 ${liveAfter} 帧）`);
		await tryShot(page, join(ARTIFACTS, 'director-rewrite.png'));

		/* —— 分支：原生「在新对话中分支」→ 新会话的舞台由会话面重建 —— */

		// 分支键在聊天消息上（舞台页签里没有消息列表），所以先切回 Chat。
		const backToChat = await openViewTab(page, 'Chat');
		await page.waitForTimeout(1_500);
		console.log(`    页签：${(await listTabs(page)).join(' / ') || '无'}（切回 Chat：${backToChat}）`);
		// 消息动作条挂在 `[data-turn-tail]` 上，默认是 hover 才显形：先挪上去再点。
		await page.evaluate(() => {
			const tails = [...document.querySelectorAll('[data-turn-tail]')];
			tails[tails.length - 1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
		});
		await page.waitForTimeout(500);
		const branchProbe = await page.evaluate(() => {
			const buttons = [...document.querySelectorAll('button[aria-label]')].filter((el) =>
				/分支|branch/i.test(el.getAttribute('aria-label') ?? ''),
			);
			const usable = buttons.filter(
				(el) => el.getAttribute('aria-disabled') !== 'true' && !el.hasAttribute('data-unavailable'),
			);
			const target = usable[usable.length - 1];
			if (!target) {
				return {
					found: buttons.length,
					usable: 0,
					labels: [...new Set(buttons.map((el) => el.getAttribute('aria-label')))].slice(0, 3),
				};
			}
			target.click();
			return { found: buttons.length, usable: usable.length, clicked: true };
		});
		console.log(`    分支键：${JSON.stringify(branchProbe)}`);
		const branched = branchProbe.clicked === true;

		const childId = branched
			? await waitUntil(
					() => {
						const newest = idOf(sessionDirs()[0]);
						return newest !== sessionId ? newest : false;
					},
					{ timeout: 60_000, interval: 1_000, label: '新会话（分支）' },
				)
			: false;
		check('D15', Boolean(childId), `已从这一轮分出新的对话（${childId || '未分出'}）`);

		let childFrames = 0;
		if (childId) {
			await page.evaluate(PROBE_START, { session: childId, base: BASE, key: 'child' });
			await page.waitForTimeout(2_000);
			// 新会话一帧都没有（刚分支出来）：接上探针这条 SSE 就该把会话面重铺一遍。
			childFrames = await page.evaluate(() => (window.__probes?.child ?? []).length);
			await waitFor(page, () => (window.__probes?.child ?? []).length > 3, {
				timeout: 60_000,
				interval: 500,
				label: '分支会话的帧流',
			});
			childFrames = await page.evaluate(() => (window.__probes?.child ?? []).length);
		}
		check(
			'D16',
			Boolean(childId) && childFrames > 3,
			`分支出来的会话也演到同一个点（收到 ${childFrames} 帧：整段重投影）`,
		);
	}

	check('D17', errors.length === 0, `全程无页面报错（${errors.length}）`);
	if (errors.length) for (const line of errors.slice(0, 6)) console.log(`    ! ${line}`);
	console.log(`    URL: ${BASE}/?token=${process.env.DSH_E2E_TOKEN || 'e2etest'}`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
	console.log(`\n夹具已清理：${WORKSPACE}`);
}

const failed = results.filter((row) => !row.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
console.log(`截图目录：${ARTIFACTS}`);
process.exit(failed.length ? 1 : 0);
