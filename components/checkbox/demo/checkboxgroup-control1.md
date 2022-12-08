---
order: 5
title: Checkbox.Group 组合 - 联动受控
---
受控组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input,Button } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { value: [] }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e, value) {
    console.log('checkboxgroup checked',e, value)
    this.setState({
      value: value,
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <div>已选择： {value}</div>
        <br />
        <br />
        <Checkbox.Group onChange={this.onChange} value={value} checkboxType={'default'}>
          <Checkbox value={"A"}>
            Option A
          </Checkbox>
          <Checkbox value={"B"}>
            Option B
          </Checkbox>
          <Checkbox value={"C"}>
            Option C
          </Checkbox>
          <Checkbox value={"More"}>
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
