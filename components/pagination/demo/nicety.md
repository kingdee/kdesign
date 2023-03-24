---
order: 5
title: 精细分页
---

对页码精细的显示。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '550px' }}>
      <Pagination pageType="nicety" defaultCurrent={1} total={50} />
      <br />
      <br />
      <Pagination pageType="nicety" defaultCurrent={2} total={200} showQuickJumper={false} />
      <br />
      <br />
      <Pagination pageType="nicety" defaultCurrent={3} total={50} showSizeChanger />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
