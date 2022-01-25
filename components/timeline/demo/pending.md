---
order: 2
title: 最后一个及排序
---

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 为真值时展示幽灵节点，如果 pending 是 React 元素可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Button } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { reverse: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ reverse: !this.state.reverse })
  }

  render() {
    return (
      <div>
        <Timeline pending="Recording..." reverse={this.state.reverse}>
          <Timeline.Item>创建服务站点 2021-11-01</Timeline.Item>
          <Timeline.Item>解决初始网络问题 2021-11-01</Timeline.Item>
          <Timeline.Item>技术测试 2021-11-01</Timeline.Item>
        </Timeline>
        <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>
          Toggle Reverse
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
