---
title: 面板受控显示
order: 3
---

可配置属性 visible 控制颜色面板的状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }
  const onClick = () => {
    setVisible(!visible)
  }
  return (
    <>
      <Button onClick={onClick} style={{ marginBottom: '20px' }}>
        展开/收起
      </Button>
      <ColorPicker onChange={onChange} visible={visible} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
