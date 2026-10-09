/**
 * 预设内工具共用的运行时面。
 *
 * 工具在 `agent/created`（以及空白会话上换预设的那一刻）按会话装配一次，
 * 装配时就把这两样东西抓在手里：会话 id 决定 IR 往哪条流上推，工作目录决定剧目文件读写落在哪。
 * 目录**延迟取**（`playDir()` 而不是 `playDir`）：工作区是会话头的一部分，
 * 装配发生在它能读之前也不会拿到一个 undefined 冻在这里。
 */
import type { StageHub } from '../hub';

/**
 * 限制级（NSFW）通道的工具面：按会话读当前态、请求进入 / 退出。
 *
 * 真相源在舞台层（`stage-tap` 的 per-session 态，那里也负责推帧），这里只是**绑好会话**的那一层
 * 视图——工具在装配时就抓着某个会话，不该自己带 sessionId 到处走。
 *
 * `reason` / `summary` 是模型给的那两句原文，本步只透传（打标与角标不看它们）：退出摘要要等
 * 收束那次模型调用接上（设计稿 §7 第 4 步），理由则给限制级提示词用（第 3 步）。
 */
export interface NsfwControl {
	/** 这条会话现在是不是限制级态（含「本拍刚请求进入」——标识在工具调用那一刻就亮）。 */
	active(): boolean;
	/** 异步：进入时要先把本剧目配的限制级模型解析成 provider + model（见 `stage-tap` 的解析器）。 */
	enter(reason?: string): Promise<void>;
	exit(summary?: string): void;
}

/**
 * 上面那张视图的宿主面：同一组动作，按会话寻址。
 *
 * 由舞台层实现（`stage/stage-tap.ts` 持有 per-session 态并负责推帧），装配期交给 `preset-tools`
 * ——工具是按会话装上去的，装配时把它绑到本会话即可（见 `PlayContext.nsfw`）。
 */
export interface NsfwHost {
	active(sessionId: string): boolean;
	enter(sessionId: string, reason?: string): Promise<void>;
	exit(sessionId: string, summary?: string): void;
}

export interface PlayContext {
	/** 舞台事件中枢：舞台层的 IR（皮肤帧等）与剧本文本解析出来的一致。 */
	readonly hub: StageHub;
	/** 会话 id；舞台 IR 流按它分频。 */
	readonly sessionId: string;
	/** 会话工作目录 = 剧目根。 */
	playDir(): string;
	/** 限制级（NSFW）通道的现状与两个出口（`enter_nsfw` / `exit_nsfw` 用，见 `NsfwControl`）。 */
	readonly nsfw: NsfwControl;
	/**
	 * 把剧目皮肤推给所有正盯着这座剧目的舞台。
	 *
	 * 不能只推调用者自己那条流：`set_stage_style` 归搭台助手，而舞台（AIVN tab）
	 * 开在剧作家会话上——工具在 A 会话写文件、舞台在 B 会话看画面，帧必须送到 B。
	 * 判据取工作目录相同（工作区 = 剧目根），同一座剧目的两个会话都算。
	 */
	broadcastStyle(theme: Record<string, string>): void;
}
