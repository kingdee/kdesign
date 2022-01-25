---
title: 基本使用-圆形
order: 1
---

可以通过 width 属性来控制圆形的直径，值为 number 类型

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { marginLeft: '10px', verticalAlign: 'top' }
  return (
    <div>
      <Progress type="circle" percent={30} width={100} strokeWidth={10} />
      <Progress type="circle" percent={100} style={demoStyle} />
      <Progress
        type="circle"
        percent={30}
        style={demoStyle}
        showInfo={false}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
