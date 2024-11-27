---
title: 自定义元素
order: 5
---

反馈浮层可以将一些位置显示为自定义元素

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Alert, Icon } from '@kdcloudjs/kdesign'
import type { IAlertProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [msgIdx, setMsgIdx] = React.useState<number>(0)
  const [msg, setMsg] = React.useState<IAlertProps['message']>('')
  const messages: Array<IAlertProps['message']> = ['这是第一条信息', '这是第二条信息', '这是第三条信息'].map(
    (msg) => `${msg}, 可以自定义设置显示的信息标识图标、关闭图标、关闭图标旁边区域的位置元素`,
  )
  const icon: IAlertProps['icon'] = (
    <div
      style={{
        display: 'flex',
      }}
    >
      {' '}
      <Icon type={'right'} />{' '}
    </div>
  )
  const closeNode: IAlertProps['closeNode'] = (
    <div
      onClick={() => setMsgIdx(-1)}
      style={{
        marginRight: 10,
        cursor: 'pointer',
      }}
    >
      <Icon type={'close-solid'} />
    </div>
  )
  const handleMessage = (direction: number) => {
    setMsgIdx((idx) => {
      const newIdx = idx + direction
      return newIdx >= 0 ? (newIdx < messages.length ? newIdx : idx) : idx
    })
  }
  const extra: IAlertProps['extra'] = (
    <div>
      <span
        style={{
          marginRight: 10,
          cursor: 'pointer',
        }}
        onClick={() => setMsg(messages[msgIdx])}
      >
        查看
      </span>
      <span
        style={{
          marginRight: 10,
          cursor: 'pointer',
        }}
        onClick={() => setMsgIdx(-1)}
      >
        忽略全部
      </span>
      <span
        onClick={() => handleMessage(-1)}
        style={{
          marginRight: 5,
          cursor: 'pointer',
        }}
      >
        <Icon type={'arrow-left'} />
      </span>
      <span>{`${msgIdx + 1}/${messages.length}`}</span>
      <span
        onClick={() => handleMessage(1)}
        style={{
          marginRight: 5,
          cursor: 'pointer',
        }}
      >
        <Icon type={'arrow-right'} />
      </span>
    </div>
  )
  return (
    <>
      <Alert
        message={messages[msgIdx]}
        type={'success'}
        delayOffTime={0}
        showIcon={true}
        icon={icon}
        closeNode={closeNode}
        extra={extra}
        closable={true}
      />
      <Alert message={msg} type={'success'} showIcon={true} closable={true} banner={true} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
