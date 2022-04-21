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
      <Steps current={0}>
        <Step title="Step1" />
        <Step title="Step2" />
        <Step title="Step3" />
        <Step title="Step4" />
      </Steps>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
