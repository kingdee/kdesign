---
title: 行高自适应
order: 47
---
默认情况下，表格的行高是根据行内容自适应的，行的高度取决于该行高度最高的单元格。
如果要限制自适应的最大高度，可通过自定义单元格的方式达到。
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const longText = '色彩是设计的表现手法之一。在商业设计中，色彩是十分重要的视觉元素，它决定了视觉效果，能激发情感，影响消费者的心情和行为。色彩作为一种视觉语言能快速抓住人们的眼球，并映入人们的脑海。色彩在视觉传达中有着不可忽视的作用。除此之外，色彩还传达着一定的情感。不同的色彩对人的心理有不同的影响，因此为了达到预期的效果，应该有策略地去选择和使用每一种色彩。'

  const dataSource = [
    { mark:'正常显示', autoA: longText, autoB: longText.slice(0,60) },
    { mark:'正常显示',autoA: longText.slice(0,60), autoB: longText.slice(0,60), },
    { mark:'限制最大高度',autoA: longText, autoB: longText.slice(0,60), },
  ]

  const renderAutoHeightCell = (value, record, rowIndex) => {
    return  <div 
      style={{
          maxHeight:rowIndex === 2 ? '80px' : '', 
          overflow:'hidden'
        }}
      >
      {value}
    </div>
  }

  const columns = [
    { code: 'index', name: '序号', width: 80, render: (value, record, rowIndex) => {
        return rowIndex + 1
      }
    },
    {
     code: 'mark', name: '说明', width: 100,
    },
    { code: 'autoA', name: '自适应1', width: 250 , render: renderAutoHeightCell },
    { code: 'autoB', name: '自适应2', width: 250 , render: renderAutoHeightCell }
  ]


  return <Table  dataSource={dataSource} columns={columns} />
}

ReactDOM.render(<Demo />, mountNode)
```