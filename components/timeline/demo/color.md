---
order: 1
title: 圆圈颜色
---

圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态，灰色表示未完成或失效状态。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Timeline>
      <Timeline.Item color="green">创建服务站点 2021-11-01</Timeline.Item>
      <Timeline.Item color="green">创建服务站点 2021-11-01</Timeline.Item>
      <Timeline.Item color="red">
        <p>解决初始网络问题 1</p>
        <p>解决初始网络问题 2</p>
        <p>解决初始网络问题 3 2021-11-02</p>
      </Timeline.Item>
      <Timeline.Item>
        <p>技术测试 1</p>
        <p>技术测试 2</p>
        <p>技术测试 3 2021-11-02</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>技术测试 1</p>
        <p>技术测试 2</p>
        <p>技术测试 3 2021-11-02</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>技术测试 1</p>
        <p>技术测试 2</p>
        <p>技术测试 3 2021-11-02</p>
      </Timeline.Item>
    </Timeline>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
