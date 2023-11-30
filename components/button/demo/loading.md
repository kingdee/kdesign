---
title: 加载中状态
order: 4
---

设置 loading 属性为 true 即可让按钮处于加载状态，加载中的按钮是无法触发点击事件的

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <div style={{ width: '200px' }}><Button loading>loading</Button></div>
}

ReactDOM.render(<Demo />, mountNode)
```
