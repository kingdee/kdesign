---
order: 1
title: 多条件搜索
---

通过多个关键词查找内容时。  
按下“空格键”区隔多个关键词，表示“或”，查找结果包含关键词 A 或关键词 B。  
按下“回车键”表示“且”，查找结果同时包含关键词 A 和关键词 B。  
按下“退格键”，可将关键词返回文本状态。  
鼠标悬停关键词，出现删除按钮，可快速删除关键词。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Search } from '@kdcloudjs/kdesign'

function Demo() {
  const handleSelect = (value, option) => {
    console.log('select', value)
    console.log('select', option)
  }
  const handleChange = (value, options) => {
    console.log('handleChange', value)
    console.log('handleChange', options)
  }
  return (
    <div style={{ width: '400px', textAlign: 'center' }}>
      <Search
        type="quick-search"
        tags={[
          { value: 1, tag: '全部' },
          { value: 2, tag: '发现人' },
        ]}
        onChange={handleChange}
        onSelect={handleSelect}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
