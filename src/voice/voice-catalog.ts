/**
 * Fish Audio 音色目录客户端（`list_voices` 的后端）。
 *
 * 窗口抓取、分页与解析在 `@aivn/agent` 的 `voice/catalog.ts`（两个宿主共用一份）；
 * 这里只剩**出网那一层**：多 Key 轮询与超时（与合成共用同一池 key，额度按 key 给）。
 *
 * 插件不带磁盘快照与试听样本——那是素材管理页的事，见共享包与 `VoiceCatalogService` 的分工。
 */
import { VoiceClient, type VoiceEntry, type VoiceQuery, type VoiceWindow } from '@aivn/agent';

const TIMEOUT_MS = 20_000;
/** 换下一把 key 的状态码：额度类。其余 4xx/5xx 换 key 也一样失败，只白烧一次往返。 */
const RETRYABLE_STATUS = new Set([401, 402, 429]);

export type { VoiceEntry, VoiceQuery, VoiceWindow };

export class VoiceCatalog {
	/** 下一把要用的 key（成功后往前推，真轮询分摊额度）。 */
	private keyCursor = 0;
	private readonly client: VoiceClient;

	constructor(private readonly opts: { keys: readonly string[]; baseUrl: string }) {
		this.client = new VoiceClient((path) => this.get<never>(path));
	}

	/** 取一个条件窗口（缓存与同窗去重在包里）。 */
	list(query: VoiceQuery): Promise<VoiceWindow> {
		return this.client.list(query);
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

/** 有 key 才建客户端；没有就返回 null（`list_voices` 不注册）。 */
export function createVoiceCatalog(keys: readonly string[], baseUrl: string): VoiceCatalog | null {
	const valid = keys.map((key) => key.trim()).filter((key) => key !== '');
	if (valid.length === 0) return null;
	return new VoiceCatalog({ keys: valid, baseUrl });
}
