---
order: 5
title: Checkbox.Group 组合 - 配置方式
---

内嵌 `Checkbox`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

const checkboxStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
}

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
          <Checkbox style={checkboxStyle} value={1}>
            Option A
          </Checkbox>
          <Checkbox style={checkboxStyle} value={2}>
            Option B
          </Checkbox>
          <Checkbox style={checkboxStyle} value={3}>
            Option C
          </Checkbox>
          <Checkbox style={checkboxStyle} value={4}>
            More...
            {value.includes(String(4)) ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
          </Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
