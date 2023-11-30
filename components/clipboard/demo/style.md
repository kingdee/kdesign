---
title: 自定义样式与图标
order: 4
---

通过 `size` 属性设定尺寸，通过 `icon` 属性自定义图标或者不使用图标，通过 `style` 属性自定义样式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Clipboard, Message, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoItemStyle = { display: 'flex', justifyContent: 'space-between' }

  return (
    <div className="clipboard-target-warpper" style={{ width: '300px' }}>
      <div style={demoItemStyle}>
        <span id="small-clipboard" style={{ lineHeight: '24px' }}>
          这是一个小号的剪贴板
        </span>
        <Clipboard
          size="small"
          target="#small-clipboard"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <span id="middle-clipboard" style={{ lineHeight: '28px' }}>
          这是一个中号的剪贴板
        </span>
        <Clipboard
          size="middle"
          target="#middle-clipboard"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <span id="large-clipboard" style={{ lineHeight: '32px' }}>
          这是一个大号的剪贴板
        </span>
        <Clipboard
          size="large"
          target="#large-clipboard"
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}
        />
      </div>
      <div style={demoItemStyle}>
        <span id="clipboard-style" style={{ lineHeight: '28px' }}>
          这是一个自定义样式的剪贴板
        </span>
        <Clipboard
          target="#clipboard-style"
          style={{ backgroundColor: 'lavender', borderRadius: '5px' }}
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}>
          复制
        </Clipboard>
      </div>
      <div style={demoItemStyle}>
        <span id="clipboard-noicon" style={{ lineHeight: '28px' }}>
          这是一个不带图标的剪贴板
        </span>
        <Clipboard
          target="#clipboard-noicon"
          icon={false}
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}>
          复制
        </Clipboard>
      </div>
      <div style={demoItemStyle}>
        <span id="clipboard-icon" style={{ lineHeight: '28px' }}>
          这是一个自定义图标的剪贴板
        </span>
        <Clipboard
          target="#clipboard-icon"
          icon={<Icon type="copy" />}
          onSuccess={(content) => {
            Message.success(`复制成功：${content}`)
          }}>
          复制
        </Clipboard>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
