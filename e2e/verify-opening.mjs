#!/usr/bin/env node
/**
 * e2e: 开局指令（`play.json` 的 `opening`）跟着玩家的第一条消息走。
 *
 * 证明这条链成立：
 *   会话里的**第一条**玩家消息一到 → 插件把剧目的 `opening` 作为同一轮的 user 消息补送
 *   （它排在那一轮 `request/header` 之前）→ 它不进舞台时间线（中枢里 `player_input` 只有
 *   玩家自己那一行）→ 引擎自己投的 input（silent，舞台的「继续」走这条）不触发补送。
 *
 * 为什么必须这样：DSH 里会话空着时连 tab 列都没有，舞台上的「开演」按钮够不着；玩家先说话，
 * 开局指令只能跟着那句话一起送。判据是「这条会话还没有任何模型可见的历史」。
 *
 * 运行：dsh-e2e run e2e/run.mjs stage（或 node e2e/verify-opening.mjs）
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { clearPlay, seedPlay } from './lib/fixture.mjs';
import {
	dismissOnboarding,
	E2E_HOME,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	sendMessage,
	WORKSPACE as WORKSPACE_DIR,
} from './lib/boot.mjs';

const SLUG = `--${WORKSPACE_DIR.replace(/^\//, '').replace(/\//g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);
const PLAY_FILE = join(WORKSPACE_DIR, 'play.json');

/** 这一跑给剧目的开局指令一个独一无二的值：断言只认它。 */
const OPENING = '（E2E 开局指令 7f3a：请演出第一轮）';
const FIRST = '开场白（E2E 第一条）';
const SILENT = '（E2E 引擎推进）';

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/** 会话日志是多帧 zstd，只有 CLI 解得开。 */
function sessionEvents(session) {
	const file = join(SESSIONS, session, 'session.v4.jsonl.zstd');
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

/** 会话目录名就是会话 id；取最新建的那个。 */
const sessionNames = () =>
	readdirSync(SESSIONS)
		.filter((name) => statSync(join(SESSIONS, name)).isDirectory())
		.sort((a, b) => statSync(join(SESSIONS, b)).mtimeMs - statSync(join(SESSIONS, a)).mtimeMs);
const newestSession = () => sessionNames()[0];

const textOf = (event) =>
	(event.data?.content ?? [])
		.filter((block) => block.type === 'text')
		.map((block) => block.text)
		.join('')
		.trim();
const userTexts = (events) => events.filter((event) => event.type === 'user/message').map(textOf);
const seqOf = (events, type) => events.find((event) => event.type === type)?.seq ?? -1;

/** 轮询日志直到判据成立（`waitFor` 的探针跑在页面里，读不了文件系统）。 */
async function waitForLog(page, session, predicate, { timeout = 90_000, interval = 1_000, label = '日志' } = {}) {
	const until = Date.now() + timeout;
	let events = [];
	while (Date.now() < until) {
		events = sessionEvents(session);
		if (predicate(events)) return { ok: true, events };
		await page.waitForTimeout(interval);
	}
	console.log(`    … 等待超时：${label}`);
	return { ok: false, events };
}

/** 等一个新的会话目录出现（会话一建好就有，不等第一条消息）。 */
async function waitForNewSession(page, previous, { timeout = 20_000 } = {}) {
	const until = Date.now() + timeout;
	while (Date.now() < until) {
		const found = sessionNames().find((name) => name !== previous);
		if (found) return found;
		await page.waitForTimeout(300);
	}
	return undefined;
}

/** 舞台那一侧能看到的帧（连 SSE 收历史，到点 abort）。 */
function readFrames(page, session) {
	return page
		.evaluate(async (id) => {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), 1_500);
			let text = '';
			try {
				const response = await fetch(`/aivn/stream?session=${encodeURIComponent(id)}`, { signal: controller.signal });
				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				for (;;) {
					const { done, value } = await reader.read();
					if (done) break;
					text += decoder.decode(value, { stream: true });
				}
			} catch {
				/* 到点 abort，拿到多少算多少 */
			}
			clearTimeout(timer);
			return text;
		}, session)
		.then((text) =>
			text
				.split('\n')
				.filter((line) => line.startsWith('data: '))
				.flatMap((line) => {
					try {
						return [JSON.parse(line.slice(6))];
					} catch {
						return [];
					}
				}),
		);
}

const fixture = seedPlay(WORKSPACE_DIR);
const seeded = JSON.parse(readFileSync(PLAY_FILE, 'utf8'));
writeFileSync(PLAY_FILE, `${JSON.stringify({ ...seeded, opening: OPENING }, null, 2)}\n`);

const browser = await launch();
try {
	const { page } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	// —— 会话 A：玩家的第一条消息 ——
	await newSession(page);
	await pickPreset(page, '剧作家');
	await sendMessage(page, FIRST);
	const sessionA = await waitForNewSession(page, undefined);
	check('T0', Boolean(sessionA), `会话建起来了（${sessionA ?? '没有会话目录'}）`);

	// 第一轮的 request/header 一落日志就取快照：此刻日志里有什么，就是那一轮带上了什么。
	const turnA = await waitForLog(page, sessionA, (events) => events.some((event) => event.type === 'request/header'), {
		label: '会话 A 的第一轮',
	});
	const eventsA = turnA.events;
	const headerSeq = seqOf(eventsA, 'request/header');
	const openingSeqs = eventsA.filter((event) => event.type === 'user/message' && textOf(event) === OPENING).map((event) => event.seq);
	check(
		'T1',
		openingSeqs.length === 1 && openingSeqs[0] < headerSeq,
		`开局指令跟着第一条消息送出（出现 ${openingSeqs.length} 次，seq=${openingSeqs.join(',')} < request/header seq=${headerSeq}）`,
	);

	const frames = await readFrames(page, sessionA);
	const playerFrames = frames.filter((frame) => frame.kind === 'ir' && frame.event?.kind === 'player_input');
	check(
		'T2',
		playerFrames.length === 1 && playerFrames[0].event.text === FIRST,
		`补送的那条不落成玩家台词（中枢里 player_input：${JSON.stringify(playerFrames.map((frame) => frame.event.text))}）`,
	);

	// —— 会话 B：引擎自己投的第一条（silent）不该触发补送 ——
	await newSession(page);
	await pickPreset(page, '剧作家');
	const sessionB = await waitForNewSession(page, sessionA);
	check('T3a', Boolean(sessionB), `第二个会话建起来了（${sessionB ?? '没有新会话目录'}）`);
	const pushed = await page.evaluate(
		async ({ id, text }) => {
			const response = await fetch('/aivn/input', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ session: id, text, silent: true }),
			});
			return response.status;
		},
		{ id: sessionB, text: SILENT },
	);
	const turnB = await waitForLog(page, sessionB, (events) => events.some((event) => event.type === 'request/header'), {
		label: '会话 B 的第一轮',
	});
	const textsB = userTexts(turnB.events);
	check(
		'T3',
		pushed === 200 && textsB.includes(SILENT) && !textsB.includes(OPENING),
		`引擎自己投的第一条不触发补送（HTTP ${pushed}；会话 B 的 user 消息：${JSON.stringify(textsB)}）`,
	);
} finally {
	await browser.close();
	clearPlay(WORKSPACE_DIR, fixture);
}

const failed = results.filter((row) => !row.ok);
console.log(`\n通过率: ${results.length - failed.length}/${results.length}`);
process.exit(failed.length > 0 ? 1 : 0);
