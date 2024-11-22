---
order: 6
title: 排序
---

`Col`通过 `order` 来改变排序。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'
import type { IRowProps, IColProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const hStyle: React.CSSProperties = { margin: '32px 0 16px' }
  const colStyle = (n:number): IColProps['style'] => {
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
      <h3 style={hStyle}>普通</h3>
      <Row>
        <Col span={6} order={4} style={colStyle(0)}>
          1 col-order-4
        </Col>
        <Col span={6} order={3} style={colStyle(1)}>
          2 col-order-3
        </Col>
        <Col span={6} order={2} style={colStyle(0)}>
          3 col-order-2
        </Col>
        <Col span={6} order={1} style={colStyle(1)}>
          4 col-order-1
        </Col>
      </Row>
      <h3 style={hStyle}>响应式</h3>
      <Row>
        <Col span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }} style={colStyle(0)}>
          1 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 1 }} style={colStyle(1)}>
          2 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 2 }} style={colStyle(0)}>
          3 col-order-responsive
        </Col>
        <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 3 }} style={colStyle(1)}>
          4 col-order-responsive
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
