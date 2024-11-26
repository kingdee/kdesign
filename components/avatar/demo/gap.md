---
title: 调整字符大小
order: 3
---

对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素

```jsx
import React from 'react'
import { Avatar, Button } from '@kdcloudjs/kdesign'
import type { IAvatarProps } from '@kdcloudjs/kdesign'
function Demo() {
  const GapList = [4, 3, 2, 1]
  const [gap, setGap] = React.useState<IAvatarProps['gap']>(GapList[0])
  const changeGap = () => {
    const index = GapList.indexOf(gap)
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0])
  }
  return (
    <div>
      <Avatar size="large" gap={gap}>
        Gap Avatar
      </Avatar>
      <Button size="small" onClick={changeGap}>
        changeGap
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
