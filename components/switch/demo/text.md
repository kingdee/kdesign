---
order: 3
title: 带文字
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <br />
      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
      <Switch checked={true} checkedChildren="开启" unCheckedChildren="关闭" />
      <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```