---
order: 4
title: 星星总数、默认选中的星星数、当前选中的星星数
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div  style={{ width: '150px' }}>
      <Rate defaultValue={7.5} count={10} />
      <br />
      <Rate defaultValue={3.5} />
      <br />
      <Rate defaultValue={3.5} value={1} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```