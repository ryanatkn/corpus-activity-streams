function k(){}const ft=t=>t;function _t(t,e){for(const n in e)t[n]=e[n];return t}function Y(t){return t()}function Q(){return Object.create(null)}function N(t){t.forEach(Y)}function I(t){return typeof t=="function"}function Ht(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Ft(t,e){return t!=t?e==e:t!==e}function dt(t){return Object.keys(t).length===0}function ht(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Wt(t,e,n){t.$$.on_destroy.push(ht(e,n))}function Gt(t,e,n,r){if(t){const s=Z(t,e,n,r);return t[0](s)}}function Z(t,e,n,r){return t[1]&&r?_t(n.ctx.slice(),t[1](r(e))):n.ctx}function It(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],i=Math.max(e.dirty.length,s.length);for(let l=0;l<i;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function Jt(t,e,n,r,s,c){if(s){const i=Z(e,n,r,c);t.p(i,s)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function Qt(t,e,n){return t.set(n),e}const tt=typeof window<"u";let mt=tt?()=>window.performance.now():()=>Date.now(),J=tt?t=>requestAnimationFrame(t):k;const E=new Set;function et(t){E.forEach(e=>{e.c(t)||(E.delete(e),e.f())}),E.size!==0&&J(et)}function pt(t){let e;return E.size===0&&J(et),{promise:new Promise(n=>{E.add(e={c:t,f:n})}),abort(){E.delete(e)}}}let z=!1;function yt(){z=!0}function gt(){z=!1}function wt(t,e,n,r){for(;t<e;){const s=t+(e-t>>1);n(s)<=r?t=s+1:e=s}return t}function $t(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const d=e[u];d.claim_order!==void 0&&o.push(d)}e=o}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,d=(s>0&&e[n[s]].claim_order<=u?s+1:wt(1,s,a=>e[n[a]].claim_order,u))-1;r[o]=n[d]+1;const f=d+1;n[f]=o,s=Math.max(f,s)}const c=[],i=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=r[o-1]){for(c.push(e[o-1]);l>=o;l--)i.push(e[l]);l--}for(;l>=0;l--)i.push(e[l]);c.reverse(),i.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<i.length;o++){for(;u<c.length&&i[o].claim_order>=c[u].claim_order;)u++;const d=u<c.length?c[u]:null;t.insertBefore(i[o],d)}}function xt(t,e){t.appendChild(e)}function nt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function bt(t){const e=st("style");return vt(nt(t),e),e.sheet}function vt(t,e){return xt(t.head||t,e),e.sheet}function Et(t,e){if(z){for($t(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ut(t,e,n){z&&!n?Et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function it(t){t.parentNode.removeChild(t)}function st(t){return document.createElement(t)}function kt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function K(t){return document.createTextNode(t)}function Vt(){return K(" ")}function Xt(){return K("")}function Yt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function Zt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Nt(t){return Array.from(t.childNodes)}function At(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function rt(t,e,n,r,s=!1){At(t);const c=(()=>{for(let i=t.claim_info.last_index;i<t.length;i++){const l=t[i];if(e(l)){const o=n(l);return o===void 0?t.splice(i,1):t[i]=o,s||(t.claim_info.last_index=i),l}}for(let i=t.claim_info.last_index-1;i>=0;i--){const l=t[i];if(e(l)){const o=n(l);return o===void 0?t.splice(i,1):t[i]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=i,l}}return r()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function ot(t,e,n,r){return rt(t,s=>s.nodeName===e,s=>{const c=[];for(let i=0;i<s.attributes.length;i++){const l=s.attributes[i];n[l.name]||c.push(l.name)}c.forEach(i=>s.removeAttribute(i))},()=>r(e))}function te(t,e,n){return ot(t,e,n,st)}function ee(t,e,n){return ot(t,e,n,kt)}function St(t,e){return rt(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>K(e),!0)}function ne(t){return St(t," ")}function ie(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function se(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function re(t,e,n){t.classList[n?"add":"remove"](e)}function Ct(t,e,{bubbles:n=!1,cancelable:r=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,r,e),s}function oe(t,e){const n=[];let r=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(r-=1,n.push(s)):c===`HEAD_${t}_START`&&(r+=1,n.push(s))}else r>0&&n.push(s);return n}function ce(t,e){return new t(e)}const R=new Map;let L=0;function jt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Mt(t,e){const n={stylesheet:bt(e),rules:{}};return R.set(t,n),n}function U(t,e,n,r,s,c,i,l=0){const o=16.666/r;let u=`{
`;for(let p=0;p<=1;p+=o){const g=e+(n-e)*c(p);u+=p*100+`%{${i(g,1-g)}}
`}const d=u+`100% {${i(n,1-n)}}
}`,f=`__svelte_${jt(d)}_${l}`,a=nt(t),{stylesheet:h,rules:_}=R.get(a)||Mt(a,t);_[f]||(_[f]=!0,h.insertRule(`@keyframes ${f} ${d}`,h.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${r}ms linear ${s}ms 1 both`,L+=1,f}function Tt(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-r.length;s&&(t.style.animation=r.join(", "),L-=s,L||Dt())}function Dt(){J(()=>{L||(R.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&it(e)}),R.clear())})}let j;function C(t){j=t}function B(){if(!j)throw new Error("Function called outside component initialization");return j}function le(t){B().$$.on_mount.push(t)}function ue(t){B().$$.after_update.push(t)}function ae(t,e){return B().$$.context.set(t,e),e}function fe(t){return B().$$.context.get(t)}const S=[],V=[],O=[],X=[],ct=Promise.resolve();let G=!1;function lt(){G||(G=!0,ct.then(ut))}function _e(){return lt(),ct}function q(t){O.push(t)}const F=new Set;let D=0;function ut(){const t=j;do{for(;D<S.length;){const e=S[D];D++,C(e),Ot(e.$$)}for(C(null),S.length=0,D=0;V.length;)V.pop()();for(let e=0;e<O.length;e+=1){const n=O[e];F.has(n)||(F.add(n),n())}O.length=0}while(S.length);for(;X.length;)X.pop()();G=!1,F.clear(),C(t)}function Ot(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}let A;function Pt(){return A||(A=Promise.resolve(),A.then(()=>{A=null})),A}function W(t,e,n){t.dispatchEvent(Ct(`${e?"intro":"outro"}${n}`))}const P=new Set;let x;function de(){x={r:0,c:[],p:x}}function he(){x.r||N(x.c),x=x.p}function at(t,e){t&&t.i&&(P.delete(t),t.i(e))}function Rt(t,e,n,r){if(t&&t.o){if(P.has(t))return;P.add(t),x.c.push(()=>{P.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const Lt={duration:0};function me(t,e,n,r){let s=e(t,n),c=r?0:1,i=null,l=null,o=null;function u(){o&&Tt(t,o)}function d(a,h){const _=a.b-c;return h*=Math.abs(_),{a:c,b:a.b,d:_,duration:h,start:a.start,end:a.start+h,group:a.group}}function f(a){const{delay:h=0,duration:_=300,easing:y=ft,tick:p=k,css:g}=s||Lt,b={start:mt()+h,b:a};a||(b.group=x,x.r+=1),i||l?l=b:(g&&(u(),o=U(t,c,a,_,h,y,g)),a&&p(0,1),i=d(b,_),q(()=>W(t,a,"start")),pt(v=>{if(l&&v>l.start&&(i=d(l,_),l=null,W(t,i.b,"start"),g&&(u(),o=U(t,c,i.b,i.duration,0,y,s.css))),i){if(v>=i.end)p(c=i.b,1-c),W(t,i.b,"end"),l||(i.b?u():--i.group.r||N(i.group.c)),i=null;else if(v>=i.start){const M=v-i.start;c=i.a+i.d*y(M/i.duration),p(c,1-c)}}return!!(i||l)}))}return{run(a){I(s)?Pt().then(()=>{s=s(),f(a)}):f(a)},end(){u(),i=l=null}}}const pe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ye(t,e){Rt(t,1,1,()=>{e.delete(t.key)})}function ge(t,e,n,r,s,c,i,l,o,u,d,f){let a=t.length,h=c.length,_=a;const y={};for(;_--;)y[t[_].key]=_;const p=[],g=new Map,b=new Map;for(_=h;_--;){const m=f(s,c,_),w=n(m);let $=i.get(w);$?r&&$.p(m,e):($=u(w,m),$.c()),g.set(w,p[_]=$),w in y&&b.set(w,Math.abs(_-y[w]))}const v=new Set,M=new Set;function H(m){at(m,1),m.m(l,d),i.set(m.key,m),d=m.first,h--}for(;a&&h;){const m=p[h-1],w=t[a-1],$=m.key,T=w.key;m===w?(d=m.first,a--,h--):g.has(T)?!i.has($)||v.has($)?H(m):M.has(T)?a--:b.get($)>b.get(T)?(M.add($),H(m)):(v.add(T),a--):(o(w,i),a--)}for(;a--;){const m=t[a];g.has(m.key)||o(m,i)}for(;h;)H(p[h-1]);return p}function we(t,e){const n={},r={},s={$$scope:1};let c=t.length;for(;c--;){const i=t[c],l=e[c];if(l){for(const o in i)o in l||(r[o]=1);for(const o in l)s[o]||(n[o]=l[o],s[o]=1);t[c]=l}else for(const o in i)s[o]=1}for(const i in r)i in n||(n[i]=void 0);return n}function $e(t){return typeof t=="object"&&t!==null?t:{}}function xe(t){t&&t.c()}function be(t,e){t&&t.l(e)}function qt(t,e,n,r){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),r||q(()=>{const i=t.$$.on_mount.map(Y).filter(I);t.$$.on_destroy?t.$$.on_destroy.push(...i):N(i),t.$$.on_mount=[]}),c.forEach(q)}function zt(t,e){const n=t.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Bt(t,e){t.$$.dirty[0]===-1&&(S.push(t),lt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ve(t,e,n,r,s,c,i,l=[-1]){const o=j;C(t);const u=t.$$={fragment:null,ctx:[],props:c,update:k,not_equal:s,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:Q(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};i&&i(u.root);let d=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...h)=>{const _=h.length?h[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=_)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](_),d&&Bt(t,f)),a}):[],u.update(),d=!0,N(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){yt();const f=Nt(e.target);u.fragment&&u.fragment.l(f),f.forEach(it)}else u.fragment&&u.fragment.c();e.intro&&at(t.$$.fragment),qt(t,e.target,e.anchor,e.customElement),gt(),ut()}C(o)}class Ee{$destroy(){zt(this,1),this.$destroy=k}$on(e,n){if(!I(n))return k;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ee as $,_e as A,k as B,Ht as C,Gt as D,oe as E,Et as F,Yt as G,Jt as H,Kt as I,It as J,pe as K,Wt as L,re as M,N,Qt as O,ge as P,ye as Q,ae as R,Ee as S,fe as T,we as U,$e as V,_t as W,q as X,me as Y,I as Z,kt as _,Ut as a,he as b,ne as c,at as d,Xt as e,it as f,de as g,ue as h,ve as i,st as j,te as k,Nt as l,Zt as m,Ft as n,le as o,se as p,K as q,St as r,Vt as s,Rt as t,ie as u,ce as v,xe as w,be as x,qt as y,zt as z};
