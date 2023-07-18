---
title: 集合按钮自定义图标
order: 9
---

集合按钮有两种风格：主要集合按钮、次要集合按钮

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const demoButtonStyle = { margin: '0px 8px 8px 0' }

  const overlay1 = [
    { value: '1', label: '发布' },
    { value: '2', label: '生成凭证' },
    { value: '3', label: '打印' },
  ]


  return (
    <div>
       <Button.Dropdown icon={[<Icon type="arrow-up" key="arrow-up" />, <Icon type="arrow-down" key="arrow-down" />]} overlay={overlay1} style={demoButtonStyle} >
        更多
      </Button.Dropdown>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
