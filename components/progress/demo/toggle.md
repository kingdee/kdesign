---
title: 动态展示
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Progress, Button } from '@kdcloudjs/kdesign'

const demoStyle = { marginBottom: '8px' }

class Demo extends React.Component {
  constructor() {
    super()
    this.state = { percent: 30 }
    this.plus = this.plus.bind(this)
    this.minus = this.minus.bind(this)
    this.pendding = this.pendding.bind(this)
  }

  plus() {
    if (this.state.percent === 100) return
    this.setState({
      percent: this.state.percent + 10,
    })
  }

  minus() {
    if (this.state.percent === 0) return
    this.setState({
      percent: this.state.percent - 10,
    })
  }

  pendding(p) {
    console.log('current percent =>', p)
  }

  render() {
    const loadingDom = (
      <>
        <span style={{ float: 'left', textAlign: 'left' }}>正在加载中...</span>
        <span style={{ float: 'right', textAlign: 'right' }}>{this.state.percent}%</span>
      </>
    )
    return (
      <div style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Progress
          style={demoStyle}
          onProcess={this.pendding}
          percent={this.state.percent}
          textMap={[loadingDom]}
          infoPosition="bottom"
        />
        <Progress style={demoStyle} type="circle" percent={this.state.percent} />
        <br />
        <Button style={demoStyle} type="primary" onClick={this.plus}>
          plus
        </Button>
        <br />
        <Button type="primary" onClick={this.minus}>
          minus
        </Button>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode)
```
