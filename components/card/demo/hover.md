---
order: 2
title: 鼠标进入
---

鼠标移过时可浮起

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Card title="标题文本" hoverable style={{ width: 300 }}>
      <p>这是内容</p>
      <p>这是内容</p>
      <p>这是内容</p>
    </Card>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
