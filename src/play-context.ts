/**
 * A 区注入：剧目上下文的组装与注入。
 *
 * AIVN 里这些内容是编排器每轮拼进系统提示词的（`apps/server/src/prompt.ts` 的
 * `buildSystemPrompt`）：世界观前提、角色表、素材清单、写作参数、记忆索引；
 * 外加一条每轮变化的 user 消息【状态】区。DSH 侧对应两个正规注入点
 * （`@deepseek-ai/dsh-system-prompt`）：
 *
 *   - `systemPrompt.section({ text: () => … })` —— **动态系统提示段**，每次组装时求值；
 *   - `systemPrompt.context({ text: () => … })` —— **物化成 user 角色快照的动态上下文**，
 *     正是那条【状态】。
 *
 * 阶段 1 没有这两个口子，提示词只能把「引擎每轮替你注入」一律改写成「去哪儿读文件」——
 * 代价是模型的第一个 round 全花在 `ls` + `read` 上。这一层把它改回来。
 *
 * 求值是同步的（`PromptSection.text` 的签名就是同步），所以读盘走同步 API；读的是
 * 本机几十字节到几 KB 的小文件，一次几毫秒。快照按 `TTL_MS` 缓存：一个 turn 里的多个 step
 * 读到同一份（AIVN 的「A 区在纪元内冻结」），跨轮自然重读。
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-system-prompt';
import {
	describeAsset,
	languageLabel,
	parseCharacterCard,
	spriteIdOf,
	type AssetMeta,
	type CharacterDocument,
} from '@aivn/core';
import { listAssets, readManifest } from './assets';
import { loadPlaySync } from './play';
import { PHASE1_CAPABILITIES, renderCraftParams, resolveCraft } from './craft';
import { PLAYWRITER_TAIL } from './playwriter/prompt';

/** 一次快照的存活时间：够覆盖一个 turn 的多个 step，又保证跨轮必重读。 */
const TTL_MS = 1_000;

/**
 * 段序：紧跟 persona（`DEPLOYMENT_PERSONA_PREFIX` = 0）之后、工具段（1000+）之前。
 * `PLAN_POLICY`(500) 与 `TEAM_POLICY`(600) 是宿主自己的政策段，让开它们。
 */
const ORDER = {
	language: 100,
	premise: 110,
	cast: 120,
	assets: 130,
	craft: 140,
	memory: 150,
	tail: 200,
};

/** 【状态】区的位置：跟在宿主自己的运行时上下文（沙箱/审批/子代理）之后。 */
const CONTEXT_ORDER = 130;

export interface PlaySnapshot {
	language: string;
	premise: string;
	cast: string;
	assets: string;
	craft: string;
	memoryIndex: string;
	state: string;
}

/**
 * 读一次剧目的全部上下文。目录不是剧目（没有 `play.json`）时给一份空快照——
 * 舞台那边会明说「还不是一座剧目」，剧作家这边注入空白即可，不该报错。
 */
export function readPlaySnapshot(dir: string): PlaySnapshot {
	const play = loadPlaySync(dir);
	if (!play) return EMPTY;

	const index = listAssets(dir);
	const manifest = readManifest(dir);
	const cards = readCharacterCards(dir);
	const notes = (id: string, charId?: string): AssetMeta =>
		charId ? { ...manifest[id], ...manifest[`${charId}/${id}`] } : (manifest[id] ?? {});

	const language = play.config.scriptLanguage
		? `# 剧本语言\n\n正文、旁白、选项，以及角色卡与记忆卡里写的设定，一律用${languageLabel(
				play.config.scriptLanguage,
			)}写，**不要跟随玩家的输入语言**。角色 id、素材 id、DSL 标签名保持原样（英文/拼音）。`
		: '';

	const premise = play.config
		? `# 剧目设定\n\n${
				readText(join(dir, 'memory', 'always', 'premise.md')).trim() ||
				'（这份剧目还没有写世界观前提。自由发挥即可——别停下来问，也别在剧本里解释这件事。）'
			}`
		: '';

	const craftFile = readText(join(dir, 'memory', 'always', 'craft.md')).trim();
	const craft = `${renderCraftParams(resolveCraft(play.config.craft), PHASE1_CAPABILITIES)}（上面是${
		play.config.craft ? '这座剧目 `play.json` 的 `craft` 段' : '引擎默认口径，`play.json` 的 `craft` 段没写过'
	}；改它用 \`set_craft\`。）${craftFile ? `\n\n${craftFile}` : ''}`;

	return {
		language,
		premise,
		cast: renderCast(cards, index, notes),
		assets: renderAssets(index, notes),
		craft,
		memoryIndex: renderMemoryIndex(dir),
		state: renderState(dir, play.config.characters?.map((card) => card.id) ?? []),
	};
}

