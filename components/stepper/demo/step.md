---
title: 配置步长
order: 1
---

配置 `step` 属性设置每次增减的数值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Stepper } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Stepper style={inputStyle} step={0.1} placeholder="基本使用" type="base" />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```