---
order: 10
title: 设置pageSize
---

设置分页器大小。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '400px' }}><Pagination showSizeChanger pageSizeOptions={['10', '20', '30', '40']} defaultCurrent={1} total={50} /></div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
