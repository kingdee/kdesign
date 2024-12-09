---
title: 基本使用
order: 0
---

简单用法。

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tooltip } from '@kdcloudjs/kdesign'
import type { ITooltipProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const hover: ITooltipProps['trigger'] = 'hover'

  return (
    <Tooltip trigger={hover} tip="一行最多显示20个字符，超过的字符可折行显示，建议最多不要超过40个字符">
      <span>Mouse over will show Tooltip</span>
    </Tooltip>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
