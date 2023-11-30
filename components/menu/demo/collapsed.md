---
title: 收起模式
order: 8
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Button, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true)
  const [collapsedInline, setCollapsedInline] = React.useState<boolean>(true)

  const handleMouseEnter = () => {
    console.log('handleMouseEnter')
    setCollapsed(false)
  }

  const handleMouseLeave = () => {
    console.log('handleMouseLeave')
    setCollapsed(true)
  }

  return (
    <div style={{ width: '138px' }}>
      <div style={{ marginTop: '20px' }}>垂直模式</div>
      <Button
        type="primary"
        onClick={() => {
          setCollapsed(!collapsed)
        }}>
        {collapsed ? '展开' : '收起'}
      </Button>
      <Menu
        style={{ marginTop: '20px', border: '1px solid #f0f0f0' }}
        collapsed={collapsed}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Menu.Item key="1" name="MenuItem" icon={<Icon type="add" />}>
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" icon={<Icon type="add" />} title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签二-1
          </Menu.Item>
          <Menu.Item key="3" name="MenuItem">
            标签二-2
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4" name="MenuItem" icon={<Icon type="add" />}>
          标签三
        </Menu.Item>
      </Menu>

      <div style={{ marginTop: '20px' }}>内嵌模式</div>
      <Button
        type="primary"
        onClick={() => {
          setCollapsedInline(!collapsedInline)
        }}>
        {collapsedInline ? '展开' : '收起'}
      </Button>
      <Menu name="Menu" style={{ marginTop: '20px', border: '1px solid #f0f0f0' }} mode="inline" collapsed={collapsedInline}>
        <Menu.Item key="1" name="MenuItem" icon={<Icon type="add" />}>
          标签一
        </Menu.Item>
        <Menu.SubMenu key="sub1" name="SubMenu" icon={<Icon type="add" />} title="标签二">
          <Menu.Item key="2" name="MenuItem">
            标签二-1
          </Menu.Item>
          <Menu.Item key="3" name="MenuItem">
            标签二-2
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4" name="MenuItem" icon={<Icon type="add" />}>
          标签三
        </Menu.Item>
      </Menu>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
