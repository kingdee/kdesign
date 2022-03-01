---
category: Components
type: 录入
title: BaseData
subtitle: 基础资料选择
order: 0
---
基础资料选择是一种从结构化数据列表中选择数据的组件，如：人员选择、组织选择等；包含 2 种类型：
- 单选基础资料选择
- 多选基础资料选择
## 使用场景

需要从结构化数据列表中选择数据时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| ---- | ---- | ---- | ------ | ------ | ---- |
| collectList | 收藏列表 | { label, value }[] | - | - | 1.0.0 |
| columns | 下拉列表的展示列 | { title, key }[] | - | - | 1.0.0 |
| dropdownFooterRender | 自定义下拉框footer内容 | ReactNode | - | - | 1.0.0 |
| disabled | 禁用状态 | boolean | `false` | `true` `false` | 1.0.0 |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - | - | 1.0.0 |
| historyList | 我的历史列表 | { label, value }[] | - | - | 1.0.0 |
| loading | 加载中状态 | boolean | `false` | `true` `false` | 1.0.0 |
| mode | 下拉框模式（设置单选或多选） | string | `single` | `single` `multiple` | 1.0.0 |
| onChange | 选中项改变时调用此函数 | (string \| number \| string[] \| number[], options: { label, value }[]) => void | - | - | 1.0.0 |
| onCollect | 点击收藏调用此函数 | (boolean, { label, value }) => void | - | - | 1.0.0 |
| onSearch | 输入框的value变化时调用 | (value: string) => void | - | - | 1.0.0 |
| onSelect | 选中下拉项时调用此函数 | (string \| number, option: { label, value }) => void | - | - | 1.0.0 |
| onShowDetail | 点击详情图标调用此函数 | ({ label, value }[]) => void | - | - | 1.0.0 |
| onShowMore | 点击后缀图标调用此函数 | () => void | - | - | 1.0.0 |
| optionLabelProp | 回填到选择框的 Option 的属性值 | string | `label` | - | 1.0.0 |
| options | 数据化配置选项内容 | { label, value }[] | - | - | 1.0.0 |
| placeholder | 选择框默认文本 | string | `请选择` | - | 1.0.0 |
| searchField | 搜索字段 | string | `all`（全部字段） | - | 1.0.0 |
| showCollectIcon | 是否显示收藏按钮 | boolean | `false` | `true` `false` | 1.0.0 |
| showDetailIcon | 是否显示详情按钮 | boolean | `false` | `true` `false` | 1.0.0 |
| showFrequent | 是否显示历史记录及我的收藏面板 | boolean | `false` | `true` `false` | 1.0.0 |
| size | 下拉列表显示数量 | number | 10 | - | 1.0.0 |
| value | 指定选中的条目 | { label, value }[] | - | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-base-data-color-border | - | #999 |
|  | --kd-c-base-data-color-background-hover | --kd-g-color-hover | #f5f5f5 |
|  | --kd-c-base-data-border-color-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-base-data-dropdown-radius-border | --kd-g-color-background | #fff |
|  | --kd-c-base-data-dropdown-icon-color-text | --kd-g-color-warning | #ff991c |
|  | --kd-c-base-data-dropdown-icon-color-text-hover | --kd-g-color-warning | #ff991c |
|  | --kd-c-base-data-dropdown-color-text-hover | --kd-g-color-warning | #ff991c |
|  | --kd-c-base-data-dropdown-search-icon-color-text | --kd-g-color-text-link-hover | #3987ed |
|  | --kd-c-base-data-footer-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-base-data-icon-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-base-data-footer-btn-color-text | --kd-g-color-text-link | #0e5fd8 |
| radius | --kd-c-base-data-dropdown-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-base-data-sizing-width | - | 230px |
|  | --kd-c-base-data-dropdown-sizing-height | - | 400px |
|  | --kd-c-base-data-dropdown-options-sizing-height | - | 32px |
| z-index | --kd-c-base-data-dropdown-z-index | --kd-g-z-index-popper | 1050 |
