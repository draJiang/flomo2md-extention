import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import { Button } from '../Components/UIKit';

interface ExportToMDProps {
    verified: boolean | null;
}

const ExportToMD = (props: ExportToMDProps) => {

    const [exportButtonClicked, setExportButtonClicked] = useState<boolean>(false);
    const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);
    const [inFlomo, setInFlomo] = useState<boolean>(false);
    // const checkboxRef = useRef<HTMLInputElement>(null);


    useEffect(() => {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            console.log(url);
            if (url!.indexOf('https://v.flomoapp.com/') > -1) {
                setInFlomo(true)
            }

        });

    }, [])

    const handleExport = (event: React.FormEvent<HTMLButtonElement>) => {

        console.log(event);

        event.preventDefault(); // 阻止表单默认提交行为

        const exportFileNameInput = document.querySelector('form input[name="exportFileName"]');
        const autoRecognizeNoteTitle = (exportFileNameInput as HTMLInputElement).checked;

        const exportTimeInfoInput = document.querySelector('form input[name="exportTimeInfo"]');
        const exportTimeInfoValue = (exportTimeInfoInput as HTMLInputElement).checked;

        const type = event.currentTarget.name

        if (type === 'export') {
            setExportButtonClicked(true)
        }
        if (type === 'copy') {
            setCopyButtonClicked(true)
        }

        // 通知 content Script 处理数据
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

            const activeTab = tabs[0]
            let tID = activeTab.id ?? -1

            if (activeTab && activeTab.id !== undefined) {

                let b = browser.tabs.sendMessage(tID, {
                    type: type,
                    verified: props.verified,
                    options: {
                        autoRecognizeNoteTitle: autoRecognizeNoteTitle,
                        exportTimeInfoValue: exportTimeInfoValue
                    }
                })

            }

        })

    }

    return (
        <div>
            <form
                name='form'
                // onSubmit={handleExport}
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                {
                    inFlomo ? <>
                        <Button
                            name='export'
                            type="primary"
                            style={{ width: '100%' }}
                            disable={exportButtonClicked || copyButtonClicked}
                            onClick={handleExport}>
                            {exportButtonClicked ? '加载完成后将自动下载' : '导出'}
                        </Button>
                        <Button
                            name='copy'
                            type="second"
                            style={{ width: '100%', marginTop: '10px' }}
                            disable={exportButtonClicked || copyButtonClicked}
                            onClick={handleExport}>
                            {copyButtonClicked ? '加载完成后将自动复制' : '复制到剪切板'}
                        </Button>
                    </>
                        :
                        <Button
                            type="second"
                            style={{ width: '100%' }}
                            disable={exportButtonClicked}
                            onClick={() => { window.open('https://v.flomoapp.com/mine') }}>
                            去 flomo 中操作
                        </Button>

                }
                <div style={{
                    marginTop: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                    }}>
                        <input
                            name='exportFileName'
                            style={{
                                marginRight: '2px'
                            }}
                            type='checkbox' onClick={() => {
                            }} /> 自动识别笔记标题作为文件名（BETA）
                    </div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <input
                            defaultChecked={true}
                            name='exportTimeInfo'
                            style={{
                                marginRight: '2px'
                            }}
                            type='checkbox' onClick={() => {
                            }} /> 导出笔记创建时间和 flomo 原始链接
                    </div>
                </div>
                <Button
                    type="link"
                    style={{
                        marginTop: '10px',
                        width: 'fit-content',
                        padding: '0'
                    }}
                    onClick={() => window.open('https://flomo2md.dabing.one/faq')}
                >常见问题</Button>

            </form>

            {/* <div style={{

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                textAlign: 'left',

                marginTop: '20px'

            }}>
                <div>
                    <span style={{
                        backgroundColor: '#eef3fe',
                        fontSize: '0.8rem',
                        color: '#5783f7',
                        padding: '2px 4px',
                        marginRight: '4px',
                        borderRadius: '2px'
                    }}>导出格式预览</span>
                    20240401234148_1.md
                </div>
                <div style={{
                    fontSize: '0.84rem',
                    color: '#5f5f5f',
                    padding: '10px',
                    border: '1px solid #efefef',
                    borderRadius: '2px',
                    marginTop: '4px'
                }}>
                    <div>
                        #Tag1 #Ta2 <br />
                        我是笔记的正文
                    </div>
                    <div>
                        <br />
                        [2024-04-01 23:41:48](https://flomoapp.com/mine/?memo_id=XXX)
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default ExportToMD;