---
category: Components
type: 反馈
order: 5
title: Progress
subtitle: 进度条
---

进度条是一种展示进度和状态的组件。

## 使用场景
- 需要展示一个操作完成的百分比时。
- 需要展示耗时任务进度时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | Switch 器类名 | string | - | 1.0.0 |
| failureIcon | 失败时的图标 | React.ReactNode |  | 1.0.0 |
| infoPosition | 进度条信息位置 | string | right | 1.0.0 |
| percent | 当前进度数值 | number | 0 | 1.0.0 |
| strokeWidth | 进度条的线条粗细 | number | 8/4(type=circle) | 1.0.0 |
| strokeColor | 进度条的颜色（支持渐变） | string \| ProgressGradient | - | 1.0.0 |
| showInfo | 是否显示进度条信息，可选值：`right` `bottom` | boolean | true | 1.0.0 |
| status | 指定当前进度条状态，可选值：`cycle` `loading` `failure` `success` | string |  | 1.0.0 |
| successIcon | 成功时的图标 | React.ReactNode |  | 1.0.0 |
| type | 指定当前进度条类型，可选值：`line` `circle` | string | line | 1.0.0 |
| trailColor | 进度条未完成部分的颜色 | string | - | 1.0.0 |
| textMap | 进度条信息配置,值为一个数组，总共三项，依次代表加载中文字、失败文字、成功文字 | React.ReactNode[] | \['正在加载中...', '加载失败', '加载成功'\] | 1.0.0 |
| width | type=circle 时生效，指定当前圆形进度条的宽度 | number | 88 | 1.0.0 |
| format | 格式化进度条信息的方法 | Function(percent: number): React.ReactNode |  | 1.0.0 |
| onProcess | 进度条变化中的回调 | Function(percent: number): void |  | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-progress-color-remaining | - | #e5e5e5 |
|  | --kd-c-progress-line-color-font | - | #212121 |
|  | --kd-c-progress-circle-color-font | - | #666 |
|  | --kd-c-progress-color-default | - | #5582f3 |
|  | --kd-c-progress-color-success | --kd-g-color-success | #1ba854 |
|  | --kd-c-progress-color-failure | --kd-g-color-error | #fb2323 |
| font | --kd-c-progress-line-icon-font-size | - | 16px |
|  | --kd-c-progress-line-text-font-size | - | 16px |
|  | --kd-c-progress-line-special-text-font-size | - | 16px |
| line-height | --kd-c-progress-circle-percent-line-height | - | 48px |
|  | --kd-c-progress-circle-unit-line-height | - | 18px |
| radius | --kd-c-progress-radius-border | - | 100px |
| sizing | --kd-c-progress-line-stroke-sizing-width | - | 8px |
|  | --kd-c-progress-circle-stroke-sizing-width | - | 4px |
| spacing | --kd-c-progress-circle-unit-spacing-margin-top | - | 18px |
|  | --kd-c-progress-line-text-spacing-margin-left | - | 8px |
|  | --kd-c-progress-line-text-spacing-margin-top | - | 12px |
|  | --kd-c-progress-circle-text-spacing-margin-top | - | 8px |
