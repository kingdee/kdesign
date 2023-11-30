---
title: 配置小数位数
order: 2
---

不做任何配置，只能做数值相关的输入

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: '8px', marginRight: '8px', width: '230px' }
  return (
    <div  style={{ width: '600px' }}>
      <p>最多输入2位小数，输入时在编辑时将无法输入超过2位小数的数</p>
      <InputNumber style={inputStyle} placeholder="请输入超过5位数查看效果" decimalLength={2} />
      <p>最多输入2位小数，对输入不限制在精度范围时将在失去焦点时自动按位数截断</p>
      <InputNumber
        style={inputStyle}
        placeholder="请输入超过5位数后失焦查看效果"
        decimalLength={2}
        mustInPrecisionScope={false}
      />
      <p>将decimalLength配置为0，可实现只能输入整数</p>
      <InputNumber style={inputStyle} placeholder="只能输入整数" decimalLength={0} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
