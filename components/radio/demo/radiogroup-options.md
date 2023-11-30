---
order: 5
title: Radio.Group 组合 - 配置方式
---

通过配置 `options` 参数来渲染单选框。也可通过 `optionType` 参数来设置 Radio 类型。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

const plainOptions = ['Apple', 'Pear', 'Orange']
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]

const Demo: React.FC = () => {
  const [value1, setValue1] = React.useState<string>('Apple')
  const [value2, setValue2] = React.useState<string>('Apple')
  const [value3, setValue3] = React.useState<string>('Apple')
  const [value4, setValue4] = React.useState<string>('Apple')

  const onChange1 = (e) => {
    console.log('radio1 checked', e.target.value)
    setValue1(e.target.value)
  }
  const onChange2 = (e) => {
    console.log('radio2 checked', e.target.value)
    setValue2(e.target.value)
  }
  const onChange3 = (e) => {
    console.log('radio3 checked', e.target.value)
    setValue3(e.target.value)
  }
  const onChange4 = (e) => {
    console.log('radio4 checked', e.target.value)
    setValue4(e.target.value)
  }

  return (
    <div style={{ width: '350px' }}>
        <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
        <br />
        <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
        <br />
        <br />
        <Radio.Group options={options} onChange={onChange3} value={value3} optionType="square" />
        <br />
        <br />
        <Radio.Group options={optionsWithDisabled} onChange={onChange4} value={value4} optionType="button" />
      </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
