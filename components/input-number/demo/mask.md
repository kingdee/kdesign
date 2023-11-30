---
title: 格式化展示
order: 5
---

通过 `formatter` 格式化数字

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <InputNumber style={inputStyle} placeholder="配置千位分割" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
      <br />
      <InputNumber style={inputStyle} placeholder="配置转换百分比" formatter={value => `${value}%`} />
      <br />
      <InputNumber style={inputStyle} placeholder="配置货币符" formatter={value => `$${value}`} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
