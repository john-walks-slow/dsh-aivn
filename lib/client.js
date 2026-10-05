window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var c=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var h=(e,a)=>{for(var n in a)c(e,n,{get:a[n],enumerable:!0})},w=(e,a,n,r)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of m(a))!y.call(e,s)&&s!==n&&c(e,s,{get:()=>a[s],enumerable:!(r=x(a,s))||r.enumerable});return e};var k=e=>w(c({},"__esModule",{value:!0}),e);var _={};h(_,{apply:()=>C,inject:()=>E});module.exports=k(_);var o=require("react");var g=`
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
`;var t=require("react/jsx-runtime"),S={connected:!1,actors:[],line:null,streaming:!1,stop:null};function f(e,a){return e.line?{...e,line:{...e.line,text:e.line.text+a}}:e}function N(e,a){if(a.type==="connection")return e.connected===a.connected?e:{...e,connected:a.connected};let n=a.event;switch(n.kind){case"scene":return{...e,sceneBg:n.bg??e.sceneBg};case"actor":{let r=e.actors.filter(s=>s.id!==n.id);return n.leave||r.push({id:n.id,pos:n.pos??"center",variant:n.variant}),{...e,actors:r}}case"say_start":return{...e,stop:null,streaming:!0,line:{kind:"say",speakerId:n.id,name:n.name,text:""}};case"say_text":return f(e,n.delta);case"say_end":return{...e,streaming:!1};case"narrate_start":return{...e,stop:null,streaming:!0,line:{kind:"narrate",text:""}};case"narrate_text":return f(e,n.delta);case"narrate_end":return{...e,streaming:!1};case"player_input":return{...e,stop:null,streaming:!1,line:{kind:"input",text:n.text}};case"stop":return{...e,streaming:!1,stop:{stopType:n.stopType,options:n.options??[],placeholder:n.placeholder}};default:return e}}var b=({sessionId:e})=>{let[a,n]=(0,o.useReducer)(N,S),[r,s]=(0,o.useState)(""),[d,v]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(!e)return;let i=new EventSource(`/aivn/stream?session=${encodeURIComponent(e)}`);return i.addEventListener("open",()=>n({type:"connection",connected:!0})),i.addEventListener("error",()=>n({type:"connection",connected:!1})),i.addEventListener("ir",p=>{try{let u=JSON.parse(p.data);n({type:"ir",event:u.event})}catch{}}),()=>i.close()},[e]);let l=async i=>{if(!(!i.trim()||d||!e)){v(!0);try{await fetch("/aivn/input",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session:e,text:i})}),s("")}catch{}finally{v(!1)}}};return(0,t.jsxs)("div",{className:"aivn-stage","data-session":e??"",children:[(0,t.jsx)("style",{children:g}),e?null:(0,t.jsx)("div",{className:"aivn-empty",children:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5267\u76EE\u3002"}),(0,t.jsx)("div",{className:"aivn-scene",children:a.sceneBg?(0,t.jsx)("span",{className:"aivn-scene-label",children:a.sceneBg}):null}),(0,t.jsxs)("div",{className:"aivn-status","data-state":a.connected?"online":"offline",children:[(0,t.jsx)("span",{className:"aivn-status-dot"}),(0,t.jsx)("span",{children:a.connected?"\u5DF2\u8FDE\u63A5":"\u6B63\u5728\u8FDE\u63A5\u2026"})]}),(0,t.jsx)("div",{className:"aivn-cast",children:a.actors.map(i=>(0,t.jsx)("div",{className:"aivn-actor","data-speaking":String(i.id===a.line?.speakerId),children:(0,t.jsxs)("span",{children:[i.id,i.variant?` \xB7 ${i.variant}`:""]})},i.id))}),(0,t.jsxs)("div",{className:"aivn-bottom",children:[a.line?(0,t.jsxs)("div",{className:"aivn-line",children:[a.line.kind==="say"&&a.line.name?(0,t.jsx)("div",{className:"aivn-plate",children:a.line.name}):null,(0,t.jsxs)("div",{className:"aivn-text","data-kind":a.line.kind,children:[a.line.text,a.streaming?(0,t.jsx)("span",{className:"aivn-caret"}):null]})]}):null,a.stop?(0,t.jsx)("div",{className:"aivn-choices",children:a.stop.options.map((i,p)=>(0,t.jsx)("button",{type:"button",className:"aivn-choice",onClick:()=>{l(i.text)},disabled:d,children:i.text},`${p}-${i.text}`))}):null,a.stop?.stopType==="free"||a.stop?.placeholder?(0,t.jsxs)("div",{className:"aivn-free",children:[(0,t.jsx)("input",{value:r,placeholder:a.stop?.placeholder??"\u8BF4\u70B9\u4EC0\u4E48\u2026",onChange:i=>s(i.target.value),onKeyDown:i=>{i.key==="Enter"&&l(r)}}),(0,t.jsx)("button",{type:"button",onClick:()=>{l(r)},disabled:d||!r.trim(),children:"\u8BF4"})]}):null]})]})};var E=["slots"];function C(e){e.slots.inject("conversation.view",()=>e.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"\u821E\u53F0"},b))}

		return module.exports;
	}
});