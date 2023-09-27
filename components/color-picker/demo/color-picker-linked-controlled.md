---
title: 颜色值受控
order: 9
---

受控组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [color, setColor] = React.useState('#ff0000')
  const handleClick = () => {
    setColor('blue')
  }

  return (
    <>
      <Button style={{ marginBottom: '20px' }} onClick={handleClick}>
        改变颜色
      </Button>
      <ColorPicker value={color} showSwitch functionalColor="#0000ff" showColorPickerBox />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

linkedControl
