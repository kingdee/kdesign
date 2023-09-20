---
title: 剪切元素内容
order: 2
---

用于剪切内容时，`target` 属性应该为目标元素，或者其 id 、class。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message, Input, TextArea } from '@kdcloudjs/kdesign'

function Demo() {
  const [inputValue, setInputValue] = React.useState('这是一个输入框的剪切操作')
  const [textAreaValue, setTextAreaValue] = React.useState(
    '这是一个多行文本框的剪切操作\n这是一个多行文本框的剪切操作\n这是一个多行文本框的剪切操作',
  )
  const demoItemStyle = { display: 'flex', justifyContent: 'space-between' }
  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <Input
          className="input-to-cut"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
        <Clipboard
          action="cut"
          target=".input-to-cut"
          onSuccess={(content) => {
            Message.success(`剪切成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <TextArea
          id="textarea-to-cut"
          value={textAreaValue}
          onChange={(event) => {
            setTextAreaValue(event.target.value)
          }}
        />
        <Clipboard
          action="cut"
          target="#textarea-to-cut"
          onSuccess={(content) => {
            Message.success(`剪切成功：${content}`)
          }}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
