/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},o=(i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",p=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f};class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return o(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:g}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.4.1");const $=window,_=$.trustedTypes,b=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,A="?"+y,w=`<${A}>`,x=document,S=(t="")=>x.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,H=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),T=/'/g,O=/"/g,N=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),M=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),j=new WeakMap,z=x.createTreeWalker(x,129,null,!1),D=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=k;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===k?"!--"===l[1]?o=P:void 0!==l[1]?o=U:void 0!==l[2]?(N.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=H):void 0!==l[3]&&(o=H):o===H?">"===l[0]?(o=null!=n?n:k,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?H:'"'===l[3]?O:T):o===O||o===T?o=H:o===P||o===U?o=k:(o=H,n=void 0);const d=o===H&&t[e+1].startsWith("/>")?" ":"";r+=o===k?i+w:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+y+d):i+y+(-2===c?(s.push(void 0),e):d)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(a):a,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=D(t,e);if(this.el=B.createElement(l,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=z.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(y)){const i=c[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(y),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?K:"@"===e[1]?Z:q})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(N.test(s.tagName)){const t=s.textContent.split(y),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),z.nextNode(),a.push({type:2,index:++n});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(y,t+1));)a.push({type:7,index:n}),t+=y.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){var n,r,o,a;if(e===M)return e;let l=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const c=E(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Cl)&&void 0!==o?o:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,s)),e}class V{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);z.currentNode=n;let r=z.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new W(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new Y(r,this,t)),this.v.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=z.nextNode(),o++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{constructor(t,e,i,s){var n;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$C_=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),E(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==M&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.O(t):this.$(t)}S(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==L&&E(this._$AH)?this._$AA.nextSibling.data=t:this.k(x.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new V(n,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new B(t)),e}O(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.S(S()),this.S(S()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$C_=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,n){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=I(this,t,e,0),r=!E(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=I(this,s[i+o],e,o),a===M&&(a=this._$AH[o]),r||(r=!E(a)||a!==this._$AH[o]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.P(t)}P(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends q{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===L?void 0:t}}const J=_?_.emptyScript:"";class K extends q{constructor(){super(...arguments),this.type=4}P(t){t&&t!==L?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Z extends q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:L)===M)return;const s=this._$AH,n=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==L&&(s===L||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const G=$.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q,X;null==G||G(B,W),(null!==(m=$.litHtmlVersions)&&void 0!==m?m:$.litHtmlVersions=[]).push("2.3.1");class tt extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new W(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return M}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==it||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.st)||void 0===i?void 0:i.has(t))&&this.nt.add(t);return this.render(e)}const n=t.element.classList;this.nt.forEach((t=>{t in e||(n.remove(t),this.nt.delete(t))}));for(const t in e){const i=!!e[t];i===this.nt.has(t)||(null===(s=this.st)||void 0===s?void 0:s.has(t))||(i?(n.add(t),this.nt.add(t)):(n.remove(t),this.nt.delete(t)))}return M}});class nt{constructor(t){t instanceof Date&&(this.date=t)}format(t){return function(t,e){let i=t.getDate(),s=t.getMonth()+1,n=(t.getFullYear(),t.getHours()),r=t.getMinutes(),o=t.getSeconds();if(i=i<10?"0"+i:i,s=s<10?"0"+s:s,n=n<10?"0"+n:n,r=r<10?"0"+r:r,o=o<10?"0"+o:o,"HH:mm"===e)return n+":"+r;console.error("no dateFormat")}(this.date,t)}}const rt={alarm:new Audio("./assets/mp3/alarm.mp3"),beep:new Audio("./assets/mp3/beep.mp3")};function ot(t,e=!0){const i=rt[t];if(!i)return console.error("sound not found!");e?(i.loop="alarm"==t,i.play()):(i.currentTime=0,i.pause())}const at=document.body.querySelector("demo-view");let lt=0,ct=0,ht=100,dt=[];function pt(t){const e=t.target,{value:i}=e;let s=[];for(let t=0;t<i.byteLength;t++)s.push(i.getUint8(t));let n=0;for(;s.length>0;){n++;const[t,e,i]=s;if(ut(t,e,i)?(vt(s.slice(4,10)),console.log("vitals",`${s[8]}s`,0===s[3]?"ok":`Status ${s[3]}`,`HR ${s[4]} SpO2 ${s[5]}`,`?${s[6]}`,`?${s[7]}`,`?${s[9]}`),s=s.slice(10,s.length)):ft(t,e,i)?($t(s[3],s[6]),mt(s[5]),s[5]>15&&console.error(`more than 15 ${s[5]}`),console.log("graph",0===s[4]?"ok":`Status ${s[4]}`,`Trace ${s[3]}, ${s[5]}`,`Time ${s[6]} ${s[7]}`),s=s.slice(8,s.length)):(console.error(s),s=[]),20===n)break}}const ut=(t,e,i)=>254===t&&10===e&&85===i,ft=(t,e,i)=>254===t&&8===e&&86===i;function vt(t){const e=((t=new Date,e=null)=>new nt(t,e))().format("HH:mm"),[i,s]=t;at.sats=s,at.bpm=i,e!==lt&&(lt=e,dt=[[e,s,i],...dt],at.data=dt)}let gt;function mt(t){t>at.bar?gt="up":t<at.bar&&("up"===gt&&ot("beep",!0),gt="down"),at.bar=t}function $t(t,e){at.beep=t/150;const i=t;ht=at.drawLine(e,ht,i),ct++,ct>255&&(ct=ht=0)}const _t=document.body.querySelector("demo-view"),bt=["00001800-0000-1000-8000-00805f9b34fb","00001801-0000-1000-8000-00805f9b34fb","0000180a-0000-1000-8000-00805f9b34fb","0000fd00-0000-1000-8000-00805f9b34fb","0000ff90-0000-1000-8000-00805f9b34fb","0000ffc0-0000-1000-8000-00805f9b34fb","0000ffe0-0000-1000-8000-00805f9b34fb","0000ffe5-0000-1000-8000-00805f9b34fb"],yt=new Set(["0000ff91","0000ff96","00002a26","00002a27","00002a00","00002a29"]),At=new Set(["0000ff92","0000ff93","0000ff95","0000ff97","0000ff98","0000ff9a"]);let wt=null;async function xt(){try{return wt?.gatt?.connected?wt.gatt.disconnect():await async function(){console.log("connecting..."),wt=await navigator.bluetooth.requestDevice({filters:[{name:"VTM 20F"}],optionalServices:bt}),console.log(`connected to ${wt.name}`);const t=await wt.gatt.connect(),e=await t.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb"),i=await e.getCharacteristics(),s=new TextDecoder("utf-8"),n=await t.getPrimaryServices();for(const t of n){const e=await t.getCharacteristics();console.group(`service ${t.uuid}`);for(const t of e){const[e]=t.uuid.split("-"),i=[];for(const e of["authenticatedSignedWrites","broadcast","indicate","notify","read","reliableWrite","writableAuxiliaries","write","writeWithoutRespons"])t.properties[e]&&i.push(e);let n;try{const e=await t.getDescriptor("gatt.characteristic_user_description"),i=await e.readValue();n=s.decode(i).replaceAll("\0","")}catch(t){}if(t.properties.read){const r=await t.readValue();let o;if(yt.has(e))o=s.decode(r).replaceAll("\0","");else if(At.has(e)){let t=[];for(let e=0;e<r.byteLength;e++)t.push(r.getUint8(e));o=t}else{let t=[];for(let e=0;e<r.byteLength;e++)t.push(r.getUint8(e));o=["unknown",t,s.decode(r)]}console.log({uuid:e,description:n,value:o},i)}else console.log({uuid:e,description:n},i)}console.groupEnd()}for(const t of i)t.properties.notify&&(t.addEventListener("characteristicvaluechanged",pt),t.startNotifications());wt.addEventListener("gattserverdisconnected",St)}(),!!wt?.gatt?.connected}catch(t){console.error(t)}}function St(t){const e=t.target;console.log(e.name,"disconnected"),wt=null,_t.disconnected()}customElements.define("demo-view",class extends tt{static get properties(){return{_deviceConnected:{type:Boolean},_graph:{type:Object},data:{type:Array},bpm:{type:Number},sats:{type:Number},bar:{type:Number},beep:{type:Number}}}constructor(){super(),this._deviceConnected=!1,this._graph={},this.data=[],this.bpm=null,this.sats=null,this.bar=0,this.beep=.3}firstUpdated(){this._canvas()}drawLine(t,e,i){const s=this._ctx,n=2*t,r=n+2,o=150-i;return 0===e||(s.clearRect(n,0,t,150),s.beginPath(),s.moveTo(n,e),s.lineTo(r,o),s.lineWidth=2,s.strokeStyle=this.sats<98?"#f44336":"#2196f3",s.stroke(),s.closePath()),o}async _canvas(){const t=this.shadowRoot.querySelector("canvas");this._ctx=t.getContext("2d")}disconnected(){this._graph={},this.data=[],this.bpm=null,this.sats=null,this.bar=0,this.beep=.3}async _toggleConnection(t){this._deviceConnected=await xt(),this._deviceConnected&&async function(t=!1){if(!1 in navigator)return;let e=await navigator.wakeLock.request("screen");console.log("screen will stay awake for 5 minutes"),e.addEventListener("release",(()=>console.log("screen wake lock was released"))),window.setTimeout((()=>{e.release(),e=null}),3e5)}()}render(){const t=null!==this.sats&&this.sats<98,e=null!==this.bpm&&this.bpm<50||this.bpm>80,i=t||e,s={alarm:i,animated:i,shake:i,sats:t,bpm:e};return i?ot("alarm"):ot("alarm",!1),R`
      <section class="controls">
        <button @click="${this._toggleConnection}">
          ${this._deviceConnected?"Disconnect":"Connect"}
        </button>
      </section>
      <section class="container vitals ${st(s)}">
        <figure class="green">
          <section class="bpm">
            <figcaption>HR
                <svg style="opacity: ${this.beep}" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </figcaption>
            <div>${this.bpm}</div>
          </section>
        </figure>
        <figure class="blue">
          <progress max="15" value="${this.bar}">${this.bar}</progress>
          <section class="sats">
            <figcaption>SpO2</figcaption>
            <div>${this.sats}</div>
          </section>
          <canvas width="600" height="150"></canvas>
        </figure>
      </section>
      <section class="container">
        <main>
          <div>Time</div>
          <div>SpO2</div>
          <div>HR</div>
          ${this.data.map((t=>R`
            <div>${t[0]}</div>
            <div>${t[1]}</div>
            <div>${t[2]}</div>
          `))}
        </main>
      </section>
    `}static get styles(){return[r`
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          background-color: #000;
        }
        textarea:focus,
        button:focus,
        select:focus,
        input:focus {
          outline: none;
        }
        textarea,
        button,
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          border: 0;
        }
        button {
          display: block;
          text-align: left;
          color: inherit;
          background-color: transparent;
          padding: 0px;
          line-height: 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        summary {
          -webkit-tap-highlight-color: transparent;
        }
        section {
          width: 100%;
        }
        section.container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          height: calc(100vh - 80px);
          width: 100%;
          max-width: 500px;
          color: #fff;
        }
        .controls {
          color: #fff;
          width: 100%;
          position: sticky;
          top: 0;
          height: 60px;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vitals figure {
          flex: 1 1 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #000;
          transition: color 0.5s ease;
        }
        progress {
          display: block;
          width: 80%;
          align-self: flex-start;
        }
        progress::-webkit-progress-bar {
          background-color: #272727;
        }
        progress::-webkit-progress-value {
          background-color: #2196f3;
          transition: width 0.1s linear;
        }
        progress[value] {
          height: 5px;
          -webkit-appearance: none;
        }
        figure {
          text-align: center;
          margin: 0;
        }
        figure div {
          font-size: 15vh;
          line-height: 15vh;
        }
        figcaption {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        figcaption svg {
          transition: opacity 0.2s;
        }
        svg {
          fill: #F44336;
          margin: 0px 10px;
        }
        main {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 10px 100px;
          padding: 20px;
          justify-content: center;
          overflow: hidden;
          max-height: 80vh;
          align-content: flex-start;
          text-align: center;
        }
        button {
          padding: 5px 12px;
          border: 2px solid #673AB7;
          border-radius: 1rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          font-weight: 500;
          color: #D1C4E9;
          background-color: #000;
        }
        .bar {
          padding: 0px 3px;
          background-color: ;
          transition: height 0.3s linear;
          border-radius: 0.3em;
        }
        .graph {
          width: 100%;
          height: 150px;
          display: flex;
          align-items: flex-end;
        }
        .indicator {
          height: 100px;
        }
        .bar-narrow {
          width: 1%;
          background-color: #2196f3;
          box-shadow: 0px 0px 4px #2196f3;
        }
        .metric-group {
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .metric-group div.fig {
          display: inline-block;
          font-size: 0.7rem;
          line-height: 1.3em;
          margin: 10px 0px;
          padding: 0px 15px;
          text-align: center;
        }
        .metric-group span {
          font-size: 0.8rem;
        }
        .metric-group figure {
          margin: 0;
          width: 100%;
          font-size: 4rem;
          line-height: 5rem;
          min-width: 100px;
        }
        .green {
          color: #4caf50;
          align-items: center;
        }
        .blue {
          color: #2196f3;
          padding-bottom: 90px;
        }
        .alarm.bpm figure.green,
        .alarm.sats figure.blue {
          color: #f44336 !important;
        }
        canvas {
          width: calc(100% - 40px);
          margin: 0px 10px;
        }
        .animated {
          animation-duration: 1.5s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
        }
        @-webkit-keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        @keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        .shake {
          -webkit-animation-name: shake;
          animation-name: shake;
        }
      `]}});
//# sourceMappingURL=main.js.map
