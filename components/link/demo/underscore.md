---
title: 下划线可配置
order: 4
---

下划线根据需要配置，可分为有下划线和无下划线。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Link name="Link" className="link-underscore-right">
        链接
      </Link>
      <Link name="Link" underscore>
        链接
      </Link>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.link-underscore-right {
  margin-right: 10px;
}
```
