---
title: 文本链接
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Icon } from '@kdcloudjs/kdesign'
import type { ILinkProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const target: ILinkProps['target'] = '_blank'
  return (
    <Link target={target} href="https://www.kingdee.com/">
      文本链接
    </Link>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
