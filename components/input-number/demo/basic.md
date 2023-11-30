---
title: 基本使用
order: 0
---

不做任何配置，只能做数值相关的输入

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  const [val, setVal] = React.useState<string>('')
  return (
    <div  style={{ width: '300px' }}>
    <InputNumber
      style={inputStyle}
      placeholder="带货币符号"
      value={val}
      formatter={value => `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      onChange={(e) => {
        setVal(e.target.value)
        console.log(e, e.target.value)
      }}
    /></div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
