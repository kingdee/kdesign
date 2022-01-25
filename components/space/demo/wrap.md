---
order: 4
title: 自动换行
---

添加`wrap`属性实现自动换行。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Button } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Space size={[8, 16]} wrap style={{ width: '400px' }}>
      {new Array(20).fill(null).map((_, index) => (
        <Button key={index}>Button</Button>
      ))}
    </Space>
  )
}

ReactDOM.render(<Demo />, mountNode)
```