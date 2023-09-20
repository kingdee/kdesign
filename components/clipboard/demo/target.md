---
title: 复制元素内容
order: 1
---

复制被置为 `disabled` 的元素，将会触发错误的回调。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message, Input, TextArea, ColorPicker, DatePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const demoItemStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }
  const demoTextStyle = { lineHeight: '28px' }

  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <ColorPicker defaultValue="rgb(0, 204, 255)" className="color-input-to-copy" />
        <Clipboard
          target=".color-input-to-copy"
          onSuccess={(content) => {
            content !== '' ? Message.success(`复制成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <DatePicker id="date-input-to-copy" defaultValue={new Date('2023-8-8')} disabled />
        <Clipboard
          target="#date-input-to-copy"
          onError={(error) => {
            Message.error(`复制失败：${error}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <Input className="input-to-copy" defaultValue="这是一个输入框的复制操作" />
        <Clipboard
          target=".input-to-copy"
          onSuccess={(content) => {
            content !== '' ? Message.success(`复制成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <TextArea
          id="textarea-to-copy"
          defaultValue="这是一个多行文本框的复制操作\n这是一个多行文本框的复制操作\n这是一个多行文本框的复制操作"
        />
        <Clipboard
          target="#textarea-to-copy"
          onSuccess={(content) => {
            content !== '' ? Message.success(`复制成功：${content}`) : null
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <p className="p-to-copy" style={demoTextStyle}>
          这是一个行标签的复制操作
        </p>
        <Clipboard
          target=".p-to-copy"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <span id="span-to-copy" style={demoTextStyle}>
          这是一个行内标签的复制操作
        </span>
        <Clipboard
          target="#span-to-copy"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <div id="div-to-copy" style={demoTextStyle}>
          这是一个块标签的复制操作
        </div>
        <Clipboard
          target={() => document.getElementById('div-to-copy')}
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
