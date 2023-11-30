---
title: 扩展菜单
order: 4
---

使用 dropdownFooterRender 对下拉菜单底部进行自由扩展

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const columns = [
    { title: '解码', key: 'value' },
    { title: '名称', key: 'label' },
  ]

  const data = [
    {
      value: 'CRMProvince000',
      label: '北京市',
    },
    {
      value: 'CRMProvince001',
      label: '甘肃省',
    },
    {
      value: 'CRMProvince002',
      label: '湖南省',
    },
    {
      value: 'CRMProvince003',
      label: '湖北省',
    },
    {
      value: 'CRMProvince004',
      label: '江西省',
    },
  ]

  const handleAdd = () => {
    console.log('add')
  }

  const handleShowMore = () => {
    console.log('showMore')
  }

  const footer = (
    <div className="advanced-selector-footer">
      <span onClick={handleAdd}>新增</span>
      <span onClick={handleShowMore}>显示更多</span>
    </div>
  )
  return (
    <div>
      <BaseData columns={columns} options={data} dropdownFooterRender={footer} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.advanced-selector-footer {
  color: #0e5fd8;
  height: 100%;
  display: flex;
  align-items: center;
}

.advanced-selector-footer span {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
```
