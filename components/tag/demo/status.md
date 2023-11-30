---
title: 状态标签
order: 1
---

状态标签分为 6 种：

- `process` 标示审核中或者等待种的状态（例如：审核中、等待付款、等待审核）
- `success` 标示已完成或者成功、通过等状态（例如：已提交、审核通过、已付款）
- `warning` 轻度警示：紧急/催办/提醒
- `error` 轻度警示：驳回/超期/禁用
- `end` 标示暂停或者终止等状态（例如：暂存、提交终止）
- `expired` 标示已废弃或者过期等的状态（例如：已废弃、已过期）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }
  return (
    <div>
      <Tag type="status" color="process" style={demoTagStyle}>
        在办
      </Tag>

      <Tag type="status" color="success" style={demoTagStyle}>
        提交/最新/转交/已启用
      </Tag>

      <Tag type="status" color="warning" style={demoTagStyle}>
        紧急/重要/催办
      </Tag>

      <Tag type="status" color="error" style={demoTagStyle}>
        驳回/已禁用
      </Tag>

      <Tag type="status" color="end" style={demoTagStyle}>
        暂存/未启用
      </Tag>

      <Tag type="status" color="expired" style={demoTagStyle}>
        过期
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```