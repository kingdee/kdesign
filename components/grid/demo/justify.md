---
order: 3
title: 水平对齐
---

`Row`通过设置`justify`属性来定义水平对齐方式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

function Demo() {
  const hStyle = { margin: '32px 0 16px' }
  const rowStle = { backgroundColor: 'rgba(128, 128, 128, 0.08)' }
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
    <div style={{ margin: '0 20px' }}>
      <h3 style={hStyle}>左对齐</h3>
      <Row justify="start" style={rowStle}>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(1)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
      </Row>

      <h3 style={hStyle}>居中对齐</h3>
      <Row justify="center" style={rowStle}>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(1)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
      </Row>

      <h3 style={hStyle}>右对齐</h3>
      <Row justify="end" style={rowStle}>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(1)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
      </Row>

      <h3 style={hStyle}>两端对齐</h3>
      <Row justify="space-between" style={rowStle}>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(1)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
      </Row>

      <h3 style={hStyle}>分散对齐</h3>
      <Row justify="space-around" style={rowStle}>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(1)}>
          col-3
        </Col>
        <Col span={3} style={colStyle(0)}>
          col-3
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
