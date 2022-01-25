---
order: 9
title: 动态加载选项
---

通过 `loadData` 属性动态的加载选项。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

function Demo() {
  const optionLists = [
    {
      value: 'guangdong',
      label: 'Guangdong',
      isLeaf: false,
    },
    {
      value: 'jiangxi',
      label: 'Jiangxi',
      isLeaf: false,
    },
  ]
  
  const LazyOptions = () => {
    const [options, setOptions] = React.useState(optionLists)
  
    const onChange = (value, selectedOptions) => {
      console.log(value, selectedOptions)
    }
  
    const loadData = (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
  
      // load options lazily
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: 'dynamic1',
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: 'dynamic2',
          },
        ]
        setOptions([...options])
      }, 1000)
    }
  
    return <div style={{ width: '200px' }}><Cascader style={{ width: '200px' }} options={options} loadData={loadData} onChange={onChange} changeOnSelect /></div>
  }
  
  return <LazyOptions />
}

ReactDOM.render(<Demo />, mountNode)
```
