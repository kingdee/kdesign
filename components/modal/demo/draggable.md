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

  const [bounds, setBounds] = React.useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = React.useRef(null)

  const handleDragStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }
  return (
    <>
      <Modal
        ref={draggleRef}
        body={'可拖拽'}
        type="normal"
        bodyStyle={bodyStyle}
        closable={true}
        mask={false}
        getContainer={false}
        onDragStart={handleDragStart}
        bounds={bounds}
      />
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
