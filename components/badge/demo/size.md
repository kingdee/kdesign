---
title: 大小
order: 6
---

可设置数字徽标的大小

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div className="head">
      <Badge count={5} >
        <span className="head-example" />
      </Badge>
      <Badge count={5} size="small">
        <span className="head-example" />
      </Badge>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
