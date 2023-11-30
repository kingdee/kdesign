---
title: 自定义描述
order: 2
---

设置 `description` 属性能自定义描述文字内容

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Empty } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Empty description="没有找到结果" />
      <Empty
        description={
          <span>
            自定义 <a href="#API">描述内容</a>
          </span>
        }
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
