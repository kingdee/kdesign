---
title: 显示更多
order: 6
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData, Modal, Input, Icon, Tree, Table, SplitPanel, Button, Pagination, Search, Spin, Checkbox, Tabs } from '@kdcloudjs/kdesign'

function Demo() {
  const modalRef = React.useRef()

  const [value, setValue] = React.useState([{ value: '1', label: '周韵冲', number: 54406, cure: 4793, code: 'rybm2021088001', department: '研发中心产品设计' },])
  const [visible, setVisible] = React.useState(false)
  const [expandedKeys, setExpandedKeys] = React.useState(['0-1', '0', '1'])
  const [selected, setSelected] = React.useState(['1'])
  const [selectedKeys, setSelectedKeys] = React.useState(['1-1'])
  const [loading, setLoading] = React.useState(false)

  const handleChange = (a, b) => {
    console.log('a', b)
    console.log('a', b)
    setValue(b)
  }
  const handleSearch = (val) => console.log('handleSearch', val)
  const handleShowMore = () => {
    setVisible(true)
  }
  const handleOk = () => {
    setVisible(false)
    const list = []
    for (let i = 0; i < selected.length; i++) {
      const item = dataSource.find((v) => v.value === selected[i])
      if (item) {
        list.push(item)
      }
    }
    setValue(list)
  }
  const handleSelect = (value, options) => {
    console.log('value', value)
    console.log('options', options)
  }

  const columns = [
    { title: '解码', key: 'value' },
    { title: '名称', key: 'label' },
  ]

  const options = [
    { value: '1', label: '周韵冲', number: 54406, cure: 4793, code: 'rybm2021088001', department: '研发中心产品设计' },
    { value: '2', label: '附旭东', number: 1294, cure: 409, code: 'rybm2021088002', department: '研发中心产品设计' },
    { value: '3', label: '周鑫冲', number: 1212, cure: 390, code: 'rybm2021088003', department: '研发中心产品设计' },
    { value: '4', label: '刘二星', number: 1162, cure: 428, code: 'rybm2021088004', department: '研发中心产品设计' },
  ]

  // Tree

  const treeData = [
    {
      key: '1',
      title: '环宇国际集团有限公司',
      children: [
        {
          key: '1-0',
          title: '环宇智能家电有限公司',
          children: [],
        },
        {
          key: '1-1',
          title: '环宇电商（中国）有限公司',
          children: [
            {
              key: '1-1-0',
              title: '电商营销部门',
              children: [
                {
                  key: '1-1-0-0',
                  title: '1-1-0-0',
                  children: [],
                },
              ],
            },
            {
              key: '1-1-1',
              title: '研发部门',
              children: [
                {
                  key: '1-1-1-0',
                  title: '1-1-1-0',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          key: '1-2',
          title: '环宇家电总部',
          children: [],
        },
        {
          key: '1-3',
          title: '环宇智能床有限公司',
          children: [],
        },
        {
          key: '1-4',
          title: '环宇机械集团',
          children: [],
        },
        {
          key: '1-5',
          title: '环宇机床深圳有限公司',
          children: [],
        },
        {
          key: '1-6',
          title: '环宇机床杭州有限公司',
          children: [],
        },
      ],
    },
  ]

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys)
    console.log('onSelect', selectedKeys)
    console.log('info', info)
  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys)
  }

  const handleInputSearch = (e) => {
    console.log('handleSearch', e)
  }

  const renderTree = () => {
    return (
      <div className="left-content">
      <div style={{ margin: '8px 8px 0 8px', }}>
        <Input
          placeholder="请输入组织编号/名称"
          borderType="bordered"
          prefix={<Icon type="search" />}
          onChange={handleInputSearch}
        />
      </div>
        <Tree
          treeData={treeData}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onSelect={onSelect}
          // onCheck={onCheck}
          onExpand={onExpand}
          virtual={false}
        />
      </div>
    )
  }

  // Table
  const tableColumns = [
    { code: 'value', name: '#', width: 60, features: { sortable: true, filterable: true } },
    { code: 'code', name: '编码', width: 130, align: 'right', features: { sortable: true, filterable: true } },
    { code: 'label', name: '姓名', width: 80, align: 'right', features: { sortable: true, filterable: false } },
    { code: 'number', name: '工号', width: 80, align: 'right', features: { sortable: false, filterable: true } },
    { code: 'department', name: '部门', width: 120, features: { sortable: true, filterable: true } },
  ]

  const dataSource = [
    { value: '1', label: '周韵冲', number: 54406, cure: 4793, code: 'rybm2021088001', department: '研发中心产品设计' },
    { value: '2', label: '附旭东', number: 1294, cure: 409, code: 'rybm2021088002', department: '研发中心产品设计' },
    { value: '3', label: '周鑫冲', number: 1212, cure: 390, code: 'rybm2021088003', department: '研发中心产品设计' },
    { value: '4', label: '刘二星', number: 1162, cure: 428, code: 'rybm2021088004', department: '研发中心产品设计' },
    { value: '5', label: '欧阳娜', number: 1001, cure: 417, code: 'rybm2021088005', department: '研发中心产品设计' },
    { value: '6', label: '谢铭心', number: 54406, cure: 4793, code: 'rybm2021088006', department: '研发中心产品设计' },
    { value: '7', label: '许子开', number: 1294, cure: 409, code: 'rybm2021088007', department: '研发中心产品设计' },
    { value: '8', label: '王建新', number: 1212, cure: 390, code: 'rybm2021088008', department: '研发中心产品设计' },
    { value: '9', label: '将星星', number: 1162, cure: 428, code: 'rybm2021088009', department: '研发中心产品设计' },
    { value: '10', label: '胡为一', number: 1001, cure: 417, code: 'rybm2021088010', department: '研发中心产品设计' },
  ]

  const rowSelection = {
    type: 'checkbox',
    value: selected,
    onChange: setSelected,
  }

  const handleSelectAll = () => {
    setSelected(dataSource.map((item) => item.value))
  }

  const handleEmpty = () => {
    setSelected([])
  }

  const handleDelete = (item) => {
    console.log(item)
    setSelected(selected.filter((v) => v !== item.value))
  }

  const handleSearchChange = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const title = (
    <div className="modal-header">
      <span>人员</span>
      <div style={{ width: 400, fontSize: 12 }}>
        <Search
          style={{ float: 'right' }}
          type="quick-search"
          tags={[
            { value: 1, tag: '名称' },
            { value: 2, tag: '编号' },
          ]}
          onChange={handleSearchChange}
          getPopupContainer={() => document.getElementsByClassName("detail")[0] || document.body }
        />
      </div>
    </div>
  )

  const renderTable = () => {
    return (
      <div className="table">
        <div className="table-top">
          <div>
            <span>{`已选${selected.length}条数据，共200条（100张）`}</span>
            <Button type="text" onClick={handleSelectAll}>
              选择全部
            </Button>
          </div>
          <div>
          <Pagination pageType="simple" defaultCurrent={1} total={50} showQuickJumper={false} />
          </div>
        </div>
        <Table
          useOuterBorder={false}
          style={{ height: 400, overflow: 'auto' }}
          columns={tableColumns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          primaryKey={'value'}
        />
      </div>
    )
  }

  const renderCollect = () => {
    const list = []
    for (let i = 0; i < selected.length; i++) {
      const item = dataSource.find((v) => v.value === selected[i])
      if (item) {
        list.push(item)
      }
    }
    return (
      <div className="collect">
        <div className="collect-top">
          <span>{`已选（${selected.length}）`}</span>
          <Button type="text" onClick={handleEmpty}>
            清空
          </Button>
        </div>
        {list.map((item) => (
          <div key={item.value} className="collect-list">
            <span>{item.label}</span>
            <Icon type="close" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item)} />
          </div>
        ))}
      </div>
    )
  }

  const renderRightContent = () => {
    return (
      <div className="right-content">
        {renderTable()}
        {renderCollect()}
      </div>
    )
  }

  const body = (
    <>
      <Tabs type="card" defaultActiveKey="TabPane1" noContainer={true}>
          <Tabs.TabPane key="TabPane1" tab="全部" />
          <Tabs.TabPane key="TabPane2" tab="我的收藏" />
      </Tabs>
      <Spin type="page" spinning={loading}>
        <SplitPanel
          style={{ width: 960, height: 444 }}
          firstSlot={renderTree()}
          secondSlot={renderRightContent()}
          defaultSplit={0.25}
        />
      </Spin>
    </>
  )

  const footer = (
    <div className="detail-footer">
      <div className="footer-other">
        <Checkbox>包含下级</Checkbox>
        <Button style={{ marginLeft: 20 }} type="text">新增</Button>
      </div>
      <div className="footer-action">
        <Button style={{ marginRight: 12 }} onClick={() => setVisible(false)}>
          取消
        </Button>
        <Button type="primary" onClick={handleOk}>
          确定
        </Button>
      </div>
    </div>
  )

  return (
    <div ref={modalRef}>
      <BaseData
        mode="multiple"
        showDetailBtn
        onChange={handleChange}
        onSearch={handleSearch}
        options={options}
        columns={columns}
        value={value}
        onSelect={handleSelect}
        onShowMore={handleShowMore}
      />
      {visible && (
        <Modal
          body={body}
          bodyClassName="selector-detail"
          className="detail"
          type="normal"
          showLine
          closable={true}
          maskClosable
          onCancel={() => setVisible(false)}
          width={960}
          height={580}
          title={title}
          footer={footer}
        />
      )}
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.detail {
  --kd-c-tabs-pane-line-height: 36px;
  --kd-c-tabs-sizing-height: 36px;
  --kd-c-tabs-color-border: transparent;
  --kd-c-button-text-color-text: #0E5FD8;
}

.detail .kd-modal-header {
  padding: 0 20px;
  height: 50px;
}

.detail .kd-modal-header .kd-modal-title {
  width: 900px;
}

.detail .kd-modal-header .modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail .kd-modal-header .closable {
  position: absolute;
  right: 18px;
  top: 13px;
  font-size: 16px;
}

.selector-detail {
  padding: 0 !important;
  font-size: 12px !important;
}

.selector-detail .kd-split-wrapper {
  border: 0;
}

.selector-detail .right-content {
  display: flex;
  height: 100%;
}

.selector-detail .right-content .collect {
  flex: 1;
  border-left: 1px solid #ccc;
}

.selector-detail .right-content .collect-top {
  height: 40px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
}

.selector-detail .right-content .collect-list {
  line-height: 32px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
}

.collect-list:hover {
  border-radius: 2px;
  background-color: #f5f5f5 !important;
}

.selector-detail .right-content .table {
  width: 520px;
}

.selector-detail .table .table-top {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.selector-detail .kd-pagination.simple .kd-pagination-item {
  line-height: 24px;
}

.detail .detail-footer {
  width: 100%;
  line-height: 1;
  position: relative;
}

.detail .detail-footer .footer-action {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.detail .detail-footer .footer-other {
  position: absolute;
  left: 20px;
  top: 15px;
  display: flex;
  align-items: center;
}

.reminder-button {
  width: 90px;
  height: 32px;
}
.detail .kd-modal-footer {
  min-height: unset;
  height: 56px;
  align-items: flex-start;
}
```
