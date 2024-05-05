import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { getUserInfo, getSettings } from "../utils/util"

import ExportToMD from "./ExportToMD";
import { Button, Divider, Input, IconLink } from "../Components/UIKit";


import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';






import { userInfoType } from "../types"

export const DefaultPopup = () => {

    const [verified, setVerified] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement>(null); // 创建 ref，指定类型为 HTMLInputElement
    const [inputValue, setInputValue] = useState('');

    const apiDataRef = useRef([]);

    useEffect(() => {

        // // 获取错题
        // const getMistakes = browser.storage.local.get({ "mistakes": [] })
        // getMistakes.then((result) => {

        //     console.log(result);
        //     setMistakes(result.mistakes)

        //     // 处理 Excel 数据
        //     apiDataRef.current = result.mistakes.map((mistake: { note: { fields: { Back: string, Front: string } } }) => {

        //         return { 'Front': mistake.note.fields.Front, 'Back': mistake.note.fields.Back }

        //     })

        //     console.log(apiDataRef.current);


        // })

        getSettings().then(async (items) => {
            // setOpenApiKey(items.openApiKey ?? null);
            console.log(items);
            setInputValue(items.newLicenseKey);

        })

        getUserInfo().then((userInfo: userInfoType) => {

            // 更新 UI
            setVerified(userInfo.verified)

        })

    }, []);

    // 保存设置
    const saveOptions = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // 阻止表单的默认提交行为

        // 通过 ref 获取 input 元素的值
        if (inputRef.current) {
            const inputValue = inputRef.current.value;


            // Saves options to chrome.storage.sync.
            browser.storage.sync.set(
                {
                    newLicenseKey: inputValue
                }
            ).then(item => {

                // Update status to let user know options were saved.
                // setStatus(' ✅ Saved')

                // setTimeout(() => {
                //     setStatus('')
                // }, 2000);

            })

            // thisGetBalance(values['licenseKey'])

            // 更新订阅状态
            thisGetUserStatus()
        }


    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // 更新 inputValue
    };

    const thisGetUserStatus = (): Promise<userInfoType> => {

        return new Promise((resolve, reject) => {
            setVerified(null)
            getUserInfo().then((userInfo: userInfoType) => {

                // 更新 UI
                setVerified(userInfo.verified)


                resolve(userInfo)

            })

        })

    }

    return (
        <>
            <div id="DefaultPopup" style={{
                width: '400px',
                padding: '20px',
                fontSize: '0.9rem',
                color: '#323232',
                fontFamily: 'din-round,sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div
                    style={{
                        margin: '20px 4px',
                        textAlign: 'center',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left"
                    }}>

                    <div style={{
                        marginBottom: '4px',
                        opacity: '0.85',
                        textAlign: 'left'
                    }}>
                        {verified ?

                            <span>
                                导出时将自动滚动页面加载笔记，请暂停操作页面
                            </span>
                            :
                            <span>
                                未激活仅支持导出 20 条 Memo
                            </span>

                        }
                    </div>

                    <ExportToMD verified={verified} />

                </div>

                <Divider />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <form onSubmit={saveOptions} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline'
                        }}>

                            <Input
                                placeholder='请输入激活码' type='password' ref={inputRef} value={inputValue} onChange={handleInputChange}
                            />
                            <span style={{
                                position: 'relative',
                                width: 0,
                                right: '30px',
                                height: '47px',
                                backgroundColor: '#F7F7F7',
                                textAlign: 'center',
                                lineHeight: '47px',
                            }}>
                                {verified === null ? '⌛' : verified ? '✅' : '❌'}
                            </span>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <Button
                                type="second"
                                style={{ marginBottom: '20px' }}
                            >激活</Button>

                            <Button
                                type="link"
                                style={{ marginBottom: '20px' }}
                                onClick={() => window.open('https://jiang.lemonsqueezy.com/checkout/buy/c4574683-821d-4a8f-9ec0-f3dff3a1d01d')}
                            >获取激活码</Button>

                            {/* <Button
                                type="link"
                                onClick={() => window.open('https://jiangzilong.notion.site/Duolingo-Anki-f89c9ba9f8614c8fa0ff5cbceadb56ed')}
                            >Usage Guidelines</Button> */}

                            {/* <IconLink href="https://v.flomoapp.com/mine">
                                <svg style={{ width: '16px', height: '16px' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                </svg>
                            </IconLink> */}

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <DefaultPopup />
    </React.StrictMode>
    ,
    document.getElementById("root")
);
