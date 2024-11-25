---
title: 前置/后置标签
order: 2
---

用于配置一些固定组合。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from '@kdcloudjs/kdesign'
import type { IInputProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const bordered: IInputProps['borderType'] = 'bordered'
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="请输入" borderType={bordered} addonAfter="rmb" />
      <Input style={inputStyle} placeholder="请输入" borderType={bordered} addonBefore="金额" />
      <Input style={inputStyle} placeholder="请输入" borderType={bordered} addonBefore="金额" addonAfter="rmb" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
