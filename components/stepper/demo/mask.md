---
title: 掩码配置
order: 2
---

配置 `mask` 掩码可在非编辑态时对数值按掩码规则进行格式化处理

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Stepper } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Stepper style={inputStyle} placeholder="基本使用" mask="#,###" />
      <br />
      <Stepper style={inputStyle} placeholder="基本使用" mask="$#" />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```