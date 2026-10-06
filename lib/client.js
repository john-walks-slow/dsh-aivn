window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var dr=Object.create;var ba=Object.defineProperty;var nr=Object.getOwnPropertyDescriptor;var fr=Object.getOwnPropertyNames;var ir=Object.getPrototypeOf,cr=Object.prototype.hasOwnProperty;var gt=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},pr=(a,e)=>{for(var t in e)ba(a,t,{get:e[t],enumerable:!0})},Lt=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of fr(e))!cr.call(a,r)&&r!==t&&ba(a,r,{get:()=>e[r],enumerable:!(o=nr(e,r))||o.enumerable});return a};var mr=(a,e,t)=>(t=a!=null?dr(ir(a)):{},Lt(e||!a||!a.__esModule?ba(t,"default",{value:a,enumerable:!0}):t,a)),hr=a=>Lt(ba({},"__esModule",{value:!0}),a);var _o=gt(Q=>{"use strict";var qr=require("react");function No(a){var e="https://react.dev/errors/"+a;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+a+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function xe(){}var ee={d:{f:xe,r:function(){throw Error(No(522))},D:xe,C:xe,L:xe,m:xe,X:xe,S:xe,M:xe},p:0,findDOMNode:null},Or=Symbol.for("react.portal"),Er=Symbol.for("react.recoverable"),Ho=Symbol.for("react.optimistic_key");function Ur(a,e,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Or,key:o==null?null:o===Ho?Ho:""+o,children:a,containerInfo:e,implementation:t}}var ga=qr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Ba(a,e){if(a==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Q.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ee;Q.browser=function(a){return{$$typeof:Er,_reason:a}};Q.createPortal=function(a,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(No(299));return Ur(a,e,null,t)};Q.flushSync=function(a){var e=ga.T,t=ee.p;try{if(ga.T=null,ee.p=2,a)return a()}finally{ga.T=e,ee.p=t,ee.d.f()}};Q.preconnect=function(a,e){typeof a=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,ee.d.C(a,e))};Q.prefetchDNS=function(a){typeof a=="string"&&ee.d.D(a)};Q.preinit=function(a,e){if(typeof a=="string"&&e&&typeof e.as=="string"){var t=e.as,o=Ba(t,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?ee.d.S(a,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:s}):t==="script"&&ee.d.X(a,{crossOrigin:o,integrity:r,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Q.preinitModule=function(a,e){if(typeof a=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=Ba(e.as,e.crossOrigin);ee.d.M(a,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&ee.d.M(a)};Q.preload=function(a,e){if(typeof a=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,o=Ba(t,e.crossOrigin);ee.d.L(a,t,{crossOrigin:o,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Q.preloadModule=function(a,e){if(typeof a=="string")if(e){var t=Ba(e.as,e.crossOrigin);ee.d.m(a,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else ee.d.m(a)};Q.requestFormReset=function(a){ee.d.r(a)};Q.unstable_batchedUpdates=function(a,e){return a(e)};Q.useFormState=function(a,e,t){return ga.H.useFormState(a,e,t)};Q.useFormStatus=function(){return ga.H.useHostTransitionStatus()};Q.version="19.3.0"});var Go=gt((Wd,zo)=>{"use strict";function Vo(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vo)}catch(a){console.error(a)}}Vo(),zo.exports=_o()});var as={};pr(as,{apply:()=>es,inject:()=>Yr});module.exports=hr(as);var It=`/**
 * \u63D2\u4EF6\u4E0E DSH \u5BBF\u4E3B\u754C\u9762\u7684\u63A5\u7F1D\u6837\u5F0F\u3002
 *
 * \u8FD9\u51E0\u6761**\u4E0D\u5C5E\u4E8E\u821E\u53F0\u81EA\u5DF1**\u2014\u2014\`@aivn/stage\` \u8981\u80FD\u5D4C\u8FDB\u4EFB\u4F55\u5BBF\u4E3B\uFF0C\u4E0D\u8BE5\u77E5\u9053 DSH \u7684 DOM \u7ED3\u6784\u3002
 * \u6240\u4EE5\u5B83\u4EEC\u7559\u5728\u8FD9\u91CC\uFF0C\u6309 DSH \u66B4\u9732\u7684\u7A33\u5B9A \`data-*\` \u94A9\u5B50\u5199\uFF08\`data-conversation-content\`\u3001
 * \`data-composer-seat\`\uFF09\uFF0C\u4E0D\u78B0\u54C8\u5E0C\u8FC7\u7684 CSS-module \u7C7B\u540D\u3002
 *
 * \u821E\u53F0\u9875\u7B7E\u4E0B\u85CF\u6389\u539F\u751F\u8F93\u5165\u6846\uFF1A\u90A3\u662F\u7ED9\u804A\u5929\u7528\u7684\u2014\u2014\u821E\u53F0\u81EA\u5DF1\u6709\u51FA\u53E3\uFF08\u9009\u80A2\u5361\u3001\u505C\u6B62\u70B9\u7684\u81EA\u7531\u8F93\u5165\uFF09\uFF0C
 * \u7559\u7740\u53EA\u4F1A\u767D\u5360\u4E0B\u9762 128px\uFF08\`.wSkVaW_scrollBody\` \u662F flex \u5217\uFF0C\u8F93\u5165\u6846 \`flex: none\` \u5360\u591A\u5C11\uFF0C
 * \u821E\u53F0\u5C31\u5C11\u591A\u5C11\uFF09\uFF0C\u624B\u673A\u4E0A\u90A3\u4E00\u5757\u5C24\u5176\u8D35\u3002\u85CF\u6389\u4E4B\u540E\u821E\u53F0\u81EA\u5DF1\u6491\u6EE1\u6574\u680F\u3002
 *
 * \u951A\u5728 \`[data-conversation-content]\` \u4E0A\u800C\u4E0D\u662F \`body\`\uFF1A\u540C\u4E00\u9875\u53EF\u80FD\u6302\u7740\u522B\u7684\u4F1A\u8BDD\u533A\u57DF\uFF0C
 * \u53EA\u6536\u62FE\u821E\u53F0\u6240\u5728\u7684\u90A3\u4E00\u5757\u3002\u5207\u56DE Chat \u9875\u7B7E\u65F6 \`.aivn-stage-view\` \u4E0D\u5728 DOM \u91CC\uFF0C
 * \u89C4\u5219\u81EA\u52A8\u5931\u6548\uFF0C\u8F93\u5165\u6846\u7167\u5E38\u56DE\u6765\u3002
 *
 * \u94A9\u5B50\u6539\u540D\uFF08DSH \u5347\u7EA7\uFF09\u53EA\u4F1A\u8BA9\u8FD9\u6761\u89C4\u5219\u9759\u9ED8\u5931\u6548\u3001\u8F93\u5165\u6846\u91CD\u65B0\u51FA\u73B0\uFF0C\u4E0D\u4F1A\u5F04\u574F\u522B\u7684\u3002
 */
[data-conversation-content]:has(.aivn-stage-view) [data-composer-seat] {
	display: none;
}
`;function Pa(a,e){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${a}"]`)!==null)return;let t=document.createElement("style");t.dataset.plugin="dsh-aivn",t.dataset.pluginCss=a,t.textContent=e,document.head.appendChild(t)}var k=require("react");var c=require("react/jsx-runtime"),M=require("react");var Aa="full";var Fe="normal";var gr=["left","center","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"];function Lr(a){return typeof a=="string"&&gr.includes(a)}var Ir={l:"left",c:"center",r:"right"};function Cr(a,e){return a<=0?[]:(a===2?["left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right","center"]:["center","left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"]).filter(o=>!e.has(o)).slice(0,a)}function Ct(a,e=new Map){let t=new Map,o=a.filter(d=>!e.has(d)),r=new Set;for(let[d,u]of e)a.includes(d)&&r.add(u);let s=Cr(o.length,r);o.forEach((d,u)=>{t.set(d,s[u]??"center")});for(let[d,u]of e)a.includes(d)&&t.set(d,u);return t}function St(a){if(a===void 0)return null;let e=a.trim().toLowerCase();return e===""?null:Lr(e)?e:Ir[e]??null}var Sr={full:{small:{landscape:{top:68,height:32},portrait:{top:66,height:34}},normal:{landscape:{top:18,height:132},portrait:{top:16,height:102}},large:{landscape:{top:14,height:168},portrait:{top:13,height:130}},huge:{landscape:{top:10,height:232},portrait:{top:10,height:178}}},half:{small:{landscape:{top:70,height:30},portrait:{top:68,height:32}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:13,height:126},portrait:{top:12,height:118}},huge:{landscape:{top:8,height:172},portrait:{top:8,height:156}}},square:{small:{landscape:{top:72,height:28},portrait:{top:70,height:30}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:12,height:130},portrait:{top:11,height:122}},huge:{landscape:{top:8,height:184},portrait:{top:8,height:164}}}};function wt(a,e,t="bottom"){let o=Sr[a??Aa][e??Fe];return{landscape:kt(o.landscape,e,t),portrait:kt(o.portrait,e,t)}}function kt(a,e,t){let s=t==="center"?"center":t==="top"?"top center":(e??Fe)==="small"?"bottom center":"top center",d=t==="center"?50-a.height/2:t==="top"?0:a.top;return{top:yt(d),height:yt(a.height),origin:s}}function yt(a){return Math.round(a*100)/100}var kr=["nudge","stagger","jump","nod","bow","turn","shake","sway"];function va(a){return typeof a=="string"&&kr.includes(a)}function bt(a){if(typeof a!="string")return null;let e=a.trim().toLowerCase();return va(e)?`sprite-act-${e}`:null}function Pt(a,e,t){let o=e.trim(),r={},s=d=>{d&&(d.framing&&(r.framing=d.framing),d.stature&&(r.stature=d.stature),d.anchor&&(r.anchor=d.anchor),d.title&&(r.title=d.title))};return s(a[o]),t!==void 0&&t.trim()!==""&&s(a[`${o}/${t.trim()}`]),r}function At(a,e={}){let t=e.sprite?.trim();return t||a}function Da(a,e=!1){return e?"\u8FD8\u6CA1\u5F00\u6F14\u2014\u2014\u6309\u753B\u9762\u4E0A\u7684\u300C\u5F00\u6F14\u300D\u5F00\u59CB\u3002":a?"\u5267\u4F5C\u5BB6\u6B63\u5728\u843D\u7B14\u2026":"\uFF08\u70B9\u51FB\u5F00\u59CB\uFF09"}function Ha(a){return a.hasView?{name:a.viewName,text:a.shown}:{name:null,text:Da(a.live)}}function Na(a){return a.hold?!1:a.nextIsPlayerInput?(!a.hasCurrent||a.currentComplete)&&a.cursor<a.cueCount:!a.live||a.auto?!1:!a.hasCurrent&&a.cursor<a.cueCount}function _a(a){let e={showContinueCard:!1,clickToContinue:!1};return a.ready?a.stopType==="pause"?{...e,clickToContinue:!0}:!a.isNoStop||a.stopType!==null?e:a.continueCardOn?{...e,showContinueCard:!0}:{...e,clickToContinue:!0}:e}var yr=0,Be=class{lines=[];cues=[];openKey=null;scene="";reset(){this.lines.length=0,this.cues.length=0,this.openKey=null,this.scene=""}replaceText(e,t){let o=this.lines.find(r=>r.seq===e);return o?(o.text=t,!0):!1}apply(e,t){let o=()=>`l${yr+=1}`;switch(e.kind){case"scene":{this.openKey=null,this.scene=e.bg??this.scene,this.lines.push({key:o(),type:"scene",seq:t,text:[e.bg,e.bgm,e.ambient].filter(Boolean).join(" \xB7 ")}),this.cues.push({key:o(),kind:"scene",bg:e.bg,bgm:e.bgm,ambient:e.ambient,bgmVolume:e.bgm_volume,ambientVolume:e.ambient_volume,transition:e.transition});return}case"sfx":this.cues.push({key:o(),kind:"sfx",src:e.src,volume:e.volume});return;case"cg":this.cues.push({key:o(),kind:"cg",id:e.id,caption:e.caption});return;case"actor":this.cues.push({key:o(),kind:"actor",id:e.id,pos:e.pos,variant:e.variant,shot:e.shot,anchor:e.anchor,action:e.action,leave:e.leave});return;case"preload_asset":this.cues.push({key:o(),kind:"preload",id:e.id,type:e.type});return;case"say_start":{let r={key:o(),type:"say",actorId:e.id,...e.mood?{mood:e.mood}:{},...e.name?{nameOverride:e.name}:{},seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"narrate_start":{let r={key:o(),type:"narrate",seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"thought_start":{let r={key:o(),type:"thought",actorId:e.id,seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"say_text":case"narrate_text":case"thought_text":{let r=this.lines.at(-1);r&&r.key===this.openKey&&(r.text+=e.delta);return}case"say_end":case"narrate_end":case"thought_end":this.openKey=null;return;case"player_input":{let r={key:o(),type:"input",actorId:"player",seq:t,text:e.text};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=null;return}case"stop":return}}};function Ma(a,e){return e?a[e]??(e==="player"?"\u4F60":e):""}var S=require("react");function Mt(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(s=>s.key===r.lineKey)?.nodeId===t)return o}return-1}function Tt(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(s=>s.key===r.lineKey)?.seq===t)return o}return-1}function Ft(a,e,t){let o=t.nodeId?Mt(a,e,t.nodeId):typeof t.seq=="number"?Tt(a,e,t.seq):-1;if(o<0)return{cueIndex:-1,shownLength:0};let r=a[o];if(r.kind!=="line")return{cueIndex:o,shownLength:0};let s=e.find(u=>u.key===r.lineKey),d=t.offset??t.len??0;return{cueIndex:o,shownLength:Math.min(d,s?.text.length??0)}}function wr(){return{resolvedPos:"center",variant:null,shot:null,anchor:null,action:null,actionSeq:0}}function Bt(a,e){let t=!!e.leave||e.action==="exit"||e.action==="leave",o=a[e.id],r=t?o?{...a,[e.id]:{...o,leaving:!0}}:a:{...a,[e.id]:{...a[e.id]??wr(),pos:St(e.pos)??a[e.id]?.pos,variant:e.variant??a[e.id]?.variant??null,shot:e.shot??a[e.id]?.shot??null,anchor:e.anchor??a[e.id]?.anchor??null,action:va(e.action)?e.action:null,actionSeq:va(e.action)?(a[e.id]?.actionSeq??0)+1:a[e.id]?.actionSeq??0,leaving:!1}},s=new Map;for(let[l,h]of Object.entries(r))h.pos&&!h.leaving&&s.set(l,h.pos);let d=Object.keys(r).filter(l=>!r[l].leaving),u=Ct(d,s);return Object.fromEntries(Object.entries(r).map(([l,h])=>[l,{...h,resolvedPos:h.leaving?h.resolvedPos:u.get(l)??"center"}]))}function za(a,e){let t=a?.actorId;return t&&e[t]?t:null}var br=6e5;function Rt(a){return a!=null&&a>0?a:br}var Ta={bg:null,bgm:null,ambient:null,transition:null,cg:null,sprites:{},pending:{}},Pr=new Set(["none",""]);function Va(a,e){return e===void 0?a:Pr.has(e.trim().toLowerCase())?null:e}function Ga(a,e){switch(e.kind){case"scene":return{...a,bg:e.bg??a.bg,transition:e.transition??"fade",cg:e.bg?null:a.cg};case"cg":return{...a,cg:{id:e.id,caption:e.caption}};case"actor":return{...a,cg:null,sprites:Bt(a.sprites,e)};default:return a}}function qt(a,e){let t=Ga(a,e);switch(e.kind){case"scene":return{...t,bgm:Va(t.bgm,e.bgm),ambient:Va(t.ambient,e.ambient),bgmVolume:e.bgmVolume??t.bgmVolume,ambientVolume:e.ambientVolume??t.ambientVolume};case"preload":return e.type==="sprite"?t:{...t,pending:{...t.pending,[e.id]:{type:e.type,at:Date.now()}}};default:return t}}function Ar(a){let e={};for(let[t,o]of Object.entries(a))o.leaving||(e[t]=o);return e}function Ot(a,e){let t=Ta;for(let o=0;o<e;o+=1)t=Ga(t,a[o]);return{...t,sprites:Ar(t.sprites)}}function Et(a,e,t){let o=e?t?.get(e):void 0;return o?{...a,cg:{id:o}}:a}function Ut(a,e,t){return t?a?.nodeId??null:e?.nodeId??a?.nodeId??null}function Ht(a,e,t){let o=s=>{for(let d=0;d<a.length;d+=1){let u=a[d];if(u.kind==="line"&&u.lineKey===s)return d}return-1},r=e[t];if(!r)return null;if(r.kind==="line"){let s=o(r.key);return s<0?null:s}for(let s=t+1;s<e.length;s+=1){let d=e[s];if(d.kind!=="line")continue;let u=o(d.key);return u<0?null:u}return a.length}function vt(a,e){for(let t=a.length-1;t>=0;t-=1)if(a[t].key===e)return t;return-1}function vr(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}var Dr=new Set(["\u3002","\uFF01","\uFF1F","\u2026","\u2014","\u300D","\u300F"]),Mr=new Set(["\uFF0C","\u3001","\uFF1B","\uFF1A","\uFF09",".",",","!","?",";"]),Re=null;function Dt(){let a=Date.now();if(Re&&a-Re.at<250)return Re.value;let e=getComputedStyle(document.documentElement),t=(o,r)=>{let s=Number.parseInt(e.getPropertyValue(o),10);return Number.isFinite(s)&&s>=0?s:r};return Re={at:a,value:{char:t("--type-ms",35),short:t("--pause-short-ms",120),long:t("--pause-long-ms",240)}},Re.value}function Tr(a,e){let t=a[e-1];if(!t)return Dt().char;let o=Dt();return Dr.has(t)?o.char+o.long:Mr.has(t)?o.char+o.short:o.char}function Wa(a,e,t){let[o,r]=(0,S.useState)(Ta),[s,d]=(0,S.useState)(null),[u,l]=(0,S.useState)(0),[h,b]=(0,S.useState)(!1),[y,C]=(0,S.useState)(null),[A,v]=(0,S.useState)(null),i=(0,S.useRef)(0),w=(0,S.useRef)(!t.resume),F=(0,S.useRef)(t.resumeAfterReset===!0),B=(0,S.useRef)(e);B.current=e;let R=t.transcript,_=(0,S.useRef)(R);_.current=R;let E=(0,S.useRef)({});E.current={onLineStart:t.onLineStart,onFastForward:t.onFastForward};let ae=(0,S.useRef)(t.resumeAt??null);(0,S.useEffect)(()=>{t.resumeAt&&(ae.current=t.resumeAt)},[t.resumeAt]);let L=s?B.current.find(m=>m.key===s)??null:null,x=t.turbo??!1,I=s?vt(R,s):-1,z=A!==null?R[A]??null:L?vr(L):null,K=A!==null,J=Ut(z,L,K),j=(0,S.useRef)(I);j.current=I;let oe=(0,S.useCallback)(m=>{v(D=>{let O=_.current,N=j.current>=0?j.current:O.length-1,q=Math.max(0,Math.min((D??N)+m,N));return q>=N?null:q})},[]),te=(0,S.useCallback)(m=>{r(D=>qt(D,m))},[]),X=(0,S.useCallback)(()=>{for(;;){let m=a[i.current];if(!m)return;if(i.current+=1,m.kind==="line"){let D=B.current.find(O=>O.key===m.lineKey)??null;d(m.lineKey),l(D?.type==="input"?D.text.length:0),E.current.onLineStart?.(D);return}if(m.kind==="sfx"){C({key:m.key,src:m.src,volume:m.volume});continue}te(m)}},[a,te]),V=L!==null&&u>=L.text.length,de=L===null||V,re=a.length<=i.current&&(L===null||V),Le=(0,S.useCallback)(()=>{if(!de){l(L?.text.length??0),E.current.onFastForward?.();return}X()},[de,L,X]);(0,S.useEffect)(()=>{if(!L||u>=L.text.length)return;if(x){l(L.text.length),E.current.onFastForward?.();return}let m=setTimeout(()=>l(D=>D+1),Tr(L.text,u));return()=>clearTimeout(m)},[L,u,x]),(0,S.useEffect)(()=>{if(!x||A!==null||L&&u<L.text.length||i.current>=a.length)return;let m=setTimeout(()=>X(),30);return()=>clearTimeout(m)},[x,A,L,u,a,X,t.revision]),(0,S.useEffect)(()=>{if(!h||x||t.hold)return;if(!L){if(i.current>=a.length)return;let N=setTimeout(()=>X(),400);return()=>clearTimeout(N)}if(!V||!a[i.current])return;let D=Math.min(900+L.text.length*55,3200),O=setTimeout(()=>X(),D);return()=>clearTimeout(O)},[h,L,V,a,X,t.revision,t.hold,x]);let U=(0,S.useRef)(t.resetToken??0);(0,S.useEffect)(()=>{let m=t.resetToken??0;m!==U.current&&(U.current=m,i.current=0,d(null),l(0),v(null),r(Ta),w.current=!1,F.current=t.resumeAfterReset===!0,ae.current=t.seekTo??null)},[t.resetToken,t.resumeAfterReset,t.seekTo]),(0,S.useEffect)(()=>{if(a.length<i.current){i.current=0,d(null),l(0),v(null),r(Ta);return}if(!w.current&&a.length>0){w.current=!0;let m=ae.current;ae.current=null;let D=m?Ft(a,B.current,m):null,O=D?.cueIndex??-1;if(D&&O>=0){for(let g=0;g<=O;g+=1)te(a[g]);let q=a[O];i.current=O+1,q.kind==="line"&&(d(q.lineKey),l(D.shownLength));return}for(let q=0;q<a.length;q+=1)te(a[q]);i.current=a.length;let N=null;for(let q of a)q.kind==="line"&&(N=q.lineKey);if(N&&F.current){d(N);let q=B.current.find(g=>g.key===N);l(q?.text.length??0)}}},[t.revision,a,te]),(0,S.useEffect)(()=>{let m=L;!m||m.nodeId===void 0&&m.seq===void 0||E.current.onRead?.({nodeId:m.nodeId??"",offset:u,...m.seq!==void 0?{seq:m.seq}:{},len:u})},[L,u]),(0,S.useEffect)(()=>{let m=a[i.current],D=m?.kind==="line"&&(B.current.find(q=>q.key===m.lineKey)?.type??null)==="input";if(!Na({live:t.live,auto:h,hold:t.hold===!0,hasCurrent:L!==null,currentComplete:L===null||u>=L.text.length,cursor:i.current,cueCount:a.length,nextIsPlayerInput:D}))return;let N=setTimeout(()=>X(),80);return()=>clearTimeout(N)},[t.live,h,L,u,a,X,t.revision,t.hold]);let Ie=Rt(t.assetsTtlMs);(0,S.useEffect)(()=>{if(Object.keys(o.pending).length===0)return;let m=setInterval(()=>{let D=Date.now();r(O=>{let N=Object.entries(O.pending).filter(([,g])=>D-g.at>=Ie).map(([g])=>g);if(N.length===0)return O;let q={...O.pending};for(let g of N)delete q[g];return{...O,pending:q}})},5e3);return()=>clearInterval(m)},[o.pending,Ie]);let be=(0,S.useCallback)(m=>{m.length!==0&&r(D=>{if(Object.keys(D.pending).length===0)return D;let O={...D.pending};for(let N of m)delete O[N];return{...D,pending:O}})},[]),Pe=(0,S.useMemo)(()=>R.slice(0,Math.max(I,0)).reverse(),[R,I]),Ce=(0,S.useMemo)(()=>{if(A===null)return null;let m=Ht(a,R,A);return m===null?null:{...Ot(a,m),bgm:o.bgm,ambient:o.ambient,bgmVolume:o.bgmVolume,ambientVolume:o.ambientVolume,pending:o.pending}},[A,a,R,o.bgm,o.ambient,o.bgmVolume,o.ambientVolume,o.pending]),Ae=(0,S.useCallback)(m=>{let D=vt(_.current,m);D<0||v(D>=j.current?null:D)},[]),H=(0,S.useCallback)(()=>{v(null)},[]);return{visual:Et(Ce??o,J,t.cgByNode),current:L,view:z,viewLength:K?z?.text.length??0:u,shownLength:u,exhausted:re,auto:h,setAuto:b,advance:Le,scrub:oe,scrubbed:K,history:Pe,seek:Ae,follow:H,sfx:y,settleAssets:be}}function Xa(a){return Math.min(1,Math.max(0,a))}function Nt(a){return new URL(a,location.href).href}var De=class{base;active=null;retired=null;ramps=new Map;constructor(e){this.base=e}set(e,t){let o=Xa(t??this.base);if(e===null){this.retire();return}let r=Nt(e);if(this.active?.src===r){this.rampTo(this.active,o);return}this.retire();let s=new Audio(r);s.loop=!0,s.preload="auto",s.volume=0,this.active=s,s.play().catch(()=>{}),this.rampTo(s,o)}retire(){if(!this.active)return;let e=this.active;this.active=null,this.retired&&this.discard(this.retired),this.retired=e,this.rampTo(e,0,()=>this.discard(e))}discard(e){this.cancelRamp(e),e.pause(),e.removeAttribute("src"),e.load(),this.retired===e&&(this.retired=null)}rampTo(e,t,o){this.cancelRamp(e);let r=e.volume;if(Math.abs(t-r)<.01){e.volume=t,o?.();return}let s=Math.max(1,Math.round(1200/50)),d=0,u=window.setInterval(()=>{d+=1,e.volume=Xa(r+(t-r)*(d/s)),!(d<s)&&(window.clearInterval(u),this.ramps.delete(e),o?.())},50);this.ramps.set(e,u)}cancelRamp(e){let t=this.ramps.get(e);t!==void 0&&(window.clearInterval(t),this.ramps.delete(e))}dispose(){for(let e of[this.active,this.retired])e&&this.discard(e);this.active=null,this.retired=null}},qe=class{playing=new Set;play(e,t=.7){if(this.playing.size>=6){let r=this.playing.values().next().value;r&&(this.playing.delete(r),r.pause())}let o=new Audio(Nt(e));o.volume=Xa(t),o.addEventListener("ended",()=>this.playing.delete(o)),o.addEventListener("error",()=>this.playing.delete(o)),this.playing.add(o),o.play().catch(()=>this.playing.delete(o))}dispose(){for(let e of this.playing)e.pause();this.playing.clear()}};var Eo=require("react/jsx-runtime");var Fa=require("react");var _t=a=>a?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Vt(a,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:_t(a),size:24,node:e,...t.length>0?{aliases:t}:{}}}var zt=a=>{let e="",t=!1;for(let o of a){if(o==="-"||o==="_"||o<=" "){t=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=t?o.toUpperCase():o,t=!1}return e};var Gt=a=>{let e=zt(a);return e.charAt(0).toUpperCase()+e.slice(1)};var Ee=require("react");var Oe=(...a)=>a.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();var ne={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function Ka(a){return a!=null}function Wt(a,e={}){let t=e.attributeNames??{},o=C=>t[C]??C,r=a.size??a.width??ne.width,s=a.size??a.height??ne.height,d=a.aliases?.filter(C=>typeof C=="string"&&C.trim()!=="").map(C=>`lucide-${C}`)??[],u=[...a.name?[`lucide-${a.name}`]:[],...d],l=e.className?.split(" ").filter(Boolean)??[],h=e.includeDefaultClasses===!1?Oe(...l):Oe("lucide",...u,...l),b=e.absoluteStrokeWidth?Number(e.strokeWidth??ne["stroke-width"])*Number(a.size??a.width??ne.width)/Number(e.size??e.width??ne.width):e.strokeWidth??ne["stroke-width"];return["svg",{...Object.entries(ne).reduce((C,[A,v])=>(C[o(A)]=v,C),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&Ka(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&Ka(e.width)&&{[o("width")]:e.width},..."height"in e&&Ka(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:b,...h&&{[o("class")]:h},[o("viewBox")]:`0 0 ${r} ${s}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},a.node.map(C=>{let[A,v,i]=C,w=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...v}:v;return i?[A,w,i]:[A,w]})]}function Xt(a,e={}){return Wt(a,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var Kt=a=>{for(let e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var Me=require("react");var Fr=(0,Me.createContext)({});var jt=()=>(0,Me.useContext)(Fr);var $t=(0,Ee.forwardRef)(({color:a,size:e,width:t,height:o,strokeWidth:r,absoluteStrokeWidth:s,nonScalingStroke:d,className:u="",children:l,iconNode:h=[],icon:b={node:h,aliases:[],size:24},...y},C)=>{let{size:A=24,strokeWidth:v=2,absoluteStrokeWidth:i=!1,nonScalingStroke:w=!1,color:F="currentColor",className:B=""}=jt()??{},R=!!l||Kt(y),[_,E,ae=[]]=Xt(b,{color:a??F,width:t??e??A,height:o??e??A,strokeWidth:r??v,absoluteStrokeWidth:s??i,nonScalingStroke:d??w,className:Oe(B,u),hasA11yProp:R,attributes:y});return(0,Ee.createElement)(_,{ref:C,...E},[...ae.map(([L,x])=>(0,Ee.createElement)(L,x)),...Array.isArray(l)?l:[l]])});function n(a,e=[],t=[]){let o=typeof a=="string"?Vt(a,e,t):a,r=(0,Fa.forwardRef)(({className:s,...d},u)=>(0,Fa.createElement)($t,{ref:u,icon:o,className:s,...d}));return o.name&&(r.displayName=Gt(o.name)),r}var Zt={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};Zt.node;var Ue=n(Zt);var Qt={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Qt.node;var He=n(Qt);var Jt={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};Jt.node;var Ne=n(Jt);var Yt={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Yt.node;var _e=n(Yt);var eo={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};eo.node;var Ve=n(eo);var ao={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};ao.node;var ze=n(ao);var to={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};to.node;var Ge=n(to);var oo={name:"corner-up-left",size:24,node:[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}],["path",{d:"M9 14 4 9l5-5",key:"102s5s"}]]};oo.node;var Te=n(oo);var ro={name:"crosshair",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]};ro.node;var We=n(ro);var so={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};so.node;var Xe=n(so);var uo={name:"drama",size:24,node:[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]};uo.node;var Ke=n(uo);var lo={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};lo.node;var je=n(lo);var no={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};no.node;var $e=n(no);var fo={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};fo.node;var Ze=n(fo);var io={name:"image",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]};io.node;var Qe=n(io);var co={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};co.node;var Je=n(co);var po={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};po.node;var Ye=n(po);var mo={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};mo.node;var ea=n(mo);var ho={name:"messages-square",size:24,node:[["path",{d:"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",key:"1n2ejm"}],["path",{d:"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",key:"1qfcsi"}]]};ho.node;var aa=n(ho);var xo={name:"mic",size:24,node:[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]};xo.node;var ta=n(xo);var go={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};go.node;var fe=n(go);var Lo={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};Lo.node;var ie=n(Lo);var Io={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Io.node;var oa=n(Io);var Co={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};Co.node;var ce=n(Co);var So={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};So.node;var ra=n(So);var ko={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};ko.node;var sa=n(ko);var yo={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};yo.node;var ua=n(yo);var wo={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};wo.node;var la=n(wo);var bo={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};bo.node;var da=n(bo);var Po={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};Po.node;var na=n(Po);var Ao={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Ao.node;var pe=n(Ao);var vo={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};vo.node;var me=n(vo);var Do={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};Do.node;var he=n(Do);var Mo={name:"undo-2",size:24,node:[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]};Mo.node;var fa=n(Mo);var To={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};To.node;var ia=n(To);var Fo={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};Fo.node;var ca=n(Fo);var Bo={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};Bo.node;var pa=n(Bo);var Ro={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Ro.node;var ma=n(Ro);var qo={name:"zoom-in",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};qo.node;var ha=n(qo);var Oo={name:"zoom-out",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Oo.node;var xa=n(Oo);var Br={back:Ue,exit:Je,forward:He,plus:ua,close:ma,check:_e,alert:he,chat:ea,backlog:aa,files:je,assets:Qe,users:ia,drama:Ke,craft:ce,memory:Ne,settings:na,workshop:Ze,expand:Ye,shrink:fe,unshrink:ie,refresh:da,reply:Te,return:Te,download:Xe,pencil:ra,undo:fa,rewrite:la,remove:me,fork:$e,sparkles:pe,play:sa,pause:oa,volume:ca,mic:ta,"volume-off":pa,prev:ze,down:Ve,up:Ge,zoomIn:ha,zoomOut:xa,locate:We};function W({name:a,size:e=15}){let t=Br[a];return(0,Eo.jsx)(t,{size:e,strokeWidth:1.75,"aria-hidden":"true",style:{display:"block"}})}var Uo=require("react"),Rr=[];function ja(){return Rr.length>0}var se=require("react/jsx-runtime"),La=require("react"),Wo=mr(Go(),1);function Ia({title:a,hint:e,onClose:t,dismissible:o=!0,children:r,footer:s,width:d=520}){let u=(0,La.useRef)(null);return(0,La.useEffect)(()=>{let h=u.current?.querySelector("input, textarea, button");h?.focus(),h instanceof HTMLInputElement&&h.select()},[]),(0,La.useEffect)(()=>{let l=h=>{h.key==="Escape"&&(h.stopPropagation(),o&&t())};return window.addEventListener("keydown",l,!0),()=>window.removeEventListener("keydown",l,!0)},[o,t]),(0,Wo.createPortal)((0,se.jsx)("div",{className:"modal-scrim stage-root",role:"dialog","aria-modal":"true","aria-label":a,onClick:l=>{l.stopPropagation(),o&&t()},onTouchStart:l=>l.stopPropagation(),onTouchMove:l=>l.stopPropagation(),onTouchEnd:l=>l.stopPropagation(),children:(0,se.jsxs)("div",{className:"modal-card",style:{width:d},ref:u,onClick:l=>l.stopPropagation(),children:[(0,se.jsxs)("header",{className:"modal-head",children:[(0,se.jsx)("h2",{className:"modal-title",children:a}),o&&(0,se.jsx)("button",{type:"button",className:"modal-x",onClick:t,"aria-label":"\u5173\u95ED",children:"\u2715"})]}),e&&(0,se.jsx)("p",{className:"modal-hint",children:e}),(0,se.jsx)("div",{className:"modal-body",children:r}),s&&(0,se.jsx)("footer",{className:"modal-foot",children:s})]})}),document.body)}var ue=require("react/jsx-runtime");function $a({candidates:a,selected:e,onToggle:t}){if(a.length===0)return(0,ue.jsx)("div",{className:"ref-picker-empty muted small",children:"\u6682\u65E0\u53EF\u7528\u7ACB\u7ED8\u7684\u89D2\u8272\uFF08\u9700\u5148\u6709\u7ACB\u7ED8\u624D\u53EF\u4F5C\u4E3A\u57AB\u56FE\u53C2\u8003\uFF09"});let o=new Set(e),r=[...e.map(s=>a.find(d=>d.id===s)).filter(s=>!!s),...a.filter(s=>!o.has(s.id))];return(0,ue.jsx)("div",{className:"ref-picker-grid",role:"group","aria-label":"\u9009\u62E9\u53C2\u8003\u7ACB\u7ED8\u89D2\u8272",children:r.map(s=>{let d=e.indexOf(s.id),u=d!==-1;return(0,ue.jsxs)("button",{type:"button",className:`ref-picker-chip ${u?"selected":""}`,onClick:()=>t(s.id),title:u?`\u7B2C ${d+1} \u4F4D\u53C2\u8003\u56FE\uFF1A${s.name}\uFF08\u70B9\u51FB\u53D6\u6D88\uFF09`:`\u6DFB\u52A0\u53C2\u8003\uFF1A${s.name}`,"aria-pressed":u,children:[s.spriteUrl?(0,ue.jsx)("img",{src:s.spriteUrl,alt:s.name,className:"ref-chip-thumb"}):(0,ue.jsx)("span",{className:"ref-chip-blank",children:(0,ue.jsx)(W,{name:"users",size:14})}),(0,ue.jsx)("span",{className:"ref-chip-name",children:s.name}),u&&(0,ue.jsx)("span",{className:"ref-chip-order",children:d+1})]},s.id)})})}function Za(a,e){return a.includes(e)?a.filter(t=>t!==e):[...a,e]}function Qa(a,e){return e?!0:a.trim().length>0}var Ca={prompt:{title:"\u63D0\u793A",hint:"",placeholder:"\u5199\u4E00\u53E5\u2026",submit:()=>"\u53D1\u9001"},edit:{title:"\u6539\u5199\u8FD9\u53E5",hint:"\u53EA\u6539\u8FD9\u4E00\u53E5\uFF0C\u5267\u60C5\u7167\u65E7\u5F80\u4E0B\u8D70\u3002",placeholder:"\u6539\u5199\u8FD9\u53E5\u2026",submit:()=>"\u6539\u5199"},restart:{title:"\u91CD\u65B0\u751F\u6210",hint:"\u4ECE\u8FD9\u4E00\u8F6E\u5F00\u5934\u91CD\u5199\uFF1A\u539F\u6709\u5185\u5BB9\u6574\u6BB5\u7559\u4F5C\u65E7\u679D\uFF0C\u53EF\u4EE5\u4EA4\u4EE3\u4E00\u53E5\u8981\u6C42\uFF08\u7559\u7A7A\u5C31\u662F\u7EAF\u91CD\u5199\uFF09\u3002",placeholder:"\u60F3\u6362\u4EC0\u4E48\u65B9\u5411\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u91CD\u65B0\u751F\u6210 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u91CD\u65B0\u751F\u6210"},fork:{title:"\u5206\u5C94",hint:"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",placeholder:"\u65B0\u5206\u652F\u7684\u7B2C\u4E00\u53E5\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u5206\u5C94 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u5206\u5C94"},cg:{title:"\u751F\u6210\u63D2\u56FE",hint:"\u7559\u7A7A = \u6309\u521A\u624D\u8FD9\u4E00\u5E55\u6784\u56FE\u3002",placeholder:"\u60F3\u753B\u6210\u4EC0\u4E48\u6837\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:()=>"\u751F\u6210"}},Hr={guide:"\u6392\u8FDB\u961F\u5217\uFF0C\u968F\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1\u9001\u3002",fork:"\u4ECE\u6B63\u5728\u770B\u7684\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002"};function Xo(a){return a instanceof HTMLElement&&(a.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(a.tagName))}var Ra="OOC\uFF1A",Nr={wide:.86,normal:1,close:1.35,extreme:1.85};function _r({url:a,pos:e,name:t,framing:o,stature:r,shot:s,anchor:d,leaving:u,action:l,actionSeq:h,dim:b}){let[y,C]=(0,M.useState)(a),[A,v]=(0,M.useState)(null);(0,M.useEffect)(()=>{if(!a||a===y)return;let L=new Image,x;return L.onload=()=>{v(y),C(a),x=setTimeout(()=>v(null),260)},L.src=a,()=>{L.onload=null,x&&clearTimeout(x)}},[a,y]);let[i,w]=(0,M.useState)(!1),[F,B]=(0,M.useState)(0);if((0,M.useEffect)(()=>{if(!l){w(!1);return}w(!0),B(x=>x+1);let L=setTimeout(()=>w(!1),560);return()=>clearTimeout(L)},[l,h]),!y)return null;let R=`theater-sprite pos-${e}${u?" leaving":" entering"}${i?" acting":""}${b?" dim":""}`,_=wt(o,r,d),E={"--scale":Nr[s??"normal"],"--sprite-top":`${_.landscape.top}%`,"--sprite-height":`${_.landscape.height}%`,"--sprite-origin":_.landscape.origin,"--sprite-top-portrait":`${_.portrait.top}%`,"--sprite-height-portrait":`${_.portrait.height}%`,"--sprite-origin-portrait":_.portrait.origin,"--sprite-act":bt(l)??"none","--act-nonce":`-${F%100/1e3}s`},ae=()=>{v(null),C(null)};return(0,c.jsxs)(c.Fragment,{children:[A&&(0,c.jsx)("img",{className:`${R} sprite-out`,src:A,alt:"","aria-hidden":!0}),(0,c.jsx)("img",{className:R,style:E,src:y,alt:t,onError:ae})]})}function Ja({visual:a,playback:e,live:t,fresh:o,names:r,index:s,voiceAvailable:d,busy:u,targets:l,onPrompt:h,onEdit:b,onFork:y,onGenerateCg:C,onReplay:A,voiceState:v,voiceOn:i,onToggleVoice:w,onUnlock:F,onView:B,canContinue:R,onContinue:_,onTurbo:E,overlay:ae,directorBar:L=!0}){let x=(0,M.useRef)(null);x.current||(x.current={bgm:new De(.28),ambient:new De(.16),sfx:new qe}),(0,M.useEffect)(()=>{let f=x.current;return()=>{f.bgm.dispose(),f.ambient.dispose(),f.sfx.dispose()}},[]);let[I,z]=(0,M.useState)(null),[K,J]=(0,M.useState)(""),[j,oe]=(0,M.useState)([]),[te,X]=(0,M.useState)(!0),[V,de]=(0,M.useState)("guide"),[re,Le]=(0,M.useState)(!1),{view:U,viewLength:Ie,current:be,shownLength:Pe,exhausted:Ce,advance:Ae,scrub:H,scrubbed:m,follow:D}=e,O=U?U.text.slice(0,Ie):"",N=be!==null&&Pe>=be.text.length,q=Ha({viewName:U&&(U.type==="say"||U.type==="thought")?U.nameOverride??(Ma(r,U.actorId)||"\uFF1F"):null,shown:O,hasView:U!==null,live:t}),g=!U&&o?Da(t,o):q.text,G=za(U,a.sprites),P=(0,M.useCallback)(()=>{if(F(),re){Le(!1);return}m?H(1):R?_():Ae()},[F,re,m,H,R,_,Ae]),Se=(0,M.useRef)(null),nt=(0,M.useRef)(null),ft=(0,M.useRef)(null);(0,M.useEffect)(()=>{let f=Se.current,p=nt.current;if(!f||!p)return;let Z=ft.current,Y=()=>{f.style.setProperty("--dialog-h",`${p.offsetHeight}px`),f.style.setProperty("--dir-h",`${Z?.offsetHeight??0}px`)};Y();let ye=new ResizeObserver(Y);return ye.observe(p),Z&&ye.observe(Z),()=>ye.disconnect()},[L]),(0,M.useEffect)(()=>{let f=Se.current;if(!f)return;let p=Z=>{Math.abs(Z.deltaY)<4||H(Z.deltaY>0?1:-1)};return f.addEventListener("wheel",p,{passive:!1}),()=>f.removeEventListener("wheel",p)},[H]),(0,M.useEffect)(()=>{let f=p=>{if(!(p.metaKey||p.ctrlKey||p.altKey||Xo(p.target))&&!(p.key==="Escape"&&ja())){if(re){(p.key==="h"||p.key==="H"||p.key===" "||p.key==="Escape")&&(Le(!1),p.preventDefault());return}p.key==="ArrowUp"||p.key==="ArrowLeft"?(H(-1),p.preventDefault()):p.key==="ArrowDown"||p.key==="ArrowRight"?(H(1),p.preventDefault()):p.key===" "?(I||P(),p.preventDefault()):p.key==="Escape"&&m?(H(1),p.preventDefault()):p.key==="Escape"&&I?(z(null),J(""),p.preventDefault()):(p.key==="l"||p.key==="L")&&(B("backlog"),p.preventDefault())}};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[H,m,I,B,re,P]),(0,M.useEffect)(()=>{let f=Y=>{Y.key==="Control"&&!Xo(Y.target)&&E(!0)},p=Y=>{Y.key==="Control"&&E(!1)},Z=()=>E(!1);return window.addEventListener("keydown",f),window.addEventListener("keyup",p),window.addEventListener("blur",Z),()=>{window.removeEventListener("keydown",f),window.removeEventListener("keyup",p),window.removeEventListener("blur",Z)}},[E]);let Oa=(0,M.useRef)(null),or=f=>{F();let p=f.touches[0];p&&(Oa.current={x:p.clientX,y:p.clientY,at:Date.now()})},rr=f=>{let p=Oa.current;if(Oa.current=null,re||!p)return;let Z=f.changedTouches[0];if(!Z||Date.now()-p.at>800)return;let Y=Z.clientX-p.x,ye=Z.clientY-p.y;Math.abs(Y)<45&&Math.abs(ye)<45||(Math.abs(Y)>Math.abs(ye)?H(Y>0?-1:1):ye<0&&B("backlog"))};(0,M.useEffect)(()=>{let f=e.sfx;if(!f)return;let p=s.sfx(f.src);p&&x.current.sfx.play(p,f.volume??.7)},[e.sfx,s]);let it=s.bgm(a.bgm),ct=s.ambient(a.ambient);(0,M.useEffect)(()=>{x.current.bgm.set(it,a.bgmVolume)},[it,a.bgmVolume]),(0,M.useEffect)(()=>{x.current.ambient.set(ct,a.ambientVolume)},[ct,a.ambientVolume]);let wa=s.bg(a.bg),Ea=s.cg(a.cg?.id??null),sr=!wa&&!!a.bg&&a.pending[a.bg]?.type==="bg",pt=a.cg?.id??null,ur=!Ea&&!!pt&&a.pending[pt]?.type==="cg",mt=()=>{let f=K.trim(),p=I==="prompt"&&V==="fork"?"fork":I??"prompt";if(J(""),z(null),p==="prompt"){f&&h(f);return}if(p==="edit"){f&&l.lineNodeId&&b(l.lineNodeId,f);return}if(p==="cg"){C(f,{referenceCharacters:j.length>0?j:void 0,useHistory:te,anchorNodeId:m?l.lineNodeId??U?.nodeId??null:void 0});return}if(p==="restart"){if(!l.beatId)return;y(l.beatId,{resume:!0,...l.beatNodeId?{replaced:l.beatNodeId}:{},...f?{instruction:f}:{}});return}l.lineSeq!==null&&y(l.lineSeq,f?{instruction:f}:void 0)},ve=v(U?.seq??null),ht=u?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u6539\u5199":l.lineNodeId?null:"\u8FD9\u91CC\u6CA1\u6709\u5267\u4F5C\u5BB6\u7684\u53F0\u8BCD\u53EF\u6539",xt=u?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u5199":l.beatId?null:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u9000\u56DE\u53BB\u7684\u4E00\u8F6E",Ua=l.lineSeq===null?"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u5206\u5C94\u7684\u4F4D\u7F6E":null,ke=I==="prompt"&&V==="fork"?"fork":I??"prompt",lr=ke==="edit"?K.trim()===""||!l.lineNodeId:ke==="prompt"?K.trim()==="":ke==="fork"?Ua!==null:ke==="restart"?l.beatId===null:ke==="cg"?!Qa(K,te):!1;return(0,c.jsxs)("div",{className:`theater stage-root${re?" bare":""}`,ref:Se,onClick:P,onTouchStart:or,onTouchEnd:rr,children:[(0,c.jsxs)("div",{className:`theater-stage${m?" rewinding":""}`,children:[wa?(0,c.jsx)("img",{className:"theater-bg theater-bg-in",src:wa,alt:""},wa):(0,c.jsx)("div",{className:`theater-bg theater-bg-fallback ${sr?"theater-bg-pending":""} ${a.transition==="cut"?"cut":""}`}),Object.entries(a.sprites).map(([f,p])=>{let Z=s.spriteDirOf(f),Y=s.spritePresentation(Z,p.variant);return(0,c.jsx)(_r,{url:s.sprite(Z,p.variant),pos:p.resolvedPos,name:Ma(r,f),framing:Y.framing,stature:Y.stature,shot:p.shot,anchor:p.anchor??Y.anchor,leaving:p.leaving===!0,action:p.action,actionSeq:p.actionSeq,dim:G!==null&&G!==f},f)}),Ea&&(0,c.jsxs)("div",{className:"theater-cg",children:[(0,c.jsx)("img",{className:"theater-cg-in",src:Ea,alt:a.cg?.id??""}),a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})]}),ur&&(0,c.jsx)("div",{className:"theater-cg theater-cg-pending","aria-label":"\u63D2\u56FE\u751F\u6210\u4E2D",children:a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})})]}),!re&&ae,L&&(0,c.jsxs)("div",{className:"theater-director",ref:ft,children:[(0,c.jsxs)("button",{type:"button",className:`dir-btn ${I==="prompt"?"on":""}`,title:"\u8F93\u5165\u89D2\u8272\u7684\u884C\u52A8\u3001\u53F0\u8BCD\uFF0C\u6216\u7ED9\u8FD9\u573A\u620F\u7684\u6307\u793A","aria-label":"\u63D0\u793A",onClick:f=>{f.stopPropagation(),z(I==="prompt"?null:"prompt"),J("")},children:[(0,c.jsx)(W,{name:"chat",size:17}),"\u63D0\u793A"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${I==="edit"?"on":""}`,title:ht??"\u7F16\u8F91\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD","aria-label":"\u6539\u5199\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD",disabled:ht!==null,onClick:f=>{f.stopPropagation(),z(I==="edit"?null:"edit"),J(l.lineText)},children:[(0,c.jsx)(W,{name:"pencil",size:17}),"\u6539\u5199"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${I==="restart"?"on":""}`,title:xt??"\u91CD\u5199\uFF1A\u9000\u5230\u8FD9\u4E00\u8F6E\u4E4B\u524D\uFF0C\u8BA9\u5267\u4F5C\u5BB6\u91CD\u65B0\u5199\u4E00\u904D\uFF08\u539F\u6709\u5185\u5BB9\u7559\u4F5C\u65E7\u679D\uFF09","aria-label":"\u91CD\u5199\u8FD9\u4E00\u8F6E",disabled:xt!==null,onClick:f=>{f.stopPropagation(),z(I==="restart"?null:"restart"),J("")},children:[(0,c.jsx)(W,{name:"rewrite",size:17}),"\u91CD\u5199"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${I==="cg"?"on":""}`,title:o?"\u8FD8\u6CA1\u6709\u5267\u60C5\u53EF\u4EE5\u5165\u753B":"\u4E3A\u8FD9\u4E00\u5E55\u751F\u6210\u4E00\u5F20\u63D2\u56FE\uFF08\u6307\u4EE4\u53EF\u7559\u7A7A\uFF09","aria-label":"\u751F\u6210\u63D2\u56FE",disabled:o,onClick:f=>{f.stopPropagation(),I==="cg"?z(null):(z("cg"),J(""),oe([]),X(!0))},children:[(0,c.jsx)(W,{name:"assets",size:17}),"\u751F\u56FE"]}),d&&ve!=="none"&&(0,c.jsxs)("button",{type:"button",className:`dir-btn ${ve==="pending"?"voice-pending":""}`,title:ve==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":i?"\u91CD\u542C\u8FD9\u53E5":"\u8BED\u97F3\u5DF2\u5173\uFF0C\u5148\u6253\u5F00\u8BED\u97F3\u518D\u91CD\u542C","aria-label":ve==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":"\u91CD\u542C\u8FD9\u53E5",disabled:ve==="pending"||!i,onClick:f=>{f.stopPropagation(),ve==="ready"&&U?.seq!==null&&U?.seq!==void 0&&A(U.seq)},children:[(0,c.jsx)(W,{name:"volume",size:17}),"\u91CD\u542C"]})]}),(0,c.jsxs)("div",{className:"theater-dialog",role:"text",ref:nt,children:[q.name&&(0,c.jsx)("div",{className:"dialog-name",children:q.name}),(0,c.jsxs)("p",{className:`dialog-text ${U?.type==="thought"?"thought":U?.type==="narrate"?"narrate":""} ${m?"rewinding":""}`,children:[g,U&&!m&&!N&&(0,c.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]}),(0,c.jsxs)("div",{className:"dialog-foot",children:[(0,c.jsx)("div",{className:"dialog-hint dialog-hint-foot",children:m?(0,c.jsxs)("button",{type:"button",className:"dialog-rewind",onClick:D,title:"\u56DE\u5230\u6700\u65B0",children:[(0,c.jsx)(W,{name:"prev"}),"\u56DE\u770B\u4E2D"]}):I?null:(0,c.jsxs)(c.Fragment,{children:[t&&(0,c.jsx)("span",{className:"dialog-spinner","aria-label":"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199"}),N&&(!Ce||R)&&(0,c.jsx)("span",{className:"dialog-next","aria-hidden":!0,children:"\u25BC"}),R&&(0,c.jsx)("span",{className:"muted",children:"\u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210"})]})}),(0,c.jsxs)("div",{className:"dialog-options",children:[(0,c.jsx)("button",{type:"button",className:`dir-btn ${e.auto?"tgl-on":""}`,title:e.auto?"Auto-play: on (tap to turn off)":"Auto-play: off (tap to turn on)","aria-pressed":e.auto,onClick:f=>{f.stopPropagation(),e.setAuto(!e.auto)},children:e.auto?"Auto":"Manual"}),d&&(0,c.jsx)("button",{type:"button",className:`dir-btn ${i?"tgl-on":""}`,title:i?"Voice: on (tap to turn off)":"Voice: off (tap to turn on)","aria-pressed":i,onClick:f=>{f.stopPropagation(),w()},children:i?"VOICE":"MUTED"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Rewind one line (\u2190)",disabled:!m&&e.history.length===0,onClick:f=>{f.stopPropagation(),H(-1)},children:"BACK"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Hide the interface \u2014 tap the picture or press H / Space to bring it back",onClick:f=>{f.stopPropagation(),z(null),J(""),Le(!0)},children:"HIDE"})]})]}),I&&(0,c.jsxs)(Ia,{title:I==="prompt"?"\u63D0\u793A":Ca[I].title,hint:I==="prompt"?Hr[V]:Ca[I].hint,onClose:()=>z(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{type:"button",className:"primary",onClick:mt,disabled:lr,children:Ca[ke].submit(K.trim())}),(0,c.jsx)("button",{type:"button",className:"ghost-btn",onClick:()=>z(null),children:"\u53D6\u6D88"})]}),children:[I==="prompt"&&(0,c.jsxs)("div",{className:"seg guide-seg",children:[(0,c.jsx)("button",{type:"button",className:`seg-btn ${V==="guide"?"active":""}`.trim(),"aria-pressed":V==="guide",title:"\u8DDF\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1",onClick:()=>de("guide"),children:"\u5F15\u5BFC"}),(0,c.jsx)("button",{type:"button",className:`seg-btn ${V==="fork"?"active":""}`.trim(),"aria-pressed":V==="fork",title:Ua??"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",disabled:Ua!==null,onClick:()=>de("fork"),children:"\u5206\u5C94"})]}),I==="cg"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"image-gen-field",children:[(0,c.jsx)("span",{className:"image-gen-label",children:"\u53C2\u8003\u7ACB\u7ED8\uFF08\u6309\u70B9\u9009\u987A\u5E8F\u57AB\u56FE\uFF09\uFF1A"}),(0,c.jsx)($a,{candidates:s.spriteIds.map(f=>({id:f,name:s.spriteName(f)??r[f]??f,spriteUrl:s.sprite(f,null)})).filter(f=>!!f.spriteUrl),selected:j,onToggle:f=>oe(p=>Za(p,f))})]}),(0,c.jsxs)("label",{className:"image-gen-checkbox",children:[(0,c.jsx)("input",{type:"checkbox",checked:te,onChange:f=>X(f.target.checked)}),(0,c.jsx)("span",{children:"\u57FA\u4E8E\u521A\u624D\u6F14\u5230\u7684\u5267\u60C5\u4E0E\u573A\u666F"})]})]}),(0,c.jsxs)("div",{className:"director-input",children:[I==="prompt"&&(0,c.jsx)("button",{type:"button",className:`ooc-shortcut ${K.startsWith(Ra)?"on":""}`,title:"\u4EE5 OOC \u5F00\u5934 = \u8DF3\u51FA\u89D2\u8272\uFF0C\u76F4\u63A5\u4E0B\u6307\u4EE4","aria-label":"\u4EE5 OOC \u524D\u7F00\u7ED9\u5267\u4F5C\u5BB6\u4E0B\u6307\u4EE4",onClick:()=>J(f=>f.startsWith(Ra)?f.slice(Ra.length):Ra+f),children:"OOC\uFF1A"}),(0,c.jsx)("input",{value:K,placeholder:I==="prompt"?Ca[ke].placeholder:Ca[I].placeholder,onChange:f=>J(f.target.value),onKeyDown:f=>{f.key==="Enter"&&mt()}})]})]})]})]})}var T=require("react/jsx-runtime"),ge=require("react");var Ko={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()},Vr="\u81EA\u7531\u8F93\u5165";function Ya({stop:a,isNoStop:e,showContinue:t,disabled:o,seenChoices:r,onChoice:s,onFree:d,onContinue:u,onPolish:l}){let[h,b]=(0,ge.useState)(""),[y,C]=(0,ge.useState)(!1),[A,v]=(0,ge.useState)(null),[i,w]=(0,ge.useState)(!1),[F,B]=(0,ge.useState)(null);(0,ge.useEffect)(()=>{C(!1),b(""),v(null),B(null)},[a,e]);let R=a?.stopType==="choice"?a.options??[]:[],_=R.length>0||a?.stopType==="free",E=()=>{let x=h.trim();x&&(d(x),b(""),v(null),B(null),C(!1))},ae=()=>{if(!l)return;let x=(A??h).trim();!x||i||(w(!0),B(null),l(x).then(I=>{v(x),b(I)}).catch(I=>B(I.message)).finally(()=>w(!1)))},L=()=>{A!==null&&(b(A),v(null),B(null))};return(0,T.jsxs)(T.Fragment,{children:[_&&!y&&(0,T.jsxs)("div",{className:"choice-overlay",role:"group","aria-label":"\u9009\u9879",...Ko,children:[R.map((x,I)=>(0,T.jsxs)("button",{type:"button",className:"choice",disabled:o,onClick:()=>s(I),children:[(0,T.jsx)("span",{className:"choice-text",children:x.text}),r?.has(x.text)&&(0,T.jsxs)("span",{className:"choice-seen",children:[(0,T.jsx)(W,{name:"check"})," \u5DF2\u9009\u8FC7"]})]},`${I}-${x.text}`)),(0,T.jsx)("button",{type:"button",className:"choice ghost",disabled:o,onClick:()=>C(!0),title:"\u4E0D\u8BF4\u9009\u9879\uFF0C\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5",children:(0,T.jsx)("span",{className:"choice-text",children:Vr})})]}),y&&(0,T.jsx)(Ia,{title:"\u81EA\u7531\u8F93\u5165",hint:"\u4EE5\u4E3B\u89D2\u53E3\u543B\u5199\u4E00\u53E5\u3002",width:560,onClose:()=>C(!1),footer:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("button",{type:"button",className:"ghost-btn free-back",onClick:()=>C(!1),disabled:o,title:"\u4E0D\u81EA\u5DF1\u5199\u4E86\uFF0C\u56DE\u53BB\u9009",children:[(0,T.jsx)(W,{name:"prev",size:14}),"\u8FD4\u56DE\u9009\u9879"]}),F&&(0,T.jsxs)("span",{className:"muted small",children:["\u6DA6\u8272\u5931\u8D25\uFF1A",F]}),(0,T.jsx)("button",{type:"button",className:"primary",onClick:E,disabled:o||h.trim()==="",children:"\u8BF4"})]}),children:(0,T.jsxs)("div",{className:"free-box",children:[(0,T.jsx)("input",{value:h,placeholder:a?.stopType==="free"?a.placeholder??"\u4F60\u7684\u56DE\u5E94\u2026":"\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5\u2026",onChange:x=>b(x.target.value),onKeyDown:x=>x.key==="Enter"&&E(),disabled:o}),l&&(0,T.jsxs)("button",{type:"button",className:"ghost-btn",title:"LLM \u6309\u4E3B\u89D2\u53E3\u543B\u6DA6\u8272\uFF08\u53EF\u64A4\u9500\uFF09",onClick:ae,disabled:o||i||h.trim()==="",children:[(0,T.jsx)(W,{name:"sparkles"}),i?"\u6DA6\u8272\u4E2D\u2026":"\u6DA6\u8272"]}),A!==null&&(0,T.jsxs)("button",{type:"button",className:"link-btn",onClick:L,disabled:i,title:"\u9000\u56DE\u6DA6\u8272\u524D\u7684\u539F\u8BDD",children:[(0,T.jsx)(W,{name:"undo"}),"\u64A4\u9500"]})]})}),e&&t&&!a&&(0,T.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u7EE7\u7EED",...Ko,children:(0,T.jsx)("div",{className:"choices",children:(0,T.jsxs)("button",{type:"button",className:"choice",onClick:u,disabled:o,children:[(0,T.jsx)(W,{name:"forward"}),"\uFF08\u7EE7\u7EED\uFF09"]})})})]})}var jo=require("react/jsx-runtime");var we=require("react/jsx-runtime"),le=require("react");var zr=3600;function et(){let[a,e]=(0,le.useState)([]),t=(0,le.useRef)(1),o=(0,le.useRef)(new Map),r=(0,le.useCallback)(u=>{let l=o.current.get(u);l&&clearTimeout(l),o.current.delete(u),e(h=>h.filter(b=>b.id!==u))},[]),s=(0,le.useCallback)((u,l="info")=>{if(!u)return;let h=t.current;t.current+=1,e(b=>[...b.slice(-2),{id:h,text:u,kind:l}]),o.current.set(h,setTimeout(()=>r(h),zr))},[r]),d=o;return(0,le.useEffect)(()=>{let u=d.current;return()=>{for(let l of u.values())clearTimeout(l);u.clear()}},[d]),{toasts:a,push:s,dismiss:r}}function at({toasts:a,onDismiss:e}){return a.length===0?null:(0,we.jsx)("div",{className:"toast-stack stage-root",role:"status","aria-live":"polite",children:a.map(t=>(0,we.jsxs)("button",{type:"button",className:`toast toast-${t.kind}`,onClick:()=>e(t.id),title:"\u70B9\u6389",children:[t.kind==="info"?(0,we.jsx)(W,{name:"check"}):(0,we.jsx)(W,{name:"alert"}),(0,we.jsx)("span",{children:t.text})]},t.id))})}var tt=null;function Gr(){return tt||(tt=new AudioContext),tt}var Sa=class{ctx=null;master=null;lines=new Map;currentSeq=null;urls=new Map;replaySources=new Map;replayToken=0;maxSeqSeen=0;floorSeq=0;pausedSent=!1;enabled=!0;onNotify=null;onControl=null;get unlocked(){return this.ctx!==null}get pending(){let e=0;for(let t of this.lines.values())t.faded||(e+=t.phrases.size-t.nextToPlay);return e}pendingPhrases=new Map;unlock(){if(!this.ctx){this.ctx=Gr(),this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.ctx.resume().then(()=>this.notify());for(let e of this.lines.values())for(let t of e.phrases.values())t.buffer===null&&this.decode(e,t)}}setEnabled(e){this.enabled=e,e||(this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure()),this.notify()}voiceState(e){return!this.enabled||e===null||e===void 0?"none":this.urls.has(e)?"ready":this.pendingPhrases.has(e)?(this.pruneStalePending(),this.pendingPhrases.has(e)?"pending":"none"):"none"}markPending(e,t){if(!this.enabled)return;this.pruneStalePending();let o=this.pendingPhrases.get(e);o||(o=new Map,this.pendingPhrases.set(e,o)),o.set(t,Date.now()),this.notify()}clearPending(e,t){let o=this.pendingPhrases.get(e);o&&(o.delete(t),o.size===0&&this.pendingPhrases.delete(e))}pruneStalePending(){let e=Date.now()-45e3;for(let[t,o]of this.pendingPhrases){for(let[r,s]of o)s<e&&o.delete(r);o.size===0&&this.pendingPhrases.delete(t)}}async replay(e){if(!this.enabled||(this.unlock(),!this.ctx||!this.master))return!1;let t=[...this.urls.get(e)?.entries()??[]].sort((u,l)=>u[0]-l[0]).map(([,u])=>u);if(t.length===0)return!1;this.stopReplay();let o=this.replayToken,r=this.ctx,s=[];for(let u of t){let l=null;try{let h=await fetch(u);h.ok&&(l=await r.decodeAudioData(await h.arrayBuffer()))}catch{}if(o!==this.replayToken||!this.enabled)return!1;l&&s.push(l)}if(s.length===0)return!1;let d=r.currentTime+.05;for(let u of s)this.playPhrase(null,u,d),d+=u.duration+.25;return this.notify(),!0}stopReplay(){let e=this.ctx;if(!e){this.replaySources.clear();return}let t=e.currentTime;for(let[o,r]of this.replaySources)try{r.gain.cancelScheduledValues(t),r.gain.setValueAtTime(Math.max(r.gain.value,1e-4),t),r.gain.linearRampToValueAtTime(1e-4,t+100/1e3),o.stop(t+100/1e3+.02)}catch{}this.replaySources.clear()}handleAudio(e){if(this.clearPending(e.seq,e.phrase),!this.enabled||(this.rememberUrl(e.seq,e.phrase,e.url),e.seq<=this.floorSeq)||this.currentSeq!==null&&e.seq<this.currentSeq)return;this.maxSeqSeen=Math.max(this.maxSeqSeen,e.seq);let t=this.lines.get(e.seq);if(t||(t={phrases:new Map,nextToPlay:0,chainEnd:null,faded:!1,sources:new Map},this.lines.set(e.seq,t)),t.faded||t.phrases.has(e.phrase))return;let o={url:e.url,buffer:null};t.phrases.set(e.phrase,o),this.ctx&&this.decode(t,o),this.checkBackpressure(),this.notify()}lineStarted(e,t){if(this.finishCurrent(),this.pruneBefore(e),!this.enabled||e===void 0||!t){this.currentSeq=null;return}this.currentSeq=e;let o=this.lines.get(e);o&&!o.faded&&this.trySchedule(o)}fastForward(){this.finishCurrent()}beatStarted(){this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null,this.floorSeq=this.maxSeqSeen,this.notify()}reset(){this.beatStarted(),this.urls.clear()}holdsLine(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;return!e||!this.ctx||e.chainEnd===null?!1:this.ctx.currentTime<e.chainEnd}dispose(){this.fadeAll(),this.stopReplay(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null}rememberUrl(e,t,o){let r=this.urls.get(e);r||(r=new Map,this.urls.set(e,r)),r.set(t,o);for(let s of this.urls.keys()){if(this.urls.size<=500)break;s!==e&&this.urls.delete(s)}}finishCurrent(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;e&&this.fadeLine(e),this.currentSeq=null}fadeAll(){for(let e of this.lines.values())this.fadeLine(e);this.stopReplay()}fadeLine(e){if(e.faded)return;e.faded=!0;let t=this.ctx;if(!t){e.sources.clear();return}let o=t.currentTime;for(let[r,s]of e.sources)try{s.gain.cancelScheduledValues(o),s.gain.setValueAtTime(Math.max(s.gain.value,1e-4),o),s.gain.linearRampToValueAtTime(1e-4,o+100/1e3),r.stop(o+100/1e3+.02)}catch{}e.sources.clear()}async decode(e,t){let o=this.ctx;if(o){try{let r=await fetch(t.url);if(!r.ok)throw new Error(`HTTP ${r.status}`);t.buffer=await o.decodeAudioData(await r.arrayBuffer())}catch{t.buffer=o.createBuffer(1,1,o.sampleRate)}!e.faded&&this.lines.get(this.currentSeq??-1)===e&&this.trySchedule(e)}}trySchedule(e){let t=this.ctx;if(!(!t||e.faded))for(;;){let o=e.phrases.get(e.nextToPlay);if(!o?.buffer)return;let r=e.chainEnd===null,s=Math.max(t.currentTime+.03,(e.chainEnd??0)+(r?0:.25));this.playPhrase(e,o.buffer,s),e.chainEnd=s+o.buffer.duration,e.nextToPlay+=1;let d=Math.max(0,(e.chainEnd-t.currentTime+.05)*1e3);setTimeout(()=>{this.checkBackpressure(),this.notify()},d)}}playPhrase(e,t,o){let r=this.ctx,s=this.master;if(!r||!s)return;let d=r.createBufferSource();d.buffer=t;let u=r.createGain(),l=.015,h=Math.min(.04,t.duration/4);u.gain.setValueAtTime(1e-4,o),u.gain.linearRampToValueAtTime(1,o+l),u.gain.setValueAtTime(1,Math.max(o+l,o+t.duration-h)),u.gain.linearRampToValueAtTime(1e-4,o+t.duration),d.connect(u).connect(s),d.start(o);let b=e?e.sources:this.replaySources;b.set(d,u),d.onended=()=>{b.delete(d),u.disconnect(),d.disconnect()}}pruneBefore(e){if(e!==void 0)for(let t of this.lines.keys())t<e&&this.lines.delete(t)}clearBackpressure(){this.pausedSent&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}checkBackpressure(){!this.pausedSent&&this.pending>10?(this.pausedSent=!0,this.onControl?.({paused:!0})):this.pausedSent&&this.pending<=3&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}notify(){this.onNotify?.()}};function ka(a){let e=new Map;for(let t of a??[]){let o=t.lastIndexOf(".");e.set(o===-1?t:t.slice(0,o),t)}return e}function ot(a,e,t={},o={},r=[],s={}){let d=ka(e.backgrounds),u=ka(e.cg),l=ka(e.bgm),h=ka(e.sfx),b=s.assetUrl??(i=>`/plays/${a}/assets/${i}`),y=(i,w)=>b(`${i}/${w}`),C=(i,w)=>F=>{let B=F?i.get(F):void 0;if(B)return y(w,B);let R=F?t[F]:void 0;return R?.ready?R.url:null},A=new Map,v=new Map;for(let i of r){if(!i.id)continue;let w=At(i.id,i);w!==i.id&&A.set(i.id,w),v.has(w)||v.set(w,i.name??i.id)}return{bg:C(d,"backgrounds"),cg:C(u,"cg"),bgm:C(l,"bgm"),sfx:C(h,"sfx"),ambient:i=>C(h,"sfx")(i)??C(l,"bgm")(i),spriteDirOf:i=>A.get(i)??i,spriteName:i=>v.get(i)??null,spriteIds:Object.keys(e).filter(i=>i.startsWith("sprites/")&&(e[i]?.length??0)>0).map(i=>i.slice(8)).sort(),sprite:(i,w)=>{let F=e[`sprites/${i}`]??[],B=(w?ka(F).get(w):void 0)??F[0];return B?y(`sprites/${i}`,B):null},spritePresentation:(i,w)=>{let F=Pt(o,i,w??void 0);return{framing:F.framing??Aa,stature:F.stature??Fe,anchor:F.anchor??"bottom"}}}}var Wr=new Set(["say","narrate","thought"]),$o=new Set(["say","narrate","thought","input"]);function rt(a,e){return a?Kr(Xr(a,e),e):e.filter(t=>$o.has(t.type)&&t.text!=="").map(Zo)}function Zo(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="sfx"||a.type==="cg"||a.type==="scene"?"narrate":a.type,actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}function Xr(a,e){let t=new Map(a.nodes.map(u=>[u.id,u])),o=new Map;for(let u of e)u.seq!==void 0&&o.set(u.seq,u);let r=e.filter(u=>u.type==="input"),s=[],d=a.pathIds;for(let u=0;u<d.length;u+=1){let l=t.get(d[u]);if(!l)continue;if(Wr.has(l.kind)){let y=l.seq===void 0?void 0:o.get(l.seq);s.push({key:y?.key??l.id,kind:"line",type:l.kind,actorId:l.attrs.id??y?.actorId??null,...y?.nameOverride?{nameOverride:y.nameOverride}:{},text:y?.text||l.text,seq:l.seq??null,nodeId:l.id});continue}if(l.kind!=="prompt")continue;let h=l.text;if(!h)continue;let b=l.seq===void 0?void 0:o.get(l.seq);if(b){let y=r.indexOf(b);y>=0&&r.splice(y,1)}else{let y=r.findIndex(C=>C.text===h);y>=0&&(b=r.splice(y,1)[0])}s.push({key:b?.key??l.id,kind:"input",type:"say",actorId:"player",text:b?.text||h,seq:l.seq??b?.seq??null,nodeId:l.id})}return s}function Kr(a,e){let t=new Set(a.map(o=>o.key));for(let o of e)!$o.has(o.type)||o.text===""||t.has(o.key)||(a.push(Zo(o)),t.add(o.key));return a}var Qo=require("react");var jr=require("react");var st="stage-voice";function ut(a,e,t){let o=a.getItem(e);return o===null?t:o==="1"}function lt(a,e,t){a.setItem(e,t?"1":"0")}var Jo=`/* @aivn/stage \u7684\u821E\u53F0\u6837\u5F0F\uFF1A\u4ECE apps/web/src/app.css \u539F\u6837\u642C\u6765\u7684\u5C0F\u8282\u3002
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

/* \u2500\u2500 \u6F0F\u642C\u7684\u89C4\u5219\uFF082026-10-05 \u7528 scripts/port-stage-css.py \u4ECE app.css \u62BD\u51FA\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u62BD\u5305\u65F6\u6F0F\u4E86\u8FD9\u4E00\u5927\u6279\uFF1A\`.choice*\` \u662F\u821E\u53F0\u9009\u9879\u5361\u7247\u672C\u8EAB\uFF08\u6CA1\u6709\u5B83\uFF0C\u9009\u9879\u5C31\u662F\u6D4F\u89C8\u5668\u9ED8\u8BA4
   \u6309\u94AE\u7684\u6837\u5B50\u3001\u4F4D\u7F6E\u4E5F\u4E0D\u5BF9\uFF09\uFF0C\u5168\u5C40 \`button\` / \`input\` \u662F\u6BCF\u4E00\u9897\u6309\u94AE\u7684\u5E95\u6837\u5F0F\uFF0C
   \u79FB\u52A8\u7AEF\u5C0F\u8282\u6574\u6BB5\u6CA1\u642C\u3002\u539F\u6587\u7167\u6284\uFF0C\u53EA\u5728\u5143\u7D20\u7EA7\u9009\u62E9\u5668\u4E0A\u52A0 \`:where(.stage-root)\`
   \u5708\u4F5C\u7528\u57DF\u2014\u2014\`:where()\` \u7279\u5F02\u6027\u4E3A\u96F6\uFF0C\u4E0D\u6539\u5B83\u4E0E\u7C7B\u89C4\u5219\u4E4B\u95F4\u7684\u80DC\u8D1F\u5173\u7CFB\u3002 */

.muted {
  color: var(--ink-faint);
}

.small {
  font-size: 13px;
}

.muted.small, .small {
  line-height: 1.5;
}

button.ghost-btn {
  border: none;
  background: transparent;
  color: var(--ink-soft);
  padding: 6px 8px;
  font-size: 13.5px;
}

button.ghost-btn:hover:not(:disabled) {
  color: var(--accent);
}

button.link-btn {
  border: none;
  background: transparent;
  color: var(--accent);
  padding: 2px 6px;
  font-size: 13px;
  text-decoration: underline;
}

.choice-overlay {
  position: absolute;
  z-index: 15;
  inset: 0;
  display: flex;
  flex-direction: column;

  justify-content: safe center;
  gap: 12px;
  padding-top: calc(var(--dir-h, 46px) + 14px + env(safe-area-inset-top, 0px));
  padding-right: 16px;
  padding-bottom: calc(var(--dialog-h, 168px) + 3% + var(--safe-b, 0px));
  padding-left: 16px;
  overflow-y: auto;
  animation: choice-in 0.22s ease-out;
  pointer-events: none;
}

.choice-overlay .choice {
  pointer-events: auto;
}

.choice-text {
  flex: 1;
}

@keyframes choice-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

.choice {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 12px;
  width: min(560px, 86vw);
  min-height: 54px;
  margin: 0 auto;
  padding: 12px 18px 12px 20px;
  text-align: left;
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0.03em;
  background: var(--choice-bg);
  border: 1px solid var(--choice-line);
  border-left: 3px solid var(--accent);
  border-radius: 1px;
  color: var(--choice-ink);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.4);
  transition:
    transform var(--hover-ms) ease,
    background-color var(--hover-ms) ease,
    border-color var(--hover-ms) ease;
}

.choice:hover:not(:disabled) {
  background: var(--choice-active-bg);
  border-color: var(--accent);
  border-left-color: var(--accent);
  color: var(--choice-ink);
  transform: translateX(6px);
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:where(.stage-root) button {
  font: inherit;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--ink);
  border-radius: var(--radius);
  padding: 8px 14px;
  cursor: pointer;
  transition:
    border-color var(--hover-ms) ease,
    background-color var(--hover-ms) ease,
    color var(--hover-ms) ease;
}

:where(.stage-root) button:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

:where(.stage-root) button:disabled {
  opacity: 0.4;
  cursor: default;
}

button.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-ink);
}

button.primary:hover:not(:disabled) {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--panel);
}

.modal-scrim {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px calc(20px + var(--safe-b, 0px));
  background: rgb(10 10 14 / 0.42);
  animation: choice-in 0.16s ease-out;
}

.modal-card {
  box-sizing: border-box;
  max-width: 100%;

  max-height: min(78dvh, 640px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px 14px;
  overflow-y: auto;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 18px 48px rgb(0 0 0 / 0.3);
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.modal-title {
  margin: 0;
  font-size: 15.5px;
  font-weight: 600;
}

.modal-x {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: var(--radius);
  background: none;
  color: var(--ink-faint);
  font-size: 14px;
  line-height: 1;
}

.modal-x:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.modal-hint {
  margin: -4px 0 0;
  color: var(--ink-soft);
  font-size: 12.5px;
  line-height: 1.5;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}

.modal-foot .free-back {
  margin: 0 auto 0 0;
}

.free-box {
  display: flex;
  gap: 8px;
}

.free-box input {
  flex: 1;
}

.ref-picker-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 140px;
  overflow-y: auto;
  padding: 2px;
}

.ref-picker-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--ink);
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
}

.ref-picker-chip:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.04));
}

.ref-picker-chip.selected {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--ink);
  font-weight: 500;
}

.ref-chip-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.ref-chip-blank {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-soft);
}

.ref-chip-name {
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ref-chip-order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  font-weight: bold;
}

.ref-picker-empty {
  padding: 6px 0;
}

.image-gen-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.image-gen-label {
  font-size: 12px;
  color: var(--ink-soft);
}

.image-gen-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink);
  cursor: pointer;
  user-select: none;
}

:where(.stage-root) input, :where(.stage-root) textarea, :where(.stage-root) select {
  font: inherit;
  color: var(--ink);
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 8px 12px;
  outline: none;
}

:where(.stage-root) textarea {
  resize: vertical;
  width: 100%;
}

:where(.stage-root) input:focus, :where(.stage-root) textarea:focus, :where(.stage-root) select:focus {
  border-color: var(--accent);
}

.theater-bg-in {
  animation: bg-fade 0.6s ease;
}

.theater-cg-in {
  animation: bg-fade 0.5s ease;
}

.free-back {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
}

.dialog-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;
  padding-top: 7px;
}

.dialog-hint-foot {
  min-height: 18px;
}

.dialog-options {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 0 0 auto;
  margin: -6px -12px -8px 0;
}

.dialog-options .dir-btn {
  text-transform: uppercase;
}

.dir-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 40px;
  padding: 0 8px;
  border: none;
  border-radius: 1px;
  background: none;
  color: var(--dialog-ink-soft);
  font: inherit;
  font-size: 11.5px;
  letter-spacing: 0.04em;
  text-shadow: var(--dir-text-shadow);
  cursor: pointer;
  transition:
    color var(--hover-ms) ease,
    background-color var(--hover-ms) ease;
}

.dir-btn:hover:not(:disabled) {
  background: var(--dialog-hover);
  color: var(--dialog-ink);
}

.dir-btn.on {
  background: var(--accent);
  color: var(--accent-ink);
}

.dir-btn.tgl-on {
  background: var(--dialog-hover);
  color: var(--dialog-ink);
}

.dir-btn.voice-pending {
  color: var(--accent);
  opacity: 1;
  animation: voice-blink 1s ease-in-out infinite;
}

.dir-btn:disabled {
  opacity: 0.28;
  cursor: default;
}

.toast-stack {
  position: absolute;
  z-index: 60;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: min(92vw, 420px);
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  padding: 7px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  text-align: left;
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.28);
  animation: toast-in 0.22s ease;
  cursor: pointer;
}

/* \u79FB\u52A8\u7AEF\uFF08\u2264720px\uFF09\uFF1A\u53F0\u8BCD\u6761\u4E0E\u9009\u80A2\u5361\u7684\u7D27\u51D1\u5C3A\u5BF8\uFF0C\u5B89\u5168\u533A\u7531\u4E0A\u9762\u7684 env() \u515C */
@media (max-width: 720px) {
  .theater-bar {
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px 10px;
  }
  .theater-scene {
    order: 10;
    width: 100%;
  }
  .theater-dialog {
    --dialog-pad-x: 14px;
    padding: 10px var(--dialog-pad-x) 8px;
    min-height: 96px;
  }
  .dialog-text {
    font-size: 15.5px;
  }
  .choice-overlay {
    gap: 8px;
    padding-right: 12px;
    padding-left: 12px;
  }
  .choice {
    min-height: 46px;
    padding: 10px 12px;
  }
}
`;var $=require("react/jsx-runtime"),Zr="\uFF08\u7EE7\u7EED\uFF09";Pa("@aivn/stage/stage.css",Jo);var Yo=st,Qr=8e3,tr=({sessionId:a})=>{let[e]=(0,k.useState)(()=>new Be),[t,o]=(0,k.useState)(0),[r,s]=(0,k.useState)(!1),[d,u]=(0,k.useState)(null),[l,h]=(0,k.useState)(!1),[b,y]=(0,k.useState)(!1),[C,A]=(0,k.useState)(null),[v,i]=(0,k.useState)(null),[w,F]=(0,k.useState)(null),[B,R]=(0,k.useState)(0),_=et(),[E,ae]=(0,k.useState)(()=>typeof window>"u"?!0:ut(window.localStorage,Yo,!0)),L=(0,k.useRef)(null);L.current===null&&(L.current=new Sa);let x=L.current,I=(0,k.useRef)(!1),z=(0,k.useRef)(0),K=(0,k.useRef)(!1),J=(0,k.useRef)(!1),j=(0,k.useCallback)(()=>{J.current||(J.current=!0,requestAnimationFrame(()=>{J.current=!1,o(g=>g+1)}))},[]);(0,k.useEffect)(()=>(x.onNotify=()=>j(),x.onControl=g=>{a&&dt("/aivn/voice",{session:a,...g}).catch(()=>{})},()=>{x.dispose(),x.onNotify=null,x.onControl=null}),[x,a,j]),(0,k.useEffect)(()=>{x.setEnabled(E)},[x,E]),(0,k.useEffect)(()=>{if(!a)return;let g=!1;return A(null),i(null),F(null),(async()=>{try{let G=await er(`/aivn/play?session=${encodeURIComponent(a)}`);if(g||(A(G),!G.dir))return;let P=await er(`/aivn/assets?session=${encodeURIComponent(a)}`);g||i(P)}catch(G){g||F(ar(G))}})(),()=>{g=!0}},[a]),(0,k.useEffect)(()=>{if(!a)return;e.reset(),x.reset(),z.current=0,I.current=!1,K.current=!1,u(null),h(!1),s(!1),R(G=>G+1),j();let g=new EventSource(`/aivn/stream?session=${encodeURIComponent(a)}`);return g.addEventListener("frame",G=>{let P;try{P=JSON.parse(G.data)}catch{return}if(P.seq>z.current+1&&(e.reset(),x.reset(),R(Se=>Se+1),I.current=!1,u(null),h(!1),z.current=P.seq-1),!(P.seq<=z.current)){if(z.current=P.seq,P.kind==="voice"){P.state==="ready"&&P.url?x.handleAudio({seq:P.lineSeq,phrase:P.phrase,url:P.url}):P.state==="started"&&x.markPending(P.lineSeq,P.phrase),j();return}if(P.kind==="beat"){P.state==="start"?(x.beatStarted(),I.current=!1,u(null),h(!1),s(!0),K.current=!1):(h(!I.current),s(!1));return}P.event.kind==="stop"&&(I.current=!0,u({stopType:P.event.stopType,...P.event.options?{options:P.event.options}:{},...P.event.placeholder?{placeholder:P.event.placeholder}:{}})),e.apply(P.event,P.seq),j()}}),()=>g.close()},[a,e,j]);let oe=(0,k.useCallback)(async(g,G)=>{let P=g.trim();if(!P||!a)return!1;try{return await dt("/aivn/input",{session:a,text:P,...G?.silent?{silent:!0}:{}}),!0}catch(Se){return _.push(`\u6CA1\u80FD\u9001\u5230\u5267\u4F5C\u5BB6\uFF1A${ar(Se)}`,"error"),!1}},[a,_]),te=(0,k.useCallback)(()=>{K.current||(K.current=!0,oe(Zr,{silent:!0}).then(g=>{g||(K.current=!1)}))},[oe]),X=e.lines,V=C?.dir?C.config??null:null,de=C?.voice===!0&&V!==null;(0,k.useEffect)(()=>{!a||!de||dt("/aivn/voice",{session:a,enabled:E}).catch(()=>{})},[a,de,E]);let re=(0,k.useCallback)(()=>{ae(g=>{let G=!g;return typeof window<"u"&&lt(window.localStorage,Yo,G),G})},[]),Le=(0,k.useCallback)(()=>{x.unlock(),j()},[x,j]),U=(0,k.useMemo)(()=>Object.fromEntries((V?.characters??[]).map(g=>[g.id,g.name??g.id])),[V]),Ie=(0,k.useMemo)(()=>{if(!V||!v||!a)return null;let g=(V.characters??[]).map(G=>({...G,body:""}));return ot(V.id,v.index,{},v.manifest,g,{assetUrl:G=>`/aivn/asset?session=${encodeURIComponent(a)}&path=${encodeURIComponent(`assets/${G}`)}`})},[V,v,a]),be=(0,k.useMemo)(()=>rt(null,X),[X,t]),Pe=(0,k.useRef)(null),Ce=(0,k.useRef)({seq:null,at:0}),Ae=()=>{if(x.holdsLine())return!0;let g=Pe.current;return g===null||x.voiceState(g)!=="pending"?!1:(Ce.current.seq!==g&&(Ce.current={seq:g,at:Date.now()}),Date.now()-Ce.current.at<Qr)},H=Wa(e.cues,X,{live:r,resume:!0,revision:t,transcript:be,turbo:b,resetToken:B,hold:Ae(),onLineStart:g=>x.lineStarted(g?.seq,g?.type==="say"),onFastForward:()=>x.fastForward()});Pe.current=H.current?.seq??null;let m=r,D=H.current===null||H.shownLength>=H.current.text.length,O=!m&&H.exhausted&&D,N=_a({ready:O,stopType:d?.stopType??null,isNoStop:l,continueCardOn:!1}),q={beatId:null,beatNodeId:null,lineNodeId:null,lineSeq:H.view?.seq??null,lineText:H.view?.text??""};return a?w?(0,$.jsx)(ya,{text:`\u821E\u53F0\u6CA1\u63A5\u4E0A\uFF1A${w}`}):C?V?Ie?(0,$.jsxs)("div",{className:"stage-root aivn-stage-view",style:{height:"100%",minHeight:0},children:[(0,$.jsx)(Ja,{visual:H.visual,playback:H,live:r,fresh:X.length===0,names:U,index:Ie,voiceAvailable:de,voiceOn:E,onToggleVoice:re,busy:m,targets:q,directorBar:!1,onView:qa,onPrompt:g=>{oe(g)},onEdit:qa,onFork:qa,onGenerateCg:qa,onReplay:g=>{x.replay(g)},voiceState:g=>x.voiceState(g),onUnlock:Le,onTurbo:y,canContinue:N.clickToContinue,onContinue:te,overlay:H.scrubbed?null:X.length===0?(0,$.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u5F00\u6F14",children:(0,$.jsx)("div",{className:"choices",children:(0,$.jsx)("button",{type:"button",className:"choice",onClick:()=>{oe(V.opening)},children:(0,$.jsx)("span",{className:"choice-text",children:"\u5F00\u6F14"})})})}):O?(0,$.jsx)(Ya,{stop:d,isNoStop:l,showContinue:N.showContinueCard,disabled:m,onChoice:g=>{oe(d?.options?.[g]?.text??"")},onFree:g=>{oe(g)},onContinue:te}):null}),(0,$.jsx)(at,{toasts:_.toasts,onDismiss:_.dismiss})]}):(0,$.jsx)(ya,{text:"\u6B63\u5728\u8BFB\u53D6\u5267\u76EE\u7D20\u6750\u2026"}):(0,$.jsx)(ya,{text:`\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709 play.json\uFF0C\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A${C.dir??""}`}):(0,$.jsx)(ya,{text:"\u6B63\u5728\u8FDE\u63A5\u821E\u53F0\u2026"}):(0,$.jsx)(ya,{text:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u821E\u53F0\u3002"})};function qa(){}function ya({text:a}){return(0,$.jsx)("div",{className:"stage-root aivn-stage-notice",style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,color:"var(--ink, #3b3630)",fontSize:14,textAlign:"center"},children:(0,$.jsx)("span",{children:a})})}async function er(a){let e=await fetch(a);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);return e.json()}async function dt(a,e){let t=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`${t.status} ${await t.text()}`)}function ar(a){return a instanceof Error?a.message:String(a)}var Jr="aivn-playwriter",Yr=["slots","sessions","uiSession"];function es(a){Pa("dsh-aivn/host.css",It);let e=a;a.slots.inject("conversation.view",()=>a.effect(()=>{let t,o=()=>{let u=e.uiSession.adapter.current.getSnapshot().key;return u===void 0?!1:e.sessions.list.getSnapshot().byId[u]?.projectionValues?.agentPreset===Jr},r=()=>{if(o()!==(t!==void 0)){if(t){t(),t=void 0;return}t=a.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"AIVN"},tr)}},s=e.uiSession.adapter.current.subscribe(r),d=e.sessions.list.subscribe(r);return r(),()=>{s(),d(),t?.(),t=void 0}},"dsh-aivn:stage view"))}
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