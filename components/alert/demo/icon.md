---
title: 是否显示图标
order: 1
---

反馈有两个图标：一个是显示在前面的信息标识图标，一个是显示在后面的关闭图标，可以设置是否显示

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Alert } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  function zip(...arrs) {
    return arrs.reduce((prevArr, nextArr, index) => {
      const ret = []
      prevArr.forEach((el) => {
        nextArr.forEach((ele) => {
          if (index === 1) {
            ret.push([el, ele])
          } else {
            ret.push([...el, ele])
          }
        })
      })
      return ret
    })
  }
  const map = {
    success: '成功提示',
    warning: '警告提示',
    error: '错误提示',
    info: '信息通知',
  }
  const getMessage = (type, showIcon, closable) => {
    return `这是${map[type]}类型的反馈浮层, ${showIcon ? '有' : '没有'}显示信息标识图标, ${
      closable ? '有' : '没有'
    }显示关闭图标`
  }
  return (
    <>
      {Object.keys(map).map((type) => {
        return zip([true, false], [true, false]).map(([showIcon, closable], index) => {
          return (
            <Alert
              key={type + index}
              message={getMessage(type, showIcon, closable)}
              showIcon={showIcon}
              closable={closable}
              type={type}
              delayOffTime={0}
            />
          )
        })
      })}
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
