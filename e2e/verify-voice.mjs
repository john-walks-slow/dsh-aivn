#!/usr/bin/env node
/**
 * e2e: 语音（插件验收）。
 *
 * 证明这条链真的通了：剧作家写出一行 `say` → 宿主分句送去合成 → 中枢广播 voice 帧 →
 * 音频能从 `/aivn/audio` 取回 → **浏览器解出 PCM 并真的起播**。
 *
 * 客户端那一半不靠猜：在页面里给 `AudioContext` / `decodeAudioData` / `AudioBufferSourceNode.start`
 * 挂钩子。只断言「帧到了、URL 能取回」说明不了出声——导演没解锁、解码失败、音频晚于该行结束，
 * 三种都不报错。
 *
 * 走的是**真 API**（Fish Audio）。运行前 export DSH_AIVN_TTS_KEYS。
 *
 * 运行：dsh-e2e run e2e/verify-voice.mjs
 */
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	E2E_URL,
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	openViewTabWhenReady,
	pickPreset,
	sendMessage,
	waitFor,
} from './lib/boot.mjs';

/**
 * 起步后最多再点几次舞台。
 *
 * 舞台是**手动推进**的：没有当前行就没有音频可播（台词区写着「（点击开始）」），所以测试
 * 必须先点一下让第一行成为当前行。而此后翻页会 `fastForward` 掐掉正在播的语音——
 * 所以默认只点这一下，然后等：那才是「玩家开始一轮、慢慢读完第一句」的真实节奏。
 */
const CLICK_BUDGET = Number(process.env.VOICE_CLICKS ?? 6);

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/**
 * 浏览器侧的探针：建了几个 AudioContext、解了几段音频、有几个音源起播。
 *
 * `AudioContext` 用 Proxy 拦 `new`（保住原型链，后面挂在原型上的补丁照旧生效）——
 * 直接换一个类会让 `instanceof` 和原型补丁一起失效。
 */
const PROBE = () => {
	const probe = { decoded: 0, decodeFailed: 0, started: 0, ctxCreated: 0, resumed: 0 };
	window.__voiceProbe = probe;
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return;

	window.AudioContext = new Proxy(AC, {
		construct(target, args) {
			probe.ctxCreated += 1;
			return Reflect.construct(target, args);
		},
	});

	const resume = AC.prototype.resume;
	AC.prototype.resume = function (...args) {
		probe.resumed += 1;
		return resume.apply(this, args);
	};
	const decode = AC.prototype.decodeAudioData;
	AC.prototype.decodeAudioData = function (...args) {
		const out = decode.apply(this, args);
		if (out && typeof out.then === 'function') {
			out.then(
				() => { probe.decoded += 1; },
				() => { probe.decodeFailed += 1; },
			);
		}
		return out;
	};
	const start = AudioBufferSourceNode.prototype.start;
	AudioBufferSourceNode.prototype.start = function (...args) {
		// 只认真音频：解码失败时导演会拿 1 样本的静音缓冲顶替（audio.ts 的「静音墓碑」），
		// 它也走这条 `start()`——不按长度筛，一段全失败的空壳也能把「出声」凑出来。
		if ((this.buffer?.length ?? 0) > 1) probe.started += 1;
		return start.apply(this, args);
	};
};

/**
 * 取中枢缓冲的快照。
 *
 * SSE 是**不会自己结束**的流（连上补推完就挂着发 keepalive），所以不能用 `res.text()`——
 * 那个 promise 只有流结束时才 resolve，超时 abort 之后拿到的是空数组，看上去像「一帧都没有」。
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
		const deadline = Date.now() + 800;
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

/** 当前会话 id：视图自己知道，比猜路由稳。 */
const sessionIdOf = (page) =>
	page.evaluate(() => {
		const el = document.querySelector('[data-conversation-session]');
		return el?.getAttribute('data-conversation-session') ?? null;
	});

