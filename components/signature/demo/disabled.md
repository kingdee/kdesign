---
title: 禁用
order: 7
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature, Switch } from '@kdcloudjs/kdesign'
import type { ISignatureProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true)
  const onChange: ISignatureProps['onChange'] = (checked:boolean) => {
    setDisabled(!checked)
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Switch checkedChildren="启用" unCheckedChildren="禁用" onChange={onChange} />
      <Signature disabled={disabled}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
