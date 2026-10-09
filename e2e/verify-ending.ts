/**
 * 结局夹具：账本落账 / 去重 / 跨周目累加、A 区《此前已达成的结局》注入、新周目状态重置。
 *
 * 与 `verify-rebuild` 同一路数：**手写夹具、直接调真实实现**，不碰 e2e 实例、不需要真模型。
 * 结局这条线要证明的是「引擎在 IR 到手那一刻落账、账本跨周目继承、`newGamePlus` 只走提示词注入」——
 * 这些都不依赖模型怎么写，用手写的 `EndingAttrs` 调 `EndingsLedger` + `readPlaySnapshot` 就能锁住。
 *
 * ── 预期（先写下，再跑） ────────────────────────────────────────────────
 *
 * | 断言 | 判据 |
 * |---|---|
 * | E1 | `beginPlaythrough` 让 `endings.json` 的 `playthroughs` 从 0 变 1，并返回 1 |
 * | E2 | `recordEnding` 以 id 落账，`reachedIn` = [1]，`name`/`subtitle`/`summary` 一次到位 |
 * | E3 | 同一结局重达成、这一轮没写 `summary` 时，上一轮的 `summary` 不被抹掉 |
 * | E4 | 第二个周目 `beginPlaythrough` → `playthroughs` 2；同 id 再达成 → `reachedIn` = [1,2]（并集去重） |
 * | E5 | `readPlaySnapshot` 在 `newGamePlus` 打开且账本非空时产出《此前已达成的结局》，含「第 2 周目」与结局人话名 |
 * | E6 | `newGamePlus` 关闭时该段为空（账本仍在盘上） |
 * | E7 | 账本坏掉时 `readLedger` 抛错、`EndingsLedger` 不覆盖它（原样保留） |
 * | E8 | `resetPlayState` 把 `memory/always/state/*` 写回剧目起点，不碰 `premise.md` |
 * | E9 | 老账本改名前的 `title` 键仍读得出来（回落成 `name`），改名不静默丢旧记录 |
 *
 * 跑法（不需要 dsh-e2e 实例，也不占它的 run 锁）：
 *
 *     node e2e/run.mjs ending        # 或直接 node e2e/verify-ending.mjs
 */
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { EndingsLedger, readLedger } from '../src/play/ledger';
import { readPlaySnapshot } from '../src/play/play-context';
import { resetPlayState } from '../src/play/play-state';
import { loadPlaySync } from '../src/play/play';

const dir = mkdtempSync(join(tmpdir(), 'dsh-aivn-ending-'));
process.on('exit', () => rmSync(dir, { recursive: true, force: true }));

/** 一份最小剧目：`newGamePlus` 打开，起点状态与场景都写死，方便断言重置结果。 */
function writePlay(newGamePlus: boolean): void {
	writeFileSync(
		join(dir, 'play.json'),
		`${JSON.stringify(
			{
				id: 'ending-fixture',
				title: '结局夹具',
				newGamePlus,
				initialScene: '起点',
				initialState: { affinity: { lin: 10 }, flags: { met: true } },
			},
			null,
			2,
		)}\n`,
		'utf8',
	);
	mkdirSync(join(dir, 'characters'), { recursive: true });
	writeFileSync(join(dir, 'characters', 'protagonist.md'), '---\nname: 我\n---\n（主角）\n', 'utf8');
	mkdirSync(join(dir, 'memory', 'always'), { recursive: true });
	writeFileSync(join(dir, 'memory', 'always', 'premise.md'), '一座用来测结局的剧目。\n', 'utf8');
	writeFileSync(join(dir, 'memory', 'always', 'craft.md'), '', 'utf8');
}

writePlay(true);
const warnings: string[] = [];
const ledger = new EndingsLedger((message) => warnings.push(message));

const checks: Array<[string, boolean, string]> = [];
const check = (id: string, ok: boolean, note: string): void => {
	checks.push([id, ok, note]);
};

// E1 / E2 / E3：第一个周目落账（三个归档字段一次到位——它们全在 `<ending …/>` 属性上）。
const first = ledger.beginPlaythrough(dir, 'session-1');
check('E1', first === 1, `第一个周目号是 1（实际 ${first}）`);
ledger.recordEnding(dir, 'session-1', {
	id: 'true_sunrise',
	name: '晨光',
	subtitle: '这一次，她没有回头',
	summary: '她把三年的沉默一次说完，然后走进了那片光里。',
});
let data = readLedger(dir);
check(
	'E2',
	data.playthroughs === 1 &&
		data.endings.true_sunrise?.reachedIn.join(',') === '1' &&
		data.endings.true_sunrise?.name === '晨光' &&
		data.endings.true_sunrise?.subtitle === '这一次，她没有回头' &&
		data.endings.true_sunrise?.summary === '她把三年的沉默一次说完，然后走进了那片光里。',
	`账本落了一条 true_sunrise（${JSON.stringify(data.endings.true_sunrise)})`,
);

