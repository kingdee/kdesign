---
title: 基本用法
order: 0
---

标签有三种类型：状态标签、属性标签、列表状态标签、可关闭标签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }

  return (
    <div>
      <Tag type="status" style={demoTagStyle}>
        状态标签
      </Tag>

      <Tag type="attribute" style={demoTagStyle}>
        属性标签
      </Tag>

      <Tag type="text" style={demoTagStyle}>
        列表状态标签
      </Tag>

      <Tag type="edit" style={demoTagStyle}>
        动态标签
      </Tag>

      <Tag type="edit" closable style={demoTagStyle}>
        动态可编辑标签
      </Tag>

      <Tag type="edit" closable disabled style={demoTagStyle}>
        动态标签禁用态
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```