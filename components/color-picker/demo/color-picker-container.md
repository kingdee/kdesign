---
title: 配置拾色容器
order: 7
---

可配置属性 showColorPickerBox 控制拾色容器的显隐

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return (
    <>
      <ColorPicker onChange={onChange} showColorPickerBox={{ showBox: true, showHue: true, showOpacity: true }} />
      <br />
      <ColorPicker onChange={onChange} showColorPickerBox={{ showBox: false, showHue: true, showOpacity: true }} />
      <br />
      <ColorPicker onChange={onChange} showColorPickerBox={{ showBox: true, showHue: false, showOpacity: false }} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
