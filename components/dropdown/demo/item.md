---
order: 3
title: 菜单项
---

通过 `Item` 添加 `divided`（分隔线） 和 `disabled`（禁用）菜单项

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const menu = (
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
      <Dropdown.Item divided disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.jdy.com/">
          jdy
        </a>
      </Dropdown.Item>
    </Dropdown.Menu>
  )
  return (
    <Dropdown menu={menu}>
      <a href="true" className="kd-dropdown-link" style={{ width: '100px', display: 'block' }} onClick={(e) => e.preventDefault()}>
        Hover me <Icon type="arrow-down" />
      </a>
    </Dropdown>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
