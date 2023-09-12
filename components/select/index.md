---
category: Components
type: 表单
order: 12
title: Select
subtitle: 选择器
---

## 使用场景

页签

## API

### Select

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false | 1.0.0 |
| autoFocus | 默认获取焦点 | boolean | false | 1.0.0 |
| borderType | 边框类型 | `underline` `bordered` `none` | `underline` | 1.0.0 |
| clearIcon | 自定义的清空图标 | ReactNode | - | 1.0.0 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false | 1.0.0 |
| defaultValue | 指定默认选中的条目 | string \| string\[]<br />number \| number\[] | - | 1.0.0 |
| disabled | 是否禁用 | boolean | false | 1.0.0 |
| dropdownClassName | 下拉菜单的 className 属性 | string | - | 1.0.0 |
| dropdownRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - | 1.0.0 |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - | 1.0.0 |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | boolean \| function(inputValue, option) | true | 1.6.7 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 1.0.0 |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式 | boolean | false | 1.0.0 |
| listHeight | 设置弹窗滚动高度 | number | 256 | 1.0.0 |
| loading | 加载中状态 | boolean | false | 1.0.0 |
| maxTagCount | 最多显示多少个 tag | number | - | 1.0.0 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - | 1.0.0 |
| mode | 下拉框模式（设置单选或多选） | `single` `multiple` | `single` | 1.0.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` | 1.0.0 |
| optionFilterProp | 搜索时过滤对应的 option 属性 | string | label | 1.6.7 |
| optionLabelProp | 回填到选择框的 Option 的属性值 | string | options 存在时为 label,反之为 children | 1.6.7 |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - | 1.0.0 |
| placeholder | 选择框默认文字 | string | - | 1.0.0 |
| showArrow | 是否显示下拉小箭头 | boolean | true | 1.0.0 |
| showSearch | 是否展示搜索框 | boolean | 单选为 false，多选为 true | 1.0.0 |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` | 1.0.0 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.0.0 |
| value | 指定当前选中的条目 | string \| string\[]<br />number \| number\[] | - | 1.0.0 |
| virtualListProps | 传递虚拟滚动属性。 | boolean \| [AvailableVirtualListProps](#AvailableVirtualListProps) | false | 1.6.29 |
| onBlur | 失去焦点时回调 | function | - | 1.0.0 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value, option:Option \| Array&lt;Option>) | - | 1.0.0 |
| onClear | 清除内容时回调 | function | - | 1.0.0 |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple`模式下生效 | function(string \| number \| LabeledValue) | - | 1.0.0 |
| onDropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - | 1.0.0 |
| onFocus | 获得焦点时回调 | function | - | 1.0.0 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 1.0.0 |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(string \| number \| LabeledValue, option: Option) | - | 1.0.0 |
| onVisibleChange | 显示隐藏的回调 | (visible) => void | - | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### Option props

| 参数      | 说明                              | 类型             | 默认值 | 版本   |
| --------- | --------------------------------- | ---------------- | ------ | ------ |
| className | Option 器类名                     | string           | -      | 1.0.0 |
| disabled  | 是否禁用                          | boolean          | false  | 1.0.0 |
| title     | 选中该 Option 后，Select 的 title | string           | -      | 1.0.0 |
| value     | 默认根据此属性值进行筛选          | string \| number | -      | 1.0.0 |

### AvailableVirtualListProps

| 参数       | 说明                                                   | 类型             | 默认值 | 版本   |
| ---------- | ------------------------------------------------------ | ---------------- | ------ | ------ |
| height     | 可视区域高度                                           | string \| number | 300    | 1.6.29 |
| threshold  | 启用虚拟滚动的元素数量的阈值，使用' null '或数据小于阈值不启用虚拟滚动 | number           | 100    | 1.6.29 |

### InputInstance

| 参数 | 说明 | 类型 | 版本 |
| --- | --- | --- |--------|
| blur | 取消焦点 | - | 1.7.22 |
| focus | 获取焦点 | - | 1.7.22 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-select-dropdown-color-background | --kd-g-color-background | #fff |
|  | --kd-c-select-item-color-background-disabled | - | #fff |
|  | --kd-c-select-color-background | - | #f5f5f5 |
|  | --kd-c-select-color-background-selected | --kd-g-color-theme-3 | rgb(227, 238, 255) |
|  | --kd-c-select-color-border | --kd-g-color-input | #999 |
|  | --kd-c-select-color-border-foucs | --kd-g-color-theme | #5582f3 |
|  | --kd-c-select-color-border-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-select-border-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-select-placeholder-color-text | - | #b2b2b2 |
|  | --kd-c-select-item-color-text-selected | --kd-g-color-theme | #5582f3 |
|  | --kd-c-select-footer-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-select-footer-color-text-selected | - | #0e5fd8 |
|  | --kd-c-select-item-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-select-color-background-disabled | - | #f5f5f5 |
|  | --kd-c-select-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-select-arrow-icon-color-text-disabled | - | #b2b2b2 |
|  | --kd-c-select-single-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-select-icon-clear-color-text | - | #d9d9d9 |
|  | --kd-c-select-icon-clear-color-text-hover | - | #999 |
| font | --kd-c-select-dropdown-font-size | - | 12px |
|  | --kd-c-select-font-size-large | - | 16px |
|  | --kd-c-select-font-size-middle | - | 14px |
|  | --kd-c-select-font-size-small | - | 12px |
| line-height | --kd-c-select-dropdown-line-height | - | 22px |
|  | --kd-c-select-line-height-large | - | 28px |
|  | --kd-c-select-line-height-middle | - | 22px |
|  | --kd-c-select-line-height-small | - | 14px |
| radius | --kd-c-select-radius-border | --kd-g-radius-border | 2px |
|  | --kd-c-select-bordered-radius-border | - | 2px |
| sizing | --kd-c-select-item-sizing-height | - | 22px |
|  | --kd-c-select-sizing-height-large | - | 36px |
|  | --kd-c-select-sizing-height-middle | - | 30px |
|  | --kd-c-select-sizing-height-small | - | 24px |
|  | --kd-c-select-item-sizing-max-width | - | - |
| spacing | --kd-c-select-bordered-spacing-padding-left | - | 8px |
|  | --kd-c-select-wrapper-spacing-padding | - | 1px 28px 1px 0 |
|  | --kd-c-select-dropdown-spacing-padding-vertical | - | 8px |
| z-index | --kd-c-select-z-index | --kd-g-z-index-popper | 1050 |
