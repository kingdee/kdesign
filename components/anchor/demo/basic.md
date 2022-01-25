---
title: 纵向锚点
order: 0
---

导航有多个层级时，常用于页面右侧。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Anchor, Switch } from '@kdcloudjs/kdesign'

function Demo() {
  const { Link } = Anchor
  const [affix, setAffix] = React.useState(false)

  function toggleAffix(checked) {
    setAffix(checked)
  }

  return (
    <>
      <Switch style={{ width: 60, marginBottom: 20 }} checked={affix} onChange={toggleAffix} checkedChildren="固定" unCheckedChildren="不固定"></Switch>
      <Anchor offsetTop={70} affix={affix}>
        <Link href="#使用场景" title="使用场景" />
        <Link href="#components-anchor-demo-basic" title="书签式锚点" />
        <Link href="#components-anchor-demo-menu" title="菜单式锚点" />
        <Link href="#components-anchor-demo-advanced" title="高级锚点" />
        <Link href="#API" title="API">
          <Link href="#Anchor-Props" title="Anchor-Props" />
          <Link href="#Link-Props" title="Link-Props" />
        </Link>
      </Anchor>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
