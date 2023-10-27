---
title: 自定义颜色
order: 4
---

可自定义二维码颜色，默认为白底黑色。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'

function Demo() {
  const style = { marginRight: 50 }
  const value = "https://www.kingdee.design/"
  return (
    <div style={{ display:"flex" }}>
      <QRCode value={value} style={style} />
      <QRCode value={value} color="#2486EE" style={style}/>
      <QRCode value={value} color="#06C8C7" style={style}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
