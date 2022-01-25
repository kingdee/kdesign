---
order: 5
title: 选中时图标颜色
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '150px' }}>
      <Rate color="red" defaultValue={3} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```