/**
 * `update_state` —— 本剧目状态的唯一写者（场景 / 活跃剧情线 / 好感度 / 旗标）。
 *
 * 语义照 AIVN `apps/server/src/agentkit/memoryTool.ts`：好感度是**增量**（单次 |Δ|≤5、
 * 值域 0~100），旗标传目标值，scene / threads 传全文，只传要改的那几项。
 *
 * 落盘位置照 AIVN 的约定 `memory/always/state/`（那边这层内容随谱系快照走，
 * DSH 没有谱系，就直接落成文件，剧作家下一轮自己 read 得到）：
 *
 *   memory/always/state/scene.md     当前场景
 *   memory/always/state/threads.md   活跃剧情线与悬念
 *   memory/always/state/state.json   { affinity, flags }
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { PlayContext } from '../../tools/context';

/** 好感度单次增量上限与值域（引擎校验，模型只可提议）。 */
const AFFINITY_DELTA_CAP = 5;
const AFFINITY_MAX = 100;

const STATE_DIR = join('memory', 'always', 'state');

const DESCRIPTION = [
	'写状态文件——本剧目状态就这一个写者（场景 / 活跃剧情线 / 好感度 / 旗标）。',
	'调了 = 文件立刻更新，之后你自己 read 得到；不调 = 状态维持原样，跨轮之后你对局势的记忆会漂。',
	'- scene：当前场景的地点、在场的人、时间（一两行）→ memory/always/state/scene.md',
	'- threads：活跃剧情线与悬念（要点列表）→ memory/always/state/threads.md',
	'- affinity：好感度**增量**（如 koharu: 2 表示 +2，单次 |增量|≤5，值域 0~100），不是目标值；',
	'  键必须是本剧角色 id（characters/<id>.md 的文件名）→ memory/always/state/state.json',
	'- flags：旗标传目标值（字符串/数字/布尔）→ 同一个 state.json',
	'只传要改的那几项，不传的不动。剧情有实质推进时才调用，不要每轮都调。',
].join('\n');

export function createUpdateStateTool(ctx: PlayContext) {
	return defineTool({
		name: 'update_state',
		description: DESCRIPTION,
		parameters: {
			affinity: {
				type: 'object',
				additionalProperties: true,
				description: '角色 id → 好感度增量（整数，|Δ|≤5）。只写要动的角色。',
			},
			flags: {
				type: 'object',
				additionalProperties: true,
				description: '旗标名 → 目标值（字符串/数字/布尔）。只写要动的旗标。',
			},
			scene: { type: 'string', description: '当前场景：地点、在场的人、时间（一两行）。全文覆盖写。' },
			threads: { type: 'string', description: '活跃剧情线与悬念（要点列表）。全文覆盖写。' },
		},
		output: {
			schema: { type: 'string' } as const,
			render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
		},
		async execute(args) {
			const dir = ctx.playDir();
			const applied: string[] = [];
			const rejected: string[] = [];

			const characterIds = await readCharacterIds(dir);
			const state = await readState(dir);

			for (const [charId, value] of Object.entries(args.affinity ?? {})) {
				if (!characterIds.has(charId)) {
					rejected.push(`${charId} 不是本剧角色（characters/<id>.md 里没有这一张）`);
					continue;
				}
				if (typeof value !== 'number' || !Number.isInteger(value) || Math.abs(value) > AFFINITY_DELTA_CAP) {
					rejected.push(`${charId} 增量须为整数且 |Δ|≤${AFFINITY_DELTA_CAP}（收到 ${JSON.stringify(value)}）`);
					continue;
				}
				const current = state.affinity[charId] ?? 0;
				const next = Math.max(0, Math.min(AFFINITY_MAX, current + value));
				state.affinity[charId] = next;
				applied.push(`${charId} ${value >= 0 ? '+' : ''}${value}（${current}→${next}）`);
			}
			for (const [key, value] of Object.entries(args.flags ?? {})) {
				if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
					rejected.push(`旗标 ${key} 的值只能是字符串/数字/布尔（收到 ${JSON.stringify(value)}）`);
					continue;
				}
				state.flags[key] = value;
				applied.push(`旗标 ${key}=${String(value)}`);
			}

			const stateDir = join(dir, STATE_DIR);
			await mkdir(stateDir, { recursive: true });

			if (Object.keys(args.affinity ?? {}).length > 0 || Object.keys(args.flags ?? {}).length > 0) {
				await writeFile(join(stateDir, 'state.json'), `${JSON.stringify(state, null, 2)}\n`, 'utf8');
			}
			for (const [key, value] of [
				['scene', args.scene],
				['threads', args.threads],
			] as const) {
				if (value === undefined) continue;
				await writeFile(join(stateDir, `${key}.md`), `${value.trim()}\n`, 'utf8');
				applied.push(`${key}.md 已重写`);
			}

			if (applied.length === 0 && rejected.length === 0) return '未提供任何更新。';
			return [
				applied.length > 0 ? `已生效：${applied.join('；')}` : null,
				rejected.length > 0 ? `被拒绝（请修正后重试）：${rejected.join('；')}` : null,
			]
				.filter(Boolean)
				.join('\n');
		},
	});
}

interface PlayState {
	affinity: Record<string, number>;
	flags: Record<string, string | number | boolean>;
}

/** 读现有状态；文件不在就是空状态（不是错误）。 */
async function readState(dir: string): Promise<PlayState> {
	try {
		const parsed = JSON.parse(await readFile(join(dir, STATE_DIR, 'state.json'), 'utf8')) as Partial<PlayState>;
		return { affinity: parsed.affinity ?? {}, flags: parsed.flags ?? {} };
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { affinity: {}, flags: {} };
		throw error;
	}
}

/** 本剧角色 id = `characters/*.md` 的文件名。目录不在就是还没有角色。 */
async function readCharacterIds(dir: string): Promise<Set<string>> {
	const root = join(dir, 'characters');
	if (!existsSync(root)) return new Set();
	const names = await readdir(root);
	return new Set(names.filter((name) => name.endsWith('.md')).map((name) => name.slice(0, -3)));
}
