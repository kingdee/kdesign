---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { CityPicker } from '@kdcloudjs/kdesign'

const domestic = [
  { id: 1, name: '北京', province: '北京市', country: '中国' },
  { id: 2, name: '上海', province: '上海市', country: '中国' },
  { id: 3, name: '广州', province: '广东省', country: '中国' },
  { id: 4, name: '深圳', province: '广东省', country: '中国' },
  { id: 5, name: '杭州', province: '浙江省 ', country: '中国' },
  { id: 6, name: '成都', province: '四川省', country: '中国' },
  { id: 7, name: '重庆', province: '重庆市 ', country: '中国' },
  { id: 8, name: '武汉', province: '湖北省', country: '中国' },
  { id: 9, name: '南京', province: '江苏省', country: '中国' },
  { id: 10, name: '西安', province: '陕西省', country: '中国' },
  { id: 11, name: '珠海', province: '广东', country: '中国' },
  { id: 12, name: '佛山', province: '广东', country: '中国' },
  { id: 13, name: '东莞', province: '广东 ', country: '中国' },
  { id: 14, name: '惠州', province: '广东 ', country: '中国' },
  { id: 15, name: '汕头', province: '广东 ', country: '中国' },
  { id: 16, name: '江门', province: '广东 ', country: '中国' },
  { id: 17, name: '湛江', province: '广东 ', country: '中国' },
  { id: 18, name: '肇庆', province: ' 广东 ', country: '中国' },
]

const foreign = [
  { id: 21, name: 'New York', province: 'New York', country: '美国' },
  { id: 22, name: 'London', province: 'Greater London', country: '英国' },
  { id: 23, name: 'Paris', province: 'Île-de-France ', country: '法国' },
  { id: 24, name: 'Tokyo ', province: '東京都', country: '日本' },
  { id: 25, name: 'Toronto', province: 'Ontario ', country: '加拿大' },
  { id: 26, name: 'Sydney', province: 'New South Wales ', country: '澳大利亚' },
  { id: 27, name: 'Dubai', province: 'Dubai ', country: '阿拉伯联合酋长国' },
  { id: 28, name: '柏林', province: '柏林', country: '德国' },
  { id: 29, name: '罗马', prvince: '拉齐奥', country: '意大利' },
  { id: 30, name: '开罗', prvince: '开罗', country: '埃及' },
]

function Demo() {
  const [commonList, setCommonList] = React.useState([])
  const [domesticList, setDomesticList] = React.useState(domestic)
  const [foreignList, setForeignList] = React.useState(foreign)
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState()

  const ref = React.useRef()

  const findCurList = (data, str) => {
    const regex = new RegExp(str, 'i')
    return data.filter((item) => {
      return regex.test(item.name)
    })
  }

  const handleSearch = (value) => {
    setLoading(true)
    if (ref.current) {
      clearTimeout(ref.current)
    }
    ref.current = setTimeout(() => {
      setDomesticList(findCurList(domestic, value))
      setForeignList(findCurList(foreign, value))
      setLoading(false)
    }, 1000)
  }
  const handleChange = (value, city) => {
    console.log('onChange', value)
    setValue(value)
    if (value && !commonList.find((item) => item.id === value)) {
      setCommonList([...commonList, city])
    }
  }
  return (
    <div>
      <CityPicker
        style={{ width: 230 }}
        commonList={commonList}
        domesticList={domesticList}
        foreignList={foreignList}
        onSearch={handleSearch}
        loading={loading}
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
