---
order: 0
title: 基本结构
---

典型页面布局方案。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '@kdcloudjs/kdesign'
import type { ILayoutProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout
  const layoutStyle: ILayoutProps['style'] = { marginTop: 48 }
  const headerStyle: ILayoutProps['style'] = { color: '#fff', background: 'rgba(85, 130, 243, .7)' }
  const footerStyle: ILayoutProps['style'] = { color: '#fff', background: 'rgba(85, 130, 243, .7)', lineHeight: 1.5 }
  const siderStyle: ILayoutProps['style'] = { color: '#fff', lineHeight: '120px', background: 'rgba(85, 130, 243, .9)' }
  const contentStyle: ILayoutProps['style'] = {
    minHeight: 120,
    color: '#fff',
    lineHeight: '120px',
    background: 'rgba(85, 130, 243, 1)',
  }

  return (
    <div style={{ margin: '0 12px', textAlign: 'center' }}>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider style={siderStyle}>Sider</Sider>
          <Content style={contentStyle}>Content</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Content style={contentStyle}>Content</Content>
          <Sider style={siderStyle}>Sider</Sider>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>

      <Layout style={layoutStyle}>
        <Sider style={siderStyle}>Sider</Sider>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
