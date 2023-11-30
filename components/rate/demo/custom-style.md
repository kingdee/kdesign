---
order: 7
title: 自定义样式
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div  style={{ width: '150px' }}>
      <Rate defaultValue={3} style={{ fontSize: 36 }} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```