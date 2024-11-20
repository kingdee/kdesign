---
order: 7
title: 快速跳转
---

输入页码后快速跳转到某一页。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'
import type { IPaginationProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleChange: IPaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber)
  }

  return (
    <div style={{ width: '400px' }}>
      <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={handleChange} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
