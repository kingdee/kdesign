---
order: 7
title: 联动受控显隐
---

visible的受外部控制，并且被的Menu的onClick事件修改。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)

  const handleMenuClick = (key) => {
    if (key === '1') {
      setVisible(false)
    }
  }

  const handleVisibleChange = (flag) => {
    setVisible(flag)
  }

  const menu = (
    <Dropdown.Menu onClick={handleMenuClick}>
      <Dropdown.Item key="1">隐藏</Dropdown.Item>
    </Dropdown.Menu>
  )

  return (
    <Dropdown menu={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <a href="true" className="kd-dropdown-link" style={{ width: '100px', display: 'block' }} onClick={(e) => e.preventDefault()}>
        Hover me <Icon type="arrow-down" />
      </a>
    </Dropdown>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
