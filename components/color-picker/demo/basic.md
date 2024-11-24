---
title: 基本使用
order: 0
---

基本颜色选择器（注：IE 不支持 HEXA 格式的颜色值）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} />
}

ReactDOM.render(<Demo />, mountNode)
```
