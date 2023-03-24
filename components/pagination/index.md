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

| 参数               | 说明                                                                          | 类型                                         | 默认值 | 版本 |
|------------------|-----------------------------------------------------------------------------|--------------------------------------------| --- | --- |
| bordered         | 是否加边框                                                                       | boolean                                    | false |  |
| current          | 当前页码                                                                        | number                                     | - | 1.0.0 |
| defaultCurrent   | 默认当前页码                                                                      | number                                     | 1 | 1.0.0 |
| defaultPageSize  | 默认每页条码                                                                      | number                                     | 10 | 1.0.0 |
| disabled         | 禁用分页                                                                        | boolean                                    | - | 1.0.0 |
| dropdownProps    | `pageSize` 切换器属性                                                            | [DropdownProps](/components/dropdown/#API) | - | 1.0.0 |
| hideOnSinglePage | 只有一页时是否隐藏分页组件                                                               | boolean                                    | false | 1.0.0 |
| pageSize         | 每页条目数                                                                       | number                                     | - | 1.0.0 |
| pageSizeOptions  | `pageSize` 切换器的下拉列表                                                         | string\[]                                  | \[`10`, `20`, `50`, `100`] | 1.0.0 |
| pageType         | 分页类型，基础（basic)、单据(bill)、简化(simple)、较少(less)和精细(nicety)可选，默认是基础(basic)       | `basic` \                                  | `bill` \| `simple` \| `less` \| `nicety` | `basic` | 1.0.0 |
| showTotal        | 是否显示总计，默认为false, 当pageType为`basic`时，默认为`page`, 当pageType为`nicety`时，默认为`row` | boolean \                                  | `page` \| `row` \| `all` | false | 1.0.0 |
| showQuickJumper  | 是否可以快速跳转至某页，默认为true, 当pageType为`bill`时，默认为false                             | boolean                                    | true | 1.0.0 |
| showSizeChanger  | 是否展示 `pageSize` 切换器，当 `total` 大于 50 时默认为 true                               | boolean                                    | - | 1.0.0 |
| showTitle        | 是否显示原生 tooltip 页码                                                           | boolean                                    | true | 1.0.0 |
| total            | 数据总量                                                                        | number                                     | 0 | 1.0.0 |
| onChange         | 页码改变的回调，参数是改变后的页码及每页条目数                                                     | function(page, pageSize)                   | - | 1.0.0 |
| onShowSizeChange | pageSize 变化后的回调                                                             | function(current, size)                    | - | 1.0.0 |
| icons            | 替换图标                                                                        | IIcon                                  | {} | 1.0.0 |

### IIcon

| key      | 说明   |
|----------|------|
| first    | 第一页  |
| last     | 最后一页 |
| prev     | 前一页  |
| next     | 后一页  |
| jumpPrev | 向前多页 |
| jumpNext | 向后多页 |
| down     | 下拉   |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-pagination-text-color | --kd-g-color-text-secondary | #666 |
|  | --kd-c-pagination-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-pagination-button-color | --kd-g-color-text-secondary | #666 |
|  | --kd-c-pagination-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-pagination-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-pagination-color-border-hover | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-pagination-color-border-disabled | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-pagination-button-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
| font | --kd-c-pagination-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-pagination-icon-font-size | --kd-g-font-size-large | 16px |
| sizing | --kd-c-pagination-sizing-square | - | 24px |
|  | --kd-c-pagination-sizing-border-width | - | 1px |
| spacing | --kd-c-pagination-button-spacing | - | 4px |
|  | --kd-c-pagination-dropdown-item-spacing-padding-horizontal | - | 24px |
