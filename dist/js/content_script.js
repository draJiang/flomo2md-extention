/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/ContentScript/style.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/ContentScript/style.css ***!
  \*********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".TooltipContent {\n    border-radius: 4px;\n    padding: 10px 15px;\n    font-size: 15px;\n    line-height: 1;\n    color: var(--violet-11);\n    background-color: white;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    user-select: none;\n    animation-duration: 400ms;\n    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);\n    will-change: transform, opacity;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='top'] {\n    animation-name: slideDownAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='right'] {\n    animation-name: slideLeftAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='bottom'] {\n    animation-name: slideUpAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='left'] {\n    animation-name: slideRightAndFade;\n  }\n  \n  .TooltipArrow {\n    fill: white;\n  }\n  \n  .IconButton {\n    font-family: inherit;\n    border-radius: 100%;\n    height: 35px;\n    width: 35px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--violet-11);\n    background-color: white;\n    box-shadow: 0 2px 10px var(--black-a7);\n  }\n  .IconButton:hover {\n    background-color: var(--violet-3);\n  }\n  .IconButton:focus {\n    box-shadow: 0 0 0 2px black;\n  }\n  \n  @keyframes slideUpAndFade {\n    from {\n      opacity: 0;\n      transform: translateY(2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideRightAndFade {\n    from {\n      opacity: 0;\n      transform: translateX(-2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes slideDownAndFade {\n    from {\n      opacity: 0;\n      transform: translateY(-2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideLeftAndFade {\n    from {\n      opacity: 0;\n      transform: translateX(2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n\n  .ToastViewport {\n    --viewport-padding: 25px;\n    position: fixed;\n    bottom: 0;\n    right: 0;\n    display: flex;\n    flex-direction: column;\n    padding: var(--viewport-padding);\n    gap: 10px;\n    width: 390px;\n    max-width: 100vw;\n    margin: 0;\n    list-style: none;\n    z-index: 2147483647;\n    outline: none;\n  }\n  \n  .ToastRoot {\n    background-color: white;\n    border-radius: 6px;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    padding: 15px;\n    display: grid;\n    grid-template-areas: 'title action' 'description action';\n    grid-template-columns: auto max-content;\n    column-gap: 15px;\n    align-items: center;\n  }\n  .ToastRoot[data-state='open'] {\n    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);\n  }\n  .ToastRoot[data-state='closed'] {\n    animation: hide 100ms ease-in;\n  }\n  .ToastRoot[data-swipe='move'] {\n    transform: translateX(var(--radix-toast-swipe-move-x));\n  }\n  .ToastRoot[data-swipe='cancel'] {\n    transform: translateX(0);\n    transition: transform 200ms ease-out;\n  }\n  .ToastRoot[data-swipe='end'] {\n    animation: swipeOut 100ms ease-out;\n  }\n  \n  @keyframes hide {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideIn {\n    from {\n      transform: translateX(calc(100% + var(--viewport-padding)));\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes swipeOut {\n    from {\n      transform: translateX(var(--radix-toast-swipe-end-x));\n    }\n    to {\n      transform: translateX(calc(100% + var(--viewport-padding)));\n    }\n  }\n  \n  .ToastTitle {\n    grid-area: title;\n    margin-bottom: 5px;\n    font-weight: 500;\n    color: var(--slate-12);\n    font-size: 15px;\n  }\n  \n  .ToastDescription {\n    grid-area: description;\n    margin: 0;\n    color: var(--slate-11);\n    font-size: 13px;\n    line-height: 1.3;\n  }\n  \n  .ToastAction {\n    grid-area: action;\n  }", "",{"version":3,"sources":["webpack://./src/ContentScript/style.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,eAAe;IACf,cAAc;IACd,uBAAuB;IACvB,uBAAuB;IACvB,gGAAgG;IAChG,iBAAiB;IACjB,yBAAyB;IACzB,wDAAwD;IACxD,+BAA+B;EACjC;EACA;IACE,gCAAgC;EAClC;EACA;IACE,gCAAgC;EAClC;EACA;IACE,8BAA8B;EAChC;EACA;IACE,iCAAiC;EACnC;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,oBAAoB;IACpB,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,oBAAoB;IACpB,mBAAmB;IACnB,uBAAuB;IACvB,uBAAuB;IACvB,uBAAuB;IACvB,sCAAsC;EACxC;EACA;IACE,iCAAiC;EACnC;EACA;IACE,2BAA2B;EAC7B;;EAEA;IACE;MACE,UAAU;MACV,0BAA0B;IAC5B;IACA;MACE,UAAU;MACV,wBAAwB;IAC1B;EACF;;EAEA;IACE;MACE,UAAU;MACV,2BAA2B;IAC7B;IACA;MACE,UAAU;MACV,wBAAwB;IAC1B;EACF;;EAEA;IACE;MACE,UAAU;MACV,2BAA2B;IAC7B;IACA;MACE,UAAU;MACV,wBAAwB;IAC1B;EACF;;EAEA;IACE;MACE,UAAU;MACV,0BAA0B;IAC5B;IACA;MACE,UAAU;MACV,wBAAwB;IAC1B;EACF;;;EAGA;IACE,wBAAwB;IACxB,eAAe;IACf,SAAS;IACT,QAAQ;IACR,aAAa;IACb,sBAAsB;IACtB,gCAAgC;IAChC,SAAS;IACT,YAAY;IACZ,gBAAgB;IAChB,SAAS;IACT,gBAAgB;IAChB,mBAAmB;IACnB,aAAa;EACf;;EAEA;IACE,uBAAuB;IACvB,kBAAkB;IAClB,gGAAgG;IAChG,aAAa;IACb,aAAa;IACb,wDAAwD;IACxD,uCAAuC;IACvC,gBAAgB;IAChB,mBAAmB;EACrB;EACA;IACE,sDAAsD;EACxD;EACA;IACE,6BAA6B;EAC/B;EACA;IACE,sDAAsD;EACxD;EACA;IACE,wBAAwB;IACxB,oCAAoC;EACtC;EACA;IACE,kCAAkC;EACpC;;EAEA;IACE;MACE,UAAU;IACZ;IACA;MACE,UAAU;IACZ;EACF;;EAEA;IACE;MACE,2DAA2D;IAC7D;IACA;MACE,wBAAwB;IAC1B;EACF;;EAEA;IACE;MACE,qDAAqD;IACvD;IACA;MACE,2DAA2D;IAC7D;EACF;;EAEA;IACE,gBAAgB;IAChB,kBAAkB;IAClB,gBAAgB;IAChB,sBAAsB;IACtB,eAAe;EACjB;;EAEA;IACE,sBAAsB;IACtB,SAAS;IACT,sBAAsB;IACtB,eAAe;IACf,gBAAgB;EAClB;;EAEA;IACE,iBAAiB;EACnB","sourcesContent":[".TooltipContent {\n    border-radius: 4px;\n    padding: 10px 15px;\n    font-size: 15px;\n    line-height: 1;\n    color: var(--violet-11);\n    background-color: white;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    user-select: none;\n    animation-duration: 400ms;\n    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);\n    will-change: transform, opacity;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='top'] {\n    animation-name: slideDownAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='right'] {\n    animation-name: slideLeftAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='bottom'] {\n    animation-name: slideUpAndFade;\n  }\n  .TooltipContent[data-state='delayed-open'][data-side='left'] {\n    animation-name: slideRightAndFade;\n  }\n  \n  .TooltipArrow {\n    fill: white;\n  }\n  \n  .IconButton {\n    font-family: inherit;\n    border-radius: 100%;\n    height: 35px;\n    width: 35px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--violet-11);\n    background-color: white;\n    box-shadow: 0 2px 10px var(--black-a7);\n  }\n  .IconButton:hover {\n    background-color: var(--violet-3);\n  }\n  .IconButton:focus {\n    box-shadow: 0 0 0 2px black;\n  }\n  \n  @keyframes slideUpAndFade {\n    from {\n      opacity: 0;\n      transform: translateY(2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideRightAndFade {\n    from {\n      opacity: 0;\n      transform: translateX(-2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes slideDownAndFade {\n    from {\n      opacity: 0;\n      transform: translateY(-2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideLeftAndFade {\n    from {\n      opacity: 0;\n      transform: translateX(2px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n\n  .ToastViewport {\n    --viewport-padding: 25px;\n    position: fixed;\n    bottom: 0;\n    right: 0;\n    display: flex;\n    flex-direction: column;\n    padding: var(--viewport-padding);\n    gap: 10px;\n    width: 390px;\n    max-width: 100vw;\n    margin: 0;\n    list-style: none;\n    z-index: 2147483647;\n    outline: none;\n  }\n  \n  .ToastRoot {\n    background-color: white;\n    border-radius: 6px;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    padding: 15px;\n    display: grid;\n    grid-template-areas: 'title action' 'description action';\n    grid-template-columns: auto max-content;\n    column-gap: 15px;\n    align-items: center;\n  }\n  .ToastRoot[data-state='open'] {\n    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);\n  }\n  .ToastRoot[data-state='closed'] {\n    animation: hide 100ms ease-in;\n  }\n  .ToastRoot[data-swipe='move'] {\n    transform: translateX(var(--radix-toast-swipe-move-x));\n  }\n  .ToastRoot[data-swipe='cancel'] {\n    transform: translateX(0);\n    transition: transform 200ms ease-out;\n  }\n  .ToastRoot[data-swipe='end'] {\n    animation: swipeOut 100ms ease-out;\n  }\n  \n  @keyframes hide {\n    from {\n      opacity: 1;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideIn {\n    from {\n      transform: translateX(calc(100% + var(--viewport-padding)));\n    }\n    to {\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes swipeOut {\n    from {\n      transform: translateX(var(--radix-toast-swipe-end-x));\n    }\n    to {\n      transform: translateX(calc(100% + var(--viewport-padding)));\n    }\n  }\n  \n  .ToastTitle {\n    grid-area: title;\n    margin-bottom: 5px;\n    font-weight: 500;\n    color: var(--slate-12);\n    font-size: 15px;\n  }\n  \n  .ToastDescription {\n    grid-area: description;\n    margin: 0;\n    color: var(--slate-11);\n    font-size: 13px;\n    line-height: 1.3;\n  }\n  \n  .ToastAction {\n    grid-area: action;\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ContentScript/style.css":
/*!*************************************!*\
  !*** ./src/ContentScript/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/ContentScript/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/ContentScript/Action.tsx":
/*!**************************************!*\
  !*** ./src/ContentScript/Action.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Action = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const Tooltip = __importStar(__webpack_require__(/*! @radix-ui/react-tooltip */ "./node_modules/@radix-ui/react-tooltip/dist/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const CheckBox_1 = __webpack_require__(/*! ./CheckBox */ "./src/ContentScript/CheckBox.tsx");
const index_1 = __webpack_require__(/*! ./index */ "./src/ContentScript/index.tsx");
__webpack_require__(/*! ./style.css */ "./src/ContentScript/style.css");
const ButtonBox = styled_components_1.default.div `
    &:hover {
        background: var(--bgGreen);
    }
`;
function Action(props) {
    const [actionActive, setActionActive] = (0, react_1.useState)(false);
    const [selectMemo, setSelectMemo] = (0, react_1.useState)([]);
    const observer = (0, react_1.useRef)(null);
    const selectMemoLength = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (selectMemo.length > 1 && !props.verified) {
            inputNotAllowed();
            antd_1.message.info('激活 Pro 可复制更多笔记🚀');
        }
        else {
            const actionDoms = document.querySelectorAll('div.__flomo2mdAction input');
            actionDoms.forEach(node => {
                node.style.pointerEvents = '';
                node.style.cursor = '';
                node.style.opacity = '1';
            });
        }
        selectMemoLength.current = selectMemo.length;
    }, [selectMemo]);
    const inputNotAllowed = () => {
        const actionDoms = document.querySelectorAll('div.__flomo2mdAction input');
        actionDoms.forEach(node => {
            // 查询当前 node 下的所有 input 元素
            if (node && !node.checked) {
                node.style.pointerEvents = 'none';
                node.style.cursor = 'not-allowed';
                node.style.opacity = '0.3';
            }
        });
    };
    function handleDomChange(needToListen) {
        if (needToListen) {
            observer.current = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            // 确保这是一个元素节点，并且匹配我们的目标
                            if (node.classList.contains('memo')) {
                                // 在这里进行类型断言以更确切的描述 node 的类型
                                const header = node.querySelector('.header');
                                if (header) {
                                    addCheckbox(header);
                                }
                            }
                        });
                    }
                });
            });
            // 监听 .memos 的变化，通常在滚动加载更多 memo 时触发
            const config = { childList: true, subtree: true };
            const targetNode = document.querySelector('.memos');
            if (targetNode) {
                observer.current.observe(targetNode, config);
            }
        }
        else {
            if (observer.current) {
                observer.current.disconnect();
            }
        }
    }
    // 激活多选
    function handleActionButtonClick() {
        setActionActive(a => true);
        // 在所有 Memo 上添加多选按钮
        document.querySelectorAll('.memo .header').forEach(addCheckbox);
        handleDomChange(true);
    }
    function handleCheckBoxChange(memo, checked) {
        if (checked) {
            // 选中
            setSelectMemo(old => [...old, memo]);
        }
        else {
            // 取消选中
            setSelectMemo(old => old.filter(item => item !== memo));
        }
    }
    function addCheckbox(header) {
        var _a;
        const actionArea = document.createElement('div');
        actionArea.className = '__flomo2mdAction';
        actionArea.style.marginLeft = '14px';
        (_a = header.querySelector('.tools')) === null || _a === void 0 ? void 0 : _a.appendChild(actionArea);
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(CheckBox_1.Checkbox, { selectMemoCount: selectMemoLength.current, inputNotAllowed: inputNotAllowed, verified: props.verified, handleCheckBoxChange: handleCheckBoxChange })), actionArea);
    }
    function removeCheckbox() {
        // 卸载在 header 中渲染的组件
        const actionDoms = document.querySelectorAll('div.__flomo2mdAction');
        actionDoms.forEach(node => node.remove());
        setActionActive(false);
        // 停止监听 DOM 变化
        handleDomChange(false);
        // 清空已选择的 Memo
        setSelectMemo([]);
    }
    const actionBoxStyle = {
        color: '#9d9d9d',
        height: '48px',
        borderRadius: '48px',
        position: 'fixed',
        bottom: '180px',
        right: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--noticeBg)',
        boxShadow: '0px 0px 40px 0px var(--bigShadow)',
        zIndex: '999'
    };
    const buttonStyle = {
        color: '#9d9d9d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        padding: '4px',
        cursor: 'pointer'
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, actionActive ?
            react_1.default.createElement("div", { style: Object.assign(Object.assign({}, actionBoxStyle), { padding: '0 10px' }) },
                react_1.default.createElement(Tooltip.Provider, null,
                    react_1.default.createElement(Tooltip.Root, { delayDuration: 500 },
                        react_1.default.createElement(Tooltip.Trigger, { asChild: true },
                            react_1.default.createElement("button", { style: Object.assign({}, buttonStyle), onClick: () => __awaiter(this, void 0, void 0, function* () {
                                    const memos = yield (0, index_1.setMemos)(selectMemo, false);
                                    (0, index_1.handleCopyMarkdown)(memos, true);
                                    // 关闭多选状态
                                    removeCheckbox();
                                }) },
                                react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                        react_1.default.createElement(Tooltip.Portal, null,
                            react_1.default.createElement(Tooltip.Content, { className: "TooltipContent", sideOffset: 15 },
                                "\u590D\u5236",
                                react_1.default.createElement(Tooltip.Arrow, { className: "TooltipArrow" }))))),
                react_1.default.createElement(Tooltip.Provider, null,
                    react_1.default.createElement(Tooltip.Root, { delayDuration: 500 },
                        react_1.default.createElement(Tooltip.Trigger, { asChild: true },
                            react_1.default.createElement("button", { style: buttonStyle, onClick: removeCheckbox },
                                react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    react_1.default.createElement("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })))),
                        react_1.default.createElement(Tooltip.Portal, null,
                            react_1.default.createElement(Tooltip.Content, { className: "TooltipContent", sideOffset: 15 },
                                "\u53D6\u6D88",
                                react_1.default.createElement(Tooltip.Arrow, { className: "TooltipArrow" }))))))
            :
                react_1.default.createElement(Tooltip.Provider, null,
                    react_1.default.createElement(Tooltip.Root, { delayDuration: 500 },
                        react_1.default.createElement(Tooltip.Trigger, { asChild: true },
                            react_1.default.createElement(ButtonBox, { style: Object.assign(Object.assign({}, actionBoxStyle), { width: '48px', cursor: 'pointer' }) },
                                react_1.default.createElement("button", { style: buttonStyle, onClick: handleActionButtonClick },
                                    react_1.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        react_1.default.createElement("path", { d: "M3 3H12V12H3L3 3ZM2 3C2 2.44771 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44771 13 2 12.5523 2 12V3ZM10.3498 5.51105C10.506 5.28337 10.4481 4.97212 10.2204 4.81587C9.99275 4.65961 9.6815 4.71751 9.52525 4.94519L6.64048 9.14857L5.19733 7.40889C5.02102 7.19635 4.7058 7.16699 4.49327 7.34329C4.28073 7.5196 4.25137 7.83482 4.42767 8.04735L6.2934 10.2964C6.39348 10.4171 6.54437 10.4838 6.70097 10.4767C6.85757 10.4695 7.00177 10.3894 7.09047 10.2601L10.3498 5.51105Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }))))),
                        react_1.default.createElement(Tooltip.Portal, null,
                            react_1.default.createElement(Tooltip.Content, { className: "TooltipContent", sideOffset: 5 },
                                "\u591A\u9009",
                                react_1.default.createElement(Tooltip.Arrow, { className: "TooltipArrow" }))))))));
}
exports.Action = Action;


/***/ }),

/***/ "./src/ContentScript/CheckBox.tsx":
/*!****************************************!*\
  !*** ./src/ContentScript/CheckBox.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checkbox = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function Checkbox(props) {
    (0, react_1.useEffect)(() => {
        if (props.selectMemoCount > 1 && !props.verified) {
            props.inputNotAllowed();
        }
    });
    function handleCheckBoxChange(event) {
        const target = event.target;
        // 获取 .memo
        let parent = target.parentElement;
        while (parent != null && !parent.classList.contains('memo')) {
            parent = parent.parentElement;
        }
        if (parent != null) {
            // 存在 .memo
            // 将 memo 的 DOM 传递给 Action，用于后续复制、导出
            props.handleCheckBoxChange(parent, target.checked);
        }
        else {
        }
        // if (target.checked) {
        //     console.log('Checkbox is checked');
        // } else {
        //     console.log('Checkbox is unchecked');
        // }
    }
    return (react_1.default.createElement("input", { style: {
        // opacity: props.selectMemoCount > 1 ? '0.3' : '1',
        // cursor: props.selectMemoCount > 1 ? 'not-allowed' : '',
        // pointerEvents: props.selectMemoCount > 1 ? 'none' : undefined
        }, onChange: handleCheckBoxChange, type: "checkbox" }));
}
exports.Checkbox = Checkbox;


/***/ }),

/***/ "./src/ContentScript/index.tsx":
/*!*************************************!*\
  !*** ./src/ContentScript/index.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleCopyMarkdown = exports.setMemos = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
// import htmlToMarkdown from '@wcj/html-to-markdown';
const html_to_md_1 = __importDefault(__webpack_require__(/*! html-to-md */ "./node_modules/html-to-md/dist/index.js"));
const jszip_1 = __importDefault(__webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js"));
const file_saver_1 = __importDefault(__webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js"));
const copy_to_clipboard_1 = __importDefault(__webpack_require__(/*! copy-to-clipboard */ "./node_modules/copy-to-clipboard/index.js"));
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const Action_1 = __webpack_require__(/*! ./Action */ "./src/ContentScript/Action.tsx");
let ANKI_INFO;
let USER_INFO;
// (async () => {
//   // 获取用户信息
//   USER_INFO = await getUserInfo()
//   console.log('USER_INFO:');
//   console.log(USER_INFO);
// })()
// 添加多选复制功能
// 找到 .querybar 下的第一个 .action 元素
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield webextension_polyfill_1.default.runtime.sendMessage({ 'type': 'getUserInfo', 'messages': {}, });
    console.log('userInfo:');
    console.log(userInfo);
    const flomoInput = document.querySelector('div.input');
    const actionDiv = document.createElement('div');
    flomoInput === null || flomoInput === void 0 ? void 0 : flomoInput.after(actionDiv);
    if (actionDiv) {
        react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(Action_1.Action, { verified: userInfo.verified })), actionDiv);
    }
});
webextension_polyfill_1.default.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('content script onMessage:');
        console.log(msg);
        if (msg.type === 'copy' || msg.type === 'export') {
            // 加载全部笔记
            let memos = document.getElementsByClassName('memos')[0];
            if (memos) {
                autoScroll(memos, msg.verified).then(() => __awaiter(this, void 0, void 0, function* () {
                    // 获取所有 Memo 的 DOM
                    const memoEls = Array.from(document.getElementsByClassName('memo'));
                    // 解析笔记
                    let memoList = yield setMemos(memoEls, msg.options.autoRecognizeNoteTitle);
                    if (!msg.verified) {
                        //未激活
                        memoList = memoList.slice(0, 20);
                    }
                    const newMemoListPromises = memoList.map((memo) => __awaiter(this, void 0, void 0, function* () {
                        // 处理笔记中的双链
                        let md = memo.content;
                        md = replaceHref(md, memoList);
                        // 图片信息
                        if (msg.type === 'export') {
                            memo.files.forEach((img, i) => {
                                md += `\n![image](images/${memo.time2}_${i + 1}.png)`;
                            });
                        }
                        if (msg.options.exportTimeInfoValue) {
                            // 创建时间、原始笔记信息
                            md += `\n\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`;
                        }
                        return {
                            id: memo.id,
                            name: memo.name,
                            index: memo.index,
                            time: memo.time,
                            time2: memo.time2,
                            content: md,
                            files: memo.files
                        };
                    }));
                    const newMemoList = yield Promise.all(newMemoListPromises);
                    if (msg.type === 'export') {
                        // 下载笔记
                        createZipFileFromMarkdownStrings(newMemoList, 'flomo2md');
                    }
                    if (msg.type === 'copy') {
                        // 复制笔记
                        (0, exports.handleCopyMarkdown)(newMemoList);
                    }
                }));
            }
        }
    });
});
// 自动滚动列表
function autoScroll(memos, verified) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            memos.scrollTop = memos.scrollHeight;
            if (!verified) {
                // 未激活
                clearInterval(intervalId);
                resolve();
            }
            if (document.querySelector('.end')) {
                // 存在 end，表示已加载完全部，此时清除定时任务并结束 Promsie
                clearInterval(intervalId);
                resolve();
            }
        }, 1500);
    });
}
// 获取笔记
function setMemos(memoEls, autoRecognizeNoteTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取所有 className 为 "memo" 的 div 元素
        // const memoEls = document.getElementsByClassName('memo');
        // 创建一个数组来保存解析后的 memo 对象
        const memos = [];
        // 存储名称列表，避免文件名重复
        let names = [];
        const memosLength = (memoEls.length).toString().length;
        // 遍历每一个 "memo" 元素，获取笔记信息
        for (let i = 0; i < memoEls.length; i++) {
            const memoEl = memoEls[i];
            // 笔记 ID
            const id = memoEl.getAttribute('data-slug') || '';
            // 创建时间
            const timeEl = memoEl.querySelector('.time');
            const time = timeEl ? timeEl.innerText : '';
            // time2 用来作为文件默认标题
            const time2 = time.replace(/\D/g, '');
            // 笔记正文
            const richTextEl = memoEl.querySelector('.richText');
            // 处理笔记链接
            // 克隆 richTextEl 以保留原始元素的状态
            const newRichTextEl = richTextEl.cloneNode(true);
            // 获取克隆后的所有 a 标签
            const links = newRichTextEl.querySelectorAll('a');
            // 遍历所有 a 标签
            links.forEach(link => {
                // 处理 MEMO 链接
                if (link.className === 'inner_memo_link') {
                    link.href = 'https://flomoapp.com/mine/?memo_id=' + link.getAttribute('slug');
                }
            });
            let content = newRichTextEl ? newRichTextEl.innerHTML : '';
            // 转为 md 格式
            content = yield htmlTomd(content);
            // // 是否显示笔记创建时间和原始链接
            // if (showExportTimeInfoValue) {
            //   content += `\n\n[${time}](https://flomoapp.com/mine/?memo_id=${id})`
            // }
            // 处理高亮，将 <mark> 标签替换为 ==
            content = content.replace(/<\/?mark>/g, '==');
            // 处理文件序号
            const thisLength = (i + 1).toString().length;
            let index = '';
            for (let i = 0; i < memosLength - thisLength; i++) {
                index += '0';
            }
            index += (i + 1).toString();
            // 文件名称
            let name = '';
            name = time2 + '_' + index;
            try {
                // 用户设置了需要匹配标题时才会处理
                if (autoRecognizeNoteTitle) {
                    // 处理文件名称
                    const newName = getMemoName(content, names);
                    name = newName ? newName : time2 + '_' + index;
                    // 删除一级标题，避免标题重复
                    // 将输入的字符串以换行符分割为数组
                    let lines = content.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        let line = lines[i].trim();
                        // 检查当前行是否为一级标题
                        if (line.startsWith('# ')) {
                            const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
                            const hasMarkdownLink = markdownLinkRegex.test(line);
                            if (hasMarkdownLink) {
                                // 如果标题中包含链接
                                // 只去除 # 符号，保留标题的内容
                                content = content.replace(line, line.substring(2));
                            }
                            else {
                                // 删除正文中的标题信息，只保留文件名作为标题
                                // 将内容按行分割成数组
                                let contentLines = content.split('\n');
                                // 创建一个新数组，不包含要删除的行
                                contentLines = contentLines.filter((contentLine) => contentLine !== line);
                                // 将新数组拼接回文本形式
                                content = contentLines.join('\n');
                            }
                            break;
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
            names.push(name);
            // 图片
            const filesEl = memoEl.querySelector('.files');
            const filesHTML = filesEl ? filesEl.innerHTML : '';
            const files = getImageDataSourceValues(filesHTML);
            // 将解析后的 "memo" 对象添加到数组中
            memos.push({ id, name, index, time, time2, content, files });
        }
        return memos;
    });
}
exports.setMemos = setMemos;
// 处理笔记中的链接
function replaceHref(md, memos) {
    let newMD = md;
    // 找到 flomo 内部的链接
    const regex = /\[.*?\]\((https:\/\/flomoapp\.com\/mine\/\?memo_id=.*?)\)/g;
    let match;
    const links = [];
    while ((match = regex.exec(md)) !== null) {
        links.push(match[0]);
    }
    links.forEach(link => {
        const urlMatch = link.match(/\((.*?)\)/);
        if (urlMatch && urlMatch[1]) {
            const urlObj = new URL(urlMatch[1]);
            const params = new URLSearchParams(urlObj.search);
            const memoId = params.get('memo_id');
            if (memoId) {
                // 找到 mention 的卡片
                let result = null;
                for (let i = 0; i < memos.length; i++) {
                    if (memos[i].id === memoId) {
                        result = { index: i, memo: memos[i] };
                        break;
                    }
                }
                // 设置 mention 卡片
                if (result) {
                    const title = result.memo.name;
                    newMD = newMD.replace(link, `[MEMO](${title})`);
                }
            }
        }
    });
    return newMD;
}
// 处理笔记标题
function getMemoName(md, names) {
    let haveHeadling = false;
    // 从笔记内容中提取名称信息
    let memoName = null;
    // 将输入的字符串以换行符分割为数组
    let lines = md.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        // 检查当前行是否为一级标题
        if (line.startsWith('# ')) {
            memoName = line.substring(2);
            haveHeadling = true;
            break;
        }
    }
    // 如果没有找到一级标题
    if (!memoName) {
        // 将头几行的文字作为标题
        let lineWithoutTag = '';
        // 逐个查找非空元素，直到找到非空元素或遍历完lines数组为止
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) {
                lineWithoutTag = lines[i].replace(/#\S+/g, '').trim();
                // 如果找到非空元素，则跳出循环
                if (lineWithoutTag) {
                    break;
                }
            }
            if (i > 2) {
                break;
            }
        }
        if (lineWithoutTag) {
            memoName = lineWithoutTag;
        }
    }
    if (memoName) {
        // 去除标题中的出链
        memoName = memoName.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '');
        if (!haveHeadling) {
            // 如果
            // 避免标题过长，截取第一句
            let match = memoName.match(/.+?(，|——|。|？|！)/); // 匹配直到第一个中文逗号、破折号、句号、问号、感叹号出现的所有字符
            if (match) {
                memoName = match[0].slice(0, -1); // 移除收尾的中文逗号、破折号、句号、问号、感叹号
            }
        }
        memoName = memoName.replace(/[<>:"/\\|?*\s]/g, '');
        // 避免 name 重名
        let newName = memoName;
        let count = 0;
        while (true) {
            if (count > 500) {
                // 避免死循环
                return null;
            }
            if (names.indexOf(newName) > -1) {
                // 存在同名的笔记
                newName = memoName + `(${count + 1})`;
                count++;
            }
            else {
                // 不存在同名的笔记
                memoName = newName;
                break;
            }
        }
        if (memoName.trim().length === 0) {
            //名称只存在空格
            return null;
        }
    }
    return memoName;
}
// 获取笔记中的图片
function getImageDataSourceValues(html) {
    // 使用 DOMParser 从 HTML 字符串创建一个新的 Document 对象
    let doc = new DOMParser().parseFromString(html, 'text/html');
    // 获取所有的 img 元素
    let imgElements = doc.getElementsByTagName('img');
    // 创建一个数组，将每个 img 元素的 data-source 属性值放入数组
    let dataSourceValues = Array.from(imgElements).map(function (img) {
        return img.getAttribute('data-source');
    });
    return dataSourceValues;
}
// html 转为 md 格式
const htmlTomd = (htmlString) => __awaiter(void 0, void 0, void 0, function* () {
    let markdownStr = (0, html_to_md_1.default)(htmlString, {
        skipTags: [
            'label',
            'div',
            'html',
            'body',
            'nav',
            'section',
            'footer',
            'main',
            'aside',
            'article',
            'header'
        ]
    });
    // 标签
    markdownStr = markdownStr.replace(/\\#/g, '#');
    // 分隔线
    markdownStr = markdownStr.replace(/\\---/g, '---');
    // 无序列表
    markdownStr = markdownStr.replace(/\\- /g, '- ');
    // 有序列表
    markdownStr = markdownStr.replace(/\\\. /g, '. ');
    // 加粗
    markdownStr = markdownStr.replace(/\\\*\\\*/g, "**");
    // 去除 #Tag 的加粗效果
    markdownStr = markdownStr.replace(/\*\*(#.+?)\*\*/g, "$1");
    return markdownStr;
});
// 下载笔记
const createZipFileFromMarkdownStrings = (memos, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_1.default();
    // 存放所有图片下载任务的数组
    let imagesTasks = [];
    // 遍历每一个 memo
    memos.forEach((memo, i) => {
        // 在 zip 文件中添加一个新的 md 文件
        const content = memo.content;
        zip.file(`${memo.name}.md`, content);
        // 下载图片
        memo.files.forEach((imgUrl, i) => {
            if (imgUrl) {
                const promise = fetch(imgUrl)
                    .then(response => response.blob())
                    .then(imgData => {
                    zip.file(`images/${memo.time2}_${i + 1}.png`, imgData);
                });
                imagesTasks.push(promise);
            }
        });
    });
    // 等待所有图片下载完毕
    yield Promise.all(imagesTasks);
    // 生成 zip 文件并保存到用户设备
    const content = yield zip.generateAsync({ type: 'blob' });
    file_saver_1.default.saveAs(content, filename);
});
// 复制笔记
const handleCopyMarkdown = (memos, showExportTimeInfoValue) => __awaiter(void 0, void 0, void 0, function* () {
    let markdown = '';
    memos.forEach((memo, i) => {
        let content = memo.content;
        // 图片
        memo.files.forEach((imgUrl, i) => {
            if (imgUrl) {
                content += `\n![](${imgUrl})`;
            }
        });
        if (showExportTimeInfoValue) {
            // 创建时间、原始笔记信息
            content += `\n\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`;
        }
        if (i === 0) {
            markdown += `\n\n${content}`;
        }
        else {
            markdown += `\n\n---\n\n${content}`;
        }
    });
    console.log(markdown);
    (0, copy_to_clipboard_1.default)(markdown, { format: 'text' });
    antd_1.message.success('已复制');
});
exports.handleCopyMarkdown = handleCopyMarkdown;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content_script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchrome_extension_typescript_starter"] = self["webpackChunkchrome_extension_typescript_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/ContentScript/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvc3R5bGUuY3NzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvc3R5bGUuY3NzPzYyYWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvQ29udGVudFNjcmlwdC9BY3Rpb24udHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvQ2hlY2tCb3gudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5Ub29sdGlwQ29udGVudCB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxO1xcbiAgICBjb2xvcjogdmFyKC0tdmlvbGV0LTExKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGJveC1zaGFkb3c6IGhzbCgyMDYgMjIlIDclIC8gMzUlKSAwcHggMTBweCAzOHB4IC0xMHB4LCBoc2woMjA2IDIyJSA3JSAvIDIwJSkgMHB4IDEwcHggMjBweCAtMTVweDtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xcbiAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtLCBvcGFjaXR5O1xcbiAgfVxcbiAgLlRvb2x0aXBDb250ZW50W2RhdGEtc3RhdGU9J2RlbGF5ZWQtb3BlbiddW2RhdGEtc2lkZT0ndG9wJ10ge1xcbiAgICBhbmltYXRpb24tbmFtZTogc2xpZGVEb3duQW5kRmFkZTtcXG4gIH1cXG4gIC5Ub29sdGlwQ29udGVudFtkYXRhLXN0YXRlPSdkZWxheWVkLW9wZW4nXVtkYXRhLXNpZGU9J3JpZ2h0J10ge1xcbiAgICBhbmltYXRpb24tbmFtZTogc2xpZGVMZWZ0QW5kRmFkZTtcXG4gIH1cXG4gIC5Ub29sdGlwQ29udGVudFtkYXRhLXN0YXRlPSdkZWxheWVkLW9wZW4nXVtkYXRhLXNpZGU9J2JvdHRvbSddIHtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlVXBBbmRGYWRlO1xcbiAgfVxcbiAgLlRvb2x0aXBDb250ZW50W2RhdGEtc3RhdGU9J2RlbGF5ZWQtb3BlbiddW2RhdGEtc2lkZT0nbGVmdCddIHtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlUmlnaHRBbmRGYWRlO1xcbiAgfVxcbiAgXFxuICAuVG9vbHRpcEFycm93IHtcXG4gICAgZmlsbDogd2hpdGU7XFxuICB9XFxuICBcXG4gIC5JY29uQnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIGhlaWdodDogMzVweDtcXG4gICAgd2lkdGg6IDM1cHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgY29sb3I6IHZhcigtLXZpb2xldC0xMSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3gtc2hhZG93OiAwIDJweCAxMHB4IHZhcigtLWJsYWNrLWE3KTtcXG4gIH1cXG4gIC5JY29uQnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmlvbGV0LTMpO1xcbiAgfVxcbiAgLkljb25CdXR0b246Zm9jdXMge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggYmxhY2s7XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc2xpZGVVcEFuZEZhZGUge1xcbiAgICBmcm9tIHtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlUmlnaHRBbmRGYWRlIHtcXG4gICAgZnJvbSB7XFxuICAgICAgb3BhY2l0eTogMDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTJweCk7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB9XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc2xpZGVEb3duQW5kRmFkZSB7XFxuICAgIGZyb20ge1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlTGVmdEFuZEZhZGUge1xcbiAgICBmcm9tIHtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuXFxuICAuVG9hc3RWaWV3cG9ydCB7XFxuICAgIC0tdmlld3BvcnQtcGFkZGluZzogMjVweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiB2YXIoLS12aWV3cG9ydC1wYWRkaW5nKTtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICB3aWR0aDogMzkwcHg7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgei1pbmRleDogMjE0NzQ4MzY0NztcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gIH1cXG4gIFxcbiAgLlRvYXN0Um9vdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJveC1zaGFkb3c6IGhzbCgyMDYgMjIlIDclIC8gMzUlKSAwcHggMTBweCAzOHB4IC0xMHB4LCBoc2woMjA2IDIyJSA3JSAvIDIwJSkgMHB4IDEwcHggMjBweCAtMTVweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogJ3RpdGxlIGFjdGlvbicgJ2Rlc2NyaXB0aW9uIGFjdGlvbic7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcXG4gICAgY29sdW1uLWdhcDogMTVweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5Ub2FzdFJvb3RbZGF0YS1zdGF0ZT0nb3BlbiddIHtcXG4gICAgYW5pbWF0aW9uOiBzbGlkZUluIDE1MG1zIGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xcbiAgfVxcbiAgLlRvYXN0Um9vdFtkYXRhLXN0YXRlPSdjbG9zZWQnXSB7XFxuICAgIGFuaW1hdGlvbjogaGlkZSAxMDBtcyBlYXNlLWluO1xcbiAgfVxcbiAgLlRvYXN0Um9vdFtkYXRhLXN3aXBlPSdtb3ZlJ10ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0tcmFkaXgtdG9hc3Qtc3dpcGUtbW92ZS14KSk7XFxuICB9XFxuICAuVG9hc3RSb290W2RhdGEtc3dpcGU9J2NhbmNlbCddIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1vdXQ7XFxuICB9XFxuICAuVG9hc3RSb290W2RhdGEtc3dpcGU9J2VuZCddIHtcXG4gICAgYW5pbWF0aW9uOiBzd2lwZU91dCAxMDBtcyBlYXNlLW91dDtcXG4gIH1cXG4gIFxcbiAgQGtleWZyYW1lcyBoaWRlIHtcXG4gICAgZnJvbSB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlSW4ge1xcbiAgICBmcm9tIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygxMDAlICsgdmFyKC0tdmlld3BvcnQtcGFkZGluZykpKTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB9XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc3dpcGVPdXQge1xcbiAgICBmcm9tIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0tcmFkaXgtdG9hc3Qtc3dpcGUtZW5kLXgpKTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoMTAwJSArIHZhcigtLXZpZXdwb3J0LXBhZGRpbmcpKSk7XFxuICAgIH1cXG4gIH1cXG4gIFxcbiAgLlRvYXN0VGl0bGUge1xcbiAgICBncmlkLWFyZWE6IHRpdGxlO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIGNvbG9yOiB2YXIoLS1zbGF0ZS0xMik7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIFxcbiAgLlRvYXN0RGVzY3JpcHRpb24ge1xcbiAgICBncmlkLWFyZWE6IGRlc2NyaXB0aW9uO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGNvbG9yOiB2YXIoLS1zbGF0ZS0xMSk7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMztcXG4gIH1cXG4gIFxcbiAgLlRvYXN0QWN0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiBhY3Rpb247XFxuICB9XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0NvbnRlbnRTY3JpcHQvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztJQUNkLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsZ0dBQWdHO0lBQ2hHLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsd0RBQXdEO0lBQ3hELCtCQUErQjtFQUNqQztFQUNBO0lBQ0UsZ0NBQWdDO0VBQ2xDO0VBQ0E7SUFDRSxnQ0FBZ0M7RUFDbEM7RUFDQTtJQUNFLDhCQUE4QjtFQUNoQztFQUNBO0lBQ0UsaUNBQWlDO0VBQ25DOztFQUVBO0lBQ0UsV0FBVztFQUNiOztFQUVBO0lBQ0Usb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osV0FBVztJQUNYLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsc0NBQXNDO0VBQ3hDO0VBQ0E7SUFDRSxpQ0FBaUM7RUFDbkM7RUFDQTtJQUNFLDJCQUEyQjtFQUM3Qjs7RUFFQTtJQUNFO01BQ0UsVUFBVTtNQUNWLDBCQUEwQjtJQUM1QjtJQUNBO01BQ0UsVUFBVTtNQUNWLHdCQUF3QjtJQUMxQjtFQUNGOztFQUVBO0lBQ0U7TUFDRSxVQUFVO01BQ1YsMkJBQTJCO0lBQzdCO0lBQ0E7TUFDRSxVQUFVO01BQ1Ysd0JBQXdCO0lBQzFCO0VBQ0Y7O0VBRUE7SUFDRTtNQUNFLFVBQVU7TUFDViwyQkFBMkI7SUFDN0I7SUFDQTtNQUNFLFVBQVU7TUFDVix3QkFBd0I7SUFDMUI7RUFDRjs7RUFFQTtJQUNFO01BQ0UsVUFBVTtNQUNWLDBCQUEwQjtJQUM1QjtJQUNBO01BQ0UsVUFBVTtNQUNWLHdCQUF3QjtJQUMxQjtFQUNGOzs7RUFHQTtJQUNFLHdCQUF3QjtJQUN4QixlQUFlO0lBQ2YsU0FBUztJQUNULFFBQVE7SUFDUixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGdDQUFnQztJQUNoQyxTQUFTO0lBQ1QsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSx1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGdHQUFnRztJQUNoRyxhQUFhO0lBQ2IsYUFBYTtJQUNiLHdEQUF3RDtJQUN4RCx1Q0FBdUM7SUFDdkMsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0Usc0RBQXNEO0VBQ3hEO0VBQ0E7SUFDRSw2QkFBNkI7RUFDL0I7RUFDQTtJQUNFLHNEQUFzRDtFQUN4RDtFQUNBO0lBQ0Usd0JBQXdCO0lBQ3hCLG9DQUFvQztFQUN0QztFQUNBO0lBQ0Usa0NBQWtDO0VBQ3BDOztFQUVBO0lBQ0U7TUFDRSxVQUFVO0lBQ1o7SUFDQTtNQUNFLFVBQVU7SUFDWjtFQUNGOztFQUVBO0lBQ0U7TUFDRSwyREFBMkQ7SUFDN0Q7SUFDQTtNQUNFLHdCQUF3QjtJQUMxQjtFQUNGOztFQUVBO0lBQ0U7TUFDRSxxREFBcUQ7SUFDdkQ7SUFDQTtNQUNFLDJEQUEyRDtJQUM3RDtFQUNGOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5Ub29sdGlwQ29udGVudCB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxO1xcbiAgICBjb2xvcjogdmFyKC0tdmlvbGV0LTExKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGJveC1zaGFkb3c6IGhzbCgyMDYgMjIlIDclIC8gMzUlKSAwcHggMTBweCAzOHB4IC0xMHB4LCBoc2woMjA2IDIyJSA3JSAvIDIwJSkgMHB4IDEwcHggMjBweCAtMTVweDtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xcbiAgICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtLCBvcGFjaXR5O1xcbiAgfVxcbiAgLlRvb2x0aXBDb250ZW50W2RhdGEtc3RhdGU9J2RlbGF5ZWQtb3BlbiddW2RhdGEtc2lkZT0ndG9wJ10ge1xcbiAgICBhbmltYXRpb24tbmFtZTogc2xpZGVEb3duQW5kRmFkZTtcXG4gIH1cXG4gIC5Ub29sdGlwQ29udGVudFtkYXRhLXN0YXRlPSdkZWxheWVkLW9wZW4nXVtkYXRhLXNpZGU9J3JpZ2h0J10ge1xcbiAgICBhbmltYXRpb24tbmFtZTogc2xpZGVMZWZ0QW5kRmFkZTtcXG4gIH1cXG4gIC5Ub29sdGlwQ29udGVudFtkYXRhLXN0YXRlPSdkZWxheWVkLW9wZW4nXVtkYXRhLXNpZGU9J2JvdHRvbSddIHtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlVXBBbmRGYWRlO1xcbiAgfVxcbiAgLlRvb2x0aXBDb250ZW50W2RhdGEtc3RhdGU9J2RlbGF5ZWQtb3BlbiddW2RhdGEtc2lkZT0nbGVmdCddIHtcXG4gICAgYW5pbWF0aW9uLW5hbWU6IHNsaWRlUmlnaHRBbmRGYWRlO1xcbiAgfVxcbiAgXFxuICAuVG9vbHRpcEFycm93IHtcXG4gICAgZmlsbDogd2hpdGU7XFxuICB9XFxuICBcXG4gIC5JY29uQnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIGhlaWdodDogMzVweDtcXG4gICAgd2lkdGg6IDM1cHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgY29sb3I6IHZhcigtLXZpb2xldC0xMSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3gtc2hhZG93OiAwIDJweCAxMHB4IHZhcigtLWJsYWNrLWE3KTtcXG4gIH1cXG4gIC5JY29uQnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdmlvbGV0LTMpO1xcbiAgfVxcbiAgLkljb25CdXR0b246Zm9jdXMge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggYmxhY2s7XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc2xpZGVVcEFuZEZhZGUge1xcbiAgICBmcm9tIHtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlUmlnaHRBbmRGYWRlIHtcXG4gICAgZnJvbSB7XFxuICAgICAgb3BhY2l0eTogMDtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTJweCk7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB9XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc2xpZGVEb3duQW5kRmFkZSB7XFxuICAgIGZyb20ge1xcbiAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlTGVmdEFuZEZhZGUge1xcbiAgICBmcm9tIHtcXG4gICAgICBvcGFjaXR5OiAwO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgycHgpO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICBvcGFjaXR5OiAxO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgfVxcbiAgfVxcbiAgXFxuXFxuICAuVG9hc3RWaWV3cG9ydCB7XFxuICAgIC0tdmlld3BvcnQtcGFkZGluZzogMjVweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBwYWRkaW5nOiB2YXIoLS12aWV3cG9ydC1wYWRkaW5nKTtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICB3aWR0aDogMzkwcHg7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgei1pbmRleDogMjE0NzQ4MzY0NztcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gIH1cXG4gIFxcbiAgLlRvYXN0Um9vdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJveC1zaGFkb3c6IGhzbCgyMDYgMjIlIDclIC8gMzUlKSAwcHggMTBweCAzOHB4IC0xMHB4LCBoc2woMjA2IDIyJSA3JSAvIDIwJSkgMHB4IDEwcHggMjBweCAtMTVweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogJ3RpdGxlIGFjdGlvbicgJ2Rlc2NyaXB0aW9uIGFjdGlvbic7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcXG4gICAgY29sdW1uLWdhcDogMTVweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5Ub2FzdFJvb3RbZGF0YS1zdGF0ZT0nb3BlbiddIHtcXG4gICAgYW5pbWF0aW9uOiBzbGlkZUluIDE1MG1zIGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpO1xcbiAgfVxcbiAgLlRvYXN0Um9vdFtkYXRhLXN0YXRlPSdjbG9zZWQnXSB7XFxuICAgIGFuaW1hdGlvbjogaGlkZSAxMDBtcyBlYXNlLWluO1xcbiAgfVxcbiAgLlRvYXN0Um9vdFtkYXRhLXN3aXBlPSdtb3ZlJ10ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0tcmFkaXgtdG9hc3Qtc3dpcGUtbW92ZS14KSk7XFxuICB9XFxuICAuVG9hc3RSb290W2RhdGEtc3dpcGU9J2NhbmNlbCddIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1vdXQ7XFxuICB9XFxuICAuVG9hc3RSb290W2RhdGEtc3dpcGU9J2VuZCddIHtcXG4gICAgYW5pbWF0aW9uOiBzd2lwZU91dCAxMDBtcyBlYXNlLW91dDtcXG4gIH1cXG4gIFxcbiAgQGtleWZyYW1lcyBoaWRlIHtcXG4gICAgZnJvbSB7XFxuICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgfVxcbiAgXFxuICBAa2V5ZnJhbWVzIHNsaWRlSW4ge1xcbiAgICBmcm9tIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygxMDAlICsgdmFyKC0tdmlld3BvcnQtcGFkZGluZykpKTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICB9XFxuICB9XFxuICBcXG4gIEBrZXlmcmFtZXMgc3dpcGVPdXQge1xcbiAgICBmcm9tIHtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0tcmFkaXgtdG9hc3Qtc3dpcGUtZW5kLXgpKTtcXG4gICAgfVxcbiAgICB0byB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoMTAwJSArIHZhcigtLXZpZXdwb3J0LXBhZGRpbmcpKSk7XFxuICAgIH1cXG4gIH1cXG4gIFxcbiAgLlRvYXN0VGl0bGUge1xcbiAgICBncmlkLWFyZWE6IHRpdGxlO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIGNvbG9yOiB2YXIoLS1zbGF0ZS0xMik7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIFxcbiAgLlRvYXN0RGVzY3JpcHRpb24ge1xcbiAgICBncmlkLWFyZWE6IGRlc2NyaXB0aW9uO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGNvbG9yOiB2YXIoLS1zbGF0ZS0xMSk7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMztcXG4gIH1cXG4gIFxcbiAgLlRvYXN0QWN0aW9uIHtcXG4gICAgZ3JpZC1hcmVhOiBhY3Rpb247XFxuICB9XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb24gPSB2b2lkIDA7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpKTtcbmNvbnN0IFRvb2x0aXAgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkByYWRpeC11aS9yZWFjdC10b29sdGlwXCIpKTtcbmNvbnN0IGFudGRfMSA9IHJlcXVpcmUoXCJhbnRkXCIpO1xuY29uc3QgQ2hlY2tCb3hfMSA9IHJlcXVpcmUoXCIuL0NoZWNrQm94XCIpO1xuY29uc3QgaW5kZXhfMSA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xucmVxdWlyZShcIi4vc3R5bGUuY3NzXCIpO1xuY29uc3QgQnV0dG9uQm94ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdiBgXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJnR3JlZW4pO1xuICAgIH1cbmA7XG5mdW5jdGlvbiBBY3Rpb24ocHJvcHMpIHtcbiAgICBjb25zdCBbYWN0aW9uQWN0aXZlLCBzZXRBY3Rpb25BY3RpdmVdID0gKDAsIHJlYWN0XzEudXNlU3RhdGUpKGZhbHNlKTtcbiAgICBjb25zdCBbc2VsZWN0TWVtbywgc2V0U2VsZWN0TWVtb10gPSAoMCwgcmVhY3RfMS51c2VTdGF0ZSkoW10pO1xuICAgIGNvbnN0IG9ic2VydmVyID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICBjb25zdCBzZWxlY3RNZW1vTGVuZ3RoID0gKDAsIHJlYWN0XzEudXNlUmVmKSgwKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdE1lbW8ubGVuZ3RoID4gMSAmJiAhcHJvcHMudmVyaWZpZWQpIHtcbiAgICAgICAgICAgIGlucHV0Tm90QWxsb3dlZCgpO1xuICAgICAgICAgICAgYW50ZF8xLm1lc3NhZ2UuaW5mbygn5r+A5rS7IFBybyDlj6/lpI3liLbmm7TlpJrnrJTorrDwn5qAJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25Eb21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2Ll9fZmxvbW8ybWRBY3Rpb24gaW5wdXQnKTtcbiAgICAgICAgICAgIGFjdGlvbkRvbXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJztcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdE1lbW9MZW5ndGguY3VycmVudCA9IHNlbGVjdE1lbW8ubGVuZ3RoO1xuICAgIH0sIFtzZWxlY3RNZW1vXSk7XG4gICAgY29uc3QgaW5wdXROb3RBbGxvd2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb25Eb21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2Ll9fZmxvbW8ybWRBY3Rpb24gaW5wdXQnKTtcbiAgICAgICAgYWN0aW9uRG9tcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgLy8g5p+l6K+i5b2T5YmNIG5vZGUg5LiL55qE5omA5pyJIGlucHV0IOWFg+e0oFxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgIW5vZGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmN1cnNvciA9ICdub3QtYWxsb3dlZCc7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gaGFuZGxlRG9tQ2hhbmdlKG5lZWRUb0xpc3Rlbikge1xuICAgICAgICBpZiAobmVlZFRvTGlzdGVuKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5jdXJyZW50ID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOehruS/nei/meaYr+S4gOS4quWFg+e0oOiKgueCue+8jOW5tuS4lOWMuemFjeaIkeS7rOeahOebruagh1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnbWVtbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWcqOi/memHjOi/m+ihjOexu+Wei+aWreiogOS7peabtOehruWIh+eahOaPj+i/sCBub2RlIOeahOexu+Wei1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2hlY2tib3goaGVhZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIOebkeWQrCAubWVtb3Mg55qE5Y+Y5YyW77yM6YCa5bi45Zyo5rua5Yqo5Yqg6L295pu05aSaIG1lbW8g5pe26Kem5Y+RXG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW1vcycpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jdXJyZW50Lm9ic2VydmUodGFyZ2V0Tm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY3VycmVudC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g5r+A5rS75aSa6YCJXG4gICAgZnVuY3Rpb24gaGFuZGxlQWN0aW9uQnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIHNldEFjdGlvbkFjdGl2ZShhID0+IHRydWUpO1xuICAgICAgICAvLyDlnKjmiYDmnIkgTWVtbyDkuIrmt7vliqDlpJrpgInmjInpkq5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbW8gLmhlYWRlcicpLmZvckVhY2goYWRkQ2hlY2tib3gpO1xuICAgICAgICBoYW5kbGVEb21DaGFuZ2UodHJ1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUNoZWNrQm94Q2hhbmdlKG1lbW8sIGNoZWNrZWQpIHtcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIC8vIOmAieS4rVxuICAgICAgICAgICAgc2V0U2VsZWN0TWVtbyhvbGQgPT4gWy4uLm9sZCwgbWVtb10pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5Y+W5raI6YCJ5LitXG4gICAgICAgICAgICBzZXRTZWxlY3RNZW1vKG9sZCA9PiBvbGQuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gbWVtbykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZENoZWNrYm94KGhlYWRlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFjdGlvbkFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWN0aW9uQXJlYS5jbGFzc05hbWUgPSAnX19mbG9tbzJtZEFjdGlvbic7XG4gICAgICAgIGFjdGlvbkFyZWEuc3R5bGUubWFyZ2luTGVmdCA9ICcxNHB4JztcbiAgICAgICAgKF9hID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy50b29scycpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kQ2hpbGQoYWN0aW9uQXJlYSk7XG4gICAgICAgIHJlYWN0X2RvbV8xLmRlZmF1bHQucmVuZGVyKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHJlYWN0XzEuZGVmYXVsdC5TdHJpY3RNb2RlLCBudWxsLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ2hlY2tCb3hfMS5DaGVja2JveCwgeyBzZWxlY3RNZW1vQ291bnQ6IHNlbGVjdE1lbW9MZW5ndGguY3VycmVudCwgaW5wdXROb3RBbGxvd2VkOiBpbnB1dE5vdEFsbG93ZWQsIHZlcmlmaWVkOiBwcm9wcy52ZXJpZmllZCwgaGFuZGxlQ2hlY2tCb3hDaGFuZ2U6IGhhbmRsZUNoZWNrQm94Q2hhbmdlIH0pKSwgYWN0aW9uQXJlYSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoZWNrYm94KCkge1xuICAgICAgICAvLyDljbjovb3lnKggaGVhZGVyIOS4rea4suafk+eahOe7hOS7tlxuICAgICAgICBjb25zdCBhY3Rpb25Eb21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2Ll9fZmxvbW8ybWRBY3Rpb24nKTtcbiAgICAgICAgYWN0aW9uRG9tcy5mb3JFYWNoKG5vZGUgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICAgIHNldEFjdGlvbkFjdGl2ZShmYWxzZSk7XG4gICAgICAgIC8vIOWBnOatouebkeWQrCBET00g5Y+Y5YyWXG4gICAgICAgIGhhbmRsZURvbUNoYW5nZShmYWxzZSk7XG4gICAgICAgIC8vIOa4heepuuW3sumAieaLqeeahCBNZW1vXG4gICAgICAgIHNldFNlbGVjdE1lbW8oW10pO1xuICAgIH1cbiAgICBjb25zdCBhY3Rpb25Cb3hTdHlsZSA9IHtcbiAgICAgICAgY29sb3I6ICcjOWQ5ZDlkJyxcbiAgICAgICAgaGVpZ2h0OiAnNDhweCcsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzQ4cHgnLFxuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgYm90dG9tOiAnMTgwcHgnLFxuICAgICAgICByaWdodDogJzIwcHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGdhcDogJzEwcHgnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tbm90aWNlQmcpJyxcbiAgICAgICAgYm94U2hhZG93OiAnMHB4IDBweCA0MHB4IDBweCB2YXIoLS1iaWdTaGFkb3cpJyxcbiAgICAgICAgekluZGV4OiAnOTk5J1xuICAgIH07XG4gICAgY29uc3QgYnV0dG9uU3R5bGUgPSB7XG4gICAgICAgIGNvbG9yOiAnIzlkOWQ5ZCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxuICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgcGFkZGluZzogJzRweCcsXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfTtcbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGFjdGlvbkFjdGl2ZSA/XG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbkJveFN0eWxlKSwgeyBwYWRkaW5nOiAnMCAxMHB4JyB9KSB9LFxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuUHJvdmlkZXIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuUm9vdCwgeyBkZWxheUR1cmF0aW9uOiA1MDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuVHJpZ2dlciwgeyBhc0NoaWxkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgYnV0dG9uU3R5bGUpLCBvbkNsaWNrOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW1vcyA9IHlpZWxkICgwLCBpbmRleF8xLnNldE1lbW9zKShzZWxlY3RNZW1vLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMCwgaW5kZXhfMS5oYW5kbGVDb3B5TWFya2Rvd24pKG1lbW9zLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWFs+mXreWkmumAieeKtuaAgVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2hlY2tib3goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgeyB3aWR0aDogXCIxOFwiLCBoZWlnaHQ6IFwiMThcIiwgdmlld0JveDogXCIwIDAgMTUgMTVcIiwgZmlsbDogXCJub25lXCIsIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7IGQ6IFwiTTEgOS41MDAwNkMxIDEwLjMyODUgMS42NzE1NyAxMS4wMDAxIDIuNSAxMS4wMDAxSDRMNCAxMC4wMDAxSDIuNUMyLjIyMzg2IDEwLjAwMDEgMiA5Ljc3NjIgMiA5LjUwMDA2TDIgMi41MDAwNkMyIDIuMjIzOTIgMi4yMjM4NiAyLjAwMDA2IDIuNSAyLjAwMDA2TDkuNSAyLjAwMDA2QzkuNzc2MTQgMi4wMDAwNiAxMCAyLjIyMzkyIDEwIDIuNTAwMDZWNC4wMDAwMkg1LjVDNC42NzE1OCA0LjAwMDAyIDQgNC42NzE1OSA0IDUuNTAwMDJWMTIuNUM0IDEzLjMyODQgNC42NzE1OCAxNCA1LjUgMTRIMTIuNUMxMy4zMjg0IDE0IDE0IDEzLjMyODQgMTQgMTIuNVY1LjUwMDAyQzE0IDQuNjcxNTkgMTMuMzI4NCA0LjAwMDAyIDEyLjUgNC4wMDAwMkgxMVYyLjUwMDA2QzExIDEuNjcxNjMgMTAuMzI4NCAxLjAwMDA2IDkuNSAxLjAwMDA2SDIuNUMxLjY3MTU3IDEuMDAwMDYgMSAxLjY3MTYzIDEgMi41MDAwNlY5LjUwMDA2Wk01IDUuNTAwMDJDNSA1LjIyMzg4IDUuMjIzODYgNS4wMDAwMiA1LjUgNS4wMDAwMkgxMi41QzEyLjc3NjEgNS4wMDAwMiAxMyA1LjIyMzg4IDEzIDUuNTAwMDJWMTIuNUMxMyAxMi43NzYyIDEyLjc3NjEgMTMgMTIuNSAxM0g1LjVDNS4yMjM4NiAxMyA1IDEyLjc3NjIgNSAxMi41VjUuNTAwMDJaXCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGZpbGxSdWxlOiBcImV2ZW5vZGRcIiwgY2xpcFJ1bGU6IFwiZXZlbm9kZFwiIH0pKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVG9vbHRpcC5Qb3J0YWwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVG9vbHRpcC5Db250ZW50LCB7IGNsYXNzTmFtZTogXCJUb29sdGlwQ29udGVudFwiLCBzaWRlT2Zmc2V0OiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcdTU5MERcXHU1MjM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuQXJyb3csIHsgY2xhc3NOYW1lOiBcIlRvb2x0aXBBcnJvd1wiIH0pKSkpKSxcbiAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLlByb3ZpZGVyLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLlJvb3QsIHsgZGVsYXlEdXJhdGlvbjogNTAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLlRyaWdnZXIsIHsgYXNDaGlsZDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgc3R5bGU6IGJ1dHRvblN0eWxlLCBvbkNsaWNrOiByZW1vdmVDaGVja2JveCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7IHdpZHRoOiBcIjE4XCIsIGhlaWdodDogXCIxOFwiLCB2aWV3Qm94OiBcIjAgMCAxNSAxNVwiLCBmaWxsOiBcIm5vbmVcIiwgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMTEuNzgxNiA0LjAzMTU3QzEyLjAwNjIgMy44MDcwMiAxMi4wMDYyIDMuNDQyOTUgMTEuNzgxNiAzLjIxODRDMTEuNTU3MSAyLjk5Mzg1IDExLjE5MyAyLjk5Mzg1IDEwLjk2ODUgMy4yMTg0TDcuNTAwMDUgNi42ODY4Mkw0LjAzMTY0IDMuMjE4NEMzLjgwNzA4IDIuOTkzODUgMy40NDMwMSAyLjk5Mzg1IDMuMjE4NDYgMy4yMTg0QzIuOTkzOTEgMy40NDI5NSAyLjk5MzkxIDMuODA3MDIgMy4yMTg0NiA0LjAzMTU3TDYuNjg2ODggNy40OTk5OUwzLjIxODQ2IDEwLjk2ODRDMi45OTM5MSAxMS4xOTMgMi45OTM5MSAxMS41NTcgMy4yMTg0NiAxMS43ODE2QzMuNDQzMDEgMTIuMDA2MSAzLjgwNzA4IDEyLjAwNjEgNC4wMzE2NCAxMS43ODE2TDcuNTAwMDUgOC4zMTMxNkwxMC45Njg1IDExLjc4MTZDMTEuMTkzIDEyLjAwNjEgMTEuNTU3MSAxMi4wMDYxIDExLjc4MTYgMTEuNzgxNkMxMi4wMDYyIDExLjU1NyAxMi4wMDYyIDExLjE5MyAxMS43ODE2IDEwLjk2ODRMOC4zMTMyMiA3LjQ5OTk5TDExLjc4MTYgNC4wMzE1N1pcIiwgZmlsbDogXCJjdXJyZW50Q29sb3JcIiwgZmlsbFJ1bGU6IFwiZXZlbm9kZFwiLCBjbGlwUnVsZTogXCJldmVub2RkXCIgfSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLlBvcnRhbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLkNvbnRlbnQsIHsgY2xhc3NOYW1lOiBcIlRvb2x0aXBDb250ZW50XCIsIHNpZGVPZmZzZXQ6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx1NTNENlxcdTZEODhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVG9vbHRpcC5BcnJvdywgeyBjbGFzc05hbWU6IFwiVG9vbHRpcEFycm93XCIgfSkpKSkpKVxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuUHJvdmlkZXIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuUm9vdCwgeyBkZWxheUR1cmF0aW9uOiA1MDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFRvb2x0aXAuVHJpZ2dlciwgeyBhc0NoaWxkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uQm94LCB7IHN0eWxlOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbkJveFN0eWxlKSwgeyB3aWR0aDogJzQ4cHgnLCBjdXJzb3I6ICdwb2ludGVyJyB9KSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IHN0eWxlOiBidXR0b25TdHlsZSwgb25DbGljazogaGFuZGxlQWN0aW9uQnV0dG9uQ2xpY2sgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHsgd2lkdGg6IFwiMThcIiwgaGVpZ2h0OiBcIjE4XCIsIHZpZXdCb3g6IFwiMCAwIDE1IDE1XCIsIGZpbGw6IFwibm9uZVwiLCB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHsgZDogXCJNMyAzSDEyVjEySDNMMyAzWk0yIDNDMiAyLjQ0NzcxIDIuNDQ3NzIgMiAzIDJIMTJDMTIuNTUyMyAyIDEzIDIuNDQ3NzIgMTMgM1YxMkMxMyAxMi41NTIzIDEyLjU1MjMgMTMgMTIgMTNIM0MyLjQ0NzcxIDEzIDIgMTIuNTUyMyAyIDEyVjNaTTEwLjM0OTggNS41MTEwNUMxMC41MDYgNS4yODMzNyAxMC40NDgxIDQuOTcyMTIgMTAuMjIwNCA0LjgxNTg3QzkuOTkyNzUgNC42NTk2MSA5LjY4MTUgNC43MTc1MSA5LjUyNTI1IDQuOTQ1MTlMNi42NDA0OCA5LjE0ODU3TDUuMTk3MzMgNy40MDg4OUM1LjAyMTAyIDcuMTk2MzUgNC43MDU4IDcuMTY2OTkgNC40OTMyNyA3LjM0MzI5QzQuMjgwNzMgNy41MTk2IDQuMjUxMzcgNy44MzQ4MiA0LjQyNzY3IDguMDQ3MzVMNi4yOTM0IDEwLjI5NjRDNi4zOTM0OCAxMC40MTcxIDYuNTQ0MzcgMTAuNDgzOCA2LjcwMDk3IDEwLjQ3NjdDNi44NTc1NyAxMC40Njk1IDcuMDAxNzcgMTAuMzg5NCA3LjA5MDQ3IDEwLjI2MDFMMTAuMzQ5OCA1LjUxMTA1WlwiLCBmaWxsOiBcImN1cnJlbnRDb2xvclwiLCBmaWxsUnVsZTogXCJldmVub2RkXCIsIGNsaXBSdWxlOiBcImV2ZW5vZGRcIiB9KSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLlBvcnRhbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLkNvbnRlbnQsIHsgY2xhc3NOYW1lOiBcIlRvb2x0aXBDb250ZW50XCIsIHNpZGVPZmZzZXQ6IDUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHU1OTFBXFx1OTAwOVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChUb29sdGlwLkFycm93LCB7IGNsYXNzTmFtZTogXCJUb29sdGlwQXJyb3dcIiB9KSkpKSkpKSk7XG59XG5leHBvcnRzLkFjdGlvbiA9IEFjdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNoZWNrYm94ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwicmVhY3RcIikpO1xuZnVuY3Rpb24gQ2hlY2tib3gocHJvcHMpIHtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLnNlbGVjdE1lbW9Db3VudCA+IDEgJiYgIXByb3BzLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICBwcm9wcy5pbnB1dE5vdEFsbG93ZWQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGhhbmRsZUNoZWNrQm94Q2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgLy8g6I635Y+WIC5tZW1vXG4gICAgICAgIGxldCBwYXJlbnQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCAhPSBudWxsICYmICFwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW1vJykpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8g5a2Y5ZyoIC5tZW1vXG4gICAgICAgICAgICAvLyDlsIYgbWVtbyDnmoQgRE9NIOS8oOmAkue7mSBBY3Rpb27vvIznlKjkuo7lkI7nu63lpI3liLbjgIHlr7zlh7pcbiAgICAgICAgICAgIHByb3BzLmhhbmRsZUNoZWNrQm94Q2hhbmdlKHBhcmVudCwgdGFyZ2V0LmNoZWNrZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0NoZWNrYm94IGlzIGNoZWNrZWQnKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdDaGVja2JveCBpcyB1bmNoZWNrZWQnKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBzdHlsZToge1xuICAgICAgICAvLyBvcGFjaXR5OiBwcm9wcy5zZWxlY3RNZW1vQ291bnQgPiAxID8gJzAuMycgOiAnMScsXG4gICAgICAgIC8vIGN1cnNvcjogcHJvcHMuc2VsZWN0TWVtb0NvdW50ID4gMSA/ICdub3QtYWxsb3dlZCcgOiAnJyxcbiAgICAgICAgLy8gcG9pbnRlckV2ZW50czogcHJvcHMuc2VsZWN0TWVtb0NvdW50ID4gMSA/ICdub25lJyA6IHVuZGVmaW5lZFxuICAgICAgICB9LCBvbkNoYW5nZTogaGFuZGxlQ2hlY2tCb3hDaGFuZ2UsIHR5cGU6IFwiY2hlY2tib3hcIiB9KSk7XG59XG5leHBvcnRzLkNoZWNrYm94ID0gQ2hlY2tib3g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5oYW5kbGVDb3B5TWFya2Rvd24gPSBleHBvcnRzLnNldE1lbW9zID0gdm9pZCAwO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbi8vIGltcG9ydCBodG1sVG9NYXJrZG93biBmcm9tICdAd2NqL2h0bWwtdG8tbWFya2Rvd24nO1xuY29uc3QgaHRtbF90b19tZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJodG1sLXRvLW1kXCIpKTtcbmNvbnN0IGpzemlwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImpzemlwXCIpKTtcbmNvbnN0IGZpbGVfc2F2ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZmlsZS1zYXZlclwiKSk7XG5jb25zdCBjb3B5X3RvX2NsaXBib2FyZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjb3B5LXRvLWNsaXBib2FyZFwiKSk7XG5jb25zdCBhbnRkXzEgPSByZXF1aXJlKFwiYW50ZFwiKTtcbmNvbnN0IEFjdGlvbl8xID0gcmVxdWlyZShcIi4vQWN0aW9uXCIpO1xubGV0IEFOS0lfSU5GTztcbmxldCBVU0VSX0lORk87XG4vLyAoYXN5bmMgKCkgPT4ge1xuLy8gICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbi8vICAgVVNFUl9JTkZPID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuLy8gICBjb25zb2xlLmxvZygnVVNFUl9JTkZPOicpO1xuLy8gICBjb25zb2xlLmxvZyhVU0VSX0lORk8pO1xuLy8gfSkoKVxuLy8g5re75Yqg5aSa6YCJ5aSN5Yi25Yqf6IO9XG4vLyDmib7liLAgLnF1ZXJ5YmFyIOS4i+eahOesrOS4gOS4qiAuYWN0aW9uIOWFg+e0oFxud2luZG93Lm9ubG9hZCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHVzZXJJbmZvID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHsgJ3R5cGUnOiAnZ2V0VXNlckluZm8nLCAnbWVzc2FnZXMnOiB7fSwgfSk7XG4gICAgY29uc29sZS5sb2coJ3VzZXJJbmZvOicpO1xuICAgIGNvbnNvbGUubG9nKHVzZXJJbmZvKTtcbiAgICBjb25zdCBmbG9tb0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmlucHV0Jyk7XG4gICAgY29uc3QgYWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZmxvbW9JbnB1dCA9PT0gbnVsbCB8fCBmbG9tb0lucHV0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmbG9tb0lucHV0LmFmdGVyKGFjdGlvbkRpdik7XG4gICAgaWYgKGFjdGlvbkRpdikge1xuICAgICAgICByZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFjdGlvbl8xLkFjdGlvbiwgeyB2ZXJpZmllZDogdXNlckluZm8udmVyaWZpZWQgfSkpLCBhY3Rpb25EaXYpO1xuICAgIH1cbn0pO1xud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50IHNjcmlwdCBvbk1lc3NhZ2U6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2NvcHknIHx8IG1zZy50eXBlID09PSAnZXhwb3J0Jykge1xuICAgICAgICAgICAgLy8g5Yqg6L295YWo6YOo56yU6K6wXG4gICAgICAgICAgICBsZXQgbWVtb3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vcycpWzBdO1xuICAgICAgICAgICAgaWYgKG1lbW9zKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbChtZW1vcywgbXNnLnZlcmlmaWVkKS50aGVuKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5omA5pyJIE1lbW8g55qEIERPTVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW1vRWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vJykpO1xuICAgICAgICAgICAgICAgICAgICAvLyDop6PmnpDnrJTorrBcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lbW9MaXN0ID0geWllbGQgc2V0TWVtb3MobWVtb0VscywgbXNnLm9wdGlvbnMuYXV0b1JlY29nbml6ZU5vdGVUaXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbXNnLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acqua/gOa0u1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtb0xpc3QgPSBtZW1vTGlzdC5zbGljZSgwLCAyMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVtb0xpc3RQcm9taXNlcyA9IG1lbW9MaXN0Lm1hcCgobWVtbykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG56yU6K6w5Lit55qE5Y+M6ZO+XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWQgPSBtZW1vLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZCA9IHJlcGxhY2VIcmVmKG1kLCBtZW1vTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlm77niYfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2V4cG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZCArPSBgXFxuIVtpbWFnZV0oaW1hZ2VzLyR7bWVtby50aW1lMn1fJHtpICsgMX0ucG5nKWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNnLm9wdGlvbnMuZXhwb3J0VGltZUluZm9WYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWIm+W7uuaXtumXtOOAgeWOn+Wni+eslOiusOS/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGBcXG5cXG5bJHttZW1vLnRpbWV9XShodHRwczovL2Zsb21vYXBwLmNvbS9taW5lLz9tZW1vX2lkPSR7bWVtby5pZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lbW8uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWVtby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBtZW1vLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG1lbW8udGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lMjogbWVtby50aW1lMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBtZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogbWVtby5maWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNZW1vTGlzdCA9IHlpZWxkIFByb21pc2UuYWxsKG5ld01lbW9MaXN0UHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdleHBvcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDkuIvovb3nrJTorrBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVppcEZpbGVGcm9tTWFya2Rvd25TdHJpbmdzKG5ld01lbW9MaXN0LCAnZmxvbW8ybWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdjb3B5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSN5Yi256yU6K6wXG4gICAgICAgICAgICAgICAgICAgICAgICAoMCwgZXhwb3J0cy5oYW5kbGVDb3B5TWFya2Rvd24pKG5ld01lbW9MaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4vLyDoh6rliqjmu5rliqjliJfooahcbmZ1bmN0aW9uIGF1dG9TY3JvbGwobWVtb3MsIHZlcmlmaWVkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBtZW1vcy5zY3JvbGxUb3AgPSBtZW1vcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoIXZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgLy8g5pyq5r+A5rS7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZCcpKSB7XG4gICAgICAgICAgICAgICAgLy8g5a2Y5ZyoIGVuZO+8jOihqOekuuW3suWKoOi9veWujOWFqOmDqO+8jOatpOaXtua4hemZpOWumuaXtuS7u+WKoeW5tue7k+adnyBQcm9tc2llXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH0pO1xufVxuLy8g6I635Y+W56yU6K6wXG5mdW5jdGlvbiBzZXRNZW1vcyhtZW1vRWxzLCBhdXRvUmVjb2duaXplTm90ZVRpdGxlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5omA5pyJIGNsYXNzTmFtZSDkuLogXCJtZW1vXCIg55qEIGRpdiDlhYPntKBcbiAgICAgICAgLy8gY29uc3QgbWVtb0VscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbW8nKTtcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5pWw57uE5p2l5L+d5a2Y6Kej5p6Q5ZCO55qEIG1lbW8g5a+56LGhXG4gICAgICAgIGNvbnN0IG1lbW9zID0gW107XG4gICAgICAgIC8vIOWtmOWCqOWQjeensOWIl+ihqO+8jOmBv+WFjeaWh+S7tuWQjemHjeWkjVxuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbWVtb3NMZW5ndGggPSAobWVtb0Vscy5sZW5ndGgpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAvLyDpgY3ljobmr4/kuIDkuKogXCJtZW1vXCIg5YWD57Sg77yM6I635Y+W56yU6K6w5L+h5oGvXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb0Vscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbWVtb0VsID0gbWVtb0Vsc1tpXTtcbiAgICAgICAgICAgIC8vIOeslOiusCBJRFxuICAgICAgICAgICAgY29uc3QgaWQgPSBtZW1vRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNsdWcnKSB8fCAnJztcbiAgICAgICAgICAgIC8vIOWIm+W7uuaXtumXtFxuICAgICAgICAgICAgY29uc3QgdGltZUVsID0gbWVtb0VsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gdGltZUVsID8gdGltZUVsLmlubmVyVGV4dCA6ICcnO1xuICAgICAgICAgICAgLy8gdGltZTIg55So5p2l5L2c5Li65paH5Lu26buY6K6k5qCH6aKYXG4gICAgICAgICAgICBjb25zdCB0aW1lMiA9IHRpbWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgICAgICAgIC8vIOeslOiusOato+aWh1xuICAgICAgICAgICAgY29uc3QgcmljaFRleHRFbCA9IG1lbW9FbC5xdWVyeVNlbGVjdG9yKCcucmljaFRleHQnKTtcbiAgICAgICAgICAgIC8vIOWkhOeQhueslOiusOmTvuaOpVxuICAgICAgICAgICAgLy8g5YWL6ZqGIHJpY2hUZXh0RWwg5Lul5L+d55WZ5Y6f5aeL5YWD57Sg55qE54q25oCBXG4gICAgICAgICAgICBjb25zdCBuZXdSaWNoVGV4dEVsID0gcmljaFRleHRFbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAvLyDojrflj5blhYvpmoblkI7nmoTmiYDmnIkgYSDmoIfnrb5cbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gbmV3UmljaFRleHRFbC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gICAgICAgICAgICAvLyDpgY3ljobmiYDmnIkgYSDmoIfnrb5cbiAgICAgICAgICAgIGxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5aSE55CGIE1FTU8g6ZO+5o6lXG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuY2xhc3NOYW1lID09PSAnaW5uZXJfbWVtb19saW5rJykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9mbG9tb2FwcC5jb20vbWluZS8/bWVtb19pZD0nICsgbGluay5nZXRBdHRyaWJ1dGUoJ3NsdWcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3UmljaFRleHRFbCA/IG5ld1JpY2hUZXh0RWwuaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgICAvLyDovazkuLogbWQg5qC85byPXG4gICAgICAgICAgICBjb250ZW50ID0geWllbGQgaHRtbFRvbWQoY29udGVudCk7XG4gICAgICAgICAgICAvLyAvLyDmmK/lkKbmmL7npLrnrJTorrDliJvlu7rml7bpl7Tlkozljp/lp4vpk77mjqVcbiAgICAgICAgICAgIC8vIGlmIChzaG93RXhwb3J0VGltZUluZm9WYWx1ZSkge1xuICAgICAgICAgICAgLy8gICBjb250ZW50ICs9IGBcXG5cXG5bJHt0aW1lfV0oaHR0cHM6Ly9mbG9tb2FwcC5jb20vbWluZS8/bWVtb19pZD0ke2lkfSlgXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyDlpITnkIbpq5jkuq7vvIzlsIYgPG1hcms+IOagh+etvuabv+aNouS4uiA9PVxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvPFxcLz9tYXJrPi9nLCAnPT0nKTtcbiAgICAgICAgICAgIC8vIOWkhOeQhuaWh+S7tuW6j+WPt1xuICAgICAgICAgICAgY29uc3QgdGhpc0xlbmd0aCA9IChpICsgMSkudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb3NMZW5ndGggLSB0aGlzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCArPSAoaSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyDmlofku7blkI3np7BcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XG4gICAgICAgICAgICBuYW1lID0gdGltZTIgKyAnXycgKyBpbmRleDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8g55So5oi36K6+572u5LqG6ZyA6KaB5Yy56YWN5qCH6aKY5pe25omN5Lya5aSE55CGXG4gICAgICAgICAgICAgICAgaWYgKGF1dG9SZWNvZ25pemVOb3RlVGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG5paH5Lu25ZCN56ewXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBnZXRNZW1vTmFtZShjb250ZW50LCBuYW1lcyk7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuZXdOYW1lID8gbmV3TmFtZSA6IHRpbWUyICsgJ18nICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWIoOmZpOS4gOe6p+agh+mimO+8jOmBv+WFjeagh+mimOmHjeWkjVxuICAgICAgICAgICAgICAgICAgICAvLyDlsIbovpPlhaXnmoTlrZfnrKbkuLLku6XmjaLooYznrKbliIblibLkuLrmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qOA5p+l5b2T5YmN6KGM5piv5ZCm5Li65LiA57qn5qCH6aKYXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjICcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2Rvd25MaW5rUmVnZXggPSAvXFxbKFteXFxdXSspXFxdXFwoKFteKV0rKVxcKS87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzTWFya2Rvd25MaW5rID0gbWFya2Rvd25MaW5rUmVnZXgudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzTWFya2Rvd25MaW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOagh+mimOS4reWMheWQq+mTvuaOpVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlj6rljrvpmaQgIyDnrKblj7fvvIzkv53nlZnmoIfpopjnmoTlhoXlrrlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShsaW5lLCBsaW5lLnN1YnN0cmluZygyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliKDpmaTmraPmlofkuK3nmoTmoIfpopjkv6Hmga/vvIzlj6rkv53nlZnmlofku7blkI3kvZzkuLrmoIfpophcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCG5YaF5a655oyJ6KGM5YiG5Ymy5oiQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50TGluZXMgPSBjb250ZW50LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Yib5bu65LiA5Liq5paw5pWw57uE77yM5LiN5YyF5ZCr6KaB5Yig6Zmk55qE6KGMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMaW5lcyA9IGNvbnRlbnRMaW5lcy5maWx0ZXIoKGNvbnRlbnRMaW5lKSA9PiBjb250ZW50TGluZSAhPT0gbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaWsOaVsOe7hOaLvOaOpeWbnuaWh+acrOW9ouW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudExpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICAvLyDlm77niYdcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzRWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLmZpbGVzJyk7XG4gICAgICAgICAgICBjb25zdCBmaWxlc0hUTUwgPSBmaWxlc0VsID8gZmlsZXNFbC5pbm5lckhUTUwgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gZ2V0SW1hZ2VEYXRhU291cmNlVmFsdWVzKGZpbGVzSFRNTCk7XG4gICAgICAgICAgICAvLyDlsIbop6PmnpDlkI7nmoQgXCJtZW1vXCIg5a+56LGh5re75Yqg5Yiw5pWw57uE5LitXG4gICAgICAgICAgICBtZW1vcy5wdXNoKHsgaWQsIG5hbWUsIGluZGV4LCB0aW1lLCB0aW1lMiwgY29udGVudCwgZmlsZXMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbW9zO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zZXRNZW1vcyA9IHNldE1lbW9zO1xuLy8g5aSE55CG56yU6K6w5Lit55qE6ZO+5o6lXG5mdW5jdGlvbiByZXBsYWNlSHJlZihtZCwgbWVtb3MpIHtcbiAgICBsZXQgbmV3TUQgPSBtZDtcbiAgICAvLyDmib7liLAgZmxvbW8g5YaF6YOo55qE6ZO+5o6lXG4gICAgY29uc3QgcmVnZXggPSAvXFxbLio/XFxdXFwoKGh0dHBzOlxcL1xcL2Zsb21vYXBwXFwuY29tXFwvbWluZVxcL1xcP21lbW9faWQ9Lio/KVxcKS9nO1xuICAgIGxldCBtYXRjaDtcbiAgICBjb25zdCBsaW5rcyA9IFtdO1xuICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKG1kKSkgIT09IG51bGwpIHtcbiAgICAgICAgbGlua3MucHVzaChtYXRjaFswXSk7XG4gICAgfVxuICAgIGxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGNvbnN0IHVybE1hdGNoID0gbGluay5tYXRjaCgvXFwoKC4qPylcXCkvKTtcbiAgICAgICAgaWYgKHVybE1hdGNoICYmIHVybE1hdGNoWzFdKSB7XG4gICAgICAgICAgICBjb25zdCB1cmxPYmogPSBuZXcgVVJMKHVybE1hdGNoWzFdKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsT2JqLnNlYXJjaCk7XG4gICAgICAgICAgICBjb25zdCBtZW1vSWQgPSBwYXJhbXMuZ2V0KCdtZW1vX2lkJyk7XG4gICAgICAgICAgICBpZiAobWVtb0lkKSB7XG4gICAgICAgICAgICAgICAgLy8g5om+5YiwIG1lbnRpb24g55qE5Y2h54mHXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1vcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVtb3NbaV0uaWQgPT09IG1lbW9JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBpbmRleDogaSwgbWVtbzogbWVtb3NbaV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOiuvue9riBtZW50aW9uIOWNoeeJh1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSByZXN1bHQubWVtby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBuZXdNRCA9IG5ld01ELnJlcGxhY2UobGluaywgYFtNRU1PXSgke3RpdGxlfSlgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3TUQ7XG59XG4vLyDlpITnkIbnrJTorrDmoIfpophcbmZ1bmN0aW9uIGdldE1lbW9OYW1lKG1kLCBuYW1lcykge1xuICAgIGxldCBoYXZlSGVhZGxpbmcgPSBmYWxzZTtcbiAgICAvLyDku47nrJTorrDlhoXlrrnkuK3mj5Dlj5blkI3np7Dkv6Hmga9cbiAgICBsZXQgbWVtb05hbWUgPSBudWxsO1xuICAgIC8vIOWwhui+k+WFpeeahOWtl+espuS4suS7peaNouihjOespuWIhuWJsuS4uuaVsOe7hFxuICAgIGxldCBsaW5lcyA9IG1kLnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xuICAgICAgICAvLyDmo4Dmn6XlvZPliY3ooYzmmK/lkKbkuLrkuIDnuqfmoIfpophcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyAnKSkge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBsaW5lLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGhhdmVIZWFkbGluZyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnInmib7liLDkuIDnuqfmoIfpophcbiAgICBpZiAoIW1lbW9OYW1lKSB7XG4gICAgICAgIC8vIOWwhuWktOWHoOihjOeahOaWh+Wtl+S9nOS4uuagh+mimFxuICAgICAgICBsZXQgbGluZVdpdGhvdXRUYWcgPSAnJztcbiAgICAgICAgLy8g6YCQ5Liq5p+l5om+6Z2e56m65YWD57Sg77yM55u05Yiw5om+5Yiw6Z2e56m65YWD57Sg5oiW6YGN5Y6G5a6MbGluZXPmlbDnu4TkuLrmraJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVzW2ldKSB7XG4gICAgICAgICAgICAgICAgbGluZVdpdGhvdXRUYWcgPSBsaW5lc1tpXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOaJvuWIsOmdnuepuuWFg+e0oO+8jOWImei3s+WHuuW+queOr1xuICAgICAgICAgICAgICAgIGlmIChsaW5lV2l0aG91dFRhZykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA+IDIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZVdpdGhvdXRUYWcpIHtcbiAgICAgICAgICAgIG1lbW9OYW1lID0gbGluZVdpdGhvdXRUYWc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1lbW9OYW1lKSB7XG4gICAgICAgIC8vIOWOu+mZpOagh+mimOS4reeahOWHuumTvlxuICAgICAgICBtZW1vTmFtZSA9IG1lbW9OYW1lLnJlcGxhY2UoL1xcWyhbXlxcXV0rKVxcXVxcKChbXildKylcXCkvZywgJycpO1xuICAgICAgICBpZiAoIWhhdmVIZWFkbGluZykge1xuICAgICAgICAgICAgLy8g5aaC5p6cXG4gICAgICAgICAgICAvLyDpgb/lhY3moIfpopjov4fplb/vvIzmiKrlj5bnrKzkuIDlj6VcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IG1lbW9OYW1lLm1hdGNoKC8uKz8o77yMfOKAlOKAlHzjgIJ877yffO+8gSkvKTsgLy8g5Yy56YWN55u05Yiw56ys5LiA5Liq5Lit5paH6YCX5Y+344CB56C05oqY5Y+344CB5Y+l5Y+344CB6Zeu5Y+344CB5oSf5Y+55Y+35Ye6546w55qE5omA5pyJ5a2X56ymXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBtZW1vTmFtZSA9IG1hdGNoWzBdLnNsaWNlKDAsIC0xKTsgLy8g56e76Zmk5pS25bC+55qE5Lit5paH6YCX5Y+344CB56C05oqY5Y+344CB5Y+l5Y+344CB6Zeu5Y+344CB5oSf5Y+55Y+3XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVtb05hbWUgPSBtZW1vTmFtZS5yZXBsYWNlKC9bPD46XCIvXFxcXHw/Klxcc10vZywgJycpO1xuICAgICAgICAvLyDpgb/lhY0gbmFtZSDph43lkI1cbiAgICAgICAgbGV0IG5ld05hbWUgPSBtZW1vTmFtZTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDUwMCkge1xuICAgICAgICAgICAgICAgIC8vIOmBv+WFjeatu+W+queOr1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVzLmluZGV4T2YobmV3TmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIOWtmOWcqOWQjOWQjeeahOeslOiusFxuICAgICAgICAgICAgICAgIG5ld05hbWUgPSBtZW1vTmFtZSArIGAoJHtjb3VudCArIDF9KWA7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOS4jeWtmOWcqOWQjOWQjeeahOeslOiusFxuICAgICAgICAgICAgICAgIG1lbW9OYW1lID0gbmV3TmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVtb05hbWUudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy/lkI3np7Dlj6rlrZjlnKjnqbrmoLxcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZW1vTmFtZTtcbn1cbi8vIOiOt+WPlueslOiusOS4reeahOWbvueJh1xuZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhU291cmNlVmFsdWVzKGh0bWwpIHtcbiAgICAvLyDkvb/nlKggRE9NUGFyc2VyIOS7jiBIVE1MIOWtl+espuS4suWIm+W7uuS4gOS4quaWsOeahCBEb2N1bWVudCDlr7nosaFcbiAgICBsZXQgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJyk7XG4gICAgLy8g6I635Y+W5omA5pyJ55qEIGltZyDlhYPntKBcbiAgICBsZXQgaW1nRWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xuICAgIC8vIOWIm+W7uuS4gOS4quaVsOe7hO+8jOWwhuavj+S4qiBpbWcg5YWD57Sg55qEIGRhdGEtc291cmNlIOWxnuaAp+WAvOaUvuWFpeaVsOe7hFxuICAgIGxldCBkYXRhU291cmNlVmFsdWVzID0gQXJyYXkuZnJvbShpbWdFbGVtZW50cykubWFwKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgcmV0dXJuIGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGFTb3VyY2VWYWx1ZXM7XG59XG4vLyBodG1sIOi9rOS4uiBtZCDmoLzlvI9cbmNvbnN0IGh0bWxUb21kID0gKGh0bWxTdHJpbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBtYXJrZG93blN0ciA9ICgwLCBodG1sX3RvX21kXzEuZGVmYXVsdCkoaHRtbFN0cmluZywge1xuICAgICAgICBza2lwVGFnczogW1xuICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgJ2h0bWwnLFxuICAgICAgICAgICAgJ2JvZHknLFxuICAgICAgICAgICAgJ25hdicsXG4gICAgICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgICAgICAnZm9vdGVyJyxcbiAgICAgICAgICAgICdtYWluJyxcbiAgICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgICAnYXJ0aWNsZScsXG4gICAgICAgICAgICAnaGVhZGVyJ1xuICAgICAgICBdXG4gICAgfSk7XG4gICAgLy8g5qCH562+XG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcIy9nLCAnIycpO1xuICAgIC8vIOWIhumalOe6v1xuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXC0tLS9nLCAnLS0tJyk7XG4gICAgLy8g5peg5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcLSAvZywgJy0gJyk7XG4gICAgLy8g5pyJ5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcXFwuIC9nLCAnLiAnKTtcbiAgICAvLyDliqDnspdcbiAgICBtYXJrZG93blN0ciA9IG1hcmtkb3duU3RyLnJlcGxhY2UoL1xcXFxcXCpcXFxcXFwqL2csIFwiKipcIik7XG4gICAgLy8g5Y676ZmkICNUYWcg55qE5Yqg57KX5pWI5p6cXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXCpcXCooIy4rPylcXCpcXCovZywgXCIkMVwiKTtcbiAgICByZXR1cm4gbWFya2Rvd25TdHI7XG59KTtcbi8vIOS4i+i9veeslOiusFxuY29uc3QgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MgPSAobWVtb3MsIGZpbGVuYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB6aXAgPSBuZXcganN6aXBfMS5kZWZhdWx0KCk7XG4gICAgLy8g5a2Y5pS+5omA5pyJ5Zu+54mH5LiL6L295Lu75Yqh55qE5pWw57uEXG4gICAgbGV0IGltYWdlc1Rhc2tzID0gW107XG4gICAgLy8g6YGN5Y6G5q+P5LiA5LiqIG1lbW9cbiAgICBtZW1vcy5mb3JFYWNoKChtZW1vLCBpKSA9PiB7XG4gICAgICAgIC8vIOWcqCB6aXAg5paH5Lu25Lit5re75Yqg5LiA5Liq5paw55qEIG1kIOaWh+S7tlxuICAgICAgICBjb25zdCBjb250ZW50ID0gbWVtby5jb250ZW50O1xuICAgICAgICB6aXAuZmlsZShgJHttZW1vLm5hbWV9Lm1kYCwgY29udGVudCk7XG4gICAgICAgIC8vIOS4i+i9veWbvueJh1xuICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZ1VybCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGltZ1VybCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBmZXRjaChpbWdVcmwpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJsb2IoKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oaW1nRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHppcC5maWxlKGBpbWFnZXMvJHttZW1vLnRpbWUyfV8ke2kgKyAxfS5wbmdgLCBpbWdEYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbWFnZXNUYXNrcy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnrYnlvoXmiYDmnInlm77niYfkuIvovb3lrozmr5VcbiAgICB5aWVsZCBQcm9taXNlLmFsbChpbWFnZXNUYXNrcyk7XG4gICAgLy8g55Sf5oiQIHppcCDmlofku7blubbkv53lrZjliLDnlKjmiLforr7lpIdcbiAgICBjb25zdCBjb250ZW50ID0geWllbGQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gICAgZmlsZV9zYXZlcl8xLmRlZmF1bHQuc2F2ZUFzKGNvbnRlbnQsIGZpbGVuYW1lKTtcbn0pO1xuLy8g5aSN5Yi256yU6K6wXG5jb25zdCBoYW5kbGVDb3B5TWFya2Rvd24gPSAobWVtb3MsIHNob3dFeHBvcnRUaW1lSW5mb1ZhbHVlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBsZXQgbWFya2Rvd24gPSAnJztcbiAgICBtZW1vcy5mb3JFYWNoKChtZW1vLCBpKSA9PiB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbWVtby5jb250ZW50O1xuICAgICAgICAvLyDlm77niYdcbiAgICAgICAgbWVtby5maWxlcy5mb3JFYWNoKChpbWdVcmwsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpbWdVcmwpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9IGBcXG4hW10oJHtpbWdVcmx9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2hvd0V4cG9ydFRpbWVJbmZvVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIOWIm+W7uuaXtumXtOOAgeWOn+Wni+eslOiusOS/oeaBr1xuICAgICAgICAgICAgY29udGVudCArPSBgXFxuXFxuWyR7bWVtby50aW1lfV0oaHR0cHM6Ly9mbG9tb2FwcC5jb20vbWluZS8/bWVtb19pZD0ke21lbW8uaWR9KWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIG1hcmtkb3duICs9IGBcXG5cXG4ke2NvbnRlbnR9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtkb3duICs9IGBcXG5cXG4tLS1cXG5cXG4ke2NvbnRlbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKG1hcmtkb3duKTtcbiAgICAoMCwgY29weV90b19jbGlwYm9hcmRfMS5kZWZhdWx0KShtYXJrZG93biwgeyBmb3JtYXQ6ICd0ZXh0JyB9KTtcbiAgICBhbnRkXzEubWVzc2FnZS5zdWNjZXNzKCflt7LlpI3liLYnKTtcbn0pO1xuZXhwb3J0cy5oYW5kbGVDb3B5TWFya2Rvd24gPSBoYW5kbGVDb3B5TWFya2Rvd247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29udGVudF9zY3JpcHRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2hyb21lX2V4dGVuc2lvbl90eXBlc2NyaXB0X3N0YXJ0ZXJcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=