---
title: 面板默认展开
order: 2
---

可配置属性 defaultOpen 控制颜色面板的初始状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }
  return <ColorPicker onChange={onChange} defaultOpen={true} />
}

ReactDOM.render(<Demo />, mountNode)
```
