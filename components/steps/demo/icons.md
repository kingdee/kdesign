---
title: 配置各个状态的图标
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const iconStyle = { fontSize: 12 }
  const icons = {
    process: <Icon type="loadding" style={iconStyle} spin />,
    wait: <Icon type="wating" style={iconStyle} />,
    error: <Icon type="close" style={iconStyle} />,
    finish: <Icon type="right-bold" style={iconStyle} />,
  }
  return (
    <>
      <Steps style={{ width: 800 }} current={2} status="error" icons={icons}>
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