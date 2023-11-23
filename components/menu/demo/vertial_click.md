---
title: 触发事件为click
order: 3
---

触发事件 `triggerSubMenuAction` 为 `click`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from '@kdcloudjs/kdesign'

function Demo() {
  const handleClickItem = (obj) => {
    console.log(obj)
  }

  const menuStyle = {
    border: '1px solid #f0f0f0',
  }

  return (
    <Menu style={menuStyle} onClick={handleClickItem} triggerSubMenuAction="click" inlineIndent={24}>
      <Menu.Item key="1" name="MenuItem" disabled>
        标签一
      </Menu.Item>
      <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
        <Menu.Item name="MenuItem" key="2">
          标签二-1
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" name="SubMenu" title="标签三">
        <Menu.Item key="4" name="MenuItem">
          标签三-1
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
