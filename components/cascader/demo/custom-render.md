---
order: 6
title: 自定义结果显示
---

传入一个`displayRender`函数自定义显示选择结果。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

function Demo() {
  const options = [
  {
    value: 'guangdong',
    label: 'Guangdong',
    children: [
      {
        value: 'guangzhou',
        label: 'Guangzhou',
        children: [
          {
            value: 'tianhe',
            label: 'Tian He',
            code: 440106,
          },
          {
            value: 'yuexiu',
            label: 'Yue Xiu',
            code: 440104,
          },
        ],
      },
      {
        value: 'shenzhen',
        label: 'Shenzhen',
        children: [
          {
            value: 'futian',
            label: 'Fu Tian',
            code: 440304,
          },
          {
            value: 'nanshan',
            label: 'Nan Shan',
            code: 440305,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangxi',
    label: 'Jiangxi',
    children: [
      {
        value: 'nanchang',
        label: 'Nanchang',
        children: [
          {
            value: 'donghu',
            label: 'Dong Hu',
            code: 360102,
          },
          {
            value: 'qingshanhu',
            label: 'Qing Shan Hu',
            code: 360111,
          },
        ],
      },
      {
        value: 'ganzhou',
        label: 'Ganzhou',
        children: [
          {
            value: 'zhanggong',
            label: 'Zhang Gong',
            code: 360702,
          },
          {
            value: 'ningdu',
            label: 'Ning Du',
            code: 360730,
          },
        ],
      },
    ],
  },
]

function handleAreaClick(e, label, option) {
  e.stopPropagation()
  console.log('clicked', label, option)
}

const displayRender = (labels, selectedOptions) =>
  labels.map((label, i) => {
    const option = selectedOptions[i]
    if (i === labels.length - 1) {
      return (
        <span key={option.value}>
          {label} (
          <a href="true" onClick={(e) => handleAreaClick(e, label, option)}>
            {option.code}
          </a>
          )
        </span>
      )
    }
    return <span key={option.value}>{label} / </span>
  })

return (
  <div style={{ width: '200px' }}>
  <Cascader
    options={options}
    defaultValue={['guangdong', 'shenzhen', 'nanshan']}
    displayRender={displayRender}
    style={{ width: 400 }}
    placeholder="Please select"
  /></div>
)
}

ReactDOM.render(<Demo />, mountNode)
```
