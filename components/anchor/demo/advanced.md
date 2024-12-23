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
import type { IAnchorProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const myType: IAnchorProps['type'] = 'advanced'
  return (
    <Anchor type={myType}>
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
