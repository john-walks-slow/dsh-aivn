/**
 * 舞台皮肤的令牌白名单与取值校验。
 *
 * 一座剧目的皮肤写在它自己目录下的 `theme.json` 里：键是 `@aivn/stage/stage.css` 的
 * `.stage-root` 上那批 CSS 变量名，值是通过这里校验的字符串。为什么要白名单——写这条通道的
 * 是模型，值最终塞进舞台根的内联样式；不把它收成「预定义变量 + 合法取值」，等于开了一个
 * 任意 CSS 的口子（模型写什么就渲染什么）。
 *
 * 两道闸共用这一份实现，宽严不同：
 *   - 写闸（`set_stage_style` 工具）：全有或全无——任一键不合法就整体拒绝，逼模型一次改对；
 *   - 读闸（`readPlayTheme`）：用户手改坏了只丢那一个键，其余照常渲染——皮坏了不该让剧目打不开。
 *
 * 默认值抄自 stage.css 的 `.stage-root` 块。那边改了默认值，`e2e/verify-style.mjs` 的防漂移
 * 断言会红，照着提醒回来对表。
 */

/** 令牌分组：工具描述与回执按它分段，模型一眼看清哪些键是一套的。 */
export type StyleGroup = '台词条' | '衬底与圆角' | '选肢卡' | '字体' | '主色';

export interface StyleToken {
	/** `theme.json` 里的键，与 stage.css 的变量名逐字一致。 */
	readonly key: string;
	/** 工具参数的键名（模型看得见的那一面）：去掉 `--`，连字符变下划线。 */
	readonly param: string;
	readonly group: StyleGroup;
	/** stage.css 里声明的默认值。 */
	readonly default: string;
	/** 合法形状，出错时原样回给模型。 */
	readonly shape: string;
	/** 改了会看见什么。写进工具描述，也进空参回执。 */
	readonly effect: string;
	/** 合法就返回规整后的值，否则 null。 */
	readonly check: (raw: string) => string | null;
}

/** `theme.json` 整份的上限：17 个键的值加起来远用不到，防的是手滑贴进一整篇 CSS。 */
export const THEME_MAX_BYTES = 4 * 1024;

