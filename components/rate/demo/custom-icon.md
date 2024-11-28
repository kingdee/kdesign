---
order: 3
title: 自定义图标
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate, Icon } from '@kdcloudjs/kdesign'
import type { IRateProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const defaultValue: IRateProps['defaultValue'] = 3
  const _icon: IRateProps['icon'] = [
    <Icon type="close-bold" key={'add_0'} />,
    <Icon type="close-bold" key={'add_1'} />,
    <Icon type="close-bold" key={'add_2'} />,
    <Icon type="close-bold" key={'add_3'} />,
    <Icon type="close-bold" key={'add_4'} />,
  ]
  const _activeIcon: IRateProps['activeIcon'] = [
    <Icon type="right-bold" key={'search_0'} />,
    <Icon type="right-bold" key={'search_1'} />,
    <Icon type="right-bold" key={'search_2'} />,
    <Icon type="right-bold" key={'search_3'} />,
    <Icon type="right-bold" key={'search_4'} />,
  ]

  const handleChange: IRateProps['onChange'] = (value:number) => {
    console.log(value)
  }

  const renderActiveIcon = (
    icons: IRateProps['activeIcon'],
    index: number
  ): React.ReactNode => {
    if (Array.isArray(icons)) {
      return icons[index - 1]; // 类型安全
    }
    if (typeof icons === 'function') {
      return icons(index);
    }
    return icons; // React.ReactNode
  };
  const renderIcon = (
    icons: IRateProps['icon'],
    index: number
  ): React.ReactNode => {
    if (Array.isArray(icons)) {
      return icons[index - 1]; // 类型安全
    }
    if (typeof icons === 'function') {
      return icons(index);
    }
    return icons; // React.ReactNode
  };
   
  return (
    <div style={{ width: '150px' }}>
      <Rate
        onChange={handleChange}
        defaultValue={defaultValue}
        allowHalf={false}
        style={{ fontSize: 18 }}
        activeIcon={(index:number) => renderActiveIcon(_activeIcon, index)}
        icon={(index:number) => renderIcon(_icon, index)}></Rate>
      <br />
      <Rate
        onChange={handleChange}
        onlyActiveCurrent
        defaultValue={defaultValue}
        allowHalf={false}
        style={{ fontSize: 18 }}
        activeIcon={(index:number) => renderActiveIcon(_activeIcon, index)}
        icon={(index:number) => renderIcon(_icon, index)}></Rate>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
