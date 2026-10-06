/**
 * Fish Audio 音色目录客户端（`list_voices` 的后端）。
 *
 * 从 AIVN `apps/server/src/voiceCatalog.ts` 搬，砍掉两半：**磁盘快照**（插件没有数据目录，
 * 快照该放哪是个新约定，不值当）与**试听样本**（那是素材管理页的事）。留下的是两个真被需要的：
 *
 * - **条件窗口**：`language` / `tag` / `title` 直接发给服务端抓对应窗口——全局热门窗口里
 *   几乎没有中文音色，只按关键词筛全库是筛不到的。窗口进内存缓存（12h、上限 16 窗）。
 * - **多 Key 轮询**：与合成共用同一池 key，401 / 402 / 429 换下一把（额度按 key 给）。
 *
 * `gender` 不在这一层：Fish 没有这个参数，它是作者自己打的标签，由工具层本地筛。
 */
const PAGE_SIZE = 100;
/** 免费档可达窗口 1000 条；再多翻页返回空数组，只是多打几次无效请求。 */
const MAX_PAGES = 10;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
/** 窗口缓存上限：每窗最多 1000 条，16 窗也就几 MB。 */
const WINDOW_CACHE_LIMIT = 16;
const TIMEOUT_MS = 20_000;
/** 换下一把 key 的状态码：额度类。其余 4xx/5xx 换 key 也一样失败，只白烧一次往返。 */
const RETRYABLE_STATUS = new Set([401, 402, 429]);

export interface VoiceEntry {
	id: string;
	title: string;
	description: string;
	languages: string[];
	tags: string[];
	likes: number;
}

export interface VoiceWindow {
	entries: VoiceEntry[];
	/** 上游报的匹配总数（可能大于实际抓回的条数）。 */
	total: number;
}

export interface VoiceQuery {
	language?: string;
	/** 多 tag 是并集（Fish 的多 tag 参数就是并集），大小写敏感、原样透传。 */
	tags?: string[];
	title?: string;
}

interface Page {
	items?: unknown[];
	total?: unknown;
}

export class VoiceCatalog {
	/** 下一把要用的 key（成功后往前推，真轮询分摊额度）。 */
	private keyCursor = 0;
	private readonly windows = new Map<string, { at: number; window: VoiceWindow }>();
	private readonly inflight = new Map<string, Promise<VoiceWindow>>();

	constructor(private readonly opts: { keys: readonly string[]; baseUrl: string }) {}

	/** 取一个条件窗口；同窗并发只打一轮上游。 */
	list(query: VoiceQuery): Promise<VoiceWindow> {
		const normalized: Required<VoiceQuery> = {
			language: (query.language ?? '').trim().toLowerCase(),
			tags: [...new Set((query.tags ?? []).map((tag) => tag.trim()).filter(Boolean))].sort(),
			title: (query.title ?? '').trim().toLowerCase(),
		};
		const key = JSON.stringify(normalized);
		const hit = this.windows.get(key);
		if (hit && Date.now() - hit.at < CACHE_TTL_MS) return Promise.resolve(hit.window);

		const running = this.inflight.get(key);
		if (running) return running;

		const job = this.fetchWindow(normalized)
			.then((window) => {
				this.remember(key, window);
				return window;
			})
			.finally(() => this.inflight.delete(key));
		this.inflight.set(key, job);
		return job;
	}

	private remember(key: string, window: VoiceWindow): void {
		this.windows.set(key, { at: Date.now(), window });
		while (this.windows.size > WINDOW_CACHE_LIMIT) {
			const oldest = this.windows.keys().next().value;
			if (oldest === undefined) break;
			this.windows.delete(oldest);
		}
	}

