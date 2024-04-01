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
                            md += `\n![image](images/${memo.time2}_${i + 1}.png)`;
                        });
                        if (msg.options.exportTimeInfoValue) {
                            //创建时间、原始笔记信息
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
            let name = '';
            name = time2 + '_' + index;
            try {
                if (autoRecognizeNoteTitle) {
                    // 处理文件名称
                    const newName = getMemoName(content, names);
                    name = newName ? newName : time2 + '_' + index;
                    // 删除一级标题
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
                                // 去除 # 符号
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRDtXQUN0RCxzQ0FBc0MsaUVBQWlFO1dBQ3ZHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDVkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7V0NoREE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiKSk7XG4vLyBpbXBvcnQgaHRtbFRvTWFya2Rvd24gZnJvbSAnQHdjai9odG1sLXRvLW1hcmtkb3duJztcbmNvbnN0IGh0bWxfdG9fbWRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiaHRtbC10by1tZFwiKSk7XG5jb25zdCBqc3ppcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqc3ppcFwiKSk7XG5jb25zdCBmaWxlX3NhdmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZpbGUtc2F2ZXJcIikpO1xubGV0IEFOS0lfSU5GTztcbmxldCBVU0VSX0lORk87XG4vLyAoYXN5bmMgKCkgPT4ge1xuLy8gICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbi8vICAgVVNFUl9JTkZPID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuLy8gICBjb25zb2xlLmxvZygnVVNFUl9JTkZPOicpO1xuLy8gICBjb25zb2xlLmxvZyhVU0VSX0lORk8pO1xuLy8gfSkoKVxud2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50IHNjcmlwdCBvbk1lc3NhZ2U6Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2Zsb21vMm1kJykge1xuICAgICAgICAgICAgLy8g5Yqg6L295YWo6YOo56yU6K6wXG4gICAgICAgICAgICBsZXQgbWVtb3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW1vcycpWzBdO1xuICAgICAgICAgICAgaWYgKG1lbW9zKSB7XG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbChtZW1vcywgbXNnLnZlcmlmaWVkKS50aGVuKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6Kej5p6Q56yU6K6wXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZW1vTGlzdCA9IHlpZWxkIGdldE1lbW9zKG1zZy5vcHRpb25zLmF1dG9SZWNvZ25pemVOb3RlVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1zZy52ZXJpZmllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKrmv4DmtLtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbW9MaXN0ID0gbWVtb0xpc3Quc2xpY2UoMCwgMjApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01lbW9MaXN0UHJvbWlzZXMgPSBtZW1vTGlzdC5tYXAoKG1lbW8pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhueslOiusOS4reeahOWPjOmTvlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1kID0gbWVtby5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWQgPSByZXBsYWNlSHJlZihtZCwgbWVtb0xpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Zu+54mH5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGBcXG4hW2ltYWdlXShpbWFnZXMvJHttZW1vLnRpbWUyfV8ke2kgKyAxfS5wbmcpYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1zZy5vcHRpb25zLmV4cG9ydFRpbWVJbmZvVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WIm+W7uuaXtumXtOOAgeWOn+Wni+eslOiusOS/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kICs9IGBcXG5cXG5bJHttZW1vLnRpbWV9XShodHRwczovL2Zsb21vYXBwLmNvbS9taW5lLz9tZW1vX2lkPSR7bWVtby5pZH0pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lbW8uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbWVtby5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBtZW1vLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG1lbW8udGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lMjogbWVtby50aW1lMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBtZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogbWVtby5maWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNZW1vTGlzdCA9IHlpZWxkIFByb21pc2UuYWxsKG5ld01lbW9MaXN0UHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyDkuIvovb3nrJTorrBcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MobmV3TWVtb0xpc3QsICdmbG9tbzJtZCcpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4vLyDoh6rliqjmu5rliqjliJfooahcbmZ1bmN0aW9uIGF1dG9TY3JvbGwobWVtb3MsIHZlcmlmaWVkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBtZW1vcy5zY3JvbGxUb3AgPSBtZW1vcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoIXZlcmlmaWVkKSB7XG4gICAgICAgICAgICAgICAgLy8g5pyq5r+A5rS7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZCcpKSB7XG4gICAgICAgICAgICAgICAgLy8g5a2Y5ZyoIGVuZO+8jOihqOekuuW3suWKoOi9veWujOWFqOmDqO+8jOatpOaXtua4hemZpOWumuaXtuS7u+WKoeW5tue7k+adnyBQcm9tc2llXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDE1MDApO1xuICAgIH0pO1xufVxuLy8g6I635Y+W56yU6K6wXG5mdW5jdGlvbiBnZXRNZW1vcyhhdXRvUmVjb2duaXplTm90ZVRpdGxlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8g6I635Y+W5omA5pyJIGNsYXNzTmFtZSDkuLogXCJtZW1vXCIg55qEIGRpdiDlhYPntKBcbiAgICAgICAgY29uc3QgbWVtb0VscyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbW8nKTtcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5pWw57uE5p2l5L+d5a2Y6Kej5p6Q5ZCO55qEIG1lbW8g5a+56LGhXG4gICAgICAgIGNvbnN0IG1lbW9zID0gW107XG4gICAgICAgIC8vIOWtmOWCqOWQjeensOWIl+ihqO+8jOmBv+WFjeaWh+S7tuWQjemHjeWkjVxuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbWVtb3NMZW5ndGggPSAobWVtb0Vscy5sZW5ndGgpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAvLyDpgY3ljobmr4/kuIDkuKogXCJtZW1vXCIg5YWD57SgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb0Vscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbWVtb0VsID0gbWVtb0Vsc1tpXTtcbiAgICAgICAgICAgIC8vIOiOt+WPliBcIm1lbW9cIiDnmoQgaWQg5YC877yM5Y2zIGRhdGEtc2x1ZyDlsZ7mgKfnmoTlgLxcbiAgICAgICAgICAgIGNvbnN0IGlkID0gbWVtb0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zbHVnJykgfHwgJyc7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJtZW1vXCIg5YWD57Sg5Lit57G75ZCN5Li6IFwidGltZVwiIOWSjCBcInJpY2hUZXh0XCIg55qE5a2Q5YWD57SgXG4gICAgICAgICAgICBjb25zdCB0aW1lRWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbiAgICAgICAgICAgIGNvbnN0IHJpY2hUZXh0RWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLnJpY2hUZXh0Jyk7XG4gICAgICAgICAgICAvLyDojrflj5YgXCJ0aW1lXCIg5ZKMIFwicmljaFRleHRcIiDlhYPntKDnmoTmlofmnKzlhoXlrrlcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aW1lRWwgPyB0aW1lRWwuaW5uZXJUZXh0IDogJyc7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IHJpY2hUZXh0RWwgPyByaWNoVGV4dEVsLmlubmVySFRNTCA6ICcnO1xuICAgICAgICAgICAgLy8g6L2s5Li6IG1kIOagvOW8j1xuICAgICAgICAgICAgY29udGVudCA9IHlpZWxkIGh0bWxUb21kKGNvbnRlbnQpO1xuICAgICAgICAgICAgLy/lpITnkIbpq5jkuq5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLzxcXC8/bWFyaz4vZywgJz09Jyk7XG4gICAgICAgICAgICAvLyBjb25zdCBtZCA9IGF3YWl0IGh0bWwybWQocmljaFRleHQpXG4gICAgICAgICAgICBjb25zdCB0aW1lMiA9IHRpbWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgICAgICAgIC8vIOWkhOeQhuaWh+S7tuW6j+WPt1xuICAgICAgICAgICAgY29uc3QgdGhpc0xlbmd0aCA9IChpICsgMSkudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb3NMZW5ndGggLSB0aGlzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCArPSAoaSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyDmlofku7blkI3np7BcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XG4gICAgICAgICAgICBuYW1lID0gdGltZTIgKyAnXycgKyBpbmRleDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGF1dG9SZWNvZ25pemVOb3RlVGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG5paH5Lu25ZCN56ewXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSBnZXRNZW1vTmFtZShjb250ZW50LCBuYW1lcyk7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuZXdOYW1lID8gbmV3TmFtZSA6IHRpbWUyICsgJ18nICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWIoOmZpOS4gOe6p+agh+mimFxuICAgICAgICAgICAgICAgICAgICAvLyDlsIbovpPlhaXnmoTlrZfnrKbkuLLku6XmjaLooYznrKbliIblibLkuLrmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qOA5p+l5b2T5YmN6KGM5piv5ZCm5Li65LiA57qn5qCH6aKYXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjICcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2Rvd25MaW5rUmVnZXggPSAvXFxbKFteXFxdXSspXFxdXFwoKFteKV0rKVxcKS87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzTWFya2Rvd25MaW5rID0gbWFya2Rvd25MaW5rUmVnZXgudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzTWFya2Rvd25MaW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOagh+mimOS4reWMheWQq+mTvuaOpVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDljrvpmaQgIyDnrKblj7dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShsaW5lLCBsaW5lLnN1YnN0cmluZygyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDliKDpmaTmraPmlofkuK3nmoTmoIfpopjkv6Hmga/vvIzlj6rkv53nlZnmlofku7blkI3kvZzkuLrmoIfpophcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bCG5YaF5a655oyJ6KGM5YiG5Ymy5oiQ5pWw57uEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50TGluZXMgPSBjb250ZW50LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Yib5bu65LiA5Liq5paw5pWw57uE77yM5LiN5YyF5ZCr6KaB5Yig6Zmk55qE6KGMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMaW5lcyA9IGNvbnRlbnRMaW5lcy5maWx0ZXIoKGNvbnRlbnRMaW5lKSA9PiBjb250ZW50TGluZSAhPT0gbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWwhuaWsOaVsOe7hOaLvOaOpeWbnuaWh+acrOW9ouW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudExpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICAvLyDojrflj5blm77niYdcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzRWwgPSBtZW1vRWwucXVlcnlTZWxlY3RvcignLmZpbGVzJyk7XG4gICAgICAgICAgICBjb25zdCBmaWxlc0hUTUwgPSBmaWxlc0VsID8gZmlsZXNFbC5pbm5lckhUTUwgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gZ2V0SW1hZ2VEYXRhU291cmNlVmFsdWVzKGZpbGVzSFRNTCk7XG4gICAgICAgICAgICAvLyDlsIbop6PmnpDlkI7nmoQgXCJtZW1vXCIg5a+56LGh5re75Yqg5Yiw5pWw57uE5LitXG4gICAgICAgICAgICBtZW1vcy5wdXNoKHsgaWQsIG5hbWUsIGluZGV4LCB0aW1lLCB0aW1lMiwgY29udGVudCwgZmlsZXMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbW9zO1xuICAgIH0pO1xufVxuLy8g5aSE55CG56yU6K6w5Lit55qE6ZO+5o6lXG5mdW5jdGlvbiByZXBsYWNlSHJlZihtZCwgbWVtb3MpIHtcbiAgICBsZXQgbmV3TUQgPSBtZDtcbiAgICAvLyDmib7liLAgZmxvbW8g5YaF6YOo55qE6ZO+5o6lXG4gICAgY29uc3QgcmVnZXggPSAvXFxbLio/XFxdXFwoKGh0dHBzOlxcL1xcL2Zsb21vYXBwXFwuY29tXFwvbWluZVxcL1xcP21lbW9faWQ9Lio/KVxcKS9nO1xuICAgIGxldCBtYXRjaDtcbiAgICBjb25zdCBsaW5rcyA9IFtdO1xuICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKG1kKSkgIT09IG51bGwpIHtcbiAgICAgICAgbGlua3MucHVzaChtYXRjaFswXSk7XG4gICAgfVxuICAgIGxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGNvbnN0IHVybE1hdGNoID0gbGluay5tYXRjaCgvXFwoKC4qPylcXCkvKTtcbiAgICAgICAgaWYgKHVybE1hdGNoICYmIHVybE1hdGNoWzFdKSB7XG4gICAgICAgICAgICBjb25zdCB1cmxPYmogPSBuZXcgVVJMKHVybE1hdGNoWzFdKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsT2JqLnNlYXJjaCk7XG4gICAgICAgICAgICBjb25zdCBtZW1vSWQgPSBwYXJhbXMuZ2V0KCdtZW1vX2lkJyk7XG4gICAgICAgICAgICBpZiAobWVtb0lkKSB7XG4gICAgICAgICAgICAgICAgLy8g5om+5YiwIG1lbnRpb24g55qE5Y2h54mHIElEXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1vcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVtb3NbaV0uaWQgPT09IG1lbW9JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBpbmRleDogaSwgbWVtbzogbWVtb3NbaV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOiuvue9riBtZW50aW9uIOWNoeeJh1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSByZXN1bHQubWVtby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBuZXdNRCA9IG5ld01ELnJlcGxhY2UobGluaywgYFtNRU1PXSgke3RpdGxlfSlgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3TUQ7XG59XG4vLyDlpITnkIbnrJTorrDmoIfpophcbmZ1bmN0aW9uIGdldE1lbW9OYW1lKG1kLCBuYW1lcykge1xuICAgIGxldCBoYXZlSGVhZGxpbmcgPSBmYWxzZTtcbiAgICAvLyDku47nrJTorrDlhoXlrrnkuK3mj5Dlj5blkI3np7Dkv6Hmga9cbiAgICBsZXQgbWVtb05hbWUgPSBudWxsO1xuICAgIC8vIOWwhui+k+WFpeeahOWtl+espuS4suS7peaNouihjOespuWIhuWJsuS4uuaVsOe7hFxuICAgIGxldCBsaW5lcyA9IG1kLnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xuICAgICAgICAvLyDmo4Dmn6XlvZPliY3ooYzmmK/lkKbkuLrkuIDnuqfmoIfpophcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyAnKSkge1xuICAgICAgICAgICAgbWVtb05hbWUgPSBsaW5lLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGhhdmVIZWFkbGluZyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDlpoLmnpzmsqHmnInmib7liLDkuIDnuqfmoIfpophcbiAgICBpZiAoIW1lbW9OYW1lKSB7XG4gICAgICAgIC8vIOWwhuWktOWHoOihjOeahOaWh+Wtl+S9nOS4uuagh+mimFxuICAgICAgICBsZXQgbGluZVdpdGhvdXRUYWcgPSAnJztcbiAgICAgICAgLy8g6YCQ5Liq5p+l5om+6Z2e56m65YWD57Sg77yM55u05Yiw5om+5Yiw6Z2e56m65YWD57Sg5oiW6YGN5Y6G5a6MbGluZXPmlbDnu4TkuLrmraJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVzW2ldKSB7XG4gICAgICAgICAgICAgICAgbGluZVdpdGhvdXRUYWcgPSBsaW5lc1tpXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykudHJpbSgpO1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOaJvuWIsOmdnuepuuWFg+e0oO+8jOWImei3s+WHuuW+queOr1xuICAgICAgICAgICAgICAgIGlmIChsaW5lV2l0aG91dFRhZykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA+IDIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZVdpdGhvdXRUYWcpIHtcbiAgICAgICAgICAgIG1lbW9OYW1lID0gbGluZVdpdGhvdXRUYWc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1lbW9OYW1lKSB7XG4gICAgICAgIC8vIOWOu+mZpOagh+mimOS4reeahOWHuumTvlxuICAgICAgICBtZW1vTmFtZSA9IG1lbW9OYW1lLnJlcGxhY2UoL1xcWyhbXlxcXV0rKVxcXVxcKChbXildKylcXCkvZywgJycpO1xuICAgICAgICBpZiAoIWhhdmVIZWFkbGluZykge1xuICAgICAgICAgICAgLy8g5aaC5p6cXG4gICAgICAgICAgICAvLyDpgb/lhY3moIfpopjov4fplb/vvIzmiKrlj5bnrKzkuIDlj6VcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IG1lbW9OYW1lLm1hdGNoKC8uKz8o77yMfOKAlOKAlHzjgIJ877yffO+8gSkvKTsgLy8g5Yy56YWN55u05Yiw56ys5LiA5Liq5Lit5paH6YCX5Y+344CB56C05oqY5Y+344CB5Y+l5Y+344CB6Zeu5Y+344CB5oSf5Y+55Y+35Ye6546w55qE5omA5pyJ5a2X56ymXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBtZW1vTmFtZSA9IG1hdGNoWzBdLnNsaWNlKDAsIC0xKTsgLy8g56e76Zmk5pS25bC+55qE5Lit5paH6YCX5Y+344CB56C05oqY5Y+344CB5Y+l5Y+344CB6Zeu5Y+344CB5oSf5Y+55Y+3XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVtb05hbWUgPSBtZW1vTmFtZS5yZXBsYWNlKC9bPD46XCIvXFxcXHw/Klxcc10vZywgJycpO1xuICAgICAgICAvLyDpgb/lhY0gbmFtZSDph43lkI1cbiAgICAgICAgbGV0IG5ld05hbWUgPSBtZW1vTmFtZTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDUwMCkge1xuICAgICAgICAgICAgICAgIC8vIOmBv+WFjeatu+W+queOr1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVzLmluZGV4T2YobmV3TmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIOWtmOWcqOWQjOWQjeeahOeslOiusFxuICAgICAgICAgICAgICAgIG5ld05hbWUgPSBtZW1vTmFtZSArIGAoJHtjb3VudCArIDF9KWA7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOS4jeWtmOWcqOWQjOWQjeeahOeslOiusFxuICAgICAgICAgICAgICAgIG1lbW9OYW1lID0gbmV3TmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVtb05hbWUudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy/lkI3np7Dlj6rlrZjlnKjnqbrmoLxcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZW1vTmFtZTtcbn1cbi8vIOiOt+WPlueslOiusOS4reeahOWbvueJh1xuZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhU291cmNlVmFsdWVzKGh0bWwpIHtcbiAgICAvLyDkvb/nlKggRE9NUGFyc2VyIOS7jiBIVE1MIOWtl+espuS4suWIm+W7uuS4gOS4quaWsOeahCBEb2N1bWVudCDlr7nosaFcbiAgICBsZXQgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJyk7XG4gICAgLy8g6I635Y+W5omA5pyJ55qEIGltZyDlhYPntKBcbiAgICBsZXQgaW1nRWxlbWVudHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xuICAgIC8vIOWIm+W7uuS4gOS4quaVsOe7hO+8jOWwhuavj+S4qiBpbWcg5YWD57Sg55qEIGRhdGEtc291cmNlIOWxnuaAp+WAvOaUvuWFpeaVsOe7hFxuICAgIGxldCBkYXRhU291cmNlVmFsdWVzID0gQXJyYXkuZnJvbShpbWdFbGVtZW50cykubWFwKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgcmV0dXJuIGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGFTb3VyY2VWYWx1ZXM7XG59XG4vLyBodG1sIOi9rOS4uiBtZCDmoLzlvI9cbmNvbnN0IGh0bWxUb21kID0gKGh0bWxTdHJpbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBtYXJrZG93blN0ciA9ICgwLCBodG1sX3RvX21kXzEuZGVmYXVsdCkoaHRtbFN0cmluZywge1xuICAgICAgICBza2lwVGFnczogW1xuICAgICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgJ2h0bWwnLFxuICAgICAgICAgICAgJ2JvZHknLFxuICAgICAgICAgICAgJ25hdicsXG4gICAgICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgICAgICAnZm9vdGVyJyxcbiAgICAgICAgICAgICdtYWluJyxcbiAgICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgICAnYXJ0aWNsZScsXG4gICAgICAgICAgICAnaGVhZGVyJ1xuICAgICAgICBdXG4gICAgfSk7XG4gICAgLy8g5qCH562+XG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcIy9nLCAnIycpO1xuICAgIC8vIOWIhumalOe6v1xuICAgIG1hcmtkb3duU3RyID0gbWFya2Rvd25TdHIucmVwbGFjZSgvXFxcXC0tLS9nLCAnLS0tJyk7XG4gICAgLy8g5peg5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcLSAvZywgJy0gJyk7XG4gICAgLy8g5pyJ5bqP5YiX6KGoXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXFxcXFwuIC9nLCAnLiAnKTtcbiAgICAvLyDliqDnspdcbiAgICBtYXJrZG93blN0ciA9IG1hcmtkb3duU3RyLnJlcGxhY2UoL1xcXFxcXCpcXFxcXFwqL2csIFwiKipcIik7XG4gICAgLy8g5Y676ZmkICNUYWcg55qE5Yqg57KX5pWI5p6cXG4gICAgbWFya2Rvd25TdHIgPSBtYXJrZG93blN0ci5yZXBsYWNlKC9cXCpcXCooIy4rPylcXCpcXCovZywgXCIkMVwiKTtcbiAgICByZXR1cm4gbWFya2Rvd25TdHI7XG59KTtcbi8vIOS4i+i9veeslOiusFxuY29uc3QgY3JlYXRlWmlwRmlsZUZyb21NYXJrZG93blN0cmluZ3MgPSAobWVtb3MsIGZpbGVuYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB6aXAgPSBuZXcganN6aXBfMS5kZWZhdWx0KCk7XG4gICAgLy8g5a2Y5pS+5omA5pyJ5Zu+54mH5LiL6L295Lu75Yqh55qE5pWw57uEXG4gICAgbGV0IGltYWdlc1Rhc2tzID0gW107XG4gICAgLy8g6YGN5Y6G5q+P5LiA5LiqIG1lbW9cbiAgICBtZW1vcy5mb3JFYWNoKChtZW1vLCBpKSA9PiB7XG4gICAgICAgIC8vIOWcqCB6aXAg5paH5Lu25Lit5re75Yqg5LiA5Liq5paw55qEIG1kIOaWh+S7tlxuICAgICAgICBjb25zdCBjb250ZW50ID0gbWVtby5jb250ZW50O1xuICAgICAgICB6aXAuZmlsZShgJHttZW1vLm5hbWV9Lm1kYCwgY29udGVudCk7XG4gICAgICAgIC8vIOS4i+i9veWbvueJh1xuICAgICAgICBtZW1vLmZpbGVzLmZvckVhY2goKGltZ1VybCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGltZ1VybCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBmZXRjaChpbWdVcmwpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmJsb2IoKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oaW1nRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHppcC5maWxlKGBpbWFnZXMvJHttZW1vLnRpbWUyfV8ke2kgKyAxfS5wbmdgLCBpbWdEYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbWFnZXNUYXNrcy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDnrYnlvoXmiYDmnInlm77niYfkuIvovb3lrozmr5VcbiAgICB5aWVsZCBQcm9taXNlLmFsbChpbWFnZXNUYXNrcyk7XG4gICAgLy8g55Sf5oiQIHppcCDmlofku7blubbkv53lrZjliLDnlKjmiLforr7lpIdcbiAgICBjb25zdCBjb250ZW50ID0geWllbGQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gICAgZmlsZV9zYXZlcl8xLmRlZmF1bHQuc2F2ZUFzKGNvbnRlbnQsIGZpbGVuYW1lKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9