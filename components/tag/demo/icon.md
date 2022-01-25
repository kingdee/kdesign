---
title: 带图标的标签
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tag, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const demoTagStyle = { marginRight: '8px' }
  const demoIconStyle = { marginLeft: '8px' }

  return (
    <div>
      <Tag type="status" icon={<Icon type="add-solid" />} style={demoTagStyle}>
        状态标签
      </Tag>

      <Tag type="attribute" icon={<Icon type="add-solid" />} style={demoTagStyle}>
        属性标签
      </Tag>

      <Tag type="status" style={demoTagStyle}>
        标签 <Icon type="add-solid" style={demoIconStyle} />
      </Tag>

      <Tag type="attribute" style={demoTagStyle}>
        标签 <Icon type="add-solid" style={demoIconStyle} />
      </Tag>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```