---
title: 配置分隔符
order: 3
---

配置面包屑节点的分隔符，默认为 “/”

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  // 改下面的代码
  const config = [
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
  return (
    <>
      <Breadcrumb items={config} />
      <Breadcrumb separator=">" items={config} />
      <Breadcrumb separator={<Icon type="arrow-right-solid" />} items={config} />
    </>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
