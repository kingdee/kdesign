---
title: 反馈弹出框
order: 1
---

需要展示反馈信息时，包含 3 种类型。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

function Demo() {
  const map = {
    confirm: '确认提示',
    warning: '警告提示',
    error: '错误提示',
  }
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div className={'test_container'}>
      {Object.keys(map).map((type, index) => {
        return (
          <Button
            key={index}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.preventDefault()
              Modal[type]({
                title: map[type],
                body: `这是${map[type]}类型的提示弹窗`,
                bodyStyle,
                getContainer: () => false,
              })
            }}>
            {map[type]}
          </Button>
        )
      })}
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
