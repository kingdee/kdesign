---
title: 无图片与无描述
order: 3
---

通过设置 `description` 与 `image` 为 `false` 能去除描述和图片

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Empty } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Empty name="Empty" description="没有找到结果" image={false} />

      <Empty name="Empty" description={false} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
