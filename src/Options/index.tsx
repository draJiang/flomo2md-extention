import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Button, Input, Form, Divider, ConfigProvider, Select } from 'antd';

import "./index.css"
// import "../assets/tailwind.css"
import Usage from "../assets/usage.png"


export const Options = () => {

  const [form] = Form.useForm();

  useEffect(() => {

    console.log('options useEffect:');

    // 获取配置信息
    getSettings().then(items => {
      
      // 更新 input 文本框的默认值
      form.setFieldsValue({ openApiKey: items.openApiKey, unsplashApiKey: items.unsplashApiKey, currentLanguage: items.currentLanguage, targetLanguage: items.targetLanguage });

    })

  }, []);

  async function getSettings() {
    let items = await browser.storage.sync.get(["openApiKey", "unsplashApiKey", "currentLanguage", "targetLanguage"])
    return items
  }

  return (
    <>
      <div id="MyOptions">
        Options
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
