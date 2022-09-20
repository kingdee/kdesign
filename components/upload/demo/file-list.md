---
order: 4
title: 完全控制的上传列表
---

使用 `fileList` 对列表进行完全控制，可以实现各种自定义功能，以下演示二种情况：

1. 上传列表数量的限制。

2. 读取远程路径并显示链接。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const initFiles = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      size: 2345,
      url: 'http://www.baidu.com/xxx.png',
    },
  ]
  const [fileList, setFileList] = React.useState(initFiles)
  const handleChange = (info) => {
    let fileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2)

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(fileList)
  }

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  }

  return (
    <Upload {...props} fileList={fileList} style={{ width: 500 }}>
      <Button icon={<Icon type="upload" />}>
        Upload
      </Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
