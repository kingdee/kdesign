---
order: 1
title: 禁用
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <br />
      <Switch disabled />
      <Switch defaultChecked disabled />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```