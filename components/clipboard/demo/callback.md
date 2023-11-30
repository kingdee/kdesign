---
title: 成功与失败的回调
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoItemStyle = { display: 'flex', justifyContent: 'space-between' }
  const demoTextStyle = { lineHeight: '28px' }

  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <span id="clipboard-success" style={demoTextStyle}>
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
        <span id="clipboard-error" style={demoTextStyle}>
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
