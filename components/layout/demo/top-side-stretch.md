---
order: 3
title: 顶部-侧边布局-通栏
---

顶部导航和通栏侧边栏的布局, 可用于应用型的网站。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { SubMenu } = Menu
  const { Header, Content, Sider } = Layout
  
  return (
    <Layout style={{ margin: '0 12px' }}>
      <Header style={{ background: '#343848' }}>
        <div
          className="logo"
          style={{
            float: 'left',
            width: 120,
            height: 32,
            margin: '10px 25px 10px 0',
            background: 'rgba(255, 255, 255, .3)',
          }}
        />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" style={{ backgroundColor: '#fff' }}>
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKey={'1'}
            defaultOpenKeys={['sub1']}
            style={{ width: '100%', height: '100%', borderRight: 0 }}>
            <SubMenu key="sub1" icon={<Icon type="user-info" />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<Icon type="job-info" />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<Icon type="voice" />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-breadcrumb" style={{ margin: '16px 0' }}>
            Home / List / <span style={{ color: '#000' }}>App</span>
          </div>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#fff',
            }}>
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
