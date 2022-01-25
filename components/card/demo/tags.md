---
order: 3
title: 标签卡片
---

可以配置标签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card, Tag } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Card
        title="标题文本"
        tags={[
          <Tag key="age" type="attribute" color="process">
            司龄8年
          </Tag>,
          <Tag key="constellation" type="attribute" color="success">
            狮子座
          </Tag>,
          <Tag key="city" type="attribute" color="warning">
            深圳
          </Tag>,
        ]}
        style={{ width: 300 }}>
        <p>这是内容</p>
        <p>这是内容</p>
        <p>这是内容</p>
      </Card>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