/**
 * 把 A 区的段与【状态】挂到**这个 Agent 的 scope** 上。
 *
 * 注册在 agent scope（而不是全局）有两个后果，都是要的：只有剧作家的会话吃这套注入；
 * 同一个 scope 里 persona 的 `prefix` 与这里的段一起组装，宿主会按 order 排好。
 */
export function registerPlayContext(agentCtx: Context, playDir: () => string): () => void {
	let cache: { at: number; snapshot: PlaySnapshot } | null = null;
	const snapshot = (): PlaySnapshot => {
		const now = Date.now();
		if (cache && now - cache.at < TTL_MS) return cache.snapshot;
		const fresh = readPlaySnapshot(playDir());
		cache = { at: now, snapshot: fresh };
		return fresh;
	};

	const section = (name: string, order: number, pick: (s: PlaySnapshot) => string): (() => void) =>
		agentCtx.systemPrompt.section({ name, order, text: () => pick(snapshot()) });

	const offs = [
		section('aivn:play-language', ORDER.language, (s) => s.language),
		section('aivn:play-premise', ORDER.premise, (s) => s.premise),
		section('aivn:play-cast', ORDER.cast, (s) => s.cast),
		section('aivn:play-assets', ORDER.assets, (s) => s.assets),
		section('aivn:play-craft', ORDER.craft, (s) => s.craft),
		section('aivn:play-memory-index', ORDER.memory, (s) => s.memoryIndex),
		// 静态尾段（格式契约、记忆卡规则、引入新角色、演出契约）跟着动态段一起挂：
		// 这几章只有剧作家要，而 persona 那一格装不下两段。位置紧接 A 区之后，与 AIVN 同序。
		agentCtx.systemPrompt.section({ name: 'aivn:playwriter-tail', order: ORDER.tail, text: () => PLAYWRITER_TAIL }),
		agentCtx.systemPrompt.context({ name: 'aivn:play-state', order: CONTEXT_ORDER, text: () => snapshot().state }),
	];

	return () => {
		for (const off of offs) off();
	};
}

const EMPTY: PlaySnapshot = {
	language: '',
	premise: '',
	cast: '',
	assets: '',
	craft: '',
	memoryIndex: '',
	state: '',
};

/* ── 角色表 ─────────────────────────────────────────────────────────────── */

/**
 * 角色表 = `characters/` 目录，每张卡一段：标题（id + 卡路径 + 是否玩家扮演）+ 正文 +
 * 音色 + 立绘差分。只有立绘没有卡的主体（机甲、猫、道具）单列一节——它们进不了角色表，
 * 但剧作家得知道它们存在、能按 variant 上台。
 *
 * 阶段 1 没有编排器给「谁在场」，所以这里**全卡注入**（AIVN 的在场/折叠分级等有 token
 * 压力再加）。卡通常只有几百字、剧目角色个位数，全给更省事也更稳。
 */
function renderCast(
	cards: ReadonlyArray<CharacterDocument & { id: string }>,
	index: Record<string, string[]>,
	notes: (id: string, charId?: string) => AssetMeta,
): string {
	if (cards.length === 0) {
		return '# 角色表\n\n（这份剧目还没有角色卡。玩家扮演的主角固定是 `characters/protagonist.md`，先把它建起来。）';
	}

	const variantsOf = (spriteDir: string): string[] =>
		(index[`sprites/${spriteDir}`] ?? []).map((file) => file.replace(/\.\w+$/, ''));
	const label = (name: string, charId: string): string => {
		const detail = describeAsset(notes(name, charId));
		return detail ? `${name}（${detail}）` : name;
	};

	const bound = new Set<string>();
	const blocks = cards.map((card) => {
		const spriteDir = spriteIdOf(card.id, card);
		bound.add(spriteDir);
		const title = `${card.name ?? card.id}（id: ${card.id}，卡片 characters/${card.id}.md${
			card.id === 'protagonist' ? '，玩家扮演' : ''
		}）`;
		const variants = variantsOf(spriteDir);
		return [
			`### ${title}`,
			card.body.trim(),
			card.voice ? `音色：${card.voice}` : '',
			variants.length > 0
				? `立绘${spriteDir === card.id ? '' : `（目录 ${spriteDir}）`}差分 variant：${variants
						.map((v) => label(v, spriteDir))
						.join(' | ')}`
				: '',
		]
			.filter((part) => part !== '')
			.join('\n');
	});

	const bare = Object.keys(index)
		.filter((key) => key.startsWith('sprites/'))
		.map((key) => key.slice('sprites/'.length))
		.filter((spriteDir) => !bound.has(spriteDir))
		.sort((a, b) => a.localeCompare(b));

	const bareSection =
		bare.length > 0
			? `\n\n# 台上其它主体（有立绘，没有角色卡）\n\n${bare
					.map((spriteDir) => {
						const title = notes(spriteDir).title;
						return `- ${title ? `${spriteDir}（${title}）` : spriteDir}：variant ${variantsOf(spriteDir)
							.map((v) => label(v, spriteDir))
							.join(' | ')}`;
					})
					.join('\n')}\n\n它们与角色同权：\`<actor id="…" variant="…">\` 直接上台，不用建档。`
			: '';

	return `# 角色表\n\n${blocks.join('\n\n')}\n\n卡是 frontmatter + 正文两段，头部只写 name / sprite / voice；\n差分与取景体量不写在卡上（差分就是立绘目录里的文件名，取景/体量/名牌落在 \`assets/manifest.json\`）。${bareSection}`;
}

