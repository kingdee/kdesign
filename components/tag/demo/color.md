---
title: 自定义颜色的标签
order: 4
---

只有当 `type = "attribute"` 才能设置自定义颜色

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }

  return (
    <div>
      <Tag type="attribute" color="#56a4ff" style={demoTagStyle}>
        #56a4ff
      </Tag>

      <Tag type="attribute" color="#41c6c7" style={demoTagStyle}>
        #41c6c7
      </Tag>

      <Tag type="attribute" color="#5f7feb" style={demoTagStyle}>
        #5f7feb
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```