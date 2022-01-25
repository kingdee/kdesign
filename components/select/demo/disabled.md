---
order: 8
title: 禁用
---

禁用状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

function Demo() {
  const { Option } = Select
  const style = {
    width: 230,
  }
  return (
    <>
      <Select borderType="bordered" style={style} value="apple" disabled>
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
      </Select>
      <br />
      <br />
      <Select disabled mode="multiple" defaultValue={['apple', 'grape']} borderType="bordered" style={style}>
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
        <Option value="lemon">柠檬</Option>
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```