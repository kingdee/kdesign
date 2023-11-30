---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InspectionPassed, ShoppingBag, Search,Processing,Load,PieChart,Heart } from '@kdcloudjs/kdesign-icons'

const Demo: React.FC = () => {
  return (
    <div style={{fontSize:'24px'}}>
      <ShoppingBag />
      <Search />
      <InspectionPassed />
      <Processing />
      <Load />
      <PieChart />
      <Heart />
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```