---
order: 6
title: 评分尺寸（large/middle/small）
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div  style={{ width: '150px' }}>
      <Rate defaultValue={3} size={'large'} />
      <br />
      <Rate defaultValue={3} size={'middle'} />
      <br />
      <Rate defaultValue={3} size={'small'} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```