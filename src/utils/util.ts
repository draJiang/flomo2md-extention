import browser from 'webextension-polyfill'
import { userInfoType } from "../types"

// 获取配置信息
export async function getSettings() {
  let items = await browser.storage.sync.get({
    "newLicenseKey": ''
  })
  return items
}

const checkLicenseKey = async (key: string) => {

  console.log('checkLicenseKey from lemonsqueezy:');

  let verified = false

  // 从 Lemonsqueezy 验证 Key
  const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      license_key: key,
    })
  });
  const data = await response.json(); // 可以使用这个来进行额外的操作
  verified = data.valid

  console.log(verified);


  if (!verified) {

    console.log('checkLicenseKey from dabing:');

    const res = await fetch('https://api.scouter.dabing.one/api/checktLicenseKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: key,
      })
    });

    const data = await res.json();
    verified = data.verified

    if (!res.ok) {
      throw new Error(data.message);
    }

  }

  console.log(verified);
  return verified


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
          // // 从远程查询
          // const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     license_key: result.newLicenseKey,
          //   })
          // });
          // const data = await response.json(); // 可以使用这个来进行额外的操作

          // verified = data.valid
          // console.log(verified);

          // // 如果 lemon 未激活，则在自己构建的 API 中查询 Key 是否合法
          // if (!verified) {

          //   console.log('checkLicenseKey from dabing:');

          //   const res = await fetch('https://api.scouter.dabing.one/api/checktLicenseKey', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       key: result.newLicenseKey,
          //     })
          //   });

          //   const data = await res.json();
          //   verified = data.verified

          //   if (!res.ok) {
          //     // throw new Error(data.message);
          //   }

          // }

          verified = await checkLicenseKey(result.newLicenseKey)

          browser.storage.sync.set({
            "verified": { key: result.newLicenseKey, verified: verified }
          })

        }

      }

      resolve({ 'verified': verified })

    })


  });

};

