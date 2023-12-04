---
order: 11
title: 设置showTitle
---

是否显示原生 tooltip 页码。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '400px' }}>
      <Pagination showTitle={true} pageType="nicety" defaultCurrent={1} total={50} />
      <br />
      <br />
      <Pagination showTitle={false} pageType="nicety" defaultCurrent={1} total={50} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
