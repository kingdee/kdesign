---
category: Components
type: 录入
order: 15
title: Transfer
subtitle: 穿梭框
---
穿梭框是一种将两组数据进行互换的组件。
## 何时使用

- 穿梭模式：当两组互斥的数据需要进行数据转移时。
- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

<br />
穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。
<br />
选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反映了这两个概念

## API

### Transfer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外 | TransferItem: \{ key: string; title?: string; description?: string; disabled?: boolean; [name: string]: any \}\[] | \[] | 1.0.0 |
| disabled | 是否禁用 | boolean | false | 1.0.0 |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | (inputValue, option): boolean | - | 1.0.0 |
| footer | 底部渲染函数 | (props) => ReactNode | - | |
| listStyle | 两个穿梭框的自定义样式 | object\|({direction: `left` \| `right`}) => object | - | 1.0.0 |
| noDataContent | 两个穿梭框无数据时候的展示 | ReactNode\|({direction: `left` \| `right`}) => ReactNode | 暂无数据 | 1.0.0 |
| oneWay | 展示为单向样式 | boolean | false | 1.0.0 |
| operations | 操作文案集合，顺序从上至下 | string\[] | \[`>`, `<`] | 1.0.0 |
| pagination | 使用分页样式，自定义渲染列表下无效 | boolean \| { pageSize: number } | false | 1.0.0 |
| render | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 `label` 字段为 ReactElement，`value` 字段为 title | (record) => ReactNode | - | 1.0.0 |
| selectedKeys | 设置哪些项应该被选中 | string\[] | \[] | 1.0.0 |
| showSearch | 是否显示搜索框 | boolean | false | 1.0.0 |
| showSelectAll | 是否展示全选勾选框 | boolean | true | 1.0.0 |
| targetKeys | 显示在右侧框数据的 key 集合 | string\[] | \[] | 1.0.0 |
| titles | 标题集合，顺序从左至右 | string\[] | \[`可选列表`, `已选列表`] | 1.0.0 |
| onChange | 选项在两栏之间转移时的回调函数 | (targetKeys, direction, moveKeys): void | - | 1.0.0 |
| onSearch | 搜索框内容时改变时的回调函数 | (direction: `left` \| `right`, value: string): void | - | 1.0.0 |
| onSelectChange | 选中项发生改变时的回调函数 | (sourceSelectedKeys, targetSelectedKeys): void | - | 1.0.0 |