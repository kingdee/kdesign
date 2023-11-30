---
title: 手风琴模式
order: 5
---

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁（仅在菜单类型 mode 为 `inline` 内嵌模式下有效）。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Menu mode="inline" inlineIndent={24} accordion>
      <Menu.SubMenu key="sub1" name="SubMenu" title="标签一">
        <Menu.Item name="MenuItem" key="1">
          标签一-1
        </Menu.Item>
        <Menu.Item name="MenuItem" key="2">
          标签一-2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" name="SubMenu" title="标签二">
        <Menu.Item name="MenuItem" key="3">
          标签二-1
        </Menu.Item>
        <Menu.Item name="MenuItem" key="4">
          标签二-2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub3" name="SubMenu" title="标签三">
        <Menu.Item name="MenuItem" key="5">
          标签三-1
        </Menu.Item>
        <Menu.Item name="MenuItem" key="6">
          标签三-2
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
