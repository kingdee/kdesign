---
title: 配置纠错比例
order: 5
---

可配置二维码纠错比例，默认为H级。
二维码的纠错比例分为四个顶级：L、M、Q、H。L级可纠正约7%错误、M级可纠正15%错误、Q级别可纠正25%错误、H级别可纠正30%错误。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { QRCode } from '@kdcloudjs/kdesign'
import type { IQRCodeProps } from '@kdcloudjs/kdesign'

function Demo() {
  const style:IQRCodeProps['style'] = { marginRight: 50 }
  const value:IQRCodePropsp['value'] = "https://www.kingdee.design/"
  return (
    <div style={{ display:"flex" }}>
      <QRCode value={value} errorLevel="L" style={style}/>
      <QRCode value={value} errorLevel="M" style={style}/>
      <QRCode value={value} errorLevel="Q" style={style}/>
      <QRCode value={value} errorLevel="H" style={style}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
