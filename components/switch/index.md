---
category: Components
type: 表单
order: 14
title: Switch
subtitle: 开关
---

开关是一种用于两种互斥状态之间进行切换的组件。

## 使用场景

需要触发激活或停用某些功能时，例如：“启用”和“不启用”。

## API

| 参数              | 说明                              | 类型                                     | 默认值 | 版本  |
| ----------------- | --------------------------------- | ---------------------------------------- | ------ | ----- |
| className         | Switch 器类名                     | string                                   | -      | 1.0.0 |
| checked           | 指定当前是否选中                  | boolean                                  | false  | 1.0.0 |
| checkedChildren   | 选中时的内容                      | string\|ReactNode                        |        | 1.0.0 |
| defaultChecked    | 初始是否选中                      | boolean                                  | false  | 1.0.0 |
| disabled          | 是否禁用                          | boolean                                  | false  | 1.0.0 |
| loading           | 加载中的开关                      | boolean                                  | false  | 1.0.0 |
| size              | 开关大小，可选值：`large` `small` | string                                   | small  | 1.0.0 |
| unCheckedChildren | 非选中时的内容                    | string\|ReactNode                        |        | 1.0.0 |
| onClick           | 点击时回调函数                    | Function(checked: boolean, event: Event) |        | 1.0.0 |
| onChange          | 变化时回调函数                    | Function(checked: boolean, event: Event) |        | 1.0.0 |

## Design Token

| 分类        | 组件 token                                       | 全局 token             | 默认值             |
| ----------- | ------------------------------------------------ | ---------------------- | ------------------ |
| color       | --kd-c-switch-color-on                           | --kd-g-color-theme-6   | rgb(85, 130, 243)  |
|             | --kd-c-switch-color-off                          | -                      | #B2B2B2            |
|             | --kd-c-switch-color-on-background-disabled       | --kd-g-color-theme-4   | rgb(181, 207, 255) |
|             | --kd-c-switch-color-off-background-disabled      | -                      | #D9D9D9            |
|             | --kd-c-switch-color-loading                      | --kd-g-color-ongoing   | #276ff5            |
|             | --kd-c-switch-color-font                         | --kd-g-color-white     | #fff               |
| font        | --kd-c-switch-small-font-size                    | --kd-g-font-size-small | 12px               |
|             | --kd-c-switch-large-font-size                    | --kd-g-font-size-small | 12px               |
|             | --kd-c-switch-inner-font-size-small              | --kd-g-font-size-small | 12px               |
| line-height | --kd-c-switch-large-line-height                  | -                      | 20px               |
|             | --kd-c-switch-small-line-height                  | -                      | 16px               |
| radius      | --kd-c-switch-small-radius-border                | -                      | 8px                |
| sizing      | --kd-c-switch-small-sizing-height                | -                      | 16px               |
|             | --kd-c-switch-small-sizing-width                 | -                      | 32px               |
|             | --kd-c-switch-large-sizing-height                | -                      | 20px               |
|             | --kd-c-switch-large-sizing-width                 | -                      | 40px               |
|             | --kd-c-switch-large-sizing-border-radius         | -                      | 10px               |
| spacing     | --kd-c-switch-inner-spacing-margin               | -                      | 0 5px 0 17px       |
|             | --kd-c-switch-inner-spacing-margin-checked       | -                      | 0 17px 0 5px       |
|             | --kd-c-switch-inner-spacing-margin-large         | -                      | 0 5px 0 21px       |
|             | --kd-c-switch-inner-spacing-margin-large-checked | -                      | 0 21px 0 5px       |
