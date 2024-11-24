---
title: 输入框类型
order: 1
---

我们提供下边框、全边框两种边框类型的输入框，配置属性 borderType 即可在这两种类型间切换

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return (
    <>
      <ColorPicker onChange={onChange} borderType="underline" />
      <br />
      <ColorPicker onChange={onChange} borderType="bordered" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
