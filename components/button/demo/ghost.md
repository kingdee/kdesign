---
title: 幽灵属性
order: 5
---

添加 ghost 属性即可让按钮处于幽灵状态（背景透明）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import type { IButtonProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoButtonStyle:IButtonProps['style'] = { margin: '0px 8px 8px 0' }
  return (
    <div style={{ width: '400px', padding: '26px 16px 16px', backgroundColor: '#F5F5F5' }}>
      <Button type="primary" style={demoButtonStyle} ghost>
        主要按钮
      </Button>
      <Button style={demoButtonStyle} ghost>
        次要按钮
      </Button>
      <Button type="ghost" style={demoButtonStyle} ghost>
        幽灵按钮
      </Button>
      <Button shape="round" style={demoButtonStyle} ghost>
        椭圆
      </Button>
      <Button shape="circle" style={demoButtonStyle} ghost>
        圆
      </Button>
      <Button type="text" style={demoButtonStyle} ghost>
        text
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
