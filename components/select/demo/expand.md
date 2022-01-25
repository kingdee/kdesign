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
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      items: ['apple', 'orange', 'grape'],
      name: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  handleAddItem() {
    const { name, items } = this.state
    this.setState({
      items: [...items, name || `New item ${index++}`],
      name: '',
    })
  }

  render() {
    const { items } = this.state
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
                <Input style={{ flex: 'auto' }} borderType="bordered" onChange={this.handleChange} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={this.handleAddItem}>
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
}

ReactDOM.render(<Demo />, mountNode)
```
