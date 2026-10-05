/**
 * Stage IR —— Phase 0 的本地最小形状。
 *
 * 真身是 `@aivn/core` 的 `StageEvent`（`packages/core/src/dsl/events.ts:30`）。
 * Phase 1 接上 core 之后本文件整个删掉，这里只保证宿主半边与浏览器半边
 * 对同一份事件形状达成一致，好让管道先跑起来。
 */

/** 停止点选项。 */
export interface StopOption {
	text: string;
	value?: string;
}

/** 舞台事件（判别联合，判别键是 `kind`）。 */
export type StageEvent =
	| { kind: 'scene'; bg?: string; bgm?: string; ambient?: string; transition?: string }
	| {
			kind: 'actor';
			id: string;
			pos?: string;
			variant?: string;
			shot?: string;
			anchor?: string;
			action?: string;
			leave?: boolean;
	  }
	| { kind: 'say_start'; id: string; name?: string; mood?: string }
	| { kind: 'say_text'; delta: string }
	| { kind: 'say_end' }
	| { kind: 'narrate_start' }
	| { kind: 'narrate_text'; delta: string }
	| { kind: 'narrate_end' }
	| { kind: 'sfx'; src: string; volume?: number }
	| { kind: 'cg'; id: string; caption?: string }
	| { kind: 'stop'; stopType: 'choice' | 'free'; options?: StopOption[]; placeholder?: string }
	| { kind: 'player_input'; text: string };

/** 带上序号的线上事件；重连凭 `seq` 补推。 */
export interface SequencedEvent {
	seq: number;
	event: StageEvent;
}
