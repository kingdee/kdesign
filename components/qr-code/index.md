---
category: Components
type: 基础
title: QRCode
subtitle: 二维码
---

二维码是一种实现设备之间的快速传输信息的组件

## 使用场景

需要以图形的方式进行跨设备支付、身份确认、分享等操作时使用

## API

| 属性       | 说明                 | 类型                         | 默认值      | 版本号 |
| ---------- | -------------------- | ---------------------------- | ----------- | ------ |
| bgColor    | 二维码背景颜色       | string                       | transparent | 1.0.0  |
| bordered   | 是否有边框           | `true` `false`               | true        | 1.0.0  |
| color      | 二维码颜色           | string                       | #000        | 1.0.0  |
| errorLevel | 二维码纠错等级       | `L` `M` `Q` `M`              | `L`         | 1.0.0  |
| icon       | 二维码中图片的地址   | string                       | -           | 1.0.0  |
| iconSize   | 二维码中图片的大小   | number                       | 30          | 1.0.0  |
| size       | 二维码大小           | number                       | 86          | 1.0.0  |
| status     | 二维码状态           | `active` `expired` `loading` | `active`    | 1.0.0  |
| type       | 渲染类型             | `canvas` `svg`               | `canvas`    | 1.0.0  |
| value      | 扫描后的文本         | string                       | -           | 1.0.0  |
| onRefresh  | 点击"点击刷新"的回调 | () => void                   | -           | 1.0.0  |

## Design Token

| 分类    | 组件 token                               | 全局 token | 默认值                    |
| ------- | ---------------------------------------- | ---------- | ------------------------- |
| color   | --kd-c-qrcode-color-text                 | -          | rgba(0,0,0,0.88)          |
|         | --kd-c-qrcode-color-border               | -          | rgba(5, 5, 5, 0.06)       |
|         | --kd-c-progress-color-background         | -          | rgba(255, 255, 255, 0.96) |
| font    | --kd-c-qrcode-font-size                  | -          | 14px                      |
| radius  | --kd-c-qrcode-border-radius              | -          | 2px                       |
| sizing  | --kd-c-qrcode-size-border                | -          | 1px                       |
| spacing | --kd-c-qrcode-spacing-padding-horizontal | -          | 8px                       |
