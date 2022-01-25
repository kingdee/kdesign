---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Steps current={2} status="error">
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