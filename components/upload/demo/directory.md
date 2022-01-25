---
order: 6
title: 文件夹上传
---

支持上传一个文件夹里的所有文件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" style={{ width: 500 }} directory>
      <Button type="ghost" icon={<Icon type="upload" />}>
        Upload Directory
      </Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```