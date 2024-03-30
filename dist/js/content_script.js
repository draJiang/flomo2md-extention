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
// import htmlToMarkdown from '@wcj/html-to-markdown';
const html_to_md_1 = __importDefault(__webpack_require__(/*! html-to-md */ "./node_modules/html-to-md/dist/index.js"));
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
                    let memoList = yield getMemos(msg.options.autoRecognizeNoteTitle);
                    if (!msg.verified) {
                        //未激活
                        memoList = memoList.slice(0, 20);
                    }
                    const newMemoListPromises = memoList.map((memo) => __awaiter(this, void 0, void 0, function* () {
                        // 处理笔记中的双链
                        let md = memo.content;
                        md = replaceHref(md, memoList);
                        // 图片信息
                        memo.files.forEach((img, i) => {
                            md += `![image](images/${memo.time2}_${i + 1}.png)`;
                        });
                        if (msg.options.exportTimeInfoValue) {
                            //创建时间、原始笔记信息
                            md += `\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`;
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
function getMemos(autoRecognizeNoteTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取所有 className 为 "memo" 的 div 元素
        const memoEls = document.getElementsByClassName('memo');
        // 创建一个数组来保存解析后的 memo 对象
        const memos = [];
        // 存储名称列表，避免文件名重复
        let names = [];
        const memosLength = (memoEls.length).toString().length;
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
            let content = richTextEl ? richTextEl.innerHTML : '';
            // 转为 md 格式
            content = yield htmlTomd(content);
            //处理高亮
            content = content.replace(/<\/?mark>/g, '==');
            // const md = await html2md(richText)
            const time2 = time.replace(/\D/g, '');
            // 处理文件序号
            const thisLength = (i + 1).toString().length;
            let index = '';
            for (let i = 0; i < memosLength - thisLength; i++) {
                index += '0';
            }
            index += (i + 1).toString();
            // 文件名称
            let name = null;
            if (autoRecognizeNoteTitle) {
                name = getMemoName(content, names);
                name = name ? name : time2 + '_' + index;
            }
            else {
                name = time2 + '_' + index;
            }
            names.push(name);
            // 获取图片
            const filesEl = memoEl.querySelector('.files');
            const filesHTML = filesEl ? filesEl.innerHTML : '';
            const files = getImageDataSourceValues(filesHTML);
            // 将解析后的 "memo" 对象添加到数组中
            memos.push({ id, name, index, time, time2, content, files });
        }
        return memos;
    });
}
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
                // 找到 mention 的卡片 ID
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
    // 从笔记内容中提取名称信息
    let memoName = null;
    // 将输入的字符串以换行符分割为数组
    let lines = md.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        // 检查当前行是否为一级标题
        if (line.startsWith('# ')) {
            memoName = line.substring(2);
            break;
        }
    }
    // 如果没有找到一级标题
    if (!memoName) {
        // 移除首行中的 '#文字' 标签
        let lineWithoutTag = lines[0].replace(/#\S+/g, '').trim() || lines[1].replace(/#\S+/g, '').trim() || lines[2].replace(/#\S+/g, '').trim();
        if (lineWithoutTag) {
            memoName = lineWithoutTag;
        }
    }
    if (memoName) {
        // 去除标题中的出链
        memoName = memoName.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '');
        // 避免标题过长，截取第一句
        let match = memoName.match(/.+?(，|——|。|？|！)/); // 匹配直到第一个中文逗号、破折号、句号、问号、感叹号出现的所有字符
        if (match) {
            memoName = match[0].slice(0, -1); // 移除收尾的中文逗号、破折号、句号、问号、感叹号
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
        if (memoName.replace(/\ /g, '').length < 1) {
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
    let markdownStr = (0, html_to_md_1.default)(htmlString);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDVkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG4vLyBpbXBvcnQgaHRtbFRvTWFya2Rvd24gZnJvbSAnQHdjai9odG1sLXRvLW1hcmtkb3duJztcbmNvbnN0IGh0bWxfdG9fbWRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaHRtbC10by1tZFwiKSk7XG5jb25zdCBqc3ppcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqc3ppcFwiKSk7XG5jb25zdCBmaWxlX3NhdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZpbGUtc2F2ZXJcIikpO1xubGV0IEFOS0lfSU5GTztcbmxldCBVU0VSX0lORk87XG4vLyAoYXN5bmMgKCkgPT4ge1xuLy8gICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbi8vICAgVVNFUl9JTkZPID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuLy8gICBjb25zb2xlLmxvZygnVVNFUl9JTkZPOicpO1xuLy8gICBjb25zb2xlLmxvZyhVU0VSX0lORk8pO1xuLy8gfSkoKVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50IHNjcmlwdCBvbk1lc3NhZ2U6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2Zsb21vMm1kJykge1xuICAgICAgICAgICAgLy8g5Yqg6L295YWo6YOo56yU6K6wXG4gICAgICAgICAgICBsZXQgbWVtb3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vcycpWzBdO1xuICAgICAgICAgICAgaWYgKG1lbW9zKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbChtZW1vcywgbXNnLnZlcmlmaWVkKS50aGVuKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Kej5p6Q56yU6K6wXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZW1vTGlzdCA9IHlpZWxkIGdldE1lbW9zKG1zZy5vcHRpb25zLmF1dG9SZWNvZ25pemVOb3RlVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1zZy52ZXJpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKrmv4DmtLtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9MaXN0ID0gbWVtb0xpc3Quc2xpY2UoMCwgMjApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01lbW9MaXN0UHJvbWlzZXMgPSBtZW1vTGlzdC5tYXAoKG1lbW8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhueslOiusOS4reeahOWPjOmTvlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1kID0gbWVtby5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWQgPSByZXBsYWNlSHJlZihtZCwgbWVtb0xpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Zu+54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGAhW2ltYWdlXShpbWFnZXMvJHttZW1vLnRpbWUyfV8ke2kgKyAxfS5wbmcpYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1zZy5vcHRpb25zLmV4cG9ydFRpbWVJbmZvVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WIm+W7uuaXtumXtOOAgeWOn+Wni+eslOiusOS/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGBcXG5bJHttZW1vLnRpbWV9XShodHRwczovL2Zsb21vYXBwLmNvbS9taW5lLz9tZW1vX2lkPSR7bWVtby5pZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lbW8uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWVtby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBtZW1vLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG1lbW8udGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lMjogbWVtby50aW1lMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBtZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogbWVtby5maWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNZW1vTGlzdCA9IHlpZWxkIFByb21pc2UuYWxsKG5ld01lbW9MaXN0UHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyDkuIvovb3nrJTorrBcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MobmV3TWVtb0xpc3QsICdmbG9tbzJtZCcpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4vLyDoh6rliqjmu5rliqjliJfooahcbmZ1bmN0aW9uIGF1dG9TY3JvbGwobWVtb3MsIHZlcmlmaWVkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBtZW1vcy5zY3JvbGxUb3AgPSBtZW1vcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoIXZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgLy8g5pyq5r+A5rS7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZCcpKSB7XG4gICAgICAgICAgICAgICAgLy8g5a2Y5ZyoIGVuZO+8jOihqOekuuW3suWKoOi9veWujOWFqOmDqO+8jOatpOaXtua4hemZpOWumuaXtuS7u+WKoeW5tue7k+adnyBQcm9tc2llXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH0pO1xufVxuLy8g6I635Y+W56yU6K6wXG5mdW5jdGlvbiBnZXRNZW1vcyhhdXRvUmVjb2duaXplTm90ZVRpdGxlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5omA5pyJIGNsYXNzTmFtZSDkuLogXCJtZW1vXCIg55qEIGRpdiDlhYPntKBcbiAgICAgICAgY29uc3QgbWVtb0VscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbW8nKTtcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5pWw57uE5p2l5L+d5a2Y6Kej5p6Q5ZCO55qEIG1lbW8g5a+56LGhXG4gICAgICAgIGNvbnN0IG1lbW9zID0gW107XG4gICAgICAgIC8vIOWtmOWCqOWQjeensOWIl+ihqO+8jOmBv+WFjeaWh+S7tuWQjemHjeWkjVxuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbWVtb3NMZW5ndGggPSAobWVtb0Vscy5sZW5ndGgpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAvLyDpgY3ljobmr4/kuIDkuKogXCJtZW1vXCIg5YWD57SgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb0Vscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbWVtb0VsID0gbWVtb0Vsc1tpXTtcbiAgICAgICAgICAgIC8vIOiOt+WPliBcIm1lbW9cIiDnmoQgaWQg5YC877yM5Y2zIGRhdGEtc2x1ZyDlsZ7mgKfnmoTlgLxcbiAgICAgICAgICAgIGNvbnN0IGlkID0gbWVtb0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zbHVnJykgfHwgJyc7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJtZW1vXCIg5YWD57Sg5Lit57G75ZCN5Li6IFwidGltZVwiIOWSjCBcInJpY2hUZXh0XCIg55qE5a2Q5YWD57SgXG4gICAgICAgICAgICBjb25zdCB0aW1lRWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IHJpY2hUZXh0RWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnJpY2hUZXh0Jyk7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJ0aW1lXCIg5ZKMIFwicmljaFRleHRcIiDlhYPntKDnmoTmlofmnKzlhoXlrrlcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aW1lRWwgPyB0aW1lRWwuaW5uZXJUZXh0IDogJyc7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IHJpY2hUZXh0RWwgPyByaWNoVGV4dEVsLmlubmVySFRNTCA6ICcnO1xuICAgICAgICAgICAgLy8g6L2s5Li6IG1kIOagvOW8j1xuICAgICAgICAgICAgY29udGVudCA9IHlpZWxkIGh0bWxUb21kKGNvbnRlbnQpO1xuICAgICAgICAgICAgLy/lpITnkIbpq5jkuq5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLzxcXC8/bWFyaz4vZywgJz09Jyk7XG4gICAgICAgICAgICAvLyBjb25zdCBtZCA9IGF3YWl0IGh0bWwybWQocmljaFRleHQpXG4gICAgICAgICAgICBjb25zdCB0aW1lMiA9IHRpbWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgICAgICAgIC8vIOWkhOeQhuaWh+S7tuW6j+WPt1xuICAgICAgICAgICAgY29uc3QgdGhpc0xlbmd0aCA9IChpICsgMSkudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb3NMZW5ndGggLSB0aGlzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCArPSAoaSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyDmlofku7blkI3np7BcbiAgICAgICAgICAgIGxldCBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhdXRvUmVjb2duaXplTm90ZVRpdGxlKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGdldE1lbW9OYW1lKGNvbnRlbnQsIG5hbWVzKTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZSA/IG5hbWUgOiB0aW1lMiArICdfJyArIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHRpbWUyICsgJ18nICsgaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgLy8g6I635Y+W5Zu+54mHXG4gICAgICAgICAgICBjb25zdCBmaWxlc0VsID0gbWVtb0VsLnF1ZXJ5U2VsZWN0b3IoJy5maWxlcycpO1xuICAgICAgICAgICAgY29uc3QgZmlsZXNIVE1MID0gZmlsZXNFbCA/IGZpbGVzRWwuaW5uZXJIVE1MIDogJyc7XG4gICAgICAgICAgICBjb25zdCBmaWxlcyA9IGdldEltYWdlRGF0YVNvdXJjZVZhbHVlcyhmaWxlc0hUTUwpO1xuICAgICAgICAgICAgLy8g5bCG6Kej5p6Q5ZCO55qEIFwibWVtb1wiIOWvueixoea3u+WKoOWIsOaVsOe7hOS4rVxuICAgICAgICAgICAgbWVtb3MucHVzaCh7IGlkLCBuYW1lLCBpbmRleCwgdGltZSwgdGltZTIsIGNvbnRlbnQsIGZpbGVzIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZW1vcztcbiAgICB9KTtcbn1cbi8vIOWkhOeQhueslOiusOS4reeahOmTvuaOpVxuZnVuY3Rpb24gcmVwbGFjZUhyZWYobWQsIG1lbW9zKSB7XG4gICAgbGV0IG5ld01EID0gbWQ7XG4gICAgLy8g5om+5YiwIGZsb21vIOWGhemDqOeahOmTvuaOpVxuICAgIGNvbnN0IHJlZ2V4ID0gL1xcWy4qP1xcXVxcKChodHRwczpcXC9cXC9mbG9tb2FwcFxcLmNvbVxcL21pbmVcXC9cXD9tZW1vX2lkPS4qPylcXCkvZztcbiAgICBsZXQgbWF0Y2g7XG4gICAgY29uc3QgbGlua3MgPSBbXTtcbiAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyhtZCkpICE9PSBudWxsKSB7XG4gICAgICAgIGxpbmtzLnB1c2gobWF0Y2hbMF0pO1xuICAgIH1cbiAgICBsaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBjb25zdCB1cmxNYXRjaCA9IGxpbmsubWF0Y2goL1xcKCguKj8pXFwpLyk7XG4gICAgICAgIGlmICh1cmxNYXRjaCAmJiB1cmxNYXRjaFsxXSkge1xuICAgICAgICAgICAgY29uc3QgdXJsT2JqID0gbmV3IFVSTCh1cmxNYXRjaFsxXSk7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybE9iai5zZWFyY2gpO1xuICAgICAgICAgICAgY29uc3QgbWVtb0lkID0gcGFyYW1zLmdldCgnbWVtb19pZCcpO1xuICAgICAgICAgICAgaWYgKG1lbW9JZCkge1xuICAgICAgICAgICAgICAgIC8vIOaJvuWIsCBtZW50aW9uIOeahOWNoeeJhyBJRFxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lbW9zW2ldLmlkID09PSBtZW1vSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHsgaW5kZXg6IGksIG1lbW86IG1lbW9zW2ldIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDorr7nva4gbWVudGlvbiDljaHniYdcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gcmVzdWx0Lm1lbW8ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TUQgPSBuZXdNRC5yZXBsYWNlKGxpbmssIGBbTUVNT10oJHt0aXRsZX0pYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld01EO1xufVxuLy8g5aSE55CG56yU6K6w5qCH6aKYXG5mdW5jdGlvbiBnZXRNZW1vTmFtZShtZCwgbmFtZXMpIHtcbiAgICAvLyDku47nrJTorrDlhoXlrrnkuK3mj5Dlj5blkI3np7Dkv6Hmga9cbiAgICBsZXQgbWVtb05hbWUgPSBudWxsO1xuICAgIC8vIOWwhui+k+WFpeeahOWtl+espuS4suS7peaNouihjOespuWIhuWJsuS4uuaVsOe7hFxuICAgIGxldCBsaW5lcyA9IG1kLnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xuICAgICAgICAvLyDmo4Dmn6XlvZPliY3ooYzmmK/lkKbkuLrkuIDnuqfmoIfpophcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyAnKSkge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBsaW5lLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOWmguaenOayoeacieaJvuWIsOS4gOe6p+agh+mimFxuICAgIGlmICghbWVtb05hbWUpIHtcbiAgICAgICAgLy8g56e76Zmk6aaW6KGM5Lit55qEICcj5paH5a2XJyDmoIfnrb5cbiAgICAgICAgbGV0IGxpbmVXaXRob3V0VGFnID0gbGluZXNbMF0ucmVwbGFjZSgvI1xcUysvZywgJycpLnRyaW0oKSB8fCBsaW5lc1sxXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykudHJpbSgpIHx8IGxpbmVzWzJdLnJlcGxhY2UoLyNcXFMrL2csICcnKS50cmltKCk7XG4gICAgICAgIGlmIChsaW5lV2l0aG91dFRhZykge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBsaW5lV2l0aG91dFRhZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobWVtb05hbWUpIHtcbiAgICAgICAgLy8g5Y676Zmk5qCH6aKY5Lit55qE5Ye66ZO+XG4gICAgICAgIG1lbW9OYW1lID0gbWVtb05hbWUucmVwbGFjZSgvXFxbKFteXFxdXSspXFxdXFwoKFteKV0rKVxcKS9nLCAnJyk7XG4gICAgICAgIC8vIOmBv+WFjeagh+mimOi/h+mVv++8jOaIquWPluesrOS4gOWPpVxuICAgICAgICBsZXQgbWF0Y2ggPSBtZW1vTmFtZS5tYXRjaCgvLis/KO+8jHzigJTigJR844CCfO+8n3zvvIEpLyk7IC8vIOWMuemFjeebtOWIsOesrOS4gOS4quS4reaWh+mAl+WPt+OAgeegtOaKmOWPt+OAgeWPpeWPt+OAgemXruWPt+OAgeaEn+WPueWPt+WHuueOsOeahOaJgOacieWtl+esplxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIG1lbW9OYW1lID0gbWF0Y2hbMF0uc2xpY2UoMCwgLTEpOyAvLyDnp7vpmaTmlLblsL7nmoTkuK3mlofpgJflj7fjgIHnoLTmipjlj7fjgIHlj6Xlj7fjgIHpl67lj7fjgIHmhJ/lj7nlj7dcbiAgICAgICAgfVxuICAgICAgICBtZW1vTmFtZSA9IG1lbW9OYW1lLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFxzXS9nLCAnJyk7XG4gICAgICAgIC8vIOmBv+WFjSBuYW1lIOmHjeWQjVxuICAgICAgICBsZXQgbmV3TmFtZSA9IG1lbW9OYW1lO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGNvdW50ID4gNTAwKSB7XG4gICAgICAgICAgICAgICAgLy8g6YG/5YWN5q275b6q546vXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZXMuaW5kZXhPZihuZXdOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8g5a2Y5Zyo5ZCM5ZCN55qE56yU6K6wXG4gICAgICAgICAgICAgICAgbmV3TmFtZSA9IG1lbW9OYW1lICsgYCgke2NvdW50ICsgMX0pYDtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5LiN5a2Y5Zyo5ZCM5ZCN55qE56yU6K6wXG4gICAgICAgICAgICAgICAgbWVtb05hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW1vTmFtZS5yZXBsYWNlKC9cXCAvZywgJycpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIC8v5ZCN56ew5Y+q5a2Y5Zyo56m65qC8XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVtb05hbWU7XG59XG4vLyDojrflj5bnrJTorrDkuK3nmoTlm77niYdcbmZ1bmN0aW9uIGdldEltYWdlRGF0YVNvdXJjZVZhbHVlcyhodG1sKSB7XG4gICAgLy8g5L2/55SoIERPTVBhcnNlciDku44gSFRNTCDlrZfnrKbkuLLliJvlu7rkuIDkuKrmlrDnmoQgRG9jdW1lbnQg5a+56LGhXG4gICAgbGV0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpO1xuICAgIC8vIOiOt+WPluaJgOacieeahCBpbWcg5YWD57SgXG4gICAgbGV0IGltZ0VsZW1lbnRzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKTtcbiAgICAvLyDliJvlu7rkuIDkuKrmlbDnu4TvvIzlsIbmr4/kuKogaW1nIOWFg+e0oOeahCBkYXRhLXNvdXJjZSDlsZ7mgKflgLzmlL7lhaXmlbDnu4RcbiAgICBsZXQgZGF0YVNvdXJjZVZhbHVlcyA9IEFycmF5LmZyb20oaW1nRWxlbWVudHMpLm1hcChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHJldHVybiBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNvdXJjZScpO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhU291cmNlVmFsdWVzO1xufVxuLy8gaHRtbCDovazkuLogbWQg5qC85byPXG5jb25zdCBodG1sVG9tZCA9IChodG1sU3RyaW5nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBsZXQgbWFya2Rvd25TdHIgPSAoMCwgaHRtbF90b19tZF8xLmRlZmF1bHQpKGh0bWxTdHJpbmcpO1xuICAgIC8vIOagh+etvlxuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXCMvZywgJyMnKTtcbiAgICAvLyDliIbpmpTnur9cbiAgICBtYXJrZG93blN0ciA9IG1hcmtkb3duU3RyLnJlcGxhY2UoL1xcXFwtLS0vZywgJy0tLScpO1xuICAgIC8vIOaXoOW6j+WIl+ihqFxuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXC0gL2csICctICcpO1xuICAgIC8vIOacieW6j+WIl+ihqFxuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXFxcLiAvZywgJy4gJyk7XG4gICAgLy8g5Yqg57KXXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcXFwqXFxcXFxcKi9nLCBcIioqXCIpO1xuICAgIC8vIOWOu+mZpCAjVGFnIOeahOWKoOeyl+aViOaenFxuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFwqXFwqKCMuKz8pXFwqXFwqL2csIFwiJDFcIik7XG4gICAgcmV0dXJuIG1hcmtkb3duU3RyO1xufSk7XG4vLyDkuIvovb3nrJTorrBcbmNvbnN0IGNyZWF0ZVppcEZpbGVGcm9tTWFya2Rvd25TdHJpbmdzID0gKG1lbW9zLCBmaWxlbmFtZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgemlwID0gbmV3IGpzemlwXzEuZGVmYXVsdCgpO1xuICAgIC8vIOWtmOaUvuaJgOacieWbvueJh+S4i+i9veS7u+WKoeeahOaVsOe7hFxuICAgIGxldCBpbWFnZXNUYXNrcyA9IFtdO1xuICAgIC8vIOmBjeWOhuavj+S4gOS4qiBtZW1vXG4gICAgbWVtb3MuZm9yRWFjaCgobWVtbywgaSkgPT4ge1xuICAgICAgICAvLyDlnKggemlwIOaWh+S7tuS4rea3u+WKoOS4gOS4quaWsOeahCBtZCDmlofku7ZcbiAgICAgICAgY29uc3QgY29udGVudCA9IG1lbW8uY29udGVudDtcbiAgICAgICAgemlwLmZpbGUoYCR7bWVtby5uYW1lfS5tZGAsIGNvbnRlbnQpO1xuICAgICAgICAvLyDkuIvovb3lm77niYdcbiAgICAgICAgbWVtby5maWxlcy5mb3JFYWNoKChpbWdVcmwsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpbWdVcmwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gZmV0Y2goaW1nVXJsKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5ibG9iKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGltZ0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB6aXAuZmlsZShgaW1hZ2VzLyR7bWVtby50aW1lMn1fJHtpICsgMX0ucG5nYCwgaW1nRGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW1hZ2VzVGFza3MucHVzaChwcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g562J5b6F5omA5pyJ5Zu+54mH5LiL6L295a6M5q+VXG4gICAgeWllbGQgUHJvbWlzZS5hbGwoaW1hZ2VzVGFza3MpO1xuICAgIC8vIOeUn+aIkCB6aXAg5paH5Lu25bm25L+d5a2Y5Yiw55So5oi36K6+5aSHXG4gICAgY29uc3QgY29udGVudCA9IHlpZWxkIHppcC5nZW5lcmF0ZUFzeW5jKHsgdHlwZTogJ2Jsb2InIH0pO1xuICAgIGZpbGVfc2F2ZXJfMS5kZWZhdWx0LnNhdmVBcyhjb250ZW50LCBmaWxlbmFtZSk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsInZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IChvYmopID0+IChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgOiAob2JqKSA9PiAob2JqLl9fcHJvdG9fXyk7XG52YXIgbGVhZlByb3RvdHlwZXM7XG4vLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8vIG1vZGUgJiAxNjogcmV0dXJuIHZhbHVlIHdoZW4gaXQncyBQcm9taXNlLWxpa2Vcbi8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbl9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG5cdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IHRoaXModmFsdWUpO1xuXHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuXHRpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG5cdFx0aWYoKG1vZGUgJiA0KSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG5cdFx0aWYoKG1vZGUgJiAxNikgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuXHR2YXIgZGVmID0ge307XG5cdGxlYWZQcm90b3R5cGVzID0gbGVhZlByb3RvdHlwZXMgfHwgW251bGwsIGdldFByb3RvKHt9KSwgZ2V0UHJvdG8oW10pLCBnZXRQcm90byhnZXRQcm90byldO1xuXHRmb3IodmFyIGN1cnJlbnQgPSBtb2RlICYgMiAmJiB2YWx1ZTsgdHlwZW9mIGN1cnJlbnQgPT0gJ29iamVjdCcgJiYgIX5sZWFmUHJvdG90eXBlcy5pbmRleE9mKGN1cnJlbnQpOyBjdXJyZW50ID0gZ2V0UHJvdG8oY3VycmVudCkpIHtcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KS5mb3JFYWNoKChrZXkpID0+IChkZWZba2V5XSA9ICgpID0+ICh2YWx1ZVtrZXldKSkpO1xuXHR9XG5cdGRlZlsnZGVmYXVsdCddID0gKCkgPT4gKHZhbHVlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBkZWYpO1xuXHRyZXR1cm4gbnM7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb250ZW50X3NjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjaHJvbWVfZXh0ZW5zaW9uX3R5cGVzY3JpcHRfc3RhcnRlclwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvQ29udGVudFNjcmlwdC9pbmRleC50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==