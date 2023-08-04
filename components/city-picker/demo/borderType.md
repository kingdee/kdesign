---
title: 边框类型
order: 3
---

我们提供带下边框、全边框和无边框三种边框类型的输入框，配置属性 borderType 即可在这三种类型间切换。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { CityPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const style = {
    width: 230,
  }

  return (
    <>
      <CityPicker style={style} placeholder="默认边框" />
      <CityPicker style={style} borderType="bordered" placeholder="有边框" />
      <CityPicker style={style} borderType="none" placeholder="无边框" />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
