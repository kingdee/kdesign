---
title: 时长
order: 21
---

默认不关闭，可设置自动关闭时间
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Notification } from '@kdcloudjs/kdesign'

function Demo() {
  const notDisappear = () => {
    Notification.info({
      content: 'it will not disappear without clicking closed button',
    })
  }

  const disappear = () => {
    Notification.info({
      content: 'it will disappear in 2 seconds',
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