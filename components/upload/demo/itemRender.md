---
order: 10
title: 文件上传
---

通过 itemRender 来实现自定义上传列表。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon, Space } from '@kdcloudjs/kdesign'

function Demo() {
  const action = () => {
    return Promise.resolve('https://www.mocky.io/v2/5cc8019d300000980a055e76')
  }
  const itemRender = (originNode, file, fileList) => {
    const errStyle = {
      color: 'red',
    }
    return (
      <Space>
        <span>{file.name}</span>
        <span style={{color:'red'}}>{file.status === 'error' && '上传失败'}</span>
        
      </Space>
    )
  }
  const props = {
    name: 'file',
    action,
    method: 'put', //默认为post
    itemRender,
    withCredentials: true,
    defaultFileList: [
      {
        uid: 1,
        size: '100',
        status: 'done',
        name: 'xxx.png',
        response: 'Server Error 500',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: 2,
        size: '100',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: 3,
        size: '100',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500',
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
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
    onStart(file) {
      console.log('onStart', file)
    },
  }
  return (
    <Upload {...props} style={{ width: 500 }}>
      <Button icon={<Icon type="upload" />}>上传文件</Button>
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
