---
order: 0
title: 基础搜索
---

通过单个关键词查找内容时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Search } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handlePressEnter = (value) => {
    console.log(value)
  }
  const handleChange = (e) => {
    console.log(e)
  }
  return (
    <div>
      <Search prefix onSearch={handleChange} onPressEnter={handlePressEnter} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
