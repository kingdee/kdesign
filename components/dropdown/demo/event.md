---
order: 5
title: 菜单项点击事件
---

每个菜单项根据 key 进行不同的操作。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon, Message } from '@kdcloudjs/kdesign'
import type { IDropdownProps, IDropdownMenuProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleItemClick: IDropdownMenuProps['onClick'] = (key) => {
    Message.success({
      content: `click on Item ${key}`,
      closable: true,
    })
  }

  const menu: IDropdownProps['menu'] = (
    <Dropdown.Menu onClick={handleItemClick}>
      <Dropdown.Item key="1">菜单1</Dropdown.Item>
      <Dropdown.Item key="2">菜单2</Dropdown.Item>
      <Dropdown.Item key="3">菜单3</Dropdown.Item>
    </Dropdown.Menu>
  )

  return (
    <Dropdown menu={menu}>
      <a
        href="true"
        style={{ width: '250px', display: 'block' }}
        className="kd-dropdown-link"
        onClick={(e) => e.preventDefault()}>
        Click each item <Icon type="arrow-down" />
      </a>
    </Dropdown>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
