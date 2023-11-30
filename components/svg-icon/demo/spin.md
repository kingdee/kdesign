---
title: 旋转动画
order: 4
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {Processing,Load,Loading } from '@kdcloudjs/kdesign-icons'

const Demo: React.FC = () => {
  return (
    <div style={{fontSize:'24px'}}>
      <Processing spin />
      <Load spin />
      <Loading spin />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```