---
title: 文本链接
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Link target="_blank" href="https://www.kingdee.com/">
      文本链接
    </Link>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
