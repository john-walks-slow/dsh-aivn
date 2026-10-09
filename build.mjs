/**
 * 构建两半：
 *
 *   lib/index.js   — 宿主半边，Node ESM bundle，external 是 @deepseek-ai/* 与 sharp
 *                    （sharp 带原生模块，打进 bundle 之后加载即失败；它在 dependencies 里，
 *                      运行时按包名解析，见 dev-dsh-plugin 技能那条「link 包的依赖要显式声明」）。
 *   lib/client.js  — 浏览器半边，lazy-CJS 包装成 window.__ModuleLoader__.load；
 *                    react 与 @deepseek-ai/* 保持 external，其余打进包里。
 *
 * 客户端 bundle 的 load id 必须等于包名，否则整个 application combo 会二次执行。
 *
 * `--check` 不写任何文件：用同一套构建参数在内存里重打一遍，与 `lib/` 里已提交的产物逐字节比对。
 * 这是「静默失败」类缺陷的防线（产物跟不上源码时，本地一切正常、别人装上才炸），挂在
 * `.githooks/pre-commit` 上，见 AGENTS.md 的「产物与源码」一节。
 *
 * 两半的判定强度不同，因为来路不同：宿主半边只外部依赖宿主与 sharp，**永远**硬判；
 * 客户端半边把兄弟仓 `@aivn/stage` 的内容打进包里，所以只有那两个检出**干净**时硬判，
 * 否则只能警告——那时不一致多半是别人正在改那只包，而不是我们忘了重建。
 */
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';

const CHECK = process.argv.includes('--check');

const HOST = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	format: 'esm',
	platform: 'node',
	target: 'node22',
	external: ['@deepseek-ai/*', 'sharp'],
	sourcemap: false,
	logLevel: 'info',
};

const CLIENT = {
	entryPoints: ['src/client/index.tsx'],
	bundle: true,
	format: 'cjs',
	platform: 'browser',
	jsx: 'automatic',
	target: 'es2022',
	minify: true,
	sourcemap: false,
	external: ['react', 'react-dom/*', 'react/jsx-runtime', '@deepseek-ai/*'],
	// 样式进 bundle 当字符串（客户端半边没有样式管道，见 src/types/assets.d.ts）
	loader: { '.css': 'text' },
	logLevel: 'info',
};

/** lazy-CJS 外壳：`id` 必须是包名，`require` 由宿主给。 */
function wrap(body) {
	return [
		'window.__ModuleLoader__.load({',
		'\tid: "dsh-aivn",',
		'\tfactory: (require) => {',
		'\t\tvar module = { exports: {} };',
		'\t\tvar exports = module.exports;',
		'\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
		body,
		'\t\treturn module.exports;',
		'\t}',
		'});',
	].join('\n');
}

/** 在内存里打出两半产物（不落盘，`--check` 靠它比对）。 */
async function bundle() {
	const host = await build({ ...HOST, write: false });
	const client = await build({ ...CLIENT, write: false });
	return { host: host.outputFiles[0].text, client: wrap(client.outputFiles[0].text) };
}

function git(args) {
	try {
		return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		return '';
	}
}

/** 两个兄弟检出的状态：客户端半边的比对结论要读得懂它们才算数。 */
function dependencies() {
	return ['@aivn/core', '@aivn/stage'].map((name) => {
		const path = `node_modules/${name}`;
		if (!existsSync(path)) return { name, repo: '', dirty: null };
		const repo = git(['-C', path, 'rev-parse', '--show-toplevel']);
		if (!repo) return { name, repo: '', dirty: null };
		const dirty = git(['-C', repo, 'status', '--porcelain', '--', `packages/${name.replace('@aivn/', '')}`]).split('\n').filter(Boolean);
		return { name, repo, dirty };
	});
}

/** 这次比对是在什么现场做的——结论离了现场就说不清。 */
function surroundings(deps) {
	const repo = git(['rev-parse', '--show-toplevel']) || process.cwd();
	const head = git(['rev-parse', '--short', 'HEAD']);
	const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
	const dirty = git(['status', '--porcelain']).split('\n').filter(Boolean);
	const upstream = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
	const lines = [
		`  仓库     ${repo}`,
		`  HEAD     ${head} (${branch})`,
		`  工作树   ${dirty.length === 0 ? '干净' : `${dirty.length} 处未提交（含 lib/ 就是产物本身）`}`,
		`  远端     ${upstream ? `${upstream}，领先 ${git(['rev-list', '--count', `${upstream}..HEAD`])} / 落后 ${git(['rev-list', '--count', `HEAD..${upstream}`])}` : '无上游'}`,
	];
	for (const dep of deps) {
		lines.push(`  ${dep.name.padEnd(8)} ${dep.dirty === null ? '不在 node_modules 里（先 npm install）' : dep.repo ? `${dep.repo} —— ${dep.dirty.length ? `有 ${dep.dirty.length} 处未提交` : '干净'}` : '不是 git 检出'}`);
	}
	return lines.join('\n');
}

