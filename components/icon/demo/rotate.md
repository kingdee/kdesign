---
title: rotate（icon 旋转角度）
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <Icon type="search" />
      <Icon type="search" rotate={90} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
