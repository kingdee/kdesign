---
title: 图标颜色
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InspectionPassed, ShoppingBag, Search,Processing } from '@kdcloudjs/kdesign-icons'

function Demo() {
  return (
    <div style={{fontSize:'24px'}}>
      <ShoppingBag fill="#5582f3" />
      <Search fill="#212121" />
      <InspectionPassed fill="red" />
      <Processing fill="rgba(255,141,30,1)" />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```