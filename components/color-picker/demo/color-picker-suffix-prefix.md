---
title: 颜色展示色块样式
order: 4
---

可配置属性 prefixIcon、suffixIcon 自定义输入框内颜色展示色块样式及位置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const homeIcon = (rgbColor) => {
    return (
      <>
        <Icon type="font-background-solid" style={{ fontSize: '18px', marginTop: '-4px', height: '18px' }} />
        <div
          style={{
            height: '2px',
            width: '15px',
            backgroundColor: rgbColor,
            marginBottom: '5px',
            border: '1px solid',
          }}
        />
      </>
    )
  }

  const onChange = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return (
    <>
      <ColorPicker onChange={onChange} />
      <br />
      <ColorPicker onChange={onChange} prefixIcon={homeIcon} />
      <br />
      <ColorPicker onChange={onChange} prefixIcon={() => null} suffixIcon={(_, dom) => dom} />
      <br />
      <ColorPicker onChange={onChange} prefixIcon={() => null} suffixIcon={homeIcon} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
