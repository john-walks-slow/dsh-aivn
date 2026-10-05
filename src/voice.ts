/**
 * 语音预取管线：`say` 行的文本流 → 分句 → 并发合成 → 音频就绪。
 *
 * 从 AIVN `apps/server/src/voice.ts` 搬。那边的注释把设计说清楚了，照抄在这里：
 *
 * - **边写边合成**：剧作家还在流式吐这一行的字，短语一到就送去合成——等整行写完再合成，
 *   玩家要盯着静音的字幕等好几秒。
 * - **并发 2**：够摊掉单次请求的往返，也不会把免费额度一次打空。
 * - **两道门**：`enabled` 是玩家按的语音总开关；`paused` 是客户端背压（未消费的短语积压了
 *   或玩家在快进）——后者省的是配额。
 * - **失败不阻塞演出**：合成挂了只打一行告警、丢掉那一句，台词照常演。
 */
import { PhraseChunker } from '@aivn/core';

export interface VoiceReadyEvent {
	/** 所属 `say` 行的帧号（就是 `say_start` 那一帧的 seq，客户端按它关联行）。 */
	lineSeq: number;
	phrase: number;
	state: 'started' | 'ready';
	url?: string;
}

export interface VoicePipelineOptions {
	/** 合成函数：文本 + 音色 id → 可直接播的 URL。 */
	synth: (text: string, voiceId: string) => Promise<{ url: string }>;
	/** 角色卡的音色；没声明音色的角色（含旁白）返回 undefined → 这一行不合成。 */
	voiceOf: (charId: string) => string | undefined;
	emit: (event: VoiceReadyEvent) => void;
	concurrency?: number;
	/** 失败告警的出口（默认 console.warn）。 */
	onError?: (message: string) => void;
}

export class VoicePipeline {
	private enabled = true;
	private paused = false;
	private chunker: PhraseChunker | null = null;
	private voiceId: string | null = null;
	private lineSeq = 0;
	private phraseNo = 0;
	private inFlight = 0;
	private disposed = false;
	private readonly queue: Array<{ text: string; voiceId: string; lineSeq: number; phrase: number }> = [];

	constructor(private readonly opts: VoicePipelineOptions) {}

	setEnabled(on: boolean): void {
		this.enabled = on;
		if (!on) {
			this.queue.length = 0;
			this.closeLine();
			return;
		}
		// 重新开启视为新会话：清掉客户端可能残留的背压暂停，泵复活。
		this.paused = false;
		this.pump();
	}

	setPaused(paused: boolean): void {
		this.paused = paused;
		if (!paused) this.pump();
	}

	/** `say_start`：开新行的分句器。没有音色的角色不开。 */
	lineStart(lineSeq: number, charId: string): void {
		this.closeLine();
		if (!this.enabled) return;
		const voiceId = this.opts.voiceOf(charId);
		if (!voiceId) return;
		this.voiceId = voiceId;
		this.lineSeq = lineSeq;
		this.phraseNo = 0;
		this.chunker = new PhraseChunker({ onPhrase: (text) => this.enqueue(text) });
	}

	/** `say_text` 的文本增量。 */
	feedText(delta: string): void {
		this.chunker?.push(delta);
	}

	/** `say_end`：冲刷残余短语。 */
	lineEnd(): void {
		this.chunker?.flush();
		this.closeLine();
	}

	dispose(): void {
		this.disposed = true;
		this.queue.length = 0;
		this.closeLine();
	}

	private closeLine(): void {
		this.chunker?.reset();
		this.chunker = null;
		this.voiceId = null;
	}

	private enqueue(text: string): void {
		if (!this.voiceId || !this.enabled) return;
		const job = { text, voiceId: this.voiceId, lineSeq: this.lineSeq, phrase: this.phraseNo++ };
		this.queue.push(job);
		// 先报「开始合成」再排队：客户端要在这条消息到达时就亮起喇叭，而不是等第一个字节回来。
		this.opts.emit({ lineSeq: job.lineSeq, phrase: job.phrase, state: 'started' });
		this.pump();
	}

	private pump(): void {
		if (this.disposed || !this.enabled || this.paused) return;
		const limit = this.opts.concurrency ?? 2;
		while (this.inFlight < limit && this.queue.length > 0) {
			const job = this.queue.shift();
			if (!job) return;
			this.inFlight += 1;
			this.opts
				.synth(job.text, job.voiceId)
				.then(({ url }) => {
					if (!this.disposed && this.enabled) {
						this.opts.emit({ lineSeq: job.lineSeq, phrase: job.phrase, state: 'ready', url });
					}
				})
				.catch((error: unknown) => {
					// 音频失败不阻塞演出：告警后丢弃该句（客户端的喇叭就此熄灭）。
					const why = error instanceof Error ? error.message : String(error);
					(this.opts.onError ?? ((message: string) => console.warn(message)))(`[dsh-aivn] TTS 失败（跳过）: ${why}`);
				})
				.finally(() => {
					this.inFlight -= 1;
					this.pump();
				});
		}
	}
}
