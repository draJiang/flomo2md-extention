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
          const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              license_key: result.newLicenseKey,
            })
          });
          const data = await response.json(); // 可以使用这个来进行额外的操作

          verified = data.valid
          console.log(verified);

          browser.storage.sync.set({
            "verified": { key: result.newLicenseKey, verified: verified }
          })

        }


      }

      resolve({ 'verified': verified })

    })


  });

};

