---
order: 3
title: 操作卡片
---

可以配置操作栏

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Card
        title="标题文本"
        actions={[
          <a key="setting" href="true" onClick={(e) => e.preventDefault()}>
            配置
          </a>,
          <a key="edit" href="true" onClick={(e) => e.preventDefault()}>
            编辑
          </a>,
          <a key="disabled" href="true" onClick={(e) => e.preventDefault()}>
            禁用
          </a>,
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
