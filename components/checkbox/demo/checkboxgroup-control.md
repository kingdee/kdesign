---
order: 5
title: Checkbox.Group 组合 - 受控
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
    this.onClick = this.onClick.bind(this)
  }

  onChange(value, e) {
    console.log('checkboxgroup:', value, e)
  }

  onClick() {
     console.log('checkboxgroup checked:', [1, 2])
     this.setState({
      value: [1,2],
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.onClick}>点击选择Option A&B</Button>
        <br />
        <br />
        <Checkbox.Group onChange={this.onChange} value={value} checkboxType={'default'}>
          <div>
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
          </div>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
