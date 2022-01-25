---
title: 状态
order: 3
---

可以通过 status 属性强制改变进度条的状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { marginLeft: '10px', verticalAlign: 'top' }
  return (
    <>
      <Progress percent={30} status="success" />
      <Progress percent={30} status="failure" />
      <Progress type="circle" percent={30} style={demoStyle} status="failure" />
      <Progress type="circle" percent={30} style={demoStyle} status="success" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
