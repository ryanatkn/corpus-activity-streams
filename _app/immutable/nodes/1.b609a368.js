import{n as S,e as f,f as x}from"../chunks/scheduler.78c05e17.js";import{S as j,i as q,g as _,m as d,s as y,h as g,j as h,n as v,f as u,c as z,a as m,z as $,o as E}from"../chunks/index.acf3060e.js";import{d as C}from"../chunks/singletons.15719b07.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function k(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=_("h1"),o=d(r),n=y(),i=_("p"),l=d(c)},l(e){t=g(e,"H1",{});var a=h(t);o=v(a,r),a.forEach(u),n=z(e),i=g(e,"P",{});var p=h(i);l=v(p,c),p.forEach(u)},m(e,a){m(e,t,a),$(t,o),m(e,n,a),m(e,i,a),$(i,l)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&E(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&E(l,c)},i:f,o:f,d(e){e&&(u(t),u(n),u(i))}}}function w(s,t,r){let o;return x(s,P,n=>r(0,o=n)),[o]}let F=class extends j{constructor(t){super(),q(this,t,w,k,S,{})}};export{F as component};