/* ── 素材清单 ───────────────────────────────────────────────────────────── */

/**
 * 素材清单：按类目列 id，每一项带上描述表里的说明。
 *
 * 描述是这里的重点（`list_assets` 的理由也是它）：差分名未必与画面相符，
 * 剧作家挑素材靠的是「这一张画的是什么」。
 */
function renderAssets(index: Record<string, string[]>, notes: (id: string, charId?: string) => AssetMeta): string {
	const stems = (kind: string): string[] => (index[kind] ?? []).map((file) => file.replace(/\.\w+$/, ''));
	const section = (heading: string, kind: string, tail = ''): string => {
		const list = stems(kind);
		if (list.length === 0) return '';
		const rows = list.map((id) => {
			const detail = describeAsset(notes(id));
			return `- ${detail ? `${id}（${detail}）` : id}`;
		});
		return `\n# ${heading}\n\n${rows.join('\n')}${tail}\n`;
	};

	const audio = stems('bgm').length > 0 || stems('sfx').length > 0 ? AUDIO_RULES : '';
	const body = [
		section('可用背景 bg', 'backgrounds', '\n<scene> 的 bg 优先取这些 id。'),
		section('可用音乐 bgm', 'bgm'),
		section('可用音效 sfx', 'sfx'),
		audio,
		section('已有插图 cg', 'cg'),
	].join('');

	const empty = body === '' ? '\n（这座剧目的 `assets/` 还是空的。）\n' : '';
	return `# 素材清单\n\n素材在 \`assets/\` 下按类目放；清单里没有的 id 不要写——写了不会有画面（那一行照常演，只是空着）。\n${body}${empty}\n缺素材就换一段能演的戏，用旁白交代；也可以让玩家手工放文件进 \`assets/\`。`;
}

/**
 * 配乐与音效的编排规则。只在真有 bgm/sfx 时注入（AIVN 同款）：
 * 清单是空的还讲怎么用，等于白烧 token。
 *
 * 引擎行为是 bgm/ambient 缺省保持、`none` 停，换曲与停乐自动交叉淡入淡出。
 * 「换场景顺手重写一遍 bgm」是模型最常犯的毛病，所以这条写得最重。
 */
const AUDIO_RULES = `
## 配乐与音效（怎么用）

- **缺省 = 保持当前**：<scene> 不写 bgm/ambient 就继续放现在这首。换场景通常不换乐，
  只有情绪或地点真的变了才换 id。
- 想停：<scene bgm="none"/>，ambient 同理。
- 音量自己给：<scene bgm_volume="0.4"/>、<scene ambient_volume="0.3"/>、<sfx src="…" volume="0.6"/>。
  音乐与音效都给台词让位——拿不准就调小。
- 换曲与停乐会自动交叉淡入淡出，不用自己写淡出。
- ambient 是持续的环境底噪（雨、风、人声、车流），比 bgm 轻，一场戏给一次就够。
- sfx 放在动作发生的那一行之前：开门、转身、翻书、东西落地，一个动作一条，别连着堆。
- 只挑清单里真有的 id；没有合适的宁可不给，别拿别的曲子顶上。`;

/* ── 记忆索引 ───────────────────────────────────────────────────────────── */

/**
 * 记忆索引：`memory/index/` 下每张卡一行（层 / 标题 / 路径 / 一句话摘要）。
 *
 * 卡格式照 AIVN 的 `parseCard`：首个 `# 标题` 是名字，其后的首个非空行是摘要。
 * 路径必须写出来——标题与文件名可以不一样，模型推不出文件在哪。
 */
function renderMemoryIndex(dir: string): string {
	const cards = collectCards(join(dir, 'memory', 'index'));
	if (cards.length === 0) return '';
	const rows = cards.map(
		(card) => `- ${card.layer ? `[${card.layer}] ` : ''}${card.name}（${card.path}）：${card.summary}`,
	);
	return `# 记忆索引（按需查详情）\n\n${rows.join('\n')}\n\n要某条的完整内容就 read 它的路径；写过的东西要能被下一轮认出来，就按《记忆卡》的规矩落盘。`;
}

