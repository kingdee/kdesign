---
order: 1
title: 不允许半选
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <div  style={{ width: '150px' }}><Rate allowHalf={false} defaultValue={3} /></div>
}

ReactDOM.render(<Demo />, mountNode)
```