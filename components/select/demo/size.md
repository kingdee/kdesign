---
order: 4
title: 三种大小
---

三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 36px 和 24px ，默认高度为 30px。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const { Option } = Select
  const [size, setSize] = React.useState('middle')
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  const style = {
    width: 230,
  }
  return (
    <>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <Select mode="multiple" placeholder="请选择" borderType="bordered" size={size} style={style}>
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
        <Option value="strawberry">草莓</Option>
      </Select>
      <br />
      <br />
      <Select borderType="bordered" placeholder="请输入名称" size={size} style={style}>
        <Option value="apple">苹果</Option>
        <Option value="lemon">柠檬</Option>
        <Option value="watermelon">西瓜</Option>
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```