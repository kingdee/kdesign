---
title: 支持esc退出
order: 3
---

抽屉支持 esc 按键退出

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [keyboard, setKeyboard] = React.useState(true)
  return (
    <>
      <Button
        onClick={() => {
          setVisible(!visible)
          setKeyboard(true)
        }}>
        支持esc按键退出
      </Button>
      <Button
        onClick={() => {
          setVisible(!visible)
          setKeyboard(false)
        }}>
        不支持esc按键退出
      </Button>
      <Drawer keyboard={keyboard} visible={visible} onClose={() => setVisible(false)}>
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
