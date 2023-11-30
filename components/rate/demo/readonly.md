---
order: 2
title: 只读
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <div  style={{ width: '150px' }}> <Rate disabled={true} defaultValue={3} /></div>
}

ReactDOM.render(<Demo />, mountNode)
```