const fixture = seedPlay(WORKSPACE);
const browser = await launch(['--autoplay-policy=no-user-gesture-required']);
try {
	const { page, errors } = await newPage(browser);
	await page.addInitScript(PROBE);

	/**
	 * 客户端发给宿主的语音控制（B1 的回归面）。
	 *
	 * 「语音总开关」有两半：本地那半让导演闭嘴，宿主那半让服务端别再分句、别再打额度。
	 * 只做前一半，玩家关掉语音也照样在烧钱——而这件事从界面上完全看不出来。
	 */
	const voicePosts = [];
	page.on('request', (request) => {
		if (request.method() !== 'POST' || !request.url().includes('/aivn/voice')) return;
		try {
			voicePosts.push(JSON.parse(request.postData() ?? '{}'));
		} catch {
			voicePosts.push({ unparsable: true });
		}
	});
	await gotoGui(page);
	await dismissOnboarding(page);

	check('V1', await newSession(page), '已新建会话');
	const preset = await pickPreset(page, '剧作家');
	check('V2', preset.picked && preset.current === '剧作家', `座位已选为「剧作家」（${preset.current ?? '无'}）`);

	await sendMessage(page, PLAY.opening);

	// 舞台是会话头部的 tab，要等剧作家开口之后才出现（与 verify-stage 同一顺序）。
	const echoed = await waitFor(
		page,
		() => [...document.querySelectorAll('span[title]')].some((el) => (el.textContent ?? '').trim() === '剧作家'),
		{ timeout: 30_000, label: '会话头回显预设名' },
	);
	check('V13', await openViewTabWhenReady(page, '舞台', 90_000), `舞台 tab 已选中（会话头回显：${Boolean(echoed)}）`);

	/*
	 * 舞台点一下 = 解锁：`onUnlock` 挂在舞台的点击与触屏上，不是一块遮罩。
	 * 必须尽早点：AudioContext 没建起来之前回来的音频只能挂账（`handleAudio` 里的 `if (this.ctx)`），
	 * 一句都不会解、更不会播。
	 *
	 * 用鼠标按坐标点而不是 `locator.click`：`.stage-root` 在 DOM 里不止一个（各视图容器各挂一份），
	 * 严格模式直接报错；而且真实输入事件才算用户手势。
	 */
	await page.waitForTimeout(500);
	const box = await page.locator('.stage-root.aivn-stage-view').first().boundingBox();
	const clickStage = async () => {
		if (box) await page.mouse.click(box.x + box.width / 2, box.y + Math.min(160, box.height / 3));
	};
	await clickStage();
	const afterClick = await page.evaluate(() => window.__voiceProbe ?? null);
	check(
		'V12',
		(afterClick?.ctxCreated ?? 0) > 0 && (afterClick?.resumed ?? 0) > 0,
		`点一下舞台就把 AudioContext 建起来并 resume（建 ${afterClick?.ctxCreated ?? 0} 次，resume ${afterClick?.resumed ?? 0} 次）`,
	);

	const sessionId = await sessionIdOf(page);
	check('V3', Boolean(sessionId), `拿到会话 id（${sessionId ?? '无'}）`);
	if (!sessionId) throw new Error('no session id');

	/*
	 * 语音与文字是并行出的，要看的不是「有没有帧」，而是这场竞速谁赢：
	 * 一行 `say` 开始时文字先上屏，音频晚几秒回来，而 `decode()` 只在这一行**还是当前行**的
	 * 时候才排播（audio.ts）。音频晚于该行结束，就解出来也不播。
	 * 所以这里记下每一帧第一次出现的时刻，把合成延迟与行时长都算出来。
	 */
	const seenAt = new Map();
	const startedFrames = [];
	const readyFrames = [];
	const sayFrames = [];
	let ready = null;
	let started = 0;
	let clicks = 0;
	const startedAt = Date.now();
	while (Date.now() - startedAt < 150_000) {
		for (const frame of await frames(sessionId)) {
			if (!seenAt.has(frame.seq)) seenAt.set(frame.seq, Date.now());
			if (frame.kind === 'voice' && frame.state === 'started') startedFrames.push(frame);
			if (frame.kind === 'voice' && frame.state === 'ready') {
				readyFrames.push(frame);
				if (frame.url) ready = frame;
			}
			if (frame.kind === 'ir' && frame.event?.kind === 'say_start') sayFrames.push(frame);
		}

		const probe = await page.evaluate(() => window.__voiceProbe ?? null);
		started = probe?.started ?? 0;
		if (started > 0) break;

		// 玩家式推进：点一下舞台就翻到下一行，而那一行的音频往往已经缓冲好了——
		// 行一变当前行，`lineStarted` 就把已解码的短语排上去播。
		// `VOICE_CLICKS=0` 看「玩家不翻页」那条路：翻页会 fastForward 掐掉正在播的语音，
		// 所以这两种行为要分开量，不能混在一起下结论。
		if (ready && clicks < CLICK_BUDGET) {
			await clickStage();
			clicks += 1;
			await page.waitForTimeout(2_500);
		} else {
			await page.waitForTimeout(300);
		}
	}

	check(
		'V4',
		startedFrames.length > 0,
		`中枢里有「正在合成」的 voice 帧（${startedFrames.length} 条，ready ${readyFrames.length} 条）`,
	);
	check('V5', Boolean(ready), ready ? `拿到音频 URL（lineSeq=${ready.lineSeq}, phrase=${ready.phrase}）` : '等不到 ready 帧');

	if (ready) {
		const res = await fetch(new URL(ready.url, E2E_URL));
		const body = Buffer.from(await res.arrayBuffer());
		check('V6', res.status === 200, `音频可取回（HTTP ${res.status}）`);
		check(
			'V7',
			res.headers.get('content-type') === 'audio/mpeg',
			`content-type 是 audio/mpeg（${res.headers.get('content-type')}）`,
		);
		// MP3 有两种开头：带 ID3 标签（`ID3`）或直接进帧同步（0xFF 后三位全 1）。
		// Fish 返回的是后者——只认 `ID3` 会把一段好好的音频判成坏的。
		const mp3 =
			body.subarray(0, 3).toString('latin1') === 'ID3' || (body[0] === 0xff && (body[1] & 0xe0) === 0xe0);
		check('V8', body.length > 2_000 && mp3, `是真 MP3（${body.length} 字节，头 ${body.subarray(0, 2).toString('hex')}）`);
	}

	const probe = await page.evaluate(() => window.__voiceProbe ?? null);
	check(
		'V10',
		(probe?.decoded ?? 0) > 0 && (probe?.decodeFailed ?? 0) === 0,
		`浏览器把音频解成了 PCM（成功 ${probe?.decoded ?? 0} / 失败 ${probe?.decodeFailed ?? 0}）`,
	);
	check('V11', started > 0, `自然播放起播（${started} 次，翻了 ${clicks} 次页）`);

	/*
	 * 判别性的一步：点舞台上的「重听这句」。
	 *
	 * 它走 `director.replay(seq)`——按已存下来的 URL 重新拉流解码并起播，**绕开行时序**
	 * （不依赖「音频回来时这一行还是当前行」）。所以它能分辨两种失败：
	 * 出声链路本身不通（解码/调度/Web Audio 有问题），还是只是音频追不上播放头。
	 */
	const replayClicked = await page.evaluate(() => {
		const button = [...document.querySelectorAll('button')].find(
			(el) => (el.getAttribute('title') ?? '') === '重听这句',
		);
		if (!button || button.disabled) return false;
		button.click();
		return true;
	});
	await page.waitForTimeout(3_000);
	const replayProbe = await page.evaluate(() => window.__voiceProbe ?? null);
	check(
		'V16',
		!replayClicked || (replayProbe?.started ?? 0) > started,
		replayClicked
			? `点「重听这句」后音源起播了（${started} → ${replayProbe?.started ?? 0}）`
			: `舞台上没有可点的「重听这句」（起播仍为 ${started}）`,
	);

	// 竞速诊断：合成延迟 vs 行时长。不判通过与否，只把数字摆出来。
	const says = [...new Set(sayFrames.map((frame) => frame.seq))].sort(
		(a, b) => (seenAt.get(a) ?? 0) - (seenAt.get(b) ?? 0),
	);
	for (const [i, seq] of says.entries()) {
		const next = says[i + 1];
		const readyAt = readyFrames.find((frame) => frame.lineSeq === seq);
		const latency = readyAt ? ((seenAt.get(readyAt.seq) - seenAt.get(seq)) / 1000).toFixed(1) : '—';
		const life = next ? ((seenAt.get(next) - seenAt.get(seq)) / 1000).toFixed(1) : '行尾';
		console.log(`  （行 seq=${seq}：合成回来用了 ${latency}s，这一行撑了 ${life}s）`);
	}

	// B1 回归：挂载后同步一次总开关，点一下开关再同步一次。
	check(
		'V14',
		voicePosts.some((post) => post.enabled === true),
		`挂载时把总开关同步给了宿主（收到 ${voicePosts.length} 条：${JSON.stringify(voicePosts.slice(-2))}）`,
	);
	const flipped = await page.evaluate(() => {
		// 自家组件用 DOM click：元素会随重渲染重建，Playwright 的 locator 会一直重试到超时。
		const buttons = [...document.querySelectorAll('button')];
		const toggle = buttons.find((el) => (el.getAttribute('title') ?? '').startsWith('Voice:'));
		if (!toggle) return null;
		const before = toggle.getAttribute('title');
		toggle.click();
		return before;
	});
	await page.waitForTimeout(800);
	check(
		'V15',
		Boolean(flipped) && voicePosts.some((post) => post.enabled === false),
		flipped ? `关掉语音后宿主也收到了 enabled:false（${JSON.stringify(voicePosts.slice(-1))}）` : '找不到语音开关',
	);

	check('V9', errors.length === 0, `页面无报错（${errors.length}）`);
	console.log(`\n${results.filter((r) => r.ok).length}/${results.length} 通过`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
}

process.exit(results.every((r) => r.ok) ? 0 : 1);
