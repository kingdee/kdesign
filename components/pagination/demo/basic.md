---
order: 0
title: 基础分页
---

在页面中进行分页时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'
import type { IPaginationProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const total: IPaginationProps['total'] = 50
  return <div style={{ width: '300px' }}><Pagination defaultCurrent={1} total={total} /></div>
}

ReactDOM.render(<Demo />, mountNode)
```
