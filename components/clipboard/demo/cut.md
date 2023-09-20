---
title: 剪切元素内容
order: 2
---

用于剪切内容时，应该使用 `target` 属性传递目标元素，或者其 id 、className。

剪切被置为 `readonly` 或 `disabled` 的元素，将会触发错误的回调。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message, Input, TextArea, ColorPicker, DatePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const [inputValue, setInputValue] = React.useState('这是一个输入框的剪切操作')
  const [textAreaValue, setTextAreaValue] = React.useState(
    '这是一个多行文本框的剪切操作\n这是一个多行文本框的剪切操作\n这是一个多行文本框的剪切操作',
  )

  const demoItemStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }
  const demoTextStyle = { lineHeight: '28px' }

  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <ColorPicker defaultValue="rgb(0, 204, 255)" className="color-input-to-cut" />
        <Clipboard
          action="cut"
          target=".color-input-to-cut"
          onSuccess={(content) => {
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <DatePicker id="date-input-to-cut" defaultValue={new Date('2023-8-8')} disabled />
        <Clipboard
          action="cut"
          target="#date-input-to-cut"
          onSuccess={(content) => {
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
          onError={(error) => {
            Message.error(`剪切失败：${error}`)
          }}
        />
      </div>
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
            content !== '' ? Message.success(`剪切成功：${content}`) : null
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
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <p id="p-to-cut" style={demoTextStyle}>
          这是一个行标签的剪切操作
        </p>
        <Clipboard
          action="cut"
          target="#p-to-cut"
          onSuccess={(content) => {
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <span id="span-to-cut" style={demoTextStyle}>
          这是一个行内标签的剪切操作
        </span>
        <Clipboard
          action="cut"
          target="#span-to-cut"
          onSuccess={(content) => {
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <div id="div-to-cut" style={demoTextStyle}>
          这是一个块标签的剪切操作
        </div>
        <Clipboard
          action="cut"
          target={() => document.getElementById('div-to-cut')}
          onSuccess={(content) => {
            content !== '' ? Message.success(`剪切成功：${content}`) : null
          }}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
