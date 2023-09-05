---
name: issue template
about: 请根据模板提交 issue
---

## 重现链接或代码
```js
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Radio, Input } from '@kdcloudjs/kdesign'


function Demo() {
  const [value, setValue] = useState(1)

  const handleChange = (e, value) => {
    console.log('radio checked', e.target.value, value)
    setValue(e.target.value)
  }

  return (
    <div style={{ width: '350px' }}>
    <Radio.Group onChange={handleChange} value={value} style={{ width: 400 }}>
      <Radio value="">
        Option A
      </Radio>
      <Radio value="0">
        Option B
      </Radio>
      <Radio value={0}>
        Option C
      </Radio>
    </Radio.Group>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

## 重现问题步骤
将此代码贴到任一组件的演示代码中，点击 Option A，不会选中。点击 Option B ，Option C也会选中

## 期望的结果是什么
点击 Option A，会选中。点击 Option B，直选中Option B

## 实际的结果是什么


## 组件库版本号、浏览器信息
组件库与浏览器均为最新版本
