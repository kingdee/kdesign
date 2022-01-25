---
order: 4
title: 大小
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <br />
      <Switch checkedChildren="开" unCheckedChildren="关" />
      <Switch size="large" checkedChildren="开" unCheckedChildren="关" />
      <Switch size="large" defaultChecked checkedChildren="开" unCheckedChildren="关" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```