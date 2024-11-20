---
order: 6
title: 设置条目数
---

自定义设置每一页的显示条目数。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'
import type { IPaginationProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleChange:IPaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize)
  }

  return (
    <div style={{ width: '400px' }}>
      <Pagination showSizeChanger onShowSizeChange={handleChange} defaultCurrent={3} total={500} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
