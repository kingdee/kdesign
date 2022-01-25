---
order: 0
title: 基本使用
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

function Demo() {
  const style = {
    width: '100%',
  }
  const { Option } = Select

  const handleChange = (value) => {
    console.log(value)
  }
  const handleSelect = (value) => {
    console.log(value)
  }
  return (
    <div style={{ width: '300px' }}>
      <Select placeholder="请输入名称" style={style} onChange={handleChange} onSelect={handleSelect}>
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
      </Select>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```