// E3：同一结局重达成、这一轮没写 summary → 上一轮的 summary 保留（缺省字段不抹旧值）。
ledger.recordEnding(dir, 'session-1', { id: 'true_sunrise', name: '晨光' });
data = readLedger(dir);
check(
	'E3',
	data.endings.true_sunrise?.summary === '她把三年的沉默一次说完，然后走进了那片光里。',
	`重达成时不抹掉旧的 summary（${data.endings.true_sunrise?.summary}）`,
);

// E4：第二个周目再达成同一结局 → reachedIn 取并集。
const second = ledger.beginPlaythrough(dir, 'session-2');
ledger.recordEnding(dir, 'session-2', { id: 'true_sunrise', name: '晨光', subtitle: '这一次，她没有回头' });
data = readLedger(dir);
check(
	'E4',
	second === 2 && data.playthroughs === 2 && data.endings.true_sunrise?.reachedIn.join(',') === '1,2',
	`第二个周目累加、reachedIn 取并集（playthroughs=${data.playthroughs}, reachedIn=${JSON.stringify(data.endings.true_sunrise?.reachedIn)}）`,
);

// E5：newGamePlus 打开 + 账本非空 → A 区产出《此前已达成的结局》。
const on = readPlaySnapshot(dir);
check(
	'E5',
	on.endings.includes('此前已达成的结局') && on.endings.includes('第 2 周目') && on.endings.includes('晨光'),
	`newGamePlus 打开时注入结局段（${JSON.stringify(on.endings.slice(0, 48))}…）`,
);
// E6：开关关闭时该段为空（账本文件仍在盘上）。
writePlay(false);
const off = readPlaySnapshot(dir);
check('E6', off.endings === '', `newGamePlus 关闭时该段为空（实际 ${JSON.stringify(off.endings)}）`);

// E7：账本坏掉 → readLedger 抛错、不覆盖。
writePlay(true);
const ledgerPath = join(dir, 'endings.json');
writeFileSync(ledgerPath, '{ 这不是合法 JSON', 'utf8');
let threw = false;
try {
	readLedger(dir);
} catch {
	threw = true;
}
ledger.beginPlaythrough(dir, 'session-bad');
const raw = readFileSync(ledgerPath, 'utf8');
check('E7', threw && raw === '{ 这不是合法 JSON' && warnings.length > 0, `坏账本不覆盖、记告警（告警 ${warnings.length} 条）`);

// E8：新周目重置只动 state/*，premise.md 原样保留。
rmSync(ledgerPath, { force: true });
const play = loadPlaySync(dir);
if (!play) throw new Error('夹具剧目读不出来，E8 无法进行');
mkdirSync(join(dir, 'memory', 'always', 'state'), { recursive: true });
writeFileSync(join(dir, 'memory', 'always', 'state', 'scene.md'), '上一周目的场景\n', 'utf8');
writeFileSync(join(dir, 'memory', 'always', 'state', 'threads.md'), '旧线索\n', 'utf8');
writeFileSync(join(dir, 'memory', 'always', 'state', 'state.json'), '{ "affinity": { "lin": 99 }, "flags": {} }\n', 'utf8');
resetPlayState(play);
const scene = readFileSync(join(dir, 'memory', 'always', 'state', 'scene.md'), 'utf8').trim();
const threads = readFileSync(join(dir, 'memory', 'always', 'state', 'threads.md'), 'utf8').trim();
const state = JSON.parse(readFileSync(join(dir, 'memory', 'always', 'state', 'state.json'), 'utf8'));
const premise = readFileSync(join(dir, 'memory', 'always', 'premise.md'), 'utf8').trim();
check(
	'E8',
	scene === '起点' && threads === '' && state.affinity.lin === 10 && state.flags.met === true && premise === '一座用来测结局的剧目。',
	`新周目重置 state/*（scene=${scene}, affinity.lin=${state.affinity.lin}），premise 不动`,
);

// E9：老账本用改名前的 `title` 键 → 仍读得出来（回落成 `name`），改名不静默丢旧周目记录。
writeFileSync(
	ledgerPath,
	`${JSON.stringify(
		{
			version: 1,
			playthroughs: 1,
			endings: { old_ending: { title: '旧名', firstAt: '2026-01-01T00:00:00.000Z', lastAt: '2026-01-01T00:00:00.000Z', reachedIn: [1] } },
		},
		null,
		2,
	)}\n`,
	'utf8',
);
data = readLedger(dir);
check('E9', data.endings.old_ending?.name === '旧名', `老账本 title 键回落成 name（${JSON.stringify(data.endings.old_ending?.name)}）`);

let failed = 0;
for (const [id, ok, note] of checks) {
	if (!ok) failed += 1;
	console.log(`${ok ? '✓' : '✗'} ${id} ${note}`);
}
console.log(`\n${checks.length - failed}/${checks.length} 通过`);
process.exit(failed === 0 ? 0 : 1);
