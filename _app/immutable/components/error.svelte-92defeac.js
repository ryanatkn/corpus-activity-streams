import{S as B,i as C,n as F,j as v,q as k,s as j,e as q,k as g,l as E,r as $,f as p,c as R,a as u,F as P,u as S,B as w,L as H}from"../chunks/index-4e601e09.js";import{s as L}from"../chunks/singletons-a98eb777.js";const O=()=>{const t=L,r={page:{subscribe:t.page.subscribe},navigating:{subscribe:t.navigating.subscribe},updated:t.updated};return Object.defineProperties(r,{preloading:{get(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:t.navigating.subscribe}},enumerable:!1},session:{get(){return A(),{}},enumerable:!1}}),r},z={subscribe(t){return O().page.subscribe(t)}};function A(){throw new Error("stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")}function N(t){let r,a=t[0].error.frame+"",o;return{c(){r=v("pre"),o=k(a)},l(s){r=g(s,"PRE",{});var i=E(r);o=$(i,a),i.forEach(p)},m(s,i){u(s,r,i),P(r,o)},p(s,i){i&1&&a!==(a=s[0].error.frame+"")&&S(o,a)},d(s){s&&p(r)}}}function y(t){let r,a=t[0].error.stack+"",o;return{c(){r=v("pre"),o=k(a)},l(s){r=g(s,"PRE",{});var i=E(r);o=$(i,a),i.forEach(p)},m(s,i){u(s,r,i),P(r,o)},p(s,i){i&1&&a!==(a=s[0].error.stack+"")&&S(o,a)},d(s){s&&p(r)}}}function D(t){let r,a=t[0].status+"",o,s,i,b=t[0].error.message+"",_,d,c,m,l=t[0].error.frame&&N(t),n=t[0].error.stack&&y(t);return{c(){r=v("h1"),o=k(a),s=j(),i=v("pre"),_=k(b),d=j(),l&&l.c(),c=j(),n&&n.c(),m=q()},l(e){r=g(e,"H1",{});var f=E(r);o=$(f,a),f.forEach(p),s=R(e),i=g(e,"PRE",{});var h=E(i);_=$(h,b),h.forEach(p),d=R(e),l&&l.l(e),c=R(e),n&&n.l(e),m=q()},m(e,f){u(e,r,f),P(r,o),u(e,s,f),u(e,i,f),P(i,_),u(e,d,f),l&&l.m(e,f),u(e,c,f),n&&n.m(e,f),u(e,m,f)},p(e,[f]){f&1&&a!==(a=e[0].status+"")&&S(o,a),f&1&&b!==(b=e[0].error.message+"")&&S(_,b),e[0].error.frame?l?l.p(e,f):(l=N(e),l.c(),l.m(c.parentNode,c)):l&&(l.d(1),l=null),e[0].error.stack?n?n.p(e,f):(n=y(e),n.c(),n.m(m.parentNode,m)):n&&(n.d(1),n=null)},i:w,o:w,d(e){e&&p(r),e&&p(s),e&&p(i),e&&p(d),l&&l.d(e),e&&p(c),n&&n.d(e),e&&p(m)}}}function G(t,r,a){let o;return H(t,z,s=>a(0,o=s)),[o]}class K extends B{constructor(r){super(),C(this,r,G,D,F,{})}}export{K as default};
