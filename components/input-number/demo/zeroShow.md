---
title: 值为0时是否显示
order: 3
---

设置 zeroShow 属性为 false,在退出编辑态时如果值为 0 将清空输入框

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div  style={{ width: '300px' }}>
      <InputNumber style={inputStyle} placeholder="为0不显示" zeroShow={false} />
      <br />
      <InputNumber style={inputStyle} placeholder="为0显示" zeroShow={true} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
