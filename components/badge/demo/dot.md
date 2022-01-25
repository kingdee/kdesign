---
title: 状态徽标
order: 1
---

提示用户有内容更新。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Badge dot>
      <span className="head-example" />
    </Badge>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.kdicon-notice {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
```
