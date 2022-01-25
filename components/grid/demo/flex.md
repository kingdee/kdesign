---
order: 7
title: Flex 伸缩
---

`Col` 通过 `flex` 属性以支持伸缩。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'

function Demo() {
  const hStyle = { margin: '32px 0 16px' }
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
      <h3 style={hStyle}>基础伸缩</h3>
      <Row wrap={false}>
        <Col flex="1 0 200px" style={colStyle(0)}>
          1 0 200px
        </Col>
        <Col flex="0 1 300px" style={colStyle(1)}>
          0 1 300px
        </Col>
        <Col flex="1 1 500px" style={colStyle(0)}>
          1 1 500px
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex="none" style={colStyle(0)}>
          <div style={{ padding: '0 16px' }}>none</div>
        </Col>
        <Col flex="auto" style={colStyle(1)}>
          auto
        </Col>
      </Row>

      <h3 style={hStyle}>比例伸缩</h3>
      <Row>
        <Col flex={3} style={colStyle(0)}>
          3 / 10
        </Col>
        <Col flex={7} style={colStyle(1)}>
          7 / 10
        </Col>
      </Row>

      <h3 style={hStyle}>剩余填充</h3>
      <Row>
        <Col flex="auto" style={colStyle(1)}>
          填充剩余空间
        </Col>
        <Col flex="200px" style={colStyle(0)}>
          200px
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
