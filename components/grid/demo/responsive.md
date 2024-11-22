---
order: 8
title: 响应式尺寸
---

预设了五个响应尺寸：`xs` `sm` `md` `lg` `xl` 。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'
import type { IColProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const colStyle = (n:number):IColProps['style'] => {
    return {
      margin: '8px 0',
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  return (
    <Row style={{ margin: '0 12px' }}>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} style={colStyle(0)}>
        Col
      </Col>
      <Col xs={20} sm={16} md={12} lg={8} xl={4} style={colStyle(1)}>
        Col
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} style={colStyle(0)}>
        Col
      </Col>
    </Row>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
