---
order: 4
title: 异步关闭
---

外部控制浮层关闭的时机。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Popconfirm, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const showPopconfirm = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  return (
    <>
      <Popconfirm
        title="标题"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}>
        <Button type="primary" onClick={showPopconfirm}>
          异步关闭浮层
        </Button>
      </Popconfirm>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```