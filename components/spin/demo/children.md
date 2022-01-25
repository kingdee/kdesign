---
title: 内容内嵌
order: 4
---

直接将内容内嵌到 `Spin` 中

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Switch } from '@kdcloudjs/kdesign'

function Demo() {
  const [loading, setLoading] = React.useState(true)

  function toggleLoading(checked) {
    setLoading(checked)
  }

  return (
    <>
      <Spin name="Spin" type="page" spinning={loading}>
        <div
          style={{
            width: '400px',
            height: '200px',
            fontSize: '30px',
            backgroundColor: '#e6f7ff',
            color: '#ccc',
            textAlign: 'center',
            lineHeight: '200px',
          }}>
          KDUI
        </div>
      </Spin>
      <Switch checked={loading} onChange={toggleLoading} style={{ marginTop: '10px' }}></Switch>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```