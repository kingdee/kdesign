---
title: 独立使用
order: 4
---

不包裹任何元素

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const style = { width: 100, display: 'flex', alignItems: 'center' }
  return (
    <div style={style} className="head">
      <Badge count={25} />
      <Badge count={<Icon type="notice" style={{ fontSize: 16, color: '#f5222d' }} />} />
      <Badge count={100} style={{ backgroundColor: '#52c41a' }} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
