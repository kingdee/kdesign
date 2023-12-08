---
title: 垂直分割线
order: 4
---

改变分割线布局，默认水平

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Divider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>KDesign</span>
      <Divider type="vertical" style={{ margin: '0 10px' }} />
      <span>KDesign</span>
      <Divider type="vertical" borderStyle="dotted" style={{ margin: '0 10px' }} />
      <span>KDesign</span>
      <Divider type="vertical" borderStyle="dashed" style={{ margin: '0 10px' }} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
