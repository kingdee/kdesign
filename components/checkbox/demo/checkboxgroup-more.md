---
order: 3
title: Checkbox.Group 垂直
---

垂直的 Checkbox.Group，配合更多输入框选项。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

const checkboxStyle1 = {
  marginBottom: 12,
  marginRight: 12
}
const checkboxStyle2 = {
  marginBottom: 12,
  marginRight: 12
}
class Demo extends React.Component {
  constructor() {
    super()
    this.state = { value1: [], value2: [] }
    this.onChange1 = this.onChange1.bind(this)
    this.onChange2 = this.onChange2.bind(this)
  }

  onChange1(value) {
    console.log('checkbox1 checked', value)
    this.setState({
      value1: value,
    })
  }

  onChange2(value) {
    console.log('checkbox2 checked', value)
    this.setState({
      value2: value,
    })
  }

  render() {
    const { value1, value2 } = this.state
    return (
      <div style={{ display: 'flex', width: 300 }}>
        <Checkbox.Group onChange={this.onChange1} value={value1} checkboxType={'default'}>
          <Checkbox style={checkboxStyle1} value={1}>
            Option A
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={2}>
            Option B
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={3}>
            Option C
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={4}>
            More...
            {value1.includes(String(4)) ? <Input style={{ width: 100, marginLeft: 10, display: 'none' }} /> : null}
          </Checkbox>
        </Checkbox.Group>
        <br />
        <Checkbox.Group onChange={this.onChange2} value={value2} checkboxType={'square'}>
          <Checkbox style={checkboxStyle2} value={1}>
            Option A
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={2}>
            Option B
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={3}>
            Option C
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={4}>
            More...
            {value2.includes(String(4)) ? <Input style={{ width: 100, marginLeft: 10, display: 'none' }} /> : null}
          </Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
