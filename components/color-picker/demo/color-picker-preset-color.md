---
title: 系统预设颜色
order: 6
---

可配置属性 presetColor 自定义预设颜色，并通过 showPresetColor 属性控制预设颜色容器的显隐

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const colorArr = ['blue', '#0000ff', 'rgb(0,0,255)', 'hsl(240,100%,50%)', 'hsb(240,100%,100%)']
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} showPresetColor={true} presetColor={colorArr} />
}

ReactDOM.render(<Demo />, mountNode)
```
