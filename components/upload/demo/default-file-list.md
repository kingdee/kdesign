---
order: 2
title: 已上传的文件列表
---

使用 `defaultFileList` 设置已上传的内容。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onRemove(file) {
      console.log(file)
      return true
    },
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    defaultFileList: [
      {
        uid: '1',
        size: '100',
        status: 'done',
        name: 'xxx.png',
        response: 'Server Error 500',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        size: '100',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        size: '100',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500',
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  }

  return (
    <Upload {...props} style={{ width: 500 }}>
      <Button icon={<Icon type="upload" />}>
        Upload
      </Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
