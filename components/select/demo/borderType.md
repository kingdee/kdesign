---
order: 9
title: 边框类型
---

我们提供带下边框、全边框和无边框三种边框类型的输入框，配置属性 borderType 即可在这三种类型间切换。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Option } = Select
  const style = {
    width: 230,
    marginRight: 20
  }
  return (
    <>
      <Select style={style} placeholder="默认边框">
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
      </Select>
      <Select borderType="bordered" style={style} placeholder="有边框">
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
        <Option value="lemon">柠檬</Option>
      </Select>
      <Select borderType="none" style={style} placeholder="无边框">
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
