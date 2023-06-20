---
title: 图标尺寸
order: 1
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InspectionPassed, ShoppingBag, Search} from '@kdcloudjs/kdesign-icons'

function Demo() {
  return (
    <div>
      <ShoppingBag size="20" />
      <Search size={20} />
      <InspectionPassed size="2em" />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```