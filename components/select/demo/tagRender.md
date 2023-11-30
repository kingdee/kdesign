---
order: 10
title: 自定义选择标签
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select, Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Option } = Select
  const options = [
    {
      value: 'gold',
    },
    {
      value: 'lime',
    },
    {
      value: 'green',
    },
    {
      value: 'cyan',
    },
  ]
  const style = {
    width: 230,
  }

  const tagRender = (props) => {
    const { onClose, value, label, disabled, size } = props
    return (
      <Tag
        type="edit"
        closable
        disabled={disabled}
        style={{ background: value }}
        size={size}
        onClose={(e) => onClose(e, value)}>
        {label}
      </Tag>
    )
  }

  return (
    <>
      <Select
        placeholder="请输入名称"
        mode="multiple"
        defaultValue={['gold', 'lime']}
        style={style}
        borderType="bordered"
        tagRender={tagRender}>
        {options.map((item) => {
          return (
            <Option value={item.value} key={item.value}>
              {item.value}
            </Option>
          )
        })}
      </Select>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
