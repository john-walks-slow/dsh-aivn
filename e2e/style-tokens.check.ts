#!/usr/bin/env node
/**
 * 舞台皮肤的离线检查：白名单、取值校验、读闸，以及**防漂移**。
 *
 * 不需要 DSH 实例，由 `e2e/verify-style.mjs` 用 esbuild 打成临时 bundle 后直跑。
 * 防漂移这一组是这份文件的主要理由：令牌表把 stage.css 的变量名与默认值抄了一份，
 * 那边改了默认值（或改了名），这里必须红——否则「不给参数就回默认值」的回执会说谎。
 *
 * 输出：逐条 `✓/✗` 人行可读，末尾一行 `RESULT <json>` 供套件收编判据。
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
	DEFAULT_THEME,
	STYLE_TOKENS,
	describeTheme,
	sanitizeTheme,
	validateThemePatch,
} from '../src/style/style-tokens';
import { readPlayTheme, THEME_FILE } from '../src/style/theme';

const results: Array<{ id: string; ok: boolean; note: string }> = [];
const check = (id: string, ok: boolean, note = ''): void => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/* ---------------------------------------------------------------- 合法取值 */

const LEGAL: Record<string, string> = {
	dialog_bg: 'linear-gradient(178deg, rgb(28 24 25 / 0.9), rgb(17 15 17 / 0.94))',
	dialog_line: 'rgb(238 226 204 / 0.55)',
	dialog_ink: '#f2ebde',
	dialog_ink_soft: 'hsl(210 40% 50%)',
	dialog_ink_thought: 'rgba(169, 166, 196, 0.9)',
	dialog_ink_faint: '#f2ebde73',
	dialog_shadow: '0 10px 30px rgb(0 0 0 / 0.45)',
	stage_bg: '#17130f',
	stage_radius: '20px',
	sprite_dim: '0.4',
	choice_bg: 'rgb(24 21 23 / 0.92)',
	choice_line: '#ffeecc',
	choice_ink: '#fff',
	font_ui: 'system-ui, "Noto Sans CJK SC", sans-serif',
	accent: '#3f6b93',
	accent_ink: '#f7fbff',
	accent_soft: '#dde7f0',
};

const good = validateThemePatch(LEGAL);
check(
	'T1',
	good.errors.length === 0 && Object.keys(good.theme).length === STYLE_TOKENS.length,
	`17 个键的合法取值全过（${Object.keys(good.theme).length}/${STYLE_TOKENS.length}，错误 ${good.errors.length}）`,
);

const none = validateThemePatch({ dialog_shadow: 'none', dialog_bg: '#101010' });
check('T2', none.errors.length === 0 && none.theme['--dialog-shadow'] === 'none', '`none` 与纯色底也合法');

/* ---------------------------------------------------------------- 非法取值 */

const ILLEGAL: Record<string, string> = {
	dialog_bg: 'url(https://example.invalid/x.png)',
	dialog_line: 'var(--ink)',
	dialog_ink: 'red',
	dialog_shadow: 'inset 0 0 10px rgb(0 0 0)',
	stage_radius: '999px',
	sprite_dim: '0.05',
	font_ui: 'sans-serif; } body { color: red',
	accent: 'color-mix(in srgb, red, blue)',
	'--evil-key': '#000',
};

const bad = validateThemePatch(ILLEGAL);
const named = Object.keys(ILLEGAL).every((key) => bad.errors.some((line) => line.startsWith(`${key}：`)));
check(
	'T3',
	bad.errors.length === Object.keys(ILLEGAL).length && named && Object.keys(bad.theme).length === 0,
	`${bad.errors.length} 条非法输入全拒、逐条带键名、一个字节都不写`,
);

const overLong = validateThemePatch({ font_ui: `${'A'.repeat(220)}, sans-serif` });
check('T4', overLong.errors.length === 1, '超长字体栈被拒');

/* ---------------------------------------------------------------- 读闸 */

const mixed = sanitizeTheme({
	'--dialog-ink': '#ff5555',
	'--stage-radius': '999px',
	'--nope': '#000',
	'--accent': 42,
});
check(
	'T5',
	mixed.theme['--dialog-ink'] === '#ff5555' &&
		Object.keys(mixed.theme).length === 1 &&
		mixed.dropped.length === 3,
	`读闸只丢坏键（留下 ${Object.keys(mixed.theme).length} 个，丢掉 ${mixed.dropped.length} 个）`,
);

/* ---------------------------------------------------------------- 防漂移 */

const css = readFileSync(join(process.cwd(), 'node_modules/@aivn/stage/dist/stage.css'), 'utf8');
const block = /\.stage-root\s*\{([\s\S]*?)\n\}/.exec(css.replace(/\/\*[\s\S]*?\*\//g, ''))?.[1] ?? '';
const declared = new Map<string, string>();
for (const line of block.split(';')) {
	// 值可以是多行（`--font-ui` 的字体栈就折了三行）：`[\s\S]` 收全，再统一压成单行空格。
	const match = /^\s*(--[a-z0-9-]+)\s*:\s*([\s\S]+?)\s*$/.exec(line);
	if (match) declared.set(match[1], match[2].replace(/\s+/g, ' ').trim());
}

const missing = STYLE_TOKENS.filter((token) => !declared.has(token.key)).map((token) => token.key);
check(
	'T6',
	missing.length === 0,
	`白名单 17 键都在 stage.css 的 .stage-root 里声明（缺：${missing.join('、') || '无'}）`,
);

const drift = STYLE_TOKENS.filter(
	(token) => declared.get(token.key)?.replace(/\s+/g, ' ').trim() !== token.default.replace(/\s+/g, ' ').trim(),
);
check(
	'T7',
	drift.length === 0,
	drift.length === 0
		? '默认值表与 stage.css 逐键一致'
		: `默认值漂移：${drift.map((token) => `${token.key}（表：${token.default} / css：${declared.get(token.key)}）`).join('；')}`,
);

const dead = Object.keys(DEFAULT_THEME).filter((key) => !new RegExp(`var\\(${key}\\b`).test(css));
check(
	'T8',
	dead.length === 0,
	dead.length === 0 ? '白名单里没有「定义了但没人消费」的死变量' : `死变量：${dead.join('、')}`,
);

/* ---------------------------------------------------------------- 回执与文件 */

const described = describeTheme({ '--dialog-ink': '#ff5555' });
check(
	'T9',
	STYLE_TOKENS.every((token) => described.includes(token.param)) && described.includes('1 个键'),
	'空参回执列全 17 个参数名并报改了 1 个键',
);

const dir = mkdtempSync(join(tmpdir(), 'aivn-theme-'));
try {
	check('T10', readPlayTheme(dir).theme['--dialog-ink'] === undefined, '没有 theme.json 就是默认皮（不是错误）');

	writeFileSync(join(dir, THEME_FILE), `${JSON.stringify({ '--dialog-ink': '#ff5555' }, null, 2)}\n`);
	check('T11', readPlayTheme(dir).theme['--dialog-ink'] === '#ff5555', 'theme.json 往返读得回来');

	writeFileSync(join(dir, THEME_FILE), '{ 坏了');
	let message = '';
	try {
		readPlayTheme(dir);
	} catch (error) {
		message = error instanceof Error ? error.message : String(error);
	}
	check('T12', message.includes(THEME_FILE) && message.includes('JSON'), `坏 JSON 报错带文件名（${message}）`);
} finally {
	rmSync(dir, { recursive: true, force: true });
}

const failed = results.filter((row) => !row.ok);
console.log(`RESULT ${JSON.stringify(results)}`);
process.exit(failed.length === 0 ? 0 : 1);
