window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var Pr=Object.create;var Ea=Object.defineProperty;var vr=Object.getOwnPropertyDescriptor;var Ar=Object.getOwnPropertyNames;var Dr=Object.getPrototypeOf,Mr=Object.prototype.hasOwnProperty;var Dt=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},Fr=(a,e)=>{for(var t in e)Ea(a,t,{get:e[t],enumerable:!0})},Mt=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ar(e))!Mr.call(a,s)&&s!==t&&Ea(a,s,{get:()=>e[s],enumerable:!(o=vr(e,s))||o.enumerable});return a};var Tr=(a,e,t)=>(t=a!=null?Pr(Dr(a)):{},Mt(e||!a||!a.__esModule?Ea(t,"default",{value:a,enumerable:!0}):t,a)),Br=a=>Mt(Ea({},"__esModule",{value:!0}),a);var tr=Dt(J=>{"use strict";var is=require("react");function ar(a){var e="https://react.dev/errors/"+a;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+a+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ve(){}var oe={d:{f:ve,r:function(){throw Error(ar(522))},D:ve,C:ve,L:ve,m:ve,X:ve,S:ve,M:ve},p:0,findDOMNode:null},fs=Symbol.for("react.portal"),cs=Symbol.for("react.recoverable"),er=Symbol.for("react.optimistic_key");function ps(a,e,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fs,key:o==null?null:o===er?er:""+o,children:a,containerInfo:e,implementation:t}}var Da=is.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function ja(a,e){if(a==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}J.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=oe;J.browser=function(a){return{$$typeof:cs,_reason:a}};J.createPortal=function(a,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(ar(299));return ps(a,e,null,t)};J.flushSync=function(a){var e=Da.T,t=oe.p;try{if(Da.T=null,oe.p=2,a)return a()}finally{Da.T=e,oe.p=t,oe.d.f()}};J.preconnect=function(a,e){typeof a=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,oe.d.C(a,e))};J.prefetchDNS=function(a){typeof a=="string"&&oe.d.D(a)};J.preinit=function(a,e){if(typeof a=="string"&&e&&typeof e.as=="string"){var t=e.as,o=ja(t,e.crossOrigin),s=typeof e.integrity=="string"?e.integrity:void 0,r=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?oe.d.S(a,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:o,integrity:s,fetchPriority:r}):t==="script"&&oe.d.X(a,{crossOrigin:o,integrity:s,fetchPriority:r,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};J.preinitModule=function(a,e){if(typeof a=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=ja(e.as,e.crossOrigin);oe.d.M(a,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&oe.d.M(a)};J.preload=function(a,e){if(typeof a=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,o=ja(t,e.crossOrigin);oe.d.L(a,t,{crossOrigin:o,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};J.preloadModule=function(a,e){if(typeof a=="string")if(e){var t=ja(e.as,e.crossOrigin);oe.d.m(a,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else oe.d.m(a)};J.requestFormReset=function(a){oe.d.r(a)};J.unstable_batchedUpdates=function(a,e){return a(e)};J.useFormState=function(a,e,t){return Da.H.useFormState(a,e,t)};J.useFormStatus=function(){return Da.H.useHostTransitionStatus()};J.version="19.3.0"});var sr=Dt((yn,rr)=>{"use strict";function or(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(or)}catch(a){console.error(a)}}or(),rr.exports=tr()});var Ms={};Fr(Ms,{apply:()=>Ds,inject:()=>As});module.exports=Br(Ms);var Ft=`/**
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

/**
 * \u63D2\u4EF6\u914D\u7F6E\u5361\uFF08Plugins \u2192 dsh-aivn\uFF09\u7684\u6392\u5E03\u3002
 *
 * \u53EA\u505A\u95F4\u8DDD\u4E0E\u90A3\u884C\u80FD\u529B\u72B6\u6001\u706F\u7684\u6837\u5B50\uFF1A\u8868\u5355\u63A7\u4EF6\u3001\u4FDD\u5B58\u6309\u94AE\u3001\u5B57\u6BB5\u5916\u6846\u90FD\u7531 DSH \u81EA\u5DF1\u7684
 * \`SettingsForm\` / \`SettingsValueField\` / \`SettingsSecretField\` \u63D0\u4F9B\uFF0C\u8FD9\u91CC\u4E0D\u91CD\u753B\u3002
 * \u72B6\u6001\u706F\u662F\u8FD9\u5F20\u5361\u72EC\u6709\u7684\u4FE1\u606F\uFF08\u914D\u4E86\u54EA\u51E0\u9879\u80FD\u529B\uFF09\uFF0C\u6240\u4EE5\u7ED9\u4E00\u70B9\u70B9\u6837\u5F0F\u8BA9\u5B83\u8BFB\u5F97\u51FA\u5F00\u5173\u3002
 */
.aivn-config-lights {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	align-items: baseline;
	margin: 0 0 8px;
	font-size: 12px;
}

.aivn-config-lights > span[data-on] {
	padding: 1px 6px;
	border: 1px solid currentcolor;
	border-radius: 999px;
	opacity: 0.75;
}

.aivn-config-lights > span[data-on='true'] {
	opacity: 1;
}

.aivn-config-lights-note {
	border: 0;
	font-size: 11px;
	opacity: 0.6;
}

.aivn-config-secret {
	display: flex;
	gap: 8px;
	align-items: flex-end;
}

.aivn-config-secret > :first-child {
	flex: 1 1 auto;
	min-width: 0;
}

.aivn-config-switch {
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin: 12px 0;
}

.aivn-config-switch p {
	margin: 0;
	font-size: 12px;
	opacity: 0.7;
}

/**
 * \u300C\u8FDB\u884C\u4E2D\u300D\u6D6E\u5C42\uFF08\u6392\u961F\u4E2D\u7684\u63D0\u793A + \u6B63\u5728\u5408\u6210\u7684\u8BED\u97F3\uFF09\u3002
 *
 * \u4F4D\u7F6E\u7531\u821E\u53F0\u81EA\u5DF1\u6392\uFF1A\u5BFC\u6F14\u5DE5\u5177\u680F\u5728\u53F3\u4E0A\u89D2\uFF088px \u8D77\u3001\u4E00\u884C 42px \u9AD8\uFF09\uFF0C\u8FD9\u4E00\u5757\u63A5\u7740\u5B83\u5F80\u4E0B\u6446\uFF0C
 * \u4E24\u8005\u4E0D\u91CD\u53E0\u2014\u2014\u540C\u951A\u4E00\u5904\u4F1A\u53E0\u6210\u4E00\u5757\uFF0C\u770B\u7740\u50CF\u540C\u4E00\u4E2A\u9762\u677F\u88AB\u753B\u574F\u4E86\u3002
 *
 * \u5E95\u3001\u63CF\u8FB9\u3001\u5B57\u8272\u5168\u90E8\u6CBF\u7528 \`@aivn/stage\` \u7684\u821E\u53F0\u53D8\u91CF\uFF08\u5B83\u4EEC\u58F0\u660E\u5728 \`.stage-root\` \u4E0A\uFF0C
 * \u8FD9\u4E00\u5757\u5728\u540C\u4E00\u4E2A \`.stage-root\` \u91CC\uFF09\uFF0C\u6240\u4EE5\u4E0D\u5FC5\u81EA\u5E26\u4E00\u5957\u914D\u8272\uFF0C\u4E5F\u5C31\u4E0D\u4F1A\u8DDF\u4E3B\u9898\u6253\u67B6\u3002
 */
.aivn-pending {
	position: absolute;
	z-index: 45;
	top: calc(56px + env(safe-area-inset-top, 0px));
	right: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

/* \u5FBD\u6807\u672C\u8EAB\u662F\u821E\u53F0\u5DE5\u5177\u680F\u90A3\u679A \`.dir-btn\`\uFF08\u89C1 stage.css\uFF09\uFF0C\u8FD9\u91CC\u53EA\u8865\u5B83\u843D\u5728\u6D6E\u5C42\u4E0A\u7684\u5E95\u4E0E\u63CF\u8FB9\u3002 */
.aivn-pending > .dir-btn {
	padding: 0 10px;
	border: 1px solid var(--dialog-line);
	border-radius: var(--stage-radius);
	background: var(--dialog-bg);
	box-shadow: var(--dialog-shadow);
	color: var(--dialog-ink);
}

.aivn-pending-list {
	margin: 6px 0 0;
	padding: 6px 8px;
	max-width: min(70vw, 320px);
	max-height: 40vh;
	overflow-y: auto;
	list-style: none;
	border: 1px solid var(--dialog-line);
	border-radius: var(--stage-radius);
	background: var(--dialog-bg);
	box-shadow: var(--dialog-shadow);
}

.aivn-pending-row {
	display: flex;
	gap: 6px;
	align-items: baseline;
	padding: 3px 0;
	font-size: 12px;
	color: var(--dialog-ink);
}

.aivn-pending-kind,
.aivn-pending-note {
	flex: 0 0 auto;
	font-size: 11px;
	color: var(--dialog-ink-soft);
	opacity: 0.8;
}

.aivn-pending-text {
	flex: 1 1 auto;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* \u73A9\u5BB6\u6309\u4E86 HIDE\uFF1A\u821E\u53F0\u6574\u5757\u8FDB\u5165\u51C0\u753B\u9762\u6001\uFF0C\u6D6E\u5C42\u4E5F\u8DDF\u7740\u6536\u8D77\u6765\uFF08\u5B83\u5728 \`.theater\` \u5916\u9762\uFF0C
   \u6240\u4EE5\u9760 \`:has()\` \u8BA4\u90A3\u4E2A\u72B6\u6001\uFF0C\u8DDF\u85CF\u8F93\u5165\u6846\u90A3\u6761\u540C\u4E00\u4E2A\u529E\u6CD5\uFF09\u3002 */
.aivn-stage-view:has(.theater.bare) .aivn-pending {
	display: none;
}
`;function Ua(a,e){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${a}"]`)!==null)return;let t=document.createElement("style");t.dataset.plugin="dsh-aivn",t.dataset.pluginCss=a,t.textContent=e,document.head.appendChild(t)}var he=require("@deepseek-ai/dsh-client-ui-primitives"),V=require("react/jsx-runtime"),za="dsh-aivn",Bt=["gemini","openai","modelslab"],Na=[{title:"P0 \xB7 \u51B3\u5B9A\u80FD\u529B\u5F00\u4E0D\u5F00",blurb:"\u4E0D\u914D\u5C31\u6CA1\u6709\u90A3\u9879\u80FD\u529B\uFF1A\u5BF9\u5E94\u7684\u5DE5\u5177\u4E0D\u6CE8\u518C\uFF0C\u642D\u53F0\u52A9\u624B\u7684\u63D0\u793A\u8BCD\u91CC\u4E5F\u4E0D\u63D0\u5B83\u3002Key \u7C7B\u5B57\u6BB5\u53EA\u5199\u4E0D\u56DE\u663E\uFF0C\u7559\u7A7A = \u4FDD\u6301\u73B0\u72B6\u3002",fields:[{field:"ttsKeys",multiple:!0,label:"Fish Audio Key",hint:"\u914D\u4E86\u624D\u6709\u53F0\u8BCD\u8BED\u97F3\u4E0E list_voices\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\uFF08\u8F6E\u8BE2\u5206\u644A\u989D\u5EA6\uFF09\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_TTS_KEYS",kind:"secret"},{field:"searchKeys",multiple:!0,label:"Exa \u68C0\u7D22 Key",hint:"\u914D\u4E86\u642D\u53F0\u52A9\u624B\u624D\u6709 web_search\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_EXA_KEYS",kind:"secret"},{field:"imageFormat",label:"\u751F\u56FE\u63A5\u53E3\u683C\u5F0F",hint:`\u534F\u8BAE\u5F62\u72B6\uFF0C\u4E0D\u662F\u4EA7\u54C1\u540D\uFF1A${Bt.join(" / ")}`,kind:"format"},{field:"imageBaseUrl",label:"\u751F\u56FE\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u751F\u56FE\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u7B97\u914D\u597D\u751F\u56FE\u2014\u2014\u53EA\u7ED9\u5176\u4E00\u7B49\u4E8E\u6CA1\u6709",kind:"text"},{field:"imageModel",label:"\u751F\u56FE\u6A21\u578B",hint:"\u540C\u4E0A\uFF1B\u914D\u9F50\u540E\u642D\u53F0\u52A9\u624B\u591A generate_image / commit_asset / recut_sprite\uFF0C\u5267\u4F5C\u5BB6\u591A\u540C\u6B65\u51FA\u56FE",kind:"text"},{field:"imageApiKey",label:"\u751F\u56FE API Key",hint:"\u672C\u673A\u7F51\u5173\u4E0D\u6821\u9A8C\u5C31\u4E0D\u7528\u586B\uFF08\u4E0D\u5E26\u9274\u6743\u5934\uFF09",kind:"secret"},{field:"musicBaseUrl",label:"\u914D\u4E50\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u914D\u4E50\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u6709 generate_bgm\uFF08\u53EA\u6709 Gemini \u5F62\u72B6\uFF09",kind:"text"},{field:"musicModel",label:"\u914D\u4E50\u6A21\u578B",hint:"\u540C\u4E0A",kind:"text"},{field:"musicApiKey",label:"\u914D\u4E50 API Key",hint:"\u540C\u4E00\u4EFD\u7F51\u5173\u7684 Key\uFF0C\u53EF\u7559\u7A7A",kind:"secret"},{field:"shell",label:"\u642D\u53F0\u52A9\u624B\u547D\u4EE4\u884C\uFF08bash\uFF09",hint:"\u5F00\u4E86\u624D\u7ED9\u642D\u53F0\u52A9\u624B\u88C5 tool-bash\u3002bash \u662F\u9884\u8BBE\u7684\u300C\u4E00\u884C\u300D\uFF0C\u6539\u5B8C\u53EA\u5BF9**\u65B0\u5EFA**\u7684\u642D\u53F0\u52A9\u624B\u4F1A\u8BDD\u751F\u6548",kind:"switch"}]},{title:"P1 \xB7 \u9ED8\u8BA4\u5C31\u80FD\u7528\uFF0C\u6309\u53E3\u5473\u8C03",blurb:"\u8FD9\u4E00\u6BB5\u7684\u9ED8\u8BA4\u503C\u90FD\u662F\u6311\u8FC7\u7684\uFF0C\u6539\u4E4B\u524D\u5148\u60F3\u6E05\u695A\u4E3A\u4EC0\u4E48\u6539\u3002",fields:[{field:"ttsBaseUrl",label:"TTS \u63A5\u53E3\u5730\u5740",hint:"\u6362\u81EA\u5EFA\u7F51\u5173\u65F6\u6539",kind:"text"},{field:"ttsModel",label:"TTS \u6A21\u578B",hint:"\u6362\u6A21\u578B\u540E\u540C\u4E00\u53E5\u8BDD\u4E0D\u518D\u547D\u4E2D\u65E7\u97F3\u9891\u7F13\u5B58\uFF08\u7F13\u5B58\u952E\u542B\u6A21\u578B\uFF09",kind:"text"},{field:"ttsConcurrency",label:"TTS \u5E76\u53D1\u4E0A\u9650",hint:"\u540C\u65F6\u5408\u6210\u7684\u4E0A\u9650\uFF1A\u644A\u5F80\u8FD4\uFF0C\u53C8\u4E0D\u628A\u989D\u5EA6\u4E00\u6B21\u6253\u7A7A",kind:"number"},{field:"searchBaseUrl",label:"Exa \u63A5\u53E3\u5730\u5740",hint:"\u6362\u4EE3\u7406 / \u955C\u50CF\u65F6\u6539",kind:"text"},{field:"imageSize",label:"\u751F\u56FE\u6863\u4F4D",hint:"1K / 2K / 4K\uFF08K \u5927\u5199\uFF09\uFF0C\u6216\u5B57\u9762\u50CF\u7D20 1536x1024\uFF1Bgemini \u5F62\u72B6\u53EA\u8BA4\u6863\u4F4D",kind:"text"},{field:"imageTimeoutMs",label:"\u751F\u56FE\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u51FA\u56FE\u6162\u5C31\u8C03\u5927",kind:"number"},{field:"musicTimeoutMs",label:"\u914D\u4E50\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u4E00\u9996\u66F2\u5B50\u5B9E\u6D4B\u7EA6 84 \u79D2",kind:"number"}]}],qr=Na.flatMap(a=>a.fields.map(e=>e.field)),Tt=new Set(["ttsKeys","searchKeys","imageApiKey","musicApiKey"]),Or=[{label:"\u8BED\u97F3",hint:"\u53F0\u8BCD\u8BED\u97F3\u4E0E\u97F3\u8272\u5E93",on:(a,e)=>e.has("ttsKeys")},{label:"\u68C0\u7D22",hint:"\u642D\u53F0\u52A9\u624B\u7684 web_search",on:(a,e)=>e.has("searchKeys")},{label:"\u751F\u56FE",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>Ha(a.imageBaseUrl)&&Ha(a.imageModel)},{label:"\u914D\u4E50",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>Ha(a.musicBaseUrl)&&Ha(a.musicModel)},{label:"\u547D\u4EE4\u884C",hint:"\u53EA\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548",on:a=>a.shell===!0}];function Ha(a){return typeof a=="string"&&a.trim()!==""}var Er={unavailable:"\u5BBF\u4E3B\u6CA1\u6709\u5728\u670D\u52A1 dsh-aivn \u7684\u914D\u7F6E\u547D\u540D\u7A7A\u95F4\u3002",readOnly:"\u8FD9\u4EFD\u90E8\u7F72\u7684\u914D\u7F6E\u662F\u53EA\u8BFB\u7684\u3002",saveFailed:"\u6CA1\u5B58\u4E0A\uFF1A\u5BBF\u4E3B\u62D2\u7EDD\u4E86\u8FD9\u6B21\u5199\u5165\uFF08\u53EF\u80FD\u662F\u522B\u5904\u5148\u6539\u8FC7\uFF09\u3002",save:"\u4FDD\u5B58",saving:"\u4FDD\u5B58\u4E2D\u2026"};function Ur(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>{let t=e.trim();return Bt.includes(t)?{kind:"set",value:t}:void 0}}}function Hr(a){return{field:a,format:e=>e===!0?"true":"false",parse:e=>({kind:"set",value:e==="true"})}}function Nr(a,e){return a==="number"?zr(e):a==="switch"?Hr(e):a==="format"?Ur(e):_r(e)}function _r(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>e===""?{kind:"clear"}:{kind:"set",value:e}}}function zr(a){return{field:a,format:e=>typeof e=="number"?String(e):"",parse:e=>{if(e==="")return{kind:"clear"};let t=Number(e);return Number.isFinite(t)?{kind:"set",value:t}:void 0}}}var _a=class{constructor(e,t){this.scope=e;this.describe=t;let o=Na.flatMap(r=>r.fields).filter(r=>!Tt.has(r.field)).map(r=>Nr(r.kind,r.field)),s=Na.flatMap(r=>r.fields).filter(r=>Tt.has(r.field)).map(r=>({field:r.field,write:d=>this.writeSecret(r,d)}));this.form=new he.SettingsFormModel(e,o,s),this.store=this.form.bind(()=>this.projection()),this.unsubscribeMirror=t.subscribe(()=>this.store.set(this.projection()))}scope;describe;form;store;unsubscribeMirror;async writeSecret(e,t){if(t.trim()==="")return!0;let o=e.multiple===!0?Gr(t):t.trim();return this.scope.mutate([{op:"set",path:[e.field],value:o}])}clearSecret(e){return this.scope.mutate([{op:"unset",path:[e]}])}projection(){let e=this.scope.getSnapshot().value??{},t=this.describe.getSnapshot().view?.namespaces.find(r=>r.ns===za),o=new Set((t?.secrets??[]).filter(r=>r.set).map(r=>r.path[0]??"").filter(r=>r!=="")),s={};for(let r of qr)s[r]={...this.form.field(r),configured:o.has(r)};return{...this.form.shell(),fields:s,lights:Or.map(r=>({label:r.label,hint:r.hint,on:r.on(e,o)}))}}inject(){return{hooks:{aivnCard:this.store},...this.form.actions(),clearSecret:e=>{this.clearSecret(e)}}}dispose(){this.unsubscribeMirror(),this.form.dispose()}};function Gr(a){return a.split(/[\s,，]+/).map(e=>e.trim()).filter(e=>e!=="")}var Vr="Fish / Exa Key\u3001\u751F\u56FE\u4E0E\u914D\u4E50\u540E\u7AEF\u3001\u547D\u4EE4\u884C\u5F00\u5173",Rt=a=>{let e=a.useAivnCard(o=>o);if(a.view==="summary")return(0,V.jsx)(V.Fragment,{children:Vr});let t=!e.writable;return(0,V.jsxs)(he.SettingsForm,{labels:Er,state:e,onSave:a.save,onDiscard:a.discard,children:[(0,V.jsxs)("p",{className:"aivn-config-lights",children:[e.lights.map(o=>(0,V.jsxs)("span",{title:o.hint,"data-on":o.on?"true":"false",children:[o.label," ",o.on?"\u5F00":"\u5173"]},o.label)),(0,V.jsx)("span",{className:"aivn-config-lights-note",children:"\uFF08\u6309\u5F53\u524D\u914D\u7F6E\u7B97\uFF1B\u73AF\u5883\u53D8\u91CF\u91CC\u7684 Key \u4E0D\u5728\u8FD9\u91CC\u663E\u793A\uFF09"})]}),Na.map(o=>(0,V.jsxs)("section",{children:[(0,V.jsx)("h4",{children:o.title}),(0,V.jsx)("p",{children:o.blurb}),o.fields.map(s=>(0,V.jsx)(Wr,{field:s,state:e.fields[s.field],disabled:t,edit:a.edit,resetField:a.resetField,clearSecret:a.clearSecret},s.field))]},o.title))]})};function Wr(a){let{field:e,state:t,disabled:o}=a;return e.kind==="secret"?(0,V.jsxs)("div",{className:"aivn-config-secret",children:[(0,V.jsx)(he.SettingsSecretField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,text:t.text,configured:t.configured,stateLabel:t.configured?"\u5DF2\u914D\u7F6E":"\u672A\u914D\u7F6E",disabled:o,onEdit:s=>a.edit(e.field,s)}),t.configured?(0,V.jsx)("button",{type:"button",disabled:o,onClick:()=>a.clearSecret(e.field),children:"\u6E05\u9664\u5DF2\u5B58 Key"}):null]}):e.kind==="switch"?(0,V.jsxs)("div",{className:"aivn-config-switch",children:[(0,V.jsx)(he.Switch,{checked:t.text==="true",disabled:o,label:e.label,onChange:s=>a.edit(e.field,s?"true":"false")}),(0,V.jsx)("p",{children:e.hint})]}):(0,V.jsx)(he.SettingsValueField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,overriddenLabel:"\u5DF2\u6539",resetLabel:"\u6062\u590D\u9ED8\u8BA4",invalidLabel:e.kind==="number"?"\u8981\u4E00\u4E2A\u6570\u5B57":"\u53D6\u503C\u4E0D\u5BF9",numeric:e.kind==="number",disabled:o,text:t.text,overridden:t.overridden,invalid:t.invalid,onEdit:s=>a.edit(e.field,s),onReset:()=>a.resetField(e.field)})}var k=require("react");var c=require("react/jsx-runtime"),B=require("react");var Ga="full";var Ve="normal";var Xr=["left","center","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"];function Kr(a){return typeof a=="string"&&Xr.includes(a)}var $r={l:"left",c:"center",r:"right"};function jr(a,e){return a<=0?[]:(a===2?["left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right","center"]:["center","left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"]).filter(o=>!e.has(o)).slice(0,a)}function qt(a,e=new Map){let t=new Map,o=a.filter(d=>!e.has(d)),s=new Set;for(let[d,l]of e)a.includes(d)&&s.add(l);let r=jr(o.length,s);o.forEach((d,l)=>{t.set(d,r[l]??"center")});for(let[d,l]of e)a.includes(d)&&t.set(d,l);return t}function Ot(a){if(a===void 0)return null;let e=a.trim().toLowerCase();return e===""?null:Kr(e)?e:$r[e]??null}var Zr={full:{small:{landscape:{top:68,height:32},portrait:{top:66,height:34}},normal:{landscape:{top:18,height:132},portrait:{top:16,height:102}},large:{landscape:{top:14,height:168},portrait:{top:13,height:130}},huge:{landscape:{top:10,height:232},portrait:{top:10,height:178}}},half:{small:{landscape:{top:70,height:30},portrait:{top:68,height:32}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:13,height:126},portrait:{top:12,height:118}},huge:{landscape:{top:8,height:172},portrait:{top:8,height:156}}},square:{small:{landscape:{top:72,height:28},portrait:{top:70,height:30}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:12,height:130},portrait:{top:11,height:122}},huge:{landscape:{top:8,height:184},portrait:{top:8,height:164}}}};function Ht(a,e,t="bottom"){let o=Zr[a??Ga][e??Ve];return{landscape:Et(o.landscape,e,t),portrait:Et(o.portrait,e,t)}}function Et(a,e,t){let r=t==="center"?"center":t==="top"?"top center":(e??Ve)==="small"?"bottom center":"top center",d=t==="center"?50-a.height/2:t==="top"?0:a.top;return{top:Ut(d),height:Ut(a.height),origin:r}}function Ut(a){return Math.round(a*100)/100}var Qr=["nudge","stagger","jump","nod","bow","turn","shake","sway"];function Va(a){return typeof a=="string"&&Qr.includes(a)}function Nt(a){if(typeof a!="string")return null;let e=a.trim().toLowerCase();return Va(e)?`sprite-act-${e}`:null}function _t(a,e,t){let o=e.trim(),s={},r=d=>{d&&(d.framing&&(s.framing=d.framing),d.stature&&(s.stature=d.stature),d.anchor&&(s.anchor=d.anchor),d.title&&(s.title=d.title))};return r(a[o]),t!==void 0&&t.trim()!==""&&r(a[`${o}/${t.trim()}`]),s}function zt(a,e={}){let t=e.sprite?.trim();return t||a}function Wa(a,e=!1){return e?"\u8FD8\u6CA1\u5F00\u6F14\u2014\u2014\u6309\u753B\u9762\u4E0A\u7684\u300C\u5F00\u6F14\u300D\u5F00\u59CB\u3002":a?"\u5267\u4F5C\u5BB6\u6B63\u5728\u843D\u7B14\u2026":"\uFF08\u70B9\u51FB\u5F00\u59CB\uFF09"}function at(a){return a.hasView?{name:a.viewName,text:a.shown}:{name:null,text:Wa(a.live)}}function tt(a){return a.hold?!1:a.nextIsPlayerInput?(!a.hasCurrent||a.currentComplete)&&a.cursor<a.cueCount:!a.live||a.auto?!1:!a.hasCurrent&&a.cursor<a.cueCount}function ot(a){let e={showContinueCard:!1,clickToContinue:!1};return a.ready?a.stopType==="pause"?{...e,clickToContinue:!0}:!a.isNoStop||a.stopType!==null?e:a.continueCardOn?{...e,showContinueCard:!0}:{...e,clickToContinue:!0}:e}var Jr=0,We=class{lines=[];cues=[];openKey=null;scene="";reset(){this.lines.length=0,this.cues.length=0,this.openKey=null,this.scene=""}replaceText(e,t){let o=this.lines.find(s=>s.seq===e);return o?(o.text=t,!0):!1}apply(e,t){let o=()=>`l${Jr+=1}`;switch(e.kind){case"scene":{this.openKey=null,this.scene=e.bg??this.scene,this.lines.push({key:o(),type:"scene",seq:t,text:[e.bg,e.bgm,e.ambient].filter(Boolean).join(" \xB7 ")}),this.cues.push({key:o(),kind:"scene",bg:e.bg,bgm:e.bgm,ambient:e.ambient,bgmVolume:e.bgm_volume,ambientVolume:e.ambient_volume,transition:e.transition,...e.clear===!0?{clear:!0}:{}});return}case"sfx":this.cues.push({key:o(),kind:"sfx",src:e.src,volume:e.volume});return;case"cg":this.cues.push({key:o(),kind:"cg",id:e.id,caption:e.caption});return;case"actor":this.cues.push({key:o(),kind:"actor",id:e.id,pos:e.pos,variant:e.variant,shot:e.shot,anchor:e.anchor,action:e.action,leave:e.leave});return;case"preload_asset":this.cues.push({key:o(),kind:"preload",id:e.id,type:e.type});return;case"say_start":{let s={key:o(),type:"say",actorId:e.id,...e.mood?{mood:e.mood}:{},...e.name?{nameOverride:e.name}:{},seq:t,nodeId:e.nodeId,text:""};this.lines.push(s),this.cues.push({key:o(),kind:"line",lineKey:s.key}),this.openKey=s.key;return}case"narrate_start":{let s={key:o(),type:"narrate",seq:t,nodeId:e.nodeId,text:""};this.lines.push(s),this.cues.push({key:o(),kind:"line",lineKey:s.key}),this.openKey=s.key;return}case"thought_start":{let s={key:o(),type:"thought",actorId:e.id,seq:t,nodeId:e.nodeId,text:""};this.lines.push(s),this.cues.push({key:o(),kind:"line",lineKey:s.key}),this.openKey=s.key;return}case"say_text":case"narrate_text":case"thought_text":{let s=this.lines.at(-1);s&&s.key===this.openKey&&(s.text+=e.delta);return}case"say_end":case"narrate_end":case"thought_end":this.openKey=null;return;case"player_input":{let s={key:o(),type:"input",actorId:"player",seq:t,text:e.text};this.lines.push(s),this.cues.push({key:o(),kind:"line",lineKey:s.key}),this.openKey=null;return}case"stop":return}}};function Xa(a,e){return e?a[e]??(e==="player"?"\u4F60":e):""}var y=require("react");function Wt(a,e,t){for(let o=0;o<a.length;o+=1){let s=a[o];if(s.kind==="line"&&e.find(r=>r.key===s.lineKey)?.nodeId===t)return o}return-1}function Xt(a,e,t){for(let o=0;o<a.length;o+=1){let s=a[o];if(s.kind==="line"&&e.find(r=>r.key===s.lineKey)?.seq===t)return o}return-1}function Kt(a,e,t){let o=t.nodeId?Wt(a,e,t.nodeId):typeof t.seq=="number"?Xt(a,e,t.seq):-1;if(o<0)return{cueIndex:-1,shownLength:0};let s=a[o];if(s.kind!=="line")return{cueIndex:o,shownLength:0};let r=e.find(l=>l.key===s.lineKey),d=t.offset??t.len??0;return{cueIndex:o,shownLength:Math.min(d,r?.text.length??0)}}function Yr(){return{resolvedPos:"center",variant:null,shot:null,anchor:null,action:null,actionSeq:0,orderSeq:0}}function $t(a,e){let t=!!e.leave||e.action==="exit"||e.action==="leave",o=a[e.id],s=o&&!o.leaving?o.orderSeq:Math.max(0,...Object.values(a).map(m=>m.orderSeq||0))+1,r=t?o?{...a,[e.id]:{...o,leaving:!0}}:a:{...a,[e.id]:{...o??Yr(),pos:Ot(e.pos)??o?.pos,variant:e.variant??o?.variant??null,shot:e.shot??o?.shot??null,anchor:e.anchor??o?.anchor??null,action:Va(e.action)?e.action:null,actionSeq:Va(e.action)?(o?.actionSeq??0)+1:o?.actionSeq??0,orderSeq:s,leaving:!1}},d=new Map;for(let[m,I]of Object.entries(r))I.pos&&!I.leaving&&d.set(m,I.pos);let l=Object.keys(r).filter(m=>!r[m].leaving),u=qt(l,d);return Object.fromEntries(Object.entries(r).map(([m,I])=>[m,{...I,resolvedPos:I.leaving?I.resolvedPos:u.get(m)??"center"}]))}function st(a,e){let t=a?.actorId;return t&&e[t]?t:null}var es=6e5;function jt(a){return a!=null&&a>0?a:es}var Ka={bg:null,bgm:null,ambient:null,transition:null,cg:null,sprites:{},pending:{}},as=new Set(["none",""]);function rt(a,e){return e===void 0?a:as.has(e.trim().toLowerCase())?null:e}function lt(a,e){switch(e.kind){case"scene":return{...a,bg:e.bg??a.bg,transition:e.transition??"fade",cg:e.bg?null:a.cg,sprites:e.clear===!0?{}:a.sprites};case"cg":return{...a,cg:{id:e.id,caption:e.caption}};case"actor":return{...a,cg:null,sprites:$t(a.sprites,e)};default:return a}}function Zt(a,e){let t=lt(a,e);switch(e.kind){case"scene":return{...t,bgm:rt(t.bgm,e.bgm),ambient:rt(t.ambient,e.ambient),bgmVolume:e.bgmVolume??t.bgmVolume,ambientVolume:e.ambientVolume??t.ambientVolume};case"preload":return e.type==="sprite"?t:{...t,pending:{...t.pending,[e.id]:{type:e.type,at:Date.now()}}};default:return t}}function ts(a){let e={};for(let[t,o]of Object.entries(a))o.leaving||(e[t]=o);return e}function Qt(a,e){let t=Ka;for(let o=0;o<e;o+=1)t=lt(t,a[o]);return{...t,sprites:ts(t.sprites)}}function Jt(a,e,t){let o=e?t?.get(e):void 0;return o?{...a,cg:{id:o}}:a}function Yt(a,e,t){return t?a?.nodeId??null:e?.nodeId??a?.nodeId??null}function eo(a,e,t){let o=r=>{for(let d=0;d<a.length;d+=1){let l=a[d];if(l.kind==="line"&&l.lineKey===r)return d}return-1},s=e[t];if(!s)return null;if(s.kind==="line"){let r=o(s.key);return r<0?null:r}for(let r=t+1;r<e.length;r+=1){let d=e[r];if(d.kind!=="line")continue;let l=o(d.key);return l<0?null:l}return a.length}function Gt(a,e){for(let t=a.length-1;t>=0;t-=1)if(a[t].key===e)return t;return-1}function os(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}var rs=new Set(["\u3002","\uFF01","\uFF1F","\u2026","\u2014","\u300D","\u300F"]),ss=new Set(["\uFF0C","\u3001","\uFF1B","\uFF1A","\uFF09",".",",","!","?",";"]),Xe=null;function Vt(){let a=Date.now();if(Xe&&a-Xe.at<250)return Xe.value;let e=getComputedStyle(document.documentElement),t=(o,s)=>{let r=Number.parseInt(e.getPropertyValue(o),10);return Number.isFinite(r)&&r>=0?r:s};return Xe={at:a,value:{char:t("--type-ms",35),short:t("--pause-short-ms",120),long:t("--pause-long-ms",240)}},Xe.value}function ls(a,e){let t=a[e-1];if(!t)return Vt().char;let o=Vt();return rs.has(t)?o.char+o.long:ss.has(t)?o.char+o.short:o.char}function ut(a,e,t){let[o,s]=(0,y.useState)(Ka),[r,d]=(0,y.useState)(null),[l,u]=(0,y.useState)(0),[m,I]=(0,y.useState)(!1),[R,L]=(0,y.useState)(null),[P,M]=(0,y.useState)(null),p=(0,y.useRef)(0),F=(0,y.useRef)(!t.resume),w=(0,y.useRef)(t.resumeAfterReset===!0),O=(0,y.useRef)(e);O.current=e;let U=t.transcript,j=(0,y.useRef)(U);j.current=U;let E=(0,y.useRef)({});E.current={onLineStart:t.onLineStart,onFastForward:t.onFastForward};let Y=(0,y.useRef)(t.resumeAt??null);(0,y.useEffect)(()=>{t.resumeAt&&(Y.current=t.resumeAt)},[t.resumeAt]);let C=r?O.current.find(g=>g.key===r)??null:null,v=t.turbo??!1,H=r?Gt(U,r):-1,ee=P!==null?U[P]??null:C?os(C):null,b=P!==null,K=Yt(ee,C,b),re=(0,y.useRef)(H);re.current=H;let ae=(0,y.useCallback)(g=>{M(S=>{let D=j.current,G=re.current>=0?re.current:D.length-1,N=Math.max(0,Math.min((S??G)+g,G));return N>=G?null:N})},[]),A=(0,y.useCallback)(g=>{s(S=>Zt(S,g))},[]),W=(0,y.useCallback)(()=>{for(;;){let g=a[p.current];if(!g)return;if(p.current+=1,g.kind==="line"){let S=O.current.find(D=>D.key===g.lineKey)??null;d(g.lineKey),u(S?.type==="input"?S.text.length:0),E.current.onLineStart?.(S);return}if(g.kind==="sfx"){L({key:g.key,src:g.src,volume:g.volume});continue}A(g)}},[a,A]),se=C!==null&&l>=C.text.length,ie=C===null||se,ne=a.length<=p.current&&(C===null||se),le=(0,y.useCallback)(()=>{if(!ie){u(C?.text.length??0),E.current.onFastForward?.();return}W()},[ie,C,W]);(0,y.useEffect)(()=>{if(!C||l>=C.text.length)return;if(v){u(C.text.length),E.current.onFastForward?.();return}let g=setTimeout(()=>u(S=>S+1),ls(C.text,l));return()=>clearTimeout(g)},[C,l,v]),(0,y.useEffect)(()=>{if(!v||P!==null||C&&l<C.text.length||p.current>=a.length)return;let g=setTimeout(()=>W(),30);return()=>clearTimeout(g)},[v,P,C,l,a,W,t.revision]),(0,y.useEffect)(()=>{if(!m||v||t.hold)return;if(!C){if(p.current>=a.length)return;let G=setTimeout(()=>W(),400);return()=>clearTimeout(G)}if(!se||!a[p.current])return;let S=Math.min(900+C.text.length*55,3200),D=setTimeout(()=>W(),S);return()=>clearTimeout(D)},[m,C,se,a,W,t.revision,t.hold,v]);let Z=(0,y.useRef)(t.resetToken??0);(0,y.useEffect)(()=>{let g=t.resetToken??0;g!==Z.current&&(Z.current=g,p.current=0,d(null),u(0),M(null),s(Ka),F.current=!1,w.current=t.resumeAfterReset===!0,Y.current=t.seekTo??null)},[t.resetToken,t.resumeAfterReset,t.seekTo]),(0,y.useEffect)(()=>{if(a.length<p.current){p.current=0,d(null),u(0),M(null),s(Ka);return}if(!F.current&&a.length>0){F.current=!0;let g=Y.current;Y.current=null;let S=g?Kt(a,O.current,g):null,D=S?.cueIndex??-1;if(S&&D>=0){for(let $=0;$<=D;$+=1)A(a[$]);let N=a[D];p.current=D+1,N.kind==="line"&&(d(N.lineKey),u(S.shownLength));return}for(let N=0;N<a.length;N+=1)A(a[N]);p.current=a.length;let G=null;for(let N of a)N.kind==="line"&&(G=N.lineKey);if(G&&w.current){d(G);let N=O.current.find($=>$.key===G);u(N?.text.length??0)}}},[t.revision,a,A]),(0,y.useEffect)(()=>{let g=C;!g||g.nodeId===void 0&&g.seq===void 0||E.current.onRead?.({nodeId:g.nodeId??"",offset:l,...g.seq!==void 0?{seq:g.seq}:{},len:l})},[C,l]),(0,y.useEffect)(()=>{let g=a[p.current],S=g?.kind==="line"&&(O.current.find(N=>N.key===g.lineKey)?.type??null)==="input";if(!tt({live:t.live,auto:m,hold:t.hold===!0,hasCurrent:C!==null,currentComplete:C===null||l>=C.text.length,cursor:p.current,cueCount:a.length,nextIsPlayerInput:S}))return;let G=setTimeout(()=>W(),80);return()=>clearTimeout(G)},[t.live,m,C,l,a,W,t.revision,t.hold]);let pe=jt(t.assetsTtlMs);(0,y.useEffect)(()=>{if(Object.keys(o.pending).length===0)return;let g=setInterval(()=>{let S=Date.now();s(D=>{let G=Object.entries(D.pending).filter(([,$])=>S-$.at>=pe).map(([$])=>$);if(G.length===0)return D;let N={...D.pending};for(let $ of G)delete N[$];return{...D,pending:N}})},5e3);return()=>clearInterval(g)},[o.pending,pe]);let _=(0,y.useCallback)(g=>{g.length!==0&&s(S=>{if(Object.keys(S.pending).length===0)return S;let D={...S.pending};for(let G of g)delete D[G];return{...S,pending:D}})},[]),fe=(0,y.useMemo)(()=>U.slice(0,Math.max(H,0)).reverse(),[U,H]),ue=(0,y.useMemo)(()=>{if(P===null)return null;let g=eo(a,U,P);return g===null?null:{...Qt(a,g),bgm:o.bgm,ambient:o.ambient,bgmVolume:o.bgmVolume,ambientVolume:o.ambientVolume,pending:o.pending}},[P,a,U,o.bgm,o.ambient,o.bgmVolume,o.ambientVolume,o.pending]),De=(0,y.useCallback)(g=>{let S=Gt(j.current,g);S<0||M(S>=re.current?null:S)},[]),Ne=(0,y.useCallback)(()=>{M(null)},[]);return{visual:Jt(ue??o,K,t.cgByNode),current:C,view:ee,viewLength:b?ee?.text.length??0:l,shownLength:l,exhausted:ne,auto:m,setAuto:I,advance:le,scrub:ae,scrubbed:b,history:fe,seek:De,follow:Ne,sfx:R,settleAssets:_}}function dt(a){return Math.min(1,Math.max(0,a))}function ao(a){return new URL(a,location.href).href}var Ee=class{base;active=null;retired=null;ramps=new Map;constructor(e){this.base=e}set(e,t){let o=dt(t??this.base);if(e===null){this.retire();return}let s=ao(e);if(this.active?.src===s){this.rampTo(this.active,o);return}this.retire();let r=new Audio(s);r.loop=!0,r.preload="auto",r.volume=0,this.active=r,r.play().catch(()=>{}),this.rampTo(r,o)}retire(){if(!this.active)return;let e=this.active;this.active=null,this.retired&&this.discard(this.retired),this.retired=e,this.rampTo(e,0,()=>this.discard(e))}discard(e){this.cancelRamp(e),e.pause(),e.removeAttribute("src"),e.load(),this.retired===e&&(this.retired=null)}rampTo(e,t,o){this.cancelRamp(e);let s=e.volume;if(Math.abs(t-s)<.01){e.volume=t,o?.();return}let r=Math.max(1,Math.round(1200/50)),d=0,l=window.setInterval(()=>{d+=1,e.volume=dt(s+(t-s)*(d/r)),!(d<r)&&(window.clearInterval(l),this.ramps.delete(e),o?.())},50);this.ramps.set(e,l)}cancelRamp(e){let t=this.ramps.get(e);t!==void 0&&(window.clearInterval(t),this.ramps.delete(e))}dispose(){for(let e of[this.active,this.retired])e&&this.discard(e);this.active=null,this.retired=null}},Ke=class{playing=new Set;play(e,t=.7){if(this.playing.size>=6){let s=this.playing.values().next().value;s&&(this.playing.delete(s),s.pause())}let o=new Audio(ao(e));o.volume=dt(t),o.addEventListener("ended",()=>this.playing.delete(o)),o.addEventListener("error",()=>this.playing.delete(o)),this.playing.add(o),o.play().catch(()=>this.playing.delete(o))}dispose(){for(let e of this.playing)e.pause();this.playing.clear()}};var Jo=require("react/jsx-runtime");var $a=require("react");var to=a=>a?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function oo(a,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:to(a),size:24,node:e,...t.length>0?{aliases:t}:{}}}var ro=a=>{let e="",t=!1;for(let o of a){if(o==="-"||o==="_"||o<=" "){t=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=t?o.toUpperCase():o,t=!1}return e};var so=a=>{let e=ro(a);return e.charAt(0).toUpperCase()+e.slice(1)};var je=require("react");var $e=(...a)=>a.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();var Ce={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function nt(a){return a!=null}function lo(a,e={}){let t=e.attributeNames??{},o=L=>t[L]??L,s=a.size??a.width??Ce.width,r=a.size??a.height??Ce.height,d=a.aliases?.filter(L=>typeof L=="string"&&L.trim()!=="").map(L=>`lucide-${L}`)??[],l=[...a.name?[`lucide-${a.name}`]:[],...d],u=e.className?.split(" ").filter(Boolean)??[],m=e.includeDefaultClasses===!1?$e(...u):$e("lucide",...l,...u),I=e.absoluteStrokeWidth?Number(e.strokeWidth??Ce["stroke-width"])*Number(a.size??a.width??Ce.width)/Number(e.size??e.width??Ce.width):e.strokeWidth??Ce["stroke-width"];return["svg",{...Object.entries(Ce).reduce((L,[P,M])=>(L[o(P)]=M,L),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&nt(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&nt(e.width)&&{[o("width")]:e.width},..."height"in e&&nt(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:I,...m&&{[o("class")]:m},[o("viewBox")]:`0 0 ${s} ${r}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},a.node.map(L=>{let[P,M,p]=L,F=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...M}:M;return p?[P,F,p]:[P,F]})]}function uo(a,e={}){return lo(a,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var no=a=>{for(let e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var Ue=require("react");var us=(0,Ue.createContext)({});var io=()=>(0,Ue.useContext)(us);var fo=(0,je.forwardRef)(({color:a,size:e,width:t,height:o,strokeWidth:s,absoluteStrokeWidth:r,nonScalingStroke:d,className:l="",children:u,iconNode:m=[],icon:I={node:m,aliases:[],size:24},...R},L)=>{let{size:P=24,strokeWidth:M=2,absoluteStrokeWidth:p=!1,nonScalingStroke:F=!1,color:w="currentColor",className:O=""}=io()??{},U=!!u||no(R),[j,E,Y=[]]=uo(I,{color:a??w,width:t??e??P,height:o??e??P,strokeWidth:s??M,absoluteStrokeWidth:r??p,nonScalingStroke:d??F,className:$e(O,l),hasA11yProp:U,attributes:R});return(0,je.createElement)(j,{ref:L,...E},[...Y.map(([C,v])=>(0,je.createElement)(C,v)),...Array.isArray(u)?u:[u]])});function n(a,e=[],t=[]){let o=typeof a=="string"?oo(a,e,t):a,s=(0,$a.forwardRef)(({className:r,...d},l)=>(0,$a.createElement)(fo,{ref:l,icon:o,className:r,...d}));return o.name&&(s.displayName=so(o.name)),s}var co={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};co.node;var Ze=n(co);var po={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};po.node;var Qe=n(po);var mo={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};mo.node;var Je=n(mo);var ho={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};ho.node;var Ye=n(ho);var go={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};go.node;var ea=n(go);var xo={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};xo.node;var aa=n(xo);var Lo={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Lo.node;var ta=n(Lo);var Io={name:"corner-up-left",size:24,node:[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}],["path",{d:"M9 14 4 9l5-5",key:"102s5s"}]]};Io.node;var He=n(Io);var Co={name:"crosshair",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]};Co.node;var oa=n(Co);var So={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};So.node;var ra=n(So);var ko={name:"drama",size:24,node:[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]};ko.node;var sa=n(ko);var yo={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};yo.node;var la=n(yo);var bo={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};bo.node;var ua=n(bo);var wo={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};wo.node;var da=n(wo);var Po={name:"image",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]};Po.node;var na=n(Po);var vo={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};vo.node;var ia=n(vo);var Ao={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};Ao.node;var fa=n(Ao);var Do={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};Do.node;var ca=n(Do);var Mo={name:"messages-square",size:24,node:[["path",{d:"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",key:"1n2ejm"}],["path",{d:"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",key:"1qfcsi"}]]};Mo.node;var pa=n(Mo);var Fo={name:"mic",size:24,node:[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]};Fo.node;var ma=n(Fo);var To={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};To.node;var Se=n(To);var Bo={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};Bo.node;var ke=n(Bo);var Ro={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Ro.node;var ha=n(Ro);var qo={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};qo.node;var ye=n(qo);var Oo={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};Oo.node;var ga=n(Oo);var Eo={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Eo.node;var xa=n(Eo);var Uo={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};Uo.node;var La=n(Uo);var Ho={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};Ho.node;var Ia=n(Ho);var No={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};No.node;var Ca=n(No);var _o={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};_o.node;var Sa=n(_o);var zo={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};zo.node;var be=n(zo);var Go={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};Go.node;var we=n(Go);var Vo={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};Vo.node;var Pe=n(Vo);var Wo={name:"undo-2",size:24,node:[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]};Wo.node;var ka=n(Wo);var Xo={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};Xo.node;var ya=n(Xo);var Ko={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};Ko.node;var ba=n(Ko);var $o={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};$o.node;var wa=n($o);var jo={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};jo.node;var Pa=n(jo);var Zo={name:"zoom-in",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Zo.node;var va=n(Zo);var Qo={name:"zoom-out",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Qo.node;var Aa=n(Qo);var ds={back:Ze,exit:ia,forward:Qe,plus:La,close:Pa,check:Ye,alert:Pe,chat:ca,backlog:pa,files:la,assets:na,users:ya,drama:sa,craft:ye,memory:Je,settings:Sa,workshop:da,expand:fa,shrink:Se,unshrink:ke,refresh:Ca,reply:He,return:He,download:ra,pencil:ga,undo:ka,rewrite:Ia,remove:we,fork:ua,sparkles:be,play:xa,pause:ha,volume:ba,mic:ma,"volume-off":wa,prev:aa,down:ea,up:ta,zoomIn:va,zoomOut:Aa,locate:oa};function z({name:a,size:e=15}){let t=ds[a];return(0,Jo.jsx)(t,{size:e,strokeWidth:1.75,"aria-hidden":"true",style:{display:"block"}})}var Yo=require("react"),ns=[];function it(){return ns.length>0}var ge=require("react/jsx-runtime"),Ma=require("react"),lr=Tr(sr(),1);function Fa({title:a,hint:e,onClose:t,dismissible:o=!0,children:s,footer:r,width:d=520}){let l=(0,Ma.useRef)(null);return(0,Ma.useEffect)(()=>{let m=l.current?.querySelector("input, textarea, button");m?.focus(),m instanceof HTMLInputElement&&m.select()},[]),(0,Ma.useEffect)(()=>{let u=m=>{m.key==="Escape"&&(m.stopPropagation(),o&&t())};return window.addEventListener("keydown",u,!0),()=>window.removeEventListener("keydown",u,!0)},[o,t]),(0,lr.createPortal)((0,ge.jsx)("div",{className:"modal-scrim stage-root",role:"dialog","aria-modal":"true","aria-label":a,onClick:u=>{u.stopPropagation(),o&&t()},onTouchStart:u=>u.stopPropagation(),onTouchMove:u=>u.stopPropagation(),onTouchEnd:u=>u.stopPropagation(),children:(0,ge.jsxs)("div",{className:"modal-card",style:{width:d},ref:l,onClick:u=>u.stopPropagation(),children:[(0,ge.jsxs)("header",{className:"modal-head",children:[(0,ge.jsx)("h2",{className:"modal-title",children:a}),o&&(0,ge.jsx)("button",{type:"button",className:"modal-x",onClick:t,"aria-label":"\u5173\u95ED",children:"\u2715"})]}),e&&(0,ge.jsx)("p",{className:"modal-hint",children:e}),(0,ge.jsx)("div",{className:"modal-body",children:s}),r&&(0,ge.jsx)("footer",{className:"modal-foot",children:r})]})}),document.body)}var xe=require("react/jsx-runtime");function ft({candidates:a,selected:e,onToggle:t}){if(a.length===0)return(0,xe.jsx)("div",{className:"ref-picker-empty muted small",children:"\u6682\u65E0\u53EF\u7528\u7ACB\u7ED8\u7684\u89D2\u8272\uFF08\u9700\u5148\u6709\u7ACB\u7ED8\u624D\u53EF\u4F5C\u4E3A\u57AB\u56FE\u53C2\u8003\uFF09"});let o=new Set(e),s=[...e.map(r=>a.find(d=>d.id===r)).filter(r=>!!r),...a.filter(r=>!o.has(r.id))];return(0,xe.jsx)("div",{className:"ref-picker-grid",role:"group","aria-label":"\u9009\u62E9\u53C2\u8003\u7ACB\u7ED8\u89D2\u8272",children:s.map(r=>{let d=e.indexOf(r.id),l=d!==-1;return(0,xe.jsxs)("button",{type:"button",className:`ref-picker-chip ${l?"selected":""}`,onClick:()=>t(r.id),title:l?`\u7B2C ${d+1} \u4F4D\u53C2\u8003\u56FE\uFF1A${r.name}\uFF08\u70B9\u51FB\u53D6\u6D88\uFF09`:`\u6DFB\u52A0\u53C2\u8003\uFF1A${r.name}`,"aria-pressed":l,children:[r.spriteUrl?(0,xe.jsx)("img",{src:r.spriteUrl,alt:r.name,className:"ref-chip-thumb"}):(0,xe.jsx)("span",{className:"ref-chip-blank",children:(0,xe.jsx)(z,{name:"users",size:14})}),(0,xe.jsx)("span",{className:"ref-chip-name",children:r.name}),l&&(0,xe.jsx)("span",{className:"ref-chip-order",children:d+1})]},r.id)})})}function ct(a,e){return a.includes(e)?a.filter(t=>t!==e):[...a,e]}function pt(a,e){return e?!0:a.trim().length>0}var Ta={prompt:{title:"\u63D0\u793A",hint:"",placeholder:"\u5199\u4E00\u53E5\u2026",submit:()=>"\u53D1\u9001"},interrupt:{title:"\u6253\u65AD",hint:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002",placeholder:"\u63A5\u4E0B\u6765\u600E\u4E48\u5199\u2026",submit:()=>"\u6253\u65AD\u5E76\u53D1\u9001"},edit:{title:"\u6539\u5199\u8FD9\u53E5",hint:"\u53EA\u6539\u8FD9\u4E00\u53E5\uFF0C\u5267\u60C5\u7167\u65E7\u5F80\u4E0B\u8D70\u3002",placeholder:"\u6539\u5199\u8FD9\u53E5\u2026",submit:()=>"\u6539\u5199"},restart:{title:"\u91CD\u65B0\u751F\u6210",hint:"\u4ECE\u8FD9\u4E00\u8F6E\u5F00\u5934\u91CD\u5199\uFF1A\u539F\u6709\u5185\u5BB9\u6574\u6BB5\u7559\u4F5C\u65E7\u679D\uFF0C\u53EF\u4EE5\u4EA4\u4EE3\u4E00\u53E5\u8981\u6C42\uFF08\u7559\u7A7A\u5C31\u662F\u7EAF\u91CD\u5199\uFF09\u3002",placeholder:"\u60F3\u6362\u4EC0\u4E48\u65B9\u5411\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u91CD\u65B0\u751F\u6210 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u91CD\u65B0\u751F\u6210"},fork:{title:"\u5206\u5C94",hint:"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",placeholder:"\u65B0\u5206\u652F\u7684\u7B2C\u4E00\u53E5\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u5206\u5C94 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u5206\u5C94"},cg:{title:"\u751F\u6210\u63D2\u56FE",hint:"\u7559\u7A7A = \u6309\u521A\u624D\u8FD9\u4E00\u5E55\u6784\u56FE\u3002",placeholder:"\u60F3\u753B\u6210\u4EC0\u4E48\u6837\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:()=>"\u751F\u6210"}},ur={guide:"\u6392\u8FDB\u961F\u5217\uFF0C\u968F\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1\u9001\u3002",fork:"\u4ECE\u6B63\u5728\u770B\u7684\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",interrupt:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002"};function dr(a,e){return a!=="prompt"?a??"prompt":e==="guide"?"prompt":e}function nr(a){return a instanceof HTMLElement&&(a.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(a.tagName))}var Za="OOC\uFF1A",ms={wide:.86,normal:1,close:1.35,extreme:1.85};function hs({url:a,pos:e,name:t,framing:o,stature:s,shot:r,anchor:d,leaving:l,action:u,actionSeq:m,zIndex:I,dim:R}){let[L,P]=(0,B.useState)(a),[M,p]=(0,B.useState)(null);(0,B.useEffect)(()=>{if(!a||a===L)return;let v=new Image,H;return v.onload=()=>{p(L),P(a),H=setTimeout(()=>p(null),260)},v.src=a,()=>{v.onload=null,H&&clearTimeout(H)}},[a,L]);let[F,w]=(0,B.useState)(!1),[O,U]=(0,B.useState)(0);if((0,B.useEffect)(()=>{if(!u){w(!1);return}w(!0),U(H=>H+1);let v=setTimeout(()=>w(!1),560);return()=>clearTimeout(v)},[u,m]),!L)return null;let j=`theater-sprite pos-${e}${l?" leaving":" entering"}${F?" acting":""}${R?" dim":""}`,E=Ht(o,s,d),Y={zIndex:I,"--scale":ms[r??"normal"],"--sprite-top":`${E.landscape.top}%`,"--sprite-height":`${E.landscape.height}%`,"--sprite-origin":E.landscape.origin,"--sprite-top-portrait":`${E.portrait.top}%`,"--sprite-height-portrait":`${E.portrait.height}%`,"--sprite-origin-portrait":E.portrait.origin,"--sprite-act":Nt(u)??"none","--act-nonce":`-${O%100/1e3}s`},C=()=>{p(null),P(null)};return(0,c.jsxs)(c.Fragment,{children:[M&&(0,c.jsx)("img",{className:`${j} sprite-out`,style:{zIndex:I},src:M,alt:"","aria-hidden":!0}),(0,c.jsx)("img",{className:j,style:Y,src:L,alt:t,onError:C})]})}function mt({visual:a,playback:e,live:t,fresh:o,names:s,index:r,voiceAvailable:d,busy:l,targets:u,onPrompt:m,promptAlt:I="fork",showGenerate:R=!0,onEdit:L,onFork:P,onGenerateCg:M,onReplay:p,voiceState:F,voiceOn:w,onToggleVoice:O,onUnlock:U,onView:j,canContinue:E,onContinue:Y,onTurbo:C,overlay:v,directorBar:H=!0}){let ee=(0,B.useRef)(null);ee.current||(ee.current={bgm:new Ee(.28),ambient:new Ee(.16),sfx:new Ke}),(0,B.useEffect)(()=>{let i=ee.current;return()=>{i.bgm.dispose(),i.ambient.dispose(),i.sfx.dispose()}},[]);let[b,K]=(0,B.useState)(null),[re,ae]=(0,B.useState)(""),[A,W]=(0,B.useState)([]),[se,ie]=(0,B.useState)(!0),[ne,le]=(0,B.useState)("guide"),[Z,pe]=(0,B.useState)(!1),{view:_,viewLength:fe,current:ue,shownLength:De,exhausted:Ne,advance:g,scrub:S,scrubbed:D,follow:G}=e,N=_?_.text.slice(0,fe):"",$=ue!==null&&De>=ue.text.length,_e=at({viewName:_&&(_.type==="say"||_.type==="thought")?_.nameOverride??(Xa(s,_.actorId)||"\uFF1F"):null,shown:N,hasView:_!==null,live:t}),de=!_&&o?Wa(t,o):_e.text,Te=st(_,a.sprites),ze=(0,B.useCallback)(()=>{if(U(),Z){pe(!1);return}D?S(1):E?Y():g()},[U,Z,D,S,E,Y,g]),Be=(0,B.useRef)(null),Ge=(0,B.useRef)(null),Ja=(0,B.useRef)(null);(0,B.useEffect)(()=>{let i=Be.current,f=Ge.current;if(!i||!f)return;let Q=Ja.current,te=()=>{i.style.setProperty("--dialog-h",`${f.offsetHeight}px`),i.style.setProperty("--dir-h",`${Q?.offsetHeight??0}px`)};te();let me=new ResizeObserver(te);return me.observe(f),Q&&me.observe(Q),()=>me.disconnect()},[H]),(0,B.useEffect)(()=>{let i=Be.current;if(!i)return;let f=Q=>{Math.abs(Q.deltaY)<4||S(Q.deltaY>0?1:-1)};return i.addEventListener("wheel",f,{passive:!1}),()=>i.removeEventListener("wheel",f)},[S]),(0,B.useEffect)(()=>{let i=f=>{if(!(f.metaKey||f.ctrlKey||f.altKey||nr(f.target))&&!(f.key==="Escape"&&it())){if(Z){(f.key==="h"||f.key==="H"||f.key===" "||f.key==="Escape")&&(pe(!1),f.preventDefault());return}f.key==="ArrowUp"||f.key==="ArrowLeft"?(S(-1),f.preventDefault()):f.key==="ArrowDown"||f.key==="ArrowRight"?(S(1),f.preventDefault()):f.key===" "?(b||ze(),f.preventDefault()):f.key==="Escape"&&D?(S(1),f.preventDefault()):f.key==="Escape"&&b?(K(null),ae(""),f.preventDefault()):(f.key==="l"||f.key==="L")&&(j("backlog"),f.preventDefault())}};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[S,D,b,j,Z,ze]),(0,B.useEffect)(()=>{let i=te=>{te.key==="Control"&&!nr(te.target)&&C(!0)},f=te=>{te.key==="Control"&&C(!1)},Q=()=>C(!1);return window.addEventListener("keydown",i),window.addEventListener("keyup",f),window.addEventListener("blur",Q),()=>{window.removeEventListener("keydown",i),window.removeEventListener("keyup",f),window.removeEventListener("blur",Q)}},[C]);let Re=(0,B.useRef)(null),Ya=i=>{U();let f=i.touches[0];f&&(Re.current={x:f.clientX,y:f.clientY,at:Date.now()})},Oa=i=>{let f=Re.current;if(Re.current=null,Z||!f)return;let Q=i.changedTouches[0];if(!Q||Date.now()-f.at>800)return;let te=Q.clientX-f.x,me=Q.clientY-f.y;Math.abs(te)<45&&Math.abs(me)<45||(Math.abs(te)>Math.abs(me)?S(te>0?-1:1):me<0&&j("backlog"))};(0,B.useEffect)(()=>{let i=e.sfx;if(!i)return;let f=r.sfx(i.src);f&&ee.current.sfx.play(f,i.volume??.7)},[e.sfx,r]);let h=r.bgm(a.bgm),T=r.ambient(a.ambient);(0,B.useEffect)(()=>{ee.current.bgm.set(h,a.bgmVolume)},[h,a.bgmVolume]),(0,B.useEffect)(()=>{ee.current.ambient.set(T,a.ambientVolume)},[T,a.ambientVolume]);let x=r.bg(a.bg),ce=r.cg(a.cg?.id??null),kr=!x&&!!a.bg&&a.pending[a.bg]?.type==="bg",wt=a.cg?.id??null,yr=!ce&&!!wt&&a.pending[wt]?.type==="cg",qe=I==="interrupt"?"interrupt":"fork",Pt=()=>{let i=re.trim(),f=dr(b,ne);if(ae(""),K(null),f==="prompt"||f==="interrupt"){i&&m(i,f==="interrupt"?"interrupt":"guide");return}if(f==="edit"){i&&u.lineNodeId&&L(u.lineNodeId,i);return}if(f==="cg"){M(i,{referenceCharacters:A.length>0?A:void 0,useHistory:se,anchorNodeId:D?u.lineNodeId??_?.nodeId??null:void 0});return}if(f==="restart"){if(!u.beatId)return;P(u.beatId,{resume:!0,...u.beatNodeId?{replaced:u.beatNodeId}:{},...i?{instruction:i}:{}});return}u.lineSeq!==null&&P(u.lineSeq,i?{instruction:i}:void 0)},Oe=F(_?.seq??null),vt=l?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u6539\u5199":u.lineNodeId?null:"\u8FD9\u91CC\u6CA1\u6709\u5267\u4F5C\u5BB6\u7684\u53F0\u8BCD\u53EF\u6539",At=l?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u5199":u.beatId?null:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u9000\u56DE\u53BB\u7684\u4E00\u8F6E",et=u.lineSeq===null?"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u5206\u5C94\u7684\u4F4D\u7F6E":null,Me=dr(b,ne),br=Me==="edit"?re.trim()===""||!u.lineNodeId:Me==="prompt"?re.trim()==="":Me==="fork"?et!==null:Me==="restart"?u.beatId===null:Me==="cg"?!pt(re,se):!1;return(0,c.jsxs)("div",{className:`theater stage-root${Z?" bare":""}`,ref:Be,onClick:ze,onTouchStart:Ya,onTouchEnd:Oa,children:[(0,c.jsxs)("div",{className:`theater-stage${D?" rewinding":""}`,children:[x?(0,c.jsx)("img",{className:"theater-bg theater-bg-in",src:x,alt:""},x):(0,c.jsx)("div",{className:`theater-bg theater-bg-fallback ${kr?"theater-bg-pending":""} ${a.transition==="cut"?"cut":""}`}),(0,c.jsx)("div",{className:"theater-sprites",children:Object.entries(a.sprites).map(([i,f])=>{let Q=r.spriteDirOf(i),te=r.spritePresentation(Q,f.variant),me=Te===i,wr=(f.orderSeq||1)+(me?1e3:0);return(0,c.jsx)(hs,{url:r.sprite(Q,f.variant),pos:f.resolvedPos,name:Xa(s,i),framing:te.framing,stature:te.stature,shot:f.shot,anchor:f.anchor??te.anchor,leaving:f.leaving===!0,action:f.action,actionSeq:f.actionSeq,zIndex:wr,dim:Te!==null&&!me},i)})}),ce&&(0,c.jsxs)("div",{className:"theater-cg",children:[(0,c.jsx)("img",{className:"theater-cg-in",src:ce,alt:a.cg?.id??""}),a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})]}),yr&&(0,c.jsx)("div",{className:"theater-cg theater-cg-pending","aria-label":"\u63D2\u56FE\u751F\u6210\u4E2D",children:a.cg?.caption&&(0,c.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})})]}),!Z&&v,H&&(0,c.jsxs)("div",{className:"theater-director",ref:Ja,children:[(0,c.jsxs)("button",{type:"button",className:`dir-btn ${b==="prompt"?"on":""}`,title:"\u8F93\u5165\u89D2\u8272\u7684\u884C\u52A8\u3001\u53F0\u8BCD\uFF0C\u6216\u7ED9\u8FD9\u573A\u620F\u7684\u6307\u793A","aria-label":"\u63D0\u793A",onClick:i=>{i.stopPropagation(),K(b==="prompt"?null:"prompt"),ae("")},children:[(0,c.jsx)(z,{name:"chat",size:17}),"\u63D0\u793A"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${b==="edit"?"on":""}`,title:vt??"\u7F16\u8F91\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD","aria-label":"\u6539\u5199\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD",disabled:vt!==null,onClick:i=>{i.stopPropagation(),K(b==="edit"?null:"edit"),ae(u.lineText)},children:[(0,c.jsx)(z,{name:"pencil",size:17}),"\u6539\u5199"]}),(0,c.jsxs)("button",{type:"button",className:`dir-btn ${b==="restart"?"on":""}`,title:At??"\u91CD\u5199\uFF1A\u9000\u5230\u8FD9\u4E00\u8F6E\u4E4B\u524D\uFF0C\u8BA9\u5267\u4F5C\u5BB6\u91CD\u65B0\u5199\u4E00\u904D\uFF08\u539F\u6709\u5185\u5BB9\u7559\u4F5C\u65E7\u679D\uFF09","aria-label":"\u91CD\u5199\u8FD9\u4E00\u8F6E",disabled:At!==null,onClick:i=>{i.stopPropagation(),K(b==="restart"?null:"restart"),ae("")},children:[(0,c.jsx)(z,{name:"rewrite",size:17}),"\u91CD\u5199"]}),R&&(0,c.jsxs)("button",{type:"button",className:`dir-btn ${b==="cg"?"on":""}`,title:o?"\u8FD8\u6CA1\u6709\u5267\u60C5\u53EF\u4EE5\u5165\u753B":"\u4E3A\u8FD9\u4E00\u5E55\u751F\u6210\u4E00\u5F20\u63D2\u56FE\uFF08\u6307\u4EE4\u53EF\u7559\u7A7A\uFF09","aria-label":"\u751F\u6210\u63D2\u56FE",disabled:o,onClick:i=>{i.stopPropagation(),b==="cg"?K(null):(K("cg"),ae(""),W([]),ie(!0))},children:[(0,c.jsx)(z,{name:"assets",size:17}),"\u751F\u56FE"]}),d&&Oe!=="none"&&(0,c.jsxs)("button",{type:"button",className:`dir-btn ${Oe==="pending"?"voice-pending":""}`,title:Oe==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":w?"\u91CD\u542C\u8FD9\u53E5":"\u8BED\u97F3\u5DF2\u5173\uFF0C\u5148\u6253\u5F00\u8BED\u97F3\u518D\u91CD\u542C","aria-label":Oe==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":"\u91CD\u542C\u8FD9\u53E5",disabled:Oe==="pending"||!w,onClick:i=>{i.stopPropagation(),Oe==="ready"&&_?.seq!==null&&_?.seq!==void 0&&p(_.seq)},children:[(0,c.jsx)(z,{name:"volume",size:17}),"\u91CD\u542C"]})]}),(0,c.jsxs)("div",{className:"theater-dialog",role:"text",ref:Ge,children:[_e.name&&(0,c.jsx)("div",{className:"dialog-name",children:_e.name}),(0,c.jsxs)("p",{className:`dialog-text ${_?.type==="thought"?"thought":_?.type==="narrate"?"narrate":""} ${D?"rewinding":""}`,children:[de,_&&!D&&!$&&(0,c.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]}),(0,c.jsxs)("div",{className:"dialog-foot",children:[(0,c.jsx)("div",{className:"dialog-hint dialog-hint-foot",children:D?(0,c.jsxs)("button",{type:"button",className:"dialog-rewind",onClick:G,title:"\u56DE\u5230\u6700\u65B0",children:[(0,c.jsx)(z,{name:"prev"}),"\u56DE\u770B\u4E2D"]}):b?null:(0,c.jsxs)(c.Fragment,{children:[t&&(0,c.jsx)("span",{className:"dialog-spinner","aria-label":"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199"}),$&&(!Ne||E)&&(0,c.jsx)("span",{className:"dialog-next","aria-hidden":!0,children:"\u25BC"}),E&&(0,c.jsx)("span",{className:"muted",children:"\u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210"})]})}),(0,c.jsxs)("div",{className:"dialog-options",children:[(0,c.jsx)("button",{type:"button",className:`dir-btn ${e.auto?"tgl-on":""}`,title:e.auto?"Auto-play: on (tap to turn off)":"Auto-play: off (tap to turn on)","aria-pressed":e.auto,onClick:i=>{i.stopPropagation(),e.setAuto(!e.auto)},children:e.auto?"Auto":"Manual"}),d&&(0,c.jsx)("button",{type:"button",className:`dir-btn ${w?"tgl-on":""}`,title:w?"Voice: on (tap to turn off)":"Voice: off (tap to turn on)","aria-pressed":w,onClick:i=>{i.stopPropagation(),O()},children:w?"VOICE":"MUTED"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Rewind one line (\u2190)",disabled:!D&&e.history.length===0,onClick:i=>{i.stopPropagation(),S(-1)},children:"BACK"}),(0,c.jsx)("button",{type:"button",className:"dir-btn",title:"Hide the interface \u2014 tap the picture or press H / Space to bring it back",onClick:i=>{i.stopPropagation(),K(null),ae(""),pe(!0)},children:"HIDE"})]})]}),b&&(0,c.jsxs)(Fa,{title:b==="prompt"?"\u63D0\u793A":Ta[b].title,hint:b==="prompt"?ur[ne]:Ta[b].hint,onClose:()=>K(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{type:"button",className:"primary",onClick:Pt,disabled:br,children:Ta[Me].submit(re.trim())}),(0,c.jsx)("button",{type:"button",className:"ghost-btn",onClick:()=>K(null),children:"\u53D6\u6D88"})]}),children:[b==="prompt"&&(0,c.jsxs)("div",{className:"seg guide-seg",children:[(0,c.jsx)("button",{type:"button",className:`seg-btn ${ne==="guide"?"active":""}`.trim(),"aria-pressed":ne==="guide",title:"\u8DDF\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1",onClick:()=>le("guide"),children:"\u5F15\u5BFC"}),(0,c.jsx)("button",{type:"button",className:`seg-btn ${ne===qe?"active":""}`.trim(),"aria-pressed":ne===qe,title:qe==="interrupt"?ur.interrupt:et??"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",disabled:qe==="fork"&&et!==null,onClick:()=>le(qe),children:qe==="interrupt"?"\u6253\u65AD":"\u5206\u5C94"})]}),b==="cg"&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"image-gen-field",children:[(0,c.jsx)("span",{className:"image-gen-label",children:"\u53C2\u8003\u7ACB\u7ED8\uFF08\u6309\u70B9\u9009\u987A\u5E8F\u57AB\u56FE\uFF09\uFF1A"}),(0,c.jsx)(ft,{candidates:r.spriteIds.map(i=>({id:i,name:r.spriteName(i)??s[i]??i,spriteUrl:r.sprite(i,null)})).filter(i=>!!i.spriteUrl),selected:A,onToggle:i=>W(f=>ct(f,i))})]}),(0,c.jsxs)("label",{className:"image-gen-checkbox",children:[(0,c.jsx)("input",{type:"checkbox",checked:se,onChange:i=>ie(i.target.checked)}),(0,c.jsx)("span",{children:"\u57FA\u4E8E\u521A\u624D\u6F14\u5230\u7684\u5267\u60C5\u4E0E\u573A\u666F"})]})]}),(0,c.jsxs)("div",{className:"director-input",children:[b==="prompt"&&(0,c.jsx)("button",{type:"button",className:`ooc-shortcut ${re.startsWith(Za)?"on":""}`,title:"\u4EE5 OOC \u5F00\u5934 = \u8DF3\u51FA\u89D2\u8272\uFF0C\u76F4\u63A5\u4E0B\u6307\u4EE4","aria-label":"\u4EE5 OOC \u524D\u7F00\u7ED9\u5267\u4F5C\u5BB6\u4E0B\u6307\u4EE4",onClick:()=>ae(i=>i.startsWith(Za)?i.slice(Za.length):Za+i),children:"OOC\uFF1A"}),(0,c.jsx)("input",{value:re,placeholder:b==="prompt"?Ta[Me].placeholder:Ta[b].placeholder,onChange:i=>ae(i.target.value),onKeyDown:i=>{i.key==="Enter"&&Pt()}})]})]})]})]})}var q=require("react/jsx-runtime"),Ae=require("react");var ir={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()},gs="\u81EA\u7531\u8F93\u5165";function ht({stop:a,isNoStop:e,showContinue:t,disabled:o,seenChoices:s,onChoice:r,onFree:d,onContinue:l,onPolish:u}){let[m,I]=(0,Ae.useState)(""),[R,L]=(0,Ae.useState)(!1),[P,M]=(0,Ae.useState)(null),[p,F]=(0,Ae.useState)(!1),[w,O]=(0,Ae.useState)(null);(0,Ae.useEffect)(()=>{L(!1),I(""),M(null),O(null)},[a,e]);let U=a?.stopType==="choice"?a.options??[]:[],j=U.length>0||a?.stopType==="free",E=()=>{let v=m.trim();v&&(d(v),I(""),M(null),O(null),L(!1))},Y=()=>{if(!u)return;let v=(P??m).trim();!v||p||(F(!0),O(null),u(v).then(H=>{M(v),I(H)}).catch(H=>O(H.message)).finally(()=>F(!1)))},C=()=>{P!==null&&(I(P),M(null),O(null))};return(0,q.jsxs)(q.Fragment,{children:[j&&!R&&(0,q.jsxs)("div",{className:"choice-overlay",role:"group","aria-label":"\u9009\u9879",...ir,children:[U.map((v,H)=>(0,q.jsxs)("button",{type:"button",className:"choice",disabled:o,onClick:()=>r(H),children:[(0,q.jsx)("span",{className:"choice-text",children:v.text}),s?.has(v.text)&&(0,q.jsxs)("span",{className:"choice-seen",children:[(0,q.jsx)(z,{name:"check"})," \u5DF2\u9009\u8FC7"]})]},`${H}-${v.text}`)),(0,q.jsx)("button",{type:"button",className:"choice ghost",disabled:o,onClick:()=>L(!0),title:"\u4E0D\u8BF4\u9009\u9879\uFF0C\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5",children:(0,q.jsx)("span",{className:"choice-text",children:gs})})]}),R&&(0,q.jsx)(Fa,{title:"\u81EA\u7531\u8F93\u5165",hint:"\u4EE5\u4E3B\u89D2\u53E3\u543B\u5199\u4E00\u53E5\u3002",width:560,onClose:()=>L(!1),footer:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)("button",{type:"button",className:"ghost-btn free-back",onClick:()=>L(!1),disabled:o,title:"\u4E0D\u81EA\u5DF1\u5199\u4E86\uFF0C\u56DE\u53BB\u9009",children:[(0,q.jsx)(z,{name:"prev",size:14}),"\u8FD4\u56DE\u9009\u9879"]}),w&&(0,q.jsxs)("span",{className:"muted small",children:["\u6DA6\u8272\u5931\u8D25\uFF1A",w]}),(0,q.jsx)("button",{type:"button",className:"primary",onClick:E,disabled:o||m.trim()==="",children:"\u8BF4"})]}),children:(0,q.jsxs)("div",{className:"free-box",children:[(0,q.jsx)("input",{value:m,placeholder:a?.stopType==="free"?a.placeholder??"\u4F60\u7684\u56DE\u5E94\u2026":"\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5\u2026",onChange:v=>I(v.target.value),onKeyDown:v=>v.key==="Enter"&&E(),disabled:o}),u&&(0,q.jsxs)("button",{type:"button",className:"ghost-btn",title:"LLM \u6309\u4E3B\u89D2\u53E3\u543B\u6DA6\u8272\uFF08\u53EF\u64A4\u9500\uFF09",onClick:Y,disabled:o||p||m.trim()==="",children:[(0,q.jsx)(z,{name:"sparkles"}),p?"\u6DA6\u8272\u4E2D\u2026":"\u6DA6\u8272"]}),P!==null&&(0,q.jsxs)("button",{type:"button",className:"link-btn",onClick:C,disabled:p,title:"\u9000\u56DE\u6DA6\u8272\u524D\u7684\u539F\u8BDD",children:[(0,q.jsx)(z,{name:"undo"}),"\u64A4\u9500"]})]})}),e&&t&&!a&&(0,q.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u7EE7\u7EED",...ir,children:(0,q.jsx)("div",{className:"choices",children:(0,q.jsxs)("button",{type:"button",className:"choice",onClick:l,disabled:o,children:[(0,q.jsx)(z,{name:"forward"}),"\uFF08\u7EE7\u7EED\uFF09"]})})})]})}var fr=require("react/jsx-runtime");var Fe=require("react/jsx-runtime"),Le=require("react");var xs=3600;function gt(){let[a,e]=(0,Le.useState)([]),t=(0,Le.useRef)(1),o=(0,Le.useRef)(new Map),s=(0,Le.useCallback)(l=>{let u=o.current.get(l);u&&clearTimeout(u),o.current.delete(l),e(m=>m.filter(I=>I.id!==l))},[]),r=(0,Le.useCallback)((l,u="info")=>{if(!l)return;let m=t.current;t.current+=1,e(I=>[...I.slice(-2),{id:m,text:l,kind:u}]),o.current.set(m,setTimeout(()=>s(m),xs))},[s]),d=o;return(0,Le.useEffect)(()=>{let l=d.current;return()=>{for(let u of l.values())clearTimeout(u);l.clear()}},[d]),{toasts:a,push:r,dismiss:s}}function xt({toasts:a,onDismiss:e}){return a.length===0?null:(0,Fe.jsx)("div",{className:"toast-stack stage-root",role:"status","aria-live":"polite",children:a.map(t=>(0,Fe.jsxs)("button",{type:"button",className:`toast toast-${t.kind}`,onClick:()=>e(t.id),title:"\u70B9\u6389",children:[t.kind==="info"?(0,Fe.jsx)(z,{name:"check"}):(0,Fe.jsx)(z,{name:"alert"}),(0,Fe.jsx)("span",{children:t.text})]},t.id))})}var Lt=null;function Ls(){return Lt||(Lt=new AudioContext),Lt}var Ba=class{ctx=null;master=null;lines=new Map;currentSeq=null;urls=new Map;replaySources=new Map;replayToken=0;maxSeqSeen=0;floorSeq=0;pausedSent=!1;enabled=!0;onNotify=null;onControl=null;get unlocked(){return this.ctx!==null}get pending(){let e=0;for(let t of this.lines.values())t.faded||(e+=t.phrases.size-t.nextToPlay);return e}pendingPhrases=new Map;unlock(){if(!this.ctx){this.ctx=Ls(),this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.ctx.resume().then(()=>this.notify());for(let e of this.lines.values())for(let t of e.phrases.values())t.buffer===null&&this.decode(e,t)}}setEnabled(e){this.enabled=e,e||(this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure()),this.notify()}voiceState(e){return!this.enabled||e===null||e===void 0?"none":this.urls.has(e)?"ready":this.pendingPhrases.has(e)?(this.pruneStalePending(),this.pendingPhrases.has(e)?"pending":"none"):"none"}markPending(e,t){if(!this.enabled)return;this.pruneStalePending();let o=this.pendingPhrases.get(e);o||(o=new Map,this.pendingPhrases.set(e,o)),o.set(t,Date.now()),this.notify()}clearPending(e,t){let o=this.pendingPhrases.get(e);o&&(o.delete(t),o.size===0&&this.pendingPhrases.delete(e))}pruneStalePending(){let e=Date.now()-45e3;for(let[t,o]of this.pendingPhrases){for(let[s,r]of o)r<e&&o.delete(s);o.size===0&&this.pendingPhrases.delete(t)}}async replay(e){if(!this.enabled||(this.unlock(),!this.ctx||!this.master))return!1;let t=[...this.urls.get(e)?.entries()??[]].sort((l,u)=>l[0]-u[0]).map(([,l])=>l);if(t.length===0)return!1;this.stopReplay();let o=this.replayToken,s=this.ctx,r=[];for(let l of t){let u=null;try{let m=await fetch(l);m.ok&&(u=await s.decodeAudioData(await m.arrayBuffer()))}catch{}if(o!==this.replayToken||!this.enabled)return!1;u&&r.push(u)}if(r.length===0)return!1;let d=s.currentTime+.05;for(let l of r)this.playPhrase(null,l,d),d+=l.duration+.25;return this.notify(),!0}stopReplay(){let e=this.ctx;if(!e){this.replaySources.clear();return}let t=e.currentTime;for(let[o,s]of this.replaySources)try{s.gain.cancelScheduledValues(t),s.gain.setValueAtTime(Math.max(s.gain.value,1e-4),t),s.gain.linearRampToValueAtTime(1e-4,t+100/1e3),o.stop(t+100/1e3+.02)}catch{}this.replaySources.clear()}handleAudio(e){if(this.clearPending(e.seq,e.phrase),!this.enabled||(this.rememberUrl(e.seq,e.phrase,e.url),e.seq<=this.floorSeq)||this.currentSeq!==null&&e.seq<this.currentSeq)return;this.maxSeqSeen=Math.max(this.maxSeqSeen,e.seq);let t=this.lines.get(e.seq);if(t||(t={phrases:new Map,nextToPlay:0,chainEnd:null,faded:!1,sources:new Map},this.lines.set(e.seq,t)),t.faded||t.phrases.has(e.phrase))return;let o={url:e.url,buffer:null};t.phrases.set(e.phrase,o),this.ctx&&this.decode(t,o),this.checkBackpressure(),this.notify()}lineStarted(e,t){if(this.finishCurrent(),this.pruneBefore(e),!this.enabled||e===void 0||!t){this.currentSeq=null;return}this.currentSeq=e;let o=this.lines.get(e);o&&!o.faded&&this.trySchedule(o)}fastForward(){this.finishCurrent()}beatStarted(){this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null,this.floorSeq=this.maxSeqSeen,this.notify()}reset(){this.beatStarted(),this.urls.clear()}holdsLine(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;return!e||!this.ctx||e.chainEnd===null?!1:this.ctx.currentTime<e.chainEnd}dispose(){this.fadeAll(),this.stopReplay(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null}rememberUrl(e,t,o){let s=this.urls.get(e);s||(s=new Map,this.urls.set(e,s)),s.set(t,o);for(let r of this.urls.keys()){if(this.urls.size<=500)break;r!==e&&this.urls.delete(r)}}finishCurrent(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;e&&this.fadeLine(e),this.currentSeq=null}fadeAll(){for(let e of this.lines.values())this.fadeLine(e);this.stopReplay()}fadeLine(e){if(e.faded)return;e.faded=!0;let t=this.ctx;if(!t){e.sources.clear();return}let o=t.currentTime;for(let[s,r]of e.sources)try{r.gain.cancelScheduledValues(o),r.gain.setValueAtTime(Math.max(r.gain.value,1e-4),o),r.gain.linearRampToValueAtTime(1e-4,o+100/1e3),s.stop(o+100/1e3+.02)}catch{}e.sources.clear()}async decode(e,t){let o=this.ctx;if(o){try{let s=await fetch(t.url);if(!s.ok)throw new Error(`HTTP ${s.status}`);t.buffer=await o.decodeAudioData(await s.arrayBuffer())}catch{t.buffer=o.createBuffer(1,1,o.sampleRate)}!e.faded&&this.lines.get(this.currentSeq??-1)===e&&this.trySchedule(e)}}trySchedule(e){let t=this.ctx;if(!(!t||e.faded))for(;;){let o=e.phrases.get(e.nextToPlay);if(!o?.buffer)return;let s=e.chainEnd===null,r=Math.max(t.currentTime+.03,(e.chainEnd??0)+(s?0:.25));this.playPhrase(e,o.buffer,r),e.chainEnd=r+o.buffer.duration,e.nextToPlay+=1;let d=Math.max(0,(e.chainEnd-t.currentTime+.05)*1e3);setTimeout(()=>{this.checkBackpressure(),this.notify()},d)}}playPhrase(e,t,o){let s=this.ctx,r=this.master;if(!s||!r)return;let d=s.createBufferSource();d.buffer=t;let l=s.createGain(),u=.015,m=Math.min(.04,t.duration/4);l.gain.setValueAtTime(1e-4,o),l.gain.linearRampToValueAtTime(1,o+u),l.gain.setValueAtTime(1,Math.max(o+u,o+t.duration-m)),l.gain.linearRampToValueAtTime(1e-4,o+t.duration),d.connect(l).connect(r),d.start(o);let I=e?e.sources:this.replaySources;I.set(d,l),d.onended=()=>{I.delete(d),l.disconnect(),d.disconnect()}}pruneBefore(e){if(e!==void 0)for(let t of this.lines.keys())t<e&&this.lines.delete(t)}clearBackpressure(){this.pausedSent&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}checkBackpressure(){!this.pausedSent&&this.pending>10?(this.pausedSent=!0,this.onControl?.({paused:!0})):this.pausedSent&&this.pending<=3&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}notify(){this.onNotify?.()}};function Ra(a){let e=new Map;for(let t of a??[]){let o=t.lastIndexOf(".");e.set(o===-1?t:t.slice(0,o),t)}return e}function It(a,e,t={},o={},s=[],r={}){let d=Ra(e.backgrounds),l=Ra(e.cg),u=Ra(e.bgm),m=Ra(e.sfx),I=r.assetUrl??(p=>`/plays/${a}/assets/${p}`),R=(p,F)=>I(`${p}/${F}`),L=(p,F)=>w=>{let O=w?p.get(w):void 0;if(O)return R(F,O);let U=w?t[w]:void 0;return U?.ready?U.url:null},P=new Map,M=new Map;for(let p of s){if(!p.id)continue;let F=zt(p.id,p);F!==p.id&&P.set(p.id,F),M.has(F)||M.set(F,p.name??p.id)}return{bg:L(d,"backgrounds"),cg:L(l,"cg"),bgm:L(u,"bgm"),sfx:L(m,"sfx"),ambient:p=>L(m,"sfx")(p)??L(u,"bgm")(p),spriteDirOf:p=>P.get(p)??p,spriteName:p=>M.get(p)??null,spriteIds:Object.keys(e).filter(p=>p.startsWith("sprites/")&&(e[p]?.length??0)>0).map(p=>p.slice(8)).sort(),sprite:(p,F)=>{let w=e[`sprites/${p}`]??[],O=(F?Ra(w).get(F):void 0)??w[0];return O?R(`sprites/${p}`,O):null},spritePresentation:(p,F)=>{let w=_t(o,p,F??void 0);return{framing:w.framing??Ga,stature:w.stature??Ve,anchor:w.anchor??"bottom"}}}}var Is=new Set(["say","narrate","thought"]),cr=new Set(["say","narrate","thought","input"]);function Ct(a,e){return a?Ss(Cs(a,e),e):e.filter(t=>cr.has(t.type)&&t.text!=="").map(pr)}function pr(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="sfx"||a.type==="cg"||a.type==="scene"?"narrate":a.type,actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null}}function Cs(a,e){let t=new Map(a.nodes.map(l=>[l.id,l])),o=new Map;for(let l of e)l.seq!==void 0&&o.set(l.seq,l);let s=e.filter(l=>l.type==="input"),r=[],d=a.pathIds;for(let l=0;l<d.length;l+=1){let u=t.get(d[l]);if(!u)continue;if(Is.has(u.kind)){let R=u.seq===void 0?void 0:o.get(u.seq);r.push({key:R?.key??u.id,kind:"line",type:u.kind,actorId:u.attrs.id??R?.actorId??null,...R?.nameOverride?{nameOverride:R.nameOverride}:{},text:R?.text||u.text,seq:u.seq??null,nodeId:u.id});continue}if(u.kind!=="prompt")continue;let m=u.text;if(!m)continue;let I=u.seq===void 0?void 0:o.get(u.seq);if(I){let R=s.indexOf(I);R>=0&&s.splice(R,1)}else{let R=s.findIndex(L=>L.text===m);R>=0&&(I=s.splice(R,1)[0])}r.push({key:I?.key??u.id,kind:"input",type:"say",actorId:"player",text:I?.text||m,seq:u.seq??I?.seq??null,nodeId:u.id})}return r}function Ss(a,e){let t=new Set(a.map(o=>o.key));for(let o of e)!cr.has(o.type)||o.text===""||t.has(o.key)||(a.push(pr(o)),t.add(o.key));return a}var mr=require("react");var ks=require("react");var St="stage-voice";function kt(a,e,t){let o=a.getItem(e);return o===null?t:o==="1"}function yt(a,e,t){a.setItem(e,t?"1":"0")}var hr=`/* @aivn/stage \u7684\u821E\u53F0\u6837\u5F0F\uFF1A\u4ECE apps/web/src/app.css \u539F\u6837\u642C\u6765\u7684\u5C0F\u8282\u3002
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

/* \u7ACB\u7ED8\u5C42\uFF1Aposition + z-index:0 \u81EA\u6210\u4E00\u4E2A\u5C42\u53E0\u4E0A\u4E0B\u6587\uFF0C\u628A\u7ACB\u7ED8\u4E4B\u95F4\u7684 orderSeq \u6392\u5E8F\u5173\u5728
   \u81EA\u5DF1\u8FD9\u4E00\u5C42\u91CC\u2014\u2014\u8BF4\u8BDD\u8005\u90A3\u4E2A +1000 \u53EA\u662F\u300C\u540C\u53F0\u6700\u4E0A\u300D\uFF0C\u4E0D\u8BE5\u8E7F\u5230\u53F0\u8BCD\u6761\uFF0812\uFF09\u3001\u9009\u80A2\u5C42\uFF0815\uFF09
   \u6216\u5DE5\u5177\u6761\uFF0820\uFF09\u4E0A\u9762\u53BB\u3002\u6574\u5C42\u843D\u5728\u9009\u80A2\u906E\u7F69\uFF08.theater-stage::after\uFF0C8\uFF09\u4E4B\u4E0B\uFF0C\u906E\u7F69\u4EAE\u8D77\u65F6
   \u7ACB\u7ED8\u8DDF\u7740\u4E00\u8D77\u6697\u3002 */
.theater-sprites {
  position: absolute;
  inset: 0;
  z-index: 0;
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

/* \u5BFC\u6F14\u5DE5\u5177\u680F\uFF1A\u821E\u53F0\u53F3\u4E0A\u89D2\u7684\u4E00\u6392\u5BFC\u6F14\u52A8\u4F5C\uFF08\u63D0\u793A / \u6539\u5199 / \u91CD\u5199 / \u751F\u56FE / \u91CD\u542C\uFF09\u3002
   \u5E95\u3001\u63CF\u8FB9\u3001\u5B57\u8272\u5168\u8DDF\u53F0\u8BCD\u6761\u540C\u4E00\u5957\u6DF1\u8272\u73BB\u7483\uFF1A\u8FD9\u51E0\u5757\u90FD\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684\u300C\u7A97\u300D\uFF0C
   \u7528\u6D45\u8272\u5361\u7247\u4F1A\u8DDF\u753B\u9762\u91CC\u7684\u4EAE\u5904\u6253\u67B6\uFF0C\u4E5F\u8DDF\u4E0B\u9762\u7684\u53F0\u8BCD\u6761\u4E0D\u50CF\u4E00\u5BB6\u4EBA\u3002 */
.theater-director {
  position: absolute;
  z-index: 45;
  top: calc(8px + env(safe-area-inset-top, 0px));
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0;
  /* \u5DE6\u4E0A\u89D2\u662F\u4FA7\u680F\u5524\u51FA\u952E\uFF0838px + \u5DE6\u53F3\u5404 8px\uFF09\uFF0C\u8FD9\u4E00\u6392\u4E0D\u80FD\u6A2A\u8FC7\u53BB\u76D6\u4F4F\u5B83\u3002
     \u5B81\u53EF\u81EA\u5DF1\u6362\u884C\u2014\u2014\u6362\u884C\u662F\u5F80\u4E0B\u957F\uFF0C\u4E0D\u4F1A\u538B\u522B\u4EBA\u7684\u952E\u3002 */
  max-width: calc(100% - 60px);
  padding: 0 3px;
  border: 1px solid var(--dialog-line);
  border-radius: var(--stage-radius);
  background: var(--dialog-bg);
  box-shadow: var(--dialog-shadow);
}

.theater-director .dir-btn {
  color: var(--dialog-ink);
}

.theater-director .dir-btn:hover:not(:disabled) {
  background: var(--dialog-hover);
}

.theater-director .dir-btn.on {
  background: var(--accent);
  color: var(--accent-ink);
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
/* \u2500\u2500 \u4ECE app.css \u8865\u642C\u7684\u89C4\u5219\uFF08scripts/port-stage-css.py \u751F\u6210\uFF0C\u522B\u624B\u6539\u8FD9\u4E00\u8282\uFF09\u2500\u2500\u2500
   \u767D\u540D\u5355\u5728\u811A\u672C\u7684 \`CLASSES\` / \`MOBILE\`\uFF1A\u53EA\u642C\u63D2\u4EF6\u771F\u6B63\u4F1A\u6E32\u67D3\u7684\u7EC4\u4EF6\u7528\u5230\u7684\u9009\u62E9\u5668\u3002
   \u539F\u6587\u7167\u6284\uFF0C\u53EA\u5728\u5143\u7D20\u7EA7\u9009\u62E9\u5668\u4E0A\u52A0 \`:where(.stage-root)\` \u5708\u4F5C\u7528\u57DF\u2014\u2014\`:where()\`
   \u7279\u5F02\u6027\u4E3A\u96F6\uFF0C\u4E0D\u6539\u5B83\u4E0E \`.choice\` \u8FD9\u7C7B\u7C7B\u89C4\u5219\u4E4B\u95F4\u7684\u80DC\u8D1F\u5173\u7CFB\u3002 */

.theater-bg-pending, .theater-cg-pending {
  background:
    linear-gradient(100deg, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0.07) 50%, rgba(255, 255, 255, 0) 72%),
    linear-gradient(160deg, #1d2330, #2a3243 60%, #232a37);
  background-size: 220% 100%, 100% 100%;
  animation: asset-shimmer 1.6s linear infinite;
}

.backlog-empty {
  margin: 0;
  padding: 18px 14px;
  color: var(--ink-faint);
  font-size: 14px;
}

.backlog-list, .backlog-empty, .backlog-panel > .muted {
  max-width: 860px;
  margin-inline: auto;
  width: 100%;
}

.backlog-list {
  padding: 6px;
  list-style: none;
}

.backlog-list b {
  display: block;
  margin-bottom: 2px;
  color: var(--accent);
  font-size: 12.5px;
}

.director-input {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ooc-shortcut {
  flex: 0 0 auto;
  padding: 2px 7px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: none;
  color: var(--ink-muted);
  font-size: 12px;
  cursor: pointer;
}

.ooc-shortcut:hover, .ooc-shortcut.on {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}

.stage-modes {
  position: absolute;
  z-index: 40;
  top: calc(60px + env(safe-area-inset-top, 0px));
  left: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: min(70vw, 300px);
}

.stage-mode {
  display: flex;
  align-items: center;
  color: var(--dialog-ink-faint);
  text-shadow: var(--dialog-text-shadow);
  line-height: 1;
}

.stage-mode-nsfw {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.backlog-panel {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 12px max(16px, env(safe-area-inset-left)) calc(24px + env(safe-area-inset-bottom));
  scrollbar-width: thin;
}

.seg {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg);
}

.seg .seg-btn {
  border: none;
  background: transparent;
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 13.5px;
  color: var(--ink-soft);
  cursor: pointer;
}

.seg .seg-btn.active {
  background: var(--panel);
  color: var(--accent);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}

.bl-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 4px 6px 8px;
}

.bl-tool {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 30px;
  padding: 5px 11px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--ink-soft);
  font: inherit;
  font-size: 13px;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color var(--hover-ms) ease,
    color var(--hover-ms) ease,
    border-color var(--hover-ms) ease;
}

.bl-tool:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}

.bl-tool:disabled {
  color: var(--ink-faint);
  background: var(--bg);
  cursor: default;
}

.bl-edit {
  display: flex;
  gap: 6px;
  padding: 4px 6px 0;
}

.bl-edit input {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 14px;
}

/* \u2500\u2500 \u4ECE app.css \u8865\u642C\u7684\u89C4\u5219\uFF08scripts/port-stage-css.py \u751F\u6210\uFF0C\u522B\u624B\u6539\u8FD9\u4E00\u8282\uFF09\u2500\u2500\u2500
   \u767D\u540D\u5355\u5728\u811A\u672C\u7684 \`CLASSES\` / \`MOBILE\`\uFF1A\u53EA\u642C\u63D2\u4EF6\u771F\u6B63\u4F1A\u6E32\u67D3\u7684\u7EC4\u4EF6\u7528\u5230\u7684\u9009\u62E9\u5668\u3002
   \u539F\u6587\u7167\u6284\uFF0C\u53EA\u5728\u5143\u7D20\u7EA7\u9009\u62E9\u5668\u4E0A\u52A0 \`:where(.stage-root)\` \u5708\u4F5C\u7528\u57DF\u2014\u2014\`:where()\`
   \u7279\u5F02\u6027\u4E3A\u96F6\uFF0C\u4E0D\u6539\u5B83\u4E0E \`.choice\` \u8FD9\u7C7B\u7C7B\u89C4\u5219\u4E4B\u95F4\u7684\u80DC\u8D1F\u5173\u7CFB\u3002 */

.bl-text {
  padding: 6px 8px;
  border-radius: calc(var(--radius) - 2px);
  color: var(--ink);
  font-size: 14.5px;
  line-height: 1.7;
}

.bl-text.current {
  background: var(--accent-soft);
  outline: 1px solid var(--accent);
}

.bl-player .bl-text b, .bl-input .bl-text {
  color: var(--ink-faint);
  font-style: italic;
  padding-left: 12px;
  border-left: 2px solid var(--line);
}
`;var gr=require("react");var Ie=require("react/jsx-runtime"),xr=({items:a})=>{let[e,t]=(0,gr.useState)(!1);return a.length===0?null:(0,Ie.jsxs)("div",{className:"aivn-pending",children:[(0,Ie.jsxs)("button",{type:"button",className:`dir-btn${e?" on":""}`,title:"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B","aria-label":"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B",onClick:()=>t(o=>!o),children:[(0,Ie.jsx)(z,{name:"sparkles",size:17}),"\u8FDB\u884C\u4E2D ",a.length]}),e&&(0,Ie.jsx)("ul",{className:"aivn-pending-list",children:a.map(o=>(0,Ie.jsxs)("li",{className:"aivn-pending-row",children:[(0,Ie.jsx)("span",{className:"aivn-pending-kind",children:o.kind==="guide"?"\u63D0\u793A":"\u8BED\u97F3"}),(0,Ie.jsx)("span",{className:"aivn-pending-text",children:o.text}),(0,Ie.jsx)("span",{className:"aivn-pending-note",children:o.note})]},o.key))})]})};var X=require("react/jsx-runtime"),bs="\uFF08\u7EE7\u7EED\uFF09";Ua("@aivn/stage/stage.css",hr);var Lr=St,ws=8e3;function Ps(a){let e=Object.entries(a).map(([t,o])=>`${t}: ${o};`).join(" ");return e===""?"":`.aivn-stage-view.stage-root.stage-root, .aivn-stage-view .stage-root.stage-root { ${e} }`}var Sr=({sessionId:a})=>{let[e]=(0,k.useState)(()=>new We),[t,o]=(0,k.useState)(0),[s,r]=(0,k.useState)(!1),[d,l]=(0,k.useState)(null),[u,m]=(0,k.useState)(!1),[I,R]=(0,k.useState)(!1),[L,P]=(0,k.useState)(null),[M,p]=(0,k.useState)(null),[F,w]=(0,k.useState)({}),[O,U]=(0,k.useState)(null),[j,E]=(0,k.useState)(0),[Y,C]=(0,k.useState)([]),[v,H]=(0,k.useState)(!1),ee=(0,k.useRef)(!1),b=gt(),[K,re]=(0,k.useState)(()=>typeof window>"u"?!0:kt(window.localStorage,Lr,!0)),ae=(0,k.useRef)(null);ae.current===null&&(ae.current=new Ba);let A=ae.current,W=(0,k.useRef)(!1),se=(0,k.useRef)(0),ie=(0,k.useRef)(!1),ne=(0,k.useRef)(!1),le=(0,k.useCallback)(()=>{ne.current||(ne.current=!0,requestAnimationFrame(()=>{ne.current=!1,o(h=>h+1)}))},[]);(0,k.useEffect)(()=>(A.onNotify=()=>le(),A.onControl=h=>{a&&Qa("/aivn/voice",{session:a,...h}).catch(()=>{})},()=>{A.dispose(),A.onNotify=null,A.onControl=null}),[A,a,le]),(0,k.useEffect)(()=>{A.setEnabled(K)},[A,K]),(0,k.useEffect)(()=>{if(!a)return;let h=!1;return P(null),p(null),w({}),U(null),(async()=>{try{let T=await Cr(`/aivn/play?session=${encodeURIComponent(a)}`);if(h||(P(T),w(T.theme??{}),!T.dir))return;let x=await Cr(`/aivn/assets?session=${encodeURIComponent(a)}`);h||p(x)}catch(T){h||U(bt(T))}})(),()=>{h=!0}},[a]),(0,k.useEffect)(()=>{if(!a)return;e.reset(),A.reset(),se.current=0,W.current=!1,ie.current=!1,l(null),m(!1),r(!1),C([]),ee.current=!1,H(!1),E(T=>T+1),le();let h=new EventSource(`/aivn/stream?session=${encodeURIComponent(a)}`);return h.addEventListener("frame",T=>{let x;try{x=JSON.parse(T.data)}catch{return}if(x.seq>se.current+1&&(e.reset(),A.reset(),E(ce=>ce+1),W.current=!1,l(null),m(!1),se.current=x.seq-1),!(x.seq<=se.current)){if(se.current=x.seq,x.kind==="reset"){e.reset(),A.reset(),W.current=!1,l(null),m(!1),ee.current=!0,H(!0),E(ce=>ce+1),le();return}if(x.kind==="guide"){C(x.items);return}if(ee.current&&(ee.current=!1,H(!1)),x.kind==="voice"){x.state==="ready"&&x.url?A.handleAudio({seq:x.lineSeq,phrase:x.phrase,url:x.url}):x.state==="started"&&A.markPending(x.lineSeq,x.phrase),le();return}if(x.kind==="beat"){x.state==="start"?(A.beatStarted(),W.current=!1,l(null),m(!1),r(!0),ie.current=!1):(m(!W.current),r(!1));return}if(x.kind==="style"){w(x.theme);return}x.event.kind==="stop"&&(W.current=!0,l({stopType:x.event.stopType,...x.event.options?{options:x.event.options}:{},...x.event.placeholder?{placeholder:x.event.placeholder}:{}})),e.apply(x.event,x.seq),le()}}),()=>h.close()},[a,e,le]);let Z=(0,k.useCallback)(async(h,T)=>{let x=h.trim();if(!x||!a)return!1;try{return await Qa("/aivn/input",{session:a,text:x,...T?.silent?{silent:!0}:{}}),!0}catch(ce){return b.push(`\u6CA1\u80FD\u9001\u5230\u5267\u4F5C\u5BB6\uFF1A${bt(ce)}`,"error"),!1}},[a,b]),pe=(0,k.useCallback)(async(h,T,x)=>{if(a)try{await Qa("/aivn/direct",{session:a,action:h,text:T,...x?{from:x}:{}})}catch(ce){b.push(`\u5BFC\u6F14\u6307\u4EE4\u6CA1\u80FD\u9001\u5230\uFF1A${bt(ce)}`,"error")}},[a,b]),_=(0,k.useCallback)(()=>{ie.current||(ie.current=!0,Z(bs,{silent:!0}).then(h=>{h||(ie.current=!1)}))},[Z]),fe=e.lines,ue=L?.dir?L.config??null:null,De=L?.voice===!0&&ue!==null;(0,k.useEffect)(()=>{!a||!De||Qa("/aivn/voice",{session:a,enabled:K}).catch(()=>{})},[a,De,K]);let Ne=(0,k.useCallback)(()=>{re(h=>{let T=!h;return typeof window<"u"&&yt(window.localStorage,Lr,T),T})},[]),g=(0,k.useCallback)(()=>{A.unlock(),le()},[A,le]),S=(0,k.useMemo)(()=>Object.fromEntries((ue?.characters??[]).map(h=>[h.id,h.name??h.id])),[ue]),D=(0,k.useMemo)(()=>{if(!ue||!M||!a)return null;let h=(ue.characters??[]).map(T=>({...T,body:""}));return It(ue.id,M.index,{},M.manifest,h,{assetUrl:T=>`/aivn/asset?session=${encodeURIComponent(a)}&path=${encodeURIComponent(`assets/${T}`)}`})},[ue,M,a]),G=(0,k.useMemo)(()=>Ct(null,fe),[fe,t]),N=(0,k.useRef)(null),$=(0,k.useRef)({seq:null,at:0}),_e=()=>{if(A.holdsLine())return!0;let h=N.current;return h===null||A.voiceState(h)!=="pending"?!1:($.current.seq!==h&&($.current={seq:h,at:Date.now()}),Date.now()-$.current.at<ws)},de=ut(e.cues,fe,{live:s,resume:!0,revision:t,transcript:G,turbo:I,resetToken:j,hold:_e(),onLineStart:h=>A.lineStarted(h?.seq,h?.type==="say"),onFastForward:()=>A.fastForward()});N.current=de.current?.seq??null;let Te=s,ze=de.current===null||de.shownLength>=de.current.text.length,Be=!Te&&de.exhausted&&ze,Ge=ot({ready:Be,stopType:d?.stopType??null,isNoStop:u,continueCardOn:!1}),Re={beatId:fe.some(h=>h.type==="say")?"beat:current":null,beatNodeId:null,lineNodeId:de.view?.seq==null?null:`line:${de.view.seq}`,lineSeq:de.view?.seq??null,lineText:de.view?.text??""},Ya=[...Y.filter(h=>h.status==="pending").map(h=>({key:h.id,kind:"guide",text:h.text,note:"\u6392\u961F\u4E2D"})),...fe.filter(h=>h.type==="say"&&A.voiceState(h.seq??null)==="pending").map(h=>({key:`voice:${h.key}`,kind:"voice",text:h.text,note:"\u5408\u6210\u4E2D"}))];if(!a)return(0,X.jsx)(qa,{text:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u821E\u53F0\u3002"});if(O)return(0,X.jsx)(qa,{text:`\u821E\u53F0\u6CA1\u63A5\u4E0A\uFF1A${O}`});if(!L)return(0,X.jsx)(qa,{text:"\u6B63\u5728\u8FDE\u63A5\u821E\u53F0\u2026"});if(!ue)return(0,X.jsx)(qa,{text:`\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709 play.json\uFF0C\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A${L.dir??""}`});if(!D)return(0,X.jsx)(qa,{text:"\u6B63\u5728\u8BFB\u53D6\u5267\u76EE\u7D20\u6750\u2026"});let Oa=Ps(F);return(0,X.jsxs)("div",{className:"stage-root aivn-stage-view",style:{height:"100%",minHeight:0},children:[Oa===""?null:(0,X.jsx)("style",{"data-aivn-theme":!0,children:Oa}),(0,X.jsx)(mt,{visual:de.visual,playback:de,live:s,fresh:fe.length===0,names:S,index:D,voiceAvailable:De,voiceOn:K,onToggleVoice:Ne,busy:Te,targets:Re,directorBar:!0,promptAlt:"interrupt",showGenerate:!1,onView:Ir,onPrompt:(h,T)=>{pe(T==="interrupt"?"interrupt":"guide",h)},onEdit:(h,T)=>{let x=Re.lineText;pe("rewrite",x&&x!==T?`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF1A\u628A\u8FD9\u4E00\u53E5\u300C${x}\u300D\u6539\u6210\u300C${T}\u300D\uFF0C\u5176\u4F59\u7167\u65E7\u3002`:`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF0C\u8FD9\u4E00\u53E5\u6539\u6210\uFF1A${T}`,"line")},onFork:(h,T)=>{pe("rewrite",T?.instruction??"","beat")},onGenerateCg:Ir,onReplay:h=>{A.replay(h)},voiceState:h=>A.voiceState(h),onUnlock:g,onTurbo:R,canContinue:Ge.clickToContinue,onContinue:_,overlay:de.scrubbed||v?null:fe.length===0?(0,X.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u5F00\u6F14",children:(0,X.jsx)("div",{className:"choices",children:(0,X.jsx)("button",{type:"button",className:"choice",onClick:()=>{Z(ue.opening)},children:(0,X.jsx)("span",{className:"choice-text",children:"\u5F00\u6F14"})})})}):Be?(0,X.jsx)(ht,{stop:d,isNoStop:u,showContinue:Ge.showContinueCard,disabled:Te,onChoice:h=>{Z(d?.options?.[h]?.text??"")},onFree:h=>{Z(h)},onContinue:_}):null}),(0,X.jsx)(xr,{items:Ya}),(0,X.jsx)(xt,{toasts:b.toasts,onDismiss:b.dismiss})]})};function Ir(){}function qa({text:a}){return(0,X.jsx)("div",{className:"stage-root aivn-stage-notice",style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,color:"var(--ink, #3b3630)",fontSize:14,textAlign:"center"},children:(0,X.jsx)("span",{children:a})})}async function Cr(a){let e=await fetch(a);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);return e.json()}async function Qa(a,e){let t=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`${t.status} ${await t.text()}`)}function bt(a){return a instanceof Error?a.message:String(a)}var vs="aivn-playwriter",As=["slots","sessions","uiSession","configForms"];function Ds(a){Ua("dsh-aivn/host.css",Ft);let e=a,t=new _a(a.configForms.get(za),a.configForms.describe());a.effect(()=>()=>t.dispose(),"dsh-aivn:config card subscription"),a.effect(()=>a.configForms.whileServed([za],()=>a.slots.inject("plugins.bundle.config",()=>a.slots.register({name:"plugins.bundle.config",key:"dsh-aivn",inject:()=>t.inject()},Rt))),"dsh-aivn:config card"),a.slots.inject("conversation.view",()=>a.effect(()=>{let o,s=()=>{let u=e.uiSession.adapter.current.getSnapshot().key;return u===void 0?!1:e.sessions.list.getSnapshot().byId[u]?.projectionValues?.agentPreset===vs},r=()=>{if(s()!==(o!==void 0)){if(o){o(),o=void 0;return}o=a.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"AIVN"},Sr)}},d=e.uiSession.adapter.current.subscribe(r),l=e.sessions.list.subscribe(r);return r(),()=>{d(),l(),o?.(),o=void 0}},"dsh-aivn:stage view"))}
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