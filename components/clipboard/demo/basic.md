---
title: 复制文本内容
order: 0
---

`content` 属性不为空时，`action` 强制为 `copy`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Clipboard
        action="cut"
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
