---
title: 可操作的标签
order: 7
---

通过添加 clickable 和 closable 变为可点击和可关闭标签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }

  function log() {
    Message.success({
      content: 'click',
      closable: true,
    })
  }

  function close() {
    Message.success({
      content: 'close',
      closable: true,
    })
  }

  function cancelClose(e) {
    e.preventDefault()
    Message.success({
      content: 'cancel close',
      closable: true,
    })
  }

  return (
    <div>
      <Tag type="attribute" clickable onClick={log} style={demoTagStyle}>
        click
      </Tag>

      <Tag type="edit" closable onClose={close} style={demoTagStyle}>
        close
      </Tag>

      <Tag type="edit" closable onClose={cancelClose} style={demoTagStyle}>
        cancelDefaultClose
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```