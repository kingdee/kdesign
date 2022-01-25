---
order: 8
title: 受控实现
---

可以外部控制页码显示。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Pagination } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { current: 3 }
    this.onChange = this.onChange.bind(this)
  }

  onChange(page) {
    this.setState({
      current: page,
    })
  }

  render() {
    return <div style={{ width: '300px' }}><Pagination current={this.state.current} onChange={this.onChange} total={50} /></div>
  }
}

ReactDOM.render(<Demo />, mountNode)
```