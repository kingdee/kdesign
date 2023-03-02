---
category: Components
type: 数据展示
order: 1
title: ImageCropper
subtitle: 图片裁剪
---

图片裁剪是一种对图片进行裁剪的组件。

## **使用场景**

需要修改图片为固定尺寸、比例或截取图片部分内容时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| autoCropArea | 裁剪区域大小(百分比) | number | `0.5` | 数字 | 1.0.0 |
| aspectRatio | 定义裁切框的可拖动的长宽比 | number | `NaN` | 数字，或者数学计算公式如 16/9、4/3 | 1.0.0 |
| containerHeight | 高度 | number | `830` | - | 1.0.0 |
| cropBoxMovable | 是否开启裁切框可拖动 | boolean | `true` | `true` `false` | 1.0.0 |
| customComponents | 工具栏配置 | [] | - | - | 1.0.0 |
| containerWidth | 宽度 | number | `620` | - | 1.0.0 |
| dragMode | 裁切器的拖动模式 | string | `crop` | `crop` `move` `none` | 1.0.0 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | HTMLElement | `() => HTMLElement | Selectors | null | document.body` | - | 1.0.0 |
| imageMaxSize | 支持图片的大小(MB) | number | `2` | - | 1.0.0 |
| modal | 是否在裁切框的下方显示半透明的黑色遮罩 | boolean | `true` | `true` `false` | 1.0.0 |
| okBtn | 确认按钮 | ReactNode | - | - | 1.0.0 |
| okText | 确认按钮文字 | string | `确认裁剪` | - | 1.0.0 |
| onClose | 关闭弹窗回调 | () => void | - | - | 1.0.0 |
| onCropFailed | 裁剪失败回调 | (file) => void | - | - | 1.0.0 |
| onCropSuccess | 裁剪成功回调 | () => void | - | - | 1.0.0 |
| showDeaultToolbar | 是否显示默认工具栏 | boolean | `true` | `true` `false` | 1.0.0 |
| title | 标题 | ReactNode | - | - | 1.0.0 |
| viewMode | 裁切器的查看模式 | number | `0` | `0` `1` `2` `3` | 1.0.0 |
| zoomOnWheel | 是否开启通过鼠标滚轮缩放图片功能 | boolean | `true` | `true` `false` | 1.0.0 |
