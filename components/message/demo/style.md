---
title: 修改样式
order: 5
---

通过配置调用方式传入 `style` 属性能自定义消息样式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const style = () => {
    Message.success({
      content: 'custom style message',
      style: {
        marginTop: '20vh',
        background: '#fff',
        borderColor: '#3863ff',
        color: '#3863ff'
      }
    })
  }

  return (
    <div>
      <Button onClick={style}>style</Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```