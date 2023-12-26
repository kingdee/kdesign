---
title: 导出类型
order: 2
---

手写签名默认生成png类型的base64，可配置`dataUrlType`生成jpeg、svg类型的base64。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature, Radio } from '@kdcloudjs/kdesign'

const Demo = () => {
  const [dataUrlType,setDataUrlType] = React.useState('png')
  const getSignatureData = (dataUrl) => {
    console.log('dataUrl===>',dataUrlType, dataUrl)
  }
  const handleClear = () => {
    console.log('clear了吗')
  }
  const undo = () => {
    console.log('undo')
  }
  const redo = () => {
    console.log('redo')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
    <Radio.Group
        onChange={(e) => {
          setDataUrlType(e.target.value)
        }}
        defaultValue={dataUrlType}>
        <Radio value={'png'}>小</Radio>
        <Radio value={'jpeg'}>中</Radio>
        <Radio value={'svg'}>大</Radio>
      </Radio.Group>
      <Signature getSignatureData={getSignatureData} dataUrlType={dataUrlType} onClear={handleClear}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
