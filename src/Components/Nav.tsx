import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider } from 'antd';

import Icon from "../assets/icon128.png"



interface NavProps {
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {

    }, []);

    return (

        <div id="ScouterNav"
            style={{
                cursor: 'move',
                position: 'absolute',
                width: '100%', top: 0,
                background: 'white',
                zIndex: 9999
            }}
            onMouseDown={props.onMouseDown}>
            <img src={Icon} />
            <div className="rightBtnBox" style={{ flex: 1, textAlign: 'right' }}></div>

        </div>
    );
}