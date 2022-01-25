---
title: 支持遮罩并可以点击退出
order: 4
---

抽屉支持遮罩设置并可以点击遮罩退出

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [mask, setMask] = React.useState(true)
  const [maskClosable, setMaskClosable] = React.useState(true)
  return (
    <>
      <Button
        onClick={() => {
          setVisible(!visible)
          setMask(true)
        }}>
        有遮罩
      </Button>
      <Button
        onClick={() => {
          setVisible(!visible)
          setMask(false)
        }}>
        没有遮罩
      </Button>
      <Button
        onClick={() => {
          setVisible(!visible)
          setMaskClosable(true)
          setMask(true)
        }}>
        支持点击遮罩退出
      </Button>
      <Button
        onClick={() => {
          setVisible(!visible)
          setMaskClosable(false)
          setMask(true)
        }}>
        不支持点击遮罩退出
      </Button>
      <Drawer mask={mask} maskClosable={maskClosable} visible={visible} onClose={() => setVisible(false)}>
        <div style={{ marginTop: 20, marginLeft: 20 }}>点击按钮关闭</div>
        <Button onClick={() => setVisible(!visible)} style={{ width: 100, marginTop: 20, marginLeft: 20 }}>
          Close
        </Button>
      </Drawer>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
