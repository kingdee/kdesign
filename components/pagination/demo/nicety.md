---
order: 5
title: 精细分页
---

对页码精细的显示。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const fifty = 50
  const twohundred = 200
  return (
    <div style={{ width: '550px' }}>
      <Pagination pageType="nicety" defaultCurrent={1} total={fifty} />
      <br />
      <br />
      <Pagination pageType="nicety" defaultCurrent={2} total={twohundred} showQuickJumper={false} />
      <br />
      <br />
      <Pagination pageType="nicety" defaultCurrent={3} total={fifty} showSizeChanger />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
