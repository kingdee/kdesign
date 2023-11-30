---
order: 3
title: 照片墙
---

用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Upload, Icon } from '@kdcloudjs/kdesign'
import type { UploadFile } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const initFiles = [
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      size: 1234,
      url: 'https://kui.kingdee.com/assets/image/img01.jpg',
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      size: 5678,
      url: 'https://kui.kingdee.com/assets/image/img02.jpg',
    },
    {
      uid: '-3',
      name: 'image3.png',
      status: 'done',
      size: 345,
      url: 'https://kui.kingdee.com/assets/image/img03.jpg',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image5.png',
      status: 'uploading',
      url: 'https://kui.kingdee.com/assets/image/img04.jpg',
    },
    {
      uid: '-4',
      name: 'image6.png',
      status: 'error',
      url: 'https://kui.kingdee.com/assets/image/img03.jpg'
    },
  ]

  const [fileList, setFileList] = React.useState<Array<UploadFile>>(initFiles)

  const handleChange = ({ fileList }) => setFileList(fileList)

  const uploadButton = (
    <div>
      <Icon type="add" style={{ fontSize: 16, color: '#666', fontWeight: 'bolder' }} />
      <div>Upload</div>
    </div>
  )
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        fileList={fileList}
        style={{ width: '100%' }}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```