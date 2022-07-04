---
title: 横向锚点
order: 1
---

导航仅一个层级时，固定在页面顶部。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Anchor affix={false} offsetTop={70} style={{ width: 460 }} type="menu">
      <Anchor.Link href="#使用场景" title="使用场景" />
      <Anchor.Link href="#components-anchor-demo-basic" title="纵向锚点" />
      <Anchor.Link href="#components-anchor-demo-menu" title="横向锚点" />
      <Anchor.Link href="#components-anchor-demo-advanced" title="折叠功能可配置" />
      <Anchor.Link href="#API" title="API">
        <Anchor.Link href="#Anchor-Props" title="Anchor-Props" />
        <Anchor.Link href="#Link-Props" title="Link-Props" />
      </Anchor.Link>
      <Anchor.Link href="#Design-Token" title="Design-Token" />
    </Anchor>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
