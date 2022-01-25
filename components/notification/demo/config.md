---
title: 配置调用
order: 11
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Notification } from '@kdcloudjs/kdesign'

function Demo() {
  const footer = [
    {
      name: '查看详情',
      onClick: () => {
        console.log('查看详情')
      },
    },
    {
      name: '忽略',
      onClick: () => {
        console.log('忽略')
      },
    },
  ]

  const info = () => {
    Notification.info({
      content: 'this is a info',
      footer,
    })
  }

  const primary = () => {
    Notification.primary({
      content: 'this is a error',
      closable: true,
      footer,
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={info}>
        info
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={primary}>
        primary
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```