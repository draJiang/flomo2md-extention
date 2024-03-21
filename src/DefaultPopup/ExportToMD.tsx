import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import { Button } from '../Components/UIKit';

interface ExportToMDProps {
    verified: boolean | null;
}

const ExportToMD = (props: ExportToMDProps) => {

    const [exportButtonClicked, setExportButtonClicked] = useState<boolean>(false);
    const [inFlomo, setInFlomo] = useState<boolean>(false);
    useEffect(() => {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            console.log(url);
            if (url!.indexOf('https://v.flomoapp.com/') > -1) {
                setInFlomo(true)
            }

        });

    }, [])

    const handleExport = () => {

        setExportButtonClicked(true)
        // 通知 content Script 处理数据
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

            const activeTab = tabs[0]
            let tID = activeTab.id ?? -1

            if (activeTab && activeTab.id !== undefined) {

                let b = browser.tabs.sendMessage(tID, { type: 'flomo2md', verified: props.verified })

            }

        })

    }

    return (
        <div style={{
            marginTop: '10px'
        }}>
            {
                inFlomo ?
                    <Button
                        type="primary"
                        disable={exportButtonClicked}
                        onClick={handleExport}>
                        {exportButtonClicked ? '加载完成后将自动下载' : '导出'}
                    </Button>
                    :
                    <Button
                        type="primary"
                        disable={exportButtonClicked}
                        onClick={()=>{window.open('https://v.flomoapp.com/mine')}}>
                        去 flomo 中操作
                    </Button>
            }

        </div>
    );
};

export default ExportToMD;