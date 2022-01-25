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
  const { Link } = Anchor
  return (
    <Anchor affix={false} offsetTop={70} style={{ width: 460 }} type="menu">
      <Link href="#使用场景" title="使用场景" />
      <Link href="#components-anchor-demo-basic" title="书签式锚点" />
      <Link href="#components-anchor-demo-menu" title="菜单式锚点" />
      <Link href="#components-anchor-demo-advanced" title="高级锚点" />
      <Link href="#API" title="API" />
    </Anchor>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
