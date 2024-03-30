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
                        //创建时间、原始笔记信息
                        md += `\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`;
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
    // 如果没有找到一级标题，则返回第一个不含有 '#tag' 的行
    if (!memoName) {
        // 移除首行中的 '#文字' 标签
        let lineWithoutTag = lines[0].replace(/#\S+/g, '').trim() || lines[1].replace(/#\S+/g, '').trim() || lines[2].replace(/#\S+/g, '').trim();
        if (lineWithoutTag) {
            memoName = lineWithoutTag;
        }
    }
    if (memoName) {
        // 去除标题中的出链
        memoName = memoName.replace(/\s*\[MEMO\]\(.*?\)\s*/g, '');
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
        // let count = 0;
        // for (let i = 0; i < names.length; i++) {
        //   if (names[i] === memoName) {
        //     count++;
        //   }
        // }
        // if (count > 0) {
        //   memoName += `(${count})`
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jcmVhdGUgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIikpO1xuLy8gaW1wb3J0IGh0bWxUb01hcmtkb3duIGZyb20gJ0B3Y2ovaHRtbC10by1tYXJrZG93bic7XG5jb25zdCBodG1sX3RvX21kXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImh0bWwtdG8tbWRcIikpO1xuY29uc3QganN6aXBfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianN6aXBcIikpO1xuY29uc3QgZmlsZV9zYXZlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmaWxlLXNhdmVyXCIpKTtcbmxldCBBTktJX0lORk87XG5sZXQgVVNFUl9JTkZPO1xuLy8gKGFzeW5jICgpID0+IHtcbi8vICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4vLyAgIFVTRVJfSU5GTyA9IGF3YWl0IGdldFVzZXJJbmZvKClcbi8vICAgY29uc29sZS5sb2coJ1VTRVJfSU5GTzonKTtcbi8vICAgY29uc29sZS5sb2coVVNFUl9JTkZPKTtcbi8vIH0pKClcbndlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29udGVudCBzY3JpcHQgb25NZXNzYWdlOicpO1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdmbG9tbzJtZCcpIHtcbiAgICAgICAgICAgIC8vIOWKoOi9veWFqOmDqOeslOiusFxuICAgICAgICAgICAgbGV0IG1lbW9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVtb3MnKVswXTtcbiAgICAgICAgICAgIGlmIChtZW1vcykge1xuICAgICAgICAgICAgICAgIGF1dG9TY3JvbGwobWVtb3MsIG1zZy52ZXJpZmllZCkudGhlbigoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOino+aekOeslOiusFxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVtb0xpc3QgPSB5aWVsZCBnZXRNZW1vcyhtc2cub3B0aW9ucy5hdXRvUmVjb2duaXplTm90ZVRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtc2cudmVyaWZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5r+A5rS7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1vTGlzdCA9IG1lbW9MaXN0LnNsaWNlKDAsIDIwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNZW1vTGlzdFByb21pc2VzID0gbWVtb0xpc3QubWFwKChtZW1vKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIbnrJTorrDkuK3nmoTlj4zpk75cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZCA9IG1lbW8uY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1kID0gcmVwbGFjZUhyZWYobWQsIG1lbW9MaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWbvueJh+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtby5maWxlcy5mb3JFYWNoKChpbWcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZCArPSBgIVtpbWFnZV0oaW1hZ2VzLyR7bWVtby50aW1lMn1fJHtpICsgMX0ucG5nKWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yib5bu65pe26Ze044CB5Y6f5aeL56yU6K6w5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICBtZCArPSBgXFxuWyR7bWVtby50aW1lfV0oaHR0cHM6Ly9mbG9tb2FwcC5jb20vbWluZS8/bWVtb19pZD0ke21lbW8uaWR9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZW1vLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1lbW8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogbWVtby5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBtZW1vLnRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTI6IG1lbW8udGltZTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogbWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXM6IG1lbW8uZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVtb0xpc3QgPSB5aWVsZCBQcm9taXNlLmFsbChuZXdNZW1vTGlzdFByb21pc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiL6L2956yU6K6wXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVppcEZpbGVGcm9tTWFya2Rvd25TdHJpbmdzKG5ld01lbW9MaXN0LCAnZmxvbW8ybWQnKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuLy8g6Ieq5Yqo5rua5Yqo5YiX6KGoXG5mdW5jdGlvbiBhdXRvU2Nyb2xsKG1lbW9zLCB2ZXJpZmllZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbWVtb3Muc2Nyb2xsVG9wID0gbWVtb3Muc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgaWYgKCF2ZXJpZmllZCkge1xuICAgICAgICAgICAgICAgIC8vIOacqua/gOa0u1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmQnKSkge1xuICAgICAgICAgICAgICAgIC8vIOWtmOWcqCBlbmTvvIzooajnpLrlt7LliqDovb3lrozlhajpg6jvvIzmraTml7bmuIXpmaTlrprml7bku7vliqHlubbnu5PmnZ8gUHJvbXNpZVxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxNTAwKTtcbiAgICB9KTtcbn1cbi8vIOiOt+WPlueslOiusFxuZnVuY3Rpb24gZ2V0TWVtb3MoYXV0b1JlY29nbml6ZU5vdGVUaXRsZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIOiOt+WPluaJgOaciSBjbGFzc05hbWUg5Li6IFwibWVtb1wiIOeahCBkaXYg5YWD57SgXG4gICAgICAgIGNvbnN0IG1lbW9FbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vJyk7XG4gICAgICAgIC8vIOWIm+W7uuS4gOS4quaVsOe7hOadpeS/neWtmOino+aekOWQjueahCBtZW1vIOWvueixoVxuICAgICAgICBjb25zdCBtZW1vcyA9IFtdO1xuICAgICAgICAvLyDlrZjlgqjlkI3np7DliJfooajvvIzpgb/lhY3mlofku7blkI3ph43lpI1cbiAgICAgICAgbGV0IG5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG1lbW9zTGVuZ3RoID0gKG1lbW9FbHMubGVuZ3RoKS50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgLy8g6YGN5Y6G5q+P5LiA5LiqIFwibWVtb1wiIOWFg+e0oFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbW9FbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG1lbW9FbCA9IG1lbW9FbHNbaV07XG4gICAgICAgICAgICAvLyDojrflj5YgXCJtZW1vXCIg55qEIGlkIOWAvO+8jOWNsyBkYXRhLXNsdWcg5bGe5oCn55qE5YC8XG4gICAgICAgICAgICBjb25zdCBpZCA9IG1lbW9FbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2x1ZycpIHx8ICcnO1xuICAgICAgICAgICAgLy8g6I635Y+WIFwibWVtb1wiIOWFg+e0oOS4reexu+WQjeS4uiBcInRpbWVcIiDlkowgXCJyaWNoVGV4dFwiIOeahOWtkOWFg+e0oFxuICAgICAgICAgICAgY29uc3QgdGltZUVsID0gbWVtb0VsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XG4gICAgICAgICAgICBjb25zdCByaWNoVGV4dEVsID0gbWVtb0VsLnF1ZXJ5U2VsZWN0b3IoJy5yaWNoVGV4dCcpO1xuICAgICAgICAgICAgLy8g6I635Y+WIFwidGltZVwiIOWSjCBcInJpY2hUZXh0XCIg5YWD57Sg55qE5paH5pys5YaF5a65XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gdGltZUVsID8gdGltZUVsLmlubmVyVGV4dCA6ICcnO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSByaWNoVGV4dEVsID8gcmljaFRleHRFbC5pbm5lckhUTUwgOiAnJztcbiAgICAgICAgICAgIC8vIOi9rOS4uiBtZCDmoLzlvI9cbiAgICAgICAgICAgIGNvbnRlbnQgPSB5aWVsZCBodG1sVG9tZChjb250ZW50KTtcbiAgICAgICAgICAgIC8v5aSE55CG6auY5LquXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC88XFwvP21hcms+L2csICc9PScpO1xuICAgICAgICAgICAgLy8gY29uc3QgbWQgPSBhd2FpdCBodG1sMm1kKHJpY2hUZXh0KVxuICAgICAgICAgICAgY29uc3QgdGltZTIgPSB0aW1lLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICAgICAgICAvLyDlpITnkIbmlofku7bluo/lj7dcbiAgICAgICAgICAgIGNvbnN0IHRoaXNMZW5ndGggPSAoaSArIDEpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbW9zTGVuZ3RoIC0gdGhpc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggKz0gJzAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXggKz0gKGkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgLy8g5paH5Lu25ZCN56ewXG4gICAgICAgICAgICBsZXQgbmFtZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoYXV0b1JlY29nbml6ZU5vdGVUaXRsZSkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBnZXRNZW1vTmFtZShjb250ZW50LCBuYW1lcyk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUgPyBuYW1lIDogdGltZTIgKyAnXycgKyBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWUgPSB0aW1lMiArICdfJyArIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmFtZXMucHVzaChuYW1lKTtcbiAgICAgICAgICAgIC8vIOiOt+WPluWbvueJh1xuICAgICAgICAgICAgY29uc3QgZmlsZXNFbCA9IG1lbW9FbC5xdWVyeVNlbGVjdG9yKCcuZmlsZXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzSFRNTCA9IGZpbGVzRWwgPyBmaWxlc0VsLmlubmVySFRNTCA6ICcnO1xuICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBnZXRJbWFnZURhdGFTb3VyY2VWYWx1ZXMoZmlsZXNIVE1MKTtcbiAgICAgICAgICAgIC8vIOWwhuino+aekOWQjueahCBcIm1lbW9cIiDlr7nosaHmt7vliqDliLDmlbDnu4TkuK1cbiAgICAgICAgICAgIG1lbW9zLnB1c2goeyBpZCwgbmFtZSwgaW5kZXgsIHRpbWUsIHRpbWUyLCBjb250ZW50LCBmaWxlcyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVtb3M7XG4gICAgfSk7XG59XG4vLyDlpITnkIbnrJTorrDkuK3nmoTpk77mjqVcbmZ1bmN0aW9uIHJlcGxhY2VIcmVmKG1kLCBtZW1vcykge1xuICAgIGxldCBuZXdNRCA9IG1kO1xuICAgIC8vIOaJvuWIsCBmbG9tbyDlhoXpg6jnmoTpk77mjqVcbiAgICBjb25zdCByZWdleCA9IC9cXFsuKj9cXF1cXCgoaHR0cHM6XFwvXFwvZmxvbW9hcHBcXC5jb21cXC9taW5lXFwvXFw/bWVtb19pZD0uKj8pXFwpL2c7XG4gICAgbGV0IG1hdGNoO1xuICAgIGNvbnN0IGxpbmtzID0gW107XG4gICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMobWQpKSAhPT0gbnVsbCkge1xuICAgICAgICBsaW5rcy5wdXNoKG1hdGNoWzBdKTtcbiAgICB9XG4gICAgbGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgY29uc3QgdXJsTWF0Y2ggPSBsaW5rLm1hdGNoKC9cXCgoLio/KVxcKS8pO1xuICAgICAgICBpZiAodXJsTWF0Y2ggJiYgdXJsTWF0Y2hbMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHVybE9iaiA9IG5ldyBVUkwodXJsTWF0Y2hbMV0pO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmxPYmouc2VhcmNoKTtcbiAgICAgICAgICAgIGNvbnN0IG1lbW9JZCA9IHBhcmFtcy5nZXQoJ21lbW9faWQnKTtcbiAgICAgICAgICAgIGlmIChtZW1vSWQpIHtcbiAgICAgICAgICAgICAgICAvLyDmib7liLAgbWVudGlvbiDnmoTljaHniYcgSURcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbW9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZW1vc1tpXS5pZCA9PT0gbWVtb0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7IGluZGV4OiBpLCBtZW1vOiBtZW1vc1tpXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6K6+572uIG1lbnRpb24g5Y2h54mHXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IHJlc3VsdC5tZW1vLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIG5ld01EID0gbmV3TUQucmVwbGFjZShsaW5rLCBgW01FTU9dKCR7dGl0bGV9KWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXdNRDtcbn1cbi8vIOWkhOeQhueslOiusOagh+mimFxuZnVuY3Rpb24gZ2V0TWVtb05hbWUobWQsIG5hbWVzKSB7XG4gICAgLy8g5LuO56yU6K6w5YaF5a655Lit5o+Q5Y+W5ZCN56ew5L+h5oGvXG4gICAgbGV0IG1lbW9OYW1lID0gbnVsbDtcbiAgICAvLyDlsIbovpPlhaXnmoTlrZfnrKbkuLLku6XmjaLooYznrKbliIblibLkuLrmlbDnu4RcbiAgICBsZXQgbGluZXMgPSBtZC5zcGxpdCgnXFxuJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICAgICAgLy8g5qOA5p+l5b2T5YmN6KGM5piv5ZCm5Li65LiA57qn5qCH6aKYXG4gICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMgJykpIHtcbiAgICAgICAgICAgIG1lbW9OYW1lID0gbGluZS5zdWJzdHJpbmcoMik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnInmib7liLDkuIDnuqfmoIfpopjvvIzliJnov5Tlm57nrKzkuIDkuKrkuI3lkKvmnIkgJyN0YWcnIOeahOihjFxuICAgIGlmICghbWVtb05hbWUpIHtcbiAgICAgICAgLy8g56e76Zmk6aaW6KGM5Lit55qEICcj5paH5a2XJyDmoIfnrb5cbiAgICAgICAgbGV0IGxpbmVXaXRob3V0VGFnID0gbGluZXNbMF0ucmVwbGFjZSgvI1xcUysvZywgJycpLnRyaW0oKSB8fCBsaW5lc1sxXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykudHJpbSgpIHx8IGxpbmVzWzJdLnJlcGxhY2UoLyNcXFMrL2csICcnKS50cmltKCk7XG4gICAgICAgIGlmIChsaW5lV2l0aG91dFRhZykge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBsaW5lV2l0aG91dFRhZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobWVtb05hbWUpIHtcbiAgICAgICAgLy8g5Y676Zmk5qCH6aKY5Lit55qE5Ye66ZO+XG4gICAgICAgIG1lbW9OYW1lID0gbWVtb05hbWUucmVwbGFjZSgvXFxzKlxcW01FTU9cXF1cXCguKj9cXClcXHMqL2csICcnKTtcbiAgICAgICAgLy8g6YG/5YWN5qCH6aKY6L+H6ZW/77yM5oiq5Y+W56ys5LiA5Y+lXG4gICAgICAgIGxldCBtYXRjaCA9IG1lbW9OYW1lLm1hdGNoKC8uKz8o77yMfOKAlOKAlHzjgIJ877yffO+8gSkvKTsgLy8g5Yy56YWN55u05Yiw56ys5LiA5Liq5Lit5paH6YCX5Y+344CB56C05oqY5Y+344CB5Y+l5Y+344CB6Zeu5Y+344CB5oSf5Y+55Y+35Ye6546w55qE5omA5pyJ5a2X56ymXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBtYXRjaFswXS5zbGljZSgwLCAtMSk7IC8vIOenu+mZpOaUtuWwvueahOS4reaWh+mAl+WPt+OAgeegtOaKmOWPt+OAgeWPpeWPt+OAgemXruWPt+OAgeaEn+WPueWPt1xuICAgICAgICB9XG4gICAgICAgIG1lbW9OYW1lID0gbWVtb05hbWUucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHNdL2csICcnKTtcbiAgICAgICAgLy8g6YG/5YWNIG5hbWUg6YeN5ZCNXG4gICAgICAgIGxldCBuZXdOYW1lID0gbWVtb05hbWU7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAobmFtZXMuaW5kZXhPZihuZXdOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8g5a2Y5Zyo5ZCM5ZCN55qE56yU6K6wXG4gICAgICAgICAgICAgICAgbmV3TmFtZSA9IG1lbW9OYW1lICsgYCgke2NvdW50ICsgMX0pYDtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5LiN5a2Y5Zyo5ZCM5ZCN55qE56yU6K6wXG4gICAgICAgICAgICAgICAgbWVtb05hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZW1vTmFtZS5yZXBsYWNlKC9cXCAvZywgJycpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIC8v5ZCN56ew5Y+q5a2Y5Zyo56m65qC8XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBsZXQgY291bnQgPSAwO1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgaWYgKG5hbWVzW2ldID09PSBtZW1vTmFtZSkge1xuICAgICAgICAvLyAgICAgY291bnQrKztcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAvLyAgIG1lbW9OYW1lICs9IGAoJHtjb3VudH0pYFxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBtZW1vTmFtZTtcbn1cbi8vIOiOt+WPlueslOiusOS4reeahOWbvueJh1xuZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhU291cmNlVmFsdWVzKGh0bWwpIHtcbiAgICAvLyDkvb/nlKggRE9NUGFyc2VyIOS7jiBIVE1MIOWtl+espuS4suWIm+W7uuS4gOS4quaWsOeahCBEb2N1bWVudCDlr7nosaFcbiAgICBsZXQgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJyk7XG4gICAgLy8g6I635Y+W5omA5pyJ55qEIGltZyDlhYPntKBcbiAgICBsZXQgaW1nRWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xuICAgIC8vIOWIm+W7uuS4gOS4quaVsOe7hO+8jOWwhuavj+S4qiBpbWcg5YWD57Sg55qEIGRhdGEtc291cmNlIOWxnuaAp+WAvOaUvuWFpeaVsOe7hFxuICAgIGxldCBkYXRhU291cmNlVmFsdWVzID0gQXJyYXkuZnJvbShpbWdFbGVtZW50cykubWFwKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgcmV0dXJuIGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGFTb3VyY2VWYWx1ZXM7XG59XG4vLyBodG1sIOi9rOS4uiBtZCDmoLzlvI9cbmNvbnN0IGh0bWxUb21kID0gKGh0bWxTdHJpbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBtYXJrZG93blN0ciA9ICgwLCBodG1sX3RvX21kXzEuZGVmYXVsdCkoaHRtbFN0cmluZyk7XG4gICAgLy8g5qCH562+XG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcIy9nLCAnIycpO1xuICAgIC8vIOWIhumalOe6v1xuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXC0tLS9nLCAnLS0tJyk7XG4gICAgLy8g5peg5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcLSAvZywgJy0gJyk7XG4gICAgLy8g5pyJ5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcXFwuIC9nLCAnLiAnKTtcbiAgICAvLyDliqDnspdcbiAgICBtYXJrZG93blN0ciA9IG1hcmtkb3duU3RyLnJlcGxhY2UoL1xcXFxcXCpcXFxcXFwqL2csIFwiKipcIik7XG4gICAgLy8g5Y676ZmkICNUYWcg55qE5Yqg57KX5pWI5p6cXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXCpcXCooIy4rPylcXCpcXCovZywgXCIkMVwiKTtcbiAgICByZXR1cm4gbWFya2Rvd25TdHI7XG59KTtcbi8vIOS4i+i9veeslOiusFxuY29uc3QgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MgPSAobWVtb3MsIGZpbGVuYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB6aXAgPSBuZXcganN6aXBfMS5kZWZhdWx0KCk7XG4gICAgLy8g5a2Y5pS+5omA5pyJ5Zu+54mH5LiL6L295Lu75Yqh55qE5pWw57uEXG4gICAgbGV0IGltYWdlc1Rhc2tzID0gW107XG4gICAgLy8g6YGN5Y6G5q+P5LiA5LiqIG1lbW9cbiAgICBtZW1vcy5mb3JFYWNoKChtZW1vLCBpKSA9PiB7XG4gICAgICAgIC8vIOWcqCB6aXAg5paH5Lu25Lit5re75Yqg5LiA5Liq5paw55qEIG1kIOaWh+S7tlxuICAgICAgICBjb25zdCBjb250ZW50ID0gbWVtby5jb250ZW50O1xuICAgICAgICB6aXAuZmlsZShgJHttZW1vLm5hbWV9Lm1kYCwgY29udGVudCk7XG4gICAgICAgIC8vIOS4i+i9veWbvueJh1xuICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZ1VybCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGltZ1VybCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBmZXRjaChpbWdVcmwpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJsb2IoKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oaW1nRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHppcC5maWxlKGBpbWFnZXMvJHttZW1vLnRpbWUyfV8ke2kgKyAxfS5wbmdgLCBpbWdEYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbWFnZXNUYXNrcy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnrYnlvoXmiYDmnInlm77niYfkuIvovb3lrozmr5VcbiAgICB5aWVsZCBQcm9taXNlLmFsbChpbWFnZXNUYXNrcyk7XG4gICAgLy8g55Sf5oiQIHppcCDmlofku7blubbkv53lrZjliLDnlKjmiLforr7lpIdcbiAgICBjb25zdCBjb250ZW50ID0geWllbGQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gICAgZmlsZV9zYXZlcl8xLmRlZmF1bHQuc2F2ZUFzKGNvbnRlbnQsIGZpbGVuYW1lKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9