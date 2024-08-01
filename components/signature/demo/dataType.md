---
title: 导出类型
order: 2
---

手写签名默认生成png类型的base64，可配置`dataUrlType`生成jpeg、svg类型的base64。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature, Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [dataUrlType,setDataUrlType] = React.useState<string>('png')
  const getSignatureData = (dataUrl:string) => {
    console.log('dataUrl===>',dataUrlType, dataUrl)
  }
  const handleClear = () => {
    console.log('执行清空')
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
        <Radio value={'png'}>png</Radio>
        <Radio value={'jpeg'}>jpeg</Radio>
        <Radio value={'svg'}>svg</Radio>
      </Radio.Group>
      <Signature getSignatureData={getSignatureData} dataUrlType={dataUrlType} onClear={handleClear}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