	private async fetchWindow(query: Required<VoiceQuery>): Promise<VoiceWindow> {
		const suffix = querySuffix(query);
		// 标题搜索通常只有一两页：先探第 1 页、满页才补剩下的（本机实测搜一个名字 1s 级回来）。
		// 语言/标签窗口要拉满，10 页并发打完只用一轮往返。
		const pages = query.title === ''
			? await Promise.all(Array.from({ length: MAX_PAGES }, (_, i) => this.page(i + 1, suffix)))
			: await this.probeThenRest(suffix);

		const byId = new Map<string, VoiceEntry>();
		for (const page of pages) {
			for (const raw of page.items ?? []) {
				const entry = toEntry(raw);
				if (entry) byId.set(entry.id, entry);
			}
		}
		const total = typeof pages[0]?.total === 'number' ? (pages[0].total as number) : byId.size;
		return { entries: [...byId.values()], total: total || byId.size };
	}

	private async probeThenRest(suffix: string): Promise<Page[]> {
		const first = await this.page(1, suffix);
		if ((first.items ?? []).length < PAGE_SIZE) return [first];
		const rest = await Promise.all(
			Array.from({ length: MAX_PAGES - 1 }, (_, i) => this.page(i + 2, suffix)),
		);
		return [first, ...rest];
	}

	private page(n: number, suffix: string): Promise<Page> {
		return this.get<Page>(`/model?page_size=${PAGE_SIZE}&page_number=${n}&self=false&sort_by=score${suffix}`);
	}

	private async get<T>(path: string): Promise<T> {
		const { keys } = this.opts;
		if (keys.length === 0) throw new Error('没有配 Fish key，取不到音色库');
		let lastError: unknown = null;
		for (let attempt = 0; attempt < keys.length; attempt += 1) {
			const index = (this.keyCursor + attempt) % keys.length;
			try {
				const res = await fetch(`${this.opts.baseUrl}${path}`, {
					headers: { authorization: `Bearer ${keys[index]!}` },
					signal: AbortSignal.timeout(TIMEOUT_MS),
				});
				if (!res.ok) {
					const body = await res.text().catch(() => '');
					if (!RETRYABLE_STATUS.has(res.status)) {
						throw new Error(`音色库 HTTP ${res.status}: ${body.slice(0, 200)}`);
					}
					lastError = new Error(`音色库 key#${index} HTTP ${res.status}`);
					continue;
				}
				this.keyCursor = (index + 1) % keys.length;
				return (await res.json()) as T;
			} catch (error) {
				lastError = error;
			}
		}
		throw new Error(`音色库全部 key 失败: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
	}
}

function querySuffix(query: Required<VoiceQuery>): string {
	const parts: string[] = [];
	if (query.language) parts.push(`language=${encodeURIComponent(query.language)}`);
	for (const tag of query.tags) parts.push(`tag=${encodeURIComponent(tag)}`);
	if (query.title) parts.push(`title=${encodeURIComponent(query.title)}`);
	return parts.length === 0 ? '' : `&${parts.join('&')}`;
}

/** 响应体是外部数据：逐字段认，认不出的丢掉（没有 id 的条目直接不要）。 */
function toEntry(raw: unknown): VoiceEntry | null {
	const item = raw as {
		_id?: unknown;
		id?: unknown;
		title?: unknown;
		description?: unknown;
		languages?: unknown;
		tags?: unknown;
		like_count?: unknown;
	};
	const id = str(item._id) || str(item.id);
	if (id === '') return null;
	return {
		id,
		title: str(item.title) || id.slice(0, 8),
		description: str(item.description),
		languages: strList(item.languages),
		tags: strList(item.tags),
		likes: typeof item.like_count === 'number' ? item.like_count : 0,
	};
}

function str(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

function strList(value: unknown): string[] {
	return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

/** 有 key 才建客户端；没有就返回 null（`list_voices` 不注册）。 */
export function createVoiceCatalog(keys: readonly string[], baseUrl: string): VoiceCatalog | null {
	const valid = keys.map((key) => key.trim()).filter((key) => key !== '');
	if (valid.length === 0) return null;
	return new VoiceCatalog({ keys: valid, baseUrl });
}
