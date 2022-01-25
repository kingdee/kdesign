---
order: 0
title: 基础分页
---

在页面中进行分页时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return <div style={{ width: '300px' }}><Pagination defaultCurrent={1} total={50} /></div>
}

ReactDOM.render(<Demo />, mountNode)
```