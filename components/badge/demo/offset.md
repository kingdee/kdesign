---
title: 位置偏移可配置
order: 3
---

位置可根据需要进行配置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Badge count={5} offset={[10,10]}>
        <span className="head-example" />
      </Badge>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

