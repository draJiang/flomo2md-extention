import browser from 'webextension-polyfill'
import { userInfoType } from "../types"

// 获取配置信息
export async function getSettings() {
  let items = await browser.storage.sync.get({
    "newLicenseKey": ''
  })
  return items
}

// 获取用户相关信息
export const getUserInfo = (): Promise<userInfoType> => {

  return new Promise((resolve, reject) => {

    browser.storage.sync.get({ 'newLicenseKey': '', "verified": { key: '', verified: false } }).then(async (result) => {

      if (browser.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }

      let verified = false

      if (result.newLicenseKey) {

        // 从本地查询
        verified = result.verified.verified

        console.log(result)
        console.log(!result.verified.verified && result.newLicenseKey === result.verified.key);
        
        // 新设置的 key 和本地存储的不一样则重新远程查询
        if (result.newLicenseKey !== result.verified.key) {
          // 从远程查询
          const url = 'https://6r4atckmdr.us.aircode.run/index'
          const headers = { 'Authorization': 'Bearer ' + result.newLicenseKey, 'Content-Type': 'application/json', }

          await fetch(url, {
            headers: headers
          }).then(async (response) => {

            await response.json().then((data) => {
              verified = data.verified  
              console.log(verified);
              

              browser.storage.sync.set({
                "verified": { key: result.newLicenseKey, verified: verified }
              })
            })

          })
        }


      }

      resolve({ 'verified': verified })

    })


  });

};

