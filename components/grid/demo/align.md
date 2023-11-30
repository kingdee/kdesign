---
order: 5
title: 垂直对齐
---

`Row`可通过设置`align`属性来改变垂直对齐方式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const hStyle = { margin: '32px 0 16px' }
  const rowStle = { backgroundColor: 'rgba(128, 128, 128, 0.08)' }
  const colStyle = (h, n) => {
    return {
      height: h ? h + 'px' : undefined,
      margin: '8px 0',
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      lineHeight: h + 'px',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  const DemoBox = ({ h, n, children }) => <p style={colStyle(h, n)}>{children}</p>

  return (
    <div style={{ margin: '0 20px' }}>
      <h3 style={hStyle}>顶部对齐</h3>
      <Row gutter={0} justify="center" align="top" style={rowStle}>
        <Col span={4}>
          <DemoBox h={100} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={50} n={1}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={120} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={80} n={1}>
            col-4
          </DemoBox>
        </Col>
      </Row>

      <h3 style={hStyle}>中间对齐</h3>
      <Row gutter={0} justify="center" align="middle" style={rowStle}>
        <Col span={4}>
          <DemoBox h={100} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={50} n={1}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={120} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={80} n={1}>
            col-4
          </DemoBox>
        </Col>
      </Row>

      <h3 style={hStyle}>底部对齐</h3>
      <Row gutter={0} justify="center" align="bottom" style={rowStle}>
        <Col span={4}>
          <DemoBox h={100} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={50} n={1}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={120} n={0}>
            col-4
          </DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox h={80} n={1}>
            col-4
          </DemoBox>
        </Col>
      </Row>
      <h3 style={hStyle}>拉伸对齐</h3>
      <Row gutter={0} justify="center" align="stretch" style={{ ...rowStle, height: 120 }}>
        <Col span={4} style={colStyle(0, 0)}>
          col-4
        </Col>
        <Col span={4} style={colStyle(0, 1)}>
          col-4
        </Col>
        <Col span={4} style={colStyle(0, 0)}>
          col-4
        </Col>
        <Col span={4} style={colStyle(0, 1)}>
          col-4
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
