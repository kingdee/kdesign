---
order: 6
title: 设置条目数
---

自定义设置每一页的显示条目数。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize)
  }

  return (
    <div style={{ width: '400px' }}>
      <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```