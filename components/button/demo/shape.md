---
title: 按钮形状
order: 1
---

按钮有四种形状：带圆角的矩形、直角矩形、椭圆形和圆形（默认为带圆角的矩形）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  return (
    <div style={{ marginTop: 16, width: '400px' }}>
      <Button type="primary" style={demoButtonStyle}>
        默认
      </Button>
       <Button type="primary" shape="none" style={demoButtonStyle}>
        直角
      </Button>
      <Button type="primary" shape="round" style={demoButtonStyle}>
        椭圆
      </Button>
      <Button type="primary" shape="circle" style={demoButtonStyle}>
        圆
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
