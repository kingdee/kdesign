---
title: 自定义附属内容
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Empty, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Empty>
      <Button type="primary" ghost style={{ marginTop: '10px' }}>
        立即新增
      </Button>
    </Empty>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
