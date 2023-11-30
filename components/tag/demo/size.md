---
title: 标签大小
order: 6
---

标签有大、中、小三种尺寸：small、 middle、 large

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoTagStyle = { marginRight: '8px' }

  return (
    <div>
      <Tag type="status" style={demoTagStyle}>
        状态标签
      </Tag>

      <Tag type="status" size="middle" style={demoTagStyle}>
        状态标签
      </Tag>

      <Tag type="status" size="large" style={demoTagStyle}>
        状态标签
      </Tag>

      <Tag type="text" style={demoTagStyle}>
        列表状态标签
      </Tag>

      <Tag type="text" size="middle" style={demoTagStyle}>
        列表状态标签
      </Tag>

      <Tag type="text" size="large" style={demoTagStyle}>
        列表状态标签
      </Tag>

      <Tag type="edit" closable style={demoTagStyle}>
        可关闭标签
      </Tag>

      <Tag type="edit" closable size="middle" style={demoTagStyle}>
        可关闭标签
      </Tag>

      <Tag type="edit" closable size="large" style={demoTagStyle}>
        可关闭标签
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```