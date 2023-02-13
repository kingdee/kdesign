---
order: 11
title: 大数据
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

function Demo() {
  const { Option } = Select
  const style = {
    width: 230,
  }

  const options = new Array(1000).fill(null).map((value, index) => `Item ${index}`)

  return (
    <Select placeholder="请输入名称" style={style} showSearch borderType="bordered" virtualListProps={{ height: 200 }}>
      {options.map((item) => {
        return (
          <Option label={item} value={item} key={item}>
            {item}
          </Option>
        )
      })}
    </Select>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
