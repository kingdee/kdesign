---
title: 配置调用
order: 1
---

通过配置项进行调用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const base = () => {
    Message.open({
      content: 'this is a base',
      closable: true,
      duration: 0,
    })
  }

  const success = () => {
    Message.success({
      content: 'this is a success',
      closable: true,
      duration: 0,
    })
  }

  const warning = () => {
    Message.warning({
      content: 'this is a warning',
    })
  }

  const error = () => {
    Message.error({
      content: 'this is a error',
      closable: true,
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={base}>
        base
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
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```