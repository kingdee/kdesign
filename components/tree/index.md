---
category: Components
type: 导航
order: 6
title: Tree
subtitle: 树控件
---

树是一种可以展示多个层级，且具有收起展开功能的组件。

## 使用场景

需要查看大量、具有层级关系的数据时。

## API 
### Tree props

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| checkable | 是否可选，为 true 时会在节点前添加复选框 | boolean | `false` | `true` `false` | 1.0.0 |
| checkedKeys | （受控）已选树节点 | string[] | - | - | 1.0.0 |
| checkStrictly | checkable 状态下节点选择是否完全受控 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultExpandAll | 默认展开所有节点 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultExpandedKeys | 默认展开指定的树节点 | string[] | - | - | 1.0.0 |
| defaultExpandParent | 默认展开父节点 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultExpandRoot | 默认展开根节点 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultSelectedKeys | 默认选中的树节点 | string[] | [] | - | 1.0.0 |
| disabled | 禁用树，开启后所有节点将不能选中和拖拽 | boolean | `false` | `true` `false` | 1.0.0 |
| draggable | 设置节点可拖拽 | boolean | `false` | `true` `false` | 1.0.0 |
| expandedKeys | （受控）展开指定的树节点 | string[] | - | - | 1.0.0 |
| height | 设置虚拟滚动容器高度 | number | - | - | 1.0.0 |
| icon | 自定义树节点图标 | ReactNode \| (props) => ReactNode | - | - | 1.0.0 |
| scrollToKey | 滚动到某个树节点 | string | - | - | 1.0.0 |
| selectedKeys | （受控）设置选中的树节点 | string[] | - | - | 1.0.0 |
| showIcon | 是否展示节点图标 | boolean | `false` | `true` `false` | 1.0.0 |
| switcherIcon | 自定义树节点的折叠/展开图标 | ReactNode \| \[ReactNode, ReactNode\] | - | - | 1.0.0 |
| treeData | 树节点数据 | array<{key, title, children, [disabled, selectable]}> | - | - | 1.0.0 |
| virtual | 是否开启虚滚动 | boolean | `true` | `true` `false` | 1.0.0 |
| onCheck | 点击复选框触发的回调 | function(checkerKeys, {checked: bool, node, event, halfCheckedKeys}) | - | - | 1.0.0 |
| onDragEnd | dragend 触发时调用 | function({event, node}) | - | - | 1.0.0 |
| onDragEnter | dragenter 触发时调用 | function({event, node}) | - | - | 1.0.0 |
| onDragLeave | dragleave 触发时调用 | function({event, node}) | - | - | 1.0.0 |
| onDragOver | dragover 触发时调用 | function({event, node}) | - | - | 1.0.0 |
| onDragStart | 开始拖拽时调用的回调 | function({event, node}) | - | - | 1.0.0 |
| onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys}) | - | - | 1.0.0 |
| onExpand | 展开/收起节点时触发的回调 | function(expandedKeys, {expanded: bool, node}) | - | - | 1.0.0 |
| onSelect | 点击树节点触发 | function(selectedKeys, {checked: bool, node, event}) | - | - | 1.0.0 |
| setTreeNodeStyle | 渲染树节点触发 | (node) => Map<string, string> | - | - | 1.0.0 |
| setTreeNodeClassName | 渲染树节点触发 | (node) => String | - | - | 1.0.0 |
| estimatedItemSize | 树节点高度 | number | 28 | - | 1.0.0 |

### TreeNode props

| 属性         | 说明                      | 类型                              | 默认值  | 可选值         | 版本   |
| ------------ | ------------------------- | --------------------------------- | ------- | -------------- | ------ |
| checkable    | 节点是否展示 Checkbox     | boolean                           | `false` | `true` `false` | 1.0.0 |
| disabled     | 禁用                      | boolean                           | `false` | `true` `false` | 1.0.0 |
| icon         | 自定义树节点图标          | ReactNode \| (props) => ReactNode | -       | -              | 1.0.0 |
| key          | 用于标识节点的唯一 key 值 | string                            | -       | -              | 1.0.0 |
| selectable   | 节点是否可被选中          | boolean                           | `true`  | `true` `false` | 1.0.0 |
| switcherIcon | 自定义节点展开/收起图标   | ReactNode \| (props) => ReactNode | -       | -              | 1.0.0 |
| title        | 标题                      | ReactNode                         | -       | -              | 1.0.0 |
| style | 树节点样式 | Map<string, string> | - | - | 1.0.0 |
| className | 树节点样式名 | String | - | - | 1.0.0 |
