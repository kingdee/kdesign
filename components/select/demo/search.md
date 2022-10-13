---
order: 3
title: 筛选选择
---

支持选项筛选

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

function Demo() {
  const { Option } = Select
  const options = [
    {
      children: '苹果',
      value: 'apple',
    },
    {
      children: '橘子',
      value: 'orange',
    },
    {
      children: '葡萄',
      value: 'grape',
    },
    {
      children: '葡萄柚',
      value: 'grapefruit',
    },
  ]
  const style = {
    width: 230,
  }
  return (
    <>
      <Select showSearch style={style} optionFilterProp="children">
        {options.map((item) => {
          return (
            <Option value={item.value} key={item.value}>
              {item.children}
            </Option>
          )
        })}
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
