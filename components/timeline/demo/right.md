---
title: 右侧时间轴点
order: 5
---

时间轴点可以在内容的右边。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Timeline mode="right">
      <Timeline.Item>创建服务站点 2021-11-01</Timeline.Item>
      <Timeline.Item>解决初始网络问题 2021-11-01</Timeline.Item>
      <Timeline.Item color="red">技术测试 2021-11-01</Timeline.Item>
      <Timeline.Item>正在解决的网络问题 2021-11-01</Timeline.Item>
    </Timeline>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
