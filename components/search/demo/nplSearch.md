---
order: 4
title: 智能搜索
---
多条件搜索时支持智能搜索

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Search } from '@kdcloudjs/kdesign'

function Demo() {
  const [nlpSearchLoading, setNlpSearchLoading] = React.useState(true)
  const [nlpSearchResult, setNlpSearchResult] = React.useState({})
  const onNlpSearch = (val) => {
    setNlpSearchLoading(true)
    setTimeout(() => {
      setNlpSearchResult({ value: 1, label: val })
      setNlpSearchLoading(false)
    }, 1000)
  }

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
        desc={['空格代表’或‘，回车代表’且‘', '试试智能高级查询']}
        onChange={handleChange}
        onSelect={handleSelect}
        nlpSearch={{
          isSupportNlpSearch: true,
          nlpSearchLoading,
          onNlpSearch: onNlpSearch,
          nlpSearchResult: nlpSearchResult,
        }}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```