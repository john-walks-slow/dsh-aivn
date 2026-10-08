/**
 * Fish Audio TTS 客户端。
 *
 * 从 AIVN `apps/server/src/tts.ts` 搬，去掉音色库那半（`list_voices` 与官方试听样本
 * 属于工坊能力，本阶段不做）。留下的三件事都是被生产逼出来的：
 *
 * - **多 Key 轮询**：401 / 402 / 429 与网络错误换下一把 key 重试，成功之后从下一把起步
 *   （真轮询分摊免费额度）。持久性 4xx/5xx 不换 key——换也必然失败，只会多烧几次配额。
 * - **内容寻址缓存**：`sha1(voiceId + text)` 命中即零请求。同一句在重连补推、重演、快进
 *   回看里会被反复要，缓存是省钱的那一道。
 * - **临时文件 + rename**：同目标并发只跑一次，写坏了也不会留下半张文件。
 *
 * 代理不自己配：DSH 进程带着 `NODE_USE_ENV_PROXY=1` 与 `HTTP(S)_PROXY`，全局 fetch 自己走。
 */
import { createHash, randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** 换下一把 key 重试的状态码：额度类（401/402/429）与上游瞬时故障（5xx）。 */
const RETRYABLE_STATUS = new Set([401, 402, 429, 500, 502, 503, 504]);

/** 非轮换错误：持久性 4xx/5xx 换 key 也没用。 */
class NonRetryableTtsError extends Error {}

export interface TtsOptions {
	/** 一把或多把 Fish Audio key。 */
	keys: readonly string[];
	baseUrl: string;
	model: string;
	timeoutMs?: number;
}

export class FishTts {
	private keyCursor = 0;
	/** 同目标文件进行中的请求去重（键是绝对路径）。 */
	private readonly inflight = new Map<string, Promise<void>>();

	constructor(private readonly opts: TtsOptions) {}

	/**
	 * 合成并落盘 `outDir`，返回文件名——URL 由调用方拼。
	 * 命中缓存直接复用；失败按上面的规矩换 key，全挂才抛。
	 */
	synthesize(text: string, voiceId: string, outDir: string): Promise<{ file: string; cached: boolean }> {
		return this.cacheFile(this.fileNameOf(text, voiceId), outDir, () => this.request(text, voiceId));
	}

	/**
	 * 一句话在这个模型 + 这个音色下落在盘上的文件名。
	 *
	 * 舞台重建（`stage-log.ts`）拿它去缓存目录里找旧音频：找到就补一帧「语音好了」，找不到
	 * （从没合成过、或换过模型）就当这一版没有配音——**不**顺手合成，重放旧台词不该再打一次上游。
	 */
	fileNameOf(text: string, voiceId: string): string {
		// 键里带上 model：换了模型（音色库/口音会变）之后，同一句话不该再命中旧音频。
		const digest = createHash('sha1')
			.update(this.opts.model)
			.update('\0')
			.update(voiceId)
			.update('\0')
			.update(text)
			.digest('hex');
		return `${digest}.mp3`;
	}

	private async cacheFile(
		file: string,
		outDir: string,
		load: () => Promise<Buffer>,
	): Promise<{ file: string; cached: boolean }> {
		const target = join(outDir, file);
		if (existsSync(target)) return { file, cached: true };

		const running = this.inflight.get(target);
		if (running) {
			await running;
			return { file, cached: true };
		}

		const job = (async (): Promise<void> => {
			const audio = await load();
			await mkdir(outDir, { recursive: true });
			const tmp = `${target}.${randomUUID().slice(0, 8)}.tmp`;
			await writeFile(tmp, audio);
			await rename(tmp, target);
		})();
		this.inflight.set(target, job);
		try {
			await job;
		} finally {
			this.inflight.delete(target);
		}
		return { file, cached: false };
	}

	private async request(text: string, voiceId: string): Promise<Buffer> {
		const { keys } = this.opts;
		let lastError: unknown = null;

		for (let attempt = 0; attempt < keys.length; attempt += 1) {
			const index = (this.keyCursor + attempt) % keys.length;
			try {
				const res = await fetch(`${this.opts.baseUrl}/v1/tts`, {
					method: 'POST',
					headers: {
						authorization: `Bearer ${keys[index]}`,
						'content-type': 'application/json',
						model: this.opts.model,
					},
					body: JSON.stringify({
						text,
						reference_id: voiceId,
						format: 'mp3',
						latency: 'normal',
						prosody: { speed: 1.0, volume: 0.0 },
					}),
					signal: AbortSignal.timeout(this.opts.timeoutMs ?? 20_000),
				});
				if (!res.ok) {
					const body = await res.text().catch(() => '');
					if (!RETRYABLE_STATUS.has(res.status)) {
						throw new NonRetryableTtsError(`fish-tts HTTP ${res.status}: ${body.slice(0, 200)}`);
					}
					lastError = new Error(`fish-tts key#${index} HTTP ${res.status}: ${body.slice(0, 200)}`);
					continue;
				}
				this.keyCursor = (index + 1) % keys.length;
				return Buffer.from(await res.arrayBuffer());
			} catch (error) {
				if (error instanceof NonRetryableTtsError) throw error;
				lastError = error;
			}
		}
		throw new Error(
			`fish-tts 全部 key 失败: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
		);
	}
}

/** 有 key 才建客户端；没有就返回 null（语音整条链路停用，舞台不显示语音开关）。 */
export function createTts(keys: readonly string[], baseUrl: string, model: string): FishTts | null {
	const valid = keys.map((key) => key.trim()).filter((key) => key !== '');
	if (valid.length === 0) return null;
	return new FishTts({ keys: valid, baseUrl, model });
}
