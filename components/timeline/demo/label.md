---
order: 6
title: 标签
---

使用 `label` 标签单独展示时间。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Timeline, Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [mode, setMode] = React.useState<string>('left')

  const onChange = (e) => {
    setMode(e.target.value)
  }

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode} style={{ width: 500 }}>
        <Timeline.Item label="2021-11-01">创建服务站点</Timeline.Item>
        <Timeline.Item label="2021-11-01 09:12:11">解决初始网络问题</Timeline.Item>
        <Timeline.Item>技术测试</Timeline.Item>
        <Timeline.Item label="2021-11-01 09:12:11">正在解决的网络问题</Timeline.Item>
      </Timeline>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
