(function(u,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(u=typeof globalThis<"u"?globalThis:u||self,g(u.IhhorCard={}))})(this,function(u){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const g=globalThis,I=g.ShadowRoot&&(g.ShadyCSS===void 0||g.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),G=new WeakMap;let Y=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(I&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=G.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&G.set(e,t))}return t}toString(){return this.cssText}};const ut=r=>new Y(typeof r=="string"?r:r+"",void 0,D),ft=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new Y(e,r,D)},gt=(r,t)=>{if(I)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=g.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},J=I?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ut(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_t,defineProperty:mt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:bt,getOwnPropertySymbols:vt,getPrototypeOf:yt}=Object,_=globalThis,Q=_.trustedTypes,At=Q?Q.emptyScript:"",L=_.reactiveElementPolyfillSupport,C=(r,t)=>r,N={toAttribute(r,t){switch(t){case Boolean:r=r?At:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},B=(r,t)=>!_t(r,t),X={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=X){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&mt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=$t(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const h=s==null?void 0:s.call(this);o==null||o.call(this,n),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??X}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,i=[...bt(e),...vt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(J(s))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:N).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var o,n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:N;this._$Em=s;const d=a.fromAttribute(e,h.type);this[s]=d??((n=this._$Ej)==null?void 0:n.get(s))??d,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const o=this.constructor,n=this[t];if(i??(i=o.getPropertyOptions(t)),!((i.hasChanged??B)(n,e)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,L==null||L({ReactiveElement:E}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,z=k.trustedTypes,tt=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,et="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+m,xt=`<${it}>`,b=document,P=()=>b.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",V=Array.isArray,wt=r=>V(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",q=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,rt=/>/g,v=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,nt=/"/g,at=/^(?:script|style|textarea|title)$/i,Et=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=Et(1),A=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ht=new WeakMap,x=b.createTreeWalker(b,129);function ct(r,t){if(!V(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}const St=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",n=M;for(let h=0;h<e;h++){const a=r[h];let d,p,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,p=n.exec(a),p!==null);)f=n.lastIndex,n===M?p[1]==="!--"?n=st:p[1]!==void 0?n=rt:p[2]!==void 0?(at.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=v):p[3]!==void 0&&(n=v):n===v?p[0]===">"?(n=s??M,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?v:p[3]==='"'?nt:ot):n===nt||n===ot?n=v:n===st||n===rt?n=M:(n=v,s=void 0);const $=n===v&&r[h+1].startsWith("/>")?" ":"";o+=n===M?a+xt:c>=0?(i.push(d),a.slice(0,c)+et+a.slice(c)+m+$):a+m+(c===-2?h:$)}return[ct(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const h=t.length-1,a=this.parts,[d,p]=St(t,e);if(this.el=U.createElement(d,i),x.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=x.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(et)){const f=p[n++],$=s.getAttribute(c).split(m),j=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:j[2],strings:$,ctor:j[1]==="."?kt:j[1]==="?"?Pt:j[1]==="@"?Tt:R}),s.removeAttribute(c)}else c.startsWith(m)&&(a.push({type:6,index:o}),s.removeAttribute(c));if(at.test(s.tagName)){const c=s.textContent.split(m),f=c.length-1;if(f>0){s.textContent=z?z.emptyScript:"";for(let $=0;$<f;$++)s.append(c[$],P()),x.nextNode(),a.push({type:2,index:++o});s.append(c[f],P())}}}else if(s.nodeType===8)if(s.data===it)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(m,c+1))!==-1;)a.push({type:7,index:o}),c+=m.length-1}o++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}}function S(r,t,e=r,i){var n,h;if(t===A)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const o=T(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=S(r,s._$AS(r,t.values),s,i)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??b).importNode(e,!0);x.currentNode=s;let o=x.nextNode(),n=0,h=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Mt(o,this,t)),this._$AV.push(d),a=i[++h]}n!==(a==null?void 0:a.index)&&(o=x.nextNode(),n++)}return x.currentNode=b,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),T(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(ct(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const n=new Ct(s,this),h=n.u(this.options);n.p(e),this.T(h),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new U(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new O(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=S(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=S(this,h[i+a],e,a),d===A&&(d=this._$AH[a]),n||(n=!T(d)||d!==this._$AH[a]),d===l?t=l:t!==l&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class kt extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class Pt extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class Tt extends R{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===A)return;const i=this._$AH,s=t===l&&i!==l||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const W=k.litHtmlPolyfillSupport;W==null||W(U,O),(k.litHtmlVersions??(k.litHtmlVersions=[])).push("3.3.1");const Ut=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new O(t.insertBefore(P(),o),o,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis;let H=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}};H._$litElement$=!0,H.finalized=!0,(pt=w.litElementHydrateSupport)==null||pt.call(w,{LitElement:H});const K=w.litElementPolyfillSupport;K==null||K({LitElement:H}),(w.litElementVersions??(w.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:B},Nt=(r=Ht,t,e)=>{const{kind:i,metadata:s}=e;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),i==="accessor"){const{name:n}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,r)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(i==="setter"){const{name:n}=e;return function(h){const a=this[n];t.call(this,h),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+i)};function dt(r){return(t,e)=>typeof e=="object"?Nt(r,t,e):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zt(r){return dt({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt={ATTRIBUTE:1},jt=r=>(...t)=>({_$litDirective$:r,values:t});let It=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt="important",Dt=" !"+lt,Z=jt(class extends It{constructor(r){var t;if(super(r),r.type!==Rt.ATTRIBUTE||r.name!=="style"||((t=r.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{const i=r[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[t]){const{style:e}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(const i in t){const s=t[i];if(s!=null){this.ft.add(i);const o=typeof s=="string"&&s.endsWith(Dt);i.includes("-")||o?e.setProperty(i,o?s.slice(0,-11):s,o?lt:""):e[i]=s}}return A}});var Lt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,F=(r,t,e,i)=>{for(var s=i>1?void 0:i?Bt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Lt(t,e,s),s};u.IhhorCard=class extends H{static getStubConfig(){return{type:"custom:ihhor-card",entity:"climate.sunny_bedroom",name:"Спальня Сонячна",modes:["off","on","auto","prog"],mode_type:"preset"}}setConfig(t){if(!t)throw new Error("Config is required");if(!t.entity||typeof t.entity!="string")throw new Error("Необхідно вказати entity (наприклад climate.bedroom).");this._config={...t,type:"custom:ihhor-card"}}getCardSize(){return 3}_getEntity(){var t;if(!(!this._config||!this.hass))return(t=this.hass.states)==null?void 0:t[this._config.entity]}_getCurrentTemp(t){const e=t.attributes.current_temperature??t.attributes.temperature;return typeof e=="number"?e:void 0}_getTargetTemp(t){const{attributes:e}=t,i=e.temperature??e.target_temp_high??e.target_temp_low??e.target_temperature??e.setpoint_temperature??e.current_temperature;return typeof i=="number"?i:void 0}_getHumidity(t){const e=t.attributes.current_humidity??t.attributes.humidity;return typeof e=="number"?e:void 0}_localizeAction(t){const e=t.attributes.hvac_action,i=t.attributes.hvac_mode,s=t.state,o={heating:"Нагрів",cooling:"Охолодження",idle:"Очікування",off:"Вимкнено",heat:"Нагрів",cool:"Охолодження",auto:"Авто",dry:"Осушення",fan_only:"Вентиляція"};return typeof e=="string"&&o[e]?o[e]:typeof i=="string"&&o[i]?o[i]:o[s]??s}_thermoIcon(t){return y`
      <svg
        class="thermo-svg ${t?"heating":""}"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Thermometer"
      >
        <defs>
          <linearGradient id="thermo-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.95" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M34 38.5V14a2 2 0 1 0-4 0v24.5a8.5 8.5 0 1 0 4 0Z"
          fill="url(#thermo-glow)"
        />
        <path
          d="M30 14a2 2 0 1 1 4 0v24.5a8.5 8.5 0 1 1-4 0Z"
          fill="none"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
        />
        <circle cx="32" cy="47.5" r="6.5" fill="currentColor" />
        <path
          d="M28 24h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.7"
        />
        <path
          d="M28 28h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.55"
        />
        <path
          d="M28 32h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.4"
        />
      </svg>
    `}_modeKind(t){var e;return((e=this._config)==null?void 0:e.mode_type)==="preset"?"preset":Array.isArray(t.attributes.hvac_modes)&&t.attributes.hvac_modes.length?"hvac":Array.isArray(t.attributes.preset_modes)&&t.attributes.preset_modes.length?"preset":"hvac"}_availableModes(t){var n,h;const e=Array.isArray((n=this._config)==null?void 0:n.modes)?(h=this._config)==null?void 0:h.modes:[],s=this._modeKind(t)==="hvac"?"hvac_modes":"preset_modes",o=Array.isArray(t.attributes[s])?t.attributes[s]:[];return e.length?o.length?e.filter(a=>o.includes(a)):e:o}_activeMode(t){if(this._modeKind(t)==="preset"){const s=t.attributes.preset_mode;return typeof s=="string"?s:void 0}const i=t.attributes.hvac_mode;if(typeof i=="string")return i;if(typeof t.state=="string")return t.state}_handleModeChange(t){const e=this._getEntity();if(!e||!this.hass||!this._config)return;const i=this._modeKind(e),s=this._activeMode(e);if(t!==s){if(i==="preset"){this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:t});return}this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}}_modeLabel(t){return t?t.replace(/_/g," ").toUpperCase():""}_formatTemp(t){return typeof t!="number"?"--.-":t.toFixed(1)}_handleAdjust(t){const e=this._getEntity();if(!e||!this.hass||!this._config)return;const i=typeof this._config.step=="number"?this._config.step:typeof e.attributes.target_temp_step=="number"?e.attributes.target_temp_step:.1,s=this._getTargetTemp(e);if(typeof s!="number")return;const o=t==="up"?s+i:s-i;this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:Number(o.toFixed(2))})}render(){if(!this._config)return l;const t=this._config.name??this._config.entity,e={"--ihhor-card-bg":this._config.background??"rgb(235, 226, 203)","--ihhor-border-color":this._config.border_color??"rgb(98, 99, 100)","--ihhor-accent":this._config.accent_color??"rgb(216, 116, 116)","--ihhor-text":this._config.text_color??"#000000","--ihhor-panel-bg":"rgb(233, 244, 251)","--ihhor-panel-border":"rgb(169, 157, 132)"};if(!this.hass)return y`
        <ha-card class="card" style=${Z(e)}>
          <div class="frame">
            <div class="title-bar">
              <div class="title">${t}</div>
            </div>
            <div class="panel placeholder">
              <div class="placeholder-text">Очікуємо Home Assistant</div>
            </div>
          </div>
        </ha-card>
      `;const i=this._getEntity();if(!i)return y`
        <ha-card class="card" style=${Z(e)}>
          <div class="frame">
            <div class="title-bar">
              <div class="title">${t}</div>
            </div>
            <div class="panel placeholder">
              <div class="placeholder-text">Entity не знайдено: ${this._config.entity}</div>
            </div>
          </div>
        </ha-card>
      `;const s=this._getCurrentTemp(i),o=this._getTargetTemp(i),n=this._getHumidity(i),h=this._availableModes(i),a=this._activeMode(i),p=this._localizeAction(i).toLowerCase().includes("гр")||i.state==="heat"||i.attributes.hvac_action==="heating";return y`
      <ha-card class="card" style=${Z(e)}>
        <div class="frame">
          <div class="title-bar">
            <div class="title">${t}</div>
          </div>

          <div class="panel">
            <div class="thermo-column">
              <button class="arrow-btn" aria-label="Збільшити температуру" @click=${()=>this._handleAdjust("up")}>&uarr;</button>
              <div class="thermo">
                ${this._thermoIcon(p)}
              </div>
              <button class="arrow-btn" aria-label="Зменшити температуру" @click=${()=>this._handleAdjust("down")}>&darr;</button>
            </div>
            <div class="current-block">
              <div class="current">${this._formatTemp(s)}</div>
              ${typeof n=="number"?y`<div class="humidity-inline">Вологість: ${n}%</div>`:l}
            </div>
            <div class="target-block">
              <div class="unit">°C</div>
              <div class="target">${this._formatTemp(o)}</div>
            </div>
          </div>

          ${h.length?y`
                <div class="modes">
                  ${h.map(c=>y`
                        <button
                          class="mode-btn ${c===a?"active":""}"
                          @click=${()=>this._handleModeChange(c)}
                          ?disabled=${c===a}
                        >
                          ${this._modeLabel(c)}
                        </button>
                      `)}
                  </div>
                `:l}
        </div>
      </ha-card>
    `}},u.IhhorCard.styles=ft`
    :host {
      display: block;
      font-family: Verdana, Geneva, sans-serif;
      --ha-card-border: none;
      --ha-card-border-radius: 0;
      --ha-card-background: transparent;
      --ha-card-box-shadow: none;
    }

    ha-card.card {
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      color: var(--ihhor-text, #000);
      overflow: visible;
      opacity: 1;
      width: 100%;
    }

    .frame {
      background: var(--ihhor-card-bg, #ebe2cb);
      border: 1px solid var(--ihhor-border-color, #626364);
      border-radius: 5px;
      box-shadow: none;
      padding: 6px 7px 7px;
      color: var(--ihhor-text, #000);
      overflow: hidden;
      opacity: 0.95;
      width: 100%;
      min-width: 220px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .title-bar {
      height: 29px;
      position: relative;
      margin: 0 0 4px;
    }

    .title {
      position: absolute;
      top: 2px;
      left: 8px;
      font-size: 20px;
      font-weight: 600;
      color: var(--ihhor-text, #000);
      background: var(--ihhor-card-bg, #ebe2cb);
      padding-right: 6px;
      line-height: 1.2;
    }

    .panel {
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 70px 1fr 60px;
      align-items: center;
      gap: 10px 10px;
      background: var(--ihhor-panel-bg, #e9f4fb);
      border: 1px solid var(--ihhor-panel-border, #a99d84);
      border-radius: 5px;
      padding: 10px;
      min-height: 88px;
      box-sizing: border-box;
    }

    .panel.placeholder {
      justify-content: center;
      text-align: center;
      color: rgba(0, 0, 0, 0.7);
    }

    .placeholder-text {
      font-size: 14px;
    }

    .thermo-column {
      display: grid;
      grid-template-rows: auto 1fr auto;
      align-items: center;
      justify-items: center;
      gap: 6px;
      height: 100%;
    }

    .thermo {
      width: 56px;
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--ihhor-border-color, #626364);
      background: linear-gradient(180deg, #f6f7fb 0%, #e3e7ed 100%);
      color: #2c2f44;
      font-size: 16px;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
    }

    .arrow-btn:hover {
      background: linear-gradient(180deg, #ffffff 0%, #dfe6ef 100%);
    }

    .arrow-btn:active {
      transform: translateY(1px);
    }

    .thermo-svg {
      width: 100%;
      height: 100%;
      color: #2c2f44;
      transition: color 0.2s ease, transform 0.2s ease, filter 0.2s ease;
    }

    .thermo-svg.heating {
      color: #d87474;
      transform: translateY(-1px);
      filter: drop-shadow(0 0 3px rgba(216, 116, 116, 0.4));
      animation: pulse 1.1s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.9;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.9;
      }
    }

    .current-block {
      text-align: center;
      color: #2c2f44;
    }

    .current {
      font-size: 56px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -1px;
    }

    .humidity-inline {
      margin-top: 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
    }

    .target-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .unit {
      font-size: 20px;
      color: #2c2f44;
      line-height: 1;
      background: var(--ihhor-panel-bg, #e9f4fb);
      border-radius: 3px;
      padding: 2px 4px 0;
      box-sizing: border-box;
    }

    .target {
      font-size: 20px;
      font-weight: 600;
      color: var(--ihhor-accent, rgb(216, 116, 116));
      background: var(--ihhor-panel-bg, #e9f4fb);
      border-radius: 3px;
      padding: 0 4px;
      border: 1px solid transparent;
      min-width: 48px;
      text-align: right;
      line-height: 1.1;
    }

    .modes {
      width: 225px;
      margin: 6px auto 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(54px, 1fr));
      gap: 2px;
    }

    .mode-btn {
      background: linear-gradient(180deg, #f6f7fb 0%, #e3e7ed 100%);
      border: 1px solid #b9bfc8;
      border-radius: 3px;
      padding: 4px 4px;
      font-size: 12px;
      color: #2c2f44;
      cursor: pointer;
      transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
      height: 26px;
      box-sizing: border-box;
    }

    .mode-btn:hover:not(:disabled) {
      background: linear-gradient(180deg, #ffffff 0%, #dfe6ef 100%);
    }

    .mode-btn:active:not(:disabled) {
      transform: translateY(1px);
    }

    .mode-btn.active {
      background: #dfe8f3;
      border-color: #8091ad;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      cursor: default;
    }

    .mode-btn:disabled {
      opacity: 0.85;
    }

    @media (max-width: 420px) {
      ha-card.card {
        width: 100%;
      }

      .frame {
        width: 100%;
      }

      .panel {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
        width: 100%;
      }

      .target-block {
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
  `,F([dt({attribute:!1})],u.IhhorCard.prototype,"hass",2),F([zt()],u.IhhorCard.prototype,"_config",2),u.IhhorCard=F([Ot("ihhor-card")],u.IhhorCard),Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=ihhor-card.js.map
