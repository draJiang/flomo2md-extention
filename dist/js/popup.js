(()=>{"use strict";var e,t,n,r={61383:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(8081),o=n.n(r),i=n(23645),l=n.n(i)()(o());l.push([e.id,"@tailwind base;\n@tailwind components;\n@tailwind utilities;",""]);const a=l},44722:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var r=n(93379),o=n.n(r),i=n(7795),l=n.n(i),a=n(90569),s=n.n(a),c=n(3565),d=n.n(c),u=n(19216),f=n.n(u),p=n(44589),v=n.n(p),g=n(61383),m={};m.styleTagTransform=v(),m.setAttributes=d(),m.insert=s().bind(null,"head"),m.domAPI=l(),m.insertStyleElement=f(),o()(g.Z,m);const w=g.Z&&g.Z.locals?g.Z.locals:void 0},6092:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.IconLink=t.Input=t.Divider=t.Button=void 0;const l=i(n(85701));t.Button=l.default.button`

  width:${e=>"link"===e.type?"auto":"300px"};
  height:${e=>"link"===e.type?"auto":"48px"};
  
  flex-shrink: 0;
  border-radius: 14px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.8px;
  text-transform: uppercase;

  &:active {
    opacity: 1.0;
  }

  &:hover {
    opacity: 0.9;
  }

  ${e=>"primary"===e.type&&l.css`
    color: white;
    border: 0;
    background: #30D07A;
    // box-shadow: 0px 4px 0px 0px #1899D6;
  `}

  ${e=>"second"===e.type&&l.css`
    color: #30D07A;
    border: 1px solid #30D07A;
    background: #FFF;
    // box-shadow: 0px 2px 0px 0px #E5E5E5;
  `}

  ${e=>"link"===e.type&&l.css`
    text-decoration: none;
    color: #30D07A;
    background: transparent;
    border: none;
    box-shadow: none;
  `}

  ${e=>e.disable&&l.css`
  
    pointer-events: none;
    opacity: 0.5;
  
`}

  ${e=>e.style}
  
`,t.Divider=l.default.hr`
  color: rgb(190 190 190);
  width:100%;
  margin:20px,0;

  ${e=>e.style}

`,t.Input=l.default.input`
  
  border-radius: 16px;
  border: 2px solid #E5E5E5;
  background: #F7F7F7;
  display: flex;
  width: 300px;
  height: 49px;
  padding: 15.758px 19.8px 14.242px 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  &:focus-visible {
    border-color:red;
  }

  ${e=>e.style}

`,t.IconLink=l.default.a`

  color:rgb(107 114 128);

  &:hover {
      color:rgb(17 24 39);
  }

`},97363:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=l(n(93150)),s=i(n(67294)),c=n(6092);t.default=e=>{const[t,n]=(0,s.useState)(!1),[r,o]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){const t=e[0].url;console.log(t),t.indexOf("https://v.flomoapp.com/")>-1&&o(!0)}))}),[]),s.default.createElement("div",{style:{marginTop:"10px"}},r?s.default.createElement(c.Button,{type:"primary",disable:t,onClick:()=>{n(!0),a.default.tabs.query({active:!0,currentWindow:!0}).then((t=>{var n;const r=t[0];let o=null!==(n=r.id)&&void 0!==n?n:-1;r&&void 0!==r.id&&a.default.tabs.sendMessage(o,{type:"flomo2md",verified:e.verified})}))}},t?"加载完成后将自动下载":"导出"):s.default.createElement(c.Button,{type:"primary",disable:t,onClick:()=>{window.open("https://v.flomoapp.com/mine")}},"去 flomo 中操作"))}},87071:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function l(e){try{s(r.next(e))}catch(e){i(e)}}function a(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((r=r.apply(e,t||[])).next())}))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DefaultPopup=void 0;const s=a(n(93150)),c=i(n(67294)),d=a(n(73935)),u=n(93980),f=a(n(97363)),p=n(6092);n(44722),n(1759),t.DefaultPopup=()=>{const[e,t]=(0,c.useState)(null),n=(0,c.useRef)(null),[r,o]=(0,c.useState)("");(0,c.useRef)([]),(0,c.useEffect)((()=>{(0,u.getSettings)().then((e=>l(void 0,void 0,void 0,(function*(){console.log(e),o(e.newLicenseKey)})))),(0,u.getUserInfo)().then((e=>{t(e.verified)}))}),[]);return c.default.createElement(c.default.Fragment,null,c.default.createElement("div",{id:"DefaultPopup",style:{width:"400px",padding:"20px",fontFamily:"din-round,sans-serif",display:"flex",flexDirection:"column",alignItems:"center"}},c.default.createElement("div",{style:{margin:"20px 4px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}},c.default.createElement("div",{style:{marginBottom:"4px",opacity:"0.85",fontSize:"0.9rem"}},e?c.default.createElement("span",null,"导出时将自动滚动页面加载笔记，请暂停操作页面"):c.default.createElement("span",null,"未激活仅支持导出 20 条 Memo")),c.default.createElement(f.default,{verified:e})),c.default.createElement(p.Divider,null),c.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},c.default.createElement("form",{onSubmit:e=>l(void 0,void 0,void 0,(function*(){if(e.preventDefault(),n.current){const e=n.current.value;s.default.storage.sync.set({newLicenseKey:e}).then((e=>{})),new Promise(((e,n)=>{t(null),(0,u.getUserInfo)().then((n=>{t(n.verified),e(n)}))}))}})),style:{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"20px"}},c.default.createElement("div",{style:{display:"flex",alignItems:"baseline"}},c.default.createElement(p.Input,{placeholder:"请输入激活码",type:"password",ref:n,value:r,onChange:e=>{o(e.target.value)}}),c.default.createElement("span",{style:{position:"relative",width:0,right:"30px",height:"47px",backgroundColor:"#F7F7F7",textAlign:"center",lineHeight:"47px"}},null===e?"⌛":e?"✅":"❌")),c.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},c.default.createElement(p.Button,{type:"second",style:{marginBottom:"20px"}},"激活"),c.default.createElement(p.Button,{type:"link",style:{marginBottom:"20px"},onClick:()=>window.open("https://jiang.lemonsqueezy.com/checkout/buy/c4574683-821d-4a8f-9ec0-f3dff3a1d01d")},"获取激活码"))))))},d.default.render(c.default.createElement(c.default.StrictMode,null,c.default.createElement(t.DefaultPopup,null)),document.getElementById("root"))},93980:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function l(e){try{s(r.next(e))}catch(e){i(e)}}function a(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getUserInfo=t.getSettings=void 0;const i=o(n(93150));t.getSettings=function(){return r(this,void 0,void 0,(function*(){return yield i.default.storage.sync.get({newLicenseKey:""})}))},t.getUserInfo=()=>new Promise(((e,t)=>{i.default.storage.sync.get({newLicenseKey:"",verified:{key:"",verified:!1}}).then((n=>r(void 0,void 0,void 0,(function*(){i.default.runtime.lastError&&t(chrome.runtime.lastError);let o=!1;if(n.newLicenseKey&&(o=n.verified.verified,console.log(n),console.log(!n.verified.verified&&n.newLicenseKey===n.verified.key),n.newLicenseKey!==n.verified.key)){const e="https://6r4atckmdr.us.aircode.run/index",t={Authorization:"Bearer "+n.newLicenseKey,"Content-Type":"application/json"};yield fetch(e,{headers:t}).then((e=>r(void 0,void 0,void 0,(function*(){yield e.json().then((e=>{o=e.verified,console.log(o),i.default.storage.sync.set({verified:{key:n.newLicenseKey,verified:o}})}))}))))}e({verified:o})}))))}))},32204:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%272%27 fill=%27%23fff%27/%3e%3c/svg%3e"},79609:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%2386b7fe%27/%3e%3c/svg%3e"},42469:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e"},17486:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e"},80991:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%28255, 255, 255, 0.25%29%27/%3e%3c/svg%3e"},54144:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e"},16254:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z%27/%3e%3c/svg%3e"},35321:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23052c65%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},23460:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},31281:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%236ea8fe%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},25647:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z%27/%3e%3c/svg%3e"},81692:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},96770:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},46711:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23dee2e6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},78931:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27M6 10h8%27/%3e%3c/svg%3e"},46199:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e"},62956:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},32221:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%2833, 37, 41, 0.75%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},45122:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%23198754%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e"}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,exports:{}};return r[e].call(n.exports,n,n.exports,i),n.exports}i.m=r,e=[],i.O=(t,n,r,o)=>{if(!n){var l=1/0;for(d=0;d<e.length;d++){for(var[n,r,o]=e[d],a=!0,s=0;s<n.length;s++)(!1&o||l>=o)&&Object.keys(i.O).every((e=>i.O[e](n[s])))?n.splice(s--,1):(a=!1,o<l&&(l=o));if(a){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,r,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var l={};t=t||[null,n({}),n([]),n(n)];for(var a=2&r&&e;"object"==typeof a&&!~t.indexOf(a);a=n(a))Object.getOwnPropertyNames(a).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,i.d(o,l),o},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.j=42,(()=>{i.b=document.baseURI||self.location.href;var e={42:0};i.O.j=t=>0===e[t];var t=(t,n)=>{var r,o,[l,a,s]=n,c=0;if(l.some((t=>0!==e[t]))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);if(s)var d=s(i)}for(t&&t(n);c<l.length;c++)o=l[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},n=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),i.nc=void 0;var l=i.O(void 0,[736],(()=>i(87071)));l=i.O(l)})();