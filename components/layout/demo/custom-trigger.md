---
order: 5
title: 自定义触发器
---

设置 `trigger={null}` 来隐藏默认设定。通过自定义的触发器图标改变`collapsed`的值来达到目的。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { Layout, Menu, Icon } from '@kdcloudjs/kdesign'
function Demo() {
  const { Header, Sider, Content } = Layout

  const [collapsed, setCollapsed] = React.useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const triggerStyle = {
    padding: '0 24px',
    fontSize: '18px',
    lineHeight: '52px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  }

  return (
    <Layout style={{ margin: '0 12px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 10,
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Menu mode="inline" defaultSelectedKey={'1'} style={{ width: '100%', height: 'auto' }}>
          <Menu.Item key="1" icon={<Icon type="person-solid" />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<Icon type="communication-solid" />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<Icon type="notice" />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
          {collapsed ? (
            <Icon type="foldmenu" className="trigger" onClick={toggle} style={triggerStyle} />
          ) : (
            <Icon type="unfoldmenu" className="trigger" onClick={toggle} style={triggerStyle} />
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}>
          Content
        </Content>
      </Layout>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
