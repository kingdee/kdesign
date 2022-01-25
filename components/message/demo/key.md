---
title: 通过 key 更新消息
order: 3
---

通过配置调用传入指定的 `key`，后续能通过 `key` 对消息进行更新

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const update = () => {
    Message.warning({
      content: 'this is a warning',
      duration: 0,
      closable: false,
      key: 'kdesign'
    })
    setTimeout(() => {
      Message.error({
        content: 'update warning message to error',
        closable: true,
        duration: 2000,
        key: 'kdesign'
      })
    }, 2000)
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={update}>update by key</Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```