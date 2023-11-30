---
title: 销毁
order: 4
---

通过全局的 `destroy` 方法进行销毁，传入 `key` 则销毁指定的消息

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const success = () => {
    Message.success({
      content: 'this is a success',
      duration: 0,
      key: 'success'
    })
  }

  const warning = () => {
    Message.warning('this is a warning')
  }

  const destroyWithKey = () => {
    Message.destroy('success')
  }

  const destroyAll = () => {
    Message.destroy()
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={success}>success</Button>
      <Button style={{ marginRight: '12px' }} onClick={warning}>warning</Button>
      <Button style={{ marginRight: '12px' }} onClick={destroyWithKey}>销毁指定消息</Button>
      <Button style={{ marginRight: '12px' }} onClick={destroyAll}>销毁全部</Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```