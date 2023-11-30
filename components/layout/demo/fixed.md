---
order: 7
iframe: 360
title: 固定头部
---

为了页面切换的便捷，使用固定的顶部导航。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Header, Content, Footer } = Layout

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#343848' }}>
        <div
          className="logo"
          style={{
            float: 'left',
            width: 120,
            height: 32,
            margin: '10px 24px 10px 0',
            background: 'rgba(255, 255, 255, .3)',
          }}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 35px', marginTop: 64 }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
        <div className="site-layout-breadcrumb" style={{ margin: '16px 0' }}>
          Home / List / <span style={{ color: '#000' }}>App</span>
        </div>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor: '#fff' }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
