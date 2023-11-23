---
title: 页面加载
order: 0
---

页面加载中时使用的加载中样式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Spin />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
