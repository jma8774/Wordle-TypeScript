(this.webpackJsonpwordle=this.webpackJsonpwordle||[]).push([[0],{16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),o=n(10),u=n.n(o),a=(n(16),n(11)),s=n(2),i=n(8),l=n.n(i),b=n(6),d=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=Object(r.useState)(t),c=Object(s.a)(n,2),o=c[0],u=c[1],a=function(e){u([].concat(Object(b.a)(o),[e]))},i=function(e){u(o.filter((function(t,n){return n!==e})))},l=function(e,t){e<0||e>=o.length||u((function(n){return[].concat(Object(b.a)(n.slice(0,e)),[t],Object(b.a)(n.slice(e+1,n.length)))}))},d=function(){return 0===o.length},j=function(){return u([])};return{data:o,setData:u,useArray:e,push:a,remove:i,update:l,reset:j,isEmpty:d}},j=n(5),f=n(9),h=function(){for(var e={},t="a".charCodeAt(0),n=t;n<t+26;n++)e[String.fromCharCode(n)]="init";return e},v=function(e,t){Object(r.useEffect)((function(){console.log(e,t)}),[e,t])},p=function(){for(var e=[],t=0;t<6;t++){e.push([]);for(var n=0;n<5;n++)e[t].push({ch:"_",color:"never"})}return e},O=function(e,t){return e+Math.floor(Math.random()*(t-e+1))},g=function(){console.log("render useGame");var e=Object(r.useState)(0),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),u=Object(s.a)(o,2),i=u[0],b=u[1],g=function(){var e=Object(r.useState)(h()),t=Object(s.a)(e,2),n=t[0],c=t[1],o=function(e,t){n[e]!==t&&c((function(n){return Object(f.a)(Object(f.a)({},n),{},Object(j.a)({},e,t))}))};return{alphabet:n,updateNever:function(e){void 0!==(null===n||void 0===n?void 0:n[e])&&"never"!==(null===n||void 0===n?void 0:n[e])&&"almost"!==(null===n||void 0===n?void 0:n[e])&&"success"!==(null===n||void 0===n?void 0:n[e])&&o(e,"never")},updateAlmost:function(e){void 0!==(null===n||void 0===n?void 0:n[e])&&"almost"!==(null===n||void 0===n?void 0:n[e])&&"success"!==(null===n||void 0===n?void 0:n[e])&&o(e,"almost")},updateSuccess:function(e){void 0!==(null===n||void 0===n?void 0:n[e])&&"success"!==(null===n||void 0===n?void 0:n[e])&&o(e,"success")},reset:function(){c(h())}}}(),m=d(p()),x=Object(r.useState)("ongoing"),w=Object(s.a)(x,2),S=w[0],y=w[1],C=Object(r.useRef)([]),k=Object(r.useRef)(new Set);v("history: ",m.data),v("alphabet: ",g.alphabet),Object(r.useEffect)((function(){var e=function(e){return fetch("".concat("/Wordle-TypeScript","/").concat(e)).then((function(e){return e.text()})).then((function(e){return e.split(/\r?\n/)}))},t=function(){var t=Object(a.a)(l.a.mark((function t(){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("answers.txt");case 2:return n=t.sent,t.next=5,e("words.txt");case 5:r=t.sent,C.current=n,k.current=new Set(r.concat(n));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t().then((function(){var e=O(0,C.current.length);b(C.current[e])}))}),[]);var F=function(e){for(var t=[],n=new Set(i),r=0;r<e.length;r++){var c=e[r];c===i[r]?(t.push({ch:c,color:"success"}),g.updateSuccess(c)):n.has(c)?(t.push({ch:c,color:"almost"}),g.updateAlmost(c)):(t.push({ch:c,color:"never"}),g.updateNever(c))}return t};return{row:n,wordle:i,history:m,alphabet:g,status:S,newGame:function(){console.log("started new game");var e=O(0,C.current.length);b(C.current[e]),c(0),m.setData(p()),g.reset(),y("ongoing")},submitGuess:function(e){k.current.has(e)&&"ongoing"===S&&(m.update(n,F(e)),c(n+1),e===i?y("win"):n+1===6&&y("lose"))}}},m=n(0),x={init:"black",success:"green",almost:"orange",never:"grey"},w=function(e,t){return e.pair.ch===t.pair.ch&&e.pair.color===t.pair.color},S=function(e){var t=e.pair;return Object(m.jsx)("span",{style:{color:x[t.color]},children:t.ch})},y=c.a.memo(S,w),C=function(e){var t=e.guesses;return console.log("render guesses"),Object(m.jsx)(m.Fragment,{children:t.map((function(e,t){return Object(m.jsxs)("div",{children:["guess #".concat(t+1,": "),e.map((function(e,t){return Object(m.jsx)(y,{pair:e},"".concat(e.ch).concat(t))}))]},t)}))})},k=c.a.memo(C),F=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m"]],G=function(e){var t=e.alphabet;return console.log("render keyboard"),Object(m.jsx)(m.Fragment,{children:F.map((function(e,n){return Object(m.jsx)("div",{children:e.map((function(e){return Object(m.jsx)(y,{pair:{ch:e.toUpperCase(),color:t[e]}},e)}))},n)}))})},A=c.a.memo(G),D=c.a.memo((function(e){var t=e.handleSubmit,n=Object(r.useState)(""),c=Object(s.a)(n,2),o=c[0],u=c[1];return Object(m.jsxs)("form",{onSubmit:function(e){t(e,o)},children:[Object(m.jsx)("input",{onChange:function(e){return u(e.target.value)},value:o}),Object(m.jsx)("button",{children:" guess "})]})})),E=function(){console.log("render app");var e=g(),t=e.row,n=e.wordle,r=e.history,c=e.alphabet,o=e.status,u=e.newGame,a=e.submitGuess;return Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{children:Object(m.jsx)("strong",{children:" WIP \ud83d\ude02 "})}),"status: ".concat(o),Object(m.jsx)("br",{}),"guesses: ".concat(t),Object(m.jsx)("br",{}),"wordle: ".concat(n),Object(m.jsx)("br",{}),Object(m.jsx)("button",{onClick:u,children:" restart "}),Object(m.jsx)("br",{}),Object(m.jsx)(D,{handleSubmit:function(e,t){e.preventDefault(),a(t)}}),Object(m.jsx)("br",{}),Object(m.jsx)(k,{guesses:r.data}),Object(m.jsx)("br",{}),Object(m.jsx)(A,{alphabet:c.alphabet})]})},I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,o=t.getLCP,u=t.getTTFB;n(e),r(e),c(e),o(e),u(e)}))};u.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(E,{})}),document.getElementById("root")),I()}},[[19,1,2]]]);
//# sourceMappingURL=main.27b14621.chunk.js.map