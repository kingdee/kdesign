---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Steps current={0}>
        <Step title="步骤条节点标题文本，我是比较长的文本" />
        <Step title="标题内容2" />
        <Step title="标题内容3" />
        <Step title="标题内容4" />
      </Steps>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
