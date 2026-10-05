window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var er=Object.create;var ka=Object.defineProperty;var ar=Object.getOwnPropertyDescriptor;var tr=Object.getOwnPropertyNames;var or=Object.getPrototypeOf,rr=Object.prototype.hasOwnProperty;var nt=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},ur=(a,e)=>{for(var t in e)ka(a,t,{get:e[t],enumerable:!0})},it=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of tr(e))!rr.call(a,r)&&r!==t&&ka(a,r,{get:()=>e[r],enumerable:!(o=ar(e,r))||o.enumerable});return a};var sr=(a,e,t)=>(t=a!=null?er(or(a)):{},it(e||!a||!a.__esModule?ka(t,"default",{value:a,enumerable:!0}):t,a)),lr=a=>it(ka({},"__esModule",{value:!0}),a);var vo=nt(Z=>{"use strict";var Pr=require("react");function Bo(a){var e="https://react.dev/errors/"+a;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+a+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ge(){}var J={d:{f:ge,r:function(){throw Error(Bo(522))},D:ge,C:ge,L:ge,m:ge,X:ge,S:ge,M:ge},p:0,findDOMNode:null},Ar=Symbol.for("react.portal"),Dr=Symbol.for("react.recoverable"),Fo=Symbol.for("react.optimistic_key");function Mr(a,e,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ar,key:o==null?null:o===Fo?Fo:""+o,children:a,containerInfo:e,implementation:t}}var ha=Pr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Ma(a,e){if(a==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Z.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J;Z.browser=function(a){return{$$typeof:Dr,_reason:a}};Z.createPortal=function(a,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Bo(299));return Mr(a,e,null,t)};Z.flushSync=function(a){var e=ha.T,t=J.p;try{if(ha.T=null,J.p=2,a)return a()}finally{ha.T=e,J.p=t,J.d.f()}};Z.preconnect=function(a,e){typeof a=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,J.d.C(a,e))};Z.prefetchDNS=function(a){typeof a=="string"&&J.d.D(a)};Z.preinit=function(a,e){if(typeof a=="string"&&e&&typeof e.as=="string"){var t=e.as,o=Ma(t,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,u=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?J.d.S(a,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:u}):t==="script"&&J.d.X(a,{crossOrigin:o,integrity:r,fetchPriority:u,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Z.preinitModule=function(a,e){if(typeof a=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=Ma(e.as,e.crossOrigin);J.d.M(a,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&J.d.M(a)};Z.preload=function(a,e){if(typeof a=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,o=Ma(t,e.crossOrigin);J.d.L(a,t,{crossOrigin:o,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Z.preloadModule=function(a,e){if(typeof a=="string")if(e){var t=Ma(e.as,e.crossOrigin);J.d.m(a,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else J.d.m(a)};Z.requestFormReset=function(a){J.d.r(a)};Z.unstable_batchedUpdates=function(a,e){return a(e)};Z.useFormState=function(a,e,t){return ha.H.useFormState(a,e,t)};Z.useFormStatus=function(){return ha.H.useHostTransitionStatus()};Z.version="19.3.0"});var Oo=nt((Bd,qo)=>{"use strict";function Ro(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ro)}catch(a){console.error(a)}}Ro(),qo.exports=vo()});var zr={};ur(zr,{apply:()=>Vr,inject:()=>Gr});module.exports=lr(zr);var v=require("react");var c=require("react/jsx-runtime"),D=require("react");var ya="full";var Te="normal";var dr=["left","center","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"];function fr(a){return typeof a=="string"&&dr.includes(a)}var nr={l:"left",c:"center",r:"right"};function ir(a,e){return a<=0?[]:(a===2?["left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right","center"]:["center","left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"]).filter(o=>!e.has(o)).slice(0,a)}function ct(a,e=new Map){let t=new Map,o=a.filter(n=>!e.has(n)),r=new Set;for(let[n,l]of e)a.includes(n)&&r.add(l);let u=ir(o.length,r);o.forEach((n,l)=>{t.set(n,u[l]??"center")});for(let[n,l]of e)a.includes(n)&&t.set(n,l);return t}function pt(a){if(a===void 0)return null;let e=a.trim().toLowerCase();return e===""?null:fr(e)?e:nr[e]??null}var cr={full:{small:{landscape:{top:68,height:32},portrait:{top:66,height:34}},normal:{landscape:{top:18,height:132},portrait:{top:16,height:102}},large:{landscape:{top:14,height:168},portrait:{top:13,height:130}},huge:{landscape:{top:10,height:232},portrait:{top:10,height:178}}},half:{small:{landscape:{top:70,height:30},portrait:{top:68,height:32}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:13,height:126},portrait:{top:12,height:118}},huge:{landscape:{top:8,height:172},portrait:{top:8,height:156}}},square:{small:{landscape:{top:72,height:28},portrait:{top:70,height:30}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:12,height:130},portrait:{top:11,height:122}},huge:{landscape:{top:8,height:184},portrait:{top:8,height:164}}}};function Lt(a,e,t="bottom"){let o=cr[a??ya][e??Te];return{landscape:mt(o.landscape,e,t),portrait:mt(o.portrait,e,t)}}function mt(a,e,t){let u=t==="center"?"center":t==="top"?"top center":(e??Te)==="small"?"bottom center":"top center",n=t==="center"?50-a.height/2:t==="top"?0:a.top;return{top:ht(n),height:ht(a.height),origin:u}}function ht(a){return Math.round(a*100)/100}var pr=["nudge","stagger","jump","nod","bow","turn","shake","sway"];function wa(a){return typeof a=="string"&&pr.includes(a)}function xt(a){if(typeof a!="string")return null;let e=a.trim().toLowerCase();return wa(e)?`sprite-act-${e}`:null}function gt(a,e,t){let o=e.trim(),r={},u=n=>{n&&(n.framing&&(r.framing=n.framing),n.stature&&(r.stature=n.stature),n.anchor&&(r.anchor=n.anchor),n.title&&(r.title=n.title))};return u(a[o]),t!==void 0&&t.trim()!==""&&u(a[`${o}/${t.trim()}`]),r}function It(a,e={}){let t=e.sprite?.trim();return t||a}function ba(a,e=!1){return e?"\u8FD8\u6CA1\u5F00\u6F14\u2014\u2014\u6309\u753B\u9762\u4E0A\u7684\u300C\u5F00\u6F14\u300D\u5F00\u59CB\u3002":a?"\u5267\u4F5C\u5BB6\u6B63\u5728\u843D\u7B14\u2026":"\uFF08\u70B9\u51FB\u5F00\u59CB\uFF09"}function Oa(a){return a.hasView?{name:a.viewName,text:a.shown}:{name:null,text:ba(a.live)}}function Ea(a){return a.hold?!1:a.nextIsPlayerInput?(!a.hasCurrent||a.currentComplete)&&a.cursor<a.cueCount:!a.live||a.auto?!1:!a.hasCurrent&&a.cursor<a.cueCount}function Ua(a){let e={showContinueCard:!1,clickToContinue:!1};return a.ready?a.stopType==="pause"?{...e,clickToContinue:!0}:!a.isNoStop||a.stopType!==null?e:a.continueCardOn?{...e,showContinueCard:!0}:{...e,clickToContinue:!0}:e}var mr=0,Fe=class{lines=[];cues=[];openKey=null;scene="";reset(){this.lines.length=0,this.cues.length=0,this.openKey=null,this.scene=""}replaceText(e,t){let o=this.lines.find(r=>r.seq===e);return o?(o.text=t,!0):!1}apply(e,t){let o=()=>`l${mr+=1}`;switch(e.kind){case"scene":{this.openKey=null,this.scene=e.bg??this.scene,this.lines.push({key:o(),type:"scene",seq:t,text:[e.bg,e.bgm,e.ambient].filter(Boolean).join(" \xB7 ")}),this.cues.push({key:o(),kind:"scene",bg:e.bg,bgm:e.bgm,ambient:e.ambient,bgmVolume:e.bgm_volume,ambientVolume:e.ambient_volume,transition:e.transition});return}case"sfx":this.cues.push({key:o(),kind:"sfx",src:e.src,volume:e.volume});return;case"cg":this.cues.push({key:o(),kind:"cg",id:e.id,caption:e.caption});return;case"actor":this.cues.push({key:o(),kind:"actor",id:e.id,pos:e.pos,variant:e.variant,shot:e.shot,anchor:e.anchor,action:e.action,leave:e.leave});return;case"preload_asset":this.cues.push({key:o(),kind:"preload",id:e.id,type:e.type});return;case"say_start":{let r={key:o(),type:"say",actorId:e.id,...e.mood?{mood:e.mood}:{},...e.name?{nameOverride:e.name}:{},seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"narrate_start":{let r={key:o(),type:"narrate",seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"thought_start":{let r={key:o(),type:"thought",actorId:e.id,seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"say_text":case"narrate_text":case"thought_text":{let r=this.lines.at(-1);r&&r.key===this.openKey&&(r.text+=e.delta);return}case"say_end":case"narrate_end":case"thought_end":this.openKey=null;return;case"player_input":{let r={key:o(),type:"input",actorId:"player",seq:t,text:e.text};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=null;return}case"stop":return}}};function Pa(a,e){return e?a[e]??(e==="player"?"\u4F60":e):""}var C=require("react");function kt(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(u=>u.key===r.lineKey)?.nodeId===t)return o}return-1}function yt(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(u=>u.key===r.lineKey)?.seq===t)return o}return-1}function wt(a,e,t){let o=t.nodeId?kt(a,e,t.nodeId):typeof t.seq=="number"?yt(a,e,t.seq):-1;if(o<0)return{cueIndex:-1,shownLength:0};let r=a[o];if(r.kind!=="line")return{cueIndex:o,shownLength:0};let u=e.find(l=>l.key===r.lineKey),n=t.offset??t.len??0;return{cueIndex:o,shownLength:Math.min(n,u?.text.length??0)}}function hr(){return{resolvedPos:"center",variant:null,shot:null,anchor:null,action:null,actionSeq:0}}function bt(a,e){let t=!!e.leave||e.action==="exit"||e.action==="leave",o=a[e.id],r=t?o?{...a,[e.id]:{...o,leaving:!0}}:a:{...a,[e.id]:{...a[e.id]??hr(),pos:pt(e.pos)??a[e.id]?.pos,variant:e.variant??a[e.id]?.variant??null,shot:e.shot??a[e.id]?.shot??null,anchor:e.anchor??a[e.id]?.anchor??null,action:wa(e.action)?e.action:null,actionSeq:wa(e.action)?(a[e.id]?.actionSeq??0)+1:a[e.id]?.actionSeq??0,leaving:!1}},u=new Map;for(let[s,h]of Object.entries(r))h.pos&&!h.leaving&&u.set(s,h.pos);let n=Object.keys(r).filter(s=>!r[s].leaving),l=ct(n,u);return Object.fromEntries(Object.entries(r).map(([s,h])=>[s,{...h,resolvedPos:h.leaving?h.resolvedPos:l.get(s)??"center"}]))}function Na(a,e){let t=a?.actorId;return t&&e[t]?t:null}var Lr=6e5;function Pt(a){return a!=null&&a>0?a:Lr}var Aa={bg:null,bgm:null,ambient:null,transition:null,cg:null,sprites:{},pending:{}},xr=new Set(["none",""]);function Ha(a,e){return e===void 0?a:xr.has(e.trim().toLowerCase())?null:e}function _a(a,e){switch(e.kind){case"scene":return{...a,bg:e.bg??a.bg,transition:e.transition??"fade",cg:e.bg?null:a.cg};case"cg":return{...a,cg:{id:e.id,caption:e.caption}};case"actor":return{...a,cg:null,sprites:bt(a.sprites,e)};default:return a}}function At(a,e){let t=_a(a,e);switch(e.kind){case"scene":return{...t,bgm:Ha(t.bgm,e.bgm),ambient:Ha(t.ambient,e.ambient),bgmVolume:e.bgmVolume??t.bgmVolume,ambientVolume:e.ambientVolume??t.ambientVolume};case"preload":return e.type==="sprite"?t:{...t,pending:{...t.pending,[e.id]:{type:e.type,at:Date.now()}}};default:return t}}function gr(a){let e={};for(let[t,o]of Object.entries(a))o.leaving||(e[t]=o);return e}function Dt(a,e){let t=Aa;for(let o=0;o<e;o+=1)t=_a(t,a[o]);return{...t,sprites:gr(t.sprites)}}function Mt(a,e,t){let o=e?t?.get(e):void 0;return o?{...a,cg:{id:o}}:a}function Tt(a,e,t){return t?a?.nodeId??null:e?.nodeId??a?.nodeId??null}function Ft(a,e,t){let o=u=>{for(let n=0;n<a.length;n+=1){let l=a[n];if(l.kind==="line"&&l.lineKey===u)return n}return-1},r=e[t];if(!r)return null;if(r.kind==="line"){let u=o(r.key);return u<0?null:u}for(let u=t+1;u<e.length;u+=1){let n=e[u];if(n.kind!=="line")continue;let l=o(n.key);return l<0?null:l}return a.length}function Ct(a,e){for(let t=a.length-1;t>=0;t-=1)if(a[t].key===e)return t;return-1}function Ir(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}var Cr=new Set(["\u3002","\uFF01","\uFF1F","\u2026","\u2014","\u300D","\u300F"]),Sr=new Set(["\uFF0C","\u3001","\uFF1B","\uFF1A","\uFF09",".",",","!","?",";"]),Be=null;function St(){let a=Date.now();if(Be&&a-Be.at<250)return Be.value;let e=getComputedStyle(document.documentElement),t=(o,r)=>{let u=Number.parseInt(e.getPropertyValue(o),10);return Number.isFinite(u)&&u>=0?u:r};return Be={at:a,value:{char:t("--type-ms",35),short:t("--pause-short-ms",120),long:t("--pause-long-ms",240)}},Be.value}function kr(a,e){let t=a[e-1];if(!t)return St().char;let o=St();return Cr.has(t)?o.char+o.long:Sr.has(t)?o.char+o.short:o.char}function Ga(a,e,t){let[o,r]=(0,C.useState)(Aa),[u,n]=(0,C.useState)(null),[l,s]=(0,C.useState)(0),[h,b]=(0,C.useState)(!1),[S,g]=(0,C.useState)(null),[y,w]=(0,C.useState)(null),i=(0,C.useRef)(0),k=(0,C.useRef)(!t.resume),T=(0,C.useRef)(t.resumeAfterReset===!0),F=(0,C.useRef)(e);F.current=e;let B=t.transcript,U=(0,C.useRef)(B);U.current=B;let O=(0,C.useRef)({});O.current={onLineStart:t.onLineStart,onFastForward:t.onFastForward};let z=(0,C.useRef)(t.resumeAt??null);(0,C.useEffect)(()=>{t.resumeAt&&(z.current=t.resumeAt)},[t.resumeAt]);let L=u?F.current.find(m=>m.key===u)??null:null,I=t.turbo??!1,x=u?Ct(B,u):-1,N=y!==null?B[y]??null:L?Ir(L):null,Y=y!==null,X=Tt(N,L,Y),K=(0,C.useRef)(x);K.current=x;let we=(0,C.useCallback)(m=>{w(A=>{let _=U.current,G=K.current>=0?K.current:_.length-1,E=Math.max(0,Math.min((A??G)+m,G));return E>=G?null:E})},[]),te=(0,C.useCallback)(m=>{r(A=>At(A,m))},[]),ee=(0,C.useCallback)(()=>{for(;;){let m=a[i.current];if(!m)return;if(i.current+=1,m.kind==="line"){let A=F.current.find(_=>_.key===m.lineKey)??null;n(m.lineKey),s(A?.type==="input"?A.text.length:0),O.current.onLineStart?.(A);return}if(m.kind==="sfx"){g({key:m.key,src:m.src,volume:m.volume});continue}te(m)}},[a,te]),H=L!==null&&l>=L.text.length,de=L===null||H,re=a.length<=i.current&&(L===null||H),fe=(0,C.useCallback)(()=>{if(!de){s(L?.text.length??0),O.current.onFastForward?.();return}ee()},[de,L,ee]);(0,C.useEffect)(()=>{if(!L||l>=L.text.length)return;if(I){s(L.text.length),O.current.onFastForward?.();return}let m=setTimeout(()=>s(A=>A+1),kr(L.text,l));return()=>clearTimeout(m)},[L,l,I]),(0,C.useEffect)(()=>{if(!I||y!==null||L&&l<L.text.length||i.current>=a.length)return;let m=setTimeout(()=>ee(),30);return()=>clearTimeout(m)},[I,y,L,l,a,ee,t.revision]),(0,C.useEffect)(()=>{if(!h||I||t.hold)return;if(!L){if(i.current>=a.length)return;let G=setTimeout(()=>ee(),400);return()=>clearTimeout(G)}if(!H||!a[i.current])return;let A=Math.min(900+L.text.length*55,3200),_=setTimeout(()=>ee(),A);return()=>clearTimeout(_)},[h,L,H,a,ee,t.revision,t.hold,I]);let R=(0,C.useRef)(t.resetToken??0);(0,C.useEffect)(()=>{let m=t.resetToken??0;m!==R.current&&(R.current=m,i.current=0,n(null),s(0),w(null),r(Aa),k.current=!1,T.current=t.resumeAfterReset===!0,z.current=t.seekTo??null)},[t.resetToken,t.resumeAfterReset,t.seekTo]),(0,C.useEffect)(()=>{if(a.length<i.current){i.current=0,n(null),s(0),w(null),r(Aa);return}if(!k.current&&a.length>0){k.current=!0;let m=z.current;z.current=null;let A=m?wt(a,F.current,m):null,_=A?.cueIndex??-1;if(A&&_>=0){for(let ae=0;ae<=_;ae+=1)te(a[ae]);let E=a[_];i.current=_+1,E.kind==="line"&&(n(E.lineKey),s(A.shownLength));return}for(let E=0;E<a.length;E+=1)te(a[E]);i.current=a.length;let G=null;for(let E of a)E.kind==="line"&&(G=E.lineKey);if(G&&T.current){n(G);let E=F.current.find(ae=>ae.key===G);s(E?.text.length??0)}}},[t.revision,a,te]),(0,C.useEffect)(()=>{let m=L;!m||m.nodeId===void 0&&m.seq===void 0||O.current.onRead?.({nodeId:m.nodeId??"",offset:l,...m.seq!==void 0?{seq:m.seq}:{},len:l})},[L,l]),(0,C.useEffect)(()=>{let m=a[i.current],A=m?.kind==="line"&&(F.current.find(E=>E.key===m.lineKey)?.type??null)==="input";if(!Ea({live:t.live,auto:h,hold:t.hold===!0,hasCurrent:L!==null,currentComplete:L===null||l>=L.text.length,cursor:i.current,cueCount:a.length,nextIsPlayerInput:A}))return;let G=setTimeout(()=>ee(),80);return()=>clearTimeout(G)},[t.live,h,L,l,a,ee,t.revision,t.hold]);let be=Pt(t.assetsTtlMs);(0,C.useEffect)(()=>{if(Object.keys(o.pending).length===0)return;let m=setInterval(()=>{let A=Date.now();r(_=>{let G=Object.entries(_.pending).filter(([,ae])=>A-ae.at>=be).map(([ae])=>ae);if(G.length===0)return _;let E={..._.pending};for(let ae of G)delete E[ae];return{..._,pending:E}})},5e3);return()=>clearInterval(m)},[o.pending,be]);let P=(0,C.useCallback)(m=>{m.length!==0&&r(A=>{if(Object.keys(A.pending).length===0)return A;let _={...A.pending};for(let G of m)delete _[G];return{...A,pending:_}})},[]),W=(0,C.useMemo)(()=>B.slice(0,Math.max(x,0)).reverse(),[B,x]),q=(0,C.useMemo)(()=>{if(y===null)return null;let m=Ft(a,B,y);return m===null?null:{...Dt(a,m),bgm:o.bgm,ambient:o.ambient,bgmVolume:o.bgmVolume,ambientVolume:o.ambientVolume,pending:o.pending}},[y,a,B,o.bgm,o.ambient,o.bgmVolume,o.ambientVolume,o.pending]),ne=(0,C.useCallback)(m=>{let A=Ct(U.current,m);A<0||w(A>=K.current?null:A)},[]),oe=(0,C.useCallback)(()=>{w(null)},[]);return{visual:Mt(q??o,X,t.cgByNode),current:L,view:N,viewLength:Y?N?.text.length??0:l,shownLength:l,exhausted:re,auto:h,setAuto:b,advance:fe,scrub:we,scrubbed:Y,history:W,seek:ne,follow:oe,sfx:S,settleAssets:P}}function Va(a){return Math.min(1,Math.max(0,a))}function Bt(a){return new URL(a,location.href).href}var Ae=class{base;active=null;retired=null;ramps=new Map;constructor(e){this.base=e}set(e,t){let o=Va(t??this.base);if(e===null){this.retire();return}let r=Bt(e);if(this.active?.src===r){this.rampTo(this.active,o);return}this.retire();let u=new Audio(r);u.loop=!0,u.preload="auto",u.volume=0,this.active=u,u.play().catch(()=>{}),this.rampTo(u,o)}retire(){if(!this.active)return;let e=this.active;this.active=null,this.retired&&this.discard(this.retired),this.retired=e,this.rampTo(e,0,()=>this.discard(e))}discard(e){this.cancelRamp(e),e.pause(),e.removeAttribute("src"),e.load(),this.retired===e&&(this.retired=null)}rampTo(e,t,o){this.cancelRamp(e);let r=e.volume;if(Math.abs(t-r)<.01){e.volume=t,o?.();return}let u=Math.max(1,Math.round(1200/50)),n=0,l=window.setInterval(()=>{n+=1,e.volume=Va(r+(t-r)*(n/u)),!(n<u)&&(window.clearInterval(l),this.ramps.delete(e),o?.())},50);this.ramps.set(e,l)}cancelRamp(e){let t=this.ramps.get(e);t!==void 0&&(window.clearInterval(t),this.ramps.delete(e))}dispose(){for(let e of[this.active,this.retired])e&&this.discard(e);this.active=null,this.retired=null}},ve=class{playing=new Set;play(e,t=.7){if(this.playing.size>=6){let r=this.playing.values().next().value;r&&(this.playing.delete(r),r.pause())}let o=new Audio(Bt(e));o.volume=Va(t),o.addEventListener("ended",()=>this.playing.delete(o)),o.addEventListener("error",()=>this.playing.delete(o)),this.playing.add(o),o.play().catch(()=>this.playing.delete(o))}dispose(){for(let e of this.playing)e.pause();this.playing.clear()}};var Mo=require("react/jsx-runtime");var Da=require("react");var vt=a=>a?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Rt(a,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:vt(a),size:24,node:e,...t.length>0?{aliases:t}:{}}}var qt=a=>{let e="",t=!1;for(let o of a){if(o==="-"||o==="_"||o<=" "){t=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=t?o.toUpperCase():o,t=!1}return e};var Ot=a=>{let e=qt(a);return e.charAt(0).toUpperCase()+e.slice(1)};var qe=require("react");var Re=(...a)=>a.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();var ie={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function za(a){return a!=null}function Et(a,e={}){let t=e.attributeNames??{},o=g=>t[g]??g,r=a.size??a.width??ie.width,u=a.size??a.height??ie.height,n=a.aliases?.filter(g=>typeof g=="string"&&g.trim()!=="").map(g=>`lucide-${g}`)??[],l=[...a.name?[`lucide-${a.name}`]:[],...n],s=e.className?.split(" ").filter(Boolean)??[],h=e.includeDefaultClasses===!1?Re(...s):Re("lucide",...l,...s),b=e.absoluteStrokeWidth?Number(e.strokeWidth??ie["stroke-width"])*Number(a.size??a.width??ie.width)/Number(e.size??e.width??ie.width):e.strokeWidth??ie["stroke-width"];return["svg",{...Object.entries(ie).reduce((g,[y,w])=>(g[o(y)]=w,g),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&za(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&za(e.width)&&{[o("width")]:e.width},..."height"in e&&za(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:b,...h&&{[o("class")]:h},[o("viewBox")]:`0 0 ${r} ${u}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},a.node.map(g=>{let[y,w,i]=g,k=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...w}:w;return i?[y,k,i]:[y,k]})]}function Ut(a,e={}){return Et(a,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var Ht=a=>{for(let e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var De=require("react");var yr=(0,De.createContext)({});var Nt=()=>(0,De.useContext)(yr);var _t=(0,qe.forwardRef)(({color:a,size:e,width:t,height:o,strokeWidth:r,absoluteStrokeWidth:u,nonScalingStroke:n,className:l="",children:s,iconNode:h=[],icon:b={node:h,aliases:[],size:24},...S},g)=>{let{size:y=24,strokeWidth:w=2,absoluteStrokeWidth:i=!1,nonScalingStroke:k=!1,color:T="currentColor",className:F=""}=Nt()??{},B=!!s||Ht(S),[U,O,z=[]]=Ut(b,{color:a??T,width:t??e??y,height:o??e??y,strokeWidth:r??w,absoluteStrokeWidth:u??i,nonScalingStroke:n??k,className:Re(F,l),hasA11yProp:B,attributes:S});return(0,qe.createElement)(U,{ref:g,...O},[...z.map(([L,I])=>(0,qe.createElement)(L,I)),...Array.isArray(s)?s:[s]])});function d(a,e=[],t=[]){let o=typeof a=="string"?Rt(a,e,t):a,r=(0,Da.forwardRef)(({className:u,...n},l)=>(0,Da.createElement)(_t,{ref:l,icon:o,className:u,...n}));return o.name&&(r.displayName=Ot(o.name)),r}var Gt={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};Gt.node;var Oe=d(Gt);var Vt={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Vt.node;var Ee=d(Vt);var zt={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};zt.node;var Ue=d(zt);var Wt={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Wt.node;var He=d(Wt);var Xt={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};Xt.node;var Ne=d(Xt);var Kt={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};Kt.node;var _e=d(Kt);var $t={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};$t.node;var Ge=d($t);var jt={name:"corner-up-left",size:24,node:[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}],["path",{d:"M9 14 4 9l5-5",key:"102s5s"}]]};jt.node;var Me=d(jt);var Zt={name:"crosshair",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]};Zt.node;var Ve=d(Zt);var Qt={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};Qt.node;var ze=d(Qt);var Jt={name:"drama",size:24,node:[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]};Jt.node;var We=d(Jt);var Yt={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};Yt.node;var Xe=d(Yt);var eo={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};eo.node;var Ke=d(eo);var ao={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};ao.node;var $e=d(ao);var to={name:"image",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]};to.node;var je=d(to);var oo={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};oo.node;var Ze=d(oo);var ro={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};ro.node;var Qe=d(ro);var uo={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};uo.node;var Je=d(uo);var so={name:"messages-square",size:24,node:[["path",{d:"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",key:"1n2ejm"}],["path",{d:"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",key:"1qfcsi"}]]};so.node;var Ye=d(so);var lo={name:"mic",size:24,node:[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]};lo.node;var ea=d(lo);var fo={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};fo.node;var ce=d(fo);var no={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};no.node;var pe=d(no);var io={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};io.node;var aa=d(io);var co={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};co.node;var me=d(co);var po={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};po.node;var ta=d(po);var mo={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};mo.node;var oa=d(mo);var ho={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};ho.node;var ra=d(ho);var Lo={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};Lo.node;var ua=d(Lo);var xo={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};xo.node;var sa=d(xo);var go={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};go.node;var la=d(go);var Io={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Io.node;var he=d(Io);var Co={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};Co.node;var Le=d(Co);var So={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};So.node;var xe=d(So);var ko={name:"undo-2",size:24,node:[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]};ko.node;var da=d(ko);var yo={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};yo.node;var fa=d(yo);var wo={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};wo.node;var na=d(wo);var bo={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};bo.node;var ia=d(bo);var Po={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Po.node;var ca=d(Po);var Ao={name:"zoom-in",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Ao.node;var pa=d(Ao);var Do={name:"zoom-out",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Do.node;var ma=d(Do);var wr={back:Oe,exit:Ze,forward:Ee,plus:ra,close:ca,check:He,alert:xe,chat:Je,backlog:Ye,files:Xe,assets:je,users:fa,drama:We,craft:me,memory:Ue,settings:la,workshop:$e,expand:Qe,shrink:ce,unshrink:pe,refresh:sa,reply:Me,return:Me,download:ze,pencil:ta,undo:da,rewrite:ua,remove:Le,fork:Ke,sparkles:he,play:oa,pause:aa,volume:na,mic:ea,"volume-off":ia,prev:_e,down:Ne,up:Ge,zoomIn:pa,zoomOut:ma,locate:Ve};function V({name:a,size:e=15}){let t=wr[a];return(0,Mo.jsx)(t,{size:e,strokeWidth:1.75,"aria-hidden":"true",style:{display:"block"}})}var To=require("react"),br=[];function Wa(){return br.length>0}var ue=require("react/jsx-runtime"),La=require("react"),Eo=sr(Oo(),1);function xa({title:a,hint:e,onClose:t,dismissible:o=!0,children:r,footer:u,width:n=520}){let l=(0,La.useRef)(null);return(0,La.useEffect)(()=>{let h=l.current?.querySelector("input, textarea, button");h?.focus(),h instanceof HTMLInputElement&&h.select()},[]),(0,La.useEffect)(()=>{let s=h=>{h.key==="Escape"&&(h.stopPropagation(),o&&t())};return window.addEventListener("keydown",s,!0),()=>window.removeEventListener("keydown",s,!0)},[o,t]),(0,Eo.createPortal)((0,ue.jsx)("div",{className:"modal-scrim stage-root",role:"dialog","aria-modal":"true","aria-label":a,onClick:s=>{s.stopPropagation(),o&&t()},onTouchStart:s=>s.stopPropagation(),onTouchMove:s=>s.stopPropagation(),onTouchEnd:s=>s.stopPropagation(),children:(0,ue.jsxs)("div",{className:"modal-card",style:{width:n},ref:l,onClick:s=>s.stopPropagation(),children:[(0,ue.jsxs)("header",{className:"modal-head",children:[(0,ue.jsx)("h2",{className:"modal-title",children:a}),o&&(0,ue.jsx)("button",{type:"button",className:"modal-x",onClick:t,"aria-label":"\u5173\u95ED",children:"\u2715"})]}),e&&(0,ue.jsx)("p",{className:"modal-hint",children:e}),(0,ue.jsx)("div",{className:"modal-body",children:r}),u&&(0,ue.jsx)("footer",{className:"modal-foot",children:u})]})}),document.body)}var se=require("react/jsx-runtime");function Xa({candidates:a,selected:e,onToggle:t}){if(a.length===0)return(0,se.jsx)("div",{className:"ref-picker-empty muted small",children:"\u6682\u65E0\u53EF\u7528\u7ACB\u7ED8\u7684\u89D2\u8272\uFF08\u9700\u5148\u6709\u7ACB\u7ED8\u624D\u53EF\u4F5C\u4E3A\u57AB\u56FE\u53C2\u8003\uFF09"});let o=new Set(e),r=[...e.map(u=>a.find(n=>n.id===u)).filter(u=>!!u),...a.filter(u=>!o.has(u.id))];return(0,se.jsx)("div",{className:"ref-picker-grid",role:"group","aria-label":"\u9009\u62E9\u53C2\u8003\u7ACB\u7ED8\u89D2\u8272",children:r.map(u=>{let n=e.indexOf(u.id),l=n!==-1;return(0,se.jsxs)("button",{type:"button",className:`ref-picker-chip ${l?"selected":""}`,onClick:()=>t(u.id),title:l?`\u7B2C ${n+1} \u4F4D\u53C2\u8003\u56FE\uFF1A${u.name}\uFF08\u70B9\u51FB\u53D6\u6D88\uFF09`:`\u6DFB\u52A0\u53C2\u8003\uFF1A${u.name}`,"aria-pressed":l,children:[u.spriteUrl?(0,se.jsx)("img",{src:u.spriteUrl,alt:u.name,className:"ref-chip-thumb"}):(0,se.jsx)("span",{className:"ref-chip-blank",children:(0,se.jsx)(V,{name:"users",size:14})}),(0,se.jsx)("span",{className:"ref-chip-name",children:u.name}),l&&(0,se.jsx)("span",{className:"ref-chip-order",children:n+1})]},u.id)})})}function Ka(a,e){return a.includes(e)?a.filter(t=>t!==e):[...a,e]}function $a(a,e){return e?!0:a.trim().length>0}var ga={prompt:{title:"\u63D0\u793A",hint:"",placeholder:"\u5199\u4E00\u53E5\u2026",submit:()=>"\u53D1\u9001"},edit:{title:"\u6539\u5199\u8FD9\u53E5",hint:"\u53EA\u6539\u8FD9\u4E00\u53E5\uFF0C\u5267\u60C5\u7167\u65E7\u5F80\u4E0B\u8D70\u3002",placeholder:"\u6539\u5199\u8FD9\u53E5\u2026",submit:()=>"\u6539\u5199"},restart:{title:"\u91CD\u65B0\u751F\u6210",hint:"\u4ECE\u8FD9\u4E00\u8F6E\u5F00\u5934\u91CD\u5199\uFF1A\u539F\u6709\u5185\u5BB9\u6574\u6BB5\u7559\u4F5C\u65E7\u679D\uFF0C\u53EF\u4EE5\u4EA4\u4EE3\u4E00\u53E5\u8981\u6C42\uFF08\u7559\u7A7A\u5C31\u662F\u7EAF\u91CD\u5199\uFF09\u3002",placeholder:"\u60F3\u6362\u4EC0\u4E48\u65B9\u5411\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u91CD\u65B0\u751F\u6210 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u91CD\u65B0\u751F\u6210"},fork:{title:"\u5206\u5C94",hint:"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",placeholder:"\u65B0\u5206\u652F\u7684\u7B2C\u4E00\u53E5\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u5206\u5C94 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u5206\u5C94"},cg:{title:"\u751F\u6210\u63D2\u56FE",hint:"\u7559\u7A7A = \u6309\u521A\u624D\u8FD9\u4E00\u5E55\u6784\u56FE\u3002",placeholder:"\u60F3\u753B\u6210\u4EC0\u4E48\u6837\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:()=>"\u751F\u6210"}},Tr={guide:"\u6392\u8FDB\u961F\u5217\uFF0C\u968F\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1\u9001\u3002",fork:"\u4ECE\u6B63\u5728\u770B\u7684\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002"};function Uo(a){return a instanceof HTMLElement&&(a.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(a.tagName))}var Ta="OOC\uFF1A",Fr={wide:.86,normal:1,close:1.35,extreme:1.85};function Br({url:a,pos:e,name:t,framing:o,stature:r,shot:u,anchor:n,leaving:l,action:s,actionSeq:h,dim:b}){let[S,g]=(0,D.useState)(a),[y,w]=(0,D.useState)(null);(0,D.useEffect)(()=>{if(!a||a===S)return;let L=new Image,I;return L.onload=()=>{w(S),g(a),I=setTimeout(()=>w(null),260)},L.src=a,()=>{L.onload=null,I&&clearTimeout(I)}},[a,S]);let[i,k]=(0,D.useState)(!1),[T,F]=(0,D.useState)(0);if((0,D.useEffect)(()=>{if(!s){k(!1);return}k(!0),F(I=>I+1);let L=setTimeout(()=>k(!1),560);return()=>clearTimeout(L)},[s,h]),!S)return null;let B=`theater-sprite pos-${e}${l?" leaving":" entering"}${i?" acting":""}${b?" dim":""}`,U=Lt(o,r,n),O={"--scale":Fr[u??"normal"],"--sprite-top":`${U.landscape.top}%`,"--sprite-height":`${U.landscape.height}%`,"--sprite-origin":U.landscape.origin,"--sprite-top-portrait":`${U.portrait.top}%`,"--sprite-height-portrait":`${U.portrait.height}%`,"--sprite-origin-portrait":U.portrait.origin,"--sprite-act":xt(s)??"none","--act-nonce":`-${T%100/1e3}s`},z=()=>{w(null),g(null)};return(0,c.jsxs)(c.Fragment,{children:[y&&(0,c.jsx)("img",{className:`${B} sprite-out`,src:y,alt:"","aria-hidden":!0}),(0,c.jsx)("img",{className:B,style:O,src:S,alt:t,onError:z})]})}function ja({visual:a,playback:e,live:t,fresh:o,names:r,index:u,voiceAvailable:n,busy:l,targets:s,onPrompt:h,onEdit:b,onFork:S,onGenerateCg:g,onReplay:y,voiceState:w,voiceOn:i,onToggleVoice:k,onUnlock:T,onView:F,canContinue:B,onContinue:U,onTurbo:O,overlay:z,directorBar:L=!0}){let I=(0,D.useRef)(null);I.current||(I.current={bgm:new Ae(.28),ambient:new Ae(.16),sfx:new ve}),(0,D.useEffect)(()=>{let f=I.current;return()=>{f.bgm.dispose(),f.ambient.dispose(),f.sfx.dispose()}},[]);let[x,N]=(0,D.useState)(null),[Y,X]=(0,D.useState)(""),[K,we]=(0,D.useState)([]),[te,ee]=(0,D.useState)(!0),[H,de]=(0,D.useState)("guide"),[re,fe]=(0,D.useState)(!1),{view:R,viewLength:be,current:P,shownLength:W,exhausted:q,advance:ne,scrub:oe,scrubbed:m,follow:A}=e,_=R?R.text.slice(0,be):"",G=P!==null&&W>=P.text.length,E=Oa({viewName:R&&(R.type==="say"||R.type==="thought")?R.nameOverride??(Pa(r,R.actorId)||"\uFF1F"):null,shown:_,hasView:R!==null,live:t}),ae=!R&&o?ba(t,o):E.text,at=Na(R,a.sprites),Fa=(0,D.useCallback)(()=>{if(T(),re){fe(!1);return}m?oe(1):B?U():ne()},[T,re,m,oe,B,U,ne]),Ba=(0,D.useRef)(null),tt=(0,D.useRef)(null),ot=(0,D.useRef)(null);(0,D.useEffect)(()=>{let f=Ba.current,p=tt.current;if(!f||!p)return;let j=ot.current,Q=()=>{f.style.setProperty("--dialog-h",`${p.offsetHeight}px`),f.style.setProperty("--dir-h",`${j?.offsetHeight??0}px`)};Q();let Se=new ResizeObserver(Q);return Se.observe(p),j&&Se.observe(j),()=>Se.disconnect()},[L]),(0,D.useEffect)(()=>{let f=Ba.current;if(!f)return;let p=j=>{Math.abs(j.deltaY)<4||oe(j.deltaY>0?1:-1)};return f.addEventListener("wheel",p,{passive:!1}),()=>f.removeEventListener("wheel",p)},[oe]),(0,D.useEffect)(()=>{let f=p=>{if(!(p.metaKey||p.ctrlKey||p.altKey||Uo(p.target))&&!(p.key==="Escape"&&Wa())){if(re){(p.key==="h"||p.key==="H"||p.key===" "||p.key==="Escape")&&(fe(!1),p.preventDefault());return}p.key==="ArrowUp"||p.key==="ArrowLeft"?(oe(-1),p.preventDefault()):p.key==="ArrowDown"||p.key==="ArrowRight"?(oe(1),p.preventDefault()):p.key===" "?(x||Fa(),p.preventDefault()):p.key==="Escape"&&m?(oe(1),p.preventDefault()):p.key==="Escape"&&x?(N(null),X(""),p.preventDefault()):(p.key==="l"||p.key==="L")&&(F("backlog"),p.preventDefault())}};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[oe,m,x,F,re,Fa]),(0,D.useEffect)(()=>{let f=Q=>{Q.key==="Control"&&!Uo(Q.target)&&O(!0)},p=Q=>{Q.key==="Control"&&O(!1)},j=()=>O(!1);return window.addEventListener("keydown",f),window.addEventListener("keyup",p),window.addEventListener("blur",j),()=>{window.removeEventListener("keydown",f),window.removeEventListener("keyup",p),window.removeEventListener("blur",j)}},[O]);let va=(0,D.useRef)(null),jo=f=>{T();let p=f.touches[0];p&&(va.current={x:p.clientX,y:p.clientY,at:Date.now()})},Zo=f=>{let p=va.current;if(va.current=null,re||!p)return;let j=f.changedTouches[0];if(!j||Date.now()-p.at>800)return;let Q=j.clientX-p.x,Se=j.clientY-p.y;Math.abs(Q)<45&&Math.abs(Se)<45||(Math.abs(Q)>Math.abs(Se)?oe(Q>0?-1:1):Se<0&&F("backlog"))};(0,D.useEffect)(()=>{let f=e.sfx;if(!f)return;let p=u.sfx(f.src);p&&I.current.sfx.play(p,f.volume??.7)},[e.sfx,u]);let rt=u.bgm(a.bgm),ut=u.ambient(a.ambient);(0,D.useEffect)(()=>{I.current.bgm.set(rt,a.bgmVolume)},[rt,a.bgmVolume]),(0,D.useEffect)(()=>{I.current.ambient.set(ut,a.ambientVolume)},[ut,a.ambientVolume]);let Sa=u.bg(a.bg),Ra=u.cg(a.cg?.id??null),Qo=!Sa&&!!a.bg&&a.pending[a.bg]?.type==="bg",st=a.cg?.id??null,Jo=!Ra&&!!st&&a.pending[st]?.type==="cg",lt=()=>{let f=Y.trim(),p=x==="prompt"&&H==="fork"?"fork":x??"prompt";if(X(""),N(null),p==="prompt"){f&&h(f);return}if(p==="edit"){f&&s.lineNodeId&&b(s.lineNodeId,f);return}if(p==="cg"){g(f,{referenceCharacters:K.length>0?K:void 0,useHistory:te,anchorNodeId:m?s.lineNodeId??R?.nodeId??null:void 0});return}if(p==="restart"){if(!s.beatId)return;S(s.beatId,{resume:!0,...s.beatNodeId?{replaced:s.beatNodeId}:{},...f?{instruction:f}:{}});return}s.lineSeq!==null&&S(s.lineSeq,f?{instruction:f}:void 0)},Pe=w(R?.seq??null),dt=l?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u6539\u5199":s.lineNodeId?null:"\u8FD9\u91CC\u6CA1\u6709\u5267\u4F5C\u5BB6\u7684\u53F0\u8BCD\u53EF\u6539",ft=l?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u5199":s.beatId?null:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u9000\u56DE\u53BB\u7684\u4E00\u8F6E",qa=s.lineSeq===null?"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u5206\u5C94\u7684\u4F4D\u7F6E":null,Ce=x==="prompt"&&H==="fork"?"fork":x??"prompt",Yo=Ce==="edit"?Y.trim()===""||!s.lineNodeId:Ce==="prompt"?Y.trim()==="":Ce==="fork"?qa!==null:Ce==="restart"?s.beatId===null:Ce==="cg"?!$a(Y,te):!1;return(0,c.jsxs)("div",{className:`theater stage-root${re?" bare":""}`,ref:Ba,onClick:Fa,onTouchStart:jo,onTouchEnd:Zo,children:[(0,c.jsxs)("div",{className:`theater-stage${m?" rewinding":""}`,children:[Sa?(0,c.jsx)("img",{className:"theater-bg theater-bg-in",src:Sa,alt:""},Sa):(0,c.jsx)("div",{className:`theater-bg theater-bg-fallback ${Qo?"theater-bg-pending":""} ${a.transition==="cut"?"cut":""}`}),Object.entries(a.sprites).map(([f,p])=>{let j=u.spriteDirOf(f),Q=u.spritePresentation(j,p.variant);return(0,c.jsx)(Br,{url:u.sprite(j,p.variant),pos:p.resolvedPos,name:Pa(r,f),framing:Q.framing,stature:Q.stature,shot:p.shot,anchor:p.anchor??Q.anchor,leaving:p.leaving===!0,action:p.action,actionSeq:p.actionSeq,dim:at!==null&&at!==f},f)}),Ra&&(0,c.jsxs)("div",{className:"theater-cg",children:[(0,c.jsx)("img",{className:"theater-cg-in",src:Ra,alt:a.cg?.id??""}),a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})]}),Jo&&(0,c.jsx)("div",{className:"theater-cg theater-cg-pending","aria-label":"\u63D2\u56FE\u751F\u6210\u4E2D",children:a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})})]}),!re&&z,L&&(0,c.jsxs)("div",{className:"theater-director",ref:ot,children:[(0,c.jsxs)("button",{type:"button",className:`dir-btn ${x==="prompt"?"on":""}`,title:"\u8F93\u5165\u89D2\u8272\u7684\u884C\u52A8\u3001\u53F0\u8BCD\uFF0C\u6216\u7ED9\u8FD9\u573A\u620F\u7684\u6307\u793A","aria-label":"\u63D0\u793A",onClick:f=>{f.stopPropagation(),N(x==="prompt"?null:"prompt"),X("")},children:[(0,c.jsx)(V,{name:"chat",size:17}),"\u63D0\u793A"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${x==="edit"?"on":""}`,title:dt??"\u7F16\u8F91\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD","aria-label":"\u6539\u5199\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD",disabled:dt!==null,onClick:f=>{f.stopPropagation(),N(x==="edit"?null:"edit"),X(s.lineText)},children:[(0,c.jsx)(V,{name:"pencil",size:17}),"\u6539\u5199"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${x==="restart"?"on":""}`,title:ft??"\u91CD\u5199\uFF1A\u9000\u5230\u8FD9\u4E00\u8F6E\u4E4B\u524D\uFF0C\u8BA9\u5267\u4F5C\u5BB6\u91CD\u65B0\u5199\u4E00\u904D\uFF08\u539F\u6709\u5185\u5BB9\u7559\u4F5C\u65E7\u679D\uFF09","aria-label":"\u91CD\u5199\u8FD9\u4E00\u8F6E",disabled:ft!==null,onClick:f=>{f.stopPropagation(),N(x==="restart"?null:"restart"),X("")},children:[(0,c.jsx)(V,{name:"rewrite",size:17}),"\u91CD\u5199"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${x==="cg"?"on":""}`,title:o?"\u8FD8\u6CA1\u6709\u5267\u60C5\u53EF\u4EE5\u5165\u753B":"\u4E3A\u8FD9\u4E00\u5E55\u751F\u6210\u4E00\u5F20\u63D2\u56FE\uFF08\u6307\u4EE4\u53EF\u7559\u7A7A\uFF09","aria-label":"\u751F\u6210\u63D2\u56FE",disabled:o,onClick:f=>{f.stopPropagation(),x==="cg"?N(null):(N("cg"),X(""),we([]),ee(!0))},children:[(0,c.jsx)(V,{name:"assets",size:17}),"\u751F\u56FE"]}),n&&Pe!=="none"&&(0,c.jsxs)("button",{type:"button",className:`dir-btn ${Pe==="pending"?"voice-pending":""}`,title:Pe==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":i?"\u91CD\u542C\u8FD9\u53E5":"\u8BED\u97F3\u5DF2\u5173\uFF0C\u5148\u6253\u5F00\u8BED\u97F3\u518D\u91CD\u542C","aria-label":Pe==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":"\u91CD\u542C\u8FD9\u53E5",disabled:Pe==="pending"||!i,onClick:f=>{f.stopPropagation(),Pe==="ready"&&R?.seq!==null&&R?.seq!==void 0&&y(R.seq)},children:[(0,c.jsx)(V,{name:"volume",size:17}),"\u91CD\u542C"]})]}),(0,c.jsxs)("div",{className:"theater-dialog",role:"text",ref:tt,children:[E.name&&(0,c.jsx)("div",{className:"dialog-name",children:E.name}),(0,c.jsxs)("p",{className:`dialog-text ${R?.type==="thought"?"thought":R?.type==="narrate"?"narrate":""} ${m?"rewinding":""}`,children:[ae,R&&!m&&!G&&(0,c.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]}),(0,c.jsxs)("div",{className:"dialog-foot",children:[(0,c.jsx)("div",{className:"dialog-hint dialog-hint-foot",children:m?(0,c.jsxs)("button",{type:"button",className:"dialog-rewind",onClick:A,title:"\u56DE\u5230\u6700\u65B0",children:[(0,c.jsx)(V,{name:"prev"}),"\u56DE\u770B\u4E2D"]}):x?null:(0,c.jsxs)(c.Fragment,{children:[t&&(0,c.jsx)("span",{className:"dialog-spinner","aria-label":"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199"}),G&&(!q||B)&&(0,c.jsx)("span",{className:"dialog-next","aria-hidden":!0,children:"\u25BC"}),B&&(0,c.jsx)("span",{className:"muted",children:"\u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210"})]})}),(0,c.jsxs)("div",{className:"dialog-options",children:[(0,c.jsx)("button",{type:"button",className:`dir-btn ${e.auto?"tgl-on":""}`,title:e.auto?"Auto-play: on (tap to turn off)":"Auto-play: off (tap to turn on)","aria-pressed":e.auto,onClick:f=>{f.stopPropagation(),e.setAuto(!e.auto)},children:e.auto?"Auto":"Manual"}),n&&(0,c.jsx)("button",{type:"button",className:`dir-btn ${i?"tgl-on":""}`,title:i?"Voice: on (tap to turn off)":"Voice: off (tap to turn on)","aria-pressed":i,onClick:f=>{f.stopPropagation(),k()},children:i?"VOICE":"MUTED"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Rewind one line (\u2190)",disabled:!m&&e.history.length===0,onClick:f=>{f.stopPropagation(),oe(-1)},children:"BACK"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Hide the interface \u2014 tap the picture or press H / Space to bring it back",onClick:f=>{f.stopPropagation(),N(null),X(""),fe(!0)},children:"HIDE"})]})]}),x&&(0,c.jsxs)(xa,{title:x==="prompt"?"\u63D0\u793A":ga[x].title,hint:x==="prompt"?Tr[H]:ga[x].hint,onClose:()=>N(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{type:"button",className:"primary",onClick:lt,disabled:Yo,children:ga[Ce].submit(Y.trim())}),(0,c.jsx)("button",{type:"button",className:"ghost-btn",onClick:()=>N(null),children:"\u53D6\u6D88"})]}),children:[x==="prompt"&&(0,c.jsxs)("div",{className:"seg guide-seg",children:[(0,c.jsx)("button",{type:"button",className:`seg-btn ${H==="guide"?"active":""}`.trim(),"aria-pressed":H==="guide",title:"\u8DDF\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1",onClick:()=>de("guide"),children:"\u5F15\u5BFC"}),(0,c.jsx)("button",{type:"button",className:`seg-btn ${H==="fork"?"active":""}`.trim(),"aria-pressed":H==="fork",title:qa??"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",disabled:qa!==null,onClick:()=>de("fork"),children:"\u5206\u5C94"})]}),x==="cg"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"image-gen-field",children:[(0,c.jsx)("span",{className:"image-gen-label",children:"\u53C2\u8003\u7ACB\u7ED8\uFF08\u6309\u70B9\u9009\u987A\u5E8F\u57AB\u56FE\uFF09\uFF1A"}),(0,c.jsx)(Xa,{candidates:u.spriteIds.map(f=>({id:f,name:u.spriteName(f)??r[f]??f,spriteUrl:u.sprite(f,null)})).filter(f=>!!f.spriteUrl),selected:K,onToggle:f=>we(p=>Ka(p,f))})]}),(0,c.jsxs)("label",{className:"image-gen-checkbox",children:[(0,c.jsx)("input",{type:"checkbox",checked:te,onChange:f=>ee(f.target.checked)}),(0,c.jsx)("span",{children:"\u57FA\u4E8E\u521A\u624D\u6F14\u5230\u7684\u5267\u60C5\u4E0E\u573A\u666F"})]})]}),(0,c.jsxs)("div",{className:"director-input",children:[x==="prompt"&&(0,c.jsx)("button",{type:"button",className:`ooc-shortcut ${Y.startsWith(Ta)?"on":""}`,title:"\u4EE5 OOC \u5F00\u5934 = \u8DF3\u51FA\u89D2\u8272\uFF0C\u76F4\u63A5\u4E0B\u6307\u4EE4","aria-label":"\u4EE5 OOC \u524D\u7F00\u7ED9\u5267\u4F5C\u5BB6\u4E0B\u6307\u4EE4",onClick:()=>X(f=>f.startsWith(Ta)?f.slice(Ta.length):Ta+f),children:"OOC\uFF1A"}),(0,c.jsx)("input",{value:Y,placeholder:x==="prompt"?ga[Ce].placeholder:ga[x].placeholder,onChange:f=>X(f.target.value),onKeyDown:f=>{f.key==="Enter"&&lt()}})]})]})]})]})}var M=require("react/jsx-runtime"),Ie=require("react");var Ho={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()},vr="\u81EA\u7531\u8F93\u5165";function Za({stop:a,isNoStop:e,showContinue:t,disabled:o,seenChoices:r,onChoice:u,onFree:n,onContinue:l,onPolish:s}){let[h,b]=(0,Ie.useState)(""),[S,g]=(0,Ie.useState)(!1),[y,w]=(0,Ie.useState)(null),[i,k]=(0,Ie.useState)(!1),[T,F]=(0,Ie.useState)(null);(0,Ie.useEffect)(()=>{g(!1),b(""),w(null),F(null)},[a,e]);let B=a?.stopType==="choice"?a.options??[]:[],U=B.length>0||a?.stopType==="free",O=()=>{let I=h.trim();I&&(n(I),b(""),w(null),F(null),g(!1))},z=()=>{if(!s)return;let I=(y??h).trim();!I||i||(k(!0),F(null),s(I).then(x=>{w(I),b(x)}).catch(x=>F(x.message)).finally(()=>k(!1)))},L=()=>{y!==null&&(b(y),w(null),F(null))};return(0,M.jsxs)(M.Fragment,{children:[U&&!S&&(0,M.jsxs)("div",{className:"choice-overlay",role:"group","aria-label":"\u9009\u9879",...Ho,children:[B.map((I,x)=>(0,M.jsxs)("button",{type:"button",className:"choice",disabled:o,onClick:()=>u(x),children:[(0,M.jsx)("span",{className:"choice-text",children:I.text}),r?.has(I.text)&&(0,M.jsxs)("span",{className:"choice-seen",children:[(0,M.jsx)(V,{name:"check"})," \u5DF2\u9009\u8FC7"]})]},`${x}-${I.text}`)),(0,M.jsx)("button",{type:"button",className:"choice ghost",disabled:o,onClick:()=>g(!0),title:"\u4E0D\u8BF4\u9009\u9879\uFF0C\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5",children:(0,M.jsx)("span",{className:"choice-text",children:vr})})]}),S&&(0,M.jsx)(xa,{title:"\u81EA\u7531\u8F93\u5165",hint:"\u4EE5\u4E3B\u89D2\u53E3\u543B\u5199\u4E00\u53E5\u3002",width:560,onClose:()=>g(!1),footer:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)("button",{type:"button",className:"ghost-btn free-back",onClick:()=>g(!1),disabled:o,title:"\u4E0D\u81EA\u5DF1\u5199\u4E86\uFF0C\u56DE\u53BB\u9009",children:[(0,M.jsx)(V,{name:"prev",size:14}),"\u8FD4\u56DE\u9009\u9879"]}),T&&(0,M.jsxs)("span",{className:"muted small",children:["\u6DA6\u8272\u5931\u8D25\uFF1A",T]}),(0,M.jsx)("button",{type:"button",className:"primary",onClick:O,disabled:o||h.trim()==="",children:"\u8BF4"})]}),children:(0,M.jsxs)("div",{className:"free-box",children:[(0,M.jsx)("input",{value:h,placeholder:a?.stopType==="free"?a.placeholder??"\u4F60\u7684\u56DE\u5E94\u2026":"\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5\u2026",onChange:I=>b(I.target.value),onKeyDown:I=>I.key==="Enter"&&O(),disabled:o}),s&&(0,M.jsxs)("button",{type:"button",className:"ghost-btn",title:"LLM \u6309\u4E3B\u89D2\u53E3\u543B\u6DA6\u8272\uFF08\u53EF\u64A4\u9500\uFF09",onClick:z,disabled:o||i||h.trim()==="",children:[(0,M.jsx)(V,{name:"sparkles"}),i?"\u6DA6\u8272\u4E2D\u2026":"\u6DA6\u8272"]}),y!==null&&(0,M.jsxs)("button",{type:"button",className:"link-btn",onClick:L,disabled:i,title:"\u9000\u56DE\u6DA6\u8272\u524D\u7684\u539F\u8BDD",children:[(0,M.jsx)(V,{name:"undo"}),"\u64A4\u9500"]})]})}),e&&t&&!a&&(0,M.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u7EE7\u7EED",...Ho,children:(0,M.jsx)("div",{className:"choices",children:(0,M.jsxs)("button",{type:"button",className:"choice",onClick:l,disabled:o,children:[(0,M.jsx)(V,{name:"forward"}),"\uFF08\u7EE7\u7EED\uFF09"]})})})]})}var No=require("react/jsx-runtime");var ke=require("react/jsx-runtime"),le=require("react");var Rr=3600;function Qa(){let[a,e]=(0,le.useState)([]),t=(0,le.useRef)(1),o=(0,le.useRef)(new Map),r=(0,le.useCallback)(l=>{let s=o.current.get(l);s&&clearTimeout(s),o.current.delete(l),e(h=>h.filter(b=>b.id!==l))},[]),u=(0,le.useCallback)((l,s="info")=>{if(!l)return;let h=t.current;t.current+=1,e(b=>[...b.slice(-2),{id:h,text:l,kind:s}]),o.current.set(h,setTimeout(()=>r(h),Rr))},[r]),n=o;return(0,le.useEffect)(()=>{let l=n.current;return()=>{for(let s of l.values())clearTimeout(s);l.clear()}},[n]),{toasts:a,push:u,dismiss:r}}function Ja({toasts:a,onDismiss:e}){return a.length===0?null:(0,ke.jsx)("div",{className:"toast-stack stage-root",role:"status","aria-live":"polite",children:a.map(t=>(0,ke.jsxs)("button",{type:"button",className:`toast toast-${t.kind}`,onClick:()=>e(t.id),title:"\u70B9\u6389",children:[t.kind==="info"?(0,ke.jsx)(V,{name:"check"}):(0,ke.jsx)(V,{name:"alert"}),(0,ke.jsx)("span",{children:t.text})]},t.id))})}function Ia(a){let e=new Map;for(let t of a??[]){let o=t.lastIndexOf(".");e.set(o===-1?t:t.slice(0,o),t)}return e}function Ya(a,e,t={},o={},r=[],u={}){let n=Ia(e.backgrounds),l=Ia(e.cg),s=Ia(e.bgm),h=Ia(e.sfx),b=u.assetUrl??(i=>`/plays/${a}/assets/${i}`),S=(i,k)=>b(`${i}/${k}`),g=(i,k)=>T=>{let F=T?i.get(T):void 0;if(F)return S(k,F);let B=T?t[T]:void 0;return B?.ready?B.url:null},y=new Map,w=new Map;for(let i of r){if(!i.id)continue;let k=It(i.id,i);k!==i.id&&y.set(i.id,k),w.has(k)||w.set(k,i.name??i.id)}return{bg:g(n,"backgrounds"),cg:g(l,"cg"),bgm:g(s,"bgm"),sfx:g(h,"sfx"),ambient:i=>g(h,"sfx")(i)??g(s,"bgm")(i),spriteDirOf:i=>y.get(i)??i,spriteName:i=>w.get(i)??null,spriteIds:Object.keys(e).filter(i=>i.startsWith("sprites/")&&(e[i]?.length??0)>0).map(i=>i.slice(8)).sort(),sprite:(i,k)=>{let T=e[`sprites/${i}`]??[],F=(k?Ia(T).get(k):void 0)??T[0];return F?S(`sprites/${i}`,F):null},spritePresentation:(i,k)=>{let T=gt(o,i,k??void 0);return{framing:T.framing??ya,stature:T.stature??Te,anchor:T.anchor??"bottom"}}}}var qr=new Set(["say","narrate","thought"]),_o=new Set(["say","narrate","thought","input"]);function et(a,e){return a?Er(Or(a,e),e):e.filter(t=>_o.has(t.type)&&t.text!=="").map(Go)}function Go(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="sfx"||a.type==="cg"||a.type==="scene"?"narrate":a.type,actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}function Or(a,e){let t=new Map(a.nodes.map(l=>[l.id,l])),o=new Map;for(let l of e)l.seq!==void 0&&o.set(l.seq,l);let r=e.filter(l=>l.type==="input"),u=[],n=a.pathIds;for(let l=0;l<n.length;l+=1){let s=t.get(n[l]);if(!s)continue;if(qr.has(s.kind)){let S=s.seq===void 0?void 0:o.get(s.seq);u.push({key:S?.key??s.id,kind:"line",type:s.kind,actorId:s.attrs.id??S?.actorId??null,...S?.nameOverride?{nameOverride:S.nameOverride}:{},text:S?.text||s.text,seq:s.seq??null,nodeId:s.id});continue}if(s.kind!=="prompt")continue;let h=s.text;if(!h)continue;let b=s.seq===void 0?void 0:o.get(s.seq);if(b){let S=r.indexOf(b);S>=0&&r.splice(S,1)}else{let S=r.findIndex(g=>g.text===h);S>=0&&(b=r.splice(S,1)[0])}u.push({key:b?.key??s.id,kind:"input",type:"say",actorId:"player",text:b?.text||h,seq:s.seq??b?.seq??null,nodeId:s.id})}return u}function Er(a,e){let t=new Set(a.map(o=>o.key));for(let o of e)!_o.has(o.type)||o.text===""||t.has(o.key)||(a.push(Go(o)),t.add(o.key));return a}var Vo=require("react");var Ur=require("react");var zo=`/* @aivn/stage \u7684\u821E\u53F0\u6837\u5F0F\uFF1A\u4ECE apps/web/src/app.css \u539F\u6837\u642C\u6765\u7684\u5C0F\u8282\u3002
 *
 * \u8FD9\u4E00\u5C42\u8981\u80FD\u5D4C\u8FDB\u522B\u4EBA\u7684\u9875\u9762\uFF08DSH \u63D2\u4EF6\u7684\u5BBF\u4E3B\u9875\uFF09\uFF0C\u6240\u4EE5\u9876\u90E8\u7684\u4EE4\u724C\u4E0E\u5168\u5C40\u89C4\u5219
 * \u4E00\u5F8B\u6302\u5728\u5305\u81EA\u5DF1\u7684\u6839\u7C7B \`.stage-root\` \u4E0A\uFF0C\u4E0D\u5199 \`:root\`\uFF1A\`:root\` \u662F\u6574\u9875\u7EA7\u7684\uFF0C
 * \u5199\u4E0A\u53BB\u5C31\u662F\u628A --bg/--panel/--ink/--accent \u8FD9\u4E9B\u901A\u7528\u540D\u585E\u8FDB\u5BBF\u4E3B\u7684\u6839\u5143\u7D20\uFF0C
 * \u8FD8\u4F1A\u8FDE\u5E26\u6539\u6389\u6574\u9875\u7684\u7126\u70B9\u6846\u4E0E\u9009\u4E2D\u8272\u3002\u6302 \`.stage-root\` \u540E\u4EE4\u724C\u9760 DOM \u7EE7\u627F\u5F80\u4E0B\u8D70\uFF0C
 * \u4F5C\u7528\u8303\u56F4\u5C31\u662F\u5E26\u8FD9\u4E2A\u7C7B\u7684\u5B50\u6811\u3002
 *
 * \u5E26 \`.stage-root\` \u7684\u662F\u5404\u7EC4\u4EF6**\u53EF\u4EE5\u8131\u79BB .theater \u72EC\u7ACB\u5B58\u5728**\u7684\u6839\uFF1A
 * StageTheater \u7684 \`.theater\`\u3001ToastStack \u7684 \`.toast-stack\`\u3001Modal portal \u51FA\u6765\u7684
 * \`.modal-scrim\`\uFF08portal \u5230 body\uFF0C\u7EE7\u627F\u94FE\u65AD\u4E86\uFF0C\u5FC5\u987B\u81EA\u5DF1\u5E26\uFF09\u3002
 *
 *  - \u53F0\u8BCD\u6D41\u4E00\u8282\u662F P1 \u6587\u5B57\u89C6\u56FE\u7559\u4E0B\u7684\u6837\u5F0F\uFF0C\u773C\u4E0B\u6CA1\u6709\u7EC4\u4EF6\u5F15\u7528\u5B83\uFF0C\u539F\u6837\u4FDD\u7559\u4E0D\u5220\u3002
 *  - \u5BFC\u6F14\u680F\u3001\u79FB\u52A8\u7AEF\u7B49\u5C0F\u8282\u4ECD\u7559\u5728\u5BBF\u4E3B app.css \u91CC\uFF0C\u4E0D\u5728\u8FD9\u6B21\u642C\u5BB6\u7684\u8303\u56F4\u5185\u3002
 */

/* \u2500\u2500 \u4E3B\u9898\u4EE4\u724C\uFF08app.css \u9876\u90E8\u53D8\u91CF\u533A\u7684\u526F\u672C\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.stage-root,
.stage-root * {
  box-sizing: border-box;
  /* \u89E6\u6478\u8BBE\u5907\u4E0A\u6D4F\u89C8\u5668\u7ED9\u6BCF\u4E2A\u53EF\u70B9\u5143\u7D20\u94FA\u4E00\u5C42\u534A\u900F\u660E\u84DD\u5E95\uFF0C\u624B\u6307\u70B9\u4E0B\u53BB\u95EA\u4E00\u4E0B\u3002
     \u90A3\u5C42\u84DD\u662F\u7F51\u9875\u5473\uFF0C\u53BB\u6389\u540E\u70B9\u4E0B\u53BB\u53EA\u5269\u5143\u7D20\u81EA\u5DF1\u7684\u53CD\u9988\u8272\u3002 */
  -webkit-tap-highlight-color: transparent;
}

/* \u7126\u70B9\u6846\u53EA\u7559\u7ED9\u952E\u76D8 Tab\uFF0C\u4E14\u8D70\u4E3B\u9898\u8272\u7EC6\u73AF\uFF1B\u9F20\u6807\u70B9\u3001\u624B\u6307\u70B9\u90FD\u4E0D\u51FA\u6846\u3002
   \u4E24\u8005\u4E00\u8D77\u4E0A\uFF1A\u53EA\u53BB outline\uFF0C\u7EAF\u952E\u76D8\u64CD\u4F5C\u4F1A\u778E\uFF1B\u53EA\u7559\u6D4F\u89C8\u5668\u9ED8\u8BA4\u6846\uFF0C\u53C8\u50CF\u5728\u586B\u7F51\u9875\u8868\u5355\u3002 */
.stage-root :focus {
  outline: none;
}

.stage-root :focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}

/* \u9009\u4E2D\u6587\u5B57\u65F6\u6D4F\u89C8\u5668\u94FA\u7684\u4E5F\u662F\u90A3\u5C42\u7F51\u9875\u84DD\uFF08\u624B\u673A\u4E0A\u957F\u6309/\u53CC\u51FB\u6700\u5BB9\u6613\u649E\u4E0A\uFF09\u3002
   \u6362\u6210\u4E3B\u9898\u8272\u7684\u6DE1\u5E95\uFF0C\u9009\u8BCD\u4E0E\u590D\u5236\u7167\u5E38\u80FD\u7528\u3002 */
.stage-root ::selection {
  background: var(--accent-soft);
  color: var(--ink);
}

.stage-root {
  /* \u2460 \u7EB8\u9762\uFF08\u6D45\u8272\u65E5\u5E38\u7CFB\uFF09 */
  --bg: #f5f1e8; /* \u548C\u7D19 */
  --panel: #fffcf5;
  --panel-2: #ede7da;
  /* \u7EB8\u9762\u5DE6\u4E0A\u89D2\u90A3\u7247\u659C\u5149\uFF1A\u6D45\u8272\u4E0B\u662F\u6696\u767D\uFF0C\u548C\u7EB8\u611F\u5C31\u6765\u81EA\u5B83 */
  --paper-glow: rgb(255 252 245 / 0.9);
  --ink: #23201c;
  --ink-soft: #5b5348;
  --ink-faint: #9a9081;
  --line: #ded5c4;
  --accent: #3f6b93; /* \u51B7\u84DD */
  --accent-ink: #f7fbff;
  --accent-soft: #dde7f0;
  --link: #2f5d7c;
  --radius: 2px; /* \u8FD1\u76F4\u89D2\uFF1AAVG \u7684\u7A97\u4E0E\u952E\u90FD\u4E0D\u5706 */

/* \u5B57\u4F53\uFF1A\u5168\u7AD9\u4E00\u5957\u65E0\u886C\u7EBF\u3002\u66FE\u7ECF\u53F0\u8BCD\u4E0E\u6807\u9898\u8D70\u886C\u7EBF\uFF08\u660E\u671D\u6C14\u8D28\uFF09\uFF0C\u4F46\u886C\u7EBF\u5B57\u4F53\u6808\u4F9D\u8D56
     \u672C\u673A\u88C5\u6709 Noto Serif CJK / \u5B8B\u4F53\uFF0C\u7F3A\u4E86\u4F1A\u6389\u5230\u6D4F\u89C8\u5668\u9ED8\u8BA4\u7684 serif\uFF0C\u7B14\u753B\u7EC6\u3001\u5C4F\u4E0A\u53D1\u865A\u3002 */
  --font-ui:
    system-ui, -apple-system, "Segoe UI", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei",
    sans-serif;

  /* \u2461 \u753B\u9762\uFF08\u6697\u8272\u4E3A\u9ED8\u8BA4\u57FA\u7EBF\uFF1B\u4EAE/\u6697\u4E24\u5957\u821E\u53F0\u53D8\u91CF\u7531 useTheme \u5728\u8FD0\u884C\u65F6\u6539\u5199\u540C\u4E00\u6279\u952E\uFF09 */
  --stage-bg: #17130f; /* \u821E\u53F0\u886C\u5E95\uFF08\u56FE\u7247\u672A\u5230/\u52A0\u8F7D\u4E2D\u9732\u51FA\u7684\u5E95\uFF09 */
  --dialog-bg: linear-gradient(178deg, rgb(28 24 25 / 0.9), rgb(17 15 17 / 0.94));
  --dialog-line: rgb(238 226 204 / 0.55);
  --dialog-ink: #f2ebde;
  --dialog-ink-soft: #c6bba9; /* \u65C1\u767D */
  --dialog-ink-thought: #a9a6c4; /* \u5185\u5FC3\u72EC\u767D */
  --dialog-ink-faint: rgb(242 235 222 / 0.45); /* \u6B21\u8981\u63D0\u793A\uFF1A\u300C\u56DE\u770B\u4E2D\u300D\u300C\u5DF2\u9009\u8FC7\u300D */
  /* \u5931\u8D25\u6001\u7684\u8272\uFF1Apending \u9762\u677F\u4E0A\u7684\u5931\u8D25\u884C\u4E0E\u6536\u8D77\u5FBD\u6807\u3002\u6DF1\u5E95\u4E0A\u8981\u591F\u4EAE\u624D\u8BA4\u5F97\u51FA\u662F\u8B66\u53F7\uFF0C
     \u4E0D\u7528 --ink-faint \u90A3\u7C7B\u538B\u6697\u7070\u2014\u2014\u90A3\u4E00\u6863\u662F\u300C\u521A\u5B8C\u6210\u300D\uFF0C\u4E0E\u300C\u6302\u4E86\u300D\u4E0D\u80FD\u6DF7\u3002 */
  --dialog-bad: #e8917f;
  /* \u6D6E\u5C42\u4E0A\u7684\u5B57\u4E00\u5F8B\u5E26\u4E00\u5C42\u538B\u6697\u6295\u5F71\uFF1A\u6DF1\u5E95\u73BB\u7483\u4E0A\u8FD9\u662F\u552F\u4E00\u8BA9\u5B57\u8131\u5F00\u5E95\u7684\u529E\u6CD5\u3002
     \u6D45\u8272\u821E\u53F0\u5E95\u672C\u6765\u5C31\u4EAE\uFF0C\u518D\u538B\u4E00\u5C42\u9ED1\u9634\u5F71\u53EA\u4F1A\u7CCA\u6389\u7B14\u753B\u2014\u2014\u90A3\u8FB9\u6574\u4E2A\u7F6E none\u3002 */
  --dialog-text-shadow: 0 1px 3px rgb(0 0 0 / 0.55);
  --dir-text-shadow: 0 1px 2px rgb(0 0 0 / 0.55);
  /* \u6D6E\u5C42\u952E\u7684\u60AC\u505C/\u70B9\u4EAE\u5E95\uFF1A\u534A\u900F\u660E\u767D\uFF0C\u6DF1\u5E95\u4E0A\u50CF\u64E6\u4EAE\u4E00\u5C42 */
  --dialog-hover: rgb(242 235 222 / 0.12);
  --dialog-veil: rgb(242 235 222 / 0.07);
  --dialog-shadow: 0 10px 30px rgb(0 0 0 / 0.45);
  /* \u821E\u53F0\u6D6E\u5C42\u7684\u5706\u89D2\uFF1A\u53F0\u8BCD\u6761 + \u753B\u9762\u4E0A\u6D6E\u7684\u90A3\u51E0\u5757\uFF08\u5BFC\u6F14\u5DE5\u5177\u680F / \u6392\u961F\u9762\u677F / \u4FA7\u680F\u5524\u51FA\u952E\uFF09\u3002
     \u5168\u5C40 --radius \u662F 2px\uFF08\u8FD1\u76F4\u89D2\uFF0C\u7ED9\u9875\u9762\u91CC\u7684\u5361\u7247\u4E0E\u952E\uFF09\uFF0C\u4F46\u8FD9\u51E0\u5757\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684
     \u300C\u7A97\u300D\uFF0C\u5706\u89D2\u5927\u4E00\u70B9\u624D\u8DDF\u753B\u9762\u8131\u5F00\u3001\u8BFB\u5F97\u51FA\u662F\u6D6E\u5728\u4E0A\u9762\u7684\u4E00\u5C42\u3002 */
  --stage-radius: 10px;
  /* \u540D\u724C\u8DDF\u7740\u821E\u53F0\u6DF1\u6D45\u8D70\uFF1A\u6DF1\u5E95\u4E0A\u662F\u6DF1\u724C\u6D45\u5B57\uFF0C\u6D45\u5E95\u4E0A\u662F\u6D45\u724C\u6DF1\u5B57\u3002\u538B\u5728\u80CC\u666F\u56FE\u4E0A\u65F6\u4E24\u79CD\u90FD\u5F97
     \u81EA\u5DF1\u5E26\u5E95\uFF0C\u6240\u4EE5\u4E0D\u53D6\u900F\u660E\u3002\u63CF\u8FB9\u4E24\u5957\u4E3B\u9898\u90FD\u770B\u5F97\u89C1\uFF0C\u53D6\u56FA\u5B9A\u7684\u4E2D\u6027\u7070\uFF0C\u4E0D\u8DDF\u4E3B\u8272\u3002 */
  --nameplate-bg: rgb(24 21 23 / 0.92);
  --nameplate-ink: #f2ebde;
  --nameplate-line: rgb(238 226 204 / 0.4);
  /* \u4EAE\u8272\u821E\u53F0\uFF08useTheme \u7684 stageLight\uFF09\u628A --stage-bg \u538B\u5230 #fdfdfd\uFF1A\u5267\u672C\u8FD8\u6CA1\u914D\u666F\u65F6
     \u9732\u51FA\u7684\u662F\u7A7A\u767D\u753B\u5E03\uFF0C\u4E0D\u4F1A\u88AB\u8BFB\u6210\u300C\u753B\u9762\u52A0\u8F7D\u4E0D\u51FA\u6765\u300D\u3002\u8FD9\u91CC\u7684\u9ED8\u8BA4\u57FA\u7EBF\u8D70\u6697\u8272\u3002 */
  --sprite-dim: 0.55; /* \u975E\u53D1\u8A00\u4EBA\u7ACB\u7ED8\u538B\u6697\u5F3A\u5EA6\uFF08.theater-sprite.dim \u7528\uFF09 */
  --choice-bg: rgb(24 21 23 / 0.92);
  --choice-line: rgb(238 226 204 / 0.4);
  --choice-ink: #f2ebde;
  --choice-active-bg: color-mix(in srgb, var(--accent) 40%, transparent);
  --choice-scrim: linear-gradient(180deg, transparent 24%, rgb(10 8 10 / 0.55));
  --shadow: 0 6px 18px rgb(34 24 16 / 0.16);

  /* \u2462 \u8FD0\u52A8 */
  --type-ms: 35; /* \u6BCF\u5B57\u6BEB\u79D2 */
  --pause-short-ms: 120; /* \u9017\u53F7\u7C7B\u989D\u5916\u505C\u987F */
  --pause-long-ms: 240; /* \u53E5\u53F7\u7C7B\u989D\u5916\u505C\u987F */
  --fade-ms: 220; /* \u7ACB\u7ED8\u5DEE\u5206 / \u80CC\u666F\u5207\u6362 */
  --move-ms: 380ms; /* \u7ACB\u7ED8\u6362\u4F4D\u3001\u6362\u666F\u522B\uFF08\u8FD0\u955C\uFF09\u2014\u2014\u6BD4\u5DEE\u5206\u6162\uFF0C\u8D70\u8FC7\u53BB\u4E0D\u662F\u77AC\u79FB */
  --act-ms: 520ms; /* \u884C\u4E3A\u8BCD\u6F14\u51FA\u65F6\u957F\uFF08\u70B9\u4E00\u6B21\u5934\u3001\u6296\u4E00\u4E0B\uFF09 */
  /* \u7F13\u52A8\uFF1A\u8D77\u6B65\u5FEB\u3001\u5C3E\u5DF4\u957F\u3002\u7AD9\u4F4D\u4E0E\u8FD0\u955C\u90FD\u662F\u300C\u4E00\u4E2A\u6F14\u5458\u8D70\u8FC7\u53BB\u300D\u7684\u89C2\u611F\uFF0C
     ease-in-out \u5300\u52A0\u901F\u5300\u51CF\u901F\u6700\u50CF\u3002 */
  --move-ease: cubic-bezier(0.33, 0, 0.2, 1);
  --hover-ms: 140;
}

@media (prefers-reduced-motion: reduce) {
  .stage-root {
    --type-ms: 0;
    --fade-ms: 0;
    --move-ms: 0ms;
    --act-ms: 0ms;
  }
}

/* \u4E3B\u9898\u5207\u6362\uFF1AUI\uFF08\u7EB8\u9762\uFF09\u4E0E\u821E\u53F0\uFF08\u753B\u9762\uFF09\u5404\u81EA\u4E00\u5957\uFF0C\u7531 <html> \u4E0A\u7684 data-* \u5C5E\u6027\u9A71\u52A8\u3002
   \u7528\u5C5E\u6027\u9009\u62E9\u5668\u800C\u4E0D\u662F\u5185\u8054 style \u5199 :root \u2014\u2014 \u5267\u76EE\u5B9A\u5236\u4E3B\u9898\uFF08plays/<id>/theme.css\uFF09
   \u6302\u7684\u662F :root \u53D8\u91CF\uFF0C\u5185\u8054 style \u4F18\u5148\u7EA7\u66F4\u9AD8\u4F1A\u628A\u5B83\u6574\u5F20\u538B\u6389\uFF0C\u7528\u6237\u6362\u7684\u76AE\u5C31\u6CA1\u4E86\u3002
   \u5C5E\u6027\u9009\u62E9\u5668\u53EA\u8986\u76D6\u4E0B\u9762\u8FD9\u51E0\u4E2A\u4EE4\u724C\uFF0C\u5267\u76EE\u4E3B\u9898\u6CA1\u78B0\u5230\u7684\u90E8\u5206\u7167\u65E7\u751F\u6548\u3002 */
html[data-ui-theme="dark"] .stage-root {
  --bg: #14110f; /* \u548C\u7D19\u53CD\u8FC7\u6765\uFF1A\u6696\u8C03\u7684\u9ED1\uFF0C\u4E0D\u662F\u7EAF #000 \u2014\u2014 \u7EAF\u9ED1\u914D\u6696\u767D\u5B57\u4F1A\u53D1\u84DD */
  --panel: #201c19;
  --panel-2: #2b2622;
  /* \u6DF1\u5E95\u4E0D\u80FD\u7559\u6696\u767D\u90A3\u7247\u5149\uFF08\u8BFB\u6210\u4E00\u5757\u5149\u6591\uFF09\uFF0C\u6539\u6210\u4E00\u5C42\u538B\u5F97\u4F4F\u7684\u6696\u63D0\u4EAE */
  --paper-glow: rgb(116 104 88 / 0.2);
  --ink: #ece4d8;
  --ink-soft: #b3a897;
  --ink-faint: #8a8073;
  --line: #3d362f;
  --accent: #8ab6dd; /* \u6DF1\u5E95\u4E0A\u7684\u4E3B\u8272\u8981\u63D0\u4EAE\uFF0C\u5426\u5219\u8272\u76F8\u538B\u9ED1\u7CCA\u6210\u4E00\u56E2 */
  --accent-ink: #101820;
  --accent-soft: rgba(138, 182, 221, 0.18);
  --link: #8fb8d4;
}

/* \u4E3B\u8272\u9884\u8BBE\uFF1A\u8BBE\u7F6E\u9875\u9009\u54EA\u4E00\u6863\u5C31\u6302\u54EA\u4E2A data-accent\uFF08useTheme.applyAccent\uFF09\u3002
   \u6BCF\u4E2A\u9884\u8BBE\u7ED9\u6D45\u5E95/\u6DF1\u5E95\u4E24\u5957\u503C\u2014\u2014\u540C\u4E00\u8272\u76F8\u5728\u7EB8\u9762\u4E0A\u8981\u538B\u5F97\u4F4F\u3001\u5728\u6696\u9ED1\u4E0A\u8981\u63D0\u5F97\u8D77\u3002
   custom \u4E0D\u5728\u8FD9\u91CC\uFF1A\u90A3\u4E2A\u8272\u7531 useTheme \u5199\u6210\u5185\u8054 --accent\u3002 */
html[data-accent="teal"] .stage-root {
  --accent: #2f6f73;
  --accent-ink: #f3fbfa;
  --accent-soft: #d7e8e8;
}
html[data-accent="green"] .stage-root {
  --accent: #4a6f45;
  --accent-ink: #f6faf2;
  --accent-soft: #dfe9da;
}
html[data-accent="violet"] .stage-root {
  --accent: #6a5599;
  --accent-ink: #faf7ff;
  --accent-soft: #e5dff2;
}
html[data-accent="wine"] .stage-root {
  --accent: #9b3b4f;
  --accent-ink: #fff7f3;
  --accent-soft: #f4e3e2;
}
html[data-ui-theme="dark"][data-accent="teal"] .stage-root {
  --accent: #79b8bd;
  --accent-ink: #0e1a1b;
  --accent-soft: rgba(121, 184, 189, 0.18);
}
html[data-ui-theme="dark"][data-accent="green"] .stage-root {
  --accent: #9cbb92;
  --accent-ink: #131a11;
  --accent-soft: rgba(156, 187, 146, 0.18);
}
html[data-ui-theme="dark"][data-accent="violet"] .stage-root {
  --accent: #ab98d8;
  --accent-ink: #16121f;
  --accent-soft: rgba(171, 152, 216, 0.18);
}
html[data-ui-theme="dark"][data-accent="wine"] .stage-root {
  --accent: #d98a7a;
  --accent-ink: #1a1512;
  --accent-soft: rgba(217, 138, 122, 0.18);
}

/* \u821E\u53F0\u6D45\u8272\uFF1A\u53F0\u8BCD\u6761 / \u9009\u80A2\u5361\u6574\u5957\u6362\u6210\u6D45\u5E95\u6DF1\u5B57\u3002
   \u8FD9\u5957\u7684\u53D6\u820D\u548C\u6DF1\u8272\u76F8\u53CD\u2014\u2014\u6DF1\u8272\u6A21\u5F0F\u9760\u300C\u73BB\u7483\u538B\u4F4F\u753B\u9762\u300D\uFF0C\u6D45\u8272\u6CA1\u6709\u538B\u7684\u4F59\u5730\uFF0C
   \u6240\u4EE5\u5E95\u8272\u5FC5\u987B\u5B9E\uFF080.88 \u8D77\u6B65\uFF09\u800C\u4E0D\u662F\u534A\u900F\u660E\uFF0C\u5426\u5219\u80CC\u666F\u56FE\u7684\u4EAE\u90E8\u4F1A\u900F\u4E0A\u6765\u5403\u6389\u5B57\u3002 */
html[data-stage-theme="light"] .stage-root {
  --stage-bg: #efece5;
  --dialog-bg: linear-gradient(178deg, rgb(252 250 246 / 0.94), rgb(240 236 228 / 0.96));
  --dialog-line: rgb(120 108 92 / 0.45);
  --dialog-ink: #23201c;
  --dialog-ink-soft: #4a443c;
  --dialog-ink-thought: #5a5468;
  --dialog-ink-faint: rgb(35 32 28 / 0.5);
  --dialog-bad: #b3372f;
  --dialog-text-shadow: none;
  --dir-text-shadow: none;
  --dialog-hover: rgb(120 108 92 / 0.12);
  --dialog-veil: rgb(120 108 92 / 0.07);
  --dialog-shadow: 0 10px 30px rgb(60 48 32 / 0.18);
  --choice-bg: rgb(252 250 246 / 0.94);
  --choice-line: rgb(120 108 92 / 0.4);
  --choice-ink: #23201c;
  --choice-active-bg: color-mix(in srgb, var(--accent) 22%, transparent);
  --choice-scrim: linear-gradient(180deg, transparent 24%, rgb(239 236 229 / 0.55));
  --nameplate-bg: rgb(252 250 246 / 0.94);
  --nameplate-ink: #23201c;
  --nameplate-line: rgb(90 80 68 / 0.45);
}

/* \u2500\u2500 \u821E\u53F0 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.theater {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  --safe-b: env(safe-area-inset-bottom, 0px);
  /* \u9009\u80A2\u5E26\u7684\u4E0A\u4E0B\u4E24\u6761\u8FB9\u3002\u9ED8\u8BA4\u503C\u6309\u300C\u5BFC\u6F14\u680F\u4E00\u884C + \u53F0\u8BCD\u6761 min-height\u300D\u8D77\u6B65\uFF0C
     \u771F\u5B9E\u9AD8\u5EA6\u7531 StageTheater \u7684 ResizeObserver \u5199\u56DE\uFF08\u6362\u884C\u3001\u957F\u53F0\u8BCD\u90FD\u4E0D\u7528\u624B\u6539\u6570\u503C\uFF09\u3002 */
  --dir-h: 46px;
  --dialog-h: 168px;
}

/* \u51C0\u753B\u9762\uFF1A\u85CF\u6389\u538B\u5728\u753B\u9762\u4E0A\u7684\u4E24\u5757\u7A97\uFF08\u53F0\u8BCD\u6761 + \u53F3\u4E0A\u89D2\u5BFC\u6F14\u680F\uFF09\uFF0C\u53EA\u5269\u80CC\u666F/\u7ACB\u7ED8/CG\u3002
   \u4E24\u5757\u90FD\u662F absolute\u6D6E\u5C42\uFF0Cdisplay:none \u6389\u4E0D\u5F15\u8D77\u56DE\u6D41\uFF0C.theater-stage \u672C\u6765\u5C31 flex:1 \u94FA\u6EE1\u3002
   \u9876\u680F\uFF08exit/log/branch\uFF09\u548C\u4FA7\u680F\u7559\u5728\u5916\u9762\u2014\u2014\u90A3\u662F\u51FA\u53BB\u7684\u8DEF\uFF0C\u85CF\u4E86\u5C31\u5BB9\u6613\u56F0\u5728\u91CC\u9762\u3002 */
.theater.bare .theater-director,
.theater.bare .theater-dialog {
  display: none;
}

.theater-bar {
  position: relative;
  z-index: 20; /* \u821E\u53F0\u5C42\u7684\u6D6E\u5C42 z-index \u4F1A\u76D6\u5230\u64CD\u4F5C\u6761\u4E0A\uFF0C\u8FD9\u91CC\u660E\u786E\u538B\u5728\u5B83\u4EEC\u4E4B\u4E0A */
  transition: opacity var(--fade-ms) ease;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
  flex-shrink: 0;
}

.bar-btn {
  padding: 4px 11px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg);
  color: var(--ink-soft);
  font-size: 12.5px;
  line-height: 1.5;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color var(--hover-ms) ease,
    color var(--hover-ms) ease,
    border-color var(--hover-ms) ease;
}

.bar-btn:hover {
  border-color: var(--accent);
  color: var(--ink);
}

.bar-btn.on {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--ink);
}

.theater-more {
  position: absolute;
  z-index: 45;
  top: 44px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  padding: 8px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.theater-actions {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

/* \u821E\u53F0\u5360\u6EE1\u5DE5\u5177\u6761\u4EE5\u4E0B\u7684\u5168\u90E8\u9AD8\u5EA6\uFF0C\u53F0\u8BCD\u6761\u6D6E\u5728\u5B83\u4E0A\u9762\u2014\u2014\u53F0\u8BCD\u957F\u77ED\u4E0D\u6539\u53D8\u821E\u53F0\u9AD8\u5EA6\uFF0C
   \u80CC\u666F\u4E0E\u7ACB\u7ED8\u56E0\u6B64\u4E0D\u4F1A\u88AB\u5BF9\u8BDD\u6846\u6324\u538B\u53D8\u5F62\u3002
   \u58F0\u660E container-type \u5EFA\u7ACB\u5BB9\u5668\u4E0A\u4E0B\u6587\uFF0C\u7ACB\u7ED8\u7B49\u5143\u7D20\u53EF\u57FA\u4E8E cqw \u6362\u7B97\u821E\u53F0\u5BBD\u5EA6\u3002 */
.theater-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  container-type: inline-size;
  background: var(--stage-bg);
}

/* \u53F0\u8BCD\u6761\uFF1A\u6D6E\u5728\u753B\u9762\u4E0A\u7684\u7A97\uFF0C\u4E0D\u662F\u9875\u9762\u91CC\u7684\u4E00\u5757\u3002\u6DF1\u8272\u73BB\u7483\u538B\u4F4F\u80CC\u666F\u56FE\uFF0C\u767D\u5B57\u624D\u7ACB\u5F97\u4F4F\u3002
   \u4E00\u9053\u63CF\u8FB9 + \u5706\u89D2\u3002\u7A97\u6846\u5185\u4FA7\u539F\u5148\u8FD8\u8D70\u4E00\u9053\u7EC6\u767D\u7EBF\uFF08\u60F3\u9020\u73BB\u7483\u539A\u5EA6\uFF09\uFF0C\u6DF1\u8272\u4E0B\u90A3\u9053\u7EBF
   \u8BFB\u8D77\u6765\u662F\u300C\u7A97\u91CC\u8FD8\u6709\u4E00\u5708\u6846\u300D\uFF0C\u5DF2\u5220\u3002 */
.theater-dialog {
  position: absolute;
  z-index: 12;
  left: 2.4%;
  right: 2.4%;
  max-width: 1180px;
  margin: 0 auto;
  bottom: calc(2.4% + var(--safe-b));
  box-sizing: border-box;
  background: var(--dialog-bg);
  border: 1px solid var(--dialog-line);
  border-radius: var(--stage-radius);
  padding: 22px 30px 14px;
  /* \u9884\u7559\u4E09\u884C\uFF08\u89C1 .dialog-text \u7684 min-height\uFF09\uFF1A1~3 \u884C\u7684\u53F0\u8BCD\u6765\u56DE\u6362\u65F6\u9AD8\u5EA6\u6052\u5B9A\uFF0C\u753B\u9762\u4E0D\u518D\u9876\u4E00\u4E0B\u6C89\u4E00\u4E0B */
  min-height: 168px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  box-shadow: var(--dialog-shadow);
  backdrop-filter: blur(10px) saturate(1.05);
}

.theater-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: bg-fade var(--fade-ms) ease;
}

.theater-bg-fallback {
  animation: none;
}

.theater-bg.cut {
  animation: none;
}

@keyframes bg-fade {
  from {
    opacity: 0;
  }
}

/* \u7ACB\u7ED8\u600E\u4E48\u6446\uFF1A\u9876\u90E8\u5BF9\u9F50\uFF0C\u5E95\u4E0B\u6309\u666F\u522B\u88C1\u3002

   \u53EA\u6709\u4E24\u4E2A\u6570\uFF1A
   - top    \u6240\u6709\u7ACB\u7ED8\u540C\u4E00\u4E2A\u503C\u2014\u2014\u5934\u9876\u7559\u591A\u5C11\u7A7A\uFF0C\u4E09\u6863\u4E00\u81F4\uFF0C\u6362\u56FE\u65F6\u4EBA\u4E0D\u4F1A\u4E0A\u4E0B\u8DF3\u3002
   - height \u56FE\u6709\u591A\u9AD8\u3002top \u5230\u821E\u53F0\u5E95\u8FB9\u662F 100% - top\uFF0C\u666F\u522B\u8981\u591A\u9732\u7684\u5C31\u518D\u5F80\u4E0A\u52A0\u3002

   \u5168\u8EAB\u6BD4\u534A\u8EAB/\u80F8\u50CF\u591A\u51FA\u7684\u90A3\u622A\uFF0C\u9732\u51FA\u6765\u7684\u90E8\u5206\u88AB**\u753B\u9762\u4E0B\u6CBF**\u5207\u6389\uFF08\u4E0D\u662F\u88AB\u53F0\u8BCD\u6761\u5207\uFF0C
   \u53F0\u8BCD\u6761\u53EA\u662F\u6B63\u597D\u538B\u5728\u90A3\u513F\uFF09\u3002\u534A\u8EAB\u4E0E\u80F8\u50CF\u7684\u9AD8\u5EA6\u5C31\u662F 100% - top\uFF0C\u56FE\u7684\u4E0B\u6CBF\u843D\u5728\u821E\u53F0\u5E95\u8FB9\u3002

   top \u53D6 10%\uFF1A\u5B9E\u6D4B\u751F\u6210\u7684\u7ACB\u7ED8 alpha \u9876\u90E8\u7559\u767D\u4E2D\u4F4D 7.5%\u3001\u6700\u7D27 0.1%\uFF08\u6A21\u578B\u5E38\u628A\u5934\u9876\u9876\u5230
   \u753B\u5E45\u4E0A\u6CBF\uFF09\uFF0C10% \u4FDD\u8BC1\u6700\u7D27\u7684\u90A3\u6279\u5934\u9876\u4E5F\u8FD8\u7559\u5F97\u4F4F\u4E00\u6761\u7F1D\u3002

   \u9AD8\u5EA6\u5FC5\u987B\u5199\u6B7B\uFF1A<img> \u662F\u66FF\u6362\u5143\u7D20\uFF0C\u53EA\u7ED9 top/bottom \u800C height:auto \u7684\u8BDD\u6D4F\u89C8\u5668\u5224\u5B9A
   \u8FC7\u7EA6\u675F\u4F1A\u5FFD\u7565 bottom\u3001\u56FE\u6309\u539F\u59CB\u50CF\u7D20\u5C3A\u5BF8\u753B\u51FA\u6765\uFF08\u6BD4\u821E\u53F0\u5927\u4E00\u5927\u5708\uFF09\u3002

   \u6C34\u5E73\u4F4D\u7F6E\u8D70 transform \u800C\u4E0D\u662F left\uFF08--x\uFF09\uFF1Aleft \u8FC7\u6E21\u6BCF\u5E27\u89E6\u53D1\u91CD\u6392\uFF0C\u4E94\u516D\u4E2A\u7ACB\u7ED8\u540C\u6846
   \u5C31\u662F\u6BCF\u5E27\u4E00\u6B21\u5168\u821E\u53F0\u91CD\u6392\uFF1Btransform \u53EA\u8D70\u5408\u6210\u5C42\uFF0C\u96F6\u91CD\u6392\u3002--x \u5B58\u7684\u662F\u300C\u79BB\u753B\u9762\u4E2D\u5FC3\u7684
   \u504F\u79FB\u767E\u5206\u6BD4\u300D\uFF0C-50% \u90A3\u534A\u5F20\u56FE\u662F\u56FE\u81EA\u8EAB\u5C45\u4E2D\uFF0C\u4E0E\u4F4D\u7F6E\u65E0\u5173\uFF0C\u6240\u4EE5\u5408\u6210\u5F0F\u662F
   translateX(-50% + var(--x))\u3002--scale \u662F\u8FD0\u955C\uFF1A\u6574\u4F53\u653E\u5927\uFF0C\u5934\u9876\u4E0D\u52A8\u3001\u8EAB\u4F53\u5F80\u4E0B\u957F\u51FA\u753B\u9762\uFF0C
   \u5C31\u662F\u300C\u63A8\u8FD1\u300D\u3002

   \u56DB\u5C42\u53D8\u6362\u5404\u5360\u4E00\u4E2A\u4E92\u4E0D\u8986\u76D6\u7684\u5C5E\u6027\uFF0C\u6240\u4EE5\u8C01\u4E5F\u4E0D\u4F1A\u628A\u8C01\u51B2\u6389\uFF1A
     transform \u2192 \u7AD9\u4F4D\uFF08--x\uFF09\u4E0E\u8FD0\u955C\uFF08--scale\uFF09\uFF0C\u4E24\u8005\u6709 transition\uFF0C\u6362\u4F4D/\u6362\u666F\u522B\u5E73\u6ED1
     translate \u2192 \u884C\u4E3A\u8BCD\u7684\u4E00\u6B21\u6027\u4F4D\u79FB\uFF08@keyframes \u9A71\u52A8\uFF09
     scale     \u2192 \u884C\u4E3A\u8BCD\u7684\u538B\u6241\u6324\u538B\uFF0C\u6216\u8BF4\u8BDD\u8005\u7684\u547C\u5438\uFF08\u540C\u4E00\u65F6\u523B\u53EA\u4F1A\u6709\u4E00\u4E2A\uFF09
     rotate    \u2192 \u884C\u4E3A\u8BCD\u7684\u503E\u8EAB
   \u7F29\u653E\u951A\u70B9\u8DDF\u7740\u7D20\u6750\u7684\u58F0\u660E\u8D70\uFF08--sprite-origin\uFF0C\u4EBA\u8D34\u5E95/\u60AC\u7A7A\u7269\u5C45\u4E2D/\u5782\u4E0B\u7269\u6302\u9876\uFF09\uFF0C
   \u6240\u4EE5\u4EBA\u662F\u300C\u539F\u5730\u52A8\u300D\u800C\u4E0D\u662F\u6574\u5F20\u56FE\u5728\u98D8\u3002 */
.theater-sprite {
  --x: 0cqw;
  --scale: 1;
  position: absolute;
  left: 50%;
  /* \u843D\u4F4D\uFF08top/height/transform-origin\uFF09\u5168\u90E8\u6765\u81EA --sprite-* \u53D8\u91CF\uFF1A
     \u503C\u7531 core \u7684 spriteStagePreset \u6309\u300C\u53D6\u666F \xD7 \u4F53\u91CF \xD7 \u5BF9\u9F50\u300D\u7B97\u51FA\uFF0C\u7EC4\u4EF6\u5199\u6210\u884C\u5185\u53D8\u91CF\u3002
     \u8FD9\u91CC\u4E0D\u518D\u679A\u4E3E .framing-* / .anchor-* \u7C7B\u540D\u2014\u2014\u6BCF\u52A0\u4E00\u6863\u4F53\u91CF\u5C31\u8981\u52A8\u4E00\u5904 CSS\uFF0C
     \u800C core \u7684\u8868\u624D\u662F\u90A3\u4EFD\u5951\u7EA6\u3002 */
  top: var(--sprite-top);
  height: var(--sprite-height);
  transform-origin: var(--sprite-origin);
  transform: translateX(calc(-50% + var(--x))) scale(var(--scale));
  /* \u7ACB\u7ED8\u7684\u4E00\u5207\u53D8\u5316\u90FD\u9ED8\u8BA4\u5E26\u8FC7\u6E21\uFF1A\u6362\u8868\u60C5\u3001\u6362\u7AD9\u4F4D\u3001\u6362\u666F\u522B\u3001\u9000\u573A\u90FD\u662F\u540C\u4E00\u4E2A\u5143\u7D20\u4E0A\u7684\u52A8\u753B\u3002
     \u5C11\u4E86\u8FD9\u6761\uFF0C\u89D2\u8272\u53EA\u662F\u300C\u556A\u300D\u5730\u4E00\u4E0B\u8DF3\u5230\u65B0\u4F4D\u7F6E\u2014\u2014\u53F0\u4E0A\u770B\u7740\u50CF\u5361\u4E86\u5E27\u800C\u4E0D\u662F\u5728\u6F14\u3002
     \u547C\u5438\u4E0E\u884C\u4E3A\u8BCD\u8D70 animation \u4E0D\u8D70 transition\uFF0C\u6240\u4EE5\u4E0D\u5217\u5728\u8FD9\u91CC\uFF08\u5217\u4E86\u4E24\u8FB9\u4F1A\u4E92\u76F8\u7B49\uFF09\u3002 */
  transition:
    opacity var(--fade-ms) ease,
    filter var(--fade-ms) ease,
    transform var(--move-ms) var(--move-ease);
}

/* \u975E\u8BF4\u8BDD\u4EBA\u538B\u6697\uFF1A\u8BF4\u8BDD\u7684\u90A3\u4E2A\u4FDD\u6301\u539F\u4EAE\u5EA6\uFF0C\u540C\u6846\u7684\u5176\u4F59\u4EBA\u964D\u5230 --sprite-dim\u3002
   \u8D70 filter: brightness \u800C\u4E0D\u662F opacity\u2014\u2014\u538B\u6697\u662F\u300C\u8FD9\u5757\u50CF\u7D20\u53D8\u6697\u300D\uFF0C\u900F\u660E\u4F1A\u8BA9\u80CC\u666F
   \u4ECE\u4EBA\u8EAB\u4E0A\u900F\u51FA\u6765\uFF0C\u8BFB\u8D77\u6765\u662F\u534A\u900F\u660E\u7684\u9B3C\u5F71\u3002brightness \u53EA\u52A8\u50CF\u7D20\u3001\u4E0D\u52A8 alpha\uFF0C
   \u4E0E .leaving / .sprite-out \u7684 opacity \u901A\u9053\u4E92\u4E0D\u8986\u76D6\u3002
   \u6CA1\u6709\u7126\u70B9\u65F6\uFF08\u65C1\u767D\u3001\u73A9\u5BB6\u8F93\u5165\u3001\u8BF4\u8BDD\u7684\u4EBA\u4E0D\u5728\u53F0\u4E0A\uFF09\u4E0D\u52A0\u8FD9\u4E2A class\uFF0C\u6574\u53F0\u539F\u4EAE\u5EA6\u3002 */
.theater-sprite.dim {
  filter: brightness(var(--sprite-dim));
}

/* \u6B63\u5728\u6F14\u884C\u4E3A\u8BCD\uFF1A\u8FD9\u4E00\u523B\u8FD0\u955C\u8BA9\u4F4D\u3002\u884C\u4E3A\u8BCD\u81EA\u5DF1\u7684 translate/scale/rotate \u4E0E\u8FD0\u955C\u7684
   transform \u662F\u4E24\u4E2A\u72EC\u7ACB\u5C5E\u6027\u3001\u6B63\u5E38\u5E94\u8BE5\u5E76\u5B58\uFF0C\u4F46\u4E24\u8005\u90FD\u6539\u7F29\u653E\u89C2\u611F\u2014\u2014\u7279\u5199\uFF08scale 1.35\uFF09
   \u53E0\u4E00\u8BB0\u70B9\u5934\u4F1A\u8BA9\u4EBA\u7269\u7A81\u7136\u5F39\u4E00\u4E0B\uFF0C\u6240\u4EE5\u884C\u4E3A\u8BCD\u671F\u95F4\u628A\u8FD0\u955C\u538B\u56DE 1\u3002
   \u6F14\u5B8C\u81EA\u52A8\u6062\u590D\uFF0C\u8FD0\u955C\u4E0D\u7528\u91CD\u64AD\u3002

   --act-nonce \u662F\u91CD\u64AD\u7528\uFF1A\u540C\u4E00\u4E2A animation-name \u8FDE\u5199\u4E24\u6B21\u4E0D\u4F1A\u91CD\u6765\uFF0C\u628A delay \u6362\u6210\u53E6\u4E00\u4E2A\u503C\uFF0C
   \u6D4F\u89C8\u5668\u5C31\u8BA4\u6210\u65B0\u52A8\u753B\u4ECE 0% \u64AD\u8D77\u3002**\u5FC5\u987B\u5199\u6210\u65F6\u95F4**\uFF08\`-0.001s\`\uFF09\uFF1Adelay \u4E0E iteration-count
   \u4F4D\u7F6E\u76F8\u90BB\uFF0C\u5199\u6210\u88F8\u6570\u5B57\u5C31\u6210\u4E86 \`520ms ease 1 1\` \u8FD9\u79CD\u4E24\u4E2A\u6570\u6328\u7740\uFF0C\u6D4F\u89C8\u5668\u5224\u4E0D\u51FA\u54EA\u4E2A\u662F\u54EA\u4E2A\uFF0C
   \u6574\u6761 animation \u88AB\u9759\u9ED8\u4E22\u5F03\uFF08animation-name \u53D8 none\uFF0C\u52A8\u753B\u6C38\u8FDC\u4E0D\u542F\u52A8\uFF09\u3002 */
.theater-sprite.acting {
  --scale: 1;
  animation: var(--sprite-act) var(--act-ms) var(--move-ease) var(--act-nonce, 0s) 1;
}

/* \u8BF4\u8BDD\u8005\u8F7B\u5FAE\u547C\u5438\u2014\u2014\u9884\u7559\uFF0C\u5F53\u524D\u4E0D\u6302\u8FD9\u4E2A class\u3002
   \u5E45\u5EA6\u662F scale 1.004\uFF080.4%\uFF09\uFF0C\u8089\u773C\u4E0D\u53EF\u8FA8\uFF1A\u7B49\u4E8E\u7ED9\u6BCF\u5F20\u7ACB\u7ED8\u6302\u4E86\u4E00\u6761\u6C38\u4E0D\u7ED3\u675F\u7684
   \u52A8\u753B\u5374\u4EC0\u4E48\u90FD\u6CA1\u6362\u6765\u3002\u8981\u5F00\u7684\u8BDD\uFF0C\u5728 StageTheater \u62FC cls \u7684\u5730\u65B9\u6309
   \`playback.view?.actorId === id\` \u8865\u56DE " speaking" \u5373\u53EF\u3002
   \u4E0E\u884C\u4E3A\u8BCD\u5171\u7528 scale \u901A\u9053\uFF0C\u6240\u4EE5\u4E24\u8005\u540C\u65F6\u6210\u7ACB\u65F6\u4EE5\u884C\u4E3A\u8BCD\u4E3A\u51C6\u2014\u2014class \u987A\u5E8F\u4FDD\u8BC1
   .acting \u7684 animation \u540E\u5199\u4F1A\u8986\u76D6\u3002 */
.theater-sprite.speaking {
  animation: sprite-breathe 3.4s ease-in-out infinite;
}

/* \u7AD6\u5C4F\u821E\u53F0\uFF08412x839\uFF09\u6BD4 9:16 \u7ACB\u7ED8\u8FD8\u7A84\uFF1A\u4EBA\u7269\u672C\u8EAB\u53EA\u5360\u56FE\u5BBD 70%\uFF0C\u4E24\u4FA7\u5404\u80FD\u88C1 15% \u518D\u591A\u5C31\u5207\u5230\u5934\u53D1\uFF0C
   \u6240\u4EE5\u6574\u5E45\u56FE\u90FD\u6309\u6BD4\u4F8B\u7F29\u77EE\u4E00\u622A\uFF0C\u4EE3\u4EF7\u662F\u4EBA\u7269\u591A\u9732\u51FA\u4E00\u70B9\u3002\u9876\u90E8\u7684\u7A7A\u4E0E\u5E95\u90E8\u7684\u88C1\u5207\u89C4\u5219\u7167\u65E7\u3002
   \u6362\u4E00\u5217\u73B0\u6210\u7684\u6570\uFF08spriteStagePreset \u7684 portrait \u90A3\u5217\uFF09\uFF0C\u4E0D\u5728 CSS \u91CC\u91CD\u7B97\u4E00\u904D\u3002 */
@media (max-aspect-ratio: 1/1) {
  .theater-sprite {
    top: var(--sprite-top-portrait);
    height: var(--sprite-height-portrait);
    transform-origin: var(--sprite-origin-portrait);
  }
}

/* \u8868\u60C5\u5DEE\u5206\uFF1A\u65E7\u50CF\u7559\u5728\u4E0B\u5C42\u6DE1\u51FA\uFF0C\u65B0\u50CF\u4ECE\u900F\u660E\u53E0\u4E0A\u6765 */
.theater-sprite.sprite-out {
  opacity: 0;
}

/* \u767B\u573A\uFF1A\u6DE1\u5165\u3002\u9000\u573A\u9760 .leaving\uFF08\u89C1\u4E0B\uFF09\u800C\u4E0D\u662F\u76F4\u63A5\u5378\u8F7D\u2014\u2014\u76F4\u63A5\u5378\u8F7D\u6CA1\u6709\u8FC7\u6E21\u53EF\u64AD\u3002 */
.theater-sprite.entering {
  animation: sprite-in var(--fade-ms) ease;
}

.theater-sprite.leaving {
  opacity: 0;
  transition:
    opacity var(--fade-ms) ease,
    transform var(--move-ms) var(--move-ease);
  pointer-events: none;
}

@keyframes sprite-in {
  from {
    opacity: 0;
  }
}

/* \u56DE\u770B\uFF08\u6EDA\u8F6E\u7FFB\u5386\u53F2\u53F0\u8BCD\uFF09\u65F6\u821E\u53F0\u4E0A\u653E\u7684\u662F\u300C\u90A3\u4E00\u523B\u7684\u753B\u9762\u300D\uFF0C\u4E0D\u662F\u4E00\u6B21\u65B0\u7684\u6F14\u51FA\uFF1A
   \u6362\u666F\u4E0D\u6DE1\u5165\u3001\u7ACB\u7ED8\u4E0D\u767B\u573A\u3001\u884C\u4E3A\u8BCD\u4E0D\u91CD\u6F14\u3001\u7AD9\u4F4D\u4E0D\u8865\u95F4\u3002\u5C11\u4E86\u8FD9\u4E00\u6761\uFF0C\u6EDA\u8F6E\u6BCF\u7FFB\u4E00\u53E5
   \u5C31\u662F\u4E00\u6B21\u5168\u573A\u95EA\u70C1\u3002\u677E\u624B\u56DE\u5230\u64AD\u653E\u5934\u65F6\u8FD9\u4E9B\u89C4\u5219\u4E0D\u518D\u547D\u4E2D\uFF0C\u753B\u9762\u6309\u5E73\u65F6\u7684\u8FC7\u6E21\u5F52\u4F4D\u3002 */
.theater-stage.rewinding .theater-bg,
.theater-stage.rewinding .theater-bg-in,
.theater-stage.rewinding .theater-cg-in,
.theater-stage.rewinding .theater-sprite {
  animation: none;
}

.theater-stage.rewinding .theater-sprite {
  transition: none;
}

/* \u673A\u4F4D\uFF1A\u504F\u79FB\u91CF\u662F\u300C\u79BB\u753B\u9762\u4E2D\u5FC3\u7684\u767E\u5206\u6BD4\uFF08\u76F8\u5BF9\u4E8E\u821E\u53F0\u5BBD\u5EA6\u7684 cqw\uFF09\u300D\uFF0C\u4E0D\u662F left \u7684\u7EDD\u5BF9\u503C\u3002
   \u901A\u8FC7 left: 50% \u5C06\u539F\u70B9\u5BF9\u51C6\u821E\u53F0\u4E2D\u5FC3\uFF0C--x \u9A71\u52A8\u5DE6\u53F3\u5E73\u79FB\u3002\u8D1F\u6570\u5728\u5DE6\u3001\u6B63\u6570\u5728\u53F3\u3002 */
.pos-left {
  --x: -28cqw;
}

.pos-center {
  --x: 0cqw;
}

.pos-right {
  --x: 28cqw;
}

/* 2 \u4EBA\u540C\u6846\uFF1A\u8D34\u5230\u753B\u9762\u4E24\u4FA7\uFF0C\u7559\u51FA\u4E2D\u95F4\u8BF4\u8BDD\u7684\u7A7A\uFF08\u8D8A\u9760\u8FB9\u4EBA\u8D8A\u5C0F\u8D8A\u8FDC\uFF0C\u8FD9\u662F\u821E\u53F0\u60EF\u4F8B\uFF09\u3002 */
.pos-far-left {
  --x: -36cqw;
}

.pos-far-right {
  --x: 36cqw;
}

/* 3 \u4EBA\u4EE5\u4E0A\u7528\uFF1A\u6BD4 far \u66F4\u9760\u5916\u3002 */
.pos-edge-left {
  --x: -42cqw;
}

.pos-edge-right {
  --x: 42cqw;
}

/* \u884C\u4E3A\u8BCD \u2192 \u52A8\u753B\u914D\u65B9\uFF08core \u7684 spriteAction.ts \u662F\u884C\u4E3A\u8BCD\u7684\u552F\u4E00\u771F\u76F8\u6E90\uFF09\u3002
   \u5267\u672C\u53EA\u5199\u4E00\u4E2A\u8BCD\uFF0C\u914D\u65B9\u4E0E\u65F6\u957F\u90FD\u5728\u8FD9\u91CC\uFF0C\u4E0D\u5916\u6CC4\u6210\u53C2\u6570\u3002

   \u6BCF\u6761 @keyframes **\u663E\u5F0F\u5199\u5168\u56DB\u4E2A\u5C5E\u6027**\uFF1A\u6F0F\u5199\u7684\u5C5E\u6027\u4F1A\u4FDD\u7559\u4E0A\u4E00\u6B21\u7684\u503C\uFF0C
   \u4E8E\u662F\u300Cnod \u4E4B\u540E\u63A5\u7740 shake\u300D\u4F1A\u628A\u70B9\u5934\u538B\u51FA\u6765\u7684\u6324\u538B\u5E26\u8FDB\u6296\u52A8\u91CC\u3002\u5199\u5168 0 \u624D\u662F\u300C\u8FD9\u6761\u901A\u9053\u4E0D\u52A8\u300D\u3002

   \u53EA\u7528\u53EF\u63D2\u503C\u7684\u7C7B\u578B\uFF08\u767E\u5206\u6BD4\u4F4D\u79FB\u3001scale\u3001deg \u65CB\u8F6C\uFF09\u2014\u2014\u81EA\u5B9A\u4E49\u5C5E\u6027\u6309 token \u66FF\u6362\u3001
   \u4E0D\u53EF\u63D2\u503C\uFF0C@keyframes \u91CC\u9A71\u52A8\u5B83\u4E0D\u4F1A\u5E73\u6ED1\u8865\u95F4\uFF0C\u8FD8\u4F1A\u6574\u6BB5\u8DF3\u3002
   \u5E45\u5EA6\u523B\u610F\u538B\u5F97\u5C0F\uFF082%~4%\uFF09\uFF1A\u7ACB\u7ED8\u8D34\u6EE1\u753B\u9762\uFF0C\u4F4D\u79FB\u4E00\u5927\u5C31\u51FA\u753B\u3002
   transform-origin: top center\uFF08\u89C1 .theater-sprite\uFF09\u8BA9\u4F4D\u79FB\u4E0E\u65CB\u8F6C\u90FD\u7ED5\u5934\u9876\u53D1\u751F\uFF0C
   \u4EBA\u7684\u811A\u4E0D\u52A8\u2014\u2014\u50CF\u5728\u539F\u5730\u52A8\uFF0C\u4E0D\u662F\u6574\u5F20\u56FE\u5728\u98D8\u3002 */
@keyframes sprite-act-nudge {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  25% {
    translate: 1.4% 0;
    scale: 1 1;
    rotate: 0.3deg;
  }
  75% {
    translate: -1.4% 0;
    scale: 1 1;
    rotate: -0.3deg;
  }
}

@keyframes sprite-act-stagger {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  20% {
    translate: -3% -1%;
    scale: 0.98 1;
    rotate: -3.5deg;
  }
  55% {
    translate: 2% 0;
    scale: 1.02 1;
    rotate: 1.5deg;
  }
  80% {
    translate: -0.8% 0;
    scale: 1 1;
    rotate: -0.5deg;
  }
}

@keyframes sprite-act-jump {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  30% {
    translate: 0 -4%;
    scale: 0.97 1;
    rotate: 0deg;
  }
  60% {
    translate: 0 0;
    scale: 1.04 1;
    rotate: 0deg;
  }
  80% {
    translate: 0 -1%;
    scale: 0.99 1;
    rotate: 0deg;
  }
}

@keyframes sprite-act-nod {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  30% {
    translate: 0 2.5%;
    scale: 1.02 1;
    rotate: 0deg;
  }
  62% {
    translate: 0 -0.8%;
    scale: 0.99 1;
    rotate: 0deg;
  }
}

@keyframes sprite-act-bow {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  45% {
    translate: 0 2%;
    scale: 1.04 1;
    rotate: 0deg;
  }
  70% {
    translate: 0 1.2%;
    scale: 1.02 1;
    rotate: 0deg;
  }
}

/* \u4F2A\u8F6C\u8EAB\uFF1A\u6A2A\u5411\u538B\u6241\u5230 0 \u518D\u5C55\u5F00\uFF0C\u4E2D\u95F4\u5168\u662F\u4FA7\u8EAB\u3002\u7ACB\u7ED8\u6CA1\u6709\u7B2C\u4E8C\u5F20\u80CC\u9762\u56FE\u65F6\u7684\u4E1A\u754C\u901A\u6CD5\u3002 */
@keyframes sprite-act-turn {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  45% {
    translate: 2% 0;
    scale: 0.12 1;
    rotate: 0deg;
  }
  55% {
    translate: -2% 0;
    scale: 0.12 1;
    rotate: 0deg;
  }
}

@keyframes sprite-act-shake {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  20% {
    translate: -1.6% 0.4%;
    scale: 1 1;
    rotate: 0.6deg;
  }
  40% {
    translate: 1.6% -0.4%;
    scale: 1 1;
    rotate: -0.6deg;
  }
  60% {
    translate: -1.1% 0.3%;
    scale: 1 1;
    rotate: 0.4deg;
  }
  80% {
    translate: 1.1% -0.3%;
    scale: 1 1;
    rotate: -0.4deg;
  }
}

@keyframes sprite-act-sway {
  0%,
  100% {
    translate: 0 0;
    scale: 1 1;
    rotate: 0deg;
  }
  25% {
    translate: 2.2% -0.6%;
    scale: 0.99 1;
    rotate: 1.2deg;
  }
  75% {
    translate: -2.2% 0.6%;
    scale: 1.01 1;
    rotate: -1.2deg;
  }
}

/* \u8BF4\u8BDD\u8005\u8F7B\u5FAE\u547C\u5438\uFF1A\u5E38\u9A7B\uFF0C\u4E0D\u5199\u5267\u672C\u30020.4% \u5C0F\u5230\u6CA1\u4EBA\u4F1A\u5F53\u6210\u300C\u56FE\u5728\u6296\u300D\uFF0C
   \u4F46\u770B\u5F97\u51FA\u662F\u6D3B\u7684\u3002 */
/* \u547C\u5438\u4E0E\u8FD0\u955C\u5171\u7528 scale \u8FD9\u4E00\u4E2A\u901A\u9053\uFF0C\u6240\u4EE5\u4E24\u8005\u53EA\u5728\u81EA\u5DF1\u751F\u6548\u65F6\u5199 --scale\uFF1A
   .acting \u65F6\u8FD0\u955C\u4E0D\u53C2\u4E0E\uFF08\u6B63\u5728\u6F14\u884C\u4E3A\u8BCD\uFF09\uFF0C\u547C\u5438\u5219\u4E58\u5728 --scale \u5916\u9762\u3002 */
@keyframes sprite-breathe {
  0%,
  100% {
    scale: 1 1;
  }
  50% {
    scale: 1.004 1.004;
  }
}

/* \u8D34\u8FB9\u6863\uFF1A\u7528\u4E8E\u300C\u5728\u6700\u89D2\u843D\u300D\u6216\u975E\u4EBA\u5C0F\u7269\u4EF6\uFF08\u732B/\u9053\u5177\uFF09\u7684\u9ED8\u8BA4\u843D\u70B9\u3002 */
.pos-bleed-left {
  --x: -46cqw;
}

.pos-bleed-right {
  --x: 46cqw;
}

.theater-cg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--stage-bg);
  animation: bg-fade var(--fade-ms) ease;
}

.theater-cg img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.theater-cg-caption {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
  color: #eee;
  font-size: 13.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  margin: 0;
}

/* \u8BF4\u8BDD\u4EBA\uFF1A\u53F0\u8BCD\u6761\u4E0A\u65B9\u3001\u8DDF\u7A97\u8FDE\u7740\u7684\u4E00\u5757\u724C\u3002\u5B83\u4E0D\u662F\u8D34\u7EB8\uFF0C\u662F\u7A97\u7684\u4E00\u90E8\u5206\u2014\u2014\u6240\u4EE5
   \u5E95\u8272\u3001\u63CF\u8FB9\u3001\u5B57\u8272\u5168\u90FD\u53D6\u53F0\u8BCD\u6761\u81EA\u5DF1\u90A3\u5957\uFF08--dialog-*\uFF09\uFF0C\u53EA\u628A\u4E0A\u7F18\u4E24\u4E2A\u89D2\u7559\u5706\u3001
   \u4E0B\u7F18\u5F00\u53E3\u4E0D\u63CF\u8FB9\uFF1A\u4E0A\u5706\u4E0B\u65B9 + \u5DE6\u4FA7\u63CF\u8FB9\uFF0C\u770B\u8D77\u6765\u5C31\u662F\u4ECE\u8FD9\u5757\u7A97\u4E0A\u957F\u51FA\u6765\u7684\u4E00\u622A\u3002
   \u9A91\u5728\u7A97\u6CBF\u4E0A\u4F1A\u628A\u540D\u5B57\u5207\u6210\u4E24\u534A\uFF0C\u6240\u4EE5\u662F\u300C\u8D34\u7740\u300D\uFF0C\u4E0D\u662F\u300C\u538B\u7740\u300D\u3002 */
.dialog-name {
  position: absolute;
  bottom: 100%;
  left: 10px;
  padding: 4px 16px 5px;
  border: 1px solid var(--dialog-line);
  border-bottom: none;
  border-radius: var(--stage-radius) var(--stage-radius) 0 0;
  background: var(--dialog-bg);
  color: var(--dialog-ink);
  backdrop-filter: blur(10px) saturate(1.05);
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.14em;
  line-height: 1.7;
  white-space: nowrap;
}

.dialog-text {
  margin: 0;
  font-family: var(--font-ui);
  font-size: 17px;
  line-height: 2;
  letter-spacing: 0.03em;
  white-space: pre-wrap;
  /* \u6052\u5B9A\u4E09\u884C\u9AD8\uFF1A\u77ED\u53F0\u8BCD\u4E0D\u518D\u8BA9\u6587\u672C\u6846\u5FFD\u9AD8\u5FFD\u4F4E\uFF08\u8D85\u8FC7\u4E09\u884C\u7684\u957F\u53F0\u8BCD\u624D\u81EA\u7136\u957F\u9AD8\uFF09 */
  min-height: 6em;
  color: var(--dialog-ink);
  text-shadow: var(--dialog-text-shadow);
}

/* \u65C1\u767D\u53EA\u5F31\u8272\uFF0C\u4E0D\u5C45\u4E2D\uFF1A\u5C45\u4E2D\u662F\u6392\u7248\u5F0F\u7684\u5206\u578B\uFF0C\u4E00\u6BB5\u8BDD\u88AB\u5C45\u4E2D\u4E4B\u540E\u6BCF\u884C\u8D77\u70B9\u90FD\u5728\u53D8\uFF0C
   \u773C\u775B\u8981\u91CD\u65B0\u627E\u884C\u9996\uFF0C\u8BFB\u957F\u65C1\u767D\u53CD\u800C\u8D39\u52B2\u3002\u8DDF\u53F0\u8BCD\u4E00\u6837\u5DE6\u5BF9\u9F50\uFF0C\u9760\u989C\u8272\u5206\u578B\u5C31\u591F\u3002 */
.dialog-text.narrate {
  color: var(--dialog-ink-soft);
}

.dialog-text.thought {
  color: var(--dialog-ink-thought);
  font-style: italic;
}

.dialog-caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 4px;
  vertical-align: text-bottom;
  background: var(--dialog-ink);
  opacity: 0.8;
  animation: blink 1s step-start infinite;
}

.dialog-hint {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  height: 18px;
  font-size: 11.5px;
  letter-spacing: 0.08em;
  color: var(--dialog-ink-soft);
}

.dialog-hint .muted {
  color: inherit;
}

.dialog-spinner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid currentcolor;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dialog-spinner {
    animation-duration: 2.4s;
  }
}

.dialog-next {
  animation: bob 1.2s ease-in-out infinite;
}

.dialog-rewind {
  background: none;
  border: 0;
  padding: 0;
  color: var(--dialog-ink-soft);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.dialog-rewind:hover {
  color: var(--dialog-ink);
}

.dialog-text.rewinding {
  opacity: 0.78;
}

@keyframes bob {
  50% {
    transform: translateY(3px);
  }
}

/* \u2500\u2500 \u53F0\u8BCD\u6D41\uFF08\u5267\u672C log \u89C6\u56FE\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.stage-view {
  flex: 1;
  overflow-y: auto;
  padding: 20px 4px 28px;
  scrollbar-width: thin;
}

.line {
  margin: 0 0 14px;
}

.line-scene {
  margin: 26px 0 18px;
  text-align: center;
  color: var(--ink-faint);
  font-size: 12.5px;
  letter-spacing: 0.08em;
}

.line-scene span {
  display: inline-block;
  padding: 4px 18px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.line-narrate {
  color: var(--ink-soft);
  text-align: center;
  padding: 0 24px;
}

.line-thought {
  color: var(--ink-faint);
  font-style: italic;
  text-align: center;
  padding: 0 24px;
}

.line-say {
  border-left: 3px solid var(--line);
  padding-left: 12px;
}

.say-name {
  font-weight: 600;
  margin-right: 6px;
}

.say-mood {
  color: var(--ink-faint);
  font-size: 13px;
}

.say-text {
  margin: 2px 0 0;
  white-space: pre-wrap;
}

.stage-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--ink-faint);
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* \u2500\u2500 \u505C\u6B62\u70B9\uFF08\u6D6E\u5728\u821E\u53F0\u4E0A\uFF0C\u4E0D\u5360\u5E95\u90E8\u6761\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* \u53D8\u6697\u53EA\u7ED9\u753B\u9762\uFF08\u80CC\u666F\u56FE / \u7ACB\u7ED8 / CG\uFF09\uFF0C\u4E0D\u7ED9\u76D6\u5728\u753B\u9762\u4E0A\u7684\u90A3\u4E9B\u754C\u9762\u5C42\uFF1A
   \u53F0\u8BCD\u6761\u3001\u5BFC\u6F14\u680F\u3001\u4FA7\u680F\u5524\u51FA\u952E\u3001\u6392\u961F\u7684\u9762\u677F\u2014\u2014\u5B83\u4EEC\u662F\u73A9\u5BB6\u6B64\u523B\u8FD8\u8981\u8BFB\u3001\u8FD8\u8981\u70B9\u7684\uFF0C
   \u8DDF\u7740\u538B\u6697\u7B49\u4E8E\u628A\u9009\u9879\u6446\u5728\u4E00\u6761\u8BFB\u4E0D\u6E05\u7684\u8DEF\u524D\u9762\u3002\u906E\u7F69\u56E0\u6B64\u6302\u5728\u753B\u9762\u533A\u91CC\uFF0C
   \u4E0D\u5728\u9009\u80A2\u5C42\u4E0A\uFF1B\u9009\u80A2\u5C42\u53EA\u7BA1\u6446\u5361\u7247\u3002 */
.theater:has(.choice-overlay) .theater-stage::after {
  content: "";
  position: absolute;
  z-index: 8;
  inset: 0;
  background: var(--choice-scrim);
  pointer-events: none;
}

.choice-seen {
  margin-left: auto;
  flex-shrink: 0;
  font-family: var(--font-ui);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--dialog-ink-faint);
}

/* \u300C\uFF08\u7EE7\u7EED\uFF09\u300D\u90A3\u7C7B\u65E0\u5185\u5BB9\u5361\uFF1A\u8D70\u540C\u4E00\u5F62\u5236\uFF0C\u53EA\u662F\u4E0D\u7ED9\u4E3B\u8272\u6807\u5C3A */
.choice.ghost {
  color: var(--dialog-ink-soft);
  font-size: 14px;
  border-left-color: var(--choice-line);
}
`;var $=require("react/jsx-runtime"),Nr="\uFF08\u7EE7\u7EED\uFF09",Wo="@aivn/stage/stage.css";if(typeof document<"u"&&document.querySelector(`style[data-plugin-css="${Wo}"]`)===null){let a=document.createElement("style");a.dataset.plugin="dsh-aivn",a.dataset.pluginCss=Wo,a.textContent=zo,document.head.appendChild(a)}var $o=({sessionId:a})=>{let[e]=(0,v.useState)(()=>new Fe),[t,o]=(0,v.useState)(0),[r,u]=(0,v.useState)(!1),[n,l]=(0,v.useState)(null),[s,h]=(0,v.useState)(!1),[b,S]=(0,v.useState)(!1),[g,y]=(0,v.useState)(null),[w,i]=(0,v.useState)(null),[k,T]=(0,v.useState)(null),[F,B]=(0,v.useState)(0),U=Qa(),O=(0,v.useRef)(!1),z=(0,v.useRef)(0),L=(0,v.useRef)(!1),I=(0,v.useRef)(!1),x=(0,v.useCallback)(()=>{I.current||(I.current=!0,requestAnimationFrame(()=>{I.current=!1,o(P=>P+1)}))},[]);(0,v.useEffect)(()=>{if(!a)return;let P=!1;return y(null),i(null),T(null),(async()=>{try{let W=await Xo(`/aivn/play?session=${encodeURIComponent(a)}`);if(P||(y(W),!W.dir))return;let q=await Xo(`/aivn/assets?session=${encodeURIComponent(a)}`);P||i(q)}catch(W){P||T(Ko(W))}})(),()=>{P=!0}},[a]),(0,v.useEffect)(()=>{if(!a)return;e.reset(),z.current=0,O.current=!1,L.current=!1,l(null),h(!1),u(!1),B(W=>W+1),x();let P=new EventSource(`/aivn/stream?session=${encodeURIComponent(a)}`);return P.addEventListener("frame",W=>{let q;try{q=JSON.parse(W.data)}catch{return}if(q.seq>z.current+1&&(e.reset(),B(ne=>ne+1),O.current=!1,l(null),h(!1),z.current=q.seq-1),!(q.seq<=z.current)){if(z.current=q.seq,q.kind==="beat"){q.state==="start"?(O.current=!1,l(null),h(!1),u(!0),L.current=!1):(h(!O.current),u(!1));return}q.event.kind==="stop"&&(O.current=!0,l({stopType:q.event.stopType,...q.event.options?{options:q.event.options}:{},...q.event.placeholder?{placeholder:q.event.placeholder}:{}})),e.apply(q.event,q.seq),x()}}),()=>P.close()},[a,e,x]);let N=(0,v.useCallback)(async(P,W)=>{let q=P.trim();if(!q||!a)return!1;try{return await _r("/aivn/input",{session:a,text:q,...W?.silent?{silent:!0}:{}}),!0}catch(ne){return U.push(`\u6CA1\u80FD\u9001\u5230\u5267\u4F5C\u5BB6\uFF1A${Ko(ne)}`,"error"),!1}},[a,U]),Y=(0,v.useCallback)(()=>{L.current||(L.current=!0,N(Nr,{silent:!0}).then(P=>{P||(L.current=!1)}))},[N]),X=e.lines,K=g?.dir?g.config??null:null,we=(0,v.useMemo)(()=>Object.fromEntries((K?.characters??[]).map(P=>[P.id,P.name??P.id])),[K]),te=(0,v.useMemo)(()=>{if(!K||!w||!a)return null;let P=(K.characters??[]).map(W=>({...W,body:""}));return Ya(K.id,w.index,{},w.manifest,P,{assetUrl:W=>`/aivn/asset?session=${encodeURIComponent(a)}&path=${encodeURIComponent(`assets/${W}`)}`})},[K,w,a]),ee=(0,v.useMemo)(()=>et(null,X),[X,t]),H=Ga(e.cues,X,{live:r,resume:!0,revision:t,transcript:ee,turbo:b,resetToken:F}),de=r,re=H.current===null||H.shownLength>=H.current.text.length,fe=!de&&H.exhausted&&re,R=Ua({ready:fe,stopType:n?.stopType??null,isNoStop:s,continueCardOn:!1}),be={beatId:null,beatNodeId:null,lineNodeId:null,lineSeq:H.view?.seq??null,lineText:H.view?.text??""};return a?k?(0,$.jsx)(Ca,{text:`\u821E\u53F0\u6CA1\u63A5\u4E0A\uFF1A${k}`}):g?K?te?(0,$.jsxs)("div",{className:"stage-root aivn-stage-view",style:{height:"100%",minHeight:0},children:[(0,$.jsx)(ja,{visual:H.visual,playback:H,live:r,fresh:X.length===0,names:we,index:te,voiceAvailable:!1,voiceOn:!1,onToggleVoice:ye,busy:de,targets:be,directorBar:!1,onView:ye,onPrompt:P=>{N(P)},onEdit:ye,onFork:ye,onGenerateCg:ye,onReplay:ye,voiceState:()=>"none",onUnlock:ye,onTurbo:S,canContinue:R.clickToContinue,onContinue:Y,overlay:H.scrubbed?null:X.length===0?(0,$.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u5F00\u6F14",children:(0,$.jsx)("div",{className:"choices",children:(0,$.jsx)("button",{type:"button",className:"choice",onClick:()=>{N(K.opening)},children:(0,$.jsx)("span",{className:"choice-text",children:"\u5F00\u6F14"})})})}):fe?(0,$.jsx)(Za,{stop:n,isNoStop:s,showContinue:R.showContinueCard,disabled:de,onChoice:P=>{N(n?.options?.[P]?.text??"")},onFree:P=>{N(P)},onContinue:Y}):null}),(0,$.jsx)(Ja,{toasts:U.toasts,onDismiss:U.dismiss})]}):(0,$.jsx)(Ca,{text:"\u6B63\u5728\u8BFB\u53D6\u5267\u76EE\u7D20\u6750\u2026"}):(0,$.jsx)(Ca,{text:`\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709 play.json\uFF0C\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A${g.dir??""}`}):(0,$.jsx)(Ca,{text:"\u6B63\u5728\u8FDE\u63A5\u821E\u53F0\u2026"}):(0,$.jsx)(Ca,{text:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u821E\u53F0\u3002"})};function ye(){}function Ca({text:a}){return(0,$.jsx)("div",{className:"stage-root aivn-stage-notice",style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,color:"var(--ink, #3b3630)",fontSize:14,textAlign:"center"},children:(0,$.jsx)("span",{children:a})})}async function Xo(a){let e=await fetch(a);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);return e.json()}async function _r(a,e){let t=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`${t.status} ${await t.text()}`)}function Ko(a){return a instanceof Error?a.message:String(a)}var Gr=["slots"];function Vr(a){a.slots.inject("conversation.view",()=>a.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"\u821E\u53F0"},$o))}
/*! Bundled license information:

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-left.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/book-open.mjs:
lucide-react/dist/esm/icons/check.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-left.mjs:
lucide-react/dist/esm/icons/chevron-up.mjs:
lucide-react/dist/esm/icons/corner-up-left.mjs:
lucide-react/dist/esm/icons/crosshair.mjs:
lucide-react/dist/esm/icons/download.mjs:
lucide-react/dist/esm/icons/drama.mjs:
lucide-react/dist/esm/icons/folder-open.mjs:
lucide-react/dist/esm/icons/git-branch.mjs:
lucide-react/dist/esm/icons/hammer.mjs:
lucide-react/dist/esm/icons/image.mjs:
lucide-react/dist/esm/icons/log-out.mjs:
lucide-react/dist/esm/icons/maximize-2.mjs:
lucide-react/dist/esm/icons/message-square.mjs:
lucide-react/dist/esm/icons/messages-square.mjs:
lucide-react/dist/esm/icons/mic.mjs:
lucide-react/dist/esm/icons/panel-left-close.mjs:
lucide-react/dist/esm/icons/panel-left-open.mjs:
lucide-react/dist/esm/icons/pause.mjs:
lucide-react/dist/esm/icons/pen-line.mjs:
lucide-react/dist/esm/icons/pencil.mjs:
lucide-react/dist/esm/icons/play.mjs:
lucide-react/dist/esm/icons/plus.mjs:
lucide-react/dist/esm/icons/rotate-ccw.mjs:
lucide-react/dist/esm/icons/rotate-cw.mjs:
lucide-react/dist/esm/icons/sliders-horizontal.mjs:
lucide-react/dist/esm/icons/sparkles.mjs:
lucide-react/dist/esm/icons/trash.mjs:
lucide-react/dist/esm/icons/triangle-alert.mjs:
lucide-react/dist/esm/icons/undo-2.mjs:
lucide-react/dist/esm/icons/users.mjs:
lucide-react/dist/esm/icons/volume-2.mjs:
lucide-react/dist/esm/icons/volume-x.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/icons/zoom-in.mjs:
lucide-react/dist/esm/icons/zoom-out.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.48.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

		return module.exports;
	}
});