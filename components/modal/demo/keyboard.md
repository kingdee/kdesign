---
title: 提示弹窗键盘操作退出
order: 7
---

提示弹窗可以配置按键盘上的 ESC 退出

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const handleClick = (bool) => {
    setVisible(bool)
  }
  return (
    <>
      <Button
        onClick={() => {
          handleClick(true)
        }}>
        {'点击显示弹窗'}
      </Button>
      <Modal
        body={'按ESC关闭提示弹窗'}
        bodyStyle={bodyStyle}
        onCancel={() => {
          handleClick(false)
        }}
        keyboard={true}
        onOk={() => {
          handleClick(false)
        }}
        type="normal"
        closable={true}
        mask={true}
        focusTriggerAfterClose
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```