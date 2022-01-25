---
title: 不可用状态
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="基本使用" disabled />
      <Input style={inputStyle} placeholder="全边框" borderType="bordered" disabled />
      <Input style={inputStyle} placeholder="无边框" borderType="none" disabled />
      <Input style={inputStyle} placeholder="请输入" borderType="bordered" prefix="金额" suffix="rmb" disabled />
      <Input
        style={inputStyle}
        placeholder="请输入"
        borderType="bordered"
        addonBefore="金额"
        addonAfter="rmb"
        disabled
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
