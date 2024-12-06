---
order: 7
title: 联动受控显隐
---

visible 的受外部控制，并且被的 Menu 的 onClick 事件修改。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon } from '@kdcloudjs/kdesign'
import type { IDropdownProps, IMenuProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<IDropdownProps['visible']>(false)

  const handleMenuClick: IMenuProps['onClick'] = (key) => {
    if (key === '1') {
      setVisible(false)
    }
  }

  const handleVisibleChange: IDropdownProps['onVisibleChange'] = (flag) => {
    setVisible(flag)
  }

  const menu: IDropdownProps['menu'] = (
    <Dropdown.Menu onClick={handleMenuClick}>
      <Dropdown.Item key="1">隐藏</Dropdown.Item>
    </Dropdown.Menu>
  )

  return (
    <Dropdown menu={menu} onVisibleChange={handleVisibleChange} visible={visible}>
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
