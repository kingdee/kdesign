---
order: 2
title: 切换
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Button } from '@kdcloudjs/kdesign'

class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: true,
      loading: false,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleToLoading = this.toggleToLoading.bind(this)
  }

  toggle() {
    this.setState({
      checked: !this.state.checked,
    })
  }

  toggleToLoading() {
    this.setState({
      loading: !this.state.loading,
    })
  }

  onChange(checked) {
    console.log(`switch to ${checked}`)
  }

  render() {
    return (
      <>
        <br />
        <Switch checked={this.state.checked} defaultChecked onChange={this.onChange} />
        <br />
        <Button type="primary" onClick={this.toggle}>
          Toggle
        </Button>
        <br />
        <Switch loading={this.state.loading} checked={this.state.checked} defaultChecked onChange={this.onChange} />
        <br />
        <Button type="primary" onClick={this.toggleToLoading}>
          Toggle to loading
        </Button>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```