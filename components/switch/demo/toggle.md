---
order: 2
title: 切换
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Button } from '@kdcloudjs/kdesign'
import type { ISwitchProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [checked, setChecked] = React.useState<ISwitchProps['checked']>(true)
  const [loading, setLoading] = React.useState<ISwitchProps['loading']>(false)

  const toggle = () => {
    setChecked(!checked)
  }
  const toggleToLoading = () => {
    setLoading(!loading)
  }

  const onChange: ISwitchProps['onChange'] = (checked) => {
    console.log(`switch to ${checked}`)
  }

  return (
    <>
      <br />
      <Switch checked={checked} defaultChecked onChange={onChange} />
      <br />
      <Button type="primary" onClick={toggle}>
        Toggle
      </Button>
      <br />
      <Switch loading={loading} checked={checked} defaultChecked onChange={onChange} />
      <br />
      <Button type="primary" onClick={toggleToLoading}>
        Toggle to loading
      </Button>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
