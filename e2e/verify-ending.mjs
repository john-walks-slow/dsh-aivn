// e2e/verify-ending.mjs —— 把 verify-ending.ts 用 esbuild 打包成一个临时文件再跑。
//
// 与 verify-rebuild.mjs 同一路数：夹具**不碰 e2e 实例、不需要真模型**（手写 EndingAttrs 调真实的
// EndingsLedger / readPlaySnapshot / resetPlayState），所以可以直接 `node e2e/verify-ending.mjs` 跑，
// 不必走 `dsh-e2e run`。包成 .mjs 只是为了让它也能进 `e2e/run.mjs` 的套件表。
//
// 落成文件而不是 data URL：`@deepseek-ai/*` 是外部的裸模块名，data URL 里的模块解析不了它们。
import { build } from 'esbuild';
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outfile = join(here, '.verify-ending.bundle.mjs');
process.on('exit', () => rmSync(outfile, { force: true }));

await build({
	entryPoints: [join(here, 'verify-ending.ts')],
	bundle: true,
	platform: 'node',
	format: 'esm',
	target: 'node22',
	external: ['@deepseek-ai/*'],
	outfile,
	logLevel: 'warning',
});

await import(pathToFileURL(outfile).href);
