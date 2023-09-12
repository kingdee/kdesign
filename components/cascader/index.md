---
category: Components
type: 表单
order: 1
title: Cascader
subtitle: 级联选择
---

级联选择是一种选择多层级数据的组件。

## 何时使用

需要从一组多层级的数据中选择时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 能否清除 | boolean | true | 1.0.0 |
| autoFocus | 自动焦点 | boolean | false | 1.0.0 |
| bordered | 是否加边框 | boolean | false | 1.0.0 |
| changeOnSelect | 此项为 true 时，每次点击选项值都会发生变化 | boolean | false | 1.0.0 |
| defaultValue | 默认的选中项的值 | string\[] \| number\[] | \[] | 1.0.0 |
| disabled | 禁用 | boolean | false | 1.0.0 |
| displayRender | 自定义展示选择结果 | (labels, selectedOptions) => ReactNode | labels => labels.join(`/`) | 1.0.0 |
| dropdownRender | 自定义下拉框内容 | (menus: ReactNode) => ReactNode | menus => menus | 1.0.0 |
| expandIcon | 次级菜单展开图标 | ReactNode | - | 1.0.0 |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | `click` | 1.0.0 |
| fieldNames | 自定义 options 中 label name children 的字段名称 | object | { label: `label`, value: `value`, children: `children` } | 1.0.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上 | function(triggerNode) | () => document.body | 1.0.0 |
| loadData | 动态加载选项 | - | 1.0.0 |
| maxTagCount | 最多显示多少个 tag | number | - | 1.6.23 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - | 1.6.23 |
| mode | 下拉框模式（设置单选或多选） | `single` `multiple` | `single` | 1.6.23 |
| notFoundContent | 下拉列表为空时显示的内容 | string | `No Data` |  |
| options | 可选项数据源 | [Option](#Option)\[] | - |  1.0.0 |
| placeholder | 输入框占位文本 | string | - | 1.0.0 |
| popperClassName | 自定义浮层类名 | string | - | 1.0.0 |
| popperPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` |  1.0.0 |
| popperVisible | 控制浮层显隐 | boolean | - | 1.0.0 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.0.0 |
| value | 指定选中项 | string\[] \| number\[] | - | 1.0.0 |
| onChange | 选择完成后的回调 | (value, selectedOptions) => void | - | 1.0.0 |
| onPopperVisibleChange | 显示/隐藏浮层的回调 | (visible) => void | - | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### Option

```typescript
interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| colors | --kd-c-cascader-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-cascader-color-background | --kd-g-color-white | #fff |
|  | --kd-c-cascader-color-background-hover | --kd-g-color-hover | #f5f5f5 |
|  | --kd-c-cascader-color-text-selected | --kd-g-color-theme | #5582f3 |
|  | --kd-c-cascader-color-background-selected | --kd-g-color-background-ongoing | #f2f9ff |
|  | --kd-c-cascader-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-cascader-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-cascader-clear-color-text | - | #d9d9d9 |
|  | --kd-c-cascader-icon-clear-color-text-hover | - | #999 |
|  | --kd-c-cascader-color-border-foucs | --kd-g-color-theme | #5582f3 |
|  | --kd-c-cascader-tag-disabled-color | - | #d9d9d9 |
|  | --kd-c-cascader-placeholder-color | --kd-g-color-text-placeholder | #ccc |
| font | --kd-c-cascader-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-cascader-font-weight | - | 'normal' |
| radius | --kd-c-cascader-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-cascader-sizing-height | - | 192px |
|  | --kd-c-cascader-menu-sizing-min-width | - | 116px |
|  | --kd-c-cascader-menu-item-sizing-height | - | 32px |
|  | --kd-c-cascader-menu-item-label-sizing-width | - | 72px |
| spacing | --kd-c-cascader-menu-spacing-padding-vertical | - | 8px |
|  | --kd-c-cascader-menu-item-spacing-padding-horizontal | - | 12px |
