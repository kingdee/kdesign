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
- `Message.open(cinfig)`: 打开消息
- `Message.info(cinfig)`: 打开info类型消息
- `Message.success(cinfig)`: 打开success类型消息
- `Message.warning(cinfig)`: 打开warning类型消息
- `Message.error(cinfig)`: 打开error类型消息1.0.0

销毁
- `Message.destroy()`: 销毁全部消息
- `Message.destroy(key)`: 销毁指定key的消息

### 配置型调用

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 类名 | string | - | 1.0.0 |
| content | 提示的内容 | string\|React.ReactNode | - | 1.0.0 |
| closable | 关闭图标是否显示 | boolean | false | 1.0.0 |
| duration | 消失时间，如果为0则不会自动关闭，单位毫秒（ms），可选 | number | 3000 | 1.0.0 |
| key | 标识message唯一性的key，可以用来删除当前message | React.Key | - | 1.0.0 |
| style | 样式 | React.CSSProperties | - | 1.0.0 |
| onClose | 关闭时回调函数 | Function(key: React.Key): void | - | 1.0.0 |
