---
order: 1
title: 可选择
---

可供选择的卡片

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Card title="标题文本" selectable checkboxProps={{ onChange: () => console.log('select') }} style={{ width: 300 }}>
        <p>这是内容</p>
        <p>这是内容</p>
        <p>这是内容</p>
      </Card>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
