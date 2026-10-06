/**
 * 预设内工具共用的运行时面。
 *
 * 工具在 `agent/created`（以及空白会话上换预设的那一刻）按会话装配一次，
 * 装配时就把这两样东西抓在手里：会话 id 决定 IR 往哪条流上推，工作目录决定剧目文件读写落在哪。
 * 目录**延迟取**（`playDir()` 而不是 `playDir`）：工作区是会话头的一部分，
 * 装配发生在它能读之前也不会拿到一个 undefined 冻在这里。
 */
import type { StageHub } from '../hub';

export interface PlayContext {
	/** 舞台事件中枢：工具产出的 IR（停止点）与其他事件走同一条流。 */
	readonly hub: StageHub;
	/** 会话 id；舞台 IR 流按它分频。 */
	readonly sessionId: string;
	/** 会话工作目录 = 剧目根。 */
	playDir(): string;
	/**
	 * 本轮已经收束（`beat_done` 调过了，给不给停止点都算）。
	 *
	 * 只有 `beat_done` 需要调它：`beat-guard` 靠这个记号判断「模型是真收束了，
	 * 还是写完正文忘了调工具」——忘了的那一轮才追一句把停止点要回来。
	 */
	beatClosed(): void;
	/**
	 * 把剧目皮肤推给所有正盯着这座剧目的舞台。
	 *
	 * 不能只推调用者自己那条流：`set_stage_style` 归搭台助手，而舞台（AIVN tab）
	 * 开在剧作家会话上——工具在 A 会话写文件、舞台在 B 会话看画面，帧必须送到 B。
	 * 判据取工作目录相同（工作区 = 剧目根），同一座剧目的两个会话都算。
	 */
	broadcastStyle(theme: Record<string, string>): void;
}
