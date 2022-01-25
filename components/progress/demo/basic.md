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
      <Progress showInfo={false} />
      <Progress percent={30} />
      <Progress
        percent={30}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
