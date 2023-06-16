---
title: 旋转角度
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Heart, View } from '@kdcloudjs/kdesign-icons'

function Demo() {
  return (
    <div style={{ fontSize: '24px' }}>
      <Heart rotate={90} />
      <View rotate={180} />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
