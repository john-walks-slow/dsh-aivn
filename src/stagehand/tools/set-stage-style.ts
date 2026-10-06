/**
 * `set_stage_style` —— 写剧目根的 `theme.json`，改这座剧目的舞台皮肤。
 *
 * 三态（省略 / 给值 / null）与同一条底线：整次调用是一次事务，
 * 有一个键不合法就什么都不写。不同处在于**校验在这里比别处重要**——写这条通道的是模型，
 * 值最后会变成舞台根的内联 CSS 变量，白名单与格式校验（`style-tokens.ts`）是唯一的口子。
 *
 * 写完立刻往这座剧目的所有舞台会话推一份全量皮肤快照（见 `PlayContext.broadcastStyle`：
 * 工具在搭台助手会话里跑，画面开在剧作家会话上），已经打开的舞台当场换装，不必刷新页面。
 */
import { existsSync } from 'node:fs';
import { rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool, type ParameterPropertySpec, type ParameterSchemaSpec } from '@deepseek-ai/dsh-tools';
import { PLAY_FILE } from '../../play';
import { describeTheme, STYLE_TOKENS, validateThemePatch, type StyleToken } from '../../style-tokens';
import { readPlayTheme, THEME_FILE } from '../../theme';
import type { PlayContext } from '../../tools/context';

const RESET = '省略 = 保持现状；给 null = 恢复默认（该键从 theme.json 移除，删空则文件整个删掉）。';

const DESCRIPTION = [
	'设置这部剧的舞台皮肤（台词条、说话人名牌、停止点选项卡、舞台衬底、圆角、字体、主色），',
	`写进剧目根的 ${THEME_FILE}，改完立刻推到已经打开的舞台，用户不用刷新。`,
	'**用户要求换皮、或你们商量好了一个视觉基调再动**——默认那套（浅纸面 + 暗画面）是设计过的，',
	'「顺手美化」不是理由；想表达情绪或气氛，那是台词与配乐的事，不是换几个颜色能顶的。',
	`- ${RESET}`,
	'- 一次调用是一次事务：任何一个键不合法，整次拒绝，一个字节都不写。',
	'',
	'值怎么写：',
	'- 颜色：`#3f6b93`、`rgb(28 24 25 / 0.9)`、`hsl(210 40% 50%)` 这类写法；不认颜色名、`var()`、`calc()`。',
	'- `dialog_bg` 还可以是渐变：`linear-gradient(178deg, rgb(28 24 25 / 0.9), rgb(17 15 17 / 0.94))`。',
	'- `dialog_shadow`：`none`，或 `0 10px 30px rgb(0 0 0 / 0.45)` 这样的「x y 模糊 颜色」。',
	'- `stage_radius`：`0px`–`24px`。`sprite_dim`：`0.2`–`1`（1 = 非发言人立绘完全不压暗）。',
	'- `font_ui`：逗号分隔的字体名，栈尾留 `sans-serif` 兜底；别只给一个本机未必装了的字体名。',
	'',
	'成组联动（拆开改容易改出半套）：',
	'- 台词条那组是一整套玻璃：底 `dialog_bg`、描边 `dialog_line`、正文 `dialog_ink`、旁白 `dialog_ink_soft`、',
	'  独白 `dialog_ink_thought` 要一起看。换成亮色底就得把字色压深、`dialog_shadow` 改浅，否则字糊在底上。',
	'- 选项卡 `choice_*` 与台词条同属画面上的玻璃层，只改一边会撕裂。',
	'- `accent` 影响选项卡左尺、主按钮与链接键，改它要配套 `accent_ink`。',
	'',
	'不带任何参数调用 = 看当前生效值（与默认值对照）。改完把改了哪几个键复述给用户，让他去 AIVN 舞台看效果。',
].join('\n');

/** 一个键的参数形状：字符串或 null，两个分支都带自己的说明。 */
function field(token: StyleToken): ParameterPropertySpec {
	return {
		oneOf: [
			{ type: 'string', description: `${token.effect}。格式：${token.shape}` },
			{ type: 'null', description: '恢复默认' },
		],
		description: `${token.effect}（${token.key}）。${RESET}`,
	};
}

const PARAMETERS: ParameterSchemaSpec = Object.fromEntries(
	STYLE_TOKENS.map((token) => [token.param, field(token)]),
);

export function createSetStageStyleTool(ctx: PlayContext) {
	return defineTool({
		name: 'set_stage_style',
		description: DESCRIPTION,
		parameters: PARAMETERS,
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute(args) {
			const dir = ctx.playDir();
			if (!existsSync(join(dir, PLAY_FILE))) {
				throw new Error(`${PLAY_FILE} 不在这个会话的工作目录里——这里还不是一座剧目，先让玩家把剧目建起来`);
			}

			const patch: Record<string, unknown> = {};
			for (const token of STYLE_TOKENS) {
				const value = (args as Record<string, unknown>)[token.param];
				if (value !== undefined) patch[token.param] = value;
			}

			// 文件坏掉时这里会抛一句带文件名的错——让模型拿文件工具去修，比悄悄覆盖强。
			const current = readPlayTheme(dir);
			if (Object.keys(patch).length === 0) {
				return `这次没给任何要改的键（17 个参数都可选，但总得给一个）。${describeTheme(current.theme)}`;
			}

			const { theme, reset, errors } = validateThemePatch(patch);
			if (errors.length > 0) {
				throw new Error(
					`这些键没通过校验，整次调用什么都没写：\n${errors.map((line) => `- ${line}`).join('\n')}`,
				);
			}

			const merged: Record<string, string> = { ...current.theme };
			for (const key of reset) delete merged[key];
			Object.assign(merged, theme);

			const path = join(dir, THEME_FILE);
			if (Object.keys(merged).length === 0) await rm(path, { force: true });
			else await writeFile(path, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');

			ctx.broadcastStyle(merged);

			const cleaned =
				current.dropped.length > 0 ? `\n顺带清掉了文件里不认的条目：${current.dropped.join('；')}` : '';
			return `已更新舞台皮肤（写进 ${THEME_FILE}，并推给了已打开的舞台）。${describeTheme(merged)}${cleaned}`;
		},
	});
}
