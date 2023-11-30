---
title: 销毁
order: 41
---

可通过 `key` 指定销毁消息或更新消息
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Notification } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const base = () => {
    Notification.open({
      content: 'this is a base',
    })
  }

  const update = () => {
    Notification.info({
      key: 'update',
      content: 'need update',
      showIcon: true,
    })
  }

  const updateWithKey = () => {
    Notification.info({
      key: 'update',
      content: 'update other ...',
      showIcon: true,
    })
  }

  const destroyWithKey = () => {
    Notification.destroy('update')
  }

  const destroyAll = () => {
    Notification.destroy()
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={base}>base</Button>
      <Button style={{ marginRight: '12px' }} onClick={update}>need update</Button>
      <Button style={{ marginRight: '12px' }} onClick={updateWithKey}>update key</Button>
      <Button style={{ marginRight: '12px' }} onClick={destroyWithKey}>destroy key</Button>
      <Button style={{ marginRight: '12px' }} onClick={destroyAll}>destroy all</Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```