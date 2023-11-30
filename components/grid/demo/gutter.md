---
order: 1
title: 区块间隔
---

使用 `Row` 的 `gutter` 属性来设置区块间隔

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const hStyle = { margin: '32px 0 18px' }
  const colStyle = { background: 'rgba(85, 130, 243, 1)', padding: '8px 0', textAlign: 'center', color: '#fff' }
  return (
    <div style={{ margin: '0 12px' }}>
      <h3 style={hStyle}>水平间隔</h3>
      <Row gutter={12}>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
      </Row>
      <h3 style={hStyle}>响应式水平间隔</h3>
      <Row gutter={{ xs: 8, sm: 12, md: 18, lg: 20 }}>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
      </Row>
      <h3 style={hStyle}>水平垂直间隔</h3>
      <Row gutter={[12, { xs: 8, sm: 12, md: 18, lg: 20 }]}>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
        <Col span={8}>
          <div style={colStyle}>col-8</div>
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
