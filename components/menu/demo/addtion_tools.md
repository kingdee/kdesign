---
title: 底部附加工具
order: 9
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon } from '@kdcloudjs/kdesign'
function Demo() {
  const [collapsed, setCollapsed] = React.useState(false)
  const handleClickItem = (obj) => {
    console.log(obj)
  }

  const menuStyle = {
    border: '1px solid #f0f0f0',
  }

  const additionTools = () => {
    const wrapperStyle = {
      height: '50px',
      lineHeight: '50px',
      fontSize: '20px',
      borderTop: '1px solid #d9d9d9',
    }
    const iconStyle = {
      width: '50px',
      height: '50px',
      cursor: 'pointer',
    }

    return (
      <div style={wrapperStyle}>
        <Icon
          type="delete-indentation"
          style={iconStyle}
          onClick={() => {
            setCollapsed(!collapsed)
          }}
        />
      </div>
    )
  }

  return (
    <>
      <Menu name="Menu" style={menuStyle} onClick={handleClickItem} inlineIndent={24} collapsed={collapsed} additionalTools={additionTools()}>
        <Menu.Item key="1" name="MenuItem" disabled>
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签二-1
          </Menu.Item>
          <Menu.Item key="3" name="MenuItem">
            标签二-2
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item name="MenuItem" key="4">
          标签三
        </Menu.Item>
      </Menu>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
