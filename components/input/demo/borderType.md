---
title: 边框类型
order: 1
---

我们提供带下边框、全边框和无边框三种边框类型的输入框，配置属性 borderType 即可在这三种类型间切换

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="默认底框" />
      <Input style={inputStyle} placeholder="全边框" borderType="bordered" />
      <Input style={inputStyle} placeholder="无边框" borderType="none" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
