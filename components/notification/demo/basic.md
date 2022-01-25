---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Notification } from '@kdcloudjs/kdesign'

function Demo() {
  const base = () => {
    Notification.open({ content: 'this is a base' })
  }

  const callback = () => {
    Notification.open({
      type: 'info',
      title: '通知推送',
      content: 'this is callback',
      onClose: (key) => {
        console.log(key)
        alert('finish close')
      }
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={base}>
        base
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={callback}>
        callback
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```