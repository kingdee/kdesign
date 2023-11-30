---
title: 树形数据展示
order: 50
date: 2021-04-06
---
让表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格。可以通过设置 indentSize 以控制每一层的缩进宽度。

[配置项](#treeMode)
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  function renderOptions () {
    return (
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '5px', cursor: 'pointer', color: '#5582F3'}}>编辑</div>
        <div style={{cursor: 'pointer', color: '#fb2323'}}>删除</div>
      </div>
    )
  }
  function makeChildren (prefix) {
    return [
      {
        id: `${prefix}-1`,
        title: '二级标题',
        dept: '应用部',
        dest: '云南大理',
        guide: 'Douglas Lee',
        children: [
          { id: `${prefix}-1-1`, title: '三级标题', dept: '平台大前端-UED', dest: '云南大理', guide: 'Douglas Lee' },
          { id: `${prefix}-1-2`, title: '三级标题', dept: '平台大前端-前端', dest: '云南大理', guide: 'Douglas Lee' },
        ],
      },
      {
        id: `${prefix}-2`,
        title: '二级标题',
        dept: '应用部',
        dest: '云南大理',
        guide: 'Douglas Lee',
        children: [
          { id: `${prefix}-2-1`, title: '三级标题', dept: '平台大前端-UED', dest: '云南大理', guide: 'Douglas Lee' },
          { id: `${prefix}-2-2`, title: '三级标题', dept: '平台大前端-前端', dest: '云南大理', guide: 'Douglas Lee' },
        ],
      },
      { id: `${prefix}-3`, title: '二级标题', dept: '应用部', dest: '云南大理', guide: 'Douglas Lee' },
    ]
  }
  const dataSource = [
    {
      id: '1',
      title: '一级标题',
      dept: '云苍穹-前端',
      dest: 'South Maddison',
      guide: 'Don Moreno',
      children: makeChildren('1'),
    },
    {
      id: '2',
      title: '一级标题',
      dept: '云苍穹-模型',
      dest: 'Emilhaven',
      guide: 'Douglas Richards',
      children: makeChildren('2'),
    },
    {
      id: '3',
      title: '一级标题',
      dept: '云苍穹-基础',
      dest: '云南大理',
      guide: 'Douglas Lee',
      children: makeChildren('3'),
    },
    {
      id: '4',
      title: '一级标题',
      dept: '云苍穹-体验',
      dest: '杭州千岛湖',
      guide: 'Eric Castillo',
      children: makeChildren('4'),
    },
    { id: '5', title: '一级标题', dept: '云苍穹-运营', dest: 'East Karl', guide: 'Herbert Patton' }
  ]
  const columns = [
    { code: 'title', name: '标题', width: 200 },
    { code: 'dept', name: '部门名称', width: 180 },
    { code: 'dest', name: '团建目的地', width: 160 },
    { code: 'guide', name: '当地导游', width: 160 },
    { lock: true, name: '操作', render: renderOptions, width: 200 }
  ]
  const [openKeys, onChangeOpenKeys] = React.useState(['4', '4-2'])
  
  const treeMode = {
      openKeys, 
      onChangeOpenKeys
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} primaryKey={'id'} treeMode={treeMode} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
