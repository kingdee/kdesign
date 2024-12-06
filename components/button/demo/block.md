---
title: 撑满父元素
order: 6
---

添加 block 属性即可让按钮宽度撑满父元素。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import type { IButtonProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoButtonStyle:IButtonProps['style'] = { margin: '0px 8px 8px 0' }
  return (
    <div>
      <Button type="primary" style={demoButtonStyle} block>
        主要按钮
      </Button>
      <Button style={demoButtonStyle} block>
        次要按钮
      </Button>
      <Button type="ghost" style={demoButtonStyle} block>
        幽灵按钮
      </Button>
      <Button type="text" style={demoButtonStyle} block>
        text
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
