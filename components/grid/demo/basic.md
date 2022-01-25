---
order: 0
title: 基础栅格
---

以24栅格为基础，横向最多支持8个模块的展示，建议使用以下比例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

const Demo = () => {
  const colStyle = (n) => {
    return {
      margin: '8px 0',
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  return (
    <div className="layout-basic-warpper">
      <Row>
        <Col span={24}>
          <div style={colStyle(0)}>100%</div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={colStyle(0)}>50%</div>
        </Col>
        <Col span={12}>
          <div style={colStyle(1)}>50%</div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div style={colStyle(0)}>33.33%</div>
        </Col>
        <Col span={8}>
          <div style={colStyle(1)}>33.33%</div>
        </Col>
        <Col span={8}>
          <div style={colStyle(0)}>33.33%</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div style={colStyle(0)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(1)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(0)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(1)}>25%</div>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.layout-basic-warpper {
  background: #fff;
}
```

<style>
.layout-basic-warpper{
  margin: 0 12px;
}
</style>
