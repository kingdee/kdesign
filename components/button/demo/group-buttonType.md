---
title: 不同类型集合按钮
order: 8
---

集合按钮有两种风格：主要集合按钮、次要集合按钮

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import type { IButtonGroupProps } from '@kdcloudjs/kdesign'

function Demo() {
  const demoButtonStyle: IButtonGroupProps['style'] = { margin: '0px 8px 8px 0' }

  const overlay1: IButtonGroupProps['overlay'] = [
    { value: '1', label: '发布' },
    { value: '2', label: '生成凭证' },
    { value: '3', label: '打印' },
  ]

  const overlay2: IButtonGroupProps['overlay'] = [
    { value: '1', label: '暂存' },
    { value: '2', label: '撤销' },
    { value: '3', label: '废弃' },
  ]
  const handleItemClick: IButtonGroupProps['onItemClick'] = () => {
    console.log('onItemClick')
  }
  const handleClick: IButtonGroupProps['onClick'] = () => {
    console.log('onClick')
  }
  return (
    <div>
      <Button.Dropdown
        buttonType="primary"
        overlay={overlay1}
        style={demoButtonStyle}
        onItemClick={handleItemClick}>
        更多
      </Button.Dropdown>
      <Button.Dropdown
        buttonType="second"
        style={demoButtonStyle}
        overlay={overlay2}
        type="similar"
        onClick={handleClick}
        onItemClick={handleItemClick}>
        提交
      </Button.Dropdown>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
