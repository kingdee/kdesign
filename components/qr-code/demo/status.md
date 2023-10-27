---
title: 不同的状态
order: 1
---

存在正常，加载，过期三种状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'

function Demo() {
  const style = { marginRight: 50 }
  const value = "https://www.kingdee.design/"
  const handleRefresh = () => {
    console.log("qrcode refresh")
  }
  return (
    <div style={{ display:"flex" }}>
      <QRCode value={value} style={style}/>
      <QRCode value={value} status="loading" style={style}/>
      <QRCode value={value} status="expired" style={style} onRefresh={handleRefresh}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
