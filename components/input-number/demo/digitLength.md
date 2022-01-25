---
title: 配置数字位数
order: 1
---

配置 digitLength 属性将可以限制整个数值输入框的数字位数（整数位和小数位的总和）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: '8px', marginRight: '8px', width: '230px' }
  return (
    <div  style={{ width: '500px' }}>
      <p>最多输入5位数，输入时在编辑时将无法输入超过5位数的数</p>
      <InputNumber style={inputStyle} placeholder="请输入超过5位数查看效果" digitLength={5} />
      <p>最多输入5位数，对输入不限制在精度范围时将在失去焦点时自动按位数截断</p>
      <InputNumber
        style={inputStyle}
        placeholder="请输入超过5位数后失焦查看效果"
        digitLength={5}
        mustInPrecisionScope={false}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
