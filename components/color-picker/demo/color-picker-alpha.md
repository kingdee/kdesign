---
title: 透明度输入框可配置
order: 12
---

我们提供透明度输入的配置能力，可通过 showAlphaInput 控制透明度输入框的显隐

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
      <ColorPicker onChange={onChange} />
      <br />
      <ColorPicker onChange={onChange} showAlphaInput={false} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
