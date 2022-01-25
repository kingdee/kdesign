---
order: 2
title: 偏移
---

`Col` 使用 `offset` 可以将列向右侧偏。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

function Demo() {
  const rowStyle = {
    margin: '16px 0',
  }
  const colStyle = (n) => {
    return {
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  return (
    <div style={{ margin: '0 12px' }}>
      <Row style={rowStyle}>
        <Col span={4} style={colStyle(0)}>
          col-4
        </Col>
        <Col span={6} offset={14} style={colStyle(1)}>
          col-8
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={4} offset={4} style={colStyle(0)}>
          col-6 col-offset-6
        </Col>
        <Col span={8} offset={8} style={colStyle(1)}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={10} offset={6} style={colStyle(0)}>
          col-12 col-offset-6
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
