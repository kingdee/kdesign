---
order: 3
title: 栅格位置
---

`Col`使用 `push` 和 `pull` 属性来改变列栅格的位置。

```jsx
import { Row, Col } from '@kdcloudjs/kdesign'
;() => {
  const colStyle = (n) => {
    return {
      padding: '16px 0',
      color: '#fff',
      textAlign: 'center',
      backgroundColor: n ? 'rgba(85, 130, 243, 1)' : 'rgba(85, 130, 243, .7)',
    }
  }
  return (
    <Row style={{ margin: '0 12px' }}>
      <Col span={8} push={16} style={colStyle(0)}>
        col-8 col-push-16
      </Col>
      <Col span={16} pull={8} style={colStyle(1)}>
        col-16 col-pull-8
      </Col>
    </Row>
  )
}
```
