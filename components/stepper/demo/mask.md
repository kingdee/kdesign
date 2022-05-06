---
title: 格式化展示
order: 2
---

通过 `formatter` 格式化数字

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Stepper } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Stepper style={inputStyle} placeholder="基本使用" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
      <br />
      <Stepper style={inputStyle} placeholder="基本使用" formatter={value => `$ ${value}`} />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
