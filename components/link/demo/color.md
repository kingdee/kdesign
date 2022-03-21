---
title: 颜色可配置
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Link className="link-color-right">
        文本链接
      </Link>
      <Link style={{ color: '#31c8b8' }}>
        文本链接
      </Link>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.link-color-right {
  margin-right: 10px;
}
```
