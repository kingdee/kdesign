---
title: 禁用状态
order: 3
---

添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'

function Demo() {
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  const overlay1 = [
    { value: '1', label: '发布' },
    { value: '2', label: '生成凭证' },
    { value: '3', label: '打印' },
  ]
  return (
    <div style={{ width: '400px' }}>
      <Button type="primary" style={demoButtonStyle} disabled>
        主要按钮
      </Button>
      <Button style={demoButtonStyle} disabled>
        次要按钮
      </Button>
      <Button type="ghost" style={demoButtonStyle} disabled>
        幽灵按钮
      </Button>
      <Button shape="round" style={demoButtonStyle} disabled>
        椭圆
      </Button>
      <Button shape="circle" style={demoButtonStyle} disabled>
        圆
      </Button>
      <Button type="text" style={demoButtonStyle} disabled>
        text
      </Button>
      <Button.Dropdown overlay={overlay1} style={demoButtonStyle} disabled>
        更多
      </Button.Dropdown>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
