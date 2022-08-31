---
title: 可以点击清除图标删除内容
order: 4
---

配置 allowClear 属性后开启在输入内容时可以直接点击清除图标直接清空内容的功能

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  return (
    <div style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="基本使用" allowClear />
      <Input style={inputStyle} placeholder="基本使用" allowClear={<Icon type='delete' />} />
      <Input
        style={inputStyle}
        placeholder="请输入"
        borderType="bordered"
        addonBefore="金额"
        addonAfter="rmb"
        allowClear
      />
      <Input style={inputStyle} placeholder="请输入" borderType="bordered" prefix="金额" suffix="rmb" allowClear />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
