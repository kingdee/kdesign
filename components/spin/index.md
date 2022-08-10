---
category: Components
type: 反馈
title: Spin
order: 3
subtitle: 加载中
---
## 使用场景
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
未知进度加载 / 加载时间少于2s
## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| indicator | 加载指示符 | ReactNode | --- | --- | 1.0.0 |
| spinning | 是否为加载中状态 | boolean | true | --- | 1.0.0 |
| tip | 当作为包裹元素时，可以自定义描述文案 | string | --- | --- | 1.0.0 |
| type | 加载中类型 | string | `page` | `page` `container` `component` | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-spin-dot-color-backgroung-first | --kd-g-color-logo-1 | #2486ee |
|  | --kd-c-spin-dot-color-backgroung-second | --kd-g-color-logo-2 | #02ccfe |
|  | --kd-c-spin-dot-color-backgroung-third | --kd-g-color-logo-3 | #05c8c7 |
|  | --kd-c-spin-dot-color-backgroung-fourth | --kd-g-color-logo-4 | #a06eff |
|  | --kd-c-spin-component-dot-color-border | - | #ebebeb |
|  | --kd-c-spin-component-dot-item-color-border | --kd-g-color-theme | #5582f3 |
| sizing | --kd-c-spin-page-dot-item-sizing-square | - | 16px |
|  | --kd-c-spin-page-dot-spin-sizing-square | - | 48px |
|  | --kd-c-spin-dot-container-sizing-square | - | 5px |
|  | --kd-c-spin-dot-component-sizing-square | - | 24px |
|  | --kd-c-spin-dot-component-sizing-border | - | 2px |
| spacing | --kd-c-spin-page-dot-spin-spacing-padding | - | 4px |
