---
order: 3
title: 卡片类型-页签位置
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Button } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      position: 'left',
    }
    this.setPosition = this.setPosition.bind(this)
  }

  setPosition(position) {
    this.setState({
      position,
    })
  }

  render() {
    const style = { marginRight: '10px' }
    const boxStyle =
      this.state.position === 'left' || this.state.position === 'right'
        ? { width: '500px', height: '300px' }
        : { width: '500px' }
    return (
      <>
        <div style={{ marginBottom: '20px', width: '300px' }}>
          <Button type="primary" style={style} onClick={() => this.setPosition('top')}>
            top
          </Button>
          <Button
            type="primary"
            style={style}
            onClick={() => {
              this.setPosition('left')
            }}>
            left
          </Button>
          <Button
            type="primary"
            style={style}
            onClick={() => {
              this.setPosition('right')
            }}>
            right
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.setPosition('bottom')
            }}>
            bottom
          </Button>
          <div>position = {this.state.position}</div>
        </div>
        <div style={boxStyle}>
          <Tabs type="card" position={this.state.position} defaultActiveKey="TabPane1">
            <Tabs.TabPane key="TabPane1" tab="TabPane1" />
            <Tabs.TabPane key="TabPane2" tab="TabPane2" />
          </Tabs>
        </div>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```