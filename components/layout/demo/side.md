---
order: 4
iframe: 360
title: 侧边布局
---

侧边导航在页面布局上采用的是左右结构，由于左侧导航栏固定，用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。

```jsx
import React, { useState } from 'react'
import { Layout, Menu, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Header, Content, Footer, Sider } = Layout
  const { SubMenu } = Menu

  const [collapsed, setCollapsed] = useState<boolean>(true)

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  const [mcollapsed, setMCollapsed] = useState<boolean>(true)

  const handleMouseEnter = () => {
    console.log('handleMouseEnter')
    setMCollapsed(false)
  }

  const handleMouseLeave = () => {
    console.log('handleMouseLeave')
    setMCollapsed(true)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible onCollapse={onCollapse} collapsed={collapsed && mcollapsed}>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 10,
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Menu defaultSelectedKey="1" style={{ width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Menu.Item key="1" icon={<Icon type="processing-solid" />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<Icon type="job-info" />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<Icon type="user-info" />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<Icon type="cooperation" />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<Icon type="material" />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-breadcrumb" style={{ margin: '16px 0' }}>
            User / <span style={{ color: '#000' }}>Bill</span>
          </div>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
