---
title: 货币符号
order: 7
---

可通过 symbol 配置货币符号

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <InputNumber style={inputStyle} placeholder="人民币" symbol="￥" />
      <br />
      <InputNumber style={inputStyle} placeholder="美元" symbol="$" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
