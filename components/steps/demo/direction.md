---
title: 垂直模式
order: 1
---

通过配置属性 direction 为 vertical 可将步骤条调整为垂直模式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Steps style={{ width: 300, height: 400 }} current={2} status="error" direction="vertical">
        <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
        <Step title="Step2" description="hello word" />
        <Step title="Step3" description="hello word" />
        <Step title="Step4" description="hello word" />
      </Steps>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```