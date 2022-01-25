---
title: 折叠功能可配置
order: 2
---

当需要锚点的页面或容器中，信息较为密集，需要将锚点面板收起时。  
开启折叠功能后，可配置固定功能。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor } from '@kdcloudjs/kdesign'

function Demo() {
  const { Link } = Anchor
  return (
    <Anchor type="advanced">
      <Link href="#使用场景" title="使用场景" />
      <Link href="#components-anchor-demo-basic" title="书签式锚点" />
      <Link href="#components-anchor-demo-menu" title="菜单式锚点" />
      <Link href="#components-anchor-demo-advanced" title="高级锚点" />
      <Link href="#API" title="API">
        <Link href="#Anchor-Props" title="Anchor-Props" />
        <Link href="#Link-Props" title="Link-Props" />
      </Link>
    </Anchor>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
