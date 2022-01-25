---
order: 8
iframe: 360
title: 固定侧边栏
---

固定的侧边栏方便页面切换，具有优秀的用户体验。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const { Header, Content, Footer, Sider } = Layout
  
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
        <div
          className="logo"
          style={{
            height: 20,
            margin: 16,
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
          <Menu.Item key="5" icon={<Icon type="list" />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<Icon type="yunzhijia" />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<Icon type="bankcard" />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<Icon type="setting" />}>
            nav 8
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', background: '#fff' }}>
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
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
