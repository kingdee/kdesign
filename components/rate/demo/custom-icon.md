---
order: 3
title: 自定义图标
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const defaultValue = 3
  // const [value, setValue] = useState(3)
  const _icon = [
    <Icon type="close-bold" key={'add_0'} />,
    <Icon type="close-bold" key={'add_1'} />,
    <Icon type="close-bold" key={'add_2'} />,
    <Icon type="close-bold" key={'add_3'} />,
    <Icon type="close-bold" key={'add_4'} />,
  ]
  const _activeIcon = [
    <Icon type="right-bold" key={'search_0'} />,
    <Icon type="right-bold" key={'search_1'} />,
    <Icon type="right-bold" key={'search_2'} />,
    <Icon type="right-bold" key={'search_3'} />,
    <Icon type="right-bold" key={'search_4'} />,
  ]

  const handleChange = (value) => {
    console.log(value)
  }

  const handleHoverChange = (value) => {
    console.log('1231231', value)
  }

  return (
    <div style={{ width: '150px' }}>
      <Rate
        onChange={handleChange}
        defaultValue={defaultValue}
        allowHalf={false}
        style={{ fontSize: 18 }}
        onHoverChange={handleHoverChange}
        activeIcon={(index) => {
          return _activeIcon[index - 1]
        }}
        icon={(index) => {
          return _icon[index - 1]
        }}></Rate>
      <br />
      <Rate
        onChange={handleChange}
        onlyActiveCurrent
        defaultValue={defaultValue}
        allowHalf={true}
        onHoverChange={handleHoverChange}
        style={{ fontSize: 18 }}
        activeIcon={(index) => {
          return _activeIcon[index - 1]
        }}
        icon={(index) => {
          return _icon[index - 1]
        }}></Rate>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
