---
title: 配置调用
order: 1
---

通过配置项进行调用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message, Icon } from '@kdcloudjs/kdesign'
import type { IMessageProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const openConfig: IMessageProps = {
    content: 'this is a base',
    closable: true,
    duration: 0
  }
  const successConfig: IMessageProps = {
    content: <div>this is a jsx success</div>,
    closable: true,
    icon: <Icon type="user-info" />,
    duration: 0
  }
  const warningConfig: IMessageProps = {
    content: 'this is a warning',
    icon: ''
  }
  const errorConfig: IMessageProps = {
    content: 'this is a error',
    closable: true
  }
  const base = () => {
    Message.open(openConfig)
  }
  const success = () => {
    Message.success(successConfig)
  }
  const warning = () => {
    Message.warning(warningConfig)
  }
  const error = () => {
    Message.error(errorConfig)
  }
  return (
    <div>
      <Button
        style={{
          marginRight: '12px'
        }}
        onClick={base}>
        base
      </Button>
      <Button
        style={{
          marginRight: '12px'
        }}
        onClick={success}>
        success
      </Button>
      <Button
        style={{
          marginRight: '12px'
        }}
        onClick={warning}>
        warning
      </Button>
      <Button
        style={{
          marginRight: '12px'
        }}
        onClick={error}>
        error
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
