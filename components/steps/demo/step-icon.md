---
title: 单独配置某个步骤项的图标
order: 4
---

给 Step 组件配置 icon 属性将可以直接将该项的图标指定为你所需要的，且不再受状态影响

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Steps, Step, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Steps style={{ width: 800 }} current={2} status="error">
        <Step title="Step1" description="hello word hello word hello word hello word hello word hello word" />
        <Step title="Step2" description="hello word" icon={<Icon type="loadding" spin />} />
        <Step title="Step3" description="hello word" />
        <Step title="Step4" description="hello word" />
      </Steps>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
