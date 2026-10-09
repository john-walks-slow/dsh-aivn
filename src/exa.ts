/**
 * 检索客户端（`web_search` 的后端）——实现在 `@aivn/agent`，两个宿主共用一份。
 *
 * 从 AIVN `apps/server/src/exa.ts` 与这里原先那份**逐字重合**的实现合成了一份：多 Key 轮询、
 * 正文预算、持久错误不轮换，都在包里；这一层只剩插件的接线。
 *
 * 代理不自己配（与 `tts.ts` 同理）：DSH 进程带着 `NODE_USE_ENV_PROXY` 与 `HTTP(S)_PROXY`，
 * 包缺省走全局 fetch，环境代理自然生效。
 */
import { Exa } from '@aivn/agent';

export { Exa } from '@aivn/agent';
export type { SearchResult } from '@aivn/agent';

/** 有 key 才建客户端；没有就返回 null（`web_search` 不注册，persona 里也不提联网）。 */
export function createExa(keys: readonly string[], baseUrl: string): Exa | null {
	const valid = keys.map((key) => key.trim()).filter((key) => key !== '');
	if (valid.length === 0) return null;
	return new Exa({ keys: valid, baseUrl });
}
