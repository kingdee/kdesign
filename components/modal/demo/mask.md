---
title: 提示弹窗遮罩
order: 8
---

提示弹窗可以配置有没有遮罩

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
  const [maskClosable, setMaskClosable] = React.useState(false)
  const [mask, setMask] = React.useState(false)
  const handleClick = (bool) => {
    setVisible(bool)
  }
  return (
    <>
      <Button
        onClick={() => {
          handleClick(true)
          !mask && setMask(true)
        }}>
        {'点击显示遮罩弹窗'}
      </Button>
      <Button
        onClick={() => {
          handleClick(true)
          mask && setMask(false)
        }}>
        {'点击显示没有遮罩的弹窗'}
      </Button>
      <Button
        onClick={() => {
          handleClick(true)
          !mask && setMask(true)
          !maskClosable && setMaskClosable(true)
        }}>
        {'点击显示遮罩弹窗, 点击遮罩可以关闭'}
      </Button>
      <Modal
        body={'提示弹窗'}
        bodyStyle={bodyStyle}
        onCancel={() => {
          handleClick(false)
          maskClosable && setMaskClosable(false)
        }}
        onOk={() => {
          handleClick(false)
          maskClosable && setMaskClosable(false)
        }}
        maskClosable={maskClosable}
        type="normal"
        closable={true}
        mask={mask}
        focusTriggerAfterClose
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```