/**
 * 共享技能正文是否与生成结果一致；一致返回 null。
 *
 * 技能文件由共享包的 `skills/sync-skills.mjs` 生成（两宿主共用一份正文，
 * 只有 frontmatter 与一小段宿主变量不同），这里把插件那份重渲染一遍来比对。
 */
async function skillDrift() {
	const script = 'node_modules/@aivn/agent/skills/sync-skills.mjs';
	if (!existsSync(script)) return '找不到 @aivn/agent 的共享正文生成器（先 npm install 指到兄弟仓）';
	const { renderSkill } = await import(`./${script}`);
	const { file, text } = renderSkill('aivn-audio', 'plugin', process.cwd());
	const onDisk = existsSync(file) ? readFileSync(file, 'utf8') : null;
	return onDisk === text ? null : `${file} 与共享正文不一致（跑 node ${script} --plugin-dir .）`;
}

/** 逐字节比对，返回 null 表示一致。 */
function difference(built, path) {
	if (!existsSync(path)) return '磁盘上没有这个文件';
	const onDisk = readFileSync(path, 'utf8');
	if (onDisk === built) return null;
	const at = [...built].findIndex((char, index) => char !== onDisk[index]);
	return `不一致：磁盘 ${(onDisk.length / 1024).toFixed(1)} KiB / 构建 ${(built.length / 1024).toFixed(1)} KiB，首个不同在第 ${at < 0 ? '（长度不同）' : at} 字节`;
}

const { host, client } = await bundle();

if (CHECK) {
	const deps = dependencies();
	const depsClean = deps.every((dep) => dep.dirty && dep.dirty.length === 0);

	console.log('产物 ↔ 源码比对（用 build.mjs 同一套参数重打一遍，不落盘）\n');
	console.log(surroundings(deps));
	console.log('');

	let failed = 0;
	let cautioned = 0;
	for (const [path, built, hostHalf] of [
		['lib/index.js', host, true],
		['lib/client.js', client, false],
	]) {
		const diff = difference(built, path);
		if (diff === null) {
			console.log(`  ✓ ${path}  一致（${(built.length / 1024).toFixed(1)} KiB）`);
			continue;
		}
		// 宿主半边与兄弟仓无关；客户端半边要兄弟仓干净才判得动（它把 @aivn/stage 打进了包）。
		if (hostHalf || depsClean) {
			failed += 1;
			console.log(`  ✗ ${path}  ${diff}`);
		} else {
			cautioned += 1;
			console.log(`  ⚠ ${path}  ${diff}`);
			console.log('      兄弟检出是脏的（上面那行指出了哪只），这一半的差异多半来自它、而不是忘了重建——不据此判定。');
		}
	}

	// 共享技能正文：这份 SKILL.md 由 packages/agent/skills/ 生成，不该手改。
	// 兄弟仓（@aivn/core 所指的那个检出）里才有生成器，所以这条守在这边。
	const skillProblem = await skillDrift();
	if (skillProblem === null) {
		console.log('  ✓ skills/  与共享正文一致');
	} else {
		failed += 1;
		console.log(`  ✗ skills/  ${skillProblem}`);
	}

	console.log('');
	if (failed) {
		console.log(`${failed} 处没跟上源码——重建产物（npm run build）/ 重跑技能同步。`);
	} else if (cautioned) {
		console.log('宿主半边与源码一致；客户端半边因兄弟检出是脏的而未判定。');
	} else {
		console.log('产物与源码一致。');
	}
	process.exit(failed === 0 ? 0 : 1);
}

await rm('lib', { recursive: true, force: true });
await mkdir('lib', { recursive: true });
await writeFile('lib/index.js', host, 'utf8');
await writeFile('lib/client.js', client, 'utf8');

// 语法错误在浏览器侧才暴露，而且现象是整个 combo 炸掉。这里先拦一道。
execFileSync(process.execPath, ['--check', 'lib/index.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'lib/client.js'], { stdio: 'inherit' });

console.log(`lib/index.js ${((await readFile('lib/index.js', 'utf8')).length / 1024).toFixed(1)} KiB`);
console.log(`lib/client.js ${((await readFile('lib/client.js', 'utf8')).length / 1024).toFixed(1)} KiB`);
