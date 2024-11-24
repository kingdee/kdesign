---
title: 系统预设颜色
order: 6
---

可配置属性 presetColor 自定义预设颜色，并通过 showPresetColor 属性控制预设颜色容器的显隐

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const colorArr: IColorPickerProps['presetColor'] = [
    'blue',
    '#0000FF',
    '#0000FFEE',
    'RGB(0,0,255)',
    'RGBA(0,0,200,0.5)',
    'HSL(240,100%,50%)',
    'HSLA(240,100%,50%,0.5)',
    'HSB(240,100%,100%)',
    'HSBA(240,100%,100%,0.5)',
  ]
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} showPresetColor={true} presetColor={colorArr} />
}

ReactDOM.render(<Demo />, mountNode)
```
