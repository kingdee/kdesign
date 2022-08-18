---
title: 基本使用-线型
order: 0
---

进度条的长度是基于父容器的，使用的时候要给定父容器一个宽度

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

function Demo() {
  const container = { width: '300px' }

  return (
    <div style={container}>
      <Progress percent={15} />
      <Progress percent={30} />
      <Progress percent={45} status="failure"/>
      <Progress percent={60} status="success"/>
      <Progress percent={75} showInfo={false} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
