---
title: 配置主题色
order: 4
---

可配置属性 themeColor 自定义主题色，并通过跟随主题色开关进行切换

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} themeColor={'rgb(55, 92, 202)'} showFollowThemeSwitch={true} />
}

ReactDOM.render(<Demo />, mountNode)
```
