---
order: 0
title: 基本
---

基本用法。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Popconfirm, Message } from '@kdcloudjs/kdesign'

function Demo() {
  function confirm(e) {
    console.log(e)
    Message.success({
      content: '点击了确定',
      closable: true,
    })
  }

  function cancel(e) {
    console.log(e)
    Message.success({
      content: '点击了取消',
      closable: true,
    })
  }

  return (
    <Popconfirm message="你确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
      <a href="true" onClick={(e) => e.preventDefault()}>删除</a>
    </Popconfirm>
  )
}

ReactDOM.render(<Demo />, mountNode)
```