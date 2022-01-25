---
order: 2
title: 自定义按钮文本
---

通过 `okText`、`cancelText` 设置按钮文本。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Popconfirm } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Popconfirm title="删除确认" message="你确定要删除这个任务吗?" okText="是" cancelText="否">
      <a href="true" onClick={(e) => e.preventDefault()}>删除</a>
    </Popconfirm>
  )
}

ReactDOM.render(<Demo />, mountNode)
```