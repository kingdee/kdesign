---
title: 三级菜单
order: 0
---

不建议嵌套多层级菜单

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleClickItem = (obj) => {
    console.log(obj)
  }

  const menuStyle = {
    border: '1px solid #f0f0f0',
  }

  return (
    <>
      <Menu style={menuStyle} onClick={handleClickItem} inlineIndent={24}>
        <Menu.Item key="1" name="MenuItem" disabled>
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签二-1
          </Menu.Item>
          <Menu.SubMenu key="sub2" name="SubMenu" title="标签二-2">
            <Menu.Item key="4" name="MenuItem">
              标签二-2-1
            </Menu.Item>
            <Menu.Item key="5" name="MenuItem">
              标签二-2-2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item name="MenuItem" key="6">
          标签三
        </Menu.Item>
      </Menu>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
