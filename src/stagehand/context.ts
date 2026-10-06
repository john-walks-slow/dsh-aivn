/**
 * 搭台助手的注入段：剧目的「当前状态」。
 *
 * AIVN 的工坊每轮新建一个 Agent，把文件清单与就绪报告拼进 system prompt（`buildWorkshopPrompt`
 * 的第 12 章）。插件里会话是长期的，于是这一段挂在这个 Agent 的 scope 上，每轮现读——
 * 助手刚写完文件，下一轮就该看见它。
 *
 * 只给搭台助手挂（`preset-tools.ts` 里按预设判断）：剧作家那半边看的是 A 区那份，
 * 两边的读者不同，注入的内容也不该相同。
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { languageLabel } from '@aivn/core';
import type { Context } from '@deepseek-ai/cordis';
import { loadPlaySync } from '../play';
import { readPlayReadiness, renderReadiness } from '../readiness';
import { countTheme } from '../style-tokens';
import { readPlayTheme, THEME_FILE } from '../theme';

/** 一次快照的存活时间：够覆盖一个 turn 的多个 step，又保证跨轮必重读。 */
const TTL_MS = 1_000;

/** 文件清单一屏装不下就没有意义：超过这个数只报个总数。 */
const LIST_LIMIT = 200;

/** 不进清单的东西：可重建的缓存、版本控制、依赖目录，以及所有隐藏项。 */
const SKIP = new Set(['media-cache', 'node_modules', '.git']);

/** 段序：紧跟 persona 之后（与剧作家的 A 区同一带），让开宿主自己的政策段。 */
const ORDER = { language: 100, state: 120 };

export interface StagehandSnapshot {
	language: string;
	state: string;
}

export function readStagehandSnapshot(dir: string): StagehandSnapshot {
	const play = loadPlaySync(dir);
	const language = play?.config.scriptLanguage
		? `# 剧本语言\n\n本剧的剧本语言是${languageLabel(play.config.scriptLanguage)}：premise、角色卡、记忆卡这些` +
			'**给演出看的内容**都用它写，与用户的对话仍然是中文。'
		: '';
	const listing = renderListing(dir);
	const readiness = play ? renderReadiness(readPlayReadiness(dir)) : '';
	return {
		language,
		state: `# 当前状态\n\n剧目文件：\n${listing}\n\n${renderTheme(dir)}${readiness ? `\n\n${readiness}` : ''}`,
	};
}

/**
 * 皮肤现状一行。
 *
 * 文件清单里本来就有 `theme.json`，但那一行只说明它在；这里报「改了 0 个键 / N 个键」，
 * 让模型动手前就知道现在是什么皮，不必先读一遍文件。文件坏了也只报一句，快照不因此炸掉。
 */
function renderTheme(dir: string): string {
	try {
		const { theme, dropped } = readPlayTheme(dir);
		const count = countTheme(theme);
		const state = count === 0 ? `${THEME_FILE} 无（默认皮）` : `${THEME_FILE} 改了 ${count} 个键`;
		const dirty = dropped.length > 0 ? `（另有 ${dropped.length} 个键不合法，已忽略）` : '';
		return `舞台皮肤：${state}${dirty}`;
	} catch (error) {
		return `舞台皮肤：${THEME_FILE} 读不了——${error instanceof Error ? error.message : String(error)}`;
	}
}

/** 目录树一行一份文件：路径 + 大小。空目录不出现在清单里。 */
function renderListing(dir: string): string {
	if (!existsSync(dir)) return '（工作目录还不存在）';
	const files: string[] = [];
	walk(dir, dir, files, 0);
	if (files.length === 0) return '（目录是空的——照《剧目文件》写一份 `play.json` 就是立起一座剧目）';
	const shown = files.slice(0, LIST_LIMIT);
	if (files.length > shown.length) {
		shown.push(`…还有 ${files.length - shown.length} 份文件没列出来（用 glob / grep 找）`);
	}
	return shown.join('\n');
}

function walk(root: string, dir: string, out: string[], depth = 0): void {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name.startsWith('.') || SKIP.has(entry.name)) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			// 三层足够看清一座剧目（assets/sprites/<主体id>/<差分>.png 正好到底）。
			if (depth < 3) walk(root, path, out, depth + 1);
			continue;
		}
		const { size } = statSync(path);
		out.push(`${relative(root, path).split(sep).join('/')}（${formatSize(size)}）`);
	}
}

function formatSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** 把这个 Agent 的「当前状态」段挂上，返回卸载器。 */
export function registerStagehandContext(agentCtx: Context, playDir: () => string): () => void {
	let cache: { at: number; snapshot: StagehandSnapshot } | null = null;
	const snapshot = (): StagehandSnapshot => {
		const now = Date.now();
		if (cache && now - cache.at < TTL_MS) return cache.snapshot;
		const fresh = readStagehandSnapshot(playDir());
		cache = { at: now, snapshot: fresh };
		return fresh;
	};

	const offs = [
		agentCtx.systemPrompt.section({
			name: 'aivn:stagehand-language',
			order: ORDER.language,
			text: () => snapshot().language,
		}),
		agentCtx.systemPrompt.section({
			name: 'aivn:stagehand-state',
			order: ORDER.state,
			text: () => snapshot().state,
		}),
	];
	return () => {
		for (const off of offs) off();
	};
}
