---
order: 1
title: 垂直间距
---

组件之间垂直间距。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Card } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '400px' }}>
      <Card title="Card" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  )
}

ReactDOM.render(<Demo />, mountNode)
```