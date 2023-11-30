---
title: 自定义进度条渐变色
order: 3
---

可以通过 status 属性强制改变进度条的状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { marginLeft: '10px', verticalAlign: 'top' }
  return (
    <>
      <Progress
        percent={60}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
      <Progress
        type="circle"
        percent={60}
        style={demoStyle}
        showInfo={false}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
