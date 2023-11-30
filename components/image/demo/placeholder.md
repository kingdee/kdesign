---
order: 2
title: 渐进加载
---

大图使用 placeholder 渐进加载。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Image, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [random, setRandom] = React.useState()
  return (
    <>
      <Image
        width={142}
        style={{ verticalAlign: 'middle' }}
        src={`https://kui.kingdee.com/assets/image/img03.jpg?${random}`}
        placeholder="https://kui.kingdee.com/assets/image/img03-blur.jpg"
      />
      <Button
        type="primary"
        onClick={() => {
          setRandom(Date.now())
        }}>
        Reload
      </Button>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
