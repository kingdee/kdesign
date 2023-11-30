---
title: 按钮类型
order: 0
---

按钮有四种风格：主要按钮、次要按钮、幽灵按钮、文本按钮

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div className="button-basic-warpper">
      <Button type="primary">主要按钮</Button>
      <Button icon={<Icon type="add" />} className="button-basic-left">
        次要按钮
      </Button>
      <Button type="ghost" className="button-basic-left">
        幽灵按钮
      </Button>
      <Button type="text" className="button-basic-left">
        text
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.button-basic-warpper {
  background: #fff;
  width: 400px;
}
.button-basic-left {
  margin-left: 10px;
}
```
