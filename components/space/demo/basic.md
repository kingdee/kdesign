---
order: 0
title: 基本用法
---

组件之间的水平间距。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Button, Upload, Popconfirm, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Space style={{ width: 440 }}>
      <>Kingdee</>
      Space
      <Button type="primary">Button</Button>
      <Upload>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
      <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </Popconfirm>
      <div>KDesign</div>
    </Space>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
