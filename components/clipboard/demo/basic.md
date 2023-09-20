---
title: 复制文本内容
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <Clipboard
        content={'https://www.kingdee.design/'}
        onSuccess={(content) => {
          Message.success(`复制成功：${content}`)
        }}>
        复制
      </Clipboard>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
