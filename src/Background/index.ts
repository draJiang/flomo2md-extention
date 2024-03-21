import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { getUserInfo } from '../utils/util'
import { userInfoType } from "../types"

// 插件安装事件
browser.runtime.onInstalled.addListener(function () {

});

// 卸载插件后打开指定链接
// browser.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");

// 创建右键菜单
// browser.contextMenus.create({
//     id: "1",
//     title: "hello",
//     contexts: ["selection", "page"],
// },
//     () => {
//         browser.runtime.lastError
//     });


// 右键菜单点击事件
// browser.contextMenus.onClicked.addListener(async function (info, _tab) {

//     console.log('右键菜单点击事件');

//     browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//         console.log(tabs);
//         const activeTab = tabs[0]
//         let tID = activeTab.id ?? -1

//         if (activeTab && activeTab.id !== undefined) {

//             // 唤起 Content Script 中的 PopupCard
//             let b = browser.tabs.sendMessage(tID, { type: 'openPopupCard', info, })

//             // 已知情况：刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
//             b.catch(e => {
//                 console.log(e);
//                 console.log('catch');

//                 browser.scripting.executeScript({
//                     target: { tabId: tID },
//                     files: ["js/vendor.js", "js/content_script.js"],
//                 }).then(() => {
//                     console.log('chrome.scripting.executeScript');
//                 }).then(() => {
//                     browser.tabs.sendMessage(tID, { type: 'open-souter', info, })
//                 })

//             })

//         }


//     })

// })

// 长连接，处理 Content Script 发来的消息
browser.runtime.onConnect.addListener(port => {
    // 收到 content script 消息
    console.log('连接中------------')

    // 接收 content script 的消息
    port.onMessage.addListener(async (msg: any) => {
        console.log('接收消息：', msg)
    })
})


browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request: any, sender: any, sendResponse: any) {

    console.log("Message from the content script: " + request.type);

    // Define sendResponse as an async function
    const asyncSendResponse = async (response: any) => {
        try {
            await sendResponse(response);
        } catch (error) {
            console.error(error);
        }
    };

}

//////////////////////////////////////////////////////////////////////////////

