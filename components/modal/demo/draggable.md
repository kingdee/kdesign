---
title: 可拖拽
order: 4
---

提示弹窗可以设置是否拖拽

```jsx
import { Modal } from '@kdcloudjs/kdesign'
;() => {
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <>
      <Modal body={'可拖拽'} type="normal" bodyStyle={bodyStyle} closable={true} mask={false} getContainer={false} />
      <Modal
        body={'不可拖拽'}
        type="normal"
        bodyStyle={bodyStyle}
        closable={true}
        mask={false}
        getContainer={false}
        draggable={false}
      />
    </>
  )
}
```
