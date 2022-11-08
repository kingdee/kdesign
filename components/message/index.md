---
category: Components
type: 反馈
order: 0
title: Message
subtitle: 消息提示
---

消息提示是一种不会中断用户当前操作的轻量级全局反馈组件。
## 使用场景

常用于主动操作后的反馈提示，如提示成功、警告和错误等反馈信息

## API

### 静态方法调用

- `Message.info(content, [duration], onClose)`
- `Message.success(content, [duration], onClose)`
- `Message.warning(content, [duration], onClose)`
- `Message.error(content, [duration], onClose)`

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| content | 提示的内容 | string\|React.ReactNode | - | 1.0.0 |
| duration | 消失时间，如果为0则不会自动关闭，单位毫秒（ms），可选 | number | 3000 | 1.0.0 |
| onClose | 关闭时回调函数 | Function(key: React.Key): void |  | 1.0.0 |

#### 全局方法
打开
- `Message.open(config)`: 打开消息
- `Message.info(config)`: 打开info类型消息
- `Message.success(config)`: 打开success类型消息
- `Message.warning(config)`: 打开warning类型消息
- `Message.error(config)`: 打开error类型消息1.0.0

销毁
- `Message.destroy()`: 销毁全部消息
- `Message.destroy(key)`: 销毁指定key的消息

### 配置型调用

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 类名 | string | - | 1.0.0 |
| content | 提示的内容 | string\|React.ReactNode | - | 1.0.0 |
| closable | 关闭图标是否显示 | boolean | false | 1.0.0 |
| closeNode | 关闭内容，仅在closeable为true时有效 | string\|React.ReactNode | - | 1.6.14 |
| duration | 消失时间，如果为0则不会自动关闭，单位毫秒（ms），可选 | number | 3000 | 1.0.0 |
| icon | 标题图标，仅在title为string时有效 | string\|React.ReactNode | - | 1.6.14 |
| key | 标识message唯一性的key，可以用来删除当前message | React.Key | - | 1.0.0 |
| style | 样式 | React.CSSProperties | - | 1.0.0 |
| onClose | 关闭时回调函数 | Function(key: React.Key): void | - | 1.6.14 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-message-info-color-background | - | #e0efff |
|  | --kd-c-message-info-color-border | - | #b3d5ff |
|  | --kd-c-message-info-color-text | - | #0e5fd8 |
|  | --kd-c-message-success-color-background | - | #dcfae4 |
|  | --kd-c-message-success-color-border | - | #a1e6b5 |
|  | --kd-c-message-success-color-text | - | #1BA854 |
|  | --kd-c-message-warning-color-background | - | #fff1d4 |
|  | --kd-c-message-warning-color-border | - | #ffe0a6 |
|  | --kd-c-message-warning-color-text | - | #FF991C |
|  | --kd-c-message-error-color-background | - | #ffdbe0 |
|  | --kd-c-message-error-color-border | - | #ffadb6 |
|  | --kd-c-message-error-color-text | - | #FB2323 |
|  | --kd-c-message-close-color-text | - | #666 |
|  | --kd-c-message-close-color-text-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
| font | --kd-c-message-font-size | - | 14px |
|  | --kd-c-message-icon-font-size | - | 16px |
|  | --kd-c-message-font-size | - | 16px |
| line-height | --kd-c-message-line-height | - | 20px |
| radius | --kd-c-message-border-radius | - | 4px |
| sizing | --kd-c-message-sizing-max-width | - | 1000px |
|  | --kd-c-message-sizing-min-width | - | 280px |
|  | --kd-c-message-text-sizing-max-height | - | 160px |
| spacing | --kd-c-message-spacing-margin-bottom | - | 16px |
|  | --kd-c-message-spacing-padding-horizontal | - | 10px |
|  | --kd-c-message-spacing-padding-vertical | - | 20px |
|  | --kd-c-message-icon-spacing-margin-right | - | 8px |
|  | --kd-c-message-close-spacing-margin-left | - | 12px |
| z-index | --kd-c-message-z-index | --kd-g-z-index-apex | 9999 |
