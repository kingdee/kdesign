---
title: 功能拓展
order: 5
---

可配置指定字段检索

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData, Dropdown, Icon } from '@kdcloudjs/kdesign'
function Demo() {
  const [searchField, setSearchField] = React.useState('all')
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

  const menuList = [
    {
      key: 'all',
      label: '按全部字段',
    },
    {
      key: 'value',
      label: '按解码',
    },
    {
      key: 'label',
      label: '按名称',
    },
  ]

  const handleItemClick = (key) => {
    setSearchField(key)
  }

  const menu = (
    <Dropdown.Menu onClick={handleItemClick}>
      {menuList.map((item) => (
        <Dropdown.Item key={item.key}>{item.label}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  )

  const selectedSearchField = menuList.find((item) => item.key === searchField).label

  const footer = (
    <div className="baseData-footer">
      <Dropdown menu={menu} defaultKey="all">
        <a
          href="true"
          className="kd-dropdown-link"
          style={{ width: '100px', display: 'block' }}
          onClick={(e) => e.preventDefault()}>
          {selectedSearchField} <Icon type="arrow-down" />
        </a>
      </Dropdown>
      <div className="baseData-footer-action">
        <span>新增</span>
        <span>显示更多</span>
      </div>
    </div>
  )
  return (
    <div>
      <BaseData columns={columns} options={data} dropdownFooterRender={footer} searchField={searchField} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.baseData-footer {
  color: #0e5fd8;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 12px;
}

.baseData-footer .baseData-footer-action span {
  margin-left: 20px;
}
```
