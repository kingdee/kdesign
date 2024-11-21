---
title: 自适应
order: 6
---

面包屑根据父节点的宽度自适应

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
      href: 'https://kingdee.design/',
    },
    {
      title: 'KDesign React',
      href: 'https://react.kingdee.design/',
    },
    {
      title: 'KDesign React',
      href: 'https://react.kingdee.design/',
    },
    {
      title: 'KDesign React',
      href: 'https://react.kingdee.design/',
    },
    {
      title: 'Breadcrumb',
    },
  ]
  return (
    <div style={{ width: '340px' }}>
      <Breadcrumb items={config} />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
