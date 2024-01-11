---
title: 改变面包屑模式
order: 1
---

改变面包屑模式，默认为强调当前页面的模式

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
  return (
    <>
      强调：
      <Breadcrumb items={config} colorModel="emphasize" />
      <br />
      弱化：
      <Breadcrumb items={config} colorModel="weaken" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
