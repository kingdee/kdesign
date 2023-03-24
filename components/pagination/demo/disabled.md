---
order: 9
title: 禁用状态
---

设置分页的禁用状态。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '500px' }}>
      <Pagination defaultCurrent={3} total={500} disabled />
      <br />
      <br />
      <Pagination pageType="bill" total={50} bordered disabled />
      <br />
      <br />
      <Pagination pageType="bill" total={50} disabled showSizeChanger showQuickJumper />
      <br />
      <br />
      <Pagination disabled pageType="simple" defaultCurrent={2} total={50} />
      <br />
      <br />
      <Pagination bordered disabled pageType="simple" defaultCurrent={2} total={50} showQuickJumper={false} />
      <br />
      <br />
      <Pagination pageType="less" defaultCurrent={4} total={50} disabled />
      <br />
      <br />
      <Pagination pageType="nicety" defaultCurrent={4} total={50} showSizeChanger disabled />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
