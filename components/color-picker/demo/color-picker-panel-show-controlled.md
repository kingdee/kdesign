---
title: 面板受控显示
order: 3
---

受控组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <>
      <Button style={{ marginBottom: '20px' }} onClick={handleClick}>
        切换面板
      </Button>
      <ColorPicker
        visible={visible}
        onVisibleChange={(vis) => {
          console.log(vis)
        }}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

受控
