---
title: 属性标签
order: 2
---

表示角色或单据的多种属性

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

function Demo() {
  const demoTagStyle = { marginRight: '8px' }
  return (
    <div>
      <Tag type="attribute" color="process" style={demoTagStyle}>
        司龄8年
      </Tag>

      <Tag type="attribute" color="success" style={demoTagStyle}>
        狮子座
      </Tag>

      <Tag type="attribute" color="warning" style={demoTagStyle}>
        深圳
      </Tag>

      <Tag type="attribute" color="error" style={demoTagStyle}>
        旅游
      </Tag>

      <Tag type="attribute" color="end" style={demoTagStyle}>
        猪猪女孩
      </Tag>

      <Tag type="attribute" color="expired" style={demoTagStyle}>
        颜值控
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```