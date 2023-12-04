---
order: 12
title: onShowSizeChange回调
---

pageSize 变化后的回调。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '500px' }}>
       <Pagination pageType="nicety" onShowSizeChange={() => console.log('触发onShowSizeChange回调')} defaultCurrent={3} total={50} showSizeChanger />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
