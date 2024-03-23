import browser from 'webextension-polyfill'

import htmlToMarkdown from '@wcj/html-to-markdown';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { getUserInfo } from "../utils/util"
import { memoType } from "../types"


let ANKI_INFO: any
let USER_INFO: any

// (async () => {
//   // 获取用户信息
//   USER_INFO = await getUserInfo()

//   console.log('USER_INFO:');
//   console.log(USER_INFO);

// })()


browser.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {

  console.log('content script onMessage:');
  console.log(msg);

  if (msg.type === 'flomo2md') {
    // 加载全部笔记
    let memos = document.getElementsByClassName('memos')[0];
    if (memos) {

      autoScroll(memos as HTMLElement, msg.verified).then(async () => {
        // 解析笔记
        let memoList: Array<memoType> = await getMemos()
        if (!msg.verified) {
          //未激活
          memoList = memoList.slice(0, 20);
        }

        const newMemoListPromises = memoList.map(async memo => {
          // 处理笔记中的双链
          const html = replaceHref(memo.content, memoList)
          // 将内容转为 md 格式
          let md = await html2md(html)
          // 在 md 中添加图片
          memo.files.forEach((img, i) => {
            md += `![image](images/${memo.time2}_${i}.png)`
          });
          //创建时间信息
          md += `\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`

          return {
            id: memo.id,
            time: memo.time,
            time2: memo.time2,
            content: md,
            files: memo.files
          }
        })
        const newMemoList: Array<memoType> = await Promise.all(newMemoListPromises);
        // 下载笔记
        createZipFileFromMarkdownStrings(newMemoList, 'flomo2md')
      })
    }

  }

})

// 自动滚动列表
function autoScroll(memos: HTMLElement, verified: boolean): Promise<void> {
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
async function getMemos(): Promise<memoType[]> {
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
    const time = timeEl ? (timeEl as HTMLElement).innerText : '';
    const content = richTextEl ? richTextEl.innerHTML : '';
    // const md = await html2md(richText)
    const time2 = time.replace(/\D/g, '');

    // 获取图片
    const filesEl = memoEl.querySelector('.files')
    const filesHTML = filesEl ? filesEl.innerHTML : ''
    const files = getImageDataSourceValues(filesHTML)

    // 将解析后的 "memo" 对象添加到数组中
    memos.push({ id, time, time2, content, files });
  }

  return memos;
}

// 处理笔记中的链接
function replaceHref(html: string, memos: memoType[]) {
  // 创建一个 DOM 解析器
  const parser = new DOMParser();
  // 使用 DOM 解析器解析 html 字符串，得到一个 Document 对象
  const doc = parser.parseFromString(html, 'text/html');

  // 获取所有 href 属性值包含 'abcd' 的 a 标签
  const aTags = doc.querySelectorAll('a[href*="https://flomoapp.com/mine/?memo_id"]');

  // 遍历所有的 a 标签
  aTags.forEach(aTag => {
    const anchor = aTag as HTMLAnchorElement;
    // 创建一个新的 URL 对象
    const url = new URL(anchor.href);
    // 获取 url 中的 memo_id 值
    const memoId = url.searchParams.get('memo_id');

    if (memoId) {
      // 找到 mention 的卡片 ID
      const memo = memos.find(item => item.id === memoId);
      // 设置 mention 卡片
      if (memo) {
        aTag.setAttribute('href', memo?.time2);
      }

    }
  });

  // 返回修改后的 HTML 字符串
  return doc.body.innerHTML;
}

// 获取笔记中的图片
function getImageDataSourceValues(html: string): (string | null)[] {
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
const html2md = async (htmlString: string) => {

  let markdownStr = await htmlToMarkdown({ html: htmlString });
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

  return markdownStr
}

// 下载笔记
const createZipFileFromMarkdownStrings = async (memos: memoType[], filename: string) => {
  const zip = new JSZip();
  // 存放所有图片下载任务的数组
  let imagesTasks: Promise<void>[] = [];
  // 遍历每一个 memo
  const memosLength = (memos.length).toString().length
  memos.forEach((memo, i) => {
    const title = memo.time2

    // 处理文件序号
    const thisLength = i.toString().length
    let index = ''
    for (let i = 0; i < memosLength - thisLength; i++) {
      index += '0'
    }

    // 在 zip 文件中添加一个新的 md 文件
    const content = memo.content
    zip.file(`${title}_${index + (i + 1)}.md`, content);
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
  await Promise.all(imagesTasks);

  // 生成 zip 文件并保存到用户设备
  const content = await zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(content, filename);
}