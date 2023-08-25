---
order: 6
title: 受控显隐
---

外部控制visible的值，以控制下拉框的显示隐藏。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Icon, Switch, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)

  const changeVisible = (flag) => {
    setVisible(flag)
  }

  const menu = (
    <Dropdown.Menu >
      <Dropdown.Item key="1">不隐藏</Dropdown.Item>
      <Dropdown.Item key="2">不隐藏</Dropdown.Item>
      <Dropdown.Item key="3">隐藏</Dropdown.Item>
    </Dropdown.Menu>
  )


  return (
    <>
    <div>
      <Switch onChange={changeVisible} />
    </div>
    <Dropdown menu={menu} visible={visible}>
      <Input borderType="bordered" prefix="KDesign" suffix="Kdesign" />
    </Dropdown>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
