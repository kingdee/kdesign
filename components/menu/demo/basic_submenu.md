---
title: 二级菜单
order: 0
---

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
    <>
      <Menu name="Menu" style={menuStyle} onClick={handleClickItem} inlineIndent={24}>
        <Menu.Item key="1" name="MenuItem" disabled>
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签二-1
          </Menu.Item>
          <Menu.Item key="3" name="MenuItem">
            标签二-2
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item name="MenuItem" key="4">
          标签三
        </Menu.Item>
      </Menu>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
