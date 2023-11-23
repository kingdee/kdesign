---
order: 1
title: 用户头像
---

点击上传用户头像，并使用 `beforeUpload` 限制用户上传的图片格式和大小。

> `beforeUpload` 的返回值可以是一个 Promise 以支持异步处理，如服务端校验等：[示例](http://react-component.github.io/upload/examples/beforeUpload.html)。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      console.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      console.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const [loading, setLoading] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState('')

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      setImageUrl('')
    } else if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false)
        setImageUrl(imageUrl)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? (
        <Icon type="loadding-circle" spin />
      ) : (
        <Icon type="add" style={{ fontSize: 16, color: '#666', fontWeight: 'bolder' }} />
      )}
      <div>上传头像</div>
    </div>
  )

  return (
    <Upload
      listType="picture"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      style={{ width: 500 }}>
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
