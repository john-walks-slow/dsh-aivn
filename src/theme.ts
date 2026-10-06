/**
 * 剧目皮肤文件 `theme.json` 的读取。
 *
 * 与 `assets/manifest.json` 同一套容错口径，理由也一样：读与解析分两段，ENOENT 不是错误，
 * 「JSON 坏了」要给一句带文件名的、能读的错。区别在最后一步——manifest 抛出去，主题只丢键：
 * 素材表坏了这座剧目确实没准备好，皮肤坏了却必须照常开演（回默认皮），所以调用方
 * 拿到 `dropped` 记一行日志就行。
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { sanitizeTheme } from './style-tokens';

/** 皮肤文件名，与 `play.json` 平级放在剧目根。 */
export const THEME_FILE = 'theme.json';

export interface PlayTheme {
	/** 过完读闸的键值；空对象 = 默认皮。 */
	theme: Record<string, string>;
	/** 被读闸丢掉的条目，只用于日志。 */
	dropped: string[];
}

/** 读一座剧目的皮肤；文件不在就是默认皮，不是错误。 */
export function readPlayTheme(dir: string): PlayTheme {
	const path = join(dir, THEME_FILE);
	let raw: string;
	try {
		raw = readFileSync(path, 'utf8');
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { theme: {}, dropped: [] };
		throw error;
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch (error) {
		const why = error instanceof Error ? error.message : String(error);
		throw new Error(`${path} 不是合法 JSON：${why}`);
	}
	return sanitizeTheme(parsed);
}
