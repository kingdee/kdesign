---
title: 纵向锚点
order: 0
---

导航有多个层级时，常用于页面右侧。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor, Switch } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [affix, setAffix] = React.useState<boolean>(false)

  function toggleAffix(checked) {
    setAffix(checked)
  }

  return (
    <>
      <Switch style={{ width: 60, marginBottom: 20 }} checked={affix} onChange={toggleAffix} checkedChildren="固定" unCheckedChildren="不固定"></Switch>
      <Anchor offsetTop={70} targetOffset={0} affix={affix}>
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
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
