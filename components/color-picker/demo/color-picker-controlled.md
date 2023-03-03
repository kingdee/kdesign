---
title: 颜色值受控
order: 8
---

可配置属性 value 设置颜色面板的值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [color, setColor] = React.useState('#555')

  const onChange = (inputValue) => {
    setColor(inputValue)
  }

  return <ColorPicker onChange={onChange} value={color} />
}

ReactDOM.render(<Demo />, mountNode)
```

受控
