/**
 * Exa 检索客户端（`web_search` 的后端）。
 *
 * 从 AIVN `apps/server/src/exa.ts` 搬。一次 `/search` 用 `contents.text` 把正文一并取回——
 * 「搜索」与「读页面」在这里是同一个动作，所以只多一个工具，不是搜索 + 抓取两个。
 *
 * - **多 Key 轮询**：401 / 402 / 429 换下一把（免费额度按 key 给），与 TTS 同一套规矩；
 * - **正文预算**：总 15000 字按条数摊分——检索是配角，不能把上下文预算挤掉；
 * - 代理不自己配（与 `tts.ts` 同理）：DSH 进程带着 `NODE_USE_ENV_PROXY` 与 `HTTP(S)_PROXY`。
 */
export interface SearchResult {
	title: string;
	url: string;
	/** 页面发布日期（ISO 串，可能缺）。 */
	publishedDate?: string;
	text: string;
}

const RETRYABLE_STATUS = new Set([401, 402, 429]);
/** 正文总预算（字符）。 */
const TEXT_BUDGET = 15_000;
const TIMEOUT_MS = 30_000;

export class Exa {
	/** 下一把要用的 key（成功后往前推）。 */
	private keyCursor = 0;

	constructor(private readonly opts: { keys: readonly string[]; baseUrl: string }) {}

	/** 语义检索：query 写成一句自然语言描述，不是关键词堆砌。 */
	async search(query: string, numResults: number): Promise<SearchResult[]> {
		const { keys } = this.opts;
		const perResult = Math.min(6000, Math.max(800, Math.floor(TEXT_BUDGET / numResults)));
		const body = JSON.stringify({
			query,
			numResults,
			contents: { text: { maxCharacters: perResult } },
		});
		let lastError: unknown = null;
		for (let attempt = 0; attempt < keys.length; attempt += 1) {
			const index = (this.keyCursor + attempt) % keys.length;
			try {
				const res = await fetch(`${this.opts.baseUrl}/search`, {
					method: 'POST',
					headers: { 'x-api-key': keys[index]!, 'content-type': 'application/json' },
					body,
					signal: AbortSignal.timeout(TIMEOUT_MS),
				});
				if (!res.ok) {
					const detail = await res.text().catch(() => '');
					if (!RETRYABLE_STATUS.has(res.status)) {
						throw new Error(`检索 HTTP ${res.status}: ${detail.slice(0, 200)}`);
					}
					lastError = new Error(`检索 key#${index} HTTP ${res.status}`);
					continue;
				}
				this.keyCursor = (index + 1) % keys.length;
				return parseResults(await res.json());
			} catch (error) {
				lastError = error;
			}
		}
		throw new Error(`检索全部 key 失败: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
	}
}

/** 响应体是外部数据：逐字段认，认不出的丢掉，绝不假定形状。 */
function parseResults(raw: unknown): SearchResult[] {
	const results = (raw as { results?: unknown })?.results;
	if (!Array.isArray(results)) return [];
	const out: SearchResult[] = [];
	for (const item of results) {
		const r = item as { title?: unknown; url?: unknown; publishedDate?: unknown; text?: unknown };
		if (typeof r.url !== 'string') continue;
		out.push({
			title: typeof r.title === 'string' && r.title.trim() !== '' ? r.title.trim() : r.url,
			url: r.url,
			...(typeof r.publishedDate === 'string' ? { publishedDate: r.publishedDate } : {}),
			text: typeof r.text === 'string' ? r.text : '',
		});
	}
	return out;
}

/** 有 key 才建客户端；没有就返回 null（`web_search` 不注册，persona 里也不提联网）。 */
export function createExa(keys: readonly string[], baseUrl: string): Exa | null {
	const valid = keys.map((key) => key.trim()).filter((key) => key !== '');
	if (valid.length === 0) return null;
	return new Exa({ keys: valid, baseUrl });
}
