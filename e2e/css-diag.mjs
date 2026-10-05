#!/usr/bin/env node
/**
 * 舞台样式体检：插件把 `stage.css` 注进去没有、令牌拿到没有、按钮算出来是什么样。
 *
 * 用法：dsh-e2e run e2e/css-diag.mjs（实例要在跑）
 * 不开 LLM 轮：新会话的工作目录就是仓库根，那儿有 play.json，舞台会渲染空态与「开演」按钮。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PLAY } from './lib/fixture.mjs';
import {
	dismissOnboarding,
	gotoGui,
	launch,
	listTabs,
	newPage,
	newSession,
	openViewTabWhenReady,
	pickPreset,
	sendMessage,
	waitFor,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'e2e-artifacts');
mkdirSync(OUT, { recursive: true });

// E2E_VIEWPORT=mobile 时按手机竖屏量：移动端小节（≤720px）只有这个尺寸才生效。
const MOBILE = process.env.E2E_VIEWPORT === 'mobile';
const VIEWPORT = MOBILE ? { width: 390, height: 844 } : { width: 1280, height: 860 };
const SUFFIX = MOBILE ? '-mobile' : '';

const browser = await launch();
const { page, errors } = await newPage(browser, VIEWPORT);

try {
	await gotoGui(page);
	await dismissOnboarding(page);
	console.log('新建会话:', await newSession(page));
	console.log('选预设:', JSON.stringify(await pickPreset(page, '剧作家')));
	await page.waitForTimeout(2_000);
	// tab 只有会话真开起来才出现（e2e 也是发第一条消息之后才等到它）。
	await sendMessage(page, PLAY.opening);
	await page.waitForTimeout(2_500);
	console.log('tab 列表:', (await listTabs(page)).join(' / '));
	console.log('切到舞台:', await openViewTabWhenReady(page, '舞台', 60_000));
	const mounted = await waitFor(page, () => document.querySelector('.stage-root.aivn-stage-view') !== null, {
		timeout: 30_000,
		label: '舞台挂载',
	});
	console.log('舞台挂载:', Boolean(mounted));
	if (!mounted) {
		await page.screenshot({ path: join(OUT, `css-diag-fail${SUFFIX}.png`) });
		console.log('没挂上，截图：', join(OUT, `css-diag-fail${SUFFIX}.png`));
		console.log('tab 列表（切后）:', (await listTabs(page)).join(' / '));
	}

	const report = await page.evaluate(() => {
		const stageStyles = [...document.querySelectorAll('style[data-plugin-css]')].map((tag) => ({
			id: tag.dataset.pluginCss,
			chars: (tag.textContent ?? '').length,
			head: (tag.textContent ?? '').slice(0, 50),
			connected: tag.isConnected,
		}));

		const root = document.querySelector('.stage-root');
		const tokens = {};
		if (root) {
			const cs = getComputedStyle(root);
			for (const name of ['--accent', '--paper', '--ink', '--choice-line', '--font-ui']) {
				tokens[name] = cs.getPropertyValue(name).trim() || '(空)';
			}
		}

		/** 往舞台根里插一个探针元素，量它算出来的样式——不依赖停止点面板此刻在不在。 */
		const probeOf = (tag, className, parent) => {
			const el = document.createElement(tag);
			el.className = className;
			el.textContent = '探针';
			parent.appendChild(el);
			const cs = getComputedStyle(el);
			const out = {
				cls: className,
				bg: cs.backgroundColor,
				color: cs.color,
				border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
				padding: cs.padding,
				radius: cs.borderRadius,
				font: `${cs.fontFamily.split(',')[0]} ${cs.fontSize}`,
				minHeight: cs.minHeight,
				display: cs.display,
				position: cs.position,
				inset: `${cs.top} ${cs.right} ${cs.bottom} ${cs.left}`,
				zIndex: cs.zIndex,
				alignItems: cs.alignItems,
				justifyContent: cs.justifyContent,
			};
			el.remove();
			return out;
		};

		const probes = [];
		if (root) {
			probes.push(probeOf('button', 'choice', root));
			probes.push(probeOf('div', 'choice-overlay', root));
			probes.push(probeOf('div', 'theater', root));
			probes.push(probeOf('div', 'theater-dialog', root));
		}

		// 舞台往上第一串祖先 + 每一层的孩子：看清原生输入框挂在哪一层、能不能盖住。
		const describe = (el) => {
			const cs = getComputedStyle(el);
			const r = el.getBoundingClientRect();
			return {
				tag: el.tagName,
				cls: typeof el.className === 'string' ? el.className.slice(0, 70) : '',
				data: [...el.attributes]
					.filter((a) => a.name.startsWith('data-'))
					.map((a) => a.name)
					.join(' '),
				display: cs.display,
				rect: `${r.x.toFixed(0)},${r.y.toFixed(0)} ${r.width.toFixed(0)}x${r.height.toFixed(0)}`,
				overflow: cs.overflow,
				position: cs.position,
			};
		};
		const chain = [];
		for (let el = root, i = 0; el && i < 9; el = el.parentElement, i += 1) {
			chain.push({ ...describe(el), children: [...el.children].map(describe) });
		}

		// 原生输入框那一条：从 contenteditable 往上走到 data-conversation-region 为止。
		const editor = document.querySelector('[contenteditable="true"]');
		const composerChain = [];
		for (let el = editor, i = 0; el && el !== document.body && i < 8; el = el.parentElement, i += 1) {
			composerChain.push(describe(el));
			if (el.hasAttribute('data-conversation-region')) break;
		}

		const stageRect = root?.getBoundingClientRect().toJSON() ?? null;

		return {
			stageStyles,
			allPluginStyles: [...document.querySelectorAll('style[data-plugin-css]')].length,
			tokens,
			root: root ? { class: root.className } : null,
			probes,
			chain,
			composerChain,
			stageRect,
			editorRect: editor?.getBoundingClientRect().toJSON() ?? null,
			viewport: { w: innerWidth, h: innerHeight },
		};
	});

	console.log(JSON.stringify(report, null, 2));
	console.log('页面报错：', errors.length);
	writeFileSync(join(OUT, `css-diag${SUFFIX}.json`), `${JSON.stringify(report, null, 2)}\n`);
	await page.screenshot({ path: join(OUT, `css-diag${SUFFIX}.png`), fullPage: false });
	console.log('截图：', join(OUT, `css-diag${SUFFIX}.png`));
} finally {
	await browser.close();
}
