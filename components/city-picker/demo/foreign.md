---
title: 国际版
order: 1
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { CityPicker } from '@kdcloudjs/kdesign'

const domestic = [
  { id: 1, name: 'New York', province: 'New York', country: '美国' },
  { id: 2, name: 'London', province: 'Greater London', country: '英国' },
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
  const [domesticList, setDomesticList] = React.useState(domestic)
  const [loading, setLoading] = React.useState(false)

  const findCurList = (data, str) => {
    const regex = new RegExp(str, 'i')
    return data.filter((item) => {
      return regex.test(item.name)
    })
  }

  const handleSearch = (value) => {
    setLoading(true)
    setTimeout(() => {
      setDomesticList(findCurList(domestic, value))
      setLoading(false)
    }, 1000)
  }
  return (
    <div>
      <CityPicker
        style={{ width: 230 }}
        domesticList={domesticList}
        onSearch={handleSearch}
        description="国际版"
        type="foreign"
        loading={loading}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
