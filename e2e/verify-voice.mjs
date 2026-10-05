#!/usr/bin/env node
/**
 * e2e: 语音（插件验收）。
 *
 * 证明这条链真的通了：剧作家写出一行 `say` → 宿主分句送去合成 → 中枢广播「好了」的
 * voice 帧 → 音频能从 `/aivn/audio` 取回真正的 MP3。
 *
 * 走的是**真 API**（Fish Audio）。没配 key 时整条链是关的，脚本会直接说明并跳过——
 * 这不是失败，是「这台机器上没开语音」。
 *
 * 运行：dsh-e2e run e2e/verify-voice.mjs（起实例前先 export DSH_AIVN_TTS_KEYS）
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	E2E_URL,
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	sendMessage,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/**
 * 取中枢缓冲的快照。
 *
 * SSE 是**不会自己结束**的流（连上补推完就挂着发 keepalive），所以不能用 `res.text()`——
 * 那个 promise 只有流结束时才 resolve，超时 abort 之后你拿到的是空数组，看上去像「一帧都没有」。
 * 这里按块读到截止时间为止，再解析读到的部分。
 */
async function frames(sessionId) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 3_000);
	let text = '';
	try {
		// `E2E_URL` 末尾带着 `/?token=…`，直接字符串拼接会拼出坏 URL——用 URL 解析。
		const url = new URL('/aivn/stream', E2E_URL);
		url.searchParams.set('session', sessionId);
		const res = await fetch(url, { signal: controller.signal });
		const reader = res.body.getReader();
		const decoder = new TextDecoder();
		const deadline = Date.now() + 1_500;
		while (Date.now() < deadline) {
			const { value, done } = await reader.read();
			if (done) break;
			text += decoder.decode(value, { stream: true });
		}
	} catch {
		// 到点 abort 是正常收尾：读到的部分照样用
	} finally {
		clearTimeout(timer);
	}
	return text
		.split('\n')
		.filter((line) => line.startsWith('data: '))
		.flatMap((line) => {
			try {
				return [JSON.parse(line.slice(6))];
			} catch {
				return [];
			}
		});
}

/** 从页面里拿当前会话 id（视图自己知道，比猜路由稳）。 */
const sessionIdOf = (page) =>
	page.evaluate(() => {
		const el = document.querySelector('[data-conversation-session]');
		return el?.getAttribute('data-conversation-session') ?? null;
	});

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);

	check('V1', await newSession(page), '已新建会话');
	const preset = await pickPreset(page, '剧作家');
	check('V2', preset.picked && preset.current === '剧作家', `座位已选为「剧作家」（${preset.current ?? '无'}）`);

	await sendMessage(page, PLAY.opening);

	const sessionId = await sessionIdOf(page);
	check('V3', Boolean(sessionId), `拿到会话 id（${sessionId ?? '无'}）`);
	if (!sessionId) throw new Error('no session id');

	// 语音是边写边合成的：等中枢里出现「好了」的 voice 帧。真 LLM 写第一行要一会儿。
	let ready = null;
	let pending = 0;
	for (let i = 0; i < 90 && !ready; i += 1) {
		const list = await frames(sessionId);
		const voices = list.filter((frame) => frame.kind === 'voice');
		pending = voices.filter((frame) => frame.state === 'started').length;
		ready = voices.find((frame) => frame.state === 'ready' && frame.url) ?? null;
		if (!ready) await page.waitForTimeout(2_000);
	}

	check('V4', pending > 0, `有过「正在合成」的 voice 帧（${pending} 条）`);
	check('V5', Boolean(ready), ready ? `拿到音频 URL（lineSeq=${ready.lineSeq}, phrase=${ready.phrase}）` : '等不到 ready 帧');

	if (ready) {
		const res = await fetch(new URL(ready.url, E2E_URL));
		const body = Buffer.from(await res.arrayBuffer());
		check('V6', res.status === 200, `音频可取回（HTTP ${res.status}）`);
		check('V7', res.headers.get('content-type') === 'audio/mpeg', `content-type 是 audio/mpeg（${res.headers.get('content-type')}）`);
		// MP3 有两种开头：带 ID3 标签（`ID3`）或直接进帧同步（0xFF 后三位全 1）。
		// Fish 返回的是后者——只认 `ID3` 会把一段好好的音频判成坏的。
		const mp3 = body.subarray(0, 3).toString('latin1') === 'ID3' || (body[0] === 0xff && (body[1] & 0xe0) === 0xe0);
		check('V8', body.length > 2_000 && mp3, `是真 MP3（${body.length} 字节，头 ${body.subarray(0, 2).toString('hex')}）`);
	}

	check('V9', errors.length === 0, `页面无报错（${errors.length}）`);
	console.log(`\n${results.filter((r) => r.ok).length}/${results.length} 通过`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
}

process.exit(results.every((r) => r.ok) ? 0 : 1);
