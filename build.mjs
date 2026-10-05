/**
 * 构建两半：
 *
 *   lib/index.js   — 宿主半边，Node ESM bundle，external 只有 @deepseek-ai/*。
 *   lib/client.js  — 浏览器半边，lazy-CJS 包装成 window.__ModuleLoader__.load；
 *                    react 与 @deepseek-ai/* 保持 external，其余打进包里。
 *
 * 客户端 bundle 的 load id 必须等于包名，否则整个 application combo 会二次执行。
 */
import { build } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await rm('lib', { recursive: true, force: true });
await mkdir('lib', { recursive: true });

await build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	format: 'esm',
	platform: 'node',
	target: 'node22',
	outfile: 'lib/index.js',
	external: ['@deepseek-ai/*'],
	sourcemap: false,
	logLevel: 'info',
});

const client = await build({
	entryPoints: ['src/client/index.tsx'],
	bundle: true,
	write: false,
	format: 'cjs',
	platform: 'browser',
	jsx: 'automatic',
	target: 'es2022',
	minify: true,
	sourcemap: false,
	external: ['react', 'react-dom/*', 'react/jsx-runtime', '@deepseek-ai/*'],
	logLevel: 'info',
});

const body = client.outputFiles[0].text;
const wrapped = [
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

await writeFile('lib/client.js', wrapped, 'utf8');

// 语法错误在浏览器侧才暴露，而且现象是整个 combo 炸掉。这里先拦一道。
execFileSync(process.execPath, ['--check', 'lib/client.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'lib/index.js'], { stdio: 'inherit' });

const size = (await readFile('lib/client.js', 'utf8')).length;
console.log(`lib/client.js ${(size / 1024).toFixed(1)} KiB`);
