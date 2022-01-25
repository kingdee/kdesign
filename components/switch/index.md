---
category: Components
type: 录入
order: 14
title: Switch
subtitle: 开关
---


开关是一种用于两种互斥状态之间进行切换的组件。

## 使用场景
需要触发激活或停用某些功能时，例如：“启用”和“不启用”。

## API

| 参数              | 说明                              | 类型                                     | 默认值 | 版本 |
| ----------------- | --------------------------------- | ---------------------------------------- | ------ | ---- |
| className         | Switch 器类名                     | string                                   | -      |      |
| checked           | 指定当前是否选中                  | boolean                                  | false  |      |
| checkedChildren   | 选中时的内容                      | string\|ReactNode                        |        |      |
| defaultChecked    | 初始是否选中                      | boolean                                  | false  |      |
| disabled          | 是否禁用                          | boolean                                  | false  |      |
| loading           | 加载中的开关                      | boolean                                  | false  |      |
| size              | 开关大小，可选值：`large` `small` | string                                   | small  |      |
| unCheckedChildren | 非选中时的内容                    | string\|ReactNode                        |        |      |
| onClick           | 点击时回调函数                    | Function(checked: boolean, event: Event) |        |      |
| onChange          | 变化时回调函数                    | Function(checked: boolean, event: Event)               |        |      |
