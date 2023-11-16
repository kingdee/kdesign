---
category: Components
type: 数据展示
order: 11
title: Table
subtitle: 表格
---
## 使用场景
1. 当有大量的结构化的数据需要展现或对比时
2. 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时

## 如何使用
指定表格的数据源 `dataSource` 和列的定义 `columns` ，二者均为一个数组。

```javascript
  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200 },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' }
  ]

return <Table dataSource={dataSource} columns={columns} />
```

> 注意: 表格一般需要确定的宽高，如果未设置确定的宽高，则表格会根据内容以及父容器的宽高去自适应宽高

## API

### Table
表格配置项

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| useOuterBorder | 是否带边框 | boolean | `true` | `true` `false` | 1.0.0 |
| columns | 表格列的配置描述，具体项见下表 | ArtColumn[] | - | - | 1.0.0 |
| dataSource | 数据数组 | any[] | - | - | 1.0.0 |
| isLoading | 表格是否在加载中 | boolean | `false` | `true` `false` | 1.0.0 |
| style | 自定义内联样式 | CSSProperties | `-` | `-` | 1.0.0 |
| primaryKey | 用于指定每一行的 key，传入字符串表示从数据中获取对应字段的值作为 key，传入函数时将调用该函数来生成每一行的 key，不传该 prop 时，表格将使用下标作为每一行的 key | string \| (row) => string | - | - | 1.0.0 |
| hasHeader | 表格是否具有头部 | boolean | `true` | `true` `false` | 1.0.0 |
| emptyCellHeight | 数据为空时，单元格的高度 | number | - | - | 1.0.0 |
| useVirtual | 是否开启虚拟滚动 | boolean auto | `auto` | `true` `false` `auto` | 1.0.0 |
| estimatedRowHeight | 虚拟滚动开启情况下，表格中每一行的预估高度 | number | `48` | - | 1.0.0 |
| rowSelection | 行选中配置 | [rowSelection](#rowSelection) | `-` | - | 1.0.0 |
| filter | 过滤配置 | [filter](#filter) | - | - | 1.0.0 |
| sort | 排序配置 | [sort](#sort) | - | - | 1.0.0 |
| rowDetail | 详情行功能配置 | [rowDetail](#rowDetail) | - | - | 1.0.0 |
| treeMode | 树形数据展示配置 | [treeMode](#treeMode) | - | - | 1.0.0 |
| columnDrag | 拖动表头来调整列的位置配置 | [columnDrag](#columnDrag) | - | - | 1.0.0 |
| columnResize | 手动调整列宽的大小配置 | [columnResize](#columnResize) | - | - | 1.0.0 |
| rangeSelection | 范围选中功能配置 | [rangeSelection](#rangeSelection) | - | - | 1.0.0 |
| components | 表格内部组件替换 |  [组件替换](#组件替换) | - | - | 1.0.0 |
| getRowProps | 更新每一行的props | (record: any, rowIndex: number) => {}  | - | - | 1.0.0 |
<br/>


### Column
列配置项

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| name | 列的名称 | string | - | - | 1.0.0 |
| code | 在数据中的字段 | string | - | - | 1.0.0 |
| title | 列标题的展示名称；在页面中进行展示时，该字段将覆盖 name 字段 | ReactNode | - | - | 1.0.0 |
| width | 列的宽度，如果该列是锁定的，则宽度为必传项 | number | - | - | 1.0.0 |
| align | 单元格中的文本或内容的 对其方向 | string | `-` | `left` `center` `right` | 1.0.0 |
| verticalAlign | 单元格中的文本或内容的 垂直水平轴对其方向 | string | `middle` | `top` `bottom` `middle` | 1.0.0 |
| hidden | 是否隐藏(已经过时，如果需要隐藏该列，请传入时将其从 columns 数组中移除) | boolean | `false` | `true` `false` | 1.0.0 |
| lock | 是否锁列 | boolean | - | `HTMLTableCellElement` | 1.0.0 |
| headerCellProps | 表头单元格的 props | number | - | - | 1.0.0 |
| features | 功能开关, 具体项见下表 | { [key: string]: any } | - | - | 1.0.0 |
| estimatedRowHeight | 虚拟滚动开启情况下，表格中每一行的预估高度 | number | `48` | - | 1.0.0 |
| getValue | 自定义取数方法	| (record: any, rowIndex: number) => any | - | - | 1.0.0 |
| render | 自定义渲染方法 | (value: any, record: any, rowIndex: number) => ReactNode | - | - | 1.0.0 |
| getCellProps | 自定义的获取单元格 props 的方法 | (value: any, record: any, rowIndex: number) => any | - | - | 1.0.0 |
<br/>

### column.features
列功能配置项

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| sortable | 是否开启排序功能 | boolean \| (a,b)=>boolean | `false` | `true` `false`  | 1.0.0 |
| filterable | 是否开启过滤功能 | boolean \| (filterValue) => (value) =>boolean | `false` | `true` `false`  | 1.0.0 |
| resizeable | 是否开启表头拖拽功能 | boolean \| (a,b)=>boolean | `false` | `true` `false`  | 1.0.0 |
| flex | 按照 flex 值的比例将网格中的剩余空间分配给所有 flex 列 | number | `-` | `number` | 1.7.40 |
<br/>


### 虚拟滚动

数据量较大时，表格会自动开启虚拟滚动。你也可以通过表格的 useVirtual 属性来调整虚拟滚动功能，目前 useVirtual 支持以下几个值：

- 'auto' （默认值）表示根据表格的行数或列数自动调整是否开启虚拟滚动
  - 行数量超过 100 时，自动开启纵向虚拟滚动
  - 列数量超过 100 时，自动开启横向虚拟滚动
  - 表头的横向虚拟滚动默认关闭
- true 开启所有虚拟滚动
- false 关闭所有虚拟滚动
- 传入一个对象可以分别指定 横向/纵向/表头 是否开启虚拟滚动
  - 对象的结构为 { horizontal?: boolean | 'auto', vertical?: boolean | 'auto', header?: boolean | 'auto' }

此外，水平方向的虚拟滚动 要求「所有的列都有一个指定的宽度」。推荐设置 <BaseTable defaultColumnWidth={...} />，确保所有的列都有一个指定的宽度

> 注意设置表格的高度或最大高度（宽度同理），并设置 style.overflow = 'auto'

#### 虚拟滚动与单元格合并

在虚拟滚动开启的情况下，如果想要进行单元格合并，则要使用 column.getSpanRect 来进行设定：

- column.getSpanRect 返回一个 SpanRect 的对象来表示对应单元所处的合并后的位置。
- SpanRect 的具体类型为 { left: number, right: number, top: number, bottom: number }
  - 注意其中 left/top 是 inclusive 的，right/bottom 是 exclusive 的。

不开启虚拟滚动时，单元格合并可以通过 column.getCellProps(...) 返回 colSpan / rowSpan 进行实现。

#### 预估行高

在元素被渲染在页面之前，组件是无法获取该元素的尺寸的。为了展示尽量真实的滚动条，表格组件内部需要算出所有行的高度之和。在一行没有被渲染之前，表格内部会使用 props.estimatedRowHeight (默认值为 48）来作为该行的高度，从而计算所有行的高度和。

在实际使用时，实际行高可能与预估行高有较大出入，此时可以设置 estimatedRowHeight 来提升预估高度的准确性。


### rowSelection
行选择配置项

- 启用行选择功能之前，必须已经设置了 `primaryKey`, 未设置则选中行的`key`默认为下标`index`

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultValue | 非受控用法：默认选中的值 | string[] | `-` | `-` | 1.0.0 |
| value | 受控用法：当前选中的 keys | string[] | `-` | `-` | 1.0.0 |
| type | 行选择类型 | string | `checkbox` | `checkbox` `radio` | 1.0.0 |
| onChange | 受控用法：状态改变回调 | (selectedRowKeys, actionRowkey, actionRowskeys, action) => void | `-` | `-` | 1.0.0 |
| fixed | 复选框所在列的位置 | string | `start` | `start` `end` | 1.0.0 |
| column | 复选框所在列的 column 配置，可指定 width，lock, title, align, features 等属性 | [Column](#Column) | `-` | `-` | 1.0.0 |
| isDisabled | 判断一行中的 checkbox 是否要禁用 | (row, rowIndex) => boolean| `-` | `-` | 1.0.0 |
| clickArea | 点击事件的响应区域 | string | `checkbox` | `checkbox` `cell` `row` | 1.0.0 |
| stopClickEventPropagation | 是否对触发 onChange 的 click 事件调用 event.stopPropagation() | boolean | `false` | `true` `false` | 1.0.0 |
| highlightRowWhenSelected | 是否高亮被选中的行 | boolean | `false` | `true` `false` | 1.6.15 |

<br/>

### filter
过滤配置项

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultFilters | (非受控用法) 默认的过滤字段列表 | object[] | `-` | `[{code,filter}]` | 1.0.0 |
| filters | (受控用法) 过滤字段列表  | object[] | `-` | `[{code,filter}]` | 1.0.0 |
| onChangeFilters | 更新过滤字段列表的回调函数 | (nextFilters: FilterItem[], currentFilter:FilterItem) => void | `-` | `-` | 1.0.0 |
| keepDataSource | 是否保持 dataSource 不变 | boolean | `false` | `true` `false` | 1.0.0 |
| mode | 过滤模式。单选 single，多选 multiple | string | `multiple` | `single` `multiple` | 1.0.0 |
| stopClickEventPropagation | 是否对触发弹出过滤面板的点击事件阻止冒泡 | boolean | `false` | `true` `false` | 1.0.0 |

#### 更新排序字段列表的回调函数 onChangeFilters
- `nextFilters` 即将被更新的过滤字段列表数组。
- `currentFilter` 当前操作的过滤列。
- `FilterItem` 定义。
    - `code` 列标识。
    - `filter` 过滤值数组。
    - `filterCondition` 过滤条件标识，默认过滤面板使用。
<br/>

### sort
排序配置项

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultSorts | (非受控用法) 默认的排序字段列表 | object[] | `-` | `[{code,order}]` | 1.0.0 |
| sorts | (受控用法) 排序字段列表  | object[] | `-` | `[{code,order}]` | 1.0.0 |
| onChangeSorts | 更新排序字段列表的回调函数 | (nextSorts: SortItem[], currentSort:SortItem) => void | `-` | `-` | 1.0.0 |
| orders | 排序切换顺序 | [] | `-` | [`desc` `asc` `none`] | 1.0.0 |
| keepDataSource | 是否保持 dataSource 不变 | boolean | `false` | `true` `false` | 1.0.0 |
| mode | 排序模式。单选 single，多选 multiple | string | `single` | `single` `multiple` | 1.0.0 |
| SortHeaderCell | 自定义排序表头 | React.ComponentType<SortHeaderCellProps> | `` | `` | 1.0.0 |
| highlightColumnWhenActive | 排序激活时 是否高亮这一列的单元格 | boolean | `false` | `true` `false` | 1.0.0 |
| stopClickEventPropagation | 是否对触发排序点击阻止冒泡 | boolean | `false` | `true` `false` | 1.0.0 |
| clickArea | 点击事件的响应区域 | string | `content` | `content` `icon` | 1.0.0 |

#### 更新排序字段列表的回调函数 onChangeSorts
- `nextSorts` 即将被更新的排序字段列表数组。
- `currentSort` 是当前被操作的的排序列。
- `SortItem` 定义
    - `code` 列标识。
    - `order` 本次排序状态，值为：['desc', 'asc', 'none']。
#### 自定义排序顺序 orders
可以用来指定排序切换顺序。该选项的默认值为 ['desc', 'asc', 'none']，即连续点击某一列的表头时，先按降序排序，然后按升序排序，最后取消排序；传入自定义的 orders 可以覆盖默认的切换顺序。

#### 自定义排序表头 SortHeaderCell
可用于自定义排序表头的内容和样式，组件接口如下：
```js
SortHeaderCellProps {
  /** 调用 features.sort(...) 时的参数 */
  sortOptions: object

  /** 在添加排序相关的内容之前 表头原有的渲染内容 */
  children: ReactNode

  /** 当前排序 */
  sortOrder: SortOrder

  /** 多列排序下，sortIndex 指明了当前排序字段起作用的顺序. 当 sortOrder 为 none 时，sortIndex 为 -1 */
  sortIndex: number

  /** 当前列的配置 */
  column: ArtColumn

  /** 切换排序的回调 */
  onToggle(): void
}
```
<br/>

### rowDetail
详情行功能

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultOpenAll | (非受控用法) 是否默认展开所有详情单元格 | boolean | `false` | `true` &#124; `false` | 1.0.0 |
| defaultOpenKeys | (非受控用法) 默认展开的 keys  | string[] | `-` | `-` | 1.0.0 |
| openKeys | (受控用法) 当前展开的 keys | string[] | `-` | `-` | 1.0.0 |
| onChangeOpenKeys | (受控用法) openKeys 改变的回调 | (nextKeys: string[], key: string, action: 'expand' &#124; 'collapse') => void | `-` | `-` | 1.0.0 |
| renderDetail | 详情单元格的渲染方法 | (row: any, rowIndex: number) => ReactNode | `-` | `-` | 1.0.0 |
| hasDetail | 是否包含详情单元格 | (row: any, rowIndex: number) => boolean | `-` | `-` | 1.0.0 |
| getDetailKey | 获取详情单元格所在行的 key，默认为 `(row) => row[primaryKey] + '_detail'` | (row: any, rowIndex: number) => string | `-` | `-` | 1.0.0 |
| detailCellStyle | 详情单元格 td 的额外样式 | React.CSSProperties | `-` | `-` | 1.0.0 |
| clickArea | 点击事件的响应区域 | string | `cell` | `'cell'` &#124; `'content'` &#124; `'icon'` | 1.0.0 |
| stopClickEventPropagation | 是否对触发展开/收拢的 click 事件调用 event.stopPropagation() | boolean | `false` | `true` &#124; `false` | 1.0.0 |
| rowDetailMetaKey | 指定表格每一行元信息的记录字段 | string &#124; symbol | `Symbol('row-detail')` | `-` | 1.0.0 |
| expandColumnCode | 指定在哪一列设置展开按钮 | string | `-` | `-` | 1.0.0 |
<br/>

### treeMode
树形数据展示功能

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultOpenKeys | (非受控用法) 默认展开的 keys  | string[] | `-` | `-` | 1.0.0 |
| openKeys | (受控用法) 当前展开的 keys | string[] | `-` | `-` | 1.0.0 |
| onChangeOpenKeys | (受控用法) openKeys 改变的回调 | (nextKeys: string[], key: string, action: 'expand' &#124; 'collapse') => void | `-` | `-` | 1.0.0 |
| isLeafNode | 自定义叶子节点的判定逻辑 | (node: any, nodeMeta: { depth: number; expanded: boolean; rowKey: string }) => boolean | `-` | `-` | 1.0.0 |
| icon | 展开折叠图标 | React.ReactNode | `-` | `-` | 1.0.0 |
| iconIndent | icon 的缩进值。一般为负数，此时 icon 将向左偏移，默认从 pipeline.ctx.indents 中获取 | number | `-` | `-` | 1.0.0 |
| iconGap | icon 与右侧文本的距离，默认从 pipeline.ctx.indents 中获取 | number | `-` | `-` | 1.0.0 |
| indentSize | 每一级缩进产生的距离，默认从 pipeline.ctx.indents 中获取 | number | `-` | `-` | 1.0.0 |
| clickArea | 点击事件的响应区域 | string | `cell` | `'cell'` &#124; `'content'` &#124; `'icon'` | 1.0.0 |
| stopClickEventPropagation | 是否对触发展开/收拢的 click 事件调用 event.stopPropagation() | boolean | `false` | `true` &#124; `false` | 1.0.0 |
| treeMetaKey | 指定表格每一行元信息的记录字段 | string &#124; symbol | `Symbol('treeMetaSymbol')` | `-` | 1.0.0 |
| expandColCode | 指定展开列 | string | 默认指定展开列为第一列 | `-` | 1.0.0 |
<br/>


### columnDrag

属性`columnDrag`为`true`或设置`ColumnDragOptions`时可以拖动表头来调整列的位置

ColumnDragOptions 接口类型如下
```ts
interface ColumnDragOptions { onColumnDragStopped?: (columnMoved: boolean, columns: ArtColumn[]) => void }
```

### columnResize

属性`columnResize`为`true`或设置`ColumnResizeOptions`时表头右侧会显示拖拽线，按住可以手动调整列宽的大小

```ts
interface ColumnResizeOptions { /** 列宽受控模式，此处优先级高于列定义的宽度 \*/ columnSize?: ColumnSize; /** 列的最小宽度，默认为 60 _/ minSize?: number; /\*\* 如果列宽数组中没有提供有效的宽度，fallbackSize 将作为该列的宽度，默认为 150 _/ fallbackSize?: number; /\*_ 列的最大宽度，默认为 1000 _/ maxSize?: number; onChangeSize?(nextSize: ColumnSize): void; afterChangeSize?(nextSize: ColumnSize, changedColumnSize: ChangedColumnSize[]): void }

interface columnSize { [key: string]: number } interface ChangedColumnSize { code: string; width: number; }
```

### rangeSelection

属性`rangeSelection`为`{}`或设置`TableRangeSelection`时表体内部可范围选中表格
```ts
interface TableRangeSelection { /** 范围选中回调函数 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \*/ rangeSelectedChange?(params: any): void; /** 是否阻止 keydown 的默认行为 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \*/ preventkDefaultOfKeyDownEvent?: boolean; }
```

### 组件替换
属性`components`可替换表格内部的一些子组件，如：加载动画图标、数据为空的展现效果。

```ts
interface Components { /** 表格加载时的加载图标 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \*/ LoadingIcon?: React.ComponentType; /** 数据为空时，表格的展示内容。 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \*/ EmptyContent?: React.ComponentType; }
```
