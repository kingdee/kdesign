---
order: 1
title: 上中下布局
---

主导航在页面的顶端，上中下结构符合用户自上而下的浏览习惯，是非常经典的网站导航模式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '@kdcloudjs/kdesign'

function Demo() {
  const { Header, Content, Footer } = Layout

  return (
    <Layout className="layout" style={{ margin: '0 12px' }}>
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
      <Content style={{ margin: '0 35px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-breadcrumb" style={{ margin: '16px 0' }}>
          Home / List / <span style={{ color: '#000' }}>App</span>
        </div>
        <div className="site-layout-content" style={{ minHeight: 280, padding: 24, background: '#fff' }}>
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
