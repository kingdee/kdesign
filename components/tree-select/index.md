---
category: Components
type: 表单
title: TreeSelect
subtitle: 树选择器
---

## 使用场景

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false | 1.7.0 |
| autoFocus | 默认获取焦点 | boolean | false | 1.7.0 |
| borderType | 边框类型 | `underline` `bordered` `none` | `underline` | 1.7.0 |
| clearIcon | 自定义的清空图标 | ReactNode | - | 1.7.0 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false | 1.7.0 |
| defaultValue | 指定默认选中的条目 | string \| string\[]<br />number \| number\[] | - | 1.7.0 |
| disabled | 是否禁用 | boolean | false | 1.7.0 |
| dropdownClassName | 下拉菜单的 className 属性 | string | - | 1.7.0 |
| dropdownRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - | 1.7.9 |
| dropdownStyle | 下拉菜单的 style 属性 | CSSProperties | - | 1.7.0 |
| filterTreeNode | 根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | function(treeNode: TreeNode, inputValue: string) (函数需要返回 bool 值) | - | 1.7.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 1.7.0 |
| listHeight | 设置弹窗最大滚动高度 | number | - | 1.7.21 |
| maxTagCount | 最多显示多少个 tag | number | - | 1.7.0 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - | 1.7.0 |
| mode | 下拉框模式（设置单选或多选） | `single` `multiple` | `single` | 1.7.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `暂无数据` | 1.7.0 |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | string | title | 1.7.0 |
| treeNodeLabelProp | 作为显示的 prop 设置 | string | title | 1.7.0 |
| placeholder | 选择框默认文字 | string | - | 1.7.0 |
| showArrow | 是否显示下拉小箭头 | boolean | true | 1.7.0 |
| showSearch | 是否展示搜索框 | boolean | true | 1.7.0 |
| showTreeIcon | 是否展示节点图标 | boolean | false | 1.7.0 |
| virtual | 是否开启虚滚动 | boolean | `true` | `true` `false` | 1.7.0 |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` | 1.7.0 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.7.0 |
| switcherIcon | 自定义树节点的折叠/展开图标 | ReactNode \| [ReactNode, ReactNode] | - | 1.7.0 |
| tagRender | 自定义 tag 内容，多选时生效 | (props) => ReactNode | - | 1.7.0 |
| treeCheckStrictly | checkable 状态下节点选择是否完全受控 | boolean | `false` | 1.7.0 |
| treeData | treeNodes 数据 | array<{value, title, children, [disabled, selectable, checkable]}> | - | 1.7.0 |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false | 1.7.0 |
| treeExpandedKeys | 设置展开的树节点 | string[] | - | 1.7.0 |
| treeExpandOnClickNode | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，只有点箭头图标的时候才会展开或者收缩节点 | boolean | `false` | `true` `false` | 1.7.0 |
| treeIcon | 自定义树节点图标 | ReactNode \| (props) => ReactNode | - | 1.7.0 |
| treeLoadData | 异步加载数据 | function(node) | - | 1.7.0 |
| value | 指定当前选中的条目 | string \| string\[] | - | 1.7.0 |
| onBlur | 失去焦点时回调 | function | - | 1.7.0 |
| onChange | 选中树节点时调用此函数 | function(key, node) | - | 1.7.0 |
| onClear | 清除内容时回调 | function | - | 1.7.0 |
| onFocus | 获得焦点时回调 | function | - | 1.7.0 |
| onlyExpandOnClickIcon | 是否通过点击图标进行展开收起 | boolean | - | 1.7.16 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 1.7.0 |
| onSelect | 被选中时调用 | function(value, {checked: bool, node, event}) | - | 1.7.0 |
| onTreeExpand | 展示节点时调用 | function(expandedKeys, {event, node}) | - | 1.7.0 |
| onVisibleChange | 显示隐藏的回调 | (visible) => void | - | 1.7.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-tree-select-dropdown-color-background | --kd-g-color-background | #fff |
|  | --kd-c-tree-select-item-color-background-disabled | - | #fff |
|  | --kd-c-tree-select-color-background | - | #f5f5f5 |
|  | --kd-c-tree-select-color-background-selected | --kd-g-color-theme-3 | rgb(227, 238, 255) |
|  | --kd-c-tree-select-color-border | --kd-g-color-input | #999 |
|  | --kd-c-tree-select-color-border-foucs | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tree-select-color-border-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tree-select-border-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-tree-select-placeholder-color-text | - | #b2b2b2 |
|  | --kd-c-tree-select-item-color-text-selected | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tree-select-footer-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-tree-select-footer-color-text-selected | - | #0e5fd8 |
|  | --kd-c-tree-select-item-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-tree-select-color-background-disabled | - | #f5f5f5 |
|  | --kd-c-tree-select-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-tree-select-arrow-icon-color-text-disabled | - | #b2b2b2 |
|  | --kd-c-tree-select-single-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-tree-select-icon-clear-color-text | - | #d9d9d9 |
|  | --kd-c-tree-select-icon-clear-color-text-hover | - | #999 |
| font | --kd-c-tree-select-dropdown-font-size | - | 12px |
|  | --kd-c-tree-select-font-size-large | - | 16px |
|  | --kd-c-tree-select-font-size-middle | - | 14px |
|  | --kd-c-tree-select-font-size-small | - | 12px |
| line-height | --kd-c-tree-select-dropdown-line-height | - | 22px |
|  | --kd-c-tree-select-line-height-large | - | 28px |
|  | --kd-c-tree-select-line-height-middle | - | 22px |
|  | --kd-c-tree-select-line-height-small | - | 14px |
| radius | --kd-c-tree-select-radius-border | --kd-g-radius-border | 2px |
|  | --kd-c-tree-select-bordered-radius-border | - | 2px |
| sizing | --kd-c-tree-select-item-sizing-height | - | 22px |
|  | --kd-c-tree-select-sizing-height-large | - | 36px |
|  | --kd-c-tree-select-sizing-height-middle | - | 32px |
|  | --kd-c-tree-select-sizing-height-small | - | 24px |
| spacing | --kd-c-tree-select-bordered-spacing-padding-left | - | 8px |
|  | --kd-c-tree-select-wrapper-spacing-padding | - | 1px 28px 1px 0 |
|  | --kd-c-tree-select-dropdown-node-spacing-padding-horizontal | - | 16px |
|  | --kd-c-tree-select-dropdown-spacing-padding-vertical | - | 8px |
| z-index | --kd-c-tree-select-z-index | --kd-g-z-index-popper | 1050 |
