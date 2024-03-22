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

    browser.storage.sync.get(['newLicenseKey']).then(async (result) => {

      if (browser.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }

      let verified = false

      if (result.newLicenseKey) {
        // 判断用户

        // 从本地查询
        let items = await browser.storage.sync.get({
          "verified": false
        })

        verified = items.verified

        if (!items.verified) {
          // 从远程查询
          const url = 'https://6r4atckmdr.us.aircode.run/index'
          const headers = { 'Authorization': 'Bearer ' + result.newLicenseKey, 'Content-Type': 'application/json', }

          await fetch(url, {
            headers: headers
          }).then(async (response) => {

            await response.json().then((data) => {
              verified = data.verified

              browser.storage.sync.set({
                "verified": verified
              })
            })

          })
        }


      }

      resolve({ 'verified': verified })

    })


  });

};

