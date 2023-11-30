---
title: 时长
order: 2
---

消息延时消失的时长默认为 `3000ms`, 如果设置 `duration: 0` 则消息不会自动消失

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const notDisappear = () => {
    Message.success({
      content: 'it will not disappear without clicking closed button',
      closable: true,
      duration: 0,
    })
  }

  const disappear = () => {
    Message.error({
      content: 'it will disappear in 2 seconds',
      closable: true,
      duration: 2000,
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={notDisappear}>不会自动消失</Button>
      <Button style={{ marginRight: '12px' }} onClick={disappear}>2s 消失</Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```