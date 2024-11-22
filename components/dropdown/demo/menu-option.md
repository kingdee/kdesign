---
order: 7
title: 配置菜单
---

menu 可以是一个对象数组

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon } from '@kdcloudjs/kdesign'
import type { IDropdownProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const menu: IDropdownProps['menu'] = [
    {
      key: 1,
      label: '菜单1',
      href: 'https://www.kingdee.com/',
    },
    {
      key: 2,
      label: '菜单2',
    },
    {
      key: 3,
      label: '菜单3',
      divided: true,
    },
    {
      key: 4,
      label: '菜单4',
      disabled: true,
    },
    {
      key: 5,
      label: '菜单5',
      danger: true,
    },
  ]

  const handleItemClick: IDropdownProps['onClick'] = (key) => {
    console.log(key)
  }

  return (
    <Dropdown menu={menu} onItemClick={handleItemClick}>
      <a
        href="true"
        className="kd-dropdown-link"
        style={{ width: '100px', display: 'block' }}
        onClick={(e) => e.preventDefault()}>
        Hover me <Icon type="arrow-down" />
      </a>
    </Dropdown>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
