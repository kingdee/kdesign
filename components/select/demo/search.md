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
  const arr = [
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
  const [options, setOptions] = React.useState(arr)
  const handleSearch = (value) => {
    const searchOptions = arr.filter((item) => {
      return item.children.indexOf(value) > -1
    })
    setOptions([...searchOptions])
  }

  return (
    <>
      <Select showSearch onSearch={handleSearch} style={style}>
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