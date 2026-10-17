/**
 * 语音预取管线：`say` 行的文本流 → 攒成整句 → 并发合成 → 音频就绪。
 *
 * 从 AIVN `apps/server/src/voice.ts` 搬，那边把设计写得最细。要点：
 *
 * - **一行 `<say>` = 一次请求 = 一个文件**：文字在行内攒着，`say_end` 时整句送出去。
 *   早先是边写边切成短语、每个短语一个文件、客户端按短语序号拼接——那样任何一处丢帧
 *   都表现成「只响前半句」，所以两条线一起改成整句（代价：这一行的声音要等整句合成完）。
 * - **并发 2**：够摊掉单次请求的往返，也不会把免费额度一次打空。
 * - **两道门**：`enabled` 是玩家按的语音总开关；`paused` 是客户端背压（已到货未播的行积压了
 *   或玩家在快进）——后者省的是配额。
 * - **失败不阻塞演出**：合成挂了告警、明说一帧 `failed`（客户端据此把「合成中」摘掉），台词照常演。
 */
import { normalizeForTts, stripToneTags } from '@aivn/core';

export interface VoiceReadyEvent {
	/** 所属 `say` 行的帧号（就是 `say_start` 那一帧的 seq，客户端按它关联行）。 */
	lineSeq: number;
	state: 'started' | 'ready' | 'failed';
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

interface VoiceJob {
	text: string;
	voiceId: string;
	lineSeq: number;
}

export class VoicePipeline {
	private enabled = true;
	private paused = false;
	private voiceId: string | null = null;
	private lineSeq = 0;
	/** 正在攒的这一行台词：等 `say_end` 了整句一起送。 */
	private text = '';
	private inFlight = 0;
	private disposed = false;
	private readonly queue: VoiceJob[] = [];

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

	/** `say_start`：认领这一行的帧号与音色（没有音色的角色不攒文字）。 */
	lineStart(lineSeq: number, charId: string): void {
		this.closeLine();
		if (!this.enabled) return;
		this.voiceId = this.opts.voiceOf(charId) ?? null;
		this.lineSeq = lineSeq;
	}

	/** `say_text` 的文本增量。 */
	feedText(delta: string): void {
		if (this.voiceId) this.text += delta;
	}

	/** `say_end`：台词写完，整句一次送出去。 */
	lineEnd(): void {
		const voiceId = this.voiceId;
		const lineSeq = this.lineSeq;
		const text = this.takeText();
		if (voiceId && text) this.enqueue({ text, voiceId, lineSeq });
		this.closeLine();
	}

	dispose(): void {
		this.disposed = true;
		this.queue.length = 0;
		this.closeLine();
	}

	private closeLine(): void {
		this.voiceId = null;
		this.text = '';
	}

	/** 取走攒下的台词并整理成可送 TTS 的样子；没有可读的字就返回 null（纯标点/省略号不合成）。 */
	private takeText(): string | null {
		const text = speakable(this.text);
		this.text = '';
		return text;
	}

	private enqueue(job: VoiceJob): void {
		if (!this.enabled) return;
		this.queue.push(job);
		// 先报「开始合成」再排队：客户端要在这条消息到达时就亮起喇叭，而不是等第一个字节回来。
		this.opts.emit({ lineSeq: job.lineSeq, state: 'started' });
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
						this.opts.emit({ lineSeq: job.lineSeq, state: 'ready', url });
					}
				})
				.catch((error: unknown) => {
					// 音频失败不阻塞演出：告警、明说一帧 failed（客户端据此摘掉「合成中」），台词照常演。
					const why = error instanceof Error ? error.message : String(error);
					(this.opts.onError ?? ((message: string) => console.warn(message)))(`[dsh-aivn] TTS 失败（跳过）: ${why}`);
					if (!this.disposed) this.opts.emit({ lineSeq: job.lineSeq, state: 'failed' });
				})
				.finally(() => {
					this.inFlight -= 1;
					this.pump();
				});
		}
	}
}

/**
 * 送去合成的文本：整理过、且至少有字可读（纯标点、纯省略号不合成）。
 *
 * 语气标记原样留着（`[whispering]` 要对 Fish 生效），但判有没有字可读看剥掉标记之后的那份——
 * 只有 `[sigh]` 的一行本来就没什么好念的。与 `apps/server/src/voice.ts` 同一口径。
 */
export function speakable(text: string): string | null {
	const piece = normalizeForTts(text.trim());
	if (piece === '' || !/[\p{L}\p{N}]/u.test(stripToneTags(piece))) return null;
	return piece;
}
