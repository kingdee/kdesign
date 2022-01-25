---
title: 是否显示小数尾部的0
order: 4
---

开启`showDecimalTailZero`配置时将在非编辑态展示小数尾部为 0 的部分（当配置小数长度时将自动补齐尾 0），否则不显示

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <InputNumber style={inputStyle} placeholder="显示小数尾零" showDecimalTailZero={true} decimalLength={2} />
      <br />
      <InputNumber style={inputStyle} placeholder="不显示小数尾零" showDecimalTailZero={false} decimalLength={2} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
