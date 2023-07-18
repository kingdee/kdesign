---
title: 图片加载失败的事件
order: 4
---

，返回 false 会关闭组件默认的 fallback 行为

```jsx
import { Avatar } from '@kdcloudjs/kdesign'

function Demo() {
  return <Avatar src="https://kui.kingdee.com/assets/image/avatar_m2.png" onError={() => false} />
}

ReactDOM.render(<Demo />, mountNode)
```
