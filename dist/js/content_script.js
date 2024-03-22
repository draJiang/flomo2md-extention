/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const html_to_markdown_1 = __importDefault(__webpack_require__(/*! @wcj/html-to-markdown */ "./node_modules/@wcj/html-to-markdown/lib/index.js"));
const jszip_1 = __importDefault(__webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js"));
const file_saver_1 = __importDefault(__webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js"));
let ANKI_INFO;
let USER_INFO;
// (async () => {
//   // 获取用户信息
//   USER_INFO = await getUserInfo()
//   console.log('USER_INFO:');
//   console.log(USER_INFO);
// })()
webextension_polyfill_1.default.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('content script onMessage:');
        console.log(msg);
        if (msg.type === 'flomo2md') {
            // 加载全部笔记
            let memos = document.getElementsByClassName('memos')[0];
            if (memos) {
                autoScroll(memos, msg.verified).then(() => __awaiter(this, void 0, void 0, function* () {
                    // 解析笔记
                    let memoList = yield getMemos();
                    if (!msg.verified) {
                        //未激活
                        memoList = memoList.slice(0, 20);
                    }
                    const newMemoListPromises = memoList.map((memo) => __awaiter(this, void 0, void 0, function* () {
                        // 处理笔记中的双链
                        const html = replaceHref(memo.content, memoList);
                        // 将内容转为 md 格式
                        let md = yield html2md(html);
                        // 在 md 中添加图片
                        memo.files.forEach((img, i) => {
                            md += `![image](images/${memo.time2}_${i}.png)`;
                        });
                        //创建时间信息
                        md += `\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`;
                        return {
                            id: memo.id,
                            time: memo.time,
                            time2: memo.time2,
                            content: md,
                            files: memo.files
                        };
                    }));
                    const newMemoList = yield Promise.all(newMemoListPromises);
                    // 下载笔记
                    createZipFileFromMarkdownStrings(newMemoList, 'flomo2md');
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
function getMemos() {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取所有 className 为 "memo" 的 div 元素
        const memoEls = document.getElementsByClassName('memo');
        // 创建一个数组来保存解析后的 memo 对象
        const memos = [];
        // 遍历每一个 "memo" 元素
        for (let i = 0; i < memoEls.length; i++) {
            const memoEl = memoEls[i];
            // 获取 "memo" 的 id 值，即 data-slug 属性的值
            const id = memoEl.getAttribute('data-slug') || '';
            // 获取 "memo" 元素中类名为 "time" 和 "richText" 的子元素
            const timeEl = memoEl.querySelector('.time');
            const richTextEl = memoEl.querySelector('.richText');
            // 获取 "time" 和 "richText" 元素的文本内容
            const time = timeEl ? timeEl.innerText : '';
            const content = richTextEl ? richTextEl.innerHTML : '';
            // const md = await html2md(richText)
            const time2 = time.replace(/\D/g, '');
            // 获取图片
            const filesEl = memoEl.querySelector('.files');
            const filesHTML = filesEl ? filesEl.innerHTML : '';
            const files = getImageDataSourceValues(filesHTML);
            // 将解析后的 "memo" 对象添加到数组中
            memos.push({ id, time, time2, content, files });
        }
        return memos;
    });
}
// 处理笔记中的链接
function replaceHref(html, memos) {
    // 创建一个 DOM 解析器
    const parser = new DOMParser();
    // 使用 DOM 解析器解析 html 字符串，得到一个 Document 对象
    const doc = parser.parseFromString(html, 'text/html');
    // 获取所有 href 属性值包含 'abcd' 的 a 标签
    const aTags = doc.querySelectorAll('a[href*="https://flomoapp.com/mine/?memo_id"]');
    // 遍历所有的 a 标签
    aTags.forEach(aTag => {
        const anchor = aTag;
        // 创建一个新的 URL 对象
        const url = new URL(anchor.href);
        // 获取 url 中的 memo_id 值
        const memoId = url.searchParams.get('memo_id');
        if (memoId) {
            // 找到 mention 的卡片 ID
            const memo = memos.find(item => item.id === memoId);
            // 设置 mention 卡片
            if (memo) {
                aTag.setAttribute('href', memo === null || memo === void 0 ? void 0 : memo.time2);
            }
        }
    });
    // 返回修改后的 HTML 字符串
    return doc.body.innerHTML;
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
const html2md = (htmlString) => __awaiter(void 0, void 0, void 0, function* () {
    let markdownStr = yield (0, html_to_markdown_1.default)({ html: htmlString });
    markdownStr = markdownStr.replace(/\\#/g, '#');
    return markdownStr;
});
// 下载笔记
const createZipFileFromMarkdownStrings = (memos, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const zip = new jszip_1.default();
    // 存放所有图片下载任务的数组
    let imagesTasks = [];
    // 遍历每一个 memo
    memos.forEach((memo, i) => {
        const title = memo.time2;
        // 在 zip 文件中添加一个新的 md 文件
        const content = memo.content;
        zip.file(`${title}.md`, content);
        // 下载图片
        memo.files.forEach((imgUrl, i) => {
            if (imgUrl) {
                const promise = fetch(imgUrl)
                    .then(response => response.blob())
                    .then(imgData => {
                    zip.file(`images/${memo.time2}_${i}.png`, imgData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRDtXQUN0RCxzQ0FBc0MsaUVBQWlFO1dBQ3ZHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDVkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG5jb25zdCBodG1sX3RvX21hcmtkb3duXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkB3Y2ovaHRtbC10by1tYXJrZG93blwiKSk7XG5jb25zdCBqc3ppcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqc3ppcFwiKSk7XG5jb25zdCBmaWxlX3NhdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZpbGUtc2F2ZXJcIikpO1xubGV0IEFOS0lfSU5GTztcbmxldCBVU0VSX0lORk87XG4vLyAoYXN5bmMgKCkgPT4ge1xuLy8gICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbi8vICAgVVNFUl9JTkZPID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuLy8gICBjb25zb2xlLmxvZygnVVNFUl9JTkZPOicpO1xuLy8gICBjb25zb2xlLmxvZyhVU0VSX0lORk8pO1xuLy8gfSkoKVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50IHNjcmlwdCBvbk1lc3NhZ2U6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2Zsb21vMm1kJykge1xuICAgICAgICAgICAgLy8g5Yqg6L295YWo6YOo56yU6K6wXG4gICAgICAgICAgICBsZXQgbWVtb3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vcycpWzBdO1xuICAgICAgICAgICAgaWYgKG1lbW9zKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbChtZW1vcywgbXNnLnZlcmlmaWVkKS50aGVuKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Kej5p6Q56yU6K6wXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZW1vTGlzdCA9IHlpZWxkIGdldE1lbW9zKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbXNnLnZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acqua/gOa0u1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtb0xpc3QgPSBtZW1vTGlzdC5zbGljZSgwLCAyMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVtb0xpc3RQcm9taXNlcyA9IG1lbW9MaXN0Lm1hcCgobWVtbykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG56yU6K6w5Lit55qE5Y+M6ZO+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gcmVwbGFjZUhyZWYobWVtby5jb250ZW50LCBtZW1vTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlsIblhoXlrrnovazkuLogbWQg5qC85byPXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWQgPSB5aWVsZCBodG1sMm1kKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5ZyoIG1kIOS4rea3u+WKoOWbvueJh1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtby5maWxlcy5mb3JFYWNoKChpbWcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZCArPSBgIVtpbWFnZV0oaW1hZ2VzLyR7bWVtby50aW1lMn1fJHtpfS5wbmcpYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/liJvlu7rml7bpl7Tkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGBcXG5bJHttZW1vLnRpbWV9XShodHRwczovL2Zsb21vYXBwLmNvbS9taW5lLz9tZW1vX2lkPSR7bWVtby5pZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lbW8uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogbWVtby50aW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUyOiBtZW1vLnRpbWUyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBtZW1vLmZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01lbW9MaXN0ID0geWllbGQgUHJvbWlzZS5hbGwobmV3TWVtb0xpc3RQcm9taXNlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOS4i+i9veeslOiusFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVaaXBGaWxlRnJvbU1hcmtkb3duU3RyaW5ncyhuZXdNZW1vTGlzdCwgJ2Zsb21vMm1kJyk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcbi8vIOiHquWKqOa7muWKqOWIl+ihqFxuZnVuY3Rpb24gYXV0b1Njcm9sbChtZW1vcywgdmVyaWZpZWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG1lbW9zLnNjcm9sbFRvcCA9IG1lbW9zLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIGlmICghdmVyaWZpZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDmnKrmv4DmtLtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5kJykpIHtcbiAgICAgICAgICAgICAgICAvLyDlrZjlnKggZW5k77yM6KGo56S65bey5Yqg6L295a6M5YWo6YOo77yM5q2k5pe25riF6Zmk5a6a5pe25Lu75Yqh5bm257uT5p2fIFByb21zaWVcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfSk7XG59XG4vLyDojrflj5bnrJTorrBcbmZ1bmN0aW9uIGdldE1lbW9zKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOiOt+WPluaJgOaciSBjbGFzc05hbWUg5Li6IFwibWVtb1wiIOeahCBkaXYg5YWD57SgXG4gICAgICAgIGNvbnN0IG1lbW9FbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vJyk7XG4gICAgICAgIC8vIOWIm+W7uuS4gOS4quaVsOe7hOadpeS/neWtmOino+aekOWQjueahCBtZW1vIOWvueixoVxuICAgICAgICBjb25zdCBtZW1vcyA9IFtdO1xuICAgICAgICAvLyDpgY3ljobmr4/kuIDkuKogXCJtZW1vXCIg5YWD57SgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb0Vscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbWVtb0VsID0gbWVtb0Vsc1tpXTtcbiAgICAgICAgICAgIC8vIOiOt+WPliBcIm1lbW9cIiDnmoQgaWQg5YC877yM5Y2zIGRhdGEtc2x1ZyDlsZ7mgKfnmoTlgLxcbiAgICAgICAgICAgIGNvbnN0IGlkID0gbWVtb0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zbHVnJykgfHwgJyc7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJtZW1vXCIg5YWD57Sg5Lit57G75ZCN5Li6IFwidGltZVwiIOWSjCBcInJpY2hUZXh0XCIg55qE5a2Q5YWD57SgXG4gICAgICAgICAgICBjb25zdCB0aW1lRWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IHJpY2hUZXh0RWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnJpY2hUZXh0Jyk7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJ0aW1lXCIg5ZKMIFwicmljaFRleHRcIiDlhYPntKDnmoTmlofmnKzlhoXlrrlcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aW1lRWwgPyB0aW1lRWwuaW5uZXJUZXh0IDogJyc7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gcmljaFRleHRFbCA/IHJpY2hUZXh0RWwuaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgICAvLyBjb25zdCBtZCA9IGF3YWl0IGh0bWwybWQocmljaFRleHQpXG4gICAgICAgICAgICBjb25zdCB0aW1lMiA9IHRpbWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh1xuICAgICAgICAgICAgY29uc3QgZmlsZXNFbCA9IG1lbW9FbC5xdWVyeVNlbGVjdG9yKCcuZmlsZXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzSFRNTCA9IGZpbGVzRWwgPyBmaWxlc0VsLmlubmVySFRNTCA6ICcnO1xuICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBnZXRJbWFnZURhdGFTb3VyY2VWYWx1ZXMoZmlsZXNIVE1MKTtcbiAgICAgICAgICAgIC8vIOWwhuino+aekOWQjueahCBcIm1lbW9cIiDlr7nosaHmt7vliqDliLDmlbDnu4TkuK1cbiAgICAgICAgICAgIG1lbW9zLnB1c2goeyBpZCwgdGltZSwgdGltZTIsIGNvbnRlbnQsIGZpbGVzIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW1vcztcbiAgICB9KTtcbn1cbi8vIOWkhOeQhueslOiusOS4reeahOmTvuaOpVxuZnVuY3Rpb24gcmVwbGFjZUhyZWYoaHRtbCwgbWVtb3MpIHtcbiAgICAvLyDliJvlu7rkuIDkuKogRE9NIOino+aekOWZqFxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAvLyDkvb/nlKggRE9NIOino+aekOWZqOino+aekCBodG1sIOWtl+espuS4su+8jOW+l+WIsOS4gOS4qiBEb2N1bWVudCDlr7nosaFcbiAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKTtcbiAgICAvLyDojrflj5bmiYDmnIkgaHJlZiDlsZ7mgKflgLzljIXlkKsgJ2FiY2QnIOeahCBhIOagh+etvlxuICAgIGNvbnN0IGFUYWdzID0gZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCJodHRwczovL2Zsb21vYXBwLmNvbS9taW5lLz9tZW1vX2lkXCJdJyk7XG4gICAgLy8g6YGN5Y6G5omA5pyJ55qEIGEg5qCH562+XG4gICAgYVRhZ3MuZm9yRWFjaChhVGFnID0+IHtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gYVRhZztcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5paw55qEIFVSTCDlr7nosaFcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChhbmNob3IuaHJlZik7XG4gICAgICAgIC8vIOiOt+WPliB1cmwg5Lit55qEIG1lbW9faWQg5YC8XG4gICAgICAgIGNvbnN0IG1lbW9JZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdtZW1vX2lkJyk7XG4gICAgICAgIGlmIChtZW1vSWQpIHtcbiAgICAgICAgICAgIC8vIOaJvuWIsCBtZW50aW9uIOeahOWNoeeJhyBJRFxuICAgICAgICAgICAgY29uc3QgbWVtbyA9IG1lbW9zLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBtZW1vSWQpO1xuICAgICAgICAgICAgLy8g6K6+572uIG1lbnRpb24g5Y2h54mHXG4gICAgICAgICAgICBpZiAobWVtbykge1xuICAgICAgICAgICAgICAgIGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgbWVtbyA9PT0gbnVsbCB8fCBtZW1vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZW1vLnRpbWUyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOi/lOWbnuS/ruaUueWQjueahCBIVE1MIOWtl+espuS4slxuICAgIHJldHVybiBkb2MuYm9keS5pbm5lckhUTUw7XG59XG4vLyDojrflj5bnrJTorrDkuK3nmoTlm77niYdcbmZ1bmN0aW9uIGdldEltYWdlRGF0YVNvdXJjZVZhbHVlcyhodG1sKSB7XG4gICAgLy8g5L2/55SoIERPTVBhcnNlciDku44gSFRNTCDlrZfnrKbkuLLliJvlu7rkuIDkuKrmlrDnmoQgRG9jdW1lbnQg5a+56LGhXG4gICAgbGV0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpO1xuICAgIC8vIOiOt+WPluaJgOacieeahCBpbWcg5YWD57SgXG4gICAgbGV0IGltZ0VsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKTtcbiAgICAvLyDliJvlu7rkuIDkuKrmlbDnu4TvvIzlsIbmr4/kuKogaW1nIOWFg+e0oOeahCBkYXRhLXNvdXJjZSDlsZ7mgKflgLzmlL7lhaXmlbDnu4RcbiAgICBsZXQgZGF0YVNvdXJjZVZhbHVlcyA9IEFycmF5LmZyb20oaW1nRWxlbWVudHMpLm1hcChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHJldHVybiBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNvdXJjZScpO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhU291cmNlVmFsdWVzO1xufVxuLy8gaHRtbCDovazkuLogbWQg5qC85byPXG5jb25zdCBodG1sMm1kID0gKGh0bWxTdHJpbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBtYXJrZG93blN0ciA9IHlpZWxkICgwLCBodG1sX3RvX21hcmtkb3duXzEuZGVmYXVsdCkoeyBodG1sOiBodG1sU3RyaW5nIH0pO1xuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXCMvZywgJyMnKTtcbiAgICByZXR1cm4gbWFya2Rvd25TdHI7XG59KTtcbi8vIOS4i+i9veeslOiusFxuY29uc3QgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MgPSAobWVtb3MsIGZpbGVuYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB6aXAgPSBuZXcganN6aXBfMS5kZWZhdWx0KCk7XG4gICAgLy8g5a2Y5pS+5omA5pyJ5Zu+54mH5LiL6L295Lu75Yqh55qE5pWw57uEXG4gICAgbGV0IGltYWdlc1Rhc2tzID0gW107XG4gICAgLy8g6YGN5Y6G5q+P5LiA5LiqIG1lbW9cbiAgICBtZW1vcy5mb3JFYWNoKChtZW1vLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gbWVtby50aW1lMjtcbiAgICAgICAgLy8g5ZyoIHppcCDmlofku7bkuK3mt7vliqDkuIDkuKrmlrDnmoQgbWQg5paH5Lu2XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBtZW1vLmNvbnRlbnQ7XG4gICAgICAgIHppcC5maWxlKGAke3RpdGxlfS5tZGAsIGNvbnRlbnQpO1xuICAgICAgICAvLyDkuIvovb3lm77niYdcbiAgICAgICAgbWVtby5maWxlcy5mb3JFYWNoKChpbWdVcmwsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpbWdVcmwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gZmV0Y2goaW1nVXJsKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ibG9iKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGltZ0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB6aXAuZmlsZShgaW1hZ2VzLyR7bWVtby50aW1lMn1fJHtpfS5wbmdgLCBpbWdEYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbWFnZXNUYXNrcy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnrYnlvoXmiYDmnInlm77niYfkuIvovb3lrozmr5VcbiAgICB5aWVsZCBQcm9taXNlLmFsbChpbWFnZXNUYXNrcyk7XG4gICAgLy8g55Sf5oiQIHppcCDmlofku7blubbkv53lrZjliLDnlKjmiLforr7lpIdcbiAgICBjb25zdCBjb250ZW50ID0geWllbGQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gICAgZmlsZV9zYXZlcl8xLmRlZmF1bHQuc2F2ZUFzKGNvbnRlbnQsIGZpbGVuYW1lKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9