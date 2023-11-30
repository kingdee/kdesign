---
order: 0
title: 典型卡片
---

包含标题、内容、操作区域。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Card title="标题文本" style={{ width: 300 }} >
        <p>这是内容</p>
        <p>这是内容</p>
        <p>这是内容</p>
      </Card>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
