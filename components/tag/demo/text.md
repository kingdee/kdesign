---
title: 列表状态标签
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }
  return (
    <div>
      <Tag type="text" color="process" style={demoTagStyle}>
        等待付款
      </Tag>

      <Tag type="text" color="success" style={demoTagStyle}>
        审核通过
      </Tag>

      <Tag type="text" color="warning" style={demoTagStyle}>
        催办
      </Tag>

      <Tag type="text" color="error" style={demoTagStyle}>
        驳回
      </Tag>

      <Tag type="text" color="end" style={demoTagStyle}>
        暂存
      </Tag>

      <Tag type="text" color="expired" style={demoTagStyle}>
        过期
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```