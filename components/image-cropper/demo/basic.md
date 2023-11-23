---
order: 0
title: 图片裁剪
---

```jsx
import { ImageCropper, Upload, Icon } from '@kdcloudjs/kdesign'
import { useState } from 'react'

const URL = window.URL || window.webkitURL

function Demo() {
  const [visible, setVisible] = useState(false)
  const [src, setSrc] = useState('')
  const [imageUrl, setImageUrl] = React.useState('')


  const handleClose = () => {
    setVisible(false)
  }

  const handleSuccess = (imgFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(imgFile)
    reader.addEventListener('load', () => {
      setImageUrl(reader.result)
      setVisible(false)
    })
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      console.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      console.error('Image must smaller than 2MB!')
    }

    if (isJpgOrPng && isLt2M) {
      if (src) {
        URL.revokeObjectURL(src)
      }
      const str = URL.createObjectURL(file)
      setSrc(str)
      setVisible(true)
    }
    return false
  }

  const uploadButton = (
    <div>
        <Icon type="add" style={{ fontSize: 16, color: '#666', fontWeight: 'bolder' }} />
      <div>上传图片</div>
    </div>
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <Upload
        listType="picture"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        style={{ width: 500 }}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <ImageCropper
        visible={visible}
        title="编辑图片"
        image={src}
        onClose={handleClose}
        onCropSuccess={handleSuccess}
      />
    </div>
  )
}

render(<Demo />)
```
