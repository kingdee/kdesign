---
category: Components
type: 筛选
order: 11
title: Search
subtitle: 搜索
---

搜索是一种通过关键词快速查找数据的组件，包含 3 种类型：

- 基础搜索
- 多条件搜索
- 高级搜索

## 使用场景

当数据量较大，无法快速找到对应内容时。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| borderType | 边框类型 | underline \| bordered \| none | underline | 1.0.0 |
| desc | 下拉框提示（type 为 quick-search 时有效） | string[] | - | 1.0.0 |
| dropdownStyle | 下拉菜单的 style 属性（type 为 quick-search 时有效） | CSSProperties | - | 1.0.0 |
| disabled | 是否禁用 | boolean | false | 1.0.0 |
| listHeight | 设置弹窗滚动高度（type 为 quick-search 时有效） | number | 300 | 1.0.0 |
| nlpSearch | 是否开启智能搜索，为对象时可对智能搜索进行控制（type 为 quick-search 时有效） | [nlpSearch](#nlpSearch) | false | 1.0.0 |
| notFoundContent | 当下拉列表为空时显示的内容（type 为 quick-search 时有效） | ReactNode | `暂无数据` | 1.0.0 |
| onBlur | 失去焦点时回调 | function | - | 1.0.0 |
| onChange | 选中 option 变化时，调用此函数（type 为 quick-search 时有效） | function(value, option:{ tag: string, value: string \| number, label: string \| string[] }[]) | - | 1.0.0 |
| onFocus | 获得焦点时回调 | function | - | 1.0.0 |
| onPressEnter | 按下回车的回调 | (event) => void | - | 1.0.0 |
| onSearch | 文本框值变化时回调 | (event) => void | - | 1.0.0 |
| onSelect | 被选中时调用，参数为选中项的 value 值（type 为 quick-search 时有效） | function(string \| number, option:{ tag: string, value: string \| number, label: string \| string[] }) | - | 1.0.0 |
| panelSearch | 搜索面板配置（type 为 panel 时有效） | [panelSearch](#panelSearch) | - | 1.0.0 |
| placeholder | 选择框默认文字 | string | - | 1.0.0 |
| prefix | 带有前缀图标的 search | boolean \| ReactNode | - | 1.0.0 |
| size | 控件大小 | large \| middle \| small | middle | 1.0.0 |
| suffix | 带有后缀图标的 search | boolean \| ReactNode | - | 1.0.0 |
| tags | 数据化配置选项内容（type 为 quick-search 时有效） | { label, value }\[] | - | 1.0.0 |
| type | 搜索类型 | basis \| quick-search \| panel | basis | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### nlpSearch

| 参数               | 说明               | 类型                                      | 默认值 | 版本   |
| ------------------ | ------------------ | ----------------------------------------- | ------ | ------ |
| isSupportNlpSearch | 是否支持智能搜索   | boolean                                   | true   | 1.0.0 |
| nlpSearchLoading   | 下拉框右侧图片展示 | boolean \| ReactNode                      | true   | 1.0.0 |
| nlpSearchResult    | 智能搜索结果       | { value: number \| string, label: string} | -      | 1.0.0 |
| onNlpSearch        | 文本框值变化时回调 | (string) => void                          | -      | 1.0.0 |

### panelSearch

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| displayImg | 下拉框右侧图片展示 | ReactNode | - | 1.0.0 |
| displayList | 选中项具体内容展示(根据 panelResult 属性值展示) | object\[] | - | 1.0.0 |
| onPanelChange | 文本框值变化时回调 | ({label: string, code: string \| number, value: string }) => void | - | 1.0.0 |
| onPanelSearch | 点击搜索选项触发 | () => void | - | 1.0.0 |
| onPanelSelect | 被选中时调用 | () => void | - | 1.0.0 |
| panelResult | 数据化配置选项内容 | { id, title, typeName, subTitle, icon }\[] | - | 1.0.0 |
| panelSearchLoading | 控制加载中状态 | boolean | false | 1.0.0 |
| panelTypes | 默认根据此属性值进行筛选 | { label, code }\[] | - | 1.0.0 |

### Option props

| 参数      | 说明                              | 类型             | 默认值 | 版本   |
| --------- | --------------------------------- | ---------------- | ------ | ------ |
| className | Option 器类名                     | string           | -      | 1.0.0 |
| tag       | 选中该 Option 后，Select 的 title | string           | -      | 1.0.0 |
| value     | 默认根据此属性值进行筛选          | string \| number | -      | 1.0.0 |
