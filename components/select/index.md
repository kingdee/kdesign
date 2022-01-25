---
category: Components
type: 录入
order: 12
title: Select
subtitle: 选择器
---

## 使用场景

页签

## API

### Select

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false | 0.0.17 |
| autoFocus | 默认获取焦点 | boolean | false | 0.0.17 |
| autoWrap | 已选项是否自动换行，为false时在一行内显示，超出隐藏 | boolean | false | 0.0.17 |
| borderType | 边框类型 | `underline` `bordered` `none` | `underline` | 0.0.17 |
| clearIcon | 自定义的清空图标 | ReactNode | - | 0.0.17 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false | 0.0.17 |
| defaultValue | 指定默认选中的条目 | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | - | 0.0.17 |
| disabled | 是否禁用 | boolean | false | 0.0.17 |
| dropdownClassName | 下拉菜单的 className 属性 | string | - | 0.0.17 |
| dropdownRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - | 0.0.17 |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - | 0.0.17 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 0.0.17 |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式 | boolean | false | 0.0.17 |
| listHeight | 设置弹窗滚动高度 | number | 256 | 0.0.17 |
| loading | 加载中状态 | boolean | false | 0.0.17 |
| maxTagCount | 最多显示多少个 tag | number | - | 0.0.17 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - | 0.0.17 |
| mode | 下拉框模式（设置单选或多选） | `single` `multiple` | `single` | 0.0.17 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` | 0.0.17 |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - | 0.0.17 |
| placeholder | 选择框默认文字 | string | - | 0.0.17 |
| showArrow | 是否显示下拉小箭头 | boolean | 单选为 true，多选为 false | 0.0.17 |
| showSearch | 是否展示搜索框 | boolean | false | 0.0.17 |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` | 0.0.17 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 0.0.17 |
| value | 指定当前选中的条目 | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | - | 0.0.17 |
| onBlur | 失去焦点时回调 | function | - | 0.0.17 |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value, option:Option \| Array&lt;Option>) | - | 0.0.17 |
| onClear | 清除内容时回调 | function | - | 0.0.17 |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple`模式下生效 | function(string \| number \| LabeledValue) | - | 0.0.17 |
| onDropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - | 0.0.17 |
| onFocus | 获得焦点时回调 | function | - | 0.0.17 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 0.0.17 |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(string \| number \| LabeledValue, option: Option) | - | 0.0.17 |
| onVisibleChange | 显示隐藏的回调 | (visible) => void | - | 0.0.17 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### Option props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | Option 器类名 | string | - | 0.0.17 |
| disabled | 是否禁用 | boolean | false | 0.0.17 |
| title | 选中该 Option 后，Select 的 title | string | - | 0.0.17 |
| value | 默认根据此属性值进行筛选 | string \| number | - | 0.0.17 |