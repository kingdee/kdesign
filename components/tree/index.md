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
| expandOnClickNode | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | `true` | `true` `false` | 1.5.5 |
| filterTreeNode | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | function(node) | - | - | 1.5.3 |
| filterValue | 节点过滤关键字 | string | - | - | 1.5.3 |
| height | 设置虚拟滚动容器高度 | number | - | - | 1.0.0 |
| icon | 自定义树节点图标 | ReactNode \| (props) => ReactNode | - | - | 1.0.0 |
| loadData | 异步加载数据 | function(node) | - | 1.5.5 |
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
| onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys, dropPosition: -1 \| 0 \| 1}) | - | - | 1.0.0 |
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

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-tree-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-tree-node-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-tree-node-color-border-disabled | --kd-g-color-border-disabled | #ccc |
|  | --kd-c-tree-color-theme | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tree-node-color-backgroung-checked | --kd-g-color-theme-3 | rgb(227, 238, 255) |
|  | --kd-c-tree-node-color-text-checked | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tree-node-color-backgroung-hover | --kd-g-color-hover | #f5f5f5 |
|  | --kd-c-tree-node-icon-color-text | - | #666666 |
|  | --kd-c-tree-node-drag-over-color-border | - | #5582f3 |
|  | --kd-c-tree-node-drag-over-color-background | - | #E3EBFF |
|  | --kd-c-tree-node-drag-line-color-background | - | #276FF5 |
| font | --kd-c-tree-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-tree-node-icon-font-size | - | 16px |
| motion | --kd-c-tree-motion-duration | --kd-g-duration | 0.3s |
| sizing | --kd-c-tree-expand-icon-sizing-height | - | 16px |
|  | --kd-c-tree-expand-icon-sizing-width | - | 16px |
|  | --kd-c-tree-expand-icon-loading-sizing-height | - | 16px |
|  | --kd-c-tree-expand-icon-loading-sizing-width | - | 16px |
|  | --kd-c-tree-node-icon-sizing-height | - | 16px |
|  | --kd-c-tree-node-icon-sizing-width | - | 16px |
|  | --kd-c-tree-root-sizing-max-width | - | - |
|  | --kd-c-tree-root-sizing-min-width | - | - |
| spacing | --kd-c-tree-spacing-margin-left | - | 0px |
|  | --kd-c-tree-spacing-padding-vertical | - | 3px |
