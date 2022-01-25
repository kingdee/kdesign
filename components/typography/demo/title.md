---
title: 标题组件
order: 1
---

通过设置 level 可以展示不同级别的标题

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Demo() {
  import { Typography } from '@kdcloudjs/kdesign'
  const { Title } = Typography
  return (
    <>
      <Title>h1. KDesign</Title>
      <Title level={2}>h2. KDesign</Title>
      <Title level={3}>h3. KDesign</Title>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```