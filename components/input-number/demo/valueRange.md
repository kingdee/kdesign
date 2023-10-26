---
title: 数值范围配置
order: 6
---

可自定义配置数值的输入范围

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '400px' }}>
      <p>开启mustInScope时将只能在给定数值区间输入数值</p>
      <InputNumber style={inputStyle} placeholder="只能输入小于10000的数值" max={10000} mustInScope maxMark=")" />
      <br />
      <InputNumber style={inputStyle} placeholder="只能输入小于等于10000的数值" max={10000} maxMark="]" mustInScope />
      <p>关闭mustInScope时在退出编辑态时将根据数值范围进行调整</p>
      <InputNumber style={inputStyle} placeholder="只能输入小于等于10000的数值" max={10000} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
