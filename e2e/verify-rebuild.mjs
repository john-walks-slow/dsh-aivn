// e2e/verify-rebuild.mjs —— 把 verify-rebuild.ts 用 esbuild 打包成一个临时文件再跑。
//
// 夹具本身**不碰 e2e 实例、不需要真模型**（转写文本是手写的，重建就是「读转写 → 解析 → 出停止点」），
// 所以这个文件可以直接 `node e2e/verify-rebuild.mjs` 跑，不必走 `dsh-e2e run`——那会占住
// 实例的 run 锁，而这份检查跟实例没有关系。包成 .mjs 只是为了让它也能进 `e2e/run.mjs` 的套件表
// （那边只会 spawn `node e2e/<name>.mjs`）。
//
// 落成文件而不是 data URL：`@deepseek-ai/*` 是外部的裸模块名，data URL 里的模块解析不了它们。
import { build } from 'esbuild';
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outfile = join(here, '.verify-rebuild.bundle.mjs');
// 夹具末尾会 `process.exit()`，所以清理由 exit 钩子兜底，而不是 try/finally。
process.on('exit', () => rmSync(outfile, { force: true }));

await build({
	entryPoints: [join(here, 'verify-rebuild.ts')],
	bundle: true,
	platform: 'node',
	format: 'esm',
	target: 'node22',
	// dsh 的那几个包由宿主提供，本地 node_modules 里只有一部分（例如 dsh-session 的 peer
	// dsh-scope 就不在）——留给运行时的 node 去解析。
	external: ['@deepseek-ai/*'],
	outfile,
	logLevel: 'warning',
});

await import(pathToFileURL(outfile).href);
