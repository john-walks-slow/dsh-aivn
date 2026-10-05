/**
 * 语音的宿主半边：把 TTS 客户端、按会话的预取管线、角色音色表接在一起。
 *
 * 分工：
 *   - `FishTts`（`tts.ts`）只管「一段文本 + 一个音色 → 盘上哪个文件」；
 *   - `VoicePipeline`（`voice.ts`）只管一行的分句与并发；
 *   - 这里管**按会话**的这一层：音色从哪来、缓存落在剧目的哪、URL 怎么拼、事件发给谁。
 *
 * 缓存落在剧目自己的 `media-cache/tts/` 下（可重建、不进版本库）。内容寻址，
 * 所以同一个音色说同一句话在重连补推、快进回看里都命中同一份。
 */
import { join } from 'node:path';
import type { StageHub } from './hub';
import { readVoiceMap } from './play-context';
import type { FishTts } from './tts';
import { VoicePipeline } from './voice';

/** 音频缓存目录（相对剧目根）。 */
export const TTS_CACHE_DIR = join('media-cache', 'tts');

export class VoiceHost {
	private readonly pipelines = new Map<string, VoicePipeline>();

	constructor(
		private readonly tts: FishTts | null,
		private readonly hub: StageHub,
		private readonly log: { warn(message: string): void },
		/** 同时合成的上限（配置项，默认 2）。 */
		private readonly concurrency: number = 2,
	) {}

	/** 配了 Key 才有语音：没有的时候客户端连语音开关都不显示。 */
	get available(): boolean {
		return this.tts !== null;
	}

	/**
	 * 这条会话的管线，没有就建一个。没有 TTS 客户端时返回 null，调用方整条路跳过。
	 *
	 * 管线是**按会话**的：它手里有「正在写哪一行、这个角色什么音色」这些行内状态，
	 * 两条会话的剧作家同时写字时不能互相串。
	 */
	forSession(sessionId: string, playDir: string): VoicePipeline | null {
		if (!this.tts) return null;
		const existing = this.pipelines.get(sessionId);
		if (existing) return existing;

		const tts = this.tts;
		const outDir = join(playDir, TTS_CACHE_DIR);
		const pipeline = new VoicePipeline({
			concurrency: this.concurrency,
			voiceOf: (charId) => readVoiceMap(playDir).get(charId),
			synth: async (text, voiceId) => {
				const { file } = await tts.synthesize(text, voiceId, outDir);
				return { url: `/aivn/audio?session=${encodeURIComponent(sessionId)}&file=${encodeURIComponent(file)}` };
			},
			emit: (event) => void this.hub.appendVoice(sessionId, event),
			onError: (message) => this.log.warn(message),
		});
		this.pipelines.set(sessionId, pipeline);
		return pipeline;
	}

	/** 一条会话收摊：停掉它的管线（队列、在飞的请求、行内状态一起清）。 */
	disposeSession(sessionId: string): void {
		this.pipelines.get(sessionId)?.dispose();
		this.pipelines.delete(sessionId);
	}

	/** 语音总开关 / 客户端背压。会话还没建管线时什么都不用做。 */
	control(sessionId: string, state: { enabled?: boolean; paused?: boolean }): void {
		const pipeline = this.pipelines.get(sessionId);
		if (!pipeline) return;
		if (state.enabled !== undefined) pipeline.setEnabled(state.enabled);
		if (state.paused !== undefined) pipeline.setPaused(state.paused);
	}

	dispose(): void {
		for (const pipeline of this.pipelines.values()) pipeline.dispose();
		this.pipelines.clear();
	}
}
