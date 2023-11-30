---
order: 6
title: 响应式布局
---

`Sider` 通过设置 `breakpoint` 支持响应式布局。


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Header, Content, Footer, Sider } = Layout

  return (
    <Layout style={{ margin: '0 12px' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 10,
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Menu mode="inline" defaultSelectedKey={'4'} style={{ width: '100%', height: 'auto' }}>
          <Menu.Item key="1" icon={<Icon type="person-solid" />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<Icon type="communication-solid" />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<Icon type="notice" />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<Icon type="experience" />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
