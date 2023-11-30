---
title: spin 加载
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Icon type="loadding" />
      <Icon type="loadding" spin />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
