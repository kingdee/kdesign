---
order: 6
title: 受控显隐
---

外部控制 visible 的值，以控制下拉框的显示隐藏。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Switch, Input } from '@kdcloudjs/kdesign'
import type { IDropdownProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false)

  const menu: IDropdownProps['menu'] = (
    <Dropdown.Menu>
      <Dropdown.Item key="1">不隐藏</Dropdown.Item>
      <Dropdown.Item key="2">不隐藏</Dropdown.Item>
      <Dropdown.Item key="3">隐藏</Dropdown.Item>
    </Dropdown.Menu>
  )

  return (
    <>
      <div>
        <Switch
          onChange={(flag: boolean) => {
            setVisible(flag)
          }}
        />
      </div>
      <Dropdown menu={menu} visible={visible} onVisibleChange={(v) => setVisible(v)} trigger={"focus"}>
        <Input borderType="bordered" prefix="KDesign" suffix="Kdesign" />
      </Dropdown>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
