import React, { useEffect, useState, useRef, ChangeEvent } from "react";

export function Checkbox(props: {
    handleCheckBoxChange: (memo: HTMLElement, checked: boolean) => void;
    inputNotAllowed: () => void;
    selectMemoCount: number;
    verified: boolean;
}) {

    useEffect(() => {
        if (props.selectMemoCount > 1 && !props.verified) {
            props.inputNotAllowed()
        }
    })

    function handleCheckBoxChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;

        // 获取 .memo
        let parent = target.parentElement;
        while (parent != null && !parent.classList.contains('memo')) {
            parent = parent.parentElement;
        }
        if (parent != null) {
            // 存在 .memo
            // 将 memo 的 DOM 传递给 Action，用于后续复制、导出
            props.handleCheckBoxChange(parent, target.checked)
        } else {

        }

        // if (target.checked) {
        //     console.log('Checkbox is checked');
        // } else {
        //     console.log('Checkbox is unchecked');
        // }
    }

    return (
        <input style={{
            // opacity: props.selectMemoCount > 1 ? '0.3' : '1',
            // cursor: props.selectMemoCount > 1 ? 'not-allowed' : '',
            // pointerEvents: props.selectMemoCount > 1 ? 'none' : undefined
        }} onChange={handleCheckBoxChange} type="checkbox" />
    )

}

