---
order: 5
title: Checkbox.Group 组合 - 联动受控
---
受控组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input,Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {

  const [value, setValue] = React.useState([])

  const onChange = (value, e) => {
    console.log('checkboxgroup checked',value, e)
    setValue(value)
  }

  return (
    <div>
        <div>已选择： {value}</div>
        <br />
        <br />
        <Checkbox.Group onChange={onChange}  checkboxType="square" size="small">
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

ReactDOM.render(<Demo />, mountNode)
```
