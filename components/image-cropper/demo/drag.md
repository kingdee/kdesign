---
order: 2
title: 拖拽对象配置
---

拖拽对象可根据需要进行配置，默认拖拽对象为取景框，也可设置为图片拖拽或两者都可拖拽。

```jsx
import { ImageCropper } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {

  return (
    <div style={{ textAlign: 'center' }}>
      <ImageCropper
        visible={true}
        containerWidth={830}
        title="拖拽图片"
        image="https://webstatic.mihoyo.com/ys/event/e20210721-fab/images/1.f6ed965b.jpg"
        getContainer={false}
        mask={false}
        dragMode="move"
        cropBoxMovable={false}
      />
    </div>
  )
}

render(<Demo />)
```
