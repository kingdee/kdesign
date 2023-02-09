---
title: 点击触发
order: 0
---

点击触发

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip } from '@kdcloudjs/kdesign'

function Demo() {
  return (
  <>
    <Tooltip tip="一行最多显示20个字符，超过的字符可折行显示，建议最多不要超过40个字符" trigger="click">
      <span>Mouse over will show Tooltip</span>
    </Tooltip>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```