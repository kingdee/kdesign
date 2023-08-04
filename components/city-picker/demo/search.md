---
title: 设置高亮文字
order: 2
---

默认以搜索内容高亮城市名，当数据中设置了 highlightText 时，以 highlightText 的内容高亮默认值(用以当输入英文检索中文首字母时可用)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { CityPicker } from '@kdcloudjs/kdesign'

const domestic = [
  { id: 1, name: 'New York', province: 'New York', country: '美国', highlightText: ['ne', 'rk'] },
  { id: 2, name: 'London', province: 'Greater London', country: '英国', highlightText: 'don' },
  { id: 3, name: 'Paris', province: 'Île-de-France ', country: '法国' },
  { id: 4, name: 'Tokyo ', province: '東京都', country: '日本' },
  { id: 5, name: 'Toronto', province: 'Ontario ', country: '加拿大' },
  { id: 6, name: 'Sydney', province: 'New South Wales ', country: '澳大利亚' },
  { id: 7, name: 'Dubai', province: 'Dubai ', country: '阿拉伯联合酋长国' },
  { id: 8, name: '柏林', province: '柏林', country: '德国' },
  { id: 9, name: '罗马', province: '拉齐奥', country: '意大利' },
  { id: 10, name: '开罗', province: '开罗', country: '埃及' },
]

function Demo() {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState()

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const handleChange = (value) => {
    console.log('onChange', value)
    setValue(value)
  }
  return (
    <div>
      <CityPicker
        style={{ width: 230 }}
        domesticList={domestic}
        onSearch={handleSearch}
        loading={loading}
        onChange={handleChange}
        value={value}
        type="foreign"
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
