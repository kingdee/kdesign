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

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      value1: 'Apple',
      value2: 'Apple',
      value3: 'Apple',
      value4: 'Apple',
    }
    this.onChange1 = this.onChange1.bind(this)
    this.onChange2 = this.onChange2.bind(this)
    this.onChange3 = this.onChange3.bind(this)
    this.onChange4 = this.onChange4.bind(this)
  }

  onChange1(e) {
    console.log('radio1 checked', e.target.value)
    this.setState({
      value1: e.target.value,
    })
  }

  onChange2(e) {
    console.log('radio2 checked', e.target.value)
    this.setState({
      value2: e.target.value,
    })
  }

  onChange3(e) {
    console.log('radio3 checked', e.target.value)
    this.setState({
      value3: e.target.value,
    })
  }

  onChange4(e) {
    console.log('radio4 checked', e.target.value)
    this.setState({
      value4: e.target.value,
    })
  }

  render() {
    const { value1, value2, value3, value4 } = this.state
    return (
      <div style={{ width: '350px' }}>
        <Radio.Group options={plainOptions} onChange={this.onChange1} value={value1} />
        <br />
        <Radio.Group options={optionsWithDisabled} onChange={this.onChange2} value={value2} />
        <br />
        <br />
        <Radio.Group options={options} onChange={this.onChange3} value={value3} optionType="square" />
        <br />
        <br />
        <Radio.Group options={optionsWithDisabled} onChange={this.onChange4} value={value4} optionType="button" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
