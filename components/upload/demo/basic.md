---
order: 0
title: 文件上传
---

经典款式，用户点击按钮弹出文件选择框。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <Upload {...props} style={{ width: 500 }}>
      <Button type="ghost" icon={<Icon type="upload" />}>
        上传文件
      </Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```