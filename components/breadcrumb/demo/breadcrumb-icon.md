---
title: 配置节点图标
order: 2
---

配置面包屑节点的图标，默认无图标

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb, Icon } from '@kdcloudjs/kdesign'
import type { IBreadcrumbProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  const config: IBreadcrumbProps['items'] = [
    {
      title: 'KDesign',
      icon: <Icon type="workbench" />,
      href: '#',
    },
    {
      title: 'KDesign React',
      icon: <Icon type="star" />,
      href: '#',
    },
    {
      title: 'Breadcrumb',
      icon: <Icon type="sun-solid" />,
    },
  ]
  return <Breadcrumb items={config} />
}

ReactDOM.render(<Demo />, mountNode)
```
