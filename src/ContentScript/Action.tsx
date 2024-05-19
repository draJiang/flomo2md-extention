import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import styled from 'styled-components';
import * as Toast from '@radix-ui/react-toast';
import * as Tooltip from '@radix-ui/react-tooltip';
import { message } from "antd";

import { Checkbox } from "./CheckBox";
import { handleCopyMarkdown, setMemos } from './index'
import { CSSProperties } from "styled-components";

import './style.css'

const ButtonBox = styled.div`
    &:hover {
        background: var(--bgGreen);
    }
`

export function Action(props: { verified: boolean }) {

    const [actionActive, setActionActive] = useState(false)
    const [selectMemo, setSelectMemo] = useState<HTMLElement[]>([]);
    const observer = useRef<MutationObserver | null>(null);
    const selectMemoLength = useRef<number>(0);

    useEffect(() => {

        if (selectMemo.length > 1 && !props.verified) {
            inputNotAllowed()
            message.info('激活 Pro 可复制更多笔记🚀');
        } else {

            const actionDoms = document.querySelectorAll<HTMLElement>('div.__flomo2mdAction input')
            actionDoms.forEach(node => {

                node.style.pointerEvents = '';
                node.style.cursor = ''
                node.style.opacity = '1';

            })

        }

        selectMemoLength.current = selectMemo.length
    }, [selectMemo])

    const inputNotAllowed = () => {
        const actionDoms = document.querySelectorAll<HTMLElement>('div.__flomo2mdAction input')
        actionDoms.forEach(node => {
            // 查询当前 node 下的所有 input 元素

            if (node && !(node as HTMLInputElement).checked) {
                node.style.pointerEvents = 'none';
                node.style.cursor = 'not-allowed'
                node.style.opacity = '0.3';
            }

        })

    }

    function handleDomChange(needToListen: boolean) {
        if (needToListen) {
            observer.current = new MutationObserver((mutations: MutationRecord[]) => {


                mutations.forEach((mutation: MutationRecord) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node: Node) => {
                            // 确保这是一个元素节点，并且匹配我们的目标
                            if ((node as HTMLElement).classList.contains('memo')) {
                                // 在这里进行类型断言以更确切的描述 node 的类型
                                const header: HTMLElement | null = (node as HTMLElement).querySelector('.header')

                                if (header) { addCheckbox(header) }

                            }
                        });
                    }
                });


            });


            // 监听 .memos 的变化，通常在滚动加载更多 memo 时触发
            const config: MutationObserverInit = { childList: true, subtree: true };
            const targetNode: HTMLElement | null = document.querySelector('.memos');
            if (targetNode) {
                observer.current.observe(targetNode, config);
            }
        } else {

            if (observer.current) { observer.current.disconnect(); }

        }

    }

    // 激活多选
    function handleActionButtonClick() {

        setActionActive(a => true)

        // 在所有 Memo 上添加多选按钮
        document.querySelectorAll<HTMLElement>('.memo .header').forEach(addCheckbox);

        handleDomChange(true)
    }

    function handleCheckBoxChange(memo: HTMLElement, checked: boolean) {

        if (checked) {
            // 选中
            setSelectMemo(old => [...old, memo]);


        } else {
            // 取消选中
            setSelectMemo(old => old.filter(item => item !== memo));

        }

    }

    function addCheckbox(header: HTMLElement): void {

        const actionArea = document.createElement('div')
        actionArea.className = '__flomo2mdAction'
        actionArea.style.marginLeft = '14px'
        header.querySelector('.tools')?.appendChild(actionArea)


        ReactDOM.render(

            <React.StrictMode>
                <Checkbox
                    selectMemoCount={selectMemoLength.current}
                    inputNotAllowed={inputNotAllowed}
                    verified={props.verified}
                    handleCheckBoxChange={handleCheckBoxChange} />
            </React.StrictMode >,

            actionArea
        );

    }

    function removeCheckbox(): void {

        // 卸载在 header 中渲染的组件
        const actionDoms = document.querySelectorAll<HTMLElement>('div.__flomo2mdAction')
        actionDoms.forEach(node => node.remove())

        setActionActive(false)
        // 停止监听 DOM 变化
        handleDomChange(false)

        // 清空已选择的 Memo
        setSelectMemo([])
    }

    const actionBoxStyle: CSSProperties = {
        color: '#9d9d9d',
        height: '48px',
        borderRadius: '48px',
        position: 'fixed',
        bottom: '20px',
        right: '80px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--noticeBg)',
        boxShadow: '0px 0px 40px 0px var(--bigShadow)',
        zIndex: '999'
    }

    const buttonStyle: CSSProperties = {
        color: '#9d9d9d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        padding: '4px',
        cursor: 'pointer'
    }

    return (
        <div>
            <div>
                {actionActive ?
                    <div style={{ ...actionBoxStyle, padding: '0 10px' }}>

                        <Tooltip.Provider>
                            <Tooltip.Root delayDuration={500}>
                                <Tooltip.Trigger asChild>

                                    <button
                                        style={{
                                            ...buttonStyle,
                                            // pointerEvents: selectMemo.current.length === 0 ? "none" : undefined
                                        }}
                                        onClick={async () => {

                                            const memos = await setMemos(selectMemo, false)
                                            handleCopyMarkdown(memos)

                                            // 关闭多选状态
                                            removeCheckbox()


                                        }}>
                                        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>

                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content className="TooltipContent" sideOffset={15}>
                                        复制
                                        <Tooltip.Arrow className="TooltipArrow" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>



                        <Tooltip.Provider>
                            <Tooltip.Root delayDuration={500}>
                                <Tooltip.Trigger asChild>
                                    <button
                                        style={buttonStyle}
                                        onClick={removeCheckbox}>
                                        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content className="TooltipContent" sideOffset={15}>
                                        取消
                                        <Tooltip.Arrow className="TooltipArrow" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>


                    </div>
                    :

                    <Tooltip.Provider>
                        <Tooltip.Root delayDuration={500}>
                            <Tooltip.Trigger asChild>
                                <ButtonBox style={{
                                    ...actionBoxStyle,
                                    width: '48px',
                                    cursor: 'pointer'
                                }}>
                                    <button
                                        style={buttonStyle}
                                        onClick={handleActionButtonClick}>
                                        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H12V12H3L3 3ZM2 3C2 2.44771 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44771 13 2 12.5523 2 12V3ZM10.3498 5.51105C10.506 5.28337 10.4481 4.97212 10.2204 4.81587C9.99275 4.65961 9.6815 4.71751 9.52525 4.94519L6.64048 9.14857L5.19733 7.40889C5.02102 7.19635 4.7058 7.16699 4.49327 7.34329C4.28073 7.5196 4.25137 7.83482 4.42767 8.04735L6.2934 10.2964C6.39348 10.4171 6.54437 10.4838 6.70097 10.4767C6.85757 10.4695 7.00177 10.3894 7.09047 10.2601L10.3498 5.51105Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </button>
                                </ButtonBox>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                                    多选
                                    <Tooltip.Arrow className="TooltipArrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>



                }
            </div>
        </div >
    )

}