interface MemoryCard {
	layer: string;
	name: string;
	summary: string;
	path: string;
}

function collectCards(root: string, dir = root, layer = ''): MemoryCard[] {
	if (!existsSync(dir)) return [];
	const out: MemoryCard[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...collectCards(root, path, layer ? `${layer}/${entry.name}` : entry.name));
			continue;
		}
		if (!entry.name.endsWith('.md')) continue;
		const lines = readText(path)
			.split('\n')
			.map((line) => line.trim());
		const titleAt = lines.findIndex((line) => /^#\s+/.test(line));
		const name = (titleAt >= 0 ? /^#\s+(.+)$/.exec(lines[titleAt] ?? '')?.[1] : undefined)?.trim();
		out.push({
			layer,
			name: name || entry.name.replace(/\.md$/, ''),
			summary: lines.slice(titleAt + 1).find((line) => line !== '') ?? '',
			path: `memory/index/${relative(root, path).split(sep).join('/')}`,
		});
	}
	return out;
}

/* ── 状态区 ─────────────────────────────────────────────────────────────── */

/**
 * 【状态】区（物化成 user 角色快照）。来源是 `update_state` 写下的那三个文件：
 * `scene.md` / `threads.md` / `state.json`。
 */
function renderState(dir: string, characterIds: readonly string[]): string {
	const stateDir = join(dir, 'memory', 'always', 'state');
	const scene = readText(join(stateDir, 'scene.md')).trim();
	const threads = readText(join(stateDir, 'threads.md')).trim();

	let affinity: Record<string, number> = {};
	let flags: Record<string, unknown> = {};
	const raw = readText(join(stateDir, 'state.json'));
	if (raw) {
		try {
			const parsed = JSON.parse(raw) as { affinity?: Record<string, number>; flags?: Record<string, unknown> };
			affinity = parsed.affinity ?? {};
			flags = parsed.flags ?? {};
		} catch {
			// 坏掉的 state.json 不该让整段注入炸掉：状态区少两行，剧作家照常演。
		}
	}

	const known = new Set(characterIds);
	const affinityLine = Object.entries(affinity)
		.filter(([id]) => known.size === 0 || known.has(id))
		.map(([id, value]) => `${id} ${value}`)
		.join(' | ');
	const flagLine = Object.entries(flags)
		.map(([key, value]) => `${key}=${String(value)}`)
		.join(' | ');

	const body = [
		scene ? `场景：${scene}` : null,
		affinityLine ? `好感度：${affinityLine}` : null,
		flagLine ? `旗标：${flagLine}` : null,
		threads ? `活跃剧情线：${threads}` : null,
	]
		.filter(Boolean)
		.join('\n');

	if (!body) return '';
	return `【状态】\n${body}\n\n状态由 update_state 维护；有实质推进就更新它，别让它停在开头的零。`;
}

/* ── 角色卡读盘 ─────────────────────────────────────────────────────────── */

/**
 * 音色表：角色 id → 音色 id。由 `voice-host` 用（一行台词要不要合成、用谁的声音）。
 *
 * 按目录缓存一秒：一行的每个短语都会问一次，但卡片本身不会在一行之内改。
 */
const voiceMaps = new Map<string, { at: number; map: Map<string, string> }>();

export function readVoiceMap(dir: string): Map<string, string> {
	const now = Date.now();
	const cached = voiceMaps.get(dir);
	if (cached && now - cached.at < TTL_MS) return cached.map;

	const map = new Map<string, string>();
	for (const card of readCharacterCards(dir)) {
		// 音色的真相是卡上的 `voiceId`（Fish 的音色 id）；只有口语描述（`voice`）时合成不了，
		// 不拿描述去猜一个 id——那只会得到 400。
		if (card.voiceId) map.set(card.id, card.voiceId);
	}
	voiceMaps.set(dir, { at: now, map });
	return map;
}

function readCharacterCards(dir: string): Array<CharacterDocument & { id: string }> {
	const root = join(dir, 'characters');
	if (!existsSync(root)) return [];
	const out: Array<CharacterDocument & { id: string }> = [];
	for (const name of readdirSync(root).sort()) {
		if (!name.endsWith('.md')) continue;
		const text = readText(join(root, name));
		// 文件名是 id 的真相：frontmatter 里的 id 写错时以路径为准，否则 actor id 与卡对不上。
		if (text) out.push({ ...parseCharacterCard(text), id: name.slice(0, -3) });
	}
	return out;
}

/** 读一份文本文件，不存在或读不动就当空的——注入缺一段不该让整轮演出失败。 */
function readText(path: string): string {
	try {
		return readFileSync(path, 'utf8');
	} catch {
		return '';
	}
}
