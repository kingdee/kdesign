---
title: 基本使用
order: 0
---

抽屉可以从自定义位置滑出

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [type, setType] = React.useState('right')
  const [visible, setVisible] = React.useState(false)
  const onChange = React.useCallback((e) => {
    setType(e.target.value)
  }, [])
  return (
    <>
      <Radio.Group onChange={onChange} value={type}>
        <Radio value="right">右边</Radio>
        <Radio value="left">左边</Radio>
        <Radio value="top">顶部</Radio>
        <Radio value="bottom">底部</Radio>
      </Radio.Group>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer placement={type} visible={visible} onClose={() => setVisible(false)} title="这就是标题">
        <div style={{ marginTop: 20, marginLeft: 20 }}>点击按钮关闭</div>
        <Button onClick={() => setVisible(!visible)} style={{ width: 100, marginTop: 20, marginLeft: 20 }}>
          Close
        </Button>
      </Drawer>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