/* ------------------------------------------------------------------ 取值校验 */

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const COLOR_FN = /^(rgba?|hsla?)\(([^()]*)\)$/i;
const FAMILY = /^["']?[A-Za-z0-9-][A-Za-z0-9 _'()!.-]{0,63}["']?$/;

/** 0–255 整数，或 0–100% 的百分比。 */
function isByte(part: string): boolean {
	const percent = /^(\d{1,3}(?:\.\d+)?)%$/.exec(part);
	if (percent) return Number(percent[1]) <= 100;
	return /^\d{1,3}$/.test(part) && Number(part) <= 255;
}

/** 色相：0–360，可带小数。 */
function isAngle(part: string): boolean {
	const match = /^(\d{1,3}(?:\.\d+)?)$/.exec(part);
	return match !== null && Number(match[1]) <= 360;
}

function isPercent(part: string): boolean {
	const match = /^(\d{1,3}(?:\.\d+)?)%$/.exec(part);
	return match !== null && Number(match[1]) <= 100;
}

/** 透明度：0–1 或 0–100%。 */
function isAlpha(part: string): boolean {
	if (/^0?\.\d+$/.test(part)) return Number(part) <= 1;
	if (/^1(?:\.0+)?$/.test(part)) return true;
	const match = /^(\d{1,3}(?:\.\d+)?)%$/.exec(part);
	return match !== null && Number(match[1]) <= 100;
}

/**
 * 颜色：`#rgb`/`#rrggbb`（含 4/8 位带 alpha 的写法）、`rgb()/rgba()`、`hsl()/hsla()`。
 * 参数按 CSS 的两种语法都认——空格加 `/` 引 alpha，或逗号分隔（stage.css 自己用空格那种）。
 * 认不出的函数名（`var(`、`color-mix(`、`calc(`…）在这一步就出局。
 */
function parseColor(raw: string): string | null {
	const value = raw.trim();
	if (HEX.test(value)) return value;

	const fn = COLOR_FN.exec(value);
	if (!fn) return null;
	const name = fn[1].toLowerCase();

	// alpha 可以走 `/`（`rgb(28 24 25 / 0.9)`），也可以混在逗号串里（旧式 `rgba(28, 24, 25, 0.9)`）。
	const slash = splitTop(fn[2], '/');
	if (slash.length > 2) return null;
	const head = slash[0].trim();
	if (head === '') return null;
	const channels = head.includes(',') ? splitTop(head, ',') : head.split(/\s+/);
	let alpha = slash[1]?.trim();
	if (alpha === '' || channels.some((part) => part === '')) return null;
	if (alpha === undefined && channels.length === 4) {
		const last = channels.pop();
		if (last !== undefined) alpha = last;
	}

	if (channels.length !== 3) return null;
	// 旧写法（rgba/hsla）的 alpha 不在 `/` 里就在第四参里，两处都没有就是残句。
	if ((name === 'rgba' || name === 'hsla') && alpha === undefined) return null;

	if (name.startsWith('rgb')) {
		if (!channels.every(isByte)) return null;
	} else if (!isAngle(channels[0]) || !isPercent(channels[1]) || !isPercent(channels[2])) {
		return null;
	}
	if (alpha !== undefined && !isAlpha(alpha)) return null;
	return value;
}

/** 按顶层的某个分隔符切分，括号里的不算（`rgb(28, 24, 25)` 里的逗号要留住）。 */
function splitTop(raw: string, separator: string): string[] {
	const parts: string[] = [];
	let depth = 0;
	let current = '';
	for (const char of raw) {
		if (char === '(') depth += 1;
		else if (char === ')') depth -= 1;
		if (char === separator && depth === 0) {
			parts.push(current);
			current = '';
			continue;
		}
		current += char;
	}
	parts.push(current);
	return parts.map((part) => part.trim());
}

/** 台词条底：颜色，或与默认值同形的两色竖直渐变。 */
function parseDialogBg(raw: string): string | null {
	const value = raw.trim();
	const color = parseColor(value);
	if (color !== null) return color;

	const head = /^linear-gradient\(/i.exec(value);
	if (!head || !value.endsWith(')')) return null;
	const args = splitTop(value.slice(head[0].length, -1), ',');
	if (args.length !== 3) return null;
	const angle = /^(\d{1,3})deg$/.exec(args[0]);
	if (!angle || Number(angle[1]) > 360) return null;
	return parseColor(args[1]) !== null && parseColor(args[2]) !== null ? value : null;
}

/** 投影：`none`，或 `x y blur 颜色`（与默认值同形，不收 spread 与 inset）。 */
function parseShadow(raw: string): string | null {
	const value = raw.trim();
	if (value === 'none') return value;
	// 三个长度允许无单位的 0（默认值自己就是 `0 10px 30px …`），其余必须带 px。
	const match = /^(0|\d{1,2}px)\s+(0|\d{1,2}px)\s+(0|\d{1,3}px)\s+(.+)$/.exec(value);
	if (!match) return null;
	const bounds = [24, 60, 100];
	for (const [index, bound] of bounds.entries()) {
		if (Number(match[index + 1].replace('px', '')) > bound) return null;
	}
	return parseColor(match[4]) !== null ? value : null;
}

/** 圆角：0–24px 整数，单位必写。 */
function parseRadius(raw: string): string | null {
	const value = raw.trim();
	const match = /^(\d{1,2})px$/.exec(value);
	return match !== null && Number(match[1]) <= 24 ? value : null;
}

/** 压暗强度：0.2–1，至多两位小数。 */
function parseDim(raw: string): string | null {
	const value = raw.trim();
	if (!/^(?:0\.\d{1,2}|1(?:\.0{1,2})?)$/.test(value)) return null;
	const number = Number(value);
	return number >= 0.2 && number <= 1 ? value : null;
}

/**
 * 字体栈：逗号分隔的字体名。
 *
 * stage.css 里记着一条教训（衬线栈缺字时笔画发虚），所以工具描述要提醒栈尾留通用族兜底；
 * 这里只保证它是「一串字体名」而不是别的什么东西——分号、花括号、`url(` 一律挡掉。
 */
function parseFontStack(raw: string): string | null {
	const value = raw.trim();
	if (value.length === 0 || value.length > 200) return null;
	if (/[;{}<>`]|url\(|@/i.test(value)) return null;
	return value.split(',').every((family) => FAMILY.test(family.trim())) ? value : null;
}

/* ------------------------------------------------------------------ 令牌表 */

/**
 * 白名单。分五组：台词条（台词窗与名牌共用一套玻璃）、衬底与圆角、选肢卡、
 * 字体、主色。不收的键与理由见 `docs/features/261006-aivn-settings/stage-style.plan.md`：
 * 死变量（`.stage-root` 上定义了但没有消费者）、导演栏专属、与亮暗主题强耦合的几批。
 */
export const STYLE_TOKENS: readonly StyleToken[] = [
	{
		key: '--dialog-bg',
		param: 'dialog_bg',
		group: '台词条',
		default: 'linear-gradient(178deg, rgb(28 24 25 / 0.9), rgb(17 15 17 / 0.94))',
		shape: '颜色，或 `linear-gradient(<0–360>deg, <颜色>, <颜色>)`',
		effect: '台词条与说话人名牌的底',
		check: parseDialogBg,
	},
	{
		key: '--dialog-line',
		param: 'dialog_line',
		group: '台词条',
		default: 'rgb(238 226 204 / 0.55)',
		shape: '颜色',
		effect: '台词条与名牌的描边',
		check: parseColor,
	},
	{
		key: '--dialog-ink',
		param: 'dialog_ink',
		group: '台词条',
		default: '#f2ebde',
		shape: '颜色',
		effect: '台词正文字色、名牌字色、打字机光标',
		check: parseColor,
	},
	{
		key: '--dialog-ink-soft',
		param: 'dialog_ink_soft',
		group: '台词条',
		default: '#c6bba9',
		shape: '颜色',
		effect: '旁白字色、台词条右下提示、「（继续）」卡',
		check: parseColor,
	},
	{
		key: '--dialog-ink-thought',
		param: 'dialog_ink_thought',
		group: '台词条',
		default: '#a9a6c4',
		shape: '颜色',
		effect: '内心独白字色',
		check: parseColor,
	},
	{
		key: '--dialog-ink-faint',
		param: 'dialog_ink_faint',
		group: '台词条',
		default: 'rgb(242 235 222 / 0.45)',
		shape: '颜色',
		effect: '选肢卡「已选过」角标这类次要提示',
		check: parseColor,
	},
	{
		key: '--dialog-shadow',
		param: 'dialog_shadow',
		group: '台词条',
		default: '0 10px 30px rgb(0 0 0 / 0.45)',
		shape: '`none`，或 `<0–24>px <0–60>px <0–100>px <颜色>`',
		effect: '台词条的投影——换亮色台词条时要一起改浅，否则发糊',
		check: parseShadow,
	},
	{
		key: '--stage-bg',
		param: 'stage_bg',
		group: '衬底与圆角',
		default: '#17130f',
		shape: '颜色',
		effect: '舞台衬底：图片未到或加载中露出的那片底',
		check: parseColor,
	},
	{
		key: '--stage-radius',
		param: 'stage_radius',
		group: '衬底与圆角',
		default: '10px',
		shape: '`<0–24>px`',
		effect: '台词条、名牌、选肢卡这些「浮在画面上的窗」的圆角',
		check: parseRadius,
	},
	{
		key: '--sprite-dim',
		param: 'sprite_dim',
		group: '衬底与圆角',
		default: '0.55',
		shape: '`0.2`–`1`，至多两位小数',
		effect: '非发言人立绘的压暗强度（1 = 完全不压）',
		check: parseDim,
	},
	{
		key: '--choice-bg',
		param: 'choice_bg',
		group: '选肢卡',
		default: 'rgb(24 21 23 / 0.92)',
		shape: '颜色',
		effect: '停止点选项卡与「开演」卡的底',
		check: parseColor,
	},
	{
		key: '--choice-line',
		param: 'choice_line',
		group: '选肢卡',
		default: 'rgb(238 226 204 / 0.4)',
		shape: '颜色',
		effect: '选项卡的描边',
		check: parseColor,
	},
	{
		key: '--choice-ink',
		param: 'choice_ink',
		group: '选肢卡',
		default: '#f2ebde',
		shape: '颜色',
		effect: '选项卡的字色',
		check: parseColor,
	},
	{
		key: '--font-ui',
		param: 'font_ui',
		group: '字体',
		default:
			'system-ui, -apple-system, "Segoe UI", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif',
		shape: '逗号分隔的字体名（整串 ≤ 200 字符）',
		effect: '台词、名牌、选项卡、提示的全部字体',
		check: parseFontStack,
	},
	{
		key: '--accent',
		param: 'accent',
		group: '主色',
		default: '#3f6b93',
		shape: '颜色',
		effect: '选项卡左侧色尺、主按钮底色、链接键、焦点环——改它要配套改 accent_ink',
		check: parseColor,
	},
	{
		key: '--accent-ink',
		param: 'accent_ink',
		group: '主色',
		default: '#f7fbff',
		shape: '颜色',
		effect: '主色底上的字色',
		check: parseColor,
	},
	{
		key: '--accent-soft',
		param: 'accent_soft',
		group: '主色',
		default: '#dde7f0',
		shape: '颜色',
		effect: '主色淡底：文字选中的底色、亮起的工具栏键',
		check: parseColor,
	},
];

/** 令牌按参数名索引——工具收的是这一面。 */
export const TOKEN_BY_PARAM = new Map(STYLE_TOKENS.map((token) => [token.param, token]));

/** 令牌按 `theme.json` 的键索引——读写文件走这一面。 */
export const TOKEN_BY_KEY = new Map(STYLE_TOKENS.map((token) => [token.key, token]));

/** 默认皮肤。空对象 = 一个变量都不注入，舞台走的正是这套值。 */
export const DEFAULT_THEME: Readonly<Record<string, string>> = Object.fromEntries(
	STYLE_TOKENS.map((token) => [token.key, token.default]),
);

/** 参数名的合法集合，回执里列给模型看。 */
export const STYLE_PARAMS: readonly string[] = STYLE_TOKENS.map((token) => token.param);

/* ------------------------------------------------------------------ 两道闸 */

export interface ThemeValidation {
	/** 通过校验、要写进文件的键值。 */
	theme: Record<string, string>;
	/** 要恢复默认的键（参数给 null）。 */
	reset: string[];
	/** 逐键的错误，每条都带键名与收到的值。 */
	errors: string[];
}

/**
 * 写闸：把工具参数整理成「要写什么」。
 *
 * 参数名在 `theme.json` 里的键不认识、或值不合法，都记进 `errors`——调用方见到非空 errors
 * 就该整体拒绝（一次调用是一次事务，不做半套）。
 */
export function validateThemePatch(patch: Record<string, unknown>): ThemeValidation {
	const theme: Record<string, string> = {};
	const reset: string[] = [];
	const errors: string[] = [];

	for (const [param, raw] of Object.entries(patch)) {
		const token = TOKEN_BY_PARAM.get(param);
		if (!token) {
			errors.push(`${param}：不是可设置的键。合法的键：${STYLE_PARAMS.join('、')}`);
			continue;
		}
		if (raw === undefined) continue;
		if (raw === null) {
			reset.push(token.key);
			continue;
		}
		if (typeof raw !== 'string') {
			errors.push(`${param}：要给字符串（${token.shape}），或 null 恢复默认`);
			continue;
		}
		const checked = token.check(raw);
		if (checked === null) errors.push(`${param}：${JSON.stringify(raw)} 不是合法值。${token.shape}`);
		else theme[token.key] = checked;
	}

	return { theme, reset, errors };
}

export interface ThemeSanitize {
	/** 过闸后剩下的键值；空对象 = 就是默认皮。 */
	theme: Record<string, string>;
	/** 被丢掉的条目，供调用方记一行日志。 */
	dropped: string[];
}

/**
 * 读闸：文件是用户也能手改的，坏键只丢那一个，不连累整份皮（更不连累剧目）。
 * 值与键都要过白名单，理由与写闸相同——文件同样是模型写过一遍的地方。
 */
export function sanitizeTheme(raw: unknown): ThemeSanitize {
	const theme: Record<string, string> = {};
	const dropped: string[] = [];
	if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
		return { theme, dropped: ['theme.json 的顶层不是对象'] };
	}

	for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
		const token = TOKEN_BY_KEY.get(key);
		if (!token) {
			dropped.push(`${key}：不是可设置的键`);
			continue;
		}
		if (typeof value !== 'string') {
			dropped.push(`${key}：值不是字符串`);
			continue;
		}
		const checked = token.check(value);
		if (checked === null) dropped.push(`${key}：${JSON.stringify(value)} 不是合法值`);
		else theme[key] = checked;
	}

	return { theme, dropped };
}

/* ------------------------------------------------------------------ 回执渲染 */

/** 一份皮肤改了几个键（供注入段那行摘要）。 */
export function countTheme(theme: Record<string, string>): number {
	return Object.keys(theme).length;
}

/**
 * 空参回执：当前生效值 vs 默认值。
 *
 * 读面不做成另一个工具（模型多记一个工具不如把「不给参数」定义成查看），
 * 对照表列全 17 键——省得模型为了知道某个键的默认值再翻 CSS。
 */
export function describeTheme(theme: Record<string, string>): string {
	const lines: string[] = [];
	for (const group of new Set(STYLE_TOKENS.map((token) => token.group))) {
		const tokens = STYLE_TOKENS.filter((token) => token.group === group);
		lines.push(`**${group}**`);
		for (const token of tokens) {
			const current = theme[token.key];
			const value = current ?? token.default;
			lines.push(`- \`${token.param}\` ${current === undefined ? '（默认）' : '（已改）'} ${value}`);
		}
	}
	const changed = countTheme(theme);
	const head = changed === 0 ? '当前是默认皮肤（theme.json 里一个键都没改）。' : `当前改了 ${changed} 个键。`;
	return `${head}\n\n${lines.join('\n')}`;
}
