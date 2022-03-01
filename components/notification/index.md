---
category: Components
type: 反馈
order: 0
title: Notification
subtitle: 通知提示
---

通知提示是一种显示系统级推送通知的组件。

## 使用场景

系统需要主动推送通知时。

## API
**全局调用方法**
- `Notification.open(config)`: 打开一条消息
- `Notification.info(config)`: 打开一条信息消息
- `Notification.primary(config)`: 打开一条系统消息

**全局销毁方法**
- `Notification.destroy()`: 销毁全部消息
- `Notification.destroy(key)`: 销毁指定key的消息

### config 参数说明

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 类型 | 'info'\|'primary' | 'primary' | 1.0.0 |
| title | 标题内容 | string\|React.ReactNode | - | 1.0.0 |
| footer | 底部内容 | Array\|React.ReactNode | - | 1.0.0 |
| content | 提示的内容 | string\|React.ReactNode | - | 1.0.0 |
| showIcon | 是否显示标题图标 | boolean | false | 1.0.0 |
| icon | 标题图标，仅在title为string时有效 | string\|React.ReactNode | - | 1.0.0 |
| closable | 关闭图标是否显示 | boolean | true | 1.0.0 |
| closeNode | 关闭内容，仅在closeable为true时有效 | string\|React.ReactNode | - | 1.0.0 |
| placement | 出现位置 | 'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight' | 'bottomRight' | 1.0.0 |
| className | 类名 | string | - | 1.0.0 |
| duration | 消失时间，如果为0则不会自动关闭，单位毫秒（ms），可选 | number | 0 | 1.0.0 |
| key | 标识message唯一性的key，可以用来删除当前message | React.Key | - | 1.0.0 |
| style | 样式 | React.CSSProperties | - | 1.0.0 |
| onClose | 关闭时回调函数 | Function(key: React.Key): void | - | 1.0.0 |


## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-notice-icon-color | --color-theme | #5582f3 |
|  | --kd-c-notice-icon-color-hover | --kd-g-color-border-ongoing | #85b8ff |
|  | --kd-c-notice-header-color| --kd-g-color-white | #fff |
|  | --kd-c-notice-header-color-background | --color-theme | #5582f3 |
|  | --kd-c-notice-content-color-background | --kd-g-color-white | #fff |
|  | --kd-c-notice-info-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-notice-info-header-color-background | --kd-g-color-white | #fff |
|  | --kd-c-notice-footer-color | --kd-g-color-text-link | #0e5fd8 |
|  | --kd-c-notice-footer-color-hover| --kd-g-color-text-link-hover | #3987ed |
| motion | --kd-c-notice-motion-duration | --kd-g-duration-quickly | 0.2s |
| font | --kd-c-notice-title-font-size | --kd-g-font-size-middle | 14px |
| z-index | --kd-c-notice-z-index | --kd-g-z-index-apex | 9999 |
