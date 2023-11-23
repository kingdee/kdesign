---
title: 容器加载
order: 2
---

容器（卡片/面板）加载时使用样式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Spin type="container" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
