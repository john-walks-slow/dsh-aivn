/**
 * 「舞台」会话视图（conversation.view 槽位条目）。
 *
 * Phase 0 的数据来源是宿主半边的写死脚本（`/aivn/stream` 的 SSE），
 * 目的是把「插件包 → DSH 加载 → 浏览器渲染 → 宿主路由」这条链跑通。
 * Phase 1 起换成按会话分频道的真实 IR 流。
 */
import { useEffect, useReducer, useState, type FC } from 'react';
import type { SequencedEvent, StageEvent, StopOption } from '../ir';
import { STAGE_CSS } from './styles';

export interface StageViewProps {
	/** 会话作用域槽位由框架注入；session-maybe 下可能为空。 */
	sessionId?: string;
}

interface Actor {
	id: string;
	pos: string;
	variant?: string;
}

interface Line {
	kind: 'say' | 'narrate' | 'input';
	speakerId?: string;
	name?: string;
	text: string;
}

interface Stop {
	stopType: 'choice' | 'free';
	options: StopOption[];
	placeholder?: string;
}

interface StageState {
	connected: boolean;
	sceneBg?: string;
	actors: Actor[];
	line: Line | null;
	streaming: boolean;
	stop: Stop | null;
}

const INITIAL: StageState = {
	connected: false,
	actors: [],
	line: null,
	streaming: false,
	stop: null,
};

type Action = { type: 'connection'; connected: boolean } | { type: 'ir'; event: StageEvent };

function appendDelta(state: StageState, delta: string): StageState {
	if (!state.line) return state;
	return { ...state, line: { ...state.line, text: state.line.text + delta } };
}

function reduce(state: StageState, action: Action): StageState {
	if (action.type === 'connection') {
		return state.connected === action.connected ? state : { ...state, connected: action.connected };
	}

	const event = action.event;
	switch (event.kind) {
		case 'scene':
			return { ...state, sceneBg: event.bg ?? state.sceneBg };
		case 'actor': {
			const actors = state.actors.filter((actor) => actor.id !== event.id);
			if (!event.leave) actors.push({ id: event.id, pos: event.pos ?? 'center', variant: event.variant });
			return { ...state, actors };
		}
		case 'say_start':
			return {
				...state,
				stop: null,
				streaming: true,
				line: { kind: 'say', speakerId: event.id, name: event.name, text: '' },
			};
		case 'say_text':
			return appendDelta(state, event.delta);
		case 'say_end':
			return { ...state, streaming: false };
		case 'narrate_start':
			return { ...state, stop: null, streaming: true, line: { kind: 'narrate', text: '' } };
		case 'narrate_text':
			return appendDelta(state, event.delta);
		case 'narrate_end':
			return { ...state, streaming: false };
		case 'player_input':
			return { ...state, stop: null, streaming: false, line: { kind: 'input', text: event.text } };
		case 'stop':
			return {
				...state,
				streaming: false,
				stop: { stopType: event.stopType, options: event.options ?? [], placeholder: event.placeholder },
			};
		default:
			return state;
	}
}

export const StageView: FC<StageViewProps> = ({ sessionId }) => {
	const [state, dispatch] = useReducer(reduce, INITIAL);
	const [draft, setDraft] = useState('');
	const [sending, setSending] = useState(false);

	useEffect(() => {
		const source = new EventSource('/aivn/stream');
		source.addEventListener('open', () => dispatch({ type: 'connection', connected: true }));
		source.addEventListener('error', () => dispatch({ type: 'connection', connected: false }));
		source.addEventListener('ir', (message) => {
			try {
				const parsed = JSON.parse((message as MessageEvent<string>).data) as SequencedEvent;
				dispatch({ type: 'ir', event: parsed.event });
			} catch {
				/* 坏帧丢弃：流不该因为一条解析不了的数据断掉 */
			}
		});
		return () => source.close();
	}, []);

	const submit = async (text: string): Promise<void> => {
		if (!text.trim() || sending) return;
		setSending(true);
		try {
			const response = await fetch('/aivn/input', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ text }),
			});
			const payload = (await response.json()) as { echo?: string };
			dispatch({ type: 'ir', event: { kind: 'player_input', text: payload.echo ?? text } });
			setDraft('');
		} catch {
			/* Phase 0 不做失败重试；Phase 1 起由引擎给出停止点与错误提示 */
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="aivn-stage" data-session={sessionId ?? ''}>
			<style>{STAGE_CSS}</style>

			<div className="aivn-scene">
				{state.sceneBg ? <span className="aivn-scene-label">{state.sceneBg}</span> : null}
			</div>

			<div className="aivn-status" data-state={state.connected ? 'online' : 'offline'}>
				<span className="aivn-status-dot" />
				<span>{state.connected ? '已连接' : '正在连接…'}</span>
			</div>

			<div className="aivn-cast">
				{state.actors.map((actor) => (
					<div key={actor.id} className="aivn-actor" data-speaking={String(actor.id === state.line?.speakerId)}>
						<span>
							{actor.id}
							{actor.variant ? ` · ${actor.variant}` : ''}
						</span>
					</div>
				))}
			</div>

			<div className="aivn-bottom">
				{state.line ? (
					<div className="aivn-line">
						{state.line.kind === 'say' && state.line.name ? <div className="aivn-plate">{state.line.name}</div> : null}
						<div className="aivn-text" data-kind={state.line.kind}>
							{state.line.text}
							{state.streaming ? <span className="aivn-caret" /> : null}
						</div>
					</div>
				) : null}

				{state.stop ? (
					<div className="aivn-choices">
						{state.stop.options.map((option, index) => (
							<button
								key={`${index}-${option.text}`}
								type="button"
								className="aivn-choice"
								onClick={() => void submit(option.text)}
								disabled={sending}
							>
								{option.text}
							</button>
						))}
					</div>
				) : null}

				{state.stop?.stopType === 'free' || state.stop?.placeholder ? (
					<div className="aivn-free">
						<input
							value={draft}
							placeholder={state.stop?.placeholder ?? '说点什么…'}
							onChange={(event) => setDraft(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') void submit(draft);
							}}
						/>
						<button type="button" onClick={() => void submit(draft)} disabled={sending || !draft.trim()}>
							说
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};
