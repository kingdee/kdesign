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
| foreignList | 国际城市列表数据 | [City](#City)\[] | - | 1.7.20 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 1.7.20 |
| itemRender | 自定义下拉列表项 | (city: [City](#City)) => React.ReactNode | - | 1.7.20 |
| loading | 加载中状态 | boolean | false | 1.7.20 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` | 1.7.20 |
| placeholder | 选择框默认文字 | string | - | 1.7.20 |
| showArrow | 是否显示下拉小箭头 | boolean | true | 1.7.20 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.7.20 |
| type | 城市选择组件类型 | `domestic`、`foreign` | `domestic` | 1.7.20 |
| value | 指定当前选中的条目 | string \| number | - | 1.7.20 |
| optionHighlightProps | 搜索时根据该属性值高亮城市名 | string | `highlightText` | 1.7.20 |
| onBlur | 失去焦点时回调 | function | - | 1.7.20 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value: string \| number, city: [City](#City)) | - | 1.7.20 |
| onClear | 清除内容时回调 | function | - | 1.7.20 |
| onFocus | 获得焦点时回调 | function | - | 1.7.20 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 1.7.20 |
| onVisibleChange | 显示隐藏的回调 | (visible) => void | - | 1.7.20 |

### City

| 属性          | 说明                   | 类型                | 默认值 | 可选值 | 版本   |
| ------------- | ---------------------- | ------------------- | ------ | ------ | ------ |
| id            | 城市 Id                | string \| number    | -      | -      | 1.7.20 |
| country       | 国家                   | string              | -      | -      | 1.7.20 |
| highlightText | 高亮下拉面板中的城市名 | string \| string\[] | -      | -      | 1.7.20 |
| province      | 省份                   | string              | -      | -      | 1.7.20 |
| name          | 城市名                 | string              | -      | -      | 1.7.20 |
