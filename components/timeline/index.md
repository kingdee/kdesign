---
category: Components
type: 数据展示
order: 9
title: Timeline
subtitle: 时间轴
---

时间轴是一种按时间顺序展示信息的组件。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## API

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| labelWidth | label的宽度 | number | 70 | 1.0.0 |
| lineHeight | Item内容区的行高 | number | 18 | 1.0.0 |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `left` \| `alternate` \| `right` | - | 1.0.0 |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean \| string \| ReactNode | false | 1.0.0 |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | string \| ReactNode | &lt;LoadingOutlined /> | 1.0.0 |
| reverse | 节点排序 | boolean | false | 1.0.0 |

### Timeline.Item

时间轴的每一个节点。

| 参数     | 说明                                                        | 类型                | 默认值 | 版本 |
| -------- | ----------------------------------------------------------- | ------------------- | ------ | --- |
| color    | 指定圆圈颜色 `blue`, `red`, `green`, `gray`，或自定义的色值 | string              | `blue` | 1.0.0 |
| dot      | 自定义时间轴点                                              | string \| ReactNode | -      | 1.0.0 |
| label    | 设置标签                                                    | ReactNode           | -      | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-timeline-finished-color | --kd-g-color-theme | #5582f3 |
|  | --kd-c-timeline-error-color | --kd-g-color-error | #fb2323 |
|  | --kd-c-timeline-success-color | --kd-g-color-success | #1ba854 |
|  | --kd-c-timeline-disabled-color | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-timeline-line-color | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-timeline-label-color-text | - | #666666 |
|  | --kd-c-timeline-content-color-text | --kd-g-color-text-primary | #212121 |
| font | --kd-c-timeline-content-font-size | --kd-g-font-size-small | 12px |
| sizing | --kd-c-timeline-sizing-width | - | 1px |
|  | --kd-c-timeline-content-sizing-max-width | - | - |
|  | --kd-c-timeline-content-sizing-min-width | - | - |
| spacing | --kd-c-timeline-spacing-padding-bottom | - | 24px |
