function x(){}const z=t=>t;function k(t,n){for(const e in n)t[e]=n[e];return t}function w(t){return t()}function M(){return Object.create(null)}function j(t){t.forEach(w)}function A(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n}function P(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const o of n)o(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(v(n,e))}function U(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function D(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const i=[],_=Math.max(n.dirty.length,r.length);for(let u=0;u<_;u+=1)i[u]=n.dirty[u]|r[u];return i}return n.dirty|r}return n.dirty}function G(t,n,e,o,r,i){if(r){const _=y(n,e,o,i);t.p(_,r)}}function H(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function I(t,n,e){return t.set(e),n}let l;function d(t){l=t}function f(){if(!l)throw new Error("Function called outside component initialization");return l}function J(t){f().$$.on_mount.push(t)}function K(t){f().$$.after_update.push(t)}function L(t,n){return f().$$.context.set(t,n),n}function N(t){return f().$$.context.get(t)}const a=[],g=[];let s=[];const b=[],m=Promise.resolve();let p=!1;function E(){p||(p=!0,m.then(C))}function Q(){return E(),m}function q(t){s.push(t)}const h=new Set;let c=0;function C(){if(c!==0)return;const t=l;do{try{for(;c<a.length;){const n=a[c];c++,d(n),O(n.$$)}}catch(n){throw a.length=0,c=0,n}for(d(null),a.length=0,c=0;g.length;)g.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];h.has(e)||(h.add(e),e())}s.length=0}while(a.length);for(;b.length;)b.pop()();p=!1,h.clear(),d(t)}function O(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function R(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{w as A,a as B,E as C,K as a,g as b,U as c,D as d,x as e,S as f,H as g,L as h,N as i,k as j,q as k,A as l,B as m,F as n,J as o,z as p,M as q,j as r,I as s,Q as t,G as u,C as v,P as w,R as x,l as y,d as z};