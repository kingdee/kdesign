---
order: 5
title: 分隔符
---

通过`split`属性设置组件之间分隔符。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Space split={<span>|</span>} style={{ width: '200px' }}>
      <a href="true" onClick={e => e.preventDefault()}>Link</a>
      <a href="true" onClick={e => e.preventDefault()}>Link</a>
      <a href="true" onClick={e => e.preventDefault()}>Link</a>
    </Space>
  )
}

ReactDOM.render(<Demo />, mountNode)
```