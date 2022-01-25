---
title: 基础弹出框
order: 0
---

提供内容录入或信息展示时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

function Demo() {
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const [visible, setVisible] = React.useState(false)
  const handleClick = (bool) => {
    setVisible(bool)
  }

  return (
    <div className={'test_container'}>
      <Button
        onClick={() => {
          handleClick(true)
        }}>
        基础弹出框
      </Button>
      <Modal
        body="基本使用"
        bodyStyle={bodyStyle}
        title="Basic Modal"
        closable={true}
        onCancel={() => handleClick(false)}
        onOk={() => handleClick(false)}
        mask={true}
        visible={visible}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
