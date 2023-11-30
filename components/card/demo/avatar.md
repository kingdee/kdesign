---
order: 5
title: 头像卡片
---

显示头像、标题和描述

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Card
        avatar={{
          src: 'https://kui.kingdee.com/assets/image/avatar_m.png',
          title: '王可可',
          description: '视觉设计',
        }}
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
