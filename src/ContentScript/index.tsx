import browser from 'webextension-polyfill'

// import htmlToMarkdown from '@wcj/html-to-markdown';
import html2md from 'html-to-md'
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { getUserInfo } from "../utils/util"
import { memoType } from "../types"
import { memo } from 'react';


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
        let memoList: Array<memoType> = await getMemos(msg.options.autoRecognizeNoteTitle)

        if (!msg.verified) {
          //未激活
          memoList = memoList.slice(0, 20);
        }

        const newMemoListPromises = memoList.map(async memo => {
          // 处理笔记中的双链
          let md = memo.content
          md = replaceHref(md, memoList)
          // 图片信息
          memo.files.forEach((img, i) => {
            md += `![image](images/${memo.time2}_${i + 1}.png)`
          });
          //创建时间、原始笔记信息
          md += `\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`

          return {
            id: memo.id,
            name: memo.name,
            index: memo.index,
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
async function getMemos(autoRecognizeNoteTitle: boolean): Promise<memoType[]> {
  // 获取所有 className 为 "memo" 的 div 元素
  const memoEls = document.getElementsByClassName('memo');

  // 创建一个数组来保存解析后的 memo 对象
  const memos = [];
  // 存储名称列表，避免文件名重复
  let names: string[] = []

  const memosLength = (memoEls.length).toString().length
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
    let content = richTextEl ? richTextEl.innerHTML : '';
    // 转为 md 格式
    content = await htmlTomd(content)
    //处理高亮
    content = content.replace(/<\/?mark>/g, '==');

    // const md = await html2md(richText)
    const time2 = time.replace(/\D/g, '');

    // 处理文件序号
    const thisLength = (i + 1).toString().length
    let index = ''
    for (let i = 0; i < memosLength - thisLength; i++) {
      index += '0'
    }
    index += (i + 1).toString()

    // 文件名称
    let name: string | null = null
    if (autoRecognizeNoteTitle) {
      name = getMemoName(content, names)
      name = name ? name : time2 + '_' + index
    } else {
      name = time2 + '_' + index
    }

    names.push(name)

    // 获取图片
    const filesEl = memoEl.querySelector('.files')
    const filesHTML = filesEl ? filesEl.innerHTML : ''
    const files = getImageDataSourceValues(filesHTML)

    // 将解析后的 "memo" 对象添加到数组中
    memos.push({ id, name, index, time, time2, content, files });
  }

  return memos;
}

// 处理笔记中的链接
function replaceHref(md: string, memos: memoType[]) {
  let newMD = md
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
        let result: null | { index: number, memo: memoType } = null

        for (let i = 0; i < memos.length; i++) {
          if (memos[i].id === memoId) {
            result = { index: i, memo: memos[i] }
            break
          }
        }

        // 设置 mention 卡片
        if (result) {

          const title = result.memo.name
          newMD = newMD.replace(link, `[MEMO](${title})`)

        }

      }
    }


  });

  return newMD
}

// 处理笔记标题
function getMemoName(md: string, names: string[]) {
  // 从笔记内容中提取名称信息
  let memoName = null
  // 将输入的字符串以换行符分割为数组
  let lines = md.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // 检查当前行是否为一级标题
    if (line.startsWith('# ')) {
      memoName = line.substring(2);
      break
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
    let match = memoName.match(/.+?(，|——|。|？|！)/);  // 匹配直到第一个中文逗号、破折号、句号、问号、感叹号出现的所有字符
    if (match) {
      memoName = match[0].slice(0, -1);  // 移除收尾的中文逗号、破折号、句号、问号、感叹号
    }
    memoName = memoName.replace(/[<>:"/\\|?*\s]/g, '');
    // 避免 name 重名
    let newName = memoName
    let count = 0
    while (true) {
      if (names.indexOf(newName) > -1) {
        // 存在同名的笔记
        newName = memoName + `(${count + 1})`
        count++
      } else {
        // 不存在同名的笔记
        memoName = newName
        break
      }

    }

    if (memoName.replace(/\ /g, '').length < 1) {
      //名称只存在空格
      return null
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
const htmlTomd = async (htmlString: string) => {

  let markdownStr = html2md(htmlString);
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

  return markdownStr
}

// 下载笔记
const createZipFileFromMarkdownStrings = async (memos: memoType[], filename: string) => {
  const zip = new JSZip();
  // 存放所有图片下载任务的数组
  let imagesTasks: Promise<void>[] = [];
  // 遍历每一个 memo
  memos.forEach((memo, i) => {
    // 在 zip 文件中添加一个新的 md 文件
    const content = memo.content
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
  await Promise.all(imagesTasks);

  // 生成 zip 文件并保存到用户设备
  const content = await zip.generateAsync({ type: 'blob' });
  FileSaver.saveAs(content, filename);
}