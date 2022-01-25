---
title: 自定义容器
order: 2
---

抽屉可以从自定义容器，注意容器应该为非 static 定位的元素

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  return (
    <div
      style={{
        width: 600,
        height: 600,
        position: 'relative',
      }}>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer getContainer={false} visible={visible} onClose={() => setVisible(false)}>
        <div style={{ marginTop: 20, marginLeft: 20 }}>点击按钮关闭</div>
        <Button onClick={() => setVisible(!visible)} style={{ width: 100, marginTop: 20, marginLeft: 20 }}>
          Close
        </Button>
      </Drawer>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
