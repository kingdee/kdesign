---
title: 纯色块
order: 11
---

我们提供纯色块模式，配置属性 pure 即可开启，纯色块模式下 borderType 属性失效

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} pure />
}

ReactDOM.render(<Demo />, mountNode)
```
