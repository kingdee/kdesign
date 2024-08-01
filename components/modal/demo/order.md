---
title: 按钮位置可配置
order: 11
---

可以设置弹出框的底部按钮顺序

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'
import type { ModalType } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [order, setOrder] = React.useState<ModalType>('normal')
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <>
      <Button
        onClick={() => {
          setOrder((order) => (order === 'normal' ? 'reverse' : 'normal'))
        }}>
        点击显示{order === 'normal' ? '逆序' : '正序'}
      </Button>
      <Modal
        body={'可以设置弹出框的底部按钮顺序'}
        type="normal"
        bodyStyle={bodyStyle}
        closable={true}
        mask={false}
        footerBtnOrder={order}
        getContainer={false}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
