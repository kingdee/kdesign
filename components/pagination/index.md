---
category: Components
type: 基础
order: 3
title: Pagination
subtitle: 分页

---

分页是一种分隔列表数据的组件

## 使用场景
列表数据量较多时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否加边框 | boolean | false |  |
| current | 当前页码 | number | - | 1.0.0 |
| defaultCurrent | 默认当前页码 | number | 1 | 1.0.0 |
| defaultPageSize | 默认每页条码 | number | 10 | 1.0.0 |
| disabled | 禁用分页 | boolean | - | 1.0.0 |
| dropdownProps | `pageSize` 切换器属性 | [DropdownProps](/components/dropdown/#API) | - | 1.0.0 |
| hideOnSinglePage | 只有一页时是否隐藏分页组件 | boolean | false | 1.0.0 |
| pageSize | 每页条目数 | number | - | 1.0.0 |
| pageSizeOptions | `pageSize` 切换器的下拉列表 | string\[] | \[`10`, `20`, `50`, `100`] | 1.0.0 |
| pageType | 分页类型，基础（basic)、单据(bill)、简化(simple)、较少(less)和精细(nicety)可选，默认是基础(basic) | `basic` \| `bill` \| `simple` \| `less` \| `nicety` | `basic` | 1.0.0 |
| showQuickJumper | 是否可以快速跳转至某页，默认为true, 当pageType为`bill`时，默认为false | boolean | true | 1.0.0 |
| showSizeChanger | 是否展示 `pageSize` 切换器，当 `total` 大于 50 时默认为 true | boolean | - | 1.0.0 |
| showTitle | 是否显示原生 tooltip 页码 | boolean | true | 1.0.0 |
| total | 数据总量 | number | 0 | 1.0.0 |
| onChange | 页码改变的回调，参数是改变后的页码及每页条目数 | function(page, pageSize) | - | 1.0.0 |
| onShowSizeChange | pageSize 变化后的回调 | function(current, size) | - | 1.0.0 |
