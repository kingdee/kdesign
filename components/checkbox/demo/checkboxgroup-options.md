---
order: 4
title: Checkbox.Group 组合 - 配置方式
---

通过配置 `options` 参数来渲染复选框。也可通过 `checkboxType` 参数来设置 Checkbox 类型。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox } from '@kdcloudjs/kdesign'

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
  const [value1, setValue1] = React.useState<Array<string>>(['Apple'])
  const [value2, setValue2] = React.useState<Array<string>>(['Apple'])
  const [value3, setValue3] = React.useState<Array<string>>(['Apple', 'Orange'])

  const onChange1 = (list, e) => {
    console.log('checkboxGroup1', list, e)
    setValue1(list)
  }

  const onChange2 = (list, e) => {
    console.log('checkboxGroup2', list)
    setValue2(list)
  }

  const onChange3 = (list, e) => {
    console.log('checkboxGroup3', list)
    setValue3(list)
  }
  return (
    <div  style={{ width: '300px' }}>
        <Checkbox.Group options={plainOptions} onChange={(list,e) => onChange1(list, e)} value={value1} />
        <br />
        <Checkbox.Group
          options={options}
          checkboxType="square"
          onChange={(list, e) => onChange2(list, e)}
          value={value2}
        />
        <br />
        <Checkbox.Group options={optionsWithDisabled} onChange={(list, e) => onChange3(list, e)} value={value3} />
        <br />
      </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
