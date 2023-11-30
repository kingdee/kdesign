---
title: 集合按钮
order: 7
---

通过下拉形式收纳多个操作，样式与基础按钮一致。包含 2 种类型：

- • 基础集合按钮：可整合多个操作。
- • 同类集合按钮：整合相似的操作，且有一个命令需要被更频繁地使用时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'
import type { OverlayType } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoButtonStyle = { margin: '0px 8px 8px 0' }

  const overlay1: OverlayType = [
    { value: '1', label: '发布' },
    { value: '2', label: '生成凭证' },
    { value: '3', label: '打印' },
  ]

  const overlay2: OverlayType = [
    { value: '1', label: '暂存' },
    { value: '2', label: '撤销' },
    { value: '3', label: '废弃' },
  ]

  return (
    <div>
      <Button.Dropdown overlay={overlay1} style={demoButtonStyle} onItemClick={() => console.log('onItemClick')}>
        更多
      </Button.Dropdown>
      <Button.Dropdown
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
