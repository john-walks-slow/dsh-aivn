import type { StageEvent } from './ir';

/** 一段帧与它到下一帧的间隔（毫秒）。 */
export interface ScriptFrame {
	delay: number;
	event: StageEvent;
}

/**
 * Phase 0 的写死脚本：只用来验证「宿主 → 浏览器」的传输与舞台渲染，
 * 不含任何引擎逻辑。Phase 1 换成 `@aivn/core` 的流式解析器实时产出。
 */
export function phaseZeroScript(): ScriptFrame[] {
	const frames: ScriptFrame[] = [];
	const say = (delay: number, ...events: StageEvent[]) => {
		for (const event of events) frames.push({ delay, event });
	};

	say(120, { kind: 'scene', bg: 'classroom-sunset', transition: 'fade' });
	say(700, { kind: 'narrate_start' });
	for (const delta of chunk('放学后的教室，夕阳把桌椅染成橙色。')) {
		say(45, { kind: 'narrate_text', delta });
	}
	say(420, { kind: 'narrate_end' });

	say(300, { kind: 'actor', id: 'mio', pos: 'center', variant: 'neutral', shot: 'normal' });
	say(420, { kind: 'say_start', id: 'mio', name: '澪' });
	for (const delta of chunk('你终于来了。我还以为，今天又要一个人等到天黑。')) {
		say(55, { kind: 'say_text', delta });
	}
	say(380, { kind: 'say_end' });

	say(260, { kind: 'actor', id: 'yuki', pos: 'left', variant: 'smile', shot: 'close', action: 'nod' });
	say(400, { kind: 'say_start', id: 'yuki', name: '雪' });
	for (const delta of chunk('诶——那我是不是来得不是时候？')) {
		say(55, { kind: 'say_text', delta });
	}
	say(360, { kind: 'say_end' });

	say(500, {
		kind: 'stop',
		stopType: 'choice',
		options: [
			{ text: '「没有，正好。」' },
			{ text: '「你们两个，都坐吧。」' },
			{ text: '沉默着看向窗外。' },
		],
	});

	return frames;
}

function chunk(text: string): string[] {
	const out: string[] = [];
	for (let i = 0; i < text.length; i += 2) out.push(text.slice(i, i + 2));
	return out;
}
