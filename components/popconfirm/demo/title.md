---
order: 1
title: 标题和图标
---

使用`title`配置是否显示标题，使用`icon`配置和自定义标题图标

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Popconfirm, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const style = { marginRight: 100 }
  return (
    <>
      <Popconfirm title="删除确认" message="你确定要删除这个任务吗？">
        <a href="true" style={style} onClick={(e) => e.preventDefault()}>
          带标题
        </a>
      </Popconfirm>

      <Popconfirm title="删除确认" message="你确定要删除这个任务吗？" icon>
        <a href="true" style={style} onClick={(e) => e.preventDefault()}>
          带标题+图标
        </a>
      </Popconfirm>

      <Popconfirm
        title="删除确认"
        message="你确定要删除这个任务吗？"
        icon={<Icon type="tips" style={{ color: 'red' }} />}>
        <a href="true" onClick={(e) => e.preventDefault()}>带标题+自定义图标</a>
      </Popconfirm>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```