---
order: 5
title: Checkbox.Group 组合 - 配置方式
---

内嵌 `Checkbox`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { value: [] }
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    console.log('checkboxgroup checked', value)
    this.setState({
      value: value,
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
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
