---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'
import type { IQRCodeProps } from '@kdcloudjs/kdesign'

function Demo() {
  const value: IQRCodeProps['value'] = 'https://www.kingdee.design/'
  return (
    <div>
      <QRCode value={value} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
