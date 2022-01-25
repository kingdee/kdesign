---
category: Components
type: 录入
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
| notFoundContent | 下拉列表为空时显示的内容 | string | `No Data` |  |
| options | 可选项数据源 | [Option](#Option)\[] | - |  1.0.0 |
| placeholder | 输入框占位文本 | string | - | 1.0.0 |
| popupClassName | 自定义浮层类名 | string | - | 1.0.0 |
| popupPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` |  1.0.0 |
| popupVisible | 控制浮层显隐 | boolean | - | 1.0.0 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 1.0.0 |
| value | 指定选中项 | string\[] \| number\[] | - | 1.0.0 |
| onChange | 选择完成后的回调 | (value, selectedOptions) => void | - | 1.0.0 |
| onPopupVisibleChange | 显示/隐藏浮层的回调 | (visible) => void | - | 1.0.0 |

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

