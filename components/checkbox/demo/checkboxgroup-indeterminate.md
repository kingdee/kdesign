---
order: 2
title: Checkbox 选中状态
---

全选与半选

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { value: ['1'] }
    this.onChange = this.onChange.bind(this)
    this.onChangeAll = this.onChangeAll.bind(this)
    this.getChecked = this.getChecked.bind(this)
    this.getIndeterminate = this.getIndeterminate.bind(this)
  }

  onChange(value) {
    console.log('checkboxgroup checked', value)
    this.setState({
      value: value,
    })
  }

  onChangeAll(e) {
    console.log('onChangeAll checked', e.target.checked)
    let newValue
    if (e.target.checked) {
      newValue = ['1', '2', '3', '4']
    } else {
      newValue = []
    }
    this.onChange(newValue)
  }

  getChecked(value) {
    return value.length === 4
  }

  getIndeterminate(value) {
    return value.length > 0 && value.length < 4
  }

  render() {
    const { value } = this.state
    const checked = this.getChecked(value)
    const indeterminate = this.getIndeterminate(value)
    return (
      <div style={{ width: 300 }}>
        <Checkbox checked={checked} indeterminate={indeterminate} onChange={this.onChangeAll}>
          Select ALL
        </Checkbox>
        <br />
        <Checkbox.Group onChange={this.onChange} value={value} checkboxType={'default'}>
          <Checkbox value={1}>
            Option A
          </Checkbox>
          <Checkbox value={2}>
            Option B
          </Checkbox>
          <Checkbox value={3}>
            Option C
          </Checkbox>
          <Checkbox value={4}>
            More...
            {value.includes(String(4)) ? <Input style={{ width: 100, marginLeft: 10, display: 'none' }} /> : null}
          </Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
