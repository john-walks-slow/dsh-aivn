#!/usr/bin/env node
/**
 * e2e 模块化运行器。
 *
 *   node e2e/run.mjs --list       查看模块与套件
 *   node e2e/run.mjs stage        跑舞台模块
 *   node e2e/run.mjs verify-stage 单点跑某个套件
 *
 * 通过 `dsh-e2e run e2e/run.mjs <module>` 执行，环境变量与 run 锁由 dsh-e2e 提供。
 */
import { spawnSync } from 'node:child_process';

export const MODULES = {
	stage: {
		description: '舞台视图：加载、tab 切换、IR 流渲染、输入回执',
		suites: ['verify-stage'],
	},
	injection: {
		description: '上下文注入：A 区六段与【状态】都进了系统提示词（从会话日志取断言）',
		suites: ['verify-injection'],
	},
	stagehand: {
		description: '搭台助手：persona 章节、《当前状态》注入、技能库、工具面（从会话日志取断言）',
		suites: ['verify-stagehand'],
	},
	voice: {
		description: '台词语音：分句合成、voice 帧、音频取回、浏览器出声（要真 Fish key）',
		suites: ['verify-voice'],
	},
};

const rawArg = process.argv[2];

if (!rawArg || rawArg === '--list' || rawArg === '--help' || rawArg === '-h') {
	console.log('=== dsh-aivn 模块化 E2E ===\n');
	for (const [name, def] of Object.entries(MODULES)) {
		console.log(`  • ${name.padEnd(10)}: ${def.description}`);
		console.log(`    套件: ${def.suites.join(', ')}`);
	}
	console.log('\n用法：node e2e/run.mjs <module|suite>');
	process.exit(rawArg ? 0 : 2);
}

const suites = [...new Set((MODULES[rawArg]?.suites ?? [rawArg]).map((n) => n.replace(/\.mjs$/, '')))];
console.log(`准备运行 ${suites.length} 个套件: ${suites.join(', ')}\n`);

const summary = [];
for (const suite of suites) {
	console.log(`── ${suite} ${'─'.repeat(Math.max(4, 50 - suite.length))}`);
	const result = spawnSync('node', [`e2e/${suite}.mjs`], { stdio: 'inherit', env: process.env });
	summary.push({ suite, ok: result.status === 0, status: result.status });
	console.log(`   → ${result.status === 0 ? 'PASS' : `FAIL (exit ${result.status})`}\n`);
}

const failed = summary.filter((row) => !row.ok);
console.log('══ 结果汇总 ' + '═'.repeat(46));
for (const { suite, ok, status } of summary) console.log(`  ${ok ? '✓' : '✗'} ${suite}${ok ? '' : ` (exit ${status})`}`);
console.log(`\n通过率: ${summary.length - failed.length}/${summary.length}`);
process.exit(failed.length ? 1 : 0);
