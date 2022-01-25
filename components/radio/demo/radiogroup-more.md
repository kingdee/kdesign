---
order: 3
title: Radio.Group 垂直
---

垂直的 Radio.Group，配合更多输入框选项。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio, Input } from '@kdcloudjs/kdesign'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { value: 1 }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    console.log('radio checked', typeof e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { value } = this.state
    return (
      <div style={{ width: '350px' }}>
      <Radio.Group onChange={this.onChange} value={value} style={{ width: 400 }}>
        <Radio style={radioStyle} value={1}>
          Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
          Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
          Option C
        </Radio>
        <Radio style={radioStyle} value={4}>
          More...
          {value * 1 === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Radio.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
