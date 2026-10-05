/**
 * 剧目数据层：**会话工作区即剧目**。
 *
 * 剧作家预设开在一个工作目录里，那个目录就是这座剧目的根——`play.json`
 * 是它的身份证，`assets/`、`memory/` 都在它下面。换剧目 = 换个工作目录开会话，
 * 插件不需要另建一套剧目注册表。
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parsePlayConfig, type PlayConfig } from '@aivn/core';

export const PLAY_FILE = 'play.json';

export interface Play {
	/** 剧目根目录（绝对路径，即会话工作区）。 */
	dir: string;
	config: PlayConfig;
}

/**
 * 从工作目录读剧目。目录里没有 `play.json` 就是「这不是一座剧目」，
 * 返回 null 让上层给出空态；文件在那儿但坏了则是真错误，往上抛。
 *
 * 抛出去的那条**得是能读的话**：`JSON.parse` 的原生报错里只有位置，没有文件名，
 * 用户拿着「Unexpected token } in JSON at position 37」找不到是哪个剧目的哪份文件坏了。
 */
export async function loadPlay(dir: string | undefined | null): Promise<Play | null> {
	if (!dir) return null;

	let raw: string;
	try {
		raw = await readFile(join(dir, PLAY_FILE), 'utf8');
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
		throw error;
	}
	try {
		return { dir, config: parsePlayConfig(JSON.parse(raw) as unknown) };
	} catch (error) {
		const why = error instanceof Error ? error.message : String(error);
		throw new Error(`${join(dir, PLAY_FILE)} 读不出来：${why}`);
	}
}
