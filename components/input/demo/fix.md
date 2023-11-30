---
title: 前缀和后缀
order: 3
---

用于配置一些固定组合。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="请输入" suffix="rmb" />
      <Input style={inputStyle} placeholder="请输入" prefix="金额" />
      <Input style={inputStyle} placeholder="请输入" prefix="金额" suffix="rmb" />
      <br />
      <Input style={inputStyle} placeholder="请输入" borderType="bordered" suffix="rmb" />
      <Input style={inputStyle} placeholder="请输入" borderType="bordered" prefix="金额" />
      <Input style={inputStyle} placeholder="请输入" borderType="bordered" prefix="金额" suffix="rmb" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
