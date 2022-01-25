---
title: 掩码配置
order: 5
---

配置 mask 掩码可在非编辑态时对数值按掩码规则进行格式化处理

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <InputNumber style={inputStyle} placeholder="掩码配置千位分割" mask="#,###" />
      <br />
      <InputNumber style={inputStyle} placeholder="掩码配置转换百分比" mask="#%" />
      <br />
      <InputNumber style={inputStyle} placeholder="掩码配置货币符" mask="$#" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
