---
order: 0
title: 基本
---

基本下拉菜单。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon } from '@kdcloudjs/kdesign'
import type { IDropdownProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const menu: IDropdownProps['menu'] = (
    <Dropdown.Menu>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
          Kingdee
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kdcloud.com/">
          kdcloud
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.yunzhijia.com/">
          yunzhijia
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.jdy.com/">
          jdy
        </a>
      </Dropdown.Item>
      <Dropdown.Item danger>a danger item</Dropdown.Item>
    </Dropdown.Menu>
  )

  return (
    <Dropdown menu={menu}>
      <a
        href="true"
        className="kd-dropdown-link"
        style={{ width: '100px', display: 'block' }}
        onClick={(e) => e.preventDefault()}>
        hover me <Icon type="arrow-down" />
      </a>
    </Dropdown>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.kd-dropdown-link {
  color: #5582f3;
}

.kd-dropdown-link:hover {
  color: #87adff;
}
```
