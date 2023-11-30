---
order: 3
title: 操作栏
---

通过 operations 可以配置操作栏。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Image, Icon } from '@kdcloudjs/kdesign'

function download(url, name) {
  const tag = document.createElement('a')
  tag.download = name

  const triggerDownload = (dataURL) => {
    tag.href = dataURL
    tag.click()
    tag.remove()
  }

  if (/data:image\/\w+;base64,/.test(url)) {
    triggerDownload(url)
  } else {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const img = document.createElement('img')
    img.crossOrigin = 'Anonymous'
    img.src = url

    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/')
      triggerDownload(dataURL)
      img.remove()
      canvas.remove()
    }
  }
}

const onDownload = (src) => {
  const downloadName = `myPicture.jpg`
  download(src, downloadName)
}

const operations = [
  <Icon
    key="1"
    title="下载"
    type="download"
    onClick={() => onDownload('https://kui.kingdee.com/assets/image/img02.jpg')}
  />,
]

const Demo: React.FC = () => {
  return (
    <Image
      width={142}
      operations={operations}
      src="https://kui.kingdee.com/assets/image/img02.jpg"
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
