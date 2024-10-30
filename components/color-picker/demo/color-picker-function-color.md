---
title: 配置功能色
order: 5
---

可配置属性 functionalColor 自定义功能色，并通过跟随功能色开关进行切换

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return (
    <>
      <ColorPicker onChange={onChange} functionalColor={'RGB(55, 92, 202)'} showSwitch={true} />
      <br />
      <ColorPicker
        onChange={onChange}
        functionalColor={'RGB(55, 92, 202)'}
        showSwitch={true}
        functionalColorName="#lightColor"
        switchName={{ name: '跟随明亮色' }}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
