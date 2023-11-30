---
title: 主题更换
order: 7
---

内建了两套主题 light 和 dark，默认 dark。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Switch } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(true)

  const btnStyle = {
    marginBottom: '10px',
  }

  const menuStyle = {
    border: '1px solid #f0f0f0',
  }

  return (
    <>
      <Switch
        style={btnStyle}
        onClick={() => {
          setIsDark(!isDark)
        }}
        checkedChildren="light"
        unCheckedChildren="dark"
      />
      <Menu theme={!isDark && 'light'} style={menuStyle} inlineIndent={14} mode="inline">
        <Menu.Item key="1" name="MenuItem">
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签四
          </Menu.Item>
          <Menu.Item key="3" name="MenuItem">
            标签五
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" name="SubMenu" title="标签三">
          <Menu.Item key="4" name="MenuItem">
            标签六
          </Menu.Item>
          <Menu.Item key="5" name="MenuItem">
            标签七
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="6" name="MenuItem">
          标签八
        </Menu.Item>
      </Menu>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
