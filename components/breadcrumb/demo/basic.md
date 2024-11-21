---
title: 基本使用
order: 0
---

基本面包屑

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb } from '@kdcloudjs/kdesign'
import type { IBreadcrumbProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  const config: IBreadcrumbProps['items'] = [
    {
      title: 'KDesign',
      href: '#',
    },
    {
      title: 'KDesign React',
      href: '#',
    },
    {
      title: 'Breadcrumb',
    },
  ]
  return <Breadcrumb items={config} />
}

ReactDOM.render(<Demo />, mountNode)
```
