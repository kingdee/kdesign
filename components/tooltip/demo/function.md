---
title: 显示隐藏的回调
order: 0
---

显示隐藏的回调, 打开控制台查看。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Tooltip tip="一行最多显示20个字符，超过的字符可折行显示，建议最多不要超过40个字符" 
      onVisibleChange={(visible) => console.log(typeof visible, visible)}
      >
      <span>Mouse over will show Tooltip</span>
    </Tooltip>
  )
}

ReactDOM.render(<Demo />, mountNode)
```