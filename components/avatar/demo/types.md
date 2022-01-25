---
title: 缺省状态内容可配置
order: 2
---

缺省状态的内容可根据需要配置，可以填充字符或图标。  
缺省状态配置为字符时，可自定义字符及背景颜色。

```jsx
import { Avatar, Icon, Image } from '@kdcloudjs/kdesign'
function Demo() {
  return (
    <div>
      <Avatar src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} />
      <Avatar icon={<Icon type="user-info" />} />
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>LD</Avatar>
      <Avatar style={{ color: '#fff', backgroundColor: '#1890ff' }}>KD</Avatar>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
