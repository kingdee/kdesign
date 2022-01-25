---
title: 出现位置
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Notification } from '@kdcloudjs/kdesign'

function Demo() {
  const base = (placement) => {
    Notification.open({
      type: 'info',
      title: '通知推送',
      placement,
      showIcon: true,
      content: `this is ${placement}`,
      onClose: (key) => {
        console.log(key)
        alert('finish close')
      }
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={() => base('topLeft')}>
        topLeft
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={() => base('topRight')}>
        topRight
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={() => base('bottomLeft')}>
        bottomLeft
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={() => base('bottomRight')}>
        bottomRight
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```