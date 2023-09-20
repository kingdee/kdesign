---
title: 成功与失败的钩子
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const demoItemStyle = { display: 'flex', justifyContent: 'space-between' }

  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <span id="clipboard-success" style={{ lineHeight: '28px' }}>
          这是一个正确的剪贴板
        </span>
        <Clipboard
          target="#clipboard-success"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}>
          复制
        </Clipboard>
      </div>
      <div style={demoItemStyle}>
        <span id="clipboard-error" style={{ lineHeight: '28px' }}>
          这是一个错误的剪贴板
        </span>
        <Clipboard
          target=".clipboard-error"
          onError={(error) => {
            Message.error(`复制失败：${error}`)
          }}>
          复制
        </Clipboard>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
