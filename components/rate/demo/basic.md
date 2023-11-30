---
order: 0
title: 基本
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <div style={{ width: '150px' }}> <Rate  /></div>
}

ReactDOM.render(<Demo />, mountNode)
```