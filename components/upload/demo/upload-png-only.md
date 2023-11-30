---
order: 7.1
title: 只上传 png 图片
---

`beforeUpload` 返回 `false` 或 `Promise.reject` 时，只用于拦截上传行为，不会阻止文件进入上传列表。如果需要阻止列表展现，可以参照此例配合 `onChange` 进行实现。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon } from '@kdcloudjs/kdesign'
import type { UploadFile } from '@kdcloudjs/kdesign'
import type { UploadProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [fileList, updateFileList] = React.useState<Array<UploadFile>>([])
  const props: UploadProps = {
    fileList,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    beforeUpload: (file) => {
      if (file.type !== 'image/png') {
        console.error(`${file.name} is not a png file`)
      }
      return file.type === 'image/png'
    },
    onChange: (info) => {
      console.log(info.fileList)
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter((file) => !!file.status))
    },
  }
  return (
    <Upload {...props} style={{ width: 500 }}>
      <Button icon={<Icon type="upload" />}>
        Upload png only
      </Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
