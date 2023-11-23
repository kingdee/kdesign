---
title: 内嵌模式
order: 4
---

默认菜单类型 mode 为 内嵌模式 `inline`（内嵌模式 `inline` 不支持 触发事件 `triggerSubMenuAction` 为 `hover`）

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
    <Menu style={menuStyle} mode="inline" inlineIndent={24} onClick={handleClickItem}>
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
