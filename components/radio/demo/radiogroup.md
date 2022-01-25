---
order: 2
title: 单选组合
---

一组互斥的 Radio 配合使用。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      value1: 1,
      value2: 'a',
    }
    this.onChange1 = this.onChange1.bind(this)
    this.onChange2 = this.onChange2.bind(this)
  }

  onChange1(e) {
    console.log('radioGroup1 checked', e.target.value)
    this.setState({
      value1: e.target.value,
    })
  }

  onChange2(e) {
    console.log('radioGroup2 checked', e.target.value)
    this.setState({
      value2: e.target.value,
    })
  }

  render() {
    return (
      <div style={{ width: '450px' }}>
        <Radio.Group onChange={this.onChange1} value={this.state.value1}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <Radio.Group onChange={this.onChange2} value={this.state.value2}>
          <Radio value="a" radioType="square">
            Option A
          </Radio>
          <Radio value="b" radioType="square">
            Option B
          </Radio>
          <Radio value="c" radioType="square">
            Option C
          </Radio>
          <Radio value="d" radioType="square">
            Option D
          </Radio>
        </Radio.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
