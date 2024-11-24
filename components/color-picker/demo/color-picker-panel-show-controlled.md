---
title: 面板受控显示
order: 3
---

受控组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Button } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  const handleVisibleChange:IColorPickerProps['handleVisibleChange'] = (vis) => {
    console.log(vis)
  }

  return (
    <>
      <Button style={{ marginBottom: '20px' }} onClick={handleClick}>
        切换面板
      </Button>
      <ColorPicker visible={visible} onVisibleChange={handleVisibleChange} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

受控
