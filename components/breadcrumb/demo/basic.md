---
title: 基本使用
order: 0
---

基本面包屑

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb } from '@kdcloudjs/kdesign'

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
  return <Breadcrumb items={config} />
}

ReactDOM.render(<Demo />, mountNode)
```
