---
order: 8
title: 只选中当前图标
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate, Image } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const CustomImage = (props) => {
    const { src, ...others } = props
    return <Image src={src} preview={false} {...others} width={28}/>
  }
  const defaultIcons = [
    <CustomImage src="https://kui.kingdee.com/assets/image/terrible.png" key={5}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/poor.png" key={4}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/average.png" key={3}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/good.png" key={2}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/great.png" key={1}/>,
  ]
  const defaultActiveIcons = [
    <CustomImage src="https://kui.kingdee.com/assets/image/terrible-active.png" key={55}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/poor-active.png" key={44}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/average-active.png" key={33}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/good-active.png" key={22}/>,
    <CustomImage src="https://kui.kingdee.com/assets/image/great-active.png" key={11}/>,
  ]
  const handleHoverChange = (value) => {
    console.log('1231231', value)
  }
  return (
    <div  style={{ width: '150px' }}>
      <Rate
        onlyActiveCurrent={true}
        defaultValue={3}
        allowHarf={false}
        icon={(index) => {return defaultIcons[index - 1]}}
        activeIcon={(index) => {return defaultActiveIcons[index - 1]}}
        onHoverChange={handleHoverChange}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
