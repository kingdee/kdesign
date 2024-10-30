---
title: 面板最近使用颜色可配置
order: 15
---

可以通过 historicalColor 属性在颜色面板中进行最近使用颜色的配置，最近颜色支持透明度

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange = (inputValue: string) => {
    console.log('color', inputValue)
  }

  const historicalColor = [
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

  return <ColorPicker onChange={onChange} format="HEX" historicalColor={historicalColor} />
}

ReactDOM.render(<Demo />, mountNode)
```
