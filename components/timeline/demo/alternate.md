---
order: 3
title: 交替展现
---

内容在时间轴两侧轮流出现。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Timeline mode="alternate">
      <Timeline.Item>节点内容一 2021-10-01</Timeline.Item>
      <Timeline.Item color="green">节点内容二 2021-10-01</Timeline.Item>
      <Timeline.Item dot={<Icon type="waiting" style={{ fontSize: 16 }} />}>
       节点内容三 2021-10-01
      </Timeline.Item>
      <Timeline.Item color="red">节点内容四 2021-10-01</Timeline.Item>
      <Timeline.Item>节点内容五 2021-10-01</Timeline.Item>
      <Timeline.Item dot={<Icon type="waiting" style={{ fontSize: 16 }} />}>节点内容六 2021-10-01</Timeline.Item>
    </Timeline>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
