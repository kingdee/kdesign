---
order: 7
title: 可清除
---

可清除已选数据。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Option } = Select
  const style = {
    width: 230,
  }
  return (
    <>
      <Select allowClear borderType="bordered" style={style}>
        <Option value="apple">
          <span style={{ color: '#f00' }}>苹果</span>
        </Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
      </Select>
      <br />
      <br />
      <Select allowClear mode="multiple" borderType="bordered" style={style} optionFilterProp="children">
        <Option value="apple">
          <span style={{ color: '#f00' }}>苹果</span>
        </Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
        <Option value="lemon">柠檬</Option>
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```