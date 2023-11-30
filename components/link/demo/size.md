---
title: 尺寸可配置
order: 2
---
链接有三个尺寸：小号、中号、大号（默认为中号按钮）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Link size="small" className="link-size-right">
        链接
      </Link>
      <Link size="middle" className="link-size-right">
        链接
      </Link>
      <Link size="large" className="link-size-right">
        链接
      </Link>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.link-size-right {
  margin-right: 10px;
}
```
