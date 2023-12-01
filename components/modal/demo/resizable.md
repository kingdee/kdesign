---
title: 拖拽调整大小
order: 12
---

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
        拖拽调整大小
      </Button>
      <Modal
        body="拖拽调整大小"
        bodyStyle={bodyStyle}
        closable={true}
        onCancel={() => handleClick(false)}
        onOk={() => handleClick(false)}
        mask={true}
        destroyOnClose
        visible={visible}
        resizable={true}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
