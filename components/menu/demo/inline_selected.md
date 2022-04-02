---
title: 默认选中
order: 5
---

默认选中

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from '@kdcloudjs/kdesign'

function Demo() {
  const handleClickItem = (obj) => {
    console.log(obj)
  }

  const menuStyle = {
    width: '206px',
    borderRight: '1px solid #f0f0f0',
    borderLeft: '1px solid #f0f0f0',
  }

  return (
    <Menu
      name="Menu"
      style={menuStyle}
      mode="inline"
      inlineIndent={24}
      onClick={handleClickItem}
      openKeys={['sub1']}
      selectedKey="5">
      <Menu.Item key="1" name="MenuItem" disabled>
        标签一
      </Menu.Item>
      <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
        <Menu.Item name="MenuItem" key="2">
          标签二-1
        </Menu.Item>
        <Menu.Item name="MenuItem" key="3">
          标签二-2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="5" name="MenuItem">
        标签三
      </Menu.Item>
    </Menu>
  )
}

ReactDOM.render(<Demo />, mountNode)
```