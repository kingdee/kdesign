---
title: 默认选中
order: 6
---

默认选中

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from '@kdcloudjs/kdesign'

function Demo() {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);
  const [selectKey, setSelectKey] = React.useState('2');

  const handleClickItem = (obj) => {
    console.log(obj)
    setSelectKey(obj.key)
  }

  const onOpenChange = (data) => {
    console.log(data)
    setOpenKeys(data)
  }

  const menuStyle = {
    border: '1px solid #f0f0f0',
  }

  return (
    <Menu
      name="Menu"
      style={menuStyle}
      mode="inline"
      inlineIndent={24}
      onClick={handleClickItem}
      onOpenChange={onOpenChange}
      selectedKey={selectKey}
      openKeys={openKeys}>
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
