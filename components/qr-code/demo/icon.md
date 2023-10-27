---
title: 自定义icon
order: 3
---

可自定义icon，默认不带icon

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'

function Demo() {
  const value = "https://www.kingdee.design/"
  return (
    <div>
      <QRCode value={value} icon="https://kui.kingdee.com/assets/image/avatar_m.png"/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
