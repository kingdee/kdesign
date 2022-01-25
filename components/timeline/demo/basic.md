---
order: 0
title: 基本用法
---

基本的时间轴。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Timeline>
      <Timeline.Item>节点内容一</Timeline.Item>
      <Timeline.Item>节点内容二</Timeline.Item>
      <Timeline.Item>节点内容三</Timeline.Item>
      <Timeline.Item>节点内容四</Timeline.Item>
    </Timeline>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
