---
title: 自定义宽度
order: 4
---

可以通过 width 属性来控制进度条的高度/直径

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { marginLeft: '10px', verticalAlign: 'top' }
  return (
    <>
      <Progress type="line" percent={30} width={100} strokeWidth={10} />
      <Progress type="circle" percent={30} width={100} strokeWidth={10} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
