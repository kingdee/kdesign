---
order: 5
title: 拖拽上传
---

把文件拖入指定区域，完成上传，同样支持点击上传。

设置 `multiple` 后，在 `IE10+` 可以一次上传多个文件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Icon } from '@kdcloudjs/kdesign'
import type { UploadProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        console.info(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  const dragButton = (
    <div>
      <Icon type="add" style={{ fontSize: 16, color: '#666', fontWeight: 'bolder' }} />
      <div>点击或拖拽上传</div>
    </div>
  )
  return (
    <Upload.Dragger {...props} style={{ width: 500 }}>
      {dragButton}
    </Upload.Dragger>
  )
}

ReactDOM.render(<Demo />, mountNode)
```