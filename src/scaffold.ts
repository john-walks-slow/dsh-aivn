/**
 * 剧目脚手架 —— 把一座剧目从零立起来。
 *
 * 「工作区 = 剧目」意味着建剧目就是往工作区里写文件：`play.json` 是身份证，
 * `memory/always/premise.md` 是世界观前提，`characters/<id>.md` 是角色卡。
 * 引擎不认别的，也没有剧目注册表要更新。
 *
 * Agent 侧（`create_play` 工具）与人侧（`/new-play` 命令）共用这一份实现：
 * 两条入口立出来的剧目必须一模一样，抄第二份就是实现漂移的起点。
 *
 * **绝不覆盖已有文件**：`play.json` 在 = 这里已经是一座剧目，直接报错；
 * 前提与角色卡逐份 `wx` 新建，已存在就跳过并列进回执——那是用户手写的，比我们写的好。
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { PLAY_FILE } from './play';

/** 剧目 id 与主体 id 同一个口径：非空、不含空白与路径分隔符，字母/数字开头。中文照收。 */
const ID_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;

/** 一个出场角色：要建卡就至少给个名字或一段人设，两样都没有就只进 play.json 的元数据。 */
export interface PlayCharacterSpec {
	/** 主体 id，也是 `characters/<id>.md` 的文件名（剧本里 `<say id="…">` 用的就是它）。 */
	id: string;
	/** 显示名；不写就显示 id。 */
	name?: string;
	/** 角色卡正文：年龄、关系、说话方式。 */
	persona?: string;
}

export interface PlaySpec {
	title: string;
	/** 剧目 id；不写就取工作目录名。 */
	id?: string;
	/** 开局 user 消息里的起始指令；不写走引擎缺省。 */
	opening?: string;
	/** 世界观前提，写进 `memory/always/premise.md`。 */
	premise?: string;
	characters?: readonly PlayCharacterSpec[];
}

export interface ScaffoldResult {
	dir: string;
	id: string;
	/** 新写下的文件（剧目根相对路径）。 */
	written: string[];
	/** 已经在那儿、这份没动的文件（剧目根相对路径）。 */
	kept: string[];
}

/** 在工作区 `dir` 里立一座剧目。目录已经有 `play.json` 就报错，不做任何写入。 */
export async function scaffoldPlay(dir: string, spec: PlaySpec): Promise<ScaffoldResult> {
	const title = spec.title.trim();
	if (title === '') throw new Error('剧目名不能是空的');

	const id = (spec.id ?? '').trim() || basename(dir);
	if (!ID_PATTERN.test(id)) throw new Error(`剧目 id 不合法：${id}（字母或数字开头，不含空白与路径分隔符）`);

	const characters = (spec.characters ?? []).map(normalizeCharacter);
	const playPath = join(dir, PLAY_FILE);
	const written: string[] = [];
	const kept: string[] = [];

	const config: Record<string, unknown> = { id, title };
	if (characters.length > 0) config.characters = characters.map(({ id: cid, name }) => ({ id: cid, name: name ?? cid }));
	const opening = spec.opening?.trim();
	if (opening) config.opening = opening;

	// `wx` 是最后一道闸：两个入口同时开火时，第二个拿到 EEXIST 而不是把第一个的结果盖掉。
	await mkdir(dir, { recursive: true });
	try {
		await writeFile(playPath, `${JSON.stringify(config, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
		throw new Error(
			`${dir} 里已经有 ${PLAY_FILE} 了——这里已经是一座剧目，起新剧目要换一个空目录开会话；要改这一座就直接写它的文件`,
		);
	}
	written.push(PLAY_FILE);

	const premise = spec.premise?.trim();
	if (premise) await record(join(dir, 'memory', 'always', 'premise.md'), `memory/always/premise.md`, `${premise}\n`);

	for (const character of characters) {
		const source = cardSource(character);
		if (source === '') continue;
		await record(join(dir, 'characters', `${character.id}.md`), `characters/${character.id}.md`, source);
	}

	return { dir, id, written, kept };

	/** 新建一份文件；已经在那儿就记进 kept，不去动它。 */
	async function record(path: string, relative: string, body: string): Promise<void> {
		await mkdir(dirname(path), { recursive: true });
		try {
			await writeFile(path, body, { encoding: 'utf8', flag: 'wx' });
			written.push(relative);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
			kept.push(relative);
		}
	}
}

function normalizeCharacter(spec: PlayCharacterSpec): PlayCharacterSpec {
	const id = spec.id.trim();
	if (!ID_PATTERN.test(id)) throw new Error(`角色 id 不合法：${spec.id}（字母或数字开头，不含空白与路径分隔符）`);
	return { id, name: spec.name?.trim() || undefined, persona: spec.persona?.trim() || undefined };
}

/** 角色卡：frontmatter 头部（只有 name）+ 正文。两段都空 = 不落这份文件。 */
function cardSource(character: PlayCharacterSpec): string {
	const head = character.name ? `---\nname: ${character.name}\n---\n` : '';
	return `${head}${character.persona ? `${character.persona}\n` : ''}`;
}
