---
title: 基本使用
order: 0
---

默认菜单类型 `mode` 为 `vertical`

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
    <>
      <Menu name="Menu" style={menuStyle} onClick={handleClickItem} inlineIndent={24}>
        <Menu.Item key="1" name="MenuItem" disabled>
          标签一
        </Menu.Item>
        <Menu.Item name="MenuItem" key="2">
          标签二
        </Menu.Item>
        <Menu.Item name="MenuItem" key="3">
          标签三
        </Menu.Item>
      </Menu>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```