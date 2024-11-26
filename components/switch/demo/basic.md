---
order: 0
title: 基本
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch } from '@kdcloudjs/kdesign'
import type { ISwitchProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  function onChange(checked: boolean): ISwitchProps['onChange'] {
    console.log(`switch to ${checked}`)
  }

  return (
    <>
      <br />
      <Switch onChange={onChange} />

      <Switch checked={true} onChange={onChange} />

      <Switch defaultChecked onChange={onChange} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
