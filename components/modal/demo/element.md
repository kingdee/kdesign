---
title: 关闭弹出框后回到之前的焦点元素
order: 5
---

下面两个输入框，键盘回车后会弹出弹出框，关闭后焦点会回到之前的输入框上

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Modal } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const handleClick = (bool) => {
    setVisible(bool)
  }
  const handleEnter = (evt) => {
    if (evt.key === 'Enter') {
      handleClick(true)
    }
  }
  return (
    <>
      <Input placeholder="回车打开弹窗" onKeyUp={handleEnter} />
      <Input placeholder="回车打开弹窗" onKeyUp={handleEnter} />
      <Modal
        body={'关闭后回到之前的焦点元素'}
        onCancel={() => handleClick(false)}
        onOk={() => {
          handleClick(false)
        }}
        type="normal"
        closable={true}
        bodyStyle={bodyStyle}
        mask={true}
        focusTriggerAfterClose
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
