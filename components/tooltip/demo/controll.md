---
title: 受控显示
order: 0
---

受控显示

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip, Switch } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  return (
  <>
     <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={(value)=> setVisible(value)} />
    <Tooltip tip="一行最多显示20个字符，超过的字符可折行显示，建议最多不要超过40个字符" visible={visible} trigger="click">
      <span>Mouse over will show Tooltip</span>
    </Tooltip>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```