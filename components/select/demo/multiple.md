---
order: 1
title: 多选
---

多选，从已有条目中选择。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
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
      children: '柠檬',
      value: 'lemon',
    },
    {
      children: '西瓜',
      value: 'watermelon',
    },
    {
      children: '草莓',
      value: 'strawberry',
    },
    {
      children: '香蕉',
      value: 'banana',
    },
    {
      children: '哈密瓜',
      value: 'cantaloupe',
    },
    {
      children: '菠萝',
      value: 'pineapple',
    },
    {
      children: '蓝莓',
      value: 'blueberry',
    },
  ]
  const handleChange = (value) => {
    console.log(value)
  }
  const style = {
    width: 230,
  }

  return (
    <>
      <Select
        placeholder="请输入名称"
        mode="multiple"
        defaultValue={['apple', 'strawberry']}
        style={style}
        borderType="bordered"
        optionFilterProp="children"
        onChange={handleChange}>
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
