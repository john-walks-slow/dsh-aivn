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
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { StageHub } from '../hub';
import { readVoiceMap } from '../play/play-context';
import type { FishTts } from './tts';
import { chunkLine, VoicePipeline } from './voice';
import type { VoicedLine } from '../stage/stage-log';

/** 音频缓存目录（相对剧目根）。 */
export const TTS_CACHE_DIR = join('media-cache', 'tts');

export class VoiceHost {
	private readonly pipelines = new Map<string, VoicePipeline>();

	/**
	 * `tts` 与并发上限都取**访问器**而不是值：设置界面能在会话开着的时候把 key 补上或换掉，
	 * 合成发生在这之后（下一句台词、下一轮预取）就该用新的那套，不必重挂插件。
	 */
	constructor(
		private readonly ttsOf: () => FishTts | null,
		private readonly concurrencyOf: () => number,
		private readonly hub: StageHub,
		private readonly log: { warn(message: string): void },
	) {}

	/** 配了 Key 才有语音：没有的时候客户端连语音开关都不显示。 */
	get available(): boolean {
		return this.ttsOf() !== null;
	}

	/**
	 * 这条会话的管线，没有就建一个。没有 TTS 客户端时返回 null，调用方整条路跳过。
	 *
	 * 管线是**按会话**的：它手里有「正在写哪一行、这个角色什么音色」这些行内状态，
	 * 两条会话的剧作家同时写字时不能互相串。
	 */
	forSession(sessionId: string, playDir: string): VoicePipeline | null {
		const tts = this.ttsOf();
		if (!tts) return null;
		const existing = this.pipelines.get(sessionId);
		if (existing) return existing;

		const outDir = join(playDir, TTS_CACHE_DIR);
		const pipeline = new VoicePipeline({
			concurrency: this.concurrencyOf(),
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

	/**
	 * 舞台重建时补发语音：**只补盘上已经有的那几句**。
	 *
	 * 重建会把台词行重新编号，旧的语音帧（挂着旧行号）随之作废；音频本身是内容寻址的，
	 * 于是按同一套算法（分句 + `sha1(模型, 音色, 短语)`）找回文件名，命中就补一帧 `ready`，
	 * 客户端的「重听」按钮照常可用。没命中就什么都不发——重放旧台词不该再打一次 TTS。
	 */
	replayCached(sessionId: string, playDir: string, lines: readonly VoicedLine[]): void {
		const tts = this.ttsOf();
		if (!tts) return;
		const voices = readVoiceMap(playDir);
		for (const line of lines) {
			const voiceId = voices.get(line.charId);
			if (!voiceId) continue;
			chunkLine(line.text).forEach((phrase, index) => {
				const file = tts.fileNameOf(phrase, voiceId);
				if (!existsSync(join(playDir, TTS_CACHE_DIR, file))) return;
				this.hub.appendVoice(sessionId, {
					lineSeq: line.lineSeq,
					phrase: index,
					state: 'ready',
					url: `/aivn/audio?session=${encodeURIComponent(sessionId)}&file=${encodeURIComponent(file)}`,
				});
			});
		}
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
