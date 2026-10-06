#!/usr/bin/env node
/**
 * e2e: 搭台助手的能力面（插件验收）。
 *
 * 证明这个预设真的接上了工坊那半边：persona 的章节进了系统提示词、《当前状态》注入读了盘、
 * 技能库里那两份做法速查挂上了、工具面是搭台助手的那一套（且没有剧作家的收束口）。
 *
 * 判据取自**会话日志**（`system/message` 记了完整系统提示词，`request/header` 记了那一轮的
 * 工具清单），不靠模型说什么：模型怎么用这些工具是模型的事。
 *
 * 运行：dsh-e2e run e2e/verify-stagehand.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { clearPlay, seedPlay } from './lib/fixture.mjs';
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

/** 等日志里出现系统提示词与那一轮的工具清单（都是第一个 step 开头写下的，不用等整轮演完）。 */
async function capture(page, sessionDir) {
	let prompt = '';
	let tools = [];
	for (let i = 0; i < 60; i += 1) {
		const events = sessionEvents(sessionDir);
		prompt = systemPrompt(events);
		tools = toolNames(events);
		if (prompt !== '' && tools.length > 0) break;
		await page.waitForTimeout(2_000);
	}
	return { prompt, tools };
}

const fixture = seedPlay(WORKSPACE);
const browser = await launch();
try {
	const { page, errors } = await newPage(browser);
	await gotoGui(page);
	await dismissOnboarding(page);
	check('S1', await newSession(page), '已新建会话');

	const preset = await pickPreset(page, '搭台助手');
	check('S2', preset.picked && preset.current === '搭台助手', `座位已选为「搭台助手」（${preset.current ?? '无'}）`);

	await sendMessage(page, '先别动手改任何东西：告诉我你现在能看到哪些文件，还缺什么。');
	const { prompt, tools } = await capture(page, newestSession());

	const headings = [...prompt.matchAll(/^#{1,2} .+$/gm)].map((m) => m[0]);
	const has = (name) => tools.includes(name);

	// persona：工坊那几章在，舞台契约不在
	check('S3', prompt.length > 0, `系统提示词已写出（${prompt.length} 字）`);
	check('S4', headings.includes('# 职责边界'), '有《职责边界》章');
	check('S5', headings.includes('# 设定流程（这是你的工作方式，不是可选建议）'), '有《设定流程》章');
	check('S6', headings.includes('# 出图要点') && headings.includes('# 剧目写作要点'), '有《出图要点》与《剧目写作要点》');
	check('S7', !headings.includes('# 演出契约') && !headings.includes('# 剧本格式（Stage DSL，必须严格遵守）'), '没有剧作家的舞台契约（两套注入不串）');

	// 注入：《当前状态》读的是盘上的真实文件，就绪报告也在
	check('S8', headings.includes('# 当前状态'), '有《当前状态》注入段');
	check('S9', prompt.includes('play.json（') && prompt.includes('characters/lin.md（'), '文件清单列的是工作区里真实的文件与大小');
	check('S10', prompt.includes('开演条件'), '带上了就绪报告');

	// 技能库：两份自带技能都挂上（这一条同时证明 skill 行装载成功、包内路径算对了）
	check('S11', prompt.includes('galgame-audio'), '技能清单里有 galgame-audio');
	check('S12', prompt.includes('galgame-visual-craft'), '技能清单里有 galgame-visual-craft');

	// 工具面：搭台助手那一套；剧作家的收束口一个都不在
	const expects = ['create_play', 'list_assets', 'get_readiness', 'set_craft'];
	const forbidden = ['beat_done', 'update_state', 'list_library'];
	check('S13', expects.every(has), `装上了 ${expects.join(' / ')}（实际：${tools.join(', ')}）`);
	check('S14', !forbidden.some(has), `没有剧作家的工具与旧名 ${forbidden.join(' / ')}`);
	check('S15', !has('list_voices') && !has('web_search'), '没配 key 时 list_voices / web_search 不注册');
	// 生图 / 音乐：**工具面与 persona 必须一致**——要么都开（工具在、提示词教），要么都关
	// （工具不在、走 fallback 章）。这一条不假设实例配没配后端，配了桩后端也一样跑得过。
	const mediaTools = ['generate_image', 'commit_asset', 'recut_sprite', 'generate_bgm'];
	const on = mediaTools.some(has);
	const allOn = mediaTools.every(has);
	check(
		'S16',
		on === allOn,
		on
			? `配了生图 / 音乐后端：${mediaTools.join(' / ')} 都在（实际：${tools.join(', ')}）`
			: `没配生图 / 音乐后端时 ${mediaTools.join(' / ')} 一个都不注册`,
	);
	const styledTwoStep = prompt.includes('两步走：先出候选');
	const musicChapter = headings.includes('# 配乐（generate_bgm）');
	check(
		'S17',
		allOn
			? styledTwoStep && prompt.includes('commit_asset') && musicChapter
			: headings.includes('# 出图要点') &&
					prompt.includes('现在**没有生图工具**') &&
					!prompt.includes('commit_asset') &&
					!prompt.includes('recut_sprite') &&
					!musicChapter,
		allOn ? 'persona 教两步出图与配乐（与工具面一致）' : 'persona 走没配生图的 fallback 章，且不提生图 / 配乐工具',
	);

console.log('\n段序：');
	for (const heading of headings) console.log(`   ${heading}`);
	console.log(`\n工具：${tools.join(', ')}`);
	console.log(`\n页面报错：${errors.length}`);
	console.log(`\n${results.filter((r) => r.ok).length}/${results.length} 通过`);
} finally {
	await browser.close();
	clearPlay(WORKSPACE, fixture);
}

process.exit(results.every((r) => r.ok) ? 0 : 1);
