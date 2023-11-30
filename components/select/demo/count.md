---
order: 6
title: 限制多选tag
---

最多显示多少个 tag。

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
      <Select mode="multiple" borderType="bordered" style={style} maxTagCount={3} optionFilterProp="children">
        <Option value="apple">苹果</Option>
        <Option value="orange">橘子</Option>
        <Option value="grape">葡萄</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
        <Option value="strawberry">草莓</Option>
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
