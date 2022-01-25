---
order: 10
title: 配置选项内容
---

数据化配置选项内容。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const { Option } = Select
  const style = {
    width: 230,
  }
  const options = [
    { label: <div />, value: 'apple' },
    {
      label: (
        <div>
          <Icon type="close" />
        </div>
      ),
      value: 'orange',
    },
    { label: '梨', value: 'pear' },
  ]
  const handleChange = (value) => {
    console.log(value)
  }
  return (
    <>
      <Select
        mode="multiple"
        borderType="bordered"
        defaultValue={['orange']}
        style={style}
        onChange={handleChange}
        options={options}
      />
      <br />
      <Select borderType="bordered" defaultValue="orange" style={style} onChange={handleChange} options={options} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```