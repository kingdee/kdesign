---
order: 1
title: 不可用
---

Radio 不可用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div style={{ width: '350px' }}>
      <div>
        <Radio disabled>Disabled</Radio>
        <Radio disabled defaultChecked>
          Disabled
        </Radio>
      </div>
      <div style={{ marginTop: 10 }}>
        <Radio radioType="square" disabled>
          Disabled
        </Radio>
        <Radio radioType="square" disabled defaultChecked>
          Disabled
        </Radio>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
