---
title: 配置链接和拼接路径
order: 5
---

配置链接 href 和拼接路径 path，注意 path 与 href 不能同时存在

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb } from '@kdcloudjs/kdesign'
import type { IBreadcrumbProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  const config1: IBreadcrumbProps['items'] = [
    {
      title: 'KDesign',
      href: 'https://kingdee.design/',
    },
    {
      title: 'KDesign React',
      href: 'https://react.kingdee.design/',
    },
    {
      title: 'Breadcrumb',
    },
  ]
  const config2: IBreadcrumbProps['items'] = [
    {
      title: 'KDesign',
      path: '/KUI',
    },
    {
      title: 'KDesign React',
      path: '/KUI',
    },
    {
      title: 'Breadcrumb',
    },
  ]
  return (
    <>
      配置href： <Breadcrumb items={config1} />
      <br />
      配置path： <Breadcrumb items={config2} />
    </>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
