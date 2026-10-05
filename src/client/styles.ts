/**
 * 舞台视图的样式。类名一律带 `aivn-` 前缀，颜色只取 DSH 的主题 token，
 * 兜底色只在本机缺 token 时兜一手。整段以字符串导出，由视图自己注入，
 * 卸载时随之移除。
 */
export const STAGE_CSS = `
.aivn-stage {
	position: relative;
	height: 100%;
	min-height: 320px;
	overflow: hidden;
	background: var(--dsw-alias-bg-base, #101014);
	color: var(--dsw-alias-label-primary, #f5f5f7);
	font-family: inherit;
}

.aivn-scene {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(120% 90% at 50% 18%, rgba(255, 176, 96, 0.28), transparent 62%),
		linear-gradient(180deg, #2b2740 0%, #171423 58%, #0e0c16 100%);
}

.aivn-scene-label {
	position: absolute;
	left: 14px;
	top: 12px;
	padding: 3px 9px;
	border-radius: 999px;
	font-size: 11px;
	letter-spacing: 0.02em;
	color: var(--dsw-alias-label-secondary, #b9b6c4);
	background: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #1c1a24) 70%, transparent);
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
}

.aivn-status {
	position: absolute;
	right: 14px;
	top: 12px;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 3px 10px;
	border-radius: 999px;
	font-size: 11px;
	color: var(--dsw-alias-label-secondary, #b9b6c4);
	background: color-mix(in srgb, var(--dsw-alias-bg-layer-2, #1c1a24) 70%, transparent);
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
}

.aivn-status-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: var(--dsw-alias-brand-primary, #7c6cff);
}

.aivn-status[data-state="offline"] .aivn-status-dot {
	background: var(--dsw-alias-label-caption, #77727f);
}

.aivn-cast {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 168px;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 28px;
	padding: 0 24px;
	pointer-events: none;
}

.aivn-actor {
	width: 148px;
	height: 260px;
	border-radius: 16px 16px 10px 10px;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04));
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 12px;
	font-size: 12px;
	color: var(--dsw-alias-label-secondary, #b9b6c4);
	transition: opacity 220ms ease, transform 220ms ease;
	opacity: 0.55;
}

.aivn-actor[data-speaking="true"] {
	opacity: 1;
	transform: translateY(-6px);
	border-color: var(--dsw-alias-brand-primary, #7c6cff);
}

.aivn-bottom {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 18px 24px 22px;
	background: linear-gradient(180deg, transparent, rgba(8, 7, 12, 0.72) 46%);
}

.aivn-line {
	width: min(920px, 100%);
	min-height: 96px;
	border-radius: 14px;
	background: color-mix(in srgb, var(--dsw-alias-bg-layer-1, #16141c) 92%, transparent);
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
	padding: 16px 20px 18px;
}

.aivn-plate {
	display: inline-block;
	margin-bottom: 8px;
	padding: 2px 10px;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 600;
	color: #16141c;
	background: var(--dsw-alias-brand-primary, #7c6cff);
	box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary, #7c6cff);
}

.aivn-text {
	font-size: 16px;
	line-height: 1.75;
	white-space: pre-wrap;
	word-break: break-word;
}

.aivn-text[data-kind="narrate"] {
	color: var(--dsw-alias-label-secondary, #cfccd8);
	font-style: italic;
}

.aivn-text[data-kind="input"] {
	color: var(--dsw-alias-brand-text, #c9c2ff);
}

.aivn-caret {
	display: inline-block;
	width: 7px;
	height: 1.05em;
	margin-left: 2px;
	vertical-align: -0.18em;
	background: var(--dsw-alias-brand-primary, #7c6cff);
	animation: aivn-blink 1.05s steps(2, start) infinite;
}

@keyframes aivn-blink {
	to {
		visibility: hidden;
	}
}

.aivn-choices {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
	width: min(920px, 100%);
}

.aivn-choice {
	padding: 9px 16px;
	border-radius: 10px;
	font-size: 14px;
	color: var(--dsw-alias-label-primary, #f5f5f7);
	background: var(--dsw-alias-bg-layer-2, #1c1a24);
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
	cursor: pointer;
}

.aivn-choice:hover {
	border-color: var(--dsw-alias-brand-primary, #7c6cff);
}

.aivn-free {
	display: flex;
	gap: 8px;
	width: min(920px, 100%);
}

.aivn-free input {
	flex: 1;
	padding: 9px 14px;
	border-radius: 10px;
	font-size: 14px;
	color: var(--dsw-alias-label-primary, #f5f5f7);
	background: var(--dsw-alias-bg-layer-2, #1c1a24);
	border: 1px solid var(--dsw-alias-border-l2, #33303d);
	outline: none;
}

.aivn-free input:focus {
	border-color: var(--dsw-alias-brand-primary, #7c6cff);
}

.aivn-free button {
	padding: 9px 18px;
	border-radius: 10px;
	font-size: 14px;
	color: #16141c;
	background: var(--dsw-alias-brand-primary, #7c6cff);
	border: none;
	cursor: pointer;
}

.aivn-free button[disabled] {
	opacity: 0.45;
	cursor: default;
}
`;

/** 空态：这个会话还没有剧目（工作区里没有 play.json）。 */
export const EMPTY_CSS = `
.aivn-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--dsh-text-secondary, #8a8f98);
	font-size: 14px;
}
`;
