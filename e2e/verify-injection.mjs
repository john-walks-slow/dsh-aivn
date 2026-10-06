#!/usr/bin/env node
/**
 * e2e: A 区注入（插件验收）。
 *
 * 证明剧作家的系统提示词里真的带上了剧目的上下文——前提、角色表、素材清单、写作参数、
 * 记忆索引，而不是阶段 1 那句「这些不在这份提示词里，得你自己去读」。
 *
 * 判据取自**会话日志**（`system/message` 事件记了完整的系统提示词），不靠模型说什么：
 * 模型怎么用这些上下文是模型的事，注入有没有发生才是这条链的事。
 *
 * 运行：dsh-e2e run e2e/verify-injection.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clearPlay, seedPlay, PLAY } from './lib/fixture.mjs';
import {
	E2E_HOME,
	WORKSPACE,
	dismissOnboarding,
	gotoGui,
	launch,
	newPage,
	newSession,
	pickPreset,
	sendMessage,
} from './lib/boot.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SLUG = `--${WORKSPACE.replace(/^\//, '').replace(/[/.]/g, '-')}--`;
const SESSIONS = join(E2E_HOME, 'sessions', SLUG);

const results = [];
const check = (id, ok, note = '') => {
	results.push({ id, ok, note });
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
};

/** 最新那个会话目录（刚建的就在最前）。 */
function newestSession() {
	const dirs = readdirSync(SESSIONS)
		.map((name) => join(SESSIONS, name))
		.filter((path) => statSync(path).isDirectory())
		.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
	return dirs[0];
}

/** 会话日志是多帧 zstd，只有 CLI 解得开。 */
function sessionEvents(sessionDir) {
	const file = join(sessionDir, 'session.v4.jsonl.zstd');
	if (!existsSync(file)) return [];
	const raw = execFileSync('zstd', ['-dc', file], { maxBuffer: 64 * 1024 * 1024 }).toString('utf8');
	return raw
		.split('\n')
		.filter((line) => line.trim() !== '')
		.flatMap((line) => {
			try {
				return [JSON.parse(line)];
			} catch {
				return [];
			}
		});
}

function systemPrompt(events) {
	for (const event of events) {
		if (event.type !== 'system/message') continue;
		const content = event.data?.message?.content ?? [];
		return content.map((block) => block.text ?? '').join('');
	}
	return '';
}

function toolNames(events) {
	for (const event of events) {
		if (event.type !== 'request/header') continue;
		return (event.data?.header?.tools ?? []).map((tool) => tool.name).filter(Boolean);
	}
	return [];
}

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);
	check('A1', await newSession(page), '已新建会话');

	const preset = await pickPreset(page, '剧作家');
	check('A2', preset.picked && preset.current === '剧作家', `座位已选为「剧作家」（${preset.current ?? '无'}）`);

	await sendMessage(page, PLAY.opening);
	const sessionDir = newestSession();
	// 等到日志里出现系统提示词：那是第一个 step 开头写下的，不用等整轮演完。
	let prompt = '';
	let tools = [];
	for (let i = 0; i < 60; i += 1) {
		const events = sessionEvents(sessionDir);
		prompt = systemPrompt(events);
		tools = toolNames(events);
		if (prompt !== '' && tools.length > 0) break;
		await page.waitForTimeout(2_000);
	}

	const headings = [...prompt.matchAll(/^#{1,2} .+$/gm)].map((m) => m[0]);
	check('A3', prompt.length > 0, `系统提示词已写出（${prompt.length} 字）`);
	check('A4', headings.includes('# 剧目设定'), `有《剧目设定》段（${headings.length} 个标题）`);
	check('A5', headings.includes('# 角色表'), '有《角色表》段');
	check('A6', headings.includes('# 素材清单'), '有《素材清单》段');
	check('A7', headings.includes('# 写作参数（本剧目设定，照它写）'), '有《写作参数》段');

	// 内容级：夹具里的前提、角色卡与素材 id 必须真的出现在对应段里
	check('A8', prompt.includes('梅雨'), '《剧目设定》带的是 premise.md 的正文（不是「去读文件」）');
	check('A9', prompt.includes('id: lin') && prompt.includes('id: zhou'), '《角色表》带的是两张卡的正文与 id');
	check('A10', prompt.includes('veranda'), '《素材清单》带的是 assets/ 里真实的素材 id');
	check('A11', !prompt.includes('不在这份提示词里'), '已经删掉阶段 1 那句「得你自己去读」');
	// 工具面跟着角色走：剧作家有收束口与校验口，没有搭台助手那一套；
	// 「只写一个文件」的工具一律没有——play.json / craft 段 / 状态文件都是文件工具写的。
	check('A12', !tools.includes('list_assets') && !tools.includes('list_library'), '素材清单不进工具面（旧名也不在）');
	check(
		'A13',
		tools.includes('beat_done') && tools.includes('validate_play') && !tools.includes('set_stage_style'),
		'收束口与校验口在（搭台助手那一套不在）',
	);
	check(
		'A13b',
		!['create_play', 'set_craft', 'update_state'].some((name) => tools.includes(name)),
		'没有「只写一个文件」的工具（play.json / craft / 状态都走文件工具）',
	);
	// 剧作家也要知道东西放哪、字段什么形状：同一段《剧目文件》文本挂进它的提示词
	check(
		'A13c',
		prompt.includes('# 剧目文件') && prompt.includes('initialScene') && prompt.includes('protagonist'),
		'剧作家拿到《剧目文件》（布局 / play.json 字段 / 角色卡格式）',
	);
	// 生图：工具面与 persona 必须一致（配没配后端两种实例都跑得过）
	const hasImage = tools.includes('generate_image');
	const hasChapter = headings.includes('# 缺图怎么办（generate_image）');
	check(
		'A14',
		hasImage === hasChapter,
		hasImage
			? '配了生图后端：剧作家有 generate_image 且提示词里有《缺图怎么办》'
			: '没配生图后端：剧作家没有 generate_image，提示词里也不提',
	);

	console.log('\n段序：');
	for (const heading of headings) console.log(`   ${heading}`);
	console.log(`\n页面报错：${errors.length}`);
	console.log(`\n${results.filter((r) => r.ok).length}/${results.length} 通过`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
}

process.exit(results.every((r) => r.ok) ? 0 : 1);
