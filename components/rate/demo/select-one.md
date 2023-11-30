---
order: 8
title: 只选中当前图标
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div  style={{ width: '150px' }}>
      <Rate onlyActiveCurrent={true} defaultValue={3} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```