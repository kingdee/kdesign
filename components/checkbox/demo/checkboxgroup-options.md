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

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      value1: ['Apple'],
      value2: ['Apple'],
      value3: ['Apple', 'Orange'],
    }
  }

  onChange1(list) {
    console.log('checkboxGroup1', list)
    this.setState({
      value1: list,
    })
  }

  onChange2(list) {
    console.log('checkboxGroup2', list)
    this.setState({
      value2: list,
    })
  }

  onChange3(list) {
    console.log('checkboxGroup3', list)
    this.setState({
      value3: list,
    })
  }

  render() {
    const { value1, value2, value3 } = this.state
    return (
      <div  style={{ width: '300px' }}>
        <Checkbox.Group options={plainOptions} onChange={(list) => this.onChange1(list)} value={value1} />
        <br />
        <Checkbox.Group
          options={options}
          checkboxType="square"
          onChange={(list) => this.onChange2(list)}
          value={value2}
        />
        <br />
        <Checkbox.Group options={optionsWithDisabled} onChange={(list) => this.onChange3(list)} value={value3} />
        <br />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
