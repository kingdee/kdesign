---
title: 自定义尺寸
order: 2
---

可自定义二维码尺寸，以 4px 的基础网格倍数调整，推荐使用以下几种尺寸：80px、100px、120px.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'

function Demo() {
  const style = { marginRight: 50 }
  const value = "https://www.kingdee.design/"
  return (
    <div style={{ display:"flex", alignItems:"center" }} >
      <QRCode value={value} size={80} style={style} />
      <QRCode value={value} size={100} style={style} />
      <QRCode value={value} size={120} style={style} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
