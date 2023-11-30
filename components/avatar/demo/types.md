---
title: 缺省状态内容可配置
order: 2
---

缺省状态的内容可根据需要配置，可以填充字符或图标。
缺省状态配置为字符时，可自定义字符及背景颜色。

```jsx
import React from 'react'
import { Avatar, Icon, Image } from '@kdcloudjs/kdesign'
const Demo: React.FC = () => {
  return (
    <div>
      <Avatar src={<Image src="https://kui.kingdee.com/assets/image/avatar_m.png" />} />
      <Avatar icon={<Icon type="avatar-solid" />} style={{ color: '#ffffff',fontSize: '32px' }} />
      <Avatar icon={<Icon type="loadding" spin />}  style={{ color: '#ffffff'}}/>
      <Avatar style={{ color: '#ffffff', backgroundColor: '#D35353' }}>LD</Avatar>
      <Avatar style={{ color: '#ffffff', backgroundColor: '#1890ff' }}>KD</Avatar>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
