---
order: 4
title: 自定义时间轴点
---

可以设置为图标或其他自定义元素。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Timeline>
      <Timeline.Item dot={<Icon type="right-solid" />} color="green">
        Done
      </Timeline.Item>
      <Timeline.Item>Ongoing</Timeline.Item>
      <Timeline.Item>Started</Timeline.Item>
      <Timeline.Item>Not Started</Timeline.Item>
    </Timeline>
  )
}

ReactDOM.render(<Demo />, mountNode)
```