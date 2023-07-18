---
title: 不同类型集合按钮
order: 8
---

集合按钮有两种风格：主要集合按钮、次要集合按钮

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

  const overlay2 = [
    { value: '1', label: '暂存' },
    { value: '2', label: '撤销' },
    { value: '3', label: '废弃' },
  ]

  return (
    <div>
       <Button.Dropdown buttonType="primary" overlay={overlay1} style={demoButtonStyle} onItemClick={() => console.log('onItemClick')}>
        更多
      </Button.Dropdown>
      <Button.Dropdown
        buttonType="second"
        style={demoButtonStyle}
        overlay={overlay2}
        type="similar"
        onClick={() => console.log('onClick')}
        onItemClick={() => console.log('onItemClick')}>
        提交
      </Button.Dropdown>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
