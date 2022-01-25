---
title: 支持设置宽高
order: 5
---

抽屉支持设置宽高

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [placement, setPlacement] = React.useState('right')
  const [width, setWidth] = React.useState(300)
  const [height, setHeight] = React.useState(300)
  return (
    <>
      <Input
        onChange={(e) => {
          setWidth(e.target.value.endsWith('%') ? e.target.value : +e.target.value)
        }}
        style={{ width: 200, marginRight: 40 }}
        placeholder="设置宽度"
      />
      <Input
        onChange={(e) => {
          setHeight(e.target.value.endsWith('%') ? e.target.value : +e.target.value)
        }}
        style={{ width: 200 }}
        placeholder="设置高度"
      />
      <div style={{ marginTop: 30 }}>
        <Button
          onClick={() => {
            setVisible(!visible)
            setPlacement(Math.random() > 0.5 ? 'right' : 'left')
          }}
          style={{ width: 200, marginRight: 40 }}>
          横向抽屉支持定义宽度
        </Button>
        <Button
          style={{ width: 200 }}
          onClick={() => {
            setVisible(!visible)
            setPlacement(Math.random() > 0.5 ? 'top' : 'bottom')
          }}>
          纵向方向抽屉支持定义高度
        </Button>
      </div>
      <Drawer width={width} height={height} placement={placement} visible={visible} onClose={() => setVisible(false)}>
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
