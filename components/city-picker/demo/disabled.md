---
title: 禁用
order: 4
---

禁用状态

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
]

function Demo() {
  return (
    <div>
      <CityPicker style={{ width: 230 }} domesticList={domestic} value={1} disabled />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
