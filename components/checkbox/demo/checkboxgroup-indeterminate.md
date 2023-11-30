---
order: 2
title: Checkbox 选中状态
---

全选与半选

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

const Demo = () => {

  const [value, setValue] = React.useState<Array<number>>([1])

  const onChange = (value, e) => {
    console.log('checkboxgroup checked', value, e)
    setValue(value)
  }

  const onChangeAll = (e) => {
    console.log('onChangeAll checked', e.target.checked)
    let newValue
    if (e.target.checked) {
      newValue = [1, 2, 3, 4]
    } else {
      newValue = []
    }
    onChange(newValue)
  }
  const checked = value.length === 4
  const indeterminate = value.length > 0 && value.length < 4

  return (
    <div style={{ width: 300 }}>
        <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChangeAll}>
          Select ALL
        </Checkbox>
        <br />
        <Checkbox.Group onChange={onChange} value={value} checkboxType={'default'}>
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



ReactDOM.render(<Demo />, mountNode)
```
