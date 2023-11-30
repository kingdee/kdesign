---
title: 基本使用
order: 0
---

通过静态方法调用，有提示、成功、警告、错误四种状态方法

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const info = () => {
    Message.info('this is a info')
  }
  const success = () => {
    Message.success('this is a success')
  }

  const warning = () => {
    Message.warning('this is a warning')
  }

  const error = () => {
    Message.error('this is a error')
  }

  const callback = () => {
    Message.success('it will call function after closing', (key) => {
      console.log(key)
      Message.info('finish close')
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={info}>
        info
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={success}>
        success
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={warning}>
        warning
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={error}>
        error
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={callback}>
        callback
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```