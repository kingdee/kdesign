---
title: 图标可配置
order: 1
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div>
      <Link prefix={<Icon type="date" />} className="link-icon-right">
        日历
      </Link>
      <Link suffix={<Icon type="hyperlink" />}>
        原始单据
      </Link>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.link-icon-right {
  margin-right: 10px;
}
```
