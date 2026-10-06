/**
 * `list_assets` —— 列出这座剧目已有的素材（两个角色都装）。
 *
 * **名字与 AIVN 的 `list_library` 刻意不同**：那边查的是应用级跨剧目素材资源库
 * （`library/`，引用即导入的源头），这里查的是剧目自己的 `assets/` 加素材描述表
 * `assets/manifest.json`。插件是「工作区即剧目」，没有那个跨剧目的库，同名只会让模型
 * 去找一个不存在的东西。
 *
 * 为什么要它：挑素材靠的是**描述**（画面内容、情绪、适用场景），不是文件名——
 * 差分的名字未必与画面相符。把它列成一行一条，模型不用自己去猜目录结构。
 */
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describeAsset, parseCharacterCard, type AssetMeta } from '@aivn/core';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { listAssets, readManifest } from '../assets';
import type { PlayContext } from './context';

/** 清单罗列的截断：一次把整个清单灌进上下文没有意义，够 agent 判断「有没有」就行。 */
const LIST_LIMIT = 40;

const KINDS = ['backgrounds', 'cg', 'sprites', 'characters', 'bgm', 'sfx'] as const;
type AssetKind = (typeof KINDS)[number];

const DESCRIPTION = [
	'列出本剧目已有的素材（assets/ 目录 + 素材描述表 assets/manifest.json）。',
	'**要挑素材先看它**：带描述的条目写的是画面内容、情绪、适用场景——文件名未必与画面对得上。',
	'这里列的就是这座剧目的全部家当（没有跨剧目的素材库），',
	'清单里没有的 id 不要写进剧本（写了不会有画面，那一行照常演，只是空着）。',
	'可给 kind 过滤类目（backgrounds / cg / sprites / characters / bgm / sfx），可给 query 按关键词搜 id 与描述。',
	'每行是：id | 类目 | 标题 | 描述。立绘行的 id 是 <主体id>/<差分名>，就是 <actor variant> 要写的那个名字；',
	'characters 类目列的是角色卡（characters/<id>.md），不是素材文件。',
].join('\n');

interface Row {
	id: string;
	kind: AssetKind;
	title: string;
	detail: string;
}

export function createListAssetsTool(ctx: PlayContext) {
	return defineTool({
		name: 'list_assets',
		description: DESCRIPTION,
		parameters: {
			kind: { type: 'string', enum: [...KINDS], description: '只列这一类；不给就是全部。' },
			query: { type: 'string', description: '关键词：匹配 id / 标题 / 描述 / 标签，大小写不敏感。' },
		},
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute(args) {
			const dir = ctx.playDir();
			const rows = await collect(dir);
			const query = (args.query ?? '').trim().toLowerCase();
			const matched = rows.filter(
				(row) => (!args.kind || row.kind === args.kind) && matchRow(row, query),
			);

			if (matched.length === 0) {
				return rows.length === 0
					? '素材清单是空的（assets/ 下还没有任何素材）。本阶段还没有生图，素材要玩家手工放进 assets/——缺素材就换一段能演的戏，用旁白交代。'
					: `没有匹配「${args.query ?? ''}」${args.kind ? `且类目为 ${args.kind} ` : ''}的素材（共 ${rows.length} 条，换个词或去掉过滤再试）。`;
			}

			const shown = matched.slice(0, LIST_LIMIT);
			const lines = shown.map((row) => `${row.id} | ${row.kind} | ${row.title} | ${row.detail}`);
			if (matched.length > shown.length) {
				lines.push(`（共 ${matched.length} 条，这里只列了前 ${shown.length} 条；用 kind 或 query 缩小范围）`);
			}
			return lines.join('\n');
		},
	});
}

/** 剧目里现有的全部素材与角色，一行一条。 */
async function collect(dir: string): Promise<Row[]> {
	const index = listAssets(dir);
	const manifest = readManifest(dir);
	const rows: Row[] = [];

	for (const [key, files] of Object.entries(index)) {
		// 立绘按主体拆表（`sprites/<主体id>`）：差分名要连着主体一起报，不然多角色剧目里光写 smile 会撞车。
		const spriteDir = key.startsWith('sprites/') ? key.slice('sprites/'.length) : null;
		const kind = (spriteDir === null ? key : 'sprites') as AssetKind;
		for (const file of files) {
			const stem = file.replace(/\.\w+$/, '');
			const meta = mergeMeta(manifest, stem, spriteDir);
			rows.push({
				id: spriteDir ? `${spriteDir}/${stem}` : stem,
				kind,
				title: meta.title ?? stem,
				detail: describeAsset(meta) || '（没有描述）',
			});
		}
	}

	rows.push(...(await collectCharacters(dir, manifest)));
	return rows;
}

/**
 * 素材描述的查找：立绘差分按「主体id/差分名」找，裸差分名那张老表并进来兜底——
 * 两套键约定并存（引擎记 prompt 用规范键，手写的描述多是裸名），按字段合并，别让一条把另一条挡掉。
 */
function mergeMeta(manifest: Record<string, AssetMeta>, stem: string, spriteDir: string | null): AssetMeta {
	if (!spriteDir) return manifest[stem] ?? {};
	return { ...manifest[stem], ...manifest[`${spriteDir}/${stem}`] };
}

/** 角色卡：卡不是素材文件，但「台上有些什么人」是同一类问题，一起报。 */
async function collectCharacters(dir: string, manifest: Record<string, AssetMeta>): Promise<Row[]> {
	const root = join(dir, 'characters');
	if (!existsSync(root)) return [];
	const rows: Row[] = [];
	for (const name of (await readdir(root)).filter((entry) => entry.endsWith('.md')).sort()) {
		const id = name.slice(0, -3);
		const text = await readFile(join(root, name), 'utf8');
		const card = parseCharacterCard(text);
		const sprite = card.sprite ?? id;
		const variants = Object.keys(manifest[`sprites/${sprite}`]?.variants ?? {});
		rows.push({
			id,
			kind: 'characters',
			title: card.name ?? id,
			detail: [
				id === 'protagonist' ? '玩家扮演' : null,
				card.voice ? `音色：${card.voice}` : null,
				`立绘目录：assets/sprites/${sprite}/`,
				variants.length > 0 ? `差分：${variants.join(' ')}` : null,
			]
				.filter(Boolean)
				.join(' | '),
		});
	}
	return rows;
}

function matchRow(row: Row, query: string): boolean {
	if (!query) return true;
	return `${row.id} ${row.kind} ${row.title} ${row.detail}`.toLowerCase().includes(query);
}
