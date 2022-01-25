---
order: 9
title: 其他字符
---

可以将星星替换成其他字符，比如字母，数字，字体图标甚至中文。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const _icon = ['A', 'B', 'C', 'D', 'E']
  return (
    <div  style={{ width: '150px' }}>
      <Rate
        icon={(index) => {
          return _icon[index - 1]
        }}
        size={'large'}
      />
      <br />
      <Rate icon={'赞'} defaultValue={3} size={'large'} />
      <br />
      <Rate icon={<Icon type="warning-solid" />} size={'large'} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```