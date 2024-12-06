---
order: 9
title: 其他属性的响应式
---

其他属性通过内嵌到 `xs` `sm` `md` `lg` `xl` 属性中使用。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from '@kdcloudjs/kdesign'
import type { IColProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const colStyle = (n:number):IColProps['style'] => {
    return {
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  return (
    <Row style={{ margin: '0 12px' }}>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} style={colStyle(0)}>
        Col
      </Col>
      <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }} style={colStyle(1)}>
        Col
      </Col>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} style={colStyle(0)}>
        Col
      </Col>
    </Row>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
