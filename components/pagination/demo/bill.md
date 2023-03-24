---
order: 2
title: 单据分页
---

用在单据中的分页。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '300px' }}>
      <Pagination pageType="bill" total={50} />
      <br />
      <br />
      <Pagination pageType="bill" total={50} bordered />
      <br />
      <br />
      <Pagination pageType="bill" total={50} showSizeChanger showQuickJumper />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
