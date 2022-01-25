---
title: 数字徽标
order: 0
---

提示用户有消息更新并包含提示数字。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Badge count={5}>
      <span className="head-example" />
    </Badge>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.head {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: #eee;
  display: inline-block;
  vertical-align: middle;
}
```
