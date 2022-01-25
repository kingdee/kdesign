---
title: 文本与超链接组件
order: 2
---

内置不同样式的文本
```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Demo() {
  import { Typography } from '@kdcloudjs/kdesign'
  const style = { display: 'block', }
  const { Text } = Typography
  return (
    <>
      <Text style={style} >KDesign (default)</Text>
      <Text style={style} type="second">KDesign (secondary)</Text>
      <Text style={style} type="success">KDesign (success)</Text>
      <Text style={style} type="warning">KDesign (warning)</Text>
      <Text style={style} type="danger">KDesign (danger)</Text>
      <Text style={style} type="assist">KDesign (assist)</Text>
      <Text style={style} disabled>KDesign (disabled)</Text>
      <Text style={style} mark>KDesign (mark)</Text>
      <Text style={style} code>KDesign (code)</Text>
      <Text style={style} keyboard>KDesign (keyboard)</Text>
      <Text style={style} underline>KDesign (underline)</Text>
      <Text style={style} delete>KDesign (delete)</Text>
      <Text style={style} strong>KDesign (strong)KDesign</Text>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```