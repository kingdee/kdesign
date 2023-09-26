---
category: Components
type: 表单
title: CityPicker
subtitle: 城市选择
order: 3
---

城市选择是一种选择城市的组件。

## 使用场景

需要选择城市时。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false | 1.7.20 |
| borderType | 边框类型 | `underline` `bordered` `none` | `underline` | 1.7.20 |
| clearIcon | 自定义的清空图标 | ReactNode | - | 1.7.20 |
| commonList | 常用城市列表数据 | [City](#City)\[] | - | 1.7.20 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false | 1.7.20 |
| defaultValue | 指定默认选中的条目 | string \| string\[]<br />number \| number\[] | - | 1.7.20 |
| disabled | 是否禁用 | boolean | false | 1.7.20 |
| domesticList | 国内城市列表数据 | [City](#City)\[] | - | 1.7.20 |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - | 1.7.20 |
| description | 描述内容 | ReactNode | - | 1.7.20 |
| foreignList | 国际城市列表数据 | [City](#City)\[] | - | 1.7.20 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 1.7.20 |
| itemRender | 自定义下拉列表项 | (city: [City](#City)) => React.ReactNode | - | 1.7.20 |
| loading | 加载中状态 | boolean | false | 1.7.20 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` | 1.7.20 |
| placeholder | 选择框默认文字 | string | - | 1.7.20 |
| showArrow | 是否显示下拉小箭头 | boolean | true | 1.7.20 |
| showDescription | 是否显示描述内容 | boolean | true | 1.7.20 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.7.20 |
| type | 城市选择组件类型 | `domestic`、`foreign` | `domestic` | 1.7.20 |
| value | 指定当前选中的条目 | string \| number \| [City](#City) | - | 1.7.20 |
| optionHighlightProps | 搜索时根据该属性值高亮城市名 | string | `highlightText` | 1.7.20 |
| onBlur | 失去焦点时回调 | function | - | 1.7.20 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value: string \| number, city: [City](#City)) | - | 1.7.20 |
| onClear | 清除内容时回调 | function | - | 1.7.20 |
| onFocus | 获得焦点时回调 | function | - | 1.7.20 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 1.7.20 |
| onTabPaneChange | 切换页签时的回调 | function(value: string) | - | 1.7.24 |
| onVisibleChange | 显示隐藏的回调 | (id: string) => void | - | 1.7.20 |

### City

| 属性          | 说明                      | 类型                | 默认值 | 可选值               | 版本   |
| ------------- | ------------------------- | ------------------- | ------ | -------------------- | ------ |
| id            | 城市 Id                   | string \| number    | -      | -                    | 1.7.20 |
| country       | 国家                      | string              | -      | -                    | 1.7.20 |
| highlightText | 高亮下拉面板中的城市名    | string \| string\[] | -      | -                    | 1.7.20 |
| province      | 省份                      | string              | -      | -                    | 1.7.20 |
| name          | 城市名                    | string              | -      | -                    | 1.7.20 |
| type          | 当前城市类型（国内/国外） | string              | -      | `domestic` `foreign` | 1.7.20 |

## Design Token

| 分类        | 组件 token                                        | 全局 token                 | 默认值             |
| ----------- | ------------------------------------------------- | -------------------------- | ------------------ |
| color       | --kd-c-city-picker-dropdown-color-background      | --kd-g-color-background    | #fff               |
|             | --kd-c-city-picker-item-color-background-disabled | -                          | #fff               |
|             | --kd-c-city-picker-color-background               | -                          | #f5f5f5            |
|             | --kd-c-city-picker-color-background-selected      | --kd-g-color-theme-3       | rgb(227, 238, 255) |
|             | --kd-c-city-picker-color-border                   | --kd-g-color-input         | #999               |
|             | --kd-c-city-picker-color-border-foucs             | --kd-g-color-theme         | #5582f3            |
|             | --kd-c-city-picker-color-border-hover             | --kd-g-color-theme         | #5582f3            |
|             | --kd-c-city-picker-border-color-border            | --kd-g-color-border-strong | #d9d9d9            |
|             | --kd-c-city-picker-placeholder-color-text         | -                          | #b2b2b2            |
|             | --kd-c-city-picker-footer-color-text              | --kd-g-color-text-primary  | #212121            |
|             | --kd-c-city-picker-item-color-text-disabled       | --kd-g-color-disabled      | #b2b2b2            |
|             | --kd-c-city-picker-color-background-disabled      | -                          | #fff               |
|             | --kd-c-city-picker-color-text-disabled            | --kd-g-color-disabled      | #b2b2b2            |
|             | --kd-c-city-picker-arrow-icon-color-text-disabled | -                          | #b2b2b2            |
|             | --kd-c-city-picker-icon-clear-color-text          | -                          | #666666            |
|             | --kd-c-city-picker-icon-clear-color-text-hover    | --kd-g-color-theme         | #5582f3            |
|             | --kd-c-city-picker-list-item-color-text-selected  | --kd-g-color-theme         | #5582f3            |
|             | --kd-c-city-picker-highlight-color-text           | --kd-g-color-theme         | #5582f3            |
| font        | --kd-c-city-picker-dropdown-font-size             | -                          | 12px               |
|             | --kd-c-city-picker-font-size-large                | -                          | 16px               |
|             | --kd-c-city-picker-font-size-middle               | -                          | 14px               |
|             | --kd-c-city-picker-font-size-small                | -                          | 12px               |
|             | --kd-c-city-picker-icon-clear-font-size           | -                          | 16px               |
| line-height | --kd-c-city-picker-dropdown-line-height           | -                          | 22px               |
|             | --kd-c-city-picker-line-height-large              | -                          | 28px               |
|             | --kd-c-city-picker-line-height-middle             | -                          | 22px               |
|             | --kd-c-city-picker-line-height-small              | -                          | 14px               |
| radius      | --kd-c-city-picker-radius-border                  | --kd-g-radius-border       | 2px                |
|             | --kd-c-city-picker-bordered-radius-border         | -                          | 2px                |
| sizing      | --kd-c-city-picker-item-sizing-height             | -                          | 22px               |
|             | --kd-c-city-picker-sizing-height-large            | -                          | 36px               |
|             | --kd-c-city-picker-sizing-height-middle           | -                          | 30px               |
|             | --kd-c-city-picker-sizing-height-small            | -                          | 24px               |
| spacing     | --kd-c-city-picker-bordered-spacing-padding-left  | -                          | 8px                |
|             | --kd-c-city-picker-wrapper-spacing-padding        | -                          | 1px 24px 1px 0     |
| z-index     | --kd-c-city-picker-z-index                        | --kd-g-z-index-popper      | 1050               |
