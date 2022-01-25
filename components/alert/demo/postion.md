---
title: 设置顶部浮层位置
order: 3
---

反馈浮层可以设置顶部显示的位置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Alert, InputNumber, Button } from '@kdcloudjs/kdesign'
import { debounce } from 'lodash'

function Demo() {
  const [bannerOffset, setBannerOffset] = React.useState([0, 0])
  const [banner, setBanner] = React.useState(false)
  const map = {
    success: '成功提示',
    warning: '警告提示',
    error: '错误提示',
    info: '信息通知',
  }
  const getMessage = (type) => {
    return `这是${map[type]}类型的反馈浮层`
  }
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  const handleChange = debounce((evt, postion) => {
    const value = +evt.target.value
    setBannerOffset(postion === 'left' ? [value, bannerOffset[1]] : [bannerOffset[0], value])
  }, 1000)
  const handleClick = () => {
    setBanner(!banner)
  }
  return (
    <>
      <InputNumber
        style={inputStyle}
        placeholder="反馈浮层的左边距离位置"
        digitLength={5}
        onChange={(evt) => handleChange(evt, 'left')}
      />
      <InputNumber style={inputStyle} placeholder="反馈浮层的顶部距离位置" digitLength={5} onChange={handleChange} />
      <Button type="primary" style={demoButtonStyle} onClick={handleClick}>
        设置是否悬浮在顶部
      </Button>
      <Alert
        message={getMessage('success')}
        type={'success'}
        bannerOffset={bannerOffset}
        banner={banner}
        delayOffTime={0}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
