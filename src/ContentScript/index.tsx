import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import htmlToMarkdown from '@wcj/html-to-markdown';
import html2md from 'html-to-md'
import JSZip from 'jszip';
import FileSaver from 'file-saver';

// import { getUserInfo } from "../utils/util"
import { memoType } from "../types"
import { memo } from 'react';
import { Options } from 'Options';
import copy from 'copy-to-clipboard';

import { message } from "antd";
import { Action } from './Action'
import { userInfoType } from "../types"


let ANKI_INFO: any
let USER_INFO: any

// (async () => {
//   // 获取用户信息
//   USER_INFO = await getUserInfo()

//   console.log('USER_INFO:');
//   console.log(USER_INFO);

// })()


// 添加多选复制功能
// 找到 .querybar 下的第一个 .action 元素
window.onload = async () => {
  const userInfo = await browser.runtime.sendMessage({ 'type': 'getUserInfo', 'messages': {}, })
  console.log('userInfo:');
  console.log(userInfo);
  const flomoInput = document.querySelector('div.input');
  const actionDiv = document.createElement('div')
  flomoInput?.after(actionDiv)

  if (actionDiv) {

    ReactDOM.render(

      <React.StrictMode>
        <Action verified={userInfo.verified} />
      </React.StrictMode >,

      actionDiv
    );

  }

}















browser.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {

  console.log('content script onMessage:');
  console.log(msg);

  if (msg.type === 'copy' || msg.type === 'export') {
    // 加载全部笔记
    let memos = document.getElementsByClassName('memos')[0];
    if (memos) {

      autoScroll(memos as HTMLElement, msg.verified).then(async () => {
        // 获取所有 Memo 的 DOM

        const memoEls: HTMLElement[] = Array.from(document.getElementsByClassName('memo') as HTMLCollectionOf<HTMLElement>);

        // 解析笔记
        let memoList: Array<memoType> = await setMemos(memoEls, msg.options.autoRecognizeNoteTitle)

        if (!msg.verified) {
          //未激活
          memoList = memoList.slice(0, 20);
        }

        const newMemoListPromises = memoList.map(async memo => {
          // 处理笔记中的双链
          let md = memo.content
          md = replaceHref(md, memoList)

          // 图片信息
          if (msg.type === 'export') {
            memo.files.forEach((img, i) => {
              md += `\n![image](images/${memo.time2}_${i + 1}.png)`
            });
          }

          if (msg.options.exportTimeInfoValue) {
            // 创建时间、原始笔记信息
            md += `\n\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`
          }

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

        if (msg.type === 'export') {
          // 下载笔记
          createZipFileFromMarkdownStrings(newMemoList, 'flomo2md')
        }

        if (msg.type === 'copy') {
          // 复制笔记
          handleCopyMarkdown(newMemoList)

        }
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
export async function setMemos(memoEls: HTMLElement[], autoRecognizeNoteTitle: boolean): Promise<memoType[]> {
  // 获取所有 className 为 "memo" 的 div 元素
  // const memoEls = document.getElementsByClassName('memo');

  // 创建一个数组来保存解析后的 memo 对象
  const memos = [];
  // 存储名称列表，避免文件名重复
  let names: (string | null)[] = []

  const memosLength = (memoEls.length).toString().length
  // 遍历每一个 "memo" 元素，获取笔记信息
  for (let i = 0; i < memoEls.length; i++) {
    const memoEl = memoEls[i];

    // 笔记 ID
    const id = memoEl.getAttribute('data-slug') || '';

    // 创建时间
    const timeEl = memoEl.querySelector('.time');
    const time = timeEl ? (timeEl as HTMLElement).innerText : '';
    // time2 用来作为文件默认标题
    const time2 = time.replace(/\D/g, '');

    // 笔记正文
    const richTextEl = memoEl.querySelector('.richText');
    // 处理笔记链接
    // 克隆 richTextEl 以保留原始元素的状态
    const newRichTextEl: Element = richTextEl!.cloneNode(true) as Element;
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
    content = await htmlTomd(content)
    // // 是否显示笔记创建时间和原始链接
    // if (showExportTimeInfoValue) {
    //   content += `\n\n[${time}](https://flomoapp.com/mine/?memo_id=${id})`
    // }
    // 处理高亮，将 <mark> 标签替换为 ==
    content = content.replace(/<\/?mark>/g, '==');

    // 处理文件序号
    const thisLength = (i + 1).toString().length
    let index = ''
    for (let i = 0; i < memosLength - thisLength; i++) {
      index += '0'
    }
    index += (i + 1).toString()

    // 文件名称
    let name: string = ''
    name = time2 + '_' + index

    try {
      // 用户设置了需要匹配标题时才会处理
      if (autoRecognizeNoteTitle) {

        // 处理文件名称
        const newName = getMemoName(content, names)
        name = newName ? newName : time2 + '_' + index

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
              content = content.replace(line, line.substring(2))
            } else {
              // 删除正文中的标题信息，只保留文件名作为标题

              // 将内容按行分割成数组
              let contentLines = content.split('\n');

              // 创建一个新数组，不包含要删除的行
              contentLines = contentLines.filter((contentLine) => contentLine !== line);

              // 将新数组拼接回文本形式
              content = contentLines.join('\n');
            }

            break
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    names.push(name)

    // 图片
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
        // 找到 mention 的卡片
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
function getMemoName(md: string, names: (string | null)[]) {
  let haveHeadling = false
  // 从笔记内容中提取名称信息
  let memoName = null
  // 将输入的字符串以换行符分割为数组
  let lines = md.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // 检查当前行是否为一级标题
    if (line.startsWith('# ')) {
      memoName = line.substring(2);
      haveHeadling = true
      break
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
        break
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
      let match = memoName.match(/.+?(，|——|。|？|！)/);  // 匹配直到第一个中文逗号、破折号、句号、问号、感叹号出现的所有字符
      if (match) {
        memoName = match[0].slice(0, -1);  // 移除收尾的中文逗号、破折号、句号、问号、感叹号
      }
    }

    memoName = memoName.replace(/[<>:"/\\|?*\s]/g, '');
    // 避免 name 重名
    let newName = memoName
    let count = 0
    while (true) {

      if (count > 500) {
        // 避免死循环
        return null
      }

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

    if (memoName.trim().length === 0) {
      //名称只存在空格
      return null
    }

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

  let markdownStr = html2md(htmlString, {
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

// 复制笔记
export const handleCopyMarkdown = async (memos: memoType[], showExportTimeInfoValue?: boolean) => {
  let markdown = ''

  memos.forEach((memo, i) => {


    let content = memo.content
    // 图片
    memo.files.forEach((imgUrl, i) => {

      if (imgUrl) {
        content += `\n![](${imgUrl})`
      }

    });

    if (showExportTimeInfoValue) {
      // 创建时间、原始笔记信息
      content += `\n\n[${memo.time}](https://flomoapp.com/mine/?memo_id=${memo.id})`
    }

    if (i === 0) {
      markdown += `\n\n${content}`
    } else {
      markdown += `\n\n---\n\n${content}`
    }


  });
  console.log(markdown);

  copy(markdown, { format: 'text' });

  message.success('已复制');


}