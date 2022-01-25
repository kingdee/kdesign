---
title: 封顶数字
order: 2
---

数字徽标默认不超过 2 位数，超出时结尾显示“+”。  
数字徽标极限值可根据需要进行配置。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Badge } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div className="head">
      <Badge count={100}>
        <span className="head-example" />
      </Badge>
      <Badge count={100} overflowCount={10}>
        <span className="head-example" />
      </Badge>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.head {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: #eee;
  display: inline-block;
  vertical-align: middle;
}
```
