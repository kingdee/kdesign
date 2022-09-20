---
order: 7
title: 手动上传
---

`beforeUpload` 返回 `false` 后，手动上传文件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Button, Icon, Alert } from '@kdcloudjs/kdesign'
import axios from 'axios'

function Demo() {
  const [fileList, setFileList] = React.useState([])
  const [uploading, setUploading] = React.useState(false)
  const [msg, setMsg] = React.useState('')
  const [type, setType] = React.useState('')

  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })

    setUploading(true)

    // You can use any AJAX library you like
    axios({
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      method: 'post',
      data: formData,
    })
      .then(() => {
        setFileList([])
        setUploading(false)
        setType('success')
        setMsg('upload successfully.')
      })
      .catch(() => {
        setUploading(false)
        setType('error')
        setMsg('upload failed.')
      })
  }

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  return (
    <>
      <Alert message={msg} type={type} closable={true} showIcon={true} />
      <Upload {...props} style={{ width: 500 }}>
        <Button icon={<Icon type="upload" />}>
          Select File
        </Button>
      </Upload>
      <Button
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}>
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
