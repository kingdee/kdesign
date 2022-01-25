---
order: 4
title: 较少分页
---

当分页少于 7 页时使用。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '300px' }}>
      <Pagination pageType="less" defaultCurrent={1} total={50} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```