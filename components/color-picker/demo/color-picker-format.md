---
title: 输出颜色格式可配置
order: 13
---

可以通过 format 属性对输出的颜色格式进行限制

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
      <ColorPicker onChange={onChange} format="HEX" />
      <br />
      <ColorPicker onChange={onChange} format="RGB" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
