---
title: 基础控件加载
order: 3
---

基础控件加载时使用样式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Spin name="Spin" type="component" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```