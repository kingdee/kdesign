---
order: 2
title: 高级搜索
---

通过关键词快速查找系统中不同类型的内容。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Search, Image } from '@kdcloudjs/kdesign'

function Demo() {
  const [panelResult, setPanelResult] = React.useState([])
  const [panelSearchLoading, setPanelSearchLoading] = React.useState(false)

  const panelTypes = [
    { label: '全部', code: 1 },
    { label: '应用菜单', code: 2 },
    { label: '应用', code: 3 },
  ]

  const result = [
    {
      title: '应收账龄分析表-按单据显示时，单据编号打开单据报错',
      id: 1,
      typeName: '缺陷清单',
      icon: 'https://kui.kingdee.com/assets/image/application.png',
      subTitle: '系統管理',
      cloud: '开发演示云',
    },
    {
      title: '基础资料',
      id: 2,
      typeName: '应用菜单',
      icon: 'https://kui.kingdee.com/assets/image/application.png',
      subTitle: '集成管理',
      cloud: '开发演示云',
    },
  ]

  const displayList = { subTitle: '所属应用', cloud: '所属云' }

  const onPanelChange = (val) => {
    console.log(val)
    setPanelSearchLoading(true)
    setTimeout(() => {
      setPanelResult(result)
      setPanelSearchLoading(false)
    }, 1000)
  }

  const onPanelSelect = (val) => {
    console.log(val)
  }

  const onPanelSearch = (val) => {
    console.log(val)
  }

  const imgSrc =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA0NTQzNzA4MTc0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzMjY5IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc4NS45IDQ1MS4ydjYwLjljMCA3MC4xLTIzLjQgMTMxLTcwLjEgMTgyLjgtNDYuOCA1MS45LTEwNC42IDgxLjYtMTczLjQgODkuMXY2Mi43aDEyMS43YzguMiAwIDE1LjQgMyAyMS40IDlzOSAxMy4xIDkgMjEuNGMwIDguMi0zIDE1LjQtOSAyMS40cy0xMy4yIDktMjEuNCA5SDM1OS44Yy04LjIgMC0xNS40LTMtMjEuNC05cy05LTEzLjItOS0yMS40IDMtMTUuNCA5LTIxLjQgMTMuMS05IDIxLjQtOWgxMjEuN1Y3ODRjLTY4LjgtNy42LTEyNi42LTM3LjMtMTczLjMtODkuMi00Ni44LTUxLjgtNzAuMS0xMTIuOC03MC4xLTE4Mi45VjQ1MWMwLTguMiAzLTE1LjQgOS0yMS40czEzLjEtOSAyMS40LTljOC4yIDAgMTUuNCAzIDIxLjQgOXM5IDEzLjIgOSAyMS40djYwLjljMCA1OC42IDIwLjggMTA4LjggNjIuNSAxNTAuNVM0NTMuMiA3MjUgNTExLjkgNzI1YzU4LjYgMCAxMDguOC0yMC44IDE1MC41LTYyLjVDNzA0LjIgNjIwLjggNzI1IDU3MC44IDcyNSA1MTJ2LTYwLjljMC04LjIgMy0xNS40IDktMjEuNHMxMy4xLTkgMjEuNC05YzguMiAwIDE1LjQgMyAyMS40IDkgNi4xIDYuMSA5LjEgMTMuMiA5LjEgMjEuNXpNNjY0LjIgMjY4LjZWNTEyYzAgNDEuOC0xNC45IDc3LjctNDQuNyAxMDcuNXMtNjUuNiA0NC43LTEwNy41IDQ0LjctNzcuNy0xNC45LTEwNy41LTQ0LjdTMzU5LjggNTU0IDM1OS44IDUxMlYyNjguNmMwLTQxLjggMTQuOS03Ny43IDQ0LjctMTA3LjUgMjkuOC0yOS44IDY1LjYtNDQuNyAxMDcuNS00NC43czc3LjcgMTQuOSAxMDcuNSA0NC43YzI5LjcgMjkuOCA0NC43IDY1LjYgNDQuNyAxMDcuNXoiIHAtaWQ9IjEzMjcwIiBmaWxsPSIjQTdCNUQzIj48L3BhdGg+PC9zdmc+'

  const displayImg = <Image preview={false} src="http://ikd.kingdee.com/kdrive/user/file?file_id=208233233" />
  return (
    <>
      <Search
        type="panel"
        placeholder="请搜索应用名称"
        suffix={<Image style={{ width: 21 }} src={imgSrc} preview={false} />}
        panelSearch={{
          onPanelSearch,
          panelTypes,
          panelResult,
          onPanelSelect,
          onPanelChange,
          panelSearchLoading,
          displayList,
          displayImg,
        }}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
