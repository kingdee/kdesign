---
title: 基本使用-圆形
order: 1
---


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { marginLeft: '10px', verticalAlign: 'top' }
  return (
    <div>
      <Progress type="circle" percent={60} style={demoStyle} />
      <Progress type="circle" percent={60} status="failure" style={demoStyle} />
      <Progress type="circle" percent={60} status="success" style={demoStyle} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
