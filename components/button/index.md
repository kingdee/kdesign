---
category: Components
order: 0
type: 基础
title: Button
subtitle: 按钮
---

按钮是一种用于触发操作的组件。

## 使用场景

需要触发一个操作时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| block | 开启该属性按钮将撑满父元素 | boolean | `false` | `true` `false` | 1.0.0 |
| bordered | 是否带边框 | boolean | `true` | `true` `false` | 1.0.0 |
| disabled | 按钮禁用状态 | boolean | `false` | `true` `false` | 1.0.0 |
| ghost | 幽灵属性，使按钮背景透明 | boolean | `false` | `true` `false` | 1.0.0 |
| href | 点击跳转的地址,指定此属性 button 的行为和 a 链接一致 | string | `-` | `-` | 1.0.0 |
| loading | 按钮加载状态（加载中的按钮将不能触发点击事件） | boolean | `false` | `true` `false` | 1.0.0 |
| shape | 按钮形状 | string | `''` | `''` `circle` `round` | 1.0.0 |
| size | 按钮尺寸 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | `-` | `-` | 1.0.0 |
| type | 按钮类型 | string | `second` | `second` `primary` `ghost` `link` `text` | 1.0.0 |
| onClick | 点击按钮时的回调 | (event) => void | `-` | `-` | 1.0.0 |
| htmlType | 设置 button 原生的 type 值 | string | `-` | `submit` `button` `reset` | 1.0.0 |
