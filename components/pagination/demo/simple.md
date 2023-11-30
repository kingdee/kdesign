---
order: 1
title: 简化分页
---

在空间较小的容器内进行分页时，如弹窗。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Pagination from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div style={{ width: '200px' }}>
      <Pagination pageType="simple" defaultCurrent={2} total={50} showQuickJumper={false} />
      <br />
      <br />
      <Pagination pageType="simple" defaultCurrent={2} total={50} />
      <br />
      <br />
      <Pagination bordered pageType="simple" defaultCurrent={2} total={50} showQuickJumper={false} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```