window.__ModuleLoader__.load({
	id: "dsh-aivn",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var xs=Object.create;var wt=Object.defineProperty;var bs=Object.getOwnPropertyDescriptor;var Ls=Object.getOwnPropertyNames;var Is=Object.getPrototypeOf,ys=Object.prototype.hasOwnProperty;var Xo=(a,e)=>()=>{try{return e||a((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},ks=(a,e)=>{for(var t in e)wt(a,t,{get:e[t],enumerable:!0})},Ko=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Ls(e))!ys.call(a,r)&&r!==t&&wt(a,r,{get:()=>e[r],enumerable:!(o=bs(e,r))||o.enumerable});return a};var vs=(a,e,t)=>(t=a!=null?xs(Is(a)):{},Ko(e||!a||!a.__esModule?wt(t,"default",{value:a,enumerable:!0}):t,a)),Cs=a=>Ko(wt({},"__esModule",{value:!0}),a);var Nl=Xo(de=>{"use strict";var wn=require("react");function Ol(a){var e="https://react.dev/errors/"+a;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+a+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ve(){}var fe={d:{f:Ve,r:function(){throw Error(Ol(522))},D:Ve,C:Ve,L:Ve,m:Ve,X:Ve,S:Ve,M:Ve},p:0,findDOMNode:null},An=Symbol.for("react.portal"),Pn=Symbol.for("react.recoverable"),El=Symbol.for("react.optimistic_key");function Tn(a,e,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:An,key:o==null?null:o===El?El:""+o,children:a,containerInfo:e,implementation:t}}var pt=wn.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function jt(a,e){if(a==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=fe;de.browser=function(a){return{$$typeof:Pn,_reason:a}};de.createPortal=function(a,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Ol(299));return Tn(a,e,null,t)};de.flushSync=function(a){var e=pt.T,t=fe.p;try{if(pt.T=null,fe.p=2,a)return a()}finally{pt.T=e,fe.p=t,fe.d.f()}};de.preconnect=function(a,e){typeof a=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,fe.d.C(a,e))};de.prefetchDNS=function(a){typeof a=="string"&&fe.d.D(a)};de.preinit=function(a,e){if(typeof a=="string"&&e&&typeof e.as=="string"){var t=e.as,o=jt(t,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,l=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;t==="style"?fe.d.S(a,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:l}):t==="script"&&fe.d.X(a,{crossOrigin:o,integrity:r,fetchPriority:l,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};de.preinitModule=function(a,e){if(typeof a=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var t=jt(e.as,e.crossOrigin);fe.d.M(a,{crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&fe.d.M(a)};de.preload=function(a,e){if(typeof a=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var t=e.as,o=jt(t,e.crossOrigin);fe.d.L(a,t,{crossOrigin:o,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};de.preloadModule=function(a,e){if(typeof a=="string")if(e){var t=jt(e.as,e.crossOrigin);fe.d.m(a,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:t,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else fe.d.m(a)};de.requestFormReset=function(a){fe.d.r(a)};de.unstable_batchedUpdates=function(a,e){return a(e)};de.useFormState=function(a,e,t){return pt.H.useFormState(a,e,t)};de.useFormStatus=function(){return pt.H.useHostTransitionStatus()};de.version="19.3.0"});var _l=Xo((Xf,Hl)=>{"use strict";function Ul(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ul)}catch(a){console.error(a)}}Ul(),Hl.exports=Nl()});var ei={};ks(ei,{apply:()=>Yn,inject:()=>Qn});module.exports=Cs(ei);var Zo=`/**
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

/**
 * \u821E\u53F0\u5DE6\u4E0A\u89D2\u7684\u5168\u5C4F\u952E\u3002
 *
 * \u821E\u53F0\u81EA\u5DF1\u7684 \`.theater-bar\` \u9876\u680F\uFF08\u9000\u51FA / \u56DE\u987E / \u4FA7\u680F\uFF09\u6CA1\u6709\u642C\u8FDB \`@aivn/stage\`\u2014\u2014\u90A3\u662F AIVN app
 * \u7684\u4E1C\u897F\uFF0C\u63D2\u4EF6\u8FD9\u8FB9\u821E\u53F0\u4E0A\u6CA1\u6709\u5B83\u7684\u843D\u70B9\uFF0C\u6240\u4EE5\u5DE6\u4E0A\u89D2\u662F\u7A7A\u51FA\u6765\u7684\u3002\u8FD9\u4E00\u679A\u5C31\u6446\u5728\u90A3\u513F\uFF0C\u4E0E\u53F3\u4E0A\u7684\u5BFC\u6F14\u680F
 * \u5206\u5217\u4E24\u4FA7\u3002
 *
 * \u5E95\u8272\u6CBF\u7528\u53F0\u8BCD\u6761\u90A3\u4E00\u5957\u6DF1\u8272\u73BB\u7483\uFF08\`--dialog-*\` \u58F0\u660E\u5728 \`.stage-root\` \u4E0A\uFF0C\u672C\u5143\u7D20\u6B63\u5728\u90A3\u68F5\u5B50\u6811\u91CC\uFF09\uFF1A
 * \u538B\u5728\u753B\u9762\u4E0A\u7684\u4E00\u5F8B\u662F\u300C\u7A97\u300D\uFF0C\u7528\u6D45\u8272\u5361\u7247\u4F1A\u8DDF\u753B\u9762\u91CC\u7684\u4EAE\u5904\u6253\u67B6\u3002
 *
 * \u51C0\u753B\u9762\u6001\uFF08HIDE\uFF09\u8DDF\u7740\u53F0\u8BCD\u6761\u4E00\u8D77\u85CF\uFF1A\u90A3\u4E00\u6001\u8981\u7684\u5C31\u662F\u53EA\u5269\u753B\u9762\u3002
 */
.aivn-fullscreen {
	position: absolute;
	z-index: 45;
	top: calc(8px + env(safe-area-inset-top, 0px));
	left: 10px;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	min-height: 40px;
	padding: 0 10px;
	border: 1px solid var(--dialog-line);
	border-radius: var(--stage-radius);
	background: var(--dialog-bg);
	box-shadow: var(--dialog-shadow);
	color: var(--dialog-ink-soft);
	font: inherit;
	font-size: 11.5px;
	letter-spacing: 0.04em;
	cursor: pointer;
	transition:
		color var(--hover-ms) ease,
		background-color var(--hover-ms) ease;
}

.aivn-fullscreen:hover {
	background: var(--dialog-hover);
	color: var(--dialog-ink);
}

.aivn-fullscreen:focus-visible {
	outline: 1px solid var(--accent);
	outline-offset: 2px;
}

.aivn-stage-view:has(.theater.bare) .aivn-fullscreen {
	display: none;
}

/**
 * \u9650\u5236\u7EA7\uFF08NSFW\uFF09\u901A\u9053\u7684\u5E38\u9A7B\u89D2\u6807\u3002
 *
 * \u6446\u5728\u5DE6\u4E0A\u89D2\u90A3\u679A\u5168\u5C4F\u952E\u7684**\u4E0B\u9762**\u4E00\u884C\uFF0C\u800C\u4E0D\u662F\u5E76\u6392\uFF1A\u90A3\u4E00\u679A\u7684\u5BBD\u5EA6\u968F\u5B57\u9762\u53D8\uFF08\u300C\u5168\u5C4F\u300D/\u300C\u9000\u51FA\u5168\u5C4F\u300D\uFF09\uFF0C
 * \u5E76\u6392\u5C31\u5F97\u8DDF\u7740\u7B97\u5B83\u591A\u5BBD\u3002\u4F4D\u7F6E\u4E0E\u957F\u76F8\u8DDF\u7740 AIVN app \u90A3\u679A\u540C\u6B3E\u6807\u8BC6\u8D70\uFF08\`@aivn/stage\` \u7684 \`.stage-modes\`
 * \u8D77\u5728 60px\u3001\`.stage-mode-nsfw\` \u662F\u4E00\u884C\u65E0\u8FB9\u6846\u65E0\u5E95\u8272\u7684\u6DE1\u75D5\uFF09\u2014\u2014\u5B83\u662F HUD\uFF0C\u4E0D\u662F\u4E00\u5757\u9762\u677F\u3002
 *
 * \u51C0\u753B\u9762\u6001\u4E0D\u85CF\u5B83\uFF1A\u5168\u5C4F\u952E\u53EF\u4EE5\u85CF\uFF08\u90A3\u662F\u4E2A\u63A7\u4EF6\uFF09\uFF0C\u8FD9\u4E00\u679A\u62A5\u7684\u662F\u72B6\u6001\uFF0C\u85CF\u4E86\u73A9\u5BB6\u5C31\u4E0D\u77E5\u9053\u6B64\u523B\u5F00\u7740\u901A\u9053\u3002
 * \`pointer-events: none\`\uFF1A\u538B\u5728\u753B\u9762\u4E0A\u7684\u4E00\u884C\u5B57\u4E0D\u8BE5\u5403\u6389\u821E\u53F0\u7684\u70B9\u51FB\uFF08\u90A3\u4E00\u4E0B\u662F\u300C\u7EE7\u7EED\u300D\uFF09\u3002
 */
.aivn-nsfw {
	position: absolute;
	z-index: 45;
	top: calc(56px + env(safe-area-inset-top, 0px));
	left: 12px;
	color: var(--dialog-ink-faint);
	font-size: 11.5px;
	font-weight: 600;
	letter-spacing: 0.12em;
	line-height: 1;
	text-shadow: var(--dialog-text-shadow);
	pointer-events: none;
}

/**
 * \u65B0\u4F1A\u8BDD\u4E0A\u7684\u300C\u5F00\u59CB\u6E38\u620F\u300D\u3002
 *
 * \u5750\u5728\u5BBF\u4E3B\u7684 Hero \u90A3\u884C\u91CC\u3001**\u7D27\u6328\u7740\u9884\u8BBE\u540D chip \u7684\u53F3\u8FB9**\uFF08\`[data-slot="conversation.hero.agentPreset"]\`
 * \u7684\u540E\u9762\u4E00\u683C\uFF09\u3002\u5B83\u5C5E\u4E8E**\u5BBF\u4E3B\u754C\u9762**\u3001\u4E0D\u5C5E\u4E8E\u821E\u53F0\uFF0C\u6240\u4EE5\u914D\u8272\u4E00\u5F8B\u8D70 \`currentColor\` \u4E0E\u900F\u660E\u5E95\uFF1A
 * \u90A3\u4E00\u884C\u8DDF\u7740\u5BBF\u4E3B\u7684\u4E3B\u9898\u8D70\uFF0C\u81EA\u5E26\u4E00\u5957\u989C\u8272\u4F1A\u5728\u6362\u76AE\u65F6\u9732\u9985\uFF1B\u4E5F\u4E0D\u53BB\u6284\u5BBF\u4E3B\u7684\u54C8\u5E0C\u7C7B\u540D\u3002
 *
 * \u63CF\u8FB9\u7528\u5F53\u524D\u8272\u3001\u6BD4\u6B63\u6587\u5C0F\u4E00\u53F7\u3001\u5706\u89D2\u80F6\u56CA\u2014\u2014\u4E0E\u5B83\u5DE6\u8FB9\u90A3\u4E2A chip \u662F\u540C\u4E00\u65CF\u7684\u5F62\u72B6\u8BED\u8A00\u3002
 */
.aivn-start-game {
	display: inline-flex;
	align-items: center;
	height: 28px;
	margin-left: 8px;
	padding: 0 12px;
	border: 1px solid currentcolor;
	border-radius: 999px;
	background: transparent;
	color: inherit;
	font: inherit;
	font-size: 12.5px;
	line-height: 1;
	white-space: nowrap;
	opacity: 0.75;
	cursor: pointer;
	transition: opacity 120ms ease;
}

.aivn-start-game:hover {
	opacity: 1;
}

.aivn-start-game:focus-visible {
	outline: 1px solid currentcolor;
	outline-offset: 2px;
}

`;function pa(a,e){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${a}"]`)!==null)return;let t=document.createElement("style");t.dataset.plugin="dsh-aivn",t.dataset.pluginCss=a,t.textContent=e,document.head.appendChild(t)}var ve=require("@deepseek-ai/dsh-client-ui-primitives"),te=require("react/jsx-runtime"),Ft="dsh-aivn",Qo=["gemini","openai","modelslab"],Pt=[{title:"P0 \xB7 \u51B3\u5B9A\u80FD\u529B\u5F00\u4E0D\u5F00",blurb:"\u4E0D\u914D\u5C31\u6CA1\u6709\u90A3\u9879\u80FD\u529B\uFF1A\u5BF9\u5E94\u7684\u5DE5\u5177\u4E0D\u6CE8\u518C\uFF0C\u4E24\u4E2A\u9884\u8BBE\u7684\u63D0\u793A\u8BCD\u91CC\u4E5F\u4E0D\u63D0\u5B83\u3002Key \u7C7B\u5B57\u6BB5\u53EA\u5199\u4E0D\u56DE\u663E\uFF0C\u7559\u7A7A = \u4FDD\u6301\u73B0\u72B6\u3002",fields:[{field:"ttsKeys",multiple:!0,label:"Fish Audio Key",hint:"\u914D\u4E86\u624D\u6709\u53F0\u8BCD\u8BED\u97F3\u4E0E list_voices\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\uFF08\u8F6E\u8BE2\u5206\u644A\u989D\u5EA6\uFF09\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_TTS_KEYS",kind:"secret"},{field:"searchKeys",multiple:!0,label:"Exa \u68C0\u7D22 Key",hint:"\u914D\u4E86\u624D\u6709 web_search\uFF1B\u591A\u628A\u7528\u9017\u53F7\u5206\u9694\u3002\u7559\u7A7A\u53EF\u8D70\u73AF\u5883\u53D8\u91CF DSH_AIVN_EXA_KEYS",kind:"secret"},{field:"imageFormat",label:"\u751F\u56FE\u63A5\u53E3\u683C\u5F0F",hint:`\u534F\u8BAE\u5F62\u72B6\uFF0C\u4E0D\u662F\u4EA7\u54C1\u540D\uFF1A${Qo.join(" / ")}`,kind:"format"},{field:"imageBaseUrl",label:"\u751F\u56FE\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u751F\u56FE\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u7B97\u914D\u597D\u751F\u56FE\u2014\u2014\u53EA\u7ED9\u5176\u4E00\u7B49\u4E8E\u6CA1\u6709",kind:"text"},{field:"imageModel",label:"\u751F\u56FE\u6A21\u578B",hint:"\u540C\u4E0A\uFF1B\u914D\u9F50\u540E\u4E24\u4E2A\u9884\u8BBE\u90FD\u62FF\u5230 generate_image / generate_asset\uFF1Bcut / import_asset \u4E0D\u95E8\u63A7\uFF0C\u6CA1\u914D\u751F\u56FE\u4E5F\u80FD\u62A0\u5E95\u4E0E\u767B\u8BB0\u5916\u90E8\u56FE",kind:"text"},{field:"imageApiKey",label:"\u751F\u56FE API Key",hint:"\u672C\u673A\u7F51\u5173\u4E0D\u6821\u9A8C\u5C31\u4E0D\u7528\u586B\uFF08\u4E0D\u5E26\u9274\u6743\u5934\uFF09",kind:"secret"},{field:"musicBaseUrl",label:"\u914D\u4E50\u63A5\u53E3\u5730\u5740",hint:"\u4E0E\u300C\u914D\u4E50\u6A21\u578B\u300D\u90FD\u7ED9\u9F50\u624D\u6709 generate_bgm\uFF08\u53EA\u6709 Gemini \u5F62\u72B6\uFF09",kind:"text"},{field:"musicModel",label:"\u914D\u4E50\u6A21\u578B",hint:"\u540C\u4E0A",kind:"text"},{field:"musicApiKey",label:"\u914D\u4E50 API Key",hint:"\u540C\u4E00\u4EFD\u7F51\u5173\u7684 Key\uFF0C\u53EF\u7559\u7A7A",kind:"secret"},{field:"shell",label:"Agent \u547D\u4EE4\u884C\uFF08bash\uFF09",hint:"\u5F00\u4E86\u624D\u7ED9\u4E24\u4E2A\u9884\u8BBE\u88C5 tool-bash\u3002bash \u662F\u9884\u8BBE\u7684\u300C\u4E00\u884C\u300D\uFF0C\u6539\u5B8C\u53EA\u5BF9**\u65B0\u5EFA**\u4F1A\u8BDD\u751F\u6548",kind:"switch"}]},{title:"P1 \xB7 \u9ED8\u8BA4\u5C31\u80FD\u7528\uFF0C\u6309\u53E3\u5473\u8C03",blurb:"\u8FD9\u4E00\u6BB5\u7684\u9ED8\u8BA4\u503C\u90FD\u662F\u6311\u8FC7\u7684\uFF0C\u6539\u4E4B\u524D\u5148\u60F3\u6E05\u695A\u4E3A\u4EC0\u4E48\u6539\u3002",fields:[{field:"ttsBaseUrl",label:"TTS \u63A5\u53E3\u5730\u5740",hint:"\u6362\u81EA\u5EFA\u7F51\u5173\u65F6\u6539",kind:"text"},{field:"ttsModel",label:"TTS \u6A21\u578B",hint:"\u6362\u6A21\u578B\u540E\u540C\u4E00\u53E5\u8BDD\u4E0D\u518D\u547D\u4E2D\u65E7\u97F3\u9891\u7F13\u5B58\uFF08\u7F13\u5B58\u952E\u542B\u6A21\u578B\uFF09",kind:"text"},{field:"ttsConcurrency",label:"TTS \u5E76\u53D1\u4E0A\u9650",hint:"\u540C\u65F6\u5408\u6210\u7684\u4E0A\u9650\uFF1A\u644A\u5F80\u8FD4\uFF0C\u53C8\u4E0D\u628A\u989D\u5EA6\u4E00\u6B21\u6253\u7A7A",kind:"number"},{field:"searchBaseUrl",label:"Exa \u63A5\u53E3\u5730\u5740",hint:"\u6362\u4EE3\u7406 / \u955C\u50CF\u65F6\u6539",kind:"text"},{field:"imageSize",label:"\u751F\u56FE\u6863\u4F4D",hint:"1K / 2K / 4K\uFF08K \u5927\u5199\uFF09\uFF0C\u6216\u5B57\u9762\u50CF\u7D20 1536x1024\uFF1Bgemini \u5F62\u72B6\u53EA\u8BA4\u6863\u4F4D",kind:"text"},{field:"imageTimeoutMs",label:"\u751F\u56FE\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u51FA\u56FE\u6162\u5C31\u8C03\u5927",kind:"number"},{field:"musicTimeoutMs",label:"\u914D\u4E50\u8D85\u65F6\uFF08\u6BEB\u79D2\uFF09",hint:"\u4E00\u9996\u66F2\u5B50\u5B9E\u6D4B\u7EA6 84 \u79D2",kind:"number"},{field:"nsfwModel",label:"\u9650\u5236\u7EA7\u4E13\u7528\u6A21\u578B",hint:"\u5267\u4F5C\u5BB6\u8FDB\u9650\u5236\u7EA7\u901A\u9053\u540E\u63A5\u624B\u5199\u6210\u4EBA\u7EC6\u8282\u7684\u6A21\u578B\u3002\u5199 provider/model \u6700\u7A33\uFF08\u5982 cpa/\u67D0\u6A21\u578B\uFF09\uFF0C\u53EA\u5199\u6A21\u578B id \u4F1A\u5728\u5DF2\u6CE8\u518C\u7684 provider \u91CC\u627E\uFF1B\u7559\u7A7A = \u4E0D\u6362\u6A21\u578B\uFF08\u53EA\u5207\u63D0\u793A\u8BCD\uFF09\u3002\u9010\u5267\u76EE\u53EF\u7528 play.json \u7684 agents.playwriter.nsfwModel \u8986\u76D6",kind:"text"},{field:"nsfwPrompt",label:"\u9650\u5236\u7EA7\u8865\u5145\u63D0\u793A\u8BCD",hint:"\u62FC\u5728\u9650\u5236\u7EA7\u521B\u4F5C\u6307\u5F15\u540E\u9762\u7684\u8865\u5145\u53E3\u5F84\u3002\u9010\u5267\u76EE\u53EF\u7528 play.json \u7684 agents.playwriter.nsfwPrompt \u8986\u76D6",kind:"text"}]}],ws=Pt.flatMap(a=>a.fields.map(e=>e.field)),Jo=new Set(["ttsKeys","searchKeys","imageApiKey","musicApiKey"]),As=[{label:"\u8BED\u97F3",hint:"\u53F0\u8BCD\u8BED\u97F3\u4E0E\u97F3\u8272\u5E93",on:(a,e)=>e.has("ttsKeys")},{label:"\u68C0\u7D22",hint:"web_search",on:(a,e)=>e.has("searchKeys")},{label:"\u751F\u56FE",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>At(a.imageBaseUrl)&&At(a.imageModel)},{label:"\u914D\u4E50",hint:"\u5730\u5740\u4E0E\u6A21\u578B\u90FD\u7ED9\u9F50\u624D\u7B97",on:a=>At(a.musicBaseUrl)&&At(a.musicModel)},{label:"\u547D\u4EE4\u884C",hint:"\u53EA\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548",on:a=>a.shell===!0}];function At(a){return typeof a=="string"&&a.trim()!==""}var Ps={unavailable:"\u5BBF\u4E3B\u6CA1\u6709\u5728\u670D\u52A1 dsh-aivn \u7684\u914D\u7F6E\u547D\u540D\u7A7A\u95F4\u3002",readOnly:"\u8FD9\u4EFD\u90E8\u7F72\u7684\u914D\u7F6E\u662F\u53EA\u8BFB\u7684\u3002",saveFailed:"\u6CA1\u5B58\u4E0A\uFF1A\u5BBF\u4E3B\u62D2\u7EDD\u4E86\u8FD9\u6B21\u5199\u5165\uFF08\u53EF\u80FD\u662F\u522B\u5904\u5148\u6539\u8FC7\uFF09\u3002",save:"\u4FDD\u5B58",saving:"\u4FDD\u5B58\u4E2D\u2026"};function Ts(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>{let t=e.trim();return Qo.includes(t)?{kind:"set",value:t}:void 0}}}function Fs(a){return{field:a,format:e=>e===!0?"true":"false",parse:e=>({kind:"set",value:e==="true"})}}function Ms(a,e){return a==="number"?Bs(e):a==="switch"?Fs(e):a==="format"?Ts(e):Ds(e)}function Ds(a){return{field:a,format:e=>typeof e=="string"?e:"",parse:e=>e===""?{kind:"clear"}:{kind:"set",value:e}}}function Bs(a){return{field:a,format:e=>typeof e=="number"?String(e):"",parse:e=>{if(e==="")return{kind:"clear"};let t=Number(e);return Number.isFinite(t)?{kind:"set",value:t}:void 0}}}var Tt=class{constructor(e,t){this.scope=e;this.describe=t;let o=Pt.flatMap(l=>l.fields).filter(l=>!Jo.has(l.field)).map(l=>Ms(l.kind,l.field)),r=Pt.flatMap(l=>l.fields).filter(l=>Jo.has(l.field)).map(l=>({field:l.field,write:s=>this.writeSecret(l,s)}));this.form=new ve.SettingsFormModel(e,o,r),this.store=this.form.bind(()=>this.projection()),this.unsubscribeMirror=t.subscribe(()=>this.store.set(this.projection()))}scope;describe;form;store;unsubscribeMirror;async writeSecret(e,t){if(t.trim()==="")return!0;let o=e.multiple===!0?Rs(t):t.trim();return this.scope.mutate([{op:"set",path:[e.field],value:o}])}clearSecret(e){return this.scope.mutate([{op:"unset",path:[e]}])}projection(){let e=this.scope.getSnapshot().value??{},t=this.describe.getSnapshot().view?.namespaces.find(l=>l.ns===Ft),o=new Set((t?.secrets??[]).filter(l=>l.set).map(l=>l.path[0]??"").filter(l=>l!=="")),r={};for(let l of ws)r[l]={...this.form.field(l),configured:o.has(l)};return{...this.form.shell(),fields:r,lights:As.map(l=>({label:l.label,hint:l.hint,on:l.on(e,o)}))}}inject(){return{hooks:{aivnCard:this.store},...this.form.actions(),clearSecret:e=>{this.clearSecret(e)}}}dispose(){this.unsubscribeMirror(),this.form.dispose()}};function Rs(a){return a.split(/[\s,，]+/).map(e=>e.trim()).filter(e=>e!=="")}var qs="Fish / Exa Key\u3001\u751F\u56FE\u4E0E\u914D\u4E50\u540E\u7AEF\u3001\u547D\u4EE4\u884C\u5F00\u5173",Yo=a=>{let e=a.useAivnCard(o=>o);if(a.view==="summary")return(0,te.jsx)(te.Fragment,{children:qs});let t=!e.writable;return(0,te.jsxs)(ve.SettingsForm,{labels:Ps,state:e,onSave:a.save,onDiscard:a.discard,children:[(0,te.jsxs)("p",{className:"aivn-config-lights",children:[e.lights.map(o=>(0,te.jsxs)("span",{title:o.hint,"data-on":o.on?"true":"false",children:[o.label," ",o.on?"\u5F00":"\u5173"]},o.label)),(0,te.jsx)("span",{className:"aivn-config-lights-note",children:"\uFF08\u6309\u5F53\u524D\u914D\u7F6E\u7B97\uFF1B\u73AF\u5883\u53D8\u91CF\u91CC\u7684 Key \u4E0D\u5728\u8FD9\u91CC\u663E\u793A\uFF09"})]}),Pt.map(o=>(0,te.jsxs)("section",{children:[(0,te.jsx)("h4",{children:o.title}),(0,te.jsx)("p",{children:o.blurb}),o.fields.map(r=>(0,te.jsx)(Es,{field:r,state:e.fields[r.field],disabled:t,edit:a.edit,resetField:a.resetField,clearSecret:a.clearSecret},r.field))]},o.title))]})};function Es(a){let{field:e,state:t,disabled:o}=a;return e.kind==="secret"?(0,te.jsxs)("div",{className:"aivn-config-secret",children:[(0,te.jsx)(ve.SettingsSecretField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,text:t.text,configured:t.configured,stateLabel:t.configured?"\u5DF2\u914D\u7F6E":"\u672A\u914D\u7F6E",disabled:o,onEdit:r=>a.edit(e.field,r)}),t.configured?(0,te.jsx)("button",{type:"button",disabled:o,onClick:()=>a.clearSecret(e.field),children:"\u6E05\u9664\u5DF2\u5B58 Key"}):null]}):e.kind==="switch"?(0,te.jsxs)("div",{className:"aivn-config-switch",children:[(0,te.jsx)(ve.Switch,{checked:t.text==="true",disabled:o,label:e.label,onChange:r=>a.edit(e.field,r?"true":"false")}),(0,te.jsx)("p",{children:e.hint})]}):(0,te.jsx)(ve.SettingsValueField,{id:`aivn-config-${e.field}`,label:e.label,hint:e.hint,overriddenLabel:"\u5DF2\u6539",resetLabel:"\u6062\u590D\u9ED8\u8BA4",invalidLabel:e.kind==="number"?"\u8981\u4E00\u4E2A\u6570\u5B57":"\u53D6\u503C\u4E0D\u5BF9",numeric:e.kind==="number",disabled:o,text:t.text,overridden:t.overridden,invalid:t.invalid,onEdit:r=>a.edit(e.field,r),onReset:()=>a.resetField(e.field)})}var Os="AIVN",Ns="aivn-playwriter",er="dsh-aivn-start-game",Us="\u5F00\u59CB\u6E38\u620F",ar="\u5F00\u59CB\u6E38\u620F\uFF1A\u628A START \u6295\u7ED9\u5267\u4F5C\u5BB6\uFF0C\u5E76\u5207\u5230\u821E\u53F0",Hs='[data-slot="conversation.hero.agentPreset"]',_s="\uFF08\u6E38\u620F\u5F00\u59CB\uFF0C\u8BF7\u6F14\u51FA\u7B2C\u4E00\u8F6E\uFF09";function tr(a){if(typeof document>"u")return()=>{};let e=new Map,t=null,o=null,r=null,l=new Map,s=()=>a.uiSession.adapter.current.getSnapshot().key,d=y=>y!==void 0&&a.sessions.list.getSnapshot().byId[y]?.projectionValues?.agentPreset===Ns,c=()=>document.querySelector(Hs),m=()=>c()?.closest("[data-chain-overlay-fallback]")??c()?.parentElement??null,p=()=>document.querySelector("[data-conversation-tabs]")!==null,x=()=>[...document.querySelectorAll('[role="tab"]')].find(y=>(y.textContent??"").trim()===Os)??null,L=()=>document.getElementById(er),R=y=>{let I=l.get(y);return I!==void 0?I:(fetch(`/aivn/play?session=${encodeURIComponent(y)}`).then(w=>w.ok?w.json():null).then(w=>{let z=w?.config?.opening?.trim();z&&(l.set(y,z),k())}).catch(()=>{}),_s)},E=async y=>{try{return(await fetch("/aivn/input",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session:y,text:R(y)})})).ok}catch{return!1}},q=y=>{e.set(y,Date.now()+9e4),window.setTimeout(()=>{e.get(y)!==void 0&&(e.delete(y),k())},9e4),E(y).then(I=>{I||e.delete(y),k()})},h=y=>{let I=document.createElement("button");return I.id=er,I.type="button",I.className="aivn-start-game",I.textContent=Us,I.title=ar,I.setAttribute("aria-label",ar),I.addEventListener("click",w=>{w.stopPropagation(),q(y)}),I},C=()=>{let y=m();if(!(y===t&&(o!==null||r!==null))){if(o?.disconnect(),o=null,r?.disconnect(),r=null,t=y,y!==null){o=new MutationObserver(()=>k()),o.observe(y,{childList:!0,subtree:!0});return}s()!==void 0&&document.body!==null&&(r=new MutationObserver(()=>k()),r.observe(document.body,{childList:!0,subtree:!0}))}},k=()=>{C();let y=s(),I=L();if(y===void 0||!d(y)){I?.remove();return}let w=e.get(y);w!==void 0&&(Date.now()>w?e.delete(y):p()&&(e.delete(y),x()?.click()));let z=c();if(z===null){I?.remove();return}let v=I??h(y);v.previousElementSibling!==z&&z.after(v)},N=a.uiSession.adapter.current.subscribe(k),W=a.sessions.list.subscribe(k);return k(),()=>{N(),W(),o?.disconnect(),o=null,r?.disconnect(),r=null,t=null,e.clear(),l.clear(),L()?.remove()}}var P=require("react");var n=require("react/jsx-runtime"),T=require("react");var zs=["top-left","top-right","bottom-left","bottom-right","center"];var Mt="center";function Dt(a){return typeof a=="string"&&zs.includes(a)}var to="fade";function or(a){return a==="fade"?"#000":a==="fade-white"?"#fff":null}var Vs={black:"#000000",white:"#ffffff"},Gs=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;function Re(a){let e=a.trim(),t=Vs[e.toLowerCase()];return t!==void 0?t:Gs.test(e)?e:null}function rr(a){return Ws(a)>.35?"#000000":"#ffffff"}function Ws(a){let e=a.replace("#",""),t=e.length===3?[...e].map(r=>r+r).join(""):e,o=r=>{let l=Number.parseInt(t.slice(r,r+2),16)/255;return l<=.03928?l/12.92:((l+.055)/1.055)**2.4};return .2126*o(0)+.7152*o(2)+.0722*o(4)}var ga="black",$s="none";function Bt(a){return typeof a=="string"&&(sr(a)||Re(a)!==null)}function Rt(a){return typeof a=="string"&&Re(a)!==null}function lr(a,e){let t=e!==void 0?Re(e):null;if(a!==void 0&&sr(a))return{background:null,ink:t};let o=(a!==void 0?Re(a):null)??Re(ga);return{background:o,ink:t??rr(o)}}function sr(a){return a.trim().toLowerCase()===$s}function qt(a){if(a===void 0)return null;let e=a.trim();if(e==="")return null;let t=Re(e);return t!==null?{kind:"color",color:t}:{kind:"asset",id:e}}var Ks=["full","half","square"];function Zs(a){return typeof a=="string"&&Ks.includes(a)}var Et="full",Js={bust:"half"};function oo(a){if(Zs(a))return a;if(typeof a=="string")return Js[a]}var Qs=["small","normal","large","huge"];function Ys(a){return typeof a=="string"&&Qs.includes(a)}var ma="normal";function Ot(a){return Ys(a)?a:void 0}var en=["left","center","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"];function an(a){return typeof a=="string"&&en.includes(a)}var tn={l:"left",c:"center",r:"right"};function on(a,e){return a<=0?[]:(a===2?["left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right","center"]:["center","left","right","far-left","far-right","edge-left","edge-right","bleed-left","bleed-right"]).filter(o=>!e.has(o)).slice(0,a)}function Nt(a,e=new Map){let t=new Map,o=a.filter(s=>!e.has(s)),r=new Set;for(let[s,d]of e)a.includes(s)&&r.add(d);let l=on(o.length,r);o.forEach((s,d)=>{t.set(s,l[d]??"center")});for(let[s,d]of e)a.includes(s)&&t.set(s,d);return t}function nr(a){if(a===void 0)return null;let e=a.trim().toLowerCase();return e===""?null:an(e)?e:tn[e]??null}var rn={full:{small:{landscape:{top:68,height:32},portrait:{top:66,height:34}},normal:{landscape:{top:18,height:132},portrait:{top:16,height:102}},large:{landscape:{top:14,height:168},portrait:{top:13,height:130}},huge:{landscape:{top:10,height:232},portrait:{top:10,height:178}}},half:{small:{landscape:{top:70,height:30},portrait:{top:68,height:32}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:13,height:126},portrait:{top:12,height:118}},huge:{landscape:{top:8,height:172},portrait:{top:8,height:156}}},square:{small:{landscape:{top:72,height:28},portrait:{top:70,height:30}},normal:{landscape:{top:18,height:90},portrait:{top:16,height:92}},large:{landscape:{top:12,height:130},portrait:{top:11,height:122}},huge:{landscape:{top:8,height:184},portrait:{top:8,height:164}}}};function ur(a,e,t="bottom",o,r){let l=rn[oo(a)??Et][Ot(e)??ma];return{landscape:ir(l.landscape,e,t,o,r),portrait:ir(l.portrait,e,t,o,r)}}var ro=1920;function ln(a,e){return e===void 0||!Number.isFinite(e)||e<=0?0:Math.min(e,ro)/ro*a}var sn=4;function nn(a){return a===void 0||!Number.isFinite(a)||a<=0?1:Math.min(ro/a,sn)}function ir(a,e,t,o,r){let l=(Ot(e)??ma)==="small",d=t==="center"?"center":t==="top"?"top center":l?"bottom center":"top center",c=dr(a.height*nn(r)),m;return t==="center"?m=50-c/2:t==="top"?m=0:l?m=100-c:m=a.top-ln(c,o),{top:dr(m),height:c,origin:d}}function dr(a){return Math.round(a*100)/100}var dn=["nudge","stagger","jump","nod","bow","turn","shake","sway"];function Ut(a){return typeof a=="string"&&dn.includes(a)}function cr(a){if(typeof a!="string")return null;let e=a.trim().toLowerCase();return Ut(e)?`sprite-act-${e}`:null}function fr(a,e,t){let o=e.trim(),r={},l=s=>{s&&(s.framing&&(r.framing=s.framing),s.stature&&(r.stature=s.stature),s.anchor&&(r.anchor=s.anchor),s.figureTop!==void 0&&(r.figureTop=s.figureTop),s.figureHeight!==void 0&&(r.figureHeight=s.figureHeight),s.title&&(r.title=s.title))};return l(a[o]),t!==void 0&&t.trim()!==""&&l(a[`${o}/${t.trim()}`]),r}var un=[{from:null,to:"pending",cause:"generate-requested"},{from:null,to:"draft",cause:"candidate-produced"},{from:"pending",to:"draft",cause:"generation-succeeded"},{from:"pending",to:"failed",cause:"generation-failed"},{from:"draft",to:"adopted",cause:"commit"},{from:"adopted",to:"adopted",cause:"commit"},{from:"pending",to:"adopted",cause:"commit"},{from:"draft",to:"expired",cause:"draft-retention-elapsed"}],$i=new Set(un.map(a=>`${a.from??""}>${a.to}`));function pr(a,e={}){let t=e.sprite?.trim();return t||a}var cn=/\[[^[\]\n]{1,80}\]/g;function Ht(a){let e=a.lastIndexOf("[");return(e>=0&&!a.includes("]",e)&&!a.slice(e).includes(`
`)?a.slice(0,e):a).replace(cn,"")}function _t(a,e=!1){return e?"\u8FD8\u6CA1\u5F00\u6F14\u2014\u2014\u6309\u753B\u9762\u4E0A\u7684\u300C\u5F00\u6F14\u300D\u5F00\u59CB\u3002":a?"\u5267\u4F5C\u5BB6\u6B63\u5728\u843D\u7B14\u2026":"\uFF08\u70B9\u51FB\u5F00\u59CB\uFF09"}function lo(a){return a.hasView?{name:a.viewName,text:a.shown}:{name:null,text:_t(a.live)}}function so(a){return a.hold?!1:a.nextIsPlayerInput?(!a.hasCurrent||a.currentComplete)&&a.cursor<a.cueCount:!a.live||a.auto?!1:!a.hasCurrent&&a.cursor<a.cueCount}function no(a){return a.ended||!a.ready?!1:a.stopType==="pause"?!0:a.isNoStop&&a.stopType===null}function zt(a){let e=[],t=0;for(let o of a.split(`
`))t+=o.length,o.trim()!==""&&e.push(t),t+=1;return e.length>0?e:[a.length]}function gr(a,e){if(a.type!=="title"||a.mode!=="lines")return a.text.length;let t=zt(a.text),o=Math.min(Math.max(e,0),t.length-1);return t[o]??a.text.length}function ha(a){return a.type!=="title"||a.mode!=="lines"?0:Math.max(0,zt(a.text).length-1)}function fn(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:a.nodeId??null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"||a.type==="title"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:a.nodeId??null}}function xa(a){let{cues:e,lines:t,transcript:o,current:r,view:l,viewLength:s,shownLength:d,scrubbed:c}=a,m=a.cursor??e.length,p=new Map;for(let F of t)p.set(F.key,F);let x=1,L=null,R=null,E=!1,q=new Map;for(let F=0;F<Math.min(m,e.length);F+=1){let V=e[F];if(V.kind==="scene"){let D=V.bg?.trim()||null,K=D!==null&&D!==R;(V.clear===!0||K)&&E&&(x+=1,E=!1),V.clear===!0&&D===null?(R=null,L=null):D!==null&&(R=D,L=qt(D)?.kind==="color"?null:D);continue}if(V.kind==="line"){let D=p.get(V.lineKey);if(D?.type==="title"){E&&(x+=1,E=!1);let K=D.text.split(`
`).find(Z=>Z.trim()!=="")?.trim();K&&(L=K);continue}E=!0,q.set(V.lineKey,{pageNo:x,scene:L})}}if(m===0&&r===null&&!c)return{scene:L,pageNo:1,entries:[]};let h=-1;if(r){for(let F=o.length-1;F>=0;F-=1)if(o[F].key===r.key){h=F;break}}let C;r?h>=0?C=o.slice(0,h+1):r.type==="title"?C=[...o]:C=[...o,fn(r)]:C=[...o];let k=[],N=1,W=L,y=!1;for(let F of C){if(F.type==="title"){!q.has(F.key)&&y&&(N+=1,y=!1);let D=F.text.split(`
`).find(K=>K.trim()!=="")?.trim();D&&(W=D);continue}let V=q.get(F.key);V&&(N=V.pageNo,W=V.scene),y=!0,k.push({entry:F,pageNo:N,scene:W})}if(k.length===0)return{scene:L,pageNo:x,entries:[]};let I=l?.key??r?.key??null,w=k[k.length-1].pageNo,z=k[k.length-1].scene??L;if(c&&I){for(let F=k.length-1;F>=0;F-=1)if(k[F].entry.key===I){w=k[F].pageNo,z=k[F].scene??L;break}}let v=k.filter(F=>F.pageNo===w),oe=v.map((F,V)=>{let D=F.entry,K=I!==null?D.key===I:V===v.length-1,Z=D.text;return!c&&K?Z=D.text.slice(0,s):c&&r&&D.key===r.key&&(Z=D.text.slice(0,d)),{key:D.key,kind:D.kind,type:D.type==="say"||D.type==="thought"?D.type:"narrate",actorId:D.actorId,...D.nameOverride?{nameOverride:D.nameOverride}:{},text:Z,seq:D.seq,nodeId:D.nodeId,isCurrent:K}});return{scene:z,pageNo:w,entries:oe}}var pn=0,ba=class{lines=[];cues=[];openKey=null;scene="";reset(){this.lines.length=0,this.cues.length=0,this.openKey=null,this.scene=""}replaceText(e,t){let o=this.lines.find(r=>r.seq===e);return o?(mr(o,t),!0):!1}apply(e,t){let o=()=>`l${pn+=1}`;switch(e.kind){case"scene":{this.openKey=null,this.scene=e.bg??this.scene,this.lines.push({key:o(),type:"scene",seq:t,text:[e.bg,e.bgm,e.ambient].filter(Boolean).join(" \xB7 "),raw:""}),this.cues.push({key:o(),kind:"scene",bg:e.bg,bgm:e.bgm,ambient:e.ambient,bgmVolume:e.bgm_volume,ambientVolume:e.ambient_volume,transition:e.transition,...e.clear===!0?{clear:!0}:{}});return}case"sfx":this.cues.push({key:o(),kind:"sfx",src:e.src,volume:e.volume});return;case"cg":this.cues.push({key:o(),kind:"cg",id:e.id,caption:e.caption});return;case"fx":this.cues.push({key:o(),kind:"fx",effect:e.effect,verb:e.verb,...e.value?{value:e.value}:{}});return;case"actor":this.cues.push({key:o(),kind:"actor",id:e.id,pos:e.pos,variant:e.variant,shot:e.shot,anchor:e.anchor,keepVisible:e.keepVisible,action:e.action,leave:e.leave});return;case"preload_asset":this.cues.push({key:o(),kind:"preload",id:e.id,type:e.type});return;case"say_start":{let r={key:o(),type:"say",actorId:e.id,...e.name?{nameOverride:e.name}:{},seq:t,nodeId:e.nodeId,text:"",raw:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"narrate_start":{let r={key:o(),type:"narrate",seq:t,nodeId:e.nodeId,text:"",raw:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"thought_start":{let r={key:o(),type:"thought",actorId:e.id,seq:t,nodeId:e.nodeId,text:"",raw:""};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"title_start":{let r={key:o(),type:"title",align:e.align,mode:e.mode,bg:e.bg,...e.ink?{ink:e.ink}:{},seq:t,nodeId:e.nodeId,text:"",raw:"",closed:!1};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=r.key;return}case"say_text":case"narrate_text":case"thought_text":case"title_text":{let r=this.lines.at(-1);r&&r.key===this.openKey&&mr(r,r.raw+e.delta);return}case"title_end":{let r=this.lines.at(-1);r&&r.key===this.openKey&&(r.closed=!0),this.openKey=null;return}case"say_end":case"narrate_end":case"thought_end":this.openKey=null;return;case"player_input":{let r={key:o(),type:"input",actorId:"player",seq:t,text:e.text,raw:e.text};this.lines.push(r),this.cues.push({key:o(),kind:"line",lineKey:r.key}),this.openKey=null;return}case"stop":return;case"ending":return}}};function La(a,e){return e?a[e]??(e==="player"?"\u4F60":e):""}function mr(a,e){a.raw=e,a.text=Ht(e)}var B=require("react");function br(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(l=>l.key===r.lineKey)?.nodeId===t)return o}return-1}function Lr(a,e,t){for(let o=0;o<a.length;o+=1){let r=a[o];if(r.kind==="line"&&e.find(l=>l.key===r.lineKey)?.seq===t)return o}return-1}function Ir(a,e,t){let o=t.nodeId?br(a,e,t.nodeId):typeof t.seq=="number"?Lr(a,e,t.seq):-1;if(o<0)return{cueIndex:-1,shownLength:0};let r=a[o];if(r.kind!=="line")return{cueIndex:o,shownLength:0};let l=e.find(d=>d.key===r.lineKey),s=t.offset??t.len??0;return{cueIndex:o,shownLength:Math.min(s,l?.text.length??0)}}function gn(){return{camera:{},screen:{}}}function mn(){return{resolvedPos:"center",keepVisible:!1,variant:null,shot:null,anchor:null,action:null,actionSeq:0,orderSeq:0}}function yr(a,e){let t=!!e.leave||e.action==="exit"||e.action==="leave",o=a[e.id],r=o&&!o.leaving?o.orderSeq:Math.max(0,...Object.values(a).map(m=>m.orderSeq||0))+1,l=t?o?{...a,[e.id]:{...o,leaving:!0}}:a:{...a,[e.id]:{...o??mn(),pos:nr(e.pos)??o?.pos,variant:e.variant??o?.variant??null,shot:e.shot??o?.shot??null,anchor:e.anchor??o?.anchor??null,keepVisible:e.keepVisible??o?.keepVisible??!1,action:Ut(e.action)?e.action:null,actionSeq:Ut(e.action)?(o?.actionSeq??0)+1:o?.actionSeq??0,orderSeq:r,leaving:!1}},s=new Map;for(let[m,p]of Object.entries(l))p.pos&&!p.leaving&&s.set(m,p.pos);let d=Object.keys(l).filter(m=>!l[m].leaving),c=Nt(d,s);return Object.fromEntries(Object.entries(l).map(([m,p])=>[m,{...p,resolvedPos:p.leaving?p.resolvedPos:c.get(m)??"center"}]))}function Wt(a,e){let t=a?.actorId;return t&&e[t]?t:null}var hn=6e5;function kr(a){return a!=null&&a>0?a:hn}var ta={bg:null,bgm:null,ambient:null,bgTransition:null,fx:gn(),cg:null,sprites:{},pending:{}},xn=new Set(["none",""]);function io(a,e){return e===void 0?a:xn.has(e.trim().toLowerCase())?null:e}function uo(a,e){switch(e.kind){case"scene":{let t=e.bg!==void 0&&e.bg!==a.bg;return{...a,bg:e.bg??a.bg,bgTransition:t?{name:e.transition??to,seq:(a.bgTransition?.seq??0)+1,from:a.bg}:a.bgTransition,cg:e.bg?null:a.cg,sprites:e.clear===!0?{}:a.sprites}}case"cg":return{...a,cg:{id:e.id,caption:e.caption}};case"actor":return{...a,cg:null,sprites:yr(a.sprites,e)};case"fx":return bn(a,e);default:return a}}function Vt(a,e,t){let o=a??{value:"",seq:0,on:!1};if(e==="off")return{...o,on:!1};let r=t||o.value;return e==="trigger"?{...o,value:r,seq:o.seq+1}:{...o,value:r,on:!0}}function bn(a,e){let t=a.fx,{verb:o}=e,r=e.value??"";switch(e.effect){case"flash":return{...a,fx:{...t,screen:{...t.screen,flash:Vt(t.screen.flash,o,r||"white")}}};case"shake":return{...a,fx:{...t,camera:{...t.camera,shake:Vt(t.camera.shake,o,r||"light")}}};case"letterbox":return{...a,fx:{...t,screen:{...t.screen,letterbox:Vt(t.screen.letterbox,o,"")}}};case"vignette":return{...a,fx:{...t,screen:{...t.screen,vignette:Vt(t.screen.vignette,o,"")}}};default:return a}}function Gt(a,e){let t=uo(a,e);switch(e.kind){case"scene":return{...t,bgm:io(t.bgm,e.bgm),ambient:io(t.ambient,e.ambient),bgmVolume:e.bgmVolume??t.bgmVolume,ambientVolume:e.ambientVolume??t.ambientVolume};case"preload":return e.type==="sprite"?t:{...t,pending:{...t.pending,[e.id]:{type:e.type,at:Date.now()}}};default:return t}}function oa(a){if(!Object.values(a.sprites).some(o=>o.leaving||o.action)&&a.bgTransition===null)return a;let t={};for(let[o,r]of Object.entries(a.sprites))r.leaving||(t[o]=r.action?{...r,action:null}:r);return{...a,bgTransition:null,sprites:t}}function vr(a,e,t={}){let o=ta;for(let r=0;r<e;r+=1)o=uo(o,a[r]);return t.settle===!1?o:oa(o)}function Cr(a,e,t){let o=e?t?.get(e):void 0;return o?{...a,cg:{id:o}}:a}function Sr(a,e,t){return t?a?.nodeId??null:e?.nodeId??a?.nodeId??null}function wr(a,e,t){let o=l=>{for(let s=0;s<a.length;s+=1){let d=a[s];if(d.kind==="line"&&d.lineKey===l)return s}return-1},r=e[t];if(!r)return null;if(r.kind==="line"){let l=o(r.key);return l<0?null:l}for(let l=t+1;l<e.length;l+=1){let s=e[l];if(s.kind!=="line")continue;let d=o(s.key);return d<0?null:d}return a.length}function hr(a,e){for(let t=a.length-1;t>=0;t-=1)if(a[t].key===e)return t;return-1}function Ln(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="say"||a.type==="narrate"||a.type==="thought"||a.type==="title"?a.type:"narrate",actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,seq:a.seq??null,nodeId:null,...a.type==="title"&&a.align?{align:a.align}:{},...a.type==="title"&&a.bg?{bg:a.bg}:{},...a.type==="title"&&a.ink?{ink:a.ink}:{}}}var In=new Set(["\u3002","\uFF01","\uFF1F","\u2026","\u2014","\u300D","\u300F"]),yn=new Set(["\uFF0C","\u3001","\uFF1B","\uFF1A","\uFF09",".",",","!","?",";"]),Ia=null;function xr(){let a=Date.now();if(Ia&&a-Ia.at<250)return Ia.value;let e=getComputedStyle(document.documentElement),t=(o,r)=>{let l=Number.parseInt(e.getPropertyValue(o),10);return Number.isFinite(l)&&l>=0?l:r};return Ia={at:a,value:{char:t("--type-ms",35),short:t("--pause-short-ms",120),long:t("--pause-long-ms",240)}},Ia.value}function kn(a,e){let t=a[e-1];if(!t)return xr().char;let o=xr();return In.has(t)?o.char+o.long:yn.has(t)?o.char+o.short:o.char}function co(a,e,t){let[o,r]=(0,B.useState)(ta),[l,s]=(0,B.useState)(null),[d,c]=(0,B.useState)(0),[m,p]=(0,B.useState)(0),[x,L]=(0,B.useState)(!1),[R,E]=(0,B.useState)(null),[q,h]=(0,B.useState)(null),C=(0,B.useRef)(0),k=(0,B.useRef)(!t.resume),N=(0,B.useRef)(t.resumeAfterReset===!0),W=(0,B.useRef)(e);W.current=e;let y=t.transcript,I=(0,B.useRef)(y);I.current=y;let w=(0,B.useRef)({});w.current={onLineStart:t.onLineStart,onFastForward:t.onFastForward};let z=(0,B.useRef)(t.resumeAt??null);(0,B.useLayoutEffect)(()=>{t.resumeAt&&(z.current=t.resumeAt)},[t.resumeAt]);let v=l?W.current.find(g=>g.key===l)??null:null,oe=t.turbo??!1,F=l?hr(y,l):-1,V=q!==null?y[q]??null:v?Ln(v):null,D=q!==null,K=Sr(V,v,D),Z=(0,B.useRef)(F);Z.current=F;let he=(0,B.useCallback)(g=>{h(H=>{let A=I.current,M=Z.current>=0?Z.current:A.length-1,Q=Math.max(0,Math.min((H??M)+g,M));return Q>=M?null:Q})},[]),se=(0,B.useCallback)(()=>{let g=[],H=()=>{r(A=>{let M=oa(A);for(let Q of g)M=Gt(M,Q);return M})};for(;;){let A=a[C.current];if(!A)break;if(C.current+=1,A.kind==="line"){H();let M=W.current.find(Q=>Q.key===A.lineKey)??null;s(A.lineKey),p(0),c(M?.type==="input"?M.text.length:0),w.current.onLineStart?.(M);return}if(A.kind==="sfx"){E({key:A.key,src:A.src,volume:A.volume});continue}g.push(A)}g.length>0&&H()},[a]),J=v?gr(v,m):0,U=v!==null&&d>=J,ue=v===null||U,ge=k.current&&a.length<=C.current&&(v===null||U),O=(0,B.useCallback)(()=>{if(!ue){c(J),w.current.onFastForward?.();return}if(v?.type==="title"){if(v.closed!==!0)return;if(m<ha(v)){p(m+1);return}s(null),c(0),p(0),se();return}se()},[ue,v,m,J,se]);(0,B.useEffect)(()=>{if(!v||d>=J)return;if(oe){v.type==="title"&&p(ha(v)),c(v.text.length),w.current.onFastForward?.();return}let g=setTimeout(()=>c(H=>H+1),kn(v.text,d));return()=>clearTimeout(g)},[v,d,J,oe]),(0,B.useEffect)(()=>{if(!oe||q!==null||v&&d<J||C.current>=a.length)return;let g=setTimeout(()=>se(),30);return()=>clearTimeout(g)},[oe,q,v,d,J,a,se,t.revision]),(0,B.useEffect)(()=>{if(!x||oe||t.hold||v?.type==="title")return;if(!v){if(C.current>=a.length)return;let M=setTimeout(()=>se(),400);return()=>clearTimeout(M)}if(!U||!a[C.current])return;let H=Math.min(900+v.text.length*55,3200),A=setTimeout(()=>se(),H);return()=>clearTimeout(A)},[x,v,U,a,se,t.revision,t.hold,oe]);let Ae=(0,B.useRef)(t.resetToken??0);(0,B.useLayoutEffect)(()=>{let g=t.resetToken??0;g!==Ae.current&&(Ae.current=g,C.current=0,s(null),c(0),p(0),h(null),r(ta),k.current=!1,N.current=t.resumeAfterReset===!0,z.current=t.seekTo??null)},[t.resetToken,t.resumeAfterReset,t.seekTo]),(0,B.useLayoutEffect)(()=>{if(a.length<C.current){C.current=0,s(null),c(0),p(0),h(null),r(ta);return}if(!k.current&&a.length>0){k.current=!0;let g=z.current??t.resumeAt??null;z.current=null;let H=g?Ir(a,W.current,g):null,A=H?.cueIndex??-1;if(H&&A>=0){let $=ta;for(let G=0;G<=A;G+=1)$=Gt($,a[G]);r(oa($));let le=a[A];if(C.current=A+1,le.kind==="line"){s(le.lineKey);let G=W.current.find(Ze=>Ze.key===le.lineKey);G?.type==="title"?(c(G.text.length),p(ha(G))):c(H.shownLength)}return}let M=ta;for(let $=0;$<a.length;$+=1)M=Gt(M,a[$]);r(oa(M)),C.current=a.length;let Q=null;for(let $ of a)$.kind==="line"&&(Q=$.lineKey);if(Q&&N.current){s(Q);let $=W.current.find(le=>le.key===Q);$?.type==="title"?(c($.text.length),p(ha($))):c($?.text.length??0)}}},[t.revision,a]),(0,B.useEffect)(()=>{let g=Object.values(o.sprites).some(M=>M.leaving),H=o.bgTransition!==null;if(!g&&!H)return;let A=setTimeout(()=>{r(M=>oa(M))},450);return()=>clearTimeout(A)},[o.sprites,o.bgTransition]),(0,B.useEffect)(()=>{let g=v;!g||g.nodeId===void 0&&g.seq===void 0||w.current.onRead?.({nodeId:g.nodeId??"",offset:d,...g.seq!==void 0?{seq:g.seq}:{},len:d})},[v,d]),(0,B.useEffect)(()=>{let g=a[C.current],H=g?.kind==="line"&&(W.current.find(Q=>Q.key===g.lineKey)?.type??null)==="input";if(!so({live:t.live,auto:x,hold:t.hold===!0,hasCurrent:v!==null,currentComplete:v===null||d>=J,cursor:C.current,cueCount:a.length,nextIsPlayerInput:H}))return;let M=setTimeout(()=>se(),80);return()=>clearTimeout(M)},[t.live,x,v,d,a,se,t.revision,t.hold]);let Fe=kr(t.assetsTtlMs);(0,B.useEffect)(()=>{if(Object.keys(o.pending).length===0)return;let g=setInterval(()=>{let H=Date.now();r(A=>{let M=Object.entries(A.pending).filter(([,$])=>H-$.at>=Fe).map(([$])=>$);if(M.length===0)return A;let Q={...A.pending};for(let $ of M)delete Q[$];return{...A,pending:Q}})},5e3);return()=>clearInterval(g)},[o.pending,Fe]);let xe=(0,B.useCallback)(g=>{g.length!==0&&r(H=>{if(Object.keys(H.pending).length===0)return H;let A={...H.pending};for(let M of g)delete A[M];return{...H,pending:A}})},[]),Ie=(0,B.useMemo)(()=>y.slice(0,Math.max(F,0)).reverse(),[y,F]),ne=D?V?.text.length??0:d,Me=(0,B.useMemo)(()=>xa({cues:a,lines:W.current,transcript:y,current:v,view:V,viewLength:ne,shownLength:d,scrubbed:D,cursor:C.current}),[a,y,v,V,ne,d,D,t.revision]),ee=(0,B.useMemo)(()=>{if(q===null)return null;let g=wr(a,y,q);return g===null?null:{...vr(a,g),bgm:o.bgm,ambient:o.ambient,bgmVolume:o.bgmVolume,ambientVolume:o.ambientVolume,pending:o.pending}},[q,a,y,o.bgm,o.ambient,o.bgmVolume,o.ambientVolume,o.pending]),be=(0,B.useCallback)(g=>{let H=hr(I.current,g);H<0||h(H>=Z.current?null:H)},[]),ce=(0,B.useCallback)(()=>{h(null)},[]);return{visual:Cr(ee??o,K,t.cgByNode),current:v,view:V,viewLength:ne,shownLength:d,exhausted:ge,auto:x,setAuto:L,advance:O,scrub:he,scrubbed:D,history:Ie,page:Me,seek:be,follow:ce,sfx:R,settleAssets:xe}}function fo(a){return Math.min(1,Math.max(0,a))}function Ar(a){return new URL(a,location.href).href}var ra=class{base;active=null;retired=null;ramps=new Map;constructor(e){this.base=e}set(e,t){let o=fo(t??this.base);if(e===null){this.retire();return}let r=Ar(e);if(this.active?.src===r){this.rampTo(this.active,o);return}this.retire();let l=new Audio(r);l.loop=!0,l.preload="auto",l.volume=0,this.active=l,l.play().catch(()=>{}),this.rampTo(l,o)}retire(){if(!this.active)return;let e=this.active;this.active=null,this.retired&&this.discard(this.retired),this.retired=e,this.rampTo(e,0,()=>this.discard(e))}discard(e){this.cancelRamp(e),e.pause(),e.removeAttribute("src"),e.load(),this.retired===e&&(this.retired=null)}rampTo(e,t,o){this.cancelRamp(e);let r=e.volume;if(Math.abs(t-r)<.01){e.volume=t,o?.();return}let l=Math.max(1,Math.round(1200/50)),s=0,d=window.setInterval(()=>{s+=1,e.volume=fo(r+(t-r)*(s/l)),!(s<l)&&(window.clearInterval(d),this.ramps.delete(e),o?.())},50);this.ramps.set(e,d)}cancelRamp(e){let t=this.ramps.get(e);t!==void 0&&(window.clearInterval(t),this.ramps.delete(e))}dispose(){for(let e of[this.active,this.retired])e&&this.discard(e);this.active=null,this.retired=null}},ya=class{playing=new Set;play(e,t=.7){if(this.playing.size>=6){let r=this.playing.values().next().value;r&&(this.playing.delete(r),r.pause())}let o=new Audio(Ar(e));o.volume=fo(t),o.addEventListener("ended",()=>this.playing.delete(o)),o.addEventListener("error",()=>this.playing.delete(o)),this.playing.add(o),o.play().catch(()=>this.playing.delete(o))}dispose(){for(let e of this.playing)e.pause();this.playing.clear()}};var Rl=require("react/jsx-runtime");var $t=require("react");var Pr=a=>a?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function Tr(a,e,t=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Pr(a),size:24,node:e,...t.length>0?{aliases:t}:{}}}var Fr=a=>{let e="",t=!1;for(let o of a){if(o==="-"||o==="_"||o<=" "){t=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=t?o.toUpperCase():o,t=!1}return e};var Mr=a=>{let e=Fr(a);return e.charAt(0).toUpperCase()+e.slice(1)};var va=require("react");var ka=(...a)=>a.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();var qe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function po(a){return a!=null}function Dr(a,e={}){let t=e.attributeNames??{},o=L=>t[L]??L,r=a.size??a.width??qe.width,l=a.size??a.height??qe.height,s=a.aliases?.filter(L=>typeof L=="string"&&L.trim()!=="").map(L=>`lucide-${L}`)??[],d=[...a.name?[`lucide-${a.name}`]:[],...s],c=e.className?.split(" ").filter(Boolean)??[],m=e.includeDefaultClasses===!1?ka(...c):ka("lucide",...d,...c),p=e.absoluteStrokeWidth?Number(e.strokeWidth??qe["stroke-width"])*Number(a.size??a.width??qe.width)/Number(e.size??e.width??qe.width):e.strokeWidth??qe["stroke-width"];return["svg",{...Object.entries(qe).reduce((L,[R,E])=>(L[o(R)]=E,L),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&po(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&po(e.width)&&{[o("width")]:e.width},..."height"in e&&po(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:p,...m&&{[o("class")]:m},[o("viewBox")]:`0 0 ${r} ${l}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},a.node.map(L=>{let[R,E,q]=L,h=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...E}:E;return q?[R,h,q]:[R,h]})]}function Br(a,e={}){return Dr(a,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var Rr=a=>{for(let e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var la=require("react");var vn=(0,la.createContext)({});var qr=()=>(0,la.useContext)(vn);var Er=(0,va.forwardRef)(({color:a,size:e,width:t,height:o,strokeWidth:r,absoluteStrokeWidth:l,nonScalingStroke:s,className:d="",children:c,iconNode:m=[],icon:p={node:m,aliases:[],size:24},...x},L)=>{let{size:R=24,strokeWidth:E=2,absoluteStrokeWidth:q=!1,nonScalingStroke:h=!1,color:C="currentColor",className:k=""}=qr()??{},N=!!c||Rr(x),[W,y,I=[]]=Br(p,{color:a??C,width:t??e??R,height:o??e??R,strokeWidth:r??E,absoluteStrokeWidth:l??q,nonScalingStroke:s??h,className:ka(k,d),hasA11yProp:N,attributes:x});return(0,va.createElement)(W,{ref:L,...y},[...I.map(([w,z])=>(0,va.createElement)(w,z)),...Array.isArray(c)?c:[c]])});function u(a,e=[],t=[]){let o=typeof a=="string"?Tr(a,e,t):a,r=(0,$t.forwardRef)(({className:l,...s},d)=>(0,$t.createElement)(Er,{ref:d,icon:o,className:l,...s}));return o.name&&(r.displayName=Mr(o.name)),r}var Or={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};Or.node;var Ca=u(Or);var Nr={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Nr.node;var Sa=u(Nr);var Ur={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};Ur.node;var wa=u(Ur);var Hr={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};Hr.node;var Aa=u(Hr);var _r={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};_r.node;var Pa=u(_r);var zr={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};zr.node;var Ta=u(zr);var Vr={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};Vr.node;var Fa=u(Vr);var Gr={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};Gr.node;var Ma=u(Gr);var Wr={name:"corner-up-left",size:24,node:[["path",{d:"M20 20v-7a4 4 0 0 0-4-4H4",key:"1nkjon"}],["path",{d:"M9 14 4 9l5-5",key:"102s5s"}]]};Wr.node;var sa=u(Wr);var $r={name:"crosshair",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]};$r.node;var Da=u($r);var jr={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};jr.node;var Ba=u(jr);var Xr={name:"drama",size:24,node:[["path",{d:"M10 11h.01",key:"d2at3l"}],["path",{d:"M14 6h.01",key:"k028ub"}],["path",{d:"M18 6h.01",key:"1v4wsw"}],["path",{d:"M6.5 13.1h.01",key:"1748ia"}],["path",{d:"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",key:"172yzv"}],["path",{d:"M17.4 9.9c-.8.8-2 .8-2.8 0",key:"1obv0w"}],["path",{d:"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",key:"rqjl8i"}],["path",{d:"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",key:"1mr6wy"}]]};Xr.node;var Ra=u(Xr);var Kr={name:"eye-off",size:24,node:[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]};Kr.node;var qa=u(Kr);var Zr={name:"eye",size:24,node:[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};Zr.node;var Ea=u(Zr);var Jr={name:"fast-forward",size:24,node:[["path",{d:"M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z",key:"b19h5q"}],["path",{d:"M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z",key:"h7h5ge"}]]};Jr.node;var Oa=u(Jr);var Qr={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};Qr.node;var Na=u(Qr);var Yr={name:"flame",size:24,node:[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]]};Yr.node;var Ua=u(Yr);var el={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};el.node;var Ha=u(el);var al={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};al.node;var _a=u(al);var tl={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};tl.node;var za=u(tl);var ol={name:"image",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]};ol.node;var Va=u(ol);var rl={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};rl.node;var Ga=u(rl);var ll={name:"maximize-2",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]};ll.node;var Wa=u(ll);var sl={name:"maximize",size:24,node:[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]};sl.node;var $a=u(sl);var nl={name:"message-square",size:24,node:[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]};nl.node;var ja=u(nl);var il={name:"messages-square",size:24,node:[["path",{d:"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",key:"1n2ejm"}],["path",{d:"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",key:"1qfcsi"}]]};il.node;var Xa=u(il);var dl={name:"mic",size:24,node:[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]]};dl.node;var Ka=u(dl);var ul={name:"minimize",size:24,node:[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]};ul.node;var Za=u(ul);var cl={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};cl.node;var Ee=u(cl);var fl={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};fl.node;var Oe=u(fl);var pl={name:"paperclip",size:24,node:[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]]};pl.node;var Ja=u(pl);var gl={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};gl.node;var Qa=u(gl);var ml={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};ml.node;var Ne=u(ml);var hl={name:"pencil",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]};hl.node;var Ya=u(hl);var xl={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};xl.node;var et=u(xl);var bl={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};bl.node;var at=u(bl);var Ll={name:"rotate-ccw-clock",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],aliases:["history"]};Ll.node;var Ue=u(Ll);var Il={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};Il.node;var tt=u(Il);var yl={name:"rotate-cw",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]};yl.node;var ot=u(yl);var kl={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};kl.node;var rt=u(kl);var vl={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};vl.node;var lt=u(vl);var Cl={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Cl.node;var He=u(Cl);var Sl={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};Sl.node;var _e=u(Sl);var wl={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};wl.node;var ze=u(wl);var Al={name:"undo-2",size:24,node:[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]};Al.node;var st=u(Al);var Pl={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};Pl.node;var nt=u(Pl);var Tl={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};Tl.node;var it=u(Tl);var Fl={name:"volume-x",size:24,node:[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",key:"1p7khw"}],["path",{d:"m16.5 14.5 5-5",key:"cul3yw"}],["path",{d:"m16.5 9.5 5 5",key:"1akey5"}]]};Fl.node;var dt=u(Fl);var Ml={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Ml.node;var ut=u(Ml);var Dl={name:"zoom-in",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Dl.node;var ct=u(Dl);var Bl={name:"zoom-out",size:24,node:[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]};Bl.node;var ft=u(Bl);var Cn={back:Ca,exit:Ga,forward:Sa,plus:at,close:ut,check:Aa,alert:ze,chat:ja,backlog:Xa,files:Ha,assets:Va,users:nt,drama:Ra,craft:Ne,memory:wa,settings:lt,workshop:za,expand:Wa,fullscreen:$a,"fullscreen-exit":Za,shrink:Ee,unshrink:Oe,refresh:ot,reply:sa,return:sa,download:Ba,pencil:Ya,undo:st,rewrite:tt,remove:_e,fork:_a,sparkles:He,play:et,pause:Qa,volume:it,mic:Ka,"volume-off":dt,prev:Ta,down:Pa,up:Fa,zoomIn:ct,zoomOut:ft,locate:Da,eye:Ea,"eye-off":qa,fastForward:Oa,search:rt,history:Ue,compass:Ma,attach:Ja,file:Na,flame:Ua};function j({name:a,size:e=15}){let t=Cn[a];return(0,Rl.jsx)(t,{size:e,strokeWidth:1.75,"aria-hidden":"true",style:{display:"block"}})}var ql=require("react"),Sn=[];function go(){return Sn.length>0}var pe=require("react/jsx-runtime"),gt=require("react"),zl=vs(_l(),1);function mt({title:a,kicker:e="DIRECTOR",hint:t,onClose:o,dismissible:r=!0,children:l,footer:s,width:d=560}){let c=(0,gt.useRef)(null);return(0,gt.useEffect)(()=>{let p=c.current?.querySelector("textarea, input, button");p?.focus(),(p instanceof HTMLInputElement||p instanceof HTMLTextAreaElement)&&p.select()},[]),(0,gt.useEffect)(()=>{let m=p=>{p.key==="Escape"&&(p.stopPropagation(),r&&o())};return window.addEventListener("keydown",m,!0),()=>window.removeEventListener("keydown",m,!0)},[r,o]),(0,zl.createPortal)((0,pe.jsx)("div",{className:"modal-scrim stage-root",role:"dialog","aria-modal":"true","aria-label":a,onClick:m=>{m.stopPropagation(),r&&o()},onTouchStart:m=>m.stopPropagation(),onTouchMove:m=>m.stopPropagation(),onTouchEnd:m=>m.stopPropagation(),children:(0,pe.jsxs)("div",{className:"modal-card",style:{width:d},ref:c,onClick:m=>m.stopPropagation(),children:[(0,pe.jsx)("div",{className:"modal-top-glow","aria-hidden":!0}),(0,pe.jsxs)("header",{className:"modal-head",children:[(0,pe.jsxs)("div",{className:"modal-title-group",children:[(0,pe.jsx)("span",{className:"modal-pip","aria-hidden":!0}),(0,pe.jsx)("h2",{className:"modal-title",children:a}),e&&(0,pe.jsx)("span",{className:"modal-kicker",children:e})]}),r&&(0,pe.jsx)("button",{type:"button",className:"modal-x",onClick:o,"aria-label":"\u5173\u95ED",children:(0,pe.jsx)("span",{"aria-hidden":!0,children:"\u2715"})})]}),t&&(0,pe.jsx)("p",{className:"modal-hint",children:t}),(0,pe.jsx)("div",{className:"modal-body",children:l}),s&&(0,pe.jsx)("footer",{className:"modal-foot",children:s})]})}),document.body)}var na=require("react");function mo(){let a=document;return a.fullscreenElement??a.webkitFullscreenElement??null}function Fn(a){let e=a,t=a.documentElement;return typeof t.requestFullscreen=="function"||typeof t.webkitRequestFullscreen=="function"||typeof e.webkitExitFullscreen=="function"}var ho="\u5168\u5C4F\u6CA1\u8FDB\u6765\uFF0C\u6D4F\u89C8\u5668\u62D2\u7EDD\u4E86\u8FD9\u6B21\u8BF7\u6C42\u3002";function xo(a){let e=typeof document<"u"&&Fn(document),[t,o]=(0,na.useState)(()=>e&&mo()!==null);(0,na.useEffect)(()=>{if(!e)return;let l=()=>o(mo()!==null);return l(),document.addEventListener("fullscreenchange",l),document.addEventListener("webkitfullscreenchange",l),()=>{document.removeEventListener("fullscreenchange",l),document.removeEventListener("webkitfullscreenchange",l)}},[e]);let r=(0,na.useCallback)(()=>{(async()=>{let l=document,s=document.documentElement;try{if(mo()!==null){typeof l.exitFullscreen=="function"?await l.exitFullscreen():l.webkitExitFullscreen?.();return}typeof s.requestFullscreen=="function"?await s.requestFullscreen():s.webkitRequestFullscreen?.()}catch{console.warn(ho),a?.(ho)}})()},[a]);return{on:t,toggle:e?r:null}}function Vl(a,e){return a<=0||e<=0||a>=e?"desktop":a<480?"narrow-portrait":"portrait"}function Mn(a){return a==="narrow-portrait"?2:a==="portrait"?3:Number.POSITIVE_INFINITY}function bo(a){let e=Vl(a.width,a.height),t=Mn(e),o=Object.keys(a.sprites).filter(x=>!a.sprites[x].leaving),r=[...o].sort((x,L)=>{let R=a.sprites[x],E=a.sprites[L],q=+(L===a.speakerId)-+(x===a.speakerId);if(q)return q;let h=Number(E.keepVisible)-Number(R.keepVisible);return h||E.orderSeq-R.orderSeq||x.localeCompare(L)}),l=r.filter(x=>x===a.speakerId||a.sprites[x].keepVisible),s=new Set([...l,...r.filter(x=>!l.includes(x)).slice(0,Math.max(0,t-l.length))]),d=o.filter(x=>s.has(x)).sort((x,L)=>a.sprites[x].orderSeq-a.sprites[L].orderSeq||x.localeCompare(L)),c=new Map;for(let x of d){let L=a.sprites[x].pos;L&&c.set(x,L)}let m=Nt(d,c),p={};for(let x of Object.keys(a.sprites)){let L=a.sprites[x],R=s.has(x)||!!L.leaving,E=R?x===a.speakerId?"speaker":L.keepVisible?"keep-visible":L.orderSeq===Math.max(...d.map(q=>a.sprites[q].orderSeq),0)?"newer-entry":"visible":"suppressed-overflow";p[x]={visible:R,renderPos:m.get(x)??L.resolvedPos,renderScale:1,reason:E}}return{profile:e,capacity:t,actors:p}}var Ce=require("react/jsx-runtime");function Lo({candidates:a,selected:e,onToggle:t}){if(a.length===0)return(0,Ce.jsx)("div",{className:"ref-picker-empty muted small",children:"\u6682\u65E0\u53EF\u7528\u7ACB\u7ED8\u7684\u89D2\u8272\uFF08\u9700\u5148\u6709\u7ACB\u7ED8\u624D\u53EF\u4F5C\u4E3A\u57AB\u56FE\u53C2\u8003\uFF09"});let o=new Set(e),r=[...e.map(l=>a.find(s=>s.id===l)).filter(l=>!!l),...a.filter(l=>!o.has(l.id))];return(0,Ce.jsx)("div",{className:"ref-picker-grid",role:"group","aria-label":"\u9009\u62E9\u53C2\u8003\u7ACB\u7ED8\u89D2\u8272",children:r.map(l=>{let s=e.indexOf(l.id),d=s!==-1;return(0,Ce.jsxs)("button",{type:"button",className:`ref-picker-chip ${d?"selected":""}`,onClick:()=>t(l.id),title:d?`\u7B2C ${s+1} \u4F4D\u53C2\u8003\u56FE\uFF1A${l.name}\uFF08\u70B9\u51FB\u53D6\u6D88\uFF09`:`\u6DFB\u52A0\u53C2\u8003\uFF1A${l.name}`,"aria-pressed":d,children:[l.spriteUrl?(0,Ce.jsx)("img",{src:l.spriteUrl,alt:l.name,className:"ref-chip-thumb"}):(0,Ce.jsx)("span",{className:"ref-chip-blank",children:(0,Ce.jsx)(j,{name:"users",size:14})}),(0,Ce.jsx)("span",{className:"ref-chip-name",children:l.name}),d&&(0,Ce.jsx)("span",{className:"ref-chip-order",children:s+1})]},l.id)})})}function Io(a,e){return a.includes(e)?a.filter(t=>t!==e):[...a,e]}function yo(a,e){return e?!0:a.trim().length>0}var ht={prompt:{title:"\u63D0\u793A",hint:"",placeholder:"\u5199\u4E00\u53E5\u2026",submit:()=>"\u53D1\u9001"},interrupt:{title:"\u6253\u65AD",hint:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002",placeholder:"\u63A5\u4E0B\u6765\u600E\u4E48\u5199\u2026",submit:()=>"\u6253\u65AD\u5E76\u53D1\u9001"},edit:{title:"\u6539\u5199\u8FD9\u53E5",hint:"\u53EA\u6539\u8FD9\u4E00\u53E5\uFF0C\u5267\u60C5\u7167\u65E7\u5F80\u4E0B\u8D70\u3002",placeholder:"\u6539\u5199\u8FD9\u53E5\u2026",submit:()=>"\u6539\u5199"},restart:{title:"\u91CD\u65B0\u751F\u6210",hint:"\u4ECE\u8FD9\u4E00\u8F6E\u5F00\u5934\u91CD\u5199\uFF1A\u539F\u6709\u5185\u5BB9\u6574\u6BB5\u7559\u4F5C\u65E7\u679D\uFF0C\u53EF\u4EE5\u4EA4\u4EE3\u4E00\u53E5\u8981\u6C42\uFF08\u7559\u7A7A\u5C31\u662F\u7EAF\u91CD\u5199\uFF09\u3002",placeholder:"\u60F3\u6362\u4EC0\u4E48\u65B9\u5411\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u91CD\u65B0\u751F\u6210 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u91CD\u65B0\u751F\u6210"},fork:{title:"\u5206\u5C94",hint:"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",placeholder:"\u65B0\u5206\u652F\u7684\u7B2C\u4E00\u53E5\uFF08\u53EF\u7559\u7A7A\uFF09",submit:a=>a?"\u5206\u5C94 \xB7 \u5E26\u7740\u8FD9\u53E5":"\u5206\u5C94"},cg:{title:"\u751F\u6210\u63D2\u56FE",hint:"\u7559\u7A7A = \u6309\u521A\u624D\u8FD9\u4E00\u5E55\u6784\u56FE\u3002",placeholder:"\u60F3\u753B\u6210\u4EC0\u4E48\u6837\uFF1F\uFF08\u53EF\u7559\u7A7A\uFF09",submit:()=>"\u751F\u6210"}},Gl={guide:"\u6392\u8FDB\u961F\u5217\uFF0C\u968F\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1\u9001\u3002",fork:"\u4ECE\u6B63\u5728\u770B\u7684\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",interrupt:"\u7ACB\u523B\u505C\u4E0B\u8FD9\u4E00\u8F6E\uFF0C\u7528\u8FD9\u53E5\u63A5\u7740\u5199\u3002"};function Wl(a,e){return a!=="prompt"?a??"prompt":e==="guide"?"prompt":e}function $l(a){return a instanceof HTMLElement&&(a.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(a.tagName))}function Dn(a,e){let t=lr(a,e);return t.background===null?t.ink?{color:t.ink}:{}:{background:t.background,textShadow:"none",...t.ink?{color:t.ink}:{}}}var Xt="OOC\uFF1A",Bn={wide:.86,normal:1,close:1.35,extreme:1.85};function Rn({url:a,pos:e,name:t,framing:o,stature:r,shot:l,anchor:s,figureTop:d,figureHeight:c,renderScale:m=1,visible:p=!0,leaving:x,action:L,actionSeq:R,zIndex:E,dim:q}){let[h,C]=(0,T.useState)(a),[k,N]=(0,T.useState)(null);(0,T.useEffect)(()=>{if(!a||a===h)return;let K=new Image,Z;return K.onload=()=>{N(h),C(a),Z=setTimeout(()=>N(null),260)},K.src=a,()=>{K.onload=null,Z&&clearTimeout(Z)}},[a,h]);let[W,y]=(0,T.useState)(!0),[I,w]=(0,T.useState)(!1),[z,v]=(0,T.useState)(0);if((0,T.useEffect)(()=>{if(!L){w(!1);return}w(!0),v(Z=>Z+1);let K=setTimeout(()=>{w(!1),y(!1)},560);return()=>clearTimeout(K)},[L,R]),!h)return null;let oe=`theater-sprite pos-${e}${x?" leaving":W?" entering":""}${I?" acting":""}${q?" dim":""}${p?"":" presentation-suppressed"}`,F=ur(o,r,s,d,c),V={zIndex:E,"--scale":Bn[l??"normal"]*m,"--sprite-top":`${F.landscape.top}%`,"--sprite-height":`${F.landscape.height}%`,"--sprite-origin":F.landscape.origin,"--sprite-top-portrait":`${F.portrait.top}%`,"--sprite-height-portrait":`${F.portrait.height}%`,"--sprite-origin-portrait":F.portrait.origin,"--sprite-act":cr(L)??"none","--act-nonce":`-${z%100/1e3}s`};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("img",{className:oe,style:V,src:h,alt:t,onError:()=>{N(null),C(null)},onAnimationEnd:()=>y(!1)}),k&&(0,n.jsx)("img",{className:`theater-sprite pos-${e} sprite-out${q?" dim":""}`,style:V,src:k,alt:"","aria-hidden":!0})]})}var jl={white:"#ffffff",red:"#d0342c",black:"#000000"},qn=420,Xl={light:340,heavy:560};function Kl(a,e,t=!1){let[o,r]=(0,T.useState)(!1),[l,s]=(0,T.useState)(0),d=(0,T.useRef)(null);return(0,T.useEffect)(()=>{if(t||a==null||a===d.current)return;d.current=a,r(!0),s(m=>m+1);let c=setTimeout(()=>r(!1),e);return()=>clearTimeout(c)},[a,e,t]),{active:o,nonce:l}}function En(){let[a,e]=(0,T.useState)(()=>typeof document<"u"?document.documentElement.dataset.dialogStyle??null:null);return(0,T.useEffect)(()=>{if(typeof document>"u")return;let t=document.documentElement,o=()=>e(t.dataset.dialogStyle??null);o();let r=new MutationObserver(o);return r.observe(t,{attributes:!0,attributeFilter:["data-dialog-style"]}),()=>r.disconnect()},[]),a}function ko({visual:a,playback:e,live:t,loading:o=!1,fresh:r,names:l,index:s,voiceAvailable:d,voiceCast:c,busy:m,targets:p,onPrompt:x,promptAlt:L="fork",showGenerate:R=!0,onEdit:E,onFork:q,onGenerateCg:h,onReplay:C,voiceState:k,voiceOn:N,onToggleVoice:W,onUnlock:y,onView:I,availableViews:w,onExit:z,canContinue:v,onContinue:oe,ended:F=!1,onTurbo:V,overlay:D,dialogStatus:K,directorBar:Z=!0,nsfwChannel:he,onNotify:se}){let J=(0,T.useRef)(null);J.current||(J.current={bgm:new ra(.28),ambient:new ra(.16),sfx:new ya}),(0,T.useEffect)(()=>{let i=J.current;return()=>{i.bgm.dispose(),i.ambient.dispose(),i.sfx.dispose()}},[]);let[U,ue]=(0,T.useState)(null),[ge,O]=(0,T.useState)(""),[Ae,Fe]=(0,T.useState)([]),[xe,Ie]=(0,T.useState)(!0),[ne,Me]=(0,T.useState)("guide"),[ee,be]=(0,T.useState)(!1),ce=xo(se),{view:g,viewLength:H,current:A,shownLength:M,exhausted:Q,advance:$,scrub:le,scrubbed:G,follow:Ze}=e,ua=g?g.text.slice(0,H):"",Ge=A!==null&&M>=A.text.length,Le=g?.type==="title",Zt=Le&&g!==null&&A?.closed===!0&&ua.length>=(zt(g.text).at(-1)??0),ie=lo({viewName:g&&(g.type==="say"||g.type==="thought")?g.nameOverride??(La(l,g.actorId)||"\uFF1F"):null,shown:ua,hasView:g!==null,live:t}),We=g?ie.text:o?"\u6B63\u5728\u52A0\u8F7D\u2026":r?_t(t,!0):t?ie.text:"",Lt=Wt(g,a.sprites),Je=En(),Qe=Je==="novel"||Je==="nvl",me=(0,T.useMemo)(()=>{if(e.page)return e.page;let i=[...e.history].reverse();return g&&g.type!=="title"&&!i.some(f=>f.key===g.key)&&i.push(g),xa({cues:[],lines:A?[A]:[],transcript:i,current:A,view:g,viewLength:H,shownLength:M,scrubbed:G})},[e.page,e.history,A,g,H,M,G]),ca=(0,T.useRef)(null),It=(0,T.useRef)(null);(0,T.useEffect)(()=>{if(!Qe)return;let i=ca.current;if(i){if(G){It.current?.scrollIntoView({block:"nearest"});return}i.scrollTop=i.scrollHeight}},[Qe,G,me.pageNo,me.entries.length,M,!!D]);let Ye=(0,T.useCallback)(()=>{if(y(),!o){if(ee){be(!1);return}F||(G?le(1):Le?$():v?oe():$())}},[y,o,ee,F,G,le,Le,v,oe,$]),b=(0,T.useRef)(null),[_,S]=(0,T.useState)(0),[ea,us]=(0,T.useState)(0),cs=(0,T.useMemo)(()=>{let i={width:_,height:ea};return bo({width:i.width,height:i.height,sprites:a.sprites,speakerId:Wt(g,a.sprites)})},[_,ea,a.sprites,g]),Bo=(0,T.useRef)(null),Ro=(0,T.useRef)(null);(0,T.useEffect)(()=>{let i=b.current,f=Bo.current;if(!i||!f)return;let re=i.querySelector(".theater-stage");if(!re)return;let ae=Ro.current,ke=()=>{let St=re.getBoundingClientRect();S(St?.width??0),us(St?.height??0),i.style.setProperty("--dialog-h",`${f.offsetHeight}px`),i.style.setProperty("--dir-h",`${ae?.offsetHeight??0}px`)};ke();let Xe=new ResizeObserver(ke);return Xe.observe(re),Xe.observe(f),ae&&Xe.observe(ae),()=>Xe.disconnect()},[Z]),(0,T.useEffect)(()=>{let i=b.current;if(!i)return;let f=re=>{Math.abs(re.deltaY)<4||le(re.deltaY>0?1:-1)};return i.addEventListener("wheel",f,{passive:!1}),()=>i.removeEventListener("wheel",f)},[le]),(0,T.useEffect)(()=>{let i=f=>{if(!(f.metaKey||f.ctrlKey||f.altKey||$l(f.target))&&!(f.key==="Escape"&&go())){if(ee){(f.key==="h"||f.key==="H"||f.key===" "||f.key==="Escape")&&(be(!1),f.preventDefault());return}f.key==="ArrowUp"||f.key==="ArrowLeft"?(le(-1),f.preventDefault()):f.key==="ArrowDown"||f.key==="ArrowRight"?(le(1),f.preventDefault()):f.key===" "?(U||Ye(),f.preventDefault()):f.key==="Escape"&&G?(le(1),f.preventDefault()):f.key==="Escape"&&U?(ue(null),O(""),f.preventDefault()):f.key==="l"||f.key==="L"?(I("backlog"),f.preventDefault()):f.key==="f"||f.key==="F"?(I("route"),f.preventDefault()):f.key==="g"||f.key==="G"?(I("cg"),f.preventDefault()):f.key==="w"||f.key==="W"?(I("workshop"),f.preventDefault()):(f.key==="h"||f.key==="H")&&(be(!0),f.preventDefault())}};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[le,G,U,I,ee,Ye]),(0,T.useEffect)(()=>{let i=ae=>{ae.key==="Control"&&!$l(ae.target)&&V(!0)},f=ae=>{ae.key==="Control"&&V(!1)},re=()=>V(!1);return window.addEventListener("keydown",i),window.addEventListener("keyup",f),window.addEventListener("blur",re),()=>{window.removeEventListener("keydown",i),window.removeEventListener("keyup",f),window.removeEventListener("blur",re)}},[V]);let Jt=(0,T.useRef)(null),fs=i=>{y();let f=i.touches[0];f&&(Jt.current={x:f.clientX,y:f.clientY,at:Date.now()})},ps=i=>{let f=Jt.current;if(Jt.current=null,ee||!f)return;let re=i.changedTouches[0];if(!re||Date.now()-f.at>800)return;let ae=re.clientX-f.x,ke=re.clientY-f.y;Math.abs(ae)<45&&Math.abs(ke)<45||(Math.abs(ae)>Math.abs(ke)?le(ae>0?-1:1):ke<0&&I("backlog"))};(0,T.useEffect)(()=>{let i=e.sfx;if(!i)return;let f=s.sfx(i.src);f&&J.current.sfx.play(f,i.volume??.7)},[e.sfx,s]);let qo=s.bgm(a.bgm),Eo=s.ambient(a.ambient);(0,T.useEffect)(()=>{J.current.bgm.set(qo,a.bgmVolume)},[qo,a.bgmVolume]),(0,T.useEffect)(()=>{J.current.ambient.set(Eo,a.ambientVolume)},[Eo,a.ambientVolume]);let yt=qt(a.bg??void 0),Oo=yt?.kind==="color"?yt.color:null,fa=yt?.kind==="asset"?yt.id:null,ye=s.bg(fa),De=s.cg(a.cg?.id??null),kt=!ye&&fa!==null&&a.pending[fa]?.type==="bg",No=a.cg?.id??null,vt=!De&&!!No&&a.pending[No]?.type==="cg",Uo=a.bgTransition?.from?s.bg(a.bgTransition.from):null,Be=a.bgTransition&&a.bgTransition.from!==null?a.bgTransition:null,Ho=Be?or(Be.name):null,Qt=a.fx.camera.shake,Yt=Qt?.value==="heavy"?"heavy":"light",_o=Kl(Qt?.seq,Xl[Yt],G),zo=Qt?.on===!0,eo=a.fx.screen.flash,Vo=eo?.value??"white",Go=Kl(eo?.seq,qn,G),gs=eo?.on===!0,aa=L==="interrupt"?"interrupt":"fork",Wo=()=>{let i=ge.trim(),f=Wl(U,ne);if(O(""),ue(null),f==="prompt"||f==="interrupt"){i&&x(i,f==="interrupt"?"interrupt":"guide");return}if(f==="edit"){i&&p.lineNodeId&&E(p.lineNodeId,i);return}if(f==="cg"){h(i,{referenceCharacters:Ae.length>0?Ae:void 0,useHistory:xe,anchorNodeId:G?p.lineNodeId??g?.nodeId??null:void 0});return}if(f==="restart"){if(!p.beatId)return;q(p.beatId,{resume:!0,...p.beatNodeId?{replaced:p.beatNodeId}:{},...i?{instruction:i}:{}});return}p.lineSeq!==null&&q(p.lineSeq,i?{instruction:i}:void 0)},Ct=(0,T.useCallback)(i=>!w||w.includes(i),[w]),$e=k(g?.seq??null),ms=On(g,c),$o=m?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u6539\u5199":p.lineNodeId?null:"\u8FD9\u91CC\u6CA1\u6709\u5267\u4F5C\u5BB6\u7684\u53F0\u8BCD\u53EF\u6539",jo=m?"\u6F14\u51FA\u8FDB\u884C\u4E2D\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u5199":p.beatId?null:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u9000\u56DE\u53BB\u7684\u4E00\u8F6E",ao=p.lineSeq===null?"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u53EF\u5206\u5C94\u7684\u4F4D\u7F6E":null,je=Wl(U,ne),hs=je==="edit"?ge.trim()===""||!p.lineNodeId:je==="prompt"?ge.trim()==="":je==="fork"?ao!==null:je==="restart"?p.beatId===null:je==="cg"?!yo(ge,xe):!1;return(0,n.jsxs)("div",{className:`theater stage-root${ee?" bare":""}${Le?" title-mode":""}`,ref:b,onClick:Ye,onTouchStart:fs,onTouchEnd:ps,children:[(0,n.jsxs)("div",{className:`theater-stage${G?" rewinding":""}`,children:[(0,n.jsxs)("div",{className:`theater-camera${_o.active||zo?` shaking shake-${Yt}${zo?" shake-hold":""}`:""}`,style:{"--shake-ms":`${Xl[Yt]}ms`,"--shake-nonce":`-${_o.nonce%100/1e3}s`},children:[ye&&!Be?(0,n.jsx)("img",{className:"theater-bg theater-bg-in",src:ye,alt:""},ye):Be?(0,n.jsxs)("div",{className:`theater-bg-stack theater-stack trans-${Be.name}${G?" rewinding":""}`,children:[Uo&&(0,n.jsx)("img",{className:"theater-bg theater-stack-old",src:Uo,alt:"","aria-hidden":!0}),ye?(0,n.jsx)("img",{className:"theater-bg theater-stack-new",src:ye,alt:""}):(0,n.jsx)("div",{className:`theater-bg theater-stack-new theater-bg-fallback${kt?" theater-bg-pending":""}`})]},Be.seq):(0,n.jsx)("div",{className:`theater-bg theater-bg-fallback${kt?" theater-bg-pending":""}`,style:Oo?{background:Oo}:void 0}),(0,n.jsx)("div",{className:"theater-sprites",children:Object.entries(a.sprites).map(([i,f])=>{let re=s.spriteDirOf(i),ae=s.spritePresentation(re,f.variant),ke=cs.actors[i]??{visible:!0,renderPos:f.resolvedPos,renderScale:1,reason:"visible"},Xe=Lt===i,St=(f.orderSeq||1)+(Xe?1e3:0);return(0,n.jsx)(Rn,{url:s.sprite(re,f.variant),pos:ke.renderPos,name:La(l,i),framing:ae.framing,stature:ae.stature,shot:f.shot,anchor:f.anchor??ae.anchor,figureTop:ae.figureTop,figureHeight:ae.figureHeight,renderScale:ke.renderScale,visible:ke.visible,leaving:f.leaving===!0,action:f.action,actionSeq:f.actionSeq,zIndex:St,dim:Lt!==null&&!Xe},i)})}),De&&(0,n.jsxs)("div",{className:"theater-cg",children:[(0,n.jsx)("img",{className:"theater-cg-in",src:De,alt:a.cg?.id??""}),a.cg?.caption&&(0,n.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})]}),vt&&(0,n.jsx)("div",{className:"theater-cg theater-cg-pending","aria-label":"\u63D2\u56FE\u751F\u6210\u4E2D",children:a.cg?.caption&&(0,n.jsx)("p",{className:"theater-cg-caption",children:a.cg.caption})}),Ho&&Be&&(0,n.jsx)("span",{className:"theater-fade-veil",style:{background:Ho}},`veil-${Be.seq}`)]}),(0,n.jsxs)("div",{className:"theater-overlay","aria-hidden":"true",children:[a.fx.screen.letterbox?.on&&(0,n.jsx)("span",{className:"theater-letterbox"}),a.fx.screen.vignette?.on&&(0,n.jsx)("span",{className:"theater-vignette"}),gs?(0,n.jsx)("span",{className:"theater-flash theater-flash-hold",style:{background:jl[Vo]??"#fff"}}):Go.active?(0,n.jsx)("span",{className:"theater-flash",style:{background:jl[Vo]??"#fff"}},Go.nonce):null]}),Le&&g&&(0,n.jsxs)("div",{className:`theater-title title-align-${g.align??"center"}`,style:Dn(g.bg,g.ink),role:"heading","aria-level":1,children:[(0,n.jsx)("p",{className:"theater-title-text",children:ua}),Zt&&(0,n.jsx)("span",{className:"theater-title-next","aria-hidden":!0,children:"\u25BC"})]})]}),!Qe&&!ee&&!Le&&D,Z&&(0,n.jsxs)("div",{className:"theater-director",ref:Ro,children:[(0,n.jsxs)("button",{type:"button",className:`dir-btn ${U==="prompt"?"on":""}`,title:"\u8F93\u5165\u89D2\u8272\u7684\u884C\u52A8\u3001\u53F0\u8BCD\uFF0C\u6216\u7ED9\u8FD9\u573A\u620F\u7684\u6307\u793A","aria-label":"\u63D0\u793A",disabled:o,onClick:i=>{i.stopPropagation(),ue(U==="prompt"?null:"prompt"),O("")},children:[(0,n.jsx)(j,{name:"chat",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u63D0\u793A"})]}),(0,n.jsxs)("button",{type:"button",className:`dir-btn ${U==="edit"?"on":""}`,title:$o??"\u7F16\u8F91\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD","aria-label":"\u6539\u5199\u5F53\u524D\u8FD9\u53E5\u53F0\u8BCD",disabled:o||$o!==null,onClick:i=>{i.stopPropagation(),ue(U==="edit"?null:"edit"),O(p.lineText)},children:[(0,n.jsx)(j,{name:"pencil",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u6539\u5199"})]}),(0,n.jsxs)("button",{type:"button",className:`dir-btn ${U==="restart"?"on":""}`,title:jo??"\u91CD\u5199\uFF1A\u9000\u5230\u8FD9\u4E00\u8F6E\u4E4B\u524D\uFF0C\u8BA9\u5267\u4F5C\u5BB6\u91CD\u65B0\u5199\u4E00\u904D\uFF08\u539F\u6709\u5185\u5BB9\u7559\u4F5C\u65E7\u679D\uFF09","aria-label":"\u91CD\u5199\u8FD9\u4E00\u8F6E",disabled:o||jo!==null,onClick:i=>{i.stopPropagation(),ue(U==="restart"?null:"restart"),O("")},children:[(0,n.jsx)(j,{name:"rewrite",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u91CD\u5199"})]}),he&&(0,n.jsxs)("button",{type:"button",className:`dir-btn ${he.active?"on":""}`,title:he.active?"\u9650\u5236\u7EA7\u901A\u9053\uFF1A\u5F00\u7740\uFF08\u70B9\u4E00\u4E0B\u5173\u95ED\uFF0C\u6B63\u5728\u5199\u7684\u8FD9\u4E00\u62CD\u6536\u675F\u65F6\u9000\u51FA\uFF09":"\u9650\u5236\u7EA7\u901A\u9053\uFF1A\u5173\u7740\uFF08\u70B9\u4E00\u4E0B\u5F00\u542F\uFF0C\u4E0B\u4E00\u62CD\u8D77\u751F\u6548\uFF09","aria-label":"\u5207\u6362\u9650\u5236\u7EA7\u901A\u9053","aria-pressed":he.active,disabled:o,onClick:i=>{i.stopPropagation(),he.onToggle(!he.active)},children:[(0,n.jsx)(j,{name:"flame",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u9650\u5236\u7EA7"})]}),R&&(0,n.jsxs)("button",{type:"button",className:`dir-btn ${U==="cg"?"on":""}`,title:r?"\u8FD8\u6CA1\u6709\u5267\u60C5\u53EF\u4EE5\u5165\u753B":"\u4E3A\u8FD9\u4E00\u5E55\u751F\u6210\u4E00\u5F20\u63D2\u56FE\uFF08\u6307\u4EE4\u53EF\u7559\u7A7A\uFF09","aria-label":"\u751F\u6210\u63D2\u56FE",disabled:o||r,onClick:i=>{i.stopPropagation(),U==="cg"?ue(null):(ue("cg"),O(""),Fe([]),Ie(!0))},children:[(0,n.jsx)(j,{name:"assets",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u751F\u56FE"})]}),d&&($e!=="none"||ms)&&(0,n.jsxs)("button",{type:"button",className:`dir-btn ${$e==="pending"?"voice-pending":""}`,title:$e==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":N?$e==="ready"?"\u91CD\u542C\u8FD9\u53E5":"\u8FD9\u4E00\u53E5\u8FD8\u6CA1\u6709\u8BED\u97F3\uFF0C\u70B9\u4E00\u4E0B\u751F\u6210":"\u8BED\u97F3\u5DF2\u5173\uFF0C\u5148\u6253\u5F00\u8BED\u97F3\u518D\u91CD\u542C","aria-label":$e==="pending"?"\u8BED\u97F3\u5408\u6210\u4E2D":$e==="ready"?"\u91CD\u542C\u8FD9\u53E5":"\u751F\u6210\u8FD9\u4E00\u53E5\u7684\u8BED\u97F3",disabled:o||$e==="pending"||!N,onClick:i=>{i.stopPropagation(),g?.seq!==null&&g?.seq!==void 0&&C(g.seq)},children:[(0,n.jsx)(j,{name:"volume",size:14}),(0,n.jsx)("span",{className:"dir-label",children:"\u91CD\u542C"})]})]}),(0,n.jsxs)("div",{className:"theater-dialog",role:"text",ref:Bo,children:[Qe?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"dialog-page-head",children:[(0,n.jsxs)("span",{className:"dialog-page-title",children:[(0,n.jsx)("b",{className:"dialog-page-dot","aria-hidden":!0,children:"\u2756"}),me.scene??`CHAPTER ${String(me.pageNo).padStart(2,"0")}`]}),(0,n.jsxs)("span",{className:"dialog-page-meta",children:["PAGE ",String(me.pageNo).padStart(2,"0"),me.entries.length>0?` \xB7 LINE ${String(me.entries.length).padStart(3,"0")}`:""]})]}),Je==="novel"&&(De||ye||vt||kt)&&(0,n.jsxs)("div",{className:`dialog-scene-plate${De||vt?" is-cg":""}${vt&&!De||kt&&!ye?" is-pending":""}`,children:[(De??ye)&&(0,n.jsx)("img",{src:De??ye,alt:a.cg?.caption??me.scene??""}),(a.cg?.caption||me.scene||fa)&&(0,n.jsx)("span",{className:"dialog-scene-cap",children:a.cg?.caption??`SCENE \xB7 ${me.scene??fa}`})]}),(0,n.jsxs)("div",{className:"dialog-page-flow",ref:ca,children:[me.entries.length===0?We?(0,n.jsxs)("p",{className:"page-entry narrate is-current",children:[We,g&&!G&&!Ge&&(0,n.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]}):null:me.entries.map(i=>{let f=i.kind==="input",re=!f&&i.type==="say"?i.nameOverride??(La(l,i.actorId)||"\uFF1F"):null,ae=`page-entry ${f?"input":i.type}${i.isCurrent?" is-current":""}${G&&i.isCurrent?" rewinding":""}`;return(0,n.jsxs)("p",{ref:i.isCurrent?It:void 0,className:ae,children:[re&&(0,n.jsx)("span",{className:"page-spk",children:re}),(0,n.jsx)("span",{className:"page-text",children:i.text}),i.isCurrent&&!G&&!Ge&&(0,n.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]},i.key)}),!ee&&!Le&&D]})]}):(0,n.jsxs)(n.Fragment,{children:[ie.name&&(0,n.jsx)("div",{className:"dialog-name",children:ie.name}),(0,n.jsxs)("p",{className:`dialog-text ${g?.type==="thought"?"thought":g?.type==="narrate"?"narrate":""} ${G?"rewinding":""}`,children:[We,g&&!G&&!Ge&&(0,n.jsx)("span",{className:"dialog-caret","aria-hidden":!0})]})]}),(0,n.jsxs)("div",{className:"dialog-foot",children:[(0,n.jsx)("div",{className:"dialog-hint dialog-hint-foot",children:G?(0,n.jsxs)("button",{type:"button",className:"dialog-rewind",onClick:Ze,title:"\u56DE\u5230\u6700\u65B0",children:[(0,n.jsx)(j,{name:"prev"}),"\u56DE\u770B\u4E2D"]}):U?null:(0,n.jsxs)(n.Fragment,{children:[K??((t||o)&&(0,n.jsx)("span",{className:"dialog-spinner","aria-label":o?"\u6B63\u5728\u52A0\u8F7D":"\u5267\u4F5C\u5BB6\u6B63\u5728\u5199"})),!o&&!K&&Ge&&(!Q||v)&&(0,n.jsx)("span",{className:"dialog-next","aria-hidden":!0,children:"\u25BC"}),!o&&v&&(0,n.jsx)("span",{className:"muted",children:"\u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210"})]})}),(0,n.jsxs)("div",{className:"dialog-options",role:"toolbar","aria-label":"\u5FEB\u6377\u83DC\u5355",children:[(0,n.jsx)("button",{type:"button",className:`quick-btn${e.auto?"":" is-off"}`,title:e.auto?"\u81EA\u52A8\u64AD\u653E\uFF1A\u5F00\uFF08\u70B9\u51FB\u5173\u95ED\uFF09":"\u81EA\u52A8\u64AD\u653E\uFF1A\u5173\uFF08\u70B9\u51FB\u5F00\u542F\uFF09","aria-pressed":e.auto,disabled:o,onClick:i=>{i.stopPropagation(),e.setAuto(!e.auto)},children:(0,n.jsx)("span",{className:"qm-label",children:"Auto"})}),d&&(0,n.jsx)("button",{type:"button",className:`quick-btn${N?"":" is-off"}`,title:N?"\u8BED\u97F3\uFF1A\u5F00\uFF08\u70B9\u51FB\u9759\u97F3\uFF09":"\u8BED\u97F3\uFF1A\u9759\u97F3\uFF08\u70B9\u51FB\u6253\u5F00\uFF09","aria-pressed":N,disabled:o,onClick:i=>{i.stopPropagation(),W()},children:(0,n.jsx)(j,{name:N?"volume":"volume-off",size:14})}),(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u56DE\u5230\u4E0A\u4E00\u53E5\uFF08\u2190\uFF09",disabled:o||!G&&e.history.length===0,onClick:i=>{i.stopPropagation(),le(-1)},children:(0,n.jsx)(j,{name:"prev",size:14})}),Ct("backlog")&&(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u56DE\u987E\u8BF4\u8FC7\u7684\u8BDD\uFF08L\uFF09",disabled:o,onClick:i=>{i.stopPropagation(),I("backlog")},children:(0,n.jsx)("span",{className:"qm-label",children:"Log"})}),Ct("route")&&(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u6545\u4E8B\u8DEF\u7EBF\uFF08F\uFF09",disabled:o,onClick:i=>{i.stopPropagation(),I("route")},children:(0,n.jsx)("span",{className:"qm-label",children:"Route"})}),Ct("cg")&&(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u63D2\u56FE\u753B\u5ECA\uFF08G\uFF09",disabled:o,onClick:i=>{i.stopPropagation(),I("cg")},children:(0,n.jsx)("span",{className:"qm-label",children:"CG"})}),ce.toggle&&(0,n.jsx)("button",{type:"button",className:`quick-btn${ce.on?"":" is-off"}`,title:ce.on?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F","aria-label":ce.on?"\u9000\u51FA\u5168\u5C4F":"\u8FDB\u5165\u5168\u5C4F","aria-pressed":ce.on,disabled:o,onClick:i=>{i.stopPropagation(),ce.toggle?.()},children:(0,n.jsx)(j,{name:ce.on?"fullscreen-exit":"fullscreen",size:14})}),(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u9690\u85CF\u754C\u9762\uFF08H\uFF0C\u70B9\u753B\u9762\u6062\u590D\uFF09",disabled:o,onClick:i=>{i.stopPropagation(),ue(null),O(""),be(!0)},children:(0,n.jsx)(j,{name:"eye-off",size:14})}),Ct("workshop")&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{className:"quick-sep","aria-hidden":!0}),(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u6253\u5F00\u5DE5\u574A\uFF08W\uFF09",disabled:o,onClick:i=>{i.stopPropagation(),I("workshop")},children:(0,n.jsx)(j,{name:"workshop",size:14})})]}),z&&(0,n.jsx)("button",{type:"button",className:"quick-btn",title:"\u56DE\u5230\u6807\u9898\u753B\u9762",disabled:o,onClick:i=>{i.stopPropagation(),z()},children:(0,n.jsx)("span",{className:"qm-label",children:"Title"})})]})]}),U&&(0,n.jsxs)(mt,{title:U==="prompt"?"\u63D0\u793A":ht[U].title,hint:U==="prompt"?Gl[ne]:ht[U].hint,onClose:()=>ue(null),footer:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{type:"button",className:"primary",onClick:Wo,disabled:hs,children:ht[je].submit(ge.trim())}),(0,n.jsx)("button",{type:"button",className:"ghost-btn",onClick:()=>ue(null),children:"\u53D6\u6D88"})]}),children:[U==="prompt"&&(0,n.jsxs)("div",{className:"prompt-toolbar",children:[(0,n.jsxs)("div",{className:"seg guide-seg",role:"tablist",children:[(0,n.jsx)("button",{type:"button",className:`seg-btn ${ne==="guide"?"active":""}`.trim(),"aria-pressed":ne==="guide",title:"\u8DDF\u4E0B\u4E00\u8F6E\u4E00\u8D77\u53D1",onClick:()=>Me("guide"),children:"\u5F15\u5BFC"}),(0,n.jsx)("button",{type:"button",className:`seg-btn ${ne===aa?"active":""}`.trim(),"aria-pressed":ne===aa,title:aa==="interrupt"?Gl.interrupt:ao??"\u4ECE\u8FD9\u4E00\u884C\u5F00\u65B0\u5206\u652F\u3002",disabled:aa==="fork"&&ao!==null,onClick:()=>Me(aa),children:aa==="interrupt"?"\u6253\u65AD":"\u5206\u5C94"})]}),(0,n.jsxs)("button",{type:"button",className:`ooc-shortcut ${ge.startsWith(Xt)?"on":""}`,title:"\u4EE5 OOC \u5F00\u5934 = \u8DF3\u51FA\u89D2\u8272\uFF0C\u76F4\u63A5\u4E0B\u6307\u4EE4","aria-label":"\u4EE5 OOC \u524D\u7F00\u7ED9\u5267\u4F5C\u5BB6\u4E0B\u6307\u4EE4",onClick:()=>O(i=>i.startsWith(Xt)?i.slice(Xt.length):Xt+i),children:[(0,n.jsx)("span",{className:"ooc-indicator","aria-hidden":!0}),"OOC \u6307\u4EE4\u6A21\u5F0F"]})]}),U==="cg"&&(0,n.jsxs)("div",{className:"cg-options-group",children:[(0,n.jsxs)("div",{className:"image-gen-field",children:[(0,n.jsx)("span",{className:"image-gen-label",children:"\u53C2\u8003\u7ACB\u7ED8\uFF08\u6309\u70B9\u9009\u987A\u5E8F\u57AB\u56FE\uFF09\uFF1A"}),(0,n.jsx)(Lo,{candidates:s.spriteIds.map(i=>({id:i,name:s.spriteName(i)??l[i]??i,spriteUrl:s.sprite(i,null)})).filter(i=>!!i.spriteUrl),selected:Ae,onToggle:i=>Fe(f=>Io(f,i))})]}),(0,n.jsxs)("label",{className:"image-gen-checkbox",children:[(0,n.jsx)("input",{type:"checkbox",checked:xe,onChange:i=>Ie(i.target.checked)}),(0,n.jsx)("span",{children:"\u57FA\u4E8E\u521A\u624D\u6F14\u5230\u7684\u5267\u60C5\u4E0E\u573A\u666F"})]})]}),(0,n.jsx)("div",{className:"director-input",children:(0,n.jsx)("textarea",{rows:4,value:ge,placeholder:U==="prompt"?ht[je].placeholder:ht[U].placeholder,onChange:i=>O(i.target.value),onKeyDown:i=>{i.key!=="Enter"||!(i.metaKey||i.ctrlKey)||(i.preventDefault(),Wo())}})})]})]})]})}function On(a,e){return!a||a.type!=="say"||!a.actorId?!1:e?.has(a.actorId)??!1}var X=require("react/jsx-runtime"),Pe=require("react");var Nn={onClick:a=>a.stopPropagation(),onTouchStart:a=>a.stopPropagation(),onTouchEnd:a=>a.stopPropagation()},Un="\u81EA\u7531\u8F93\u5165";function vo({stop:a,isNoStop:e,disabled:t,seenChoices:o,onChoice:r,onFree:l,onPolish:s}){let[d,c]=(0,Pe.useState)(""),[m,p]=(0,Pe.useState)(!1),[x,L]=(0,Pe.useState)(null),[R,E]=(0,Pe.useState)(!1),[q,h]=(0,Pe.useState)(null);(0,Pe.useEffect)(()=>{p(!1),c(""),L(null),h(null)},[a,e]);let C=a?.stopType==="choice"?a.options??[]:[],k=C.length>0||a?.stopType==="free";(0,Pe.useEffect)(()=>{if(!k||m||t)return;let I=w=>{if(w.metaKey||w.ctrlKey||w.altKey)return;let z=w.target;if(z instanceof HTMLElement&&(z.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(z.tagName)))return;let v=Number.parseInt(w.key,10);Number.isNaN(v)||v<1||(v<=C.length?(w.preventDefault(),r(v-1)):v===C.length+1&&(w.preventDefault(),p(!0)))};return window.addEventListener("keydown",I),()=>window.removeEventListener("keydown",I)},[k,m,t,C,r]);let N=()=>{let I=d.trim();I&&(l(I),c(""),L(null),h(null),p(!1))},W=()=>{if(!s)return;let I=(x??d).trim();!I||R||(E(!0),h(null),s(I).then(w=>{L(I),c(w)}).catch(w=>h(w.message)).finally(()=>E(!1)))},y=()=>{x!==null&&(c(x),L(null),h(null))};return(0,X.jsxs)(X.Fragment,{children:[k&&!m&&(0,X.jsxs)("div",{className:"choice-overlay",role:"group","aria-label":"\u9009\u9879",...Nn,children:[C.map((I,w)=>{let z=o?.has(I.text)??!1;return(0,X.jsxs)("button",{type:"button",className:`choice${z?" is-seen":""}`,disabled:t,onClick:()=>r(w),children:[(0,X.jsx)("span",{className:"choice-num",children:w+1}),(0,X.jsx)("span",{className:"choice-text",children:I.text}),z&&(0,X.jsxs)("span",{className:"choice-seen",children:[(0,X.jsx)(j,{name:"check",size:13})," \u5DF2\u9009\u8FC7"]})]},`${w}-${I.text}`)}),(0,X.jsxs)("button",{type:"button",className:"choice ghost",disabled:t,onClick:()=>p(!0),title:"\u4E0D\u8BF4\u9009\u9879\uFF0C\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5",children:[(0,X.jsx)("span",{className:"choice-num",children:"\u270E"}),(0,X.jsx)("span",{className:"choice-text",children:Un})]})]}),m&&(0,X.jsx)(mt,{title:"\u81EA\u7531\u8F93\u5165",kicker:null,hint:"\u4EE5\u4E3B\u89D2\u53E3\u543B\u5199\u4E00\u53E5\u3002",width:560,onClose:()=>p(!1),footer:(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("button",{type:"button",className:"ghost-btn free-back",onClick:()=>p(!1),disabled:t,title:"\u4E0D\u81EA\u5DF1\u5199\u4E86\uFF0C\u56DE\u53BB\u9009",children:[(0,X.jsx)(j,{name:"prev",size:14}),"\u8FD4\u56DE\u9009\u9879"]}),q&&(0,X.jsxs)("span",{className:"muted small",children:["\u6DA6\u8272\u5931\u8D25\uFF1A",q]}),(0,X.jsx)("button",{type:"button",className:"primary",onClick:N,disabled:t||d.trim()==="",children:"\u8BF4"})]}),children:(0,X.jsxs)("div",{className:"free-box",children:[(0,X.jsx)("input",{value:d,placeholder:a?.stopType==="free"?a.placeholder??"\u4F60\u7684\u56DE\u5E94\u2026":"\u4EE5\u4E3B\u89D2\u53E3\u543B\u81EA\u5DF1\u5199\u4E00\u53E5\u2026",onChange:I=>c(I.target.value),onKeyDown:I=>I.key==="Enter"&&N(),disabled:t}),s&&(0,X.jsxs)("button",{type:"button",className:"ghost-btn",title:"LLM \u6309\u4E3B\u89D2\u53E3\u543B\u6DA6\u8272\uFF08\u53EF\u64A4\u9500\uFF09",onClick:W,disabled:t||R||d.trim()==="",children:[(0,X.jsx)(j,{name:"sparkles"}),R?"\u6DA6\u8272\u4E2D\u2026":"\u6DA6\u8272"]}),x!==null&&(0,X.jsxs)("button",{type:"button",className:"link-btn",onClick:y,disabled:R,title:"\u9000\u56DE\u6DA6\u8272\u524D\u7684\u539F\u8BDD",children:[(0,X.jsx)(j,{name:"undo"}),"\u64A4\u9500"]})]})})]})}var Zl=require("react/jsx-runtime");var Ke=require("react/jsx-runtime"),Se=require("react");var Hn=3600;function Co(){let[a,e]=(0,Se.useState)([]),t=(0,Se.useRef)(1),o=(0,Se.useRef)(new Map),r=(0,Se.useCallback)(d=>{let c=o.current.get(d);c&&clearTimeout(c),o.current.delete(d),e(m=>m.filter(p=>p.id!==d))},[]),l=(0,Se.useCallback)((d,c="info")=>{if(!d)return;let m=t.current;t.current+=1,e(p=>[...p.slice(-2),{id:m,text:d,kind:c}]),o.current.set(m,setTimeout(()=>r(m),Hn))},[r]),s=o;return(0,Se.useEffect)(()=>{let d=s.current;return()=>{for(let c of d.values())clearTimeout(c);d.clear()}},[s]),{toasts:a,push:l,dismiss:r}}function So({toasts:a,onDismiss:e}){return a.length===0?null:(0,Ke.jsx)("div",{className:"toast-stack stage-root",role:"status","aria-live":"polite",children:a.map(t=>(0,Ke.jsxs)("button",{type:"button",className:`toast toast-${t.kind}`,onClick:()=>e(t.id),title:"\u70B9\u6389",children:[t.kind==="info"?(0,Ke.jsx)(j,{name:"check"}):(0,Ke.jsx)(j,{name:"alert"}),(0,Ke.jsx)("span",{children:t.text})]},t.id))})}var wo=null;function _n(){return wo||(wo=new AudioContext),wo}var xt=class{ctx=null;master=null;lines=new Map;currentSeq=null;urls=new Map;replaySources=new Map;replayToken=0;replaySeq=null;maxSeqSeen=0;floorSeq=0;pausedSent=!1;enabled=!0;onNotify=null;onControl=null;onRequestVoice=null;wantReplay=null;wantReplayTimer=null;wantReplayToken=0;voided=new Set;pendingLines=new Map;get unlocked(){return this.ctx!==null}get pending(){let e=0;for(let t of this.lines.values())!t.faded&&!t.started&&(e+=1);return e}unlock(){if(!this.ctx){this.ctx=_n(),this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.ctx.resume().then(()=>this.notify());for(let e of this.lines.values())e.buffer===null&&!e.faded&&this.decode(e)}}clearWantReplay(){this.wantReplay=null,this.wantReplayToken+=1,this.wantReplayTimer!==null&&(clearTimeout(this.wantReplayTimer),this.wantReplayTimer=null)}setEnabled(e){this.enabled=e,e||(this.fadeAll(),this.lines.clear(),this.pendingLines.clear(),this.clearBackpressure(),this.clearWantReplay()),this.notify()}voiceState(e){return!this.enabled||e===null||e===void 0||this.voided.has(e)?"none":this.urls.has(e)?"ready":this.pendingLines.has(e)?(this.pruneStalePending(),this.pendingLines.has(e)?"pending":"none"):"none"}requestReplay(e){if(!this.enabled)return;let t=this.voiceState(e);if(this.voided.delete(e),t==="ready"){this.replay(e);return}if(this.wantReplay===e)return;this.clearWantReplay(),this.wantReplay=e;let o=this.wantReplayToken;this.wantReplayTimer=setTimeout(()=>{this.wantReplayToken===o&&this.clearWantReplay()},2e4),t==="none"&&this.onRequestVoice?.(e)}flushWantReplay(e){this.wantReplay===e&&(this.clearWantReplay(),this.urls.has(e)&&this.replay(e))}forgetLine(e){if(typeof e!="number")return;this.urls.delete(e),this.pendingLines.delete(e),this.voided.add(e),this.wantReplay===e&&this.clearWantReplay();let t=this.lines.get(e);t&&this.fadeLine(t),this.currentSeq===e&&(this.currentSeq=null),this.replaySeq===e&&this.stopReplay(),this.checkBackpressure(),this.notify()}audioFailed(e){this.voided.has(e)||(this.clearPending(e),this.flushWantReplay(e),this.notify())}markPending(e){!this.enabled||this.voided.has(e)||(this.pruneStalePending(),this.pendingLines.set(e,Date.now()),this.notify())}clearPending(e){this.pendingLines.delete(e)}pruneStalePending(){let e=Date.now()-45e3;for(let[t,o]of this.pendingLines)o<e&&this.pendingLines.delete(t)}async replay(e){if(!this.enabled||(this.unlock(),!this.ctx||!this.master))return!1;let t=this.urls.get(e);if(!t)return!1;this.stopReplay();let o=this.replayToken;this.replaySeq=e;let r=this.ctx,l=this.lines.get(e)?.buffer??null;if(!l)try{let s=await fetch(t);s.ok&&(l=await r.decodeAudioData(await s.arrayBuffer()))}catch{}return o!==this.replayToken||!this.enabled||!l?!1:(this.playBuffer(null,l,r.currentTime+.05),this.notify(),!0)}stopReplay(){if(this.replaySeq=null,!this.ctx){this.replaySources.clear();return}this.fadeSources(this.replaySources)}handleAudio(e){if(this.clearPending(e.seq),!this.enabled||this.voided.has(e.seq)||(this.rememberUrl(e.seq,e.url),this.flushWantReplay(e.seq),this.notify(),e.seq<=this.floorSeq)||this.currentSeq!==null&&e.seq<this.currentSeq)return;this.maxSeqSeen=Math.max(this.maxSeqSeen,e.seq);let t=this.lines.get(e.seq);t||(t={url:e.url,buffer:null,started:!1,chainEnd:null,faded:!1,sources:new Map},this.lines.set(e.seq,t)),!(t.faded||t.buffer)&&(this.ctx&&this.decode(t),this.checkBackpressure())}lineStarted(e,t){if(this.finishCurrent(),this.pruneBefore(e),this.checkBackpressure(),!this.enabled||e===void 0||!t){this.currentSeq=null;return}this.currentSeq=e;let o=this.lines.get(e);o&&!o.faded&&this.trySchedule(o)}fastForward(){this.finishCurrent(),this.checkBackpressure()}beatStarted(){this.fadeAll(),this.lines.clear(),this.pendingLines.clear(),this.clearBackpressure(),this.clearWantReplay(),this.currentSeq=null,this.floorSeq=this.maxSeqSeen,this.notify()}reset(){this.beatStarted(),this.urls.clear(),this.voided.clear()}holdsLine(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;return!e||!this.ctx||e.chainEnd===null?!1:this.ctx.currentTime<e.chainEnd}dispose(){this.fadeAll(),this.stopReplay(),this.clearWantReplay(),this.lines.clear(),this.pendingLines.clear(),this.clearBackpressure(),this.currentSeq=null}rememberUrl(e,t){this.urls.set(e,t);for(let o of this.urls.keys()){if(this.urls.size<=500)break;o!==e&&this.urls.delete(o)}}finishCurrent(){let e=this.currentSeq!==null?this.lines.get(this.currentSeq):null;e&&this.fadeLine(e),this.currentSeq=null}fadeAll(){for(let e of this.lines.values())this.fadeLine(e);this.stopReplay()}fadeLine(e){e.faded||(e.faded=!0,this.fadeSources(e.sources))}fadeSources(e){let t=this.ctx;if(!t){e.clear();return}let o=t.currentTime;for(let[r,l]of e)try{l.gain.cancelScheduledValues(o),l.gain.setValueAtTime(Math.max(l.gain.value,1e-4),o),l.gain.linearRampToValueAtTime(1e-4,o+100/1e3),r.stop(o+100/1e3+.02)}catch{}e.clear()}async decode(e){let t=this.ctx;if(t){try{let o=await fetch(e.url);if(!o.ok)throw new Error(`HTTP ${o.status}`);e.buffer=await t.decodeAudioData(await o.arrayBuffer())}catch{}!e.faded&&this.lines.get(this.currentSeq??-1)===e&&this.trySchedule(e)}}trySchedule(e){let t=this.ctx;if(!t||e.faded||e.started||!e.buffer)return;let o=t.currentTime+.03;this.playBuffer(e,e.buffer,o),e.started=!0,e.chainEnd=o+e.buffer.duration;let r=Math.max(0,(e.chainEnd-t.currentTime+.05)*1e3);setTimeout(()=>{this.checkBackpressure(),this.notify()},r)}playBuffer(e,t,o){let r=this.ctx,l=this.master;if(!r||!l)return;let s=r.createBufferSource();s.buffer=t;let d=r.createGain(),c=.015,m=Math.min(.04,t.duration/4);d.gain.setValueAtTime(1e-4,o),d.gain.linearRampToValueAtTime(1,o+c),d.gain.setValueAtTime(1,Math.max(o+c,o+t.duration-m)),d.gain.linearRampToValueAtTime(1e-4,o+t.duration),s.connect(d).connect(l),s.start(o);let p=e?e.sources:this.replaySources;p.set(s,d),s.onended=()=>{p.delete(s),d.disconnect(),s.disconnect()}}pruneBefore(e){if(e!==void 0)for(let t of this.lines.keys())t<e&&this.lines.delete(t)}clearBackpressure(){this.pausedSent&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}checkBackpressure(){!this.pausedSent&&this.pending>4?(this.pausedSent=!0,this.onControl?.({paused:!0})):this.pausedSent&&this.pending<=1&&(this.pausedSent=!1,this.onControl?.({paused:!1}))}notify(){this.onNotify?.()}};function ia(a){let e=new Map;for(let t of a??[]){let o=t.lastIndexOf(".");e.set(o===-1?t:t.slice(0,o),t)}return e}function Ao(a,e,t={},o={},r=[],l={}){let s=ia(e.backgrounds),d=ia(e.cg),c=ia(e.bgm),m=ia(e.ambient),p=ia(e.sfx),x=l.assetUrl??(h=>`/plays/${a}/assets/${h}`),L=(h,C)=>x(`${h}/${C}`),R=(h,C)=>k=>{let N=k?h.get(k):void 0;if(N)return L(C,N);let W=k?t[k]:void 0;return W?.ready?W.url:null},E=new Map,q=new Map;for(let h of r){if(!h.id)continue;let C=pr(h.id,h);C!==h.id&&E.set(h.id,C),q.has(C)||q.set(C,h.name??h.id)}return{bg:R(s,"backgrounds"),cg:R(d,"cg"),bgm:R(c,"bgm"),sfx:R(p,"sfx"),ambient:h=>R(m,"ambient")(h)??R(p,"sfx")(h)??R(c,"bgm")(h),spriteDirOf:h=>E.get(h)??h,spriteName:h=>q.get(h)??null,spriteIds:Object.keys(e).filter(h=>h.startsWith("sprites/")&&(e[h]?.length??0)>0).map(h=>h.slice(8)).sort(),sprite:(h,C)=>{let k=e[`sprites/${h}`]??[],N=(C?ia(k).get(C):void 0)??k[0];return N?L(`sprites/${h}`,N):null},spritePresentation:(h,C)=>{let k=fr(o,h,C??void 0);return{framing:k.framing??Et,stature:k.stature??ma,anchor:k.anchor??"bottom",...k.figureTop!==void 0?{figureTop:k.figureTop}:{},...k.figureHeight!==void 0?{figureHeight:k.figureHeight}:{}}}}}var zn=new Set(["say","narrate","thought","title"]),Jl=new Set(["say","narrate","thought","title","input"]);function Po(a,e){return a?Gn(Vn(a,e),e):e.filter(t=>Jl.has(t.type)&&t.text!=="").map(Ql)}function Ql(a){return a.type==="input"?{key:a.key,kind:"input",type:"say",actorId:"player",text:a.text,raw:a.raw,seq:a.seq??null,nodeId:null}:{key:a.key,kind:"line",type:a.type==="sfx"||a.type==="cg"||a.type==="scene"?"narrate":a.type,actorId:a.actorId??null,...a.nameOverride?{nameOverride:a.nameOverride}:{},text:a.text,raw:a.raw,seq:a.seq??null,nodeId:null,...a.type==="title"&&a.align?{align:a.align}:{},...a.type==="title"&&a.bg?{bg:a.bg}:{},...a.type==="title"&&a.ink?{ink:a.ink}:{}}}function Vn(a,e){let t=new Map(a.nodes.map(d=>[d.id,d])),o=new Map;for(let d of e)d.seq!==void 0&&o.set(d.seq,d);let r=e.filter(d=>d.type==="input"),l=[],s=a.pathIds;for(let d=0;d<s.length;d+=1){let c=t.get(s[d]);if(!c)continue;if(zn.has(c.kind)){let x=c.seq===void 0?void 0:o.get(c.seq);l.push({key:x?.key??c.id,kind:"line",type:c.kind,actorId:c.attrs.id??x?.actorId??null,...x?.nameOverride?{nameOverride:x.nameOverride}:{},text:x?.text||Ht(c.text),raw:x?.raw||c.text,seq:c.seq??null,nodeId:c.id,...c.kind==="title"?{align:Dt(c.attrs.align)?c.attrs.align:Mt,bg:Bt(c.attrs.bg)?c.attrs.bg.trim():ga,...Rt(c.attrs.ink)?{ink:c.attrs.ink.trim()}:{}}:{}});continue}if(c.kind!=="prompt")continue;let m=c.text;if(!m)continue;let p=c.seq===void 0?void 0:o.get(c.seq);if(p){let x=r.indexOf(p);x>=0&&r.splice(x,1)}else{let x=r.findIndex(L=>L.text===m);x>=0&&(p=r.splice(x,1)[0])}l.push({key:p?.key??c.id,kind:"input",type:"say",actorId:"player",text:p?.text||m,seq:c.seq??p?.seq??null,nodeId:c.id})}return l}function Gn(a,e){let t=new Set(a.map(o=>o.key));for(let o of e)!Jl.has(o.type)||o.text===""||t.has(o.key)||(a.push(Ql(o)),t.add(o.key));return a}var Yl=require("react");var Wn=require("react");var To="stage-voice";function Fo(a,e,t){let o=a.getItem(e);return o===null?t:o==="1"}function Mo(a,e,t){a.setItem(e,t?"1":"0")}var es=`/* @aivn/stage \u7684\u821E\u53F0\u6837\u5F0F\uFF1A\u4ECE apps/web/src/app.css \u539F\u6837\u642C\u6765\u7684\u5C0F\u8282\u3002
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
  /* \u4E3B\u9898\u84DD\uFF1A\u6765\u81EA\u5267\u76EE\u4E3B\u9898\u8272\u7684\u4E09\u4EF6\uFF08--play-accent / --play-accent-ink \u7531 plays/<id>/theme.css
     \u5199\u5728 :root \u4E0A\uFF1B\u6CA1\u6709\u5C31\u662F\u5F15\u64CE\u8FD9\u4E00\u6863\uFF09\u3002**\u5FC5\u987B\u8F6C\u4E00\u9053\u624B**\uFF1A\u821E\u53F0\u6839\u672C\u8EAB\u662F .stage-root\uFF0C
     \u5B83\u4E00\u65E6\u81EA\u5DF1\u58F0\u660E --accent\uFF0C\u4ECE <html> \u7EE7\u627F\u4E0B\u6765\u7684\u5267\u76EE\u4E3B\u9898\u8272\u5C31\u518D\u4E5F\u8FDB\u4E0D\u6765\uFF08\u5143\u7D20\u81EA\u8EAB\u7684\u58F0\u660E
     \u6C38\u8FDC\u538B\u8FC7\u7EE7\u627F\u503C\uFF0C\u8DDF\u9009\u62E9\u5668\u7279\u5F02\u6027\u65E0\u5173\uFF09\u2014\u20142026-10-10 \u4E4B\u524D\u5C31\u662F\u8FD9\u6837\uFF1A\u5DE5\u574A\u91CC\u6311\u4E86\u4E3B\u9898\u8272\uFF0C
     \u754C\u9762\u8DDF\u7740\u6362\u3001\u821E\u53F0\u4E00\u4E2A\u50CF\u7D20\u4E0D\u52A8\u3002--accent-soft \u4ECE --accent \u6D3E\u751F\uFF0C\u4E24\u79CD\u6DF1\u6D45\u5404\u4E00\u6761\u914D\u6BD4\u3002 */
  --accent: var(--play-accent, #2b6fae);
  --accent-ink: var(--play-accent-ink, #f7fbff);
  --accent-soft: color-mix(in srgb, var(--accent) 16%, #ffffff);
  --link: #2f5d7c;
  --radius: 2px; /* \u8FD1\u76F4\u89D2\uFF1AAVG \u7684\u7A97\u4E0E\u952E\u90FD\u4E0D\u5706 */

/* \u5B57\u4F53\uFF1A\u5168\u7AD9\u4E00\u5957\u65E0\u886C\u7EBF\u3002\u66FE\u7ECF\u53F0\u8BCD\u4E0E\u6807\u9898\u8D70\u886C\u7EBF\uFF08\u660E\u671D\u6C14\u8D28\uFF09\uFF0C\u4F46\u886C\u7EBF\u5B57\u4F53\u6808\u4F9D\u8D56
     \u672C\u673A\u88C5\u6709 Noto Serif CJK / \u5B8B\u4F53\uFF0C\u7F3A\u4E86\u4F1A\u6389\u5230\u6D4F\u89C8\u5668\u9ED8\u8BA4\u7684 serif\uFF0C\u7B14\u753B\u7EC6\u3001\u5C4F\u4E0A\u53D1\u865A\u3002 */
  --font-ui:
    system-ui, -apple-system, "Segoe UI", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei",
    sans-serif;

  /* \u2461 \u753B\u9762\uFF08\u73B0\u4EE3\u9AD8\u8D28\u611F Galgame \u73BB\u7483\u5C42\uFF09 */
  --stage-bg: #090c12; /* \u821E\u53F0\u886C\u5E95\uFF08\u56FE\u7247\u672A\u5230/\u52A0\u8F7D\u4E2D\u9732\u51FA\u7684\u5E95\uFF09 */
  /* \u4E3B\u9898\u8272\u6D3E\u751F\uFF1A\u821E\u53F0\u6240\u6709 chrome\uFF08\u53F0\u8BCD\u6761 / \u5FEB\u6377\u83DC\u5355 / \u9009\u80A2 / \u540D\u724C\u63CF\u8FB9 / \u5BFC\u6F14\u680F\uFF09\u90FD\u4ECE
     --accent \u63A8\u51FA\u6765\uFF0C\u5267\u76EE\u6362\u76AE\u65F6\u53EA\u8981\u6539 --accent \u4E00\u5904\u3002deep \u662F\u538B\u5728\u753B\u9762\u4E0A\u7684\u5B9E\u4F53\u8272\uFF0C
     wash \u662F\u5B83\u4E58\u4E0A alpha \u7684\u96FE\u3002 */
  --stage-accent-deep: color-mix(in srgb, var(--accent) 82%, #04101d);
  --stage-accent-wash: color-mix(in srgb, var(--stage-accent-deep) 62%, transparent);
  --stage-accent-edge: color-mix(in srgb, var(--accent) 55%, transparent);
  --stage-accent-lit: color-mix(in srgb, var(--accent) 45%, #ffffff);
  /* \u821E\u53F0 chrome\uFF1A\u5DE6\u4E0A\u6A21\u5F0F\u5207\u6362 / \u53F3\u4E0A\u5BFC\u6F14\u680F / \u53F3\u4E0B\u5FEB\u6377\u83DC\u5355\u5171\u7528\u7684\u4E00\u5957\u300C\u73BB\u7483\u6761\u300D\u3002
     \u6539\u8FD9\u91CC\u8981\u540C\u6B65 apps/web/src/app.css \u7684 :root\uFF08\u90A3\u8FB9\u662F\u540C\u4E00\u7EC4\u503C\u7684\u53E6\u4E00\u4EFD\uFF0C
     \u7ED9\u4E0D\u5728 .stage-root \u91CC\u7684\u821E\u53F0\u6D6E\u5C42\u7528\uFF09\u3002 */
  --stage-chrome-h: 30px;
  --stage-chrome-radius: 999px;
  /* \u6BD4\u5BF9\u8BDD\u6846\u66F4\u6DF1\uFF1A\u5BF9\u8BDD\u6846\u662F\u8FD9\u573A\u620F\u7684\u4E00\u90E8\u5206\uFF0C\u5DE5\u5177\u680F\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684\u5668\u5177\u3002
     \u538B\u6DF1\u63BA\u7684\u662F\u4E00\u652F**\u540C\u8272\u76F8\u7684\u6DF1\u84DD**\uFF08#071a2e\uFF09\uFF0C\u4E0D\u662F\u4E2D\u6027\u7070\u2014\u2014\u63BA\u7070\u4F1A\u628A\u8FD9\u6761\u84DD\u7684\u9971\u548C\u5EA6
     \u4E00\u8D77\u5403\u6389\uFF0C\u8BFB\u8D77\u6765\u5C31\u662F\u300C\u810F\u300D\uFF1B\u63BA\u540C\u8272\u76F8\u7684\u6DF1\u8272\u53EA\u538B\u660E\u5EA6\u3001\u4E0D\u52A8\u8272\u76F8\uFF0C
     \u4E8E\u662F\u8FD9\u6761\u5E95\u4E0E\u5DE5\u574A\u4FA7\u680F\u90A3\u679A\u540C\u6B3E\u5F00\u5173\u7684\u9009\u4E2D\u6001\uFF08\u5B9E\u5FC3 --accent\uFF09\u662F\u540C\u4E00\u652F\u84DD\u3002 */
  --stage-chrome-deep: color-mix(in srgb, var(--accent) 56%, #071a2e);
  /* \u6E10\u53D8\u7684\u4E24\u6863\u90FD\u662F**\u4E0D\u900F\u660E\u8272**\uFF1A\u9876\u63BA\u6D45\u84DD\u7ED9\u4E00\u9053\u4EAE\u5E26\uFF0C\u5E95\u843D\u5728 deep\u3002\u4E0A\u4E00\u7248\u662F\u540C\u4E00\u4E2A\u8272
     \u53EA\u6539 alpha\uFF0884% \u2192 97%\uFF09\uFF0C\u753B\u9762\u4EAE\u5904\u4ECE\u9876\u4E0A\u90A3 16% \u900F\u4E0A\u6765\uFF0C\u6574\u6761\u8BFB\u8D77\u6765\u662F\u4E00\u5757\u810F\u6C61
     \u800C\u4E0D\u662F\u4E00\u5757\u73BB\u7483\u3002\u8FD9\u91CC\u53EA\u7559\u4E00\u70B9\u70B9\u900F\u660E\u5EA6\uFF0892 / 99\uFF09\u591F\u73BB\u7483\u611F\u5C31\u884C\u3002 */
  --stage-chrome-lit: color-mix(in srgb, var(--stage-chrome-deep) 78%, #6ea6dc);
  --stage-chrome-bg: linear-gradient(180deg,
    color-mix(in srgb, var(--stage-chrome-lit) 92%, transparent),
    color-mix(in srgb, var(--stage-chrome-deep) 99%, transparent));
  /* \u63CF\u8FB9\u8D70\u4E0D\u900F\u660E\u7684\u6D45\u84DD\uFF0C\u4E0D\u8D70\u300Caccent \u63BA\u534A\u900F\u660E\u767D\u300D\u2014\u2014\u767D\u63BA\u8FDB\u534A\u900F\u660E\u91CC\u5C31\u662F\u4E00\u5C42\u7070\u96FE */
  --stage-chrome-edge: color-mix(in srgb, var(--accent) 55%, #a9cdec);
  --stage-chrome-gloss: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  /* \u5BFC\u6F14\u680F\u90A3\u5C42\u300C\u5F88\u6D45\u7684\u4E2D\u6027\u73BB\u7483\u300D\uFF1A\u5B83\u538B\u5728\u753B\u9762\u4E0A\u3001\u53C8\u662F\u4E09\u5904 chrome \u91CC\u6700\u4E0D\u8BE5\u62A2\u620F\u7684\u4E00\u5904\uFF0C
     \u6240\u4EE5\u5E95\u8272\u6BD4\u53E6\u5916\u4E24\u5904\u6DE1\u2014\u2014\u4F46\u90A3\u6761\u6DE1\u8981\u843D\u5728\u4E00\u652F\u5E72\u51C0\u7684\u51B7\u7070\u9636\u4E0A\u62AC\u51FA\u6765\uFF0C\u4E0D\u662F\u63BA\u767D\u63BA\u51FA\u6765\u7684\u7070\u767D\u3002
     \u4E0A\u4E00\u7248\u63BA\u7684\u662F rgb(255 255 255) \u4E14\u5E26\u4E24\u4E09\u6210\u900F\u660E\uFF080.95 / 0.84\uFF09\uFF1A\u4EAE\u753B\u9762\u4ECE\u5E95\u4E0B\u900F\u4E0A\u6765\uFF0C
     \u8FD9\u5757\u5C31\u6210\u4E86\u4E00\u56E2\u53D1\u7070\u7684\u725B\u5976\u3002\u6D45\u8272\u4E3B\u9898\u5C31\u662F\u8FD9\u5957\uFF1B\u6DF1\u8272\u4E3B\u9898\u6574\u6761\u7FFB\u6DF1\uFF08\u89C1\u4E0B\u9762 dark \u90A3\u4E00\u5757\uFF09\u3002
     \u5E95\u8272\u662F\u4E00\u9053**\u9876\u4EAE\u5E95\u6697**\u7684\u6D45\u6E10\u53D8\uFF08\u4E0E\u53F3\u4E0B\u89D2\u5FEB\u6377\u83DC\u5355\u540C\u4E00\u624B\u6CD5\uFF09\uFF0C\u52A0\u4E00\u9053\u9876\u7F18\u9AD8\u5149\u2014\u2014
     \u4E24\u6863\u843D\u5728\u540C\u4E00\u652F\u4E2D\u6027\u8272\u9636\u4E0A\uFF08\u767D \u2192 slate-100\uFF09\uFF0C\u4E0D\u63BA\u4E3B\u9898\u8272\u3001\u4E0D\u5E26\u534A\u900F\u660E\u3002 */
  --stage-chrome-quiet-bg: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  --stage-chrome-quiet-edge: #e2e8f0;
  --stage-chrome-quiet-ink: #64748b;
  --stage-chrome-quiet-ink-hover: #0f172a;
  --stage-chrome-quiet-hover: #f1f5f9;
  --stage-chrome-quiet-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.9),
    0 2px 10px rgb(15 23 42 / 0.12);
  /* \u9009\u80A2\u7684\u4E24\u6863\u5E95\uFF1A\u6DF1\u8272\u57FA\u7EBF\u662F\u63BA\u8FDB\u4E3B\u9898\u8272\u7684\u6697\u6D77\u84DD\u7F0E\u5E26\uFF08\u4E0E\u5E95\u90E8 ATRI \u6DF1\u8272\u53F0\u8BCD\u6761\u540C\u6E90\uFF09\uFF0C
     \u6D45\u8272\u4E0B\u5207\u56DE\u7EB8\u767D\u6D45\u5E95\uFF1B\u60AC\u505C/\u9009\u4E2D\u6362\u6210\u4E3B\u9898\u8272\u5B9E\u5FC3\u4EAE\u5E26\u3002 */
  --stage-choice-wash: color-mix(in srgb, var(--accent) 26%, #0b1626);
  --stage-choice-solid: color-mix(in srgb, var(--accent) 88%, #0c2340);
  --dialog-bg: linear-gradient(180deg, rgba(16, 21, 32, 0.86) 0%, rgba(9, 12, 19, 0.95) 100%);
  --dialog-line: rgba(255, 255, 255, 0.16);
  --dialog-ink: #f8fafc;
  --dialog-ink-soft: #cbd5e1; /* \u65C1\u767D */
  --dialog-ink-thought: #c4b5fd; /* \u5185\u5FC3\u72EC\u767D */
  --dialog-ink-faint: rgba(248, 250, 252, 0.55); /* \u6B21\u8981\u63D0\u793A\uFF1A\u300C\u56DE\u770B\u4E2D\u300D\u300C\u5DF2\u9009\u8FC7\u300D */
  /* \u5931\u8D25\u6001\u7684\u8272\uFF1Apending \u9762\u677F\u4E0A\u7684\u5931\u8D25\u884C\u4E0E\u6536\u8D77\u5FBD\u6807\u3002\u6DF1\u5E95\u4E0A\u8981\u591F\u4EAE\u624D\u8BA4\u5F97\u51FA\u662F\u8B66\u53F7 */
  --dialog-bad: #fb7185;
  --dialog-text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  --dir-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  --dialog-hover: rgba(255, 255, 255, 0.12);
  --dialog-veil: rgba(255, 255, 255, 0.06);
  --dialog-shadow: 0 16px 48px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
  --title-ink: #f8fafc;
  --title-font:
    system-ui, -apple-system, "Segoe UI", "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei",
    sans-serif;
  --title-shadow: 0 2px 14px rgb(0 0 0 / 0.72);
  /* \u821E\u53F0\u6D6E\u5C42\u7684\u5706\u89D2\uFF1A\u53F0\u8BCD\u6761 + \u753B\u9762\u4E0A\u6D6E\u7684\u90A3\u51E0\u5757\uFF08\u5BFC\u6F14\u5DE5\u5177\u680F / \u6392\u961F\u9762\u677F\uFF09 */
  --stage-radius: 12px;
  /* \u8BF4\u8BDD\u4EBA\u540D\u724C\uFF1A\u767D\u5E95 + \u89D2\u8272\u4E3B\u9898\u63CF\u8FB9 + \u4F18\u96C5\u9ED1\u5B57 */
  --nameplate-bg: rgba(255, 255, 255, 0.98);
  --nameplate-ink: #0f172a;
  --nameplate-line: var(--character-color, var(--accent, #3b82f6));
  --sprite-dim: 0.55; /* \u975E\u53D1\u8A00\u4EBA\u7ACB\u7ED8\u538B\u6697\u5F3A\u5EA6 */
  --choice-bg: linear-gradient(180deg, rgba(22, 28, 42, 0.9) 0%, rgba(13, 17, 26, 0.96) 100%);
  --choice-line: rgba(255, 255, 255, 0.18);
  --choice-ink: #f8fafc;
  --choice-active-bg: color-mix(in srgb, var(--accent) 35%, rgba(22, 28, 42, 0.95));
  --choice-scrim: linear-gradient(180deg, transparent 20%, rgba(8, 10, 16, 0.65) 100%);

  /* \u5F39\u7A97\uFF08Modal\uFF09\u4EE4\u724C\uFF1A\u4E00\u5757\u538B\u5728\u9875\u9762\u4E0A\u7684\u5361\u7247\u3002\u6DF1\u6D45\u4E24\u6863\u90FD\u5728\u4EE4\u724C\u91CC\uFF0C
     \u5F39\u7A97\u672C\u8EAB\u4E00\u5904\u989C\u8272\u90FD\u4E0D\u5199\u6B7B\u2014\u2014\u5B83\u662F\u5168\u7AD9\u5171\u7528\u7684\u90A3\u4E00\u679A
     \uFF08\u5BFC\u6F14\u52A8\u4F5C / \u5220\u5468\u76EE / \u5220\u5267\u76EE / \u751F\u56FE / \u5DE5\u574A\u786E\u8BA4\u90FD\u8D70\u5B83\uFF09\u3002
     \u57FA\u7EBF\u8FD9\u4E00\u4EFD\u662F**\u6DF1\u8272**\u90A3\u4E00\u6863\uFF0C\u548C --dialog-* / --choice-* \u540C\u4E00\u4E2A\u9053\u7406\uFF1A
     \u5BBF\u4E3B\u4E0D\u4E00\u5B9A\u8BBE data-ui-theme\uFF08DSH \u63D2\u4EF6\u91CC\u7684\u821E\u53F0\u5C31\u5728\u6CA1\u6709\u5C5E\u6027\u7684 html \u4E0B\u8DD1\uFF09\uFF0C
     \u6CA1\u6709\u5C5E\u6027\u65F6\u5B83\u5FC5\u987B\u8FD8\u662F\u5B83\u4ECA\u5929\u7684\u6837\u5B50\uFF1B\u6D45\u8272\u90A3\u4E00\u6863\u5728\u4E0B\u9762 html[data-ui-theme="light"] \u91CC\u3002 */
  --modal-bg: linear-gradient(175deg,
    color-mix(in srgb, var(--accent) 18%, rgba(6, 15, 30, 0.94)) 0%,
    color-mix(in srgb, var(--accent) 10%, rgba(3, 8, 18, 0.97)) 100%);
  --modal-edge: color-mix(in srgb, var(--accent) 42%, rgba(255, 255, 255, 0.18));
  --modal-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 0 40px color-mix(in srgb, var(--accent) 24%, transparent),
    0 24px 56px rgba(0, 0, 0, 0.65);
  --modal-glow: color-mix(in srgb, var(--accent) 80%, #ffffff);
  --modal-scrim: radial-gradient(circle at 50% 45%, rgba(4, 12, 24, 0.58) 0%, rgba(1, 4, 10, 0.85) 100%);
  --modal-hover: rgba(255, 255, 255, 0.12);
  --modal-line: color-mix(in srgb, var(--accent) 22%, rgba(255, 255, 255, 0.08));
  --modal-field: rgba(2, 7, 16, 0.6);
  --modal-field-edge: color-mix(in srgb, var(--accent) 30%, rgba(255, 255, 255, 0.14));
  /* \u5360\u4F4D\u7B26\u3001\u5FEB\u6377\u952E\u63D0\u793A\u3001\u5173\u95ED\u952E\u5171\u7528\u8FD9\u4E00\u6863\u300C\u6BD4\u6B63\u6587\u6DE1\u300D\u7684\u58A8\u8272 */
  --modal-faint: rgba(255, 255, 255, 0.5);
  --modal-btn-bg: rgba(255, 255, 255, 0.06);
  --modal-btn-edge: rgba(255, 255, 255, 0.16);
  --modal-btn-hover-bg: rgba(255, 255, 255, 0.14);
  --modal-btn-hover-edge: rgba(255, 255, 255, 0.28);
  --modal-danger: #fca5a5;
  --modal-danger-bg: rgba(239, 68, 68, 0.2);
  --modal-danger-edge: rgba(239, 68, 68, 0.5);
  --modal-danger-bg-hover: rgba(239, 68, 68, 0.35);
  --modal-danger-ink-hover: #ffffff;
  --shadow: 0 6px 18px rgb(34 24 16 / 0.16);

  /* \u2462 \u8FD0\u52A8 */
  --type-ms: 35; /* \u6BCF\u5B57\u6BEB\u79D2 */
  --pause-short-ms: 120; /* \u9017\u53F7\u7C7B\u989D\u5916\u505C\u987F */
  --pause-long-ms: 240; /* \u53E5\u53F7\u7C7B\u989D\u5916\u505C\u987F */
  --fade-ms: 220ms; /* \u7ACB\u7ED8\u5DEE\u5206 / \u80CC\u666F\u5207\u6362 */
  --move-ms: 380ms; /* \u7ACB\u7ED8\u6362\u4F4D\u3001\u6362\u666F\u522B\uFF08\u8FD0\u955C\uFF09\u2014\u2014\u6BD4\u5DEE\u5206\u6162\uFF0C\u8D70\u8FC7\u53BB\u4E0D\u662F\u77AC\u79FB */
  --act-ms: 520ms; /* \u884C\u4E3A\u8BCD\u6F14\u51FA\u65F6\u957F\uFF08\u70B9\u4E00\u6B21\u5934\u3001\u6296\u4E00\u4E0B\uFF09 */
  --trans-ms: 560ms; /* \u6362\u5C42\u8FC7\u6E21\uFF08\u8F6C\u573A cross-fade / fade\uFF09 */
  --fx-ms: 360ms; /* \u4E00\u6B21\u6027\u5C4F\u5E55\u6548\u679C\uFF08\u95EA\u5149\u57FA\u7840\u65F6\u957F\uFF1B\u6296\u52A8\u5728\u7C7B\u91CC\u53E6\u7ED9\uFF09 */
  /* \u7F13\u52A8\uFF1A\u8D77\u6B65\u5FEB\u3001\u5C3E\u5DF4\u957F\u3002\u7AD9\u4F4D\u4E0E\u8FD0\u955C\u90FD\u662F\u300C\u4E00\u4E2A\u6F14\u5458\u8D70\u8FC7\u53BB\u300D\u7684\u89C2\u611F\uFF0C
     ease-in-out \u5300\u52A0\u901F\u5300\u51CF\u901F\u6700\u50CF\u3002 */
  --move-ease: cubic-bezier(0.33, 0, 0.2, 1);
  --hover-ms: 140ms;
}

@media (prefers-reduced-motion: reduce) {
  .stage-root {
    --type-ms: 0;
    --fade-ms: 0ms;
    --move-ms: 0ms;
    --act-ms: 0ms;
    --trans-ms: 0ms;
    --fx-ms: 0ms;
  }
  /* \u6296\u52A8\u7684\u65F6\u957F\u6765\u81EA\u884C\u5185\u53D8\u91CF\uFF08\u6309\u6863\u4F4D\u7B97\uFF09\uFF0C\u5A92\u4F53\u67E5\u8BE2\u8986\u76D6\u4E0D\u4E86\u5B83\uFF0C\u76F4\u63A5\u6390\u6389\u52A8\u753B\u3002
     \u95EA\u5149\u6390\u6389\u52A8\u753B\u540E\u843D\u56DE\u57FA\u7840 opacity:0\uFF0C\u7B49\u4E8E\u4E0D\u95EA\u3002 */
  .stage-root .theater-camera.shaking,
  .stage-root .theater-flash {
    animation: none;
  }
}

/* \u4E3B\u9898\u5207\u6362\uFF1A\u7EB8\u9762\uFF08\u754C\u9762\uFF09\u4E0E\u753B\u9762\uFF08\u821E\u53F0\uFF09**\u5171\u7528\u4E00\u5957**\uFF0C\u7531 <html> \u4E0A\u7684 data-ui-theme \u9A71\u52A8\u3002
   \u821E\u53F0\u66FE\u7ECF\u53E6\u6709 data-stage-theme\uFF08\u6052\u6DF1\u8272\uFF09\uFF0C2026-10-10 \u64A4\u6389\uFF1A\u5207\u4E00\u6B21\u6DF1\u6D45\u53EA\u8BE5\u5207\u4E00\u5904\uFF0C
   \u53F0\u8BCD\u6761 / \u9009\u80A2 / \u540D\u724C / chrome / \u5F39\u7A97\u5168\u90FD\u8DDF\u7740\u5B83\u8D70\u3002
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
  /* \u6696\u9ED1\u90A3\u4E00\u6863\uFF1A\u5267\u76EE\u7ED9\u4E86 --play-accent-dark \u5C31\u7528\u5B83\uFF08\u7EB8\u9762\u6863\u538B\u5728\u6696\u9ED1\u4E0A\u505A\u5B57\u8BFB\u4E0D\u6E05\uFF09\uFF0C
     \u6CA1\u7ED9\u5C31\u9000\u56DE\u7EB8\u9762\u6863\u2014\u2014\u300C\u4E3B\u9898\u8272\u6D88\u5931\u300D\u6BD4\u300C\u4E3B\u9898\u8272\u504F\u6697\u300D\u7CDF\u5F97\u591A\u3002 */
  --accent: var(--play-accent-dark, var(--play-accent, #8ab6dd));
  --accent-ink: var(--play-accent-dark-ink, var(--play-accent-ink, #101820));
  --accent-soft: color-mix(in srgb, var(--accent) 18%, transparent);
  --link: #8fb8d4;
  /* \u5BFC\u6F14\u680F\uFF1A\u6696\u9ED1\u754C\u9762\u4E0A\u7FFB\u6210\u4E00\u6761\u6DF1\u73BB\u7483\uFF08\u6BD4\u5DE6\u4E0A\u89D2\u90A3\u679A\u66F4\u6C89\u3001\u5B57\u8D70\u51B7\u767D\uFF09\uFF0C
     \u4E0D\u518D\u662F\u753B\u9762\u53F3\u4E0A\u89D2\u4E00\u5757\u523A\u773C\u7684\u767D\u6591\u3002\u5E95\u8272\u4E0E\u6D45\u8272\u90A3\u4EFD\u540C\u6784\u2014\u2014\u9876\u4EAE\u5E95\u6697\u4E00\u9053\u6D45\u6E10\u53D8\uFF0C
     \u53EA\u662F\u4E24\u6863\u90FD\u843D\u5728\u51B7\u7070\u90A3\u4E00\u9636\u4E0A\uFF08#161b22 \u2192 #0d1117\uFF09\uFF0C\u4E0D\u63BA\u4E3B\u9898\u8272\u3002 */
  --stage-chrome-quiet-bg: linear-gradient(180deg, #232a34 0%, #1c2128 100%);
  --stage-chrome-quiet-edge: #30363d;
  --stage-chrome-quiet-ink: #8b949e;
  --stage-chrome-quiet-ink-hover: #f0f6fc;
  --stage-chrome-quiet-hover: #21262d;
  --stage-chrome-quiet-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.06),
    0 2px 10px rgb(0 0 0 / 0.35);
}

/* \u4E3B\u8272\u9884\u8BBE\uFF1A\u8BBE\u7F6E\u9875\u9009\u54EA\u4E00\u6863\u5C31\u6302\u54EA\u4E2A data-accent\uFF08useTheme.applyAccent\uFF09\u3002
   \u6BCF\u4E2A\u9884\u8BBE\u7ED9\u6D45\u5E95/\u6DF1\u5E95\u4E24\u5957\u503C\u2014\u2014\u540C\u4E00\u8272\u76F8\u5728\u7EB8\u9762\u4E0A\u8981\u538B\u5F97\u4F4F\u3001\u5728\u6696\u9ED1\u4E0A\u8981\u63D0\u5F97\u8D77\u3002
   \u540C\u6837\u8D70 var(--play-accent, \u2026)\uFF1A\u5267\u76EE\u6311\u4E86\u4E3B\u9898\u8272\u5C31\u662F\u5267\u76EE\u4F18\u5148\uFF0C\u9884\u8BBE\u53EA\u51B3\u5B9A\u300C\u6CA1\u6311\u65F6\u662F\u54EA\u4E00\u6863\u300D
   \uFF08app.css \u91CC\u90A3\u4EFD\u662F\u540C\u4E00\u5957\u503C\u7684\u5B6A\u751F\uFF0C\u7ED9\u4E0D\u5728 .stage-root \u5B50\u6811\u91CC\u7684\u6D6E\u5C42\u7528\uFF09\u3002
   --accent-soft \u4E0D\u518D\u9010\u6863\u5199\u6B7B\uFF1A\u5B83\u4ECE --accent \u6D3E\u751F\uFF0C\u6DF1\u6D45\u4E24\u6761\u914D\u6BD4\u89C1\u4E0A\u9762\u4E24\u4E2A\u57FA\u7840\u5757\u3002
   custom \u4E0D\u5728\u8FD9\u91CC\uFF1A\u90A3\u4E2A\u8272\u7531 useTheme \u5199\u6210\u5185\u8054 --accent\u3002 */
html[data-accent="teal"] .stage-root {
  --accent: var(--play-accent, #2f6f73);
  --accent-ink: var(--play-accent-ink, #f3fbfa);
}
html[data-accent="green"] .stage-root {
  --accent: var(--play-accent, #4a6f45);
  --accent-ink: var(--play-accent-ink, #f6faf2);
}
html[data-accent="violet"] .stage-root {
  --accent: var(--play-accent, #6a5599);
  --accent-ink: var(--play-accent-ink, #faf7ff);
}
html[data-accent="wine"] .stage-root {
  --accent: var(--play-accent, #9b3b4f);
  --accent-ink: var(--play-accent-ink, #fff7f3);
}
html[data-ui-theme="dark"][data-accent="teal"] .stage-root {
  --accent: var(--play-accent-dark, var(--play-accent, #79b8bd));
  --accent-ink: var(--play-accent-dark-ink, var(--play-accent-ink, #0e1a1b));
}
html[data-ui-theme="dark"][data-accent="green"] .stage-root {
  --accent: var(--play-accent-dark, var(--play-accent, #9cbb92));
  --accent-ink: var(--play-accent-dark-ink, var(--play-accent-ink, #131a11));
}
html[data-ui-theme="dark"][data-accent="violet"] .stage-root {
  --accent: var(--play-accent-dark, var(--play-accent, #ab98d8));
  --accent-ink: var(--play-accent-dark-ink, var(--play-accent-ink, #16121f));
}
html[data-ui-theme="dark"][data-accent="wine"] .stage-root {
  --accent: var(--play-accent-dark, var(--play-accent, #d98a7a));
  --accent-ink: var(--play-accent-dark-ink, var(--play-accent-ink, #1a1512));
}

/* \u821E\u53F0\u6D45\u8272\uFF1A\u53F0\u8BCD\u6761 / \u9009\u80A2\u5361\u6574\u5957\u6362\u6210\u6D45\u5E95\u6DF1\u5B57\uFF08\u4E0E app.css \u91CC\u90A3\u4EFD\u662F\u540C\u4E00\u5957\u503C\uFF0C
   \u4E24\u5904\u8981\u4E00\u8D77\u6539\u2014\u2014\u90A3\u8FB9\u90A3\u4EFD\u7ED9\u300C\u4E0D\u5728 .stage-root \u5B50\u6811\u91CC\u300D\u7684\u821E\u53F0\u6D6E\u5C42\u7528\uFF09\u3002
   \u8FD9\u5957\u7684\u53D6\u820D\u548C\u6DF1\u8272\u76F8\u53CD\u2014\u2014\u6DF1\u8272\u6A21\u5F0F\u9760\u300C\u73BB\u7483\u538B\u4F4F\u753B\u9762\u300D\uFF0C\u6D45\u8272\u6CA1\u6709\u538B\u7684\u4F59\u5730\uFF0C
   \u6240\u4EE5\u5E95\u8272\u5FC5\u987B\u5B9E\uFF080.88 \u8D77\u6B65\uFF09\u800C\u4E0D\u662F\u534A\u900F\u660E\uFF0C\u5426\u5219\u80CC\u666F\u56FE\u7684\u4EAE\u90E8\u4F1A\u900F\u4E0A\u6765\u5403\u6389\u5B57\u3002 */
html[data-ui-theme="light"] .stage-root {
  --stage-bg: #f8fafc;
  --dialog-bg: linear-gradient(178deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98));
  --dialog-line: rgba(203, 213, 225, 0.6);
  --dialog-ink: #0f172a;
  --dialog-ink-soft: #334155;
  --dialog-ink-thought: #475569;
  --dialog-ink-faint: rgba(51, 65, 85, 0.6);
  --dialog-bad: #e11d48;
  --dialog-text-shadow: none;
  --dir-text-shadow: none;
  --dialog-hover: rgba(0, 0, 0, 0.05);
  --dialog-veil: rgba(0, 0, 0, 0.03);
  --dialog-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  /* \u53F0\u8BCD\u6761 / \u9009\u80A2\u5361\uFF1A\u6D45\u8272\u4E0B\u662F\u300C\u7EB8\u5E95 + \u6DF1\u58A8\u5B57\u300D\uFF0C\u4F46\u7EB8\u5E95\u4E0D\u662F\u7EAF\u7EB8\u767D\u2014\u2014
     \u5E95\u8272\u63BA\u4E00\u6210\u591A\u4E3B\u9898\u8272\uFF0C\u5361\u9762\u4E0E\u53F0\u8BCD\u6761\u624D\u8DDF\u7740\u5267\u76EE\u6362\u8272\u76F8\uFF08\u65E9\u5148\u8FD9\u91CC\u662F\u5199\u6B7B\u7684\u7EB8\u767D\uFF0C
     \u4E8E\u662F\u6DF1\u8272\u4E0B\u6574\u6761\u53F0\u8BCD\u6761\u662F\u4E3B\u9898\u8272\u3001\u5207\u6D45\u8272\u5C31\u53EA\u5269\u767D\u4E0E\u9ED1\uFF09\u3002\u63BA\u5F97\u591A\u4E00\u70B9\u662F\u56E0\u4E3A
     \u6D45\u8272\u6CA1\u6709\u73BB\u7483\u90A3\u5C42\u538B\u6DF1\uFF0C\u592A\u6DE1\u7684\u8272\u8C03\u5728\u4EAE\u80CC\u666F\u56FE\u4E0A\u6839\u672C\u770B\u4E0D\u51FA\u6765\u3002 */
  /* \u63BA\u5F97\u4E0D\u900F\u660E\uFF1A\u6D45\u8272\u4E0B\u6CA1\u6709\u73BB\u7483\u90A3\u5C42\u538B\u6DF1\uFF0C\u5E95\u8272\u5F97\u505A\u5B9E\uFF0C\u5426\u5219\u80CC\u666F\u56FE\u7684\u6697\u90E8\u900F\u4E0A\u6765\u4F1A\u628A
     \u4E3B\u9898\u8272\u5B57\u5403\u6389\u4E00\u6863\uFF08\u5B9E\u6D4B 0.94 \u4E0D\u900F\u660E\u5EA6\u5728\u7EAF\u9ED1\u573A\u4E0B\u4ECE 4.67:1 \u6389\u5230 4.4:1\uFF09\u3002 */
  --choice-bg: color-mix(in srgb, var(--accent) 10%, rgb(252 250 246));
  --choice-line: color-mix(in srgb, var(--accent) 38%, rgb(120 108 92 / 0.4));
  /* \u5361\u9762\u6B63\u6587\u8D70\u4E3B\u9898\u8272\u7684\u6DF1\u58A8\u7248\uFF1A\u4E0E\u6DF1\u8272\u90A3\u5957\uFF08\u767D\u7F0E\u5E26 + \u4E3B\u9898\u8272\u5B57\uFF09\u5BF9\u79F0\u3002
     \u63BA\u6BD4 78% \u662F\u91CF\u51FA\u6765\u7684\uFF1A\u8272\u677F\u516B\u6863\u5728\u8FD9\u4E00\u6863\u5E95\u8272\u4E0A\u6700\u4F4E 4.67:1\uFF08\u60AC\u505C\u90A3\u6863\u53E6\u914D 62%\uFF0C\u89C1\u4E0B\uFF09\u3002 */
  --choice-ink: color-mix(in srgb, var(--accent) 78%, #0b2545);
  --choice-active-bg: color-mix(in srgb, var(--accent) 26%, rgb(252 250 246));
  --choice-scrim: linear-gradient(180deg, transparent 24%, rgb(239 236 229 / 0.55));
  --nameplate-bg: rgb(252 250 246 / 0.94);
  --nameplate-ink: #23201c;
  --nameplate-line: rgb(90 80 68 / 0.45);
  --title-ink: #23201c;
  --title-shadow: 0 2px 12px rgb(255 255 255 / 0.6);
  /* \u5F39\u7A97\uFF1A\u7EB8\u767D\u5361\u7247 + \u6DF1\u58A8\u5B57\uFF08\u6DF1\u8272\u90A3\u4E00\u4EFD\u662F\u57FA\u7EBF\uFF0C\u89C1\u4E0A\u9762 .stage-root \u91CC\u7684\u6CE8\u91CA\uFF09 */
  --modal-bg: linear-gradient(175deg, rgb(255 255 255 / 0.97) 0%, rgb(245 246 248 / 0.99) 100%);
  --modal-edge: color-mix(in srgb, var(--accent) 24%, rgb(120 108 92 / 0.28));
  --modal-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9), 0 18px 44px rgb(48 40 30 / 0.22);
  --modal-glow: color-mix(in srgb, var(--accent) 70%, #ffffff);
  --modal-scrim: radial-gradient(circle at 50% 45%, rgb(70 60 48 / 0.34) 0%, rgb(38 32 24 / 0.5) 100%);
  --modal-hover: rgb(120 108 92 / 0.12);
  --modal-line: color-mix(in srgb, var(--accent) 20%, rgb(120 108 92 / 0.24));
  --modal-field: rgb(255 255 255 / 0.72);
  --modal-field-edge: color-mix(in srgb, var(--accent) 22%, rgb(120 108 92 / 0.34));
  --modal-faint: color-mix(in srgb, var(--ink) 64%, transparent);
  --modal-btn-bg: rgb(120 108 92 / 0.08);
  --modal-btn-edge: rgb(120 108 92 / 0.26);
  --modal-btn-hover-bg: rgb(120 108 92 / 0.16);
  --modal-btn-hover-edge: rgb(120 108 92 / 0.42);
  --modal-danger: #b3372f;
  --modal-danger-bg: color-mix(in srgb, #b3372f 12%, transparent);
  --modal-danger-edge: color-mix(in srgb, #b3372f 42%, transparent);
  --modal-danger-bg-hover: color-mix(in srgb, #b3372f 22%, transparent);
  --modal-danger-ink-hover: #7d2019;
}

/* \u2500\u2500 \u6D45\u8272\u821E\u53F0\uFF1A\u628A ATRI \u90A3\u51E0\u5757\u8868\u9762\u63A5\u56DE\u4E3B\u9898\u4EE4\u724C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u53F0\u8BCD\u6761 / \u6B63\u6587 / \u540D\u724C / \u9009\u80A2\u5728\u6DF1\u8272\u4E0B\u662F\u300C\u767D\u5B57\u538B\u5728\u6DF1\u73BB\u7483\u4E0A\u300D\uFF0C\u6D45\u8272\u4E0B\u5FC5\u987B\u6574\u4F53\u7FFB\u8FC7\u6765\uFF1A
   \u5E95\u677F\u505A\u5B9E\uFF08\u6D45\u8272\u6CA1\u6709\u538B\u4F4F\u753B\u9762\u7684\u4F59\u5730\uFF0C\u534A\u900F\u660E\u4F1A\u88AB\u80CC\u666F\u4EAE\u90E8\u5403\u6389\uFF09\uFF0C\u5B57\u8D70\u6DF1\u58A8\u3002
   \u6DF1\u8272\u90A3\u5957\u4E00\u4E2A\u5B57\u8282\u90FD\u4E0D\u52A8\u2014\u2014\u4E0B\u9762\u6BCF\u6761\u90FD\u53EA\u6302\u5728 html[data-ui-theme="light"] \u4E0B\u3002
   \uFF08\u91CD\u8BBE\u8BA1\u65F6\u8FD9\u51E0\u5757\u6362\u6210\u4E86\u5199\u6B7B\u7684\u767D\u5B57\u4E0E\u4E3B\u9898\u8272\u6D3E\u751F\u5E95\uFF0C\u4E3B\u9898\u4EE4\u724C\u6CA1\u4EBA\u8BFB\u4E86\uFF0C
   \u4E8E\u662F\u5207\u6362\u53EA\u6709\u51E0\u5904\u5C0F\u63D0\u793A\u5B57\u5728\u8DDF\u7740\u53D8\u2014\u2014\u8FD9\u4E00\u8282\u5C31\u662F\u628A\u5B83\u63A5\u56DE\u53BB\u3002\uFF09 */
/* \u5E95\u677F\u7167\u6DF1\u8272\u90A3\u5957\u7684\u7ED3\u6784\uFF08\u81EA\u4E0A\u800C\u4E0B\u6E10\u6D53\uFF09\uFF0C\u53EA\u662F\u6362\u6210\u300C\u63BA\u4E86\u4E3B\u9898\u8272\u7684\u7EB8\u767D\u300D\u2014\u2014\u76F4\u63A5\u94FA --dialog-bg
   \u90A3\u6761\u5B9E\u5FC3\u6E10\u53D8\u4F1A\u5728\u753B\u9762\u4E0A\u5207\u51FA\u4E00\u6761\u6A2A\u7EBF\uFF0C\u50CF\u8D34\u4E86\u5F20\u7EB8\uFF1B\u800C\u7EAF\u7EB8\u767D\uFF08\u65E9\u5148\u90A3\u7248\uFF09\u53C8\u628A\u5267\u76EE\u4E3B\u9898\u8272\u4E22\u4E86\u3002
   \u63BA\u6BD4\u9010\u6BB5\u52A0\u91CD\uFF1A\u9876\u4E0A\u8FD8\u662F\u5168\u900F\u660E\uFF08\u4E0E\u753B\u9762\u63A5\u5F97\u4F4F\uFF09\uFF0C\u5230\u5E95\u8FB9\u90A3\u4E00\u6863\u6700\u6D53\u3002 */
html[data-ui-theme="light"] .stage-root .theater-dialog {
  background: linear-gradient(180deg,
    rgba(255, 255, 255, 0) 0%,
    color-mix(in srgb, var(--accent) 5%, rgba(255, 255, 255, 0.82)) 20%,
    color-mix(in srgb, var(--accent) 8%, rgba(248, 250, 252, 0.95)) 60%,
    color-mix(in srgb, var(--accent) 10%, rgba(241, 245, 249, 0.98)) 100%);
}

html[data-ui-theme="light"] .stage-root .dialog-text {
  color: var(--dialog-ink);
  text-shadow: none;
}

html[data-ui-theme="light"] .stage-root .dialog-text.narrate {
  color: var(--dialog-ink-soft);
}

html[data-ui-theme="light"] .stage-root .dialog-text.thought {
  color: var(--dialog-ink-thought);
}

/* \u540D\u724C\uFF1A\u6D45\u8272\u4E0B\u7FFB\u6210\u6DF1\u58A8 + \u4E00\u5708\u767D\u6655\uFF08\u6DF1\u8272\u90A3\u5957\u662F\u767D\u5B57 + \u6DF1\u6655\uFF0C\u4E24\u8FB9\u5BF9\u79F0\uFF09 */
html[data-ui-theme="light"] .stage-root .dialog-name {
  color: var(--nameplate-ink);
  text-shadow:
    0 0 2px rgb(255 255 255 / 0.95),
    0 0 8px rgb(255 255 255 / 0.85),
    0 1px 3px rgb(255 255 255 / 0.9);
}

/* \u9009\u80A2\uFF1A\u6D45\u8272\u4E0B\u6362\u6210\u6D45\u5E95\u6DF1\u5B57\u7684\u4E00\u5F20\u5B9E\u5FC3\u5361\uFF08\u6CBF\u7528 --choice-* \u90A3\u56DB\u6863\uFF0C\u5B83\u4EEC\u90FD\u4ECE --accent \u6D3E\u751F\uFF09 */
html[data-ui-theme="light"] .stage-root .choice {
  background: var(--choice-bg);
  border: 1px solid var(--choice-line);
  border-radius: 2px;
  color: var(--choice-ink);
  text-shadow: none;
  box-shadow: 0 6px 20px rgb(15 23 42 / 0.08);
}

html[data-ui-theme="light"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 72%, #0b2545);
}

html[data-ui-theme="light"] .stage-root .choice.is-seen {
  color: color-mix(in srgb, var(--accent) 45%, rgba(11, 37, 69, 0.45));
}

html[data-ui-theme="light"] .stage-root .choice.is-seen .choice-num {
  color: color-mix(in srgb, var(--accent) 30%, rgba(11, 37, 69, 0.4));
}

html[data-ui-theme="light"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"] .stage-root .choice:focus-visible {
  background: var(--choice-active-bg);
  border-color: var(--accent);
  /* \u60AC\u505C\u5E95\u6BD4\u5E38\u6001\u6D53\uFF0826% \u4E3B\u9898\u8272\uFF09\uFF0C\u5B57\u5C31\u5F97\u8DDF\u7740\u518D\u6DF1\u4E00\u6863\u2014\u2014\u540C\u4E00\u4E2A\u8272\u76F8\uFF0C\u4E0D\u662F\u7FFB\u6210\u4E2D\u6027\u58A8\uFF0C
     \u5426\u5219\u4E00\u60AC\u505C\u4E3B\u9898\u8272\u5C31\u6CA1\u4E86\u300262% \u662F\u90A3\u4E00\u6863\u5E95\u4E0A\u91CF\u51FA\u6765\u7684\u4E0B\u9650\uFF08\u8272\u677F\u6700\u4F4E 4.86:1\uFF09\u3002 */
  color: color-mix(in srgb, var(--accent) 62%, #0b2545);
  text-shadow: none;
}

/* \u60AC\u505C\u6001\u7684\u5E8F\u53F7\u5FBD\uFF1A\u6DF1\u8272\u90A3\u5957\u662F\u767D\u5B57\u538B\u5728\u5B9E\u5FC3\u4E3B\u9898\u8272\u7F0E\u5E26\u4E0A\uFF1B\u6D45\u8272\u90A3\u5957\u5E95\u8272\u662F\u6DE1\u4E3B\u9898\u8272\uFF0C
   \u5E8F\u53F7\u5FC5\u987B\u7FFB\u6210\u6DF1\u58A8\uFF08\u767D\u5B57\u538B\u5728\u6DE1\u5E95\u4E0A\u7B49\u4E8E\u6CA1\u4E86\uFF09 */
html[data-ui-theme="light"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"] .stage-root .choice:focus-visible .choice-num {
  color: color-mix(in srgb, var(--accent) 62%, #0b2545);
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
  /* ATRI \u53F0\u8BCD\u6761\uFF1A\u5E95\u90E8\u901A\u680F\uFF0C\u900F\u660E \u2192 \u5E95\u8FB9\u6DF1\u6D77\u84DD\u7684\u8F7B\u6E10\u53D8\uFF0C\u65E0\u8FB9\u6846\u3001\u65E0\u786C\u5206\u5272\u3001\u65E0\u5927\u9634\u5F71 */
  position: absolute;
  z-index: 12;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  min-height: 25%;
  padding: 52px 18% calc(40px + var(--safe-b, 0px)) 18%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--stage-accent-deep) 0%, transparent) 0%,
    color-mix(in srgb, var(--stage-accent-deep) 52%, transparent) 26%,
    color-mix(in srgb, var(--stage-accent-deep) 78%, transparent) 62%,
    color-mix(in srgb, var(--stage-accent-deep) 92%, transparent) 100%);
  border: none;
  border-radius: 0;
  box-shadow: none;
  backdrop-filter: none;
  cursor: pointer;
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

@keyframes bg-fade {
  from {
    opacity: 0;
  }
}

/* \u2500\u2500 \u955C\u5934\u5BB9\u5668\u4E0E\u6362\u5C42\u8FC7\u6E21 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u955C\u5934\u5BB9\u5668\u662F\u300C\u753B\u9762\u5185\u5BB9\u53D8\u6362\u5C42\u300D\uFF1A\u4F5C\u7528\u5728\u5B83\u4E0A\u9762\u7684\u6548\u679C\u8BA9\u80CC\u666F/\u7ACB\u7ED8/CG \u4E00\u8D77\u52A8\uFF08\u73B0\u53EA\u7528\u4E8E\u6296\u52A8\uFF0C
   \u8D70\u72EC\u7ACB\u7684 translate \u5C5E\u6027\uFF0C\u4E0D\u4E0E\u522B\u7684 transform \u62A2\u901A\u9053\uFF09\u3002
   \u6362\u5C42\u8FC7\u6E21\uFF08\u8F6C\u573A\uFF09\u662F\u552F\u4E00\u7684 dual-source \u6548\u679C\uFF1A\u65E7\u56FE\u7559\u5728\u4E0B\u5C42\u3001\u65B0\u56FE\u6309 trans-* \u76D6\u4E0A\u6765\u3002 */
.theater-camera {
  position: absolute;
  inset: 0;
  will-change: transform;
}

/* \u80CC\u666F\u6808\u81EA\u6210\u5C42\u53E0\u4E0A\u4E0B\u6587\uFF1A\u6808\u5185\u7684 z-index\uFF081/2/4\uFF09\u662F\u300C\u65B0\u56FE\u538B\u65E7\u56FE\u300D\u8FD9\u4EF6\u4E8B\u7684\u5185\u90E8\u6392\u5E8F\uFF0C
   \u51FA\u4E86\u8FD9\u5C42\u5C31\u6BEB\u65E0\u610F\u4E49\u3002\u6808\u81EA\u5DF1\u53EA\u662F position:absolute + z-index:auto\uFF0C**\u4E0D\u6210\u4E0A\u4E0B\u6587**\uFF0C
   \u4E8E\u662F\u8FD9\u4E24\u4E2A\u6570\u503C\u4F1A\u5192\u6CE1\u5230\u6700\u8FD1\u7684\u90A3\u4E2A\u7956\u5148\u4E0A\u4E0B\u6587\u91CC\uFF0C\u4E0E\u540C\u4E3A\u8BE5\u4E0A\u4E0B\u6587\u6210\u5458\u7684
   \`.theater-sprites\`\uFF08z-index: 0\uFF09\u76F4\u63A5\u6BD4\u5927\u5C0F\u2014\u20142 > 0\uFF0C\u6574\u7EC4\u80CC\u666F\u538B\u4F4F\u7ACB\u7ED8\uFF0C
   \u6362\u8FC7\u4E00\u6B21\u5E95\u4E4B\u540E\u7ACB\u7ED8\u518D\u4E5F\u770B\u4E0D\u89C1\uFF082026-10-08 \u4FEE\uFF09\u3002\`isolation\` \u628A\u8FD9\u4EFD\u6392\u5E8F\u5173\u56DE\u5C42\u5185\uFF0C
   \u4E0E \`.theater-sprites\` \u7528 \`z-index: 0\` \u81EA\u6210\u4E00\u5C42\u662F\u540C\u4E00\u624B\u6CD5\u3002
   \u522B\u6539\u6210\u300C\u9694\u79BB .theater-camera\u300D\uFF1A\u5B83\u5DF2\u7ECF\u56E0 \`will-change: transform\` \u81EA\u6210\u4E0A\u4E0B\u6587\uFF08\u5B9E\u6D4B\uFF09\uFF0C
   \u5728\u5B83\u4E0A\u9762\u518D\u52A0\u4E00\u5C42\u4E0D\u4F1A\u6539\u53D8\u6808\u5185\u6570\u503C\u4E0E\u7ACB\u7ED8\u5C42\u6BD4\u5927\u5C0F\u7684\u5173\u7CFB\uFF0C\u5B9E\u6D4B\u65E0\u6548\u2014\u2014\u8981\u5728\u6570\u503C\u6240\u5728\u7684\u90A3\u5C42\u6536\u53E3\u3002 */
.theater-stack {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
}

.theater-stack .theater-stack-new {
  z-index: 2;
}

.theater-stack .theater-stack-old {
  z-index: 1;
}

/* \u2500\u2500 \u8F6C\u573A\u7EAF\u8272\u573A\uFF08fade / fade-white \u4E13\u7528\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u5B83\u662F**\u5C4F\u5E55\u7EA7**\u7684\u4E1C\u897F\uFF1A\u8981\u300C\u6574\u5C4F\u8FC7\u9ED1\u300D\u628A\u7ACB\u7ED8\u4E0E CG \u4E00\u8D77\u76D6\u4F4F\uFF0C\u518D\u63ED\u5F00\u5DF2\u7ECF\u5C31\u4F4D\u7684\u65B0\u80CC\u666F\u3002
   \u6240\u4EE5\u5B83\u6302\u5728\u955C\u5934\u5BB9\u5668\u4E0B\u3001\u7ACB\u7ED8\u4E0E CG \u4E4B\u4E0A\uFF08z-index 4\uFF09\uFF0C\u800C\u4E0D\u662F\u5F85\u5728\u80CC\u666F\u6808\u91CC\u2014\u2014\u5173\u8FDB\u6808\u91CC
   \u5C31\u53EA\u80FD\u76D6\u4F4F\u80CC\u666F\uFF0C\u4EBA\u7269\u4F1A\u6D6E\u5728\u9ED1\u573A\u91CC\u4E0D\u52A8\u3002
   \u53EA\u5728 fade \u90A3\u4E24\u6B21\u6362\u5C42\u65F6\u6E32\u67D3\uFF08\u8C03\u7528\u65B9\u6309 \`seq\` \u6362 key \u91CD\u6302 = \u91CD\u64AD\u52A8\u753B\uFF09\uFF0C\u5E73\u65F6\u4E0D\u5165 DOM\u3002 */
.theater-fade-veil {
  position: absolute;
  inset: 0;
  z-index: 4;
  opacity: 0;
  pointer-events: none;
  animation: fx-veil var(--trans-ms) ease forwards;
}

/* \u6808\u5185\u7684\u5C42\u4E0D\u8981\u5403 .theater-bg \u90A3\u6761\u5E38\u9A7B bg-fade\u2014\u2014\u5426\u5219\u65E7\u5C42\u4E5F\u4F1A\u6DE1\u5165\u4E00\u6B21\u3002 */
.theater-stack .theater-bg {
  animation: none;
}

/* cut\uFF1A\u65B0\u56FE\u76F4\u63A5\u9876\u6389\u65E7\u56FE */
.theater-stack.trans-cut .theater-stack-old {
  display: none;
}

/* dissolve\uFF1A\u65B0\u56FE\u4EA4\u53C9\u6DE1\u5165\uFF08\u65E7\u56FE\u9759\u6B62\u5728\u4E0B\uFF09 */
.theater-stack.trans-dissolve .theater-stack-new {
  animation: fx-fade-in var(--trans-ms) ease;
}

/* fade / fade-white\uFF1A\u65E7\u56FE\u5728\u4E0A\uFF08\u524D\u534A\u7A0B\u4FDD\u6301\uFF09\uFF0Cveil \u7EAF\u8272\u5347\u5230\u5168\u906E\u6321\u518D\u843D\u4E0B\uFF0C
   \u4E0B\u534A\u7A0B\u63ED\u5F00\u7684\u662F\u5DF2\u7ECF\u5C31\u4F4D\u7684\u65B0\u56FE\u3002\u65E7\u56FE\u5FC5\u987B\u5728 50% \u5904\u8BA9\u4F4D\uFF08steps \u786C\u5207\uFF09\uFF0C\u5426\u5219\u5B83\u4F1A\u4E00\u76F4\u538B\u7740\u65B0\u56FE\u3002 */
.theater-stack.trans-fade .theater-stack-old,
.theater-stack.trans-fade-white .theater-stack-old {
  z-index: 4;
  animation: fx-hold-half var(--trans-ms) steps(1, end) forwards;
}

.theater-stack.trans-fade .theater-stack-new,
.theater-stack.trans-fade-white .theater-stack-new {
  z-index: 1;
}

@keyframes fx-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fx-hold-half {
  0%,
  49.9% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@keyframes fx-veil {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* \u2500\u2500 \u5C4F\u5E55\u906E\u7F69\uFF1Aletterbox / \u6697\u89D2 / \u95EA\u5149 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.theater-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.theater-letterbox::before,
.theater-letterbox::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 11%;
  background: #000;
}

.theater-letterbox::before {
  top: 0;
}

.theater-letterbox::after {
  bottom: 0;
}

.theater-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 52%, rgb(0 0 0 / 0.55) 100%);
}

.theater-flash {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: fx-flash var(--fx-ms) ease-out;
}

@keyframes fx-flash {
  0% {
    opacity: 0;
  }
  22% {
    opacity: 0.92;
  }
  100% {
    opacity: 0;
  }
}

/* \u5E38\u4EAE\u8272\uFF08flash \u7684 on\uFF09\uFF1A\u64A4\u6389\u4E00\u6B21\u6027\u52A8\u753B\uFF0C\u5E95\u8272\u4FDD\u6301\u4E0D\u900F\u660E\u3002 */
.theater-flash-hold {
  opacity: 1;
  animation: none;
}

/* \u955C\u5934\u6296\u52A8\uFF1A\u53EA\u7528 translate \u4E00\u4E2A\u901A\u9053\uFF0C\u5E45\u5EA6\u5C0F\u3001\u9891\u7387\u9AD8\u3002nonce \u6362\u503C\u5373\u91CD\u64AD\uFF08\u540C\u884C\u4E3A\u8BCD\uFF09\u3002 */
.theater-camera.shaking {
  animation: fx-cam-shake-light var(--shake-ms, 340ms) linear var(--shake-nonce, 0s) 1;
}

.theater-camera.shaking.shake-heavy {
  animation-name: fx-cam-shake-heavy;
}

/* \u6301\u7EED\u6296\uFF08shake \u7684 on\uFF09\uFF1A\u540C\u4E00\u5957\u5173\u952E\u5E27\u6539\u6210\u65E0\u9650\u5FAA\u73AF\u3002 */
.theater-camera.shaking.shake-hold {
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

@keyframes fx-cam-shake-light {
  0%,
  100% {
    translate: 0 0;
  }
  20% {
    translate: -0.5% 0.3%;
  }
  40% {
    translate: 0.5% -0.3%;
  }
  60% {
    translate: -0.35% 0.2%;
  }
  80% {
    translate: 0.35% -0.2%;
  }
}

@keyframes fx-cam-shake-heavy {
  0%,
  100% {
    translate: 0 0;
  }
  15% {
    translate: -1.6% 1%;
  }
  30% {
    translate: 1.6% -1%;
  }
  45% {
    translate: -1.2% 0.8%;
  }
  60% {
    translate: 1.2% -0.8%;
  }
  80% {
    translate: -0.6% 0.4%;
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

/* presentation planner \u7684\u8BBE\u5907\u5BB9\u91CF\u88C1\u526A\uFF1A\u4E0D\u662F leaving\uFF0C\u4E0D\u64AD\u9000\u573A\uFF0C\u4E5F\u4E0D\u6539\u53D8\u903B\u8F91\u5728\u573A\u3002
   \u4FDD\u7559 DOM \u8BA9\u6062\u590D\u8D70\u666E\u901A opacity \u8FC7\u6E21\uFF1B\u4E0D\u53EF\u89C1\u65F6\u4E0D\u5360\u70B9\u51FB\u3002 */
.theater-sprite.presentation-suppressed {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

/* \u6B63\u5728\u6F14\u884C\u4E3A\u8BCD\uFF1A\u8FD9\u4E00\u523B\u8FD0\u955C\u8BA9\u4F4D\u3002\u884C\u4E3A\u8BCD\u81EA\u5DF1\u7684 translate/scale/rotate \u4E0E\u8FD0\u955C\u7684
   transform \u662F\u4E24\u4E2A\u72EC\u7ACB\u5C5E\u6027\u3001\u6B63\u5E38\u5E94\u8BE5\u5E76\u5B58\uFF0C\u4F46\u4E24\u8005\u90FD\u6539\u7F29\u653E\u89C2\u611F\u2014\u2014\u7279\u5199\uFF08scale 1.35\uFF09
   \u53E0\u4E00\u8BB0\u70B9\u5934\u4F1A\u8BA9\u4EBA\u7269\u7A81\u7136\u5F39\u4E00\u4E0B\uFF0C\u6240\u4EE5\u884C\u4E3A\u8BCD\u671F\u95F4\u628A\u8FD0\u955C\u538B\u56DE 1\u3002
   \u6F14\u5B8C\u81EA\u52A8\u6062\u590D\uFF0C\u8FD0\u955C\u4E0D\u7528\u91CD\u64AD\u3002

   --act-nonce \u662F\u91CD\u64AD\u7528\uFF1A\u540C\u4E00\u4E2A animation-name \u8FDE\u5199\u4E24\u6B21\u4E0D\u4F1A\u91CD\u6765\uFF0C\u628A delay \u6362\u6210\u53E6\u4E00\u4E2A\u503C\uFF0C
   \u6D4F\u89C8\u5668\u5C31\u8BA4\u6210\u65B0\u52A8\u753B\u4ECE 0% \u64AD\u8D77\u3002**\u5FC5\u987B\u5199\u6210\u65F6\u95F4**\uFF08\`-0.001s\`\uFF09\uFF1Adelay \u4E0E iteration-count
   \u4F4D\u7F6E\u76F8\u90BB\uFF0C\u5199\u6210\u88F8\u6570\u5B57\u5C31\u6210\u4E86 \`520ms ease 1 1\` \u8FD9\u79CD\u4E24\u4E2A\u6570\u6328\u7740\uFF0C\u6D4F\u89C8\u5668\u5224\u4E0D\u51FA\u54EA\u4E2A\u662F\u54EA\u4E2A\uFF0C
   \u6574\u6761 animation \u88AB\u9759\u9ED8\u4E22\u5F03\uFF08animation-name \u53D8 none\uFF0C\u52A8\u753B\u6C38\u8FDC\u4E0D\u542F\u52A8\uFF09\u3002 */
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

/* \u8868\u60C5\u5DEE\u5206\uFF1A\u65E7\u50CF\u53E0\u5728\u65B0\u50CF\u4E4B\u4E0A\u6DE1\u51FA\uFF0C\u9732\u51FA\u4E0B\u9762\u7684\u65B0\u50CF\u2014\u2014\u771F\u6B63\u7684\u4EA4\u53C9\u6DE1\u5316\u3002
   \u7528\u5173\u952E\u5E27\u800C\u4E0D\u662F transition\uFF1A\u65E7\u50CF\u662F\u6302\u8F7D\u5373\u5E26 .sprite-out\uFF0Ctransition \u4E0D\u4F1A\u4ECE 1 \u8D77\u6B65\u3002 */
.theater-sprite.sprite-out {
  opacity: 0;
  animation: sprite-fade-out var(--fade-ms) ease forwards;
}

@keyframes sprite-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* \u767B\u573A\uFF1A\u6DE1\u5165\u3002\u9000\u573A\u9760 .leaving\uFF08\u89C1\u4E0B\uFF09\u800C\u4E0D\u662F\u76F4\u63A5\u5378\u8F7D\u2014\u2014\u76F4\u63A5\u5378\u8F7D\u6CA1\u6709\u8FC7\u6E21\u53EF\u64AD\u3002 */
.theater-sprite.entering {
  animation: sprite-in var(--fade-ms) ease;
}

/* \u884C\u4E3A\u8BCD\uFF1A\u6F14\u7684\u65F6\u5019\u63A5\u7BA1 animation\uFF0C\u5E76\u628A\u8FD0\u955C\u538B\u56DE 1\uFF08\u4E24\u6761\u90FD\u6539\u7F29\u653E\u89C2\u611F\uFF0C\u53E0\u4E00\u8D77\u4F1A\u5F39\u4E00\u4E0B\uFF09\u3002
   \u8FD9\u6761\u89C4\u5219\u5FC5\u987B\u6392\u5728 \`.entering\` \u4E4B\u540E\u2014\u2014\u540C\u4E3A (0,2,0) \u65F6\u540E\u5199\u8005\u8D62\uFF0C\u800C \`.entering\` \u7684
   \`animation: sprite-in\` \u65E9\u5C31\u5728\u6E05\u5355\u91CC\u8DD1\u5B8C\u4E86\uFF08\u5B83\u5728\u52A8\u753B\u7ED3\u675F\u540E\u5C31\u6458\u6389\u8FD9\u4E2A\u7C7B\uFF0C\u89C1 StageTheater\uFF09\uFF0C
   \u6240\u4EE5\u8FD9\u91CC\u53EA\u7BA1\u628A\u884C\u4E3A\u8BCD\u90A3\u4E00\u6761\u88C5\u4E0A\u53BB\u3002

   **\u522B\u628A \`.entering\` \u7684\u5165\u573A\u52A8\u753B\u5199\u8FDB\u8FD9\u6761\u91CC\u53E0\u52A0**\uFF1A\`.acting\` \u4E00\u64A4\uFF0Canimation-name \u82E5\u662F\u4ECE
   \u300C\u884C\u4E3A\u8BCD\u300D\u6362\u56DE\u300C\u5165\u573A\u6DE1\u5165\u300D\uFF0C\u6D4F\u89C8\u5668\u4F1A\u628A\u5165\u573A\u5F53\u65B0\u52A8\u753B\u4ECE opacity:0 \u91CD\u64AD\u4E00\u904D\u2014\u2014\u75C7\u72B6\u5C31\u662F
   \u6BCF\u4E2A\u884C\u4E3A\u8BCD\u6F14\u5B8C\u7ACB\u7ED8\u95EA\u4E00\u4E0B\u3002\u5165\u573A\u52A8\u753B\u4E0D\u8FDB\u8FD9\u4EFD\u6E05\u5355\uFF0C\u64A4 .acting \u5C31\u53EA\u662F\u56DE\u5230\u300C\u6CA1\u6709\u52A8\u753B\u300D\u3002 */
.theater-sprite.acting {
  --scale: 1;
  animation: var(--sprite-act) var(--act-ms) var(--move-ease) var(--act-nonce, 0s) 1;
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
   \u5C31\u662F\u4E00\u6B21\u5168\u573A\u95EA\u70C1\u3002\u677E\u624B\u56DE\u5230\u64AD\u653E\u5934\u65F6\u8FD9\u4E9B\u89C4\u5219\u4E0D\u518D\u547D\u4E2D\uFF0C\u753B\u9762\u6309\u5E73\u65F6\u7684\u8FC7\u6E21\u5F52\u4F4D\u3002
   \u7EAF\u8272\u573A\u8981\u5355\u5217\uFF1A\u5B83\u662F\u955C\u5934\u5BB9\u5668\u7684\u5B69\u5B50\uFF08\u4E0D\u5728\u80CC\u666F\u6808\u91CC\uFF09\uFF0C\`> *\` \u90A3\u4E00\u6761\u591F\u4E0D\u7740\u5B83\u3002 */
.theater-stage.rewinding .theater-bg,
.theater-stage.rewinding .theater-bg-in,
.theater-stage.rewinding .theater-cg-in,
.theater-stage.rewinding .theater-sprite,
.theater-stage.rewinding .theater-camera,
.theater-stage.rewinding .theater-fade-veil,
.theater-stage.rewinding .theater-stack,
.theater-stage.rewinding .theater-stack > * {
  animation: none;
}

.theater-stage.rewinding .theater-sprite,
.theater-stage.rewinding .theater-camera {
  transition: none;
}

/* \u56DE\u770B\u8981\u7684\u662F\u300C\u90A3\u4E00\u523B\u7684\u7EC8\u6001\u300D\uFF0C\u4E0D\u662F\u8F6C\u573A\u8FC7\u7A0B\uFF1A\u65E7\u5C42\u76F4\u63A5\u8BA9\u4F4D\uFF0C\u9732\u51FA\u65B0\u753B\u9762\u3002 */
.theater-stage.rewinding .theater-stack .theater-stack-old {
  display: none;
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
  /* \u7F3A\u7701\uFF08bg="none" \u7684\u53E0\u5C42\uFF09\u53D6\u821E\u53F0\u76AE\u80A4\u7684\u5B57\u8272\u4E0E\u6295\u5F71\uFF1B\u5B9E\u5E95\u90A3\u4E24\u6837\u7531\u5185\u8054\u6837\u5F0F\u8986\u76D6\u3002 */
  color: var(--title-ink);
  text-shadow: var(--title-shadow);
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
  font-size: clamp(22px, 5.2vw, 46px);
  line-height: 1.75;
  letter-spacing: 0.06em;
  /* \u5B57\u8272\u4E0E\u6295\u5F71\u90FD\u7EE7\u627F\u81EA .theater-title\uFF08\u90A3\u91CC\u624D\u662F\u5361\u7247\u5E95\u8272\u6240\u5728\u7684\u90A3\u4E00\u5C42\uFF09\u3002 */
}

.theater-title-next {
  position: absolute;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 4vh, 40px);
  opacity: 0.72;
  font-size: 14px;
}

/* \u8BF4\u8BDD\u4EBA\u540D\u724C\uFF1A\u767D\u5E95 + \u89D2\u8272\u4E3B\u9898\u63CF\u8FB9\uFF0C\u6E05\u6670\u5178\u96C5\uFF0C\u4E0D\u906E\u6321\u7ACB\u7ED8 */
.dialog-name {
  /* \u540D\u724C\uFF1A\u60AC\u6D6E\u5728\u6B63\u6587\u5DE6\u4E0A\u65B9\u3001\u65E0\u5E95\u8272\uFF0C\u7EAF\u767D\u7C97\u9ED1\u4F53 + \u67D4\u548C\u6DF1\u8272\u5916\u6655\uFF08ATRI\u300C\u590F\u751F\u300D\u90A3\u4E00\u679A\uFF09 */
  position: absolute;
  top: 6px;
  left: calc(18% - 2.2em);
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  box-shadow: none;
  color: #ffffff;
  font-family: var(--font-ui);
  font-weight: 800;
  font-size: clamp(18px, 1.55vw, 28px);
  letter-spacing: 0.06em;
  line-height: 1.3;
  white-space: nowrap;
  text-shadow:
    0 0 2px rgba(0, 0, 0, 0.85),
    0 0 8px color-mix(in srgb, var(--stage-accent-deep) 85%, transparent),
    0 2px 4px rgba(0, 0, 0, 0.5);
}

.dialog-text {
  margin: 0;
  font-family: var(--font-ui);
  font-size: clamp(16px, 1.45vw, 26px);
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.03em;
  white-space: pre-wrap;
  min-height: 3.2em;
  color: #ffffff;
  /* 1.5px \u9ED1\u8272\u5FAE\u63CF\u8FB9 + \u4E00\u5C42\u8F6F\u5F71\uFF1AATRI \u6B63\u6587\u5728\u4EAE\u5E95/\u6697\u5E95\u4E0A\u90FD\u9760\u5B83\u7ACB\u4F4F */
  -webkit-text-stroke: 0;
  text-shadow:
    1px 0 0 rgba(0, 0, 0, 0.55), -1px 0 0 rgba(0, 0, 0, 0.55),
    0 1px 0 rgba(0, 0, 0, 0.55), 0 -1px 0 rgba(0, 0, 0, 0.55),
    0 2px 6px rgba(0, 0, 0, 0.55);
}

.dialog-text.narrate {
  color: rgba(241, 245, 249, 0.92);
}

.dialog-text.thought {
  color: #c4b5fd;
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
  display: inline-block;
  color: var(--accent, #60a5fa);
  font-size: 10px;
  text-shadow: 0 0 8px var(--accent, #60a5fa);
  animation: dialog-bob 1.2s ease-in-out infinite;
}

@keyframes dialog-bob {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }
  50% {
    transform: translateY(3px);
    opacity: 1;
  }
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

/* \u7ECF\u5178 Galgame \u60EF\u4F8B\uFF1A\u8D70\u8FC7/\u9009\u8FC7\u7684\u9009\u80A2\u5728\u5B57\u8272\u4E0A\u5448\u534A\u900F\u660E\u6697\u5316\u6216\u67D4\u548C\u58A8\u8272\uFF0C
   \u60AC\u505C\u4E0E\u805A\u7126\u65F6\u7167\u6837\u80FD\u70B9\u4EAE\uFF0C\u4F46\u9759\u7F6E\u6001\u4E00\u773C\u53EF\u8FA8\u300C\u5DF2\u53BB\u8FC7\u300D */
.choice.is-seen {
  color: color-mix(in srgb, var(--choice-ink, #f8fafc) 62%, transparent);
}

.choice.is-seen .choice-num {
  color: color-mix(in srgb, var(--accent) 55%, rgba(224, 242, 254, 0.55));
}

.choice.is-seen:not(:hover):not(:focus-visible) .choice-text,
.choice.is-seen:not(:hover):not(:focus-visible) .choice-num {
  opacity: 0.62;
}

/* \u81EA\u7531\u8F93\u5165\u90A3\u5F20\u5361\uFF1A\u8D70\u540C\u4E00\u5F62\u5236\uFF0C\u53EA\u662F\u4E0D\u7ED9\u4E3B\u8272\u6807\u5C3A */
.choice.ghost {
  color: color-mix(in srgb, var(--accent) 45%, #cbd5e1);
  font-size: 14.5px;
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--stage-choice-wash) 0%, transparent) 0%,
    color-mix(in srgb, var(--stage-choice-wash) 58%, transparent) 22%,
    color-mix(in srgb, var(--stage-choice-wash) 58%, transparent) 78%,
    color-mix(in srgb, var(--stage-choice-wash) 0%, transparent) 100%);
}

html[data-ui-theme="light"] .stage-root .choice.ghost {
  color: color-mix(in srgb, var(--accent) 72%, #0b2545);
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
  z-index: 25;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  /* \u9009\u80A2\u843D\u5728\u753B\u9762\u4E2D\u4E0B\u6BB5\uFF1A\u4E0A\u7F18\u8BA9\u5F00\u7ACB\u7ED8\u7684\u8138\uFF08\u7EA6\u753B\u9762\u4E0A\u4E09\u6210\uFF09\uFF0C\u4E0B\u7F18\u8BA9\u5F00\u53F0\u8BCD\u6761 */
  padding-top: max(calc(var(--dir-h, 46px) + 24px + env(safe-area-inset-top, 0px)), 30vh);
  padding-bottom: calc(var(--dialog-h, 180px) + 28px + var(--safe-b, 0px));
  padding-left: 16px;
  padding-right: 16px;
  overflow-y: auto;
  pointer-events: none;
  animation: choice-in 0.22s ease-out;
}

.choice-overlay .choice {
  pointer-events: auto;
}

.choice-text {
  flex: 0 1 auto;
}

@keyframes choice-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

/* \u9009\u80A2\u5361\uFF1A\u7ECF\u5178 Galgame \u6A2A\u5411\u7F0E\u5E26\u5149\u6548\u5361\u7247 */
.choice {
  /* ATRI \u9009\u9879\uFF1A\u5C45\u4E2D\u4E00\u6761\u534A\u900F\u660E\u767D\u7F0E\u5E26\uFF0C\u6DF1\u6D77\u84DD\u5B57\uFF0C\u4E24\u7AEF\u6E10\u9690\uFF0C\u65E0\u5706\u89D2\u5927\u9634\u5F71 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: min(760px, 80vw);
  min-height: 50px;
  margin: 0 auto;
  padding: 12px 40px;
  text-align: center;
  font-family: var(--font-ui);
  font-size: clamp(15px, 1.25vw, 20px);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.04em;
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--stage-choice-wash) 0%, transparent) 0%,
    color-mix(in srgb, var(--stage-choice-wash) 88%, transparent) 14%,
    color-mix(in srgb, var(--stage-choice-wash) 94%, transparent) 50%,
    color-mix(in srgb, var(--stage-choice-wash) 88%, transparent) 86%,
    color-mix(in srgb, var(--stage-choice-wash) 0%, transparent) 100%);
  border: none;
  border-radius: 0;
  color: var(--choice-ink, #f8fafc);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--accent) 38%, rgba(255, 255, 255, 0.14)),
    inset 0 -1px 0 color-mix(in srgb, var(--accent) 38%, rgba(255, 255, 255, 0.14));
  animation: choice-card-in 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 50ms);
  transition: background 0.16s ease, color 0.16s ease, transform 0.2s ease;
  cursor: pointer;
}

.choice-overlay .choice:nth-child(2) { --i: 1; }
.choice-overlay .choice:nth-child(3) { --i: 2; }
.choice-overlay .choice:nth-child(4) { --i: 3; }
.choice-overlay .choice:nth-child(5) { --i: 4; }
.choice-overlay .choice:nth-child(6) { --i: 5; }
.choice-overlay .choice:nth-child(n + 7) { --i: 6; }

@keyframes choice-card-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

.choice:hover:not(:disabled),
.choice:focus-visible {
  transform: none;
  color: #ffffff;
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--stage-choice-solid) 0%, transparent) 0%,
    color-mix(in srgb, var(--stage-choice-solid) 88%, transparent) 14%,
    color-mix(in srgb, var(--stage-choice-solid) 96%, transparent) 50%,
    color-mix(in srgb, var(--stage-choice-solid) 88%, transparent) 86%,
    color-mix(in srgb, var(--stage-choice-solid) 0%, transparent) 100%);
  text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 45%, #ffffff);
  box-shadow: none;
}

.choice:active:not(:disabled) {
  transform: scale(0.99);
}

.choice:disabled {
  opacity: 0.55;
  cursor: default;
}

/* \u5E8F\u53F7\u5FBD\uFF1A\u5178\u96C5\u6570\u5B57\u5149\u6807 */
.choice-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 0;
  background: none;
  color: color-mix(in srgb, var(--accent) 72%, #e0f2fe);
  font-family: "Montserrat", "Inter", var(--font-ui);
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  transition: color 0.15s ease;
}

.choice:hover:not(:disabled) .choice-num,
.choice:focus-visible .choice-num {
  background: none;
  color: rgba(255, 255, 255, 0.85);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .choice {
    animation: none;
  }
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

/* \u2500\u2500 \u6E38\u620F\u7CFB\u7EDF\u7A97\uFF1A\u5BFC\u6F14\u52A8\u4F5C\u7684\u8F93\u5165\u4E0E\u9009\u62E9\uFF08\u8F7B\u76C8\u878D\u5165\u3001HUD \u8D28\u611F\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u5F39\u7A97\u4E0D\u662F\u5957\u6846\u5957\u5C42\u3001\u9876\u7740\u539A\u80F6\u56CA\u7684\u7F51\u9875\u5BF9\u8BDD\u6846\uFF0C\u800C\u662F\u4E00\u5757\u538B\u5728\u9875\u9762\u4E4B\u4E0A\u7684\u5FAE\u900F\u5361\u7247\uFF1A
   \u5355\u5C42\u5E95\u677F + \u9876\u90E8\u5FAE\u5149\u5FAE\u8FB9 + \u5185\u5D4C\u6781\u7B80\u6807\u9898\u680F + \u8212\u5C55\u5145\u88D5\u7684\u591A\u884C\u8F93\u5165\u533A\u3002
   \u6DF1\u6D45\u4E24\u5957\u53EA\u5728\u4EE4\u724C\u91CC\u5206\u53C9\uFF08.stage-root \u7ED9\u6D45\u8272\u3001html[data-ui-theme="dark"] \u8986\u76D6\u6210\u6DF1\u8272\uFF09\uFF1A
   \u5B83\u662F\u5168\u7AD9\u5171\u7528\u7684\u90A3\u4E00\u679A\uFF0C\u5207\u4E86\u4E3B\u9898\u8FD8\u662F\u8001\u6837\u5B50\u5C31\u662F\u8FD9\u91CC\u5199\u6B7B\u4E86\u989C\u8272\u3002 */

.modal-scrim {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px calc(24px + var(--safe-b, 0px));
  background: var(--modal-scrim,
    radial-gradient(circle at 50% 45%, rgba(4, 12, 24, 0.58) 0%, rgba(1, 4, 10, 0.85) 100%));
  backdrop-filter: blur(8px) saturate(1.15);
  animation: modal-scrim-in 0.18s ease-out;
}

@keyframes modal-scrim-in {
  from { opacity: 0; }
}

.modal-card {
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  max-height: min(84dvh, 660px);
  display: flex;
  flex-direction: column;
  padding: 18px 22px 18px;
  border: 1px solid var(--modal-edge, color-mix(in srgb, var(--accent) 42%, rgba(255, 255, 255, 0.18)));
  border-radius: 8px;
  background: var(--modal-bg, linear-gradient(175deg,
    color-mix(in srgb, var(--accent) 18%, rgba(6, 15, 30, 0.94)) 0%,
    color-mix(in srgb, var(--accent) 10%, rgba(3, 8, 18, 0.97)) 100%));
  backdrop-filter: blur(24px) saturate(1.2);
  box-shadow: var(--modal-shadow,
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 0 40px color-mix(in srgb, var(--accent) 24%, transparent),
    0 24px 56px rgba(0, 0, 0, 0.65));
  color: var(--ink);
  animation: modal-in 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

/* \u5361\u7247\u5185\u5D4C\u63A7\u4EF6\uFF08\u8F93\u5165\u6846 / \u5206\u6BB5\u5668 / \u5F15\u7528 chip\uFF09\u8BFB\u7684\u662F\u7EB8\u9762\u4EE4\u724C\uFF0C\u6DF1\u8272\u5361\u7247\u4E0A\u8981\u4E00\u8D77\u538B\u6DF1\uFF0C
   \u5426\u5219\u5B83\u4EEC\u4F1A\u62FF .stage-root \u7684\u6D45\u8272\u7EB8\u5E95\u5728\u6DF1\u5361\u7247\u4E0A\u7559\u767D\u5757\u3002
   \u57FA\u7EBF\u8FD9\u4E00\u4EFD\u662F\u6DF1\u8272\uFF08\u4E0E\u5F39\u7A97\u4EE4\u724C\u540C\u4E00\u6761\u89C4\u77E9\uFF1A\u6CA1\u6709\u5C5E\u6027\u65F6\u4FDD\u6301\u539F\u6837\uFF09\u3002 */
.modal-card {
  --panel: rgba(5, 14, 28, 0.65);
  --bg: rgba(2, 6, 14, 0.5);
  --line: color-mix(in srgb, var(--accent) 30%, rgba(255, 255, 255, 0.15));
  --ink: #f8fafc;
  --ink-soft: rgba(220, 235, 250, 0.8);
  --ink-faint: rgba(180, 205, 230, 0.55);
  --ink-muted: rgba(200, 220, 240, 0.68);
  --accent-soft: color-mix(in srgb, var(--accent) 26%, transparent);
}

/* \u6D45\u8272\u4E3B\u9898\uFF1A\u540C\u4E00\u6279\u4EE4\u724C\u6362\u6210\u7EB8\u9762\u90A3\u4E00\u5957\uFF08\u548C\u7D19\uFF09 */
html[data-ui-theme="light"] .modal-card {
  --panel: rgb(248 246 242 / 0.9);
  --bg: rgb(255 255 255 / 0.72);
  --line: color-mix(in srgb, var(--accent) 20%, rgb(120 108 92 / 0.3));
  --ink: #23201c;
  --ink-soft: #4a443c;
  --ink-faint: #7d7568;
  --ink-muted: rgb(35 32 28 / 0.72);
  --accent-soft: color-mix(in srgb, var(--accent) 14%, transparent);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.985);
  }
}

/* \u9876\u90E8\u5FAE\u5149\u7EBF\uFF1A\u901A\u900F\u79D1\u6280\u8D28\u611F\u7684\u5173\u952E\u7EC6\u90E8 */
.modal-top-glow {
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 80%, #ffffff), transparent);
  pointer-events: none;
  opacity: 0.75;
}

/* \u5F39\u7A97\u5934\u90E8\uFF1A\u6574\u6D01\u5185\u5D4C\uFF0C\u4E0D\u518D\u9876\u5728\u5361\u7247\u5916\u90E8 */
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* \u5DE6\u4FA7\u5149\u70B9\u6807\u70B9 */
.modal-pip {
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--modal-glow, color-mix(in srgb, var(--accent) 80%, #ffffff));
  box-shadow: 0 0 8px var(--accent);
}

.modal-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--ink);
}

/* \u5FAE\u5C0F\u82F1\u6587\u7C7B\u522B\u6807 */
.modal-kicker {
  font-family: var(--font-mono, monospace);
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--accent) 72%, var(--ink-soft));
  opacity: 0.72;
  transform: translateY(1px);
}

/* \u5173\u95ED\u6309\u94AE\uFF1A\u6781\u7B80\u901A\u900F */
/* \u5173\u95ED\u952E\u4E0E\u5BBF\u4E3B\u90A3\u5957\u540C\u5F62\uFF1A\u4E00\u4E2A\u5706\u3001\u65E0\u8FB9\u6846\uFF0C\u60AC\u505C\u6D6E\u51FA\u4E00\u5C42\u540C\u8272\u8584\u5E95 */
.modal-x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--modal-faint, var(--ink-faint));
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: background-color var(--hover-ms) ease, color var(--hover-ms) ease;
}

.modal-x:hover {
  background: var(--modal-hover, rgba(255, 255, 255, 0.12));
  color: var(--ink);
}

.modal-x:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  color: var(--ink);
}

/* \u8BF4\u660E\u6587\u5B57\uFF1A\u6E29\u548C\u6536\u655B */
.modal-hint {
  margin: 0 0 12px;
  color: var(--ink-soft);
  font-size: 12px;
  line-height: 1.5;
}

/* \u5185\u5BB9\u533A\uFF1A\u544A\u522B\u81C3\u80BF\u7684\u201C\u5185\u5D4C\u9ED1\u51F9\u69FD\u201D\uFF0C\u56DE\u5F52\u81EA\u7136\u8212\u5C55\u7684\u65E0\u8FB9\u6846\u5E03\u5C40 */
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
}

/* \u63D0\u793A\u7A97\u5DE5\u5177\u6761\uFF1A\u5F15\u5BFC/\u5206\u5C94 \u4E0E OOC \u5E76\u5217\u4E00\u884C\uFF0C\u50CF\u7CBE\u5BC6\u7684\u63A7\u5236\u53F0 */
.prompt-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.guide-seg {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, rgba(255, 255, 255, 0.14));
  border-radius: 6px;
  background: rgba(3, 8, 18, 0.55);
}

.guide-seg .seg-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all var(--hover-ms) ease;
}

/* \u6CE8\u610F\uFF1A\u5F39\u7A97\u91CC\u8FD9\u4E24\u679A\uFF08.guide-seg / .ooc-shortcut\uFF09\u771F\u6B63\u751F\u6548\u7684\u6837\u5F0F\u5728\u6587\u4EF6\u672B\u5C3E\u90A3\u8282
   \u300C\u4ECE app.css \u8865\u642C\u7684\u89C4\u5219\u300D\u91CC\u7684 .seg / .seg .seg-btn / .ooc-shortcut\u2014\u2014
   \u540C\u6743\u91CD\u3001\u4F4D\u7F6E\u66F4\u540E\uFF0C\u8FD9\u91CC\u8FD9\u51E0\u6761\u88AB\u5B83\u4EEC\u538B\u7740\uFF08\u5B83\u4EEC\u8D70 --line/--bg/--panel/--ink-soft \u4EE4\u724C\uFF0C
   \u6DF1\u6D45\u4E24\u6863\u672C\u6765\u5C31\u8DDF\u7740\u8D70\uFF09\u3002\u6539\u5F39\u7A97\u91CC\u8FD9\u4E24\u679A\u7684\u6837\u5B50\u8981\u6539\u90A3\u4E00\u8282\u3002 */
.guide-seg .seg-btn:hover {
  color: #ffffff;
}

.guide-seg .seg-btn.active {
  background: color-mix(in srgb, var(--accent) 70%, rgba(255, 255, 255, 0.15));
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* OOC \u5FEB\u6377\u6A21\u5F0F\u5207\u6362\u952E */
.ooc-shortcut {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid color-mix(in srgb, var(--accent) 26%, rgba(255, 255, 255, 0.12));
  border-radius: 6px;
  background: rgba(3, 8, 18, 0.45);
  color: rgba(255, 255, 255, 0.7);
  font-size: 11.5px;
  cursor: pointer;
  transition: all var(--hover-ms) ease;
}

.ooc-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all var(--hover-ms) ease;
}

.ooc-shortcut:hover {
  color: #ffffff;
  border-color: color-mix(in srgb, var(--accent) 45%, rgba(255, 255, 255, 0.2));
}

.ooc-shortcut.on {
  border-color: color-mix(in srgb, var(--accent) 65%, #ffffff);
  background: color-mix(in srgb, var(--accent) 25%, rgba(3, 8, 18, 0.6));
  color: #ffffff;
  font-weight: 600;
}

.ooc-shortcut.on .ooc-indicator {
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}

/* \u8F93\u5165\u533A\uFF1A\u5927\u9762\u79EF\u8212\u5C55\u8F93\u5165 */
.director-input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.director-input textarea,
.modal-body textarea,
.route-modal-input {
  width: 100%;
  box-sizing: border-box;
  min-height: 108px;
  padding: 12px 14px;
  border: 1px solid var(--modal-field-edge, color-mix(in srgb, var(--accent) 30%, rgba(255, 255, 255, 0.14)));
  border-radius: 6px;
  background: var(--modal-field, rgba(2, 7, 16, 0.6));
  color: var(--ink);
  font-family: inherit;
  font-size: 13.5px;
  line-height: 1.62;
  letter-spacing: 0.015em;
  outline: none;
  resize: vertical;
  transition: border-color var(--hover-ms) ease, box-shadow var(--hover-ms) ease;
}

.director-input textarea:focus,
.modal-body textarea:focus,
.route-modal-input:focus {
  border-color: color-mix(in srgb, var(--accent) 72%, #ffffff);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--accent) 50%, transparent),
    0 0 18px color-mix(in srgb, var(--accent) 20%, transparent);
}

/* \u5360\u4F4D\u7B26\u662F\u63D0\u793A\u4E0D\u662F\u503C\uFF0C\u4F46\u8981\u8BFB\u5F97\u6E05\uFF1A\u6BD4\u6B63\u6587\u6DE1\u4E00\u6863\u5373\u53EF\uFF08\u6DF1\u8272\u4E0B\u5B9E\u6D4B ~4.6:1\uFF09 */
.director-input textarea::placeholder,
.modal-body textarea::placeholder,
.modal-body input::placeholder {
  color: var(--modal-faint, rgba(255, 255, 255, 0.5));
}

/* \u751F\u56FE\u9009\u9879\u7EC4 */
.cg-options-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* \u5E95\u90E8\u64CD\u4F5C\u6761\uFF1A\u8F7B\u76C8\u901A\u900F */
.modal-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--modal-line, color-mix(in srgb, var(--accent) 22%, rgba(255, 255, 255, 0.08)));
}

.modal-foot > .free-back {
  margin-right: auto;
}

/* \u952E\u76D8\u63D0\u793A\uFF1A\u653E\u7F6E\u5728\u5DE6\u4FA7 */
.modal-card:has(textarea)::after {
  content: "Ctrl / \u2318 + Enter \u63D0\u4EA4";
  position: absolute;
  bottom: 22px;
  left: 22px;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.02em;
  color: var(--modal-faint, rgba(255, 255, 255, 0.35));
  pointer-events: none;
}

/* \u7A97\u5185\u6309\u94AE\uFF1A\u5229\u843D\u6709\u529B\u7684\u6E38\u620F\u6309\u952E */
.modal-card button:not(.modal-x):not(.seg-btn):not(.ooc-shortcut):not(.ref-picker-chip) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 18px;
  border: 1px solid var(--modal-btn-edge, rgba(255, 255, 255, 0.16));
  border-radius: 4px;
  background: var(--modal-btn-bg, rgba(255, 255, 255, 0.06));
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all var(--hover-ms) ease;
}

.modal-card button:not(.modal-x):not(.seg-btn):not(.ooc-shortcut):not(.ref-picker-chip):hover:not(:disabled) {
  background: var(--modal-btn-hover-bg, rgba(255, 255, 255, 0.14));
  border-color: var(--modal-btn-hover-edge, rgba(255, 255, 255, 0.28));
  color: var(--ink);
}

/* \u4E3B\u6309\u952E\uFF08\u53D1\u9001 / \u786E\u8BA4 / \u751F\u6210\uFF09\uFF1A\u4E3B\u9898\u8272\u660E\u6F88\u8D28\u611F */
.modal-card button.primary:not(.modal-x) {
  min-width: 96px;
  border: 1px solid color-mix(in srgb, var(--accent) 55%, #ffffff);
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--accent) 84%, #ffffff) 0%,
    color-mix(in srgb, var(--accent) 92%, #06152b) 100%);
  color: #ffffff;
  font-weight: 600;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 2px 10px color-mix(in srgb, var(--accent) 35%, transparent);
}

.modal-card button.primary:not(.modal-x):hover:not(:disabled) {
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--accent) 60%, #ffffff) 0%,
    color-mix(in srgb, var(--accent) 84%, #041022) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 0 16px color-mix(in srgb, var(--accent) 55%, transparent);
}

.modal-card button:disabled {
  opacity: 0.38;
  cursor: default;
}

/* \u5371\u9669\u52A8\u4F5C\u6309\u94AE\uFF08\u5220\u9664\uFF09\uFF1A\u6D45\u8272\u4E3B\u9898\u662F\u6DF1\u7EA2\u5B57 + \u6DE1\u7EA2\u5E95\uFF0C\u6DF1\u8272\u4E3B\u9898\u662F\u4EAE\u7EA2\u5B57 + \u7EA2\u73BB\u7483\u5E95\u3002
   box-shadow \u8981\u663E\u5F0F\u538B\u6389\uFF1A\u5B83\u662F \`primary danger-btn\` \u4E00\u8D77\u7528\u7684\uFF08\u5220\u5267\u76EE / \u5220\u5468\u76EE\uFF09\uFF0C
   \u4E0A\u9762\u90A3\u6761 .primary \u7684\u4E3B\u8272\u5916\u53D1\u5149\u4F1A\u628A\u7EA2\u952E\u88F9\u4E00\u5708\u84DD\u5149\u3002 */
.modal-card button.danger-btn:not(.modal-x) {
  border-color: var(--modal-danger-edge, rgba(239, 68, 68, 0.5));
  background: var(--modal-danger-bg, rgba(239, 68, 68, 0.2));
  color: var(--modal-danger, #fca5a5);
  box-shadow: none;
}

.modal-card button.danger-btn:not(.modal-x):hover:not(:disabled) {
  background: var(--modal-danger-bg-hover, rgba(239, 68, 68, 0.35));
  border-color: var(--modal-danger, rgba(239, 68, 68, 0.7));
  color: var(--modal-danger-ink-hover, #ffffff);
  box-shadow: none;
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
  /* \u5E95\u7F18\uFF1A\u72B6\u6001\u63D0\u793A\u7EDF\u4E00\u9760\u5728\u5BF9\u8BDD\u6846\u53F3\u4FA7\uFF1B\u5FEB\u6377\u83DC\u5355\u5728\u5C4F\u5E55\u53F3\u4E0B\u89D2\u72EC\u7ACB\u6210\u6761 */
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
  border: none;
  min-height: 0;
}

.dialog-hint-foot {
  margin-left: auto;
  min-height: 20px;
}

.dialog-options {
  /* ATRI \u5FEB\u6377\u83DC\u5355\uFF1A\u5C4F\u5E55\u53F3\u4E0B\u89D2\u8D34\u8FB9\u7684\u4E00\u6761\u7EC6\u80F6\u56CA\uFF0C\u6DF1\u6D77\u84DD\u5E95 + 1px \u51B0\u84DD\u63CF\u8FB9\uFF0C\u9AD8 ~28px */
  position: absolute;
  right: 0;
  bottom: var(--safe-b, 0px);
  display: flex;
  align-items: center;
  gap: 2px;
  height: var(--stage-chrome-h, 30px);
  padding: 0 10px 0 14px;
  border: 1px solid var(--stage-chrome-edge, color-mix(in srgb, var(--accent) 55%, #a9cdec));
  border-right: none;
  border-bottom: none;
  border-radius: 15px 0 0 0;
  background: var(--stage-chrome-bg, linear-gradient(180deg,
    color-mix(in srgb, var(--stage-chrome-lit, var(--stage-chrome-deep)) 92%, transparent),
    color-mix(in srgb, var(--stage-chrome-deep) 99%, transparent)));
  box-shadow: var(--stage-chrome-gloss, inset 0 1px 0 rgba(255, 255, 255, 0.18));
}

.quick-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-width: 26px;
  height: 24px;
  padding: 0 7px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: rgba(255, 255, 255, 0.92);
  font: inherit;
  font-family: "Montserrat", "Inter", var(--font-ui);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-shadow: none;
  cursor: pointer;
  transition: color 0.14s ease, background-color 0.14s ease, opacity 0.14s ease;
  user-select: none;
}

.quick-btn:hover:not(:disabled) {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  text-shadow: 0 0 8px rgba(140, 210, 255, 0.9);
  opacity: 1;
}

.quick-btn.is-off {
  opacity: 0.52;
}

.quick-btn:disabled {
  opacity: 0.28;
  cursor: default;
}

.quick-sep {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.22);
  margin: 0 2px;
}

/* \u5BFC\u6F14\u5DE5\u5177\u680F\uFF1A\u6A2A\u7740\u653E\u5728\u53F3\u4E0A\u89D2\uFF0C\u5FAE\u6676\u80F6\u56CA\u5E95\uFF0C\u6781\u7B80\u514B\u5236 */
.theater-director {
  position: absolute;
  z-index: 45;
  /* 10px \u4E0E\u5DE6\u4E0A\u89D2\u300C\u821E\u53F0 \u21C4 \u5DE5\u574A\u300D\u540C\u4E00\u884C\u3001\u540C\u4E00\u95F4\u8DDD\uFF08\u90A3\u8FB9\u4E5F\u662F 10px\uFF0C
     \u4E0E\u5DE5\u574A\u4FA7\u680F\u9876\u7AEF\u90A3\u679A\u540C\u6B3E\u5F00\u5173\u5BF9\u9F50\uFF09\uFF0C\u7A84\u5C4F\u90A3\u8282\u8D70\u7684\u662F\u540C\u4E00\u7EC4\u503C */
  top: calc(10px + env(safe-area-inset-top, 0px));
  right: 10px;
  bottom: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  height: var(--stage-chrome-h, 30px);
  box-sizing: border-box;
  padding: 0 4px;
  /* \u4E00\u5C42\u5F88\u6D45\u7684\u4E2D\u6027\u73BB\u7483\uFF08\u9876\u4EAE\u5E95\u6697 + \u4E00\u9053\u9876\u7F18\u9AD8\u5149\uFF0C\u4E0E\u53F3\u4E0B\u89D2\u5FEB\u6377\u83DC\u5355\u540C\u4E00\u624B\u6CD5\uFF09\uFF1A
     \u5BFC\u6F14\u680F\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684\u5668\u5177\uFF0C\u4E0D\u662F\u8FD9\u573A\u620F\u7684\u4E00\u90E8\u5206\u3002
     \u4E3B\u9898\u8272\u7559\u7ED9\u53F0\u8BCD\u6761\u3001\u9009\u80A2\u4E0E\u53F3\u4E0B\u89D2\u5FEB\u6377\u83DC\u5355\u2014\u2014\u90A3\u662F\u73A9\u5BB6\u5728\u8BFB\u3001\u5728\u9009\u7684\u4E1C\u897F\uFF1B
     \u53EA\u6709\u67D0\u4E00\u6863\u5F00\u7740\uFF08\`.on\`\uFF09\u65F6\u624D\u5728\u8FD9\u91CC\u70B9\u4EAE\u4E3B\u9898\u8272\u3002 */
  border: 1px solid var(--stage-chrome-quiet-edge, #e2e8f0);
  border-radius: var(--stage-chrome-radius, 999px);
  background: var(--stage-chrome-quiet-bg, #ffffff);
  backdrop-filter: blur(12px);
  box-shadow: var(--stage-chrome-quiet-shadow, 0 2px 10px rgba(15, 23, 42, 0.12));
}

.theater-director .dir-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: calc(var(--stage-chrome-h, 30px) - 6px);
  /* \u901A\u7528 .dir-btn \u90A3\u6761\uFF08\u65E7\u5BF9\u8BDD\u6846\u8D34\u8FB9\u680F\u7684\u6B8B\u7559\uFF09\u5E26 min-height: 40px\uFF1A
     \u4E0D\u6E05\u6389\u7684\u8BDD\u6BCF\u9897\u6309\u94AE\u90FD\u6491\u6210 40px\uFF0C\u8FDB\u800C\u4ECE 30px \u7684\u80F6\u56CA\u91CC\u6EA2\u51FA\u6765\uFF08\u9009\u4E2D\u6001\u7684\u5E95\u8272\u6700\u663E\u773C\uFF09\u3002 */
  min-height: 0;
  padding: 0 9px;
  border: none;
  border-radius: var(--stage-chrome-radius, 999px);
  background: transparent;
  /* \u6D45\u5E95\u6DF1\u5B57 / \u6DF1\u5E95\u6D45\u7070\u5B57\uFF1A\u4E24\u7EC4\u503C\u90FD\u5728 quiet \u4EE4\u724C\u91CC\uFF0C\u4E0E\u5DE6\u4E0A\u89D2\u5207\u6362\u5668\u7EDF\u4E00 */
  color: var(--stage-chrome-quiet-ink, #64748b);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background-color 0.14s ease, color 0.14s ease;
}

.theater-director .dir-btn:hover:not(:disabled) {
  background: var(--stage-chrome-quiet-hover, #f1f5f9);
  color: var(--stage-chrome-quiet-ink-hover, #0f172a);
}

.theater-director .dir-btn.on {
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 700;
  box-shadow: none;
}

.theater-director .dir-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

@keyframes voice-blink {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
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

/* \u6A21\u5F0F\u6807\u8BC6\uFF08NSFW / \u9759\u97F3 / Auto\uFF09\u90A3\u4E00\u884C\uFF1A\u6302\u5728\u5DE6\u4E0A\u89D2\u5F00\u5173\u4E0B\u9762\uFF0C\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684\u88F8\u5B57\u3002
   \u8FD9\u4E00\u7EC4\u5FC5\u987B\u5199\u5728\u4E0B\u9762 @media (max-width: 720px) **\u4E4B\u524D**\uFF1A
   \u7A84\u5C4F\u7684 top / \u5B57\u53F7\u8986\u76D6\u5728\u90A3\u513F\uFF0C\u540C\u6743\u91CD\u5C31\u5F97\u8BA9\u4F4D\u7ED9\u540E\u8005\u3002 */
.stage-modes {
  position: absolute;
  z-index: 40;
  /* \u5B83\u7684\u5B9A\u4F4D\u7236\u7EA7\u662F\u5DE6\u4E0A\u89D2\u90A3\u679A\u5F00\u5173\uFF08StageScreen \u628A\u8FD9\u4E00\u884C\u6E32\u67D3\u5728 .stage-top-left-cluster \u91CC\uFF09\uFF1A
     56px = \u90A3\u679A\u5F00\u5173 30px \u9AD8 + 26px \u7A7A\u6863\uFF0Cleft 10px \u4E0E\u5F00\u5173\u7684\u5DE6\u8FB9\u7EBF\u9F50\u5E73\u3002 */
  top: calc(56px + env(safe-area-inset-top, 0px));
  left: 10px;
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

/* \u6D45\u8272\u4E3B\u9898\uFF1A\u8FD9\u4E00\u884C\u538B\u5728\u63D2\u753B\u4E0A\uFF08\u6CA1\u6709\u5E95\u677F\uFF09\uFF0C\u5B57\u7FFB\u6210\u6DF1\u58A8 + \u4E00\u5708\u767D\u6655\u2014\u2014
   \u6DF1\u8272\u90A3\u4FA7\u662F\u767D\u5B57 + \u6DF1\u6655\uFF0C\u4E24\u8FB9\u5BF9\u79F0\u3002\u58A8\u8272\u6BD4 --dialog-ink-faint \u90A3\u6863\uFF08\u4E94\u6210\uFF09\u518D\u5B9E\u4E00\u70B9\uFF1A
   \u53F0\u8BCD\u6761\u5E95\u4E0B\u662F\u5B9E\u5FC3\u7EB8\u9762\uFF0C\u4E94\u6210\u591F\uFF1B\u8FD9\u4E00\u884C\u538B\u7684\u662F\u63D2\u753B\uFF0C\u592A\u6DE1\u5C31\u88AB\u753B\u9762\u5403\u6389\u3002 */
html[data-ui-theme="light"] .stage-mode {
  color: rgb(30 26 22 / 0.82);
  text-shadow: 0 0 6px rgb(255 255 255 / 0.95), 0 0 2px rgb(255 255 255 / 0.9);
}

/* \u53F0\u8BCD\u6761\u5728\u300C\u7A84\u300D\u548C\u300C\u77EE\u300D\u4E24\u79CD\u60C5\u51B5\u4E0B\u90FD\u8981\u6362\u4E00\u526F\u9AA8\u67B6\uFF1A\u7AD6\u5C4F\u624B\u673A\uFF08\u2264720px\uFF09\u4E0E
   \u6A2A\u5C4F\u624B\u673A / \u77EE\u7A97\u53E3\uFF08\u2264460px \u9AD8\uFF09\u3002\u684C\u9762\u90A3\u526F\u662F\u300C25% \u9AD8 + 52px \u4E0A\u7559\u767D\u300D\u7684\u56FA\u5B9A\u5E26\uFF0C
   \u653E\u5230 390px \u9AD8\u7684\u89C6\u53E3\u91CC\uFF0C\u4E00\u884C\u6B63\u6587\u5C31\u88AB\u6324\u51FA\u753B\u9762\u4E86\u3002
   \u6539\u6210\u672C\u5730\u6D41\u5F0F\u6392\u5E03\uFF1A\u59D3\u540D / \u6B63\u6587\u4ECE\u4E0A\u5F80\u4E0B\u5199\uFF08\u4E0E\u684C\u9762\u540C\u4E00\u4E2A\u300C\u5B57\u8D77\u5728\u7A97\u9876\u300D\u7684\u624B\u611F\uFF09\uFF0C
   \u5E95\u7F18\u90A3\u4E00\u884C\uFF08\u72B6\u6001\u63D0\u793A + \u5FEB\u6377\u83DC\u5355\uFF09\u7528 margin-top: auto \u538B\u5230\u7A97\u5E95\uFF0C
   \u6B63\u6587\u518D\u957F\u4E5F\u53EA\u662F\u628A\u8FD9\u6761\u5E95\u677F\u9876\u9AD8\uFF1B\u8D85\u957F\u7684\u8FD8\u80FD\u6EDA\u3002 */
@media (max-width: 720px), (max-height: 460px) {
  .theater-dialog {
    /* \u8FD9\u4E24\u6761\u662F\u515C\u5E95\u503C\uFF0C\u771F\u5B9E\u5C3A\u5BF8\u7531\u4E0B\u9762\u6309\u300C\u7AD6\u5C4F / \u77EE\u89C6\u53E3\u300D\u4E24\u7AEF\u5206\u522B\u7ED9\uFF1A\u540C\u4E00\u4E2A\u767E\u5206\u6BD4\u5728
       \u4E24\u5757\u5C4F\u4E0A\u5DEE\u5F97\u8FDC\u2014\u201430% \u5728 844 \u9AD8\u7684\u7AD6\u5C4F\u662F 253px\uFF08\u591F\u4E94\u884C\uFF0C\u6B63\u6587\u60AC\u5728\u7A97\u9876\uFF09\uFF0C
       \u5728 390 \u9AD8\u7684\u6A2A\u5C4F\u53EA\u6709 117px\uFF08\u4E00\u884C\u591A\uFF0C\u7A97\u53C8\u504F\u77EE\uFF09\u3002 */
    min-height: 30%;
    max-height: 62%;
    padding: 40px 16px calc(6px + var(--safe-b, 0px));
    justify-content: flex-start;
    gap: 6px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .dialog-name {
    position: static;
    left: auto;
    top: auto;
    margin-bottom: 2px;
    font-size: 18px;
  }

  .dialog-text {
    font-size: 15.5px;
    min-height: 0;
  }

  /* \u5E95\u7F18\u9489\u5728\u7A97\u5E95\uFF1A\u6B63\u6587\u53EA\u6709\u4E00\u884C\u65F6\uFF0C\u5FEB\u6377\u83DC\u5355\u4E0D\u8DDF\u7740\u5F80\u4E0A\u6D6E\uFF1B
     \u6B63\u6587\u957F\u5230\u9876\u6EE1\u7A97\uFF08\u8D85\u8FC7 62%\uFF09\u65F6\u7A97\u81EA\u5DF1\u6EDA\uFF0C\u8FD9\u4E00\u884C sticky \u4F4F\u4E0D\u88AB\u6EDA\u51FA\u89C6\u91CE\u2014\u2014
     \u5426\u5219\u4E00\u53E5\u8D85\u957F\u53F0\u8BCD\u4F1A\u628A\u56DE\u987E/\u8DEF\u7EBF/\u753B\u5ECA\u90A3\u4E00\u6392\u6309\u94AE\u9876\u5230\u51E0\u767E\u50CF\u7D20\u4EE5\u5916\u3002
     \u5B83\u5E95\u4E0B\u5FC5\u987B\u6709\u5E95\uFF1A\u6B63\u6587\u4ECE\u4E0B\u9762\u7ECF\u8FC7\u65F6\u8981\u88AB\u8FD9\u5C42\u6DF1\u8272\u6E10\u53D8\u76D6\u4F4F\u3002 */
  .dialog-foot {
    position: sticky;
    bottom: 0;
    z-index: 1;
    margin-top: auto;
    margin-inline: -16px;
    margin-bottom: calc(-6px - var(--safe-b, 0px));
    padding: 10px 16px calc(6px + var(--safe-b, 0px));
    gap: 8px;
    background: linear-gradient(180deg,
      color-mix(in srgb, var(--stage-accent-deep) 0%, transparent) 0%,
      color-mix(in srgb, var(--stage-accent-deep) 78%, transparent) 45%,
      color-mix(in srgb, var(--stage-accent-deep) 96%, transparent) 100%);
  }

  /* \u72B6\u6001\u63D0\u793A\uFF08\u56DE\u770B\u4E2D / \u25BC / \u70B9\u51FB\u821E\u53F0\u7EE7\u7EED\u751F\u6210\uFF09\u6709\u5185\u5BB9\u65F6\u72EC\u5360\u4E00\u884C\uFF0C\u4E0D\u8DDF\u90A3\u4E00\u6392\u5FEB\u6377\u5165\u53E3
     \u62A2\u6A2A\u5411\u7A7A\u95F4\u2014\u2014\u5B83\u4E00\u6324\uFF0CTitle \u5C31\u6389\u5230\u7B2C\u4E8C\u884C\u3002\`:has(> *)\` \u53EA\u5728\u5B83\u771F\u6709\u4E1C\u897F\u65F6\u6210\u7ACB\uFF0C
     \u7A7A\u7684\u65F6\u5019\u8FDE\u90A3\u4E00\u884C\u90FD\u4E0D\u51FA\u73B0\u3002 */
  .dialog-foot:has(.dialog-hint-foot > *) {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .dialog-foot:has(.dialog-hint-foot > *) .dialog-hint-foot {
    flex: 1 1 100%;
  }

  /* \u5FEB\u6377\u83DC\u5355\u4E0D\u518D\u6D6E\u5728\u53F3\u4E0B\u89D2\u538B\u5728\u5B57\u4E0A\uFF1A\u5B83\u662F\u5E95\u7F18\u90A3\u4E00\u884C\u7684\u53F3\u534A\uFF0C\u8DDF\u7740\u6B63\u6587\u4E00\u8D77\u6D41\u3002
     \u5165\u53E3\u5728 390 \u5BBD\u91CC\u6392\u4E0D\u6EE1\u4E00\u884C\u5C31\u6298\u884C\uFF0C\u4E0D\u786C\u6324\u3002 */
  .dialog-options {
    position: static;
    right: auto;
    bottom: auto;
    flex-wrap: wrap;
    justify-content: flex-end;
    height: auto;
    row-gap: 4px;
    margin-left: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none;
  }

  .quick-btn {
    min-width: 28px;
    height: 30px;
    padding: 0 7px;
    font-size: 13px;
  }

  /* \u6D45\u8272\u4E3B\u9898\uFF1A\u5E95\u7F18\u90A3\u6761\u6DF1\u84DD\u6E10\u53D8\u7FFB\u6210\u7EB8\u767D\u2014\u2014\u7A84\u5C4F\u4E0B\u8FD9\u6392\u5FEB\u6377\u5165\u53E3\u4E0D\u518D\u662F\u538B\u5728\u753B\u9762\u4E0A\u7684
     \u73BB\u7483\u80F6\u56CA\uFF08\u4E0A\u9762\u628A\u5B83\u62C6\u6210\u5E95\u7F18\u90A3\u4E00\u884C\u7684\u53F3\u534A\uFF09\uFF0C\u5B83\u5C31\u662F\u53F0\u8BCD\u6761\u7684\u4E00\u90E8\u5206\uFF0C
     \u5E95\u8BE5\u8DDF\u53F0\u8BCD\u6761\u540C\u6E90\u3002\u5B57\u4E0E\u5206\u9694\u7EBF\u4E00\u8D77\u7FFB\u6210\u6DF1\u58A8\uFF0C\u5426\u5219\u767D\u5B57\u538B\u5728\u7EB8\u9762\u4E0A\u4E00\u4E2A\u5B57\u90FD\u8BFB\u4E0D\u51FA\u6765\u3002
     \u6DF1\u8272\u90A3\u4FA7\u4E00\u4E2A\u5B57\u8282\u90FD\u4E0D\u52A8\u3002 */
  html[data-ui-theme="light"] .stage-root .dialog-foot {
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 0%,
      color-mix(in srgb, var(--accent) 6%, rgba(248, 250, 252, 0.88)) 50%,
      color-mix(in srgb, var(--accent) 8%, rgba(241, 245, 249, 0.98)) 100%);
  }

  html[data-ui-theme="light"] .stage-root .dialog-foot .quick-btn {
    color: var(--dialog-ink-soft);
  }

  html[data-ui-theme="light"] .stage-root .dialog-foot .quick-btn:hover:not(:disabled) {
    color: var(--dialog-ink);
    background: var(--dialog-hover);
    text-shadow: 0 0 6px rgb(255 255 255 / 0.9);
  }

  html[data-ui-theme="light"] .stage-root .dialog-foot .quick-sep {
    background: var(--dialog-line);
  }
}

/* \u7AD6\u5C4F\uFF1A\u7A97\u9AD8\u4E0E\u4E0A\u7559\u767D\u7167\u684C\u9762\u90A3\u526F\u6BD4\u4F8B\uFF0825% + 52px\uFF09\u300240px \u4E0A\u7559\u767D\u843D\u5728 253px \u7684\u7A97\u91CC
   \u53EA\u6709\u4E00\u6210\u516D\uFF0C\u6B63\u6587\u8D34\u7740\u7A97\u9876\u3001\u4E0B\u9762\u7A7A\u4E00\u5927\u7247\uFF1B\u6309\u684C\u9762\u6BD4\u4F8B\u653E\u4E0B\u6765\uFF0C\u6B63\u6587\u843D\u5728\u7A97\u9AD8\u4E24\u6210\u5904\uFF0C
   \u4E0E\u684C\u9762\u4E00\u773C\u662F\u540C\u4E00\u4E2A\u6784\u56FE\u3002 */
@media (max-width: 720px) and (min-height: 461px) {
  .theater-dialog {
    min-height: 25%;
    padding-top: 52px;
  }

  /* \u6709\u540D\u724C\u65F6\u4E0A\u7559\u767D\u6536\u5C0F\uFF1A\u540D\u724C\u81EA\u5DF1\u5C31\u662F\u8D34\u7740\u7A97\u9876\u7684\u90A3\u4E00\u884C\uFF08\u684C\u9762\u4E5F\u662F\u8FD9\u4E48\u6392\u7684\u2014\u2014
     \u540D\u724C absolute \u5728\u7A97\u9876 6px \u5904\uFF09\uFF0C\u518D\u7559 52px \u53EA\u4F1A\u628A\u5B83\u548C\u6B63\u6587\u4E00\u8D77\u538B\u5230\u7A97\u4E2D\u95F4\u3002
     \u540D\u724C\u7684\u5B57\u91CD\u4E0E\u5916\u6655\u672C\u6765\u5C31\u4E3A\u300C\u538B\u5728\u900F\u660E\u7A97\u9876\u300D\u51C6\u5907\u3002 */
  .theater-dialog:has(.dialog-name) {
    padding-top: 10px;
  }
}

/* \u6A2A\u5C4F\u624B\u673A / \u77EE\u7A97\u53E3\uFF1A\u5C4F\u5E55\u77EE\uFF0C25% \u53EA\u6709\u4E5D\u5341\u6765\u50CF\u7D20\u3002\u6309\u300C\u4E0A\u7559\u767D 40 + \u4E24\u884C\u6B63\u6587 + \u5E95\u7F18\u300D
   \u7684\u7EDD\u5BF9\u9AD8\u5EA6\u53CD\u63A8\uFF0C\u7ED9\u5230 36%\uFF08390 \u9AD8\u65F6 140px\uFF09\u2014\u2014\u4E00\u884C\u6B63\u6587\u65F6\u4E5F\u4E0D\u81F3\u4E8E\u53EA\u5269\u4E00\u6761\u7A84\u7F1D\u3002 */
@media (max-height: 460px) {
  .theater-dialog {
    min-height: 36%;
    padding-top: 40px;
  }

  .theater-dialog:has(.dialog-name) {
    padding-top: 8px;
  }
}

/* \u8D85\u7A84\u5C4F\uFF08\u2264420px\uFF09\uFF1A\u5FEB\u6377\u83DC\u5355\u6709\u5341\u4E2A\u5165\u53E3\uFF08Auto / \u524D\u540E\u7FFB / Log / Route / CG / \u5168\u5C4F /
   \u9690\u85CF / \u5DE5\u574A / Title\uFF09\uFF0C\u6309\u9ED8\u8BA4 7px \u5185\u8FB9\u8DDD\u52A0\u8D77\u6765\u6BD4 360 \u8FD8\u5BBD\u5341\u6765\u50CF\u7D20\uFF0CTitle \u5C31\u88AB\u6324\u5230\u7B2C\u4E8C\u884C\u3002
   \u6536\u7A84\u5185\u8FB9\u8DDD\u4E0E\u95F4\u8DDD\uFF0C\u5E76\u628A\u53F0\u8BCD\u6761\u5DE6\u53F3\u8FB9\u8DDD\u6536\u4E00\u6863\uFF1A\u4E00\u884C\u6392\u5F97\u4E0B\uFF0C\u4E5F\u7559\u5F97\u4F4F\u72B6\u6001\u63D0\u793A\u7684\u4F4D\u7F6E\u3002 */
@media (max-width: 420px) {
  .theater-dialog {
    padding-left: 12px;
    padding-right: 12px;
  }

  .theater-dialog .dialog-foot {
    margin-inline: -12px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .dialog-options {
    gap: 1px;
  }

  .quick-btn {
    padding: 0 5px;
    font-size: 12.5px;
  }
}

/* 320 \u5BBD\u7684\u8001\u673A\u578B\uFF08iPhone SE \u4E00\u4EE3\u90A3\u4E00\u6863\uFF09\uFF1A\u518D\u6536\u4E00\u6863\uFF0C\u8FD9\u4E00\u6392\u4E5F\u6392\u5F97\u4E0B */
@media (max-width: 350px) {
  .dialog-options {
    gap: 0;
  }

  .quick-btn {
    padding: 0 4px;
    font-size: 12px;
  }
}

/* \u624B\u673A\u7A84\u5C4F\u7684 chrome\uFF1A\u5BFC\u6F14\u680F\u4E0E\u5DE6\u4E0A\u89D2\u300C\u821E\u53F0 \u21C4 \u5DE5\u574A\u300D\u5E76\u6392\u4E00\u884C\uFF08\u56FE\u6807\u5316\u4E4B\u540E\u603B\u5171\u53EA\u5360
   \u4E24\u767E\u591A\u50CF\u7D20\uFF0C390 \u5BBD\u7684\u5C4F\u8FD8\u5269\u4E00\u767E\u591A\u7684\u7A7A\u6863\uFF09\uFF0C\u6A21\u5F0F\u6807\u8BC6\u843D\u5230\u8FD9\u4E00\u884C\u4E0B\u9762\u3002
   \u6A2A\u5C4F\u624B\u673A\u591F\u5BBD\uFF0C\u672C\u6765\u5C31\u540C\u6392\u3002\u5B89\u5168\u533A\u4E00\u5F8B\u7531 env() \u515C\u3002 */
@media (max-width: 720px) {
  /* \u4E0E\u5DE6\u4E0A\u89D2\u300C\u821E\u53F0 \u21C4 \u5DE5\u574A\u300D\u540C\u4E00\u884C\u3001\u540C\u4E00\u9AD8\u5EA6\uFF1A\u4E24\u6761 chrome \u672C\u6765\u5C31\u8BE5\u5E76\u6392\uFF0C
     \u56FE\u6807\u5316\u4E4B\u540E\u603B\u5171\u53EA\u5360 267px\uFF0C390 \u5BBD\u7684\u5C4F\u8FD8\u5269\u4E00\u767E\u591A\u50CF\u7D20\u7684\u7A7A\u6863\u3002
     max-width \u515C\u4F4F\u300C\u591A\u4E00\u9897\u91CD\u542C\u952E\u300D\u548C\u66F4\u7A84\u7684\u5C4F\u2014\u2014\u8D85\u4E86\u8BA9\u5B83\u81EA\u5DF1\u6A2A\u6ED1\uFF0C\u4E0D\u538B\u5230\u5207\u6362\u5668\u4E0A\u3002
     \u9AD8\u5EA6 34px \u662F\u8DDF\u7740 app.css \u7A84\u5C4F\u90A3\u8282\u5199\u7684\uFF1A\u90A3\u8FB9\u628A\u5DE6\u4E0A\u89D2\u90A3\u679A\u62AC\u5230 34\uFF08\u624B\u673A\u4E0A\u7684\u9AD8\u9891\u52A8\u4F5C\uFF0C
     \u6307\u5934\u591F\u5F97\u7740\uFF09\uFF0C\u5BFC\u6F14\u680F\u662F\u5B83\u7684\u90BB\u5C45\uFF0C\u5DEE 4px \u5C31\u662F\u4E00\u773C\u770B\u5F97\u51FA\u7684\u4E0D\u9F50\u3002 */
  .theater-director {
    top: calc(10px + env(safe-area-inset-top, 0px));
    right: 10px;
    left: auto;
    height: 34px;
    max-width: calc(100% - 172px);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .theater-director::-webkit-scrollbar {
    display: none;
  }

  /* \u6A21\u5F0F\u6807\u8BC6\uFF08NSFW / \u9759\u97F3 / \u81EA\u52A8\uFF09\u843D\u5230\u8FD9\u4E00\u884C\u4E0B\u9762 */
  .stage-modes {
    top: calc(46px + env(safe-area-inset-top, 0px));
    left: 10px;
  }

  /* \u624B\u673A\u4E0A\u5BFC\u6F14\u680F\u53EA\u7559\u56FE\u6807\uFF1A\u56DB\u4E2A\u52A8\u8BCD\u7684\u5BBD\u5EA6\u5DEE\u4E0D\u591A\u662F\u534A\u6761\u753B\u9762\uFF0C\u800C\u8FD9\u56DB\u4E2A\u52A8\u4F5C\u90FD\u6709
     aria-label / title\uFF0C\u56FE\u6807\uFF08\u5BF9\u8BDD/\u94C5\u7B14/\u91CD\u5199/\u7D20\u6750\uFF09\u5404\u81EA\u8BA4\u5F97\u51FA\u6765\u3002\u817E\u51FA\u7684\u5BBD\u5EA6
     \u4E5F\u8BA9\u300C\u63D0\u793A \u6539\u5199 \u91CD\u5199 \u751F\u56FE \u91CD\u542C\u300D\u4E0D\u81F3\u4E8E\u6324\u6210\u4E24\u884C\u3002 */
  .theater-director .dir-label {
    display: none;
  }

  /* \u680F\u9AD8\u4E86 4px\uFF0C\u91CC\u9762\u90A3\u6392\u6309\u94AE\u8DDF\u7740\u957F\uFF1A\u4E0E\u5DE6\u4E0A\u89D2 .stage-seg-btn \u7684 28px \u540C\u6863 */
  .theater-director .dir-btn {
    height: calc(34px - 6px);
    padding: 0 8px;
  }

  .stage-mode-nsfw {
    font-size: 11px;
  }

  .choice-overlay {
    gap: 8px;
    padding-right: 12px;
    padding-left: 12px;
    padding-bottom: calc(var(--dialog-h, 180px) + 16px + var(--safe-b, 0px));
  }

  .choice {
    width: min(760px, 100%);
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
  max-width: 780px;
  margin-inline: auto;
  width: 100%;
}

/* \u5267\u672C\u91CC\u7684\u821E\u53F0\u6307\u4EE4\u884C\uFF1A\u6BD4\u53F0\u8BCD\u4F4E\u4E00\u6863\u7684\u7070\u5B57\uFF0C\u9760\u4E00\u6761\u7AD6\u7EBF\u6302\u5728\u6B63\u6587\u5DE6\u4FA7\u2014\u2014
   \u5B83\u662F\u300C\u600E\u4E48\u6F14\u7684\u300D\uFF0C\u4E0D\u8BE5\u548C\u8C01\u8BF4\u4E86\u4EC0\u4E48\u62A2\u6CE8\u610F\u529B\uFF0C\u4F46\u4E00\u9875\u5267\u672C\u91CC\u4E0D\u80FD\u6CA1\u6709\u5B83\u3002
   \u5DE6\u6846\u7EBF\u4E0E .is-current::before \u5BF9\u9F50\u5728 left: 0\uFF0C\u5185\u8FB9\u8DDD\u4E0E\u53F0\u8BCD\u884C\uFF0814px\uFF09\u540C\u4E00\u5782\u76F4\u8F74\u7EBF\u3002 */
.bl-dir {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin: 4px 0;
  padding: 4px 12px 4px 12px;
  border-left: 2px solid color-mix(in srgb, var(--dialog-ink-faint, rgb(255 255 255 / 0.3)) 70%, transparent);
  color: var(--dialog-ink-faint);
  font-size: 12.5px;
  line-height: 1.5;
}

/* \u56DE\u987E\u9762\u677F\u6052\u5728\u6DF1\u8272\u906E\u7F69\u4E4B\u4E0A\uFF08\u65E0\u8BBA\u754C\u9762\u662F\u6DF1\u8272\u8FD8\u662F\u6D45\u8272\u4E3B\u9898\uFF09\uFF1A
   \u6307\u4EE4\u6761\u76EE\u4E0E\u7EC6\u8282\u5FC5\u987B\u4FDD\u6301\u9AD8\u5BF9\u6BD4\u5EA6\u7684\u4EAE\u767D/\u6D45\u7070\uFF0C\u907F\u514D\u53D7\u6D45\u8272\u4E3B\u9898\u7684\u6DF1\u58A8\u8272\u5F71\u54CD\u5BFC\u81F4\u770B\u4E0D\u6E05\u3002 */
.backlog-panel .bl-dir {
  border-left-color: rgba(255, 255, 255, 0.35);
  color: rgba(248, 250, 252, 0.72);
}

.backlog-panel .bl-dir-label {
  background: rgba(255, 255, 255, 0.12);
  color: #f8fafc;
}

.backlog-panel .bl-dir-detail {
  color: rgba(248, 250, 252, 0.85);
}

.backlog-panel .bl-dir-option {
  border-color: rgba(255, 255, 255, 0.28);
  color: rgba(248, 250, 252, 0.9);
}

.backlog-panel .bl-dir-stop {
  border-left-color: color-mix(in srgb, var(--bl-accent, var(--accent)) 80%, #ffffff);
  color: #ffffff;
}

.bl-dir-label {
  flex: 0 0 auto;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--dialog-hover, rgb(255 255 255 / 0.08));
  letter-spacing: 0.06em;
}

.bl-dir-detail {
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
  font-size: 12px;
  word-break: break-all;
}

.bl-dir-options {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
  flex-basis: 100%;
}

.bl-dir-option {
  padding: 1px 7px;
  border: 1px solid var(--dialog-line, rgb(255 255 255 / 0.22));
  border-radius: 999px;
  font-size: 12px;
}

/* \u505C\u6B62\u70B9\u4E0E\u672C\u8F6E\u6536\u675F\u8FD9\u7C7B\u300C\u7B49\u4F60\u300D\u7684\u4F4D\u7F6E\uFF1A\u7ED9\u4E00\u70B9\u5F3A\u8C03\uFF0C\u773C\u775B\u626B\u5F97\u5230 */
.bl-dir-stop {
  border-left-color: color-mix(in srgb, var(--accent) 70%, transparent);
  color: var(--dialog-ink-soft);
}

.backlog-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 2px 0;
  list-style: none;
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


.backlog-panel {
  --bl-accent: var(--accent);
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 12px max(16px, env(safe-area-inset-left)) calc(24px + env(safe-area-inset-bottom));
  scrollbar-width: thin;
}

/* \u56DE\u987E\u62BD\u5C49\u6052\u4E3A\u6DF1\u8272\u906E\u7F69\uFF1A\u6D45\u8272\u754C\u9762\u4E3B\u9898\u4E0B :root \u7684 --accent \u662F\u538B\u7EB8\u9762\u7528\u7684\u6DF1\u8272\u6863\uFF08#1b5aa6\uFF09\uFF0C
   \u76F4\u63A5\u753B\u5728\u6DF1\u8272\u906E\u7F69\u4E0A\u4F1A\u663E\u5F97\u6697\u6C89\u53D1\u95F7\uFF0C\u8FD9\u91CC\u7EDF\u4E00\u63D0\u4EAE\u5230\u6DF1\u8272\u754C\u9762\u540C\u6B3E\u4EAE\u8272\u6863\uFF08#4a9fe0\uFF09\u3002 */
html:not([data-ui-theme="dark"]) .backlog-panel {
  --bl-accent: var(--play-accent-dark, #4a9fe0);
}

html:not([data-ui-theme="dark"])[data-accent] .backlog-panel {
  --bl-accent: color-mix(in srgb, var(--accent) 72%, #ffffff);
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

/* \u6761\u76EE\uFF1A\u4E00\u6761\u53F0\u8BCD\u4E00\u5757\u3002\u540D\u5B57\u4E00\u884C\u3001\u6B63\u6587\u4E00\u884C\uFF0C\u52A8\u8BCD\u9ED8\u8BA4\u6536\u8D77\u6765\uFF0C
   \u9F20\u6807\u505C\u4E0A\u53BB / \u952E\u76D8\u8D70\u8FDB\u53BB\u624D\u6D6E\u5230\u53F3\u4E0A\u89D2\u2014\u2014\u6D41\u6C34\u8981\u5E72\u51C0\uFF0C\u64CD\u4F5C\u8981\u8FD8\u5728\u3002 */
.bl-line,
.bl-narrate,
.bl-input,
.bl-player {
  position: relative;
  padding: 10px 14px;
  border-radius: 6px;
  transition: background-color var(--hover-ms) ease;
}

.bl-line:hover,
.bl-narrate:hover,
.bl-input:hover,
.bl-player:hover {
  background: color-mix(in srgb, var(--bl-accent, var(--accent)) 10%, transparent);
}

.bl-head {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 20px;
  margin-bottom: 4px;
}

.bl-actor {
  color: color-mix(in srgb, var(--bl-accent, var(--accent)) 52%, #ffffff);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-shadow: var(--dialog-text-shadow);
}

/* \u8BED\u97F3\u91CD\u64AD\uFF1A\u540D\u5B57\u5DE6\u8FB9\u4E00\u679A\u5706\u5F62\u5FBD\u7AE0\uFF0C\u70B9\u4E00\u4E0B\u5C31\u51FA\u58F0\u3002
   \u663E\u5F0F padding: 0 \u4EE5\u514D\u88AB\u5168\u5C40 button { padding: 8px 14px } \u6324\u6CA1\u4E86\u5185\u90E8 SVG \u56FE\u6807\u3002 */
.bl-voice {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  line-height: 1;
  flex: 0 0 auto;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, var(--bl-accent, var(--accent)) 78%, transparent);
  color: #ffffff;
  cursor: pointer;
  transition: background-color var(--hover-ms) ease, transform var(--hover-ms) ease;
}

.bl-voice svg {
  flex-shrink: 0;
}

.bl-voice:hover:not(:disabled) {
  background: var(--bl-accent, var(--accent));
  color: #ffffff;
  transform: scale(1.1);
}

/* \u52A8\u8BCD\u7EC4\uFF1A\u6D6E\u5728\u6761\u76EE\u53F3\u4E0A\u89D2\uFF0C\u9759\u6B62\u65F6\u4E0D\u5360\u89C6\u89C9\u91CD\u91CF */
.bl-tools {
  position: absolute;
  top: 8px;
  right: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--hover-ms) ease;
}

.bl-line:hover > .bl-tools,
.bl-line:focus-within > .bl-tools,
.bl-narrate:hover > .bl-tools,
.bl-narrate:focus-within > .bl-tools,
.bl-input:hover > .bl-tools,
.bl-input:focus-within > .bl-tools {
  opacity: 1;
  pointer-events: auto;
}

/* \u89E6\u5C4F\u6CA1\u6709 hover\uFF1A\u6240\u6709\u6761\u76EE\u7684\u52A8\u8BCD\u7EC4\u7EDF\u4E00\u843D\u5728\u6B63\u6587\u4E0B\u65B9\u53F3\u4E0B\u89D2\uFF0C
   \u65E2\u4E0D\u538B\u65C1\u767D\u6B63\u6587\u3001\u4E5F\u4E0D\u4E0E\u89D2\u8272\u540D\u62A2\u9876\u884C\uFF0C\u4F4D\u7F6E\u4E00\u81F4\u4E0D\u8DF3\u773C\u3002 */
@media (hover: none) {
  .bl-tools {
    position: static;
    margin-top: 6px;
    justify-content: flex-end;
    opacity: 1;
    pointer-events: auto;
  }
}

.bl-tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 24px;
  padding: 3px 8px;
  border: 1px solid color-mix(in srgb, var(--bl-accent, var(--accent)) 35%, rgba(255, 255, 255, 0.2));
  border-radius: 999px;
  background: color-mix(in srgb, var(--bl-accent, var(--accent)) 42%, rgba(6, 14, 26, 0.85));
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.92);
  font: inherit;
  font-size: 12px;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--hover-ms) ease, color var(--hover-ms) ease;
}

.bl-tool:hover:not(:disabled) {
  background: var(--bl-accent, var(--accent));
  color: #ffffff;
}

.bl-tool:disabled {
  opacity: 0.45;
  cursor: default;
}

.bl-edit {
  display: flex;
  gap: 6px;
  padding: 6px 0 0;
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

/* \u6B63\u6587\uFF1A\u5927\u53F7\u3001\u6DF1\u63CF\u8FB9\u3002\u538B\u5728\u4EFB\u4F55\u4EAE\u5EA6\u7684\u753B\u9762\u4E0A\u90FD\u8981\u8BFB\u5F97\u6E05\uFF08CLANNAD \u90A3\u6761\u6D41\u6C34\uFF09\u3002 */
.bl-text {
  margin: 0;
  color: #ffffff;
  font-size: 17px;
  line-height: 1.62;
  letter-spacing: 0.02em;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.9),
    0 0 14px rgba(0, 0, 0, 0.55);
}

/* \u65C1\u767D\uFF1A\u4E0D\u662F\u8C01\u5728\u8BF4\u8BDD\uFF0C\u7528\u8F7B\u5FAE\u659C\u4F53\u4E0E\u964D\u4E00\u6863\u7684\u4EAE\u5EA6\u533A\u5206 */
.bl-narrate .bl-text {
  color: rgba(255, 255, 255, 0.82);
  font-style: italic;
}

/* \u73A9\u5BB6\u81EA\u5DF1\u7684\u8BDD\uFF1A\u4E3B\u9898\u8272\u5DE6\u7EBF\uFF0C\u8BFB\u8D77\u6765\u662F\u300C\u6211\u63D2\u8FDB\u53BB\u7684\u90A3\u53E5\u300D\u3002
   \u975E current \u65F6\u7ED9\u6DE1\u84DD\u8FB9\uFF0C\u662F current \u65F6\u7531\u5916\u5C42 is-current::before \u7EDF\u4E00\u5448\u73B0\u9AD8\u4EAE\u6307\u793A\u7EBF\uFF0C
   \u907F\u514D\u5185\u5916\u51FA\u73B0\u53CC\u91CD\u7AD6\u7EBF\u9519\u4F4D\u3002 */
.bl-input .bl-text,
.bl-player .bl-text {
  padding-left: 12px;
  border-left: 2px solid color-mix(in srgb, var(--bl-accent, var(--accent)) 55%, transparent);
  color: rgba(255, 255, 255, 0.9);
}

.bl-input.is-current .bl-text,
.bl-player.is-current .bl-text {
  border-left-color: transparent;
}

/* \u6B63\u5728\u770B\u7684\u90A3\u4E00\u53E5\uFF1A\u4E3B\u9898\u8272\u5DE6\u7EBF + \u4E00\u5C42\u5F88\u6DE1\u7684\u4E3B\u9898\u5E95\u8272 */
.bl-line.is-current,
.bl-narrate.is-current,
.bl-input.is-current {
  background: color-mix(in srgb, var(--bl-accent, var(--accent)) 16%, transparent);
}

.bl-line.is-current::before,
.bl-narrate.is-current::before,
.bl-input.is-current::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 2px;
  border-radius: 2px;
  background: var(--bl-accent, var(--accent));
  box-shadow: 0 0 10px color-mix(in srgb, var(--bl-accent, var(--accent)) 80%, transparent);
}

/* \u5F39\u7A97\u5E95\u90E8\u7684\u6309\u952E\u5728\u624B\u673A\u4E0A\u62AC\u4E00\u6863\uFF1A32px \u7684\u65B9\u5757\u5BF9\u6307\u5934\u504F\u5C0F\uFF0C\u800C\u8FD9\u4E00\u6392\u91CC\u5750\u7740
   \u300C\u786E\u8BA4\u5220\u9664\u300D\u8FD9\u79CD\u6309\u9519\u56DE\u4E0D\u6765\u7684\u52A8\u4F5C\u3002\u5355\u72EC\u6210\u4E00\u4E2A\u5757\u3001\u653E\u5728\u6587\u4EF6\u672B\u5C3E\uFF0C
   \u662F\u4E3A\u4E86\u4E0D\u548C\u4E0A\u9762\u90A3\u51E0\u6BB5\u7A84\u5C4F\u89C4\u5219\u62A2\u4F4D\u7F6E\uFF08\u540C\u4E00\u4EFD\u6587\u4EF6\u6709\u591A\u4E2A\u5199\u8005\uFF09\u3002 */
@media (max-width: 720px) {
  .modal-foot button {
    min-height: 40px;
    padding: 0 16px;
  }

  /* \u7A84\u5C4F\u4E0B\u56DE\u987E\u9762\u677F\u884C\u5185\u5DE5\u5177\u680F\u7D27\u51D1\u56FE\u6807\u5316\uFF08\u5199\u5728 .bl-tool \u4E4B\u540E\u786E\u4FDD\u7EA7\u8054\u751F\u6548\uFF09\uFF1A
     \u6587\u5B57\u6536\u8D77\u8FDB aria-label/title\uFF0C\u4FDD\u6301 28\xD724 \u80F6\u56CA\u5706\u94AE\u6BD4\u4F8B\u3002 */
  .bl-tools {
    top: 6px;
    right: 8px;
    gap: 3px;
  }

  .bl-tool {
    min-height: 24px;
    min-width: 28px;
    padding: 3px 8px;
    gap: 0;
    border-radius: 999px;
  }

  .bl-tool .bl-tool-label {
    display: none;
  }

  .bl-line:has(.bl-head) > .bl-head,
  .bl-input:has(.bl-head) > .bl-head {
    padding-right: 96px;
  }
}

/* \u2550\u2550 \u6D88\u606F\u6846\u98CE\u683C\uFF08card / cinema / hud / scroll / velvet\uFF09\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   \u5207\u6CD5\u662F html \u4E0A\u7684 data-dialog-style\uFF08\u4E0E data-ui-theme \u540C\u4E00\u5C42\uFF09\uFF1B**\u4E0D\u5199\u8FD9\u4E2A\u5C5E\u6027\u5C31\u662F
   \u73B0\u5728\u8FD9\u6761 ATRI \u901A\u680F\u6E10\u53D8**\uFF0C\u6240\u4EE5\u8FD9\u4E00\u8282\u5BF9\u6CA1\u6709\u5F00\u5173\u7684\u5BBF\u4E3B\u5B8C\u5168\u60F0\u6027\u3002

   \u4E94\u79CD\u90FD\u4E0D\u78B0 markup\uFF1A\u8981\u300C\u591A\u4E00\u4E2A\u5143\u7D20\u300D\u7684\u5730\u65B9\u4E00\u5F8B\u8D70 .theater-dialog \u7684 ::before/::after
   \uFF08\u5BBD\u94F6\u5E55\u4E0A\u4E0B\u9ED1\u8FB9\u3001\u4E0A\u7F18\u9AD8\u5149\u3001\u91D1\u8272\u5E55\u7EBF\u3001\u83F1\u5F62\u5760\uFF09\uFF0C\u8981\u300C\u591A\u4E00\u884C\u5B57\u300D\u7684\u5730\u65B9\u8D70\u5B50\u5143\u7D20\u81EA\u5DF1\u7684
   ::before/::after\uFF08\u540D\u724C\u7684 \u2756 / \u258D / \u2014\u2014\u3001\u5FEB\u6377\u5165\u53E3\u7684\u65B9\u62EC\u53F7\uFF09\u3002\u7C7B\u540D\u4E94\u79CD\u901A\u7528\uFF0C
   \u6240\u4EE5\u6362\u98CE\u683C\u53EA\u6362 CSS\u3002

   \u4E24\u7B14\u753B\u8272\u90FD\u4ECE --accent \u73B0\u63A8\uFF1A**\u7ED3\u6784\u8272**\uFF08HUD \u63CF\u8FB9\u3001\u5361\u7247\u540D\u724C\u3001\u9009\u4E2D\u6001\uFF09\u672C\u6765\u5C31\u662F\u4E3B\u9898\u8272\uFF1B
   **\u6750\u8D28\u8272**\uFF08\u4E66\u5377\u7684\u7EB8\u3001\u4E1D\u7ED2\u7684\u9152\u7EA2\u4E0E\u91D1\u3001\u7535\u5F71\u5B57\u5E55\u7684\u6696\u91D1\uFF09\u4E5F\u8981\u63BA\u8FDB\u53BB\u2014\u2014\u6750\u8D28\u8272\u53EA\u4F5C\u5E95\u3001\u8FB9\u3001
   \u91D1\u7EBF\u3001\u7B26\u53F7\uFF0C\u63BA\u6BD4\u7167 apps/server/skills/galgame-ui-style \u7684\u56FA\u5B9A\u65B9\u5411\uFF08\u9152\u7EA2\u5E95 20\u201330%\u3001
   \u7EB8\u5E95 6\u201312%\u3001\u6696\u91D1\u4E0E\u6731\u7EA2\u5C0F\u4EF6 20\u201340%\uFF09\uFF0C\u6B63\u6587\u4E00\u5F8B\u8D70\u9A8C\u8BC1\u8FC7\u7684 ink \u4E0D\u52A8\u3002
   \u4E0D\u63BA\u7684\u8BDD\u5267\u76EE\u6362\u4E86\u4E3B\u9898\u8272\uFF0C\u8FD9\u51E0\u5957\u770B\u7740\u8FD8\u662F\u300C\u53E6\u4E00\u90E8\u5267\u7684\u76AE\u80A4\u300D\u3002

   \u7279\u5F02\u5EA6\uFF1A\u8FD9\u4E00\u8282\u8D77\u624B (0,3,0)\uFF0C\u538B\u8FC7\u57FA\u7EBF (0,1,0) \u4E0E\u6D45\u8272\u90A3\u4E00\u7EC4 (0,3,1)\uFF1B\u6D45\u8272\u4FA7\u9010\u6761\u53E6\u5199
   (0,4,1)\uFF0C\u6240\u4EE5\u5B83\u4EEC\u5FC5\u987B\u6392\u5728\u5168\u6587\u4EF6\u6700\u540E\u3002 */

/* \u2500\u2500 V1 \xB7 \u6D6E\u5C9B\u73BB\u7483\u5361\uFF1A\u901A\u680F\u6536\u6210\u4E00\u5F20\u60AC\u6D6E\u5706\u89D2\u5361\uFF0C\u540D\u724C\u9A91\u5728\u5361\u6CBF\u4E0A \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
html[data-dialog-style="card"] .stage-root .theater-dialog {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  bottom: calc(34px + var(--safe-b, 0px));
  width: min(880px, 74%);
  min-height: 0;
  padding: 26px 34px 18px;
  border: 1px solid rgb(255 255 255 / 0.16);
  border-radius: 20px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 12%, rgb(22 30 43 / 0.8)), color-mix(in srgb, var(--accent) 14%, rgb(10 16 26 / 0.88)));
  backdrop-filter: blur(20px) saturate(1.3);
  box-shadow: 0 26px 60px rgb(0 0 0 / 0.55), inset 0 1px 0 rgb(255 255 255 / 0.22);
}

html[data-dialog-style="card"] .stage-root .theater-dialog::before {
  content: "";
  position: absolute;
  top: 0;
  left: 34px;
  right: 34px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, #ffffff), transparent);
  opacity: 0.85;
}

html[data-dialog-style="card"] .stage-root .dialog-name {
  position: absolute;
  top: -13px;
  left: 28px;
  padding: 3px 14px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 82%, #ffffff), var(--accent));
  color: var(--accent-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-shadow: none;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--accent) 45%, transparent);
}

html[data-dialog-style="card"] .stage-root .dialog-text {
  font-size: clamp(15.5px, 1.35vw, 18px);
  font-weight: 500;
  line-height: 1.75;
}

html[data-dialog-style="card"] .stage-root .dialog-foot {
  position: static;
  margin: 14px 0 0;
  padding: 0;
  border: none;
  gap: 12px;
  background: none;
}

html[data-dialog-style="card"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  margin-left: auto;
  padding: 0;
  gap: 4px;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="card"] .stage-root .quick-btn {
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  color: rgb(226 232 240 / 0.6);
  font-size: 11.5px;
  letter-spacing: 0.04em;
}

html[data-dialog-style="card"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #ffffff;
  background: rgb(255 255 255 / 0.1);
  text-shadow: none;
}

html[data-dialog-style="card"] .stage-root .quick-sep {
  background: rgb(255 255 255 / 0.18);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .theater-dialog {
  border-color: rgb(15 23 42 / 0.09);
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, rgb(255 255 255 / 0.95)), color-mix(in srgb, var(--accent) 8%, rgb(243 247 252 / 0.97)));
  box-shadow: 0 26px 56px rgb(15 23 42 / 0.22), inset 0 1px 0 rgb(255 255 255 / 0.9);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .dialog-text {
  color: #16202e;
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .dialog-text.narrate {
  color: #475569;
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .quick-btn {
  color: rgb(51 65 85 / 0.62);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #0f172a;
  background: rgb(15 23 42 / 0.06);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .quick-sep {
  background: rgb(15 23 42 / 0.16);
}

/* \u2500\u2500 V2 \xB7 \u7535\u5F71\u5B57\u5E55\uFF1A\u53BB\u6389\u5E95\u677F\uFF0C\u4E0A\u4E0B\u538B\u6210\u5BBD\u94F6\u5E55\uFF0C\u53F0\u8BCD\u5C45\u4E2D \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
html[data-dialog-style="cinema"] .stage-root .theater-dialog {
  min-height: 18vh;
  padding: 18px 6% 44px;
  justify-content: center;
  gap: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 0) 0%, color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.82)) 12%, color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.94)) 26%, color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.96)) 100%);
}

/* \u4E0A\u9762\u90A3\u6761\u9ED1\u8FB9\uFF1A\u4ECE\u7A97\u5E95\u5F80\u4E0A\u94FA\u6EE1\u4E00\u5C4F\u3001\u53EA\u628A\u6700\u9876\u4E0A\u4E00\u6BB5\u843D\u6210\u9ED1\u2014\u2014\u4E0D\u5FC5\u7ED9\u821E\u53F0\u52A0\u5143\u7D20\uFF0C
   \u4E5F\u80FD\u62FF\u5230\u5BBD\u94F6\u5E55\u7684\u4E0A\u4E0B\u4E24\u6761\u3002z-index: -1 \u8BA9\u5B83\u5F85\u5728\u53F0\u8BCD\u5E95\u4E0B\uFF1B\u8FD9\u4E00\u5C42\u5728\u53F0\u8BCD\u6761\u7684\u5C42\u53E0
   \u4E0A\u4E0B\u6587\u91CC\uFF0C\u6240\u4EE5\u7167\u6837\u538B\u5728\u7ACB\u7ED8\u4E4B\u4E0A\u3002 */
html[data-dialog-style="cinema"] .stage-root .theater-dialog::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 14%, rgb(0 0 0 / 0.94)) 0 4.5vh, transparent 4.5vh);
  pointer-events: none;
}

html[data-dialog-style="cinema"] .stage-root .dialog-name {
  position: static;
  margin: 0 0 8px;
  padding: 0;
  color: color-mix(in srgb, var(--accent) 30%, #dfb37a);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.36em;
  text-indent: 0.36em;
  text-align: center;
  text-shadow: 0 1px 8px rgb(0 0 0 / 0.9);
}

html[data-dialog-style="cinema"] .stage-root .dialog-text {
  width: min(82%, 860px);
  margin: 0 auto;
  text-align: center;
  color: #f4f1ec;
  font-size: clamp(15.5px, 1.35vw, 18px);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 18px rgb(0 0 0 / 0.9), 0 1px 2px rgb(0 0 0 / 0.95);
}

html[data-dialog-style="cinema"] .stage-root .dialog-foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(10px + var(--safe-b, 0px));
  justify-content: center;
  gap: 18px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}

html[data-dialog-style="cinema"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  padding: 0;
  gap: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="cinema"] .stage-root .quick-btn {
  height: auto;
  padding: 0 9px;
  color: rgb(255 255 255 / 0.34);
  font-size: 11px;
  letter-spacing: 0.1em;
}

html[data-dialog-style="cinema"] .stage-root .quick-btn + .quick-btn {
  border-left: 1px solid currentColor;
}

html[data-dialog-style="cinema"] .stage-root .quick-btn:hover:not(:disabled) {
  color: rgb(255 255 255 / 0.78);
  background: none;
  text-shadow: none;
}

html[data-dialog-style="cinema"] .stage-root .quick-sep {
  display: none;
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .theater-dialog {
  background: linear-gradient(180deg, rgb(255 255 255 / 0) 0%, color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.88)) 9%, color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.96)) 20%, color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.99)) 100%);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .theater-dialog::before {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.95)) 0 5vh, transparent 5vh);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .dialog-name {
  color: color-mix(in srgb, var(--accent) 30%, #8a5a20);
  text-shadow: 0 1px 6px rgb(255 255 255 / 0.9);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .dialog-text {
  color: #14161a;
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.95), 0 2px 14px rgb(255 255 255 / 0.8);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .quick-btn {
  color: rgb(20 22 26 / 0.42);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .quick-btn:hover:not(:disabled) {
  color: rgb(20 22 26 / 0.82);
}

/* \u2500\u2500 V3 \xB7 \u6218\u672F HUD\uFF1A\u5207\u89D2\u9762\u677F + \u6E10\u53D8\u63CF\u8FB9\uFF0C\u6309\u952E\u5E26\u65B9\u62EC\u53F7 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
html[data-dialog-style="hud"] .stage-root .theater-dialog {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  bottom: calc(22px + var(--safe-b, 0px));
  width: min(1020px, 78%);
  min-height: 0;
  padding: 20px 28px 14px;
  border: 1.5px solid transparent;
  border-radius: 0;
  /* \u4E09\u5C42\u5E95\uFF1A\u626B\u63CF\u7EB9\u4E0E\u9762\u677F\u5E95\u8D70 padding-box\uFF0C\u63CF\u8FB9\u8D70 border-box\u2014\u2014\u4E8E\u662F\u90A3 1.5px \u662F\u6E10\u53D8
     \u800C\u4E0D\u662F\u5355\u8272\uFF0C\u5207\u89D2\u4E4B\u540E\u4E5F\u4E0D\u4F1A\u65AD\u7EBF\u3002 */
  background:
    repeating-linear-gradient(180deg, color-mix(in srgb, var(--accent) 9%, transparent) 0 1px, transparent 1px 3px) padding-box,
    linear-gradient(180deg, rgb(8 20 32 / 0.92), rgb(4 11 20 / 0.95)) padding-box,
    linear-gradient(180deg, color-mix(in srgb, var(--accent) 62%, transparent), color-mix(in srgb, var(--accent) 16%, transparent)) border-box;
  box-shadow: 0 18px 44px rgb(0 0 0 / 0.5);
  clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
}

html[data-dialog-style="hud"] .stage-root .dialog-name {
  position: static;
  margin: 0 0 6px;
  color: color-mix(in srgb, var(--accent) 62%, #e0f2fe);
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent);
}

html[data-dialog-style="hud"] .stage-root .dialog-name::before {
  content: "\u258D";
  margin-right: 8px;
  color: var(--accent);
}

html[data-dialog-style="hud"] .stage-root .dialog-text {
  margin: 6px 0 0;
  color: #dbeafe;
  font-family: var(--font-ui);
  font-size: clamp(15px, 1.3vw, 17px);
  font-weight: 500;
  line-height: 1.8;
  letter-spacing: 0.04em;
  text-shadow: none;
}

html[data-dialog-style="hud"] .stage-root .dialog-foot {
  position: static;
  justify-content: space-between;
  margin: 13px 0 0;
  padding: 0;
  border: none;
  gap: 12px;
  background: none;
}

html[data-dialog-style="hud"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  padding: 0;
  gap: 2px;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="hud"] .stage-root .quick-btn {
  height: 22px;
  padding: 0 6px;
  border-radius: 0;
  color: color-mix(in srgb, var(--accent) 42%, #cbe6f7);
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
  font-size: 10.5px;
  letter-spacing: 0.14em;
}

html[data-dialog-style="hud"] .stage-root .quick-btn::before {
  content: "[";
  opacity: 0.65;
}

html[data-dialog-style="hud"] .stage-root .quick-btn::after {
  content: "]";
  opacity: 0.65;
}

html[data-dialog-style="hud"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #ffffff;
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  text-shadow: none;
}

html[data-dialog-style="hud"] .stage-root .quick-sep {
  background: color-mix(in srgb, var(--accent) 40%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .theater-dialog {
  background:
    repeating-linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, transparent) 0 1px, transparent 1px 3px) padding-box,
    linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(241 247 252 / 0.97)) padding-box,
    linear-gradient(180deg, color-mix(in srgb, var(--accent) 58%, transparent), color-mix(in srgb, var(--accent) 18%, transparent)) border-box;
  box-shadow: 0 18px 40px rgb(15 23 42 / 0.25);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .dialog-name {
  color: color-mix(in srgb, var(--accent) 82%, #0b2545);
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .dialog-text {
  color: color-mix(in srgb, var(--accent) 25%, #0f2a3d);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .quick-btn {
  color: color-mix(in srgb, var(--accent) 55%, #334155);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #0f172a;
}

/* \u2500\u2500 V4 \xB7 \u4E66\u5377\uFF1A\u53CC\u7EBF\u5185\u6846 + \u886C\u7EBF\u6B63\u6587\uFF0C\u6DF1\u8272\u662F\u591C\u8272\u7EB8\u3001\u6D45\u8272\u662F\u5BA3\u7EB8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
html[data-dialog-style="scroll"] .stage-root .theater-dialog {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  bottom: calc(56px + var(--safe-b, 0px));
  width: min(840px, 72%);
  min-height: 0;
  padding: 22px 34px 16px;
  /* \u5916\u6846\u4E00\u9053\u3001\u5185\u6846\u4E00\u9053\uFF1A\u5185\u6846\u8D70 outline + \u8D1F offset\uFF0C\u4E0D\u5FC5\u591A\u4E00\u4E2A\u5143\u7D20 */
  --scroll-gild: color-mix(in srgb, var(--accent) 30%, #ceb07c);
  --scroll-paper: linear-gradient(180deg, color-mix(in srgb, var(--accent) 10%, #262019), color-mix(in srgb, var(--accent) 12%, #191510));
  border: 1px solid color-mix(in srgb, var(--scroll-gild) 30%, transparent);
  border-radius: 3px;
  outline: 1px solid color-mix(in srgb, var(--scroll-gild) 16%, transparent);
  outline-offset: -7px;
  background: var(--scroll-paper);
  box-shadow: 0 22px 50px rgb(0 0 0 / 0.55);
  font-family: var(--font-serif);
}

html[data-dialog-style="scroll"] .stage-root .dialog-name {
  position: static;
  margin: 0 0 10px;
  color: var(--scroll-gild);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-shadow: none;
}

html[data-dialog-style="scroll"] .stage-root .dialog-name::before {
  content: "\u2756";
  margin-right: 10px;
  font-size: 11px;
}

html[data-dialog-style="scroll"] .stage-root .dialog-text {
  color: #ece2d1;
  font-family: var(--font-serif);
  font-size: clamp(16px, 1.45vw, 19px);
  font-weight: 400;
  line-height: 1.95;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
}

html[data-dialog-style="scroll"] .stage-root .dialog-foot {
  position: static;
  justify-content: space-between;
  margin: 15px 0 0;
  padding: 0;
  border: none;
  gap: 12px;
  background: none;
}

html[data-dialog-style="scroll"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  padding: 0;
  gap: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="scroll"] .stage-root .quick-btn {
  height: auto;
  padding: 0 9px;
  border-radius: 0;
  color: color-mix(in srgb, var(--scroll-gild) 72%, transparent);
  font-family: var(--font-serif);
  font-size: 11.5px;
  letter-spacing: 0.12em;
}

/* \u5165\u53E3\u4E4B\u95F4\u90A3\u6761\u7EC6\u7EBF\uFF1A\u6574\u6392\u4E0D\u7559 gap\uFF0C\u9664\u7B2C\u4E00\u679A\u5916\u6BCF\u679A\u63CF\u4E00\u6761\u5DE6\u8FB9\u7EBF */
html[data-dialog-style="scroll"] .stage-root .quick-btn + .quick-btn {
  border-left: 1px solid currentColor;
}

html[data-dialog-style="scroll"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #f4e9d2;
  background: none;
  text-shadow: none;
}

html[data-dialog-style="scroll"] .stage-root .quick-sep {
  display: none;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .theater-dialog {
  --scroll-gild: color-mix(in srgb, var(--accent) 30%, #856236);
  --scroll-paper: linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, #faf4e7), color-mix(in srgb, var(--accent) 10%, #f2e9d7));
  border-color: color-mix(in srgb, var(--scroll-gild) 34%, transparent);
  outline-color: color-mix(in srgb, var(--scroll-gild) 18%, transparent);
  background: var(--scroll-paper);
  box-shadow: 0 20px 44px rgb(60 42 20 / 0.28);
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .dialog-name {
  color: var(--scroll-gild);
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .dialog-text {
  color: #3a3126;
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .dialog-text.narrate {
  color: #5c5245;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .quick-btn {
  color: color-mix(in srgb, var(--scroll-gild) 66%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #3a3126;
}

/* \u2500\u2500 V5 \xB7 \u4E1D\u7ED2\u5E55\uFF1A\u5E55\u5E03\u5F0F\u901A\u680F + \u91D1\u7EBF\u83F1\u5F62\u5760\uFF0C\u53F0\u8BCD\u5C45\u4E2D\u6536\u7A84 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
html[data-dialog-style="velvet"] .stage-root .theater-dialog {
  min-height: 21vh;
  padding: 22px 14% 48px;
  justify-content: center;
  gap: 0;
  --velvet-gold: color-mix(in srgb, var(--accent) 30%, #e8c780);
  --velvet-gold-line: color-mix(in srgb, var(--accent) 32%, #c8a34a);
  --velvet-gold-lit: color-mix(in srgb, var(--accent) 22%, #f0dca4);
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 0.03) 0 24px, rgb(0 0 0 / 0.055) 24px 48px),
    radial-gradient(130% 110% at 50% 0%, color-mix(in srgb, var(--accent) 26%, rgb(126 26 50 / 0.94)), color-mix(in srgb, var(--accent) 20%, rgb(48 9 22 / 0.97)) 72%);
  box-shadow: inset 0 1px 0 rgb(255 214 150 / 0.35), 0 -20px 50px rgb(0 0 0 / 0.5);
}

html[data-dialog-style="velvet"] .stage-root .theater-dialog::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0, var(--velvet-gold-line) 22%, var(--velvet-gold-lit) 50%, var(--velvet-gold-line) 78%, transparent 100%);
}

html[data-dialog-style="velvet"] .stage-root .theater-dialog::after {
  content: "";
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  transform: translateX(-50%) rotate(45deg);
  background: var(--velvet-gold-lit);
  box-shadow: 0 0 10px rgb(240 220 164 / 0.8);
}

html[data-dialog-style="velvet"] .stage-root .dialog-name {
  position: static;
  margin: 0 0 12px;
  color: var(--velvet-gold);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-align: center;
  text-shadow: none;
}

html[data-dialog-style="velvet"] .stage-root .dialog-name::before {
  content: "\u2014\u2014 ";
}

html[data-dialog-style="velvet"] .stage-root .dialog-name::after {
  content: " \u2014\u2014";
}

html[data-dialog-style="velvet"] .stage-root .dialog-text {
  width: min(790px, 100%);
  margin: 0 auto;
  color: #f7ece6;
  font-size: clamp(16px, 1.45vw, 18.5px);
  font-weight: 500;
  line-height: 1.85;
  text-align: center;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.7);
}

html[data-dialog-style="velvet"] .stage-root .dialog-foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(10px + var(--safe-b, 0px));
  justify-content: center;
  gap: 20px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}

html[data-dialog-style="velvet"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  padding: 0;
  gap: 6px;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="velvet"] .stage-root .quick-btn {
  height: 24px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--velvet-gold-line) 32%, transparent);
  border-radius: 999px;
  color: color-mix(in srgb, var(--velvet-gold) 72%, transparent);
  font-size: 11.5px;
}

html[data-dialog-style="velvet"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #f6e6bd;
  background: color-mix(in srgb, var(--velvet-gold-line) 16%, transparent);
  border-color: color-mix(in srgb, var(--velvet-gold-line) 60%, transparent);
  text-shadow: none;
}

html[data-dialog-style="velvet"] .stage-root .quick-sep {
  background: color-mix(in srgb, var(--velvet-gold-line) 35%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .theater-dialog {
  --velvet-gold: color-mix(in srgb, var(--accent) 30%, #a8763a);
  --velvet-gold-line: color-mix(in srgb, var(--accent) 30%, #a8763a);
  --velvet-gold-lit: color-mix(in srgb, var(--accent) 22%, #d8b878);
  background:
    repeating-linear-gradient(90deg, rgb(160 130 90 / 0.05) 0 24px, rgb(120 90 50 / 0.05) 24px 48px),
    radial-gradient(130% 110% at 50% 0%, color-mix(in srgb, var(--accent) 8%, #fdf7ec), color-mix(in srgb, var(--accent) 10%, #f3e7d5) 75%);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--velvet-gold-line) 50%, transparent), 0 -18px 44px rgb(70 50 20 / 0.22);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .theater-dialog::before {
  background: linear-gradient(90deg, transparent 0, var(--velvet-gold-line) 22%, var(--velvet-gold-lit) 50%, var(--velvet-gold-line) 78%, transparent 100%);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .theater-dialog::after {
  background: var(--velvet-gold-line);
  box-shadow: 0 0 8px color-mix(in srgb, var(--velvet-gold-lit) 90%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .dialog-name {
  color: var(--velvet-gold);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .dialog-text {
  color: #3d2b22;
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .quick-btn {
  color: color-mix(in srgb, var(--velvet-gold) 72%, transparent);
  border-color: color-mix(in srgb, var(--velvet-gold-line) 34%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .quick-btn:hover:not(:disabled) {
  color: color-mix(in srgb, var(--velvet-gold) 72%, #2b1a12);
  background: color-mix(in srgb, var(--velvet-gold-line) 14%, transparent);
}

/* \u2500\u2500 \u4E94\u6863\u914D\u5957\u7684\u821E\u53F0\u5206\u652F\u9009\u9879\u6846\uFF08.choice / .choice-num\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* C1 \xB7 \u6D6E\u5C9B\u73BB\u7483\u5361\u9009\u9879\u6846 */
html[data-dialog-style="card"] .stage-root .choice {
  width: min(680px, 78vw);
  min-height: 48px;
  padding: 11px 22px;
  border: 1px solid rgb(255 255 255 / 0.16);
  border-radius: 14px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 14%, rgb(22 30 43 / 0.84)), color-mix(in srgb, var(--accent) 16%, rgb(10 16 26 / 0.9)));
  color: #f1f5f9;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
  backdrop-filter: blur(18px) saturate(1.3);
  box-shadow: 0 14px 34px rgb(0 0 0 / 0.44), inset 0 1px 0 rgb(255 255 255 / 0.2);
}

html[data-dialog-style="card"] .stage-root .choice .choice-num {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--accent) 26%, rgb(255 255 255 / 0.08));
  color: color-mix(in srgb, var(--accent) 72%, #ffffff);
  font-size: 12px;
}

html[data-dialog-style="card"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="card"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 84%, #ffffff), var(--accent));
  border-color: color-mix(in srgb, var(--accent) 65%, #ffffff);
  color: var(--accent-ink, #ffffff);
  text-shadow: none;
  box-shadow: 0 14px 32px color-mix(in srgb, var(--accent) 42%, transparent);
}

html[data-dialog-style="card"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="card"] .stage-root .choice:focus-visible .choice-num {
  background: rgb(255 255 255 / 0.22);
  color: var(--accent-ink, #ffffff);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, rgb(255 255 255 / 0.94)), color-mix(in srgb, var(--accent) 10%, rgb(243 247 252 / 0.97)));
  border-color: color-mix(in srgb, var(--accent) 24%, rgb(15 23 42 / 0.1));
  color: #0f172a;
  text-shadow: none;
  box-shadow: 0 12px 30px rgb(15 23 42 / 0.12), inset 0 1px 0 #ffffff;
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice .choice-num {
  background: color-mix(in srgb, var(--accent) 14%, #ffffff);
  color: color-mix(in srgb, var(--accent) 82%, #0b2545);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 86%, #ffffff), var(--accent));
  border-color: var(--accent);
  color: var(--accent-ink, #ffffff);
}

html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="card"] .stage-root .choice:focus-visible .choice-num {
  background: rgb(255 255 255 / 0.24);
  color: var(--accent-ink, #ffffff);
}

/* C2 \xB7 \u7535\u5F71\u5B57\u5E55\u9009\u9879\u6846 */
html[data-dialog-style="cinema"] .stage-root .choice {
  width: min(760px, 84vw);
  min-height: 44px;
  padding: 10px 36px;
  border: none;
  border-radius: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.76)) 18%,
    color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.88)) 50%,
    color-mix(in srgb, var(--accent) 12%, rgb(0 0 0 / 0.76)) 82%,
    transparent 100%);
  color: #f4f1ec;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-shadow: 0 2px 10px rgb(0 0 0 / 0.95), 0 0 2px rgb(0 0 0 / 0.95);
  backdrop-filter: none;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--accent) 25%, rgb(223 179 122 / 0.28)),
    inset 0 -1px 0 color-mix(in srgb, var(--accent) 25%, rgb(223 179 122 / 0.28));
}

html[data-dialog-style="cinema"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 30%, #dfb37a);
  font-family: "Montserrat", "Inter", var(--font-ui);
}

html[data-dialog-style="cinema"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="cinema"] .stage-root .choice:focus-visible {
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb, var(--accent) 24%, rgb(20 16 10 / 0.88)) 16%,
    color-mix(in srgb, var(--accent) 28%, rgb(28 22 14 / 0.95)) 50%,
    color-mix(in srgb, var(--accent) 24%, rgb(20 16 10 / 0.88)) 84%,
    transparent 100%);
  color: color-mix(in srgb, var(--accent) 28%, #f6dfb2);
  text-shadow: 0 2px 12px rgb(0 0 0 / 0.95);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--accent) 35%, rgb(223 179 122 / 0.65)),
    inset 0 -1px 0 color-mix(in srgb, var(--accent) 35%, rgb(223 179 122 / 0.65));
}

html[data-dialog-style="cinema"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="cinema"] .stage-root .choice:focus-visible .choice-num {
  color: color-mix(in srgb, var(--accent) 28%, #f6dfb2);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice {
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.88)) 18%,
    color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.96)) 50%,
    color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.88)) 82%,
    transparent 100%);
  border: none;
  color: #14161a;
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.9);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--accent) 30%, rgb(138 90 32 / 0.28)),
    inset 0 -1px 0 color-mix(in srgb, var(--accent) 30%, rgb(138 90 32 / 0.28));
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 30%, #8a5a20);
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice:focus-visible {
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb, var(--accent) 16%, rgb(255 250 240 / 0.94)) 16%,
    color-mix(in srgb, var(--accent) 22%, rgb(255 248 235 / 0.98)) 50%,
    color-mix(in srgb, var(--accent) 16%, rgb(255 250 240 / 0.94)) 84%,
    transparent 100%);
  color: color-mix(in srgb, var(--accent) 55%, #5c380e);
  text-shadow: none;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--accent) 45%, rgb(138 90 32 / 0.55)),
    inset 0 -1px 0 color-mix(in srgb, var(--accent) 45%, rgb(138 90 32 / 0.55));
}

html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="cinema"] .stage-root .choice:focus-visible .choice-num {
  color: color-mix(in srgb, var(--accent) 55%, #5c380e);
}

/* C3 \xB7 \u6218\u672F HUD \u9009\u9879\u6846 */
html[data-dialog-style="hud"] .stage-root .choice {
  width: min(680px, 80vw);
  min-height: 46px;
  padding: 10px 24px;
  border: 1.5px solid transparent;
  border-radius: 0;
  background:
    repeating-linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, transparent) 0 1px, transparent 1px 3px) padding-box,
    linear-gradient(180deg, rgb(6 15 26 / 0.92), rgb(4 10 18 / 0.95)) padding-box,
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 68%, transparent), color-mix(in srgb, var(--accent) 22%, transparent)) border-box;
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  color: #e0f2fe;
  font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", var(--font-ui);
  letter-spacing: 0.05em;
  text-shadow: none;
  box-shadow: 0 10px 28px rgb(0 0 0 / 0.5);
}

html[data-dialog-style="hud"] .stage-root .choice .choice-num {
  width: auto;
  padding: 0 4px;
  color: color-mix(in srgb, var(--accent) 65%, #7dd3fc);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
}

html[data-dialog-style="hud"] .stage-root .choice .choice-num::before { content: "["; opacity: 0.7; }
html[data-dialog-style="hud"] .stage-root .choice .choice-num::after { content: "]"; opacity: 0.7; }

html[data-dialog-style="hud"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="hud"] .stage-root .choice:focus-visible {
  background: color-mix(in srgb, var(--accent) 62%, #46d6ff);
  color: #04121e;
  text-shadow: none;
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 50%, transparent);
}

html[data-dialog-style="hud"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="hud"] .stage-root .choice:focus-visible .choice-num {
  color: #04121e;
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice {
  background:
    repeating-linear-gradient(180deg, color-mix(in srgb, var(--accent) 5%, transparent) 0 1px, transparent 1px 3px) padding-box,
    linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(241 247 252 / 0.98)) padding-box,
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 58%, transparent), color-mix(in srgb, var(--accent) 20%, transparent)) border-box;
  border: 1.5px solid transparent;
  color: #0f2a3d;
  box-shadow: 0 10px 26px rgb(15 23 42 / 0.14);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 80%, #0b2545);
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice:focus-visible {
  background: color-mix(in srgb, var(--accent) 78%, #0e74a4);
  color: #ffffff;
}

html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="hud"] .stage-root .choice:focus-visible .choice-num {
  color: #ffffff;
}

/* C4 \xB7 \u4E66\u5377\u9009\u9879\u6846 */
html[data-dialog-style="scroll"] .stage-root .choice {
  --scroll-gild: color-mix(in srgb, var(--accent) 30%, #ceb07c);
  width: min(680px, 78vw);
  min-height: 48px;
  padding: 11px 26px;
  border: 1px solid color-mix(in srgb, var(--scroll-gild) 38%, transparent);
  border-radius: 3px;
  outline: 1px solid color-mix(in srgb, var(--scroll-gild) 18%, transparent);
  outline-offset: -5px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 10%, rgb(38 32 25 / 0.94)), color-mix(in srgb, var(--accent) 12%, rgb(25 21 16 / 0.96)));
  color: #ece2d1;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  letter-spacing: 0.06em;
  text-shadow: none;
  box-shadow: 0 14px 34px rgb(0 0 0 / 0.5);
}

html[data-dialog-style="scroll"] .stage-root .choice .choice-num {
  width: 22px;
  height: 22px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--accent) 42%, #8c2f22);
  color: #f6e9dd;
  font-family: "Noto Serif CJK SC", "Songti SC", serif;
  font-size: 12px;
}

html[data-dialog-style="scroll"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="scroll"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 22%, #362c21), color-mix(in srgb, var(--accent) 18%, #241d15));
  border-color: var(--scroll-gild);
  outline-color: color-mix(in srgb, var(--scroll-gild) 45%, transparent);
  color: #fff8eb;
  text-shadow: none;
  box-shadow: 0 14px 34px rgb(0 0 0 / 0.6);
}

html[data-dialog-style="scroll"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="scroll"] .stage-root .choice:focus-visible .choice-num {
  background: color-mix(in srgb, var(--accent) 45%, #b53d2d);
  color: #ffffff;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice {
  --scroll-gild: color-mix(in srgb, var(--accent) 30%, #856236);
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, rgb(250 244 231 / 0.96)), color-mix(in srgb, var(--accent) 10%, rgb(242 233 215 / 0.98)));
  border-color: color-mix(in srgb, var(--scroll-gild) 40%, transparent);
  outline-color: color-mix(in srgb, var(--scroll-gild) 20%, transparent);
  color: #2b2117;
  box-shadow: 0 12px 28px rgb(60 42 18 / 0.16);
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice .choice-num {
  background: color-mix(in srgb, var(--accent) 50%, #b3372f);
  color: #fdf3ec;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 16%, #fffaf0), color-mix(in srgb, var(--accent) 22%, #f5ead4));
  border-color: var(--scroll-gild);
  outline-color: color-mix(in srgb, var(--scroll-gild) 45%, transparent);
  color: #1c140c;
}

html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="scroll"] .stage-root .choice:focus-visible .choice-num {
  background: color-mix(in srgb, var(--accent) 55%, #992922);
  color: #ffffff;
}

/* C5 \xB7 \u4E1D\u7ED2\u5E55\u9009\u9879\u6846 */
html[data-dialog-style="velvet"] .stage-root .choice {
  --velvet-gold: color-mix(in srgb, var(--accent) 30%, #e8c780);
  --velvet-gold-line: color-mix(in srgb, var(--accent) 32%, #c8a34a);
  --velvet-gold-lit: color-mix(in srgb, var(--accent) 22%, #f0dca4);
  width: min(680px, 78vw);
  min-height: 46px;
  padding: 10px 28px;
  border: 1px solid color-mix(in srgb, var(--velvet-gold-line) 55%, transparent);
  border-radius: 999px;
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 0.025) 0 18px, rgb(0 0 0 / 0.05) 18px 36px),
    radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--accent) 26%, rgb(126 26 50 / 0.92)), color-mix(in srgb, var(--accent) 20%, rgb(48 9 22 / 0.96)) 75%);
  color: #f7ece6;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  letter-spacing: 0.06em;
  text-shadow: 0 1px 4px rgb(0 0 0 / 0.65);
  box-shadow: 0 12px 30px rgb(0 0 0 / 0.48), inset 0 1px 0 color-mix(in srgb, var(--velvet-gold-lit) 28%, transparent);
}

html[data-dialog-style="velvet"] .stage-root .choice .choice-num {
  color: var(--velvet-gold);
}

html[data-dialog-style="velvet"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="velvet"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, var(--velvet-gold-lit), var(--velvet-gold-line));
  border-color: var(--velvet-gold-lit);
  color: #2a0a14;
  text-shadow: none;
  box-shadow: 0 12px 30px rgb(0 0 0 / 0.55);
}

html[data-dialog-style="velvet"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="velvet"] .stage-root .choice:focus-visible .choice-num {
  color: #2a0a14;
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice {
  --velvet-gold: color-mix(in srgb, var(--accent) 30%, #a8763a);
  --velvet-gold-line: color-mix(in srgb, var(--accent) 30%, #a8763a);
  --velvet-gold-lit: color-mix(in srgb, var(--accent) 22%, #d8b878);
  background:
    repeating-linear-gradient(90deg, rgb(160 130 90 / 0.04) 0 18px, rgb(120 90 50 / 0.04) 18px 36px),
    radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--accent) 8%, rgb(253 247 236 / 0.96)), color-mix(in srgb, var(--accent) 10%, rgb(243 231 213 / 0.98)) 75%);
  border-color: color-mix(in srgb, var(--velvet-gold-line) 48%, transparent);
  color: #3d2b22;
  text-shadow: none;
  box-shadow: 0 10px 26px rgb(70 50 20 / 0.16), inset 0 1px 0 rgb(255 255 255 / 0.9);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice .choice-num {
  color: var(--velvet-gold);
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice:focus-visible {
  background: linear-gradient(180deg, var(--velvet-gold-lit), var(--velvet-gold-line));
  border-color: var(--velvet-gold-line);
  color: #ffffff;
}

html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="velvet"] .stage-root .choice:focus-visible .choice-num {
  color: #ffffff;
}

/* \u2500\u2500 V6 \xB7 \u4E66\u9875\u6D41\uFF08novel \xB7 \u4E92\u52A8\u5C0F\u8BF4\u4E66\u9875\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u9762\u5411\u7EAF\u6587\u672C\u4E0E\u6587\u5B66\u5411\u4E92\u52A8\u5C0F\u8BF4\uFF1A\u5C45\u4E2D\u4E00\u5F20\u7EB5\u5411\u5B9E\u4F53\u4E66\u9875\uFF08\u6DF1\u8272\u591C\u8BFB\u7EB8 / \u6D45\u8272\u6696\u68C9\u7EB8\uFF09\uFF0C
   \u540C\u573A\u6BB5\u843D\u8FDE\u7EED\u7D2F\u79EF\uFF0C\u56DB\u79CD\u53E5\u578B\uFF08\u65C1\u767D / \u5DE6\u680F\u540D\u724C\u53F0\u8BCD / \u659C\u4F53\u72EC\u767D / \u25B8 \u73A9\u5BB6\u56DE\u6267\uFF09\u7EAF\u9760\u6392\u5370\u533A\u5206\uFF0C
   \u505C\u6B62\u70B9\u9009\u9879\u7D27\u8DDF\u6587\u672B\u5C55\u5F00\u3002\u65E0\u80CC\u666F\u56FE\u65F6\u5373\u5B8C\u6574\u7EB8\u9762\uFF1B\u6709\u80CC\u666F\u56FE\u65F6\u5916\u56F4\u753B\u5E03\u6A21\u7CCA\u538B\u6697\u3001\u9875\u9876\u5185\u5D4C\u7A84\u753B\u6846\u3002 */
html[data-dialog-style="novel"] .stage-root .theater-stage {
  background: radial-gradient(
    90% 85% at 50% 35%,
    color-mix(in srgb, var(--accent) 10%, #171411) 0%,
    color-mix(in srgb, var(--accent) 6%, #0c0a09) 100%
  );
}

html[data-dialog-style="novel"] .stage-root:not(.bare) .theater-bg {
  filter: blur(22px) saturate(0.72) brightness(0.36);
  transform: scale(1.08);
}

html[data-dialog-style="novel"] .stage-root:not(.bare) .theater-sprites,
html[data-dialog-style="novel"] .stage-root:not(.bare) .theater-cg {
  display: none;
}

html[data-dialog-style="novel"] .stage-root.theater:has(.choice-overlay) .theater-stage::after {
  display: none;
}

html[data-dialog-style="novel"] .stage-root .theater-dialog {
  --novel-gild: color-mix(in srgb, var(--accent) 42%, #c9ad7c);
  --novel-rule: color-mix(in srgb, var(--accent) 24%, rgb(201 173 124 / 0.28));
  left: 50%;
  right: auto;
  top: 20px;
  bottom: calc(20px + var(--safe-b, 0px));
  transform: translateX(-50%);
  width: min(780px, 86%);
  min-height: 0;
  max-height: none;
  padding: 30px 54px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  border: 1px solid var(--novel-rule);
  border-radius: 3px;
  outline: 1px solid color-mix(in srgb, var(--novel-gild) 14%, transparent);
  outline-offset: -8px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 8%, rgb(28 24 20 / 0.96)) 0%,
    color-mix(in srgb, var(--accent) 10%, rgb(19 16 13 / 0.98)) 100%
  );
  box-shadow: 0 28px 70px rgb(0 0 0 / 0.65), inset 0 1px 0 rgb(255 255 255 / 0.05);
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
}

html[data-dialog-style="novel"] .stage-root .dialog-page-head {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 11px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--novel-rule);
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
  font-size: 11px;
  letter-spacing: 0.22em;
  color: color-mix(in srgb, var(--novel-gild) 82%, transparent);
}

html[data-dialog-style="novel"] .stage-root .dialog-page-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html[data-dialog-style="novel"] .stage-root .dialog-page-dot {
  margin-right: 8px;
  font-weight: 400;
  color: var(--accent);
}

html[data-dialog-style="novel"] .stage-root .dialog-page-meta {
  flex: 0 0 auto;
  white-space: nowrap;
}

html[data-dialog-style="novel"] .stage-root .dialog-scene-plate {
  flex: 0 0 auto;
  position: relative;
  height: 118px;
  margin-bottom: 16px;
  border: 1px solid var(--novel-rule);
  border-radius: 2px;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent) 12%, #14110e);
}

html[data-dialog-style="novel"] .stage-root .dialog-scene-plate.is-cg {
  height: 164px;
}

html[data-dialog-style="novel"] .stage-root .dialog-scene-plate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 48%;
  display: block;
}

html[data-dialog-style="novel"] .stage-root .dialog-scene-plate::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(18 15 12 / 0.68) 0%, transparent 48%, rgb(18 15 12 / 0.52) 100%);
  pointer-events: none;
}

html[data-dialog-style="novel"] .stage-root .dialog-scene-cap {
  position: absolute;
  left: 14px;
  bottom: 8px;
  z-index: 2;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: rgb(244 236 222 / 0.86);
  text-shadow: 0 1px 6px rgb(0 0 0 / 0.9);
}

html[data-dialog-style="novel"] .stage-root .dialog-page-flow {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding-right: 4px;
  scrollbar-width: thin;
}

html[data-dialog-style="novel"] .stage-root .page-entry {
  margin: 0;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-size: clamp(15.5px, 1.3vw, 17px);
  font-weight: 400;
  line-height: 1.92;
  letter-spacing: 0.025em;
  white-space: pre-wrap;
  color: rgb(232 223 208 / 0.66);
  text-shadow: none;
  transition: color 0.18s ease;
}

html[data-dialog-style="novel"] .stage-root .page-entry.narrate {
  text-indent: 2em;
}

html[data-dialog-style="novel"] .stage-root .page-entry.say {
  position: relative;
  padding-left: 4.8em;
}

html[data-dialog-style="novel"] .stage-root .page-entry.say .page-spk {
  position: absolute;
  left: 0;
  top: 0.14em;
  width: 4.2em;
  text-align: right;
  font-family: var(--font-ui);
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: color-mix(in srgb, var(--accent) 62%, #e6d7be);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html[data-dialog-style="novel"] .stage-root .page-entry.say .page-spk::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 0.88em;
  margin-left: 7px;
  vertical-align: -1px;
  background: color-mix(in srgb, var(--accent) 48%, transparent);
}

html[data-dialog-style="novel"] .stage-root .page-entry.thought {
  padding-left: 2em;
  font-style: italic;
  color: color-mix(in srgb, var(--accent) 28%, rgb(214 203 228 / 0.68));
}

html[data-dialog-style="novel"] .stage-root .page-entry.input {
  margin: 2px 0;
  padding: 6px 14px;
  border-left: 2px solid var(--accent);
  background: color-mix(in srgb, var(--accent) 9%, transparent);
  color: color-mix(in srgb, var(--accent) 42%, #efe6d5);
  font-size: clamp(14.5px, 1.2vw, 15.5px);
  line-height: 1.75;
}

html[data-dialog-style="novel"] .stage-root .page-entry.input .page-text::before {
  content: "\u25B8 ";
  color: var(--accent);
  font-weight: 700;
}

html[data-dialog-style="novel"] .stage-root .page-entry.is-current {
  color: #f7f0e4;
  font-weight: 500;
}

html[data-dialog-style="novel"] .stage-root .page-entry.is-current.say .page-spk {
  color: color-mix(in srgb, var(--accent) 78%, #ffffff);
}

html[data-dialog-style="novel"] .stage-root .dialog-foot {
  flex: 0 0 auto;
  position: static;
  justify-content: space-between;
  margin: 14px 0 0;
  padding: 12px 0 0;
  border-top: 1px solid var(--novel-rule);
  gap: 12px;
  background: none;
}

html[data-dialog-style="novel"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  margin-left: auto;
  padding: 0;
  gap: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="novel"] .stage-root .quick-btn {
  height: auto;
  padding: 0 8px;
  border-radius: 0;
  color: color-mix(in srgb, var(--novel-gild) 78%, transparent);
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-size: 11.5px;
  letter-spacing: 0.1em;
}

html[data-dialog-style="novel"] .stage-root .quick-btn + .quick-btn {
  border-left: 1px solid color-mix(in srgb, var(--novel-gild) 28%, transparent);
}

html[data-dialog-style="novel"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #f5ecdc;
  background: none;
  text-shadow: none;
}

html[data-dialog-style="novel"] .stage-root .quick-sep {
  display: none;
}

/* C6 \xB7 \u4E66\u9875\u6D41\u5185\u5D4C\u9009\u80A2 */
html[data-dialog-style="novel"] .stage-root .choice-overlay {
  position: static;
  inset: auto;
  z-index: auto;
  width: 100%;
  margin-top: 8px;
  padding: 14px 0 4px;
  border-top: 1px solid var(--novel-rule);
  align-items: stretch;
  justify-content: flex-start;
  gap: 6px;
  overflow: visible;
  pointer-events: auto;
}

html[data-dialog-style="novel"] .stage-root .choice-overlay::before {
  content: "\u2500\u2500\u2500 \u6289\u62E9 \xB7 \u4F60\u7684\u56DE\u5E94 \u2500\u2500\u2500";
  display: block;
  margin-bottom: 2px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  letter-spacing: 0.28em;
  color: var(--novel-gild);
}

html[data-dialog-style="novel"] .stage-root .choice {
  width: 100%;
  min-height: 40px;
  margin: 0;
  padding: 8px 14px;
  justify-content: flex-start;
  text-align: left;
  border: 1px solid color-mix(in srgb, var(--novel-gild) 22%, transparent);
  border-radius: 2px;
  background: color-mix(in srgb, var(--accent) 6%, rgb(255 255 255 / 0.015));
  color: #efe6d5;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: 0.03em;
  text-shadow: none;
  backdrop-filter: none;
  box-shadow: none;
}

html[data-dialog-style="novel"] .stage-root .choice .choice-num {
  width: auto;
  height: auto;
  min-width: 18px;
  color: color-mix(in srgb, var(--accent) 75%, var(--novel-gild));
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  font-weight: 700;
}

html[data-dialog-style="novel"] .stage-root .choice .choice-num::after {
  content: ".";
}

html[data-dialog-style="novel"] .stage-root .choice.ghost {
  border-style: dashed;
  opacity: 0.82;
}

html[data-dialog-style="novel"] .stage-root .choice.ghost .choice-num::after {
  content: "";
}

html[data-dialog-style="novel"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="novel"] .stage-root .choice:focus-visible {
  border-color: color-mix(in srgb, var(--accent) 70%, var(--novel-gild));
  background: color-mix(in srgb, var(--accent) 22%, rgb(28 24 20 / 0.9));
  color: #ffffff;
  text-shadow: none;
  box-shadow: inset 3px 0 0 var(--accent);
}

html[data-dialog-style="novel"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-dialog-style="novel"] .stage-root .choice:focus-visible .choice-num {
  color: #ffffff;
}

/* V6 \u6D45\u8272\u4E3B\u9898\uFF08\u6696\u68C9\u7EB8\u4E66\u9875\uFF09 */
html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .theater-stage {
  background: radial-gradient(
    90% 85% at 50% 35%,
    color-mix(in srgb, var(--accent) 6%, #f4eee1) 0%,
    color-mix(in srgb, var(--accent) 10%, #e7decb) 100%
  );
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root:not(.bare) .theater-bg {
  filter: blur(22px) saturate(0.85) brightness(1.04);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .theater-dialog {
  --novel-gild: color-mix(in srgb, var(--accent) 45%, #7a582c);
  --novel-rule: color-mix(in srgb, var(--accent) 22%, rgb(122 88 44 / 0.24));
  border-color: var(--novel-rule);
  outline-color: color-mix(in srgb, var(--novel-gild) 18%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 5%, #fcf9f2) 0%,
    color-mix(in srgb, var(--accent) 8%, #f5efe2) 100%
  );
  box-shadow: 0 24px 60px rgb(60 42 20 / 0.18), inset 0 1px 0 #ffffff;
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .dialog-scene-plate::after {
  background: linear-gradient(90deg, rgb(35 28 18 / 0.52) 0%, transparent 50%, rgb(35 28 18 / 0.42) 100%);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry {
  color: rgb(58 46 32 / 0.68);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry.say .page-spk {
  color: color-mix(in srgb, var(--accent) 72%, #4a3319);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry.thought {
  color: color-mix(in srgb, var(--accent) 40%, #6b5b4b);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry.input {
  background: color-mix(in srgb, var(--accent) 8%, rgb(255 255 255 / 0.6));
  color: color-mix(in srgb, var(--accent) 75%, #2b1f11);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry.is-current {
  color: #1e160d;
  font-weight: 600;
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .page-entry.is-current.say .page-spk {
  color: color-mix(in srgb, var(--accent) 85%, #1e160d);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .dialog-foot {
  background: none;
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .quick-btn {
  color: color-mix(in srgb, var(--novel-gild) 85%, transparent);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #1e160d;
  background: none;
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice {
  border-color: color-mix(in srgb, var(--novel-gild) 28%, transparent);
  background: rgb(255 255 255 / 0.6);
  color: #2b2013;
  box-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 78%, #4a3319);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice:focus-visible {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, #ffffff);
  color: color-mix(in srgb, var(--accent) 82%, #140e07);
  box-shadow: inset 3px 0 0 var(--accent);
}

html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="novel"] .stage-root .choice:focus-visible .choice-num {
  color: color-mix(in srgb, var(--accent) 85%, #140e07);
}

/* \u2500\u2500 V7 \xB7 \u97F3\u54CD\u5C0F\u8BF4\uFF08nvl \xB7 Sound Novel \u5168\u5C4F\u53E0\u5B57\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Chunsoft / Type-Moon \u8303\u5F0F\uFF1A\u80CC\u666F\u4E0E\u7ACB\u7ED8\u5168\u5C4F\u5728\u573A\uFF0C\u5DE6\u6D53\u53F3\u6DE1\u6E10\u53D8\u7EB1\u4FDD\u8BC1\u6587\u5B57\u5BF9\u6BD4\u5EA6\uFF0C
   \u540C\u573A\u524D\u6587\u534A\u900F\u660E\u7559\u9A7B\u3001\u5F53\u524D\u53E5\u9AD8\u4EAE\uFF0C\u505C\u6B62\u70B9\u9009\u80A2\u5728\u6587\u672B\u6A2A\u5411\u6E10\u9690\u5E26\u5C55\u5F00\u3002 */
@media (min-width: 721px) {
  html[data-dialog-style="nvl"] .stage-root .theater-sprite.pos-center {
    --x: 24cqw;
  }
}

html[data-dialog-style="nvl"] .stage-root.theater:has(.choice-overlay) .theater-stage::after {
  display: none;
}

html[data-dialog-style="nvl"] .stage-root .theater-dialog {
  inset: 0;
  width: 100%;
  min-height: 100%;
  padding: 56px 6% calc(20px + var(--safe-b, 0px)) 7%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  border: none;
  border-radius: 0;
  background: linear-gradient(
    96deg,
    color-mix(in srgb, var(--accent) 16%, rgb(5 9 16 / 0.9)) 0%,
    color-mix(in srgb, var(--accent) 14%, rgb(6 11 19 / 0.82)) 54%,
    color-mix(in srgb, var(--accent) 10%, rgb(6 11 19 / 0.42)) 78%,
    color-mix(in srgb, var(--accent) 8%, rgb(6 11 19 / 0.24)) 100%
  );
  box-shadow: none;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
}

html[data-dialog-style="nvl"] .stage-root .dialog-page-head {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(740px, 68%);
  margin-bottom: 18px;
  font-family: var(--font-mono, ui-monospace, "SFMono-Regular", monospace);
  font-size: 11px;
  letter-spacing: 0.28em;
  color: color-mix(in srgb, var(--accent) 65%, #cbd5e1);
  text-shadow: 0 1px 6px rgb(0 0 0 / 0.9);
}

html[data-dialog-style="nvl"] .stage-root .dialog-page-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html[data-dialog-style="nvl"] .stage-root .dialog-page-dot {
  display: none;
}

html[data-dialog-style="nvl"] .stage-root .dialog-page-title::before {
  content: "";
  width: 24px;
  height: 1px;
  background: color-mix(in srgb, var(--accent) 75%, #ffffff);
}

html[data-dialog-style="nvl"] .stage-root .dialog-page-flow {
  width: min(740px, 68%);
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 6px;
  scrollbar-width: thin;
}

html[data-dialog-style="nvl"] .stage-root .page-entry {
  margin: 0;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-size: clamp(16.5px, 1.4vw, 18.5px);
  font-weight: 400;
  line-height: 1.95;
  letter-spacing: 0.035em;
  white-space: pre-wrap;
  color: rgb(241 245 249 / 0.52);
  text-shadow:
    1px 0 0 rgb(0 0 0 / 0.75),
    -1px 0 0 rgb(0 0 0 / 0.75),
    0 1px 0 rgb(0 0 0 / 0.75),
    0 -1px 0 rgb(0 0 0 / 0.75),
    0 2px 10px rgb(0 0 0 / 0.85);
  transition: color 0.18s ease;
}

html[data-dialog-style="nvl"] .stage-root .page-entry .page-spk {
  display: inline-block;
  margin-right: 10px;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--accent) 68%, #e0f2fe);
}

html[data-dialog-style="nvl"] .stage-root .page-entry.thought {
  font-style: italic;
  color: rgb(203 213 225 / 0.48);
}

html[data-dialog-style="nvl"] .stage-root .page-entry.input {
  padding-left: 12px;
  border-left: 2px solid color-mix(in srgb, var(--accent) 65%, transparent);
  color: color-mix(in srgb, var(--accent) 45%, rgb(241 245 249 / 0.72));
  font-size: clamp(15px, 1.25vw, 16.5px);
}

html[data-dialog-style="nvl"] .stage-root .page-entry.input .page-text::before {
  content: "\u25B8 ";
  color: var(--accent);
}

html[data-dialog-style="nvl"] .stage-root .page-entry.is-current {
  color: #ffffff;
  font-weight: 600;
  text-shadow:
    1px 0 0 rgb(0 0 0 / 0.85),
    -1px 0 0 rgb(0 0 0 / 0.85),
    0 1px 0 rgb(0 0 0 / 0.85),
    0 -1px 0 rgb(0 0 0 / 0.85),
    0 2px 14px rgb(0 0 0 / 0.92);
}

html[data-dialog-style="nvl"] .stage-root .page-entry.is-current .page-spk {
  color: color-mix(in srgb, var(--accent) 78%, #ffffff);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent), 0 1px 4px rgb(0 0 0 / 0.9);
}

html[data-dialog-style="nvl"] .stage-root .dialog-foot {
  flex: 0 0 auto;
  position: static;
  justify-content: space-between;
  margin: auto 0 0;
  padding: 12px 0 0;
  border: none;
  gap: 12px;
  background: none;
}

html[data-dialog-style="nvl"] .stage-root .dialog-options {
  position: static;
  right: auto;
  bottom: auto;
  height: auto;
  margin-left: auto;
  padding: 0;
  gap: 4px;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

html[data-dialog-style="nvl"] .stage-root .quick-btn {
  height: 24px;
  padding: 0 9px;
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: 999px;
  background: rgb(8 14 24 / 0.52);
  color: rgb(241 245 249 / 0.68);
  font-size: 11.5px;
}

html[data-dialog-style="nvl"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #ffffff;
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 42%, rgb(8 14 24 / 0.82));
  text-shadow: none;
}

html[data-dialog-style="nvl"] .stage-root .quick-sep {
  display: none;
}

/* C7 \xB7 \u97F3\u54CD\u5C0F\u8BF4\u9875\u672B\u9009\u80A2 */
html[data-dialog-style="nvl"] .stage-root .choice-overlay {
  position: static;
  inset: auto;
  z-index: auto;
  width: 100%;
  margin-top: 8px;
  padding: 12px 0 4px;
  border-top: 1px solid color-mix(in srgb, var(--accent) 32%, rgb(255 255 255 / 0.14));
  align-items: stretch;
  justify-content: flex-start;
  gap: 7px;
  overflow: visible;
  pointer-events: auto;
}

html[data-dialog-style="nvl"] .stage-root .choice {
  width: 100%;
  min-height: 42px;
  margin: 0;
  padding: 9px 18px;
  justify-content: flex-start;
  text-align: left;
  border: none;
  border-left: 2px solid color-mix(in srgb, var(--accent) 45%, rgb(255 255 255 / 0.24));
  border-radius: 0;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 18%, rgb(8 14 24 / 0.92)) 0%,
    color-mix(in srgb, var(--accent) 12%, rgb(8 14 24 / 0.84)) 82%,
    transparent 100%
  );
  color: #f1f5f9;
  font-family: "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", var(--font-ui);
  font-size: 15.5px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 4px rgb(0 0 0 / 0.85);
  backdrop-filter: none;
  box-shadow: none;
}

html[data-dialog-style="nvl"] .stage-root .choice .choice-num {
  width: auto;
  height: auto;
  min-width: 20px;
  color: color-mix(in srgb, var(--accent) 75%, #ffffff);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12.5px;
  font-weight: 700;
}

html[data-dialog-style="nvl"] .stage-root .choice:hover:not(:disabled),
html[data-dialog-style="nvl"] .stage-root .choice:focus-visible {
  border-left: 3px solid var(--accent);
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 42%, rgb(12 22 38 / 0.92)) 0%,
    color-mix(in srgb, var(--accent) 18%, rgb(12 22 38 / 0.68)) 80%,
    transparent 100%
  );
  color: #ffffff;
  font-weight: 600;
  text-shadow: 0 1px 4px rgb(0 0 0 / 0.85);
  box-shadow: none;
}

/* V7 \u6D45\u8272\u4E3B\u9898\uFF08\u548C\u7EB8\u767D\u96FE\u53E0\u5B57\uFF09 */
html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .theater-dialog {
  background: linear-gradient(
    96deg,
    color-mix(in srgb, var(--accent) 8%, rgb(252 250 245 / 0.94)) 0%,
    color-mix(in srgb, var(--accent) 6%, rgb(252 250 245 / 0.88)) 54%,
    color-mix(in srgb, var(--accent) 4%, rgb(252 250 245 / 0.44)) 80%,
    rgb(252 250 245 / 0.18) 100%
  );
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .dialog-page-head {
  color: color-mix(in srgb, var(--accent) 78%, #1e293b);
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .dialog-page-title::before {
  background: color-mix(in srgb, var(--accent) 75%, #1e293b);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry {
  color: rgb(30 41 59 / 0.56);
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.9), 0 0 8px rgb(255 255 255 / 0.85);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry .page-spk {
  color: color-mix(in srgb, var(--accent) 82%, #0f172a);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry.thought {
  color: rgb(71 85 105 / 0.55);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry.input {
  border-left-color: var(--accent);
  color: color-mix(in srgb, var(--accent) 78%, #0f172a);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry.is-current {
  color: #0f172a;
  font-weight: 600;
  text-shadow: 0 1px 0 rgb(255 255 255 / 0.95), 0 0 12px rgb(255 255 255 / 0.9);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .page-entry.is-current .page-spk {
  color: color-mix(in srgb, var(--accent) 88%, #091526);
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .dialog-foot {
  background: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .quick-btn {
  border-color: rgb(15 23 42 / 0.14);
  background: rgb(255 255 255 / 0.82);
  color: rgb(30 41 59 / 0.72);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .quick-btn:hover:not(:disabled) {
  color: #ffffff;
  background: var(--accent);
  border-color: var(--accent);
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice-overlay {
  border-top-color: color-mix(in srgb, var(--accent) 28%, rgb(15 23 42 / 0.12));
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice {
  border-left-color: color-mix(in srgb, var(--accent) 45%, rgb(15 23 42 / 0.25));
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 10%, rgb(255 255 255 / 0.96)) 0%,
    color-mix(in srgb, var(--accent) 6%, rgb(255 255 255 / 0.9)) 82%,
    transparent 100%
  );
  color: #1e293b;
  text-shadow: none;
  box-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice .choice-num {
  color: color-mix(in srgb, var(--accent) 82%, #0f172a);
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice:hover:not(:disabled),
html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice:focus-visible {
  border-left-color: var(--accent);
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 22%, #ffffff) 0%,
    color-mix(in srgb, var(--accent) 10%, rgb(255 255 255 / 0.85)) 80%,
    transparent 100%
  );
  color: color-mix(in srgb, var(--accent) 85%, #091526);
  text-shadow: none;
}

html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice:hover:not(:disabled) .choice-num,
html[data-ui-theme="light"][data-dialog-style="nvl"] .stage-root .choice:focus-visible .choice-num {
  color: color-mix(in srgb, var(--accent) 85%, #091526);
}

/* \u2500\u2500 \u7A84\u5C4F\uFF1A\u5361\u7247\u90A3\u4E09\u79CD\u6536\u6210\u6574\u5BBD\u3001\u540D\u724C\u4E0D\u518D\u9A91\u8FB9\uFF1B\u5B57\u5E55\u53BB\u6389\u4E0A\u9762\u90A3\u6761\u9ED1\u8FB9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u624B\u673A\u4E0A\u7684\u53F0\u8BCD\u6761\u672C\u6765\u5C31\u662F\u300C\u8D34\u5E95\u4E00\u6761\u300D\uFF0C\u5BBD\u94F6\u5E55\u7684\u4E0A\u9762\u90A3\u6761\u5728\u6CA1\u6709 16:9 \u7684\u624B\u673A\u5C4F\u4E0A
   \u6CA1\u6709\u610F\u4E49\uFF0C\u53CD\u800C\u8DDF\u9876\u680F\u62A2\u4F4D\u7F6E\u3002 */
@media (max-width: 720px), (max-height: 460px) {
  html[data-dialog-style="card"] .stage-root .theater-dialog,
  html[data-dialog-style="hud"] .stage-root .theater-dialog,
  html[data-dialog-style="scroll"] .stage-root .theater-dialog {
    width: calc(100% - 24px);
    bottom: calc(12px + var(--safe-b, 0px));
  }

  html[data-dialog-style="card"] .stage-root .theater-dialog,
  html[data-dialog-style="scroll"] .stage-root .theater-dialog {
    padding: 20px 20px 14px;
  }

  html[data-dialog-style="hud"] .stage-root .theater-dialog {
    padding: 16px 18px 12px;
  }

  /* \u540D\u724C\u9A91\u5728\u5361\u6CBF\u4E0A\u4F1A\u88AB overflow-y: auto \u88C1\u6389\uFF0C\u7A84\u5C4F\u6539\u6210\u5361\u5185\u9996\u884C */
  html[data-dialog-style="card"] .stage-root .dialog-name {
    position: static;
    align-self: flex-start;
    margin: 0 0 10px;
  }

  html[data-dialog-style="card"] .stage-root .theater-dialog::before {
    left: 20px;
    right: 20px;
  }

  html[data-dialog-style="cinema"] .stage-root .theater-dialog {
    min-height: 20vh;
    padding: 16px 16px 44px;
  }

  html[data-dialog-style="cinema"] .stage-root .theater-dialog::before {
    display: none;
  }

  html[data-dialog-style="cinema"] .stage-root .dialog-text,
  html[data-dialog-style="velvet"] .stage-root .dialog-text {
    width: 100%;
  }

  html[data-dialog-style="velvet"] .stage-root .theater-dialog {
    padding: 18px 16px 46px;
  }

  html[data-dialog-style="card"] .stage-root .choice,
  html[data-dialog-style="cinema"] .stage-root .choice,
  html[data-dialog-style="hud"] .stage-root .choice,
  html[data-dialog-style="scroll"] .stage-root .choice,
  html[data-dialog-style="velvet"] .stage-root .choice {
    width: calc(100% - 24px);
    padding: 10px 18px;
  }

  html[data-dialog-style="novel"] .stage-root .theater-dialog {
    left: 10px;
    right: 10px;
    top: calc(54px + env(safe-area-inset-top, 0px));
    bottom: calc(10px + var(--safe-b, 0px));
    width: auto;
    transform: none;
    padding: 18px 18px 12px;
  }

  html[data-dialog-style="novel"] .stage-root .dialog-scene-plate {
    height: 84px;
  }

  html[data-dialog-style="novel"] .stage-root .dialog-scene-plate.is-cg {
    height: 116px;
  }

  /* \u7A84\u5C4F\u4E0B\u89D2\u8272\u540D\u6539\u4E3A\u884C\u5185\u51A0\u9996\uFF0C\u628A\u6574\u884C\u5BBD\u5EA6\u7559\u7ED9\u6B63\u6587\uFF08\u6BCF\u884C ~21 \u5B57\uFF0C\u907F\u514D\u5DE6\u680F\u5403\u6389\u56DB\u5206\u4E4B\u4E00\u5BBD\uFF09 */
  html[data-dialog-style="novel"] .stage-root .page-entry.say {
    padding-left: 0;
  }

  html[data-dialog-style="novel"] .stage-root .page-entry.say .page-spk {
    position: static;
    display: inline-block;
    width: auto;
    margin-right: 8px;
    text-align: left;
  }

  html[data-dialog-style="novel"] .stage-root .dialog-foot,
  html[data-dialog-style="nvl"] .stage-root .dialog-foot {
    margin-inline: 0;
    margin-bottom: 0;
    padding: 10px 0 0;
    background: none;
  }

  html[data-dialog-style="nvl"] .stage-root .theater-dialog {
    top: calc(50px + env(safe-area-inset-top, 0px));
    min-height: 0;
    padding: 16px 16px calc(12px + var(--safe-b, 0px));
  }

  html[data-dialog-style="nvl"] .stage-root .dialog-page-head,
  html[data-dialog-style="nvl"] .stage-root .dialog-page-flow {
    width: 100%;
  }
}
`;var Te=require("react"),da=require("react/jsx-runtime");function as(a){let[e,t]=(0,Te.useState)("off"),o=(0,Te.useRef)("off");o.current=e,(0,Te.useEffect)(()=>{let l=()=>{let s=a.current;if(s!==null&&document.fullscreenElement===s){t("native");return}o.current==="native"&&t("off")};return document.addEventListener("fullscreenchange",l),()=>document.removeEventListener("fullscreenchange",l)},[a]),(0,Te.useEffect)(()=>{if(e!=="css")return;let l=s=>{s.key==="Escape"&&t("off")};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[e]);let r=(0,Te.useCallback)(()=>{let l=a.current;if(l===null)return;if(o.current==="native"){document.exitFullscreen().catch(()=>{});return}if(o.current==="css"){t("off");return}let s=l.requestFullscreen?.bind(l);if(s===void 0){t("css");return}s().then(()=>t("native")).catch(()=>t("css"))},[a]);return{on:e!=="off",css:e==="css",toggle:r}}var ts=`
.aivn-stage-view.aivn-css-full {
	position: fixed;
	inset: 0;
	z-index: 2147483000;
	background: var(--bg);
}
`;function jn({exit:a}){return(0,da.jsx)("svg",{width:"17",height:"17",viewBox:"0 0 24 24","aria-hidden":"true",style:{display:"block"},children:(a?["M9 3v6H3","M15 3v6h6","M9 21v-6H3","M15 21v-6h6"]:["M3 9V3h6","M21 9V3h-6","M3 15v6h6","M21 15v6h-6"]).map(t=>(0,da.jsx)("path",{d:t,fill:"none",stroke:"currentColor",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round"},t))})}var os=({state:a})=>(0,da.jsxs)("button",{type:"button",className:`aivn-fullscreen${a.on?" on":""}`,title:a.on?"\u9000\u51FA\u5168\u5C4F\uFF08Esc\uFF09":"\u5168\u5C4F","aria-label":a.on?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F","aria-pressed":a.on,onClick:e=>{e.stopPropagation(),a.toggle()},children:[(0,da.jsx)(jn,{exit:a.on}),a.on?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F"]});var rs=require("react");var we=require("react/jsx-runtime"),ls=({items:a})=>{let[e,t]=(0,rs.useState)(!1);return a.length===0?null:(0,we.jsxs)("div",{className:"aivn-pending",children:[(0,we.jsxs)("button",{type:"button",className:`dir-btn${e?" on":""}`,title:"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B","aria-label":"\u6392\u961F\u4E2D\u4E0E\u6B63\u5728\u5408\u6210\u7684\u4E8B",onClick:()=>t(o=>!o),children:[(0,we.jsx)(j,{name:"sparkles",size:17}),"\u8FDB\u884C\u4E2D ",a.length]}),e&&(0,we.jsx)("ul",{className:"aivn-pending-list",children:a.map(o=>(0,we.jsxs)("li",{className:"aivn-pending-row",children:[(0,we.jsx)("span",{className:"aivn-pending-kind",children:o.kind==="guide"?"\u63D0\u793A":"\u8BED\u97F3"}),(0,we.jsx)("span",{className:"aivn-pending-text",children:o.text}),(0,we.jsx)("span",{className:"aivn-pending-note",children:o.note})]},o.key))})]})};var Y=require("react/jsx-runtime"),Xn="\uFF08\u7EE7\u7EED\uFF09";pa("@aivn/stage/stage.css",es);pa("dsh-aivn/fullscreen.css",ts);var ss=To,Kn=8e3;function Zn(a){let e=Object.entries(a).map(([t,o])=>`${t}: ${o};`).join(" ");return e===""?"":`.aivn-stage-view.stage-root.stage-root, .aivn-stage-view .stage-root.stage-root { ${e} }`}var ds=({sessionId:a})=>{let[e]=(0,P.useState)(()=>new ba),[t,o]=(0,P.useState)(0),[r,l]=(0,P.useState)(!1),[s,d]=(0,P.useState)(null),[c,m]=(0,P.useState)(!1),[p,x]=(0,P.useState)(!1),[L,R]=(0,P.useState)(!1),[E,q]=(0,P.useState)(null),[h,C]=(0,P.useState)(null),[k,N]=(0,P.useState)({}),[W,y]=(0,P.useState)(null),[I,w]=(0,P.useState)(0),[z,v]=(0,P.useState)(!1),oe=(0,P.useRef)(!1),[F,V]=(0,P.useState)([]),[D,K]=(0,P.useState)(!1),[Z,he]=(0,P.useState)(!1),se=(0,P.useRef)(!1),J=Co(),[U,ue]=(0,P.useState)(()=>typeof window>"u"?!0:Fo(window.localStorage,ss,!0)),ge=(0,P.useRef)(null);ge.current===null&&(ge.current=new xt);let O=ge.current,Ae=(0,P.useRef)(null),Fe=as(Ae),xe=(0,P.useRef)(!1),Ie=(0,P.useRef)(0),ne=(0,P.useRef)(!1),Me=(0,P.useRef)(!1),ee=(0,P.useCallback)(()=>{Me.current||(Me.current=!0,requestAnimationFrame(()=>{Me.current=!1,o(b=>b+1)}))},[]);(0,P.useEffect)(()=>(O.onNotify=()=>ee(),O.onControl=b=>{a&&Kt("/aivn/voice",{session:a,...b}).catch(()=>{})},()=>{O.dispose(),O.onNotify=null,O.onControl=null}),[O,a,ee]),(0,P.useEffect)(()=>{O.setEnabled(U)},[O,U]),(0,P.useEffect)(()=>{if(!a)return;let b=!1;return q(null),C(null),N({}),y(null),(async()=>{try{let _=await is(`/aivn/play?session=${encodeURIComponent(a)}`);if(b||(q(_),N(_.theme??{}),!_.dir))return;let S=await is(`/aivn/assets?session=${encodeURIComponent(a)}`);b||C(S)}catch(_){b||y(Do(_))}})(),()=>{b=!0}},[a]);let be=(0,P.useCallback)(b=>{v(!b),w(_=>_+1)},[]);(0,P.useEffect)(()=>{if(!a)return;e.reset(),O.reset(),Ie.current=0,xe.current=!1,ne.current=!1,d(null),m(!1),x(!1),l(!1),V([]),se.current=!1,he(!1),oe.current=!1,be(!1),ee();let b=new EventSource(`/aivn/stream?session=${encodeURIComponent(a)}`);return b.addEventListener("frame",_=>{let S;try{S=JSON.parse(_.data)}catch{return}if(S.seq>Ie.current+1&&(e.reset(),O.reset(),be(!1),oe.current=!1,xe.current=!1,d(null),m(!1),x(!1),Ie.current=S.seq-1),!(S.seq<=Ie.current)){if(Ie.current=S.seq,S.kind==="reset"){e.reset(),O.reset(),xe.current=!1,d(null),m(!1),x(!1),se.current=!0,he(!0),be(S.running),oe.current=!S.running,ee();return}if(S.kind==="guide"){V(S.items);return}if(se.current&&(se.current=!1,he(!1)),S.kind==="voice"){S.state==="ready"&&S.url?O.handleAudio({seq:S.lineSeq,url:S.url}):S.state==="started"?O.markPending(S.lineSeq):S.state==="failed"&&O.audioFailed(S.lineSeq),ee();return}if(S.kind==="beat"){S.state==="start"?(oe.current&&(oe.current=!1,be(!0)),O.beatStarted(),xe.current=!1,d(null),m(!1),l(!0),ne.current=!1):(m(!xe.current),l(!1));return}if(S.kind==="style"){N(S.theme);return}if(S.kind==="nsfw"){K(S.active);return}S.event.kind==="stop"&&(xe.current=!0,d({stopType:S.event.stopType,...S.event.options?{options:S.event.options}:{},...S.event.placeholder?{placeholder:S.event.placeholder}:{}})),S.event.kind==="ending"&&x(!0),e.apply(S.event,S.seq),ee()}}),()=>b.close()},[a,e,ee]);let ce=(0,P.useCallback)(async(b,_)=>{let S=b.trim();if(!S||!a)return!1;try{return await Kt("/aivn/input",{session:a,text:S,..._?.silent?{silent:!0}:{}}),!0}catch(ea){return J.push(`\u6CA1\u80FD\u9001\u5230\u5267\u4F5C\u5BB6\uFF1A${Do(ea)}`,"error"),!1}},[a,J]),g=(0,P.useCallback)(async(b,_,S)=>{if(a)try{await Kt("/aivn/direct",{session:a,action:b,text:_,...S?{from:S}:{}})}catch(ea){J.push(`\u5BFC\u6F14\u6307\u4EE4\u6CA1\u80FD\u9001\u5230\uFF1A${Do(ea)}`,"error")}},[a,J]),H=(0,P.useCallback)(()=>{ne.current||(ne.current=!0,ce(Xn,{silent:!0}).then(b=>{b||(ne.current=!1)}))},[ce]),A=e.lines,M=E?.dir?E.config??null:null,Q=E?.voice===!0&&M!==null;(0,P.useEffect)(()=>{!a||!Q||Kt("/aivn/voice",{session:a,enabled:U}).catch(()=>{})},[a,Q,U]);let $=(0,P.useCallback)(()=>{ue(b=>{let _=!b;return typeof window<"u"&&Mo(window.localStorage,ss,_),_})},[]),le=(0,P.useCallback)(()=>{O.unlock(),ee()},[O,ee]),G=(0,P.useMemo)(()=>Object.fromEntries((M?.characters??[]).map(b=>[b.id,b.name??b.id])),[M]),Ze=(0,P.useMemo)(()=>{if(!M||!h||!a)return null;let b=(M.characters??[]).map(_=>({..._,body:""}));return Ao(M.id,h.index,{},h.manifest,b,{assetUrl:_=>`/aivn/asset?session=${encodeURIComponent(a)}&path=${encodeURIComponent(`assets/${_}`)}`})},[M,h,a]),ua=(0,P.useMemo)(()=>Po(null,A),[A,t]),Ge=(0,P.useRef)(null),Le=(0,P.useRef)({seq:null,at:0}),Zt=()=>{if(O.holdsLine())return!0;let b=Ge.current;return b===null||O.voiceState(b)!=="pending"?!1:(Le.current.seq!==b&&(Le.current={seq:b,at:Date.now()}),Date.now()-Le.current.at<Kn)},ie=co(e.cues,A,{live:r,resume:!0,revision:t,transcript:ua,turbo:L,resetToken:I,resumeAfterReset:z,hold:Zt(),onLineStart:b=>O.lineStarted(b?.seq,b?.type==="say"),onFastForward:()=>O.fastForward()});Ge.current=ie.current?.seq??null;let We=r,Lt=ie.current===null||ie.shownLength>=ie.current.text.length,Je=!We&&ie.exhausted&&Lt,Qe=no({ready:Je,stopType:s?.stopType??null,isNoStop:c,ended:p}),ca={beatId:A.some(b=>b.type==="say")?"beat:current":null,beatNodeId:null,lineNodeId:ie.view?.seq==null?null:`line:${ie.view.seq}`,lineSeq:ie.view?.seq??null,lineText:ie.view?.text??""},It=[...F.filter(b=>b.status==="pending").map(b=>({key:b.id,kind:"guide",text:b.text,note:"\u6392\u961F\u4E2D"})),...A.filter(b=>b.type==="say"&&O.voiceState(b.seq??null)==="pending").map(b=>({key:`voice:${b.key}`,kind:"voice",text:b.text,note:"\u5408\u6210\u4E2D"}))];if(!a)return(0,Y.jsx)(bt,{text:"\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u821E\u53F0\u3002"});if(W)return(0,Y.jsx)(bt,{text:`\u821E\u53F0\u6CA1\u63A5\u4E0A\uFF1A${W}`});if(!E)return(0,Y.jsx)(bt,{text:"\u6B63\u5728\u8FDE\u63A5\u821E\u53F0\u2026"});if(!M)return(0,Y.jsx)(bt,{text:`\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709 play.json\uFF0C\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A${E.dir??""}`});if(!Ze)return(0,Y.jsx)(bt,{text:"\u6B63\u5728\u8BFB\u53D6\u5267\u76EE\u7D20\u6750\u2026"});let Ye=Zn(k);return(0,Y.jsxs)("div",{ref:Ae,className:`stage-root aivn-stage-view${Fe.css?" aivn-css-full":""}`,style:{height:"100%",minHeight:0},children:[Ye===""?null:(0,Y.jsx)("style",{"data-aivn-theme":!0,children:Ye}),(0,Y.jsx)(os,{state:Fe}),D?(0,Y.jsx)("span",{className:"aivn-nsfw",title:"\u9650\u5236\u7EA7\u901A\u9053",children:"\u9650\u5236\u7EA7"}):null,(0,Y.jsx)(ko,{visual:ie.visual,playback:ie,live:r,fresh:A.length===0,names:G,index:Ze,voiceAvailable:Q,voiceOn:U,onToggleVoice:$,busy:We,targets:ca,directorBar:!0,promptAlt:"interrupt",showGenerate:!1,onView:ns,onPrompt:(b,_)=>{g(_==="interrupt"?"interrupt":"guide",b)},onEdit:(b,_)=>{let S=ca.lineText;g("rewrite",S&&S!==_?`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF1A\u628A\u8FD9\u4E00\u53E5\u300C${S}\u300D\u6539\u6210\u300C${_}\u300D\uFF0C\u5176\u4F59\u7167\u65E7\u3002`:`\u628A\u8FD9\u4E00\u62CD\u91CD\u5199\u4E00\u904D\uFF0C\u8FD9\u4E00\u53E5\u6539\u6210\uFF1A${_}`,"line")},onFork:(b,_)=>{g("rewrite",_?.instruction??"","beat")},onGenerateCg:ns,onReplay:b=>{O.replay(b)},voiceState:b=>O.voiceState(b),onUnlock:le,onTurbo:R,canContinue:Qe,onContinue:H,ended:p,overlay:ie.scrubbed||Z?null:A.length===0?(0,Y.jsx)("div",{className:"choice-overlay",role:"group","aria-label":"\u5F00\u6F14",children:(0,Y.jsx)("div",{className:"choices",children:(0,Y.jsx)("button",{type:"button",className:"choice",onClick:()=>{ce(M.opening)},children:(0,Y.jsx)("span",{className:"choice-text",children:"\u5F00\u6F14"})})})}):Je?(0,Y.jsx)(vo,{stop:s,isNoStop:c,disabled:We,onChoice:b=>{ce(s?.options?.[b]?.text??"")},onFree:b=>{ce(b)}}):null}),(0,Y.jsx)(ls,{items:It}),(0,Y.jsx)(So,{toasts:J.toasts,onDismiss:J.dismiss})]})};function ns(){}function bt({text:a}){return(0,Y.jsx)("div",{className:"stage-root aivn-stage-notice",style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:24,color:"var(--ink, #3b3630)",fontSize:14,textAlign:"center"},children:(0,Y.jsx)("span",{children:a})})}async function is(a){let e=await fetch(a);if(!e.ok)throw new Error(`${e.status} ${await e.text()}`);return e.json()}async function Kt(a,e){let t=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`${t.status} ${await t.text()}`)}function Do(a){return a instanceof Error?a.message:String(a)}var Jn="aivn-playwriter",Qn=["slots","sessions","uiSession","configForms"];function Yn(a){pa("dsh-aivn/host.css",Zo);let e=a,t=new Tt(a.configForms.get(Ft),a.configForms.describe());a.effect(()=>()=>t.dispose(),"dsh-aivn:config card subscription"),a.effect(()=>a.configForms.whileServed([Ft],()=>a.slots.inject("plugins.bundle.config",()=>a.slots.register({name:"plugins.bundle.config",key:"dsh-aivn",inject:()=>t.inject()},Yo))),"dsh-aivn:config card"),a.slots.inject("conversation.view",()=>a.effect(()=>{let o,r=()=>{let c=e.uiSession.adapter.current.getSnapshot().key;return c===void 0?!1:e.sessions.list.getSnapshot().byId[c]?.projectionValues?.agentPreset===Jn},l=()=>{if(r()!==(o!==void 0)){if(o){o(),o=void 0;return}o=a.slots.register({name:"conversation.view",id:"aivn-stage",order:30,label:"AIVN"},ds)}},s=e.uiSession.adapter.current.subscribe(l),d=e.sessions.list.subscribe(l);return l(),()=>{s(),d(),o?.(),o=void 0}},"dsh-aivn:stage view")),a.effect(()=>tr(e),"dsh-aivn:stage entry")}
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
lucide-react/dist/esm/icons/compass.mjs:
lucide-react/dist/esm/icons/corner-up-left.mjs:
lucide-react/dist/esm/icons/crosshair.mjs:
lucide-react/dist/esm/icons/download.mjs:
lucide-react/dist/esm/icons/drama.mjs:
lucide-react/dist/esm/icons/eye-off.mjs:
lucide-react/dist/esm/icons/eye.mjs:
lucide-react/dist/esm/icons/fast-forward.mjs:
lucide-react/dist/esm/icons/file-text.mjs:
lucide-react/dist/esm/icons/flame.mjs:
lucide-react/dist/esm/icons/folder-open.mjs:
lucide-react/dist/esm/icons/git-branch.mjs:
lucide-react/dist/esm/icons/hammer.mjs:
lucide-react/dist/esm/icons/image.mjs:
lucide-react/dist/esm/icons/log-out.mjs:
lucide-react/dist/esm/icons/maximize-2.mjs:
lucide-react/dist/esm/icons/maximize.mjs:
lucide-react/dist/esm/icons/message-square.mjs:
lucide-react/dist/esm/icons/messages-square.mjs:
lucide-react/dist/esm/icons/mic.mjs:
lucide-react/dist/esm/icons/minimize.mjs:
lucide-react/dist/esm/icons/panel-left-close.mjs:
lucide-react/dist/esm/icons/panel-left-open.mjs:
lucide-react/dist/esm/icons/paperclip.mjs:
lucide-react/dist/esm/icons/pause.mjs:
lucide-react/dist/esm/icons/pen-line.mjs:
lucide-react/dist/esm/icons/pencil.mjs:
lucide-react/dist/esm/icons/play.mjs:
lucide-react/dist/esm/icons/plus.mjs:
lucide-react/dist/esm/icons/rotate-ccw-clock.mjs:
lucide-react/dist/esm/icons/rotate-ccw.mjs:
lucide-react/dist/esm/icons/rotate-cw.mjs:
lucide-react/dist/esm/icons/search.mjs:
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