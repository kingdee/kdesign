---
order: 5
title: 拓展使用
---

使用 `dropdownRender` 对下拉菜单进行自由扩展。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Select, Input } from '@kdcloudjs/kdesign'

let index = 0
const style = {
  width: 230,
}

const Demo: React.FC = () => {
  const [items, setItems] = React.useState<Array<string>>(['apple', 'orange', 'grape'])
  const [name, setName] = React.useState<string>('')

  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleAddItem = () => {
    setItems([...items,name || `New item ${index++}`])
    setName('')
  }

  return (
    <>
        <Select
          placeholder="请输入名称"
          style={style}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div style={{ margin: '4px 0', borderTop: '1px solid #e5e5e5' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} borderType="bordered" onChange={handleChange} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={handleAddItem}>
                  Add item
                </a>
              </div>
            </div>
          )}>
          {items.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            )
          })}
        </Select>
      </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
