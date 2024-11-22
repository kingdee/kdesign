---
title: 可点击模式
order: 2
---

配置 onChange 回调后各个步骤项将可点击，点击后回传所点击步骤条的步骤索引到回调函数

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step } from '@kdcloudjs/kdesign'
import type { IStepsProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
   const [current, setCurrent] = React.useState<IStepsProps['current']>(0)
  return (
    <>
      <Steps style={{ width: 800 }} current={current} onChange={setCurrent}>
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