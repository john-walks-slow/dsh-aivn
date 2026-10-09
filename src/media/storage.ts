/**
 * 剧目里那些「读-改-写」的 JSON 文件（素材表、台账）的落盘原语。
 *
 * 抽出来的理由不是省几行，而是**并发正确性**：工具是并发调用的（同一批里出三张候选、
 * 接着入库），而每次调用现建一个素材面，所以锁必须按**文件路径**挂在模块级——各建各的实例、
 * 各锁各的就等于没锁。这条约束只该写一遍。
 */
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

/**
 * 同一份文件的读-改-写串行队列（按绝对路径，跨调用者共享）。
 *
 * 键是文件路径：两次调用写的是同一个 `assets/manifest.json` 时就排队，写不同文件时互不等待。
 * 队列里抛错不能毒化后续任务——链上接的是「吞掉结果的 catch」，原始 Promise 照常把错误交回调用方。
 */
const fileLocks = new Map<string, Promise<unknown>>();

export function withFileLock<T>(file: string, job: () => Promise<T>): Promise<T> {
	const prev = fileLocks.get(file) ?? Promise.resolve();
	const next = prev.then(job, job);
	// 队列里存的是「吞掉结果的版本」：一个任务的失败不该毒化后面排队的任务。
	const guard = next.then(
		() => {},
		() => {},
	);
	fileLocks.set(file, guard);
	void guard.then(() => {
		if (fileLocks.get(file) === guard) fileLocks.delete(file);
	});
	return next;
}

/**
 * 先写临时文件再改名：中途崩溃不会留下半份 JSON。
 *
 * 也收字节（`cut` / `generate_bgm` 直接写最终路径时用它）：并发写同一个目标时，改名让每次写
 * 要么整体生效、要么完全不见，而不是两份内容交错进同一个文件。
 */
export async function writeAtomic(file: string, body: string | Uint8Array): Promise<void> {
	await mkdir(dirname(file), { recursive: true });
	const tmp = `${file}.${randomUUID().slice(0, 8)}.tmp`;
	await writeFile(tmp, body);
	await rename(tmp, file);
}

/** 读一个 JSON 文件；不存在给 `fallback`，坏了给一句带文件名的错（不是把解析错原样抛出）。 */
export async function readJson<T>(file: string, fallback: T): Promise<T> {
	try {
		return JSON.parse(await readFile(file, 'utf8')) as T;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return fallback;
		throw new Error(`${file} 不是合法 JSON：${error instanceof Error ? error.message : String(error)}`);
	}
}

/**
 * 「锁内读盘 → 合并 → 原子替换」的整段串行（见 `withFileLock` 对锁粒度的说明）。
 *
 * 锁内只做文件操作，不与出图 / 抠底那些秒级操作共享临界区。`read` 可以是同步或异步的
 * ——素材表用同步的 `readManifest`（它另有一句更准的坏 JSON 报错），台账用异步的 `readJson`。
 */
export async function writeJsonLocked<T>(
	file: string,
	read: () => T | Promise<T>,
	mutate: (current: T) => T,
): Promise<void> {
	await withFileLock(file, async () => {
		await writeAtomic(file, `${JSON.stringify(mutate(await read()), null, 2)}\n`);
	});
}
