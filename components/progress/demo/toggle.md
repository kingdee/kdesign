---
title: 动态展示
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress, Button } from '@kdcloudjs/kdesign'
import type { IProgressProps } from '@kdcloudjs/kdesign'

const demoStyle = { marginBottom: '8px' }

const Demo: React.FC = () => {
  const [percent, setPercent] = React.useState<number>(30)

  const plus = () => {
    if (percent === 100) return
    setPercent(percent + 10)
  }

  const minus = () => {
    if (percent === 0) return
    setPercent(percent - 10)
  }
  const pendding: IProgressProps['onProcess'] = (p) => {
    console.log('current percent =>', p)
  }
  const loadingDom: IProgressProps['textMap'] = [
    <>
      <span style={{ float: 'left', textAlign: 'left' }}>正在加载中...</span>
      <span style={{ float: 'right', textAlign: 'right' }}>{percent}%</span>
    </>,
  ]

  return (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Progress style={demoStyle} onProcess={pendding} percent={percent} textMap={loadingDom} infoPosition="bottom" />
      <Progress style={demoStyle} type="circle" percent={percent} />
      <br />
      <Button style={demoStyle} type="primary" onClick={plus}>
        plus
      </Button>
      <br />
      <Button type="primary" onClick={minus}>
        minus
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
