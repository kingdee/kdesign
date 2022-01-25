---
title: 尺寸可配置
order: 1
---

尺寸可根据需要进行配置，以 4px 的基础网格倍数调整，推荐使用以下几种尺寸：24px、32px、40px、60px。

```jsx
import { Avatar } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <div>
        <Avatar
          shape="square"
          size="extra-small"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <Avatar shape="square" size="small" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar shape="square" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.kd-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
```
