---
title: 显示隐藏的回调
order: 0
---

显示隐藏的回调, 打开控制台查看。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [test, setTest] = React.useState(0)
  const onClick = () => {
    const t = test + 1
    console.log('test', t)
    setTest(t)
  }
  const onVisibleChange = (visible, t) => {
    console.log('onVisibleChange', visible, t, test)
  }

  return (
    <Tooltip
      tip={
        <div>
          <Button onClick={onClick}>test</Button>
        </div>
      }
      trigger="click"
      onVisibleChange={onVisibleChange}>
      <span>Mouse over will show Tooltip</span>
    </Tooltip>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
