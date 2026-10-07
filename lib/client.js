window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var Nr=Object.create;var Ka=Object.defineProperty;var _r=Object.getOwnPropertyDescriptor;var zr=Object.getOwnPropertyNames;var Gr=Object.getPrototypeOf,Vr=Object.prototype.hasOwnProperty;var Gt=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},Wr=(a,e)=>{for(var t in e)Ka(a,t,{get:e[t],enumerable:!0})},Vt=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of zr(e))!Vr.call(a,r)&&r!==t&&Ka(a,r,{get:()=>e[r],enumerable:!(o=_r(e,r))||o.enumerable});return a};var Xr=(a,e,t)=>(t=a!=null?Nr(Gr(a)):{},Vt(e||!a||!a.__esModule?Ka(t,"default",{value:a,enumerable:!0}):t,a)),Kr=a=>Vt(Ka({},"__esModule",{value:!0}),a);var Lr=Gt(te=>{"use strict";var Ts=require("react");function xr(a){var e="https://react.dev/errors/"+a;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+a+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function De(){}var se={d:{f:De,r:function(){throw Error(xr(522))},D:De,C:De,L:De,m:De,X:De,S:De,M:De},p:0,findDOMNode:null},Ds=Symbol.for("react.portal"),Ms=Symbol.for("react.recoverable"),gr=Symbol.for("react.optimistic_key");function Fs(a,e,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ds,key:o==null?null:o===gr?gr:""+o,children:a,containerInfo:e,implementation:t}}var Ea=Ts.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function dt(a,e){if(a==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}te.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=se;te.browser=function(a){return{$$typeof:Ms,_reason:a}};te.createPortal=function(a,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(xr(299));return Fs(a,e,null,t)};te.flushSync=function(a){var e=Ea.T,t=se.p;try{if(Ea.T=null,se.p=2,a)return a()}finally{Ea.T=e,se.p=t,se.d.f()}};te.preconnect=function(a,e){typeof a=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,se.d.C(a,e))};te.prefetchDNS=function(a){typeof a=="string"&&se.d.D(a)};te.preinit=function(a,e){if(typeof a=="string"&&e&&typeof e.as=="string"){var t=e.as,o=dt(t,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?se.d.S(a,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:s}):t==="script"&&se.d.X(a,{crossOrigin:o,integrity:r,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};te.preinitModule=function(a,e){if(typeof a=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=dt(e.as,e.crossOrigin);se.d.M(a,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&se.d.M(a)};te.preload=function(a,e){if(typeof a=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,o=dt(t,e.crossOrigin);se.d.L(a,t,{crossOrigin:o,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};te.preloadModule=function(a,e){if(typeof a=="string")if(e){var t=dt(e.as,e.crossOrigin);se.d.m(a,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else se.d.m(a)};te.requestFormReset=function(a){se.d.r(a)};te.unstable_batchedUpdates=function(a,e){return a(e)};te.useFormState=function(a,e,t){return Ea.H.useFormState(a,e,t)};te.useFormStatus=function(){return Ea.H.useHostTransitionStatus()};te.version="19.3.0"});var Sr=Gt((Wi,Cr)=>{"use strict";function Ir(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ir)}catch(a){console.error(a)}}Ir(),Cr.exports=Lr()});var Zs={};Wr(Zs,{apply:()=>js,inject:()=>$s});module.exports=Kr(Zs);var Wt=`/**
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
`;function $a(a,e){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${a}"]`)!==null)return;let t=document.createElement("style");t.dataset.plugin="dsh-aivn",t.dataset.pluginCss=a,t.textContent=e,document.head.appendChild(t)}var xe=require("@deepseek-ai/dsh-client-ui-primitives"),G=require("react/jsx-runtime"),Ja="dsh-aivn",Kt=["gemini","openai","modelslab"],Za=[{title:"P0 \xB7 \u51B3\u5B9A\u80FD\u529B\u5F00\u4E0D\u5F00",blurb:"\u4E0D\u914D\u5C31\u6CA1\u6709\u90A3\u9879\u80FD\u529B\uFF1A\u5BF9\u5E94\u7684\u5DE5\u5177\u4E0D\u6CE8\u518C\uFF0C\u642D\u53F0\u52A9\u624B\u7684\u63D0\u793A\u8BCD\u91CC\u4E5F\u4E0D\u63D0\u5B83\u3002Key \u7C7B\u5B57\u6BB5\u53EA\u5199\u4E0D\u56DE\u663E\uFF0C\u7559\u7A7A = \u4FDD\u6301\u73B0\u72B6\u3002",fields:[{field:"ttsKeys",multiple:!0,label:"Fish Audio Key",hint:"\u914D\u4E86\u624D\u6709\u53F0\u8BCD\u8BED\u97F3\u4E0E list_voices\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\uFF08\u8F6E\u8BE2\u5206\u644A\u989D\u5EA6\uFF09\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_TTS_KEYS",kind:"secret"},{field:"searchKeys",multiple:!0,label:"Exa \u68C0\u7D22 Key",hint:"\u914D\u4E86\u642D\u53F0\u52A9\u624B\u624D\u6709 web_search\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_EXA_KEYS",kind:"secret"},{field:"imageFormat",label:"\u751F\u56FE\u63A5\u53E3\u683C\u5F0F",hint:`\u534F\u8BAE\u5F62\u72B6\uFF0C\u4E0D\u662F\u4EA7\u54C1\u540D\uFF1A${Kt.join(" / ")}`,kind:"format"},{field:"imageBaseUrl",label:"\u751F\u56FE\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u751F\u56FE\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u7B97\u914D\u597D\u751F\u56FE\u2014\u2014\u53EA\u7ED9\u5176\u4E00\u7B49\u4E8E\u6CA1\u6709",kind:"text"},{field:"imageModel",label:"\u751F\u56FE\u6A21\u578B",hint:"\u540C\u4E0A\uFF1B\u914D\u9F50\u540E\u642D\u53F0\u52A9\u624B\u591A generate_image / commit_asset / recut_sprite\uFF0C\u5267\u4F5C\u5BB6\u591A\u540C\u6B65\u51FA\u56FE",kind:"text"},{field:"imageApiKey",label:"\u751F\u56FE API Key",hint:"\u672C\u673A\u7F51\u5173\u4E0D\u6821\u9A8C\u5C31\u4E0D\u7528\u586B\uFF08\u4E0D\u5E26\u9274\u6743\u5934\uFF09",kind:"secret"},{field:"musicBaseUrl",label:"\u914D\u4E50\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u914D\u4E50\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u6709 generate_bgm\uFF08\u53EA\u6709 Gemini \u5F62\u72B6\uFF09",kind:"text"},{field:"musicModel",label:"\u914D\u4E50\u6A21\u578B",hint:"\u540C\u4E0A",kind:"text"},{field:"musicApiKey",label:"\u914D\u4E50 API Key",hint:"\u540C\u4E00\u4EFD\u7F51\u5173\u7684 Key\uFF0C\u53EF\u7559\u7A7A",kind:"secret"},{field:"shell",label:"\u642D\u53F0\u52A9\u624B\u547D\u4EE4\u884C\uFF08bash\uFF09",hint:"\u5F00\u4E86\u624D\u7ED9\u642D\u53F0\u52A9\u624B\u88C5 tool-bash\u3002bash \u662F\u9884\u8BBE\u7684\u300C\u4E00\u884C\u300D\uFF0C\u6539\u5B8C\u53EA\u5BF9**\u65B0\u5EFA**\u7684\u642D\u53F0\u52A9\u624B\u4F1A\u8BDD\u751F\u6548",kind:"switch"}]},{title:"P1 \xB7 \u9ED8\u8BA4\u5C31\u80FD\u7528\uFF0C\u6309\u53E3\u5473\u8C03",blurb:"\u8FD9\u4E00\u6BB5\u7684\u9ED8\u8BA4\u503C\u90FD\u662F\u6311\u8FC7\u7684\uFF0C\u6539\u4E4B\u524D\u5148\u60F3\u6E05\u695A\u4E3A\u4EC0\u4E48\u6539\u3002",fields:[{field:"ttsBaseUrl",label:"TTS \u63A5\u53E3\u5730\u5740",hint:"\u6362\u81EA\u5EFA\u7F51\u5173\u65F6\u6539",kind:"text"},{field:"ttsModel",label:"TTS \u6A21\u578B",hint:"\u6362\u6A21\u578B\u540E\u540C\u4E00\u53E5\u8BDD\u4E0D\u518D\u547D\u4E2D\u65E7\u97F3\u9891\u7F13\u5B58\uFF08\u7F13\u5B58\u952E\u542B\u6A21\u578B\uFF09",kind:"text"},{field:"ttsConcurrency",label:"TTS \u5E76\u53D1\u4E0A\u9650",hint:"\u540C\u65F6\u5408\u6210\u7684\u4E0A\u9650\uFF1A\u644A\u5F80\u8FD4\uFF0C\u53C8\u4E0D\u628A\u989D\u5EA6\u4E00\u6B21\u6253\u7A7A",kind:"number"},{field:"searchBaseUrl",label:"Exa \u63A5\u53E3\u5730\u5740",hint:"\u6362\u4EE3\u7406 / \u955C\u50CF\u65F6\u6539",kind:"text"},{field:"imageSize",label:"\u751F\u56FE\u6863\u4F4D",hint:"1K / 2K / 4K\uFF08K \u5927\u5199\uFF09\uFF0C\u6216\u5B57\u9762\u50CF\u7D20 1536x1024\uFF1Bgemini \u5F62\u72B6\u53EA\u8BA4\u6863\u4F4D",kind:"text"},{field:"imageTimeoutMs",label:"\u751F\u56FE\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u51FA\u56FE\u6162\u5C31\u8C03\u5927",kind:"number"},{field:"musicTimeoutMs",label:"\u914D\u4E50\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u4E00\u9996\u66F2\u5B50\u5B9E\u6D4B\u7EA6 84 \u79D2",kind:"number"}]}],jr=Za.flatMap(a=>a.fields.map(e=>e.field)),Xt=new Set(["ttsKeys","searchKeys","imageApiKey","musicApiKey"]),Zr=[{label:"\u8BED\u97F3",hint:"\u53F0\u8BCD\u8BED\u97F3\u4E0E\u97F3\u8272\u5E93",on:(a,e)=>e.has("ttsKeys")},{label:"\u68C0\u7D22",hint:"\u642D\u53F0\u52A9\u624B\u7684 web_search",on:(a,e)=>e.has("searchKeys")},{label:"\u751F\u56FE",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>ja(a.imageBaseUrl)&&ja(a.imageModel)},{label:"\u914D\u4E50",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>ja(a.musicBaseUrl)&&ja(a.musicModel)},{label:"\u547D\u4EE4\u884C",hint:"\u53EA\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548",on:a=>a.shell===!0}];function ja(a){return typeof a=="string"&&a.trim()!==""}var Qr={unavailable:"\u5BBF\u4E3B\u6CA1\u6709\u5728\u670D\u52A1 dsh-aivn \u7684\u914D\u7F6E\u547D\u540D\u7A7A\u95F4\u3002",readOnly:"\u8FD9\u4EFD\u90E8\u7F72\u7684\u914D\u7F6E\u662F\u53EA\u8BFB\u7684\u3002",saveFailed:"\u6CA1\u5B58\u4E0A\uFF1A\u5BBF\u4E3B\u62D2\u7EDD\u4E86\u8FD9\u6B21\u5199\u5165\uFF08\u53EF\u80FD\u662F\u522B\u5904\u5148\u6539\u8FC7\uFF09\u3002",save:"\u4FDD\u5B58",saving:"\u4FDD\u5B58\u4E2D\u2026"};function Jr(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>{let t=e.trim();return Kt.includes(t)?{kind:"set",value:t}:void 0}}}function Yr(a){return{field:a,format:e=>e===!0?"true":"false",parse:e=>({kind:"set",value:e==="true"})}}function es(a,e){return a==="number"?ts(e):a==="switch"?Yr(e):a==="format"?Jr(e):as(e)}function as(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>e===""?{kind:"clear"}:{kind:"set",value:e}}}function ts(a){return{field:a,format:e=>typeof e=="number"?String(e):"",parse:e=>{if(e==="")return{kind:"clear"};let t=Number(e);return Number.isFinite(t)?{kind:"set",value:t}:void 0}}}var Qa=class{constructor(e,t){this.scope=e;this.describe=t;let o=Za.flatMap(s=>s.fields).filter(s=>!Xt.has(s.field)).map(s=>es(s.kind,s.field)),r=Za.flatMap(s=>s.fields).filter(s=>Xt.has(s.field)).map(s=>({field:s.field,write:d=>this.writeSecret(s,d)}));this.form=new xe.SettingsFormModel(e,o,r),this.store=this.form.bind(()=>this.projection()),this.unsubscribeMirror=t.subscribe(()=>this.store.set(this.projection()))}scope;describe;form;store;unsubscribeMirror;async writeSecret(e,t){if(t.trim()==="")return!0;let o=e.multiple===!0?os(t):t.trim();return this.scope.mutate([{op:"set",path:[e.field],value:o}])}clearSecret(e){return this.scope.mutate([{op:"unset",path:[e]}])}projection(){let e=this.scope.getSnapshot().value??{},t=this.describe.getSnapshot().view?.namespaces.find(s=>s.ns===Ja),o=new Set((t?.secrets??[]).filter(s=>s.set).map(s=>s.path[0]??"").filter(s=>s!=="")),r={};for(let s of jr)r[s]={...this.form.field(s),configured:o.has(s)};return{...this.form.shell(),fields:r,lights:Zr.map(s=>({label:s.label,hint:s.hint,on:s.on(e,o)}))}}inject(){return{hooks:{aivnCard:this.store},...this.form.actions(),clearSecret:e=>{this.clearSecret(e)}}}dispose(){this.unsubscribeMirror(),this.form.dispose()}};function os(a){return a.split(/[\s,，]+/).map(e=>e.trim()).filter(e=>e!=="")}var rs="Fish / Exa Key\u3001\u751F\u56FE\u4E0E\u914D\u4E50\u540E\u7AEF\u3001\u547D\u4EE4\u884C\u5F00\u5173",$t=a=>{let e=a.useAivnCard(o=>o);if(a.view==="summary")return(0,G.jsx)(G.Fragment,{children:rs});let t=!e.writable;return(0,G.jsxs)(xe.SettingsForm,{labels:Qr,state:e,onSave:a.save,onDiscard:a.discard,children:[(0,G.jsxs)("p",{className:"aivn-config-lights",children:[e.lights.map(o=>(0,G.jsxs)("span",{title:o.hint,"data-on":o.on?"true":"false",children:[o.label," ",o.on?"\u5F00":"\u5173"]},o.label)),(0,G.jsx)("span",{className:"aivn-config-lights-note",children:"\uFF08\u6309\u5F53\u524D\u914D\u7F6E\u7B97\uFF1B\u73AF\u5883\u53D8\u91CF\u91CC\u7684 Key \u4E0D\u5728\u8FD9\u91CC\u663E\u793A\uFF09"})]}),Za.map(o=>(0,G.jsxs)("section",{children:[(0,G.jsx)("h4",{children:o.title}),(0,G.jsx)("p",{children:o.blurb}),o.fields.map(r=>(0,G.jsx)(ss,{field:r,state:e.fields[r.field],disabled:t,edit:a.edit,resetField:a.resetField,clearSecret:a.clearSecret},r.field))]},o.title))]})};function ss(a){let{field:e,state:t,disabled:o}=a;return e.kind==="secret"?(0,G.jsxs)("div",{className:"aivn-config-secret",children:[(0,G.jsx)(xe.SettingsSecretField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,text:t.text,configured:t.configured,stateLabel:t.configured?"\u5DF2\u914D\u7F6E":"\u672A\u914D\u7F6E",disabled:o,onEdit:r=>a.edit(e.field,r)}),t.configured?(0,G.jsx)("button",{type:"button",disabled:o,onClick:()=>a.clearSecret(e.field),children:"\u6E05\u9664\u5DF2\u5B58 Key"}):null]}):e.kind==="switch"?(0,G.jsxs)("div",{className:"aivn-config-switch",children:[(0,G.jsx)(xe.Switch,{checked:t.text==="true",disabled:o,label:e.label,onChange:r=>a.edit(e.field,r?"true":"false")}),(0,G.jsx)("p",{children:e.hint})]}):(0,G.jsx)(xe.SettingsValueField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,overriddenLabel:"\u5DF2\u6539",resetLabel:"\u6062\u590D\u9ED8\u8BA4",invalidLabel:e.kind==="number"?"\u8981\u4E00\u4E2A\u6570\u5B57":"\u53D6\u503C\u4E0D\u5BF9",numeric:e.kind==="number",disabled:o,text:t.text,overridden:t.overridden,invalid:t.invalid,onEdit:r=>a.edit(e.field,r),onReset:()=>a.resetField(e.field)})}var S=require("react");var f=require("react/jsx-runtime"),B=require("react");var ls=["top-left","top-right","bottom-left","bottom-right","center"];var Ya="center";function et(a){return typeof a=="string"&&ls.includes(a)}var is={black:"#000000",white:"#ffffff"},ns=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;function jt(a){if(a===void 0)return null;let e=a.trim();if(e==="")return null;let t=is[e.toLowerCase()];return t!==void 0?{kind:"color",color:t}:ns.test(e)?{kind:"color",color:e}:{kind:"asset",id:e}}var at="full";var Ze="normal";var fs=["left","center","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"];function cs(a){return typeof a=="string"&&fs.includes(a)}var ps={l:"left",c:"center",r:"right"};function ms(a,e){return a<=0?[]:(a===2?["left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right","center"]:["center","left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"]).filter(o=>!e.has(o)).slice(0,a)}function Zt(a,e=new Map){let t=new Map,o=a.filter(d=>!e.has(d)),r=new Set;for(let[d,u]of e)a.includes(d)&&r.add(u);let s=ms(o.length,r);o.forEach((d,u)=>{t.set(d,s[u]??"center")});for(let[d,u]of e)a.includes(d)&&t.set(d,u);return t}function Qt(a){if(a===void 0)return null;let e=a.trim().toLowerCase();return e===""?null:cs(e)?e:ps[e]??null}var hs={full:{small:{landscape:{top:68,height:32},portrait:{top:66,height:34}},normal:{landscape:{top:18,height:132},portrait:{top:16,height:102}},large:{landscape:{top:14,height:168},portrait:{top:13,height:130}},huge:{landscape:{top:10,height:232},portrait:{top:10,height:178}}},half:{small:{landscape:{top:70,height:30},portrait:{top:68,height:32}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:13,height:126},portrait:{top:12,height:118}},huge:{landscape:{top:8,height:172},portrait:{top:8,height:156}}},square:{small:{landscape:{top:72,height:28},portrait:{top:70,height:30}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:12,height:130},portrait:{top:11,height:122}},huge:{landscape:{top:8,height:184},portrait:{top:8,height:164}}}};function eo(a,e,t="bottom"){let o=hs[a??at][e??Ze];return{landscape:Jt(o.landscape,e,t),portrait:Jt(o.portrait,e,t)}}function Jt(a,e,t){let s=t==="center"?"center":t==="top"?"top center":(e??Ze)==="small"?"bottom center":"top center",d=t==="center"?50-a.height/2:t==="top"?0:a.top;return{top:Yt(d),height:Yt(a.height),origin:s}}function Yt(a){return Math.round(a*100)/100}var gs=["nudge","stagger","jump","nod","bow","turn","shake","sway"];function tt(a){return typeof a=="string"&&gs.includes(a)}function ao(a){if(typeof a!="string")return null;let e=a.trim().toLowerCase();return tt(e)?`sprite-act-${e}`:null}function to(a,e,t){let o=e.trim(),r={},s=d=>{d&&(d.framing&&(r.framing=d.framing),d.stature&&(r.stature=d.stature),d.anchor&&(r.anchor=d.anchor),d.title&&(r.title=d.title))};return s(a[o]),t!==void 0&&t.trim()!==""&&s(a[`${o}/${t.trim()}`]),r}function oo(a,e={}){let t=e.sprite?.trim();return t||a}function ot(a,e=!1){return e?"\u8FD8\u6CA1\u5F00\u6F14\u2014\u2014\u6309\u753B\u9762\u4E0A\u7684\u300C\u5F00\u6F14\u300D\u5F00\u59CB\u3002":a?"\u5267\u4F5C\u5BB6\u6B63\u5728\u843D\u7B14\u2026":"\uFF08\u70B9\u51FB\u5F00\u59CB\uFF09"}function ht(a){return a.hasView?{name:a.viewName,text:a.shown}:{name:null,text:ot(a.live)}}function gt(a){return a.hold?!1:a.nextIsPlayerInput?(!a.hasCurrent||a.currentComplete)&&a.cursor<a.cueCount:!a.live||a.auto?!1:!a.hasCurrent&&a.cursor<a.cueCount}function xt(a){let e={showContinueCard:!1,clickToContinue:!1};return a.ended||!a.ready?e:a.stopType==="pause"?{...e,clickToContinue:!0}:!a.isNoStop||a.stopType!==null?e:a.continueCardOn?{...e,showContinueCard:!0}:{...e,clickToContinue:!0}}function rt(a){let e=[],t=0;for(let o of a.split(`
`))t+=o.length,o.trim()!==""&&e.push(t),t+=1;return e.length>0?e:[a.length]}function ro(a,e){if(a.type!=="title"||a.mode!=="lines")return a.text.length;let t=rt(a.text),o=Math.min(Math.max(e,0),t.length-1);return t[o]??a.text.length}function Qe(a){return a.type!=="title"||a.mode!=="lines"?0:Math.max(0,rt(a.text).length-1)}var xs=0,Je=class{lines=[];cues=[];openKey=null;scene="";reset(){this.lines.length=0,this.cues.length=0,this.openKey=null,this.scene=""}replaceText(e,t){let o=this.lines.find(r=>r.seq===e);return o?(o.text=t,!0):!1}apply(e,t){let o=()=>`l${xs+=1}`;switch(e.kind){case"scene":{this.openKey=null,this.scene=e.bg??this.scene,this.lines.push({key:o(),type:"scene",seq:t,text:[e.bg,e.bgm,e.ambient].filter(Boolean).join(" \xB7 ")}),this.cues.push({key:o(),kind:"scene",bg:e.bg,bgm:e.bgm,ambient:e.ambient,bgmVolume:e.bgm_volume,ambientVolume:e.ambient_volume,transition:e.transition,...e.clear===!0?{clear:!0}:{}});return}case"sfx":this.cues.push({key:o(),kind:"sfx",src:e.src,volume:e.volume});return;case"cg":this.cues.push({key:o(),kind:"cg",id:e.id,caption:e.caption});return;case"actor":this.cues.push({key:o(),kind:"actor",id:e.id,pos:e.pos,variant:e.variant,shot:e.shot,anchor:e.anchor,action:e.action,leave:e.leave});return;case"preload_asset":this.cues.push({key:o(),kind:"preload",id:e.id,type:e.type});return;case"say_start":{let r={key:o(),type:"say",actorId:e.id,...e.mood?{mood:e.mood}:{},...e.name?{nameOverride:e.name}:{},seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"narrate_start":{let r={key:o(),type:"narrate",seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"thought_start":{let r={key:o(),type:"thought",actorId:e.id,seq:t,nodeId:e.nodeId,text:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"title_start":{let r={key:o(),type:"title",align:e.align,mode:e.mode,seq:t,nodeId:e.nodeId,text:"",closed:!1};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"say_text":case"narrate_text":case"thought_text":case"title_text":{let r=this.lines.at(-1);r&&r.key===this.openKey&&(r.text+=e.delta);return}case"title_end":{let r=this.lines.at(-1);r&&r.key===this.openKey&&(r.closed=!0),this.openKey=null;return}case"say_end":case"narrate_end":case"thought_end":this.openKey=null;return;case"player_input":{let r={key:o(),type:"input",actorId:"player",seq:t,text:e.text};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=null;return}case"stop":return;case"ending":case"epilogue_start":case"epilogue_text":case"epilogue_end":return}}};function st(a,e){return e?a[e]??(e==="player"?"\u4F60":e):""}var y=require("react");function uo(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(s=>s.key===r.lineKey)?.nodeId===t)return o}return-1}function io(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(s=>s.key===r.lineKey)?.seq===t)return o}return-1}function no(a,e,t){let o=t.nodeId?uo(a,e,t.nodeId):typeof t.seq=="number"?io(a,e,t.seq):-1;if(o<0)return{cueIndex:-1,shownLength:0};let r=a[o];if(r.kind!=="line")return{cueIndex:o,shownLength:0};let s=e.find(u=>u.key===r.lineKey),d=t.offset??t.len??0;return{cueIndex:o,shownLength:Math.min(d,s?.text.length??0)}}function Ls(){return{resolvedPos:"center",variant:null,shot:null,anchor:null,action:null,actionSeq:0,orderSeq:0}}function fo(a,e){let t=!!e.leave||e.action==="exit"||e.action==="leave",o=a[e.id],r=o&&!o.leaving?o.orderSeq:Math.max(0,...Object.values(a).map(h=>h.orderSeq||0))+1,s=t?o?{...a,[e.id]:{...o,leaving:!0}}:a:{...a,[e.id]:{...o??Ls(),pos:Qt(e.pos)??o?.pos,variant:e.variant??o?.variant??null,shot:e.shot??o?.shot??null,anchor:e.anchor??o?.anchor??null,action:tt(e.action)?e.action:null,actionSeq:tt(e.action)?(o?.actionSeq??0)+1:o?.actionSeq??0,orderSeq:r,leaving:!1}},d=new Map;for(let[h,L]of Object.entries(s))L.pos&&!L.leaving&&d.set(h,L.pos);let u=Object.keys(s).filter(h=>!s[h].leaving),l=Zt(u,d);return Object.fromEntries(Object.entries(s).map(([h,L])=>[h,{...L,resolvedPos:L.leaving?L.resolvedPos:l.get(h)??"center"}]))}function It(a,e){let t=a?.actorId;return t&&e[t]?t:null}var Is=6e5;function co(a){return a!=null&&a>0?a:Is}var lt={bg:null,bgm:null,ambient:null,transition:null,cg:null,sprites:{},pending:{}},Cs=new Set(["none",""]);function Lt(a,e){return e===void 0?a:Cs.has(e.trim().toLowerCase())?null:e}function Ct(a,e){switch(e.kind){case"scene":return{...a,bg:e.bg??a.bg,transition:e.transition??"fade",cg:e.bg?null:a.cg,sprites:e.clear===!0?{}:a.sprites};case"cg":return{...a,cg:{id:e.id,caption:e.caption}};case"actor":return{...a,cg:null,sprites:fo(a.sprites,e)};default:return a}}function po(a,e){let t=Ct(a,e);switch(e.kind){case"scene":return{...t,bgm:Lt(t.bgm,e.bgm),ambient:Lt(t.ambient,e.ambient),bgmVolume:e.bgmVolume??t.bgmVolume,ambientVolume:e.ambientVolume??t.ambientVolume};case"preload":return e.type==="sprite"?t:{...t,pending:{...t.pending,[e.id]:{type:e.type,at:Date.now()}}};default:return t}}function Ss(a){let e={};for(let[t,o]of Object.entries(a))o.leaving||(e[t]=o);return e}function mo(a,e){let t=lt;for(let o=0;o<e;o+=1)t=Ct(t,a[o]);return{...t,sprites:Ss(t.sprites)}}function ho(a,e,t){let o=e?t?.get(e):void 0;return o?{...a,cg:{id:o}}:a}function go(a,e,t){return t?a?.nodeId??null:e?.nodeId??a?.nodeId??null}function xo(a,e,t){let o=s=>{for(let d=0;d<a.length;d+=1){let u=a[d];if(u.kind==="line"&&u.lineKey===s)return d}return-1},r=e[t];if(!r)return null;if(r.kind==="line"){let s=o(r.key);return s<0?null:s}for(let s=t+1;s<e.length;s+=1){let d=e[s];if(d.kind!=="line")continue;let u=o(d.key);return u<0?null:u}return a.length}function so(a,e){for(let t=a.length-1;t>=0;t-=1)if(a[t].key===e)return t;return-1}function ks(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"||a.type==="title"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null,...a.type==="title"&&a.align?{align:a.align}:{}}}var ys=new Set(["\u3002","\uFF01","\uFF1F","\u2026","\u2014","\u300D","\u300F"]),bs=new Set(["\uFF0C","\u3001","\uFF1B","\uFF1A","\uFF09",".",",","!","?",";"]),Ye=null;function lo(){let a=Date.now();if(Ye&&a-Ye.at<250)return Ye.value;let e=getComputedStyle(document.documentElement),t=(o,r)=>{let s=Number.parseInt(e.getPropertyValue(o),10);return Number.isFinite(s)&&s>=0?s:r};return Ye={at:a,value:{char:t("--type-ms",35),short:t("--pause-short-ms",120),long:t("--pause-long-ms",240)}},Ye.value}function ws(a,e){let t=a[e-1];if(!t)return lo().char;let o=lo();return ys.has(t)?o.char+o.long:bs.has(t)?o.char+o.short:o.char}function St(a,e,t){let[o,r]=(0,y.useState)(lt),[s,d]=(0,y.useState)(null),[u,l]=(0,y.useState)(0),[h,L]=(0,y.useState)(0),[w,k]=(0,y.useState)(!1),[R,U]=(0,y.useState)(null),[m,P]=(0,y.useState)(null),C=(0,y.useRef)(0),_=(0,y.useRef)(!t.resume),K=(0,y.useRef)(t.resumeAfterReset===!0),H=(0,y.useRef)(e);H.current=e;let O=t.transcript,Q=(0,y.useRef)(O);Q.current=O;let J=(0,y.useRef)({});J.current={onLineStart:t.onLineStart,onFastForward:t.onFastForward};let v=(0,y.useRef)(t.resumeAt??null);(0,y.useEffect)(()=>{t.resumeAt&&(v.current=t.resumeAt)},[t.resumeAt]);let I=s?H.current.find(g=>g.key===s)??null:null,ie=t.turbo??!1,le=s?so(O,s):-1,F=m!==null?O[m]??null:I?ks(I):null,$=m!==null,ce=go(F,I,$),Y=(0,y.useRef)(le);Y.current=le;let Fe=(0,y.useCallback)(g=>{P(b=>{let T=Q.current,N=Y.current>=0?Y.current:T.length-1,D=Math.max(0,Math.min((b??N)+g,N));return D>=N?null:D})},[]),ne=(0,y.useCallback)(g=>{r(b=>po(b,g))},[]),W=(0,y.useCallback)(()=>{for(;;){let g=a[C.current];if(!g)return;if(C.current+=1,g.kind==="line"){let b=H.current.find(T=>T.key===g.lineKey)??null;d(g.lineKey),L(0),l(b?.type==="input"?b.text.length:0),J.current.onLineStart?.(b);return}if(g.kind==="sfx"){U({key:g.key,src:g.src,volume:g.volume});continue}ne(g)}},[a,ne]),j=I?ro(I,h):0,Z=I!==null&&u>=j,Be=I===null||Z,ue=a.length<=C.current&&(I===null||Z),q=(0,y.useCallback)(()=>{if(!Be){l(j),J.current.onFastForward?.();return}if(I?.type==="title"){if(I.closed!==!0)return;if(h<Qe(I)){L(h+1);return}d(null),l(0),L(0),W();return}W()},[Be,I,h,j,W]);(0,y.useEffect)(()=>{if(!I||u>=j)return;if(ie){I.type==="title"&&L(Qe(I)),l(I.text.length),J.current.onFastForward?.();return}let g=setTimeout(()=>l(b=>b+1),ws(I.text,u));return()=>clearTimeout(g)},[I,u,j,ie]),(0,y.useEffect)(()=>{if(!ie||m!==null||I&&u<j||C.current>=a.length)return;let g=setTimeout(()=>W(),30);return()=>clearTimeout(g)},[ie,m,I,u,j,a,W,t.revision]),(0,y.useEffect)(()=>{if(!w||ie||t.hold||I?.type==="title")return;if(!I){if(C.current>=a.length)return;let N=setTimeout(()=>W(),400);return()=>clearTimeout(N)}if(!Z||!a[C.current])return;let b=Math.min(900+I.text.length*55,3200),T=setTimeout(()=>W(),b);return()=>clearTimeout(T)},[w,I,Z,a,W,t.revision,t.hold,ie]);let A=(0,y.useRef)(t.resetToken??0);(0,y.useEffect)(()=>{let g=t.resetToken??0;g!==A.current&&(A.current=g,C.current=0,d(null),l(0),L(0),P(null),r(lt),_.current=!1,K.current=t.resumeAfterReset===!0,v.current=t.seekTo??null)},[t.resetToken,t.resumeAfterReset,t.seekTo]),(0,y.useEffect)(()=>{if(a.length<C.current){C.current=0,d(null),l(0),L(0),P(null),r(lt);return}if(!_.current&&a.length>0){_.current=!0;let g=v.current;v.current=null;let b=g?no(a,H.current,g):null,T=b?.cueIndex??-1;if(b&&T>=0){for(let X=0;X<=T;X+=1)ne(a[X]);let D=a[T];if(C.current=T+1,D.kind==="line"){d(D.lineKey);let X=H.current.find(qe=>qe.key===D.lineKey);X?.type==="title"?(l(X.text.length),L(Qe(X))):l(b.shownLength)}return}for(let D=0;D<a.length;D+=1)ne(a[D]);C.current=a.length;let N=null;for(let D of a)D.kind==="line"&&(N=D.lineKey);if(N&&K.current){d(N);let D=H.current.find(X=>X.key===N);D?.type==="title"?(l(D.text.length),L(Qe(D))):l(D?.text.length??0)}}},[t.revision,a,ne]),(0,y.useEffect)(()=>{let g=I;!g||g.nodeId===void 0&&g.seq===void 0||J.current.onRead?.({nodeId:g.nodeId??"",offset:u,...g.seq!==void 0?{seq:g.seq}:{},len:u})},[I,u]),(0,y.useEffect)(()=>{let g=a[C.current],b=g?.kind==="line"&&(H.current.find(D=>D.key===g.lineKey)?.type??null)==="input";if(!gt({live:t.live,auto:w,hold:t.hold===!0,hasCurrent:I!==null,currentComplete:I===null||u>=j,cursor:C.current,cueCount:a.length,nextIsPlayerInput:b}))return;let N=setTimeout(()=>W(),80);return()=>clearTimeout(N)},[t.live,w,I,u,a,W,t.revision,t.hold]);let he=co(t.assetsTtlMs);(0,y.useEffect)(()=>{if(Object.keys(o.pending).length===0)return;let g=setInterval(()=>{let b=Date.now();r(T=>{let N=Object.entries(T.pending).filter(([,X])=>b-X.at>=he).map(([X])=>X);if(N.length===0)return T;let D={...T.pending};for(let X of N)delete D[X];return{...T,pending:D}})},5e3);return()=>clearInterval(g)},[o.pending,he]);let pe=(0,y.useCallback)(g=>{g.length!==0&&r(b=>{if(Object.keys(b.pending).length===0)return b;let T={...b.pending};for(let N of g)delete T[N];return{...b,pending:T}})},[]),Re=(0,y.useMemo)(()=>O.slice(0,Math.max(le,0)).reverse(),[O,le]),de=(0,y.useMemo)(()=>{if(m===null)return null;let g=xo(a,O,m);return g===null?null:{...mo(a,g),bgm:o.bgm,ambient:o.ambient,bgmVolume:o.bgmVolume,ambientVolume:o.ambientVolume,pending:o.pending}},[m,a,O,o.bgm,o.ambient,o.bgmVolume,o.ambientVolume,o.pending]),me=(0,y.useCallback)(g=>{let b=so(Q.current,g);b<0||P(b>=Y.current?null:b)},[]),ee=(0,y.useCallback)(()=>{P(null)},[]);return{visual:ho(de??o,ce,t.cgByNode),current:I,view:F,viewLength:$?F?.text.length??0:u,shownLength:u,exhausted:ue,auto:w,setAuto:k,advance:q,scrub:Fe,scrubbed:$,history:Re,seek:me,follow:ee,sfx:R,settleAssets:pe}}function kt(a){return Math.min(1,Math.max(0,a))}function Lo(a){return new URL(a,location.href).href}var We=class{base;active=null;retired=null;ramps=new Map;constructor(e){this.base=e}set(e,t){let o=kt(t??this.base);if(e===null){this.retire();return}let r=Lo(e);if(this.active?.src===r){this.rampTo(this.active,o);return}this.retire();let s=new Audio(r);s.loop=!0,s.preload="auto",s.volume=0,this.active=s,s.play().catch(()=>{}),this.rampTo(s,o)}retire(){if(!this.active)return;let e=this.active;this.active=null,this.retired&&this.discard(this.retired),this.retired=e,this.rampTo(e,0,()=>this.discard(e))}discard(e){this.cancelRamp(e),e.pause(),e.removeAttribute("src"),e.load(),this.retired===e&&(this.retired=null)}rampTo(e,t,o){this.cancelRamp(e);let r=e.volume;if(Math.abs(t-r)<.01){e.volume=t,o?.();return}let s=Math.max(1,Math.round(1200/50)),d=0,u=window.setInterval(()=>{d+=1,e.volume=kt(r+(t-r)*(d/s)),!(d<s)&&(window.clearInterval(u),this.ramps.delete(e),o?.())},50);this.ramps.set(e,u)}cancelRamp(e){let t=this.ramps.get(e);t!==void 0&&(window.clearInterval(t),this.ramps.delete(e))}dispose(){for(let e of[this.active,this.retired])e&&this.discard(e);this.active=null,this.retired=null}},ea=class{playing=new Set;play(e,t=.7){if(this.playing.size>=6){let r=this.playing.values().next().value;r&&(this.playing.delete(r),r.pause())}let o=new Audio(Lo(e));o.volume=kt(t),o.addEventListener("ended",()=>this.playing.delete(o)),o.addEventListener("error",()=>this.playing.delete(o)),this.playing.add(o),o.play().catch(()=>this.playing.delete(o))}dispose(){for(let e of this.playing)e.pause();this.playing.clear()}};var mr=require("react/jsx-runtime");var ut=require("react");var Io=a=>a?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Co(a,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Io(a),size:24,node:e,...t.length>0?{aliases:t}:{}}}var So=a=>{let e="",t=!1;for(let o of a){if(o==="-"||o==="_"||o<=" "){t=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=t?o.toUpperCase():o,t=!1}return e};var ko=a=>{let e=So(a);return e.charAt(0).toUpperCase()+e.slice(1)};var ta=require("react");var aa=(...a)=>a.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();var ye={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function yt(a){return a!=null}function yo(a,e={}){let t=e.attributeNames??{},o=k=>t[k]??k,r=a.size??a.width??ye.width,s=a.size??a.height??ye.height,d=a.aliases?.filter(k=>typeof k=="string"&&k.trim()!=="").map(k=>`lucide-${k}`)??[],u=[...a.name?[`lucide-${a.name}`]:[],...d],l=e.className?.split(" ").filter(Boolean)??[],h=e.includeDefaultClasses===!1?aa(...l):aa("lucide",...u,...l),L=e.absoluteStrokeWidth?Number(e.strokeWidth??ye["stroke-width"])*Number(a.size??a.width??ye.width)/Number(e.size??e.width??ye.width):e.strokeWidth??ye["stroke-width"];return["svg",{...Object.entries(ye).reduce((k,[R,U])=>(k[o(R)]=U,k),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&yt(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&yt(e.width)&&{[o("width")]:e.width},..."height"in e&&yt(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:L,...h&&{[o("class")]:h},[o("viewBox")]:`0 0 ${r} ${s}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},a.node.map(k=>{let[R,U,m]=k,P=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...U}:U;return m?[R,P,m]:[R,P]})]}function bo(a,e={}){return yo(a,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var wo=a=>{for(let e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var Xe=require("react");var vs=(0,Xe.createContext)({});var vo=()=>(0,Xe.useContext)(vs);var Po=(0,ta.forwardRef)(({color:a,size:e,width:t,height:o,strokeWidth:r,absoluteStrokeWidth:s,nonScalingStroke:d,className:u="",children:l,iconNode:h=[],icon:L={node:h,aliases:[],size:24},...w},k)=>{let{size:R=24,strokeWidth:U=2,absoluteStrokeWidth:m=!1,nonScalingStroke:P=!1,color:C="currentColor",className:_=""}=vo()??{},K=!!l||wo(w),[H,O,Q=[]]=bo(L,{color:a??C,width:t??e??R,height:o??e??R,strokeWidth:r??U,absoluteStrokeWidth:s??m,nonScalingStroke:d??P,className:aa(_,u),hasA11yProp:K,attributes:w});return(0,ta.createElement)(H,{ref:k,...O},[...Q.map(([J,v])=>(0,ta.createElement)(J,v)),...Array.isArray(l)?l:[l]])});function i(a,e=[],t=[]){let o=typeof a=="string"?Co(a,e,t):a,r=(0,ut.forwardRef)(({className:s,...d},u)=>(0,ut.createElement)(Po,{ref:u,icon:o,className:s,...d}));return o.name&&(r.displayName=ko(o.name)),r}var Ao={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};Ao.node;var oa=i(Ao);var To={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};To.node;var ra=i(To);var Do={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};Do.node;var sa=i(Do);var Mo={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Mo.node;var la=i(Mo);var Fo={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};Fo.node;var ua=i(Fo);var Bo={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};Bo.node;var da=i(Bo);var Ro={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Ro.node;var ia=i(Ro);var qo={name:"corner-up-left",size:24,node:[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}],["path",{d:"M9 14 4 9l5-5",key:"102s5s"}]]};qo.node;var Ke=i(qo);var Eo={name:"crosshair",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]};Eo.node;var na=i(Eo);var Oo={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};Oo.node;var fa=i(Oo);var Uo={name:"drama",size:24,node:[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]};Uo.node;var ca=i(Uo);var Ho={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};Ho.node;var pa=i(Ho);var No={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};No.node;var ma=i(No);var _o={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};_o.node;var ha=i(_o);var zo={name:"image",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]};zo.node;var ga=i(zo);var Go={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};Go.node;var xa=i(Go);var Vo={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};Vo.node;var La=i(Vo);var Wo={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};Wo.node;var Ia=i(Wo);var Xo={name:"messages-square",size:24,node:[["path",{d:"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",key:"1n2ejm"}],["path",{d:"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",key:"1qfcsi"}]]};Xo.node;var Ca=i(Xo);var Ko={name:"mic",size:24,node:[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]};Ko.node;var Sa=i(Ko);var $o={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};$o.node;var be=i($o);var jo={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};jo.node;var we=i(jo);var Zo={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Zo.node;var ka=i(Zo);var Qo={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};Qo.node;var ve=i(Qo);var Jo={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};Jo.node;var ya=i(Jo);var Yo={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Yo.node;var ba=i(Yo);var er={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};er.node;var wa=i(er);var ar={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};ar.node;var va=i(ar);var tr={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};tr.node;var Pa=i(tr);var or={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};or.node;var Aa=i(or);var rr={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};rr.node;var Pe=i(rr);var sr={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};sr.node;var Ae=i(sr);var lr={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};lr.node;var Te=i(lr);var ur={name:"undo-2",size:24,node:[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]};ur.node;var Ta=i(ur);var dr={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};dr.node;var Da=i(dr);var ir={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};ir.node;var Ma=i(ir);var nr={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};nr.node;var Fa=i(nr);var fr={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};fr.node;var Ba=i(fr);var cr={name:"zoom-in",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};cr.node;var Ra=i(cr);var pr={name:"zoom-out",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};pr.node;var qa=i(pr);var Ps={back:oa,exit:xa,forward:ra,plus:wa,close:Ba,check:la,alert:Te,chat:Ia,backlog:Ca,files:pa,assets:ga,users:Da,drama:ca,craft:ve,memory:sa,settings:Aa,workshop:ha,expand:La,shrink:be,unshrink:we,refresh:Pa,reply:Ke,return:Ke,download:fa,pencil:ya,undo:Ta,rewrite:va,remove:Ae,fork:ma,sparkles:Pe,play:ba,pause:ka,volume:Ma,mic:Sa,"volume-off":Fa,prev:da,down:ua,up:ia,zoomIn:Ra,zoomOut:qa,locate:na};function z({name:a,size:e=15}){let t=Ps[a];return(0,mr.jsx)(t,{size:e,strokeWidth:1.75,"aria-hidden":"true",style:{display:"block"}})}var hr=require("react"),As=[];function bt(){return As.length>0}var Le=require("react/jsx-runtime"),Oa=require("react"),kr=Xr(Sr(),1);function Ua({title:a,hint:e,onClose:t,dismissible:o=!0,children:r,footer:s,width:d=520}){let u=(0,Oa.useRef)(null);return(0,Oa.useEffect)(()=>{let h=u.current?.querySelector("input, textarea, button");h?.focus(),h instanceof HTMLInputElement&&h.select()},[]),(0,Oa.useEffect)(()=>{let l=h=>{h.key==="Escape"&&(h.stopPropagation(),o&&t())};return window.addEventListener("keydown",l,!0),()=>window.removeEventListener("keydown",l,!0)},[o,t]),(0,kr.createPortal)((0,Le.jsx)("div",{className:"modal-scrim stage-root",role:"dialog","aria-modal":"true","aria-label":a,onClick:l=>{l.stopPropagation(),o&&t()},onTouchStart:l=>l.stopPropagation(),onTouchMove:l=>l.stopPropagation(),onTouchEnd:l=>l.stopPropagation(),children:(0,Le.jsxs)("div",{className:"modal-card",style:{width:d},ref:u,onClick:l=>l.stopPropagation(),children:[(0,Le.jsxs)("header",{className:"modal-head",children:[(0,Le.jsx)("h2",{className:"modal-title",children:a}),o&&(0,Le.jsx)("button",{type:"button",className:"modal-x",onClick:t,"aria-label":"\u5173\u95ED",children:"\u2715"})]}),e&&(0,Le.jsx)("p",{className:"modal-hint",children:e}),(0,Le.jsx)("div",{className:"modal-body",children:r}),s&&(0,Le.jsx)("footer",{className:"modal-foot",children:s})]})}),document.body)}var Ie=require("react/jsx-runtime");function wt({candidates:a,selected:e,onToggle:t}){if(a.length===0)return(0,Ie.jsx)("div",{className:"ref-picker-empty muted small",children:"\u6682\u65E0\u53EF\u7528\u7ACB\u7ED8\u7684\u89D2\u8272\uFF08\u9700\u5148\u6709\u7ACB\u7ED8\u624D\u53EF\u4F5C\u4E3A\u57AB\u56FE\u53C2\u8003\uFF09"});let o=new Set(e),r=[...e.map(s=>a.find(d=>d.id===s)).filter(s=>!!s),...a.filter(s=>!o.has(s.id))];return(0,Ie.jsx)("div",{className:"ref-picker-grid",role:"group","aria-label":"\u9009\u62E9\u53C2\u8003\u7ACB\u7ED8\u89D2\u8272",children:r.map(s=>{let d=e.indexOf(s.id),u=d!==-1;return(0,Ie.jsxs)("button",{type:"button",className:`ref-picker-chip ${u?"selected":""}`,onClick:()=>t(s.id),title:u?`\u7B2C ${d+1} \u4F4D\u53C2\u8003\u56FE\uFF1A${s.name}\uFF08\u70B9\u51FB\u53D6\u6D88\uFF09`:`\u6DFB\u52A0\u53C2\u8003\uFF1A${s.name}`,"aria-pressed":u,children:[s.spriteUrl?(0,Ie.jsx)("img",{src:s.spriteUrl,alt:s.name,className:"ref-chip-thumb"}):(0,Ie.jsx)("span",{className:"ref-chip-blank",children:(0,Ie.jsx)(z,{name:"users",size:14})}),(0,Ie.jsx)("span",{className:"ref-chip-name",children:s.name}),u&&(0,Ie.jsx)("span",{className:"ref-chip-order",children:d+1})]},s.id)})})}function vt(a,e){return a.includes(e)?a.filter(t=>t!==e):[...a,e]}function Pt(a,e){return e?!0:a.trim().length>0}var Ha={prompt:{title:"\u63D0\u793A",hint:"",placeholder:"\u5199\u4E00\u53E5\u2026",submit:()=>"\u53D1\u9001"},interrupt:{title:"\u6253\u65AD",hint:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002",placeholder:"\u63A5\u4E0B\u6765\u600E\u4E48\u5199\u2026",submit:()=>"\u6253\u65AD\u5E76\u53D1\u9001"},edit:{title:"\u6539\u5199\u8FD9\u53E5",hint:"\u53EA\u6539\u8FD9\u4E00\u53E5\uFF0C\u5267\u60C5\u7167\u65E7\u5F80\u4E0B\u8D70\u3002",placeholder:"\u6539\u5199\u8FD9\u53E5\u2026",submit:()=>"\u6539\u5199"},restart:{title:"\u91CD\u65B0\u751F\u6210",hint:"\u4ECE\u8FD9\u4E00\u8F6E\u5F00\u5934\u91CD\u5199\uFF1A\u539F\u6709\u5185\u5BB9\u6574\u6BB5\u7559\u4F5C\u65E7\u679D\uFF0C\u53EF\u4EE5\u4EA4\u4EE3\u4E00\u53E5\u8981\u6C42\uFF08\u7559\u7A7A\u5C31\u662F\u7EAF\u91CD\u5199\uFF09\u3002",placeholder:"\u60F3\u6362\u4EC0\u4E48\u65B9\u5411\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u91CD\u65B0\u751F\u6210 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u91CD\u65B0\u751F\u6210"},fork:{title:"\u5206\u5C94",hint:"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",placeholder:"\u65B0\u5206\u652F\u7684\u7B2C\u4E00\u53E5\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u5206\u5C94 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u5206\u5C94"},cg:{title:"\u751F\u6210\u63D2\u56FE",hint:"\u7559\u7A7A = \u6309\u521A\u624D\u8FD9\u4E00\u5E55\u6784\u56FE\u3002",placeholder:"\u60F3\u753B\u6210\u4EC0\u4E48\u6837\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:()=>"\u751F\u6210"}},yr={guide:"\u6392\u8FDB\u961F\u5217\uFF0C\u968F\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1\u9001\u3002",fork:"\u4ECE\u6B63\u5728\u770B\u7684\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",interrupt:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002"};function br(a,e){return a!=="prompt"?a??"prompt":e==="guide"?"prompt":e}function wr(a){return a instanceof HTMLElement&&(a.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(a.tagName))}var it="OOC\uFF1A",Bs={wide:.86,normal:1,close:1.35,extreme:1.85};function Rs({url:a,pos:e,name:t,framing:o,stature:r,shot:s,anchor:d,leaving:u,action:l,actionSeq:h,zIndex:L,dim:w}){let[k,R]=(0,B.useState)(a),[U,m]=(0,B.useState)(null);(0,B.useEffect)(()=>{if(!a||a===k)return;let v=new Image,I;return v.onload=()=>{m(k),R(a),I=setTimeout(()=>m(null),260)},v.src=a,()=>{v.onload=null,I&&clearTimeout(I)}},[a,k]);let[P,C]=(0,B.useState)(!1),[_,K]=(0,B.useState)(0);if((0,B.useEffect)(()=>{if(!l){C(!1);return}C(!0),K(I=>I+1);let v=setTimeout(()=>C(!1),560);return()=>clearTimeout(v)},[l,h]),!k)return null;let H=`theater-sprite pos-${e}${u?" leaving":" entering"}${P?" acting":""}${w?" dim":""}`,O=eo(o,r,d),Q={zIndex:L,"--scale":Bs[s??"normal"],"--sprite-top":`${O.landscape.top}%`,"--sprite-height":`${O.landscape.height}%`,"--sprite-origin":O.landscape.origin,"--sprite-top-portrait":`${O.portrait.top}%`,"--sprite-height-portrait":`${O.portrait.height}%`,"--sprite-origin-portrait":O.portrait.origin,"--sprite-act":ao(l)??"none","--act-nonce":`-${_%100/1e3}s`},J=()=>{m(null),R(null)};return(0,f.jsxs)(f.Fragment,{children:[U&&(0,f.jsx)("img",{className:`${H} sprite-out`,style:{zIndex:L},src:U,alt:"","aria-hidden":!0}),(0,f.jsx)("img",{className:H,style:Q,src:k,alt:t,onError:J})]})}function At({visual:a,playback:e,live:t,fresh:o,names:r,index:s,voiceAvailable:d,busy:u,targets:l,onPrompt:h,promptAlt:L="fork",showGenerate:w=!0,onEdit:k,onFork:R,onGenerateCg:U,onReplay:m,voiceState:P,voiceOn:C,onToggleVoice:_,onUnlock:K,onView:H,canContinue:O,onContinue:Q,ended:J=!1,onTurbo:v,overlay:I,directorBar:ie=!0}){let le=(0,B.useRef)(null);le.current||(le.current={bgm:new We(.28),ambient:new We(.16),sfx:new ea}),(0,B.useEffect)(()=>{let n=le.current;return()=>{n.bgm.dispose(),n.ambient.dispose(),n.sfx.dispose()}},[]);let[F,$]=(0,B.useState)(null),[ce,Y]=(0,B.useState)(""),[Fe,ne]=(0,B.useState)([]),[W,j]=(0,B.useState)(!0),[Z,Be]=(0,B.useState)("guide"),[ue,q]=(0,B.useState)(!1),{view:A,viewLength:he,current:pe,shownLength:Re,exhausted:de,advance:me,scrub:ee,scrubbed:g,follow:b}=e,T=A?A.text.slice(0,he):"",N=pe!==null&&Re>=pe.text.length,D=A?.type==="title",X=D&&A!==null&&pe?.closed===!0&&T.length>=(rt(A.text).at(-1)??0),qe=ht({viewName:A&&(A.type==="say"||A.type==="thought")?A.nameOverride??(st(r,A.actorId)||"\uFF1F"):null,shown:T,hasView:A!==null,live:t}),Ga=!A&&o?ot(t,o):qe.text,Va=It(A,a.sprites),_e=(0,B.useCallback)(()=>{if(K(),ue){q(!1);return}J||(g?ee(1):D?me():O?Q():me())},[K,ue,J,g,ee,D,O,Q,me]),Ee=(0,B.useRef)(null),Wa=(0,B.useRef)(null),oe=(0,B.useRef)(null);(0,B.useEffect)(()=>{let n=Ee.current,c=Wa.current;if(!n||!c)return;let ae=oe.current,re=()=>{n.style.setProperty("--dialog-h",`${c.offsetHeight}px`),n.style.setProperty("--dir-h",`${ae?.offsetHeight??0}px`)};re();let ge=new ResizeObserver(re);return ge.observe(c),ae&&ge.observe(ae),()=>ge.disconnect()},[ie]),(0,B.useEffect)(()=>{let n=Ee.current;if(!n)return;let c=ae=>{Math.abs(ae.deltaY)<4||ee(ae.deltaY>0?1:-1)};return n.addEventListener("wheel",c,{passive:!1}),()=>n.removeEventListener("wheel",c)},[ee]),(0,B.useEffect)(()=>{let n=c=>{if(!(c.metaKey||c.ctrlKey||c.altKey||wr(c.target))&&!(c.key==="Escape"&&bt())){if(ue){(c.key==="h"||c.key==="H"||c.key===" "||c.key==="Escape")&&(q(!1),c.preventDefault());return}c.key==="ArrowUp"||c.key==="ArrowLeft"?(ee(-1),c.preventDefault()):c.key==="ArrowDown"||c.key==="ArrowRight"?(ee(1),c.preventDefault()):c.key===" "?(F||_e(),c.preventDefault()):c.key==="Escape"&&g?(ee(1),c.preventDefault()):c.key==="Escape"&&F?($(null),Y(""),c.preventDefault()):(c.key==="l"||c.key==="L")&&(H("backlog"),c.preventDefault())}};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[ee,g,F,H,ue,_e]),(0,B.useEffect)(()=>{let n=re=>{re.key==="Control"&&!wr(re.target)&&v(!0)},c=re=>{re.key==="Control"&&v(!1)},ae=()=>v(!1);return window.addEventListener("keydown",n),window.addEventListener("keyup",c),window.addEventListener("blur",ae),()=>{window.removeEventListener("keydown",n),window.removeEventListener("keyup",c),window.removeEventListener("blur",ae)}},[v]);let Oe=(0,B.useRef)(null),ft=n=>{K();let c=n.touches[0];c&&(Oe.current={x:c.clientX,y:c.clientY,at:Date.now()})},$e=n=>{let c=Oe.current;if(Oe.current=null,ue||!c)return;let ae=n.changedTouches[0];if(!ae||Date.now()-c.at>800)return;let re=ae.clientX-c.x,ge=ae.clientY-c.y;Math.abs(re)<45&&Math.abs(ge)<45||(Math.abs(re)>Math.abs(ge)?ee(re>0?-1:1):ge<0&&H("backlog"))};(0,B.useEffect)(()=>{let n=e.sfx;if(!n)return;let c=s.sfx(n.src);c&&le.current.sfx.play(c,n.volume??.7)},[e.sfx,s]);let je=s.bgm(a.bgm),ct=s.ambient(a.ambient);(0,B.useEffect)(()=>{le.current.bgm.set(je,a.bgmVolume)},[je,a.bgmVolume]),(0,B.useEffect)(()=>{le.current.ambient.set(ct,a.ambientVolume)},[ct,a.ambientVolume]);let Ue=jt(a.bg??void 0),Xa=Ue?.kind==="color"?Ue.color:null,ze=Ue?.kind==="asset"?Ue.id:null,p=s.bg(ze),M=s.cg(a.cg?.id??null),x=!p&&ze!==null&&a.pending[ze]?.type==="bg",fe=a.cg?.id??null,pt=!M&&!!fe&&a.pending[fe]?.type==="cg",Ge=L==="interrupt"?"interrupt":"fork",Nt=()=>{let n=ce.trim(),c=br(F,Z);if(Y(""),$(null),c==="prompt"||c==="interrupt"){n&&h(n,c==="interrupt"?"interrupt":"guide");return}if(c==="edit"){n&&l.lineNodeId&&k(l.lineNodeId,n);return}if(c==="cg"){U(n,{referenceCharacters:Fe.length>0?Fe:void 0,useHistory:W,anchorNodeId:g?l.lineNodeId??A?.nodeId??null:void 0});return}if(c==="restart"){if(!l.beatId)return;R(l.beatId,{resume:!0,...l.beatNodeId?{replaced:l.beatNodeId}:{},...n?{instruction:n}:{}});return}l.lineSeq!==null&&R(l.lineSeq,n?{instruction:n}:void 0)},Ve=P(A?.seq??null),_t=u?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u6539\u5199":l.lineNodeId?null:"\u8FD9\u91CC\u6CA1\u6709\u5267\u4F5C\u5BB6\u7684\u53F0\u8BCD\u53EF\u6539",zt=u?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u5199":l.beatId?null:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u9000\u56DE\u53BB\u7684\u4E00\u8F6E",mt=l.lineSeq===null?"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u5206\u5C94\u7684\u4F4D\u7F6E":null,He=br(F,Z),Ur=He==="edit"?ce.trim()===""||!l.lineNodeId:He==="prompt"?ce.trim()==="":He==="fork"?mt!==null:He==="restart"?l.beatId===null:He==="cg"?!Pt(ce,W):!1;return(0,f.jsxs)("div",{className:`theater stage-root${ue?" bare":""}${D?" title-mode":""}`,ref:Ee,onClick:_e,onTouchStart:ft,onTouchEnd:$e,children:[(0,f.jsxs)("div",{className:`theater-stage${g?" rewinding":""}`,children:[p?(0,f.jsx)("img",{className:"theater-bg theater-bg-in",src:p,alt:""},p):(0,f.jsx)("div",{className:`theater-bg theater-bg-fallback ${x?"theater-bg-pending":""} ${a.transition==="cut"?"cut":""}`,style:Xa?{background:Xa}:void 0}),(0,f.jsx)("div",{className:"theater-sprites",children:Object.entries(a.sprites).map(([n,c])=>{let ae=s.spriteDirOf(n),re=s.spritePresentation(ae,c.variant),ge=Va===n,Hr=(c.orderSeq||1)+(ge?1e3:0);return(0,f.jsx)(Rs,{url:s.sprite(ae,c.variant),pos:c.resolvedPos,name:st(r,n),framing:re.framing,stature:re.stature,shot:c.shot,anchor:c.anchor??re.anchor,leaving:c.leaving===!0,action:c.action,actionSeq:c.actionSeq,zIndex:Hr,dim:Va!==null&&!ge},n)})}),M&&(0,f.jsxs)("div",{className:"theater-cg",children:[(0,f.jsx)("img",{className:"theater-cg-in",src:M,alt:a.cg?.id??""}),a.cg?.caption&&(0,f.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})]}),pt&&(0,f.jsx)("div",{className:"theater-cg theater-cg-pending","aria-label":"\u63D2\u56FE\u751F\u6210\u4E2D",children:a.cg?.caption&&(0,f.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})}),D&&A&&(0,f.jsxs)("div",{className:`theater-title title-align-${A.align??"center"}`,role:"heading","aria-level":1,children:[(0,f.jsx)("p",{className:"theater-title-text",children:T}),X&&(0,f.jsx)("span",{className:"theater-title-next","aria-hidden":!0,children:"\u25BC"})]})]}),!ue&&!D&&I,ie&&(0,f.jsxs)("div",{className:"theater-director",ref:oe,children:[(0,f.jsxs)("button",{type:"button",className:`dir-btn ${F==="prompt"?"on":""}`,title:"\u8F93\u5165\u89D2\u8272\u7684\u884C\u52A8\u3001\u53F0\u8BCD\uFF0C\u6216\u7ED9\u8FD9\u573A\u620F\u7684\u6307\u793A","aria-label":"\u63D0\u793A",onClick:n=>{n.stopPropagation(),$(F==="prompt"?null:"prompt"),Y("")},children:[(0,f.jsx)(z,{name:"chat",size:17}),"\u63D0\u793A"]}),(0,f.jsxs)("button",{type:"button",className:`dir-btn ${F==="edit"?"on":""}`,title:_t??"\u7F16\u8F91\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD","aria-label":"\u6539\u5199\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD",disabled:_t!==null,onClick:n=>{n.stopPropagation(),$(F==="edit"?null:"edit"),Y(l.lineText)},children:[(0,f.jsx)(z,{name:"pencil",size:17}),"\u6539\u5199"]}),(0,f.jsxs)("button",{type:"button",className:`dir-btn ${F==="restart"?"on":""}`,title:zt??"\u91CD\u5199\uFF1A\u9000\u5230\u8FD9\u4E00\u8F6E\u4E4B\u524D\uFF0C\u8BA9\u5267\u4F5C\u5BB6\u91CD\u65B0\u5199\u4E00\u904D\uFF08\u539F\u6709\u5185\u5BB9\u7559\u4F5C\u65E7\u679D\uFF09","aria-label":"\u91CD\u5199\u8FD9\u4E00\u8F6E",disabled:zt!==null,onClick:n=>{n.stopPropagation(),$(F==="restart"?null:"restart"),Y("")},children:[(0,f.jsx)(z,{name:"rewrite",size:17}),"\u91CD\u5199"]}),w&&(0,f.jsxs)("button",{type:"button",className:`dir-btn ${F==="cg"?"on":""}`,title:o?"\u8FD8\u6CA1\u6709\u5267\u60C5\u53EF\u4EE5\u5165\u753B":"\u4E3A\u8FD9\u4E00\u5E55\u751F\u6210\u4E00\u5F20\u63D2\u56FE\uFF08\u6307\u4EE4\u53EF\u7559\u7A7A\uFF09","aria-label":"\u751F\u6210\u63D2\u56FE",disabled:o,onClick:n=>{n.stopPropagation(),F==="cg"?$(null):($("cg"),Y(""),ne([]),j(!0))},children:[(0,f.jsx)(z,{name:"assets",size:17}),"\u751F\u56FE"]}),d&&Ve!=="none"&&(0,f.jsxs)("button",{type:"button",className:`dir-btn ${Ve==="pending"?"voice-pending":""}`,title:Ve==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":C?"\u91CD\u542C\u8FD9\u53E5":"\u8BED\u97F3\u5DF2\u5173\uFF0C\u5148\u6253\u5F00\u8BED\u97F3\u518D\u91CD\u542C","aria-label":Ve==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":"\u91CD\u542C\u8FD9\u53E5",disabled:Ve==="pending"||!C,onClick:n=>{n.stopPropagation(),Ve==="ready"&&A?.seq!==null&&A?.seq!==void 0&&m(A.seq)},children:[(0,f.jsx)(z,{name:"volume",size:17}),"\u91CD\u542C"]})]}),(0,f.jsxs)("div",{className:"theater-dialog",role:"text",ref:Wa,children:[qe.name&&(0,f.jsx)("div",{className:"dialog-name",children:qe.name}),(0,f.jsxs)("p",{className:`dialog-text ${A?.type==="thought"?"thought":A?.type==="narrate"?"narrate":""} ${g?"rewinding":""}`,children:[Ga,A&&!g&&!N&&(0,f.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]}),(0,f.jsxs)("div",{className:"dialog-foot",children:[(0,f.jsx)("div",{className:"dialog-hint dialog-hint-foot",children:g?(0,f.jsxs)("button",{type:"button",className:"dialog-rewind",onClick:b,title:"\u56DE\u5230\u6700\u65B0",children:[(0,f.jsx)(z,{name:"prev"}),"\u56DE\u770B\u4E2D"]}):F?null:(0,f.jsxs)(f.Fragment,{children:[t&&(0,f.jsx)("span",{className:"dialog-spinner","aria-label":"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199"}),N&&(!de||O)&&(0,f.jsx)("span",{className:"dialog-next","aria-hidden":!0,children:"\u25BC"}),O&&(0,f.jsx)("span",{className:"muted",children:"\u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210"})]})}),(0,f.jsxs)("div",{className:"dialog-options",children:[(0,f.jsx)("button",{type:"button",className:`dir-btn ${e.auto?"tgl-on":""}`,title:e.auto?"Auto-play: on (tap to turn off)":"Auto-play: off (tap to turn on)","aria-pressed":e.auto,onClick:n=>{n.stopPropagation(),e.setAuto(!e.auto)},children:e.auto?"Auto":"Manual"}),d&&(0,f.jsx)("button",{type:"button",className:`dir-btn ${C?"tgl-on":""}`,title:C?"Voice: on (tap to turn off)":"Voice: off (tap to turn on)","aria-pressed":C,onClick:n=>{n.stopPropagation(),_()},children:C?"VOICE":"MUTED"}),(0,f.jsx)("button",{type:"button",className:"dir-btn",title:"Rewind one line (\u2190)",disabled:!g&&e.history.length===0,onClick:n=>{n.stopPropagation(),ee(-1)},children:"BACK"}),(0,f.jsx)("button",{type:"button",className:"dir-btn",title:"Hide the interface \u2014 tap the picture or press H / Space to bring it back",onClick:n=>{n.stopPropagation(),$(null),Y(""),q(!0)},children:"HIDE"})]})]}),F&&(0,f.jsxs)(Ua,{title:F==="prompt"?"\u63D0\u793A":Ha[F].title,hint:F==="prompt"?yr[Z]:Ha[F].hint,onClose:()=>$(null),footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{type:"button",className:"primary",onClick:Nt,disabled:Ur,children:Ha[He].submit(ce.trim())}),(0,f.jsx)("button",{type:"button",className:"ghost-btn",onClick:()=>$(null),children:"\u53D6\u6D88"})]}),children:[F==="prompt"&&(0,f.jsxs)("div",{className:"seg guide-seg",children:[(0,f.jsx)("button",{type:"button",className:`seg-btn ${Z==="guide"?"active":""}`.trim(),"aria-pressed":Z==="guide",title:"\u8DDF\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1",onClick:()=>Be("guide"),children:"\u5F15\u5BFC"}),(0,f.jsx)("button",{type:"button",className:`seg-btn ${Z===Ge?"active":""}`.trim(),"aria-pressed":Z===Ge,title:Ge==="interrupt"?yr.interrupt:mt??"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",disabled:Ge==="fork"&&mt!==null,onClick:()=>Be(Ge),children:Ge==="interrupt"?"\u6253\u65AD":"\u5206\u5C94"})]}),F==="cg"&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"image-gen-field",children:[(0,f.jsx)("span",{className:"image-gen-label",children:"\u53C2\u8003\u7ACB\u7ED8\uFF08\u6309\u70B9\u9009\u987A\u5E8F\u57AB\u56FE\uFF09\uFF1A"}),(0,f.jsx)(wt,{candidates:s.spriteIds.map(n=>({id:n,name:s.spriteName(n)??r[n]??n,spriteUrl:s.sprite(n,null)})).filter(n=>!!n.spriteUrl),selected:Fe,onToggle:n=>ne(c=>vt(c,n))})]}),(0,f.jsxs)("label",{className:"image-gen-checkbox",children:[(0,f.jsx)("input",{type:"checkbox",checked:W,onChange:n=>j(n.target.checked)}),(0,f.jsx)("span",{children:"\u57FA\u4E8E\u521A\u624D\u6F14\u5230\u7684\u5267\u60C5\u4E0E\u573A\u666F"})]})]}),(0,f.jsxs)("div",{className:"director-input",children:[F==="prompt"&&(0,f.jsx)("button",{type:"button",className:`ooc-shortcut ${ce.startsWith(it)?"on":""}`,title:"\u4EE5 OOC \u5F00\u5934 = \u8DF3\u51FA\u89D2\u8272\uFF0C\u76F4\u63A5\u4E0B\u6307\u4EE4","aria-label":"\u4EE5 OOC \u524D\u7F00\u7ED9\u5267\u4F5C\u5BB6\u4E0B\u6307\u4EE4",onClick:()=>Y(n=>n.startsWith(it)?n.slice(it.length):it+n),children:"OOC\uFF1A"}),(0,f.jsx)("input",{value:ce,placeholder:F==="prompt"?Ha[He].placeholder:Ha[F].placeholder,onChange:n=>Y(n.target.value),onKeyDown:n=>{n.key==="Enter"&&Nt()}})]})]})]})]})}var E=require("react/jsx-runtime"),Me=require("react");var vr={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()},qs="\u81EA\u7531\u8F93\u5165";function Tt({stop:a,isNoStop:e,showContinue:t,disabled:o,seenChoices:r,onChoice:s,onFree:d,onContinue:u,onPolish:l}){let[h,L]=(0,Me.useState)(""),[w,k]=(0,Me.useState)(!1),[R,U]=(0,Me.useState)(null),[m,P]=(0,Me.useState)(!1),[C,_]=(0,Me.useState)(null);(0,Me.useEffect)(()=>{k(!1),L(""),U(null),_(null)},[a,e]);let K=a?.stopType==="choice"?a.options??[]:[],H=K.length>0||a?.stopType==="free",O=()=>{let v=h.trim();v&&(d(v),L(""),U(null),_(null),k(!1))},Q=()=>{if(!l)return;let v=(R??h).trim();!v||m||(P(!0),_(null),l(v).then(I=>{U(v),L(I)}).catch(I=>_(I.message)).finally(()=>P(!1)))},J=()=>{R!==null&&(L(R),U(null),_(null))};return(0,E.jsxs)(E.Fragment,{children:[H&&!w&&(0,E.jsxs)("div",{className:"choice-overlay",role:"group","aria-label":"\u9009\u9879",...vr,children:[K.map((v,I)=>(0,E.jsxs)("button",{type:"button",className:"choice",disabled:o,onClick:()=>s(I),children:[(0,E.jsx)("span",{className:"choice-text",children:v.text}),r?.has(v.text)&&(0,E.jsxs)("span",{className:"choice-seen",children:[(0,E.jsx)(z,{name:"check"})," \u5DF2\u9009\u8FC7"]})]},`${I}-${v.text}`)),(0,E.jsx)("button",{type:"button",className:"choice ghost",disabled:o,onClick:()=>k(!0),title:"\u4E0D\u8BF4\u9009\u9879\uFF0C\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5",children:(0,E.jsx)("span",{className:"choice-text",children:qs})})]}),w&&(0,E.jsx)(Ua,{title:"\u81EA\u7531\u8F93\u5165",hint:"\u4EE5\u4E3B\u89D2\u53E3\u543B\u5199\u4E00\u53E5\u3002",width:560,onClose:()=>k(!1),footer:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)("button",{type:"button",className:"ghost-btn free-back",onClick:()=>k(!1),disabled:o,title:"\u4E0D\u81EA\u5DF1\u5199\u4E86\uFF0C\u56DE\u53BB\u9009",children:[(0,E.jsx)(z,{name:"prev",size:14}),"\u8FD4\u56DE\u9009\u9879"]}),C&&(0,E.jsxs)("span",{className:"muted small",children:["\u6DA6\u8272\u5931\u8D25\uFF1A",C]}),(0,E.jsx)("button",{type:"button",className:"primary",onClick:O,disabled:o||h.trim()==="",children:"\u8BF4"})]}),children:(0,E.jsxs)("div",{className:"free-box",children:[(0,E.jsx)("input",{value:h,placeholder:a?.stopType==="free"?a.placeholder??"\u4F60\u7684\u56DE\u5E94\u2026":"\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5\u2026",onChange:v=>L(v.target.value),onKeyDown:v=>v.key==="Enter"&&O(),disabled:o}),l&&(0,E.jsxs)("button",{type:"button",className:"ghost-btn",title:"LLM \u6309\u4E3B\u89D2\u53E3\u543B\u6DA6\u8272\uFF08\u53EF\u64A4\u9500\uFF09",onClick:Q,disabled:o||m||h.trim()==="",children:[(0,E.jsx)(z,{name:"sparkles"}),m?"\u6DA6\u8272\u4E2D\u2026":"\u6DA6\u8272"]}),R!==null&&(0,E.jsxs)("button",{type:"button",className:"link-btn",onClick:J,disabled:m,title:"\u9000\u56DE\u6DA6\u8272\u524D\u7684\u539F\u8BDD",children:[(0,E.jsx)(z,{name:"undo"}),"\u64A4\u9500"]})]})}),e&&t&&!a&&(0,E.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u7EE7\u7EED",...vr,children:(0,E.jsx)("div",{className:"choices",children:(0,E.jsxs)("button",{type:"button",className:"choice",onClick:u,disabled:o,children:[(0,E.jsx)(z,{name:"forward"}),"\uFF08\u7EE7\u7EED\uFF09"]})})})]})}var ke=require("react/jsx-runtime"),Es={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()};function Dt({ending:a,summary:e="",summaryPending:t=!1}){let o=a.title?.trim()||a.id,r=e.trim()!=="";return(0,ke.jsx)("div",{className:"choice-overlay ending-overlay",role:"group","aria-label":"\u7ED3\u5C40","aria-live":"polite",...Es,children:(0,ke.jsxs)("div",{className:"ending-card",children:[(0,ke.jsx)("div",{className:"ending-mark",children:"\u2014 \u5267\u7EC8 \u2014"}),(0,ke.jsx)("h2",{className:"ending-title",children:o}),a.subtitle?(0,ke.jsx)("p",{className:"ending-subtitle",children:a.subtitle}):null,r?(0,ke.jsx)("p",{className:"ending-summary",children:e}):t?(0,ke.jsx)("p",{className:"ending-summary ending-summary-pending",children:"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199\u4E0B\u7ED3\u5C40\u2026\u2026"}):null]})})}var Pr=require("react/jsx-runtime");var Ne=require("react/jsx-runtime"),Ce=require("react");var Os=3600;function Mt(){let[a,e]=(0,Ce.useState)([]),t=(0,Ce.useRef)(1),o=(0,Ce.useRef)(new Map),r=(0,Ce.useCallback)(u=>{let l=o.current.get(u);l&&clearTimeout(l),o.current.delete(u),e(h=>h.filter(L=>L.id!==u))},[]),s=(0,Ce.useCallback)((u,l="info")=>{if(!u)return;let h=t.current;t.current+=1,e(L=>[...L.slice(-2),{id:h,text:u,kind:l}]),o.current.set(h,setTimeout(()=>r(h),Os))},[r]),d=o;return(0,Ce.useEffect)(()=>{let u=d.current;return()=>{for(let l of u.values())clearTimeout(l);u.clear()}},[d]),{toasts:a,push:s,dismiss:r}}function Ft({toasts:a,onDismiss:e}){return a.length===0?null:(0,Ne.jsx)("div",{className:"toast-stack stage-root",role:"status","aria-live":"polite",children:a.map(t=>(0,Ne.jsxs)("button",{type:"button",className:`toast toast-${t.kind}`,onClick:()=>e(t.id),title:"\u70B9\u6389",children:[t.kind==="info"?(0,Ne.jsx)(z,{name:"check"}):(0,Ne.jsx)(z,{name:"alert"}),(0,Ne.jsx)("span",{children:t.text})]},t.id))})}var Bt=null;function Us(){return Bt||(Bt=new AudioContext),Bt}var Na=class{ctx=null;master=null;lines=new Map;currentSeq=null;urls=new Map;replaySources=new Map;replayToken=0;maxSeqSeen=0;floorSeq=0;pausedSent=!1;enabled=!0;onNotify=null;onControl=null;get unlocked(){return this.ctx!==null}get pending(){let e=0;for(let t of this.lines.values())t.faded||(e+=t.phrases.size-t.nextToPlay);return e}pendingPhrases=new Map;unlock(){if(!this.ctx){this.ctx=Us(),this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.ctx.resume().then(()=>this.notify());for(let e of this.lines.values())for(let t of e.phrases.values())t.buffer===null&&this.decode(e,t)}}setEnabled(e){this.enabled=e,e||(this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure()),this.notify()}voiceState(e){return!this.enabled||e===null||e===void 0?"none":this.urls.has(e)?"ready":this.pendingPhrases.has(e)?(this.pruneStalePending(),this.pendingPhrases.has(e)?"pending":"none"):"none"}markPending(e,t){if(!this.enabled)return;this.pruneStalePending();let o=this.pendingPhrases.get(e);o||(o=new Map,this.pendingPhrases.set(e,o)),o.set(t,Date.now()),this.notify()}clearPending(e,t){let o=this.pendingPhrases.get(e);o&&(o.delete(t),o.size===0&&this.pendingPhrases.delete(e))}pruneStalePending(){let e=Date.now()-45e3;for(let[t,o]of this.pendingPhrases){for(let[r,s]of o)s<e&&o.delete(r);o.size===0&&this.pendingPhrases.delete(t)}}async replay(e){if(!this.enabled||(this.unlock(),!this.ctx||!this.master))return!1;let t=[...this.urls.get(e)?.entries()??[]].sort((u,l)=>u[0]-l[0]).map(([,u])=>u);if(t.length===0)return!1;this.stopReplay();let o=this.replayToken,r=this.ctx,s=[];for(let u of t){let l=null;try{let h=await fetch(u);h.ok&&(l=await r.decodeAudioData(await h.arrayBuffer()))}catch{}if(o!==this.replayToken||!this.enabled)return!1;l&&s.push(l)}if(s.length===0)return!1;let d=r.currentTime+.05;for(let u of s)this.playPhrase(null,u,d),d+=u.duration+.25;return this.notify(),!0}stopReplay(){let e=this.ctx;if(!e){this.replaySources.clear();return}let t=e.currentTime;for(let[o,r]of this.replaySources)try{r.gain.cancelScheduledValues(t),r.gain.setValueAtTime(Math.max(r.gain.value,1e-4),t),r.gain.linearRampToValueAtTime(1e-4,t+100/1e3),o.stop(t+100/1e3+.02)}catch{}this.replaySources.clear()}handleAudio(e){if(this.clearPending(e.seq,e.phrase),!this.enabled||(this.rememberUrl(e.seq,e.phrase,e.url),e.seq<=this.floorSeq)||this.currentSeq!==null&&e.seq<this.currentSeq)return;this.maxSeqSeen=Math.max(this.maxSeqSeen,e.seq);let t=this.lines.get(e.seq);if(t||(t={phrases:new Map,nextToPlay:0,chainEnd:null,faded:!1,sources:new Map},this.lines.set(e.seq,t)),t.faded||t.phrases.has(e.phrase))return;let o={url:e.url,buffer:null};t.phrases.set(e.phrase,o),this.ctx&&this.decode(t,o),this.checkBackpressure(),this.notify()}lineStarted(e,t){if(this.finishCurrent(),this.pruneBefore(e),!this.enabled||e===void 0||!t){this.currentSeq=null;return}this.currentSeq=e;let o=this.lines.get(e);o&&!o.faded&&this.trySchedule(o)}fastForward(){this.finishCurrent()}beatStarted(){this.fadeAll(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null,this.floorSeq=this.maxSeqSeen,this.notify()}reset(){this.beatStarted(),this.urls.clear()}holdsLine(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;return!e||!this.ctx||e.chainEnd===null?!1:this.ctx.currentTime<e.chainEnd}dispose(){this.fadeAll(),this.stopReplay(),this.lines.clear(),this.pendingPhrases.clear(),this.clearBackpressure(),this.currentSeq=null}rememberUrl(e,t,o){let r=this.urls.get(e);r||(r=new Map,this.urls.set(e,r)),r.set(t,o);for(let s of this.urls.keys()){if(this.urls.size<=500)break;s!==e&&this.urls.delete(s)}}finishCurrent(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;e&&this.fadeLine(e),this.currentSeq=null}fadeAll(){for(let e of this.lines.values())this.fadeLine(e);this.stopReplay()}fadeLine(e){if(e.faded)return;e.faded=!0;let t=this.ctx;if(!t){e.sources.clear();return}let o=t.currentTime;for(let[r,s]of e.sources)try{s.gain.cancelScheduledValues(o),s.gain.setValueAtTime(Math.max(s.gain.value,1e-4),o),s.gain.linearRampToValueAtTime(1e-4,o+100/1e3),r.stop(o+100/1e3+.02)}catch{}e.sources.clear()}async decode(e,t){let o=this.ctx;if(o){try{let r=await fetch(t.url);if(!r.ok)throw new Error(`HTTP ${r.status}`);t.buffer=await o.decodeAudioData(await r.arrayBuffer())}catch{t.buffer=o.createBuffer(1,1,o.sampleRate)}!e.faded&&this.lines.get(this.currentSeq??-1)===e&&this.trySchedule(e)}}trySchedule(e){let t=this.ctx;if(!(!t||e.faded))for(;;){let o=e.phrases.get(e.nextToPlay);if(!o?.buffer)return;let r=e.chainEnd===null,s=Math.max(t.currentTime+.03,(e.chainEnd??0)+(r?0:.25));this.playPhrase(e,o.buffer,s),e.chainEnd=s+o.buffer.duration,e.nextToPlay+=1;let d=Math.max(0,(e.chainEnd-t.currentTime+.05)*1e3);setTimeout(()=>{this.checkBackpressure(),this.notify()},d)}}playPhrase(e,t,o){let r=this.ctx,s=this.master;if(!r||!s)return;let d=r.createBufferSource();d.buffer=t;let u=r.createGain(),l=.015,h=Math.min(.04,t.duration/4);u.gain.setValueAtTime(1e-4,o),u.gain.linearRampToValueAtTime(1,o+l),u.gain.setValueAtTime(1,Math.max(o+l,o+t.duration-h)),u.gain.linearRampToValueAtTime(1e-4,o+t.duration),d.connect(u).connect(s),d.start(o);let L=e?e.sources:this.replaySources;L.set(d,u),d.onended=()=>{L.delete(d),u.disconnect(),d.disconnect()}}pruneBefore(e){if(e!==void 0)for(let t of this.lines.keys())t<e&&this.lines.delete(t)}clearBackpressure(){this.pausedSent&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}checkBackpressure(){!this.pausedSent&&this.pending>10?(this.pausedSent=!0,this.onControl?.({paused:!0})):this.pausedSent&&this.pending<=3&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}notify(){this.onNotify?.()}};function _a(a){let e=new Map;for(let t of a??[]){let o=t.lastIndexOf(".");e.set(o===-1?t:t.slice(0,o),t)}return e}function Rt(a,e,t={},o={},r=[],s={}){let d=_a(e.backgrounds),u=_a(e.cg),l=_a(e.bgm),h=_a(e.sfx),L=s.assetUrl??(m=>`/plays/${a}/assets/${m}`),w=(m,P)=>L(`${m}/${P}`),k=(m,P)=>C=>{let _=C?m.get(C):void 0;if(_)return w(P,_);let K=C?t[C]:void 0;return K?.ready?K.url:null},R=new Map,U=new Map;for(let m of r){if(!m.id)continue;let P=oo(m.id,m);P!==m.id&&R.set(m.id,P),U.has(P)||U.set(P,m.name??m.id)}return{bg:k(d,"backgrounds"),cg:k(u,"cg"),bgm:k(l,"bgm"),sfx:k(h,"sfx"),ambient:m=>k(h,"sfx")(m)??k(l,"bgm")(m),spriteDirOf:m=>R.get(m)??m,spriteName:m=>U.get(m)??null,spriteIds:Object.keys(e).filter(m=>m.startsWith("sprites/")&&(e[m]?.length??0)>0).map(m=>m.slice(8)).sort(),sprite:(m,P)=>{let C=e[`sprites/${m}`]??[],_=(P?_a(C).get(P):void 0)??C[0];return _?w(`sprites/${m}`,_):null},spritePresentation:(m,P)=>{let C=to(o,m,P??void 0);return{framing:C.framing??at,stature:C.stature??Ze,anchor:C.anchor??"bottom"}}}}var Hs=new Set(["say","narrate","thought","title"]),Ar=new Set(["say","narrate","thought","title","input"]);function qt(a,e){return a?_s(Ns(a,e),e):e.filter(t=>Ar.has(t.type)&&t.text!=="").map(Tr)}function Tr(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="sfx"||a.type==="cg"||a.type==="scene"?"narrate":a.type,actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null,...a.type==="title"&&a.align?{align:a.align}:{}}}function Ns(a,e){let t=new Map(a.nodes.map(u=>[u.id,u])),o=new Map;for(let u of e)u.seq!==void 0&&o.set(u.seq,u);let r=e.filter(u=>u.type==="input"),s=[],d=a.pathIds;for(let u=0;u<d.length;u+=1){let l=t.get(d[u]);if(!l)continue;if(Hs.has(l.kind)){let w=l.seq===void 0?void 0:o.get(l.seq);s.push({key:w?.key??l.id,kind:"line",type:l.kind,actorId:l.attrs.id??w?.actorId??null,...w?.nameOverride?{nameOverride:w.nameOverride}:{},text:w?.text||l.text,seq:l.seq??null,nodeId:l.id,...l.kind==="title"?{align:et(l.attrs.align)?l.attrs.align:Ya}:{}});continue}if(l.kind!=="prompt")continue;let h=l.text;if(!h)continue;let L=l.seq===void 0?void 0:o.get(l.seq);if(L){let w=r.indexOf(L);w>=0&&r.splice(w,1)}else{let w=r.findIndex(k=>k.text===h);w>=0&&(L=r.splice(w,1)[0])}s.push({key:L?.key??l.id,kind:"input",type:"say",actorId:"player",text:L?.text||h,seq:l.seq??L?.seq??null,nodeId:l.id})}return s}function _s(a,e){let t=new Set(a.map(o=>o.key));for(let o of e)!Ar.has(o.type)||o.text===""||t.has(o.key)||(a.push(Tr(o)),t.add(o.key));return a}var Dr=require("react");var zs=require("react");var Et="stage-voice";function Ot(a,e,t){let o=a.getItem(e);return o===null?t:o==="1"}function Ut(a,e,t){a.setItem(e,t?"1":"0")}var Mr=`/* @aivn/stage \u7684\u821E\u53F0\u6837\u5F0F\uFF1A\u4ECE apps/web/src/app.css \u539F\u6837\u642C\u6765\u7684\u5C0F\u8282\u3002
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
  /* \u5168\u5C4F\u6807\u9898\u5361\uFF08<title>\uFF09\uFF1A\u5B57\u8272 / \u5B57\u65CF / \u6295\u5F71\u3002\u5BF9\u9F50\u4E94\u6863\u662F\u5267\u672C\u91CC\u7684\u5C5E\u6027\uFF0C\u4E0D\u8FDB\u4EE4\u724C\uFF1B
     \u7F3A\u7701\u5B57\u65CF\u4E0E --font-ui \u540C\u503C\uFF08\u5199\u6210\u5B57\u9762\u91CF\uFF0C\u4FBF\u4E8E dsh-aivn \u7684\u76AE\u80A4\u4EE4\u724C\u8868\u9010\u5B57\u5BF9\u8868\uFF09\u3002 */
  --title-ink: #f2ebde;
  --title-font:
    system-ui, -apple-system, "Segoe UI", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei",
    sans-serif;
  --title-shadow: 0 2px 14px rgb(0 0 0 / 0.72);
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
  --title-ink: #23201c;
  --title-shadow: 0 2px 12px rgb(255 255 255 / 0.6);
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

/* \u2500\u2500 \u5168\u5C4F\u6807\u9898\u5361\uFF08<title>\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u6574\u5C4F\u94FA\u6587\u672C\u3001\u5BF9\u8BDD\u6846\u8BA9\u4F4D\uFF1B\u5BF9\u9F50\u7531 title-align-* \u4E94\u6863\u7ED9\u3002\u8FC7\u6E21\u4E0E\u8F6C\u573A\u4EFB\u52A1\u89E3\u8026\uFF1A
   \u5F53\u524D\u968F\u5BF9\u8BDD\u6846\u663E\u9690\u5373\u65F6\u5207\u6362\uFF0C\u5C06\u6765\u53EF\u5728\u52A8\u6548\u4EFB\u52A1\u91CC\u63A5\u8F6C\u573A\u8BCD\u6C47\u3002 */
.theater.title-mode .theater-dialog,
.theater.title-mode .theater-director {
  display: none;
}

.theater-title {
  position: absolute;
  inset: 0;
  z-index: 13;
  display: flex;
  padding: clamp(24px, 9vh, 104px) clamp(20px, 8vw, 120px);
  /* \u70B9\u51FB\u900F\u4F20\uFF1A\u6574\u5361\u662F"\u63D0\u793A\u73A9\u5BB6\u70B9\u4E00\u4E0B"\uFF0C\u70B9\u54EA\u513F\u90FD\u7B97\u7FFB\u4E0B\u4E00\u53E5 / \u79BB\u5F00 */
  pointer-events: none;
  animation: bg-fade var(--fade-ms) ease;
}

.title-align-center {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.title-align-top-left {
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
}
.title-align-top-right {
  align-items: flex-start;
  justify-content: flex-end;
  text-align: right;
}
.title-align-bottom-left {
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
}
.title-align-bottom-right {
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
}

.theater-title-text {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-family: var(--title-font);
  color: var(--title-ink);
  font-size: clamp(22px, 5.2vw, 46px);
  line-height: 1.75;
  letter-spacing: 0.06em;
  text-shadow: var(--title-shadow);
}

.theater-title-next {
  position: absolute;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 4vh, 40px);
  color: var(--title-ink);
  opacity: 0.72;
  font-size: 14px;
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

/* \u7ED3\u5C40\u5361\uFF1A\u4E0E\u9009\u80A2\u5361\u5171\u7528\u906E\u7F69\u5B9A\u4F4D\uFF0C\u4F46**\u6574\u4F53\u5403\u6389\u70B9\u51FB**\u2014\u2014\u7EC8\u5C40\u6CA1\u6709\u300C\u70B9\u753B\u9762\u7EE7\u7EED\u300D\u8FD9\u56DE\u4E8B\u3002 */
.ending-overlay {
  pointer-events: auto;
}

.ending-card {
  width: min(620px, 88vw);
  margin: 0 auto;
  padding: 28px 26px 24px;
  text-align: center;
  font-family: var(--font-ui);
  color: var(--choice-ink);
  background: var(--choice-bg);
  border: 1px solid var(--choice-line);
  border-top: 3px solid var(--accent);
  border-radius: 1px;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.5);
  animation: choice-in 0.3s ease-out;
}

.ending-mark {
  font-size: 12px;
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  color: var(--ink-faint);
}

.ending-title {
  margin: 10px 0 4px;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.ending-subtitle {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.05em;
  color: var(--ink-faint);
}

.ending-summary {
  margin: 18px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--choice-line);
  font-size: 15px;
  line-height: 1.9;
  text-align: left;
  white-space: pre-wrap;
  color: var(--choice-ink);
}

.ending-summary-pending {
  font-style: italic;
  color: var(--ink-faint);
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
`;var Fr=require("react");var Se=require("react/jsx-runtime"),Br=({items:a})=>{let[e,t]=(0,Fr.useState)(!1);return a.length===0?null:(0,Se.jsxs)("div",{className:"aivn-pending",children:[(0,Se.jsxs)("button",{type:"button",className:`dir-btn${e?" on":""}`,title:"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B","aria-label":"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B",onClick:()=>t(o=>!o),children:[(0,Se.jsx)(z,{name:"sparkles",size:17}),"\u8FDB\u884C\u4E2D ",a.length]}),e&&(0,Se.jsx)("ul",{className:"aivn-pending-list",children:a.map(o=>(0,Se.jsxs)("li",{className:"aivn-pending-row",children:[(0,Se.jsx)("span",{className:"aivn-pending-kind",children:o.kind==="guide"?"\u63D0\u793A":"\u8BED\u97F3"}),(0,Se.jsx)("span",{className:"aivn-pending-text",children:o.text}),(0,Se.jsx)("span",{className:"aivn-pending-note",children:o.note})]},o.key))})]})};var V=require("react/jsx-runtime"),Vs="\uFF08\u7EE7\u7EED\uFF09";$a("@aivn/stage/stage.css",Mr);var Rr=Et,Ws=8e3;function Xs(a){let e=Object.entries(a).map(([t,o])=>`${t}: ${o};`).join(" ");return e===""?"":`.aivn-stage-view.stage-root.stage-root, .aivn-stage-view .stage-root.stage-root { ${e} }`}var Or=({sessionId:a})=>{let[e]=(0,S.useState)(()=>new Je),[t,o]=(0,S.useState)(0),[r,s]=(0,S.useState)(!1),[d,u]=(0,S.useState)(null),[l,h]=(0,S.useState)(!1),[L,w]=(0,S.useState)(null),[k,R]=(0,S.useState)(""),[U,m]=(0,S.useState)(!1),[P,C]=(0,S.useState)(!1),[_,K]=(0,S.useState)(!1),[H,O]=(0,S.useState)(null),[Q,J]=(0,S.useState)(null),[v,I]=(0,S.useState)({}),[ie,le]=(0,S.useState)(null),[F,$]=(0,S.useState)(0),[ce,Y]=(0,S.useState)([]),[Fe,ne]=(0,S.useState)(!1),W=(0,S.useRef)(!1),j=Mt(),[Z,Be]=(0,S.useState)(()=>typeof window>"u"?!0:Ot(window.localStorage,Rr,!0)),ue=(0,S.useRef)(null);ue.current===null&&(ue.current=new Na);let q=ue.current,A=(0,S.useRef)(!1),he=(0,S.useRef)(0),pe=(0,S.useRef)(!1),Re=(0,S.useRef)(!1),de=(0,S.useCallback)(()=>{Re.current||(Re.current=!0,requestAnimationFrame(()=>{Re.current=!1,o(p=>p+1)}))},[]);(0,S.useEffect)(()=>(q.onNotify=()=>de(),q.onControl=p=>{a&&nt("/aivn/voice",{session:a,...p}).catch(()=>{})},()=>{q.dispose(),q.onNotify=null,q.onControl=null}),[q,a,de]),(0,S.useEffect)(()=>{q.setEnabled(Z)},[q,Z]),(0,S.useEffect)(()=>{if(!a)return;let p=!1;return O(null),J(null),I({}),le(null),(async()=>{try{let M=await Er(`/aivn/play?session=${encodeURIComponent(a)}`);if(p||(O(M),I(M.theme??{}),!M.dir))return;let x=await Er(`/aivn/assets?session=${encodeURIComponent(a)}`);p||J(x)}catch(M){p||le(Ht(M))}})(),()=>{p=!0}},[a]),(0,S.useEffect)(()=>{if(!a)return;e.reset(),q.reset(),he.current=0,A.current=!1,pe.current=!1,u(null),h(!1),s(!1),Y([]),W.current=!1,ne(!1),$(M=>M+1),de();let p=new EventSource(`/aivn/stream?session=${encodeURIComponent(a)}`);return p.addEventListener("frame",M=>{let x;try{x=JSON.parse(M.data)}catch{return}if(x.seq>he.current+1&&(e.reset(),q.reset(),$(fe=>fe+1),A.current=!1,u(null),h(!1),w(null),R(""),m(!1),C(!1),he.current=x.seq-1),!(x.seq<=he.current)){if(he.current=x.seq,x.kind==="reset"){e.reset(),q.reset(),A.current=!1,u(null),h(!1),w(null),R(""),m(!1),C(!1),W.current=!0,ne(!0),$(fe=>fe+1),de();return}if(x.kind==="guide"){Y(x.items);return}if(W.current&&(W.current=!1,ne(!1)),x.kind==="voice"){x.state==="ready"&&x.url?q.handleAudio({seq:x.lineSeq,phrase:x.phrase,url:x.url}):x.state==="started"&&q.markPending(x.lineSeq,x.phrase),de();return}if(x.kind==="beat"){x.state==="start"?(q.beatStarted(),A.current=!1,u(null),h(!1),s(!0),pe.current=!1):(h(!A.current),s(!1));return}if(x.kind==="style"){I(x.theme);return}if(x.event.kind==="stop"&&(A.current=!0,u({stopType:x.event.stopType,...x.event.options?{options:x.event.options}:{},...x.event.placeholder?{placeholder:x.event.placeholder}:{}})),x.event.kind==="ending")w({id:x.event.id,...x.event.title?{title:x.event.title}:{},...x.event.subtitle?{subtitle:x.event.subtitle}:{}}),R(""),m(!1),C(!1);else if(x.event.kind==="epilogue_start")R(""),m(!1),C(!0);else if(x.event.kind==="epilogue_text"){let{delta:fe}=x.event;R(pt=>pt+fe)}else x.event.kind==="epilogue_end"&&m(!0);e.apply(x.event,x.seq),de()}}),()=>p.close()},[a,e,de]);let me=(0,S.useCallback)(async(p,M)=>{let x=p.trim();if(!x||!a)return!1;try{return await nt("/aivn/input",{session:a,text:x,...M?.silent?{silent:!0}:{}}),!0}catch(fe){return j.push(`\u6CA1\u80FD\u9001\u5230\u5267\u4F5C\u5BB6\uFF1A${Ht(fe)}`,"error"),!1}},[a,j]),ee=(0,S.useCallback)(async(p,M,x)=>{if(a)try{await nt("/aivn/direct",{session:a,action:p,text:M,...x?{from:x}:{}})}catch(fe){j.push(`\u5BFC\u6F14\u6307\u4EE4\u6CA1\u80FD\u9001\u5230\uFF1A${Ht(fe)}`,"error")}},[a,j]),g=(0,S.useCallback)(()=>{pe.current||(pe.current=!0,me(Vs,{silent:!0}).then(p=>{p||(pe.current=!1)}))},[me]),b=e.lines,T=H?.dir?H.config??null:null,N=H?.voice===!0&&T!==null;(0,S.useEffect)(()=>{!a||!N||nt("/aivn/voice",{session:a,enabled:Z}).catch(()=>{})},[a,N,Z]);let D=(0,S.useCallback)(()=>{Be(p=>{let M=!p;return typeof window<"u"&&Ut(window.localStorage,Rr,M),M})},[]),X=(0,S.useCallback)(()=>{q.unlock(),de()},[q,de]),qe=(0,S.useMemo)(()=>Object.fromEntries((T?.characters??[]).map(p=>[p.id,p.name??p.id])),[T]),Ga=(0,S.useMemo)(()=>{if(!T||!Q||!a)return null;let p=(T.characters??[]).map(M=>({...M,body:""}));return Rt(T.id,Q.index,{},Q.manifest,p,{assetUrl:M=>`/aivn/asset?session=${encodeURIComponent(a)}&path=${encodeURIComponent(`assets/${M}`)}`})},[T,Q,a]),Va=(0,S.useMemo)(()=>qt(null,b),[b,t]),_e=(0,S.useRef)(null),Ee=(0,S.useRef)({seq:null,at:0}),Wa=()=>{if(q.holdsLine())return!0;let p=_e.current;return p===null||q.voiceState(p)!=="pending"?!1:(Ee.current.seq!==p&&(Ee.current={seq:p,at:Date.now()}),Date.now()-Ee.current.at<Ws)},oe=St(e.cues,b,{live:r,resume:!0,revision:t,transcript:Va,turbo:_,resetToken:F,hold:Wa(),onLineStart:p=>q.lineStarted(p?.seq,p?.type==="say"),onFastForward:()=>q.fastForward()});_e.current=oe.current?.seq??null;let Oe=r,ft=oe.current===null||oe.shownLength>=oe.current.text.length,$e=!Oe&&oe.exhausted&&ft,je=xt({ready:$e,stopType:d?.stopType??null,isNoStop:l,continueCardOn:!1,ended:L!==null}),Ue={beatId:b.some(p=>p.type==="say")?"beat:current":null,beatNodeId:null,lineNodeId:oe.view?.seq==null?null:`line:${oe.view.seq}`,lineSeq:oe.view?.seq??null,lineText:oe.view?.text??""},Xa=[...ce.filter(p=>p.status==="pending").map(p=>({key:p.id,kind:"guide",text:p.text,note:"\u6392\u961F\u4E2D"})),...b.filter(p=>p.type==="say"&&q.voiceState(p.seq??null)==="pending").map(p=>({key:`voice:${p.key}`,kind:"voice",text:p.text,note:"\u5408\u6210\u4E2D"}))];if(!a)return(0,V.jsx)(za,{text:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u821E\u53F0\u3002"});if(ie)return(0,V.jsx)(za,{text:`\u821E\u53F0\u6CA1\u63A5\u4E0A\uFF1A${ie}`});if(!H)return(0,V.jsx)(za,{text:"\u6B63\u5728\u8FDE\u63A5\u821E\u53F0\u2026"});if(!T)return(0,V.jsx)(za,{text:`\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709 play.json\uFF0C\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A${H.dir??""}`});if(!Ga)return(0,V.jsx)(za,{text:"\u6B63\u5728\u8BFB\u53D6\u5267\u76EE\u7D20\u6750\u2026"});let ze=Xs(v);return(0,V.jsxs)("div",{className:"stage-root aivn-stage-view",style:{height:"100%",minHeight:0},children:[ze===""?null:(0,V.jsx)("style",{"data-aivn-theme":!0,children:ze}),(0,V.jsx)(At,{visual:oe.visual,playback:oe,live:r,fresh:b.length===0,names:qe,index:Ga,voiceAvailable:N,voiceOn:Z,onToggleVoice:D,busy:Oe,targets:Ue,directorBar:!0,promptAlt:"interrupt",showGenerate:!1,onView:qr,onPrompt:(p,M)=>{ee(M==="interrupt"?"interrupt":"guide",p)},onEdit:(p,M)=>{let x=Ue.lineText;ee("rewrite",x&&x!==M?`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF1A\u628A\u8FD9\u4E00\u53E5\u300C${x}\u300D\u6539\u6210\u300C${M}\u300D\uFF0C\u5176\u4F59\u7167\u65E7\u3002`:`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF0C\u8FD9\u4E00\u53E5\u6539\u6210\uFF1A${M}`,"line")},onFork:(p,M)=>{ee("rewrite",M?.instruction??"","beat")},onGenerateCg:qr,onReplay:p=>{q.replay(p)},voiceState:p=>q.voiceState(p),onUnlock:X,onTurbo:K,canContinue:je.clickToContinue,onContinue:g,ended:L!==null,overlay:oe.scrubbed||Fe?null:L&&($e||P)?(0,V.jsx)(Dt,{ending:L,summary:k,summaryPending:!U}):b.length===0?(0,V.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u5F00\u6F14",children:(0,V.jsx)("div",{className:"choices",children:(0,V.jsx)("button",{type:"button",className:"choice",onClick:()=>{me(T.opening)},children:(0,V.jsx)("span",{className:"choice-text",children:"\u5F00\u6F14"})})})}):$e?(0,V.jsx)(Tt,{stop:d,isNoStop:l,showContinue:je.showContinueCard,disabled:Oe,onChoice:p=>{me(d?.options?.[p]?.text??"")},onFree:p=>{me(p)},onContinue:g}):null}),(0,V.jsx)(Br,{items:Xa}),(0,V.jsx)(Ft,{toasts:j.toasts,onDismiss:j.dismiss})]})};function qr(){}function za({text:a}){return(0,V.jsx)("div",{className:"stage-root aivn-stage-notice",style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,color:"var(--ink, #3b3630)",fontSize:14,textAlign:"center"},children:(0,V.jsx)("span",{children:a})})}async function Er(a){let e=await fetch(a);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);return e.json()}async function nt(a,e){let t=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`${t.status} ${await t.text()}`)}function Ht(a){return a instanceof Error?a.message:String(a)}var Ks="aivn-playwriter",$s=["slots","sessions","uiSession","configForms"];function js(a){$a("dsh-aivn/host.css",Wt);let e=a,t=new Qa(a.configForms.get(Ja),a.configForms.describe());a.effect(()=>()=>t.dispose(),"dsh-aivn:config card subscription"),a.effect(()=>a.configForms.whileServed([Ja],()=>a.slots.inject("plugins.bundle.config",()=>a.slots.register({name:"plugins.bundle.config",key:"dsh-aivn",inject:()=>t.inject()},$t))),"dsh-aivn:config card"),a.slots.inject("conversation.view",()=>a.effect(()=>{let o,r=()=>{let l=e.uiSession.adapter.current.getSnapshot().key;return l===void 0?!1:e.sessions.list.getSnapshot().byId[l]?.projectionValues?.agentPreset===Ks},s=()=>{if(r()!==(o!==void 0)){if(o){o(),o=void 0;return}o=a.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"AIVN"},Or)}},d=e.uiSession.adapter.current.subscribe(s),u=e.sessions.list.subscribe(s);return s(),()=>{d(),u(),o?.(),o=void 0}},"dsh-aivn:stage view"))}
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