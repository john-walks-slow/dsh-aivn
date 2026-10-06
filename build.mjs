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
 * 这是「静默失败」类缺陷的防线——产物跟不上源码时，插件在别人的机器上才炸，而本地一切正常。
 * 顺带把判断这条结论需要的现场打出来（仓库路径、HEAD、工作树、远端、依赖检出的状态）。
 */
import { existsSync } from 'node:fs';
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

/** 这次比对是在什么现场做的——结论离了现场就说不清。 */
function surroundings() {
	const repo = git(['rev-parse', '--show-toplevel']) || process.cwd();
	const head = git(['rev-parse', '--short', 'HEAD']);
	const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
	const dirty = git(['status', '--porcelain']).split('\n').filter(Boolean);
	const upstream = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
	const rows = [
		['仓库', repo],
		['HEAD', `${head} (${branch})`],
		['工作树', dirty.length === 0 ? '干净' : `${dirty.length} 处未提交（含 lib/ 就是产物本身）`],
		['远端', upstream ? `${upstream}，领先 ${git(['rev-list', '--count', `${upstream}..HEAD`])} / 落后 ${git(['rev-list', '--count', `HEAD..${upstream}`])}` : '无上游（本仓库没有配 remote）'],
	];
	// 打包会把兄弟仓的检出内容算进去，它脏着的时候比对结论就只对这些源码成立。
	for (const dep of ['@aivn/core', '@aivn/stage']) {
		const pkg = `node_modules/${dep}`;
		if (!existsSync(pkg)) {
			rows.push([dep, '不在 node_modules 里（先 npm install）']);
			continue;
		}
		const depRepo = git(['-C', pkg, 'rev-parse', '--show-toplevel']);
		const depDirty = depRepo ? git(['-C', depRepo, 'status', '--porcelain', '--', pkg.replace('node_modules/', '')]).split('\n').filter(Boolean) : [];
		rows.push([dep, depRepo ? (depDirty.length ? `${depRepo} —— 有 ${depDirty.length} 处未提交，会被算进这次比对` : `${depRepo} —— 干净`) : '不是 git 检出']);
	}
	const width = Math.max(...rows.map(([key]) => key.length));
	return rows.map(([key, value]) => `  ${key.padEnd(width)}  ${value}`).join('\n');
}

/** 逐字节比对，返回 null 表示一致。 */
function difference(built, path) {
	if (!existsSync(path)) return '磁盘上没有这个文件';
	const onDisk = execFileSync('cat', [path], { maxBuffer: 1 << 28 }).toString('utf8');
	if (onDisk === built) return null;
	const at = [...built].findIndex((char, index) => char !== onDisk[index]);
	return `不一致：磁盘 ${(onDisk.length / 1024).toFixed(1)} KiB / 构建 ${(built.length / 1024).toFixed(1)} KiB，首个不同在第 ${at < 0 ? '（长度不同）' : at} 字节`;
}

const { host, client } = await bundle();

if (CHECK) {
	console.log('产物 ↔ 源码比对（用 build.mjs 同一套参数重打一遍，不落盘）\n');
	console.log(surroundings());
	console.log('');
	let bad = 0;
	for (const [path, built] of [
		['lib/index.js', host],
		['lib/client.js', client],
	]) {
		const diff = difference(built, path);
		if (diff) bad += 1;
		console.log(`  ${diff ? '✗' : '✓'} ${path}  ${diff ?? `一致（${(built.length / 1024).toFixed(1)} KiB）`}`);
	}
	console.log('');
	console.log(bad === 0 ? '产物与源码一致。' : `${bad} 个产物没跟上源码——跑 npm run build 重建并提交。`);
	process.exit(bad === 0 ? 0 : 1);
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
