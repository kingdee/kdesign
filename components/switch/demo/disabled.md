---
order: 1
title: 禁用
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from '@kdcloudjs/kdesign'

function Demo() {
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